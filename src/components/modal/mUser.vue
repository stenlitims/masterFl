<template>
  <div class="item-user">
    <div class="form-group">
      <label>ФИО</label>
      <input type="text" class="form-control" v-model="data.fullname">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" v-model="data.email">
    </div>
    <div class="form-group">
      <label>Тип пользователя</label>
      <select class="form-control" v-model="data.extended.type">
        <option v-for="(item, i) in $store.state.typeUsers" :key="i" :value="i">{{item}}</option>
      </select>
    </div>

    <div class="form-group list-obj-m">
      <label>Права доступа к объектам</label>

      <div class="item-obj" v-for="(item, i) in myObjects" :key="i">
        <div class="row">
          <div class="col-sm-6">
            <label class="cus-check big">
              <input type="checkbox" v-model="data.dataPer[i]">
              <span class="ch"></span>
              <div>
                <span class="title">{{item.name}}</span>
                <a href="#" class="t2 js-per-more">подробнее</a>
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

        <div class="js-per-list">
          <chObList
            v-if="permissions.length"
            class="text-border"
            :data="permissions"
            :dataId="i"
            :clear="clearPer"
          ></chObList>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Gmail адрес для редактирования таблиц</label>
      <input type="text" class="form-control" v-model="data.extended.email">
    </div>
  </div>
</template>

<script>
import chObList from "@/master/blocks/chObList";

function perToggle(e) {
  e.preventDefault();
  if ($(this).text() == "подробнее") {
    $(this).text("скрыть");
  } else {
    $(this).text("подробнее");
  }

  $(this)
    .closest(".item-obj")
    .find(".js-per-list")
    .slideToggle();
}

export default {
  name: "mUser",
  props: ["data"],

  components: {
    chObList
  },
  data() {
    return {
      clearPer: true,
      search: null
    };
  },

  created() {
    // console.log(this.data);
    if (!this.data.extended) {
      this.data.extended = {};
    }
    if (!this.data.dataPer) {
      this.data.dataPer = {};
    }
    if (this.$store.state.rmodal.type != "editUser") {
      this.clearPer = false;
    }
    if (!this.$store.state.permissions.web.length) {
      this.$store.commit("loadPermissions", "web");
    }
  },

  mounted() {
    //  console.log(this.$store.state.users, this.data);
    if (!window.jsPerMore) {
      $(document).on("click", ".js-per-more", perToggle);
      window.jsPerMore = true;
    }
  },
  beforeDestroy() {
    $(document).off("click", ".js-per-more", perToggle);
    window.jsPerMore = false;
  },
  computed: {
    permissions() {
      if (this.$store.state.rmodal.type != "editUser") {
        return [...this.$store.state.permissions.web];
      } else {
        return [...this.$store.state.permissions.web];
      }
    },
    myObjects() {
      return this.$store.state.myObjects;
    }
  },
  methods: {
    getUserIds() {
      let ids = [];
      for (let id in this.$store.state.users) {
        ids.push(id);
      }
      return ids;
    },
    send(data) {
      // console.log(this.$store.state.permissions.cms);
    }
  }
};
</script>

<style lang="scss">
</style>
