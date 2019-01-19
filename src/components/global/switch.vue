<template>
<div class="switch-wrap control-wrap">
  <div class="c-title">{{title}}</div>
  <div class="switch" :class="{'active': val}" @click="event">
    <div class="t on">on</div>
    <div class="t off">off</div>
    <div class="p"></div>
  </div>

</div>
</template>

<script>
export default {
  name: "cusSwitch",
  props: ["val", "title"],
  data() {
    return {
      value: false
    };
  },
  created() {
    this.value = this.val;
  },
  updated() {
    this.value = this.val;
  },
  mounted() {},
  computed: {},
  methods: {
    event() {
    //  this.value = !this.value;
      this.$emit("event", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.switch {
  background: #eaf0f6;
  border-radius: 8px;
  border: 2px solid #cbd6e2;
  display: flex;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  .p {
    position: absolute;
    width: calc(50% + 6px);
    top: -5px;
    bottom: -5px;
    left: -3px;
    border: 2px solid #cbd6e2;
    background: #fff;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .t {
    text-transform: uppercase;
    padding: 8px;
    font-weight: bold;
    font-size: 12px;
  }
  &.active {
    background: #5fbeaa;
    border-color: #5fbeaa;
    color: #fff;
    .p {
      border-color: #5fbeaa;
      box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
      left: calc(50% + 3px);
    }
  }
}
</style>
