<template>
  <div class="form">
    <h4 class="text-center">Выберите поля, которые хотите отображать на сайте</h4>


  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webCh5",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      object: {},
      form: {},
      upd: false,
      required: {}
    };
  },
  created() {

  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
 

    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }


      // $.post(
      //   this.$root.apiurl,
      //   {
      //     action: "setWebchessPrLang",
      //     id: this.object_id,
      //     lang: lang
      //   },
      //   data => {
      //     if (data) {
      //       console.log(data);
      //     }
      //   },
      //   "json"
      // );

      //   this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
</style>
