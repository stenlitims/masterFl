<template>
  <div class="main-header">
      <div class="container">
          <div class="left">
            <div class="logo">
                <router-link to="/">
                    <img src="https://flatris.com.ua/assets/images/logo/logo_full_w.svg" alt="">
                </router-link>
            </div>
            <div class="main-nav">
                <ul>
                    <li><router-link to="/">Рабочий стол</router-link></li>
                    <li class="parent"><a href="#">Объекты</a>
                        <ul>
                            <li><a href="#">Мои объекты</a></li>
                            <li><a href="#">Доступные мне объекты</a></li>
                            <li class="line">
                            <router-link  :to="{ name: 'new_object', params: { id: 1 }}">
                                Добавить новый объект</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="parent"><a href="#">Инстументы</a>
                        <ul>
                            <li><a href="#">Интерактивный каталог для сайта</a></li>
                            <li><a href="#">Шахматка для отдела продаж</a></li>
                            <li><a href="#">Размещение на порталах недвижимости</a></li>
                            <li><a href="#">Подключение агентств недвижимости</a></li>
                            <li class="line"><a href="#">Интеграция по API</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
          </div>

          <div class="right">
              <div class="icons">
                <router-link :to="{ name: 'settings', params: { id: 'user' }}" title="Настройки">
                    <svg><use xlink:href="#icon-gear"></use></svg>
                </router-link>
                <a href="#">
                    <svg><use xlink:href="#icon-bell"></use></svg>
                </a>
              </div>
              <div class="v-line"></div>
              <div class="avatar">
                  <img src="https://test.flatris.com.ua/assets/panel/img/user.svg" alt="">
              </div>

              <div class="main-nav">
                  <ul>
                      <li class="parent"><a href="#">Flatris</a>
                        <ul>
                            <li><a href="#">Flatris</a></li>
                            <li><a href="#">Flatris</a></li>
                            <li><a href="#">Выход</a></li>
                        </ul>
                      </li>
                  </ul>
              </div>
          </div>
          
      </div>
 
  </div>
</template>

<script>
export default {
  name: "mainHeader",

  data() {
    return {};
  },
  created() {},
  updated() {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
.main-header {
  border-top: 2px solid #8adbcc;
  background: #2e3f50;
  color: #2e3f50;
  margin-bottom: 30px;
  // padding-top: 10px;
  //  padding-bottom: 10px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }
  .logo {
    line-height: normal;
    margin-right: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    img {
      width: 120px;
    }
    a {
      display: block;
      // height: 44px;
    }
    svg {
      width: 36px;
      fill: #fff;
      height: 44px;
    }
  }

  .left {
    display: flex;
    align-items: center;
  }
  a {
    color: #fff;
  }
  .main-nav {
    ul {
      margin: 0;
      list-style: none;
      padding: 0;
    }
    > ul {
      display: flex;

      > li {
        position: relative;
        > a {
          height: 60px;
          display: flex;
          align-items: center;
          padding: 5px 20px;
          transition: all 0.3s ease;
          &.router-link-exact-active {
            background: #1d3751;
          }
          &:hover {
          }
        }
        &.parent {
          > a {
            &:after {
              content: "";
              display: inline-block;
              width: 6px;
              height: 6px;
              border-bottom: 1px solid #fff;
              border-right: 1px solid #fff;
              margin-left: 7px;
              transform: rotate(45deg);
              transition: all 0.3s ease;
            }
          }
        }
        &:hover {
          > a {
            background: #1d3751;
            &:after {
              border-color: #1ab797;
            }
          }
          ul {
            opacity: 1;
            visibility: visible;
            transform: translate(0, 0);
          }
        }
        ul {
          opacity: 0;
          transition: all 0.3s ease;
          visibility: hidden;
          transform: translate(0, 20px);
          position: absolute;
          top: 100%;
          background: rgba(29, 55, 81, 0.9);
          left: 0px;
          padding: 10px 20px 15px 20px;
          min-width: 210px;
          z-index: 100;
          a {
            padding-top: 5px;
            padding-bottom: 5px;
            transition: all 0.3s ease;
            &:hover {
              text-decoration: underline;
              //  background: rgba(29, 55, 81, 1);
            }
          }
          .line {
            border-top: 1px solid rgba(255, 255, 255, 0.5);
            padding-top: 8px;
            margin-top: 10px;
          }
        }
      }
    }
    a {
      display: block;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .v-line {
    background: rgba(255, 255, 255, 0.2);
    width: 2px;
    height: 40px;
    margin: 0 40px;
  }

  .icons {
    display: flex;
    align-items: center;
    a {
      display: block;
      margin: 0 10px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    svg {
      width: 26px;
      height: 26px;
      fill: #fff;
    }
  }

  .avatar {
    margin-right: 10px;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
@media (min-width: 991px) {
  .main-header {
    .container {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
}
</style>
