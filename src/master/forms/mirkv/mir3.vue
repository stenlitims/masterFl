<template>
  <div class="form">
    <h4 class="text-center">Файл(ы) для размещения квартир на "Мир Квартир"</h4>

    <div class="list-files" v-if="data">
      <div class="row" v-for="(item, i) in data" :key="i">
        <div class="col-sm-3 col-lg-4">
          <div class="form-group">
            <input type="text" class="form-control" v-model="item.text" readonly>
          </div>
        </div>
        <div class="col-sm-9 col-lg-8">
          <div class="form-group">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                :id="'input'+item.id"
                v-model="item.link"
                readonly
              >
              <div class="input-group-append">
                <button
                  class="btn btn-md waves-effect"
                  @click="copy(item.id)"
                  type="button"
                >Копировать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="text-center">
        <button class="btn btn-md waves-effect" @click="sendToEmail">Отправить себе на почту</button>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import chObList from "@/master/blocks/chObList";

export default {
  name: "mir1",
  mixins: [masterMixin],
  components: {
    chObList
  },
  data() {
    return {
      errors: [],
      success: false,
      data: {},
      links: {},
      ids: [],
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
    this.listO();
    this.getCids();
  },
  updated() {},
  watch: {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  computed: {},
  methods: {
    listO() {
      if (!this.data) return [];
      let data = [];
      let ids = [];
      for (let item of this.data.permissions_tree) {
        if (item.parent == "#" && item.state.selected) {
          let it = {
            id: item.permissions.gproject_id,
            text: item.text
          };
          data.push(it);
          ids.push(item.permissions.gproject_id);
        }
      }
      this.ids = ids;
      this.data = data;
    },
    getCids() {
      $.post(
        this.$root.apiurl,
        {
          action: "getCids",
          ids: this.ids
        },
        data => {
          let temp = [];
          for (let item of this.data) {
            item.link = data[item.id];
            temp.push(item);
          }
          this.data = temp;
        },
        "json"
      );
    },
    copy(id) {
      var copyTextarea = document.querySelector("#input" + id);
      copyTextarea.focus();
      copyTextarea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        //  console.log("Copying text command was " + msg);
      } catch (err) {
        //     console.log("Oops, unable to copy");
      }
    },
    sendToEmail() {
      (async () => {
        const { value: sw } = await swal({
          title: "Отправить?",
          showCancelButton: true,
          confirmButtonText: "Да, отправить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect"
        });

        if (sw) {
          $.post(
            this.$root.apiurl,
            {
              action: "mirSendToEmail",
              data: this.data
            },
            data => {
              if ((data.type = "success")) {
                swal("Отправлено!", "", "success");
              }
            },
            "json"
          );
        }
      })();
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.col-lg-6 {
  margin-bottom: 30px;
}
</style>
