<template>
  <div class="form">

    <div class="text-center img">
      <img src="https://test.flatris.com.ua/assets/panel/img/wedding.png" alt="">
    </div>
    <div class="text-inner text-center">
      <p>Поздравляем! Вы успешно добавили новый объект.</p>
      <p>Посмотреть созданную шахматку можно <a href="#">тут</a>  или на странице <a href="#">Объекты</a> </p>
    </div>

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

<style lang="scss" scoped>
  .img{
    margin-bottom: 30px;
    img{
      max-width: 180px;
    }
  }
</style>
