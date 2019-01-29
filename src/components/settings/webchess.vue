<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Интерактивный каталог квартир</h3>

      <div class="form-group" v-if="countObjects">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="list-settings" v-if="countObjects">
      <div class="item control-wrap" v-for="(item, i) in list" :key="i">
        <div class="c-title">{{item.name}}</div>
        <div class="c-btns" v-if="item.selected">
          <router-link
            :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
            class="btn btn-outline-primary waves-effect"
          >Редактировать</router-link>
          <button
            @click="OffPermissions(item.id)"
            class="btn btn-outline-primary2 waves-effect"
          >Отключить</button>
        </div>
        <div class="c-btns" v-else>
          <router-link
            :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
            class="btn btn-outline-primary waves-effect"
          >Создать</router-link>
        </div>
      </div>
    </div>

    <noObjedcts v-else></noObjedcts>
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

</style>
