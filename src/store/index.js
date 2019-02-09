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
    myObjectsCMS: null,
    permissions: {
      web: [],
      clear: [],
      mirkvartir: [],
      cms: [],
    },
    userSettings: null,
    permissionsCMS: {},
    changes: {
      count: []
    },

    rmodal: {
      type: null
    },
    typeUsers: {
      "1": "Администратор",
      "2": "Руководитель",
      "3": "Менеджер",
      "4": "Партнер",
    }

  },
  mutations: {
    loadRmodal(state, payload) {
      state.rmodal = payload;
    },
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
            state.user.main = 1;
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
            if (payload == 'cms') {
              //     console.log(data);
              state.myObjectsCMS = data;
            } else {
              state.myObjects = data;
            }

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
          if (payload == 'web') {

            let data2 = [...data.data.permissions_tree];

            for (let item of data2) {
              item.state.selected = false;
              item.state.opened = false;
            }
            state.permissions.clear = data2;
          }
        },
        "JSON"
      );
    },
    loadPermissionsCMS(state, payload) {
      for (let item of payload) {
        //  console.log(item);
        $.get(
          state.mainurl + "/api?action=getUserPermissions&ut=cms&agent_id=" + item,
          data => {
            //  console.log(data);

            for (let it of data.data.permissions_tree) {
              it.state.opened = false;
            }
            state.permissionsCMS[item] = data.data.permissions_tree;
          },
          "JSON"
        );
      }

    },
    loadUserPermissions(state, payload = 'cms') {
      if (!payload) return;
      $.post(
        state.apiurl, {
          action: 'getPermissions',
          type: payload
        },
        data => {
          if (data) {
            // console.log(state);
            state.permissions[payload] = data;
          }
        },
        "json"
      );

    },

    loadUserSettings(state, payload) {
      if (!payload) return;
      $.post(
        state.apiurl, {
          action: 'getUserSettings',
          // type: payload
        },
        data => {
          if (data) {
            // console.log(state);
            state.userSettings = data;
          }
        },
        "json"
      );
    },


    setChanges(state, payload) {
      state.changes = payload;
    }
  }
})
