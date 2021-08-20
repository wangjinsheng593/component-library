<template>
  <el-dialog
    :visible="visible"
    :width="width"
    top="0"
    center
    custom-class="dialog"
    :show-close="showClose"
    :append-to-body="appendToBody"
    destroy-on-close
    @close="handleClose"
    @closed="handleClosed"
  >
    <slot />
  </el-dialog>
</template>

<script>
export default {
    name: 'Module',
    props: {
        /**
         * 宽度
         *
         * @type  {String}
         */
        width: {
            type: String,
            default: '520px'
        },
        /**
         * 显示
         *
         * @type {Boolean}
         */
        visible: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示关闭按钮
         *
         * @type {Boolean}
         */
        showClose: {
            type: Boolean,
            default: true
        },
        /**
         * Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
         *
         * @type {Boolean}
         */
        appendToBody: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // Dialog 关闭的回调
        handleClose() {
            setTimeout(() => {
                // 关闭所有实例
                this.$message.closeAll()
            }, 1000)

            this.$emit('on-close')
        },
        // Dialog 关闭动画结束时的回调
        handleClosed() {
            this.$emit('on-closed')
        }
    }
}
</script>

<style lang="scss">

.dialog {
    border-radius: 10px;

    .el-dialog__header {
        padding: 0;
    }

    .el-dialog__headerbtn .el-dialog__close {
        font-size: 25px;
        transition: all 0.5s;
        font-family: 'iconfont' !important;
    }

    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
        color: #0083FF;
    }

    .el-icon-close:before {
        content: '\e60c';
    }

    .el-dialog__body {
        padding: 0;
    }
}
</style>
