<template>
	<GlobalWrapper :header="false" :rightPane="true">
		<template #WrapperTitle>Complete Your Order </template>

		<template #WrapperBody>
			<!-- <div class="flex wrap j-c-center"> -->
			<!-- Order Details -->
			<Section class="mb-10">
				<template #SectHead>
					<span>Billing Details</span>
					<span class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<UserInfoInput
						target="BillingInfo"
						:exclude="['about', 'url']"
					/>
				</template>
			</Section>

			<!-- Select payment method -->
			<Section class="mb-5">
				<template v-if="step === 2" #SectHead>
					<span>Payment Methods</span>
				</template>
				<template v-if="step === 2" #SectBody>
					<div class="PyMethods">
						<section class="flex a-i-center j-c-center br3">
							<!-- Tabs Head -->
							<div
								@click="method = 'paystack'"
								class="Head xs6"
								:class="method === 'paystack' ? 'active' : ''"
							>
								<div class="mb-1">Paystack</div>
								<div class="Image flex a-i-center j-c-center">
									<img
										width="50"
										height="30"
										src="/defaults/pgs/mastercard.svg"
										alt="pay with paystack"
										class="mr-1"
									/>
									<img
										width="50"
										height="30"
										src="/defaults/pgs/visa.svg"
										alt="pay with paystack"
										class="mr-1"
									/>
									<img
										width="50"
										height="30"
										src="/defaults/pgs/amex.svg"
										alt="pay with paystack"
										class="mr-1"
									/>
								</div>
							</div>
							<div
								@click="method = 'paypal'"
								class="Head xs6"
								:class="method === 'paypal' ? 'active' : ''"
							>
								<div>PayPal</div>
								<div>
									<img
										width="100"
										height="50"
										src="/defaults/pgs/paypal-logo.svg"
										alt="pay with paypal"
									/>
								</div>
							</div>
						</section>
						<!-- Tabs body -->
						<section
							v-if="method === 'paystack'"
							class="text-center px-2"
						>
							<h3>
								Checkout directly with your cards using
								paystack. Fast and Easy
							</h3>
							<div class="flex j-c-center">
								<img
									src="/defaults/pgs/pstck-secure.jfif"
									height="100"
									alt="paystack checkout"
								/>
							</div>
							<small
								>After payment via Paystack's secure checkout,
								you will receive a link to download your
								files.</small
							>

							<!-- Checkout Button -->
							<section class="flex j-c-center my-4">
								<button class="btn bg-light-blue--1 shadow-0">
									<paystack
										:amount="cart_total * 100"
										:email="account.email"
										:paystackkey="paystack_pk"
										:reference="reference"
										:callback="callback"
										:close="close"
										:embed="false"
									>
										<i class="icon-check mr-1"></i>
										Checkout with Paystack
									</paystack>
								</button>
							</section>
							<!-- <section class="flex j-c-center my-4">
			<button @click="paystack" class="btn bg-green-1 shadow-0">
				<i class="icon-check mr-1"></i>Checkout with Paystack
			</button>
		</section> -->
						</section>
						<section
							v-if="method === 'paypal'"
							class="text-center px-2"
						>
							<h3>
								Checkout using you paypal account. Fast and Easy
							</h3>
							<div class="flex j-c-center">
								<img
									src="/defaults/pgs/paypal.jpg"
									height="100"
									alt="paypal checkout"
								/>
							</div>
							<small
								>After payment via PayPal's secure checkout, you
								will receive a link to download your
								files.</small
							>

							<!-- Checkout Button -->
							<section class="flex j-c-center my-4">
								<button class="btn bg-light-blue--1 shadow-0">
									<i class="icon-check mr-1"></i>Checkout with
									PayPal
								</button>
							</section>
						</section>
					</div>
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
import paystack from "vue-paystack"

import { $Shopping, $Account, $Auth } from "@/store"
// import { $Notify, $Obstacl } from "@/plugins"

export default Vue.extend({
	components: {
		paystack
	},
	computed: {
		user: () => $Auth.user,
		cart: () => $Shopping.$cart.list,
		cart_total: () => $Shopping.$cart.cart_total,
		account: () => $Account.data,
		// paystack_pk: () => $Shopping.$order.paystack_pk,
		reference () {
			let text = ""
			let possible =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

			for (let i = 0; i < 10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length))

			return text
		}
	},

	data () {
		return {
			step: 1,
			method: 'paystack',
			paystack_pk: 'pk_test_a79b64a5f745001282a8222de4129041d74e8b70'
		}
	},
	methods: {
		callback: function (response) {
			console.log(response)
		},
		close: function () {
			console.log("Payment closed")
		}
	},
	mounted () {
		if (this.user) {
			$Account
				.fetch()
				.then(loaded => {
					// if (!loaded)
					this.step = 2
					console.log(loaded)
				})
		}
	}
});
</script>
<style lang="scss" scoped>
.PyMethods {
	& .Head {
		cursor: pointer;
		// border-right: grey solid 1px;
		// border-left: grey solid 1px;
		height: 80px;
		font-weight: bold;
		background-color: rgb(100, 100, 100);
		color: white;
		text-align: center;
		padding: 4px;
		border-radius: 4px;
	}
	& .Head.active {
		background-color: white;
		color: rgb(100, 100, 100);
		border-top: rgb(59, 164, 199) solid 4px;
	}
}
</style>
