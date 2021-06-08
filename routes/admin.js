
const routes = [
  {
    path: "/admin-dashboard",
    component: "@/views/admin/Index.vue",

    children: [
      {
        path: "",
        name: "admin-dashboard",
        component: "@/views/admin/Dashboard.vue"
      },
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { adminOnly: true } }
})
