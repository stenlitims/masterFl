<template>
<div>
  <div class="edit-form">
    <h4 class="text-center">Этаж {{form.name}}</h4>
    <div class="form-group">
      <label>Загрузить план этажа</label>
      <div class="wrap-input">
        <input type="file" name="img" accept="image/*" id="img" class="form-control" placeholder="Файл">
        <button @click="sendFile" class="btn btn-md waves-effect">Загрузить</button>
      </div>
      
      
    </div>
    <div v-if="form.img">
      <div class="img" >
        <img :src="form.img" />
        <div class="del-btn abs" @click="delFile('img')"><span>+</span></div>
      </div>
      <div class="form-group">
        <label>Отметить планировки на этаже</label>
        <button class="btn btn-md w-100 waves-effect">Отметить</button>
      </div>
    </div>
    
    


    


    <div v-if="success">
        <div class="alert alert-success text-center" role="alert">
          Спасибо данные сохранены.
        </div>
      </div>
  </div>

</div>
  
</template>

<script>
import masterMixinForm from "@/mixin/masterMixinForm";
import files from "@/mixin/files";

export default {
  name: "EditBuilding",
  mixins: [masterMixinForm, files],
  data() {
    return {
      action: "setFloor",
      actionDel: "delFloorFile"
    };
  },
  watch: {
    form() {
      $("#img").val("");
    }
  },
  mounted() {},
  computed: {},
  methods: {
    sendFile() {
      let form_data = new FormData();
      if ($("#img")[0].files.length) {
        form_data.append("n_img", $("#img")[0].files[0]);
        form_data.append("id", this.form.id);
      } else {
        return;
      }

      form_data.append("action", this.action);

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
            // this.success = true;
            this.form.complete = true;
            if (data.data.img) this.form.img = data.data.img;
            this.$bus.emit("completeForm", this.form.id);
            //  setTimeout(() => {
            //   this.success = false;
            //  }, 2000);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  margin-top: -5px;
  margin-bottom: 30px;
}
.w-100 {
  display: block;
  width: 100px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.img {
  position: relative;
  text-align: center;
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
    max-height: 200px;
  }
}
.wrap-input {
  position: relative;
  input {
    height: 56px;
    padding-top: 13px;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
