/* Import other modules */
import { Settings } from './modules/Settings'
import { SingleProduct } from './modules/Single'

import { $Vue, $Axios, $WooApi, $Notify } from '@/plugins'
// import WW from '@woocommerce/woocommerce-rest-api'
interface Query {
    limit?: number
    offset?: number
    sort?: string

}

class Products {
    $settings = new Settings()
    $single = new SingleProduct()

    products: Array<object> = []
    productsCount: number = 0
    userProducts: Array<object> = []
    userProductsCount: number = 0


    async fetchAll (payload: Query = {}, refresh: boolean = false) {

        try
        {
            // const query: Query = {
            //     limit: payload.limit || 10,
            //     offset: payload.offset || refresh ? 0 : this.posts.length,
            //     sort: payload.sort || 'desc'
            // }
            // const api = new WW({
            //     url: 'https://orb.heroestoggery.com/', // Your store URL
            //     consumerKey: 'ck_8407d28e2be1db6ab3a2f23fef4edea1a950b7d4', // Your consumer key
            //     consumerSecret: 'cs_ddd9dfd3b448eea0a2876daf631b61621cc9cc75', // Your consumer secret
            //     version: 'wc/v3' // WooCommerce WP REST API version
            // })
            const { data } = await $Axios.get($WooApi('products'),)
            // console.log(data)
            // this.productsCount = data.count
            if (refresh)
                this.products = data
            else
                this.products.push(...data)
            return data
        }
        catch {
            $Notify.error()
        }
    }
}

export const $Products = $Vue.observable(new Products())

