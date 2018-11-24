<template>
<div>
  <div class="heading">
    <div class="main-container container">
       <div class="l">Интерактивный каталог для сайта</div> 

       <div class="r">
        <div class="form-group search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
        </div>
       </div>
    </div>
  </div>
  <div class="main-container container">


      {{$store.state.permissions}}

    <div class="objects-list main-list">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="item">
          
      
          
          </div>
        </div>

      </div>

    </div>
  </div>


</div>

  
</template>

<script>

export default {
  name: "webchess",
  data() {
    return {
      //  list: []

    
      search: null,
    
    };
  },


  created() {
    this.$store.commit("loadPermissions", "web");
  },

  mounted() {
 
  },
  computed: {
   
  },
  methods: {

  }
};
</script>

<style lang="scss">

</style>
