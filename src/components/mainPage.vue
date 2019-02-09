<template>
  <div>
    <div class="heading">
      <div class="main-container container">Простое и понятное внедрение Flatris</div>
    </div>
    <div class="main-container container">
      <div class="main-list">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/1.svg'" alt>
              </div>
              <div class="title">1. Создать аккаунт</div>
              <div class="check">
                <svg>
                  <use xlink:href="#icon-check"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/2.svg'" alt>
              </div>
              <div class="title">2. Создать объект</div>
              <div v-if="!countObjects">
                <div class="btns">
                  <router-link
                    :to="{ name: 'new_object', params: { id: 1 }}"
                    class="btn btn-outline-success btn-md waves-effect"
                  >Создать объект</router-link>
                </div>
                <div class="info">
                  <a href="#">Посмотреть инструкцию</a>
                </div>
              </div>
              <div v-else class="check">
                <svg>
                  <use xlink:href="#icon-check"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" v-if="countObjects && !userSettings.sh_mp_amo">
            <div class="item">
              <!-- <button
                @click="disableBlock('sh_mp_amo')"
                class="btn btn-outline-primary btn-md waves-effect"
              >Пропустить</button> -->
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/3.png'" alt>
              </div>
              <div class="title">3. Подключить Flatris к CRM</div>
              <div class="btns">
                <router-link
                  :to="{ name: 'new_amo', params: { id: 1 }}"
                  class="btn btn-outline-success btn-md waves-effect"
                >Подключить</router-link>
              </div>
              <div class="info">
                <a href="#">Посмотреть инструкцию</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" v-if="countObjects && !userSettings.sh_mp_webch">
            <div class="item">
              <!-- <button
                @click="disableBlock('sh_mp_webch')"
                class="btn btn-outline-primary btn-md waves-effect"
              >Пропустить</button> -->
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/4.png'" alt>
              </div>
              <div class="title">4. Создать интерактивный каталог по выбору квартир на сайте ЖК</div>
              <div class="btns">
                <router-link
                  :to="{ name: 'webchess', params: { id: 1, oid: 246 }}"
                  class="btn btn-outline-success btn-md waves-effect"
                >Создать</router-link>
              </div>
              <div class="info">
                <a href="#">Посмотреть инструкцию</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" v-if="countObjects && !userSettings.sh_mp_portal">
            <div class="item">
              <!-- <button
                @click="disableBlock('sh_mp_portal')"
                class="btn btn-outline-primary btn-md waves-effect"
              >Пропустить</button> -->
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/5.png'" alt>
              </div>
              <div class="title">5. Разместить квартиры на порталах недвижимости</div>
              <div class="btns">
                <router-link
                  :to="{ name: 'new_mirkv', params: { id: 1 }}"
                  class="btn btn-outline-success btn-md waves-effect"
                >Разместить</router-link>
              </div>
              <div class="info">
                <a href="#">Посмотреть инструкцию</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" v-if="countObjects && !userSettings.sh_mp_partner">
            <div class="item">
              <!-- <button
                @click="disableBlock('sh_mp_partner')"
                class="btn btn-outline-primary btn-md waves-effect"
              >Пропустить</button> -->
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/6.png'" alt>
              </div>
              <div class="title">6. Подключить партнеров к продажам квартир</div>
              <div class="btns">
                <router-link
                  :to="{ name: 'new_agent', params: { id: 1 }}"
                  class="btn btn-outline-success btn-md waves-effect"
                >Подключить</router-link>
              </div>
              <div class="info">
                <a href="#">Посмотреть инструкцию</a>
              </div>
            </div>
          </div>


          <div class="col-md-6 col-lg-4">
            <div class="item">
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/7.png'" alt>
              </div>
              <div class="title">7. Добавить коллег</div>
              <div class="btns">
                <router-link
                  :to="{ name: 'new_agent', params: { id: 1 }}"
                  class="btn btn-outline-success btn-md waves-effect"
                >Добавить</router-link>
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
    return {};
  },

  mounted() {},
  created() {
    window.routeParam = { name: this.$route.name, params: this.$route.params };
  },
  computed: {
    userSettings() {
      if (!this.$store.state.userSettings) {
        this.$store.commit("loadUserSettings", "test");
        return {
          sh_mp_amo: false,
          sh_mp_partner: false,
          sh_mp_portal: false,
          sh_mp_webch: false
        };
      } else {
        return this.$store.state.userSettings;
      }
    }
  },
  methods: {
    disableBlock(item) {
      swal({
        title: "Пропустить?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Да, пропустить",
        cancelButtonText: "Отмена",
        cancelButtonClass: "btn btn-line btn-md waves-effect",
        confirmButtonClass: "btn btn-or btn-md waves-effect"
      }).then(result => {
        if (result.value) {
          $.post(
            this.$store.state.apiurl,
            {
              action: "settUserSettings",
              key: item,
              value: 1
            },
            data => {
              if (data) {
                this.$store.state.userSettings[item] = true;
              }
            },
            "json"
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-outline-primary {
  margin-bottom: 25px;
}

.main-list .check {
  margin-top: 40px;
}

.main-list .title{
  min-height: 50px;
  margin-bottom: 0;
}

.main-list{
  .btns{
    .btn{
      min-width: 140px;
    }
  }
}
</style>
