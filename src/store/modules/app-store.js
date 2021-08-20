import * as types from '../mutation-types'
const state = {
    /**
   * 用户信息
   *
   * @type {Object}
   */
    userData: JSON.parse(localStorage.getItem('userData')) || {},
    /**
   * 弹窗信息
   *
   * @type {Object}
   */
    moduleData: {
        status: ''
    }
}
const actions = {
    /**
   * 用户数据
   *
   * @param {Function} commit commit
   */
    setUserData({
        commit
    }, userData) {
        commit(types.USER_DATA, userData)
    },
    /**
   * 弹窗信息
   * 用法：
   *  清空用户数据：store.dispatch('appStore/setUserData', {});
   * 登录返回的数据： store.dispatch('appStore/setUserData', res);
   *
   * @param {Function} commit commit
   */
    setModuleData({
        commit
    }, moduleData) {
        commit(types.MODULE_DATA, moduleData)
    }
}
const mutations = {
    // 用户信息
    [types.USER_DATA](state, userData) {
        localStorage.setItem('userData', JSON.stringify(userData))

        state.userData = userData
    },
    // 弹窗信息
    [types.MODULE_DATA](state, moduleData) {
        state.moduleData = moduleData
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}
