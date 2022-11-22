<template>
	<div class="yygk">
		<Logo></Logo>
		<IMG :fontSize="34" :type="$route.query.id"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<QuickNavigation :keyBoolen="true"></QuickNavigation>
			</div>
			<div class="overview-right">
				<Crumbs :ShowBoolen="false"></Crumbs>
				<ul>
					<li v-if="synopsisList.length == 0">
						<h2 v-if="!loading">暂无信息</h2>
						<el-skeleton :rows="1" :loading="loading" animated />
					</li>
					<el-collapse class="each_collapse" v-else-if="synopsisList.length !== 1" v-for="(item, index) in synopsisList" v-model="activeName" :key="index" accordion @change="handleChange(item, index)">
						<el-collapse-item :title="item.hospitalName" :name="index">
							<!-- <li v-if="synopsisList[index].hasChildren">
								<a href="javascript:void(0)" :title="item.title" @click="newPage(item)">
									<span><i class="icon"></i>{{ item.hospitalName }}</span>
									<span>[{{ item.createTime.slice(0, 11) }}]</span>
								</a>
							</li> -->
							<li v-if="childSynopsisList.length == 0">
								<h2 v-if="!childLoading">暂无信息</h2>
								<el-skeleton :rows="1" :loading="childLoading" animated />
							</li>
							<li v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items)">
									<span><i class="icon"></i>{{ items.hospitalName }}</span>
									<span>[{{ items.createTime.slice(0, 11) }}]</span>
								</a>
							</li>
						</el-collapse-item>
					</el-collapse>
					<li v-else v-for="(item, index) in synopsisList" :key="index">
						<a href="javascript:void(0)" :title="item.title" @click="newPage(item)">
							<span><i class="icon"></i>{{ item.hospitalName }}</span>
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
//各个院区 Page
import Logo from "../components/logo/index.vue";
import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Crumbs from "../components/crumbs/index.vue";
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			synopsis: "",
			listLength: "",
			synopsisList: [],
			synopsisHtmlContent: [],
			newSynopsisList: [],
			synopsisLength: 0,
			currentPage: 1,
			pageAmount: 10,
			loading: true,
			hospationList: ["医院简介", "来院路线"],
			activeName: null,
			childSynopsisList: [],
			childLoading: true,
		};
	},
	created() {
		this.request(this.$route.query.id, this.$route.query.data);
	},
	mounted() {},
	methods: {
		request(id, val) {
			console.log(id, val, "eachhospitalArea");
			this.synopsisList = [];
			this.currentPage = 1;
			this.loading = true;
			if (parseInt(id) == 20) {
				WebApi.getChildHospationInfo(id, val)
					.then(({ data }) => {
						console.log(data.data);
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.getTableData();
						if (data.data.length == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else if (id == 0 || id == 1 || id == 2) {
				console.log(parseInt(id) + 1);
				WebApi.getChildHospationInfo(parseInt(id) + 1, val)
					.then(({ data }) => {
						console.log(data);
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.getTableData();
						if (data.data.length == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else if (id == 3) {
				this.activeName = null;
				WebApi.getChildHospationInfo(parseInt(20), val)
					.then(({ data }) => {
						console.log(data);
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.getTableData();
						if (data.data.length == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			}
		},
		newPage(item) {
			console.log(item);
			if (item.hasChildren) {
				WebApi.getChildHospationInfo(item.id, item.hospitalName)
					.then(({ data }) => {
						console.log(data);
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.getTableData();
						if (this.synopsisList == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else {
				let newPageUrl = this.$router.resolve({
					name: "Details6",
					query: { id: item.id, data: item.hospitalName, newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText },
				});
				window.open(newPageUrl.href);
			}
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
			this.synopsisList = this.newSynopsisList.slice(this.currentPage - 1 * this.pageAmount, this.currentPage * this.pageAmount);
		},
		async handleChange(item, index) {
			console.log(item);
			this.activeName = index;
			this.childSynopsisList = [];
			this.childLoading = true;
			await WebApi.getChildHospationInfo(item.id, item.hospitalName)
				.then(({ data }) => {
					console.log(data);
					this.childSynopsisList = data.data;
					// this.synopsisLength = data.data.length;
					// this.getTableData();
					if (this.childSynopsisList.length == 0) {
						this.childLoading = false;
					}
				})
				.catch(() => {
					console.log("网络请求失败");
					this.childLoading = false;
				});
		},
	},
	watch: {
		$route() {
			this.request(this.$route.query.id, this.$route.query.data);
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
.yygk {
	width: 100%;
	height: 100%;
	.overview {
		.overview-left {
			width: 24%;
		}
		.overview-right {
			width: 870px;
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
						// color: #57afd5;
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
	}
}
</style>
