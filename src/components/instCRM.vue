<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Шахматка для отдела продаж</div>

       
      </div>
    </div>

    <div class="main-container container">
      <div class="inst-list main-list" v-if="countObjects">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="title">Интеграция с AmoCRM</div>
              <div class="img img-m">
                <img :src="$store.state.mainurl+'/assets/panel/img/amocrm.png'" alt>
              </div>
              <div>
                <router-link
                  :to="{ name: 'new_amo', params: { id: 1 }}"
                  class="btn btn-default waves-effect"
                >ПОДКЛЮЧИТЬ</router-link>
                <div class="info">
                  <a href="#">Посмотреть инструкцию</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="soon">скоро</div>
              <div class="title">Интеграция с Bitrix24</div>
              <div class="img img-m">
                <img :src="$store.state.mainurl+'/assets/panel/img/logo-bx24.png'" alt>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="soon">скоро</div>
              <div class="title">FlatrisCRM для застройщика</div>
              <div class="img img-m">
                <img :src="$store.state.mainurl+'/assets/panel/img/flatris.svg'" alt>
              </div>
            </div>
          </div>
        </div>
      </div>

      <noObjedcts v-else></noObjedcts>
    </div>
  </div>
</template>

<script>
export default {
  name: "instCRM",
  data() {
    return {
      //  list: []

      search: null
    };
  },

  created() {
    window.routeParam = { name: this.$route.name, params: this.$route.params };
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
