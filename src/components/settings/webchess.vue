<template>
<div class="settings-right">

   <div class="settings-btns">
     <h3>Интерактивный каталог квартир</h3>

     <div class="form-group">
        <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
      </div>
    </div>

    <div class="list-settings">
      <div class="item control-wrap" v-for="(item, i) in list" :key="i">
          <div class="c-title">{{item.name}}</div>
          <div class="c-btns"  v-if="item.selected">
            <router-link  :to="{ name: 'webchess', params: { id: 1, oid: item.id }}" class="btn btn-outline-primary btn-md waves-effect">Редактировать</router-link>
            <button class="btn btn-outline-danger waves-effect">Отключить</button>
          </div>
          <div class="c-btns" v-else>
            <router-link  :to="{ name: 'webchess', params: { id: 1, oid: item.id }}" class="btn btn-outline-primary btn-md waves-effect">Создать</router-link>
          </div>
      </div>
    </div>
</div>
  
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "instWebchess",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null
    };
  },

  created() {
    if (!this.$store.state.myObjects) {
      this.$store.commit("loadMyObjects");
      
    }
    if (!this.$store.state.permissions.web.length) {
      this.$store.commit("loadPermissions", "web");
    }
  },

  mounted() {},
  computed: {
    list() {
      let data = this.perObjects("web");
      if (this.search) {
        data = this.lodash.filter(data, o => {
          return this.lodash.includes(
            o.name.toLowerCase(),
            this.search.toLowerCase()
          );
        });
      }
      return data;
    }
  },
  methods: {
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.settings-btns {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  .btn-group {
    //   margin-right: 30px;
  }
  .form-group {
    margin-bottom: 0;
  }
}
.list-settings {
  .c-btns {
    .btn {
      margin: 0 10px;
    }
  }
}
</style>
