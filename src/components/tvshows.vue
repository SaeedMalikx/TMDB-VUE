<template>
<div class="container">
      <transition name="fade">
      <app-showlist :movielist="movielist" v-if="moviepanel" v-on:showmovieinfo="showmoviedetail($event)"></app-showlist>
      </transition>
      <ul class="pagination center-align" v-if="moviepanel">
        <li class="active"><a @click="changepageback()">LEFT</a></li>
        <li class="active"><a @click="changepagenext()">RIGHT</a></li>
     </ul>
      <transition name="fade">
      <app-showdetail :moviedetail="moviedetail" v-if="moviedetailpanel" v-on:goback="backmovie()"></app-showdetail>
      </transition>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import tvlistcomponent from './tvlistcomponent.vue'
import tvdetailcomponent from './tvdetailcomponent.vue'
 
Vue.use(VueAxios, axios)


export default{
    components: {
      'app-showlist': tvlistcomponent,
      'app-showdetail': tvdetailcomponent
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
        Vue.axios.get('https://api.themoviedb.org/3/tv/popular?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=' + this.page)
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