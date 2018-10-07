<template>
<div>
  <div class="edit-form">
    <div class="form-group">
      <label>Адрес дома</label> 
      <input type="text" v-model="formData.address" placeholder="укажите адрес дома" class="form-control">
    </div>
    <div class="form-group">
      <label>Статус строительства дома</label> 
      <input type="text" v-model="formData.status" placeholder="строится / введен в эксплуатацию / в проекте" class="form-control">
    </div>
    <div class="form-group">
      <label>Окончание строительства дома</label> 
      <input type="text" v-model="formData.end_of_construction" placeholder="3 квартал 2021 г." class="form-control">
    </div>
  </div>

</div>
  
</template>

<script>
export default {
  name: "EditBuilding",
  props: ["data"],
  data() {
    return {
      formData: {
        address: "",
        status: "",
        address: "",
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    setData(){
      $.post(
        this.$root.apiurl,
        {
          action: "setBuilding",
          id: this.data.id
        },
        data => {
          if (data) {
              console.log(data);
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss">
</style>
