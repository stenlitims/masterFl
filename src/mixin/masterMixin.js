export default {
  props: ["steps", "step", "object_id"],
  data() {
    return {
      errors: [],
      success: false,
      error: [],
      errorsSer: [],
      dataLoad: false,
      formChange: false,
    }
  },
  created() {
   // console.log('MixinMaster');
   this.$bus.on(this.steps[this.step].comp, this.send);
  },

  beforeDestroy() {
    this.$bus.off(this.steps[this.step].comp, this.send);
  },

  updated() {
    this.findError();
    this.$emit("btnActive", !this.error.length);
  },
  mounted() {
    $(document).on('change keypress', ".form input", () => {
      this.formChange = true;
    });
  },

  methods: {
    findError() {
      this.error = [];
      for (let item in this.required) {
        if (this.form[item] == "") {
          this.error.push(item);
        }
      }
    },
  }
}
