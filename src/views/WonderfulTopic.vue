<template>
	<div class="yygk">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')"></IMG>
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
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//精彩专题 Page
import Logo from "../components/logo/index.vue";
import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Crumbs from "../components/crumbs/index.vue";
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			synopsisList: [],
			loading: true,
		};
	},
	created() {
		this.request(this.$route.query.id, this.$route.query.data);
	},
	mounted() {},
	methods: {
		request(id, val) {
			console.log(id, val);
			this.synopsisList = [];
			this.loading = true;
			WebApi.getNewsDetails(parseInt(id) + 74, val)
				.then(({ data }) => {
					console.log(data);
					this.loading = false;
					if (data.data.length == 0) {
						return;
					}
					this.synopsisList = data.data;
				})
				.catch(() => {
					console.log("网络请求失败");
					this.loading = false;
				});
		},
		newPage(item, index) {
			console.log(item, index);

			let newPageUrl = this.$router.resolve({
				name: "Details",
				query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2, newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText },
			});
			window.open(newPageUrl.href);
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
			// width: 870px;
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
