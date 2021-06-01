<template>
    <Container ownID="MC-Gall">
        <div
            v-html="$appLogo('logo-static')"
            class="flex j-c-center pt-3"
        ></div>

        <div class="Title text-center t-blue-grey">SCAVORB</div>

        <h1 class="Head text-center page-head-bg-grad t-white font-9 px-3 py-4">
            GALLERY
        </h1>

        <!-- Filter -->
        <div class="Filter flex a-i-center noselect">
            <span class="bold-4 mr-3">Filter:</span>
            <select class="btn" @change="filter">
                <option value>All</option>
                <option value>Navigation Bars</option>
                <option value>Side Drawers</option>
                <option value>Sets</option>
            </select>
            <i></i>
        </div>

        <!-- TILES -->
        <section class="TilesContainer flex wrap j-c-center md-j-c-start px-3">
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
                            :src="item.images[0].src"
                            draggable="false"
                        />
                    </section>
                    <section class="Details">
                        <div class="Heading">
                            <h3>{{ item.name }}</h3>
                        </div>

                        <div class="Body t-blue-grey--1">
                            <section>
                                <h2>
                                    <span class="bold-0">{{
                                        item.regular_price
                                            ? "$" + item.regular_price + "  "
                                            : ""
                                    }}</span>
                                    <span class="font-6">{{
                                        "$" + item.sale_price
                                    }}</span>
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
    </Container>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Notify, $Obstacl } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $General, $Obstacl } from '@/plugins'
import { $Products, $Shopping } from "@/myStore"

export default Vue.extend({
    components: {
        Container,
    },
    head () {
        return $General.metaInfo({ title: 'Web Components $ Templates gallery' })
    },
    computed: {
        products: () => $Products.products,
        // count: () => $Posts.postsCount,
    },
    methods: {
        filter () { },

        viewProduct (slug: string) {
            this.$router.push({ path: '/gallery/' + slug })
        },

        addToCart (product) {
            const {
                id,
                name,
                on_sale,
                regular_price,
                sale_price,
                slug,
                short_description,
                images
                /* custom */
            } = product
            // final_price?: number
            $Shopping.$cart.add({
                id,
                name,
                on_sale,
                regular_price,
                sale_price,
                slug,
                short_description,
                images
                /* custom */
            })
        }
    },
    // mounted () {
    //     if($Products.products.length === 0){
    //         $Obstacl.create('#ProductsContainer', {
    //             injectHTML: $General.$appLogo('logo-trans-2 logo-large logo-fast')
    //         })
    //     }
    // }
})

</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}
.Head {
    font-family: "Itim", "Roboto", sans-serif;
    letter-spacing: 1px;
    margin-bottom: 30px;
}
.Filter {
    position: relative;
    margin: 30px 40px;
    // border: solid 3px;
    & select {
        padding-right: 26px;
    }
    & i {
        position: relative;
    }
    & i::after {
        content: "";
        position: absolute;
        top: 45%;
        left: -20px;
        border-top: 7px solid white;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
    }
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
        background-color: $cyan-4;
        width: 100%;
        // padding-top: 75%;
        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
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
            font-size: 13px;
            margin-bottom: 6px;
        }
        & .Body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            & h2 > span:first-child {
                font-weight: 100;
                font-size: 16px;
                color: $red-2;
                text-decoration: line-through;
            }
            & .Action {
                display: flex;

                & button {
                    letter-spacing: 1.5px;
                    &:first-child {
                        border-radius: 88% 4px 4px 88%;
                    }
                    &:last-child {
                        border-radius: 4px 88% 88% 4px;
                    }
                }
            }
        }
        // height: ;
    }
}
// @include xs-only {
//     .Tiles {
//         width: 100%;
//         // margin: 0px 30px 30px 0;
//     }
// }
</style>