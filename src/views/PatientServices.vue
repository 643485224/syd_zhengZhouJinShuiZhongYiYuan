<template>
	<div class="tdzj">
		<Logo></Logo>
		<!-- <IMG ></IMG> -->
		<div class="overview w1200">
			<img src="../assets/imgs/bfff84357878f8459bb221271abadfa.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between ">
			<div class="overview-left">
				<QuickNavigation :keyBoolen="true"></QuickNavigation>
			</div>
			<div class="overview-right">
				<Crumbs></Crumbs>
				<ul>
					<li v-if="synopsisList.length == 0">
						<h2 v-if="!loading">暂无信息</h2>
						<el-skeleton :rows="1" :loading="loading" animated />
					</li>
					<el-collapse class="each_collapse" v-else-if="$store.state.banner == '交通路线'" v-for="(item, index) in synopsisList" v-model="activeName" :key="index" accordion @change="handleChange(item, index)">
						<el-collapse-item :title="item.title" class="collapse" :name="index">
							<li v-if="childSynopsisList.length == 0">
								<h2 v-if="!childLoading">暂无信息</h2>
								<el-skeleton :rows="1" :loading="childLoading" animated />
							</li>
							<li v-else-if="childSynopsisList.length == 1" v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<span>[{{ items.createTime.slice(0, 11) }}]</span>
								</a>
							</li>
							<el-collapse v-else-if="childSynopsisList.length == 3" class="organ" v-for="(item, index) in childSynopsisList" v-model="newActiveName" :key="index" accordion @change="newHandleChange(item, index)">
								<el-collapse-item :title="item.title" :name="index">
									<li v-if="grandsonSynopsisList.length == 0">
										<h2 v-if="!grandsonChildLoading">暂无信息</h2>
										<el-skeleton :rows="1" :loading="grandsonChildLoading" animated />
									</li>
									<li v-else v-for="(items, i) in grandsonSynopsisList" :key="i">
										<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
											<span><i class="icon"></i>{{ items.title }}</span>
											<span>[{{ items.createTime.slice(0, 11) }}]</span>
										</a>
									</li>
								</el-collapse-item>
							</el-collapse>
							<li v-else v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<!-- <span>[{{ items.createTime.slice(0, 11) }}]</span> -->
								</a>
							</li>
						</el-collapse-item>
					</el-collapse>
					<li v-else-if="$route.query.data == '北院区当月排班' || $route.query.data == '南院区当月排班' || $route.query.data == '东院区当月排班'" v-for="(item, index) in synopsisList" :key="index" @click="newPage(item, index)">
						<a href="javascript:void(0)" :title="item.title">
							<span><i class="icon"></i>{{ item.title }}</span>
							<span>[{{ item.createTime.slice(0, 11) }}]</span>
						</a>
					</li>
					<el-collapse class="each_collapse" v-else-if="$route.query.data == '总医院下属各分院、社区卫生服务中心及社区卫生服务站'" v-for="(item, index) in synopsisList" v-model="activeName" :key="index" accordion @change="handleChange(item, index)">
						<el-collapse-item :title="item.title" class="collapse" :name="index">
							<li v-if="childSynopsisList.length == 0">
								<h2 v-if="!childLoading">暂无信息</h2>
								<el-skeleton :rows="1" :loading="childLoading" animated />
							</li>
							<li v-else-if="childSynopsisList.length == 1" v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<span>[{{ items.createTime.slice(0, 11) }}]</span>
								</a>
							</li>
							<el-collapse v-else-if="childSynopsisList.length == 3" class="organ" v-for="(item, index) in childSynopsisList" v-model="newActiveName" :key="index" accordion @change="newHandleChange(item, index)">
								<el-collapse-item :title="item.title" :name="index">
									<li v-if="grandsonSynopsisList.length == 0">
										<h2 v-if="!grandsonChildLoading">暂无信息</h2>
										<el-skeleton :rows="1" :loading="grandsonChildLoading" animated />
									</li>
									<li v-else v-for="(items, i) in grandsonSynopsisList" :key="i">
										<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
											<span><i class="icon"></i>{{ items.title }}</span>
											<span>[{{ items.createTime.slice(0, 11) }}]</span>
										</a>
									</li>
								</el-collapse-item>
							</el-collapse>
							<li v-else v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<!-- <span>[{{ items.createTime.slice(0, 11) }}]</span> -->
								</a>
							</li>
						</el-collapse-item>
					</el-collapse>
					<el-collapse class="each_collapse" v-else-if="$store.state.banner == '门诊排班'" v-for="(item, index) in synopsisList" v-model="activeName" :key="index" accordion @change="handleChange(item, index)">
						<el-collapse-item :title="item.title" class="collapse" :name="index">
							<li v-if="childSynopsisList.length == 0">
								<h2 v-if="!childLoading">暂无信息</h2>
								<el-skeleton :rows="1" :loading="childLoading" animated />
							</li>
							<li v-else-if="childSynopsisList.length == 1" v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<span>[{{ items.createTime.slice(0, 11) }}]</span>
								</a>
							</li>
							<el-collapse v-else-if="childSynopsisList.length == 3" class="organ" v-for="(item, index) in childSynopsisList" v-model="newActiveName" :key="index" accordion @change="newHandleChange(item, index)">
								<el-collapse-item :title="item.title" :name="index">
									<li v-if="grandsonSynopsisList.length == 0">
										<h2 v-if="!grandsonChildLoading">暂无信息</h2>
										<el-skeleton :rows="1" :loading="grandsonChildLoading" animated />
									</li>
									<li v-else v-for="(items, i) in grandsonSynopsisList" :key="i">
										<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
											<span><i class="icon"></i>{{ items.title }}</span>
											<span>[{{ items.createTime.slice(0, 11) }}]</span>
										</a>
									</li>
								</el-collapse-item>
							</el-collapse>
							<li v-else v-for="(items, i) in childSynopsisList" :key="i">
								<a href="javascript:void(0)" :title="items.title" @click="newPage(items, index)">
									<span><i class="icon"></i>{{ items.title }}</span>
									<!-- <span>[{{ items.createTime.slice(0, 11) }}]</span> -->
								</a>
							</li>
						</el-collapse-item>
					</el-collapse>
					<li v-else v-for="(item, index) in synopsisList" :key="index" @click="newPage(item, index)">
						<a href="javascript:void(0)" :title="item.title">
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
//首页-患者服务 Page
import Logo from "../components/logo/index.vue";
// import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Crumbs from "../components/crumbs/index.vue";
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			synopsisList: [],
			synopsisHtmlContent: [],
			newSynopsisList: [],
			synopsisLength: 0,
			currentPage: 1,
			pageAmount: 10,
			loading: true,
			activeName: null,
			childSynopsisList: [],
			childLoading: true,
			grandsonSynopsisList: [],
			grandsonChildLoading: true,
			newActiveName: null,
		};
	},
	created() {
		this.request(this.$route.query.id, this.$route.query.type, this.$route.query.data);
		console.log(this.$store.state.banner, "----------");
	},
	mounted() {},
	methods: {
		async request(data, type, val) {
			console.log(data, type, val);
			this.synopsisList = [];
			this.activeName = null;
			this.newActiveName = null;
			this.loading = true;
			if (type == 0) {
				WebApi.getNewsDetails(parseInt(data), val)
					.then(({ data }) => {
						console.log(data);
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.synopsisHtmlContent = [];
						for (let i = 0; i < data.data.length; i++) {
							this.synopsisHtmlContent.push(data.data[i].htmlContent);
						}
						this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);
						this.getTableData();
						if (this.synopsisLength == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			} else {
				WebApi.getNewsDetails(parseInt(data) + 80, val)
					.then(({ data }) => {
						console.log(data, "患者服务页");
						this.newSynopsisList = data.data;
						this.synopsisLength = data.data.length;
						this.synopsisHtmlContent = [];
						for (let i = 0; i < data.data.length; i++) {
							this.synopsisHtmlContent.push(data.data[i].htmlContent);
						}
						this.$store.commit("synopsisHtmlContent", this.synopsisHtmlContent);
						this.getTableData();
						if (this.synopsisLength == 0) {
							this.loading = false;
						}
					})
					.catch(() => {
						console.log("网络请求失败");
						this.loading = false;
					});
			}
		},

		async newPage(item, index) {
			console.log(item, index);
			console.log(item.htmlContent == undefined);
		
			if (item.htmlContent == undefined) {
				let newPageUrl = this.$router.resolve({
					name: "Details",
					query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 1,newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText  },
				});
				window.open(newPageUrl.href);
			} else {
				let newPageUrl = this.$router.resolve({
					name: "Details",
					query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2,newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText  },
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
			this.synopsisList = this.newSynopsisList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		async handleChange(item, index) {
			console.log(item);
			this.activeName = index;
			this.childSynopsisList = [];
			this.childLoading = true;
			await WebApi.getNewsDetails(item.id, item.title)
				.then(({ data }) => {
					console.log(data);
					this.childSynopsisList = data.data;
					if (this.childSynopsisList.length == 0) {
						this.childLoading = false;
					}
				})
				.catch((err) => {
					console.log("网络请求失败", err);
					this.childLoading = false;
				});
		},
		async newHandleChange(item, index) {
			console.log(item, index);
			this.newActiveName = index;
			this.grandsonSynopsisList = [];
			this.grandsonChildLoading = true;
			await WebApi.getNewsDetails(item.id, item.title)
				.then(({ data }) => {
					console.log(data);
					if (this.grandsonSynopsisList.length == 0) {
						this.grandsonChildLoading = false;
					}
					this.grandsonSynopsisList = data.data;
				})
				.catch(() => {
					console.log("网络请求失败");
					this.grandsonChildLoading = false;
				});
		},
	},
	watch: {
		$route() {
			this.request(this.$route.query.id, this.$route.query.type, this.$route.query.data);
		},
	},
	components: {
		Logo,
		// IMG,
		QuickNavigation,
		DBDH,
		Crumbs,
	},
};
</script>
<style lang="scss" scoped>
.tdzj {
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
