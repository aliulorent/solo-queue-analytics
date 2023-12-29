import {createRouter, createWebHistory} from 'vue-router'
// import ProfileView from "../views/ProfileView.vue"
// import HomeView from "../views/HomeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // {
        //     path: "/",
        //     component: HomeView,
        // },
        // {
        //     path: "/user/:region/:name/:tag",
        //     component: ProfileView,
        // }
    ]
})

export default router;