<template>
  <div class="modal-right">
    <div class="modal-heading">
      <div>{{$store.state.rmodal.title}}</div>
      <div class="modal-close" @click="closeRmodal"></div>
    </div>
    <div class="content">
      <mUser :data="user"></mUser>
      <div class="text-center">
        <button
          class="btn-line btn-md waves-effect"
          v-if="$store.state.rmodal.type == 'addUser'"
          @click="addUser"
        >Добавить пользователя</button>
      </div>
    </div>
  </div>
</template>

<script>
import mUser from "@/components/modal/mUser";

export default {
  name: "modalRight",
  data() {
    return {
      data: {},
      search: null,
      user: {
        name: null,
        email: null,
        gmail: null,
        dataPer: {}
      }
    };
  },

  components: {
    mUser
  },

  created() {},

  mounted() {},
  computed: {},
  methods: {
    addUser() {

      if (!this.user.name) {
        this.mesError("Заполните имя!");
        return;
      }

      if (!this.isAddress(this.user.email)) {
        this.mesError("Некорректный Email адресс!");
        return;
      }

      if (!this.isGmailAddress(this.user.gmail)) {
        this.mesError("Некорректный gmail адресс!");
        return;
      }

     

      $.post(
        this.$store.state.apiurl,
        {
          action: "addUser",
          data: this.user
        },
        data => {
          if (data.type == "success") {
            this.saveOk();
            this.$store.commit("getUsers");
            this.$store.commit("loadUserPermissions");
            this.$store.commit("loadRmodal", {
              type: null
            });
          }
        },
        "json"
      );
    },
    send(data) {
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss">
.modal-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  background: #fff;
  bottom: 0;
  z-index: 500;
  overflow-y: auto;
}

.modal-heading {
  padding: 12px 20px 12px 30px;
  color: #fff;
  background: linear-gradient(
    to right,
    rgba(0, 171, 182, 1) 0%,
    rgba(0, 188, 165, 1) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  padding: 30px 25px;
}

.modal-close {
  margin-top: -5px;
  cursor: pointer;
  &:before {
    line-height: 1;
    content: "\D7";
    height: 20px;
    font-size: 26px;
    display: block;
  }
}
</style>
