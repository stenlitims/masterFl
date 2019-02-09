<template>
  <div>
    <div class="heading">
      <div class="main-container container">
        <div class="l">Объекты</div>

        <div class="r">
          <div class="search" v-if="countObjects">
            <input type="text" v-model="search" class="form-control" placeholder="Поиск...">
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>

          <div class="btn-group btn-group-toggle">
            <button
              @click="chObj('my')"
              :class="{'btn-outline-success':objtype == 'other', 'btn-success':objtype != 'other'}"
              class="btn btn-lg waves-effect"
            >Мои объекты</button>
            <button
              @click="chObj('other')"
              :class="{'btn-outline-success':objtype == 'my', 'btn-success':objtype != 'my'}"
              class="btn btn-lg waves-effect"
            >Доступные мне</button>
          </div>

          <router-link
            :to="{ name: 'new_object', params: { id: 1 }}"
            class="btn btn-lg btn-or waves-effect"
          >Создать новый объект</router-link>
        </div>
      </div>
    </div>
    <div class="main-container container">
      <div class="objects-list main-list">
        <div class="row">
          <div class="col-md-6 col-lg-4" v-if="objtype == 'my'">
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
                  <a
                    :href="$store.state.mainurl+'/api/chess/?cid='+item.cid"
                    target="_blank"
                    class="col"
                  >
                    <svg>
                      <use xlink:href="#looking-apartment"></use>
                    </svg>
                    
                    <span>Открыть шахматку</span>
                  </a>
                  <a href="#" @click.prevent="openGtab(item)" class="col">
                    <svg>
                      <use xlink:href="#ico-sheets"></use>
                    </svg>
                    <span>Открыть таблицу</span>
                  </a>
                  <router-link :to="{ name: 'object', params: { id: 1, oid:item.id }}" class="col">
                    <svg>
                      <use xlink:href="#build"></use>
                    </svg>
                    <span>Редактировать объект</span>
                  </router-link>
                  <a
                    href="#"
                    v-if="objtype == 'my'"
                    @click.prevent="deleteObject(item.id)"
                    class="col"
                  >
                    <svg>
                      <use xlink:href="#recycle-bin"></use>
                    </svg>
                    <span>Удалить объект</span>
                  </a>
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
      stid: false,
      objtype: "my"
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
    if (this.$route.params.id == "other") {
      this.chObj("other");
    }
  },

  watch: {
    $route(to, from) {
      this.chObj(this.$route.params.id);
    }
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
      let objects = null;
      //  console.log(this.$store.state.myObjectsCMS);
      if (this.objtype != "my") {
        objects = this.$store.state.myObjectsCMS;
      } else {
        objects = this.$store.state.myObjects;
      }

      if (!objects) {
        return null;
      }

      for (let item in objects) {
        objects[item]["hstatus"] = this.status(objects[item]);
        data[item] = objects[item];
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
    chObj(type) {
      if (!this.$store.state.myObjectsCMS) {
        this.$store.commit("loadMyObjects", "cms");
      }
      this.objtype = type;
    },
    openGtab(item) {
      this.gtab.spreadsheet_id = item.spreadsheet_id;
      this.gtab.object_id = item.id;
      this.showGtable = true;
    },
    st(item, st) {
      //  console.log(st);
      item.st = st;
      this.objects = " ";
    },
    status(item) {
      // item.st = st;
      //   console.log(item);
      if (!item) {
        return "";
      }
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

.heading{
  .r{
    display: flex;
  }
  .search{
    margin-right: 30px;
    input{
      height: 100%;
    }
  }
}
.objects-list {
  .item {
    padding: 20px;
    display: flex;
    flex-direction: column;
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
    margin-top: 20px;
    margin-top: auto;
    .row {
      margin-left: -20px;
      margin-right: -20px;
      margin-bottom: -20px;

      flex-wrap: nowrap;
      .col {
        border: none;
        border-top: 1px solid #e5e5e5;
        background: none;
        border-right: 1px solid #e5e5e5;
        padding: 10px 5px;
        color: #36485a;
        font-size: 12px;
        transition: all 0.3s ease;
        &:last-child {
          border-right: none;
        }
        svg {
          width: 36px;
          height: 36px;
          fill: #36485a;
          margin-bottom: 7px;
          transition: all 0.3s ease;
        }
        span {
          display: block;
        }
        &:hover {
          color: #fff;
          background: #38c0ac;
          svg {
            fill: #fff;
          }
        }
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
