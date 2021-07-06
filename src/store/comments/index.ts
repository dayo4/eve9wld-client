/* Import other modules */
import { SubComments } from './modules/SubComments'


import { $Auth } from '@/store'
import { $Vue, $Axios, $Notify, $Process, WS } from '@/plugins'

export class Comments {
    $SubComments = new SubComments()

    comments = []
    commentCount = 0

    async new (payload: { post_id: any, parent_id: any, comment: string }) {
        try {
            const { data } = await $Axios.post(`comments/new/${$Auth.user.id}/${payload.post_id}/${payload.parent_id}`, { comment: payload.comment })
            return data
        }
        catch {
            $Notify.error('Request could not be completed. Please try again.')
        }
    }

    async fetchAll (socket, payload: { post_id: any, query: Query }, refresh: boolean = false) {
        let _this = this

        return new Promise(function (resolve, reject) {
            // socket.on('connect', () => {
            function fetch () {
                socket.emit('fetch', JSON.stringify({ post_id: payload.post_id, query: payload.query }))
            }
            fetch()

            socket.on('serverUpdated', () => {
                fetch()
            })
            socket.on('message', (Data) => {
                const data = JSON.parse(Data)
                _this.commentCount = data.count

                // if (refresh)
                _this.comments = data.comments
                // else
                //     _this.comments.push(...data.comments)
                resolve(data)
            })

            // socket.on('error', (reason) => {
            //     reject(reason)
            // })

        })
        // })
    }

    async fetch (comment_id: number) {
        $Process.add('Preparing comment')
        try {
            const { data } = await $Axios.get("comments/" + comment_id)
            if (data) {
                $Process.hide()
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async update (payload: { content: string, comment_id: string }) {
        try {
            const { data } = await $Axios.patch(`comments/${$Auth.user.id}/${payload.comment_id}`, {
                content: payload.content,
            })
            if (data) {
                $Notify.success('Comment Updated!.')
                $Process.hide()
                return data
            }
        }
        catch {
            $Notify.error('Unable to update comment.')
            $Process.hide()
        }

    }

    async delete (comment_id: string) {
        $Process.add('Deleting comment')
        try {
            const { data } = await
                $Axios.delete(`comments/${$Auth.user.id}/${comment_id}`)
            if (data) {
                $Notify.success('Comment deleted')/* leave as is! */
                $Process.hide()
            }
            return data
        }
        catch (error) {
            $Notify.error()
            $Process.hide()
        }
    }
}


export const $Comments = $Vue.observable(new Comments())
