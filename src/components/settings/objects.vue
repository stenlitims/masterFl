<template>
  <div class="settings-right">
    <h3>Объекты</h3>
    <div class="settings-btns">
      <div class="form-group search" v-if="countObjects">
        <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <div class="btn-group btn-group-toggle">
        <button
          @click="chObj('my')"
          :class="{'btn-outline-success':objtype == 'other', 'btn-success':objtype != 'other'}"
          class="btn btn-lg waves-effect"
        >Мои объекты</button>
        <button
          @click="chObj('other')"
          :class="{'btn-outline-success':objtype == 'my', 'btn-success':objtype != 'my'}"
          class="btn btn-lg waves-effect"
        >Доступные мне</button>
      </div>
      <router-link
        :to="{ name: 'new_object', params: { id: 1 }}"
        class="btn btn-lg btn-or waves-effect"
      >Создать объект</router-link>
    </div>

    <div class="list-settings">
      <div class="item control-wrap" v-for="(item, i) in objects" :key="i">
        <div class="c-title">{{item.name}}</div>
        <div class="c-btns">
          <router-link
            :to="{ name: 'object', params: { id: 1, oid:item.id }}"
            class="btn btn-outline-primary waves-effect"
          >Редактировать</router-link>
          <button @click="deleteObject(item.id)" class="btn btn-outline-primary2 waves-effect">Удалить</button>
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
      search: null,
      objtype: "my"
    };
  },

  created() {
    this.$store.commit("loadMyObjects");
  },

  mounted() {},
  computed: {
    objects() {
      let data = this.$store.state.myObjects;
      if (this.objtype != "my") {
        let data = this.$store.state.myObjectsCMS;
      }
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
    chObj(type) {
      if (!this.$store.state.myObjectsCMS) {
        this.$store.commit("loadMyObjects", "cms");
      }
      this.objtype = type;
    },
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
