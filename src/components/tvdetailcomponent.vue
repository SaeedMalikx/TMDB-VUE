<template>
 <div class="row">
        <div class="col s12 m12">
        <a @click="gobackmovie()" class="waves-effect waves-light btn-large">Back</a>
          <div class="card grey darken-4">
            <div class="card-image">
              <img class="backimg" :src="'https://image.tmdb.org/t/p/w1000/' + moviedetail.backdrop_path" v-if="moviedetail.backdrop_path">
              <span class="card-title">{{moviedetail.overview}}</span>
            </div>
             <div class="card-overview center-align">
              <h3>{{moviedetail.name}}</h3>
            </div>
            <div class="center-align">
              <a class="card-textblocks" >Duration: {{moviedetail.episode_run_time}} min</a>
              <a class="card-textblocks" >Seasons: {{moviedetail.number_of_seasons}} Ep: {{moviedetail.number_of_episodes}}</a>
              <a class="card-textblocks" >Release: {{moviedetail.first_air_date}}</a>
            </div>
          </div>
        </div>
      </div>
</template>


<script>
export default {
  props: ['moviedetail'],
  data () {
    return { 
      
    }
  },
  methods: {
    gobackmovie(){
        this.$emit('goback')
    }
  }
}
</script>