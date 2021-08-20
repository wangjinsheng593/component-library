<template>
  <div
    :id="id"
    :style="{height:height,width:width}"
  />
</template>
<script>
// 也可以使用vue-echarts和v-charts这样不需要封装echarts，大大减小代码量
// 以上两个插件都是必须在有echarts的基础上
import resize from '@/mixins/resize'
export default {
    name: 'Chart',
    mixins: [resize],
    props: {
    // class 为 当前图表的唯一标识
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '260px'
        },
        // option 为图表数据 包括呈现的方式 数据
        optionData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            chart: null

        }
    },
    // 监听数据变化 进行试试刷新
    watch: {
        optionData(n, m) {
            if (this.chart) {
                this.chart.setOption(this.optionData)
            }
        }
    },
    mounted() {
        // 防止未加载完毕 报错
        this.$nextTick(() => {
            this.initChart()
        })
    },
    // 关闭 及 删除图表
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = this.$echarts.init(document.getElementById(this.id))
            if (this.chart) {
                this.chart.setOption(this.optionData)
            }
        }

    }
}
</script>
