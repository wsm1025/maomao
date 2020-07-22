import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from './movie'
import CinemaRouter from './cinema'
import MineRouter from './mine'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
	  MovieRouter,
	  CinemaRouter,
	  MineRouter,
	  {
		  path:'/*',
		  redirect:'/movie/nowplaying'
	  }
  ]
})

export default router
