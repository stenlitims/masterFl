<template>
  <div class="form">
    <h3 class="text-center">Заполните данные по отделу продаж</h3>
    <form action="" class="form">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Адрес</label>
            <input type="text" class="form-control" placeholder="Введите адрес (город, улица, дом)" v-model="form.sales_department_address">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Телефон</label>
            <input type="text" class="form-control" placeholder="Введите телефон" v-model="form.sales_department_phone">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Введите email" v-model="form.sales_department_email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>График работы</label>
            <input type="text" class="form-control" placeholder="Пн - Сб с 9:00 до 19:00" v-model="form.sales_department_schedule">
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
      
    </form>

  </div>
</template>

<script>
export default {
  name: "salesDep",
  props: ["steps", "step", "object_id"],
  data() {
    return {
      // steps: []
      errors: [],
      success: false,
      form: {
        sales_department_address: "",
        sales_department_phone: "",
        sales_department_schedule: "",
        sales_department_email: ""
      },
      required: {
        sales_department_address: "",
        sales_department_phone: "",
        sales_department_schedule: "",
        sales_department_email: ""
      },
      error: [],
      dataLoad: false
    };
  },
  created() {
    this.$bus.on("salesDep", this.send);
    this.getData();
  },
  updated() {
    this.findError();
    this.$emit("btnActive", !this.error.length);
  },
  watch: {
    object_id() {
      this.getData();
    }
  },
  methods: {
    findError() {
      this.error = [];
      for (let item in this.required) {
        if (this.form[item] == "") {
          this.error.push(item);
        }
      }
    },
    getData() {
      // console.log(this.object_id);
      if (!this.object_id || this.dataLoad) return;
      $.post(
        this.$root.apiurl,
        {
          action: "getGproject",
          id: this.object_id
        },
        data => {
          if (data) {
            console.log(data);
            this.form.sales_department_address = data.sales_department_address;
            this.form.sales_department_schedule = data.sales_department_schedule;
            this.form.sales_department_email = data.sales_department_email;
            this.form.sales_department_phone = data.sales_department_phone;
            this.dataLoad = true;
          }
        },
        "json"
      );
    },
    send(w) {
      console.log(w);
      if (w == "prev") {
        this.$emit("footerBtn", w);
        return;
      }
      this.errors = [];
      this.findError();

      // if (!this.form.adress) {
      //   this.errors.push("Требуется указать адресс.");
      // }

      if (!this.error.length) {
        let fdata = this.form;
        fdata.action = "getGproject";
        fdata.update = 1;
        fdata.id = this.object_id;
        $.post(
          this.$root.apiurl,
          fdata,
          data => {
            console.log(data);
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
  .link-add-ger {
    margin-left: 15px;
  }
  .row-link {
    margin-top: -8px;
  }
}
</style>
