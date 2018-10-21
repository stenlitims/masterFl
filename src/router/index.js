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
      path: '/new_amo/:id',
      name: 'new_amo',
      component: Master,
    }, {
      path: '/new_mirkv/:id',
      name: 'new_mirkv',
      component: Master,
    }, {
      path: '/new_webchess/:id',
      name: 'new_webchess',
      component: Master,
    }, {
      path: '/new_agent/:id',
      name: 'new_agent',
      component: Master,
    }
  ]
})
