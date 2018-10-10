<template>
<div class="list-email">
  <div class="form-group" :class="{'main': i == 'email'}" v-for="(item, i) in emails" :key="i">
    <label class="text-center m-label" v-if="i == 'email'">Главный Email</label>
    <div v-if="count < 6">
      <div v-if="i == 'email'" class="plus" @click="add()">+</div>
    </div>
    <div v-if="i != 'email'" class="minus" @click="del(i)">-</div>
    <input type="text" v-model="emails[i]" placeholder="" class="form-control">
  </div>
  
  <div v-if="errors.length">
    <div class="alert alert-danger text-center" role="alert">
     <p>Принимаются только gmail адреса</p> 
      <p v-for="(item, i) in errors" :key="i">
        {{item}}
      </p>
    </div>
  </div>

  <div class="text-center btns">
    <button @click="save" class="btn btn-md waves-effect">Сохранить</button>
  </div>
</div>
</template>

<script>
export default {
  name: "googleEmails",
  data() {
    return {
      emails: {
        email: "3792282@gmail.com",
        email2: "2@gmail.com",
        email3: "3@gmail.com"
      },
      emailsCopy: {
        email: "3792282@gmail.com",
        email2: "2@gmail.com",
        email3: "3@gmail.com"
      },
      errors: []
    };
  },
  created() {},
  beforeDestroy() {},
  mounted() {},
  computed: {
    count() {
      return Object.keys(this.emails).length;
    }
  },
  methods: {
    isGmailAddress(email) {
      let pattern = /^\w+([\.-]?\w+)*@gmail.com+$/;
      if (pattern.test(email)) {
        return true;
      }
      return false;
    },
    del(i) {
      let objCopy = Object.assign({}, this.emails);
      delete objCopy[i];
      this.emails = objCopy;
    },
    add(i) {
      let name = "email" + (this.count + 1);
      let objCopy = Object.assign({}, this.emails);
      objCopy[name] = "";
      this.emails = objCopy;
    },
    save() {
      let add = [];
      let remove = [];
      this.errors = [];
      for (let item in this.emails) {
        if (!this.isGmailAddress(this.emails[item]) && this.emails[item].trim()) this.errors.push(this.emails[item]);
        if (this.emailsCopy[item] != this.emails[item]) {
          if (this.emails[item]) add.push(this.emails[item].trim());
          if (this.emailsCopy[item]) remove.push(this.emailsCopy[item].trim());
        }
      }

      console.log("add", add);
      console.log("remove", remove);

      if(!this.emails.email.trim()) this.errors.push(this.emails.email.trim());

      if(this.errors.length) return;

      this.$emit("saveEmails", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  position: relative;
}
.m-label{
  display: block;
}
.list-email {
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}
.form-group.main{
  margin-bottom: 30px;
}
.plus,
.minus {
  position: absolute;
  right: -35px;
  bottom: 6px;
  width: 24px;
  height: 24px;
  color: #fff;
  background: #33b275;
  text-align: center;
  line-height: 24px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.minus {
  left: -35px;
  right: inherit;
  line-height: 21px;
  background: #ff7a59;
}
</style>
