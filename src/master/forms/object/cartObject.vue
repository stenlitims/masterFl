<template>
  <div class="form">
    <h3 class="text-center">Заполните данные по объекту</h3>
    <form action="">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Название объекта</label>
            <input type="text" class="form-control" placeholder="Введите название" v-model="form.name">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Сайт</label>
            <input type="text" class="form-control" placeholder="Введите адрес" v-model="form.sales_department_site">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Валюта продаж</label>
            <select v-model="form.currency" class="form-control">
              <option v-for="(item, i) in currency" :key="i">{{item}}</option>
            </select>
          </div>
        </div>
        
        <div class="col-lg-6">
            <div class="form-group">
              <label>Логотип</label>
              <input type="file" name="img" id="logo" accept="image/*" class="form-control" placeholder="Файл">
            </div>
            <div class="obj-logo" v-if="form.logo">
              <img :src="form.logo" /><br>
              <div class="del-btn abs" @click="delFile('logo')"><span>+</span></div>
            </div>
        </div>

        <div class="col-lg-12">
          <div class="form-group">
            <label>Адрес объекта</label>
            <input type="text" class="form-control" placeholder="Введите адрес (город, улица, дом)" v-model="form.address">
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

      <div v-if="errorsSer.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errorsSer" :key="i">
            {{item}}
          </p>
        </div>
      </div>

      
    </form>

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import files from "@/mixin/files";

export default {
  name: "cartObject",
  // props: ['loads'],
  mixins: [masterMixin, files],
  data() {
    return {
      form: {
        name: "",
        address: "",
        sales_department_site: "",
        logo: "",
        currency: "USD"
      },
      required: {
        name: "",
        address: "",
        currency: ""
      },
      actionDel: "delObjectFile",
      currency: ["USD", "UAH", "RUB"]
    };
  },
  created() {
    // this.$bus.on("cartObject", this.send);
    this.getData();
  },
  updated() {},
  watch: {
    object_id() {
      this.dataLoad = false;
      this.getData();
   //   console.log(234);
    }
  },
  methods: {
    getData() {
      if (!this.object_id) {
        this.form = {};
        $.post(
          this.$root.apiurl,
          {
            action: "getCurrency"
          },
          data => {
            if (data) {
              this.currency = data.currency_list;
            }
          },
          "json"
        );
      }
      

      if (!this.object_id || this.dataLoad) return;

      // if (!this.object_id) return;

      $.post(
        this.$root.apiurl,
        {
          action: "getGproject",
          action2: "getCurrency",
          id: this.object_id
        },
        data => {
          if (data) {
            //   console.log(data);
            this.form.name = data.name;
            this.form.logo = data.logo;
            this.form.currency = data.currency;
            this.form.address = data.address;
            this.form.id = data.id;
            this.form.sales_department_site = data.sales_department_site;
            this.currency = data.currency_list;
            this.dataLoad = true;
            this.$emit("objId", data);
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

      if (!this.formChange && this.object_id) {
        this.$emit("footerBtn", e);
        return true;
      }

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Требуется указать -  Название объекта");
      }
      if (!this.form.address) {
        this.errors.push("Требуется указать - Адрес объекта");
      }

      if (this.errors.length) return false;

      let form_data = new FormData();
      if ($("#logo")[0].files.length) {
        form_data.append("img", $("#logo")[0].files[0]);
      }
      let action = "addGproject";
      if (this.object_id) {
        action = "getGproject";
        form_data.append("id", this.object_id);
        form_data.append("update", 1);
      }
      form_data.append("action", action);

      for (let item in this.form) {
        if (this.form[item]) form_data.append(item, this.form[item]);
      }

      $.ajax({
        url: this.$root.apiurl,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: "POST",
        success: data => {
          // console.log(data);
          if (!data.errors) {
            if (!this.object_id) this.$emit("objId", data);
            this.formChange = false;
            this.$emit("footerBtn", e);
          } else {
            this.errorsSer = data.errors;
          }
        }
      });
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
  margin-top: -15px;
  display: inline-block;
  position: relative;
  .del-btn {
    opacity: 0;
  }
  &:hover {
    .del-btn {
      opacity: 1;
    }
  }
  img {
    max-width: 100%;
    max-height: 100px;
  }
}
</style>
