<template>
  <div class="c-table">
    <!--region 表格-->
    <el-table
      id="CTable"
      ref="selectionTable"
      v-loading="loading"
      empty-text="暂无数据"
      :height="height"
      :data="dataList"
      :stripe="options.stripe"
      :header-cell-style="{background:'#f2f2f2',color:'#909399'}"
      align="center"
      :row-style="tableRowStyle"
      :highlight-current-row="options.highlightCurrentRow"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
    >
      <!--region 选择框-->
      <el-table-column
        v-if="options.singleSelect"
        width="55"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked" />
        </template>
      </el-table-column>
      <el-table-column v-else-if="options.mutiSelect" type="selection" width="55" />
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
                <span> {{ scope.row[column.prop] }}</span>
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
// import tableHeightMixin from '@/mixins/tableHeight'
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
    // mixins: [tableHeightMixin],
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
            default: null
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
                    // 单选和多选只能开启一个
                    mutiSelect: false, // 是否支持列表项选中功能--多选
                    singleSelect: false // 是否支持列表项选中功能--单选
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
    created() {

    },
    mounted() {
    },
    methods: {

        // 表格行单击点事件
        rowClick(row, column, event) {
            this.$refs.selectionTable.toggleRowSelection(row)
        },

        // 单行选中
        handleCurrentChange(row) {
            this.$emit('currentChange', row)
        },

        // 多行选中
        handleSelectionChange(row) {
            this.$emit('selectionChange', row)
        },
        // 修改table tr行的背景色
        tableRowStyle({ row, rowIndex }) {}
    }
}
</script>
<style lang="scss" scoped>
.tooltip-note{
  display:-webkit-box;
  text-overflow:ellipsis;
  overflow:hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient:vertical;
}
</style>
