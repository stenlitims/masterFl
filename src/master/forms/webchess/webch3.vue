<template>
  <div class="form">
    <h4 class="text-center">Выберите дома и секции, которые хотите отображать на сайте</h4>
    <div class="row" v-if="data.permissions_tree">
      <div class="col-lg-6">
        <chObList
          class="text-border"
          :data="data.permissions_tree"
          :dataId="object_id"
          @setPr="setChanges2('pr')"
        ></chObList>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import chObList from "@/master/blocks/chObList";

export default {
  name: "webCh3",
  mixins: [masterMixin],
  components: {
    chObList
  },
  data() {
    return {
      errors: [],
      success: false,
      data: {},
      form: {},
      upd: false,
      required: {}
    };
  },
  created() {
    this.getData();
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    getData() {
      $.get(
        this.$root.mainurl + "/api?action=getUserPermissions&ut=web",
        data => {
          this.data = data.data;
        },
        "JSON"
      );
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

      //   console.log(data_to_send);

      if (!this.formChange) {
        this.$emit("footerBtn", e);
        return false;
      }

      this.save(e);

      // $.ajax({
      //   url:
      //     this.$root.mainurl +
      //     "/api?action=updateUserPermissions&ut=web",
      //   dataType: "json",
      //   data: { permissions_data: JSON.stringify(data_to_send) },
      //   method: "POST"
      // })
      //   .done(response => {
      //     if (response.error) {
      //       swal("Ошибка!", response.error.message, "error");
      //     } else {
      //       this.$emit("footerBtn", e);
      //       //   swal("Успешно обновлено!", response.data.message, "success");
      //     }
      //   })
      //   .fail(function(jqXHR, textStatus) {
      //     console.log(jqXHR);
      //     swal("Ошибка!", jqXHR.responseText, "error");
      //   });

      return;
    },
    save(e) {
      let data_to_send = this.getPerm();
      if (e == "save") {
        e = null;
      }
      this.setPermissions(data_to_send, "web", e);
    }
  }
};
</script>

<style lang="scss">
</style>
