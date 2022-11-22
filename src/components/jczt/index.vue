<template>
	<div>
		<div class="jczt w1200 flex-space-between">
			<div class="jczt-left">
				<h3>精彩专题</h3>
				<ul class="flex-wrap-space-evenly-center">
					<li v-for="(item, index) in wonderfulTopic" :key="index" @click="jumpPage(item, index)">
						<a href="javascript:void(0);">
							<img :src="item.imgsUrl" :alt="item.value" width="160" height="120" :title="item.value" style="object-fit: cover;" />
							<p>{{ item.value }}</p>
						</a>
					</li>
				</ul>
			</div>
			<div class="jczt-right">
				<ul class="jczt-ul ">
					<li class=" li_top flex-space-between">
						<div class="li_top_one">
							<div></div>
							<div>
								<p class="jczt_p">郑州市金水区总医院讯息栏</p>
								<ul>
									<li v-for="(item, index) in messageList.slice(0, 4)" :key="index">
										<p class="flex-space-between" @click="jumpDetailsPage(item, index, 0)">
											<a href="javascript:void(0);" :title="item.title"> {{ item.title }}</a>
											<span>[{{ item.createTime.slice(0, 11) }}]</span>
										</p>
									</li>
								</ul>
								<a href="javascript:void(0);" class="more1 son-bootm-right" @click="jumpHospitalNews(1)">
									更多讯息
								</a>
							</div>
						</div>
						<!-- <div class="li_top_two">
							<div>
							
							</div>
							<div>
								<p class="jczt_p">郑州市金水区总医院公告栏</p>
								<ul>
									<li v-for="(item, index) in noticeList.slice(0, 4)" :key="index">
										<p class="flex-space-between" @click="jumpDetailsPage(item, index, 1)">
											<a href="javascript:void(0);" :title="item.title"> {{ item.title }}</a>
											<span>[{{ item.createTime.slice(0, 11) }}]</span>
										</p>
									</li>
								</ul>
								<a href="javascript:void(0);" class="more2 son-bootm-right" @click="jumpHospitalNews(2)">
									更多公告
								</a>
							</div>
						</div> -->
					</li>
					<li class=" li_bottom ">
						<!-- <p class="li_bottom_p">郑州市金水区总医院医共体成员单位</p> -->
						<p class="li_bottom_p">
							<!-- <img src="../../assets/imgs/0ad91a6b8f1a378ae56f5ce6d0e8e9d.png" alt="" /> -->
							郑州市金水区总医院医共体成员单位
						</p>
						<ul class="li_bottom_ul flex-wrap-space-between-center">
							<li v-for="(item, index) in hospationInfoList" :key="index" @click="goHospationInfo(item, index)">
								<a href="javascript:void(0);">
									<span>Go</span>
									<p>
										<img :src="hospationImgList[index].imgs" :alt="hospationImgList[index].value" />
									</p>
									<p class="li_bottom_ul_p">{{ item.hospitalName }}</p>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="h20"></div>
		<div class="characteristic flex-center">
			<div>
				<h3>特色科室</h3>
				<ul class="flex-wrap-center" :style="brandFold ? 'height:210px;' : ''">
					<li class="flex-center-center" v-for="(item, index) in departmentList" :key="index" @click="newPage(item, index)">
						<div>
							<img src="../../assets/imgs/biaoti.jpg" alt="" v-if="JSON.stringify(item.localStorage) === '{}'" />
							<img v-else v-lazy="`http://117.159.7.252:8090/officialwebsite/file/${item.localStorage.type}/${item.localStorage.realName}`" alt="" :title="item.name" />
						</div>
						<a href="javascript:void(0);" :title="item.name">
							{{ item.deptname }}
						</a>
					</li>
				</ul>
				<a href="javascript:void(0);" class="charP " @click="changeBrandFold">
					{{ brandFold ? "更多科室>>>" : "收起&lt;&lt;&lt;" }}
				</a>
			</div>
		</div>
		<div class="h20"></div>
	</div>
</template>

<script>
import WebApi from "../../webapi/modules/webapi";
export default {
	name: "JCZT",
	data() {
		return {
			brandFold: true, //展开更多和收起
			departmentList: [], //特色科室
			wonderfulTopic: [
				{
					value: "医养结合",
					imgsUrl: require("../../assets/imgs/etyy_zt1.jpg"),
				},
				{
					value: "志愿服务",
					imgsUrl: require("../../assets/imgs/etyy_zt2.png"),
				},
				{
					value: "公益慈善",
					imgsUrl: require("../../assets/imgs/etyy_zt3.jpg"),
				},
				{
					value: "影视天地",
					imgsUrl: require("../../assets/imgs/etyy_zt4.png"),
				},
			],
			wonderfulTopicText: ["医养结合", "志愿服务", "公益慈善", "影视天地"],
			daohang3: ["新闻资讯", "最新公告"],
			messageList: [], //讯息
			noticeList: [], //公告
			synopsisHtmlContent: [],
			hospationInfoList: [], //医院路线
			hospationList: ["医院简介", "来院路线"],
			hospationBannerList: ["郑州市金水区总医院北院区", "郑州市金水区总医院南院区", "郑州市金水区总医院东院区", "各分院、社区卫生服务中心及社区卫生服务站"],
			hospationImgList: [
				{
					value: "郑州市金水区总医院北院区",
					imgs: require("../../assets/imgs/BeiyuanDistrict.png"),
				},
				{
					value: "郑州市金水区总医院南院区",
					imgs: require("../../assets/imgs/NanyuanDistrict.jpg"),
				},
				{
					value: "郑州市金水区总医院东院区",
					imgs: require("../../assets/imgs/DongyuanDistrict.jpg"),
				},
				{
					value: "各分院、社区卫生服务中心及社区卫生服务站",
					imgs: require("../../assets/imgs/GeyuanDistrict.jpg"),
				},
			],
		};
	},
	created() {
		this.request();
		this.request1();
		// this.request2();
		this.request3();
	},
	methods: {
		changeBrandFold() {
			this.brandFold = !this.brandFold;
		},
		request() {
			WebApi.getCharacteristicDept()
				.then(({ data }) => {
					// console.log(data, "特色科室");
					this.departmentList = data.data;
				})
				.catch(() => {
					console.log("请检查网络或联系平台人员");
				});
		},
		request1() {
			WebApi.queryPartyBuildingGarden()
				.then(({ data }) => {
					console.log(data);
					this.messageList = data.data;
				})
				.catch(() => {
					console.log("请检查网络或联系平台人员");
				});
		},
		// request2() {
		// 	WebApi.queryLatestAnnouncement()
		// 		.then(({ data }) => {
		// 			this.noticeList = data.data;
		// 		})
		// 		.catch(() => {
		// 			console.log("请检查网络或联系平台人员");
		// 		});
		// },
		request3() {
			WebApi.getHospationInfo()
				.then(({ data }) => {
					// console.log(data, "各个院区的路线图(未做)");
					this.hospationInfoList = data.data;
				})
				.catch(() => {
					console.log("请检查网络或联系平台人员");
				});
		},
		jumpPage(item, index) {
			console.log(item);
			this.$store.commit("banner", this.wonderfulTopicText[index]);
			this.$store.commit("bannerType", 11);
			this.$store.commit("bannerText", "专题专栏");
			this.$store.commit("bannerList", this.wonderfulTopicText);
			this.$router.push({ name: "WonderfulTopic", query: { id: index, data: item.value } });
		},
		jumpHospitalNews(index) {
			console.log(index);
			this.$store.commit("bannerType", 3);
			this.$store.commit("bannerText", "医院动态");
			this.$store.commit("bannerList", this.daohang3);
			switch (index) {
				case 1:
					this.$store.commit("banner", "新闻资讯");
					this.$router.push({ name: "HospitalNews", query: { id: 0 } });
					break;
				case 2:
					this.$store.commit("banner", "最新公告");
					this.$router.push({ name: "HospitalNews", query: { id: 1 } });
					break;
				default:
					break;
			}
		},
		newPage(item) {
			console.log(item, "----111");
			WebApi.characteristicDeptId(item.news.id)
				.then(({ data }) => {
					console.log(data);
					this.synopsisHtmlContent = [];
					for (let i = 0; i < data.data.length; i++) {
						this.synopsisHtmlContent.push(data.data[i].htmlContent);
					}
					this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);
					let newPageUrl = this.$router.resolve({
						name: "Details2",
						query: { id: 0, data: data.data[0].title, time: item.createTime.slice(0, 11), newBanner: item.deptname, bannerText: data.data[0].title },
					});
					window.open(newPageUrl.href);
				})
				.catch(() => {
					console.log("请检查网络或联系平台人员");
				});
		},
		jumpDetailsPage(item, index, type) {
			console.log(item, index, type);
			let newBanner = "";
			if (type == 0) {
				newBanner = "新闻资讯";
			} else if (type == 1) {
				newBanner = "最新公告";
			}
			this.synopsisHtmlContent = [];
			this.synopsisHtmlContent.push(item.htmlContent);
			this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);

			let newPageUrl = this.$router.resolve({
				name: "Details",
				query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2, newBanner: newBanner, newBannerText: "医院动态" },
			});
			window.open(newPageUrl.href);
		},
		goHospationInfo(item, index) {
			console.log(item, index);
			if (index == 3) {
				this.$router.push({ name: "EachHospitalArea", query: { id: item.id, data: item.hospitalName } });
				this.$store.commit("banner", item.hospitalName);
				this.$store.commit("bannerType", 13);
				this.$store.commit("bannerText", "郑州市金水区总医院");
				this.$store.commit("bannerList", this.hospationBannerList);
				return;
			}
			// this.$store.commit("banner", item.hospitalName);
			// this.$store.commit("bannerText", "院区介绍");
			this.$store.commit("bannerList", this.hospationList);
			let newPageUrl = this.$router.resolve({
				name: "Details6",
				query: { id: item.id, data: item.hospitalName, newBanner: item.hospitalName, newBannerText: "院区介绍" },
			});
			window.open(newPageUrl.href);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/jczt.scss";
</style>
