<template>
  <div class="query-form">
    <el-form
      ref="ruleForm"
      :inline="true"
      :label-position="labelPosition"
      size="mini"
    >
      <el-form-item
        v-for="(item, index) in formItemData"
        :key="index"
        class="form-item"
        :label="item.label"
      >
        <!-- 下拉选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="formData[item.key]"
          :disabled="item.disabled"
          :placeholder="item.holder"
          :clearable="item.clearable"
          @focus="focus"
        >
          <el-option
            v-for="(cItem, cIndex) in item.data"
            :key="cIndex"
            :label="cItem.label"
            :value="cItem.value"
          >
            {{ cItem.label }}
          </el-option>
        </el-select>

        <!-- 日期选择框 -->
        <div v-else-if="item.type === 'date'" class="date-con">
          <el-date-picker
            v-model="formData[item.key[0]]"
            type="date"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.holder[0]"
          />
          <span> - </span>
          <el-date-picker
            v-model="formData[item.key[1]]"
            type="date"
            placement="bottom-end"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.holder[1]"
          />
        </div>

        <!-- 普通输入框 -->
        <el-input
          v-else-if="item.type === 'text'"
          v-model.trim="formData[item.key]"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :placeholder="item.holder"
        />
        <!-- 这里可以后续接着扩展 -->
      </el-form-item>
      <el-form-item>
        <el-button
          v-for="item in submitList"
          :key="item.type"
          :type="item.type"
          :size="item.small"
          :icon="item.icon"
          @click.stop="handleBtnList(item.clickName)"
        >
          {{ item.text }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    props: {
        labelPosition: {
            type: String,
            default: 'left'
        },
        // 列数据
        formItemData: {
            type: Array,
            default() {
                return []
            }

        },

        // 按钮
        submitList: {
            type: Array,
            default() {
                return []
            }

        },

        // 表单默认数据
        params: {
            type: Object,
            default() {
                return {}
            }
        },
        // 是否在加载中
        loading: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            // 查询表单数据
            formData: {}

        }
    },
    watch: {
        params: {
            handler(newVal, oldVal) {
                this.formData = Object.assign({}, newVal)
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.formData = Object.assign({}, this.params)
    },
    methods: {
        handleBtnList(clickName) {
            if (clickName === 'search') {
                const formData = Object.assign({}, this.params, this.formData)
                this.$emit('search', formData)
            } else if (clickName === 'reset') {
                // 重置
                this.$emit('reset', this.formData)
            } else if (clickName === 'add') {
                // 新增
                this.$emit('add')
            } else if (clickName === 'edit') {
                // 编辑
                this.$emit('edit', this.formData)
            } else if (clickName === 'update') {
                // 更新
                this.$emit('update', this.formData)
            } else if (clickName === 'frost') {
                // 冻结
                this.$emit('frost', this.formData)
            }
        },
        focus() {
            this.$emit('focusSelect')
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
</script>
