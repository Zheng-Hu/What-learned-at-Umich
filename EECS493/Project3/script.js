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
      genereButtonStyleMap:new Map(),
      genereButtonSelectedSet:new Set(),
      buttonNum:0,
      resultCount:0,
    }
  },
  methods:{
    async searchHandler() {
      console.log(this.searchValue);
      this.initialList = [];
      this.resultList = [];
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
   

      // if (this.allModel) {
      //   this.resultList = (this.resultList).concat(this.initialList);
      //   console.log(this.resultList);
      // } else {
      //   if (this.btnNewAge == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "New Age"));
      //   }
      //   if (this.btnRap == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Hip-Hop/Rap"));
      //   }
      //   if (this.btnPop == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Pop"));
      //   }
      //   if (this.btnAlternative == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Alternative"));
      //   }
      //   if (this.btnElectronic == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Electronic"));
      //   }
      //   if (this.btnDance == "btn btn-primary") {
      //     this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Dance"));
      //   }
      // }

    },
    playButtonHandler(){
      if (this.playbutton == "play") {
       this.playbutton = "stop"; 
      } else {
        this.playbutton = "play";
      }
    },
    sortButtonHandler(buttonIndex){
      if(buttonIndex == 0) {
        this.resultList = [];
        this.resultList  = this.resultList.concat(this.initialList);
      }
      else if (buttonIndex == 1) {
        (this.resultList).sort((a,b) => {
          if(b.collectionName == undefined) {
            return 1;
          }
          if(a.collectionName == undefined) {
            return -1;
          } else {
            if (a.collectionName < b.collectionName) {
              return -1;
            }
            if (a.collectionName > b.collectionName) {
              return 1;
            }
            return 0;
          }
        })
        console.log(this.resultList);
      }
      else if (buttonIndex == 2) {
        (this.resultList).sort((a,b)=> {
          return (b.collectionPrice - a.collectionPrice);
        })
      }

    },
    filterButtonHandler(buttonText){
      console.log(buttonText);
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
          console.log(this.genereButtonSelectedSet);
  
        }
      }
    }
  }
})

