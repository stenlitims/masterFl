<template>
  <div class="master-header">
      <div class="container">
        <div class="header-info">
          <div>{{name}}</div>
          <div>Шаг {{stepsh}} из {{steps.length}}</div>
        </div>
        <div class="step-list-wrap">
          <div class="step-list">
            <div class="width">
              <div :style="width"></div>
            </div>
              <div class="item" 
              @click="setSpep(i)"
              :class="{'active': i == step, 'complete': item.complete}" v-for="(item, i) in steps" :key="i">
                <div class="cl"></div>
                <div class="title">{{item.name}}</div>
              </div>
          </div>
        </div>  
      </div>
      
      

  </div>
</template>

<script>
export default {
  name: "MasterHeader",
  props: ["steps", "name", "step"],
  data() {
    return {
      //  steps: []
    };
  },
  computed: {
    stepsh() {
      let step = this.step + 1;
      if (this.steps.length < step) {
        step = step - 1;
      }
      return step;
    },
    width() {
      let width = (100 / (this.steps.length - 1)) * this.step;
      // console.log(width);
      return {
        width: width + "%"
      };
    }
  },
  methods: {
    setSpep(n) {
      if (this.steps[n].complete || this.steps[n - 1].complete) {
        this.$emit("setSpep", n);
      }
    }
  }
};
</script>

<style lang="scss">
.step-list-wrap {
  margin-left: 50px;
  margin-right: 50px;
}
.master-header {
  padding-bottom: 60px;
  padding-top: 30px;
  overflow: hidden;
  .header-info {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .step-list {
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    justify-content: space-between;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 20px;
      right: 20px;
      background: #ECF0F4;
      height: 2px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .width {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      left: 20px;
      right: 20px;
      > div {
        background: #5FBEAA;
        height: 4px;
        transition: width 0.3s linear;
      }
    }
    .item {
      position: relative;
      z-index: 2;
      &.active {
        .cl {
          border: 4px solid #5FBEAA;
        }
      }
      &.complete {
        cursor: pointer;
        &.active {
          .cl {
            border: 4px solid #5FBEAA;
            box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
            background: #fff;
            &:before {
              content: none;
            }
          }
        }
        .cl {
          background: #5FBEAA;
          border: none;

          &:before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 7px;
            height: 12px;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: translate(-50%, -60%) rotate(45deg);
          }
        }
      }
      .cl {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #ECF0F4;
        background: #fff;
      }
      .title {
        position: absolute;
        left: 50%;
        bottom: -30px;
        transform: translate(-50%, 0);
        min-width: 200px;
        text-align: center;
      }
    }
  }
}

@media (max-height: 640px) {
  .master-header {
    padding-bottom: 36px;
    padding-top: 20px;
  }
  .master-header .step-list .item .title {
    font-size: 13px;
    bottom: -26px;
  }
  .master-header .step-list .item .cl {
    width: 24px;
    height: 24px;
  }
  .master-header .header-info {
    font-size: 16px;
  }
  .master-header .step-list .item.complete.active .cl {
    border-width: 5px;
  }
  .master-header .step-list .item.complete .cl:before {
    width: 7px;
  }
}
</style>
