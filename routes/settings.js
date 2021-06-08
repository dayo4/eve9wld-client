

const routes = [
    {
        path: '/manage-settings',
        name: 'manage-settings',
        component: '@/views/settings/Settings.vue',
        meta: { userOnly: true }
    }
]

export default routes