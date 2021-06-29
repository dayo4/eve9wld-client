import { $Axios, $Process, $Notify } from '@/plugins'

export class SinglePost {
    data = null
    comments = null

    async fetch (payload: { slug: string, id?: string }) {
        $Process.add('Fetching content')
        try {
            const { data } = await $Axios.get("posts/" + payload.slug)
            this.data = data.post
            this.comments = data.comments
            return data
        }
        catch (e) {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }
}
