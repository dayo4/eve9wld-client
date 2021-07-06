<template>
  <div class="Tab">
    <!-- Top MorphNavigator -->
    <section id="SetMorphH"></section>

    <!-- All tabs go here -->
    <transition name="fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import { $Auth, $Profile, $Admin } from '@/store'
import MultiNav from "@/components/navs/reusables/morphors.js";

export default Vue.extend({
  data() {
    return {
      NavConfig: {
        getActiveTab: activeTab => {
          this.$router.push({ name: activeTab.routeName });
        },
        type: "horizontal",
        horizontal: {},
        position: {
          type: "relative",
          top: "",
          bottom: "",
          right: "",
          left: ""
        },
        trigger: "",
        pri_color: "",
        sec_color: "#006064",
        font: {
          size: "13px",
          color: ""
        },
        bg: {
          color: "",
          image: ""
        },
        nav_width: "",
        nav_height: "",
        list_height: "",
        tabs: [
          { id: 1, name: "Orders", icon: "icon-user", routeName: "orders" },
          {
            id: 2,
            name: "Downloads",
            icon: "icon-cog-1",
            routeName: "downloads"
          }
        ]
      }
    };
  },

  // methods: {

  // },
  mounted() {
    MultiNav("#SetMorphH", this.NavConfig);
  }
});
</script>
<style lang="scss" scoped></style>
