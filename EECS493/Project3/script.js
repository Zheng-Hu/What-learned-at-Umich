new Vue({
  el: '#app',
  data () {
    return {
      btnAll:"btn btn-success",
      btnNewAge:"btn btn-light",
      btnRap:"btn btn-light",
      btnPop:"btn btn-light",
      btnAlternative:"btn btn-light",
      btnElectronic:"btn btn-light",
      btnDance:"btn btn-light",
      allModel:true,
      info: null,
      searchValue:'',
      initialList:[],
      resultList:[],
      cacheList:[],
      buttonNum:0,
    }
  },
  methods:{
    async searchHandler() {
      console.log(this.searchValue);
      this.initialList = [];
      this.resultList = [];
      await axios
      .get('https://itunes.apple.com/search?term=' + this.searchValue + '.')
      .then(response => (this.info = response));
      console.log(this.info)
      this.initialList = this.info.data.results;
      if (this.allModel) {
        this.resultList = this.info.data.results;
      } else {
        if (this.btnNewAge == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "New Age"));
        }
        if (this.btnRap == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Hip-Hop/Rap"));
        }
        if (this.btnPop == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Pop"));
        }
        if (this.btnAlternative == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Alternative"));
        }
        if (this.btnElectronic == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Electronic"));
        }
        if (this.btnDance == "btn btn-primary") {
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Dance"));
        }
      }

    },
    filterButtonHandler(buttonIndex){
      if(buttonIndex == 0) {
        if (this.btnAll == "btn btn-success"){
          this.btnAll = "btn light"
          this.allModel = false;
          this.resultList = [];
        } else{
          this.allModel = true;
          this.btnAll = "btn btn-success";
          this.btnNewAge = "btn btn-light";
          this.btnRap = "btn btn-light";
          this.btnPop = "btn btn-light";
          this.btnAlternative = "btn btn-light";
          this.btnElectronic = "btn btn-light";
          this.btnDance = "btn btn-light";
          this.resultList = this.initialList;
        }
      };
      if(buttonIndex == 1) {
        if (this.btnNewAge == "btn btn-primary"){
          this.btnNewAge = "btn light";
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "New Age");
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnNewAge = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "New Age"));
        }
      };
      if(buttonIndex == 2) {
        if(this.btnRap == "btn btn-primary"){
          this.btnRap = "btn light";
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "Hip-Hop/Rap");
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnRap = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Hip-Hop/Rap"));
        }
      };
      if(buttonIndex == 3) {
        if(this.btnPop == "btn btn-primary"){
          this.btnPop = "btn light"
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "Pop");
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnPop = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Pop"));
        }
      };
      if(buttonIndex == 4) {
        if(this.btnAlternative == "btn btn-primary"){
          this.btnAlternative = "btn light";
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "Alternative");
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnAlternative = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Alternative"));
        }
      };
      if(buttonIndex == 5) {
        if(this.btnElectronic == "btn btn-primary"){
          this.btnElectronic = "btn light";
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "Electronic");
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnElectronic = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Electronic"));
        }
      };
      if(buttonIndex == 6) {
        if(this.btnDance == "btn btn-primary"){
          this.btnDance = "btn light";
          this.resultList = (this.resultList).filter(item => item.primaryGenreName != "Dance")
        } else{
          if (this.allModel) {
            this.allModel = false;
            this.resultList = [];
            this.btnAll = "btn light";
          }
          this.btnDance = "btn btn-primary";
          this.resultList = (this.resultList).concat((this.initialList).filter(item => item.primaryGenreName == "Dance"));
          console.log("resultList: " + this.resultList);
        }
      };
    }
  }
})

