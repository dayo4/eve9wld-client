<template>
    <transition name="expand">
        <div v-if="show" class="SearchModal br3 pl-3 p-1">
            <div class="InputBox flex bg-white br4 p-1">
                <span class="SearchIcon icon-search flex a-i-center font-6 px-1"></span>
                <input ref="search" type="text" placeholder="Search..." class="p-2 w-full" />
                <span
                    @click="$emit('close')"
                    class="SearchIcon icon-cancel flex a-i-center font-9 px-1"
                ></span>
            </div>
            <hr />
            <div class="Result flex a-i-center bg-white br3 pl-5">
                <span class="font-4 t-grey">Search result</span>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    props: {
        show: { required: true, type: Boolean },
    },

    methods: {
        displayHandler () {
            let $this = this
            function showSearch (e) {
                if (!(e.target.closest('nav')))
                {
                    $this.$emit('close')
                }
            }
            window.addEventListener('click', showSearch, false)
        }
    },

    mounted () {
        this.displayHandler()
    }
})
    // $refs!: {
    //     search: HTMLInputElement
    // }

</script>
<style lang="scss" >
.SearchModal {
    position: absolute;
    top: 10px;
    left: 20%;
    right: 20%;
    max-height: 400px;
    z-index: 9;
    overflow: scroll;
    background-color: rgba(87, 84, 84, 0.712);
}
.SearchIcon {
    font-size: 24px;
    color: #0097a7;
    background-color: rgb(216, 231, 233);
    height: 100%;
    cursor: pointer;
    border: solid rgba(0, 150, 167, 0.322) 2px;
    border-radius: 28px;
}
.InputBox {
    height: 35px;
    width: 100%;
& input {
    height: 100%;
    border: none;
}
}
.Result {
    min-height: 50px;
}
@include xs-only {
    .SearchModal {
        left: 0;
        right: 0;
    }
}
@include sm-only {
    .SearchModal {
        left: 10%;
        right: 10%;
    }
}
</style>