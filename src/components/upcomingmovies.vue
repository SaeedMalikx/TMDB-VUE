<template>
<div class="container">
      <transition name="fade">
      <app-movielist :movielist="movielist" v-if="moviepanel" v-on:showmovieinfo="showmoviedetail($event)"></app-movielist>
      </transition>
      <ul class="pagination center-align" v-if="moviepanel">
        <li class="active"><a @click="changepageback()">LEFT</a></li>
        <li class="active"><a @click="changepagenext()">RIGHT</a></li>
     </ul>
     <transition name="fade">
      <app-moviedetail :moviedetail="moviedetail" v-if="moviedetailpanel" v-on:goback="backmovie()"></app-moviedetail>
      </transition>
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
        Vue.axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=' + this.page)
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


<style>

</style>