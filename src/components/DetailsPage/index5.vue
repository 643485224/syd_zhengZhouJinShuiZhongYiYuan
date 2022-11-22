<template>
	<div class="details">
		<Logo></Logo>
		<IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')" :fontSize="10" :titlePage="$route.query.newBanner"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-content">
				<h2>
					<span>{{ $route.query.newBanner }}</span>
					<!-- <span style="font-size: 12px; float: right;color: #808080;"> 您的当前位置：首页>>>{{ $store.state.bannerText }}>>>{{ $store.state.banner }}>>> 详细内容 </span> -->
				</h2>
				<div class="clear:both"></div>
				<div class="overview-details">
					<h1>基本信息</h1>
					<ul class="flex-wrap">
						<el-skeleton style="width: 240px;" v-if="synopsisHtmlContent.length == 0" :loading="true" animated :throttle="500">
							<template slot="template">
								<el-skeleton-item variant="image" style="width: 131px; height: 175px;" />
							</template>
						</el-skeleton>
						<li class="flex" v-for="(item, index) in synopsisHtmlContent" :key="index">
							<a href="javascript:void(0)" class="docImg">
								<img :src="`data:image/jpeg;base64,${item.doctorphoto}`" :title="item.doctor" />
							</a>
							<div>
								<p>
									<strong>姓名:</strong>
									{{ item.doctor }}
								</p>

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
					<div class="h20"></div>
					<h1>专家简介</h1>
					<div v-if="synopsisHtmlContent.length == 0">
						<el-skeleton-item variant="text" />
						<el-skeleton-item variant="text" />
						<el-skeleton-item variant="text" />
					</div>
					<div class="newsContent" v-if="synopsisHtmlContent.length !== 0">
						{{ synopsisHtmlContent[0].doctorremark }}
					</div>
				</div>
			</div>
			<div class="overview_right">
				<div class="right_div1">
					<h2>专家查询</h2>
					<ul>
						<li>
							<el-input placeholder="请输入专家姓名" v-model="$route.query.name" clearable class="w220" disabled></el-input>
						</li>
						<li>
							<el-input placeholder="请完整输入专家姓名" v-model="diseaseForm.expert" clearable class="w220"></el-input>
						</li>

						<li>
							<el-button type="primary" @click="queryDoctor(diseaseForm)">查询</el-button>
						</li>
					</ul>
				</div>
				<div class="right_div2">
					<QuickNavigation :keyBoolen="false"></QuickNavigation>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//详情页-医生详情 Page
import Logo from "../logo/index.vue";
import IMG from "../IMG/index.vue";
import DBDH from "../dbdh/index.vue";
import WebApi from "../../webapi/modules/webapi";
import QuickNavigation from "../QuickNavigation/index.vue";
export default {
	data() {
		return {
			synopsisHtmlContent: [],
			diseaseForm: {
				//查询条件
				disease: "",
				department: "",
				expert: "",
			},
		};
	},
	created() {
		this.request(this.$route.query.id);
	},
	mounted() {},
	methods: {
		request(item) {
			WebApi.doctorNo(item)
				.then(({ data }) => {
					// console.log(data)
					this.synopsisHtmlContent = data.data.content;
				})
				.catch(() => console.log("请求失败"));
			// let resp = await WebApi.getNewsDetails(data)
			// console.log(22222, resp)
			// this.synopsisHtmlContent=resp.data.data
			// // for (let i = 0; i < resp.data.data.length; i++) {
			// // 	this.synopsisHtmlContent.push(resp.data.data[i].htmlContent)
			// // }
			// // this.$store.commit('synopsisHtmlContent', this.synopsisHtmlContent)
			// console.log(this.synopsisHtmlContent);
		},
		queryDoctor(item) {
			console.log(item);
			WebApi.deptNo(this.$route.query.deptno, item.expert, 0, 1)
				.then(({ data }) => {
					console.log(data);
					this.synopsisHtmlContent = data.data.content;
				})
				.catch(() => console.log("请求失败"));
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
		QuickNavigation,
	},
};
</script>

<style lang="scss" scoped>
.details {
	width: 100%;
	height: 100%;
	.overview {
		.overview-content {
			width: 75%;
			h2 {
				color: #01b9b7;
				text-decoration: none;
				font-size: 18px;
				// line-height: 40px;
				// height: 40px;
				border-bottom: #01b9b7 3px solid;
			}
			.overview-details {
				font-size: 12px;
				font-weight: normal;
				line-height: 34px;
				// text-align: center;
				margin: 0px 20px;
				padding: 10px 0px;
				border-top: #dfdfdf 1px solid;
				// color: #999;
				box-sizing: border-box;
				h1 {
					// font-size: 18px;
					font-size: 21px;
					// line-height: 40px;
					text-align: center;
					// height: 40px;
					overflow: hidden;
				}
				ul {
					li {
						width: 100%;
						height: 165px;
						.docImg {
							display: block;
							width: 17%;
							height: 100%;
							border: 1px solid #01b9b7;
							box-sizing: border-box;
							img {
								width: 100%;
								height: 100%;
								// padding: 3px;
								// border: #dfdfdf 1px solid;
								// box-sizing: border-box;
								object-fit: cover;
							}
						}
						div {
							width: 100%;
							margin-left: 20px;
							font-size: 17px;
							p {
								strong {
									color: #005197;
								}
							}
						}
					}
				}
			}
			.newsContent {
				margin-top: 10px;
				line-height: 30px;
				font-size: 21px;
				text-indent: 2em;
				// font-family: 微软雅黑;
			}
		}
		.overview_right {
			width: 24%;
			// padding: 5px;
			// box-sizing: border-box;
			.right_div1 {
				width: 100%;
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
}
</style>
