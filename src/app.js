import Vue       from 'vue'         // vuejs core
import router    from './routes.js' // setup for the app's routes
import store    from './store/store.js'

import VueLazyLoad from 'vue-lazyload'

import base     from './components/base/drawerFlow.vue'

import fireFlies from './js/FireFlys.js';

//import base     from './components/base/.vue'
//import base     from './components/base/.vue'
 
// tell vuejs what plugins to reister
Vue.use(VueLazyLoad)



new Vue({
    el: '#app',
    router,
    store,
   
    watch: {
        // smooth scroll to top on route change 
        '$route': function(value) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
        }
    },



    render: h => h(base)
});