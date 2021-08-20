<template>
  <div class="home">
    <el-button type="primary" size="small" @click="Go">表格组件</el-button>
    <el-button type="primary" size="small" @click="handleModuleData('contactUs')">弹窗组件</el-button>
    <module
      :show-close="false"
      :visible="moduleData.status === 'contactUs'"
      @on-close="handleModuleClose"
    >
      <contact-us-Module @close-contactUs="handleModuleClose" />
    </module>
  </div>
</template>

<script>
import ContactUsModule from './contactUs'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Home',
    components: { ContactUsModule },
    data() {
        return {}
    },
    computed: {
        ...mapState('appStore', {
            moduleData: 'moduleData'
        })
    },
    methods: {
        // 设置弹窗开关
        handleModuleData(value) {
            this.setModuleData({
                status: value
            })
        },
        // 关闭弹窗
        handleModuleClose() {
            if (this.loading) {
                return
            }
            this.setModuleData({})
        },
        Go() {
            this.$router.push({
                path: '/Table'
            })
        },
        ...mapActions('appStore', {
            setModuleData: 'setModuleData'
        })
    }
}
</script>
<style lang="scss" scoped>
.home {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
