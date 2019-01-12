<template>
  <div class="form">
    <h4 class="text-center">Выберите язык(и) для вашего интерактивного каталога</h4>

    <div class="list-langs" v-if="object">
      <div class="row">
        <div class="col-sm-4 col-md-3"></div>
        <div class="col-sm-8 col-md-9">
          <div class="list-title">Укажите название объекта на выбранном языке</div>
        </div>
      </div>
      <div class="row" v-for="(item, i) in langs" :key="i">
        <div class="col-sm-4 col-md-3">
          <label class="cus-check big">
            <input type="checkbox" v-model="item.selected" @change="setChanges2('langs')">
            <span class="ch"></span>
            <span class="title">{{item.lang}}</span>
          </label>
        </div>
        <div class="col-sm-8 col-md-9">
          <div class="form-group" :data-upd="upd">
            <input type="text" class="form-control" @keyup="setChanges2('langs')" v-model="item.name">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webch1",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      langs: {
        en: { lang: "Английский" },
        ru: { lang: "Русский", selected: true },
        uk: { lang: "Украинский" },
        by: { lang: "Белорусский" },
        kz: { lang: "Казахский" }
      },
      object: {},
      form: {},
      original: {},
      upd: false,
      required: {}
    };
  },
  created() {
    this.getOject();
    this.getLang();
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    getOject() {
      if (window.prObj) {
        if (window.prObj[this.object_id]) {
          this.object = window.prObj[this.object_id];
          if (!this.langs.ru.name) this.langs.ru.name = this.object.name;
          return;
        }
      }
      $.post(
        this.$root.apiurl,
        {
          action: "getGproject",
          id: this.object_id
        },
        data => {
          if (data) {
            this.object = data;
            if (!window.prObj) window.prObj = {};
            window.prObj[this.object_id] = data;
            if (!this.langs.ru.name) this.langs.ru.name = this.object.name;
          }
        },
        "json"
      );
    },

    getLang() {
      $.post(
        this.$root.apiurl,
        {
          action: "getWebchessPrLang",
          id: this.object_id
        },
        data => {
          if (data) {
            for (let i in data) {
              if (data[i].selected == "true") {
                this.langs[i].selected = true;
              } else {
                this.langs[i].selected = false;
              }
              this.langs[i].name = data[i].name;
            }
          }
          this.upd = "upd";
        },
        "json"
      );
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
      let lang = {};
      let i1 = 0;
      for (let i in this.langs) {
        if (this.langs[i].name !== undefined) {
          lang[i] = this.langs[i];
          i1++;
        }
      }

      if (!i1) {
        return;
      }

      $.post(
        this.$root.apiurl,
        {
          action: "setWebchessPrLang",
          id: this.object_id,
          lang: lang
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

<style lang="scss">
.list-langs {
  margin-top: 40px;
  .cus-check {
    margin-top: 5px;
  }
  .list-title {
    margin-bottom: 8px;
    padding-left: 7px;
  }
}
</style>
