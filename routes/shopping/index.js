// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/cart",
    name: "cart",
    component: () => import(/* webpackChunkName: "cart-ls" */ "@/subViews/shopping/Cart.vue").then(m => m.default || m),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import(/* webpackChunkName: "chkout" */ "@/subViews/shopping/CheckOut.vue").then(m => m.default || m),
  },
]

export default routes
