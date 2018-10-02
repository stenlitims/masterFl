export default {
  props: ["steps", "step", "object_id"],
  data() {
    return {
      errors: [],
      success: false,
      error: [],
      errorsSer: [],
      dataLoad: false
    }
  },
  created() {
   // console.log('MixinMaster');
  },

  updated() {
    this.findError();
    this.$emit("btnActive", !this.error.length);
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
