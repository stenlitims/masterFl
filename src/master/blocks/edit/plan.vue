<template>
<div>
  <div class="edit-form">
    <h4 class="text-center">Планировка  {{form.name}}</h4>
    <div class="wrap c-sc">

    
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
          <input type="file" name="img" id="img" class="form-control" placeholder="Файл">
          <div class="img" v-if="form.img">
            <img :src="form.img" />
          </div>
        </div>

        <div class="form-group">
          <label>Планировка 3D</label>
          <input type="file" name="img_3d" id="img_3d" class="form-control" placeholder="Файл">
          <div class="img" v-if="form.img_3d">
            <img :src="form.img_3d" />
          </div>
        </div>


        <div class="form-group">
          <label>PDF для печати</label>
          <input type="file" name="pdf" id="pdf" class="form-control" placeholder="Файл">
          <div class="img" v-if="form.pdf">
            <a :href="form.pdf" target="_blank">Просмотреть</a>
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

export default {
  name: "EditPlan",
  mixins: [masterMixinForm],
  data() {
    return {
      action: "setPlan"
    };
  },
  mounted() {},
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
.img{
  img{
    max-width: 100%;
  }
}
</style>
