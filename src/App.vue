<template>
	<div id="app">
		<router-view></router-view>
		<Popup2 v-if="isNotFind" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import Popup2 from "./components/Popup/index2.vue";
export default {
	data() {
		return {
			showBoolen1: true,
			showBoolen2: true,
			daohang0: ["网站首页", "医院概况", "医院动态", "党群工作", "专家团队", "科研教学", "院务公开", "健康管理", "互联网医院"],
			daohang1: [],
			daohang2: ["医院简介", "医院文化", "医院荣誉", "医院大事记"],
			// "卫生城市复审"
			daohang3: ["新闻资讯", "最新公告"],
			daohang4: ["党建园地", "网上党课", "廉政教育", "职工之家", "社会活动"],
			daohang5: [],
			daohang6: ["科研工作", "学术交流", "教学工作"],
			daohang7: ["金医科普", "专题讲座"],
			daohang8: ["招标公告", "人才招聘", "金医药讯", "医院制度", "普法园地"],
			daohang9: ["医养结合", "志愿服务", "公益慈善", "影视天地"],
		};
	},
	computed: {
		isNotFind() {
			return this.$route.name && this.$route.name !== "Four" ? true : false;
		},
		...mapState(["banner", "bannerList"]),
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
	watch: {
		$route(to) {
			console.log(to.path, "to.path");
			if (to.path == "/HospitalOverview") {
				// this.$store.commit("banner", item);
				// 	this.$store.commit("bannerType", type);
				// 	this.$store.commit("bannerText", this.daohang0[type - 1]);
				// 	this.$store.commit("bannerList", this.daohang2);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang2[index]);
				this.$store.commit("bannerText", "医院概况");
				this.$store.commit("bannerList", this.daohang2);
			} else if (to.path == "/HospitalNews") {
				// let index = to.fullPath.slice(to.fullPath.length - 1);
				// this.$store.commit("banner", this.bannerList[index]);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang3[index]);
				this.$store.commit("bannerText", "医院动态");
				this.$store.commit("bannerList", this.daohang3);
			} else if (to.path == "/PartyMassWork") {
				// let index = to.fullPath.slice(to.fullPath.length - 1);
				// this.$store.commit("banner", this.bannerList[index]);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang4[index]);
				this.$store.commit("bannerText", "党群工作");
				this.$store.commit("bannerList", this.daohang4);
			} else if (to.path == "/ResearchTeaching") {
				// let index = to.fullPath.slice(to.fullPath.length - 1);
				// this.$store.commit("banner", this.bannerList[index]);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang6[index]);
				this.$store.commit("bannerText", "科研教学");
				this.$store.commit("bannerList", this.daohang6);
			} else if (to.path == "/HealthControl") {
				// let index = to.fullPath.slice(to.fullPath.length - 1);
				// this.$store.commit("banner", this.bannerList[index]);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang7[index]);
				this.$store.commit("bannerText", "健康管理");
				this.$store.commit("bannerList", this.daohang7);
			} else if (to.path == "/HospitalAffairs") {
				// let index = to.fullPath.slice(to.fullPath.length - 1);
				// this.$store.commit("banner", this.bannerList[index]);
				let index = to.fullPath.slice(to.fullPath.length - 1);
				this.$store.commit("banner", this.daohang8[index]);
				this.$store.commit("bannerText", "院务公开");
				this.$store.commit("bannerList", this.daohang8);
			} else if (to.path == "/TeamExperts") {
				this.$store.commit("banner", "专家团队");
			}
			//  else if (to.path == "/WonderfulTopic") {
			// 	// let index = to.fullPath.slice(to.fullPath.length - 1);
			// 	// this.$store.commit("banner", this.bannerList[index]);
			// 	let index = to.fullPath.slice(to.fullPath.length - 1);
			// 	this.$store.commit("banner", this.daohang9[index]);
			// 	this.$store.commit("bannerText", "专题专栏");
			// 	this.$store.commit("bannerList", this.daohang9);
			// }
		},
	},

	components: {
		Popup2,
	},
};
</script>
<style lang="scss" scoped>
#app {
	min-width: 1400px;
	width: 100%;
	height: 100%;
	background-image: url("./assets/imgs/homebg.jpg");

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
				object-fit: cover;
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
				object-fit: cover;
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
}
</style>
