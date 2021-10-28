new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      searchValue:'',
      artist1: './img/1.jpg',
      artist2: './img/2.jpg',
    }
  },
  methods:{
    searchHandler() {
      axios
      .get('https://itunes.apple.com/search?term=' + self.searchValue + '.')
      .then(response => (this.info = response))
      console.log(this.info);
    }
  },
  mounted () {
    
  }
})

