<template>
  <div class="upload-cover" @click="dialogVisible = true">
    <div class="cover-wrap">
      <el-image :src="url" fit="contain">
        <div slot="error" class="image-slot">  <i class="el-icon-plus"> 上传图片</i>  </div>
      </el-image>
    </div>
<!-- 上传文件对话框 -->
    <el-dialog
  title="上传图片"
  :visible.sync="dialogVisible"
  width="30%"
  append-to-body
  :before-close="handleClose">
    <el-upload
    class="upload-demo"
    drag
    :headers="uploadHeaders"
    name="image"
      :limit=1
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      list-type="picture"
      :multiple="false"
    action="http://127.0.0.1:7001/api/admin/upload/"
   >
    <!-- :before-upload="beforeAvatarUpload" -->
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="btnOk">确 定</el-button>
  </span>
</el-dialog>
<!-- 预览图片对话框 -->
<el-dialog  :visible.sync="PictureCardPreview">
  <el-image 
  v-show="srcList.length"
    style="width: 100%; height: 100:auto;"
    :src="url" 
    :preview-src-list="srcList">
  </el-image >
</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken} from '@/utils/auth'
  export default {
    name: 'UploadCover',
    components: {},
    props:['cover-image'],
    data() {
      return {
        // childCoverImage:this.coverImage,
        // 设置请求头
        uploadHeaders:{
          Authorization:`Bearer ${getToken()}`
        },
        // 上传图片对话框状态
        dialogVisible: false,
        // 预览图片对话框状态
        PictureCardPreview: false,
        // 图片链接地址
        url:this.coverImage ? this.coverImage: '',
        // 大图预览地址
        srcList: [],
        // 对话框列表图片
        fileList: []
      };
    },
    computed: {
    ...mapGetters(["token"]),
  },
  watch: {
            coverImage(newVal){
                this.url = newVal;
            }
        },
    methods: {
      btnOk(){
        // 如果没有选择文件的话 提示
        if(!this.url) {
          this.$message.info("请选择文件")
        }else{
          this.dialogVisible = !this.dialogVisible
        }
      },
      // 点击关闭对话框
      handleClose(done) {
         done();
        //  this.url = '';
         this.srcList = [];
      },
      // 移除图片的钩子
       handleRemove(file, fileList) {
         this.$emit('yunImage','')
        this.url ='';
         this.srcList=[]
      },
      // 点击预览图片的钩子 会弹出对话框预览
       handlePictureCardPreview(file) {
         this.url = file.url;
         this.srcList.push(file.url)
        this.PictureCardPreview = true;
      },
      // 上传成功后的钩子
      uploadSuccess(response, file, fileList){
        // this.yunImage = response.data.image;
        this.$emit('yunImage',response.data.image)
        this.url = file.url;
         this.srcList.push(file.url)
      },
      // 上传失败钩子
      uploadError(){
        this.$message.error('上传失败')
      },
      // 限制上传文件个数
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 移除图片提示
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 限制上传图片大小
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }, 
  };
</script>
<style lang="scss" scoped>

.upload-cover{
  padding: 10px 10px 0px 0px;
  width: 160px;
}
.cover-wrap:hover{
  cursor: pointer;
  background: #fafafa;
}
.cover-wrap{
  box-sizing: border-box;
  width: 160px;
  height: 90px;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
  ::v-deep .el-image{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
  }
  ::v-deep.image-slot{
 text-align: center;
    color: rgb(187, 178, 178);
    margin-top: 15%;
  }

  
  
  
}
</style>