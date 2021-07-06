import { $Products } from "@/store";

const routes = [
  {
    path: "/gallery",
    component: () =>
      import("@/views/shop/gallery/Index.vue"),
    children: [
      {
        path: "",
        name: "gallery",
        component: () =>
          import(
            /* webpackChunkName: "glr-ls" */ "@/views/shop/gallery/List.vue"
          )
        // beforeEnter: (to, from, next) => {
        //   $Products.fetchAll({}, true).then(loaded => {
        //     next()
        //     if (!loaded) {
        //       $Notify.error("unable to connect")
        //     }
        //   })
        // }
      },
      {
        path: "/gallery/:slug",
        component: () =>
          import(
            /* webpackChunkName: "glr-v" */ "@/views/shop/gallery/View.vue"
          ),
        beforeEnter: (to, from, next) => {
          $Products.$single
            .fetch({
              slug: to.params.slug
            })
            .then(loaded => {
              if (loaded) {
                next();
              }
              // if (!loaded) {
              //     $Notify.error('Unable to ')
              // }
            });
        }
      }
    ]
  }
];

export default routes;
