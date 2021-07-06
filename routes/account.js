import { $Account } from "@/store"
import { $Notify } from "@/plugins"

const routes = [
  {
    path: "/account",
    component: () =>
      import(/* webpackChunkName: "stns" */ "@/views/account/Account.vue").then(
        m => m.default || m
      ), beforeEnter: (to, from, next) => {
        if ($Account.data) {
          next()
        }
        else {
          $Account
            .fetch()
            .then(loaded => {
              // if (!loaded)
              next()
            })
        }
      },
    children: [
      /* DASHBOARD */
      {
        path: "",
        name: "account",
        component: () =>
          import("@/views/account/tabs/profile_info/ProfileInfo.vue").then(
            m => m.default || m
          ),

      },
      /* ACCOUNT-INFO ROUTES*/
      {
        path: "profile-info",
        component: () =>
          import("@/views/account/tabs/profile_info/Index.vue").then(
            m => m.default || m
          ),
        children: [
          {
            path: "",
            name: "profile-info",
            component: () =>
              import("@/views/account/tabs/profile_info/ProfileInfo.vue").then(
                m => m.default || m
              )
          },
          {
            path: "payment-info",
            name: "payment-info",
            component: () =>
              import("@/views/account/tabs/profile_info/PaymentInfo.vue").then(
                m => m.default || m
              )
          }
        ]
      },
      /* ORDERS ROUTES */
      {
        path: "orders",
        component: () =>
          import("@/views/account/tabs/orders/Index.vue").then(
            m => m.default || m
          ),
        children: [
          {
            path: "",
            name: "orders",
            component: () =>
              import("@/views/account/tabs/orders/ProfileInfo.vue").then(
                m => m.default || m
              )
          },
          {
            path: "downloads",
            name: "downloads",
            component: () =>
              import("@/views/account/tabs/orders/Downloads.vue").then(
                m => m.default || m
              )
          }
        ]
      }
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { userOnly: true } }
})
