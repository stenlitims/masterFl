import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    apiurl: 'https://test.flatris.com.ua/assets/api/api.php',
    mainurl: 'https://test.flatris.com.ua',
    user: {},
    users: null,
    tariff: {},
    account: {},
    api: {
      login: null,
      key: null,
      json: null,
      update: null,
    },
    myObjects: null,
    permissions: {
      web: [],
      mirkvartir: []
    },
    changes: {
      count: []
    },
  },
  mutations: {
    getTarifPlan(state) {
      $.post(
        state.apiurl, {
          action: "getTarifPlan"
        },
        data => {
          if (data.tariff) {
            state.tariff = data.tariff;
            state.account = data.account;
          }
        },
        "json"
      );
    },
    getApi(state) {
      $.post(
        state.apiurl, {
          action: "getApiKey"
        },
        data => {
          if (data) {
            state.api = data;
          }
        },
        "json"
      );
    },
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
    getUsers(state) {
      $.post(
        state.apiurl, {
          action: 'getUsers'
        },
        data => {
          if (data) {
            state.users = data;
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
