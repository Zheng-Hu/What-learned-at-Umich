new Vue({
  el: '#app',
  data () {
    return {
      btnAll:"btn btn-success",
      playbutton:"play",
      allModel:true,
      info: null,
      searchValue:'',
      initialList:[],
      resultList:[],
      genereButtonSet:new Set(),
      genereButtonSelectedSet:new Set(),
      genereButtonStyleMap:new Map(),
      resultCount:0,
      dropdownFirstButton:'active',
      dropdownSecondButton:'inactive',
      dropdownThirdButton:'inactive',
    }
  },
  methods:{
    async searchHandler() {
      this.initialList = [];
      this.resultList = [];
      this.resultCount = 0,
      await axios
      .get('https://cors-anywhere.herokuapp.com/itunes.apple.com/search?attribute=allArtistTerm&term=' + this.searchValue )
      .then(response => (this.info = response));
      console.log(this.info)
      
      // alter when there is no artist found
      if (this.info.data.resultCount == 0) {
        alert("No artist found");
      }

      this.initialList = this.info.data.results;
      this.resultList = this.resultList.concat(this.initialList);
      this.resultCount = this.resultList.length;
      // Get the genereName
      for(let i = 0; i < this.initialList.length; i++) {
        (this.genereButtonSet).add(this.initialList[i].primaryGenreName);
        (this.genereButtonSelectedSet).add(this.initialList[i].primaryGenreName);
      };

      // Initial the form of genere button
      this.genereButtonSet.forEach((item)=>{this.genereButtonStyleMap.set(item+"GenereButton","btn btn-light")})

      // Change the form of data
      for(let i = 0; i < this.initialList.length; i++){
        if(this.initialList[i].collectionName == undefined) {
          this.initialList[i].collectionName = "No information provided"
        }
        if(this.initialList[i].collectionPrice == undefined) {
          this.initialList[i].collectionPrice = 0
        }
        if(this.initialList[i].kind == undefined) {
          this.initialList[i].kind = "No information provided"
        }
        if(this.initialList[i].trackId== undefined) {
          this.initialList[i].trackId = "No information provided"
        }
        if(this.initialList[i].country == undefined) {
          this.initialList[i].country = "No information provided"
        }
      }
    },
    sortButtonHandler(buttonIndex){
      if(buttonIndex == 0) {
        // Initial the resultList
        this.resultList = [];
        this.resultList  = this.resultList.concat(this.initialList);
        this.dropdownFirstButton = 'active';
        this.dropdownSecondButton = 'inactive';
        this.dropdownThirdButton = 'inactive';
      }
      
      else if (buttonIndex == 1) {
        this.dropdownSecondButton = 'active';
        this.dropdownFirstButton = 'inactive';
        this.dropdownThirdButton = 'inactive';
        (this.resultList).sort((a,b) => {
          if (a.collectionName < b.collectionName) {
            return -1;
          }
          if (a.collectionName > b.collectionName) {
            return 1;
          }
          return 0;
        })
      }
      else if (buttonIndex == 2) {
        this.dropdownThirdButton = 'active';
        this.dropdownFirstButton = 'inactive';
        this.dropdownSecondButton = 'inactive';
        (this.resultList).sort((a,b)=> {
          return (b.collectionPrice - a.collectionPrice);
        })
      }
    },
    filterButtonHandler(buttonText){
      if(buttonText == "All") {
        if (this.btnAll == "btn btn-success"){
          this.btnAll = "btn light";
          this.genereButtonSelectedSet.clear();
          this.resultCount = 0;
          this.allModel = false;

        } else{
          this.allModel = true;
          this.btnAll = "btn btn-success";
          this.genereButtonSet.forEach((item)=>{(this.genereButtonSelectedSet).add(item)});
          this.genereButtonStyleMap.forEach((value,key) => {this.genereButtonStyleMap.set(key, "btn btn-light")});
          this.genereButtonStyleMap = new Map(this.genereButtonStyleMap);
          this.resultCount = this.resultList.length;
        }
      } else{
        if(this.genereButtonStyleMap.get(buttonText + 'GenereButton') == "btn btn-light"){
          if(this.allModel) {
            this.allModel = false;
            this.genereButtonSelectedSet.clear();
            this.resultCount = 0;
          }
          this.genereButtonStyleMap = new Map(this.genereButtonStyleMap.set(buttonText + 'GenereButton', "btn btn-primary"));
          this.btnAll = "btn light";
          (this.genereButtonSelectedSet).add(buttonText);
          this.resultCount += (this.resultList.filter(item => item.primaryGenreName == buttonText)).length;
        } else{
          this.genereButtonStyleMap = new Map(this.genereButtonStyleMap.set(buttonText + 'GenereButton', "btn btn-light"));
          (this.genereButtonSelectedSet).delete(buttonText);
          this.resultCount -= (this.resultList.filter(item => item.primaryGenreName == buttonText)).length;
        }
      }
    },
    playButtonHandler(){
      if (this.playbutton == "play") {
       this.playbutton = "stop"; 
      } else {
        this.playbutton = "play";
      }
    },
  }
})

