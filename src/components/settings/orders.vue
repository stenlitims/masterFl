<template>
<div class="settings-right">
  <h3>Ваш тарифный план</h3>
  <div class="row tarif-list">
    <div class="col-lg-3">
      <div class="t">Тариф</div>
      <div class="item">STANDART</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Тариф</div>
      <div class="item">STANDART</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Тариф</div>
      <div class="item">STANDART</div>
    </div>
    <div class="col-lg-3">
      <div class="t">Тариф</div>
      <div class="item">STANDART</div>
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

  created() {},

  mounted() {},
  computed: {

  },
  methods: {

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
