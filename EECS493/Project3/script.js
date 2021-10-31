new Vue({
  el: '#app',
  data () {
    return {
      tabNum:0,
      info: null,
      searchValue:'',
      artistNum: 0,
      resultList:[],
      buttonNum:0,
    }
  },
  methods:{
    async searchHandler() {
      console.log(this.searchValue);
      await axios
      .get('https://itunes.apple.com/search?term=' + this.searchValue + '.')
      .then(response => (this.info = response));
      console.log(this.info)
      if(this.info.data.resultCount == 0) {
        this.artistNum = 0;
        // alert("No artist found");
      } else {
        this.artistNum = this.info.data.resultCount;
        this.resultList = this.info.data.results;
      }
    },

    filterButtonHandler(buttonIndex){
      console.log(this.resultList[0].primaryGenreName)
      if(buttonIndex == 1) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "New Age")};
      if(buttonIndex == 2) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "Hip-Hop/Rap")};
      if(buttonIndex == 3) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "Pop")};
      if(buttonIndex == 4) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "Alternative")};
      if(buttonIndex == 5) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "Electronic")};
      if(buttonIndex == 6) {this.resultList = (this.resultList).filter(item => item.primaryGenreName == "Dance")};

    },
  },
})

