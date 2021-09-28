import Vue from 'vue'
import Vuex from 'vuex'
import appStore from './modules/app-store'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appStore,
        common
    }
})
