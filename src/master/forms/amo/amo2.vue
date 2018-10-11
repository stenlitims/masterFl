<template>
  <div class="form">
    <h3 class="text-center">Синхронизация с AmoCRM</h3>

      <div class="amo-status text-center">
        Статус подключения: <span class="success">ПОДКЛЮЧЕНО</span> 
      </div>
    
    <div class="text-inner text-center">
      <p><b>Примечание:</b> после каждого изменения в конфигурации amoCRM: добавление новых менеджеров, редактирование статусов или воронок - необходимо обязательно "обновлять данные" для синхронизации AmoCRM с FLATRIS</p>

      <button class="btn-default btn-md waves-effect waves-light">ОБНОВИТЬ ДАННЫЕ</button>
    </div>

   

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
export default {
  name: "amo2",
  mixins: [masterMixin],
  data() {
    return {
      form: {},
      required: {}
    };
  },
  created() {},
  updated() {},
  methods: {
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
</style>
