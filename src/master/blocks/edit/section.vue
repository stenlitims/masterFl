<template>
<div>
  <div class="edit-form t-col" :class="{'loader': loader}">
    <h4 class="text-center">Секция {{form.name}}</h4>
    <div :class="mobClass">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Адрес секции</label> 
            <input type="text" v-model="form.address" placeholder="укажите адрес секции если он есть" class="form-control">
          </div>
          <div class="form-group">
            <label>Статус строительства секции</label> 
            <input type="text" v-model="form.status" placeholder="строится / введен в эксплуатацию / в проекте" class="form-control">
          </div>
          <div class="form-group">
            <label>Окончание строительства секции</label> 
            <input type="text" v-model="form.end_of_construction" placeholder="3 квартал 2021 г." class="form-control">
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
      <button @click="sendDataFile" class="btn btn-md waves-effect">Сохранить</button>
    </div>
  </div>

</div>
  
</template>

<script>
import masterMixinForm from "@/mixin/masterMixinForm";
import files from "@/mixin/files";

export default {
  name: "EditSection",
  mixins: [masterMixinForm, files],
  data() {
    return {
      actionDel: "delSectionFile",
      action: "setSection"
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
