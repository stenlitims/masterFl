<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Отчеты</h3>
    </div>



  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "reports",
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
