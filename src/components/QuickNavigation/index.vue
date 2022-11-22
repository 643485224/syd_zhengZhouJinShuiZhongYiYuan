<template>
	<div class="quickNacigation">
		<div class="quick-top" v-if="keyBoolen">
			<h2>{{ bannerText }}</h2>
			<ul>
				<li v-for="(item, index) in bannerList" :key="index" @click="jumpPage(item, index)">
					{{ item }}
				</li>
			</ul>
		</div>
		<div class="h20"></div>
		<div class="quick-bottom">
			<h2>快速服务导航</h2>
			<ul>
				<li @click="newpage(85, 5, '科室导航')">
					<img src="../../assets/imgs/DepartmentNavigation.png" alt="科室导航" width="77" height="77" />
				</li>
				<li @click="newpage(81, 1, '预约挂号')">
					<img src="../../assets/imgs/AppointmentRegister.png" alt="预约挂号" width="77" height="77" />
				</li>
				<li @click="newpage(80, 0, '门诊排班')">
					<img src="../../assets/imgs/OutpatientScheduling.png" alt="门诊排班" width="77" height="77" />
				</li>
				<li @click="newpage(82, 2, '就诊流程')">
					<img src="../../assets/imgs/TreatmentProcess.png" alt="就诊流程" width="77" height="77" />
				</li>
				<li @click="newpage(84, 4, '医保指南')">
					<img src="../../assets/imgs/YBGuide.png" alt="医保指南" width="77" height="77" />
				</li>
				<li @click="newpage(83, 3, '交通路线')">
					<img src="../../assets/imgs/TrafficGuide.png" alt="交通路线" width="77" height="77" />
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "QuickNavigation",
	props: {
		keyBoolen: {
			type: Boolean,
		},
	},
	data() {
		return {
			quickName: "患者服务",
			quickListName: ["门诊排班", "预约挂号", "就诊流程", "交通路线", "医保服务", "咨询电话"],
		};
	},
	created() {
		console.log(this.key);
	},
	methods: {
		throttle(fn, delay) {
			// 记录上一次触发的时间
			var lasttime = 0;
			// 通过闭包的方式使用lasttime变量，每次都是上次的时间
			return function() {
				//
				var nowtime = Date.now();
				if (nowtime - lasttime > delay) {
					// 修正this函数问题
					fn.call(this);
					// 同步时间
					lasttime = nowtime;
				}
			};
		},
		//bannerType  1-导航栏 2-医院概况 3-医院动态 4-党群工作 5- 专家团队 6-科研教学 7-健康管理 8-院务公开 9-互联网医院 10-药品查询 11精彩专题 12首页患者服务
		jumpPage(item, index) {
			console.log(item, index);
			this.$store.commit("banner", item);
			switch (this.bannerType) {
				case 1:
					// console.log(111)
					break;
				case 2:
					this.$router.push({ name: "HospitalOverview", query: { id: index } });
					break;
				case 3:
					this.$router.push({ name: "HospitalNews", query: { id: index } });
					break;
				case 4:
					this.$router.push({ name: "PartyMassWork", query: { id: index } });
					break;
				case 5:
					this.$router.push({ name: "TeamExperts", query: { id: index } });
					break;
				case 6:
					this.$router.push({ name: "ResearchTeaching", query: { id: index } });
					break;
				case 7:
					this.$router.push({ name: "HealthControl", query: { id: index } });
					break;
				case 8:
					this.$router.push({ name: "HospitalAffairs", query: { id: index } });
					break;
				case 9:
					this.$router.push({ name: "InternetHospital", query: { id: index } });
					break;
				case 10:
					this.$router.push({ name: "Convenient", query: { id: index } });
					break;
				case 11:
					this.$router.push({ name: "WonderfulTopic", query: { id: index, data: item } });
					break;
				case 12:
					this.$router.push({ name: "PatientServices", query: { id: index, data: item } });
					break;
				case 13:
					this.$router.push({ name: "EachHospitalArea", query: { id: index, data: item } });
					break;
				default:
					break;
			}
		},
		newpage(item, index, val) {
			console.log(item, index, "123123");
			if (index == 5) {
				this.$store.commit("banner", "科室导航");
				this.$router.push({ name: "DepartmentNavigation" });
			} else {
				this.$store.commit("banner", this.quickListName[index]);
				this.$store.commit("bannerType", 12);
				this.$store.commit("bannerText", this.quickName);
				this.$store.commit("bannerList", this.quickListName);
				this.$router.push({ name: "PatientServices", query: { id: index, type: 1, data: val } });
			}
		},
	},
	computed: {
		...mapState(["bannerType", "bannerText", "bannerList"]),
	},
};
</script>
<style lang="scss" scoped>
.quickNacigation {
	// width: 300px;

	h2 {
		font-size: 18px;
		line-height: 40px;
		color: #fff;
	}

	.quick-top {
		width: 100%;
		// background: cornflowerblue;
		background: #57afd5;
		padding: 5px 10px 30px;
		box-sizing: border-box;

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

	.quick-bottom {
		width: 100%;
		padding: 5px 10px 30px;
		box-sizing: border-box;
		// background: cornflowerblue;
		background: #57afd5;
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			background: #f1fafe;

			li {
				width: 33.333%;
				height: 90px;
				display: flex;
				justify-content: center;
				align-items: center;

				img:hover {
					margin-top: 10px;
				}
			}
		}
	}
}
</style>
