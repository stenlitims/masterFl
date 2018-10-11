<template>
  <div class="form">
    <h4 class="text-center">Выберите объект(ы), которые хотите интегрировать с "Мир Квартир"</h4>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "mir1",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      form: {
      },
      required: {
      }
    };
  },
  created() {},
  updated() {},
  mounted(){
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
</style>
