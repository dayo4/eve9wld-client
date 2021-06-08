// import { $Profile } from '../myStore'
// import { $Notify } from '@/plugins'


const routes = [
    {
        path: '/profile/:username',
        component: '@/views/profile/Index.vue',
        // alias: '/:username',
        meta: { layout: "ProfileLayout" },
        children: [
            {
                path: '',
                name: 'user-profile',
                component: '@/views/profile/Profile.vue',
                meta: { layout: "ProfileLayout" },
            },
        ]
    },
]

export default routes