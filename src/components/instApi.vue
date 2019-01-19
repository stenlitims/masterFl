<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Интеграция по API</div>
      </div>
    </div>

    <div class="main-container">
      <div class="card-box">
        <h5 class="text-muted text-uppercase m-t-0 m-b-20">
          <b>Авторизация через API</b>
        </h5>
        <p class="m-b-20">
          Данные для авторизации
          <strong>chess_api_login</strong> и
          <strong>chess_api_key</strong> следует
          передавать в каждом запросе.
        </p>

        <h3 class="m-t-30 m-b-20">Данные для авторизации</h3>

        <form id="crmConfigForm" action="#" method="POST">
          <div class="form-group m-b-20">
            <label>Логин FLATRIS -
              <code>chess_api_login</code>
            </label>
            <input
              type="text"
              v-model="$store.state.api.login"
              readonly="readonly"
              class="form-control"
            >
          </div>

          <div class="form-group m-b-30">
            <label>Ключ API FLATRIS -
              <code>chess_api_key</code>
            </label>
            <input
              type="text"
              v-model="$store.state.api.key"
              readonly="readonly"
              class="form-control"
            >
          </div>
        </form>
      </div>

      <div class="card-box">
        <h5 class="text-muted text-uppercase m-t-0 m-b-20">
          <b>Список помещений</b>
        </h5>
        <p>Метод для получения списка квартир с возможностью фильтрации. В ответ вы получите JSON массив.</p>

        <h3 class="m-t-30">URL метода</h3>
        <p class="m-b-30">
          <code>GET {{$store.state.mainurl}}/{{$store.state.api.json}} </code>
        </p>

        <div class="term_table_wrapper">
          <table class="term_table table">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Тип</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>int</td>
                <td>ID квартиры в базе FLATRIS, напр.
                  <code>1001</code>
                </td>
              </tr>
              <tr>
                <td>id_custom</td>
                <td>string</td>
                <td>ID квартиры в таблице Google Sheets, напр.
                  <code>522</code>
                </td>
              </tr>
              <tr>
                <td>gproject_id</td>
                <td>int</td>
                <td>ID объекта, напр.
                  <code>333</code>
                </td>
              </tr>
              <tr>
                <td>gproject</td>
                <td>string</td>
                <td>Название объекта, напр.
                  <code>ЖК Тестовый</code>
                </td>
              </tr>
              <tr>
                <td>building_id</td>
                <td>int</td>
                <td>ID дома, напр.
                  <code>223</code>
                </td>
              </tr>
              <tr>
                <td>building</td>
                <td>string</td>
                <td>Название дома, напр.
                  <code>1</code>
                </td>
              </tr>

              <tr>
                <td>section_id</td>
                <td>int</td>
                <td>ID секции, напр.
                  <code>555</code>
                </td>
              </tr>
              <tr>
                <td>section</td>
                <td>string</td>
                <td>Название секции, напр.
                  <code>5</code>
                </td>
              </tr>

              <tr>
                <td>rooms</td>
                <td>int</td>
                <td>Количество комнат, напр.
                  <code>2</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="m-t-30">Пример запроса</h3>
        <p class="m-b-30">
          <code>GET {{$store.state.mainurl}}/{{$store.state.api.json}}?building_id=552&rooms=3&chess_api_login=login&chess_api_key=key</code>
        </p>

        <h3 class="m-t-30">Пример ответа</h3>
        <p class="m-b-30">
          <code v-pre>
            {"data":{"message":"Запрос выполнен
            успешно!","flats":[{"id":"8815","id_custom":"2","number":"3","property_type":"flat","discount_price_m2":"16200","discount_price":"891000","price_m2":"16200","price":"891000","discount_end_date":"0000-00-00
            00:00:00","comment":"","crm_lead_ids":"15155,15156","floor":"1","floor_id":"1344","type":"1а","plan_id":"2058","square_total":"55","square_live":"19","img":"https:\/\/flatris.com.ua\/assets\/uploads\/71\/plans\/img-uc","img_3d":null,"rooms":"1","levels":"1","balconies":"0","loggias":"0","square_balconies":"10.5","square_loggias":"80.5","bathrooms_combined":"0","bathrooms_separate":"0","section":"1","section_id":"124","building":"107","building_id":"72","queue":"3","gproject":"ЖК
            Тестовый","gproject_id":"113","currency":"UAH","status":"Резерв","status_alias":"reserved","status_id":"3"}]}}
          </code>
        </p>
      </div>

      <div class="card-box">
        <h5 class="text-muted text-uppercase m-t-0 m-b-20">
          <b>Обновление статусов помещений</b>
        </h5>
        <p>Метод для обновления статусов квартир. В ответ вы получите JSON массив.</p>

        <h3 class="m-t-30">URL метода</h3>
        <p class="m-b-30">
          <code>POST {{$store.state.mainurl}}/{{$store.state.api.update}}</code>
        </p>

        <div class="term_table_wrapper">
          <table class="term_table table">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Тип</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>products</td>
                <td>array</td>
                <td>
                  Массив вида
                  <code
                    v-pre
                  >[ ['id'=> 3898, 'status'=>'Свободно'], ['id'=> 3899, 'status'=>'Продано'] ]</code>,
                  где
                  <strong>id</strong> - ID квартиры в базе FLATRIS,
                  <strong>status</strong> - статус квартиры
                  (Свободно, Резерв, Продано, Не в продаже)
                </td>
              </tr>
              <tr>
                <td>chess_api_login</td>
                <td>string</td>
                <td>Логин FLATRIS</td>
              </tr>
              <tr>
                <td>chess_api_key</td>
                <td>string</td>
                <td>Ключ API FLATRIS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="m-t-30">Пример запроса</h3>
        <p class="m-b-0">
          <code>POST URL {{$store.state.mainurl}}/{{$store.state.api.update}}</code>
        </p>
        <p class="m-b-30">
          <code>
            POST BODY
            chess_api_login=login&chess_api_key=key&products[0][id]=3898&products[0][status]=Свободно&products[1][id]=3899&products[1][status]=Продано
          </code>
        </p>
        <h3 class="m-t-30">Пример ответа</h3>
        <p class="m-b-30">
          <code v-pre>{"data":{"message":"Данные успешно обновлены!","affected_ids":[3898, 3899]}}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "instApi",
  data() {
    return {
      search: null
    };
  },

  created() {
    window.routeParam = {name: this.$route.name, params: this.$route.params};
    if(!this.$store.state.api.login){
      this.$store.commit("getApi");
    }
  },

  mounted() {},
  computed: {
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
