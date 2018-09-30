import Vue from 'vue'
import Router from 'vue-router'
import Master from '@/components/master'



Vue.use(Router)

export default new Router({
  routes: [{
    path: '/object/:id',
    name: 'object',
    component: Master,
  }, {
    path: '/amo/:id',
    name: 'amo',
    component: Master,
  }]
})
