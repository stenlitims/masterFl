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
    $(document).on('change keypress keydown', ".form input, .form select", () => {
      this.formChange = true;
    });
  },
  watch: {

  },
  methods: {
    findError() {
      this.error = [];
      for (let item in this.required) {
        if (!this.form[item]) {
          this.error.push(item);
        }
        if(this.required[item] == 'email' && !this.isAddress(this.form[item])){
          this.error.push(item);
        }
        if(this.required[item] == 'phone' && !this.isPhone(this.form[item])){
          this.error.push(item);
        }
      }
    },
    isAddress(email) {
      let pattern = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
      if (pattern.test(email)) {
        return true;
      }
      return false;
    },
    isPhone(phone) {
      let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (pattern.test(phone)) {
        return true;
      }
      return false;
    },
    post(input){
      $.post(
        this.$root.apiurl,
        input,
        data => {
          if (data) {
              return data;
          }
        },
        "json"
      );
    }
  }
}
