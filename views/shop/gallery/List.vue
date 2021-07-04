<style lang="scss" scoped>
.Title {
  margin: 6px 0 40px 0;
  font-size: 16px;
  font-weight: bold;
}

// @include xs-only {
//   .Header {
//     font-size: 10px;
//   }
// }
.Head {
  font-family: "Itim", "Roboto", sans-serif;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.Header {
  background-color: rgb(45, 45, 45);
  border-radius: 20px 20px 4px 4px;
  font-size: 13px;
}
// .TilesContainer {
// margin-left: -15px;
// margin-right: -15px;
// padding: 15px;
// }
.Tiles {
  overflow: hidden;
  background-color: white;
  border-radius: 15px;
  // margin: 0px 15px 30px 15px;
  border-bottom: solid 3px $cyan;
  & > .Img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 45, 45);
    // background-color: $cyan-4;
    width: 100%;
    // padding-top: 75%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    & img {
      position: absolute;
      top: 0;
      max-width: 100%;
      max-height: 100%;
    }
  }
  & > .Details {
    margin: 5px 10px;
    color: $blue-grey--1;
    & .Heading {
      // font-size: 13px;
      // margin-bottom: 6px;
    }
    & .Body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & h2 > span:first-child {
        position: relative;
        font-weight: 100;
        font-size: 16px;
        color: $red-2;
        &::after {
          content: "";
          position: absolute;
          left: 5px;
          right: 5px;
          top: calc(50% - 1px);
          border-bottom: solid 1.5px currentColor;
          transform: rotate(-12deg);
        }
      }
      & .Action {
        display: flex;
        & button {
          min-width: 60px;
          letter-spacing: 1.5px;
          &:first-child {
            border-radius: 28px 4px 4px 28px;
          }
          &:last-child {
            border-radius: 4px 28px 28px 4px;
          }
        }
      }
    }
  }
}

.Pagins {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 5px;
  // height: 40px;
  width: 100%;
  border-bottom: rgb(45, 45, 45) solid 2px;
  border-top: rgb(45, 45, 45) solid 2px;
  border-radius: 10px;
  & button {
    box-shadow: none;
  }
  & .Nums {
    padding: 0;
    box-shadow: none;
    text-align: center;
    // justify-content: center !important;
    & span {
      border-radius: 4px;
      border-top: $grey solid 1px;
      border-bottom: $grey solid 1px;
      color: $blue-grey--2;
      padding: 5px 8px;
      margin: 0 5px;
      &:hover {
        background-color: $grey-3;
      }
      &.active {
        background-color: $grey-2;
      }
    }
  }
}
</style>

<template>
  <div class="flex j-c-center">
    <article class="xs12 md10">
      <div v-html="$appLogo('logo-static')" class="flex j-c-center pt-3"></div>

      <div class="Title text-center t-blue-grey">SCAVORB</div>

      <h1 class="Head text-center page-head-bg-grad t-white font-9 px-3 py-4">
        GALLERY
      </h1>

      <!-- Filter -->
      <section
        class="Header flex wrap j-c-around sm-j-c-between a-i-center bg-white br2 mb-2 mx-4 px-2 pt-2 pb-1"
      >
        <Dropdown ownID="PrdCat" class="mr-1 mb-1 btnl bg-trans-3 br3">
          <!-- slots -->
          <template v-slot:labels>
            <span class="mr-1">Categories</span>
            <span class="icon-down-open"></span>
          </template>
          <template v-slot:default>
            <a>
              <!-- <span class="icon-down-open"></span> -->
              <span>Profile</span>
            </a>
            <a>
              <!-- <span class="icon-up-open"></span> -->
              <span>Navigation</span>
            </a>
          </template>
        </Dropdown>
        <Dropdown ownID="Prdsort" class="btn bg-trans-3 br3">
          <!-- slots -->
          <template v-slot:labels>
            <span class="icon-sort-alt-down mr-1"></span>
            <span class="mr-2">{{ sort }}</span>
          </template>
          <template v-slot:default>
            <a @click="sortBy('Newest', ['created_at', 'desc'])">
              <span class="icon-down-open"></span>
              <span>Newest</span>
            </a>
            <a @click="sortBy('Oldest', ['created_at', 'asc'])">
              <span class="icon-up-open"></span>
              <span>Oldest</span>
            </a>
          </template>
        </Dropdown>
      </section>

      <!-- TILES -->
      <section class="TilesContainer flex wrap j-c-center md-j-c-start px-1">
        <div
          class="px-3 mb-6 xs12 sm8 md4 noselect"
          v-for="(item, i) in products"
          :key="i"
        >
          <article class="Tiles">
            <section class="Img">
              <img
                :title="item.name"
                :alt="item.name"
                :src="item.featured_image || item.images[0].url"
                draggable="false"
              />
            </section>
            <section class="Details">
              <div class="Heading">
                <h3 class="my-2 font-3">{{ item.name }}</h3>
              </div>

              <div class="Body t-blue-grey--1">
                <section>
                  <h2 class="my-3">
                    <span>{{
                      item.price > item.sale_price
                        ? "$" + item.price + "  "
                        : ""
                    }}</span>
                    <span class="font-6">{{ "$" + item.sale_price }}</span>
                  </h2>
                </section>
                <section class="Action">
                  <button
                    @click="viewProduct(item.slug)"
                    class="btn bg-white t-cyan--3 mr-2 px-2 py-0 b2"
                  >
                    View
                  </button>
                  <button
                    @click="addToCart(item)"
                    class="btn bg-white t-green--3 font-8 px-2 py-0 b2"
                  >
                    <i class="icon-cart-plus"></i>
                  </button>
                </section>
              </div>
            </section>
          </article>
        </div>
      </section>

      <!-- Pagination -->
      <section class="flex j-c-center">
        <div class="Pagins xs12 sm11 md8">
          <button @click="switchPage(pagin.current - 1)" class="btn bg-trans-4">
            <span class="icon-angle-double-left font-6"></span>
            <span class="font-1 mt-1">PREV</span>
          </button>
          <button class="Nums btn bg-white" v-for="i in pagin.pages" :key="i">
            <span
              @click="switchPage(i)"
              :class="pagin.current === i ? 'active' : ''"
              >{{ i }}</span
            >
          </button>
          <button @click="switchPage(pagin.current + 1)" class="btn bg-trans-4">
            <span class="font-1 mt-1">NEXT</span>
            <span class="Icon icon-angle-double-right font-6"></span>
          </button>
        </div>
      </section>
    </article>
    <!-- Pagination -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// import { $Notify, $Obstacl } from "@/plugins"

import { $General, $Notify, $Obstacl } from "@/plugins";
import { $Products, $Shopping } from "@/store";

export default Vue.extend({
  components: {
    Dropdown: () => import("@/components/GlobalComponents/utils/Dropdown.vue")
  },

  head() {
    return $General.metaInfo({
      title: "Web Components $ Templates gallery"
    });
  },
  data() {
    return {
      pagin: {
        pages: 1,
        current: 1
      },
      sort: "Newest",
      query: {
        limit: 10,
        offset: 0,
        sort: ["created_at", "desc"]
      }
    };
  },
  computed: {
    products: () => $Products.data,
    count: () => $Products.count
  },
  methods: {
    filter() {},

    sortBy(txt, v: string[]) {
      this.query.sort = v;
      this.sort = txt;
      $Products.fetchAll(this.query);
    },

    switchPage(v: number) {
      if (this.pagin.pages > 1 && v > 0 && v <= this.pagin.pages) {
        this.query.offset = (v - 1) * this.query.limit;
        $Products.fetchAll(this.query).then(loaded => {
          if (loaded) {
            this.pagin.current = v;
          }
        });
      }
    },

    viewProduct(slug: string) {
      this.$router.push({
        path: "/gallery/" + slug
      });
    },

    addToCart(product) {
      const {
        id,
        name,
        on_sale,
        price,
        sale_price,
        slug,
        short_description,
        featured_image,
        images
        /* custom */
      } = product;
      // final_price?: number
      $Shopping.$cart.add({
        id,
        name,
        on_sale,
        price,
        sale_price,
        slug,
        short_description,
        featured_image,
        images
        /* custom */
      });
    }
  },
  mounted() {
    // $Obstacl.create('#ProductsContainer', {
    //     injectHTML: this.$appLogo('logo-trans-2 logo-large logo-fast')
    // })
    $Products.fetchAll(this.query).then(ok => {
      this.pagin.pages = Math.ceil(this.count / this.query.limit);
      // $Obstacl.destroy("#ProductsContainer");
    });
  }
});
</script>
