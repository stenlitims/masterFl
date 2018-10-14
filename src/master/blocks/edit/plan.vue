<template>
<div>
  <div class="edit-form" :class="{'loader': loader}">
    <h4 class="text-center">Планировка  {{form.name}}</h4>
    <div class="wrap c-sc" >

    
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Название</label> 
          <input type="text" v-model="form.name" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Кол-во комнат</label> 
          <input type="text" v-model="form.rooms" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Кол-во уровней</label> 
          <input type="text" v-model="form.levels" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Общая площадь</label> 
          <input type="text" v-model="form.square_total" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Жилая площадь</label> 
          <input type="text" v-model="form.square_live" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Площадь кухни</label> 
          <input type="text" v-model="form.square_kitchen" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Кол-во санузлов</label> 
          <input type="text" v-model="form.bathrooms_separate" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Кол-во балконов/лоджий</label> 
          <input type="text" v-model="form.balconies" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Общая площадь балконов/лоджий</label> 
          <input type="text" v-model="form.square_balconies" placeholder="" class="form-control">
        </div>


        
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label>Планировка 2D</label>
          <input type="file" name="img" accept="image/*" id="img" class="form-control" placeholder="Файл">
          <div class="img" v-if="form.img">
            <img :src="form.img" />
            <div class="del-btn" @click="delFile('img')"><span>+</span></div>
          </div>
        </div>

        <div class="form-group">
          <label>Планировка 3D</label>
          <input type="file" name="img_3d" accept="image/*" id="img_3d" class="form-control" placeholder="Файл">
          <div class="img" v-if="form.img_3d">
            <img :src="form.img_3d" />
            <div class="del-btn" @click="delFile('img_3d')"><span>+</span></div>
          </div>
        </div>


        <div class="form-group">
          <label>PDF для печати</label>
          <input type="file" name="pdf" id="pdf" accept="application/pdf" class="form-control" placeholder="Файл">
          <div class="pdf text-center" v-if="form.pdf">
            <a :href="form.pdf" target="_blank">Просмотреть</a>
            <a href="#"  @click.prevent="delFile('pdf')">Удалить</a>
          </div>
        </div>
            
      </div>
    </div>

    </div>
    
    <div v-if="success">
      <div class="alert alert-success text-center" role="alert">
        Спасибо данные сохранены.
      </div>
    </div>
    <div class="text-center btns">
      <button @click="sendPlan" class="btn btn-md waves-effect">Сохранить</button>
    </div>
  </div>

</div>
  
</template>

<script>
import masterMixinForm from "@/mixin/masterMixinForm";
import files from "@/mixin/files";

export default {
  name: "EditPlan",
  mixins: [masterMixinForm, files],
  data() {
    return {
      action: "setPlan",
      actionDel: "delPlanFile",
      loader: false
    };
  },
  mounted() {},
  watch: {
    form() {
      $("#img").val("");
      $("#img_3d").val("");
      $("#pdf").val("");
    }
  },
  computed: {},
  methods: {
    sendPlan() {
      let form_data = new FormData();
      if ($("#img")[0].files.length) {
        form_data.append("n_img", $("#img")[0].files[0]);
      }
      if ($("#img_3d")[0].files.length) {
        form_data.append("n_img_3d", $("#img_3d")[0].files[0]);
      }
      if ($("#pdf")[0].files.length) {
        form_data.append("n_pdf", $("#pdf")[0].files[0]);
      }

      form_data.append("action", this.action);

      for (let item in this.form) {
        if (this.form[item]) form_data.append(item, this.form[item]);
      }

      this.loader = true;

      $.ajax({
        url: this.$root.apiurl,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: "POST",
        success: data => {
          if (data.type == "success") {
            this.success = true;
            this.form.complete = true;
            if (data.data.img) this.form.img = data.data.img;
            if (data.data.img_3d) this.form.img_3d = data.data.img_3d;
            if (data.data.pdf) this.form.pdf = data.data.pdf;
            this.loader = false;
            this.$bus.emit("completeForm", this.form.id);
            setTimeout(() => {
              this.success = false;
            }, 2000);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-form {
  max-width: 93%;
}
.wrap {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 15px;
  padding-top: 3px;
}
.btns {
  padding-top: 15px;
  padding-bottom: 20px;
}
.img {
  position: relative;
  min-height: 50px;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 200px;
  }
  &:hover {
    .del-btn {
      opacity: 1;
    }
  }
}
.pdf {
  padding-top: 10px;
  a {
    text-decoration: underline;
    margin: 0 5px;
    &:hover {
      text-decoration: none;
    }
  }
}
.del-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}
</style>
