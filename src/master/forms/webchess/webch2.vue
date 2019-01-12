<template>
  <div class="form">
    <h4 class="text-center">Выберите поля, которые хотите отображать на сайте</h4>
    <div class="list-fields-wrap">
      <div class="list-fields">
        <div class="item" v-for="(item, i) in fields" :key="i">
          <label class="cus-check" :class="{'fields_hidden': item.hide}">
            <input
              type="checkbox"
              @change="setInput(i)"
              v-model="item.checked"
              :disabled="item.disabled"
              
            >
            <span class="ch"></span>
            <span class="title">{{item.name}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webCh2",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      fields: {},
      form: {},
      upd: false,
      required: {}
    };
  },
  created() {
    this.getFields();
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    getFields() {
      $.post(
        this.$root.apiurl,
        {
          action: "getFields",
          id: this.object_id
        },
        data => {
          if (data) {
            this.fields = data;
          }
        },
        "json"
      );
    },

    setInput(key) {
      if (key == "price") {
        this.fields.price_m2.checked = !this.fields.price_m2.checked;
        this.fields.discount_price_m2.checked = !this.fields.discount_price_m2
          .checked;
        this.fields.discount_price.checked = !this.fields.discount_price
          .checked;
      }

      this.setChanges2('fields');
    },

    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      if (!this.formChange) this.$emit("footerBtn", e);
      this.save(e);
    },
    save(e) {
      let fields = {};

      for (let i in this.fields) {
        if (this.fields[i].checked) {
          fields[i] = 1;
        } else {
          fields[i] = -1;
        }
      }

      // console.log(fields);

      $.post(
        this.$root.apiurl,
        {
          action: "setFields",
          id: this.object_id,
          data: fields
        },
        data => {
          if (data) {
            if (e == "save") {
              this.original = Object.assign({}, this.form);
              this.saveOk();
            } else {
              this.$emit("footerBtn", e);
            }
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.list-fields-wrap {
  display: flex;
  justify-content: center;
}
.list-fields {
  .item {
    margin-bottom: 5px;
  }
}
</style>
