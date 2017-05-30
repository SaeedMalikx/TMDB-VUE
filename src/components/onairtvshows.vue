<template>
<div class="container">
      <div class="row" v-if="moviepanel">
        <div class="col s12 m3" v-for="movie in movielist.results">
          <div class="card blue-grey darken-1">
            <div class="card-image card-imagemain" @click="showmoviedetail(movie.id)">
              <img class="responsive-img" :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path">
              <span class="card-title">{{movie.name}}</span>
            </div>
            <span class="card-rating">{{movie.vote_average}}</span>
            <div class="card-content center-align">         
            </div>
          </div>
        </div>
      </div>
      <ul class="pagination center-align" v-if="moviepanel">
        <li class="active"><a @click="changepageback()">LEFT</a></li>
        <li class="active"><a @click="changepagenext()">RIGHT</a></li>
     </ul>
      <div class="row" v-if="moviedetailpanel">
        <div class="col s12 m12">
        <a @click="backmovie()" class="waves-effect waves-light btn-large">Back</a>
          <div class="card grey darken-4">
            <div class="card-image">
              <img class="backimg" :src="'https://image.tmdb.org/t/p/w1000/' + moviedetail.backdrop_path">
              <span class="card-title">{{moviedetail.overview}}</span>
            </div>
             <div class="card-overview center-align">
              <p>{{moviedetail.name}}</p>
            </div>
            <div class="center-align">
              <a class="card-textblocks" >Duration: {{moviedetail.episode_run_time}} min</a>
              <a class="card-textblocks" >Seasons: {{moviedetail.number_of_seasons}} Ep: {{moviedetail.number_of_episodes}}</a>
              <a class="card-textblocks" >Release: {{moviedetail.first_air_date}}</a>
            </div>
          </div>
        </div>
      </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)


export default{
    data() {
        return{
            movielist: [],
            page: 1,
            moviedetail:[],
            moviedetailpanel: false,
            moviepanel: true,
        }
    },
    mounted(){
        this.getshows()
    },
    methods: {
        getshows() {
        Vue.axios.get('https://api.themoviedb.org/3/tv/airing_today?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=' + this.page)
      .then(response =>{
        this.movielist = response.data;
        })},
        changepagenext(){
          this.page++;
          this.getshows();
        },
        changepageback(){
          if (this.page > 1) {
              this.page--;
          }
          this.getshows();
        },
        showmoviedetail(id){
          this.moviepanel = false
          Vue.axios.get("https://api.themoviedb.org/3/tv/" + id + "?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US")
          .then(response =>{
            this.moviedetail = response.data;
            });
          this.moviedetailpanel = true
        },
        backmovie(){
          this.moviedetail=[]
          this.getshows();
          this.moviepanel = true
          this.moviedetailpanel = false

        }
    },
    
}
</script>


<style>

</style>