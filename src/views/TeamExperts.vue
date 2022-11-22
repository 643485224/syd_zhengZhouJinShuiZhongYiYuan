<template>
	<div class="tdzj">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/c9530992f197775d6eae5c7b91d343e.jpg')"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<h2>
					<span>{{ TeamExpertsText }}<span style="color:#000;">(按姓名拼音排序，排名不分先后)</span></span>
				</h2>
				<div v-loading="fullscreenLoading" v-if="fullscreenLoading" class="loading"></div>
				<ul class="flex-wrap">
					<li class="flex-space-between" v-for="(item, index) in synopsisList" :key="index">
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
			<div class="overview-right">
				<h2>专家查询</h2>
				<ul>
					<li>
						<!-- <el-select v-model="diseaseForm.disease" clearable placeholder="请选择科室" value-key="deptno">
							<el-option v-for="item in disease" :key="item.deptno" :label="item.deptname" :value="item"> </el-option>
						</el-select> -->
						<el-cascader v-model="diseaseForm.diseaseList" placeholder="请选择科室" :options="disease" @change="handleChange" :props="optionProps" clearable class="w250"></el-cascader>
					</li>
					<li>
						<el-input placeholder="请输入专家姓名" v-model="diseaseForm.expert" clearable class="w220"></el-input>
					</li>

					<li>
						<el-button type="primary" @click="query(diseaseForm)">查询</el-button>
					</li>
				</ul>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//专家团队 Page
import Logo from "../components/logo/index.vue";
import IMG from "../components/IMG/index.vue";
import DBDH from "../components/dbdh/index.vue";
import WebApi from "../webapi/modules/webapi";
import { mapState } from "vuex";
export default {
	data() {
		return {
			synopsisList: [],
			newSynopsisList: [],
			synopsisLength: 0,
			formSearch: {
				currentPage: 1,
				pageAmount: 12,
			},

			disease: [],
			diseaseForm: {
				//查询条件
				diseaseList: [],
				disease: "",
				department: "",
				expert: "",
			},
			fullscreenLoading: false,
			optionProps: {
				value: "deptno",
				label: "subjectName",
			},
		};
	},
	created() {
		this.request(this.$route.query.data, this.$route.query.value, this.$route.query.name, this.formSearch.currentPage, this.formSearch.pageAmount);
		this.openFullScreen1();
		this.query3();
	},
	mounted() {},
	methods: {
		openFullScreen1() {
			this.fullscreenLoading = true;
		},
		async request(data, value, name, page, size) {
			console.log(data, value, name, page, size, "接收到的数据");
			let pageValue = Object.assign({}, this.formSearch, {
				currentPage: this.formSearch.currentPage - 1,
			});
			page = pageValue.currentPage;
			this.synopsisList = [];
			this.fullscreenLoading = true;

			// if (!data && !value) {
			// 	WebApi.getDoctor(page, size, "")
			// 		.then(({ data }) => {
			// 			// console.log(data, 1111)
			// 			// this.synopsisList = data.data
			// 			this.synopsisList = data.data.content;
			// 			this.synopsisLength = data.data.totalElements;
			// 			this.fullscreenLoading = false;
			// 			// this.getTableData();
			// 		})
			// 		.catch((err) => console.log("网络请求失败", err));
			// } else {
			WebApi.newDeptNo(data, value, name, page, size)
				.then(({ data }) => {
					console.log(data, 222);
					this.fullscreenLoading = false;
					if (data.data.length == 0) {
						return;
					}
					// this.synopsisList = data.data
					this.synopsisList = data.data.content;
					this.synopsisLength = data.data.totalElements;

					// this.getTableData();
				})
				.catch((err) => console.log("网络请求失败", err));
			// WebApi.deptNo(data, value, page, size)
			// 	.then(({ data }) => {
			// 		console.log(data, 222);
			// 		this.fullscreenLoading = false;
			// 		if (data.data.length == 0) {
			// 			return;
			// 		}
			// 		// console.log(data, 222)
			// 		// this.synopsisList = data.data
			// 		this.synopsisList = data.data.content;
			// 		this.synopsisLength = data.data.totalElements;

			// 		// this.getTableData();
			// 	})
			// 	.catch((err) => console.log("网络请求失败", err));
			// }
		},
		//科室数据
		query3() {
			WebApi.getSubject2()
				.then(({ data }) => {
					this.disease = data.data;
				})
				.catch((err) => console.log("网络请求失败", err));
		},
		async jumpPage(item) {
			console.log(item);
			// this.$store.commit("banner", "专家简介");
			let newPageUrl = this.$router.resolve({
				name: "Details5",
				query: { id: item.id, name: item.deptname, deptno: item.deptno, newBanner: "专家简介", newBannerText: this.$store.state.bannerText  },
			});
			window.open(newPageUrl.href);
		},

		query(data) {
			this.synopsisLength = 0;
			this.synopsisList = [];
			this.formSearch.currentPage = 1;
			this.fullscreenLoading = true;
			if (!data.disease && !data.expert) {
				this.$store.commit("TeamExpertsText", "专家列表");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
				return;
			} else if (!data.disease) {
				this.$store.commit("TeamExpertsText", "专家查询结果");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
			} else {
				this.$store.commit("banner", "专家团队");
				this.$store.commit("TeamExpertsText", "专家列表");
				this.$router.push({ name: "TeamExperts", query: { data: data.disease, value: null, name: data.expert } });
			}
		},
		handleSizeChange(val) {
			this.formSearch.pageAmount = val;
			// this.getTableData()
			this.request(this.$route.query.data, this.$route.query.value, this.$route.query.name, this.formSearch.currentPage, this.formSearch.pageAmount);
		},
		handleCurrentChange(val) {
			this.formSearch.currentPage = val;
			// this.getTableData()
			this.request(this.$route.query.data, this.$route.query.value, this.$route.query.name, this.formSearch.currentPage, this.formSearch.pageAmount);
		},
		// getTableData() {
		// 	this.synopsisList = this.newSynopsisList.slice((this.formSearch.currentPage - 1) * this.pageAmount, this.formSearch.currentPage * this.pageAmount)
		// },
		handleChange(value) {
			console.log(value);
			this.diseaseForm.disease = value[value.length - 1];
		},
	},
	watch: {
		$route() {
			this.synopsisLength = 0;
			this.synopsisList = [];
			this.formSearch.currentPage = 1;
			this.request(this.$route.query.data, this.$route.query.value, this.$route.query.name, this.formSearch.currentPage, this.formSearch.pageAmount);
		},
	},
	components: {
		Logo,
		IMG,
		DBDH,
	},
	computed: {
		...mapState(["TeamExpertsText", "TeamExpertsDoc"]),
	},
};
</script>
<style lang="scss" scoped>
.tdzj {
	width: 100%;
	height: 100%;
	.overview {
		.overview-left {
			width: 70%;
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
				width: 100%;
				li {
					width: 33.33%;
					height: 166px;
					padding: 10px;
					box-sizing: border-box;
					.docImg {
						display: block;
						width: 40%;
						// border: 1px solid #01b9b7;
						border: #dfdfdf 1px solid;
						padding: 3px;
						box-sizing: border-box;
						img {
							width: 100%;
							height: 100%;
							// padding: 3px;
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
		}
		.overview-right {
			width: 25%;
			// padding: 5px 10px 30px;
			// box-sizing: border-box;
			h2 {
				font-size: 18px;
				line-height: 40px;
				padding-left: 20px;
				background: #57afd5;
				color: #fff;
			}
			ul {
				padding: 25px;
				box-sizing: border-box;
				background: aliceblue;
				border-bottom: 10px solid #57afd5;
				li {
					text-align: center;

					margin-bottom: 20px;
					.el-select {
						width: 100%;
						border-radius: 0px;
					}
					.el-input {
						width: 100%;
					}
					.el-button {
						width: 100%;
					}
				}
			}
		}
	}
}
</style>
