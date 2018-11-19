import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    count: 0,
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
    user: {}
  },
  mutations: {
    increment(state) {
      state.count++
    },
    loadUser(state){
      $.post(
        state.apiurl,
        {
          action: 'getUserInfo'
        },
        data => {
          if (data) {
           // console.log(state);
            state.user = data;
          }
        },
        "json"
      );
    }
  }
})




