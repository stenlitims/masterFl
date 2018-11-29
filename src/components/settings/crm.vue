<template>
<div class="settings-right">

   <div class="settings-btns">
     <h3>Шахматка для отдела продаж</h3>

     <div class="form-group">
        <div class="search">
          <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>

 
</div>
  
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "instWebchess",
  mixins: [settings],
  data() {
    return {
      data: {},
      search: null
    };
  },

  created() {
    if (!this.$store.state.myObjects) {
      this.$store.commit("loadMyObjects");
      
    }
    if (!this.$store.state.permissions.web.length) {
      this.$store.commit("loadPermissions", "web");
    }
  },

  mounted() {},
  computed: {
    list() {
      let data = this.perObjects("web");
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

</style>
