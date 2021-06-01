import { $Axios, $Process, $WooApi, $Notify } from '@/plugins'

export class SingleProduct {
    product = null

    async fetch (payload: { slug: string }, preview = false) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get($WooApi('products', 'slug=' + payload.slug))
            this.product = data[ 0 ]
            return true
        }
        catch (e)
        {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }
}
