<template>
  <div class="mt-10">
    <h1 class="Head text-center t-blue-grey font-7 px-5">
      Complete Your Order
    </h1>
    <div class="flex wrap j-c-center">
      <!-- Order Details -->
      <article class="xs11 md8 mb-5">
        <section>
          <div
            class="Header flex wrap j-c-between a-i-center bg-white br2 mb-2 px-3 pt-2 pb-1"
          >
            <span>Billing Details</span>
            <span class="btn bg-trans-3"
              ><i class="icon-edit mr-1"></i>Edit</span
            >
          </div>
          <div class="Details"></div>
        </section>
      </article>

      <!-- Order Summary -->
      <article class="xs11 md3 ml-3 text-center">
        <div class="p-2 mb-3 br2 bg-grey-4">
          <h3 class="t-blue-grey--1">
            Order Summary
          </h3>
          <hr />
          <p v-for="(item, i) in cart" :key="i" class="flex t-blue-grey font-2">
            <span class="xs10 text-truncate">{{ item.name }}</span>
            <span class="xs2">${{ item.sale_price }}</span>
          </p>
          <hr />
          <h3 class="t-blue-grey--1">
            <span>Total: </span>
            <span>USD - ${{ parseFloat(cart_total) }} </span>
          </h3>
        </div>
        <span class="t-grey bold-1">
          <i class="icon-lock mr-2"></i>Secure Checkout
        </span>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { $Shopping } from "@/store";
// import { $Notify, $Obstacl } from "@/plugins"

export default Vue.extend({
  computed: {
    cart: () => $Shopping.$cart.list,
    cart_total: () => $Shopping.$cart.cart_total
  }
});
</script>
<style lang="scss" scoped>
.Header {
  background-color: rgb(45, 45, 45);
  color: white;
  border-radius: 20px 20px 4px 4px;
  font-size: 13px;
  font-weight: bold;
}

@include xs-only {
  .Tiles {
    width: 100%;
    // margin: 0px 30px 30px 0;
  }
}
</style>
