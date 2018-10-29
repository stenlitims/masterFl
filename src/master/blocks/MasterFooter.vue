<template>
  <div class="master-footer">    
      <div class="container">
          <div class="prev-block">
            <div v-if="step > 0">
                <button @click="nav('prev')" class="btn-line btn-md btn-prev waves-effect">
                  <span class="mob-none">Назад</span>
                  </button>
            </div>
            <div>
              <a href="#" @click.prevent="hideModal" class="close-master">Закрыть</a>
            </div>


            <!-- <button @click="clear" class="btn btn-md btn-clear waves-effect">Очистить</button>  -->
            
          </div>
          <div class="next-block">
            <div v-if="step < steps.length - 1">
            <button @click="nav('next')" :class="{'not-active': btnActive != true}" class="btn-line btn-next btn-md waves-effect"><span class="mob-none">Далее</span></button>
            </div>

            <div v-if="finishTxt" class="finish-btns">
              <div v-if="steps[step].comp == 'objectDetail'">
              <button @click="finish(true)" class="btn-line btn-finish btn-md  btn-next waves-effect">Пропустить</button>
              </div>

              <div v-if="step == steps.length - 1">
              <button @click="finish(false)" :class="{'not-active': btnActive != true}" class="btn-line btn-md  btn-next waves-effect">
                <span class="mob-none">Завершить</span>
                </button>
              </div>
            </div>

            

          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "MasterFooter",
  props: ["steps", "step", "object_id", "namep", "finishTxt"],
  data() {
    return {
      // steps: []
      // show: true
    };
  },
  computed: {
    btnActive() {
      if (this.step == "finish") return false;
      if (this.steps[this.step].btnActive) {
        return true;
      }
      return false;
    }
  },
  methods: {
    finish(e) {
      this.$bus.emit(this.steps[this.step].comp, { finish: e });
    },
    nav(w) {
      this.$bus.emit(this.steps[this.step].comp, w);
    },
    hideModal() {
      this.$bus.emit("hideModal", true);
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
  border-top: 2px solid #cbd6e2;
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
  }

  .btn-clear {
    margin-left: 50px;
    font-size: 10px;
    padding: 4px 8px;
  }

  .prev-block,
  .next-block {
    display: flex;
    align-items: center;
  }
  .prev-block {
    button {
      margin-right: 20px;
    }
  }
  .next-block {
    button {
      margin-left: 30px;
    }
  }
}
.finish-btns {
  display: flex;
  align-items: center;
}

@media (max-width: 991px) {
  .master-footer {
    padding-top: 10px;
    padding-bottom: 10px;
    transition: all .3s ease;
    &.hide{
      transform: translate(0, 100%);
    }
    .btn-md {
      padding: 6px 18px;
    }
  }
  .close-master {
    display: none;
  }
  .btn-line.btn-next:after{
    margin-left: -3px;
  }
  .btn-line.btn-next:after, .btn-line.btn-prev:before{
    width: 6px;
    height: 6px;
    border-width: 2px;
  }
  .btn-finish{
    &:after{
      content: none !important;
    }
  }
  .btn-line.btn-prev:before{
    margin-right: 0;
  }
}
</style>
