<template>
<div class="settings-right">
  <h3>Настойка уведомлений</h3>
  <div class="list-switch">
    <div class="item" v-for="(item, i) in list" :key='i'>
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
        system: {
          title: "Системные уведомления",
          val: 1
        },
        analitica: {
          title: "Уведомления об аналитике продаж",
          val: 0
        },
        newagent: {
          title: "Уведомления от новых агентов",
          val: 1
        }
      },
      data2: {}
    };
  },

  created() {},

  mounted() {},
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
    send(data) {
      // console.log(this.data);
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
