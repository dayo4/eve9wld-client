
import { $Auth } from '@/store'
import { $Vue, $Axios, $Notify, $Process } from '@/plugins'

export class SubComments {
    // showComments = false
    comments = []
    commentCount = 0

    async fetchAll (socket, payload: { parent_id?: any, query: Query }, refresh: boolean = false) {
        let _this = this

        return new Promise(function (resolve, reject) {
            // socket.on('connect', () => {
            function fetch () {
                socket.emit('fetch', JSON.stringify({ parent_id: payload.parent_id, query: payload.query }))
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

}
