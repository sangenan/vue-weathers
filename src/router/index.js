import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import test from '../views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
