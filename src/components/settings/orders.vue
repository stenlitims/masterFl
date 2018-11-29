<template>
<div class="settings-right">
  <h3>Ваш тарифный план</h3>
  <div class="row tarif-list" v-if="$store.state.tariff.code">
    <div class="col-lg-3">
      <div class="t">Тариф</div>
      <div class="item" style="text-transform: uppercase;">{{$store.state.tariff.code}}</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Период</div>
      <div class="item">{{$store.state.tariff.period}} {{declension($store.state.tariff.period, ['месяц', 'месяца', 'месяцев'] )}}</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Дата начала периода</div>
      <div class="item">STANDART</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Дата окончания периода</div>
      <div class="item">{{adate.day}}.{{adate.month}}.{{adate.year}}</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Добавлено объектов</div>
      <div class="item">{{$store.state.account.gprojects_total}}</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Добавлено квартир</div>
      <div class="item">{{$store.state.account.flats_total}} из {{$store.state.account.flats_limit}}</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Создано каталогов для сайта</div>
      <div class="item"> 1 из {{$store.state.tariff.web_access}}</div>
    </div>
    
  </div>


  <br><br> <br>
  <h3>Ваши платежи</h3>
  <div class="table-responsive permissions-table">
    <table class="table table-actions-bar">
        <thead>
            <tr>
                <th>Услуга</th>
                <th>Дата</th>
                <th>Заказ</th>
                <th>Статус</th>
                <th>Сумма</th>
                <th style="min-width: 80px;" class="text-center">Детали</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
  </div>

</div>
  
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "orders",
  mixins: [settings],
  data() {
    return {
   
    };
  },

  created() {
    if(!this.$store.state.tariff.gprojects_total){
      this.$store.commit("getTarifPlan");
    }
  },

  mounted() {

  },
  computed: {
    adate(){
      if(!this.$store.state.account.end_date) return;
      let date1 = this.formatDate(this.$store.state.account.end_date);
      return date1;
    }
  },
  methods: {
    formatDate(adate){
      if(!adate) return;
      adate = new Date(adate);
      let out = {
        day: adate.getDate(),
        month: adate.getMonth() + 1,
        year: adate.getFullYear(),
      };

      return out;
    },

    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.tarif-list{
  margin-right: -10px !important;
  margin-left: -10px !important;
  font-size: 14px;
  > div{
    padding-left: 10px !important;
    padding-right: 10px !important;
    margin-bottom: 15px;

  }
  .t{
    margin-bottom: 10px;
    padding-left: 10px;
  }
  .item{
    padding: 12px;
    border-radius: 12px;
    background: #E6F0F6;
    text-align: center;
  }
}
</style>
