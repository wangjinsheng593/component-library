import Vue from 'vue'
import Vuex from 'vuex'
import appStore from './modules/app-store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appStore
    }
})
