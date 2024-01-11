import {createRouter, createWebHistory, useRoute} from 'vue-router'
import HomeView from "../views/HomeView.vue"
import SummonerView from "../views/SummonerView.vue"
import { nextTick } from 'vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            component: HomeView,
            name: "home",
            meta: {title: "Solo Queue Analytics"}
        },
        {
            path: "/summoner/:region/:name/:tag",
            name: "summoner",
            component: SummonerView,
            meta: {title: "S"}
        }
    ]
})

router.afterEach((to, from) => {
    const route = useRoute();
    if(to.name==="summoner"){
         const {name, tag} = route.params;
        nextTick(() => {
            document.title = `${name} #${tag}` || "Solo Queue Analytics";
        });
    }  
});

export default router;