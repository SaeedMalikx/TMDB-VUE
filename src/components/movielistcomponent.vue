<template>
<div class="row" >
      <div class="col s12 m3" v-for="movie in movielist.results">
          <div class="card blue-grey darken-1">
            <div class="card-image card-imagemain" @click="showmovieinfo(movie.id)">
              <img class="responsive-img" :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path" v-if="movie.poster_path">
              <span class="card-title">{{movie.title}}</span>
            </div>
            <span class="card-rating">{{movie.vote_average}}</span>
            <div class="card-content center-align">         
            </div>
          </div>
        </div>
</div>
</template>


<script>
export default {
  props: ['movielist'],
  data () {
    return { 
      
    }
  },
  methods: {
    showmovieinfo(id){
        this.$emit('showmovieinfo', id)
    }
  }
}
</script>
