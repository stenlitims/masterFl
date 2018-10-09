<template>
  <div class="form" :class="{'loader': pleloader == true}">

    <div v-if="!activeImport">
      <h3 class="text-center">Как вы хотите внести данные по квартирам?</h3>
      <div class="list-import" >
        <div class="item" 
        :class="{'active': item.id == activeImport}" 
        @click="activeImport = item.id"
        v-for="(item, i) in varimport" :key="i">
          <div class="cr"></div>
          <div class="img"><img :src="'http://flatris.com.ua/assets/images/import/'+item.img" alt=""></div>
          <div class="title">{{item.name}}</div>
        </div>
      </div>
    </div>

    <div v-if="activeImport == 2">
      
      <h3 class="text-center">Заполнение таблицы с квартирами онлайн</h3>

      <div v-if="innerStep == 0">
        <div class="text-inner text-center">
          <p>Мы интегрировали google таблицы во Flatris, что бы вам было удобно заполнять и редактировать таблицу с квартирами в любом месте и с любого устройства.</p>
          <p>Что бы начать заполнять таблицу с квартирами укажите вашу почту на gmail</p>
        </div>

        <form action="" class="form gmail-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="email" v-model="form.email" placeholder="введите GMAIL" class="form-control">
              </div>
              <div class="form-group">
                <button type="button" @click.prevent="sendEmail" class="btn-default btn-md waves-effect waves-light">ПОДТВЕРДИТЬ</button>
              </div>
            </div>
          </div>
        </form>

      </div>
       <div v-if="innerStep == 1">
          <div class="text-inner text-center">
          <p>Для перехода на следующий шаг, необходимо заполнить таблицу с квартирами.</p>
          <p>Если возникнут сложности, посмотрите <a href=""> короткое видео как заполнять таблицу</a></p>
        </div>

        <div class="text-center btns-big">
          <a href="#"
              @click.prevent="showTable"
           target="_blank" class="btn-default btn-md waves-effect waves-light">ЗАПОЛНИТЬ ТАБЛИЦУ С КВАРТИРАМИ</a> <br><br>
          <a href="#" class="btn-default btn-md waves-effect waves-light">РЕДАКТИРОВАТЬ ПРАВА ДОСТУПА К ТАБЛИЦЕ</a>
        </div>

      </div>
      
    </div>
   
   <div class="container"  v-if="activeImport == 'form'">
      <h3 class="text-center">Добавление информации по объекту</h3>
      <div class="text-inner text-center">
        <p>Данный этап не является обязательным. Вы можете пропустить его и вернуться к заполнению в любое время.</p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <all-object @typeForm="setTypeForm" :object_id="object_id"></all-object>
        </div>
        <div class="col-md-6 wrap-edit">
          <component :is="typeForm" :form="formData"></component>
          
        </div>
      </div>
   </div>
    
 

  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";
import AllObject from "@/blocks/AllObject";
import EditBuilding from "@/blocks/edit/building";
import EditSection from "@/blocks/edit/section";
import EditPlan from "@/blocks/edit/plan";

export default {
  name: "FlatsImport",
  mixins: [masterMixin],
  data() {
    return {
      varimport: [
        // {
        //   id: 1,
        //   name: "Загрузить с компьютера",
        //   img: "import-file.svg"
        // },
        {
          id: 2,
          name: "Заполнить онлайн",
          img: "google-sheets.svg"
        },
        {
          id: 3,
          name: "Перенести с Profitbase",
          img: "profit.jpg"
        }
      ],
      innerStep: 0,
      activeImport: "form",
     // activeImport: 2,
      spreadsheet_id: null,
      link_table: null,
      edit_p: false,
      pleloader: false,
      typeForm: "EditBuilding",
      formData: {},
      form: {
        email: "",
        active: ""
      },
      required: {
        email: "",
        active: ""
      }
    };
  },
  components: {
    AllObject: AllObject,
    EditBuilding: EditBuilding,
    EditSection: EditSection,
    EditPlan: EditPlan,
  },
  created() {
    this.getEmail();
    this.$bus.on("saveTable", this.showForm);
    this.$bus.on("formData", this.setTypeForm);
  },
  beforeDestroy() {
    this.$bus.off("saveTable", this.showForm);
    this.$bus.off("formData", this.setTypeForm);
  },
  mounted() {},
  computed: {},
  methods: {
    showForm() {
      this.activeImport = "form";
    },
    setTypeForm(data) {
      this.typeForm = data.type;
      this.formData = data;
    },
    showTable() {
      this.$emit("showTable", true);
      this.edit_p = true;
    },
    isGmailAddress(email) {
      let pattern = /^\w+([\.-]?\w+)*@gmail.com+$/;
      if (pattern.test(email)) {
        return true;
        // this.innerStep = 1;
      }
      return false;
    },
    getEmail() {
      $.post(
        this.$root.apiurl,
        {
          action: "getEmail"
        },
        data => {
          if (data) {
            // console.log(data);
            if (this.isGmailAddress(data.email)) {
              this.form.email = data.email;
            }
          }
        },
        "json"
      );
    },
    sendEmail() {
      if (!this.isGmailAddress(this.form.email)) return false;
      this.pleloader = true;
      $.post(
        this.$root.apiurl,
        {
          action: "setEmail",
          email: this.form.email,
          object_id: this.object_id
        },
        data => {
          if (data) {
            //console.log(data);
            this.innerStep = 1;
            this.spreadsheet_id = data.spreadsheet_id;
            this.$emit("spreadsheetId", data.spreadsheet_id);
            this.link_table = data.link_table;
            this.pleloader = false;
          }
        },
        "json"
      );
    },
    send(w) {
      // console.log(w);
      if (w == "prev") {
        this.$emit("footerBtn", w);
        return;
      }
      this.errors = [];
      this.findError();

      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Требуется указать имя.");
      }
      if (!this.form.adress) {
        this.errors.push("Требуется указать адресс.");
      }

      if (!this.errors.length) {
        this.$emit("eventChild", true);
        this.success = true;
      }
    }
  }
};
</script>

<style lang="scss">
.list-import {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  .item {
    width: 220px;
    height: 170px;
    padding: 15px;
    margin: 20px 30px;
    border: 2px solid #33b275;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    .cr {
      width: 22px;
      height: 22px;
      position: absolute;
      top: 11px;
      right: 11px;
      border: 2px solid #33b275;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    &.active {
      background: rgba(0, 0, 0, 0.05);
      .cr {
        background: #33b275;
        border: none;

        &:before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 12px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: translate(-50%, -60%) rotate(45deg);
        }
      }
    }
  }
  .img {
    margin-bottom: 15px;
  }
  img {
    max-height: 80px;
  }
}

.gmail-form {
  text-align: center;
  input {
    text-align: center;
  }
}

.edit-form {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  .form-group {
    margin-bottom: 1.5rem;
  }
  .form-control {
    height: 42px;
    padding-left: 17px;
  }
}
.wrap-edit {
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: -600px;
    bottom: 0;
    background: #f9f9f9;
  }
  > div {
    position: relative;
    z-index: 1;
  }
}
</style>
