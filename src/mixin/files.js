export default {
  data() {
    return {
    }
  },

  methods: {
    delFile(field, callback) {
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
              callback();
              swal.close();
              $("#" + field).val("");
            }
          },
          "json"
        );
      }).catch(swal.noop);
    }
  }
}
