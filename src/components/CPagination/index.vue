<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
    name: 'Pagination',
    props: {
    // 总条目数
        total: {
            required: true,
            type: Number
        },
        // 每页显示条目个数
        limit: {
            type: Number,
            default: 10
        },
        // 当前页数
        page: {
            type: Number,
            default: 1
        },

        // 每页显示个数选择器的选项设置
        pageSizes: {
            type: Array,
            default() {
                return [5, 10, 15, 20, 30, 40, 50, 80, 100]
            }
        },
        // 组件布局，子组件名用逗号分隔
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        // 分页按钮背景色设置
        background: {
            type: Boolean,
            default: true
        },
        // 分页之后是否自动滚动到顶部
        autoScroll: {
            type: Boolean,
            default: true
        },
        // 是否隐藏
        hidden: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, limit: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, limit: this.pageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
