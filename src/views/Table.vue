<template>
  <div class="app-bg">
    <div class="app-bg-wrap">
      <div class="header">
        <c-query-form
          :submit-list="submitList"
          :form-item-data="formItemData"
          :params="queryForm"
          :loading="loading"
          @search="search"
          @reset="queryReset"
          @add="goBack"
        />
      </div>
      <div>
        <c-table
          :loading="loading"
          :list="tableList"
          :columns="columns"
          :operates="operates"
        />
        <pagination
          v-show="paramsPage.total > 10"
          :total="paramsPage.total"
          :page.sync="paramsPage.pageNum"
          :limit.sync="paramsPage.pageSize"
          @pagination="handlePagination"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { commonMixins } from '@/mixins/common'
export default {
    mixins: [commonMixins],
    data() {
        return {
            // 加载
            loading: false,
            // 表格的数据
            tableList: [
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                },
                {
                    userId: '110',
                    rate: '3',
                    advice: '下拉框数据下拉框数据',
                    createTime: '2021-08-20 11:53'
                }
            ],
            /**
               * {
               *  disabled: 是否可用,
               *  key: 键值
               *  holder: 提示文字
               *  type: 类型 text select date city 4种
               *  clearable: 是否有清除按钮 仅支持type为select date
               *  data: 下拉框数据
               * }
            */
            // 搜索表单点击按钮
            // 搜索表单点击按钮
            submitList: [
                {
                    type: '',
                    text: '重置',
                    size: 'small',
                    clickName: 'reset'
                },
                {
                    type: 'primary',
                    text: '查询',
                    icon: 'el-icon-search',
                    size: 'small',
                    clickName: 'search'
                },
                {
                    type: 'info',
                    text: '返回',
                    size: 'small',
                    clickName: 'add'
                }
            ],

            // 搜索表单的列表
            formItemData: [
                {
                    type: 'text',
                    key: 'userId',
                    label: '客户ID',
                    clearable: true,
                    holder: '请输入客户ID'
                },
                {
                    type: 'text',
                    key: 'rate',
                    clearable: true,
                    label: '评分',
                    holder: '请输入反馈评分'
                },
                {
                    type: 'select',
                    key: 'cardTypeId',
                    label: '类型',
                    clearable: true,
                    holder: '请选择类型',
                    data: []
                },
                {
                    type: 'date',
                    key: ['startTime', 'endTime'],
                    label: '反馈起止日期',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    holder: ['开始日期', '结束日期']
                }
            ],
            // 搜索表单
            queryForm: {
            },
            // 表格头控制数据
            columns: [
                {
                    prop: '',
                    label: '序号',
                    align: 'center',
                    // width: '100',
                    formatter: (row, column, index) => {
                        return this.getIndex(index)
                    }
                },
                {
                    prop: 'userId',
                    label: '客户ID',
                    align: 'center'
                },
                {
                    prop: 'rate',
                    label: '评分',
                    align: 'center'
                },
                {
                    prop: 'advice',
                    label: '反馈内容',
                    align: 'center',
                    tooltip: true
                },
                {
                    prop: 'createTime',
                    label: '创建时间',
                    align: 'center'
                    // formatter: (row) => {
                    //     return this.formatTime(row.createTime)
                    // }
                }

            ],
            // 表格操作按钮组
            operates: {
                width: 200,
                fixed: 'right',
                label: '操作',
                list: [
                    {
                        label: '反馈详情',
                        type: 'info',
                        show: (row) => true,
                        size: 'small',
                        plain: false,
                        disabled: false,
                        method: (index, row) => {
                            this.handleCheck(index, row)
                        }
                    }
                ]
            },
            // 分页数据
            paramsPage: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        // 初始化
        getList() {},
        goBack() {
            this.$router.push({ path: '/' })
        },
        // 搜素
        search() {},
        // 搜索表单重置
        queryReset() {
            // this.form={}

        },
        // 反馈详情
        handleChec() {

        },
        // 分页点击回调
        handlePagination(val) {
            this.paramsPage.pageNum = val.page
            this.paramsPage.pageSize = val.limit
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped></style>
