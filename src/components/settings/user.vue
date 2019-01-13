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
          <input type="text" class="form-control" @keyup="setChanges('email')" v-model="out.email">
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

  mounted() {},
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
    popPass() {
      (async () => {
        const { value: sw } = await swal({
          title: "Изменить пароль",
          html: `
        <div class="form-group">
            <div class="a-dflex">
              <label>Введите старый пароль</label>
              <div><a href="#">Забыл пароль</a></div>
            </div>
            <input type="text" class="form-control" id="old_pass" name="password">
          </div>
          <div class="form-group" style="margin-bottom: 10px">
            <div class="a-dflex">
              <label>Новый пароль</label>
            </div>
            
            <input type="text" class="form-control" id="new_pass" name="password">
          </div>
        `,
          //   focusConfirm: false,
          showCancelButton: true,
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect",
          confirmButtonText: "Сохранить",
          cancelButtonText: "Отмена",
          preConfirm: form => {
            let old_pass = document.getElementById("old_pass").value;
            let new_pass = document.getElementById("new_pass").value;
            if (new_pass.length < 8) {
              swal.showValidationMessage(
                `Новый пароль должен иметь минимум 8 символов`
              );
            } else {
              console.log(4523);
              //  swal('Успешно сохранено!');
            }
          }
        });

        if (sw) {
          swal("Успешно сохранено!");
        }
      })();
    },
    editName() {
      Swal({
        title: "Submit your Github username",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        preConfirm: login => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if (result.value) {
          Swal({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          });
        }
      });
    },
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
            address: this.form.address,
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
</style>
