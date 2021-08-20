export default {
    created() {
    // 页面加载完毕计算高度
        this._getTableHeight()
    },
    // 挂载window.onresize事件
    mounted() {
        const _this = this
        window.onresize = () => {
            if (_this.resizeFlag) {
                clearTimeout(_this.resizeFlag)
            }
            _this.resizeFlag = setTimeout(() => {
                _this._getTableHeight()
                _this.resizeFlag = null
            }, 100)
        }
    },
    methods: {
    // 计算table高度
        _getTableHeight() {
            const tableH = 200
            const tableHeightDetil = window.innerHeight - tableH
            if (tableHeightDetil <= 340) {
                this.tableHeight = 340
            } else {
                this.tableHeight = window.innerHeight - tableH
            }
        },

        // 时间格式化函数
        formatTime: function(time) {
            if (time) {
                return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
            } else {
                return '--'
            }
        }

    },
    // 注销window.onresize事件
    beforeRouteLeave(to, from, next) {
    // 离开组件的时候触发
        window.onresize = null
        next()
    }
}
