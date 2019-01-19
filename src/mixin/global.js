export default {
  data() {
    return {
      changes: {
        count: []
      }
    }
  },


  computed:{
    countObjects() {
      //   return false;
      if (!this.$store.state.myObjects) {
        this.$store.commit("loadMyObjects", "test");
        return false;
      }
      if (typeof this.$store.state.myObjects == "object") {
        return Object.keys(this.$store.state.myObjects).length;
      } else {
        return false;
      }
    },
  },

  methods: {
    clearChenge() {
      this.$store.commit("setChanges", {
        count: []
      });
      this.changes.count = [];
    },
    saveOk(text = "Успешно сохранено!") {
      this.clearChenge();

      swal({
        showConfirmButton: false,
        timer: 2000,
        type: "success",
        title: text,
      }).catch(swal.noop);
    },


    mesError(text = "Ошибка!") {

      swal({
        showConfirmButton: false,
        timer: 2000,
        type: "error",
        title: text,
      }).catch(swal.noop);
    },
    confirm(data) {

    },

    closeRmodal() {
      this.$store.commit("loadRmodal", {
        type: null,
      });
    },

    setChanges(item, mod = null, original = null) {

      this.changes = this.$store.state.changes;

      if (mod == null && original == null) {
        if (!this.original || !this.form) return;
      //  if (!this.original[item]) return;
        original = this.original[item].trim();
        mod = this.form[item].trim();
      }

      if (original != mod) {
        if (!this.changes.count.includes(item)) this.changes.count.push(item)
      } else {
        let index = this.changes.count.indexOf(item);
        //   console.log(index);
        if (index > -1) {
          this.changes.count.splice(index, 1);
        }
      }
      // console.log(this.changes.count);

      this.$store.commit("setChanges", this.changes);

    },

    setChanges2(item) {
      this.changes = this.$store.state.changes;
      this.changes.count.push('test')
      this.$store.commit("setChanges", this.changes);
    },


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

    OffPermissions(id, ut = 'web') {
      // if (!id) return;

      (async () => {
        const {
          value: sw
        } = await swal({
          title: "Отключить?",
          text: "Вы точно хотите отключить?",
          type: "error",
          showCancelButton: true,
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Да, отключить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect"
        });

        if (sw) {
          let permissions = this.$store.state.permissions[ut];
          for (let item of permissions) {
            if (!id) {
              item.state.selected = false;
            } else {
              if (item.permissions.gproject_id == id) {
                item.state.selected = false;
              }
            }
          }

          if (!id) {
            this.setPermissions([], ut);
            return;
          }

          let f = this.lodash.filter(
            permissions,
            item => {
              return item.state.selected == true;
            }
          )


          // console.log(f);

          let data = [];
          f.forEach(item => {
            data.push(item.permissions);
          });

          //  console.log(data, ut);
          this.setPermissions(data, ut);
        }
      })();


    },

    setPermissions(permissions, ut = 'web', e = null) {
      $.ajax({
          url: this.$root.mainurl +
            "/api?action=updateUserPermissions&ut=" + ut,
          dataType: "json",
          data: {
            permissions_data: JSON.stringify(permissions)
          },
          method: "POST"
        })
        .done(response => {
          if (response.error) {
            swal("Ошибка!", response.error.message, "error");
          } else {
            if (e) {
              this.$emit("footerBtn", e);
            } else {
              this.saveOk('Успешно обновлено!');
            }
          }
        })
        .fail(function (jqXHR, textStatus) {
          console.log(jqXHR);
          swal("Ошибка!", jqXHR.responseText, "error");
        });
    },

    deleteObject(id) {

      if (!id) return;

      (async () => {
        const {
          value: removeObj
        } = await swal({
          title: "Удалить?",
          text: "Вы точно хотите удалить?",
          type: "error",
          showCancelButton: true,
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Да, удалить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect"
        });

        if (removeObj) {
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
        }
      })();

    },

    isGmailAddress(email) {
      let pattern = /^\w+([\.-]?\w+)*@gmail.com+$/;
      if (pattern.test(email)) {
        return true;
      }
      return false;
    },

    isAddress(email) {
      let pattern = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
      if (pattern.test(email)) {
        return true;
      }
      return false;
    },

    declension(num, expressions) {
      var result;
      var count = num % 100;
      if (count >= 5 && count <= 20) {
        result = expressions["2"];
      } else {
        count = count % 10;
        if (count == 1) {
          result = expressions["0"];
        } else if (count >= 2 && count <= 4) {
          result = expressions["1"];
        } else {
          result = expressions["2"];
        }
      }
      return result;
    }
  }
}
