import Vue          from 'vue'
import VueRouter    from 'vue-router'
import homePage     from './views/index.vue'
import homePage2     from './views/index2.vue'
import homePage3     from './views/index3.vue'



Vue.use(VueRouter);

let router = new VueRouter({
   // mode: 'history',
    routes:[
        {nav:true, path: '/',   name:'home',  component: homePage },
        {nav:true, path: '/l2', name:'link 2', component: homePage2 },
        {nav:true, path: '/l3', name:'link 3', component: homePage3 },
    ],
    
    // force page to top on navigation
     scrollBehavior (to, from, savedPosition) {
        // instant scroll up
        // return { x: 0, y: 0 }
        // delay it
       return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 500)
      })
    }
    
})

export default router;