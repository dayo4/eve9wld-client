/* Import other modules */
import { Compose } from './modules/Compose'
import { Settings } from './modules/Settings'
import { SinglePost } from './modules/Single'

import { $Vue, $Axios, $Notify } from '@/plugins'

interface Query {
    limit?: number
    offset?: number
    sort?: string

}

class Posts {
    $compose = new Compose()
    $settings = new Settings()
    $single = new SinglePost()

    userPosts: Array<object> = []
    userPostsCount: number = 0
    data: Array<object> = []
    count: number = 0

    async fetchAll (query: Query) {

        try {
            const { data } = await $Axios.get(`posts/all/${JSON.stringify(query)}`)

            this.data = data.posts
            this.count = data.count
            return data
        }
        catch {
            $Notify.error()
        }
    }

    async fetchUserPosts (user_id: any, payload: Query = {}, refresh: boolean = false) {
        try {
            const query: Query = {
                limit: payload.limit || 10,
                offset: payload.offset || refresh ? 0 : this.userPosts.length,
                sort: payload.sort || 'desc'
            }
            const { data } = await $Axios.get(`posts/users/${user_id}/${JSON.stringify(query)}`)
            this.userPostsCount = data.count
            if (refresh)
                this.userPosts = data.posts
            else
                this.userPosts.push(...data.posts)
            return data
        }
        catch {
            $Notify.error()
        }
    }
}

export const $Posts = $Vue.observable(new Posts())

export * from './misc'
