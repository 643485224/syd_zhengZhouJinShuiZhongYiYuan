<template>
	<div class="keshi">
		<Logo></Logo>
		<!-- <IMG></IMG> -->
		<div class="overview w1200">
			<img src="../assets/imgs/ksdh.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200">
			<div class="overview-left">
				<div class="quick-bottom">
					<QuickNavigation :keyBoolen="false"></QuickNavigation>
				</div>
			</div>

			<div class="overview-right">
				<h2 class="Blue">科室导航</h2>
				<div class="h20"></div>
				<!-- <p class="p_department">学科</p>
				<el-divider class="p_department_divider"></el-divider> -->
				<div v-loading="fullscreenLoading" v-if="fullscreenLoading" class="loading"></div>
				<div v-else>
					<p v-if="subjectList.length == 0">暂无信息</p>
				</div>
				<div class="over_div">
					<ul v-if="subjectList.length !== 0">
						<ul class="top_appointment flex-center-center">
							<li class="flex-center-center" v-for="(item, index) in subjectList" :key="index" @click="changeIndex(item, index)" :class="index == synopsisListIndex ? 'Before_li' : 'After_li'">
								{{ item.subjectName }}
							</li>
						</ul>
						<ul>
							<li v-for="(item_one, index_one) in subjectList[synopsisListIndex].children" :key="index_one">
								<div class="h20"></div>
								<p class="p_department">{{ item_one.subjectName }}</p>
								<el-divider class="p_department_divider"></el-divider>
								<ul class="right_department">
									<li v-for="(item_two, index_two) in item_one.registrationDept" :key="index_two" @click="newPage(item_two)">
										{{ item_two.deptname }}
									</li>
								</ul>
							</li>
						</ul>
					</ul>
				</div>
			</div>
		</div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//网站首页----科室导航 Page
import Logo from "../components/logo/index.vue";
// import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
// import Crumbs from '../components/crumbs/index.vue'
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			tableText: "",
			synopsis: "",
			synopsisList: [],
			synopsisHtmlContent: [],
			newSynopsisList: [],
			synopsisLength: 0,
			currentPage: 1,
			pageAmount: 20,
			quickName: "患者服务",
			quickListName: ["门诊排班", "预约挂号", "就诊流程", "交通路线", "医保服务", "咨询电话"],
			fullscreenLoading: true,
			fullscreenLoading1: false,
			subjectListName: [], //科室_name
			subjectList: [], //科室
			subjectListIndex: 0,
			subjectListText: "",
			synopsisListIndex: 0,
		};
	},
	created() {
		// this.request();
		this.getSubject();
	},
	mounted() {},
	methods: {
		getSubject() {
			WebApi.getSubject()
				.then(({ data }) => {
					this.fullscreenLoading = false;
					if (data.resultCode !== "1") {
						return;
					}
					console.log(data, "---getSubject");
					this.subjectList = data.data;
					this.subjectList.map((item, index) => {
						console.log(item, index);
						this.subjectListName.push(item);
					});
					this.querySubject(data.data[0], 0);
				})
				.catch((err) => {
					console.log(err, "请求失败");
				});
		},
		request() {
			WebApi.getDeptInfo()
				.then(({ data }) => {
					console.log(data, "---data");
					this.synopsisList = data.data;
					this.synopsisLength = data.data.length;
					this.fullscreenLoading = false;
				})
				.catch((err) => {
					this.fullscreenLoading = false;
					console.log(err, "请求失败");
				});
			// console.log(resp)
			// this.synopsisList = resp.data.data
		},
		newPage(item) {
			console.log(item);
			// let resp = await WebApi.deptName(item.deptname)
			// console.log(resp, '科室简介')
			this.$store.commit("deptamentList", item);
			// this.$store.commit("bannerText", item.deptname);
			// this.$store.commit("banner", item.deptname);

			let newPageUrl = this.$router.resolve({
				name: "Details3",
				query: { data: item.deptname, newBanner: item.deptname, newBannerText: this.$store.state.bannerText },
			});
			window.open(newPageUrl.href);
		},
		// handleSizeChange(val) {
		// 	this.pageAmount = val;
		// 	this.getTableData();
		// },
		// handleCurrentChange(val) {
		// 	this.currentPage = val;
		// 	this.getTableData();
		// },
		// getTableData() {
		// 	this.synopsisList = this.newSynopsisList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		// },
		// goNewPage(item, index) {
		// 	console.log(item,index, "123123");
		// if (index == 5) {
		// 	this.$store.commit("banner", "科室导航");
		// 	this.$router.push({ name: "DepartmentNavigation" });
		// } else {
		// 	this.$store.commit("banner", this.quickListName[index]);
		// 	this.$store.commit("bannerType", 12);
		// 	this.$store.commit("bannerText", this.quickName);
		// 	this.$store.commit("bannerList", this.quickListName);
		// 	this.$router.push({ name: "PatientServices", query: { id: index, type: 1 } });
		// }
		// },
		querySubject(item, index) {
			this.subjectListText = item.subjectName; //科室名称
			this.subjectListIndex = index; //选中的class下标
			this.synopsisList = []; //请求之前清空原数据
			this.fullscreenLoading1 = true;
			WebApi.subjectId(item.id)
				.then(({ data }) => {
					console.log(data, "---data");
					this.synopsisList = data.data;
					this.fullscreenLoading1 = false;
				})
				.catch((err) => {
					console.log(err, "请求失败");
				});
		},
		changeIndex(item, index) {
			this.synopsisListIndex = index;
		},
	},
	watch: {
		$route() {
			this.request();
		},
	},
	components: {
		Logo,
		// IMG,
		QuickNavigation,
		DBDH,
		// Crumbs,
	},
};
</script>
<style lang="scss" scoped>
@mixin p_department {
	width: 200px;
	font-size: 24px;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: #005197;
	border-bottom: 2px solid #005197;
}
@mixin right_department {
	display: flex;
	flex-wrap: wrap;
	padding: 20px 0px;
	li {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 23.79%;
		height: 58px;
		font-size: 17px;
		background: #dedede;
		border-radius: 10px;
		margin: 5px;
		cursor: pointer;
	}
	li:hover {
		background: #005197;
		color: #fff;
	}
}

@mixin docLi {
	width: 200px;
	height: 36px;
	line-height: 36px;
	font-size: 14px;
	text-align: center;
	float: left;
	border: #6bcbca 2px solid;
	border-radius: 5px;
	margin: 5px;

	a {
		display: block;
		background: #fff;
		color: #0094ad;
	}
	a:hover {
		background: #005197;
		color: #fff;
	}
	.after_a {
		background: #fff;
		color: #0094ad;
	}
	.before_a {
		background: #005197;
		color: #fff;
	}
}
.keshi {
	width: 100%;
	height: 100%;
	.overview {
		display: flex;
		justify-content: space-between;
		.overview-left {
			width: 25%;
			.quick-bottom {
				width: 100%;
				padding: 5px 10px 30px;
				box-sizing: border-box;

				h2 {
					font-size: 18px;
					line-height: 40px;
					color: #fff;
					background: #57afd5;
					padding-left: 20px;
					box-sizing: border-box;
				}
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
					}
				}
				p {
					width: 100%;
					height: 20px;
					background: #57afd5;
				}
			}
		}
		.overview-right {
			width: 70%;

			.p_department {
				@include p_department;
			}
			h2 {
				font-size: 18px;
				line-height: 40px;
				height: 40px;
				color: #01b9b7;
				text-decoration: none;
				border-bottom: #01b9b7 3px solid;
			}
			.loading {
				height: 200px;
			}
			.overview_div {
				position: relative;
				width: 100%;

				background: #fff;
				.overview_ul_left {
					width: 220px;

					li {
						@include docLi;
					}
					.index_1 {
						position: absolute;
						right: 0px;
						top: 0px;
						width: 630px;
						height: 400px;
						padding: 10px;
						background: #fff;
						border: 1px solid #dedede;
						box-sizing: border-box;
						box-shadow: 0px 8px 15px rgb(128 128 128 / 25%);
						li {
							width: 185px;
						}
					}
					li:hover {
						.index_1 {
							display: block;
						}
					}
				}
			}
			._rightDiv {
				display: flex;
				// justify-content: space-around;
				flex-wrap: wrap;

				div {
					width: 100%;
					margin-bottom: 1rem;
					display: flex;
					p {
						width: 20%;
						border: #6bcbca 2px solid;
					}
					.overview_ul_left {
						width: 30%;

						li {
							position: relative;
							@include docLi;
							.index_1 {
								position: absolute;
								// right: 0px;
								top: 0px;
								right: -460px;
								width: 457px;
								// height: 400px;
								padding: 10px;
								background: #fff;
								border: 1px solid #dedede;
								box-sizing: border-box;
								box-shadow: 0px 8px 15px rgb(128 128 128 / 25%);
								li {
									width: 185px;
								}
							}
						}

						li:hover {
							.index_1 {
								display: block;
							}
						}
					}
				}
			}
			.over_div {
				.top_appointment {
					width: 100%;
					// margin-left: 10%;
					margin-top: 5%;
					height: 82px;
					li {
						width: 180px;
						height: 82px;
						font-size: 24px;
						font-weight: bold;
						color: #fff;
						border: 2px solid #005197;
						padding: 10px;
						box-sizing: border-box;
						cursor: pointer;
						// border-radius: 30px;
						overflow: hidden;
					}
					.Before_li {
						background: #005197;
						color: #fff;
					}
					.After_li {
						color: #005197;
					}
					li:first-child {
						border-radius: 30px 0px 0px 30px;
					}
					li:last-child {
						border-radius: 0px 30px 30px 0px;
					}
				}
				// .right_appointment {
				// 	width: 80%;
				// 	margin-left: 10%;
				// 	margin-top: 5%;
				// 	height: 82px;
				// 	li {
				// 		width: 215px;
				// 		height: 82px;
				// 		font-size: 24px;
				// 		font-weight: bold;
				// 		color: #fff;
				// 		border: 2px solid #005197;
				// 		padding: 10px;
				// 		box-sizing: border-box;
				// 		cursor: pointer;
				// 		border-radius: 30px;
				// 		overflow: hidden;
				// 	}
				// 	.Before_li {
				// 		background: #005197;
				// 		color: #fff;
				// 	}
				// 	.After_li {
				// 		color: #005197;
				// 	}
				// 	li:first-child {
				// 		border-radius: 30px 0px 0px 30px;
				// 	}
				// 	li:last-child {
				// 		border-radius: 0px 30px 30px 0px;
				// 	}
				// }
				.right_department {
					@include right_department;
				}
				.p_department {
					@include p_department;
				}
			}
		}
	}
}
</style>
