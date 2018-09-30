<template>
  <div class="page-master set-modal">
    <div class="master-inner">
        <master-header 
        :steps="steps" 
        :step="step" 
        :name="name"
        @setSpep="setSpep"
        ></master-header>
        
        <div class="container center">
        <div style="display:none"> {{$route.name}} </div>
          <transition name="center" mode="out-in">
            <component :is="component"
             @btnActive="setBtnActive"
             @footerBtn="footerBtn"
             :steps="steps" 
             :step="step" 
             ></component>
          </transition>
        </div>
    </div>
   

    <master-footer :steps="steps" :step="step"></master-footer>
  </div>
</template>

<script>
let steps = {
  object: {
    name: "Создание нового объекта",
    steps: [
      {
        name: "Карточка ЖК",
        comp: "cartObject",
        complete: false,
        btnActive: false
      },
      {
        name: "Отдел продаж",
        comp: "salesDep",
        complete: false,
        btnActive: false
      },
      {
        name: "Шахматка квартир",
        comp: "FlatsImport",
        complete: false,
        btnActive: false
      },
      {
        name: "Детализация",
        comp: "formO",
        complete: false,
        btnActive: false
      }
    ]
  },
  amo: {
    name: "Интеграция с AmoCRM",
    steps: [
      {
        name: "Подключение виджета",
        comp: "amoFirst",
        complete: false,
        btnActive: false
      },
      {
        name: "Синхронизация с AmoCRM",
        comp: "amoTv",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройка воронки",
        comp: "FlatsImport",
        complete: false,
        btnActive: false
      }
    ]
  }
};

import MasterHeader from "@/blocks/MasterHeader";
import MasterFooter from "@/blocks/MasterFooter";
import cartObject from "@/forms/cartObject";
import salesDep from "@/forms/salesDep";
import FlatsImport from "@/forms/FlatsImport";
import amoFirst from "@/forms/amo/amo1";
import amoTv from "@/forms/amo/amo2";

export default {
  name: "Master",
  data() {
    return {
      name: "",
      step: 0,
      steps: [],
      namep: "",
      object_id: false,
      btn: false
      // component: "cartObject"
    };
  },
  components: {
    MasterHeader: MasterHeader,
    MasterFooter: MasterFooter,
    MasterFooter: MasterFooter,
    cartObject: cartObject,
    salesDep: salesDep,
    FlatsImport: FlatsImport,
    amoFirst: amoFirst,
    amoTv: amoTv
  },
  created() {
    this.setMaster();
    this.setComp();
   // this.getMaster(true);
  },
  mounted() {
    $(".page-master").addClass("active");
  },
  updated() {
    if (this.namep != this.$route.name) {
      this.setMaster();
    }
  },
  computed: {
    component() {
      if (!this.steps[this.step]) {
        return "cartObject";
      } else {
        this.getMaster(false);
        return this.steps[this.step].comp;
      }
    }
  },
  methods: {
    setMaster() {
      this.namep = this.$route.name;
      this.steps = steps[this.$route.name].steps;
      this.name = steps[this.$route.name].name;
      this.step = 0;
    },
    getMaster(firstLoad) {
      let data = {};
      data["master"] = this.namep;
      data["steps"] = this.steps;
      data["step"] = this.step;

      let action = "getState";
      if (!firstLoad) {
        action = "setState";
      }

      $.post(
        this.$root.apiurl,
        {
          action: action,
          data: data
        },
        data => {
          // console.log(data);
          if (data.steps && firstLoad) {
            for (let item in data.steps) {
              if (data.steps[item].complete == "false") {
                this.steps[item].complete = false;
              } else {
                this.steps[item].complete = true;
              }
            }
            this.step = +data.step;
            if (data.object_id) this.object_id = data.object_id;
            location.hash = "/" + this.namep + "/" + (+this.step + 1);
            //  console.log(this.steps);
          }
        },
        "json"
      );
    },
    footerBtn(e) {
      //console.log(this.step);
      if (e == "next") {
        this.steps[this.step].complete = true;
        this.steps[this.step].active = true;
        if (this.step + 1 == this.steps.length) {
          //   return;
        }
        this.step = this.step + 1;
      }
      if (e == "prev") {
        if (this.step == 0) return;
        if (this.step == this.steps.length) this.step = this.step - 1;
        this.steps[this.step].active = false;
        this.step = this.step - 1;
      }

      if (this.steps[this.step]) {
        location.hash = "/" + this.namep + "/" + (+this.step + 1);
        // console.log(this.step, this.steps[this.step].comp);
      }
    },
    setComp() {
      //   console.log(this.$route);
      let st = this.$route.params.id - 1;
      if (this.steps[st]) {
        if (this.steps[st].complete) {
          this.step = st;
        } else {
          location.hash = "/" + this.namep + "/1";
        }

        // console.log(this.step);
      }
    },
    setBtnActive(e) {
      this.steps[this.step].btnActive = e;
    },
    setSpep(n) {
      this.step = n;
      location.hash = "/" + this.namep + "/" + (+this.step + 1);
    }
  }
};
</script>


<style lang="scss">
.master-inner {
  // overflow: auto;
}
.page-master {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 80px;
  .container {
    max-width: 1200px;
    width: none;
    padding-left: 15px;
    padding-right: 15px;
  }

  input[type="text"],
  input[type="email"],
  input[type="file"],
  select {
    background: #e7f1f7 !important;
    border: none !important;
  }
  .center {
    // min-width: 800px;
    margin-bottom: 20px;
    padding-top: 30px;
    h3 {
      margin-bottom: 40px;
      font-size: 24px;
    }
    form {
      .row {
        justify-content: center;
        .form-group {
          margin-bottom: 30px;
        }
        input[type="text"],
        input[type="email"],
        input[type="file"],
        select {
          height: 44px;
        }
      }
    }
    .btn-default {
      border-radius: 5px;
    }
    .text-inner {
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 40px;
    }
  }
}
.center-enter {
}

.center-enter-active {
  animation: fadeIn 0.2s linear;
}

.center-leave {
}

.center-leave-active {
  animation: fadeOut 0.2s linear;
}

.set-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  transition: all 0.4s ease;
  transform: translate(100%, 0);
  &.active {
    transform: translate(0, 0);
  }
}

@media (min-width: 800px) {
  .page-master {
    .center {
      form {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        > .row {
          margin-left: -40px;
          margin-right: -40px;
          > div {
            padding-left: 40px;
            padding-right: 40px;
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
