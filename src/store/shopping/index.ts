/* Import other modules */
import { Cart } from './modules/Cart'
import { Order } from './modules/Order'

import { $Vue, $Axios, $Notify } from '@/plugins'
import Query from '@/types'
// import WW from '@woocommerce/woocommerce-rest-api'

class Shopping {
    $cart = new Cart()
    $order = new Order()


    async fetchAll (payload: Query = {}, refresh: boolean = false) {

    }

}

export const $Shopping = $Vue.observable(new Shopping())

