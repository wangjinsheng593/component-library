<!-- ##使用

<template>
  <div class="table-page">
    <!--region table 表格-->
    <i-table
    :list="list"
    :options="options"
    :columns="columns"
    :operates="operates"
    @handleSelectionChange="handleSelectionChange"
  >
    </i-table>
    <!--endregion-->
  </div>
</template>
<script>
  import iTable from '../../components/Table/Index'

  export default {
    components: {iTable},
    data () {
      return {
        list: [],
        // 需要展示的列
        columns: [
          {
            prop: 'id',
            label: '编号',
            align: 'center',
            width: 60
          },
          {
            prop: 'title',
            label: '标题',
            align: 'center',
            width: 400,
            formatter: (row, column, cellValue) => {
              return `<span style="white-space: nowrap;color: dodgerblue;">${row.title}</span>`
            }
          },
          {
            prop: 'state',
            label: '状态',
            align: 'center',
            width: '160',
            render: (h, params) => {
              return h('el-tag', {
                props: {type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'} // 组件的props
              }, params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
            }
          },
          {
            prop: 'author',
            label: '作者',
            align: 'center',
            width: 120
          },
          {
            prop: 'phone',
            label: '联系方式',
            align: 'center',
            width: 160
          },
          {
            prop: 'email',
            label: '邮箱',
            align: 'center',
            width: 240
          },
          {
            prop: 'createDate',
            label: '发布时间',
            align: 'center',
            width: 180,
            formatter: (row, column, cellValue) => {
              return this.$utils.Common.dateFormat(row.createDate, 'YYYY年MM月DD日 hh:mm')
            }
          }
        ],
        operates: {
          width: 200,
          fixed: 'right',
          list: [
            {
              label: '编辑',
              type: 'warning',
              show: : (index, row) => {
                retuen true
              },
              icon: 'el-icon-edit',
              plain: true,
              disabled: false,
              method: (index, row) => {
                this.handleEdit(index, row)
              }
            },
            {
              label: '删除',
              type: 'danger',
              icon: 'el-icon-delete',
              show: true,
              plain: false,
              disabled: (index, row) => {
                retuen false
              },
              method: (index, row) => {
                this.handleDel(index, row)
              }
            }
          ]
        }, // 操作按钮组
        pagination: {
          pageIndex: 1,
          pageSize: 20
        }, // 分页参数
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: true // 是否支持列表项选中功能
        } // table 的参数
      }
    },
    components: {
      expandDom: {
        props: {
          column: {
           required: true
          },
          row: {
            required: true
          }
        },
        render (h) {
          return h('div', {}, ([this.column.render(this.row, this.column)]))
        }
     }
   },
    mounted () {
    },
    methods: {


      // 选中行
      handleSelectionChange (val) {
        console.log('val:', val)
      },
      // 编辑
      handleEdit (index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      },
      // 删除
      handleDel (index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      }
    }
  }
</script> -->
