import Vue from 'vue'
import Router from 'vue-router'
import Master from '@/master/master.vue'
import MainPage from '@/components/mainPage.vue'



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      //  path: '/new_object/:oid/step/:id',
      path: '/new_object/:id',
      name: 'new_object',
      component: Master,
    }, {
      path: '/object/:oid/step/:id',
      name: 'object',
      component: Master,
    }, {
      path: '/amo/:id',
      name: 'amo',
      component: Master,
    }, {
      path: '/mirkv/:id',
      name: 'mirkv',
      component: Master,
    }, {
      path: '/webchess/:id',
      name: 'webchess',
      component: Master,
    }, {
      path: '/newagent/:id',
      name: 'newagent',
      component: Master,
    }
  ]
})
