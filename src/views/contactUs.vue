<template>
  <div class="app-sidebar-modal">
    <!-- 标题 -->
    <div class="app-sidebar-modal__title">CUSTOMER SERVICE</div>
    <!-- 内容 -->
    <div v-loading="loading" class="app-sidebar-modal__content">
      <div class="text">For more information please contact us through WhatsApp</div>
      <div class="text">
        <span>WHATS APP :</span>
        <span class="sgin">test whats app12++-</span>
      </div>
      <div class="text">
        <span>ICQ :</span>
        <span class="sgin">test icq23++-</span>
      </div>
      <div class="text">
        <span>EMAIL US :</span>
        <span class="sgin">test email us34++-</span>
      </div>
      <div class="text">
        <span>TALEGRAM:</span>
        <span class="sgin">test telegram45++-</span>
      </div>
    </div>
    <div class="button-wrapper">
      <el-button type="primary" size="small" @click="handleCloseMoadl">CONFIRM</el-button>
    </div>
  </div>
</template>
<script>

export default {
    data() {
        return {
            loading: false
        }
    },
    mounted() {
    },

    methods: {
        handleCloseMoadl() {
            this.$emit('close-contactUs')
        }
    }

}
</script>
<style lang="scss" scoped>
    // 联系我们弹窗
.app-sidebar-modal{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 38px;
    height: 100%;
    .app-sidebar-modal__title{
        color: #333333;
        text-align: center;
        padding-top: 31px;
        padding-bottom: 21px;
        font-size: 22px;
        font-weight: 800;
        line-height: 33px;
    }
    .app-sidebar-modal__content{
        padding: 20px;
        font-size: 24px;
        font-weight: 800;
        line-height: 50px;
        border-radius: 10px;
        .text{

            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
            line-height: 20px;
            .sgin{
                padding-left: 15px;
                color: #0083FF;
            }
        }
    }
    .button-wrapper{
        display: flex;
        flex-direction: row-reverse;
        padding-bottom: 36px;
        border-radius: 6px;
        .button{
            width: 130px;
            height: 50px;
            background: #0083FF;
            color:white;

        }

    }

}
</style>
