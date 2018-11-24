<template>
<div>
  <div class="heading">
    <div class="main-container container">
        Настройки
    </div>
  </div>
  <div class="container">

    <div class="row">
      <div class="col-md-3 col-lg-2">
        <div class="left-nav">
          <ul>
            <li><router-link  :to="{ name: 'settings', params: { id: 'user' }}">Аккаунт</router-link></li>
            <li><router-link  :to="{ name: 'settings', params: { id: 'notification' }}">Уведомления</router-link></li>
            <li><router-link  :to="{ name: 'settings', params: { id: 'objects' }}">Объекты</router-link></li>
            <li class="parent" :class="{'open': nav.inst}"><a href="#" @click.prevent="nav.inst = !nav.inst">Инструменты</a>
            <slide-up-down :active="nav.inst" :duration="300">
              <ul>
                <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Интерактивный каталог для сайта</router-link></li>
                <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Шахматка для отдела продаж</router-link></li>
                <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Размещение на порталах недвижимости</router-link></li>
                <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Подключение агентств недвижимости</router-link></li>
              </ul>
            </slide-up-down>
            </li>
            <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Отчеты</router-link></li>
            <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Пользователи</router-link></li>
            <li><router-link  :to="{ name: 'settings', params: { id: 1 }}">Цели</router-link></li>
            <li><router-link  :to="{ name: 'settings', params: { id: 'tarif' }}">Тарифы</router-link></li>
          </ul>
        </div>
      </div>
      <div class="col-md-9 col-lg-10">

            <!-- <div style="display:none">{{$route.name}} {{$route.params.id}}</div> -->
            <!-- <transition name="center" mode="out-in"></transition> -->
              <component :is="component"
              ></component>
            

      </div>
    </div>
  </div>

  <savePanel v-if="$store.state.changes.count.length"></savePanel>
</div>

</template>

<script>
import user from "@/components/settings/user";
import notification from "@/components/settings/notification";
import objects from "@/components/settings/objects";
import tarif from "@/components/settings/tarif";
import savePanel from "@/components/savePanel";

export default {
  name: "settings",
  data() {
    return {
      nav: {
        inst: false
      }
    };
  },

  components: {
    user,
    notification,
    objects,
    tarif,
    savePanel
  },

  created() {
    window.routeName = this.$route.name;
  },

  mounted() {},
  computed: {
    component() {
      if (this.$route.params.id) {
        return this.$route.params.id;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.left-nav {
  padding-left: 10px;
  a {
    color: #33475b;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    ul {
      padding-left: 20px;
    }
    a {
      display: inline-block;
      transition: all 0.3s ease;
      &.router-link-exact-active,
      &:hover {
        background: #c4ede5;
      }
      &.router-link-exact-active {
        font-weight: bold;
      }
    }
  }
  > ul {
    > li {
      margin-bottom: 5px;
      > a {
        padding: 4px 8px;
        font-size: 15px;
      }
      &.parent {
        > a {
          display: inline-flex;
          align-items: center;
          &:after {
            content: "";
            display: inline-block;
            width: 6px;
            height: 6px;
            border-bottom: 1px solid #000;
            border-right: 1px solid #000;
            margin-left: 8px;
            margin-right: 5px;
            //  margin-top: 6px;
            transform: rotate(45deg);
            transition: all 0.3s ease;
          }
        }
        &.open {
          > a {
            &:after {
              margin-top: 6px;
              transform: rotate(-135deg);
            }
          }
        }
      }
      ul {
        margin-top: 5px;
        li {
          margin-bottom: 4px;
        }
        a {
          padding: 4px 8px;
          font-size: 14px;
        }
      }
    }
  }
}

.settings-right {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  h3 {
    margin-top: 0;
    margin-bottom: 30px;
  }
  .row {
    margin-right: -20px;
    margin-left: -20px;
    > div {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}

.list-settings {
  .item {
    margin-bottom: 30px;
  }
}
</style>
