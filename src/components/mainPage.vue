<template>
<div>
  <div class="heading">
    <div class="main-container container">
        Простое и понятное внедрение Flatris
    </div>
  </div>
  <div class="main-container container">

    <div class="main-list">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/1.svg'" alt="">
            </div>
            <div class="title">1. Создать аккаунт</div>
            <div class="check">
              <svg><use xlink:href="#icon-check"></use></svg>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/2.svg'" alt="">
            </div>
            <div class="title">2. Создать объект</div>
            <div class="btns">
              <router-link  :to="{ name: 'new_object', params: { id: 1 }}" class="btn btn-default btn-md waves-effect">Создать объект</router-link>
            </div>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/3.png'" alt="">
            </div>
            <div class="title">3. Подключить Flatris к CRM</div>
            <div class="btns">
              <router-link  :to="{ name: 'new_amo', params: { id: 1 }}" class="btn btn-default btn-md waves-effect">Подключить</router-link>
            </div>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/4.png'" alt="">
            </div>
            <div class="title">4. Создать интерактивный каталог по выбору квартир на сайте ЖК</div>
            <div class="btns">
              <router-link  :to="{ name: 'webchess', params: { id: 1, oid: 246 }}" class="btn btn-default btn-md waves-effect">Создать</router-link>
            </div>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/5.png'" alt="">
            </div>
            <div class="title">5. Разместить квартиры на порталах недвижимости</div>
            <div class="btns">
              <router-link  :to="{ name: 'new_mirkv', params: { id: 1 }}" class="btn btn-default btn-md waves-effect">Разместить</router-link>
            </div>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="item">
            <div class="img">
              <img :src="$root.mainurl +'/assets/panel/img/main/6.png'" alt="">
            </div>
            <div class="title">6. Подключить партнеров к продажам квартир</div>
            <div class="btns">
              <router-link  :to="{ name: 'new_agent', params: { id: 1 }}" class="btn btn-default btn-md waves-effect">Подключить</router-link>
            </div>
            <div class="info">
              <a href="#">Посмотреть инструкцию</a>
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
  name: "MainPage",
  data() {
    return {
    };
  },

  mounted() {
    
  },
  created(){
    window.routeName = this.$route.name;
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
