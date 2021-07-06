import Vue from 'vue'
import { $General } from '@/plugins'

import moment from 'moment'

const BASE_URL = process.env.NODE_ENV === 'production' ?  process.env.BASE_URL  : 'http://127.0.0.1:3000/'


// GLOBAL VUE VARIABLES
Vue.prototype.$moment = moment
Vue.prototype.$baseUrl = BASE_URL
Vue.prototype.$appLogo = $General.appLogo
 