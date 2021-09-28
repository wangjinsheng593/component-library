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

        <!-- 时间选择 -->
        <div v-else-if="item.type === 'daterange'" class="date-con">
          <!--     这个字段是自定义，是用来回显,注意不能重复-->
          <el-date-picker
            v-model="dateValue[index]"
            type="datetimerange"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :value-format="item.valueFormat|| ''"
            @change="handleDateTimerange($event,item)"
          />
        </div>

        <!-- 日期选择框 -->
        <div v-else-if="item.type === 'date'" class="date-con">
          <el-date-picker
            v-model="formData[item.key[0]]"
            type="datetime"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.holder[0]"
            :value-format="item.valueFormat|| ''"
          />
          <span> - </span>
          <el-date-picker
            v-model="formData[item.key[1]]"
            type="datetime"
            placement="bottom-end"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.holder[1]"
            :value-format="item.valueFormat|| ''"
          />
        </div>
        <!--  组合输入框-->
        <el-input
          v-else-if="item.type === 'textGroup'"
          v-model.trim="groupInputObj[index]"
          :style="{ width: item.width }"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :placeholder="item.holder"
          class="input-with-select"
          @change="handleGroupInput($event,index)"
        >
          <el-select
            slot="prepend"
            v-model="selectformData[index]"
            class="prepend-select"
            placeholder="请选择"
            @visible-change="handlePSelect($event,index,item)"
          >
            <el-option
              v-for="subItem in item.selectData"
              :key="subItem.value"
              :label="subItem.label"
              :value="subItem.value"
            />
          </el-select>
        </el-input>

        <!--组合按钮  -->
        <el-radio-group
          v-else-if="item.type === 'radioGroup'"
          v-model.trim="formData[item.key]"
          size="small"
          :disabled="item.disabled"
          @change="handleRadioGroup"
        >
          <el-radio-button
            v-for="(subItem, subIndex) in item.data"
            :key="subIndex"
            :label="subItem.value"
            :value="subItem.value"
          >
            {{ subItem.label }}{{ subItem.number?'('+subItem.number+')':'' }}
          </el-radio-button>
        </el-radio-group>

        <!-- 普通输入框 -->
        <el-input
          v-else-if="item.type === 'text'"
          v-model.trim="formData[item.key]"
          :style="{ width: item.width }"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :placeholder="item.holder"
        />
        <!-- 这里可以后续接着扩展 -->
      </el-form-item>
      <el-form-item>
        <el-button
          v-for="(item,index) in submitList"
          :key="index"
          v-loading="item.loading"
          :type="item.type"
          :size="item.small"
          :icon="item.icon"
          :disabled="item.loading"
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
            formData: {},
            // 时间
            dateValue: {},
            // 组合输入框
            groupInputObj: {},
            // 组合下拉框
            selectformData: {}

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
        // 组合RadioGroup
        handleRadioGroup(value) {
            this.$emit('handleRadioGroup', value)
        },
        // 组合输入框
        handleGroupInput(value, index, item) {
            if (!value) {
                this.groupInputObj = {}
                this.selectformData = {}
                this.formData[this.selectformData[index]] = ''
                return
            }
            this.formData[this.selectformData[index]] = value
        },
        // 下拉选择框
        handlePSelect(value, index, item) {
            if (value && this.selectformData[index]) {
                // 选择下拉框,清除输入框
                this.groupInputObj = {}
                this.formData[this.selectformData[index]] = ''
            }
        },

        // 时间选择
        handleDateTimerange(value, item) {
            if (!value) {
                // 初始化
                this.dateValue = {}
                this.formData[item.key[0]] = ''
                this.formData[item.key[1]] = ''
                return
            }
            this.formData[item.key[0]] = value[0]
            this.formData[item.key[1]] = value[1]
        },

        handleBtnList(clickName) {
            if (clickName === 'search') {
                const formData = Object.assign({}, this.params, this.formData)
                this.$emit('search', formData)
            } else if (clickName === 'reset') {
                // 重置
                this.dateValue = {}
                // 组合输入框
                this.groupInputObj = {}
                // 组合下拉框
                this.selectformData = {}
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
<style lang="scss" >
.query-form{
  .el-loading-spinner{
    margin-top: -12px;
  }
   .circular{
     width: 22px;
     height: 22px;
   }
    .prepend-select{
        .el-input {
            width: 130px;
        }

    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

}
</style>
