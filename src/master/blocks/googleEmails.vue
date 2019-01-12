<template>
<div class="list-email">
  <div class="wrap-form" :class="{'loader': loader}">
    <div class="form-group" :class="{'main': i == 0}" v-for="(item, i) in emails" :key="i">
      <label class="text-center m-label" v-if="i == 0">Главный Email</label>
      <div v-if="count < 6">
        <div v-if="i == 0" class="plus" @click="add()">+</div>
      </div>
      <div v-if="i != 0" class="minus" @click="del(i)">-</div>

      <div v-if="i == 0">
        <input type="text" v-model="emails[i]" placeholder="" :disabled="editInput" class="form-control">
        <div class="edit">
          <img
          @click="editInput = !editInput"
           src="https://test.flatris.com.ua/assets/panel/img/edit.svg" alt="">
        </div>
      </div>
      <div v-else>
        <input type="text" v-model="emails[i]" placeholder="" class="form-control">
      </div>
      
    </div>
    
    <div v-if="errors.length">
      <div class="alert alert-danger text-center" role="alert">
      <p>Принимаются только gmail адреса</p> 
        <p v-for="(item, i) in errors" :key="i">
          {{item}}
        </p>
      </div>
    </div>

    <div class="text-center btns" v-if="emails[0]">
      <button @click="save" class="btn btn-md waves-effect">Сохранить</button>
      <button @click="$emit('saveEmails', true)" class="btn btn-cancel btn-md waves-effect">Отмена</button>
    </div>

  </div>
  
</div>
</template>

<script>
export default {
  name: "googleEmails",
  props: ["spreadsheet_id"],
  data() {
    return {
      emails: [],
      emailsCopy: [],
      errors: [],
      editInput: true,
      loader: true
    };
  },
  created() {
    this.get();
  },
  beforeDestroy() {},
  mounted() {},
  computed: {
    count() {
      return Object.keys(this.emails).length;
    }
  },
  methods: {
    
    del(i) {
      this.emails.splice(i, 1);
    },
    add(i) {
      this.emails.push("");
 
    },
    get() {
      $.post(
        this.$root.apiurl,
        {
          action: "getGoogleEmails",
          spreadsheet_id: this.spreadsheet_id
        },
        data => {
          if (data) {
            this.emails = data;
            this.emailsCopy = data.slice();
            this.loader = false
            // console.log(data);
          }
        },
        "json"
      );
    },
    save() {
      let add = [];
      let remove = [];
      this.errors = [];

      for (let item of this.emailsCopy) {
        let f = 0;
        for (let item2 of this.emails) {
          if (item.trim() == item2) {
            f = 1;
          }
        }
        if (!f) {
         if(item.trim()) remove.push(item.trim());
        }
      }
      for (let item of this.emails) {
        let f = 0;
        for (let item2 of this.emailsCopy) {
          if (item.trim() == item2) {
            f = 1;
          }
        }

        if (!this.isGmailAddress(item) && item.trim()) {
          this.errors.push(item);
        }

        if (!f) {
         if(item.trim()) add.push(item.trim());
        }
      }

      console.log("add", add);
      console.log("remove", remove);

   //   return;

      if (!this.emails[0].trim()) this.errors.push(this.emails[0].trim());

      if (this.errors.length) return;

      if(!add.length && !remove.length){
        this.$emit("saveEmails", true);
        return;
      }
      this.loader = true;
      $.post(
        this.$root.apiurl,
        {
          action: "setGoogleEmails",
          spreadsheet_id: this.spreadsheet_id,
          add: add,
          remove: remove
        },
        data => {
          if (data) {
            //console.log(data);
            this.loader = false;
            this.$emit("saveEmails", true);
          }
        },
        "json"
      );


    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  position: relative;
}
.m-label {
  display: block;
}
.list-email {
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}
.form-group.main {
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
.wrap-form {
  min-height: 300px;
}
.btns{
  margin-top: 40px;
  .btn{
    margin: 0 7px;
    min-width: 106px;
  }
}
.edit {
  position: absolute;
  left: -35px;
  bottom: 10px;
  img {
    width: 22px;
    cursor: pointer;
  }
}


@media (max-width: 567px) {
  .list-email{
    max-width: 260px;
  }
}


</style>
