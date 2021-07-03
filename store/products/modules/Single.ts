import { $Axios, $Process, $Notify } from '@/plugins'

export class SingleProduct {
    data = null

    async fetch (payload: { slug: string }) {
        $Process.add()
        try {
            const { data } = await $Axios.get('products/' + payload.slug)
            this.data = data
            return true
        }
        catch (e) {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }
}
