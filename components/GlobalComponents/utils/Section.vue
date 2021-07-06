<template>
	<div>
		<section class="SectHead">
			<slot name="SectHead"></slot>
		</section>
		<section class="SectBody">
			<slot name="SectBody"></slot>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
// import { $Auth, $Navs } from "@/store";

export default Vue.extend({
	// props: {
	// 	rightPane: { required: false, type: Boolean, default: false },
	// 	header: { required: false, type: Boolean, default: true }
	// }
});
</script>

<style lang="scss" scoped>
.SectHead {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	background-color: rgb(45, 45, 45);
	border-radius: 4px 20px 4px 4px;
	color: white;
	font-size: 13px;
	font-weight: bold;
	padding: 8px 12px 8px 12px;
	margin-bottom: 8px;
}
.SectBody {
	// background-color: rgb(45, 45, 45);
	// color: white;
	// border-radius: 8px 20px 4px 4px;
	// font-size: 13px;
	// font-weight: bold;
}

@include xs-only {
	.SectHead {
		justify-content: space-around;
		padding: 8px 5px 8px 5px;
		& > *:not(:only-child),
		& > *:not(:last-child) {
			margin-bottom: 4px;
		}
	}
}
</style>
