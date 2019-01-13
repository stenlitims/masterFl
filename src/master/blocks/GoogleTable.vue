<template>
  <div class="google-table">
    <img
      style="display:none;"
      onload
      onerror="alert('Вы не авторизированы в ' + network + '. Для авторизации перейдите https://accounts.google.com/')"
      src="https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1"
    >
    <div class="nav_line">
      <div>
        <i class="icon-c-logo">
          <img src="https://flatris.com.ua/assets/images/logo/logo_w.svg" height="30">
        </i>
      </div>
      <div class="btns">
        <a class="btn_transparent" @click.prevent="close" href="#">
          <span>Закрыть</span>
        </a>
        <a class="btn_save" @click.prevent="setTable" href="#">Сохранить в
          <strong>FLATRIS</strong>
        </a>
      </div>
    </div>
    <iframe class="googlespreadsheets_frame" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: "GoogleTable",
  props: ["spreadsheet_id", "object_id"],
  data() {
    return {};
  },
  mounted() {
    swal({
      title: "Обновление",
      text: "Идет выгрузка данных из FLATRIS. Подождите несколько секунд...",
      // timer: 2000,
      showConfirmButton: false
    });
    $.ajax({
      url:
        this.$root.mainurl +
        "/api?action=updateSpreadsheetProducts&gproject_id=" +
        +this.object_id,
      dataType: "json"
    })
      .done(function(response) {
        if (response.error) {
          swal("Ошибка!", response.error.message, "error");
        } else {
          swal.closeModal();
        }
      })
      .fail(function(jqXHR, textStatus) {
        swal("Ошибка!", textStatus, "error");
      });
  },
  computed: {
    url() {
      return (
        "https://docs.google.com/spreadsheets/d/" +
        this.spreadsheet_id +
        "/edit"
      );
    }
  },
  methods: {
    setTable() {
      swal({
        title: "Обновление",
        text: "Идет обновление данных в FLATRIS. Подождите несколько секунд...",
        // timer: 2000,
        showConfirmButton: false
      });
      var url =
        this.$root.mainurl +
        "/api/?gproject_id=" +
        this.object_id +
        "&action=spreadsheet2db";
      $.ajax({
        url: url,
        dataType: "json"
      })
        .done(response => {
          if (response.error) {
            swal("Ошибка!", response.error.message, "error");
          } else {
            swal("Обновлено!", response.data.message, "success");

            this.generateFloors();
            setTimeout(() => {
              //  this.$emit("closeTable", true);
              this.$bus.emit("activeBtn", true);
              this.$bus.emit("saveTable", true);
              swal.closeModal();
            }, 1000);
          }
        })
        .fail(function(jqXHR, textStatus) {
          console.log(jqXHR);
          swal("Ошибка!", jqXHR.responseText, "error");
        });
    },
    generateFloors() {
      $.post(
        this.$root.apiurl,
        {
          action: "generateFloors",
          object_id: this.object_id
        },
        data => {
          if (data) {
          }
        },
        "json"
      );
    },
    close() {
      this.$emit("closeTable", true);
    }
  }
};
</script>

<style lang="scss">
.google-table {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
}

.nav_line {
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0px;
  top: 0px;
  border: none;
  box-sizing: border-box;
  background-color: #36404a;
  padding: 9px 30px 7px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #fff;
  }
}

.btn_save {
  background-color: #5fbeaa !important;
  border: 1px solid #5fbeaa !important;
  text-decoration: none;
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
  outline: none !important;
  cursor: pointer;
  padding: 7px 13px;
  color: #fff;
  font-size: 12px;
  position: relative;
  &:hover {
    color: #fff;
  }
}
.btn_transparent {
  background: transparent !important;
  border-color: transparent !important;
  color: #fff;
  margin-right: 25px;
  font-size: 13px;
}
.btn_transparent span {
  border-bottom: 1px solid #fff;
  display: inline-block;
}

.googlespreadsheets_frame {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  left: 0px;
  top: 50px;
  bottom: 0px;
  border: none;
  box-sizing: border-box;
}
</style>
