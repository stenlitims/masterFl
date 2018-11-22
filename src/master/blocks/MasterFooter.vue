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



</style>
