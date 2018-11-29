<template>
  <div class="page-master set-modal" :class="{'open': open}">
    <div class="master-inner">
      <master-header
        v-if="step != 'finish'"
        :steps="steps"
        :step="step"
        :name="name"
        @setStep="setStep"
      ></master-header>

      <div class="container center">
        <div style="display:none">{{$route.name}} {{$route.params.oid}}</div>
        <transition name="center" mode="out-in">
          <component
            :is="component"
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

    <master-footer
      v-if="step != 'finish'"
      :steps="steps"
      :step="step"
      :namep="namep"
      :finishTxt="finish"
      :object_id="object_id"
    ></master-footer>

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
import mirKv2 from "@/master/forms/mirkv/mir2";
import mirKv3 from "@/master/forms/mirkv/mir3";

import webCh1 from "@/master/forms/webchess/webch1";
import webCh2 from "@/master/forms/webchess/webch2";
import webCh3 from "@/master/forms/webchess/webch3";
import webCh4 from "@/master/forms/webchess/webch4";
import webCh5 from "@/master/forms/webchess/webch5";
import webCh6 from "@/master/forms/webchess/webch6";

import agent1 from "@/master/forms/agent/agent1";
import agent2 from "@/master/forms/agent/agent2";

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
      open: false,
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
    GoogleTable,
    stepFinish,
    mirKv1,
    mirKv2,
    mirKv3,
    webCh1,
    webCh2,
    webCh3,
    webCh4,
    webCh5,
    webCh6,
    agent1,
    agent2
  },

  created() {
    this.setMaster();
    this.setComp();
    this.getMaster(true);
    setTimeout(() => {
      this.pleload = true;
    }, 3000);
    this.$bus.on("hideModal", this.hideModal);
    this.$bus.on("setStep", this.setStep);
    window.formChange = false;
  },
  beforeDestroy() {
    this.$bus.off("hideModal", this.hideModal);
    this.$bus.off("setStep", this.setStep);
  },
  mounted() {
    setTimeout(() => {
      // $(".page-master").addClass("open");
      this.open = true;
    }, 200);
  },
  updated() {
    // console.log(234);
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
          this.setStep(0);
        }

        // console.log(this.step);
      }
    },

    setStep(n) {
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

      if (!this.object_id && this.namep == "object") {
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
            this.setStep(this.step);
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
        // console.log(this.step, this.steps);
      }
      if (e == "prev") {
        if (this.step == 0) return;
        if (this.step == this.steps.length) this.step = this.step - 1;
        this.steps[this.step].active = false;
        this.step = this.step - 1;
      }

      if (this.steps[this.step]) {
        this.setStep(this.step);
      }
    },

    setBtnActive(e) {
      this.steps[this.step].btnActive = e;
    },

    clearData() {
      this.steps = [];
    },
    hideModal() {
      this.open = false;
      let param = window.routeParam ? window.routeParam : { name: "MainPage" };
      if (window.formChange) {
        if (param.name == "instWebchess" || param.name == "settings") {
          this.$store.commit("loadMyObjects");
          this.$store.commit("loadPermissions", "web");
        }
      }
     // console.log(this.$route.name);
      if (this.$route.name == "new_mirkv") {
        this.$store.commit("loadPermissions", "mirkvartir");
      }
      setTimeout(() => {
        //  console.log(param);
        this.$router.push(param);
      }, 300);
    }
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
  //  min-height: 100vh;
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
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  left: 0;

  background: #fff;
  transition: all 0.4s ease;
  transform: translate(100%, 0);
  z-index: 1050;
  overflow: hidden;
  &.active,
  &.open {
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
  h4 {
    font-size: 20px;
    line-height: 1.4;
    margin-top: 0;
    margin-bottom: 30px;
  }
}

@media (min-width: 800px) {
  .page-master {
    .row {
      margin-right: -20px;
      margin-left: -20px;
      > div {
        padding-left: 20px;
        padding-right: 20px;
      }
    }

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

@media (max-width: 991px) {
  .page-master .center .text-inner {
    margin-bottom: 25px;
  }
  .page-master .center h3 {
    font-size: 22px;
    margin-bottom: 25px;
  }
  .page-master .center {
    padding-top: 5px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .master-inner,
  .set-modal {
    overflow: auto;
  }
}
@media (max-width: 576px) {
  .page-master .center {
    padding-left: 15px;
    padding-right: 15px;
  }
  .page-master .center h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .page-master .text-inner {
    font-size: 13px;
  }
  .page-master {
    padding-bottom: 59px;
  }
}
</style>
