/* Import other modules */
import { Cart } from './modules/Cart'
import { Order } from './modules/Order'

import { $Vue, $Axios, $WooApi, $Notify } from '@/plugins'
// import WW from '@woocommerce/woocommerce-rest-api'
interface Query {
    limit?: number
    offset?: number
    sort?: string

}

class Shopping {
    $cart = new Cart()
    $order = new Order()


    async fetchAll (payload: Query = {}, refresh: boolean = false) {

    }

}

export const $Shopping = $Vue.observable(new Shopping())

