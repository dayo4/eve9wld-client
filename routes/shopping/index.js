// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/cart",
    name: "cart",
    component: () => import(/* webpackChunkName: "cart-ls" */ "@/views/shop/shopping/Cart.vue").then(m => m.default || m),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import(/* webpackChunkName: "chkout" */ "@/views/shop/shopping/CheckOut.vue").then(m => m.default || m),
  },
]

export default routes
