<template>
	<div class="appointment">
		<Logo></Logo>
		<!-- <IMG :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')"></IMG> -->
		<div class="overview w1200">
			<img src="@/assets/imgs/7a278fc71112ce1277c222c02568683.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<Appointment :Message="'预约记录查询'"></Appointment>
				<QuickNavigation :keyBoolen="false"></QuickNavigation>
			</div>

			<div class="overview-right">
				<h2 class="crumbs_h2 flex-space-between-center">
					<span>预约记录查询</span>
					<span>
						您的当前位置：
						<span @click="goBack">首页</span>
						>>>
						<span @click="fillIn">填写身份信息</span>
						<span v-if="active == 2">>>>预约记录查询</span>
					</span>
				</h2>
				<div class="active1" v-if="active == 1">
					<p class="active_p">身份信息</p>
					<div class="active_div">
						<el-form class="active_form" label-position="right" label-width="150px" ref="formLabelAlign" :model="formLabelAlign" :rules="rules" :hide-required-asterisk="true">
							<el-form-item label="姓名：" prop="name">
								<el-input placeholder="请输入您的姓名" v-model="formLabelAlign.name"></el-input>
							</el-form-item>
							<el-form-item label="身份证号：" prop="idCard">
								<el-input placeholder="请输入您的身份证号码" v-model="formLabelAlign.idCard"></el-input>
							</el-form-item>
							<el-form-item label="手机号：" prop="phone">
								<el-input placeholder="请输入您的手机号码" v-model="formLabelAlign.phone"></el-input>
							</el-form-item>
							<el-form-item label="图文验证码：" prop="verificationCode">
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
						<el-button round @click="hide">取消</el-button>
						<el-button type="primary" round @click="queryRegister('formLabelAlign')">查询预约挂号</el-button>
					</div>
				</div>
				<div class="active2" v-else>
					<p class="active1_p">预约挂号记录查询</p>
					<div class="_div_active2 ">
						<span>请选择预约状态：</span>
						<el-select v-model="queryRegisterStatus" placeholder="请选择预约状态" @change="changeQueryRegiste">
							<el-option label="待就诊" value="2"> </el-option>
							<el-option label="已就诊" value="3"> </el-option>
							<el-option label="已取消" value="4"> </el-option>
						</el-select>
					</div>
					<ul>
						<li class="noRegisterList" v-if="queryRegisterList.length == 0">
							<p>暂无预约记录！</p>
						</li>
						<li v-else v-for="(item, index) in queryRegisterList" :key="index">
							<div class="record_head">
								<span class="head_span">订单号：{{ item.DATA[0].appointmentId }}</span>
								<el-button class="head_button" v-if="item.DATA[0].flag == 0" round @click="cancelReservation(item.DATA[index].appointmentId)">取消预约</el-button>
							</div>
							<div class="record_body">
								<el-row :gutter="21">
									<el-col :span="8"> <span>预约人：</span>{{ item.DATA[0].title }} </el-col>
									<el-col :span="8"> <span>预约日期：</span>{{ item.DATA[0].date }} </el-col>
									<el-col :span="8"> <span>就诊时间：</span>{{ item.DATA[0].timesection }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span>就诊医生：</span>{{ item.DATA[0].doctorName }} </el-col>
									<el-col :span="8"> <span>预约科室：</span>{{ item.DATA[0].dept }} </el-col>
									<el-col :span="8">
										<span>支付状态：</span>
										<span style="color:#005197 ;fontSize:16px;fontWeight:400;">{{ item.DATA[0].payStatus == 0 ? "待支付" : item.DATA[0].payStatus == 1 ? "已支付" : item.DATA[0].payStatus == 2 ? "作废" : item.DATA[0].payStatus == 3 ? "已退费" : item.DATA[0].flag }}</span>
									</el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8">
										<span>预约状态：</span>
										<span style="color:#005197 ;fontSize:16px;fontWeight:400;">{{
											item.DATA[0].flag == 0 ? "已预约" : item.DATA[0].flag == 1 ? "已签到" : item.DATA[0].flag == 2 ? "检查中" : item.DATA[0].flag == 3 ? "已叫号" : item.DATA[0].flag == 4 ? "已过号" : item.DATA[0].flag == 6 ? "已报告" : item.DATA[0].flag == -1 ? "已取消" : item.DATA[0].flag
										}}</span>
									</el-col>
								</el-row>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
		<div v-if="active !== 1">
			<Popup :show="show" :title="title" @hideModal="hideModal" @submit="submit"> </Popup>
		</div>
	</div>
</template>

<script>
//取消预约 Pag
import Logo from "../components/logo/index.vue";

import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Appointment from "../components/Appointment/index.vue";
import Sidentify from "../components/sidentify/canvasPassWord.vue";
import WebApi from "../webapi/modules/webapi";
import { validate } from "@/utils";
import Popup from "../components/Popup/index.vue";

export default {
	data() {
		let checkPhone = (rule, value, callback) => {
			if (!validate.phone(value)) {
				return callback(new Error("请填写正确的手机号码"));
			}
			callback();
		};
		let isCardNo = (rule, value, callback) => {
			if (!validate.isCardNo(value)) {
				return callback(new Error("请填写正确的身份证号码"));
			}
			callback();
		};
		let verificationCode = (rule, value, callback) => {
			if (value !== this.identifyCode) {
				return callback(new Error("输入的图形码不正确，请您重新输入!"));
			}
			callback();
		};

		return {
			title: "是否取消预约挂号？", //弹窗标题
			show: false, //弹窗状态
			active: 1, //步骤
			loading: true,
			formLabelAlign: {
				name: null,
				idCard: null,
				phone: null,
				verificationCode: null,
			}, //表单
			identifyCodes: "1234567890", // 设置验证码为数字验证码，如果想要验证码为字母数字组合，可以加字母，如： identifyCodes: 'ABCD1234567890abcd'
			identifyCode: "", //随机生成验证码
			rules: {
				name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
				phone: [
					{ required: true, message: "请填写您的手机号码", trigger: "blur" },
					{ validator: checkPhone, trigger: ["blur", "change"] },
				],
				idCard: [
					{ required: true, message: "请输入您的证件号码", trigger: "blur" },
					{ validator: isCardNo, trigger: ["blur", "change"] },
				],
				verificationCode: [
					{ required: true, message: "请输入图形码", trigger: "blur" },
					{ validator: verificationCode, trigger: ["blur", "change"] },
				],
			},
			queryRegisterStatus: "2", //预约状态
			queryRegisterList: [], //查询预约记录返回的数据
			cancelAppointmentId: null, //取消预约使用的ID
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
		},
		cancelRequest() {
			if (typeof this.source === "function") {
				this.source();
			}
		},
		queryRegister() {
			console.log(this.formLabelAlign);
			this.$refs.formLabelAlign.validate((valid) => {
				if (valid) {
					WebApi.reservationList(this.formLabelAlign.idCard, this.queryRegisterStatus)
						.then(({ data }) => {
							console.log(data);
							if (data.resultCode !== "1000") {
								return;
							}
							this.queryRegisterList = data.data;
							this.active = 2;
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		//查询预约状态
		changeQueryRegiste() {
			console.log(this.queryRegisterStatus);
			this.queryRegisterList = []; //清空
			WebApi.reservationList(this.formLabelAlign.idCard, this.queryRegisterStatus)
				.then(({ data }) => {
					console.log(data);
					if (data.resultCode !== "1000") {
						return;
					}
					this.queryRegisterList = data.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//打开弹窗
		cancelReservation(item) {
			console.log(item);
			this.cancelAppointmentId = item;
			this.show = true;
		},
		//关闭弹窗
		hideModal() {
			this.show = false;
		},
		// 弹窗_确定取消
		submit() {
			WebApi.registrationCancel(this.cancelAppointmentId)
				.then(async (resp) => {
					console.log(resp, "弹窗_确定取消");
					if (resp.data.resultCode !== "1000") {
						return;
					}
					await WebApi.reservationList(this.formLabelAlign.idCard, this.queryRegisterStatus)
						.then(({ data }) => {
							console.log(data);
							if (data.resultCode !== "1000") {
								return;
							}
							this.queryRegisterList = data.data;
						})
						.catch((err) => {
							console.log(err);
						});
					this.show = false;
				})
				.catch((err) => {
					console.log(err);
					return;
				});
		},
		hide() {
			this.$router.push({ name: "Home" });
		},
		goBack() {
			this.$router.push({ name: "Home" });
		},
		fillIn() {
			this.active = 1;
		},
	},
	watch: {},
	components: {
		Logo,
		QuickNavigation,
		DBDH,
		Appointment,
		Sidentify,
		Popup,
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
				._div_active2 {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-bottom: 20px;
					span {
						color: #005197;
						font-weight: 600;
					}
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
								width: 370px;
								height: 50px;
								line-height: 50px;
								background: #005197;
								border-radius: 0px 25px 25px 0px;
								font-size: 18px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #ffffff;
							}
							.head_button {
								position: absolute;
								right: 40px;
								bottom: 9px;
								width: 120px;
								height: 40px;
								background: #ff0000;
								font-size: 18px;
								font-family: Source Han Sans CN;
								font-weight: 500;
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
