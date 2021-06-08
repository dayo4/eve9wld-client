// import { $Posts } from "@/myStore"
// import { $Notify } from '@/plugins'

const routes = [
    {
        path: "/compose",
        name: "compose-post",
        component: "@/views/posts/Compose.vue",
        meta: { adminOnly: true },

    },
    {
        name: "post-view",
        path: "/compose/:slug",
        component: "@/views/posts/Compose.vue",
        meta: { adminOnly: true },
        // beforeEnter: (to, from, next) => {
        //     if ($Posts.$compose.contentToEdit)
        //     {
        //         $Posts.$compose.currentMode = 'edit-post'
        //         next()
        //     }
        //     else
        //     {
        //         $Posts.$compose.fetchForEditing({
        //             slug: to.params.slug
        //         }, to.params.preview ? true : false).then((loaded) => {

        //             next()

        //             if (!loaded)
        //             {
        //                 $Notify.error('unable to get request page')
        //             }
        //         })
        //     }
        // }
    },
    {
        path: "/posts",
        name: "posts",
        component: "@/views/posts/AllPosts.vue",
    },
    {
        path: "/posts/:slug",
        component: '@/views/posts/Index.vue',
        children: [
            {
                path: '',
                name: 'post',
                component: '@/views/posts/Single.vue',
            },
        ]
    },
    // {
    //     path: "/posts-preview/:slug",
    //     component: () => import(/* webpackPrefetch: true */'@/views/posts/Index.vue'),
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: "pst" */ '@/views/posts/Single.vue'),
    //             beforeEnter: (to, from, next) => {
    //                 $Posts.$single.fetch({
    //                     slug: to.params.slug
    //                 }, true).then((loaded) => {
    //                     if (loaded)
    //                     {
    //                         next()
    //                     }
    //                 })
    //             }
    //         },
    //     ]
    // },
]

export default routes