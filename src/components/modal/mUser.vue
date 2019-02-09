<template>
  <div class="item-user">
    <div class="form-group">
      <label>ФИО</label>
      <input type="text" class="form-control" v-model="data.fullname">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" @keyup="setGmal" v-model="data.email">
    </div>
    <div class="form-group">
      <label>Тип пользователя</label>
      <select class="form-control" v-model="data.extended.type">
        <option v-for="(item, i) in $store.state.typeUsers" :key="i" :value="i">{{item}}</option>
      </select>
    </div>

    <div class="form-group list-obj-m">
      <label>Права доступа к объектам</label>

      <div v-if="countObjects">
        <pModalPr :item="item" :userId="data.internalKey" v-for="(item, i) in myObjects" :key="i"></pModalPr>
      </div>

      <div v-else class="text-center">У вас нет созданных объектов</div>
    </div>

    <div class="form-group">
      <label>Gmail адрес для редактирования таблиц</label>
      <input type="text" class="form-control" v-model="data.extended.email">
    </div>
  </div>
</template>

<script>
import pModalPr from "@/components/modal/pModalPr";

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
    pModalPr
  },
  data() {
    return {
      clearPer: true,
      search: null
    };
  },

  watch: {},

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
  
    
    this.setGmal();
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
        return false;
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
    setGmal(e) {
      if (this.isGmailAddress(this.data.email) && !this.data.extended.email) {
        this.data.extended.email = this.data.email;
      } else {
        //  this.data.extended.email = "";
      }
    },
    send(data) {
      // console.log(this.$store.state.permissions.cms);
    }
  }
};
</script>

<style lang="scss">
</style>
