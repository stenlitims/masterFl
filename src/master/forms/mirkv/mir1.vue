<template>
  <div class="form">
    <h4 class="text-center">Выберите объект(ы), которые хотите интегрировать с "Мир Квартир"</h4>

    <div v-if="data">
      <div class="list-object">
          <div >
            <div class="item" v-for="(item, i) in listO" :key="i">
              <label class="cus-check big">
                <input type="checkbox" @change="selMain" v-model="item.selected">
                <span class="ch"></span>
                <span class="title">{{item.text}}</span>
              </label>
            </div>
          </div>
      </div>

      <div v-if="errors.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errors" :key="i">
            {{item}}
          </p>
        </div>
      </div>


     
    </div>
    


  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "mir1",
  mixins: [masterMixin],

  data() {
    return {
      errors: [],
      success: false,
      selData: [],
      data: null,

      form: {
        active: ""
      },
      required: {
        active: ""
      }
    };
  },
  created() {
    this.getData();
    if (window.mkvselData) {
      this.selData = window.mkvselData;
    }
  },
  updated() {},
  watch: {},
  mounted() {
    this.selMain();
    this.$emit("btnActive", !this.error.length);
  },
  computed: {
    listO() {
      if (!this.data) return [];
      let data = [];
      for (let item of this.data.permissions_tree) {
        if (item.parent == "#") {
         // item.selected = false;
          data.push(item);
        }
      }
      return data;
    }
  },
  methods: {
    getData() {
      if (window.mirKv) {
        this.data = window.mirKv;
        return;
      }
      $.get(
        this.$root.mainurl + "/api?action=getUserPermissions&ut=mirkvartir",
        data => {
          //  console.log(data);
          this.data = data.data;
          window.mirKv = this.data;
          this.selMain();
        },
        "JSON"
      );
    },
    selMain() {
      if (!this.data) return [];
      let data = [];
      for (let item of this.data.permissions_tree) {
        if (item.parent == "#" && item.selected) {
          data.push(item.permissions.object_id);
        }
      }

      if (data.length) {
        //  console.log(data);
        this.form.active = true;
      } else {
        this.form.active = false;
      }

      this.errorUpd();
    },
    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.errors = [];
      if (this.error.length) {
        this.errors.push("Выберете ЖК");
        setTimeout(() => {
          this.errors = [];
        }, 1500);
        return;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-object {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  .item {
    margin-bottom: 10px;
  }
}
</style>
