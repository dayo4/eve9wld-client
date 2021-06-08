import { $Notify, $Axios, $LSAgent, $Router } from '@/plugins'

export class Form {

    status = false
    mode = 1 /* 1 = login, 2 = register, ResetPassword = 3 */
    query = {
        showQuery: false,
        redirect: '',
        message: ''
    }
    response = {
        error: false,
        message: ''
    }

    resetResponse () {
        this.response.message = ''
    }

    show (query?: { showQuery?: boolean, message?: string, redirect?: string }, mode: number = 1) {
        if (query)
        {
            this.query = query as any
        }

        this.status = true
        this.mode = mode
    }
    dismiss () {
        this.status = false
        if (this.query.showQuery)
        {
            this.query = { showQuery: false, message: '', redirect: '' }
        }

    }

    async register (payload: object) {
        const sr = this.response

        try
        {
            const { data } = await $Axios.post("register", {
                ...payload
            })

            if (data)
            {
                sr.error = false
                sr.message = data/* "Successfully created account" */
            }
        } catch (e)
        {
            sr.error = true
            sr.message = e
        }
    }

    async login (payload: any, stage: number = 1) {
        const sr = this.response
        try
        {
            const { data } = await $Axios.post("login", {
                // const { data } = await $Axios.post("jwt-auth/v1/token", {
                email: payload.email,
                // username: 'dayorx68',
                // username: 'myself',
                password: payload.password,
                // password: '638367%test',
                // password: '638367me',
                // stage
            })
            /* "data" can either be a query "{next: true}" to proceed to stage two where user will enter "names" if the user is signing in for the first time
                or an object containing the user data.
            */
            // if (data.next)
            // if (data)
            // {
            // return data
            // }
            // else
            // {
            //     $LSAgent.setToken(data.token)
            //     $LSAgent.setData(data.user, 'userDetails')

            //     if (this.query.redirect) if you was redirected here to login from another page
            //         $Router.replace({ path: this.query.redirect })

            //     this.status = false
            //     return {}
            // }

            if (data)
            {
                $LSAgent.setToken(data.token)
                $LSAgent.setData(data.user, 'userDetails')

                // if (this.query.redirect) //if you were redirected here to login from another page
                //     $Router.replace({ path: this.query.redirect })

                this.status = false
                // console.log(data.data)
                return {}
            }
        }
        catch (e)
        {
            console.log(e)
            sr.message = ""
            if (e)
            {
                sr.error = true
                sr.message = e
            } else
            {
                sr.error = true
                sr.message =
                    "Connection error. Try again later!"
            }
            $LSAgent.selfDestruct()
        }
    }

    logout (notify?: boolean) {
        $LSAgent.selfDestruct()

        if ($Router.currentRoute.name !== 'home')
        {
            $Router.push({ path: '/' })
        }
        if (notify)
        {
            $Notify.error("You have been logged out.")
        }
    }

}
