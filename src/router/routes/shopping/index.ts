// import { $Posts } from "@/store"

const routes = [
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(
        /* webpackChunkName: "cart-ls" */ "@/views/shop/shopping/Cart.vue"
      )
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () =>
      import(
        /* webpackChunkName: "chkout" */ "@/views/shop/shopping/CheckOut.vue"
      )
  }
];

export default routes;
