import { $Posts } from "@/store";
import { $Notify } from "@/plugins";

const routes = [
  {
    path: "/posts",
    name: "posts",
    component: () =>
      import(
        /* webpackPrefetch: true, webpackChunkName: "psts" */ "@/views/posts/AllPosts.vue"
      ).then(m => m.default || m)
    // beforeEnter: (to, from, next) => {
    //     $Posts.fetchAll({}, true)
    //     next()
    // }
  },
  {
    path: "/posts/:slug",
    component: () =>
      import(/* webpackPrefetch: true */ "@/views/posts/Index.vue").then(
        m => m.default || m
      ),
    children: [
      {
        path: "",
        name: "post",
        component: () =>
          import(/* webpackChunkName: "pst" */ "@/views/posts/Single.vue").then(
            m => m.default || m
          ),
        beforeEnter: (to, from, next) => {
          $Posts.$single
            .fetch({
              slug: to.params.slug
            })
            .then(loaded => {
              next();
              console.log(to.params.slug);
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
