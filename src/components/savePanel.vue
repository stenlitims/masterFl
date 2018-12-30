<template>
  <div class="save-panel master-footer">
    <div class="container">
      <div class="l">
        <div v-if="!prop">
          <button class="btn btn-or btn-md waves-effect" @click="save">Сохранить</button>
          <button class="btn btn-line btn-md waves-effect" @click="cancel">Отменить</button>
        </div>

        <div v-if="prop == 'users'">
          <button class="btn btn-or btn-md waves-effect" @click="edit">Редактировать</button>
          <button class="btn btn-line btn-md waves-effect" @click="del">Удалить</button>
        </div>

        <div class="title">{{mtitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "savePanel",
  props: ["prop", "title", "cont"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
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
    edit() {
      this.$bus.emit(this.$route.params.id, this.prop);
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
