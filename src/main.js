import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // global css

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import Pagination from '@/components/CPagination/index'
import CTable from '@/components/CTable/index'
import CQueryForm from '@/components/CQueryForm/index'

Vue.component('Pagination', Pagination)
Vue.component('c-table', CTable)
Vue.component('c-query-form', CQueryForm)

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
