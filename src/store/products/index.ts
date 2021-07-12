/* Import other modules */
import { SingleProduct } from './modules/Single'

import { $Vue, $Axios, $Notify } from '@/plugins'
import Query from '@/types'

class Products {
    $single = new SingleProduct()

    data: Array<object> = []
    count: number = 0

    async fetchAll (query: Query) {

        try {

            const { data } = await $Axios.get('products/all/' + JSON.stringify(query))

            this.data = data.products
            this.count = data.count
            return data
        }
        catch {
            $Notify.error()
        }
    }
}

export const $Products = $Vue.observable(new Products())

