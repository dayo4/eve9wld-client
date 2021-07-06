import { $Axios, $Process, $Notify } from '@/plugins'

export class SinglePost {
    data = {}

    async fetch (payload: { slug: string, id?: string }) {
        $Process.add('Getting content')
        try {
            const { data } = await $Axios.get("posts/" + payload.slug)
            this.data = data
            return data
        }
        catch (e) {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }
}
