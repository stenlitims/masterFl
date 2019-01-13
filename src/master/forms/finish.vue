<template>
  <div class="finish-wrap">
    <div class="form">
      <div class="text-center img">
        <img src="https://test.flatris.com.ua/assets/panel/img/wedding.png" alt>
      </div>
      <div class="text-inner text-center" v-html="finishTxt"></div>
      <div class="text-center">
        <a
          href="#"
          @click.prevent="finish"
          class="btn-line btn-md waves-effect"
        >Перейти на главную страницу</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "finish",
  props: ["finishTxt", "steps", "step", "object_id", "namep"],
  data() {
    return {};
  },
  created() {},
  updated() {},
  mounted() {
    console.log(this.$route);
  },
  methods: {
    finish() {
      let data = {};
      data["master"] = this.namep;
      //    data["steps"] = this.steps;
      //   data["step"] = this.step;

      $.post(
        this.$store.state.apiurl,
        {
          action: "setState",
          finish: 1,
          data: data
        },
        data => {
          if (data.type == "success") {
            $(".page-master").removeClass("active");
            this.$emit("clearData", true);
            setTimeout(() => {
              let nameRoute = "MainPage";
              if (this.$route.name == "new_object") {
                nameRoute = "myObjects";
              }
              this.$router.push({ name: nameRoute });
            }, 300);
          }
        },
        "json"
      );

      if (this.object_id) {
        $.post(
          this.$store.state.apiurl,
          {
            action: "setObjectActive",
            id: this.object_id
          },
          data => {
            if (data.type == "success") {
            }
          },
          "json"
        );
      }
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
.finish-wrap {
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}
</style>
