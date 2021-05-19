<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>froala编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="container">
            <div class="plugins-tips">
                mavonEditor：基于Vue的froalaEditor编辑器。
                访问地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">froalaEditor</a>
            </div>
        <Editor ref="froalaEditor" @on-change="changeContent" v-model="formData.content"></Editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import Editor from '../common/editor.vue'
    export default {
        name:'dialognews',
        data() {
            return {
                formData: {
                    content:""
                }
            }
        },
        components: {
            Editor,
        },
        mounted () {
            this.init()
        },
        methods: {
            init() {
                this.$nextTick(()=>{
                    this.$refs.froalaEditor.setHtml(this.formData.content)
                })
            },
            changeContent(html){
                this.formData.content=html
            },
            submit(){
                console.log(this.formData.content)
            }
        },
    }
</script>

<style scoped>
.editor-btn{
    margin-top:20px;
}
</style>