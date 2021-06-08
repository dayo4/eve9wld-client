import { NuxtOptions, NuxtAppOptions, Context } from "@nuxt/types"
import { $Auth } from "@/myStore"
export let Router

export default function ({ app }: Context) {
    // let y: NuxtOptions
    // let z: NuxtAppOptions
    // // z.
    Router = app.router

    app.router.beforeEach((to, from, next) => {
        const isUser = $Auth.isUser
        const isAdmin = $Auth.isAdmin

        console.log(to)
        // const adminRoutes = ['compose', ]
        // const adminRoutes = []
        // const adminRoutes = []

        const guestOnly = to.matched.some(record => record.meta.guestOnly)
        const userOnly = to.matched.some(record => record.meta.userOnly)
        const adminOnly = to.matched.some(record => record.meta.adminOnly)
        // const special = to.matched.some(record => record.meta.special)

        /* Admin Routes Guard */
        if (adminOnly)
        {
            if (isUser && isAdmin)
            {
                next()
            } else if (isUser && !isAdmin)
            {
                next({
                    path: '/401'
                })
            } else
            {
                $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
                // next({
                //   path: "/auth",
                //   query: { redirect: to.fullPath }
                // })
            }
        } else if (userOnly)
        {
            /*  Users Routes Guard */
            if (isUser)
            {
                next()
            } else
            {
                $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
            }
        } else if (guestOnly)
        {
            /* Guests-Only Routes Guard */
            if (isUser)
            {
                next({ path: '/' })
            } else
            {
                next()
            }
        }
        // /* System only can access these routes */
        // else if (special)
        // {
        //   if (isUser)
        //   {
        //     next({ path: "/" })
        //   } else
        //   {
        //     next()
        //   }
        // }
        /*  All things being equal.. */
        else
        {
            next()
        }
    })


}
