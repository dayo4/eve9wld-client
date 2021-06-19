import Vue from 'vue'
// import router from '@nuxtjs/router'
import _axios from "./Axios"
import { createRouter } from '@/router'
import { io } from './WebSocket'

export const $Vue = Vue
export const $Axios = _axios
export const $Router = createRouter()
console.log($Router)
export const WS = io
export const $WooApi = function (endpoint?: string, additionalQueryString?: string) {
    const consumerKey = "ck_73efbfe9ab98ba6de420948082351f903b273da5"
    const consumerSecret = "cs_e0c855bb0f871c73609799be12d1ec2dc48d38e0"
    const version = "wc/v3/"
    return `${version}${endpoint}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}${additionalQueryString ? '&' + additionalQueryString : ''}`
}