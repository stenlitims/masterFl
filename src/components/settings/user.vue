<template>
  <div class="user-block settings-right">
    <div class="user-header">
      <div class="avatar">
        <img :src="$store.state.mainurl +'/assets/panel/img/user.svg'" alt>
      </div>
      <div class="inf">
        <div class="name">
          <div>{{out.fullname}}</div>
          <a href="#" class="edit" @click.prevent="activeSlname = !activeSlname">
            <svg>
              <use xlink:href="#icon-edit"></use>
            </svg>
          </a>
        </div>
        <div class="type">Администратор</div>
      </div>
    </div>

    <slide-up-down :active="activeSlname" :duration="500">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label>Имя</label>
            <input
              type="text"
              class="form-control"
              @keyup="setChanges('fullname')"
              v-model="out.fullname"
            >
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label>Должность</label>
            <input
              type="text"
              class="form-control"
              @keyup="setChanges('address')"
              v-model="out.address"
            >
          </div>
        </div>
      </div>
    </slide-up-down>

    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <label>Телефон</label>
          <input type="text" class="form-control" @keyup="setChanges('phone')" v-model="out.phone">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label>Компания</label>
          <input type="text" class="form-control" @keyup="setChanges('fax')" v-model="out.fax">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" @keyup="setChanges('email')" readonly v-model="out.email">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label>Сайт</label>
          <input
            type="text"
            class="form-control"
            @keyup="setChanges('website')"
            v-model="out.website"
          >
        </div>
      </div>
    </div>

    <div class="control-wrap pass-control">
      <div class="c-title">Пароль</div>
      <div>
        <button class="btn btn-outline-primary waves-effect" @click="popPass">Изменить</button>
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
      form: {},
      original: {},
      activeSlname: false
    };
  },

  created() {
    //  this.$store.commit("loadUser");
  },
  beforeDestroy() {
    $(document).off("click", ".eye", this.passeye);
  },

  mounted() {
    $(document).on("click", ".eye", this.passeye);

    $(document).on("click", ".forget-pass", e => {
      e.preventDefault();
      swal({
        title: "Восстановление пароля",
        html:
          "Ваш пароль будет отправлен на электронный адрес <b>" +
          this.$store.state.user.email +
          '</b>. Нажмите "Восстановить" если хотите продолжить.',
        type: "warning",
        showCancelButton: true,
        cancelButtonClass: "btn btn-line btn-md waves-effect",
        confirmButtonClass: "btn btn-or btn-md waves-effect",
        confirmButtonText: "Восстановить",
        cancelButtonText: "Отмена"
      }).then(result => {
        if (result.value) {
          $.post(
            this.$store.state.apiurl,
            {
              action: "sendPass"
            },
            data => {
              if (data.type == "success") {
                swal(
                  "Отправлено!",
                  "Пароль отправлен на вашу почту.",
                  "success"
                );
              } else {
                swal("Ошибка!", "error");
              }
            },
            "json"
          );
        } else {
          this.popPass();
        }
      });
    });
  },
  computed: {
    out() {
      if (this.$store.state.changes.count.length == 0) {
        this.form = Object.assign({}, this.$store.state.user);
        this.original = Object.assign({}, this.$store.state.user);
      }
      return this.form;
    }
  },
  methods: {
    passeye() {
      if ($("#new_pass").attr("type") == "password") {
        $("#new_pass").attr("type", "text");
        $(".eye img").attr(
          "src",
          this.$store.state.mainurl + "/assets/panel/img/e/view.png"
        );
      } else {
        $("#new_pass").attr("type", "password");
        $(".eye img").attr(
          "src",
          this.$store.state.mainurl + "/assets/panel/img/e/hide.png"
        );
      }
    },
    popPass() {
      let old_pass = null;
      let new_pass = null;
      swal({
        title: "Изменить пароль",
        html:
          `
        <div class="form-group">
            <div class="a-dflex">
              <label>Введите старый пароль</label>
              <div><a href="#" class="forget-pass">Забыл пароль</a></div>
            </div>
            <input type="password" class="form-control" id="old_pass" name="password">
          </div>
          <div class="form-group" style="margin-bottom: 10px">
            <div class="a-dflex">
              <label>Новый пароль</label>
              <div class="eye">
                <img src="` +
          this.$store.state.mainurl +
          `/assets/panel/img/e/hide.png" alt="">
              </div>
            </div>
            <input type="password" class="form-control" id="new_pass" name="password">
          </div>
        `,
        //   focusConfirm: false,
        showCancelButton: true,
        cancelButtonClass: "btn btn-line btn-md waves-effect",
        confirmButtonClass: "btn btn-or btn-md waves-effect",
        confirmButtonText: "Сохранить",
        cancelButtonText: "Отмена",
        preConfirm: form => {
          old_pass = document.getElementById("old_pass").value;
          new_pass = document.getElementById("new_pass").value;
          let err = null;
          if (old_pass.trim() == "" || new_pass.trim() == "") {
            //  console.log(234);
            return swal.showValidationMessage(`Все поля должны быть заполнены`);
          } else if (new_pass.length < 8) {
            return swal.showValidationMessage(
              `Новый пароль должен иметь минимум 8 символов`
            );
          }

          return $.post(
            this.$store.state.apiurl,
            {
              action: "changePassword",
              old_pass: old_pass,
              new_pass: new_pass
            },
            data => {
              if (data.type == "success") {
                return true;
              } else {
                swal.showValidationMessage(`Неверный пароль`);
              }
            },
            "json"
          );
        }
      }).then(result => {
        if (result.value) {
          swal("Успешно сохранено!");
        }
      });
    },
    editName() {},
    send(data) {
      // console.log(this.data);
      $.post(
        this.$store.state.apiurl,
        {
          action: "saveUser",
          data: {
            phone: this.form.phone,
            fax: this.form.fax,
            email: this.form.email,
            website: this.form.website,
            fullname: this.form.fullname,
            address: this.form.address
          }
        },
        data => {
          if (data) {
            // console.log(data);
            this.$store.state.user = this.form;
            this.saveOk();
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
      margin-top: -8px;
    }
    svg {
      width: 18px;
      height: 18px;
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

.eye {
  width: 30px;
  height: 30px;
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>
