<template>
  <div class="home">
    <el-button type="primary" size="small" @click="Go">表格组件</el-button>
  </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return {}
    },
    methods: {
        Go() {
            this.$router.push({
                path: '/Table'
            })
        }
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
