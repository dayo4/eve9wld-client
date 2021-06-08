// import {Plugin} from '@nuxt/types'
import { $General } from '@/plugins'

import moment from 'moment'

// GLOBAL VUE VARIABLES
const BASE_URL = process.env.NODE_ENV === 'production' ? (process.server ? process.env.BASE_URL : '/') : 'http://127.0.0.1:3000/'

const appLogo = $General.appLogo


export default function (context, inject) {
    inject('moment', moment)
    inject('baseUrl', BASE_URL)
    inject('postBaseUrl', BASE_URL + 'pst/')
    inject('userBaseUrl', BASE_URL + 'usr/')
    inject('appLogo', appLogo)
}
