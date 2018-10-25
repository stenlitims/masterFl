// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './App'
import router from './router'

Vue.use(VueBus);


Vue.config.productionTip = false


/* eslint-disable no-new */
APP = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  data: {
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
  },
  computed: {
    isMobile() {
      if($(window).width() < 991){
        return true;
      }
      return false;
    }
  },
  template: '<App/>'
});



let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
