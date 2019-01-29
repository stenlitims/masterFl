<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Шахматка для отдела продаж</h3>

    
    </div>

    <div class="list-settings" v-if="countObjects">
      <div class="item control-wrap">
        <div class="c-title">AmoCRM</div>
        <div class="c-btns">
          <router-link
            :to="{ name: 'new_amo', params: { id: 1 }}"
            class="btn btn-outline-primary waves-effect"
          >Редактировать</router-link>
          <button
            @click="OffPermissions(null, 'amocrm')"
            class="btn btn-outline-primary2 waves-effect"
          >Отключить</button>
        </div>
      </div>
    </div>

    <noObjedcts v-else></noObjedcts>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "crmS",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null
    };
  },

  created() {

  },

  mounted() {},
  computed: {
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
