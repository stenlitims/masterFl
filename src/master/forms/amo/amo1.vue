<template>
  <div class=" ">
    <h3 class="text-center">Подключение виджета</h3>
    <div class="">
        <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Логин FLATRIS</label>
            <input type="email" readonly="readonly"  class="form-control" placeholder="info@flatris.com.ua"  v-model="$store.state.api.login">
          </div>
          <div class="form-group">
            <label>Ключ API FLATRIS</label>
            <input type="text" readonly="readonly"  class="form-control"  v-model="$store.state.api.key">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="text-border">
            <p><b>Инструкция:</b></p>
            <ol>
              <li>Откройте AmoCRM и зайдите в раздел интеграции в настройках;</li>
              <li>Найдите виджет Flatris в общем списке и откройте его;</li>
              <li>Вставьте Логин Flatris и Ключ API Flatris в соответствующие поля в AmoCRM и нажмите кнопку установить;</li>
              <li>Нажмите кнопку "ПОДКЛЮЧИТЬ" после выполнения пункта 3.</li>
            </ol>
          </div>
        </div>

      </div>
      <div class="btns text-center form-group">
        <button class="btn btn-md waves-effect">ПОДКЛЮЧИТЬ</button>
      </div>

      <div v-if="errors.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errors" :key="i">
            {{item}}
          </p>
        </div>
      </div>
    </div>
   

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "amo1",
  mixins: [masterMixin],
  data() {
    return {
      connected: false,
      form: {
        api_login: "",
        api_key: "",
        active: ""
      },
      required: {
        active: ""
      }
    };
  },
  created() {
    if(!this.$store.state.api.login){
      this.$store.commit("getApi");
    }
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
   

    send(e) {
      this.errors = [];
      if (!this.connected) {
        this.errors.push("Не подключено");
        setTimeout(() => {
          this.errors = [];
        }, 1000);
        return;
      }

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
