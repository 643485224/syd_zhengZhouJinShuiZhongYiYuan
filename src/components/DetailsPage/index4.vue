<template>
	<div class="details">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')" :fontSize="10" :titlePage="$route.query.newBanner"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<QuickNavigation :keyBoolen="false"></QuickNavigation>
			</div>
			<div class="overview-content">
				<h2>
					<span>{{ $route.query.newBanner }}</span>
					<!-- >>> 预约挂号内容 -->
					<span style="font-size: 12px; float: right;color: #808080;"> 您的当前位置：首页>>>{{ $route.query.newBannerText }}>>>{{ $route.query.newBanner }} </span>
				</h2>
				<div class="clear:both"></div>
				<div class="overview-details" v-if="synopsisHtmlContent.length == 0">
					<h3 v-if="!loading">暂无信息</h3>
					<el-skeleton :rows="6" :loading="loading" animated />
				</div>
				<div class="overview-details" v-else v-for="(item, index) in synopsisHtmlContent.slice(0, 1)" :key="index">
					<h3>{{ item.title }}</h3>
					<h4>
						发布时间：{{ item.createTime.slice(0, 11) }}
						<span class="h4-span">
							选择字号：
							<span @click="typeface(1)">小 &nbsp;</span>
							<span @click="typeface(2)">中 &nbsp;</span>
							<span @click="typeface(3)">大 &nbsp;</span>
						</span>
					</h4>
					<div class="newsContent" v-html="item.htmlContent">
						{{ item.htmlContent }}
					</div>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//详情页 Page
import Logo from "../logo/index.vue";
import IMG from "../IMG/index.vue";
import DBDH from "../dbdh/index.vue";
import WebApi from "../../webapi/modules/webapi";
import QuickNavigation from "../QuickNavigation/index.vue";
export default {
	data() {
		return {
			synopsisHtmlContent: [],
			loading: true,
		};
	},
	created() {
		this.request(this.$route.query.id, this.$route.query.data);
	},
	mounted() {},
	methods: {
		typeface(type) {
			let size = document.getElementsByClassName("newsContent");
			switch (type) {
				case 1:
					size[0].style.fontSize = "12px";
					break;
				case 2:
					size[0].style.fontSize = "14px";
					break;
				case 3:
					size[0].style.fontSize = "18px";
					break;
				default:
					console.log("请联系开发人员");
					break;
			}
		},
		request(id, val) {
			this.loading = true;
			WebApi.getNewsDetails(id, val)
				// WebApi.getNewsDetailsPage2(data)
				.then(({ data }) => {
					console.log(data);
					if (data.data.length == 0) {
						this.loading = false;
						return;
					}
					this.synopsisHtmlContent = data.data;
					console.log(this.synopsisHtmlContent);
				})
				.catch(() => {
					console.log("请求失败");
					this.loading = false;
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
		DBDH,
		QuickNavigation,
	},
};
</script>

<style lang="scss" scoped>
.details {
	width: 100%;
	height: 100%;
	.overview {
		// display: flex;
		.overview-left {
			width: 24%;
		}
		.overview-content {
			width: 75%;
			h2 {
				color: #01b9b7;
				text-decoration: none;
				font-size: 18px;
				line-height: 40px;
				height: 40px;
				border-bottom: #01b9b7 3px solid;
			}
			.overview-details {
				font-size: 12px;
				font-weight: normal;
				line-height: 36px;
				text-align: center;
				margin: 0px 20px;
				padding: 10px 0px;
				border-top: #dfdfdf 1px solid;
				color: #999;
				box-sizing: border-box;
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
				.newsContent {
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
	}
}
</style>
