<template>
<div>
  <div class="edit-form" :class="{'loader': loader}">
    <h4 class="text-center">{{form.name}}</h4>
    <div :class="mobClass">
     <div class="row">
       <div class="col-sm-6">
        <div class="form-group">
          <label>Количество домов в комплексе</label> 
          <input type="text" v-model="form.count" disabled placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Адрес объекта</label> 
          <input type="text" v-model="form.address" placeholder="" class="form-control">
        </div>
        <div class="form-group">
          <label>Статус строительства объекта</label> 
          <input type="text" placeholder="" v-model="form.status"  class="form-control">
        </div>
       </div>
       <div class="col-sm-6">
        <div class="form-group text-center">
          <label>Загрузить визуализацию ген плана</label>
          <label v-if="!form.img" class="btn btn-md w-100 waves-effect up-file" for="img">
            <span class="name">Загрузить</span>
            <input type="file" name="img" accept="image/*" id="img" class="form-control" placeholder="Файл">
          </label>
          
          
          <div class="img" v-if="form.img">
            <img :src="form.img" />
            <div class="del-btn" @click="delFile('img')"><span>+</span></div>
          </div>
        </div>

        <div class="form-group">
          <label>Отметить дома на ген плане</label>
          <div class="wrap-input">
            <input type="text" placeholder="" v-model="countOb" disabled  class="form-control">
            <button @click="openOL" class="btn btn-md waves-effect">Изменить</button>
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
    <div class="text-center">
      <button @click="sendOb" class="btn btn-md waves-effect">Сохранить</button>
    </div>
  </div>

</div>
  
</template>

<script>
import masterMixinForm from "@/mixin/masterMixinForm";
import files from "@/mixin/files";

export default {
  name: "EditObject",
  mixins: [masterMixinForm, files],
  data() {
    return {
      action: "getGproject",
      actionDel: "delObjectFile",
      loader: false
    };
  },

  mounted() {},
  computed: {},
  methods: {
    
    sendOb() {
      let form_data = new FormData();
      if ($("#img").length) {
        if ($("#img")[0].files.length) {
          form_data.append("n_img", $("#img")[0].files[0]);
        }
      }

      form_data.append("action", this.action);
      form_data.append("update", 1);

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
          if (data.id) {
            this.success = true;
            this.form.complete = true;
            this.loader = false;
            if (data.img) this.form.img = data.img;
         //   this.addComplete('object'+this.form.id);
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

.img {
  position: relative;
  min-height: 50px;
  text-align: center;
  margin-top: 0px;
  height: 138px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  &:hover {
    .del-btn {
      opacity: 1;
    }
  }
}
input[disabled].form-control {
  opacity: .8;
}
</style>
