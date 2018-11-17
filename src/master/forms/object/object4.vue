<template>
  <div class="">


      <div v-if="$route.name == 'webchess'">
        <h3 class="text-center">Добавьте визуализации или фото домов для выбора квартир с фасада</h3>
        <div class="text-inner text-center">
          <p>Данный этап не является обязательным. Пропустите его если данное представление вам не нужно.</p>
        </div>
      </div>
      <div v-else>
        <h3 class="text-center">Добавление информации по объекту</h3>
        <div class="text-inner text-center">
          <p>Данный этап не является обязательным. Вы можете пропустить его и вернуться к заполнению в любое время.</p>
        </div>
      </div>

      
      <div class="row">
        <div class="col-lg-6">
          <all-object 
          @allData="setAllData"
          @typeForm="setTypeForm" :object_id="object_id"></all-object>
        </div>
        <div class="col-lg-6 wrap-edit mob-modal">
          <div @click="closeModal" class="close-modal"></div>
          <component :is="typeForm" :form="formData"></component>
          
        </div>
      </div>


  
    <edit-floorplan 
    v-if="editFloorPlan"
    :data="formData"
    ></edit-floorplan>


    <editall-plans 
    v-if="editallPlans"
    :data="formData"
    :allData="allData"
    ></editall-plans>

    


 
    
 

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import AllObject from "@/master/blocks/AllObject";
import EditObject from "@/master/blocks/edit/object";
import EditBuilding from "@/master/blocks/edit/building";
import EditSection from "@/master/blocks/edit/section";
import EditPlan from "@/master/blocks/edit/plan";
import EditFloor from "@/master/blocks/edit/floor";
import EditFloorPlan from "@/master/blocks/edit/floorPlans";
import EditallPlans from "@/master/blocks/edit/allPlans";

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
      editFloorPlan: false,
      editallPlans: false,
      allData: {},
      form: {
        //active: ""
      },
      required: {
        //  active: ""
      }
    };
  },
  components: {
    AllObject: AllObject,
    EditBuilding: EditBuilding,
    EditSection: EditSection,
    EditPlan: EditPlan,
    EditFloor: EditFloor,
    EditFloorplan: EditFloorPlan,
    EditallPlans: EditallPlans,
    EditObject: EditObject
  },
  created() {
    this.$bus.on("formData", this.setTypeForm);
    this.$bus.on("editFloorPlan", this.openFloorPlan);
    this.$bus.on("editallPlan", this.editallPlan);
  },
  beforeDestroy() {
    this.$bus.off("formData", this.setTypeForm);
    this.$bus.off("editFloorPlan", this.openFloorPlan);
    this.$bus.off("editallPlan", this.editallPlan);
  },
  mounted() {},
  computed: {},
  methods: {
    setAllData(data) {
      this.allData = data;
    },
    openFloorPlan(e) {
      this.editFloorPlan = e;
    },
    editallPlan(e) {
      this.editallPlans = e;
    },
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
    closeModal(e) {
      $(e.target)
        .parent()
        .removeClass("active");
    },
    send(w) {
      if (w == "prev") {
        this.$emit("footerBtn", w);
        return;
      }

      if (w.finish) {
        this.$emit("footerBtn", w);
        return;
      } else {
        this.$emit("footerBtn", w);
        return;
      }

      this.findError();

      if (this.error.length) return false;
      if (w.finish) w.finish = true;
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
  padding-bottom: 20px;
  &.t-col {
    max-width: 93%;
  }
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

.wrap-eform {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 15px;
  padding-top: 3px;
}

@media (max-width: 991px) {
  .list-ob {
    margin-left: auto;
    margin-right: auto;
  }

  .wrap-edit:before {
    content: none;
  }
  .wrap-eform {
    max-height: calc(100vh - 200px);
    margin-bottom: 15px;
  }
  .edit-form {
    padding-top: 0;
  }
}
</style>
