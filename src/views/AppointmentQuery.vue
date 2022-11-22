<template>
	<div class="appointment">
		<Logo></Logo>
		<!-- <IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')"></IMG> -->
		<div class="overview w1200">
			<img src="@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<Appointment :Message="'查询预约'"></Appointment>
				<QuickNavigation :keyBoolen="false"></QuickNavigation>
			</div>

			<div class="overview-right">
				<h2 class="crumbs_h2 flex-space-between-center">
					<span>查询预约</span>
					<span> 您的当前位置：<span @click="goBack">首页</span>>>>查询预约</span>
				</h2>
				<div class="active1" v-if="active == 1">
					<p class="active_p">身份信息</p>
					<div class="active_div">
						<el-form class="active_form" label-position="right" label-width="150px" :model="formLabelAlign" :rules="rules">
							<el-form-item label="姓名：">
								<el-input placeholder="请输入您的姓名" v-model="formLabelAlign.name" :validate-event="false"></el-input>
							</el-form-item>
							<el-form-item label="性别：" class="active_form_radio">
								<el-radio v-model="formLabelAlign.sex" label="男">男</el-radio>
								<el-radio v-model="formLabelAlign.sex" label="女">女</el-radio>
							</el-form-item>
							<el-form-item label="身份证号：">
								<el-input placeholder="请输入您的身份证号码" v-model="formLabelAlign.idCard"></el-input>
							</el-form-item>
							<el-form-item label="手机号：">
								<el-input placeholder="请输入您的手机号码" v-model="formLabelAlign.phone"></el-input>
							</el-form-item>
							<el-form-item label="图文验证码：">
								<el-row :gutter="24" class="active_row">
									<el-col :span="14">
										<el-input placeholder="请输入右边图形码" v-model="formLabelAlign.verificationCode"></el-input>
									</el-col>
									<el-col :span="8">
										<div @click="refreshCode" style="cursor: -webkit-grabbing;">
											<Sidentify :identifyCode="identifyCode"></Sidentify>
										</div>
									</el-col>
								</el-row>
							</el-form-item>
						</el-form>
					</div>

					<div class="modal-footer">
						<el-button round @click="hideModal">取消</el-button>
						<el-button type="primary" round @click="queryRegister">查询预约挂号</el-button>
					</div>
				</div>
				<div class="active2" v-else>
					<p class="active1_p">预约挂号记录查询</p>
					<ul>
						<li class="noRegisterList" v-if="queryRegisterList.length == 0">
							<p>暂无预约记录！</p>
						</li>
						<li v-for="(item, index) in queryRegisterList" :key="index">
							<div class="record_head">
								<span class="head_span">订单号：{{ item.danhao }}</span>
							</div>
							<div class="record_body">
								<el-row :gutter="21">
									<el-col :span="8"> <span>预约人：</span>{{ item.name }} </el-col>
									<el-col :span="8"> <span>预约时间：</span>{{ item.timesection }} </el-col>
									<el-col :span="8"> <span>就诊时间：</span>{{ item.timesection1 }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span>医院：</span>{{ item.hos }} </el-col>
									<el-col :span="8"> <span>预约科室：</span>{{ item.department }} </el-col>
									<el-col :span="8"> <span>就诊医生：</span>{{ item.doctorName }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span>预约状态：</span>{{ item.status }} </el-col>
								</el-row>
							</div>
						</li>
					</ul>
				</div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageAmount" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="synopsisLength" v-if="synopsisLength > 10"> </el-pagination>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//预约查询 Page
import Logo from "../components/logo/index.vue";
// import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
// import Crumbs from "../components/crumbs/index.vue";
// import WebApi from "../webapi/modules/webapi";
import Appointment from "../components/Appointment/index.vue";
// import GVerify from "../utils/gVerify";
import axios from "axios";
import Sidentify from "../components/sidentify/canvasPassWord.vue";
import WebApi from "../webapi/modules/webapi";

export default {
	data() {
		return {
			active: 1,
			synopsisHtmlContent: [],
			newSynopsisList: [],
			synopsisLength: 0,
			currentPage: 1,
			pageAmount: 10,
			loading: true,
			synopsisListIndex: 0,
			formLabelAlign: {
				name: "",
				sex: "男",
				idCard: "",
				phone: "",
				verificationCode: "",
			},
			identifyCodes: "1234567890", // 设置验证码为数字验证码，如果想要验证码为字母数字组合，可以加字母，如： identifyCodes: 'ABCD1234567890abcd'
			identifyCode: "",
			rules: {
				// 表单验证规则
				name: [
					{ required: false, message: "请输入活动名称" }, // 'blur'是鼠标失去焦点的时候会触发验证
					{ min: 3, max: 5, message: "长度在 3 到 5 个字符" },
				],
			},
			queryRegisterList: [
				// {
				// 	name: "预约人姓名",
				// 	timesection: "预约人时间",
				// 	timesection1: "就诊时间",
				// 	hos: "郑州市金水总医院（北院区）",
				// 	department: "科室名字",
				// 	doctorName: "医生姓名",
				// 	status: "预约成功",
				// 	danhao: "8888888888888",
				// },
				// {
				// 	name: "预约人姓名",
				// 	timesection: "预约人时间",
				// 	timesection1: "就诊时间",
				// 	hos: "郑州市金水总医院（北院区）",
				// 	department: "科室名字",
				// 	doctorName: "医生姓名",
				// 	status: "预约成功",
				// 	danhao: "8888888888888",
				// },
			],
		};
	},
	created() {},
	mounted() {
		this.identifyCode = "";
		this.makeCode(this.identifyCodes, 4);
	},
	methods: {
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		refreshCode() {
			this.identifyCode = ""; //切换随机数
			this.makeCode(this.identifyCodes, 4);
		},
		makeCode(data, MaxLenght) {
			for (let i = 0; i < MaxLenght; i++) {
				this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
			}
			console.log(this.identifyCode); //生成的验证码
		},
		changeIndex(item, index) {
			console.log(item);
			this.synopsisListIndex = index;
			switch (index) {
				case 0:
					this.cancelRequest();
					axios({
						method: "POST",
						url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/getSubjects`,
						data: {
							channel: "",
							hosCode: item,
						},
						cancelToken: new axios.CancelToken((c) => {
							this.source = c;
						}),
					})
						.then(({ data }) => {
							console.log(data, "学科列表");
						})
						.catch((err) => {
							if (axios.isCancel(err)) {
								// console.log("Rquest canceled", err)
								//请求如果被取消，这里是返回取消的message
							} else {
								console.log(err);
							}
						});
					break;
				case 1:
					break;

				default:
					break;
			}
		},
		goBack() {
			this.$router.push({ name: "Home" });
		},
		cancelRequest() {
			if (typeof this.source === "function") {
				this.source();
			}
		},
		request() {
			this.loading = true;
			this.cancelRequest();
			axios({
				method: "POST",
				url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/hospitalList`,
				data: {
					channel: "1234567890",
				},
				cancelToken: new axios.CancelToken((c) => {
					this.source = c;
				}),
			})
				.then(({ data }) => {
					if (data.resultCode !== 1000) {
						this.loading = false;
					}
					console.log(data, "预约园区");
					// this.synopsisList = data.data;
				})
				.catch((err) => {
					if (axios.isCancel(err)) {
						// console.log("Rquest canceled", err)
						//请求如果被取消，这里是返回取消的message
					} else {
						this.fullscreenLoading = false;
						console.log(err);
					}
				});
		},

		hideModal() {
			console.log("取消");
		},
		queryRegister() {
			console.log(this.formLabelAlign);
			if (!this.formLabelAlign.name) {
				alert("请您输入姓名");
				return;
			}
			if (!this.formLabelAlign.idCard) {
				alert("请您输入身份证号码");
				return;
			}
			if (!this.formLabelAlign.phone) {
				alert("请您输入手机号码");
				return;
			}
			if (!this.formLabelAlign.verificationCode) {
				alert("请您输入图形码");
				return;
			} else {
				if (this.formLabelAlign.verificationCode !== this.identifyCode) {
					alert("请您输入正确的图形码");
					this.refreshCode();
					this.formLabelAlign.verificationCode = "";
					return;
				}
			}
			WebApi.reservationList(this.formLabelAlign.idCard)
				.then((resp) => {
					console.log(resp);
				})
				.catch((err) => {
					console.log(err);
					return;
				});
			this.active = 2;
			this.formLabelAlign.name = "";
			this.formLabelAlign.sex = "男";
			this.formLabelAlign.idCard = "";
			this.formLabelAlign.phone = "";
			this.formLabelAlign.verificationCode = "";
			console.log(this.formLabelAlign);
		},
	},
	watch: {
		$route() {
			this.request();
		},
	},
	components: {
		Logo,
		// IMG,
		QuickNavigation,
		DBDH,
		Appointment,
		Sidentify,
	},
};
</script>
<style lang="scss" scoped>
.appointment {
	width: 100%;
	height: 100%;
	.overview {
		.overview-left {
			width: 24%;
		}
		.overview-right {
			width: 75%;

			.right_appointment {
				width: 80%;
				text-align: center;
				margin-left: 10%;
				li {
					font-size: 17px;
					border: 2px solid #005197;
					padding: 10px;
					color: #fff;
					box-sizing: border-box;
				}
				.Before_li {
					background: #005197;
					color: #fff;
				}
				.After_li {
					color: #005197;
				}
				li:first-child {
					border-radius: 30px 0px 0px 30px;
				}
				li:last-child {
					border-radius: 0px 30px 30px 0px;
				}
			}
			.crumbs_h2 {
				font-size: 18px;
				height: 40px;
				margin-bottom: 10px;
				border-bottom: #01b9b7 3px solid;
				span:nth-child(1) {
					// color: #01b9b7;
					color: #00b3b1;
					// font-size: 36px;
				}
				span:nth-child(2) {
					font-size: 12px;
					// color: #808080;
					color: #555555;

					span:hover {
						cursor: pointer;
					}
				}
			}
			.active1 {
				width: 100%;
				.active_p {
					font-size: 36px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #555555;
					text-align: center;
					margin: 24px auto;
				}

				// .active_div {
				// 	display: flex;
				// 	justify-content: center;
				// 	margin-bottom: 50px;
				// 	.active_form {
				// 		width: 490px;
				// 		padding: 40px 120px;
				// 		border-radius: 10px;
				// 		border: 1px solid #005197;
				// 		box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.3);
				// 		.el-form-item {
				// 			margin: 10px 0px;

				// 			.el-form-item__label {
				// 				font-size: 30px !important;
				// 				color: #555 !important;
				// 			}
				// 			.active_row {
				// 				.el-col-15 {
				// 					padding-left: 0px !important;
				// 				}
				// 			}
				// 		}
				// 	}
				// }
				.modal-footer {
					display: flex;
					align-items: center;
					justify-content: center;
					justify-content: space-between;
					padding: 0px 253px 83px 253px;

					button {
						width: 150px;
						height: 58px;
						font-family: Source Han Sans CN;
						font-weight: bold;
						border: 2px solid #005197;
						border-radius: 10px;
						color: #005197;
					}
					button:last-child {
						color: #fff;
						background: #005197;
					}
				}
			}
			.active2 {
				.active1_p {
					font-size: 24px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #555555;
					text-align: center;
					margin: 24px auto;
				}
				ul {
					li {
						border: 2px solid #005197;
						border-radius: 10px;
						margin-bottom: 20px;
						.record_head {
							position: relative;
							height: 90px;
							border-bottom: 1px solid #888;
							.head_span {
								position: absolute;
								left: 0px;
								top: 20px;
								display: block;
								width: 300px;
								height: 50px;
								line-height: 50px;
								background: #005197;
								border-radius: 0px 25px 25px 0px;
								font-size: 18px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #ffffff;
							}
						}
						.record_body {
							height: 170px;
							.el-row {
								height: 33.33%;
								display: flex;
								align-items: center;
								margin: 0 !important;
								.el-col {
									padding-left: 20px !important;
								}
							}
						}
					}
					.noRegisterList {
						height: 377px;
						border-radius: 10px;
						border: 0px;
						box-shadow: 0px 0px 3px #888;
						p {
							width: 100%;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 36px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #fc1d2c;
						}
					}
				}
			}
		}
	}
}
</style>
