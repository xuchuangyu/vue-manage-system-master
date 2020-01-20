<template>
        <froala :tag="'textarea'" :config="froalaConfig" ></froala>
</template>

<script>
export default {
    data() {
        return {
            //More -> https://www.froala.com/wysiwyg-editor/docs/options

            froalaConfig: {

                // theme: "dark",//主题

                placeholder: '请填写内容',

                language: 'zh_cn', //国际化
                height:"400",
                quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'], //快速插入项

                // toolbarVisibleWithoutSelection: true,//是否开启 不选中模式

                // disableRightClick: true,//是否屏蔽右击

                colorsHEXInput: false, //关闭16进制色值

                toolbarSticky: true, //操作栏是否自动吸顶

                zIndex: 99999,

                events: {
                    'froalaEditor.initialized': function(e,editor) {
                        console.log('initialized');
                        this.editor=editor
                    },
                    "froalaEditor.contentChanged":(e,editor)=>{
                        console.log(editor.html.get(true))
                        this.$emit("on-change",editor.html.get(true))
                    },
                    'html.beforeGet': function (e,editor) {
                        // Do something here.
                        // this is the editor instance.

                        console.log(editor);
                     }
                }
            },

            froalaContent: '<p>www</p>' //默认测试文本
        };
    },
    methods: {
        setHtml(html) {
            if(this.editor){
                this.editor.html.set(html);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>