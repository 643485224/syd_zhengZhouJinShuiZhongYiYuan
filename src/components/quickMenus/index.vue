<template>
	<div class="quickMenus">
		<div class="quick-top">
			<div class="quick-left">
				<ul class="quick-ul">
					<li class="quick-li" v-for="(item, index) in quickList" :key="index">
						<a href="javascript:void(0);" class="firstA" @click="teamPage(item, index)">
							<em>{{ item.name }}</em>
							<i class="style01" :class="item.cls"></i>
							<!-- <span></span> -->
						</a>
						<div v-if="index == 0" class="snow-div block-div-top" style="top: -12px;width: 560px;">
							<ul class="QMSub" style="width: 560px;">
								<li v-for="(items, i) in firstHomeList[index]" :key="i">
									<a href="javascript:void(0);" :title="items.name" @click="jumpPage(items, index, i)">
										{{ items.name }}
										<span>进入</span>
									</a>
								</li>
							</ul>
						</div>
						<div v-if="index == 1" class="snow-div block-div-top snow-div2" style="top: -73px">
							<ul class="QMSub">
								<li v-for="(items, i) in firstHomeList[index]" :key="i">
									<a href="javascript:void(0);" :title="items.name" @click="jumpPage(items, index, i)">
										{{ items.name }}
										<span>进入</span>
									</a>
								</li>
								<li>
									<a href="javascript:void(0);" title="官网预约" @click="_goRegister()">
										官网预约
										<span>进入</span>
									</a>
								</li>
							</ul>
						</div>
						<div v-if="index == 2" class="snow-div block-div-top" style="top: -134px">
							<ul class="QMSub" style="display: flex;flex-wrap: wrap;">
								<li v-for="(items, i) in firstHomeList[index]" :key="i" style="width: 50%;">
									<a href="javascript:void(0);" :title="items.name" @click="jumpPage(items, index, i)">
										{{ items.name }}
										<span>进入</span>
									</a>
								</li>
							</ul>
						</div>
						<div v-if="index == 3" class="snow-div block-div-center" style="top: -195px">
							<div class="expertColumn-top">
								<h5>按医生姓名查找</h5>
								<ul>
									<li v-for="(item, index_three) in nameList" :key="index_three" @click="query2(item, i)" :style="dcoColor == index_three ? 'background:#000;color:#FFF;' : ''">
										{{ item }}
									</li>
								</ul>
							</div>
							<div class="h20"></div>
							<div class="expertColumn-bottom">
								<div class="DNull" v-if="docList.length == 0">
									<div v-loading="fullscreenLoading" v-if="fullscreenLoading" class="loading"></div>
									<span v-if="!fullscreenLoading">对不起！</span><br />
									<span v-if="!fullscreenLoading">没有找到相关医生！</span>
								</div>
								<ul>
									<!-- <li class="DNull" ><span>对不起！</span><br />没有找到相关医生！</li> -->
									<li v-for="(item, i) in docList" :key="i">
										<div>
											<a href="javascript:void(0);" :title="item.doctor" @click="gotoDetails(item, 1)"> {{ item.doctor }}</a>
										</div>
										<p>
											<a href="javascript:void(0);" :title="item.deptname" @click="gotoDetails(item, 2)"> {{ item.deptname }}</a>
										</p>
									</li>
								</ul>
							</div>
						</div>
						<div v-if="index == 4" class="snow-div block-div-bottom" style="bottom: -133px;width: 560px;">
							<ul class="QMSub" style="width: 560px;">
								<li v-for="(items, i) in firstHomeList[index - 1]" :key="i">
									<a href="javascript:void(0);" :title="items.name" @click="jumpPage(items, index - 1, i)">
										{{ items.name }}
										<span>进入</span>
									</a>
								</li>
							</ul>
						</div>
						<div v-if="index == 5" class="snow-div block-div-bottom" style="bottom: -72px;">
							<ul class="QMSub2">
								<li v-for="(items, i) in firstHomeList[index - 1]" :key="i">
									<a href="javascript:void(0);" :title="items.name" @click="jumpPage(items, index - 1, i)">
										{{ items.name }}
									</a>
								</li>
							</ul>
						</div>
						<div v-if="index == 6" class="snow-div block-div-bottom" style="bottom: -11px">
							<ul class="QMSub2">
								<li v-for="(items, i) in firstHomeList[index - 1]" :key="i">
									<a href="javascript:void(0);" :title="items.name">
										{{ items.name }}
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="quick-right">
				<div class="block">
					<el-carousel :autoplay="true">
						<el-carousel-item v-for="(item, index) in imgList" :key="index">
							<el-image :src="`http://117.159.7.252:8090/officialwebsite/file/${item.type}/${item.realName}`" fit="fill">
								<div slot="placeholder" style="">加载中<span class="dot">...</span></div>
							</el-image>
							<!-- <p>{{ item.name }}</p> -->
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<div class="quick-bottom">
			<div class="ksdh">
				<div class="ksdh_list" style="padding-left: 20px">
					<a href="javascript:void(0);" @click="jumpDepartment()">
						<img src="../../assets/imgs/DepartmentNavigation.png" alt="科室导航" width="77" height="77" />
					</a>
				</div>
				<div class="ksdh_cx">
					<div class="cx-left">
						<p class="cx-left-p">
							<span class="cx-left-span">科室：</span>
							<!-- <el-select v-model="diseaseForm.disease" clearable placeholder="请选择科室" value-key="deptno" class="w220">
								<el-option v-for="(item, index) in disease" :key="index" :label="item.deptname" :value="item"> </el-option>
							</el-select> -->
							<el-cascader v-model="diseaseForm.diseaseList" placeholder="请选择科室" :options="disease" @change="handleChange" :props="optionProps" clearable class="w250"></el-cascader>
						</p>
						<p class="cx-left-p">
							<span class="cx-left-span">专家：</span>
							<el-input placeholder="请输入专家姓名" v-model="diseaseForm.expert" clearable class="w250"></el-input>
						</p>
						<!-- <p>
							<span>疾病：</span>
							<el-input placeholder="请输入您要查询的疾病" v-model="diseaseForm.department" clearable class="w220"></el-input>
						</p> -->
					</div>
					<div class="cx-right">
						<p style="text-align: center">
							<el-button type="primary" @click="queryDepartment(diseaseForm)">查询</el-button>
						</p>
					</div>
				</div>
				<div class="ksdh_list">
					<a href="javascript:void(0);" @click="priceType(0)">
						<img src="../../assets/imgs/servicePriceInquiry.png" alt="医疗服务价格查询" width="77" height="77" />
					</a>
				</div>
				<div class="ksdh_list">
					<a href="javascript:void(0);" @click="priceType(1)">
						<img src="../../assets/imgs/drugsPriceInquiry.png" alt="常用药品价格查询" width="77" height="77" />
					</a>
				</div>
				<div class="ksdh_list">
					<a href="javascript:void(0);" @click="priceType(2)">
						<img src="../../assets/imgs/ConsumablesPriceInquiry.png" alt="医疗耗材价格查询" width="77" height="77" />
					</a>
				</div>
			</div>
		</div>
		<div class="h20"></div>
	</div>
</template>

<script>
import axios from "axios";
import WebApi from "../../webapi/modules/webapi";
export default {
	name: "Quick",
	data() {
		return {
			nameList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
			imgList: [],
			firstHomeList: [],
			quickName: "患者服务",
			quickList: [
				{
					name: "门诊排班",
					cls: "bg1",
				},
				{
					name: "预约挂号",
					cls: "bg2",
				},
				{
					name: "就诊流程",
					cls: "bg3",
				},
				{
					name: "专家介绍",
					cls: "bg4",
				},
				{
					name: "交通路线",
					cls: "bg5",
				},
				{
					name: "医保服务",
					cls: "bg6",
				},
				{
					name: "咨询电话",
					cls: "bg7",
				},
			],
			quickListName: ["门诊排班", "预约挂号", "就诊流程", "交通路线", "医保服务", "咨询电话"],
			disease: [],
			diseaseForm: {
				diseaseList: [],
				disease: "",
				department: "",
				expert: "",
			},
			priceTypeText: "便民查询",
			priceTypeList: ["医疗服务价格查询", "常用药品价格查询", "医疗耗材价格查询"],
			docList: [],
			dcoColor: 0,
			synopsisHtmlContent: [],
			source: null,
			fullscreenLoading: true,
			optionProps: {
				value: "deptno",
				label: "subjectName",
			},
		};
	},
	created() {
		this.query();
		this.query1();
		this.query2("A", 0);
		this.query3();
	},
	methods: {
		cancelRequest() {
			if (typeof this.source === "function") {
				this.source();
			}
		},
		query() {
			WebApi.getHomePageIndex()
				.then(({ data }) => {
					console.log(data, "getHomePageIndex");
					this.firstHomeList = data.data;
				})
				.catch(() => console.log("请检查网络或联系平台人员"));
		},
		query1() {
			WebApi.getLbt()
				.then(({ data }) => {
					this.imgList = data.data;
					// console.log(this.imgList)
				})
				.catch(() => console.log("请检查网络或联系平台人员"));
		},

		query2(data, index) {
			this.cancelRequest();
			this.docList = [];
			this.dcoColor = index;
			this.fullscreenLoading = true;
			axios({
				method: "GET",
				url: `http://117.159.7.252:8090/officialwebsite/webApi/api/his/getDoctorByMnemonic?mnemonic=${data}`,
				data: data,
				cancelToken: new axios.CancelToken((c) => {
					this.source = c;
				}),
			})
				.then(({ data }) => {
					console.log(data, "--医生");
					this.fullscreenLoading = false;
					if (data.data.length == 0) {
						return;
					}

					this.docList = data.data;
					this.cancel = null;
				})
				.catch((err) => {
					// this.fullscreenLoading = false;
					if (axios.isCancel(err)) {
						// console.log("Rquest canceled", err)
						//请求如果被取消，这里是返回取消的message
					} else {
						this.fullscreenLoading = false;
						console.log(err);
					}
				});
		},
		query3() {
			// WebApi.getDeptInfo()
			WebApi.getSubject2()
				.then(({ data }) => {
					console.log(data, "科室信息");
					this.disease = data.data;
				})
				.catch((err) => {
					console.log("请检查网络或联系平台人员", err);
				});
		},

		async jumpPage(items, index, i) {
			console.log(items, index, i, "----");
			console.log(index == 3 && i == 3);
			if (index == 0) {
				this.$store.commit("banner", this.quickListName[index]);
				this.$store.commit("bannerType", 12);
				this.$store.commit("bannerText", this.quickName);
				this.$store.commit("bannerList", this.quickListName);
				this.$router.push({ name: "PatientServices", query: { id: items.id, type: 0, data: items.name } });
			} else if (index == 3 && i == 3) {
				this.$store.commit("banner", this.quickListName[index]);
				this.$store.commit("bannerType", 12);
				this.$store.commit("bannerText", this.quickName);
				this.$store.commit("bannerList", this.quickListName);
				this.$router.push({ name: "PatientServices", query: { id: items.id, type: 0, data: items.name } });
			} else {
				let newPageUrl = this.$router.resolve({
					name: "Details4",
					query: { id: items.id, data: items.name, newBanner: this.quickListName[index], newBannerText: this.quickName },
				});
				window.open(newPageUrl.href);
			}
		},

		priceType(index) {
			this.$router.push({ name: "Convenient", query: { id: index } });
			this.$store.commit("banner", this.priceTypeList[index]);
			this.$store.commit("bannerType", 10);
			this.$store.commit("bannerText", this.priceTypeText);
			this.$store.commit("bannerList", this.priceTypeList);
		},
		jumpDepartment() {
			this.$store.commit("banner", "科室导航");
			this.$router.push({ name: "DepartmentNavigation" });
		},
		queryDepartment(data) {
			console.log(data, "-参数");
			this.$store.commit("banner", "专家团队");
			if (!data.disease && !data.expert) {
				this.$store.commit("TeamExpertsText", "专家列表");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
				return;
			} else if (!data.disease) {
				this.$store.commit("TeamExpertsText", "专家查询结果");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
			} else {
				this.$store.commit("TeamExpertsText", "专家列表");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
			}
		},
		teamPage(item, index) {
			if (index == 3) {
				this.$store.commit("banner", "专家团队");
				this.$store.commit("TeamExpertsText", "专家列表");
				this.$router.push({ name: "TeamExperts" });
			}
		},
		gotoDetails(item, type) {
			console.log(item);
			if (type == 1) {
				// this.$store.commit("banner", "专家简介");
				let newPageUrl = this.$router.resolve({
					name: "Details5",
					query: { id: item.id, name: item.deptname, deptno: item.deptno, newBanner: "专家简介", newBannerText: this.$store.state.bannerText },
				});
				window.open(newPageUrl.href);
			} else if (type == 2) {
				// this.$store.commit("banner", item.deptname);
				this.$store.commit("deptamentList", item);
				let newPageUrl = this.$router.resolve({
					name: "Details3",
					query: { data: item.deptname, newBanner: item.deptname, newBannerText: this.$store.state.bannerText },
				});
				window.open(newPageUrl.href);
			}
		},
		_goRegister() {
			this.$router.push({ name: "AppointmentRegister" });
		},
		handleChange(value) {
			console.log(value);
			this.diseaseForm.disease = value[value.length - 1];
		},
	},
	watch: {},
};
</script>
<style lang="scss" scoped>
.quickMenus {
	width: 100%;
	.quick-top {
		display: flex;
		justify-content: center;
		.quick-left {
			width: 310px;
			height: 450px;
			background: #fff;
			.quick-ul {
				padding: 11px 0px;
				border: 1px solid #dedede;
				display: flex;
				flex-wrap: wrap;
				.quick-li {
					width: 100%;
					height: 61px;

					// .firstA {
					// 	font-size: 20px;
					// 	font-weight: bold;
					// 	color: #444;
					// }
					// .snow-div {
					// 	a {
					// 		font-size: 18px;
					// 	}
					// }
					.snow-div2 {
						ul {
							display: flex;
							flex-wrap: wrap;
							li {
								width: 50%;
							}
						}
					}
				}
				.quick-li:hover {
					position: relative;
					// .firstA {
					// 	color: #fff;
					// }
					// .snow-div {
					// 	a {
					// 		color: #fff;
					// 	}
					// }
					.block-div-top {
						position: absolute;
						display: block;
						top: 0px;
						left: 100%;
						z-index: 10;
						min-height: 300px;
						box-shadow: 0px 8px 15px rgb(128 128 128 / 25%);
						background: #fff;
						border: 1px solid #dedede;
					}

					.block-div-center {
						position: absolute;
						top: 0px;
						left: 100%;
						z-index: 10;
						width: 890px;
						height: 450px;
						display: block;
						padding: 16px 40px;
						border: 1px solid #dedede;
						background: #fff;
						overflow-x: auto;
						box-sizing: border-box;
						box-shadow: 0px 8px 15px rgb(128 128 128 / 25%);

						.expertColumn-top {
							h5 {
								line-height: 40px;
								font-size: 14px;
								color: #505050;
							}
							ul {
								display: flex;
								flex-wrap: wrap;
								li {
									width: 37px;
									height: 37px;
									text-align: center;
									line-height: 37px;
									border: 1px solid #dedede;
									margin-right: 5px;
									margin-top: 5px;
								}
								li:hover {
									box-shadow: 0px 0px 20px rgb(128 128 128 / 50%);
								}
							}
						}
						.expertColumn-bottom {
							width: 100%;

							.DNull {
								line-height: 28px;
								font-size: 14px;
								margin-top: 18px;
								padding-left: 13px;
								color: #505050;
								float: left;
								width: 100%;
								.loading {
									height: 200px;
								}
								span {
									font-size: 28px;
									color: #6bcbca;
								}
							}
							ul {
								display: flex;
								// justify-content: space-between;
								flex-wrap: wrap;

								li {
									// width: 150px;
									width: 20%;
									color: #666;
									line-height: 21px;
									margin-top: 20px;
									padding: 10px 0px;
									position: relative;
									// float: left;
									padding-left: 12px;
									box-sizing: border-box;

									div {
										width: 72px;
										// width: 20%;
										position: relative;
										height: 21px;
										a {
											font-size: 16px;
											text-indent: 19px;
											color: #978571;
											background: url(../../assets/imgs/ico_004.png) left center no-repeat;
											display: block;
										}
										a:hover {
											color: #ff6633;
										}
									}
									p {
										width: 96%;
										overflow: hidden;
										height: 21px;
										font-size: 12px;
										a {
											color: #666;
											text-decoration: none;
										}
										a:hover {
											color: #ff6633;
										}
									}
								}
								li:hover {
									box-shadow: 0px 0px 5px #787a7c;
								}
							}
						}
					}
					.block-div-bottom {
						position: absolute;
						display: block;
						bottom: 0px;
						left: 100%;
						z-index: 10;
						min-height: 300px;
						box-shadow: 0px 8px 15px rgb(128 128 128 / 25%);
						background: #fff;
						border: 1px solid #dedede;
					}
				}
			}
		}
		.quick-right {
			width: 880px;
			height: 450px;
			float: right;
			overflow: hidden;
			margin-left: 10px;
			.block {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
				box-sizing: border-box;
				.el-image {
					width: 100%;
					height: 100%;
					div {
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30px;
						font-weight: bold;
					}
				}
				p {
					position: absolute;
					bottom: 0px;

					width: 100%;
					height: 12%;
					color: #ffffff;
					background-color: rgba(11, 11, 11, 0.6);

					padding-left: 15px;
					padding-right: 30px;
					line-height: 35px;
					font-size: 14px;
					text-overflow: ellipsis;
				}
			}
		}
	}
	.quick-bottom {
		height: 100px;
		background: url("../../assets/imgs/etyy.jpg") no-repeat;
		background-position: center;
		.ksdh {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			.ksdh_list {
				width: 90px;
				height: 77px;
				margin: 11px 15px;
			}
			.ksdh_list:hover {
				margin-top: 18px;
			}

			.ksdh_cx {
				width: 690px;
				height: 100%;
				display: flex;
				justify-content: center;

				.cx-left {
					width: 300px;
					height: 50px;
					p {
						line-height: 50px;
						span {
							color: #1e90ff;
							font-weight: bold;
						}
					}
				}
				.cx-right {
					width: 150px;
					display: flex;
					justify-content: center;
					align-items: center;

					.el-button {
						background: #005197;
						font-size: 18px;
						font-weight: 600;
					}
					.el-button:hover {
						background: #57afd5;
					}
				}
			}
		}
	}
}
</style>
