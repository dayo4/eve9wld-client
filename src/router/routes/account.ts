import { $Account } from "@/store"
import { $Notify } from "@/plugins"

const routes = [
  {
    path: "/account",
    component: () =>
      import(/* webpackChunkName: "stns" */ "@/views/account/Account.vue"),
    beforeEnter: (to, from, next) => {
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
          import("@/views/account/tabs/profile_info/ProfileInfo.vue"),

      },
      /* ACCOUNT-INFO ROUTES*/
      {
        path: "profile-info",
        component: () =>
          import("@/views/account/tabs/profile_info/Index.vue"),
        children: [
          {
            path: "",
            name: "profile-info",
            component: () =>
              import("@/views/account/tabs/profile_info/ProfileInfo.vue")
          },
          {
            path: "payment-info",
            name: "payment-info",
            component: () =>
              import("@/views/account/tabs/profile_info/PaymentInfo.vue")
          }
        ]
      },
      /* ORDERS ROUTES */
      {
        path: "orders",
        component: () =>
          import("@/views/account/tabs/orders/Index.vue"),
        children: [
          {
            path: "",
            name: "orders",
            component: () =>
              import("@/views/account/tabs/orders/ProfileInfo.vue")
          },
          {
            path: "downloads",
            name: "downloads",
            component: () =>
              import("@/views/account/tabs/orders/Downloads.vue")
          }
        ]
      }
    ]
  }
]

export default routes.map(route => {
  return { ...route, meta: { userOnly: true } }
})
