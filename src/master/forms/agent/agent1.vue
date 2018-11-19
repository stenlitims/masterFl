<template>
  <div class="form">
    <h3 class="text-center">Карточка агента</h3>
    <div class="form">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Тип Агента</label>
            <select v-model="form.type" class="form-control">
              <option v-for="(item, i) in type_agents" :value="i" :key="i"
              > {{item}}</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Название компании / ФИО агента</label>
            <input type="text" class="form-control" placeholder="" v-model="form.agent_user_name">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="form.agent_user_email">
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
        type: "manager",
        agent_user_name: "",
        agent_user_email: "",
        site: ""
      },
      required: {
        type: "",
        agent_user_name: "",
        agent_user_email: "email"
        //  site: ""
      },
      type_agents: {
        manager: "менеджер",
        agent: "агенство"
      }
    };
  },
  created() {},
  updated() {},
  mounted() {
    // this.$emit("btnActive", !this.error.length);
  },
  methods: {
    send(e) {
      this.errors = [];

      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      this.errors = [];

      if (!this.form.agent_user_name) {
        this.errors.push("Требуется указать - Название компании / ФИО агента");
      }
      if (!this.form.agent_user_email) {
        this.errors.push("Требуется указать - Email");
      }

      if (this.errors.length) return false;

      $.post(
        this.$root.mainurl+ '/api/?action=addUser',
        this.form,
        data => {
          if (data) {
            window.aget_id = data.agent_id;
            this.$emit("footerBtn", e);
          }
          
        },
        "json"
      );

    //  this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss">
</style>
