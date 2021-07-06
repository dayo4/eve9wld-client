<template>
	<div>
		<transition name="fade-in">
			<router-view> </router-view>
		</transition>

		<!-- Side Nav Component -->
		<div id="SetMorph"></div>
	</div>
</template>
<script lang="ts">
import Vue from "vue"
import MorphNav from "@/components/navs/reusables/morphors"

export default Vue.extend({
	data () {
		return {
			NavConfig: {
				getActiveTab: activeTab => {
					this.$router.push({ name: activeTab.routeName })
				},
				type: "vertical",
				vertical: {
					mini: false
				},
				position: {
					type: "fixed",
					top: "55px",
					bottom: "",
					right: "0",
					left: ""
				},
				trigger: "",
				pri_color: "",
				sec_color: "#006064",
				font: {
					size: "16px",
					color: ""
				},
				bg: {
					color: "",
					image: "/defaults/pgs/scavorb_technolink.jp"
				},
				nav_width: "",
				nav_height: "",
				list_height: "",
				tabs: [
					{
						icon: "icon-user",
						name: "Dashboard",
						routeName: "account"
					},
					{
						icon: "icon-user",
						name: "Profile Information",
						routeName: "profile-info"
					},
					{
						id: 3,
						icon: "icon-cog-1",
						name: "Orders/Downloads",
						routeName: "orders"
					},
					{
						id: 4,
						icon: "icon-cog-1",
						name: "Settings",
						link: ""
					},
					{
						id: 5,
						icon: "icon-cog-1",
						name: "something",
						link: ""
					},
					{
						id: 5,
						icon: "icon-cog-1",
						name: "something",
						link: ""
					}
				]
			}
		}
	},
	mounted () {
		MorphNav("#SetMorph", this.NavConfig)
	}
});
</script>