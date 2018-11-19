<template>
<div class="main-container container">
  <div class="heading">Настройки</div>
  <div class="row">
    <div class="col-lg-3 col-md-4">
      <div class="left-nav">
        <ul>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Аккаунт</router-link></li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Уведомления</router-link></li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Объекты</router-link></li>
          <li><a href="#">Инструменты</a>
            <ul>
              <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Интерактивный каталог для сайта</router-link></li>
              <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Шахматка для отдела продаж</router-link></li>
              <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Размещение на порталах недвижимости</router-link></li>
              <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Подключение агентств недвижимости</router-link></li>
            </ul>
          </li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Отчеты</router-link></li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Пользователи</router-link></li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Цели</router-link></li>
          <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Тарифы</router-link></li>
        </ul>
      </div>
    </div>
    <div class="col-lg-9 col-md-8"></div>
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
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
