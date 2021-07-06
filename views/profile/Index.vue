<template>
    <!-- <router-view v-slot="{ Component }"> -->
    <transition name="slide-fade">
        <router-view></router-view>
        <!-- <component :is="Component" /> -->
    </transition>
    <!-- </router-view> -->
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
    layout: "profile",
});
</script>