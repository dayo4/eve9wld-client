<template>
  <div id="GBLMContainer">
    <TopNav />
    <HoverPanel />
    <Notify />
    <ReadQueue />
    <Input />
    <Process />
    <Auth />

    <!-- <transition name="fade-in"> -->
    <!-- <router-view></router-view> -->
    <Nuxt />
    <!-- </transition> -->

    <Footer />
    <BottomNav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { $Auth, $Navs } from "@/store";

import TopNav from "@/components/navs/TopNav.vue";
import BottomNav from "@/components/navs/BottomNav.vue";
import Footer from "@/components/navs/Footer.vue";
import HoverPanel from "@/components/navs/HoverPanel.vue";
import Process from "@/components/GlobalComponents/notification/Process.vue";
import Notify from "@/components/GlobalComponents/notification/Notify.vue";
// import { $General } from "./plugins";
// import Footer from "@/components/navs/Footer.vue"

export default Vue.extend({
  components: {
    TopNav,
    Footer,
    BottomNav,
    HoverPanel,
    Process,
    Notify,
    ReadQueue: () => import("@/components/posts/misc/ReadQueue.vue"),
    Input: () => import("@/components/GlobalComponents/Input.vue"),
    Auth: () => import("@/components/auth/Auth.vue")
  },

  // computed: {
  //     // loadAuth: () => import(/* webpackChunkName: "auth" */ "@/components/auth/Auth.vue")
  // }

  mounted() {
    $Auth.getSysSettings();
    //@ts-ignore
    $Navs.$container.element = window ? window : document.body; //document.getElementsByClassName('GBLMContainer')[ 0 ]
    $Navs.$container.ScrollingHandler();
  }
});
</script>

<style lang="scss">
#GBLMContainer {
  position: relative;
  margin-top: 52px;
  padding-bottom: 165px; /* Bottom-nav height + Footer height + 0px*/
  min-height: 100vh;
  height: 100%;
  width: 100%;
}

@include lg-and-up {
  // #GBLMContainer {
  //     padding-left: 15%;
  //     padding-right: 15%;
  // }
}

@include sm-and-down {
  #GBLMContainer {
    margin-top: 50px;
  }
}
</style>
