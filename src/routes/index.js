import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import movies from '../components/movies.vue'
import tvshows from '../components/tvshows.vue'
import upcomingmovies from '../components/upcomingmovies.vue'
import onairtvshows from '../components/onairtvshows.vue'
import nav from '../components/nav.vue'

export default new Router ({
    mode: 'history',
    routes: [
        {path: '/',component: nav},
        {path: '/movies',component: movies},
        {path: '/populartvshows',component: tvshows},
        {path: '/upcomingmovies',component: upcomingmovies},
        {path: '/onairtvshows',component: onairtvshows}


    ]
})