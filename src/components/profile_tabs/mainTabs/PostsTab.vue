<template>
  <TabsContainer @return="$emit('return', 'Home')">
    <div v-if="posts && posts.length > 0">
      <!-- Sorting Options and actions -->
      <div
        ref="Header"
        class="Header flex j-c-between a-i-center shadow-8 bg-white br2 mb-2 px-2"
      >
        <Dropdown
          ownID="pages"
          :text="'Go to Page: ' + curPage"
          :optPos="{ right: -30 }"
          class="font-3 btn bg-trans-3 noselect"
        >
          <!-- slots -->
          <template v-slot:default>
            <a v-for="num in Math.floor(count / 10 + 1)" :key="num">
              <span @click="page(num)">{{ num }}</span>
            </a>
          </template>
        </Dropdown>

        <Dropdown
          ownID="PostSort"
          :text="'Sort By: ' + sort"
          class="icon-sort-alt-up font-3 btn bg-trans-3 noselect"
        >
          <!-- slots -->
          <template v-slot:default>
            <a @click="sortBy('Newest', 'desc')">
              <span class="icon-down-open"></span>
              <span>Newest</span>
            </a>
            <a @click="sortBy('Oldest', 'asc')">
              <span class="icon-up-open"></span>
              <span>Oldest</span>
            </a>
          </template>
        </Dropdown>
      </div>

      <!-- ListOfPosts Component -->
      <ListOfPosts :posts="posts" />
    </div>

    <!-- If no posts found -->
    <div v-if="posts && posts.length === 0">
      <h2 class="t-blue-grey text-center text-cap font-9 mt-8 letter-space-1">
        {{
          user && user.id === profile.id
            ? "You Currently Have No Posts."
            : profile.name + " Currently Has No Posts."
        }}
      </h2>
    </div>
  </TabsContainer>
</template>
<script lang="ts">
import Vue from "vue";
import TabsContainer from "@/components/profile_tabs/TabsContainer.vue";

import { $Auth, $Profile, $Posts } from "@/store";
import { $Obstacl } from "@/plugins";

export default Vue.extend({
  components: {
    TabsContainer,
    ListOfPosts: () => import("@/components/posts/ListOfPosts.vue"),
    Dropdown: () => import("@/components/GlobalComponents/utils/Dropdown.vue")
  },

  data() {
    return {
      curPage: 1,
      sort: "Newest",
      query: {
        sort: "desc"
      }
    };
  },

  computed: {
    profile: () => $Profile.data,
    posts: () => $Posts.userPosts,
    count: () => $Posts.userPostsCount,
    user: () => $Auth.user
  },

  methods: {
    sortBy(txt, v: string) {
      this.query.sort = v;
      this.sort = txt;
      $Posts.fetchUserPosts(this.profile.id, this.query, true);
    },

    page(n: number) {
      let query = {
        offset: n * 10 - 10 /* 10 is the default offset value */,
        sort: this.query.sort
      };
      if (n != this.curPage)
        $Posts.fetchUserPosts(this.profile.id, query, true).then(loaded => {
          // if (loaded) this.curPage = n;
        });
    }
  },

  mounted() {
    $Obstacl.create(".Tab_2", {
      injectHTML: this.$appLogo
    });
    $Posts
      .fetchUserPosts($Profile.data.id, {}, true)
      .then(ok => $Obstacl.destroy(".Tab_2"));
  }
});
</script>
<style lang="scss">
.Header {
  position: relative;
  height: 50px;
  transition: 0.3s;
  z-index: 2;
}
</style>
