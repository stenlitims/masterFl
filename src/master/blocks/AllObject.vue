<template>
<div>
  
  <div class="all-object" :class="{'loader': loader}">
    
    <div class="list-ob">
      <div class="of-list c-sc">



      
       <div class="item">
         <div style="display:none">{{completeForm}}</div>
          <div :class="{'active':active_id == object.id, 'complete': object.complete}" class="line"><div class="name">{{object.name}} <i></i> </div> 
          <button @click="edit(object, 'EditObject')" class="btn btn-md waves-effect">
            <span class="mob-none">Заполнить</span>
            <span class="mob-el">
            <svg class="icon">
                <use xlink:href="#ico-edit"></use>
            </svg>
            </span>
            </button></div>  
          <div class="in-list">



        <div class="item" v-for="(building, i) in buildings" :key="i">
          <div style="display:none">{{completeForm}}</div>
          <div :class="{'active':active_id == building.id, 'complete': building.complete}" class="line"><div class="name">Дом {{building.name}} <i></i> </div> 
          <button @click="edit(building, 'EditBuilding')" class="btn btn-md waves-effect">
            <span class="mob-none">Заполнить</span>
            <span class="mob-el">
            <svg class="icon">
                <use xlink:href="#ico-edit"></use>
            </svg>
            </span>
            </button></div> 
          <div class="in-list">


            <div class="item" v-for="(section, si) in sections[i]" :key="si">
              <div style="display:none">{{completeForm}}</div>
              <div :class="{'active':active_id == section.id, 'complete': section.complete}" class="line"><div class="name">Секция {{section.name}} <i></i></div> 
              <button @click="edit(section, 'EditSection')" class="btn btn-md waves-effect">
                <span class="mob-none">Заполнить</span>
                <span class="mob-el">
                <svg class="icon">
                    <use xlink:href="#ico-edit"></use>
                </svg>
                </span>
                </button> </div>
              <div class="in-list" v-if="floors">

                <div class="item" v-for="(floor, fi) in floors[si]" :key="fi">
                  <div style="display:none">{{completeForm}}</div>
                  <div class="line" :class="{'active':active_id == floor.id, 'complete': floor.complete}"> 
                    <div class="name">Этаж  {{floor.name}} <i></i></div>
                    <button @click="edit(floor, 'EditFloor')" class="btn btn-md waves-effect">
                      <span class="mob-none">Заполнить</span>
                      <span class="mob-el">
                      <svg class="icon">
                          <use xlink:href="#ico-edit"></use>
                      </svg>
                      </span>
                      </button>  
                  </div>
                  <div class="in-list" v-if="floor">
                    
                
                        <div class="item" v-for="(plan, pi) in floor.plans" :key="pi">
                          <div style="display:none">{{completeForm}}</div>
                         <div :class="{'active':active_id == plans[si][plan].id, 'complete': plans[si][plan].complete}" class="line">
                            <div class="name">Планировка {{plans[si][plan].name}} <i></i> </div>
                          <button  @click="edit(plans[si][plan], 'EditPlan')" class="btn btn-md waves-effect">
                            <span class="mob-none">Заполнить</span>
                            <span class="mob-el">
                              <svg class="icon">
                                  <use xlink:href="#ico-edit"></use>
                              </svg>
                              </span>
                            </button> </div> 
                          <div class="in-list">
                          </div>
                        </div>
                   
                    
                  </div>
                </div>

              </div>
            </div>

          </div>

          </div>

          </div>
        </div>



      </div>
      
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: "AllObject",
  props: ["object_id"],
  data() {
    return {
      object: {},
      buildings: [],
      sections: [],
      floors: [],
      plans: [],
      active_id: null,
      completeForm: null,
      loader: true,
      randUpd: 1
    };
  },
  created() {
    this.getObject();
    this.$bus.on("completeForm", this.setCompleteForm);
    this.$bus.on("updateList", this.updateList);
  },
  beforeDestroy() {
    this.$bus.off("completeForm", this.setCompleteForm);
    this.$bus.off("updateList", this.updateList);
  },
  mounted() {
    //console.log(this.$root.isMobile);
  },
  computed: {},
  methods: {
    setCompleteForm(id) {
      this.completeForm = id;
    },
    updateList(upd, type) {
      this.getObject(true, type);
    },
    getObject(upd, type = false) {
      $.post(
        this.$root.apiurl,
        {
          action: "getAllObject",
          object_id: this.object_id
        },
        data => {
          if (data) {
            // console.log(data);
            if (upd) {
              this.floors = [];
              this.sections = [];
              this.buildings = [];
              this.object = [];
            }
            this.$emit("allData", data);
            this.buildings = data.buildings;
            this.sections = data.sections;
            this.floors = data.floors;
            this.plans = data.plans;
            this.object = data.object;
            if (!upd && !this.$root.isMobile) {
              this.edit(this.object, "EditObject");
            }
            this.loader = false;
          }
        },
        "json"
      );
    },
    edit(data, type) {
      //console.log(data, type);
      this.active_id = data.id;
      data.type = type;
      this.$bus.emit("formData", data);
      $(".wrap-edit").addClass("active");
    }
  }
};
</script>

<style lang="scss">
.all-object {
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
  min-height: 300px;
  .list-ob {
    h3 {
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
}
.list-ob {
  max-width: 600px;
  .in-list {
    padding-left: 20px;
  }
  .line {
    margin-bottom: 8px;
    display: flex;
    .name {
      width: 90%;
      padding: 10px 40px 10px 15px;
      border-radius: 5px;
      border: 2px solid #e5e5e5;
      margin-right: 5px;
    }
    .btn {
      min-width: 110px;
      padding: 10px 14px;
    }
    &.active {
      .name,
      .btn {
        background: #f3f3f3;
        color: #797979;
      }
    }
    &.complete {
      .name {
        position: relative;
        i {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translate(0, -50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #33b275;
          &:before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 5px;
            height: 10px;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: translate(-50%, -60%) rotate(45deg);
          }
        }
      }
    }
  }
}

.of-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 15px;
  padding-top: 3px;
}

@media (max-width: 991px) {
  .of-list {
    max-height: inherit;
    padding-right: 0;
  }
  .all-object {
    padding-top: 0;
  }
}

@media (max-width: 567px) {
  .list-ob .line .btn {
    min-width: 46px;
    padding: 4px 7px;
    svg {
      width: 18px;
      height: 18px;
      fill: #fff;
    }
  }
  .list-ob .line.active .btn{
    svg{
      fill: #505458;
    }
  }
  .list-ob .line .name{
    font-size: 13px;
        padding: 7px 40px 7px 10px;
  }
  
}
</style>
