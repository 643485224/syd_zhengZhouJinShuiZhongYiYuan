<template>
	<div class="yygk">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<QuickNavigation :keyBoolen="true"></QuickNavigation>
			</div>

			<div class="overview-right newsContent" v-if="listLength == 1">
				<Crumbs></Crumbs>
				<template v-if="$route.query.id == 0">
					<div v-if="newSynopsis_one.length == 0">
						<h2 v-if="!loading">暂无信息</h2>
						<el-skeleton :rows="1" :loading="loading" animated />
					</div>
					<div v-else>
						<h3>{{ newSynopsis_one.title }}</h3>
						<h4>发布时间：{{ newSynopsis_one.createTime.slice(0, 11) }}</h4>
						<p v-html="newSynopsis_one.htmlContent">
							{{ newSynopsis_one.htmlContent }}
						</p>
					</div>
				</template>
				<template v-else-if="$route.query.id == 1">
					<div v-if="newSynopsis_two.length == 0">
						<h2 v-if="!loading">暂无信息</h2>
						<el-skeleton :rows="1" :loading="loading" animated />
					</div>
					<div v-else>
						<h3>{{ newSynopsis_two.title }}</h3>
						<h4>发布时间：{{ newSynopsis_two.createTime.slice(0, 11) }}</h4>
						<p v-html="newSynopsis_two.htmlContent">
							{{ newSynopsis_two.htmlContent }}
						</p>
					</div>
				</template>
			</div>
			<div class="overview-right" v-else>
				<Crumbs></Crumbs>
				<ul>
					<li v-if="synopsisList.length == 0">
						<h2 v-if="!loading">暂无信息</h2>
						<el-skeleton :rows="1" :loading="loading" animated />
					</li>
					<li v-else v-for="(item, index) in synopsisList" :key="index">
						<a href="javascript:void(0)" :title="item.title" @click="newPage(item, index)">
							<span><i class="icon"></i>{{ item.title }}</span>
							<span>[{{ item.createTime.slice(0, 11) }}]</span>
						</a>
					</li>
				</ul>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageAmount" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="synopsisLength" v-if="synopsisLength > 10"> </el-pagination>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//医院概况 Page
import Logo from "../components/logo/index.vue";
import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Crumbs from "../components/crumbs/index.vue";
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			// synopsis: "",
			listLength: "",
			synopsisList: [],
			synopsisHtmlContent: [],
			newSynopsisList: [],
			synopsisLength: 0,
			currentPage: 1,
			pageAmount: 10,
			loading: true,
			newSynopsis_one: [], //医院简介内容
			newSynopsis_two: [], //医院文化内容
		};
	},
	created() {
		this.request(this.$route.query.id);
	},
	mounted() {},
	methods: {
		request(data) {
			// console.log(data);
			this.loading = true;
			this.synopsisList = [];
			this.newSynopsis_one = [];
			this.newSynopsis_two = [];
			if (data == 0) {
				WebApi.queryHospitalProfileInfo()
					.then(({ data }) => {
						console.log(data);
						this.loading = false;
						if (data.data.length == 0) {
							return;
						}
						this.listLength = 1;
						// this.synopsis = data.data[0].htmlContent;
						this.newSynopsis_one = data.data[0];
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else if (data == 1) {
				WebApi.queryHospitalCulture()
					.then(({ data }) => {
						this.loading = false;
						if (data.data.length == 0) {
							return;
						}
						this.listLength = 1;
						// this.synopsis = data.data[0].htmlContent;
						this.newSynopsis_two = data.data[0];
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else if (data == 2) {
				WebApi.queryHospitalHonors()
					.then(({ data }) => {
						this.loading = false;
						if (data.data.length == 0) {
							return;
						}
						this.listLength = data.data.length;
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.synopsisHtmlContent = [];
						for (let i = 0; i < data.data.length; i++) {
							this.synopsisHtmlContent.push(data.data[i].htmlContent);
						}
						this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);
						this.getTableData();
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else if (data == 3) {
				WebApi.queryHospitalMemorabilia()
					.then(({ data }) => {
						console.log(data);
						this.loading = false;
						if (data.data.length == 0) {
							return;
						}
						this.listLength = data.data.length;
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.synopsisHtmlContent = [];
						for (let i = 0; i < data.data.length; i++) {
							this.synopsisHtmlContent.push(data.data[i].htmlContent);
						}
						this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);
						this.getTableData();
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			}
		},
		newPage(item) {
			console.log(item);
		

			let newPageUrl = this.$router.resolve({
				name: "Details",
				query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2 ,newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText },
			});
			window.open(newPageUrl.href);
		},
		handleSizeChange(val) {
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getTableData();
		},
		getTableData() {
			this.synopsisList = this.newSynopsisList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
	},
	watch: {
		$route() {
			this.request(this.$route.query.id);
		},
	},
	components: {
		Logo,
		IMG,
		QuickNavigation,
		DBDH,
		Crumbs,
	},
};
</script>
<style lang="scss" scoped>
@mixin HH {
	h3 {
		font-size: 18px;
		line-height: 40px;
		text-align: center;
		height: 40px;
		overflow: hidden;
	}
	h4 {
		font-size: 12px;
		font-weight: normal;
		line-height: 36px;
		text-align: center;
		margin: 0px 20px;
		border-top: #dfdfdf 1px solid;
		color: #999;
		.h4-span {
			margin-left: 40px;
			span:hover {
				color: red;
			}
		}
	}
}
.yygk {
	width: 100%;
	height: 100%;
	.overview {
		.overview-left {
			width: 24%;
		}
		.overview-right {
			width: 75%;
			ul {
				li {
					width: 100%;
					height: 40px;

					line-height: 40px;
					border-bottom: #c7c7c7 1px dashed;
					font-size: 16px;
					a {
						display: block;
						width: 100%;
						height: 100%;
						color: #555;
						font-family: "微软雅黑";
						display: flex;
						justify-content: space-between;
					}
					a:hover {
						color: cornflowerblue;
					}
				}
			}
		}
		.newsContent {
			@include HH;
			margin-top: 8px;
			color: #666;
			line-height: 30px;
			font-size: 16px;
			text-align: justify;
			text-justify: inter-ideograph;
			font-family: 微软雅黑;
		}
	}
}
</style>
