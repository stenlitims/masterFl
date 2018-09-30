<template>
  <div class="form">
    <h3 class="text-center">Настройка виджета</h3>
    <div class="text-inner text-center">
      <p>Перед переходом на следующий шаг скопируйте и вставьте Логин и Ключ API в поля настройки виджета FLATRIS в панели amoCRM.</p>
      <p>При включении виджета данные будут синхронизированы автоматически.</p>
    </div>
    <form action="">
        <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Логин FLATRIS</label>
            <input type="email" class="form-control" placeholder="info@flatris.com.ua"  v-model="form.email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Ключ API FLATRIS</label>
            <input type="text" class="form-control"  v-model="form.key">
          </div>
        </div>

      </div>
    </form>
   

  </div>
</template>

<script>
export default {
  name: "form1",
  props: ["steps", "step"],
  data() {
    return {
      // steps: []
      errors: [],
      success: false,
      form: {
        email: "info@flatris.com.ua",
        key: "a33226e855f072ad7ccfafb5d8f9e00413db198a"
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
