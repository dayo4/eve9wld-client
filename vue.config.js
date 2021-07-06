module.exports = {
    productionSourceMap: false,

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/globalStyles/devOnly/_variables.scss";
                @import "@/globalStyles/devOnly/_mixins.scss";
                `,
                // sassOptions: {
                //     indentedSyntax: true
                // }
            }
        }
    },

    pluginOptions: {
        prerenderSpa: {
            registry: undefined,
            renderRoutes: [
                '/about',
                '/profile/adedayo-adeniyi',
                '/posts',
            ],
            useRenderEvent: true,
            headless: true,
            onlyProduction: true
        }
    }
}
