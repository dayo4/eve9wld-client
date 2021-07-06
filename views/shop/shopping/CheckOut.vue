<template>
	<GlobalWrapper :header="false" :rightPane="true">
		<template #WrapperTitle>Complete Your Order </template>

		<template #WrapperBody>
			<!-- <div class="flex wrap j-c-center"> -->
			<!-- Order Details -->
			<Section>
				<template #SectHead>
					<span>Billing Details</span>
					<span class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<UserInfoInput target="BillingInfo" :exclude="[]" />
				</template>
			</Section>
		</template>

		<!-- Order Summary -->
		<template #RightPane>
			<article class="ml-3 text-center">
				<div class="p-2 mb-3 br2 bg-grey-4">
					<h3 class="t-blue-grey--1">Order Summary</h3>
					<hr />
					<p
						v-for="(item, i) in cart"
						:key="i"
						class="flex t-blue-grey font-2"
					>
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
			<!-- </div> -->
		</template>
	</GlobalWrapper>
</template>
<script lang="ts">
import Vue from "vue"

import { $Shopping, $Account, $Auth } from "@/store"
// import { $Notify, $Obstacl } from "@/plugins"

export default Vue.extend({
	computed: {
		user: () => $Auth.user,
		cart: () => $Shopping.$cart.list,
		cart_total: () => $Shopping.$cart.cart_total,
		account: () => $Account.data
	}
});
</script>
<style lang="scss" scoped>
@include xs-only {
	.Tiles {
		width: 100%;
		// margin: 0px 30px 30px 0;
	}
}
</style>
