<template>
  <div class="container mt-10 pt-10">
    <article class="flex j-c-center">
      <section class="MainView xs12 md11 lg10 pl-4">
        <!-- All tabs go here -->
        <transition name="fade-in">
          <router-view> </router-view>
        </transition>
      </section>
    </article>

    <!-- Side Nav Component -->
    <section id="SetMorph"></section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { $Profile, $Posts, $Auth } from "@/store";
import { $Process } from "@/plugins";

import MorphNav from "@/components/navs/reusables/morphors";

export default Vue.extend({
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (to.query.tab) {
  //       // @ts-ignore
  //       vm.switchTab(to.query.tab);
  //     } // @ts-ignore
  //     vm.activeTab = "Tab_1";
  //   });
  // },

  data() {
    return {
      // tabsList: [
      // { id: 1, name: "Profile Information", icon: "icon-user" }
      // { id: 2, name: 'Manage Bookmarks', icon: 'icon-bookmarks' },
      // { id: 5, name: 'Message Settings', icon: 'icon-mail-alt' },
      // { id: 6, name: 'Manage Preferences', icon: 'icon-resize-small' },
      // { id: 7, name: 'Profile Information', icon: 'icon-user' },
      // { id: 8, name: 'Privacy Settings', icon: 'icon-key' },
      // { id: 9, name: 'Help', icon: 'icon-help' },
      // ],

      NavConfig: {
        getActiveTab: activeTab => {
          this.$router.push({ name: activeTab.routeName });
        },
        type: "vertical",
        // type: 'horizontal',
        vertical: {
          mini: false
        },
        horizontal: {
          // mini: true,
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
    };
  },

  computed: {
    user: () => $Auth.user
  },

  // methods: {
  // },

  mounted() {
    MorphNav("#SetMorph", this.NavConfig);
  }
});
</script>
<style lang="scss" scoped>
.Wrapper {
  position: relative;
}
.MainView {
  & .Tab {
    animation: fade 0.7s;
  }
  min-height: 100vh;
}

@include sm-and-down {
  .MainView {
    // width: 100%;
    padding-left: 6px;
    padding-right: 10px;
  }
}
</style>
