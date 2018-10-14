<template>
  <div class="master-footer">    
      <div class="container">
          <div class="prev-block">
            <div v-if="step > 0">
                <button @click="nav('prev')" class="btn btn-md btn-prev waves-effect">
                  Назад</button>
            </div>
            <div v-if="step != steps.length - 1">
              <a href="#" @click.prevent="hideModal" class="close-master">Закрыть</a>
            </div>


            <button @click="clear" class="btn btn-md btn-clear waves-effect">Очистить</button>
            
          </div>
          <div>
            <div v-if="step < steps.length - 1">
            <button @click="nav('next')" :class="{'not-active': btnActive != true}" class="btn btn-next btn-md waves-effect">Далее</button>
            </div>
            <div v-if="step == steps.length - 1">
            <button @click="finish()" class="btn btn-finish btn-md waves-effect">Финиш</button>
            </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "MasterFooter",
  props: ["steps", "step", "object_id", "namep"],
  data() {
    return {
      // steps: []
    };
  },
  computed: {
    btnActive() {
      if (this.steps[this.step].btnActive) {
        return true;
      }
      return false;
    }
  },
  methods: {
    finish() {
      let data = {};
      data["master"] = this.namep;
      data["steps"] = this.steps;
      data["step"] = this.step;

      $.post(
        this.$root.apiurl,
        {
          action: "setState",
          finish: 1,
          data: data
        },
        data => {
          //console.log(data);
          if (data.type == 'success') {
            this.hideModal();
          }
        },
        "json"
      );
    },
    nav(w) {
      this.$bus.emit(this.steps[this.step].comp, w);
    },
    hideModal() {
      //  this.$router.go(-1);

      this.$emit("firstLoad", true);
      $(".page-master").removeClass("active");
    },
    clear() {
      let clear = confirm("Очистить мастер?");
      if (clear) {
        $.post(
          this.$root.apiurl,
          {
            action: "removeGproject",
            object_id: this.object_id,
            master: "object"
          },
          data => {
            if (data) {
              console.log(data);
              if (data.type == "success") location.reload();
            }
          },
          "json"
        );
      }
    }
  }
};
</script>

<style lang="scss">
.master-footer {
  background: #f5f8fa;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  border-top: 2px solid rgb(235, 235, 235);
  a {
    color: #3fc2af;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn-next {
    //  opacity: 0.6;
    border-radius: 5px;
  }

  .btn-clear {
    margin-left: 50px;
    font-size: 10px;
    padding: 4px 8px;
  }

  .btn {
    background: #fff;
    border: 2px solid #ff7a59;
    color: #ff7a59;
    box-shadow: none;
    outline: none;
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
  .prev-block {
    display: flex;
    align-items: center;
    button {
      margin-right: 20px;
    }
  }
}
</style>
