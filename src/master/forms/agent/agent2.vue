<template>
  <div class="form">
    <h3 class="text-center">Настройка доступа</h3>
  
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
  name: "agent1",
  mixins: [masterMixin],
  components: {
    chObList
  },
  data() {
    return {
      data: [],
      list: [],
      form: {
        type: "",
        name: "",
        email: "",
        site: ""
      },
      required: {
        active: ""
      }
    };
  },
  created() {
    this.getData();
    //  = this.selMain();
    if (!this.list.length) {
      //  this.$bus.emit("setStep", 0);
    }
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    getData() {
      if (!window.agent_id) {
        this.$bus.emit("setStep", 0);
      }

      if (window.agent) {
        this.data = window.agent;
        this.selMain();
        return;
      }
      $.get(
        this.$root.mainurl +
          "/api?action=getUserPermissions&ut=cms&agent_id=" +
          window.agent_id,
        data => {
          //  console.log(data);
          this.data = data.data;
          window.agent = this.data;
          this.selMain();
        },
        "JSON"
      );
    },
    selMain() {
      if (!this.data) return [];
      let data = [];
      for (let item of this.data.permissions_tree) {
        if (item.parent == "#") {
          data.push(item.permissions.object_id);
        }
      }
      this.list = data;
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
        .done(response => {
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

<style lang="scss">
</style>
