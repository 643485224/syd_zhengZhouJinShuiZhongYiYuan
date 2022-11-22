<template>
	<div class="home">
		<div class="logo">
			<Logo></Logo>
		</div>
		<Quick></Quick>
		<JCZT></JCZT>
		<DBDH></DBDH>
	</div>
</template>

<script>
//网站首页
import Logo from "../components/logo/index.vue";
import Quick from "../components/quickMenus/index.vue";
import JCZT from "../components/jczt/index.vue";
import DBDH from "../components/dbdh/index.vue";
export default {
	name: "Home",
	components: {
		Logo,
		Quick,
		JCZT,
		DBDH,
	},
};
</script>
<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;

	.logo {
		// width: 1400px;
		margin: 0 auto;
	}
}
</style>
