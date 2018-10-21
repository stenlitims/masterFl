<template>
  <div class="form">
    <h3 class="text-center">Карточка агента</h3>
    <div class="form">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Тип Агента</label>
            <select v-model="form.type" class="form-control">
              <option v-for="(item, i) in type_agents" :value="i" :key="i"> {{item}} </option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Название компании / ФИО агента</label>
            <input type="text" class="form-control" placeholder="" v-model="form.name">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="form.email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Сайт</label>
            <input type="text" class="form-control" v-model="form.site">
          </div>
        </div>
      </div>

      <div v-if="errors.length">
        <div class="alert alert-danger text-center" role="alert">
          <p v-for="(item, i) in errors" :key="i">
            {{item}}
          </p>
        </div>
      </div>
    </div>
   

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "agent1",
  mixins: [masterMixin],
  data() {
    return {
      form: {
        type: "",
        name: "",
        email: "",
        site: ""
      },
      required: {
        active: ""
      },
      type_agents: [1,2,3,4]
    };
  },
  created() {
    
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
  },
  methods: {
    send(e) {
      this.errors = [];
 



      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
</style>
