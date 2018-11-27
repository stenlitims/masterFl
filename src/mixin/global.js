export default {
  data() {
    return {}
  },

  methods: {
    perObjects(ut = 'web') {

      let per = this.$store.state.permissions[ut];
      let data = [];

      for (let item of per) {
        if (item.parent == "#") {
          let obj = this.$store.state.myObjects[item.permissions.object_id];
          obj.selected = item.state.selected;
          obj.object_id = item.permissions.object_id;
          data.push(obj);
        }
      }

      return data;

    },

    offPermissions(ut, id){

    },

    deleteObject(id) {

      if (!id) return;


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
          this.$store.state.apiurl, {
            action: 'deleteObject',
            id: id
          },
          data => {
            if (data.type == 'success') {
              swal.close();
              this.$store.commit("loadMyObjects");
            }
          },
          "json"
        );
      }).catch(swal.noop);

    }
  }
}
