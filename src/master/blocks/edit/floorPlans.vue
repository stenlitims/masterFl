<template>
<div class="floor-plan def-modal p-modal" :class="{'loader': loader}">
  <div class="close-modal-all" @click="close"></div>
  <div style="display:none"><img id="imageFilePreview" :src="data.img" style="max-height:200px;max-width:200px;"></div>
  <div id="map" class="map"></div>
  <div v-if="success">
    <div class="alert alert-success text-center" role="alert">
      Спасибо данные сохранены.
    </div>
  </div>
  <div class="text-center abs-btns">
    <button @click="saveFlatData" class="btn btn-md waves-effect">Сохранить</button>
  </div>

  <input type="hidden" name="floorplan_id" id="floorplan_id" :value="data.id">


  <div id="add2plan-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-full">
          <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title mt-0">Выбор планировки</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-12">
                              <div class="row m-b-15">

                                  <div
                                  v-for="(item, i) in plans" :key="i"
                                   class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mobiles mobiles plan-list-box-wrap plan4select" :data-id="i">
                                    <div class="product-list-box plan-list-box thumb">
                                            <div href="#"  class="product-image" :style="{ 'background-image': 'url(' + item.img + ')' }">
                                            </div>
                                        <div class="detail">
                                            <h4 class="m-t-0 font-18 project-list-box-title">{{item.name}}</h4>
                                            <p class="text-muted"><span class="plan-rooms">{{item.rooms}}</span>-к <span class="float-right plan-square">{{item.square_total}} м<sup>2</sup></span></p>
                                        </div>
                                    </div>
                                </div>

                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" id="cancelPlanSelection" class="btn btn-secondary w-sm btn-white waves-effect" data-dismiss="modal">Отмена</button>
                      <button type="button" id="applyPlanSelection" class="btn w-sm btn-default waves-effect waves-light" data-dismiss="modal">Связать</button>
                  </div>
          </div>
      </div>
  </div>
</div>
  
</template>

<script>
//import masterMixinForm from "@/mixin/masterMixinForm";
//import files from "@/mixin/files";

export default {
  name: "floorPlans",
  // mixins: [masterMixinForm, files],
  props: ["data"],
  data() {
    return {
      action: "setFloorPlans",
      features_data: [],
      plans: [],
      success: false,
      loader: true
    };
  },
  watch: {},
  created() {},
  mounted() {
    window.floorSaveUrl = this.$root.apiurl + "?action=edit";

    $.post(
      this.$root.apiurl,
      {
        action: "getFeaturesData",
        id: this.data.id,
        section_id: this.data.section_id
      },
      data => {
        if (data) {
          window.features_data = data.features_data;
          this.features_data = data.features_data;
          this.plans = data.plans;
          delete window.loadsScriptOb;
          if (!window.loadsScript) {
            this.loadsScript();
          } else {
            this.loader = false;
            test_init();
          }
          
        }
      },
      "json"
    );
  },
  computed: {},
  methods: {
    loadsScript() {
      $("head").append(
        $('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.css"
        )
      );
      $("head").append(
        $('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "https://cdn.jsdelivr.net/npm/ol-contextmenu@latest/dist/ol-contextmenu.min.css"
        )
      );
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.js", () => {
        $.getScript("https://cdn.jsdelivr.net/npm/ol-contextmenu", () => {
          $.getScript(
            "https://test.flatris.com.ua/assets/panel/js/floors-editor.js?v=922",
            () => {
              this.loader = false;
              window.loadsScript = true;
            }
          );
        });
      });
    },
    saveFlatData(){
      saveFlatData(this.data.floors_ids);
      setTimeout(()=>{
        this.$bus.emit('updateList', true);
      }, 2000);
      
    },
    close() {
      this.$bus.emit("editFloorPlan", false);
    }
  }
};
</script>

<style lang="scss">
.abs-btns {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
