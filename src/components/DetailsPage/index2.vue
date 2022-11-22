<template>
	<div class="details">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')" :fontSize="10" :titlePage="$route.query.newBanner"></IMG>
		<div class="overview w1200">
			<div class="overview-content">
				<h2>
					<span>{{ $route.query.newBanner }}</span>
					<span style="font-size: 12px; float: right;color: #808080;"> 您的当前位置：首页>>>{{ $route.query.bannerText }}>>> 详情内容 </span>
				</h2>
				<div class="clear:both"></div>
				<div class="overview-details">
					<h3>{{ $route.query.data }}</h3>
					<h4>
						发布时间：{{ $route.query.time }}
						<span class="h4-span">
							选择字号：
							<span @click="typeface(1)">小 &nbsp;</span>
							<span @click="typeface(2)">中 &nbsp;</span>
							<span @click="typeface(3)">大 &nbsp;</span>
						</span>
					</h4>
					<div class="newsContent" v-html="$store.state.synopsisHtmlContent[$route.query.id]">
						{{ $store.state.synopsisHtmlContent[$route.query.id] }}
					</div>
				</div>
			</div>
		</div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//详情页 Page
import Logo from "../logo/index.vue";
import IMG from "../IMG/index.vue";
import DBDH from "../dbdh/index.vue";
export default {
	data() {
		return {};
	},
	created() {},
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
	},
	watch: {},
	components: {
		Logo,
		IMG,
		DBDH,
	},
};
</script>

<style lang="scss" scoped>
.details {
	width: 100%;
	height: 100%;
	.overview {
		.overview-content {
			h2 {
				color: #01b9b7;
				// text-decoration: none;
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
