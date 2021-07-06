import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* import some global assets */
import './globalStyles/deploy'
import './plugins/vue_plugins/global-components'
import './plugins/vue_plugins/global-variables'

/* import modules */
// import VueMeta from 'vue-meta'


// /* use plugins */
// Vue.use(VueMeta, {
//   // optional pluginOptions
//   refreshOnceOnNavigation: true
// })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
