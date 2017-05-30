<template>
<div class="container">
      <transition name="fade">
      <app-movielist :movielist="movielist" v-if="moviepanel" v-on:showmovieinfo="showmoviedetail($event)"></app-movielist>
      </transition>
      <ul class="pagination center-align" v-if="moviepanel">
        <li ><a class="btn-large" @click="changepageback()">Go Left</a></li>
        <li ><a class="btn-large" @click="changepagenext()">Go Right</a></li>
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
        Vue.axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=' + this.page)
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
body{
  background: #212121;
}

.card-imagemain{
  width: 250px;
  height: 300px;
  margin-bottom: 20px;
}
.card-title{
  background-color:rgba(38,50,56 ,.6);
  color: white;
}
.card-overview{
  color: white;
  margin: 0 auto 1.8rem auto;
  max-width: 500px;

}
.card-rating {
  background: #c62828;
  border-radius: 50%;
  color: white;
  display: inline-block;
  font-weight: 700;
  line-height: 2.75em;
  position: absolute;
  right: .5em;
  text-align: center;
  top: .5em;
  width: 2.75em;
}
.card-textblocks {
  border: .15em solid #4FC3F7;
  border-radius: 0.25em;
  color: #4FC3F7;
  display: inline-block;
  font-weight: 700;
  padding: .5em 4em;
  text-decoration: none;
  transition: .15s all ease-in-out;
}
.chip{
  margin-top: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>


