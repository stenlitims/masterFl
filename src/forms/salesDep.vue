<template>
  <div class="form">
    <h3 class="text-center">Заполните данные по отделу продаж</h3>
    <form action="" class="form">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Адрес</label>
            <input type="text" class="form-control" placeholder="Введите адрес (город, улица, дом)" v-model="form.adress">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Телефон</label>
            <input type="text" class="form-control" placeholder="Введите телефон" v-model="form.phone">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Введите email" v-model="form.email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>График работы</label>
            <input type="text" class="form-control" placeholder="Пн - Сб с 9:00 до 19:00" v-model="form.grafic">
          </div>
        </div>
      </div>

      <div v-if="errors.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errors" :key="i">
            {{item}}
          </p>
        </div>
      </div>
      <div v-if="success">
        <div class="alert alert-success text-center" role="alert">
          Спасибо данные сохранены. <br>
          <b>Нажмите кнопку далле</b>
        </div>
      </div>


      
      <!-- <div class="btns text-center">
        <button type="button" @click="send" class="btn-default btn-md waves-effect waves-light">Сохранить</button>
      </div> -->
      
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
        adress: "",
        phone: "",
        grafic: "",
        email: ""
      },
       required: {
        phone: "",
        grafic: "",
        email: "",
        currency: ""
      },
      error: []
    };
  },
  created() {
    this.$bus.on("send-form", this.send);
  },
  updated() {
    this.error = [];
    for (let item in this.required) {
      //  console.log(item);

      if (this.form[item] == "") {
        this.error.push(item);
      }
    }

    this.$emit("btnActive", !this.error.length);
  },
  methods: {
   send(w) {

      if(this.steps[this.step].complete){
        this.$emit("footerBtn", w);
        return;
      }

      this.errors = [];

      if (!this.form.adress) {
        this.errors.push("Требуется указать адресс.");
      }

      if (!this.errors.length) {
        $.post(
          this.$root.apiurl,
          {
            action: "addGproject",
            data: this.form
          },
          data => {
           // console.log(data);
            if (!data.errors) {
              this.$emit("footerBtn", w);
            } else {
              this.errorsSer = data.errors;
            }
          },
          "json"
        );
      }
    }
  }
};
</script>

<style lang="scss">
.alert {
  p:last-child {
    margin-bottom: 0;
  }
}
.obj-logo {
  img {
    max-width: 100%;
  }
}

.grafic-list {
  margin-top: 25px;
  max-width: 350px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  .form-control {
    padding: 0.25rem 0.5rem;
  }
  .row {
    margin-bottom: 10px;
  }
  .col-auto {
    padding-left: 5px;
    padding-right: 5px;
  }
  .link-add-ger{
    margin-left: 15px;
  }
  .row-link{
    margin-top: -8px;
  }
}
</style>
