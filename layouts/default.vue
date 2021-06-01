<template>
    <div>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import MainAppLayout from '@/layouts/MainAppLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'

export default Vue.extend({
    components: {
        MainAppLayout,
        ProfileLayout
    },

    computed: {
        layout () {
            return this.$route.meta.layout || "MainAppLayout"
        }
        //     // loadAuth: () => import(/* webpackChunkName: "auth" */ "@/components/auth/Auth.vue")
    }

    // mounted() {
    // $Auth.getSysSettings();
    // $Navs.$container.element = window; //document.getElementsByClassName('GBLMContainer')[ 0 ]
    // $Navs.$container.ScrollingHandler();
    // },
});
</script>

<style lang="scss">
</style>
