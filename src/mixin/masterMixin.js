export default {
  props: ["steps", "step", "object_id", "namep"],
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
    this.clearChenge();
    this.$bus.on(this.steps[this.step].comp, this.send);
    this.$bus.on('saveForm', this.save);
  },

  beforeDestroy() {
    this.$bus.off(this.steps[this.step].comp, this.send);
    this.$bus.off('saveForm', this.save);
  },

  updated() {
   this.errorUpd();
  },
  mounted() {
    $(document).on('change keypress keydown', ".form input, .form select", () => {
      this.formChange = true;
      window.formChange = true;
    });
  },
  watch: {

  },
  methods: {
    errorUpd(){
      this.findError();
      this.$emit("btnActive", !this.error.length);
    },
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
   
    isPhone(phone) {
   //   let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      let pattern = /^\+?(?=.*\d)[\d ]+$/;
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
            //  return data;
          }
        },
        "json"
      );
    }
  }
}
