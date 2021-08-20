<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      placeholder="请输入内容"
      class="quill-editor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
      >
    </quill-editor>
  </div>
</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor'
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
export default {
    components: {
        quillEditor
    },
    props: {
        editorValue: {
            type: String,
            default: ''
        },
        editorOption: {
            type: Object,
            default: () => {
                return {
                    modules: {
                        toolbar: {
                            container: [
                            // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
                                ['bold', 'italic', 'underline', 'strike'],
                                // 引用  代码块-----['blockquote', 'code-block']
                                ['blockquote', 'code-block'],
                                // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
                                [{ header: 1 }, { header: 2 }],
                                // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
                                [{ script: 'sub' }, { script: 'super' }],
                                // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
                                [{ indent: '-1' }, { indent: '+1' }],
                                // 文本方向-----[{'direction': 'rtl'}]
                                [{ direction: 'rtl' }],
                                // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
                                [{ size: ['small', false, 'large', 'huge'] }],
                                // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
                                [{ color: [] }, { background: [] }],
                                [{ font: [] }], // 字体种类-----[{ font: [] }]
                                [{ align: [] }], // 对齐方式-----[{ align: [] }]
                                ['clean'], // 清除文本格式-----['clean']
                                ['image'] // 链接、图片、视频-----['link', 'image', 'video']
                            ]
                        }
                    }
                }
            }
        }

    },
    data() {
        return {
            content: ''
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    created() {
        this.content = this.editorValue
    },
    methods: {
        // 失去焦点事件
        onEditorBlur() {

        },
        // 获得焦点事件
        onEditorFocus() {

        },
        // 内容改变事件 富文本编辑器  文本改变时 设置字段值
        onEditorChange({ quill, html, text }) {
            this.content = html
            this.$emit('input', this.content)
        }
    }

}
</script>
<style lang="scss">
  @import '~quill/dist/quill.core.css';
  @import '~quill/dist/quill.snow.css';
  @import '~quill/dist/quill.bubble.css';
.quill-editor{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.42;
    height: 100%;
    outline: none;
    padding: 0 !important;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    word-wrap: break-word;
}
.ql-editor{
     height:300px;
}
</style>
