<template>
<div class="user-block settings-right">
  <div class="user-header">
    <div class="avatar">
      <img src="https://test.flatris.com.ua/assets/panel/img/user.svg" alt="">
    </div>
    <div class="inf">
      <div class="name">
        
      <div>{{form.fullname}}</div>   <a href="#" class="edit"><svg><use xlink:href="#icon-edit"></use></svg></a></div>
      <div class="type">Администратор</div>
    </div>
  </div>


      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Телефон</label>
            <input type="text" class="form-control" @keydown="setChanges('phone')" v-model="form.phone">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Компания</label>
            <input type="text" class="form-control" @keydown="setChanges('Компания')" v-model="form.fax">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" @keydown="setChanges('email')"  v-model="form.email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Сайт</label>
            <input type="text" class="form-control" @keydown="setChanges('website')"  v-model="form.website">
          </div>
        </div>
      </div>

      <div class="control-wrap pass-control">
        <div class="c-title">Пароль</div>
        <div>
          <button class="btn btn-outline-primary">Изменить</button>
        </div>
      </div>

</div>
  
</template>

<script>
import settings from "@/mixin/settings";

export default {
  name: "user",
  mixins: [settings],
  data() {
    return {
      data: {}
    };
  },

  created() {
    this.data = Object.assign({}, this.$store.state.user);
    //  this.$store.commit("loadUser");
  },

  mounted() {},
  computed: {
    form() {
      if (this.$store.state.changes.count.length == 0) {
        this.data = Object.assign({}, this.$store.state.user);
      }
      return this.data;
    }
  },
  methods: {
    send(data) {
      // console.log(this.data);
      $.post(
        this.$store.state.apiurl,
        {
          action: "saveUser",
          data: {
            phone: this.data.phone,
            fax: this.data.fax,
            email: this.data.email,
            website: this.data.website
          }
        },
        data => {
          if (data) {
           // console.log(data);
            this.$store.state.user = this.data;
            this.clearChenge();
          }
        },
        "json"
      );
    }
  }
};
</script>

<style lang="scss">
.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  .avatar {
    margin-right: 15px;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #cbd6e2;
    }
  }

  .name {
    font-size: 24px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    a {
      margin-left: 10px;
      display: block;
      height: 26px;
    }
    svg {
      width: 22px;
      height: 22px;
      fill: #2e3f50;
    }
  }

  .type {
    padding: 6px 12px;
    border: 2px solid #cbd6e2;
    display: inline-block;
    border-radius: 5px;
    background: #fff;
  }
}
.pass-control {
  margin-top: 20px;
}
</style>
