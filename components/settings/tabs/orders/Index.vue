<template>
    <div class="Tab">
        <!-- Top MorphNavigator -->
        <section id="SetMorphH"></section>

        <div class="SubTabs">
            <!-- All tabs go here -->
            <keep-alive>
                <component :is="subActiveTab"></component>
            </keep-alive>
        </div>

        <!-- Side Nav Component -->
        <!-- <section id="SetMorph"></section> -->
        <!-- <div class="SubTabs flex j-c-center w-full">
            <User :activeTab="subActiveTab" />
        </div> -->
    </div>
</template>
<script lang="ts">
import Vue from "vue"
// import { $Auth, $Profile, $Admin } from '@/store'
import MultiNav from "@/components/navs/reusables/morphors.js"

// import HorizontalNavigator from '@/components/navs/reusables/navigators/HorizontalNavigator.vue'

import Tab_1 from './Downloads.vue'
import Tab_2 from './ProfileInfo.vue'

export default Vue.extend({
    components: {
        Tab_1,
        Tab_2,
    },

    data () {
        return {
            subActiveTab: "Tab_1",
            tabsList: [
                { id: 1, name: 'Profile Details', icon: 'icon-user' },
                { id: 2, name: "Payment Details", icon: "icon-cog-1" },
            ],

            NavConfig: {
                getActiveTab: (activeTab) => {
                    //@ts-ignore
                    this.subActiveTab = "Tab_" + activeTab.id
                },
                type: 'horizontal',
                horizontal: {},
                position: {
                    type: 'relative',
                    top: '',
                    bottom: '',
                    right: '',
                    left: '',
                },
                trigger: '',
                pri_color: '',
                sec_color: '#006064',
                font: {
                    size: '13px',
                    color: '',
                },
                bg: {
                    color: '',
                    image: ''
                },
                nav_width: '',
                nav_height: '',
                list_height: '',
                tabs: [
                    { id: 1, name: 'Profile Details', icon: 'icon-user' },
                    { id: 2, name: "Payment Details", icon: "icon-cog-1" }
                ]
            }
        }
    },

    methods: {
        // switchTab (tab_id) {
        //     this.subActiveTab = "Tab-" + tab_id
        // }
    },
    mounted () {
        MultiNav('#SetMorphH', this.NavConfig)
    }
})

</script>
<style lang="scss" scoped>
#SetMorphH {
    box-shadow: none !important;
    height: 40px !important;
}
.SubTabs {
    & .Tab {
        animation: fade 0.7s;
    }
}
</style>