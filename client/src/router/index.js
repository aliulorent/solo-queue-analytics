import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "../views/HomeView.vue"
import SummonerView from "../views/SummonerView.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            component: HomeView,
        },
        {
            path: "/summoner/:region/:name/:tag",
            component: SummonerView,
        }
    ]
})

export default router;