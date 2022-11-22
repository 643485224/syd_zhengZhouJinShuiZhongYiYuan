<template>
	<div class="quick-top">
		<h2>{{ Message }}</h2>
		<ul>
			<li v-for="(item, index) in appointment" :key="index" @click="goAppointmentPage(item, index)">
				{{ item }}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		Message: {
			type: String,
		},
	},
	data() {
		return {
			appointment: ["预约挂号", "预约记录查询", "信息注册"],
		};
	},
	methods: {
		goAppointmentPage(item, index) {
			switch (index) {
				case 0:
					this.$router.push({ name: "AppointmentRegister" });
					break;
				case 1:
					this.$router.push({ name: "AppointmentCancel" });
					// this.$router.push({ name: "AppointmentQuery" });
					break;
				case 2:
					// this.$router.push({ name: "AppointmentCancel" });
					{
						let newPageUrl = this.$router.resolve({ name: "Details7" });
						window.open(newPageUrl.href);
					}
					break;
				default:
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.quick-top {
	width: 100%;
	background: #57afd5;
	padding: 5px 10px 30px;
	box-sizing: border-box;
	h2 {
		font-size: 18px;
		line-height: 40px;
		color: #fff;
	}
	ul {
		background: #fff;

		li {
			// height: 40px;
			line-height: 40px;
			text-align: center;
			// color: cornflowerblue;
			color: #005197;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 18px;
			font-weight: 600;
		}

		li:hover {
			background: #005197;
			color: #fff;
		}
	}
}
</style>
