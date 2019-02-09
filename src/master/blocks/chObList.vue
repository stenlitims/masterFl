<template>
  <div class="list-obj">
    <div class="main">
      <label class="cus-check big" v-if="!hidename">
        <input type="checkbox" @change="add(main)" v-model="main.state.selected">
        <span class="ch"></span>
        <span class="title">{{main.text}}</span>
      </label>
      <div class="item" v-for="(b, bi) in child(main.id)" :key="bi">
        <div
          class="arr"
          :class="{'close': !b.state.opened}"
          @click="b.state.opened = !b.state.opened"
        ></div>
        <label class="cus-check">
          <input type="checkbox" @change="add(b)" v-model="b.state.selected">
          <span class="ch"></span>
          <span class="title">{{b.text}}</span>
        </label>
        <slide-up-down :active="b.state.opened" :duration="500">
          <div class="item" v-for="(s, si) in child(b.id)" :key="si">
            <label class="cus-check">
              <input type="checkbox" @change="add(s)" v-model="s.state.selected">
              <span class="ch"></span>
              <span class="title">{{s.text}}</span>
            </label>
          </div>
        </slide-up-down>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chObList",
  props: ["data", "dataId", "clear", "hidename"],
  data() {
    return {};
  },

  created() {
    if (this.clear) {
      for (let item of this.data) {
        item.state.selected = false;
        item.state.opened = false;
      }
    }
  },

  mounted() {},
  computed: {
    main() {
      return this.lodash.find(this.data, { id: "gproject_" + this.dataId });
    }
  },
  methods: {
    child(parent) {
      return this.lodash.filter(this.data, { parent: parent });
    },
    add(item) {
      this.$emit("setPr", item);
      this.lodash.forEach(this.data, (value, key) => {
        if (item.id == value.parent) {
          value.state.selected = item.state.selected;
        }
        if (
          item.parent == "#" &&
          value.permissions.gproject_id == item.permissions.object_id
        ) {
          value.state.selected = item.state.selected;
        }
      });

      let f = this.lodash.filter(this.data, { parent: item.parent });
      let ch = this.lodash.every(f, item => {
        return item.state.selected == true;
      });

      if (item.parent != "#") {
        let par = this.lodash.find(this.data, { id: item.parent });
        if (ch) {
          par.state.selected = true;
        } else {
          par.state.selected = false;
        }
      }

      let fAll = this.lodash.filter(this.data, it => {
        return (
          it.permissions.gproject_id == item.permissions.gproject_id &&
          it.parent != "#"
        );
      });

      let all = this.lodash.every(fAll, item => {
        return item.state.selected == true;
      });
      let main = this.lodash.find(this.data, { id: "gproject_" + this.dataId });
      if (all) {
        main.state.selected = true;
      } else {
        main.state.selected = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-obj {
  .item {
    padding-left: 25px;
    margin-top: 8px;
    position: relative;
  }
  .arr {
    position: absolute;
    left: 0px;
    top: 2px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 15px 15px;
    border-color: transparent transparent #cbd6e2 transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    &.close {
      transform: rotate(-45deg) translate(0, 2px);
      border-color: transparent transparent #8d959d transparent;
    }
  }
}
</style>
