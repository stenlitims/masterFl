export default {
  props: ["form"],
  data() {
    return {
      success: false,
      loader: false,
    }
  },
  watch: {

  },
  computed: {
    countOb() {
      if (this.form.ol_objects) {
        let data = JSON.parse(this.form.ol_objects);
        return 'Отмечено - ' + data.length;
      } else {
        return 'Отмечено - 0';
      }
    },
    mobClass() {
      if (this.$root.isMobile) {
        return {
          'wrap-eform': true,
          'c-sc': true
        };
      } else {
        return {};
      }
    }
  },
  methods: {
    openOL() {
      this.$bus.emit("editallPlan", true);
    },

    sendDataFile() {
      let form_data = new FormData();
      if ($("#img").length) {
        if ($("#img")[0].files.length) {
          form_data.append("n_img", $("#img")[0].files[0]);
        }
      }

      form_data.append("action", this.action);

      for (let item in this.form) {
        if (this.form[item]) form_data.append(item, this.form[item]);
      }

      this.loader = true;

      $.ajax({
        url: this.$root.apiurl,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: "POST",
        success: data => {
          if (data) {
            this.success = true;
            this.form.complete = true;
            this.loader = false;
            if (data.img) this.form.img = data.img;
            setTimeout(() => {
              this.success = false;
            }, 2000);
          }
        }
      });
    },

    addComplete(id){
     // $('[data-id='+id+']').addClass('complete');
     
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
