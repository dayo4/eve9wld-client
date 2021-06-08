import Vue from 'vue'
// import router from '@nuxtjs/router'
import _axios from "./Axios"
import { Router } from '@/middleware/auth'
import { io } from './WebSocket'

export const $Vue = Vue
export const $Axios = _axios
export const $Router = Router
export const WS = io
export const $WooApi = function (endpoint?: string, additionalQueryString?: string) {
    const consumerKey = "ck_8407d28e2be1db6ab3a2f23fef4edea1a950b7d4"
    const consumerSecret = "cs_ddd9dfd3b448eea0a2876daf631b61621cc9cc75"
    const version = "wc/v3/"
    return `${version}${endpoint}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}${additionalQueryString ? '&' + additionalQueryString : ''}`
}