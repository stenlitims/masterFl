export default {
  props: ["form"],
  data() {
    return {
      success: false,
    }
  },
  watch: {

  },
  methods: {
    delFile(field) {
      if (!field) return;

      swal({
        title: "Удалить?",
        text: "Вы точно хотите удалить?",
        type: "error",
        showCancelButton: true,
        confirmButtonClass: "btn-warning",
        confirmButtonText: "Да, удалить",
        cancelButtonText: "Отмена",
        cancelButtonClass: "btn-md btn btn-secondary waves-effect",
        confirmButtonClass: "btn-danger btn-md waves-effect waves-light",
        showLoaderOnConfirm: true
      }).then(() => {
        $.post(
          this.$root.apiurl, {
            action: this.actionDel,
            file: this.form[field],
            field: field,
            id: this.form.id
          },
          data => {
            if (data) {
              this.form[field] = null;
              swal.close();
              $("#" + field).val("");
            }
          },
          "json"
        );
      });
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
