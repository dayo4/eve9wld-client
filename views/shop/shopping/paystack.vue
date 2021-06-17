<template>
    <Container ownID="MC-Gall">
        <paystack
            :amount="amount"
            :email="email"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false"
        >
            <i class="fas fa-money-bill-alt"></i>
            Make Payment
        </paystack>
    </Container>
</template>
<script lang="ts">
import Vue from "vue"

import paystack from 'vue-paystack'
import Container from '@/components/navs/reusables/Container.vue'
import { $General } from '@/plugins'

export default Vue.extend({
    components: {
        Container, paystack
    },

    data () {
        return {
            paystackkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx", //paystack public key
            email: "foobar@example.com", // Customer email
            amount: 1000000 // in kobo
        }
    },
    computed: {
        reference () {
            let text = ""
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

            for (let i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length))

            return text
        }
    },
    methods: {
        callback: function (response) {
            console.log(response)
        },
        close: function () {
            console.log("Payment closed")
        }
    }
})

</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}

.Filter {
    position: relative;
    margin: 30px 40px;
    // border: solid 3px;
    & select {
        padding-right: 26px;
    }
    & i {
        position: relative;
    }
    & i::after {
        content: "";
        position: absolute;
        top: 45%;
        left: -20px;
        border-top: 7px solid white;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
    }
}

.Tiles {
    overflow: hidden;
    width: 300px;
    height: 300px;
    background-color: white;
    border-radius: 15px;
    margin: 0px 30px 30px 30px;
    // border-top: solid 3px $cyan;
    border-bottom: solid 3px $cyan;

    & > .Img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $cyan-4;
        width: 100%;
        height: 80%;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    & > .Btn {
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
@include xs-only {
    .Tiles {
        width: 100%;
        // margin: 0px 30px 30px 0;
    }
}
</style>