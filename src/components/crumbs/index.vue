<template>
	<h2 class="flex-space-between-center">
		<span>{{ $store.state.banner }}</span>
		<span>
			您的当前位置：<span @click="goBack">首页</span>>>><span v-if="ShowBoolen">{{ $store.state.bannerText }}>>></span>{{ $store.state.banner }}
		</span>
	</h2>
</template>

<script>
export default {
	name: "Crumbs",
	props: {
		ShowBoolen: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		goBack() {
			this.$router.push({ name: "Home" });
		},
	},
};
</script>

<style lang="scss" scoped>
h2 {
	font-size: 18px;
	height: 40px;
	margin-bottom: 10px;
	border-bottom: #01b9b7 3px solid;
	span:nth-child(1) {
		// color: #01b9b7;
		color: #00b3b1;
		// font-size: 36px;
	}
	span:nth-child(2) {
		font-size: 12px;
		// color: #808080;
		color: #555555;

		span:hover {
			cursor: pointer;
		}
	}
}
</style>
