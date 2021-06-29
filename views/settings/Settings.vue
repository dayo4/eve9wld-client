<template>
  <div class="container mt-10 pt-10">
    <section class="MainView xs12">
      <!-- All tabs go here -->
      <keep-alive>
        <component :is="activeTab"></component>
      </keep-alive>
    </section>

    <!-- Side Nav Component -->
    <section id="SetMorph"></section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { $Profile, $Posts, $Auth } from "@/store";
import { $Process } from "@/plugins";

import MorphNav from "@/components/navs/reusables/morphors";

/* Import Tabs */
import Tab_1 from "@/components/settings/tabs/profile_info/Index.vue";
import Tab_2 from "@/components/settings/tabs/profile_info/Index.vue";
import Tab_3 from "@/components/settings/tabs/orders/Index.vue";
import Tab_4 from "@/components/settings/tabs/portfolio/List.vue";

export default Vue.extend({
  components: {
    // VerticalNavigator,
    Tab_1,
    Tab_2,
    Tab_3,
    Tab_4,
    Tab_5
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.tab) {
        // @ts-ignore
        vm.switchTab(to.query.tab);
      } // @ts-ignore
      vm.activeTab = "Tab_1";
    });
  },

  data() {
    return {
      activeTab: "Tab_1",
      sideBar: false,

      tabsList: [
        { id: 1, name: "Profile Information", icon: "icon-user" }
        // { id: 2, name: 'Manage Bookmarks', icon: 'icon-bookmarks' },
        // { id: 5, name: 'Message Settings', icon: 'icon-mail-alt' },
        // { id: 6, name: 'Manage Preferences', icon: 'icon-resize-small' },
        // { id: 7, name: 'Profile Information', icon: 'icon-user' },
        // { id: 8, name: 'Privacy Settings', icon: 'icon-key' },
        // { id: 9, name: 'Help', icon: 'icon-help' },
      ],

      NavConfig: {
        getActiveTab: activeTab => {
          //@ts-ignore
          this.activeTab = "Tab_" + activeTab.id;
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
            id: 1,
            icon: "icon-users",
            name: "Profile Information",
            link: ""
          },
          {
            id: 2,
            icon: "icon-cog-1",
            name: "Dashboard",
            link: ""
          },
          {
            id: 3,
            icon: "icon-cog-1",
            name: "Orders/Downloads",
            link: ""
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

  methods: {
    switchTab(tab_id) {
      this.activeTab = "Tab_" + tab_id;
      if (tab_id === 3) {
        $Profile.$Portfolio.fetchAll({
          user_id: $Auth.user.id,
          filter: {}
        });
      } else if (tab_id === 4) {
        $Posts.$settings.fetchAll({ filter: {} }, true);
      }
    }
  },

  mounted() {
    const adminTabs = [
      { id: 3, name: "Portfolio Setup", icon: "icon-briefcase-1" },
      { id: 4, name: "Manage Post", icon: "icon-doc-text" }
    ];

    if ([9, 10].includes(this.user.pr)) {
      this.tabsList.push(...adminTabs);
    }

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
}

@include xs-only {
  .MainView {
    padding: 3px;
    // padding-right: 50px;
  }
}
</style>
