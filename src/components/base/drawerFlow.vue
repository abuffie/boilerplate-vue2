<template>

    
    <div class="main-container">
        <shader />

        <div :class="['blackout d-md-none d-lg-none d-xl-none', {open:drawerOpen}]" @click="open=!open"></div>
        <nav class="navbar navbar-expand navbar-dark bg-black sticky-top d-md-none d-lg-none d-xl-none mobile-nav">
            <div class="container-fluid justify-content-start">
                <button class="btn btn-outline" @click="open=!open"><i class="uil uil-bars"></i></button>
                <span class="navbar-brand mb-0 h1">Navbar</span>
            </div>
        </nav>


        <div class="container-fluid">

            <div class="row flex-xl-nowrap">
                <!-- left nav -->
                <div :class="['col-md-3 col-xl-2 order-0 drawer-nav sidenav',{open:open}]">
                    <drawerNav v-on:close="open=false" :drawerState="drawerState" />
                </div>
                <!-- right nav -->
                <!--div class="d-none d-xl-block col-xl-2 order-2 bd-toc pt-24px sidenav">
                </div-->
                
                <div class="col-sm-12 col-md-9 py-md-3 pl-md-5 order-1" >
                    <transition name="zoom" mode="out-in" appear>
                        <router-view ></router-view>
                    </transition>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import drawerNav from "../drawerNav.vue"
import shader from "../shaders/sample.vue"

export default {
    components:{drawerNav, shader},

    data(){
        return{
            open:false,
            drawerState:false
        }
    },
    computed:{
        drawerOpen(){
            document.body.style.overflow = this.open ? 'hidden' : 'auto';
            return this.open;
        }
    },
    methods:{
        onResize(){
            if(window.innerWidth>768){
                this.open = false;
                this.drawerState=false;
            }else{
                this.drawerState=true;
            }
        }
    },
    created       (){ window.addEventListener('resize', this.onResize)},   
    mounted       (){ this.onResize()},
    beforeDestroy (){ window.removeEventListener('resize', this.onResize)}
    
}
</script>

