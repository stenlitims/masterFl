<template>
  <div class="settings-right settings-tarif">
    <h3>{{titles['step'+ step]}}</h3>
    <div class="row">
      <div class="col-lg-9">
        <div class="wrap-tarif-table" v-if="step == 1">
          <div class="ramka" :style="ramka"></div>
          <table class="table tarif-table">
            <thead>
              <tr>
                <td>
                  <div class="currency-list">
                    <div
                      class="item"
                      :class="{'active': currency == 'UAH'}"
                      @click="currency ='UAH'"
                    >UAH</div>
                    <div
                      class="item"
                      :class="{'active': currency == 'USD'}"
                      @click="currency ='USD'"
                    >USD</div>
                    <div
                      class="item"
                      :class="{'active': currency == 'RUB'}"
                      @click="currency ='RUB'"
                    >RUB</div>
                  </div>
                </td>
                <td @click="setTarif('start', $event)" :class="{'active': tarif == 'start'}">
                  <div class="title">START</div>
                  <div class="radio" :class="{'active': tarif == 'start'}"></div>
                </td>
                <td @click="setTarif('standart', $event)" :class="{'active': tarif == 'standart'}">
                  <div class="title">STANDART</div>
                  <div class="radio" :class="{'active': tarif == 'standart'}"></div>
                </td>
                <td @click="setTarif('unlim', $event)" :class="{'active': tarif == 'unlim'}">
                  <div class="title">UNLIM</div>
                  <div class="radio" :class="{'active': tarif == 'unlim'}"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td>
                  {{item.title}}
                  <span :title="item.text" class="inf"></span>
                </td>

                <td v-if="item.start == 1" @click="setTarif('start', $event)">
                  <div class="gl"></div>
                </td>
                <td v-else @click="setTarif('start', $event)">{{item.start}}</td>

                <td v-if="item.standart == 1" @click="setTarif('standart', $event)">
                  <div class="gl"></div>
                </td>
                <td v-else @click="setTarif('standart', $event)">{{item.standart}}</td>

                <td v-if="item.unlim == 1" @click="setTarif('unlim', $event)">
                  <div class="gl"></div>
                </td>
                <td v-else @click="setTarif('unlim', $event)">{{item.unlim}}</td>
              </tr>
              <tr class="price-tr">
                <td>Стоимость
                  <span class="inf" title="Стоимость указана за месяц при оплате на год"></span>
                </td>
                <td @click="setTarif('start', $event)">
                  <b>от {{start}} {{currency}}</b>
                </td>
                <td @click="setTarif('standart', $event)">
                  <b>от {{standart}} {{currency}}</b>
                </td>
                <td @click="setTarif('unlim', $event)">
                  <b>от {{unlim}} {{currency}}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="period" v-if="step == 2">
          <div class="period-list">
            <div
              class="item"
              :class="{'active': i == period}"
              v-for="(item, i) in periodList"
              :key="i"
              @click="period = i"
            >
              <div class="title t">{{item.num}} мес.</div>
              <div class="cr"></div>
              <div class="sale t" v-if="item.sale">скидка
                <br>
                {{item.sale}}%
              </div>
            </div>
            <div class="width">
              <div :style="width"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="tarif-nav">
          <div>
            <div class="item" :class="{'active': step == 1}">
              <div class="t" @click="step = 1">1. Тариф</div>
              <div class="v">
                <b class="tarif-name">{{tarif}}</b>
                <div v-if="step == 2">
                  <a href="#" @click.prevent="step = 1">изменить</a>
                </div>
              </div>
            </div>
            <div class="item" :class="{'active': step == 2}">
              <div class="t" @click="step = 2">2. Период</div>
              <div class="v">
                <b>{{periodList[period].num}} {{declension(periodList[period].num, ['МЕСЯЦ', 'МЕСЯЦА', 'МЕСЯЦЕВ'] )}}</b>
              </div>
            </div>
            <div class="item">
              <div class="t">3. Стоимость</div>
              <div class="v">
                <div v-if="total.price" class="all-price">
                  <b>{{number_format(total.price)}} {{currency}}</b>
                </div>
                <b class="total-price">{{number_format(total.total)}} {{currency}}</b>
              </div>
            </div>

            <div class="btns text-center">
              <button
                v-if="step == 1"
                @click="step = 2"
                class="btn btn-line btn-md waves-effect"
              >ВЫБРАТЬ ПЕРИОД</button>
              <button v-if="step == 2" class="btn btn-line btn-md waves-effect">ОПЛАТИТЬ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "tarif",
  mixins: [settings],
  data() {
    return {
      currency: "USD",
      step: 1,
      tarif: "start",
      period: "m1",
      periodList: {
        m1: {
          idx: 0,
          num: 1,
          sale: 0
        },
        m3: {
          idx: 1,
          num: 3,
          sale: 5
        },
        m6: {
          idx: 2,
          num: 6,
          sale: 10
        },
        m12: {
          idx: 3,
          num: 12,
          sale: 15
        }
      },
      ramka: { left: "490px", width: "127px" },
      price: {
        UAH: {
          start: 499,
          standart: 899,
          unlim: 1899
        },
        USD: {
          start: 19,
          standart: 34,
          unlim: 71
        },
        RUB: {
          start: 1077,
          standart: 1941,
          unlim: 4100
        }
      },
      titles: {
        step1: "Тарифы",
        step2: "Выберите период использования"
      },
      data: [
        {
          title: "Количество квартир в базе",
          text:
            "Общее колличество квартир добавленных в систему по всем комплексам",
          start: "200",
          standart: "1000",
          unlim: "unlim"
        },
        {
          title: "Количество пользователей",
          text:
            "Мы не ограничиваем колличество добавленных в систему пользователей",
          start: "unlim",
          standart: "unlim",
          unlim: "unlim"
        },
        {
          title: "Внутренняя шахматка подбора квартир",
          text:
            "Внутренний интерактивный каталог квартир, который наглядно показывает состояние квартирного фонда",
          start: 1,
          standart: 1,
          unlim: 1
        },
        {
          title: "Интеграция с порталами недвижимости",
          text:
            "Публикуйте информацию о доступных квартирах на порталах недвижимости в один клик.",
          start: 1,
          standart: 1,
          unlim: 1
        },
        {
          title: "Работа с агенствами недвижимости",
          text:
            "Подключайте всех партнеров к продажам. Чем больше партнеров, тем больше продаж",
          start: 1,
          standart: 1,
          unlim: 1
        },
        {
          title: "Интеграция со сторонними CRM системами",
          text:
            "Вы можете интегрировать Flatris с AmoCRM или любой другой CRM системой",
          start: "",
          standart: 1,
          unlim: 1
        },
        {
          title: "Шахматка подбора квартир для сайта",
          text:
            "Установите интерактивный каталог на свой сайт ЖК — повысьте уровень интереса и продажи квартир",
          start: "",
          standart: "1 домен",
          unlim: "3 домена"
        },
        {
          title: "Помощь в интеграции и настройке",
          text:
            "Мы поможем настроить и внедрить Flatris со всеми инструментами в Вашу компанию",
          start: "",
          standart: "",
          unlim: 1
        },
        {
          title: "Помощь в интеграции и настройке",
          text: "Мы оперативно ответим на любые Ваши вопросы",
          start: 1,
          standart: 1,
          unlim: 1
        }
        // {
        //   title: "Стоимость",
        //   text: "Стоимость указана за месяц при оплате на год",
        //   start: "от 1 077 RUB",
        //   standart: "от 1 941 RUB",
        //   unlim: "от 4 100 RUB"
        // }
      ]
    };
  },

  created() {},

  mounted() {
    $(".inf").tooltip({
      delay: 0.5
    });
    this.setRamka();
    $(window).resize(() => {
      this.setRamka();
    });
  },
  watch: {
    step() {
      if (this.step == 1) {
        setTimeout(() => {
          $(".inf").tooltip({
            delay: 0.5
          });
        }, 200);
      }
    }
  },
  computed: {
    start() {
      return this.number_format(this.price[this.currency].start);
    },
    standart() {
      return this.number_format(this.price[this.currency].standart);
    },
    unlim() {
      return this.number_format(this.price[this.currency].unlim);
    },
    width() {
      let width = (100 / 3) * this.periodList[this.period].idx;
      return {
        width: width + "%"
      };
    },
    total() {
      let price = this.price[this.currency][this.tarif];
      let period = this.periodList[this.period].num;
      let allprice = price * period;
      let total = allprice;
      if (this.periodList[this.period].sale) {
        total = allprice - (allprice / 100) * this.periodList[this.period].sale;
      } else {
        allprice = 0;
      }
      return {
        price: allprice,
        total: total
      };
    }
  },
  methods: {
    setTarif(t, e) {
      let el = e.target;
      if (el.nodeName != "TD") {
        el = el.offsetParent;
      }
      this.ramka.width = el.clientWidth + "px";
      this.ramka.left = el.offsetLeft + "px";
      this.tarif = t;
    },
    setRamka() {
      let el = $("td.active")[0];
      this.ramka.width = el.clientWidth + "px";
      this.ramka.left = el.offsetLeft + "px";
    },
    number_format(number, decimals, dec_point, thousands_sep) {
      number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? " " : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return "" + (Math.round(n * k) / k).toFixed(prec);
        };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.total-price {
  color: #00b2af;
  font-size: 17px;
  font-weight: bold;
}
.all-price {
  text-decoration: line-through;
}
.period {
  padding-left: 60px;
  padding-right: 60px;
}
.period-list {
  margin-top: 140px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 20px;
    right: 20px;
    background: #ecf0f4;
    height: 2px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .width {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 20px;
    right: 20px;
    > div {
      background: #5fbeaa;
      height: 4px;
      transition: width 0.3s linear;
    }
  }
  .cr {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 7px solid #cbd6e2;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .item {
    position: relative;
    z-index: 2;
    &.active {
      .cr {
        border-color: #5fbeaa;
      }
      .t {
        color: #5fbeaa;
      }
    }
  }
  .t {
    transition: all 0.3s ease;
    position: absolute;
    width: 200px;
    transform: translate(-50%, 0);
    left: 50%;
    text-decoration: underline;
    font-weight: 600;
    color: #808080;
    line-height: 1.4;
  }
  .title {
    top: -130%;
  }
  .sale {
    top: 160%;
  }
}
.tarif-name {
  text-transform: uppercase;
}
.wrap-tarif-table {
  position: relative;
  padding-bottom: 1px;
  .ramka {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 127px;
    border: 2px solid #04b1ae;
    pointer-events: none;
    transition: all 0.3s ease;
  }
}
.tarif-nav {
  height: 100%;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 5px;
  padding-top: 50px;
  padding-bottom: 50px;
  border: 2px solid #e6e6e6;
  min-height: 500px;
  > div {
    width: 100%;
  }
  .item {
    display: flex;
    padding-left: 9%;
    padding-right: 7%;
    justify-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 35px;
    border-bottom: 1px solid #fff;
    position: relative;
    &.active {
      &:before {
        content: "";
        position: absolute;
        left: -2px;
        bottom: 10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 0 15px 13px;
        border-color: transparent transparent transparent #f8f8f8;
      }
    }

    a {
      color: #00b2af;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }

    .t {
      cursor: pointer;
    }
  }
}

.settings-tarif {
  max-width: 1300px;
  .row {
    margin-right: -10px;
    margin-left: -10px;
    > div {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}

.tooltip-inner {
  transition: all 0.3s ease;
  font-size: 13px;
  line-height: 1.4;
  background: #00bfae;
  transform: translate(9px,0);
}

.tooltip {
  .arrow {
    transform: translate(9px,0);
    &:before {
      border-top-color: #00bfae !important;
    }
  }
  //  transition: all 0.3s ease;
}

.tarif-table {
  //  margin-bottom: 10px;
  .radio {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #cbd6e2;
    cursor: pointer;
    transition: all 0.3s ease;
    &.active {
      border: 5px solid #84b1ed;
    }
  }

  thead {
    td {
      font-weight: bold;
      border-top: none !important;
      vertical-align: middle;
    }
    .title {
      margin-bottom: 10px;
      font-size: 18px;
    }
  }

  .gl {
    display: inline-block;
    border-bottom: 2px solid #28475c;
    border-right: 2px solid #28475c;
    width: 10px;
    height: 16px;
    transform: rotate(45deg);
    pointer-events: none;
  }

  td {
    padding-top: 1.1rem;
    padding-bottom: 1.1rem;
    border-color: #e2eff6;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  .price {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .btn {
    padding: 10px 18px;
  }

  .price-tr {
    b {
      font-weight: 700;
    }
    td {
      min-width: 130px;
    }
  }

  .inf {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #79bedf;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    color: #79bedf;
    margin-left: 14px;
    cursor: default;
    transition: all 0.3s ease;

    &:before {
      content: "i";
    }

    &:hover {
      border-color: #00bfae;
      color: #00bfae;
    }
  }
}

.currency-list {
  display: flex;
  font-size: 14px;
  color: #000;
  line-height: 1;
  font-weight: bold;

  .item {
    display: block;
    padding: 10px 12px;
    border: 1px solid #79bedf;
    cursor: pointer;
    transition: all 0.3s ease;

    &:first-child {
      border-right: none;
      border-radius: 3px 0 0 3px;
    }

    &:last-child {
      border-left: none;
      border-radius: 0 3px 3px 0;
    }

    &.active {
      background: #e5f2f9;
    }
  }
}
</style>
