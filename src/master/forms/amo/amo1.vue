<template>
  <div class="form">
    <h3 class="text-center">Подключение виджета</h3>
    <div class="text-inner text-center">
      <p>Скопируйте Логин Flatris и Ключ API Flatris и вставьте их в соответствующие поля виджета Flatris в личном кабинете AmoCRM.</p>
    </div>
    <div class="form">
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
      <div class="btns text-center">
        <button class="btn btn-md waves-effect">ПОДКЛЮЧИТЬ</button>
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
      errors: [],
      success: false,
      form: {
        email: "info@flatris.com.ua",
        key: "a33226e855f072ad7ccfafb5d8f9e00413db198a",
        active: ""
      },
      required: {
        active: ""
      }
    };
  },
  created() {},
  updated() {},
  mounted(){
    this.$emit("btnActive", !this.error.length);
  },
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
