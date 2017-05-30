<template>
<div class="container">
      <form v-if="moviepanel">
        <div class="input-field">
          <input id="search" type="search" required placeholder="Search for a Movie" v-model="search" @keyup="getshows()" @keyup.enter="getshows()">
          <input type="text" style="display:none;">
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
      <app-movielist :movielist="movielist" v-if="moviepanel" v-on:showmovieinfo="showmoviedetail($event)"></app-movielist>
      </transition>
      <transition name="fade">
      <app-moviedetail :moviedetail="moviedetail" v-if="moviedetailpanel" v-on:goback="backmovie()"></app-moviedetail>
      </transition
      </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import movielistcomponent from './movielistcomponent.vue'
import moviedetailcomponent from './moviedetailcomponent.vue'

Vue.use(VueAxios, axios)


export default{
    components:{
      'app-movielist': movielistcomponent,
      'app-moviedetail': moviedetailcomponent
    },
    data() {
        return{
            movielist: [],
            moviedetail:[],
            moviedetailpanel: false,
            moviepanel: true,
            search: ''
        }
    },
    methods: {
        getshows() {
          
          if (this.search.length > 1){
          Vue.axios.get("https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query=" + this.search)
          .then(response =>{
          this.movielist = response.data;
        })}},
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