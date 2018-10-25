<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};

$(document).on("change", ".up-file input", function() {
  var lbl = $(this)
    .parent()
    .find(".name");
  var file_name;
  file_name = $(this).val();
  if (!file_name.length) return;
  file_name = file_name.replace("C:\\fakepath\\", "");
  lbl.text(file_name);
});
</script>

<style lang="scss">
#app {
  color: #33475b;
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
    background: #eaf0f6 !important;
    border-color: #eaf0f6 !important;
    color: #b0c1d4 !important;
    &:after,
    &:before {
      border-color: #b0c1d4;
    }
  }
}

a.btn-line {
  color: #ff7a59;
}

input[type="text"].form-control,
input[type="email"].form-control,
input[type="file"].form-control,
select.form-control {
  background: #f5f8fa;
  border: 2px solid #cbd6e2;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    border: 2px solid #5fbeaa;
  }
}

input[disabled].form-control,
select[disabled].form-control {
  opacity: 0.6;
}
.btn-md {
  padding: 10px 24px;
}

.loader {
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 500;
  }
  &:before {
    background: rgba(255, 255, 255, 0.5);
  }
  &:after {
    z-index: 501;
    background: url(https://flatris.com.ua/assets/images/preloader.svg)
      no-repeat center center;
  }
}

.def-modal {
  position: fixed;
  top: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  right: 0;
  left: 0;
  z-index: 999;
  background: #fff;
}

.alert {
  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.up-file {
  position: relative;
  margin-bottom: 3px;
  input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
  }
}

.img {
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .del-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease;
  }
}

.wrap-input {
  position: relative;
  input {
    //  height: 56px;
    //   padding-top: 13px;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-left: 12px;
    padding-right: 12px;
  }
}

.wrap-edit {
  .img {
    position: relative;
    min-height: 50px;
    text-align: center;
    margin-top: 0px;
    height: 138px;
    img {
      max-height: 100%;
    }
    &:hover {
      .del-btn {
        opacity: 1;
      }
    }
  }
}

.close-modal-all {
  position: absolute !important;
  z-index: 50;
  top: 0px;
  right: 5px;
  padding: 10px 15px;
  font-size: 36px;
  line-height: 1;
  color: #000;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
  &:before {
    line-height: 1;
    content: "\00d7";
    height: 36px;
    display: block;
  }
}

@media (min-width: 991px) {
  .mob-el {
    display: none;
  }
}

@media (max-width: 991px) {
  .mob-modal {
    position: fixed;
    top: 0;
    background: #fff;
    left: 0;
    right: 0;
    z-index: 500;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding-top: 30px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }

  .close-modal {
    position: absolute !important;
    z-index: 50;
    top: 0px;
    right: 5px;
    padding: 10px 15px;
    font-size: 36px;
    line-height: 1;
    color: #000;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
    }
    &:before {
      line-height: 1;
      content: "\00d7";
      height: 36px;
      display: block;
    }
  }

  .mob-none {
    display: none;
  }

  .p-modal {
    padding-top: 60px;
  }
}
</style>
