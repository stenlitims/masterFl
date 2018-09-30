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
export default {
  name: "form1",
  props: ["steps", "step"],
  data() {
    return {
      errors: [],
      success: false,
      form: {
        email: "",
        key: ""
      },
      required: {
        email: "",
        key: "",
      },
      error: []
    };
  },
  created() {
    this.$emit("eventChild", true);
  },
  updated() {
    this.error = [];
    for (let item in this.required) {
      //  console.log(item);

      if (this.form[item] == "") {
        this.error.push(item);
      }
    }
    this.$emit("eventChild", !this.error.length);
  },
  methods: {
    send() {
      console.log(this.form);

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Требуется указать имя.");
      }
      if (!this.form.adress) {
        this.errors.push("Требуется указать адресс.");
      }

      if (!this.errors.length) {
        this.$emit("eventChild", true);
        this.success = true;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
