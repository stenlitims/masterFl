<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (this.$root.isMobile) {
      $(document).on(
        "focus",
        "input[type=text], input[type=email]",
        function() {
          $(".page-master").addClass("hide-footer");
        }
      );

      $(document).on("blur", "input[type=text], input[type=email]", function() {
        $(".page-master").removeClass("hide-footer");
      });
    }
  }
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
select.form-control, 
div.form-control {
  background: #f5f8fa;
  border: 2px solid #cbd6e2;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    border: 2px solid #5fbeaa;
  }
}

div.form-control {
  height: inherit;
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

.loader2 {
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
    background: rgba(255, 255, 255, 0.6);
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

.text-border {
  border: 2px solid #ecf0f4;
  padding: 20px 30px;
  border-radius: 3px;
  ol,
  ul {
    padding-left: 15px;
    margin-bottom: 0;
  }
}

.cus-check {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  &.big {
    font-size: 18px;
    .ch {
      width: 26px;
      height: 26px;
      margin-right: 12px;
    }
    input:checked + .ch {
      &:before {
        width: 8px;
        height: 11px;
        margin-top: -7px;
        margin-left: -4px;
      }
    }
  }
  input {
    position: absolute;
    opacity: 0;
    &:checked + .ch {
      background: #5fbeaa;
      border-color: #5fbeaa;
      &:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 9px;
        left: 50%;
        top: 50%;
        margin-top: -6px;
        margin-left: -3px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(40deg);
      }
    }

    &:disabled ~ * {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  .ch {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 2px solid #cbd6e2;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: -1px;
    transition: all 0.3s ease;
    position: relative;
  }
}

.input-group {
  input {
    border-right: none !important;
  }
}

.input-group-append {
  > * {
    height: 100%;
    border-radius: 0 5px 5px 0;
  }
}

.fields_hidden {
  opacity: 0.65;
  pointer-events: none;
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

  .hide-footer {
    padding-bottom: 0 !important;
    .master-footer {
      transform: translate(0, 100%) !important;
    }
  }
}
</style>
