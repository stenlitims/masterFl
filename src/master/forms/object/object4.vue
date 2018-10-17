<template>
  <div class="">
   

      <h3 class="text-center">Добавление информации по объекту</h3>
      <div class="text-inner text-center">
        <p>Данный этап не является обязательным. Вы можете пропустить его и вернуться к заполнению в любое время.</p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <all-object @typeForm="setTypeForm" :object_id="object_id"></all-object>
        </div>
        <div class="col-md-6 wrap-edit">
          <component :is="typeForm" :form="formData"></component>
          
        </div>
      </div>
  

 
    
 

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import AllObject from "@/master/blocks/AllObject";
import EditBuilding from "@/master/blocks/edit/building";
import EditSection from "@/master/blocks/edit/section";
import EditPlan from "@/master/blocks/edit/plan";
import EditFloor from "@/master/blocks/edit/floor";

export default {
  name: "FlatsImport",
  mixins: [masterMixin],
  data() {
    return {
      spreadsheet_id: null,
      link_table: null,
      edit_p: false,
      pleloader: false,
      typeForm: "EditBuilding",
      formData: {},
      form: {
        active: ""
      },
      required: {
        active: "",
      }
    };
  },
  components: {
    AllObject: AllObject,
    EditBuilding: EditBuilding,
    EditSection: EditSection,
    EditPlan: EditPlan,
    EditFloor: EditFloor
  },
  created() {
    this.$bus.on("formData", this.setTypeForm);
  },
  beforeDestroy() {
    this.$bus.off("formData", this.setTypeForm);
  },
  mounted() {
  },
  computed: {},
  methods: {
    setTypeForm(data) {
      this.typeForm = data.type;
      this.formData = data;
    },
    isGmailAddress(email) {
      let pattern = /^\w+([\.-]?\w+)*@gmail.com+$/;
      if (pattern.test(email)) {
        return true;
        // this.innerStep = 1;
      }
      return false;
    },
    send(w) {
      if (w == "prev") {
        this.$emit("footerBtn", w);
        return;
      }

      if (w.finish) {
        this.$emit("footerBtn", w);
        return;
      }
      

      this.findError();
      if (this.error.length) return false;
      this.$emit("footerBtn", w);
      this.success = true;
    }
  }
};
</script>

<style lang="scss">
.edit-form {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  .form-group {
    margin-bottom: 1.5rem;
  }
  .form-control {
    height: 42px;
    padding-left: 17px;
  }
}
.wrap-edit {
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: -600px;
    bottom: 0;
    background: #f9f9f9;
  }
  > div {
    position: relative;
    z-index: 1;
  }
}
</style>
