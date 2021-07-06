/* Import other modules */
import { Status } from './modules/Status'

import { $Auth } from '@/store'
import { $Vue, $Axios, $Notify, $Process } from '@/plugins'


class Profile {
    $status = new Status()

    data: any

    async fetch (payload: { username: string }, refresh: boolean = false) {
        $Process.add()
        try {
            const { data } = await $Axios.get("users/" + payload.username)
            this.data = data

            $Process.hide()
            return data
        } catch {
            $Process.hide()
            $Notify.error()
        }
    }

    refresh () {
        this.fetch({ username: $Auth.user.username }, true)
    }
}

export const $Profile = $Vue.observable(new Profile())
