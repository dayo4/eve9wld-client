const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const     plugins=  [
    new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
                    routes: [
                '/',
                '/about',
                '/posts',
            ],
        renderer: new Renderer({
            // Optional - The name of the property to add to the window object with the contents of `inject`.
            // injectProperty: '__PRERENDER_INJECTED',
            // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
            // inject: {},
            renderAfterDocumentEvent: 'x-event-render',
            //  renderAfterElementExists: 'my-app-element',
            // renderAfterTime: 5000, // Wait 5 seconds.
            headless: true // Display the browser window when rendering. Useful for debugging.
          })
    })
  ]
module.exports = {
    productionSourceMap: false,

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/globalStyles/devOnly/_variables.scss";
                @import "@/globalStyles/devOnly/_mixins.scss";
                `,
            }
        }
    },


    configureWebpack: config => {
        // config.resolve.modules = [ path.resolve(__dirname, '..'), 'node_modules' ]

        if (process.env.NODE_ENV === 'production') {
          // mutate config for production...
          config.plugins.push(...plugins)
        } else {
          // mutate for development...
        }
      }

    // pluginOptions: {
    //     prerenderSpa: {
    //         registry: undefined,
    //         renderRoutes: [
    //             '/about',
    //             '/profile/adedayo-adeniyi',
    //             '/posts',
    //         ],
    //         useRenderEvent: true,
    //         headless: true,
    //         onlyProduction: true
    //     }
    // }
}
