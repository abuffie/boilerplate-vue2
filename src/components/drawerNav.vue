<template>
    <div :class="[drawerState ? 'col-md-9 p-0' : 'col-md-9 col-sm-4 p-0']">
        <nav>
            <ul class="nav flex-column">
                <nav-link v-for="(l, i) in navRoutes" :routeObj="l" :key="i" />
                <!--li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li-->
            </ul>
        </nav>
    </div>
</template>


<script>
import navLink from './navLink.vue';

export default {
    props:['drawerState'],
    components:{navLink},

    watch:{
        '$route' (to, from){
            this.$emit('close');
        }
    },

    computed:{
        navRoutes(){
            return ((this.$router.options.routes||[]).map((r)=>{
                if(!r.nav){return null;}
                var test = r.name;
                return {
                    to:r.path,
                    name:r.name,
                    subs:((this.$router.options.routes||[]).map((rs)=>{
                        if(rs.submenu!=test){return null;}
                        return {
                            to:rs.path,
                            name:rs.name
                        }
                    })).filter(x=>x)
                }
            })).filter(x=>x)
        },
        drawerStyle(){
            return '';//this.drawerState ? '' : 'col-md-9 col-sm-4 p-0';
        }
    }
}
</script>

