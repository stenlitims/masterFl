<template>
<div class="save-panel master-footer">
  <div class="container">
    <div class="l">
      <button class="btn btn-or btn-md waves-effect" @click="save">Сохранить</button>
      <button class="btn btn-line btn-md waves-effect" @click="cancel">Отменить</button>
      <div class="title">Вы внесли {{count}} изменение.</div>
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
    }
  },
  methods: {
    cancel() {
      this.$store.commit("setChanges", {
        count: []
      });
    },
    save(){
      this.$bus.emit(this.$route.params.id, 'test');
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
