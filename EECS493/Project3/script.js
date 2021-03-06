new Vue({
  el: '#app',
  data () {
    return {
      btnAll:"btn btn-success",
      playbutton:"play",
      allModel:true,
      info: null,
      songs: null,
      searchValue:'',
      initialList:[],
      resultList:[],
      genereButtonSet:new Set(),
      genereButtonSelectedSet:new Set(),
      genereButtonStyleMap:new Map(),
      playButtonMap: new Map(),
      resultCount:0,
      dropdownFirstButton:'active',
      dropdownSecondButton:'inactive',
      dropdownThirdButton:'inactive',
      songsList: [],
      collectionName: '',
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
      // await axios
      // .get('https://music.apple.com/us/album/kings-of-summer-single-version/1160446179?i=1160446542&uo=4' )
      // .then(response => (this.info = response));
      // console.log(info)
      // https://itunes.apple.com/lookup?collectionid=211192863&entity=song
      
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
      this.genereButtonSet.forEach((item)=>{this.genereButtonStyleMap.set(item+"GenereButton","btn btn-light")});

      // Initial play button
      for(let i = 0; i < this.resultList.length; i++ ) {
        this.playButtonMap.set("playButton-" + this.resultList[i].trackId, ["play", new Audio(this.resultList[i].previewUrl)]);
      }

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
    playButtonHandler(playButtonIndex){
      if (this.playButtonMap.get("playButton-" + playButtonIndex)[0] == "play") {
        this.playButtonMap = new Map(this.playButtonMap.set("playButton-" + playButtonIndex,["stop", this.playButtonMap.get("playButton-" + playButtonIndex)[1]]));
        this.playButtonMap.get("playButton-" + playButtonIndex)[1].play();
      } else {
        this.playButtonMap = new Map(this.playButtonMap.set("playButton-" + playButtonIndex,["play",this.playButtonMap.get("playButton-" + playButtonIndex)[1]]));
        this.playButtonMap.get("playButton-" + playButtonIndex)[1].pause();
      }
    },
    async collectionSongsPopupHandler(collectionId){
      await axios
      .get('https://cors-anywhere.herokuapp.com/itunes.apple.com/lookup?id=' + collectionId + '&entity=song')
      .then(response => (this.songs = response));
      this.collectionName = this.songs.data.results[0].collectionName;
      this.songsList = this.songs.data.results;
      console.log(this.songsList);
    }
  }
})

