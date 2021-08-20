import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
export const lazyLoading = (name) => {
    // 路由懒加载
    return () => Promise.resolve(require(`@/views/${name}.vue`).default)
}
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Table',
        name: 'Table',
        component: lazyLoading('Table')
    }
]

const router = new VueRouter({
    routes
})

export default router
