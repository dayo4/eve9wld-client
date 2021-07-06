
import { $Auth } from '@/store'
import { $Vue, $Axios, $Notify, $Process } from '@/plugins'


class Orders {
    data: object

    async update (payload: object) {
        $Process.add('Updating Info')
        try {
            const { data } = await $Axios.patch("account/orders/" + $Auth.user.id, {
                ...payload
            })

            $Process.hide()
            return data
        } catch {
            $Process.hide()
            $Notify.error()
        }
    }

    async fetch () {
        $Process.add()
        try {
            const { data } = await $Axios.get("account/orders/" + $Auth.user.id, {

            })
            this.data = data

            $Process.hide()
            return data
        } catch {
            $Process.hide()
            $Notify.error()
        }
    }

}

export const $Profile = $Vue.observable(new Orders())
