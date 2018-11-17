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

  <input type="hidden" name="object_id-select" id="object_id-select" :value="objectId">






<div id="add2building-modal" class="add2object-modal modal fade" tabindex="-1" role="dialog" aria-labelledby=""
    aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-full">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mt-0">Выбор дома</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row m-b-15">
                            <div 
                            v-for="(b, i) in allData.buildings" :key="i"
                            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mobiles mobiles building4select object4select"
                                :data-label="'Дом' + b.name" :data-id="'buildings_'+ b.id" :data-object_id="b.id" data-object_type="buildings">
                                <div class="object-list-box plan-list-box thumb">
                                    <div class="product-image" style="background-image:url(https://test.flatris.com.ua/assets/images/building.jpg)">
                                    </div>
                                    <div class="detail">
                                        <h4 class="m-t-0 font-18 project-list-box-title text-center">Дом {{b.name}}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="cancelInteractionSelection btn btn-secondary w-sm btn-white waves-effect"
                    data-dismiss="modal">Отмена</button>
                <button type="button" class="applyInteractionSelection btn w-sm btn-default waves-effect waves-light"
                    data-dismiss="modal">Связать</button>
            </div>
        </div>
    </div>
</div><!-- /.modal -->






<div id="add2section-modal" class="add2object-modal modal fade" tabindex="-1" role="dialog" aria-labelledby=""
    aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-full">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mt-0">Выбор секции</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row m-b-15">
                            <div 
                            v-for="(s, i) in sections" :key="i"
                            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mobiles mobiles section4select object4select"
                            :data-label="'Секция' + s.name" :data-id="'sections_'+ s.id" :data-object_id="s.id"
                                 data-object_type="sections">
                                <div class="object-list-box plan-list-box thumb">
                                    <div class="product-image" style="background-image:url(https://flatris.com.ua/assets/images/section.jpg)">
                                    </div>
                                    <div class="detail">
                                        <h4 class="m-t-0 font-18 project-list-box-title text-center">Дом {{s.bname}} - Секция {{s.name}} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="cancelInteractionSelection btn btn-secondary w-sm btn-white waves-effect"
                    data-dismiss="modal">Отмена</button>
                <button type="button" class="applyInteractionSelection btn w-sm btn-default waves-effect waves-light"
                    data-dismiss="modal">Связать</button>
            </div>
        </div>
    </div>
</div><!-- /.modal -->







<div id="add2floor-modal" class="add2object-modal modal fade" tabindex="-1" role="dialog" aria-labelledby=""
    aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-full">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mt-0">Выбор этажа</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="m-b-15">
                            <form class="floorplan-form" id="floorplan-form">
                                <div class="form-group m-b-20 row">
                                    <div class="form-group col-md-6">
                                        <select id="floor-building-select" name="floor-building" class="form-control "
                                            data-style="btn-white">
                                            <option 
                                            v-for="(b, i) in allData.buildings" :key="i"
                                            :data-building_id="b.id" :value="b.id">Дом {{b.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <select id="floor-section-select" name="floor-section" class="form-control "
                                            data-style="btn-white">
                                            <option 
                                             v-for="(s, i) in sections" :key="i"
                                            :data-building_id="s.building_id" :data-section_id="s.id" :value="s.id">Секция {{s.name}}</option>
                                        </select>
                                    </div>


                                </div>
                            </form>

                        </div>
                        <div class="m-b-15">

                            <table class="table m-t-20">
                                <thead class="thead-light">
                                    <tr>

                                        <th>Дом</th>
                                        <th>Секция</th>
                                        <th>Этаж</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr 
                                    v-for="(f, i) in floors" :key="i"
                                    class="floor4select object4select" :data-section_id="f.section_id" :data-label="'эт. ' +  f.name "
                                        :data-id=" 'floors_'+f.id" :data-object_id="f.id" data-object_type="floors">
                                        <td>Дом {{secName(f.section_id).bname}}</td>
                                        <td>Секция {{secName(f.section_id).name}}</td>
                                        <td>Этаж {{f.name}}</td>
                                    </tr>
                                    

                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="cancelInteractionSelection btn btn-secondary w-sm btn-white waves-effect"
                    data-dismiss="modal">Отмена</button>
                <button type="button" class="applyInteractionSelection btn w-sm btn-default waves-effect waves-light"
                    data-dismiss="modal">Связать</button>
            </div>
        </div>
    </div>
</div><!-- /.modal -->





















</div>
  
</template>

<script>
export default {
  name: "allPlans",
  props: ["data", "allData"],
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
    window.floorSaveUrl = this.$root.apiurl + "?action=editInteraction";

    if (this.data.ol_objects) {
      window.features_data = JSON.parse(this.data.ol_objects);
    } else {
      window.features_data = [];
    }
    // this.features_data = data.features_data;

    window.object_type = this.data.type;
    window.object_id = this.data.id;

    // this.plans = data.plans;
    delete window.loadsScript;
    if (!window.loadsScriptOb) {
      this.loadsScript();
      $("#floor-section-select").trigger("change");
    } else {
      this.loader = false;
      test_init_all();
      $("#floor-section-select").trigger("change");
    }
  },
  computed: {
    sections() {
      let data = [];
      for (let b in this.allData.sections) {
        //  console.log(b);
        let bul = this.allData.buildings[b].name;
        for (let s in this.allData.sections[b]) {
          let item = this.allData.sections[b][s];
          item.bname = bul;
          data.push(item);
        }
      }
      return data;
    },
    floors() {
      let data = [];
      for (let b in this.allData.floors2) {
        //   console.log(b);
        //  let bul = this.allData.buildings[b].name;
        for (let s in this.allData.floors2[b]) {
          let item = this.allData.floors2[b][s];
          //  item.bname = bul;
          data.push(item);
        }
      }
      return data;
    },
    objectId() {
      if (this.data.type == "EditObject") {
        return "gprojects_" + this.data.id;
      }
      if (this.data.type == "EditBuilding") {
        return "buildings_" + this.data.id;
      }
      if (this.data.type == "EditSection") {
        return "sections_" + this.data.id;
      }
    }
  },
  methods: {
    secName(id) {
      let name = "";
      for (let item of this.sections) {
        if (id == item.id) {
          name = item;
        }
      }
      return name;
    },
    saveFlatData() {
      allObOlsave();
      setTimeout(() => {
        this.data.ol_objects = outOL;
      }, 200);

      setTimeout(() => {
        this.$bus.emit("updateList", true, this.data.type);
      }, 2000);
    },
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
            "https://test.flatris.com.ua/assets/panel/js/interaction-editor.js",
            () => {
              this.loader = false;
              window.loadsScriptOb = true;
            }
          );
        });
      });
    },
    close() {
      this.$bus.emit("editallPlan", false);
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

.object-list-box .product-image {
  background-size: contain;
}
</style>
