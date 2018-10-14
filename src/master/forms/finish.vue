<template>
  <div class="form">

    <div class="text-center img">
      <img src="https://test.flatris.com.ua/assets/panel/img/wedding.png" alt="">
    </div>
    <div class="text-inner text-center" v-html="finish">
    </div>

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "finish",
  mixins: [masterMixin],
  props: ["finish"],
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

<style lang="scss" scoped>
  .img{
    margin-bottom: 30px;
    img{
      max-width: 180px;
    }
  }
</style>
