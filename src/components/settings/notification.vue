<template>
  <div class="settings-right">
    <h3>Настойка уведомлений</h3>
    <div class="list-switch">
      <div class="item" v-for="(item, i) in list" :key="i">
        <cusSwitch :title="item.title" :val="item.val" @event="ch(item, i)"></cusSwitch>
      </div>
    </div>
  </div>
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "notification",
  mixins: [settings],
  data() {
    return {
      data: {
        sys_notification: {
          title: "Системные уведомления",
          val: true
        },
        analitic_notification: {
          title: "Уведомления об аналитике продаж",
          val: true
        },
        newagent_notification: {
          title: "Уведомления от новых агентов",
          val: true
        }
      },
      data2: {}
    };
  },

  created() {
    if (!this.$store.state.userSettings) {
      this.$store.commit("loadUserSettings", "test");
    } else {
      this.updData();
    }
  },

  watch: {},

  mounted() {
    setTimeout(() => {
      this.updData();
    }, 1000);
  },
  computed: {
    list() {
      if (this.$store.state.changes.count.length == 0) {
        this.data2 = this.lodash.cloneDeep(this.data);
      }
      return this.data2;
    }
  },
  methods: {
    ch(item, k) {
      item.val = !item.val;
      this.setChanges(k, item.val, this.data[k].val);
    },
    updData() {
      let userSettings = this.$store.state.userSettings;
      let temp = this.lodash.cloneDeep(this.data);
      for (let item in temp) {
        temp[item].val = userSettings[item];
      }
      this.data = this.lodash.cloneDeep(temp);
      this.data2 = this.lodash.cloneDeep(temp);
    },
    send(data) {
      console.log(this.data2);

      $.post(
        this.$store.state.apiurl,
        {
          action: "settUserSettings",
          keys: {
            sys_notification: this.data2.sys_notification.val,
            analitic_notification: this.data2.analitic_notification.val,
            newagent_notification: this.data2.newagent_notification.val
          }
        },
        data => {
          if (data.type == "success") {
            for (let item in this.data2) {
              this.$store.state.userSettings[item] = this.data2[item];
            }
            this.updData();
            this.saveOk();
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss">
.list-switch {
  .item {
    margin-bottom: 25px;
  }
}
</style>
