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
             @objId="setObjId"
             @showTable="showGtable = true"
             @closeTable="showGtable = false"
             @spreadsheetId="setSpreadsheetId"
             :steps="steps" 
             :step="step"
             :object_id="object_id"
             ></component>
          </transition>
        </div>
    </div>
   

    <master-footer :steps="steps" :step="step" :object_id="object_id"></master-footer>


    <div v-if="showGtable">
      <google-table
      @closeTable="showGtable = false"
      :object_id="object_id" 
      :spreadsheet_id="spreadsheet_id" 
      ></google-table>
    </div>
    
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
        btnActive: true
      },
      {
        name: "Детализация",
        comp: "stepFinish",
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

import GoogleTable from "@/master/blocks/GoogleTable";

import MasterHeader from "@/master/blocks/MasterHeader";
import MasterFooter from "@/master/blocks/MasterFooter";
import cartObject from "@/master/forms/object/cartObject";
import salesDep from "@/master/forms/object/salesDep";
import FlatsImport from "@/master/forms/object/FlatsImport";
import amoFirst from "@/master/forms/amo/amo1";
import amoTv from "@/master/forms/amo/amo2";
import stepFinish from "@/master/forms/finish";

export default {
  name: "Master",
  data() {
    return {
      name: "",
      step: 0,
      steps: [],
      namep: "",
      object_id: false,
      master_id: false,
      btn: false,
      pleload: false,
      showGtable: false,
      spreadsheet_id: null
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
    amoTv: amoTv,
    GoogleTable: GoogleTable,
    stepFinish: stepFinish
  },
  created() {
    this.setMaster();
    this.setComp();
    this.getMaster(true);
    setTimeout(() => {
      this.pleload = true;
    }, 3000);
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
        if (this.step > 0) {
          this.getMaster(false);
        }
        return this.steps[this.step].comp;
      }
    }
  },
  methods: {
    setSpreadsheetId(data) {
      this.spreadsheet_id = data;
    },
    setObjId(id) {
      if (id) this.object_id = id;
    },
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
      data["object_id"] = this.object_id;

      let action = "getState";
      if (!firstLoad) {
        action = "setState";
      }

      let load = false;

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
            load = true;
          }
        },
        "json"
      );

      return load;
    },
    footerBtn(e) {
      //  console.log(e);

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
  overflow-y: auto;
  overflow-x: hidden;
}

input[type="text"].form-control,
input[type="email"].form-control,
input[type="file"].form-control,
select.form-control {
  background: #e7f1f7 !important;
  border: none !important;
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
      &.not-active {
        background: #d1d5da !important;
        border-color: #d1d5da !important;
        color: #7f7f7f !important;
        cursor: default !important;
      }
    }
    .text-inner {
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 40px;
      a {
        color: #18b0ad;
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
      }
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
.master-inner {
  .btn {
    background: #5fbeaa;
    outline: none;
    color: #fff;
  }
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

@media (max-height: 640px) {
  .page-master .center h3 {
    margin-bottom: 26px;
    font-size: 20px;
  }
  .page-master .center form .row .form-group {
    margin-bottom: 20px;
  }
}
</style>
