<template>
	<div>
		<h1>身份信息</h1>
		<el-form :label-position="right" label-width="80px" :model="formLabelAlign">
			<el-form-item label="名称">
				<el-input v-model="formLabelAlign.name"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-input v-model="formLabelAlign.region"></el-input>
			</el-form-item>
			<el-form-item label="活动形式">
				<el-input v-model="formLabelAlign.type"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
};
</script>
<style lang="scss" scoped></style>
