<template>
    <Container ownID="MC-Gall">
        <div
            v-html="$appLogo('logo-static')"
            class="flex j-c-center pt-3"
        ></div>

        <h1 class="Head text-center page-head-bg-grad t-white font-9 px-5 py-4">
            YOUR CART
        </h1>

        <!-- SHOPPING CART DETAILS -->
        <section class="flex j-c-center wrap md-nowrap mt-9">
            <!-- Items Details -->
            <div class="xs11 md8 mb-5">
                <!-- HEAD -->
                <section class="flex j-c-around mb-4 p-2 bg-blue-grey--2 br1">
                    <button
                        @click="$router.push({ path: '/gallery' })"
                        class="btn bg-cyan mr-2"
                    >
                        <i class="icon-search-2 mr-2"></i>Continue Shopping
                    </button>
                    <button @click="clearCart()" class="btn bg-red-1">
                        Empty Cart
                    </button>
                </section>

                <!-- BODY (items list) -->
                <section
                    class="ItemDetail flex mb-2"
                    v-for="(item, i) in cart"
                    :key="i"
                >
                    <div class="Img noselect">
                        <img :src="item.images[0].src" draggable="false" />
                    </div>
                    <div
                        @click="viewProduct(item.slug)"
                        class="Name t-light-blue--2 bold-3 font-3 m-2"
                    >
                        {{ item.name }}
                    </div>
                    <div
                        class="Price flex j-c-center a-i-center t-blue-grey--1 bold-3"
                    >
                        <p>${{ item.sale_price }}</p>
                    </div>
                    <span
                        @click="removeFromCart(item.id)"
                        class="Delete icon-trash-empty"
                    ></span>
                </section>

                <!-- Empty Cart Notif -->
                <section class="text-center t-blue-grey mt-3">
                    <h2>Your Cart Is Empty</h2>
                    <h4>
                        There are some new amazing designs available now to
                        spice up your websites.
                    </h4>
                    <div class="flex j-c-center">
                        <button
                            @click="$router.push({ path: '/gallery' })"
                            class="btn bg-cyan p-4 mr-2"
                        >
                            <i class="icon-search-2 mr-2"></i>Check Popular
                            Items
                        </button>
                    </div>
                </section>
            </div>

            <!-- Checkout Details -->
            <div class="xs11 md3 ml-3 text-center">
                <div class="p-2 mb-3 br2 bg-grey-4">
                    <p class="t-blue-grey-2 font-5">
                        Your Cart Total ({{ cart.length }})
                    </p>
                    <p class="t-blue-grey--1 font-6 bold-3">
                        USD - ${{ cart_total }}
                    </p>

                    <span class="flex j-c-center a-i-center mb-2">
                        <button
                            @click="$router.push({ path: '/checkout' })"
                            class="btn bg-green-1 p-4"
                        >
                            <i class="icon-check-1 mr-2"></i>Secure Checkout
                        </button>
                    </span>
                    <i class="t-grey--1 font-2"
                        >Price displayed excludes sales tax</i
                    >
                </div>
                <span class="t-grey bold-1">
                    <i class="icon-lock mr-2"></i>Secure Checkout
                </span>
            </div>
        </section>
    </Container>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Notify, $Obstacl } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $Confirm } from '@/plugins'
import { $Shopping } from "@/myStore"

export default Vue.extend({
    components: {
        Container,
    },
    computed: {
        cart: () => $Shopping.$cart.list,
        cart_total: () => $Shopping.$cart.cart_total
    },
    methods: {
        filter () { },

        viewProduct (slug: string) {
            this.$router.push({ path: '/gallery/' + slug })
        },
        clearCart () {
            $Confirm({
                header: 'DELETE YOUR CART',
                message: `<b class="t-grey--2">Are you sure you want to delete all items currently in your cart?</b>`,
                type: 'danger',
                onConfirm: function () {
                    $Shopping.$cart.clear()
                }
            })
        },
        removeFromCart (product_id: number) {
            $Shopping.$cart.remove(product_id)
        }
    },
})

</script>
<style lang="scss" scoped>
.Head {
    font-family: "Itim", "Roboto", sans-serif;
    letter-spacing: 1px;
    margin-bottom: 30px;
}

.ItemDetail {
    position: relative;
    border-bottom: $grey-3 solid 2px;
    & .Img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        margin: 5px;
        background-color: $cyan-3;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    & .Name {
        width: 100%;
        cursor: pointer;
    }
    & .Price {
        width: 80px;
    }
    & .Delete {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 14px;
        color: #f16b6b;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            background-color: $grey-2;
        }
    }
}

// @include xs-only {

// }
</style>