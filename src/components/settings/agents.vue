<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Подключение агентств недвижимости</h3>

      <div class="form-group">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="list-settings" v-if="countObjects">
      <div class="item control-wrap">
        <div class="c-title">Мир квартир</div>
        <div class="c-btns" v-if="mirkv">
          <router-link
            :to="{ name: 'new_mirkv', params: { id: 1 }}"
            class="btn btn-outline-primary waves-effect"
          >Редактировать</router-link>
          <button
            @click="OffPermissions(null, 'mirkvartir')"
            class="btn btn-outline-primary2 waves-effect"
          >Отключить</button>
        </div>
        <div class="c-btns" v-else>
          <router-link
            :to="{ name: 'new_mirkv', params: { id: 1 }}"
            class="btn btn-or waves-effect"
          >РАЗМЕСТИТЬ</router-link>
        </div>
      </div>
    </div>

    <noObjedcts v-else></noObjedcts>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "agents",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null
    };
  },

  created() {
    if (!this.$store.state.permissions.mirkvartir.length) {
      this.$store.commit("loadPermissions", "mirkvartir");
    }
  },

  mounted() {},
  computed: {
    mirkv() {
      let data = [];
      for (let item of this.$store.state.permissions.mirkvartir) {
        if (item.state.selected) {
          data.push(item.permissions.object_id);
        }
      }
      return data.length;
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
