<template>
  <div class="form">
    финиш

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "finish",
  mixins: [masterMixin],
  data() {
    return {
      form: {

      },
      required: {
      }
    };
  },
  created() {
  },
  updated() {},
  methods: {
  send(w){
    if (w == "prev") {
      this.$emit("footerBtn", w);
      return;
    }
    console.log('finish');
  }
  }
};
</script>

<style lang="scss">

</style>
