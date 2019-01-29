<template>
  <div class="save-panel master-footer">
    <div class="container">
      <div class="l">
        <div v-if="!prop">
          <button class="btn btn-or btn-md waves-effect" @click="save">Сохранить</button>
          <button class="btn btn-line btn-md waves-effect" @click="cancel">Отменить</button>
        </div>

        <div v-if="prop == 'users'">
          <button class="btn btn-or btn-md waves-effect" @click="editUsers">Редактировать</button>
          <button class="btn btn-line btn-md waves-effect" @click="removeUser(ids)">Удалить</button>
        </div>

        <div class="title">{{mtitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "savePanel",
  props: ["prop", "title", "cont", "ids"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    $("#app").addClass("bottom-panel");
  },
  beforeDestroy() {
    $("#app").removeClass("bottom-panel");
  },
  computed: {
    count() {
      return this.$store.state.changes.count.length;
    },
    mtitle() {
      if (this.title) {
        return this.title;
      } else {
        return "Вы внесли " + this.count + " изменение.";
      }
    }
  },
  methods: {
    removeUser(ids) {
      if (!ids) return;
      (async () => {
        const { value: removeUser } = await swal({
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

        if (removeUser) {
          $.post(
            this.$store.state.apiurl,
            {
              action: "removeUser",
              ids: ids
            },
            data => {
              if (data.type == "success") {
                this.$store.commit("getUsers");
                this.$emit("userIds", []);
                swal.close();
              }
            },
            "json"
          );
        }
      })();
    },

    cancel() {
      this.$store.commit("setChanges", {
        count: []
      });
    },
    save() {
      this.$bus.emit(this.$route.params.id, "test");
    },
    del() {
      this.$bus.emit(this.$route.params.id, this.prop);
    },
    editUsers() {
      this.$store.commit("loadRmodal", {
        type: "editUser",
        title: "Редактирование"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.l {
  display: flex;
  align-items: center;
  .btn-or {
    margin-right: 30px;
  }
  .title {
    margin-left: 30px;
  }
}
</style>
