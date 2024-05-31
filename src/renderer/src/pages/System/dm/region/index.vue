<script setup lang="ts">
import { ref ,reactive} from 'vue'
import areaList from './area.ts';
// 表格数据
const tableData = reactive(areaList)
</script>
<template>
	<div class="container">
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<!-- <div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
					<el-button icon="Plus" type="primary" plain>新增</el-button>
					<el-button icon="EditPen" type="success" plain>修改</el-button>
					<el-button icon="Delete" type="danger" plain :disabled="delBtnDisabled" @click="del([])">删除</el-button>
					<el-button icon="Bottom" type="info" plain>导出</el-button>
				</div>
				<div>
					<el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top"><el-button icon="Search" circle></el-button></el-tooltip>
					<el-tooltip class="box-item" effect="light" content="刷新" placement="top"><el-button icon="Refresh" circle></el-button></el-tooltip>
				</div>
			</div> -->
			<el-table :data="tableData" row-key="children" lazy height="1000" border style="width: 100%" >
				<el-table-column prop="id" label="编号" width="200" />
				<el-table-column prop="name" label="地名" />
			</el-table>
		</el-card>
	</div>
</template>

<style scoped lang="scss"></style>
