<template>
	<div class="four_four">
		<h1>Not Found 404</h1>
		<p>
			The requested URL /404 was not found on this server.
			<a href="javascript:void(0);" @click="goBack">返回首页</a>
		</p>
	</div>
</template>
<script>
export default {
	name: "Four",
	methods: {
		goBack() {
			this.$router.push({ name: "Home" });
		},
	},
};
</script>
<style lang="scss" scoped>
.four_four {
	text-align: center;
	background-color: #ffffff;
	h1 {
		position: absolute;
		top: 40%;
		width: 100%;
	}
	p {
		position: absolute;
		top: 45%;
		width: 100%;

		a {
			font-size: 1rem;
			font-weight: bold;
		}
	}
}
</style>
