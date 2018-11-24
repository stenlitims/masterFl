import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
    user: {},
    myObjects: null,
    permissions: {
      web: []
    },
    changes: {
      count: []
    },
  },
  mutations: {
    loadUser(state) {
      $.post(
        state.apiurl, {
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
    loadMyObjects(state, payload) {
      //  console.log(payload);
      $.post(
        state.apiurl, {
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
    loadPermissions(state, payload = 'web') {
      $.get(
        state.mainurl + "/api?action=getUserPermissions&ut=" + payload,
        data => {
        //  console.log(data);
          state.permissions[payload] = data.data.permissions_tree;
        },
        "JSON"
      );
    },
    setChanges(state, payload) {
      state.changes = payload;
    }
  }
})
