// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/",
    name: "home",
    component: "@/views/pages/Home.vue",
  },
  {
    path: "/about",
    name: "about",
    component: "@/views/pages/About.vue"
  },
  {
    path: "/contact",
    name: "contact",
    component: "@/views/pages/Contact.vue"
  },
  {
    path: "/project-enquiry",
    name: "project-enquiry",
    component: "@/views/pages/ProjectEnquiry.vue"
  },
  {
    path: "/privacy",
    name: "privacy",
    component: "@/views/pages/Privacy.vue"
  },
  // {
  //   path: "/services",
  //   name: "services",
  //   component: () => import(/* webpackChunkName: "srvc" */ "@/views/pages/Services.vue")
  // },
  {
    path: "/401",
    name: "401",
    component: "@/views/pages/ERRORS/401.vue"
  },
  {
    path: "/404",
    name: "404",
    component: "@/views/pages/ERRORS/404.vue"
  },
]

export default routes
