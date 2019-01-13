<template>
  <div class="form">
    <h3 class="text-center">Веб-шахматка для сайта готова!</h3>
    <div class="text-center">
      <a
        :href="$root.mainurl+'/api/chess/?cid='+cid"
        target="_blank"
        class="btn btn-md btn-cancel waves-effect"
      >Предварительный просмотр</a>
    </div>

    <div class="wrap-code">
      <p>Чтобы разместить веш-шахматку на вашем сайте - скопируйте и вставьте код на вашем сайте перед закрывающим тегом body</p>
      <textarea id="code" name="code" v-model="code"></textarea>
    </div>

    <div class="btns text-center">
      <button class="btn btn-md waves-effect" @click="copy">Скопировать код</button>
      <button class="btn btn-md waves-effect" @click="sendToEmail">Отправить на email</button>
    </div>
  </div>
</template>

<script>
import masterMixin from "@/mixin/masterMixin";

export default {
  name: "webCh6",
  mixins: [masterMixin],
  data() {
    return {
      errors: [],
      success: false,
      object: {},
      form: {},
      cid: "",
      upd: false,
      required: {}
    };
  },
  created() {
    if (!window.loadsScriptOb) {
      this.loadsScript();
    }
  },
  updated() {},
  mounted() {
    this.$emit("btnActive", !this.error.length);
    if (window.loadsScriptOb) this.getCid();
  },
  computed: {
    code() {
      let code = `
<script type="text/javascript">
    (function (d,s,u,e,p) {
        p=d.getElementsByTagName(s)[0],e=d.createElement(s),e.async=1,e.src=u,p.parentNode.insertBefore(e, p);
    })(document, 'script', '${this.$root.mainurl}/public/web.js?cid=${
        this.cid
      }');
&lt;/script>
      `;

      code = code.replace("&lt;", "<");
      return code;
    }
  },
  methods: {
    getCid() {
      $.post(
        this.$root.apiurl,
        {
          id: this.object_id,
          action: "getCid"
        },
        data => {
          if (data) {
            this.cid = data.cid;
            this.addCode();
          }
        },
        "json"
      );
    },
    loadsScript() {
      $("head").append(
        $('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          this.$root.mainurl + "/assets/plugins/codemirror/css/codemirror.css"
        )
      );
      $("head").append(
        $('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          this.$root.mainurl + "/assets/plugins/codemirror/css/ambiance.css"
        )
      );
      $.getScript(
        this.$root.mainurl + "/assets/plugins/codemirror/js/codemirror.js",
        () => {
          $.getScript(
            this.$root.mainurl + "/assets/plugins/codemirror/js/formatting.js",
            () => {
              $.getScript(
                this.$root.mainurl + "/assets/plugins/codemirror/js/xml.js",
                () => {
                  this.loader = false;
                  window.loadsScriptOb = true;
                  this.getCid();
                }
              );
            }
          );
        }
      );
    },

    sendToEmail() {
      (async () => {
        const { value: sw } = await swal({
          title: "Отправить?",

          showCancelButton: true,
          confirmButtonText: "Да, отправить",
          cancelButtonText: "Отмена",
          cancelButtonClass: "btn btn-line btn-md waves-effect",
          confirmButtonClass: "btn btn-or btn-md waves-effect"
        });

        if (sw) {
          $.post(
            this.$root.apiurl,
            {
              action: "sendWebchessCode",
              code: this.code
            },
            data => {
              if ((data.type = "success")) {
                swal("Отправлено!", "", "success");
              }
            },
            "json"
          );
        }
      })();
    },

    addCode() {
      $(".CodeMirror").remove();
      setTimeout(() => {
        var editor = CodeMirror.fromTextArea($("#code")[0], {
          mode: { name: "xml", alignCDATA: true },
          lineNumbers: true,
          theme: "ambiance"
        });
      }, 15);

      //  console.log(editor);
    },

    copy(id) {
      var copyTextarea = document.querySelector("#code");
      copyTextarea.focus();
      copyTextarea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        //  console.log("Copying text command was " + msg);
      } catch (err) {
        //     console.log("Oops, unable to copy");
      }
    },

    send(e) {
      if (e == "prev") {
        this.$emit("footerBtn", e);
        return true;
      }

      // $.post(
      //   this.$root.apiurl,
      //   {
      //     action: "setWebchessPrLang",
      //     id: this.object_id,
      //     lang: lang
      //   },
      //   data => {
      //     if (data) {
      //       console.log(data);
      //     }
      //   },
      //   "json"
      // );

      //   this.$emit("footerBtn", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: inherit !important;
}
.wrap-code {
  margin-top: 40px;
  margin-bottom: 40px;
  p {
    margin-bottom: 5px;
  }
}

.btns {
  .btn {
    margin: 10px;
  }
}

#code {
  position: absolute;
  opacity: 0;
  display: block !important;
}
</style>
