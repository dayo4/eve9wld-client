/* Import other modules */
import { SinglePost } from './modules/Single'

import { $Vue, $Axios, $Notify } from '@/plugins'

class Posts {
    $single = new SinglePost()

    data: Array<object> = []
    count: number = 0

    userPosts: Array<object> = []
    userPostsCount: number = 0


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

    async fetchUserPosts (user_id: any, query: Query = {}, refresh: boolean = false) {
        try {

            const { data } = await $Axios.get(`posts/users/${user_id}/${JSON.stringify(query)}`)
            this.userPostsCount = data.count
            this.userPosts = data.posts
        }
        catch {
            $Notify.error()
        }
    }
}

export const $Posts = $Vue.observable(new Posts())

export * from './misc'
