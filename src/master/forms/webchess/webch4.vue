<template>
  <div class="form">
    <h4 class="text-center">Подмените статусы, которые не хотите показывать на сайте</h4>

    <div class="list-status" v-if="status">
      <div class="row" v-for="(item, i) in status" :key="i">
        <div class="col-6 left-col">
          <div class="color" :style="{'backgroundColor': item.color}"></div>
          <div class="form-control">{{item.name}}</div>
        </div>
        <div class="col-6">
          <select class="form-control" v-model="item.status">
            <option v-for="(it, i) in status" :key="i" 
            
             :value="it.id" :selected="it.id == it.status">{{it.name}}</option>
          </select>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webCh4",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      form: {},
      status: [],
      upd: false,
      required: {}
    };
  },
  created() {
    this.getStatus();
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    getStatus() {
      $.post(
        this.$root.apiurl,
        {
          action: "getStatus",
          id: this.object_id
        },
        data => {
          if (data) {
            this.status = data;
            console.log(data);
          }
        },
        "json"
      );
    },

    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      // $.post(
      //   this.$root.apiurl,
      //   {
      //     action: "setWebchessPrLang",
      //     id: this.object_id,
      //     lang: lang
      //   },
      //   data => {
      //     if (data) {
      //       console.log(data);
      //     }
      //   },
      //   "json"
      // );

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
.list-status {
  .row {
    margin-bottom: 25px;
    margin-right: -30px;
    margin-left: -30px;
    > div {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .left-col {
    display: flex;
    justify-content: space-between;
  }
  .color {
    width: 50px;
    margin-right: 15px;
    border-radius: 12px;
  }
  .form-control{
    height: auto !important;
  }
}
</style>
