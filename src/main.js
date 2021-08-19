import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import Pagination from '@/components/Pagination/index'
import CQueryForm from '@/components/CQueryForm/index'
import CTable from '@/components/CTable/index'
Vue.component('Pagination', Pagination)
Vue.component('CQueryForm', CQueryForm)
Vue.component('CTable', CTable)

const context = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
window.vm = context
export default context
