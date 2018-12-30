<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Объекты</div>

        <div class="r">
          <div class="btn-group btn-group-toggle">
            <button class="btn btn-lg btn-success waves-effect">Мои объекты</button>
            <button class="btn btn-lg btn-outline-success waves-effect">Доступные мне</button>
          </div>

          <router-link
            :to="{ name: 'new_object', params: { id: 1 }}"
            class="btn btn-lg btn-danger waves-effect"
          >Создать новый объект</router-link>
        </div>
      </div>
    </div>
    <div class="main-container container">
      <div class="search-wrap row">
        <div class="form-group col-md-5 col-xl-4">
          <div class="search">
            <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div class="objects-list main-list">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="item item-add">
              <div class="title">Создать новый объект</div>
              <div class="img">
                <img :src="$root.mainurl +'/assets/panel/img/main/2.svg'" alt>
              </div>
              <div class="btns">
                <router-link
                  :to="{ name: 'new_object', params: { id: 1 }}"
                  class="btn btn-default btn-md waves-effect"
                >Создать объект</router-link>
              </div>
              <div class="info">
                <a href="#">Посмотреть инструкцию</a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" v-for="(item, i) in objects" :key="i">
            <div class="item">
              <div class="item-h">
                <div class="l">
                  <div class="title-o">{{item.name}}</div>
                  <div class="loc">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {{item.address}}
                  </div>
                </div>
                <div class="r">
                  <div class="count">
                    <span>{{item.total}}</span>
                    квартир
                  </div>
                </div>
              </div>

              <div class="img img-m">
                <img :src="item.logo" v-if="item.logo" alt>
                <img :src="item.img" v-else-if="item.img" alt>
                <img :src="$store.state.mainurl+'/assets/panel/img/object.svg'" v-else alt>
              </div>
              <div class="w-status">
                <div class="sh">
                  <div class="t">Статус продаж</div>
                  <div class="st-btns">
                    <div class="it active" data-type="pr">%</div>
                    <div class="it" data-type="num">шт</div>
                  </div>
                </div>
                <div class="progress progress-lg" v-html="item.hstatus"></div>
              </div>

              <div class="b-btns">
                <div class="row">
                  <div class="col-sm-6">
                    <a
                      :href="$store.state.mainurl+'/api/chess/?cid='+item.cid"
                      target="_blank"
                      class="btn waves-effect"
                    >Открыть шахматку</a>
                  </div>
                  <div class="col-sm-6">
                    <a
                      href="#"
                      @click.prevent="openGtab(item)"
                      class="btn waves-effect"
                    >Открыть таблицу</a>
                  </div>
                  <div class="col-sm-6">
                    <router-link
                      :to="{ name: 'object', params: { id: 1, oid:item.id }}"
                      class="btn waves-effect"
                    >Редактировать объект</router-link>
                  </div>
                  <div class="col-sm-6">
                    <button @click="deleteObject(item.id)" class="btn waves-effect">Удалить объект</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showGtable">
      <google-table
        @closeTable="showGtable = false"
        :object_id="gtab.object_id"
        :spreadsheet_id="gtab.spreadsheet_id"
      ></google-table>
    </div>
  </div>
</template>

<script>
import GoogleTable from "@/master/blocks/GoogleTable";
export default {
  name: "myObjects",
  data() {
    return {
      //  list: []
      gtab: {
        spreadsheet_id: null,
        object_id: null
      },
      showGtable: false,
      search: null,
      stid: false
    };
  },

  components: {
    GoogleTable
  },

  created() {
    //if (!this.$store.state.myObjects) {
    this.$store.commit("loadMyObjects", "test");
    //}
    window.routeParam = { name: this.$route.name };
  },

  mounted() {
    $(document).on("click", ".st-btns .it", function() {
      let par = $(this).closest(".w-status");
      let tp = $(this).data("type");
      par.find(".st-btns .it").removeClass("active");
      $(this).addClass("active");
      par.find(".progress-bar").each(function() {
        $(this).text($(this).data(tp));
      });
    });
  },
  computed: {
    objects() {
      let data = {};
      for (let item in this.$store.state.myObjects) {
        this.$store.state.myObjects[item]["hstatus"] = this.status(
          this.$store.state.myObjects[item],
          false
        );
        data[item] = this.$store.state.myObjects[item];
      }
      if (this.search) {
        //   this.search = this.search.toLowerCase().trim();
        data = this.lodash.filter(data, o => {
          return (
            this.lodash.includes(
              o.name.toLowerCase(),
              this.search.toLowerCase()
            ) ||
            this.lodash.includes(
              o.address.toLowerCase(),
              this.search.toLowerCase()
            )
          );
        });

        //  console.log(data, this.search.toLowerCase());
      }

      return data;
    }
  },
  methods: {
    openGtab(item) {
      this.gtab.spreadsheet_id = item.spreadsheet_id;
      this.gtab.object_id = item.id;
      this.showGtable = true;
    },
    st(item, st) {
      console.log(st);
      item.st = st;
      this.objects = " ";
    },
    status(item) {
      // item.st = st;
      let free = Math.ceil((item.free / item.total) * 100);
      let reserved = Math.ceil((item.reserved / item.total) * 100);
      let sold = Math.ceil((item.sold / item.total) * 100);
      let interest = Math.ceil((item.interest / item.total) * 100);
      let notforsale = Math.ceil((item.notforsale / item.total) * 100);
      return `
      <div class="progress-bar chess-status-free" data-num="${
        item.free
      }" data-pr="${free}%" style="width: ${free}%">${free}%</div>
      <div class="progress-bar chess-status-interest" data-num="${
        item.interest
      }" data-pr="${interest}%"  style="width: ${interest}%">${interest}%</div>
      <div class="progress-bar chess-status-reserved" data-num="${
        item.reserved
      }" data-pr="${reserved}%"  style="width: ${reserved}%">${reserved}%</div>
      <div class="progress-bar chess-status-sold" data-num="${
        item.sold
      }" data-pr="${sold}%"  style="width: ${sold}%">${sold}%</div>
      <div class="progress-bar chess-status-notforsale" data-num="${
        item.notforsale
      }" data-pr="${notforsale}%"  style="width: ${notforsale}%">${notforsale}%</div>
      `;
    }
  }
};
</script>

<style lang="scss">
.objects-list {
  .item {
    padding: 20px;
  }
  .item-h {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
    text-align: left;
    .title-o {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }

  .loc {
    margin-right: 20px;
    position: relative;
    padding-left: 26px;
    line-height: 1.4;
    min-height: 42px;
    .fa {
      font-size: 21px;
      margin-right: 5px;
      position: absolute;
      left: 0;
      top: 0;
      color: #1abc9c;
    }
  }

  .img-m {
    height: 140px;
    img {
      max-height: 140px;
    }
  }

  .count {
    width: 62px;
    height: 62px;
    margin-top: -8px;
    margin-right: -8px;
    border-radius: 50%;
    text-align: center;
    border: 2px solid #38c0ac;
    font-size: 12px;
    line-height: 1;
    span {
      display: block;
      margin-top: 10px;
      font-size: 20px;
    }
  }

  .w-status {
    .sh {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .t {
      color: #a5b6c9;
    }
  }
  .st-btns {
    display: flex;
    .it {
      border: 1px solid #e6e6e6;
      padding: 4px 7px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:first-child {
        border-right: none;
        border-radius: 5px 0 0 5px;
      }
      &:last-child {
        border-left: none;
        border-radius: 0 5px 5px 0;
      }
      &.active {
        background: #5d9cec;
        color: #fff;
        border-color: #5d9cec;
      }
    }
  }
  .progress {
    margin-bottom: 8px;
  }
  .b-btns {
    .row {
      > div {
        margin-top: 10px;
      }
    }
    .btn {
      border: 2px solid #e6e6e6;
      border-radius: 5px;
      width: 100%;
      color: #33475b;
      font-size: 12px;
      background: #fff;
    }
  }
}
</style>
