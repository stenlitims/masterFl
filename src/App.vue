<template>
  <div id="app">
    <div class="wrap-v-master">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
}

body {
  background: #fff;
}

/* width */
.c-sc::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.c-sc::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.c-sc::-webkit-scrollbar-thumb {
  background: rgb(130, 190, 177);
}

/* Handle on hover */
.c-sc::-webkit-scrollbar-thumb:hover {
  background: rgb(95, 190, 170);
}

.del-btn {
  background: #ff4124;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  &.abs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  span {
    transform: rotate(45deg);
    display: block;
    font-size: 20px;
  }
}

.btn-line {
  background: #fff;
  border: 2px solid #ff7a59;
  color: #ff7a59;
  box-shadow: none;
  outline: none;
  border-radius: 8px;
  &:before {
  }
  &.btn-prev {
    &:before {
      margin-right: 4px;
      content: "";
      width: 5px;
      height: 5px;
      display: inline-block;
      transform: rotate(135deg);
      vertical-align: middle;
      border-right: 1px solid #ff7a59;
      border-bottom: 1px solid #ff7a59;
      margin-top: -1px;
    }
  }
  &.btn-next {
    &:after {
      margin-left: 6px;
      content: "";
      width: 5px;
      height: 5px;
      display: inline-block;
      transform: rotate(-45deg);
      vertical-align: middle;
      border-right: 1px solid #ff7a59;
      border-bottom: 1px solid #ff7a59;
      margin-top: -1px;
    }
  }
  &.not-active {
    background: #d2d6db !important;
    border-color: #d2d6db !important;
    color: #808080 !important;
    &:after,
    &:before {
      border-color: #808080;
    }
  }
}

a.btn-line {
  color: #ff7a59;
}
</style>
