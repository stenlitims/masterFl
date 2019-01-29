<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Размещение квартир на порталах недвижимости</div>

     
      </div>
    </div>

    <div class="main-container container">
      <div class="inst-list main-list" v-if="countObjects">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="title">Интеграция с Мир Квартир</div>
              <div class="img img-m">
                <img :src="$store.state.mainurl+'/assets/panel/img/mirkv.png'" alt>
              </div>

              <div class="btns" v-if="mirkv">
                <router-link
                  :to="{ name: 'new_mirkv', params: { id: 1}}"
                  class="btn btn-outline-primary waves-effect"
                >Редактировать</router-link>
                <button
                  class="btn btn-outline-primary2 waves-effect"
                  @click="OffPermissions(null, 'mirkvartir')"
                >Отключить</button>
              </div>

              <div v-else>
                <router-link
                  :to="{ name: 'new_mirkv', params: { id: 1 }}"
                  class="btn btn-default waves-effect"
                >РАЗМЕСТИТЬ</router-link>
                <div class="info">
                  <a href="#">Посмотреть инструкцию</a>
                </div>
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
  name: "portals",
  data() {
    return {
      //  list: []

      search: null
    };
  },

  created() {
    if (!this.$store.state.permissions.mirkvartir.length) {
      this.$store.commit("loadPermissions", "mirkvartir");
    }
    window.routeParam = { name: this.$route.name, params: this.$route.params };
  },

  mounted() {},
  computed: {
    mirkv() {
      let data = [];
      for (let item of this.$store.state.permissions.mirkvartir) {
        if (item.state.selected) {
          data.push(item.permissions.object_id);
        }
      }
      return data.length;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
