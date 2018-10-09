<template>
<div>
  <div class="edit-form">
    <h4 class="text-center">Дом {{form.name}}</h4>
    <div class="form-group">
      <label>Адрес дома</label> 
      <input type="text" v-model="form.address" placeholder="укажите адрес дома" class="form-control">
    </div>
    <div class="form-group">
      <label>Статус строительства дома</label> 
      <input type="text" v-model="form.status" placeholder="строится / введен в эксплуатацию / в проекте" class="form-control">
    </div>
    <div class="form-group">
      <label>Окончание строительства дома</label> 
      <input type="text" v-model="form.end_of_construction" placeholder="3 квартал 2021 г." class="form-control">
    </div>
    <div v-if="success">
        <div class="alert alert-success text-center" role="alert">
          Спасибо данные сохранены.
        </div>
      </div>
    <div class="text-center">
      <button @click="sendData" class="btn btn-md waves-effect">Сохранить</button>
    </div>
  </div>

</div>
  
</template>

<script>
import masterMixinForm from "@/mixin/masterMixinForm";


export default {
  name: "EditBuilding",
  mixins: [masterMixinForm],
  data() {
    return {
      action: "setBuilding"
    };
  },

  mounted() {},
  computed: {},
  methods: {
  
  }
};
</script>

<style lang="scss">
.edit-form{
   h4 {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 20px;
    }
}
</style>
