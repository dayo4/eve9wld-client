// import { $Products } from "@/myStore"
// import { $Notify } from "@/plugins"

const routes = [
  {
    path: "/gallery",
    component: "@/views/shop/gallery/Index.vue",
    children: [
      {
        path: '',
        name: "gallery",
        component: "@/views/shop/gallery/List.vue"
      },
      {
        path: '/gallery/:slug',
        name: "gallery-view",
        component: "@/views/shop/gallery/View.vue",
      },
    ]
  },
]

export default routes
