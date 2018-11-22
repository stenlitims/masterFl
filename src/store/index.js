import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
    user: {},
    myObjects: null,
    changes:{
      count: []
    },
  },
  mutations: {
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
    },
    loadMyObjects(state, payload){
    //  console.log(payload);
      $.post(
        state.apiurl,
        {
          action: 'getObjects',
          type: payload
        },
        data => {
          if (data) {
           // console.log(state);
            state.myObjects = data;
          }
        },
        "json"
      );
    },
    setChanges(state, payload){
      state.changes = payload;
    }
  }
})




