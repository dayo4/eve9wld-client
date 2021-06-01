import { $Products } from "@/myStore"
import { $Notify } from "@/plugins"

const routes = [
  {
    path: "/gallery",
    component: () => import("@/subViews/gallery/Index.vue").then(m => m.default || m),
    children: [
      {
        path: '',
        name: "gallery",
        component: () => import(/* webpackChunkName: "glr-ls" */ "@/subViews/gallery/List.vue").then(m => m.default || m),
        beforeEnter: (to, from, next) => {
          if ($Products.products.length > 0)
          {
            next()
          }
          else
          {
            fetchFromServer()
          }

          function fetchFromServer () {
            $Products.fetchAll({}, true).then((loaded) => {

              next()

              if (!loaded)
              {
                $Notify.error('unable to connect')
              }
            })
          }
        }
      },
      {
        path: '/gallery/:slug',
        component: () => import(/* webpackChunkName: "glr-v" */ "@/subViews/gallery/View.vue").then(m => m.default || m),
        beforeEnter: (to, from, next) => {
          if ($Products.products.length > 0)
          {
            const foundProduct = $Products.products.find((product) => {
              return product.slug === to.params.slug
            })

            if (foundProduct)
            {
              $Products.$single.product = foundProduct
              next()
            }
            else
              fetchFromServer()
          }
          else
          {
            fetchFromServer()
          }

          function fetchFromServer () {
            $Products.$single.fetch({
              slug: to.params.slug
            }).then((loaded) => {

              next()

              if (!loaded)
              {
                $Notify.error('unable to connect')
              }
            })
          }
        }
      },
    ]
  },
  {
    path: "/demo/:title",
    component: () => import("@/subViews/gallery/demo/Index.vue").then(m => m.default || m),
    children: [
      {
        path: '',
        name: 'gallery-demo',
        component: () => import(/* webpackChunkName: "glr-d" */ "@/subViews/gallery/demo/Demo.vue").then(m => m.default || m),
      },
    ]
  }
]

export default routes
