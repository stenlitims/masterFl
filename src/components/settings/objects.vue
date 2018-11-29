<template>
<div class="settings-right">
  <h3>Объекты</h3>
   <div class="settings-btns">
     <div class="form-group search">
        <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <div class="btn-group  btn-group-toggle">
        <button class="btn btn-lg btn-success waves-effect">Мои объекты</button>
        <button class="btn btn-lg btn-outline-success waves-effect">Доступные мне</button>
      </div>
      <router-link  :to="{ name: 'new_object', params: { id: 1 }}" class="btn btn-lg btn-danger waves-effect">Создать объект</router-link>
    </div>

    <div class="list-settings">
      <div class="item control-wrap" v-for="(item, i) in objects" :key="i">
          <div class="c-title">{{item.name}}</div>
          <div class="c-btns">
            <router-link  :to="{ name: 'object', params: { id: 1, oid:item.id }}" class="btn btn-outline-primary waves-effect">Редактировать</router-link>
            <button  @click="deleteObject(item.id)" class="btn btn-outline-danger waves-effect">Удалить</button>
          </div>
      </div>
    </div>
</div>
  
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "objects",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null
    };
  },

  created() {
    this.$store.commit("loadMyObjects");
  },

  mounted() {},
  computed: {
    objects() {
      let data = this.$store.state.myObjects;
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
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.settings-btns {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  .btn-group {
    //   margin-right: 30px;
  }
  .form-group {
    margin-bottom: 0;
  }
}
.list-settings {
  .c-btns {
    .btn {
      margin: 0 10px;
    }
  }
}
</style>
