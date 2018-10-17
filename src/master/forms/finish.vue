<template>
<div class="finish-wrap">
<div class="form">

    <div class="text-center img">
      <img src="https://test.flatris.com.ua/assets/panel/img/wedding.png" alt="">
    </div>
    <div class="text-inner text-center" v-html="finishTxt">
    </div>
    <div class="text-center">
      <a href="#" class="btn-line btn-md waves-effect">Перейти на главную страницу</a>
    </div>

  </div>
</div>
  
</template>

<script>
export default {
  name: "finish",
  props: ["finishTxt"],
  data() {
    return {
    };
  },
  created() {},
  updated() {},
  methods: {
    finish() {
      let data = {};
      data["master"] = this.namep;
      data["steps"] = this.steps;
      data["step"] = this.step;

      $.post(
        this.$root.apiurl,
        {
          action: "setState",
          finish: 1,
          data: data
        },
        data => {
          //console.log(data);
          if (data.type == "success") {
            this.hideModal();
          }
        },
        "json"
      );
    },
    send(w) {
      if (w == "prev") {
        this.$emit("footerBtn", w);
        return;
      }
      console.log("finish");
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  margin-bottom: 30px;
  img {
    max-width: 180px;
  }
}
.finish-wrap{
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}
</style>
