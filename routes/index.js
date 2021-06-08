import admin from "./admin"
// import auth from "./auth"
import users from "./users"
import pages from "./pages"
import posts from "./posts"
// import message from "./message"
import settings from "./settings"
// import notifications from "./notifications"

/* OTHER FEATURES */
import gallery from "./gallery"
import shopping from "./shopping"

const NotFound = "@/views/pages/ERRORS/404.vue"

export default [
    ...admin,
    // ...auth,
    ...users,
    ...pages,
    ...posts,
    ...settings,
    ...gallery,
    ...shopping,
    { path: '/:pathMatch(.*)*', component: NotFound }
]

// export function extendRoutes(routes, resolve) {
//     routes.push(/* {
//         name: 'about',
//         path: '/about',
//         component: resolve('@/views/pages/About.vue')
//       }, */
//         ...myRoutes
//     )
// }
