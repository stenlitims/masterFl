<template>
  <div class="form">
    <h4 class="text-center">Укажите, что именно вы хотите передавать на "Мир Квартир"</h4>

    <div class="row">
      <div class="col-lg-6" v-for="(item, i) in list" :key="i">
        <chObList class="text-border" :data="data.permissions_tree" :dataId="item"></chObList>
      </div>
    </div>
    


  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import chObList from "@/master/blocks/chObList";

export default {
  name: "mir2",
  mixins: [masterMixin],
  components: {
    chObList
  },
  data() {
    return {
      errors: [],
      success: false,
      data: [],
      list: [],
      form: {
        active: ""
      },
      required: {
        active: ""
      }
    };
  },

  created() {
    this.data = window.mirKv;
    this.list = this.selMain();
    if (!this.list.length) {
      this.$bus.emit("setStep", 0);
    }
  },
  updated() {},
  watch: {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  computed: {},
  methods: {
    selMain() {
      if (!this.data) return [];
      let data = [];
      for (let item of this.data.permissions_tree) {
        if (item.parent == "#" && item.selected) {
          data.push(item.permissions.object_id);
        }
      }
      return data;
    },
    getPerm() {
      let f = this.lodash.filter(this.data.permissions_tree, item => {
        return item.state.selected == true;
      });

      let data = [];

      f.forEach(item => {
        data.push(item.permissions);
      });

      return data;
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      let data_to_send = this.getPerm();
     // console.log(data_to_send);

      if (!this.formChange) {
        this.$emit("footerBtn", e);
        return false;
      }

      $.ajax({
        url:
          this.$root.mainurl +
          "/api?action=updateUserPermissions&ut=mirkvartir",
        dataType: "json",
        data: { permissions_data: JSON.stringify(data_to_send) },
        method: "POST"
      })
        .done((response) => {
          if (response.error) {
            swal("Ошибка!", response.error.message, "error");
          } else {
            this.$emit("footerBtn", e);
            //   swal("Успешно обновлено!", response.data.message, "success");
          }
        })
        .fail(function(jqXHR, textStatus) {
          console.log(jqXHR);
          swal("Ошибка!", jqXHR.responseText, "error");
        });

      return;

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.col-lg-6 {
  margin-bottom: 30px;
}
</style>
