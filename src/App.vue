<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        // 注册 sock
        this.$websocket.initWebsocket()
    }
}
</script>

<style lang="scss"></style>
