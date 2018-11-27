<template>
<div>
  <div class="heading">
    <div class="main-container container">
       <div class="l">Размещение квартир на порталах недвижимости</div> 

       <div class="r">
        <div class="form-group search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
        </div>
       </div>
    </div>
  </div>

  
  <div class="main-container container">

    <div class="inst-list main-list">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="item">
          <div class="title">Интеграция с Мир Квартир</div>
          <div class="img img-m">
            <img :src="$store.state.mainurl+'/assets/panel/img/mirkv.png'" alt="">
          </div>
  

          <div>
            <router-link  :to="{ name: 'new_mirkv', params: { id: 1 }}" class="btn btn-default waves-effect">РАЗМЕСТИТЬ</router-link>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
            </div>
          </div>
           
      
          
          </div>
        </div>

      </div>

    </div>
  </div>


</div>

  
</template>

<script>
export default {
  name: "portals",
  data() {
    return {
      //  list: []

      search: null
    };
  },

  created() {
    window.routeParam = {name: this.$route.name, params: this.$route.params};
  },

  mounted() {},
  computed: {
    list() {
      let data = this.perObjects("web");
      if (this.search) {
        data = this.lodash.filter(data, o => {
          return this.lodash.includes(
            o.name.toLowerCase(),
            this.search.toLowerCase()
          );
        });
      }
      return data;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
