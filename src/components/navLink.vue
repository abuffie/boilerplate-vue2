<template>
    <router-link :to="routeObj.to" custom v-slot="{navigate, isExactActive, isActive}">

        <li class="nav-item" style="position:relative;">
            <a :class="['nav-link', {active:isExactActive}]" @click="navigate">{{routeObj.name}}</a>
            
            <div v-if="hasSub" :class="['smenu', (open || (!open && isActive)) ? 'open' : '']">
                <router-link v-for="(s, si) in routeObj.subs" :to="s.to"  custom v-slot="{navigate, isExactActive}" :key="si">
                    <a :class="['nav-link', {active:isExactActive}]" @click="navigate">{{s.name}}</a>
                </router-link>
            </div>

        </li>


    </router-link>
</template>

<script>
export default {
    props:['routeObj'],
    computed:{
        hasSub(){
            return ('subs' in this.routeObj && this.routeObj.subs.length>0)
        },
        isOpen(){
            return ((this.routeObj.subs.idexOf(s=>s.isExactActive)) >-1 ||tis.open)
        }
    },
    data(){
        return {
            open:false
        }
    }    
}
</script>
