// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/gallery",
    component: () => import("@/views/shop/gallery/Index.vue").then(m => m.default || m),
    children: [
      {
        path: '',
        name: "gallery",
        component: () => import(/* webpackChunkName: "glr-ls" */ "@/views/shop/gallery/List.vue").then(m => m.default || m),
      },
      {
        path: '/gallery/:slug',
        component: () => import(/* webpackChunkName: "glr-v" */ "@/views/shop/gallery/View.vue").then(m => m.default || m),
      },
    ]
  },
]

export default routes
