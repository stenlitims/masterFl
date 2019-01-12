<template>
  <div class="item-user">
    <div class="form-group">
      <label>ФИО</label>
      <input type="text" class="form-control" v-model="data.name">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" v-model="data.email">
    </div>
    <div class="form-group">
      <label>Тип пользователя</label>
      <select class="form-control">
        <option>1</option>
      </select>
    </div>

    <div class="form-group list-obj">
      <label>Права доступа к объектам</label>

      <div class="row item" v-for="(item, i) in $store.state.myObjects" :key="i">
        <div class="col-sm-6">
          <label class="cus-check big">
            <input type="checkbox" v-model="data.dataPer[i]">
            <span class="ch"></span>
            <div>
              <span class="title">{{item.name}}</span>
              <a href="#" class="t2">подробнее</a>
            </div>
          </label>
        </div>
        <div class="col-sm-6">
          <select class="form-control">
            <option>редактирование</option>
            <option>просмотр</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Gmail адрес для редактирования таблиц</label>
      <input type="text" class="form-control" v-model="data.gmail">
    </div>
  </div>
</template>

<script>
export default {
  name: "mUser",
  props: ["data"],
  data() {
    return {
      search: null
    };
  },

  created() {},

  mounted() {},
  computed: {},
  methods: {
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.cus-check {
  line-height: 1;
  .title {
    line-height: 1;
    font-size: 15px;
    display: block;
  }
  .t2 {
    font-size: 13px;
    line-height: 1;
    text-decoration: underline;
    color: #33475b;
    &:hover {
      text-decoration: none;
    }
  }
}

.list-obj {
  .item {
    margin-top: 10px;
    margin-bottom: 25px;
  }
}
</style>
