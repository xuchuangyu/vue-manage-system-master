<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
             <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="文章标题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者">
                            <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章类目">
                            <el-input v-model="form.category"></el-input>
                    </el-form-item>
                    <el-form-item label="文章简介">
                            <el-input v-model="form.introduction"></el-input>
                    </el-form-item>
                     <el-form-item label="文章内容">
                             <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                     </el-form-item>
             </el-form>
            <!-- <div class="plugins-tips">
                Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
                访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
            </div> -->

          
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import article from './article'
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                },
                form:{
                    title:"",
                    author:"",
                    volume:"",
                    introduction:"",
                }
            }
        },
        components: {
            quillEditor
        },
        mounted () {
            if(this.$route.path=='/article-edit'){
                this.reqlist()
            }
        },
        activated(){
            if(this.$route.path=='/article-edit'){
                this.reqlist()
            }
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.form.content = html;
            },
           async submit(){
             let datas={};
               try{
                if(this.$route.path=='/article-edit'){
                    datas=await article.update(this.form)
                }else{
                    datas=await article.create(this.form)
                }
               }catch(err){
                  if(err.error_code==0){
                        this.$message.success('提交成功！');
                         window.closeTagsPage()
                  } 
                //    if(err.){}
               }
                if(datas.success==1){
                    this.$message.success('提交成功！');
                    window.closeTagsPage()
                }
            },
           async reqlist(){
                let id=this.$route.query.id;

                let datas=await article.queryDetail(id);
                this.form=datas.datas
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>