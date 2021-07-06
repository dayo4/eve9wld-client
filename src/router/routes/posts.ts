import { $Posts } from "@/store";
import { $Notify } from "@/plugins";

const routes = [
  {
    path: "/posts",
    name: "posts",
    component: () =>
      import(
        /* webpackPrefetch: true, webpackChunkName: "psts" */ "@/views/posts/AllPosts.vue"
      )
  },
  {
    path: "/posts/:slug",
    component: () =>
      import(/* webpackPrefetch: true */ "@/views/posts/Index.vue"),
    children: [
      {
        path: "",
        name: "post",
        component: () =>
          import(/* webpackChunkName: "pst" */ "@/views/posts/Single.vue"),
        beforeEnter: (to, from, next) => {
          $Posts.$single
            .fetch({
              slug: to.params.slug
            })
            .then(loaded => {
              next();
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
