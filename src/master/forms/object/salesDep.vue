<template>
  <div class="form">
    <h3 class="text-center">Заполните данные по отделу продаж</h3>
    <form action class="form">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Адрес</label>
            <input
              type="text"
              class="form-control"
              placeholder="Введите адрес (город, улица, дом)"
              @keyup="setChanges('sales_department_address')"
              v-model="form.sales_department_address"
            >
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Телефон</label>
            <input
              type="text"
              class="form-control"
              placeholder="Введите телефон"
              @keyup="setChanges('sales_department_phone')"
              v-model="form.sales_department_phone"
            >
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Введите email"
              @keyup="setChanges('sales_department_email')"
              v-model="form.sales_department_email"
            >
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>График работы</label>
            <input
              type="text"
              class="form-control"
              placeholder="Пн - Сб с 9:00 до 19:00"
              @keyup="setChanges('sales_department_schedule')"
              v-model="form.sales_department_schedule"
            >
          </div>
        </div>
      </div>

      <div v-if="errors.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errors" :key="i">{{item}}</p>
        </div>
      </div>
      <div v-if="success">
        <div class="alert alert-success text-center" role="alert">Спасибо данные сохранены.
          <br>
          <b>Нажмите кнопку далле</b>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "salesDep",
  mixins: [masterMixin],
  data() {
    return {
      form: {
        sales_department_address: "",
        sales_department_phone: "",
        sales_department_schedule: "",
        sales_department_email: ""
      },
      original: {},
      required: {
        sales_department_address: "",
        sales_department_phone: "phone",
        // sales_department_schedule: "",
        sales_department_email: "email"
      }
    };
  },
  created() {
    this.getData();
  },
  updated() {},
  watch: {
    object_id() {
      this.getData();
    }
  },
  methods: {
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
            // console.log(data);
            this.form.sales_department_address = data.sales_department_address;
            this.form.sales_department_schedule =
              data.sales_department_schedule;
            this.form.sales_department_email = data.sales_department_email;
            this.form.sales_department_phone = data.sales_department_phone;

            this.original = Object.assign({}, this.form);
            this.dataLoad = true;
          }
        },
        "json"
      );
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      if (!this.form.sales_department_address) {
        this.errors.push("Требуется указать -  Адрес");
      }
      if (!this.isAddress(this.form.sales_department_email)) {
        this.errors.push("неверный Email");
      }
      if (!this.isPhone(this.form.sales_department_phone)) {
        this.errors.push("неверный  Телефон");
      }

      setTimeout(() => {
        this.errors = [];
      }, 3000);

      this.findError();
      if (this.error.length) return false;

      if (!this.formChange && this.object_id) {
        this.$emit("footerBtn", e);
        return true;
      }

      this.save(e);
    },
    save(e) {
      let fdata = this.form;
      fdata.action = "getGproject";
      fdata.update = 1;
      fdata.id = this.object_id;
      $.post(
        this.$root.apiurl,
        fdata,
        data => {
          if (!data.errors) {
            if (e == "save") {
              this.original = Object.assign({}, this.form);
              this.saveOk();
            } else {
              this.$emit("footerBtn", e);
              this.formChange = false;
            }
          } else {
            this.errorsSer = data.errors;
          }
        },
        "json"
      );
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
