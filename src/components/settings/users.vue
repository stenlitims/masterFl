<template>
  <div class="settings-right">
    <div class="settings-btns">
      <h3>Пользователи</h3>
      <div class="form-group">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-actions-bar users-table">
        <thead>
          <tr>
            <th></th>
            <th>ИМЯ</th>
            <th>ТИП ПОЛЬЗОВАТЕЛЯ</th>
            <th>ПРАВА ДОСТУПА К ОБЪЕКТАМ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in users" :key="i">
            <td>
              <label class="cus-check" >
                <input type="checkbox" @change="selectUs(item)"  v-model="item.checked">
                <span class="ch"></span>
              </label>

            </td>
            <td v-if="item.fullname">{{item.fullname}}</td>
            <td v-else>{{item.email}}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "users",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null,
      userIds:[]
    };
  },

  created() {
    if (!this.$store.state.users) {
      this.$store.commit("getUsers");
    }
  },

  mounted() {},
  computed: {
    users(){
      let data = this.$store.state.users;
      return data;
    }
  },
  methods: {
    selectUs(item){
    //  console.log(item);
      if(!this.userIds.includes(item.id)){
        this.userIds.push(item.id);
      }
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.users-table{
  .cus-check{
    margin-bottom: 0;
  }
}
</style>
