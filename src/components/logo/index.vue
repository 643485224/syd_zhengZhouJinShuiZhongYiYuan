<template>
	<div class="yeMianHead">
		<div class="logo flex-space-evenly-center">
			<div class="logo-left">
				<!-- <img src="../../assets/imgs/logo.png" alt="" /> -->
				<!-- <img src="../../assets/imgs/3ad93eaeb8bbeb0b836f0d61a36e0b5.png" alt="" /> -->
				<img src="../../assets/imgs/f5ab25765b8b82cd396239567a901a6.png" alt="" />
			</div>
			<div class="logo-center">
				<!-- <img src="../../assets/imgs/logo1.png" alt="" /> -->
				<img src="../../assets/imgs/6bfff99cf5481727210e6c61cf9a831.png" alt="" />
			</div>
		</div>
		<nav class="nav nav3">
			<ul>
				<li v-for="(item, index) in daohang0" :key="index">
					<a href="javascript:void(0)" @click="jumpPage(item, index, 1)" :style="index == 0 ? ' background: #005197;' : ''">
						{{ item }}
					</a>
					<ul v-if="index == 1">
						<li v-for="(item, i) in daohang2" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 2)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 2">
						<li v-for="(item, i) in daohang3" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 3)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 3">
						<li v-for="(item, i) in daohang4" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 4)">
								{{ item }}
							</a>
						</li>
					</ul>
					<!-- style="width:270px;display:flex;justify-content: space-between;" -->
					<!-- style="width:135px;" -->
					<ul v-if="index == 4">
						<li v-for="(items, i) in daohang5" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(items, i, 5)">
								{{ items.subjectName }}
								<!-- {{ items }} -->
							</a>
						</li>
					</ul>

					<ul v-if="index == 5">
						<li v-for="(item, i) in daohang6" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 6)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 6">
						<li v-for="(item, i) in daohang8" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 8)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 7">
						<li v-for="(item, i) in daohang7" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 7)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 8">
						<li v-for="(item, i) in daohang9" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 9)">
								{{ item }}
							</a>
						</li>
					</ul>

					<ul v-if="index == 9">
						<li v-for="(item, i) in daohang10" :key="i">
							<a href="javascript:void(0)" @click="jumpPage(item, i, 10)">
								{{ item }}
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div class="h20"></div>
	</div>
</template>

<script>
import WebApi from "../../webapi/modules/webapi";

export default {
	name: "Logo",
	data() {
		return {
			daohang0: ["????????????", "????????????", "????????????", "????????????", "????????????", "????????????", "????????????", "????????????", "???????????????", "????????????"],
			daohang1: [],
			daohang2: ["????????????", "????????????", "????????????", "???????????????"],
			// "??????????????????"
			daohang3: ["????????????", "????????????"],
			daohang4: ["????????????", "????????????", "????????????", "????????????", "????????????"],
			// "??????", "??????", "?????????", "??????", "?????????", "?????????", "????????????"
			daohang5: [],
			daohang6: ["????????????", "????????????", "????????????"],
			daohang7: ["????????????", "????????????"],
			daohang8: ["????????????", "????????????", "????????????", "????????????", "????????????"],
			daohang9: [],
			daohang10: ["????????????", "??????????????????", "????????????"],
		};
	},
	created() {
		this.query2(); //??????????????????
	},
	methods: {
		//type  1-????????? 2-???????????? 3-???????????? 4-???????????? 5- ???????????? 6-???????????? 7-???????????? 8-???????????? 9-???????????????
		jumpPage(item, index, type) {
			console.log(item);
			console.log(`???????????????--${item}--`, `???????????????--${index}--`, `???????????????--${type}--`);
			switch (type) {
				case 1:
					if (index == 0) {
						this.$router.push({ name: "Home" });
					}
					// 	else if (index == 4) {
					// 	this.$store.commit("banner", item);
					// 	this.$store.commit("TeamExpertsText", "????????????");
					// 	this.$router.push({ name: "TeamExperts", query: { id: index } });
					// }
					else if (index == 8) {
						// this.$store.commit("banner", "???????????????");
						// this.$store.commit("bannerText", "???????????????");
						let newPageUrl = this.$router.resolve({
							name: "Details4",
							query: { id: 122, data: "???????????????", newBanner: "???????????????", newBannerText: "???????????????" },
						});
						window.open(newPageUrl.href);
					}
					//  else if (index == 9) {
					// 	this.$router.push({ name: "AppointmentRegister" });
					// }
					break;
				case 2:
					this.$router.push({ name: "HospitalOverview", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type - 1]);
					this.$store.commit("bannerList", this.daohang2);
					// this.$SETSJ(item, type, this.daohang0[type - 1], this.daohang2);
					break;
				case 3:
					this.$router.push({ name: "HospitalNews", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type - 1]);
					this.$store.commit("bannerList", this.daohang3);
					break;
				case 4:
					this.$router.push({ name: "PartyMassWork", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type - 1]);
					this.$store.commit("bannerList", this.daohang4);
					break;
				case 5:
					this.$router.push({ name: "TeamExperts", query: { value: item.id } });
					// this.$store.commit("banner", item);
					// this.$store.commit("bannerType", type);
					// this.$store.commit("bannerText", this.daohang0[type - 1]);
					// this.$store.commit("bannerList", this.daohang5);
					this.$store.commit("TeamExpertsText", item.subjectName + "????????????");
					break;
				case 6:
					this.$router.push({ name: "ResearchTeaching", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type - 1]);
					this.$store.commit("bannerList", this.daohang6);
					break;
				case 7:
					this.$router.push({ name: "HealthControl", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type]);
					this.$store.commit("bannerList", this.daohang7);
					break;
				case 8:
					this.$router.push({ name: "HospitalAffairs", query: { id: index } });
					this.$store.commit("banner", item);
					this.$store.commit("bannerType", type);
					this.$store.commit("bannerText", this.daohang0[type - 2]);
					this.$store.commit("bannerList", this.daohang8);
					break;
				case 9:
					// this.$router.push({ name: "InternetHospital", query: { id: index } })
					// this.$store.commit("banner", item)
					// this.$store.commit("bannerType", type)
					// this.$store.commit("bannerText", this.daohang0[type - 1])
					// this.$store.commit("bannerList", this.daohang9)
					break;
				case 10:
					if (index == 0) {
						this.$router.push({ name: "AppointmentRegister" });
					} else if (index == 1) {
						this.$router.push({ name: "AppointmentCancel" });
					} else if (index == 2) {
						// this.$router.push({ name: "AppointmentCancel" });

						let newPageUrl = this.$router.resolve({ name: "Details7" });
						window.open(newPageUrl.href);
					}
					break;
				default:
					break;
			}
		},
		query2() {
			WebApi.getTeamExpertSubject()
				.then(({ data }) => {
					// console.log(data, "---");
					this.daohang5 = data.data;
				})
				.catch((err) => console.log("??????????????????", err));
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/nav.scss";
@mixin img {
	img {
		width: 100%;
		// height: 100%;
		object-fit: cover;
	}
}
.yeMianHead {
	width: 100%;
	min-width: 1400px;
	// background-color: #fff;
	.logo {
		max-width: 1400px;
		// height: 120px;
		margin: auto;
		padding: 10px;
		box-sizing: border-box;

		.logo-left {
			@include img;
			width: 40%;
			padding-left: 70px;
		}
		.logo-center {
			@include img;
			width: 40%;
			img {
				object-fit: none;
			}
		}
	}
}
</style>
