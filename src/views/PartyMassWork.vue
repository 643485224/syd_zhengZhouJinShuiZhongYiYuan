<template>
	<div class="dqgz">
		<Logo></Logo>
		<!-- <IMG></IMG> -->
		<div class="overview w1200">
			<img src="../assets/imgs/b1de2a0f9551cbaa46adfbb7b798463.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between">
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
//党群工作 Page
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
			ImgUrl: "",
		};
	},
	created() {},
	mounted() {
		this.request(this.$route.query.id);
	},
	methods: {
		request(data) {
			this.synopsisList = [];
			this.loading = true;
			// data = parseInt(data) + 53;
			WebApi.partyPlaceOfBirth(parseInt(data) + 53)
				.then(({ data }) => {
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
		},
		newPage(item) {
			console.log(item);

			let newPageUrl = this.$router.resolve({
				name: "Details",
				query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2, newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText },
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
		// IMG,
		QuickNavigation,
		DBDH,
		Crumbs,
	},
};
</script>
<style lang="scss" scoped>
.dqgz {
	width: 100%;
	height: 100%;
	.overview {
		// display: flex;
		// justify-content: space-between;
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
	}
}
</style>
