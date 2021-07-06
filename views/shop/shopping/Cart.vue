<template>
	<GlobalWrapper :header="false" :rightPane="true">
		<template #WrapperTitle>YOUR CART</template>

		<!-- SHOPPING CART DETAILS -->
		<!-- Items Details -->
		<template #WrapperBody>
			<!-- HEAD -->
			<Section>
				<template #SectHead>
					<button
						@click="$router.push({ path: '/gallery' })"
						class="btn bg-cyan mr-1"
					>
						<i class="icon-search-2 mr-2"></i>Browse
					</button>
					<button
						v-if="cart.length > 0"
						@click="clearCart()"
						class="btn bg-trans-3 br4"
					>
						Empty Cart
					</button>
				</template>
				<template #SectBody>
					<!-- BODY (items list) -->
					<section
						class="ItemDetail flex mb-2"
						v-for="(item, i) in cart"
						:key="i"
					>
						<div class="Img noselect">
							<img :src="item.featured_image" draggable="false" />
						</div>
						<div
							@click="viewProduct(item.slug)"
							class="Name t-light-blue--2 bold-3 font-3 m-2"
						>
							{{ item.name }}
						</div>
						<div
							class="Price flex wrap j-c-center a-i-center t-blue-grey--1 bold-3"
						>
							<p>
								{{
									item.price > item.sale_price
										? "$" + item.price + "  "
										: ""
								}}
							</p>
							<p>${{ item.sale_price }}</p>
						</div>
						<span
							@click="removeFromCart(item.id)"
							class="Delete icon-trash-empty"
						></span>
					</section>

					<!-- Empty Cart Notif -->
					<section
						v-if="cart.length === 0"
						class="text-center t-blue-grey mt-3"
					>
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
				</template>
			</Section>
		</template>

		<!-- SIDE PANE -->
		<template #RightPane>
			<!-- Checkout Details -->
			<div class="text-center">
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
		</template>
	</GlobalWrapper>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Notify, $Obstacl } from "@/plugins"

import { $Confirm } from "@/plugins"
import { $Shopping } from "@/store"

export default Vue.extend({
	computed: {
		cart: () => $Shopping.$cart.list,
		cart_total: () => $Shopping.$cart.cart_total
	},
	methods: {
		viewProduct (slug: string) {
			this.$router.push({ path: "/gallery/" + slug })
		},
		clearCart () {
			$Confirm({
				header: "DELETE YOUR CART",
				message: `<b class="t-grey--2">Are you sure you want to delete all items currently in your cart?</b>`,
				type: "danger",
				onConfirm: function () {
					$Shopping.$cart.clear()
				}
			})
		},
		removeFromCart (product_id: number) {
			$Shopping.$cart.remove(product_id)
		}
	}
});
</script>
<style lang="scss" scoped>
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
		background-color: rgb(47, 47, 47);
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
		padding: 30px 0;
		& p {
			margin: 4px 4px 0 4px;
		}
		& p:first-child {
			position: relative;
			font-weight: 100;
			// font-size: 16px;
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
