<template>
  <div class="page-master set-modal">
    <div class="master-inner">
        <master-header v-if="step != 'finish'"
        :steps="steps" 
        :step="step" 
        :name="name"
        @setSpep="setSpep"
        ></master-header>
        
        <div class="container center">
        <div style="display:none">{{$route.name}} {{$route.params.oid}}</div>
          <transition name="center" mode="out-in">
            <component :is="component"
             @btnActive="setBtnActive"
             @footerBtn="footerBtn"
             @objId="setObjId"
             @showTable="showGtable = true"
             @closeTable="showGtable = false"
             @spreadsheetId="setSpreadsheetId"
             @clearData="clearData"
             :steps="steps" 
             :step="step"
             :object_id="object_id"
             :finishTxt="finish"
             :namep="namep" 
             ></component>
          </transition>
        </div>
    </div>
   


    <master-footer v-if="step != 'finish'"
     :steps="steps"
     :step="step" 
     :namep="namep"
     :finishTxt="finish"
     :object_id="object_id"></master-footer>


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
import steps from "@/data/steps";

import GoogleTable from "@/master/blocks/GoogleTable";

import MasterHeader from "@/master/blocks/MasterHeader";
import MasterFooter from "@/master/blocks/MasterFooter";
import cartObject from "@/master/forms/object/cartObject";
import salesDep from "@/master/forms/object/salesDep";
import FlatsImport from "@/master/forms/object/FlatsImport";
import objectDetail from "@/master/forms/object/object4";

import amoFirst from "@/master/forms/amo/amo1";
import amoTv from "@/master/forms/amo/amo2";

import mirKv1 from "@/master/forms/mirkv/mir1";

import webCh1 from "@/master/forms/webchess/webch1";

import agent1 from "@/master/forms/agent/agent1";

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
      spreadsheet_id: null,
      m_object_id: false,
      newm: false,
      first_load: true,
      finish: null,
      url: {
        name: "",
        oid: ""
      }
    };
  },
  components: {
    MasterHeader: MasterHeader,
    MasterFooter: MasterFooter,
    MasterFooter: MasterFooter,
    cartObject: cartObject,
    salesDep: salesDep,
    FlatsImport: FlatsImport,
    objectDetail: objectDetail,
    amoFirst: amoFirst,
    amoTv: amoTv,
    GoogleTable: GoogleTable,
    stepFinish: stepFinish,
    mirKv1: mirKv1,
    webCh1: webCh1,
    agent1: agent1,
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
    setTimeout(() => {
      $(".page-master").addClass("active");
    }, 200);
  },
  updated() {
    // if (this.url.name != this.$route.name) {
    //   this.url.name = this.$route.name;
    // //  this.setMaster();
    //  // this.setComp();
    // }
    // if (this.url.oid != this.$route.params.oid) {
    //   this.url.oid = this.$route.params.oid;
    //  // this.getMaster(true);
    // }
  },
  computed: {
    component() {
      if (this.step == "finish") {
        return "stepFinish";
      }
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
  watch: {},

  methods: {
    setMaster() {
      let stepTemp = Object.assign({}, steps);
      let name = this.$route.name.split("_");
      //  console.log(this.$route.name);
      if (name[0] == "new") {
        this.namep = name[1];
        this.newm = true;
      } else {
        this.namep = name[0];
        this.newm = false;

        for (let item in stepTemp[this.namep].steps) {
          stepTemp[this.namep].steps[item].complete = true;
        }
      }

      this.steps = stepTemp[this.namep].steps;
      this.name = stepTemp[this.namep].name;
      if (name[0] == "new") {
        this.finish = stepTemp[this.namep].finish;
      }
    },
    setComp() {
      //   console.log(this.$route);
      let st = this.$route.params.id - 1;
      if (this.steps[st]) {
        if (this.steps[st].complete) {
          this.step = st;
        } else {
          this.setSpep(0);
        }

        // console.log(this.step);
      }
    },

    setSpep(n) {
      if (n != undefined) {
        this.step = n;
      }
      if (this.step == false) this.step = 0;
      let params = {
        id: +this.step + 1
      };
      this.$router.push({ name: this.$route.name, params: params });
    },

    setSpreadsheetId(data) {
      this.spreadsheet_id = data;
    },
    setObjId(data) {
      if (data.id) this.object_id = data.id;
      if (!this.newm) this.name = data.name;
    },

    getMaster(firstLoad) {
      if (this.$route.params.oid) {
        //  console.log(this.$route.params);
        this.object_id = this.$route.params.oid;
        return;
      }

      if (!this.newm) {
        return;
      }

      let data = {};
      data["master"] = this.namep;
      data["steps"] = this.steps;
      data["step"] = this.step;
      if (this.first_load) {
        if (this.object_id) data["object_id"] = this.object_id;
      }

      if (!this.object_id) {
        for (let item in this.steps) {
          this.steps[item].complete = false;
        }
      }

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
          if (data.steps) {
            for (let item in data.steps) {
              if (!this.steps[item]) break;
              if (data.steps[item].complete == "false") {
                this.steps[item].complete = false;
              } else {
                this.steps[item].complete = true;
              }
            }
            if (!data.object_id) {
              this.step = 0;
            } else {
              this.step = +data.step;
            }

            if (data.object_id) this.object_id = data.object_id;
            this.setSpep(this.step);
            load = true;
            this.first_load = false;
          }
        },
        "json"
      );

      return load;
    },
    footerBtn(e) {
      if (e.finish) {
        this.step = "finish";
        return;
      }

      if (e == "next") {
        this.steps[this.step].complete = true;
        this.steps[this.step].active = true;
        this.step = this.step + 1;
      }
      if (e == "prev") {
        if (this.step == 0) return;
        if (this.step == this.steps.length) this.step = this.step - 1;
        this.steps[this.step].active = false;
        this.step = this.step - 1;
      }

      if (this.steps[this.step]) {
        this.setSpep(this.step);
      }
    },

    setBtnActive(e) {
      this.steps[this.step].btnActive = e;
    },

    clearData() {
      this.steps = [];
    }
    // firstLoad() {
    //   this.first_load = true;
    //   this.object_id = null;
    //   this.step = 0;
    //   //  this.steps = {};
    // }
  }
};
</script>


<style lang="scss">
.master-inner {
  overflow-y: auto;
  overflow-x: hidden;
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
    form,
    .form {
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
  z-index: 1050;
  overflow: hidden;
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
  .btn-cancel {
    background: #ff7a59;
  }
  h4{
    font-size: 20px;
    line-height: 1.4;
  }
}

@media (min-width: 800px) {
  .page-master {
    .center {
      form,
      .form {
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
