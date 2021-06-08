import myRoutes from './routes/index'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'scavorb - websites and web app development',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: "scavorb - websites and web apps development for artists and designers. Have your personal and business website's UI professionally designed for the best user experience and satisfaction." }
    ],
    // script: [
    //   {
    //     src: 'https://cdnjs.cloudflare.com/ajax/libs.js'
    //   }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Itim&display=swap'
      }
    ],

  },
  target: 'static',
  generate: {
    crawler: true,
    exclude: [
      /^\/admin/, '/manage-settings', '/compose', /^\/message/, /^\/cart\$/, '/checkout', /^\/gallery\$/, /^\/post\$/
    ],
    routes: [ '/profile/dayo' ]
  },
  // dir: {
  //   // Rename `pages` directory to `routes`
  //   pages: 'views'
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  env: {
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  css: [
    '../../GreyCore/GC/dist/greycore.css',
    "../../GreyCore/icons/css/fontello.css",
    '@/assets/deploy/general.css',
    '@/assets/deploy/gradients.scss',
    '@/assets/deploy/logo.scss',
    '@/assets/deploy/plugins.scss',
    '@/assets/deploy/transitions.css'
  ],

  ssr: false,
  loading: false,
  // loading: "@/components/GlobalComponents/notification/Process.vue",
  // loadingIndicator: "@/components/GlobalComponents/notification/initial_page_loading_indicator.html",

  router: {
    extendRoutes (routes, resolve) {
      routes.push(
        ...myRoutes
      )
    },

    middleware: 'auth'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~plugins/nuxt_vue_plugins/vue-tooltip.ts' },
    { src: '~plugins/nuxt_vue_plugins/global-variables.ts' },
    // { src: '~/nuxt_plugins/global-variables.ts', mode: 'client' }, // only on client side
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    // '@nuxtjs/router',
    // ['@nuxtjs/router',
    //   {
    //     path: '~/router/router.js',
    //     filename: 'router.js',
    //     // parsePages: false,
    //     // keepDefaultRouter: false
    //   }
    // ],
  ],
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
  ],

  styleResources: {
    scss: [
      "~assets/devOnly/_variables.scss",
      "~assets/devOnly/_mixins.scss"
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  // content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: 4000
  }
}
