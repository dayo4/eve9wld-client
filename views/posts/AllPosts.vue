<template>
	<!-- <div v-show="posts" class="Wrapper"> -->
	<GlobalWrapper :title="false">
		<template #WrapperHead>
			<Dropdown ownID="PostSort" class="font-3 bg-trans-3 br4">
				<!-- slots -->
				<template #labels>
					<span class="icon-sort-alt-down mr-1"></span>
					<span class="mr-2">{{ sort }}</span>
				</template>

				<template #default>
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
		</template>

		<!-- ListOfPosts Component -->
		<template #WrapperBody>
			<section v-if="posts && posts.length > 0">
				<ListOfPosts
					:posts="posts"
					:pagin="pagin"
					@switchPage="switchPage"
				/>
			</section>
		</template>

		<!-- <section v-else class="px-10">
        <h2 class="t-blue-grey text-center text-cap font- mt-8 letter-space-1">
          No Posts Published At The Moment.
        </h2>
      </section> -->
		<!-- 
      <section v-if="posts.length < 3" class="px-10 mt-10">
        <h4 class="t-blue-grey text-center text-cap font- mt-8 letter-space-1">
          More Contents Will Be Available Shortly.
        </h4>
      </section> -->
		<!-- </template> -->
	</GlobalWrapper>
	<!-- </div> -->
</template>
<script lang="ts">
import Vue from "vue"
import { $Posts } from "@/store"
import { /* $ScrollLoader, */ $Obstacl, $General } from "@/plugins"

export default Vue.extend({
	components: {
		// Dropdown: () => import("@/components/GlobalComponents/utils/Dropdown.vue"),
		ListOfPosts: () => import("@/components/posts/ListOfPosts.vue")
	},

	metaInfo () {
		return $General.metaInfo({ title: "blog - posts" })
	},

	data () {
		return {
			pagin: {
				pages: 1,
				current: 1
			},
			sort: "Newest",
			query: {
				limit: 10,
				offset: 0,
				sort: [ "created_at", "desc" ]
			}
		}
	},

	computed: {
		posts: () => $Posts.data,
		count: () => $Posts.count
	},

	methods: {
		sortBy (txt, v: string[]) {
			this.query.sort = v
			this.sort = txt
			$Posts.fetchAll(this.query)
		},

		switchPage (v: number) {
			if (this.pagin.pages > 1 && v > 0 && v <= this.pagin.pages) {
				this.query.offset = (v - 1) * this.query.limit
				$Posts.fetchAll(this.query).then(loaded => {
					if (loaded) {
						this.pagin.current = v
					}
				})
			}
		}
	},

	mounted () {
		// let _this = this;
		// $ScrollLoader('#MC-AllPosts').init(async function () {
		//     return await $Posts.fetchAll(_this.query).then(data => {
		//         if (data)
		//             return data
		//     })
		// })
		$Obstacl.create("#MC-AllPosts", {
			injectHTML: this.$appLogo("logo-trans-2 logo-large logo-fast")
		})
		$Posts.fetchAll(this.query).then(ok => {
			this.pagin.pages = Math.ceil(this.count / this.query.limit)
			$Obstacl.destroy("#MC-AllPosts")
		})
		// this.$gtag.event('login', { method: 'Google' })
	}
});
</script>
<style lang="scss" scoped>
.Header {
	background-color: rgb(45, 45, 45);
	border-radius: 20px 20px 4px 4px;
}
// .Wrapper {
// 	display: flex;
// 	justify-content: center;
// 	margin-bottom: 50px;
// }
// .sss {
//     background-color: blue;
//     height: 200px;
// }

// .Footer {
//     position: absolute;
//     bottom: 0;
// }
</style>
