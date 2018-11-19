<template>
<div class="main-container container">
  <div class="heading">Простое и понятное внедрение Flatris</div>
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
            <a href="#"  class="btn btn-default btn-md waves-effect">Создать объект</a>
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
            <a href="#"  class="btn btn-default btn-md waves-effect">Подключить</a>
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
            <a href="#"  class="btn btn-default btn-md waves-effect">Создать</a>
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
            <a href="#"  class="btn btn-default btn-md waves-effect">Разместить</a>
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
            <a href="#"  class="btn btn-default btn-md waves-effect">Подключить</a>
          </div>
          <div class="info">
            <a href="#">Посмотреть инструкцию</a>
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
      list: [
        {
          num: 1,
          img: 1,
          title: "Создать аккаунт",
          complate: true
        },
        {
          num: 2,
          img: 1,
          title: "Создать объект",
          complate: false,
          btnText: "Создать объект",
          btnText: "Создать объект"
        }
      ]
    };
  },

  mounted() {
    
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
