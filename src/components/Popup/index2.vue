<template>
	<div>
		<el-backtop :bottom="100"> </el-backtop>
		<ul class="prompt_box flex-wrap-space-evenly-center" v-if="showBoolen1">
			<i class="el-icon-error " @click="showOff(1)"></i>
			<li>
				<img src="../../assets/imgs/service.jpg" alt="微信服务号" width="150" height="120" />
				<p>扫码关注微信服务号</p>
			</li>
			<li>
				<img src="../../assets/imgs/subscribe.jpg" alt="微信订阅号" width="150" height="120" />
				<p>扫码关注微信订阅号</p>
			</li>
		</ul>
		<ul class="prompt_box2 flex-wrap-space-evenly-center" v-if="showBoolen2">
			<i class="el-icon-error " @click="showOff(2)"></i>
			<li>
				<img src="../../assets/imgs/90733aa5c8008fde90bdc33e0b9b5e1.jpg" alt="" width="160" height="120" @click="goHospitalNews" />
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			showBoolen1: true,
			showBoolen2: true,
			// "卫生城市复审"
			daohang3: ["新闻资讯", "最新公告"],
		};
	},
	created() {},
	methods: {
		showOff(type) {
			switch (type) {
				case 1:
					this.showBoolen1 = false;
					break;
				case 2:
					this.showBoolen2 = false;
					break;
				default:
					console.log("失效的操作");
					break;
			}
		},
		goHospitalNews() {
			this.$store.commit("banner", "新闻资讯");
			this.$store.commit("bannerType", 3);
			this.$store.commit("bannerText", "医院动态");
			this.$store.commit("bannerList", this.daohang3);
			this.$router.push({ name: "HospitalNews", query: { id: 0 } });
		},
	},
};
</script>
<style lang="scss" scoped>
.prompt_box {
	position: fixed;
	left: 0px;
	bottom: 20%;
	z-index: 9999;
	width: 190px;
	height: 350px;
	background: #005197;
	border-radius: 0px 10px 10px 0px;
	transition: 2s;
	i {
		position: absolute;
		right: -10px;
		top: -5px;
		font-size: 35px;
		color: #fff;
		cursor: pointer;
	}

	li {
		img {
			// object-fit: cover;
			object-fit: contain;
		}
		p {
			text-align: center;
			color: #fff;
		}
	}
}
.prompt_box2 {
	position: fixed;
	right: 0px;
	top: 25%;
	z-index: 9999;
	width: 250px;
	height: 230px;
	padding: 5px;
	box-sizing: border-box;

	border-radius: 10px 0px 0px 10px;
	i {
		position: absolute;
		left: -3px;
		top: 24px;
		font-size: 35px;
		color: #57afd5;

		cursor: pointer;
	}
	li {
		img {
			width: 100%;
			height: 100%;
			margin: 25px 0px;
			// object-fit: cover;
			object-fit: contain;
			cursor: pointer;
		}
		p {
			font-size: 18px;
			font-weight: 600;
			text-align: center;
			color: #ed801e;
			cursor: pointer;
		}
	}
}
</style>
