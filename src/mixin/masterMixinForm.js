export default {
  data() {
    return {
      success: false,
      form: {

      },
    }
  },
  created() {
    this.$bus.on("formData", this.setData);
  },

  beforeDestroy() {
    this.$bus.off("formData", this.setData);
  },
  watch: {

  },
  methods: {
    setData(data) {
      this.form = data;
    },
    sendData() {
      $.post(
        this.$root.apiurl, {
          action: this.action,
          id: this.form.id,
          data: this.form
        },
        data => {
          if (data.type == 'success') {
            this.success = true;
            this.form.complete = true;
            this.$bus.emit("completeForm", this.form.id);
            setTimeout(() => {
              this.success = false;

            }, 2000);
          }
        },
        "json"
      );
    }
  }
}
