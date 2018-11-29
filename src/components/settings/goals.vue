<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Цели компании и планы продаж</h3>
      <div class="form-group">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "goals",
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
