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
          )
        // beforeEnter: (to, from, next) => {
        //     // const post: any = $Posts.$single.post as object
        //     // const fetched = post && post.slug === to.params.slug
        //     // if (fetched)
        //     // {
        //     //     next()
        //     // }
        //     // else
        //     // {
        //     $Posts.$single.fetch({
        //         slug: to.params.slug
        //     }, to.params.preview ? true : false).then((loaded) => {
        //         // if (fetched)
        //         // {
        //         next()

        //         if (!loaded) {
        //             $Notify.error('unable to connect')
        //         }
        //         // }
        //     })
        //     //     }
        // }
      }
    ]
  }
];

export default routes;
