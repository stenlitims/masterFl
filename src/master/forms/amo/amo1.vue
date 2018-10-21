<template>
  <div class="form">
    <h3 class="text-center">Подключение виджета</h3>
    <div class="text-inner text-center">
      <p>Скопируйте Логин Flatris и Ключ API Flatris и вставьте их в соответствующие поля виджета Flatris в личном кабинете AmoCRM.</p>
    </div>
    <div class="form">
        <div class="row">
        <div class="col-lg-12">
          <div class="form-group">
            <label>Логин FLATRIS</label>
            <input type="email" class="form-control" placeholder="info@flatris.com.ua"  v-model="form.api_login">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <label>Ключ API FLATRIS</label>
            <input type="text" class="form-control"  v-model="form.api_key">
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
    $.post(
      this.$root.apiurl,
      {
        action: "getApiKey"
      },
      data => {
        if (data) {
          this.form.api_login = data.api_login;
          this.form.api_key = data.api_key;
        }
      },
      "json"
    );
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    send(e) {
      this.errors = [];
      if(!this.connected){
        this.errors.push('Не подключено');
        setTimeout(()=>{
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
