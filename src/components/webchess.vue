<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Интерактивный каталог для сайта</div>

        <div class="r">
          <div class="form-group search">
            <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container container">
      <div class="inst-list main-list">
        <div class="row">
          <div class="col-md-6 col-lg-4" v-for="(item, i) in list" :key="i">
            <div class="item">
              <div class="title">{{item.name}}</div>
              <div class="img img-m">
                <img :src="item.logo" v-if="item.logo" alt>
                <img :src="item.img" v-else-if="item.img" alt>
                <img :src="$store.state.mainurl+'/assets/panel/img/object.svg'" v-else alt>
              </div>
              <div class="btns" v-if="item.selected">
                <router-link
                  :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
                  class="btn btn-outline-primary waves-effect"
                >Редактировать</router-link>
                <button
                  class="btn btn-outline-danger waves-effect"
                  @click="OffPermissions(item.id)"
                >Отключить</button>
              </div>

              <div v-else>
                <router-link
                  :to="{ name: 'webchess', params: { id: 1, oid: item.id }}"
                  class="btn btn-default waves-effect"
                >Создать</router-link>
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
  name: "webchess",
  data() {
    return {
      //  list: []

      search: null
    };
  },

  created() {
    this.$store.commit("loadMyObjects");
    this.$store.commit("loadPermissions", "web");
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
  methods: {
    OffPermissions(id) {
      if (!id) return;

      swal({
        title: "Отключить?",
        text: "Вы точно хотите отключить?",
        type: "error",
        showCancelButton: true,
        confirmButtonClass: "btn-warning",
        confirmButtonText: "Да, отключить",
        cancelButtonText: "Отмена",
        cancelButtonClass: "btn-md btn btn-secondary waves-effect",
        confirmButtonClass: "btn-danger btn-md waves-effect waves-light",
        showLoaderOnConfirm: true
      })
        .then(() => {
          this.$store.state.permissions.web;
          let data = [];
          for (let item of this.$store.state.permissions.web) {
            if (item.permissions.gproject_id == id) {
              item.state.selected = false;
            }
          }

          let f = this.lodash.filter(
            this.$store.state.permissions.web,
            item => {
              return item.state.selected == true;
            }
          );

          f.forEach(item => {
            data.push(item.permissions);
          });

          console.log(data);
          this.setPermissions(data, "web");
        })
        .catch(swal.noop);
    }
  }
};
</script>

<style lang="scss">
</style>
