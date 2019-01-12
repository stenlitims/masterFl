<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Пользователи</h3>
      <div class="form-group">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>

      <button class="btn btn-lg btn-danger waves-effect" @click="addUser">Добавить пользователя</button>
    </div>

    <div class="table-responsive">
      <table class="table table-actions-bar users-table">
        <thead>
          <tr>
            <th></th>
            <th>ИМЯ</th>
            <th>ТИП ПОЛЬЗОВАТЕЛЯ</th>
            <th>ПРАВА ДОСТУПА К ОБЪЕКТАМ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in users" :key="i" :class="{'active': item.checked}">
            <td>
              <label class="cus-check">
                <input type="checkbox" @change="selectUs(item)" v-model="item.checked">
                <span class="ch"></span>
              </label>
            </td>
            <td v-if="item.fullname">{{item.fullname}}</td>
            <td v-else>{{item.email}}</td>
            <td></td>
            <td>{{names(item.per)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "users",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null,
      userIds: []
    };
  },

  beforeDestroy() {
    this.$emit("userIds", []);
  },

  created() {
    if (!this.$store.state.users) {
      this.$store.commit("getUsers");
    }
    if (!this.$store.state.permissions.cms.length) {
      this.$store.commit("loadUserPermissions", "cms");
    }
    if (!this.$store.state.myObjects) {
      this.$store.commit("loadMyObjects");
    }

    this.lodash.forEach(this.users, user => {
      user.checked = false;
    });
  },

  mounted() {},
  computed: {
    users() {
      let users = { ...this.$store.state.users };
      let permissions = { ...this.$store.state.permissions.cms };
      this.lodash.forEach(users, (user, key) => {
        user.per = [];
        user.per = this.lodash.filter(permissions, {
          agent_id: user.internalKey,
          object: "gproject"
        });
        if (this.$store.state.myObjects) {
          this.lodash.forEach(user.per, p => {
            p.name = this.$store.state.myObjects[p.gproject_id].name;
          });
        }

        // if (p) {
        //   user.per.push(p);
        // }
      });

      if (this.search) {
        users = this.lodash.filter(users, o => {
          return this.lodash.includes(
            o.fullname.toLowerCase(),
            this.search.toLowerCase()
          );
        });
      }

      // console.log(users);

      return users;
    }
  },
  methods: {
    addUser() {
      this.$store.commit("loadRmodal", {
        type: "addUser",
        title: "Добавление нового пользователя"
      });
    },
    names(item) {
      let names = [];
      this.lodash.forEach(item, p => {
        names.push(p.name);
      });
      return names.join(", ");
    },
    selectUs(item) {
      if (!this.userIds.includes(item.internalKey)) {
        this.userIds.push(item.internalKey);
      } else {
        let index = this.userIds.indexOf(item.internalKey);
        if (index > -1) {
          this.userIds.splice(index, 1);
        }
      }
      this.$emit("userIds", this.userIds);
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.users-table {
  .cus-check {
    margin-bottom: 0;
  }
  tr {
    transition: all 0.3s ease;
    &.active {
      background: rgb(227, 247, 243);
    }
  }
}
</style>
