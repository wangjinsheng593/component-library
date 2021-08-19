<template>
  <div class="c-table">
    <!--region 表格-->
    <el-table
      id="CTable"
      ref="CTable"
      v-loading="loading"
      empty-text="暂无数据"
      :height="height!=''?height:tableHeight"
      :data="dataList"
      :stripe="options.stripe"
      :header-cell-style="{background:'#f2f2f2',color:'#909399'}"
      align="center"
      :row-style="tableRowStyle"
      @selection-change="handleSelectionChange"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;" />
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="column.id"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :sortable="column.sortable"
          :show-overflow-tooltip="column.tooltip"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column,scope.$index)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->

      <!--region 按钮操作组-->
      <el-table-column
        v-if="operates&&operates.list.length > 0"
        ref="fixedColumn"
        :label="operates.label"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <el-button
                v-if="btn.show(scope.row)"
                :key="key"
                :type="btn.type"
                :size="btn.size"
                :icon="btn.icon"
                :disabled="btn.disabled && btn.disabled(scope.$index,scope.row)"
                :plain="btn.plain"
                @click.native.prevent="btn.method(key,scope.row)"
              >{{ btn.label }}
              </el-button>
            </template>
          </div>
        </template>

      </el-table-column>
      <!--endregion-->

    </el-table>
    <!--endregion-->

  </div>
</template>
<script>
import tableHeightMixin from '@/mixins/tableHeight'
export default {
    name: 'CTable',
    components: {
        expandDom: {
            functional: true,
            props: {
                row: Object,
                render: Function,
                index: Number,
                column: {
                    type: Object,
                    default: null
                }
            },
            render: (h, ctx) => {
                const params = {
                    row: ctx.props.row,
                    index: ctx.props.index
                }
                if (ctx.props.column) params.column = ctx.props.column
                return ctx.props.render(h, params)
            }
        }
    },
    mixins: [tableHeightMixin],
    props: {
        // 数据列表
        list: {
            // prop:表头绑定的地段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
            type: Array,
            default: () => {
                return []
            }
        },
        height: {
            type: String,
            default: ''
        },

        columns: {
            // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
            type: Array,
            default: () => {
                return []
            }
        },

        // 操作按钮
        operates: {
            // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，
            // type :类型（primary / success / warning / danger / info / text），
            // show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
            type: Object,
            default: () => {
                return {
                    width: 180,
                    fixed: 'right',
                    label: '操作',
                    list: []
                }
            }
        },

        // 是否添加表格loading加载动画
        loading: {
            type: Boolean,
            default: false
        },

        // table 表格的控制参数
        options: {
            type: Object,
            default: () => {
                return {
                    stripe: true, // 是否为斑马纹 table
                    highlightCurrentRow: false, // 是否支持当前行高亮显示
                    mutiSelect: false // 是否支持列表项选中功能
                }
            }
        }

    },

    data() {
        return {
            dataList: this.list

        }
    },
    watch: {
        list: {
            deep: true,
            handler(newVal) {
                // 强制重新渲染组件
                this.$forceUpdate()
                this.dataList = newVal
            }
        }

    },
    mounted() {

    },
    methods: {
        // 多行选中
        handleSelectionChange(val) {
            this.$emit('selectionChange', val)
        },
        // 修改table tr行的背景色
        tableRowStyle({ row, rowIndex }) {}
    }
}
</script>
<style lang="scss" scoped>
// .operate-group{
//     display: flex;
//     justify-items: center;
//     align-content: center;
//     .item{
//         padding-left:5px ;

//     }

// }

</style>
