<template>
<div class="container">
      <form v-if="moviepanel">
        <div class="input-field">
          <input id="search" type="search" required placeholder="Search for a Movie" v-model="search" @keyup="getshows()">
          
        </div>
      </form>
      <div class="row center-align" v-if="moviepanel">
        <span @click="getshowsbygenre(28)"class="chip">Action</span>
        <span @click="getshowsbygenre(12)"class="chip">Adventure</span>
        <span @click="getshowsbygenre(16)"class="chip">Animation</span>
        <span @click="getshowsbygenre(35)"class="chip">Comedy</span>
        <span @click="getshowsbygenre(80)"class="chip">Crime</span>
        <span @click="getshowsbygenre(99)"class="chip">Documentary</span>
        <span @click="getshowsbygenre(14)"class="chip">Fantasy</span>
        <span @click="getshowsbygenre(27)"class="chip">Horror</span>
        <span @click="getshowsbygenre(10402)"class="chip">Music</span>
        <span @click="getshowsbygenre(53)"class="chip">Thriller</span>
        <span @click="getshowsbygenre(878)"class="chip">Sci Fi</span>
        <span @click="getshowsbygenre(37)"class="chip">Western</span>
      </div>
      <transition name="fade">
      <div class="row" v-if="moviepanel">
        <div class="col s12 m3" v-for="movie in movielist.results">
          <div class="card blue-grey darken-1">
            <div class="card-image card-imagemain" @click="showmoviedetail(movie.id)">
              <img class="responsive-img" :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path">
              <span class="card-title">{{movie.title}}</span>
            </div>
            <span class="card-rating">{{movie.vote_average}}</span>
            <div class="card-content center-align">         
            </div>
          </div>
        </div>
      </div>
      </transition>
      <div class="row" v-if="moviedetailpanel">
        <div class="col s12 m12">
        <a @click="backmovie()" class="waves-effect waves-light btn-large">Back</a>
          <div class="card grey darken-4">
            <div class="card-image">
              <img class="backimg" :src="'https://image.tmdb.org/t/p/w1000/' + moviedetail.backdrop_path">
              <span class="card-title">{{moviedetail.overview}}</span>
            </div>
            <div class="card-overview center-align">
              <p>"{{moviedetail.title}}"</p>
            </div>
            <div class="center-align">
              <a class="card-textblocks" >Runtime: {{moviedetail.runtime}} min</a>
              <a class="card-textblocks" >Release Date: {{moviedetail.release_date}}</a>
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
            search: ''
        }
    },
    methods: {
        getshows() {
          Vue.axios.get("https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query=" + this.search + "&page=" + this.page)
          .then(response =>{
          this.movielist = response.data;
        })},
        getshowsbygenre(gid) {
          Vue.axios.get("https://api.themoviedb.org/3/genre/" + gid + "/movies?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&include_adult=false&sort_by=created_at.asc")
          .then(response =>{
          this.movielist = response.data;
        })},
        showmoviedetail(id){
          this.moviepanel = false
          Vue.axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US")
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
{