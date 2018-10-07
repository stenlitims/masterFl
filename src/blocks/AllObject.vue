<template>
<div>
  
  <div class="all-object">
    <div class="list-ob">
      <h3 class="text-center">{{object.name}}</h3>
      <div class="item" v-for="(building, i) in buildings" :key="i">
       <div class="line"><div class="name">Дом {{building.name}} <i></i> </div> 
       <button @click="edit(building, 'building')" class="btn btn-md waves-effect">Заполнить</button></div> 
        <div class="in-list">
          <div class="item" v-for="(section, si) in sections[i]" :key="si">
            <div class="line"><div class="name">Секция {{section.name}} <i></i></div> 
            <button @click="edit(section, 'section')" class="btn btn-md waves-effect">Заполнить</button> </div>
            <div class="in-list">
              <div class="item">
               <div class="line"> <div class="name">Этаж 1</div> <button class="btn btn-md waves-effect">Заполнить</button>  </div>
                <div class="in-list">
                  <div class="item" v-for="(plan, pi) in plans[si]" :key="pi">
                  <div class="line">  <div class="name">Планировка {{plan.name}} <i></i> </div>
                   <button  @click="edit(plan, 'plan')" class="btn btn-md waves-effect">Заполнить</button> </div>
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
    };
  },
  created() {
     this.getObject();
  },
  mounted() {},
  computed: {},
  methods: {
    getObject() {
      $.post(
        this.$root.apiurl,
        {
          action: 'getAllObject',
          object_id: this.object_id
        },
        data => {
          if (data) {
            console.log(data);
            this.buildings = data.buildings;
            this.sections = data.sections;
            this.floors = data.floors;
            this.plans = data.plans;
            this.object = data.object;
          }
        },
        "json"
      )
    },
    edit(data, type){
      console.log(data, type);
    }
  }
};
</script>

<style lang="scss">
.all-object{
  display: flex;
  justify-content: flex-end;
  .list-ob{
    h3{
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
}
.list-ob{
  max-width: 500px;
  .in-list{
    padding-left: 20px;
  }
  .line{
    margin-bottom: 8px;
    display: flex;
    .name{
      width: 90%;
      padding: 10px 30px 10px 15px;
      border-radius: 5px;
      border: 2px solid #E5E5E5;
      margin-right: 5px;
    }
    .btn{
      min-width: 110px;
      background: #5fbeaa;
      outline: none;
      color: #fff;
    }
  }
}

</style>
