<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="图片上传">
              <el-upload
                class="avatar-uploader"
                action="/v1/ocr/generalBasic"
                :show-file-list="false"
                accept=".jpg,.JPG,.png,.PNG"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-form-item>  
        
      <el-form-item label="识别文本">
        <el-input v-model="form.ocr" style="height:400px;" type="textarea"></el-input>
      </el-form-item>
         <slider-pips min="0" max="100" step=5 labels values="[5]"></slider-pips>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ocr: ""
      },
      imageUrl: ''
    };
  },
  methods: {
      handleAvatarSuccess(res, file) {
          console.log(res)
          this.form.ocr="";
           this.imageUrl = URL.createObjectURL(file.raw);
          for(let item of res.datas.words_result){
             this.form.ocr+=item.words+'\n'
          }
        //  console.log(file)
      }
  },
};
</script>
<style>
.el-upload--text{
    width:100%;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
        margin:0 auto;
  }
  .el-textarea .el-textarea__inner{
      height:100%;
  }
</style>

<style lang="scss" scoped>
</style>