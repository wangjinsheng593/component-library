export const commonMixins = {
    methods: {
    // 重置分页
        resetPage() {
            this.paramsPage = {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        },
        // 表格序号--使用此方法必须要有分页paramsPage
        getIndex($index) {
            return (
                (this.paramsPage.pageNum - 1) * this.paramsPage.pageSize + $index + 1
            )
        },

        // 状态转换
        matchStatus(status, list) {
            let value = ''
            list.forEach((v) => {
                if (status === v.status) {
                    value = v.value
                }
            })
            return value
        },

        // 格式化时间函数
        formatTime: function(time) {
            if (time) {
                return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
            } else {
                return '--'
            }
        }
    }
}
