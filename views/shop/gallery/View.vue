<template>
	<GlobalWrapper :rightPane="true">
		<!-- <div class="xs11 md10"> -->
		<!-- <h1 class="Head text-center t-blue-grey font-8 px-2">
        {{ product.name }}
      </h1> -->
		<template #WrapperTitle>{{ product.name }}</template>
		<!-- Author Details -->
		<!-- <div class="flex a-i-center j-c-between"> -->
		<template #WrapperHead>
			<section class="AuthorDetail flex a-i-center bold-4 px-4">
				<span class="mr-3">By</span>
				<span
					@click="router.push({ path: '/profile/adedayo-adeniyi' })"
					class="Image mr-1"
				>
					<img
						src="/defaults/usr/me.jpg"
						alt="adedayo adeniyi"
						draggable="false"
					/>
				</span>
				<router-link
					:to="{ path: '/profile/dayo' }"
					class="t-light-blue--2 font-3"
					>Adedayo Adeniyi</router-link
				>
			</section>
			<section class="flex a-i-center">
				<button
					class="btn bg-white t-cyan--3 mr-1 p-0 b2"
					title="Add to favorite"
				>
					<i class="icon-heart font-6"></i>
				</button>
				<button
					@click="addToCart(product)"
					class="btn bg-white t-green--3 p-0 pr-1 b2"
				>
					<i class="icon-cart-plus mr-1 font-6"></i
					>{{ "$" + product.sale_price }}
				</button>
			</section>
		</template>
		<!-- </div> -->

		<!-- Product Details... -->
		<template #WrapperBody>
			<!-- <article class="flex j-c-center wrap md-nowrap mt-10"> -->
			<!-- <section class="xs12 md8 mb-5 px"> -->
			<section>
				<!-- Main Product Image -->
				<div class="MainImg px-2 mb-8">
					<img
						:title="product.name"
						:alt="product.name"
						:src="product.featured_image || product.images[0]"
						draggable="false"
					/>
				</div>
				<!-- FUll Description -->
				<div class="px-2" v-html="product.description"></div>
			</section>
		</template>

		<!-- Add To Cart & Price Details -->
		<template #RightPane>
			<section class="AddToCartDetails">
				<div class="p-2 mb-3 br2 bg-grey-4">
					<section>
						<div
							@click="showLicenseDropdown = !showLicenseDropdown"
							class="LicenseOptions"
						>
							<span class="bold-4 mr-3"
								>License:{{ " " + selectedLicense }}
							</span>
							<i></i>
							<transition name="slide-down-fade">
								<div
									v-if="showLicenseDropdown === true"
									class="LicenseDropdown bg-white shadow-3"
								>
									<ul @click="selectedLicense = 'Regular'">
										<h5>Regular Licence</h5>
										<li>
											For item to be used by you or one
											client in a single end product which
											end users
											<b>are not</b> charged for.
										</li>
									</ul>
									<ul @click="selectedLicense = 'Extended'">
										<h5>Extended Licence</h5>
										<li>
											For item to be used by you or one
											client in a single end product which
											end users
											<b>can be</b> charged for.
										</li>
									</ul>
									<ul class="t-light-blue">
										<h5>View Licence Details</h5>
									</ul>
								</div>
							</transition>
						</div>
						<p class="t-blue-grey--1 font-6 bold-3 text-center">
							USD - ${{ product.sale_price }}
						</p>
						<div>
							<ul class="t-grey-1 font-3">
								<li>
									<i class="icon-check-1 mr-2"></i>Quality
									Confirmed
								</li>
								<li>
									<i class="icon-check-1 mr-2"></i>6 months
									support
								</li>
								<li>
									<i class="icon-check-1 mr-2"></i>Access to
									future Updates
								</li>
							</ul>
						</div>
					</section>

					<div>
						<button
							@click="addToCart(product)"
							class="btn block bg-green-1 mb-2 p-3"
						>
							<i class="icon-cart-plus mr-2"></i>Add to Cart
						</button>
						<button
							@click="$router.push({ path: '/checkout' })"
							class="btn block bg-grey-1 mb-2 p-3"
						>
							<i class="icon-check-1 mr-2"></i>Checkout Now
						</button>
					</div>
					<i class="t-grey--1 font-2 text-center"
						>Price displayed excludes sales tax</i
					>
				</div>
				<div class="t-grey bold-1 text-center">
					<i class="icon-lock mr-2"></i>Secure Checkout
				</div>
			</section>
			<!-- </article> -->
		</template>
		<!-- </div> -->
	</GlobalWrapper>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Posts } from "@/store"
// import { $Notify, $Obstacl } from "@/plugins"

import { $General, $Axios, $Notify } from "@/plugins"
import { $Products, $Shopping } from "@/store"

export default Vue.extend({
	// components: {

	// },

	head () {
		return $General.metaInfo({
			title: this.product.name,
			image: this.product.featured_image || this.product.images[ 0 ],
			url: window.location.href,
			content: this.product.short_description,
			type: "article"
		})
	},
	data () {
		return {
			showLicenseDropdown: false,
			selectedLicense: "Regular"
		}
	},
	computed: {
		product: () => $Products.$single.data,
		cart_total: () => $Shopping.$cart.cart_total
	},
	methods: {
		licenseDropdownHandler () {
			// const _this = this
			const dropdown = e => {
				if (!e.target.closest(".LicenseOptions")) {
					this.showLicenseDropdown = false
				}
			}
			window.addEventListener("click", dropdown, false)
		},

		addToCart (product) {
			$Shopping.$cart.add(product)
		}
	},
	mounted () {
		this.licenseDropdownHandler()
		// ff()
		// async function ff () {
		//     const { data } = await $Axios.get('wp/v2/product')
		// }
	}
});
</script>
<style lang="scss" scoped>
.AuthorDetail {
	& .Image {
		position: relative;
		border: 2px solid $cyan--3;
		background-color: $cyan--3;
		border-radius: 100%;
		min-width: 50px;
		min-height: 50px;
		width: 50px;
		height: 50px;
		padding: 1px;
		cursor: pointer;
		& img {
			width: 100%;
			height: 100%;
			border-radius: 100%;
		}
	}
	& a {
		text-decoration: none;
	}
}
.MainImg {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
	// max-height: 350px;
	// margin: 20px 0;
	& img {
		position: absolute;
		top: 0;
		border-radius: 4px;
		max-width: 100%;
		max-height: 100%;
	}
}
.AddToCartDetails {
	& ul {
		padding: 0;
	}
	& li {
		list-style-type: none;
	}
	& button {
		width: 100%;
	}
}
.LicenseOptions {
	position: relative;
	margin: 6px;
	padding: 5px;
	color: $grey--1;
	border: solid currentColor 0.5px;
	border-radius: 4px;
	cursor: pointer;
	z-index: 1;

	& .LicenseDropdown {
		position: absolute;
		top: 30px;
		left: -10px;
		padding: 4px;
		border-radius: 4px;
		cursor: default;

		& ul {
			border-bottom: solid $grey-1 1px;
			padding: 4px;
			cursor: pointer;
			&:hover {
				background-color: $grey-4;
			}
			& h5 {
				margin: 5px 0;
			}
		}
		& ul:last-child {
			border: none;
			padding: 8px;
		}
	}

	& i::after {
		content: "";
		position: absolute;
		top: 45%;
		// left: -20px;
		border-top: 7px solid $grey--1;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
	}
}
// @include xs-only {
//     .AuthorDetail {
//         & .Image {
//             min-width: 50px;
//             min-height: 50px;
//             width: 50px;
//             height: 50px;
//         }
//     }
// }
</style>
