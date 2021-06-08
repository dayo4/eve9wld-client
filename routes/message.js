
const routes = [
    {
        path: '/message/:username',
        component: '@/views/message/Index.vue',
        // alias: '/:username',
        children: [
            {
                path: '',
                name: 'message',
                component: '@/views/message/Message.vue'
            },
        ]
    },
]

export default routes.map(route => {
    return { ...route, meta: { userOnly: true } }
})