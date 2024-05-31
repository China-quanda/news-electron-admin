<script setup lang="ts">
import { ref ,reactive,onMounted} from 'vue'
import { useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
let images = reactive([])
let userId = ref(1)
let user_name = ref('admin')
let title = ref(route.query.id ? "修改文章" : "发布文章")
const articleCategoryList = reactive([
	{id:1,name:'娱乐'},
	{id:2,name:'军事'},
	{id:3,name:'体育'},
	{id:4,name:'音乐'}
])
// import { addArticle, editArticle, getArticleId } from "@/api/article";
// import {  getArticleCategoryList} from "@/api/articleCategory";
// onMounted(()=>{
// 	getArticleId(route.query.id)
// })
// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
console.log(FormRef);
let Form = reactive({
  id: null,
  title: "",
  content: "",
  category_id: "",
  cover_type: 1,
  status: 0,
  cover_img:''
})
const checkContent = (rule, value, callback) => {
  if (value === '<p></p>') {
    return callback(new Error('请输入文章内容1'));
  }else {
    callback()
  }
}
const Rules = reactive<FormRules>({
	title: [
	    { required: true, message: '请输入标题', trigger: 'blur' },
			{ max: 100, message: "长度最大 100 个字符", trigger: "blur" },
	  ],
	content: [
		{ validator: checkContent, trigger: 'blur' },
	    { required: true, message: '请输入文章内容', trigger: 'blur' },
	  ],
	cover_type: [
	    { required: true, message: '请选择封面类型', trigger: 'blur' },
	  ],
		category_id: [
		  { required: true, message: "请选择频道", trigger: "change" },
		],
})

// 文章频道数据
    const getArticleCategoryList=async()=> {
      // const { list } = await getArticleCategoryList();
      // articleCategoryList = list;
    }
		// 根据文章id获取文章信息
		const getArticleId=async(id) =>{
		  // Form = await getArticleId(id);
		  //  images[0] = Form.cover_img
		}
		// 根据id修改文章信息
		const editArticle=async()=> {
		  // await editArticle(route.query.id, Form);
		  // this.$message.success("修改成功");
		  setTimeout(() => {
		    router.push("/article/list");
		  }, 1000);
		}
		// 发布文章
		// const addArticle = (formEl: FormInstance | undefined) => {
		//   if (!formEl) return
		//   await formEl.validate(asyns(valid, fields) => {
		//     if (valid) {
		//       console.log('submit!')
		// 			const res = await addArticle({
		// 			  ...Form,
		// 			  user_id: userId.value,
		// 			  aut_name: user_name.value,
		// 			});
		// 			console.log(res.status === 1 ? "发布文章成功" : "文章已存入草稿");
		// 			setTimeout(() => {
		// 			  router.push("/article/list");
		// 			}, 1000);
		//     }
		//   })
		// }

		// 点击了存入草稿
		const cun=(v)=> {
		  Form.status = 0;
		  if (route.query.id) {
		    editArticle();
		  } else {
		    addArticle(v);
		  }
		}
		// 点击了发布文章
		const add=(v) =>{
		  Form.status = 1
		  if (route.query.id) {
		    editArticle();
		  } else {
		    addArticle(v);
		  }
		}
</script>
<template>
	<div class="container">
		<el-card class="box-card">
			<el-form ref="FormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
				<el-form-item label="标题" prop="title"><el-input v-model="Form.title" placeholder="请输入标题" /></el-form-item>
				<el-form-item label="内容" prop="content"><el-input v-model="Form.content" placeholder="你想输入点什么 …" /></el-form-item>
				<el-form-item label="封面" prop="cover_type">
					<el-radio-group v-model="Form.cover_type">
						<el-radio :label="0">无图</el-radio>
						<el-radio :label="1">单图</el-radio>
						<el-radio :label="3">三图</el-radio>
						<el-radio :label="10">自动</el-radio>
					</el-radio-group>
					<!-- <template v-if="form.cover_type > 0 && form.cover_type <=3">
				   <upload-cover v-for="(cover,index) in form.cover_type" :key="cover" class="upload-cover" @yunImage="yunImage(index,$event)" :cover-image="images[index]"/>
				  </template> -->
				</el-form-item>
				<el-form-item label="图片"><div class="up-img">上传图片</div></el-form-item>
				<el-form-item label="频道" prop="category_id">
					<el-select v-model="Form.category_id" placeholder="请选择频道">
						<el-option v-for="item in articleCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="addArticle(FormRef)">{{ title }}</el-button>
			<el-button type="primary" @click="cun(FormRef)">存为草稿</el-button>
		</el-card>
	</div>
</template>

<style scoped lang="scss">
.up-img {
	width: 180px;
	height: 90px;
	// text-align:;
}
</style>
