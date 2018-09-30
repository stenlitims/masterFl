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
            <input type="text" class="form-control" placeholder="Введите адрес" v-model="form.site">
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
              <input type="file" class="form-control"  @change="onFileChange" placeholder="Файл">
            </div>
            <!-- <div class="form-group obj-logo" v-if="form.logo">
              <img :src="form.logo" /><br>
              <a href="#" @click="removeImage">Удалить</a>
            </div> -->
        </div>

        <div class="col-lg-12">
          <div class="form-group">
            <label>Адрес объекта</label>
            <input type="text" class="form-control" placeholder="Введите адрес (город, улица, дом)" v-model="form.adress">
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

      
      <div v-if="success">
        <div class="alert alert-success text-center" role="alert">
          Спасибо данные сохранены. <br>
          <b>Нажмите кнопку далле</b>
        </div>
      </div>


      
      <div class="btns text-center">
        <!-- <button type="button" @click="send" class="btn-default btn-md waves-effect waves-light">Сохранить</button> -->
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
      errors: [],
      errorsSer: [],
      success: false,
      form: {
        name: "",
        adress: "",
        site: "",
        img: "",
        currency: "USD"
      },
      required: {
        name: "",
        adress: "",
        currency: ""
      },
      currency: ["USD", "UAH", "RUB"],
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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.form.img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(e) {
      e.preventDefault();
      this.form.img = "";
    },
    upload() {
      axios.post("/api/upload", { image: this.form.img }).then(response => {});
    },
    send(e) {

    //  console.log(e);

      if(this.steps[this.step].complete){
        this.$emit("footerBtn", e);
        return;
      }

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Требуется указать имя.");
      }
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
            console.log(data);
            if (!data.errors) {
              this.$emit("footerBtn", e);
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
</style>
