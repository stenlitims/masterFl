<template>
  <div class="item-obj">
    <div class="row">
      <div class="col-sm-6">
        <label class="cus-check big">
          <input type="checkbox" @change="add(main)" v-model="main.state.selected">
          <span class="ch" :class="{'active': activeBlock}"></span>
          <div>
            <span class="title">{{item.name}}</span>
            <a href="#" class="t2 js-per-more">подробнее</a>
          </div>
        </label>
      </div>
      <div class="col-sm-6">
        <select class="form-control">
          <option>редактирование</option>
          <option>просмотр</option>
        </select>
      </div>
    </div>

    <div class="js-per-list">
      <div class="list-obj">
        <div class="main">
          <div class="item" v-for="(b, bi) in child(main)" :key="bi">
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
              <div class="item" v-for="(s, si) in child(b)" :key="si">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "chObList",
  props: ["clear", "item", "userId"],
  data() {
    return {
      data: null,
      activeBlock: false
    };
  },

  created() {
    if (this.userId) {
      this.data = this.$store.state.permissionsCMS[this.userId];
    } else {
      this.data = { ...this.$store.state.permissions.clear };
    }
  },

  mounted() {
    this.any();
  },
  computed: {
    main() {
      if (!this.data) {
        return null;
      }
      let main = this.lodash.find(this.data, {
        id: "gproject_" + this.item.id
      });
      //   console.log(main, this.item.id);

      return main;
    }
  },
  methods: {
    any() {
      let any = this.lodash.find(this.data, item => {
        return (
          item.state.selected == true &&
          item.permissions.gproject_id == this.item.id
        );
      });

      if (any) {
        this.activeBlock = true;
      } else {
        this.activeBlock = false;
      }
    },
    child(item) {
      let data = this.lodash.filter(this.data, { parent: item.id });
      if (this.main.state.selected) {
        for (let it of data) {
          it.state.selected = true;
        }
      }
      return data;
    },
    add(item) {
      //  this.$emit("setPr", item);
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

      let main = this.lodash.find(this.data, {
        id: "gproject_" + this.item.id
      });
      if (all) {
        main.state.selected = true;
      } else {
        main.state.selected = false;
      }
      this.any();
    }
  }
};
</script>

<style lang="scss">
.list-obj {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #cbd6e2;
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
