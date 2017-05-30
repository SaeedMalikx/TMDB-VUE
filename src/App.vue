<template>
  <div id="app">
      <nav>
    <div class="nav-wrapper">
      <router-link to="/"><a href="#" class="brand-logo">UPENT</a></router-link>
      <ul id="nav" class="right">
        <li><router-link to="/movies"><a class="nav-item is-tab ">Popular Movies</a></router-link></li>
        <li><router-link to="/populartvshows"><a class="nav-item is-tab ">Popular Shows</a></router-link></li>
        <li><router-link to="/upcomingmovies"><a class="nav-item is-tab ">Upcoming Movies</a></router-link></li>
        <li><router-link to="/onairtvshows"><a class="nav-item is-tab ">Tonights TV</a></router-link></li>
      </ul>
    </div>
  </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
