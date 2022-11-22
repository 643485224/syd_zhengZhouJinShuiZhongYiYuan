<template>
	<div class="details">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')" :fontSize="10" :titlePage="$route.query.newBanner"></IMG>
		<div class="overview w1200">
			<div class="overview-left">
				<h2>{{ synopsisText }}</h2>
				<ul>
					<li v-for="(item, index) in bannerList" :key="index" @click="request(item, index)">
						{{ item }}
					</li>
				</ul>
			</div>
			<div class="overview-right">
				<!-- <Crumbs></Crumbs> -->
				<h2 class="Blue">{{ synopsisText }}</h2>
				<div v-loading="fullscreenLoading" v-if="fullscreenLoading" class="loading"></div>
				<ul v-if="synopsisText == deptamentList.deptname + '简介'">
					<li>
						<p v-html="synopsisHtml">
							{{ synopsisHtml }}
						</p>
					</li>
				</ul>

				<div v-if="synopsisText == deptamentList.deptname + '专家列表'">
					<ul>
						<li v-for="(item, index) in synopsisList" :key="index" style="	height: 166px;">
							<a href="javascript:void(0)" class="docImg" @click="jumpPage(item)">
								<img :src="`data:image/jpeg;base64,` + item.doctorphoto" :title="item.doctor" />
							</a>
							<div>
								<p>
									<strong>姓名:</strong>
									<a href="javascript:void(0)" :title="item.doctor" @click="jumpPage(item)">
										{{ item.doctor }}
									</a>
								</p>
								<!-- <p>
									<strong>职称:</strong>
									{{ item.majorname }}
								</p> -->
								<p>
									<strong>科室:</strong>
									{{ item.deptname }}
								</p>
								<p>
									<strong>职称:</strong>
									{{ item.doctortitle }}
								</p>
								<!-- <p>
									<strong>职务:</strong>
									{{ item.doctorJob }}
								</p> -->
								<!-- <p>
									<strong>坐诊时间:</strong>
									{{ item.sittingTime }}
								</p> -->
							</div>
						</li>
					</ul>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formSearch.currentPage" :page-size="formSearch.pageAmount" :page-sizes="[12, 24, 36, 48]" layout="total, sizes, prev, pager, next, jumper" :total="synopsisLength" v-if="synopsisLength > 12">
					</el-pagination>
				</div>
				<ul v-if="synopsisText == deptamentList.deptname + '动态列表'">
					<li>
						111
					</li>
				</ul>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//详情页3 Page
import Logo from "../logo/index.vue";
import IMG from "../IMG/index.vue";
import DBDH from "../dbdh/index.vue";
import { mapState } from "vuex";
import WebApi from "../../webapi/modules/webapi";
export default {
	data() {
		return {
			bannerList: ["科室概况", "科室专家"], // "工作动态"
			synopsisText: "",
			synopsisList: [],
			synopsisHtml: "", //简介
			newSynopsisList: [],
			synopsisLength: 0,
			formSearch: {
				currentPage: 1,
				pageAmount: 12,
			},
			fullscreenLoading: false,
		};
	},
	created() {
		this.request(this.$route.query.data);
		this.synopsisText = this.$route.query.data + "简介";
	},
	mounted() {},
	methods: {
		async request(data, index) {
			console.log(data, index);
			this.fullscreenLoading = true;
			this.synopsisList = [];
			this.synopsisHtml = "";
			if (index == 0) {
				this.synopsisText = this.deptamentList.deptname + "简介";
				await WebApi.deptName(this.deptamentList.deptname)
					.then(({ data }) => {
						// console.log(data);
						this.fullscreenLoading = false;
						this.synopsisHtml = data.data[0].news.htmlContent;
					})
					.catch((err) => {
						console.log(err);
						console.log("请检查网络或联系平台人员");
					});
			} else if (index == 1) {
				this.fullscreenLoading = true;
				let pageValue = Object.assign({}, this.formSearch, {
					currentPage: this.formSearch.currentPage - 1,
				});
				this.synopsisText = this.deptamentList.deptname + "专家列表";
				WebApi.deptNo2(this.deptamentList.deptno, "", pageValue.currentPage, this.formSearch.pageAmount)
					.then(({ data }) => {
						console.log(data, "科室专家");
						this.synopsisList = data.data.content;
						// this.newSynopsisList = resp.data.data
						this.synopsisLength = data.data.totalElements;
						this.fullscreenLoading = false;
					})
					.catch((err) => {
						console.log("请检查网络或联系平台人员", err);
					});
			} else if (index == 2) {
				this.synopsisText = this.deptamentList.deptname + "工作动态";
				this.fullscreenLoading = true;
			} else {
				WebApi.deptName(data)
					.then(({ data }) => {
						console.log(data);
						this.fullscreenLoading = false;
						if (data.data.length == 0) {
							return;
						}
						this.synopsisHtml = data.data[0].news.htmlContent;
					})
					.catch((err) => {
						console.log(err);
						console.log("请检查网络或联系平台人员");
					});
				// console.log(resp, "科室简介")
			}
		},
		async jumpPage(item) {
			// console.log(item)
			let newPageUrl = this.$router.resolve({
				name: "Details5",
				query: { id: item.id, name: item.deptname, deptno: item.deptno, newBanner: "专家简介", newBannerText: this.$store.state.bannerText },
			});
			window.open(newPageUrl.href);
		},
		handleSizeChange(val) {
			this.formSearch.pageAmount = val;
			// this.getTableData()
			this.request("", 1, this.formSearch.currentPage, this.formSearch.pageAmount);
		},
		handleCurrentChange(val) {
			this.formSearch.currentPage = val;
			// this.getTableData()
			this.request("", 1, this.formSearch.currentPage, this.formSearch.pageAmount);
		},
		// getTableData() {
		// 	this.synopsisList = this.newSynopsisList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount)
		// },
	},
	watch: {
		$route() {
			this.request(this.$route.query.data);
		},
	},
	components: {
		Logo,
		IMG,
		DBDH,
	},
	computed: {
		...mapState(["bannerText", "deptamentList"]),
	},
};
</script>

<style lang="scss" scoped>
.details {
	width: 100%;
	height: 100%;
	.overview {
		display: flex;
		justify-content: space-between;
		.overview-left {
			width: 24%;
			height: 160px;
			background: #57afd5;
			padding: 10px;
			box-sizing: border-box;
			h2 {
				font-size: 18px;
				line-height: 40px;
				color: #fff;
			}
			ul {
				background: #fff;

				li {
					height: 40px;
					line-height: 40px;
					text-align: center;
					font-size: 18px;
					font-weight: 600;
					color: #005197;
				}

				li:hover {
					background: #005197;
					color: #fff;
				}
			}
		}
		// .overview-right {
		// 	width: 70%;

		// 	h2 {
		// 		font-size: 18px;
		// 		line-height: 40px;
		// 		height: 40px;
		// 		color: #01b9b7;
		// 		text-decoration: none;
		// 		border-bottom: #01b9b7 3px solid;
		// 	}
		// }
		.overview-right {
			// width: 870px;
			width: 75%;
			height: 100%;
			h2 {
				color: #01b9b7;
				text-decoration: none;
				font-size: 18px;
				line-height: 40px;
				height: 40px;
				border-bottom: #01b9b7 3px solid;
				margin-bottom: 10px;
			}
			.loading {
				height: 200px;
			}
			ul {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				color: #666;
				li {
					width: 33.33%;

					display: flex;
					justify-content: space-between;
					padding: 10px;
					// border: 1px solid #888;
					box-sizing: border-box;
					.docImg {
						display: block;
						width: 40%;
						img {
							width: 100%;
							height: 100%;
							padding: 3px;
							border: #dfdfdf 1px solid;
							box-sizing: border-box;
							object-fit: cover;
						}
					}
					div {
						width: 55%;
						p {
							margin-bottom: 10px;
							a:hover {
								text-decoration: revert;
							}
						}
					}
				}
			}
			ul:nth-child(2) {
				li {
					width: 100%;
					padding: 10px;
					text-indent: 2em;
					box-sizing: border-box;
				}
			}
		}
	}
}
</style>
