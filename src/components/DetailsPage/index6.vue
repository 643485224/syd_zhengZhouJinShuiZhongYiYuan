<template>
	<div class="details">
		<Logo></Logo>
		<IMG :fontSize="34" :type="$route.query.id - 1"></IMG>
		<div class="overview w1200">
			<div class="overview-left">
				<h2>{{ $route.query.newBanner }}</h2>
				<ul>
					<li @click="newRequest($route.query.id, 0)">医院简介</li>
					<li @click="newRequest($route.query.id, 1)">医院路线</li>
				</ul>
			</div>
			<div class="overview-right">
				<h2 class="Blue">{{ synopsisText }}</h2>

				<div v-if="synopsisHtmlContent.length == 0">
					<h1 v-if="!fullscreenLoading">暂无信息</h1>
					<el-skeleton :rows="1" :loading="fullscreenLoading" animated />
				</div>
				<div class="newsContent" v-else>
					<div v-if="contentIndex == 0">
						<h3>{{ synopsisHtmlContent.hospitalBriefIntroduction.title }}</h3>
						<h4>
							发布时间：{{ synopsisHtmlContent.createTime.slice(0, 11) }}
							<span class="h4-span">
								选择字号：
								<span @click="typeface(1)">小 &nbsp;</span>
								<span @click="typeface(2)">中 &nbsp;</span>
								<span @click="typeface(3)">大 &nbsp;</span>
							</span>
						</h4>
						<!-- <p>{{ synopsisHtmlContent.hospitalBriefIntroduction.title }}</p> -->
						<div v-html="synopsisHtmlContent.hospitalBriefIntroduction.htmlContent">
							{{ synopsisHtmlContent.hospitalBriefIntroduction.htmlContent }}
						</div>
					</div>
					<div v-else>
						<!-- <p>{{ synopsisHtmlContent.hospitalRoute.title }}</p> -->
						<h3>{{ synopsisHtmlContent.hospitalRoute.title }}</h3>
						<h4>
							发布时间：{{ synopsisHtmlContent.createTime.slice(0, 11) }}
							<span class="h4-span">
								选择字号：
								<span @click="typeface(1)">小 &nbsp;</span>
								<span @click="typeface(2)">中 &nbsp;</span>
								<span @click="typeface(3)">大 &nbsp;</span>
							</span>
						</h4>
						<div v-html="synopsisHtmlContent.hospitalRoute.htmlContent">
							{{ synopsisHtmlContent.hospitalRoute.htmlContent }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//各个园区的来院路线 Page
import Logo from "../logo/index.vue";
import IMG from "../IMG/index.vue";
import DBDH from "../dbdh/index.vue";
import WebApi from "../../webapi/modules/webapi";
import { mapState } from "vuex";
export default {
	data() {
		return {
			synopsisHtmlContent: [],
			synopsisText: "医院简介",
			fullscreenLoading: true,
			contentIndex: 0,
			imgRoute: "",
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
		request(item, val) {
			// console.log(item, val, "index6");
			this.synopsisHtmlContent = [];
			this.fullscreenLoading = true;
			WebApi.getChildHospationInfo(item, val)
				.then(({ data }) => {
					// console.log(data);
					if (data.data.length == 0) {
						this.fullscreenLoading = false;
						return;
					}
					console.log(data.data[0]);
					this.synopsisHtmlContent = data.data[0];
					this.fullscreenLoading = false;
				})
				.catch(() => {
					this.fullscreenLoading = false;
					console.log("请求失败");
				});
		},
		newRequest(item, index) {
			// console.log(item, index);
			this.contentIndex = index;
			if (index == 0) {
				this.synopsisText = "医院简介";
			} else {
				this.synopsisText = "医院路线";
			}
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
		DBDH,
	},
	computed: {
		...mapState(["bannerText", "bannerList"]),
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
.details {
	width: 100%;
	height: 100%;
	.overview {
		display: flex;
		justify-content: space-between;
		.overview-left {
			width: 20%;
			height: 170px;
			// background-color: #005197;
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
					// color: cornflowerblue;
					font-size: 18px;
					font-weight: 600;
					color: #005197;
				}

				li:hover {
					// background: rgba(100, 149, 237, 0.1);
					background: #005197;
					color: #fff;
				}
			}
		}
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
			.newsContent {
				margin-top: 8px;
				color: #666;
				line-height: 30px;
				font-size: 16px;
				text-align: justify;
				text-justify: inter-ideograph;
				font-family: 微软雅黑;
				div {
					@include HH;
				}
			}
		}
	}
}
</style>
