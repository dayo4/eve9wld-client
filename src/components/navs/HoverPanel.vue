<template>
  <!-- <div> -->
  <div class="HPWrapper noselect" :class="collapsed ? 'Collapsed' : ''">
    <div class="Panel bg-cyan--3">
      <div
        class="Head flex a-i-center j-c-center shadow-7 t-white font-6 bold-3"
      >
        orbrift
      </div>

      <div class="Body flex wrap j-c-between mt-2 p-2">
        <div
          v-show="!icon.auth || icon.auth === 'user'"
          v-for="(icon, i) in icons"
          :key="i"
          class="IconWrapper m-1 text-center"
          :class="icon.auth === 'user' && !isUser ? 'NoHover' : ''"
          @click="
            icon.auth === 'user' && !isUser
              ? unAuthClick()
              : click({ link: icon.link, store: icon.store })
          "
        >
          <router-link
            :to="{
              name: icon.auth === 'user' && !isUser ? '' : icon.link
            }"
            :class="icon.auth === 'user' && !isUser ? 't-grey-1' : 't-white'"
          >
            <span :class="icon.font" class="Icon"></span>
            <span class="IconText">{{ icon.text }}</span>
          </router-link>
        </div>
      </div>

      <div class="Body flex wrap j-c-between p-2">
        <div
          v-for="(icon, i) in pageIcons"
          :key="i"
          class="IconWrapper m-1 text-center"
          @click="click({ link: icon.link })"
        >
          <router-link :to="{ name: icon.link }" class="t-white">
            <span :class="icon.font" class="Icon"></span>
            <span class="IconText">{{ icon.text }}</span>
          </router-link>
        </div>
      </div>

      <div class="Body flex wrap j-c-between p-2">
        <div
          v-for="(icon, i) in socialLinks"
          :key="i"
          class="IconWrapper m-1 text-center"
        >
          <a :href="icon.link" target="_blank" class="t-white">
            <span :class="icon.font" class="Icon"></span>
            <span class="IconText">{{ icon.text }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Handle -->
    <span
      @click="collapsed = !collapsed"
      class="Handle pink-gradient-btn t-white font-7 shadow-3 flex a-i-center j-c-end br5"
    >
      <span class="icon-right-open-big" :class="collapsed ? '' : 'close'"></span>
    </span>
  </div>
  <!-- </div> -->
</template>
<script lang="ts">
import Vue from "vue";
import { $ReadQueue, $Auth } from "@/store";

export default Vue.extend({
  data() {
    return {
      collapsed: true,

      icons: [
        {
          font: "icon-sort-alt-up",
          text: "Read Queue",
          link: "",
          store: "$ReadQueue"
        },
        {
          font: "icon-bookmarks",
          text: "Bookmarks",
          link: "",
          store: "",
          auth: "user"
        },
        // { font: 'icon-cog', text: 'Settings', link: 'manage-settings', auth: 'user' },
      ],

      pageIcons: [
        { font: "icon-mail", text: "Mail", link: "contact" },
        { font: "icon-info", text: "About", link: "about" },
        { font: "icon-doc", text: "Posts", link: "posts" },
        { font: "icon-doc-text", text: "Gallery", link: "gallery" },
        { font: "icon-cart-arrow-down", text: "Checkout", link: "checkout" }
      ],

      socialLinks: [
        // { font: 'icon-youtube', text: 'YouTube', link: '' },
        {
          font: "icon-whatsapp",
          text: "WhatsApp",
          link: "https://wa.me/message/3NSQPMZJFTDHL1"
        }
      ]
    };
  },

  computed: {
    isUser: () => $Auth.isUser,
    isAdmin: () => $Auth.isAdmin
  },

  methods: {
    /* This ensures that panel will only close if target links to somewhere. */
    click({ link, store, auth }) {
      if (link) {
        this.collapsed = !this.collapsed;
      } else if (store) {
        this.collapsed = !this.collapsed;
        if (store == "$ReadQueue") $ReadQueue.show();
      }
    },

    unAuthClick() {
      $Auth.$form.show({
        showQuery: true,
        message:
          "Sorry! That resource you tried to access require you to login."
      });
    },

    collapse() {
      let _this = this;
      function collapse(e) {
        if (!e.target.closest(".HPWrapper")) {
          _this.collapsed = true;
        }
      }
      window.addEventListener("click", collapse, false);
    }
  },

  mounted() {
    this.collapse();
  }
});
</script>
<style lang="scss" scoped>
.HPWrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 400px;
  height: 100%;
  z-index: 8;
  background-color: #006064;
  transition: width 0.2s;

  & .Panel {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    // background: linear-gradient(
    //   #324851 0%,
    //   #006064 10%,
    //   #006064 90%,
    //   #880e4f 100%
    // );
    background: linear-gradient(
      #880e4f 0%,
      #003b46 10%,
      #006064 90%,
      #880e4f 100%
    );
    // background: linear-gradient(
    //     #880e4f 0%,
    //     #006064 10%,
    //     #00bcd4,
    //     #006064 90%,
    //     #880e4f 100%
    // );
    transition: transform 0.2s;
  }
  & .Handle {
    cursor: pointer;
    position: absolute;
    right: -22px;
    top: 70%;
    width: 60px;
    height: 60px;
    border-right: 5px solid $pink-3;
    border-left: 5px solid $pink-3;
    transition: all 0.4s;
    &:hover {
      right: -25px;
    }
    & > span {
         position: absolute;
    right: -6px;
      transition: transform 0.3s;
      &.close {
        transform: rotateZ(180deg);
      }
    }
  }

  &.Collapsed {
    width: 0px !important;
    & .Panel {
      transform: translateX(-400px);
    }
  }
}
.Head {
  height: 50px;
  text-shadow: 0px 1px 2px white;
  // border-bottom: $cyan--3 solid 3px;
  border-radius: 33%;
}
.Body {
  border-top: $cyan--3 solid 3px;
  border-radius: 10px;
  padding-right: 30px;
}

.IconWrapper {
  flex: 0 0 auto;
  min-width: 70px;
  border-radius: 20px 20px 4px 4px;
  transition: background-color 0.5s ease;

  &:not(.NoHover):hover {
    background-color: rgba(0, 187, 212, 0.353);
    cursor: pointer;
  }

  & span {
    display: block;
    margin: 5px;
  }
  & span:first-child {
    font-size: 30px;
    text-shadow: 0px 1px 1px white;
  }
  & span:last-child {
    font-size: 12px;
    font-weight: bold;
  }
  & a {
    text-decoration: none;
  }
}

@include xs-only {
  .HPWrapper {
    max-width: calc(100% - 45px);
  }
}
</style>
