<template>
	<div class="appointment">
		<Logo></Logo>
		<div class="overview w1200">
			<img src="@/assets/imgs/81f5da13da3bfc97ed06f6c1f216837.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<Appointment :Message="'信息注册'"></Appointment>
				<QuickNavigation :keyBoolen="false"></QuickNavigation>
			</div>
			<div class="overview-right">
				<h2 class="crumbs_h2 flex-space-between-center">
					<span>信息注册</span>
					<span>您的当前位置：<span @click="goBack">首页</span>>>>信息注册</span>
				</h2>

				<div class="active4">
					<p class="active_p">信息注册</p>
					<div class="active_div">
						<el-form class="active_form" label-position="right" label-width="180px" ref="formLabelAlign" :model="formLabelAlign" :rules="rules" :hide-required-asterisk="true">
							<el-form-item label="姓名：" prop="patientname">
								<el-input placeholder="请输入您的姓名" v-model="formLabelAlign.patientname"></el-input>
							</el-form-item>
							<el-form-item label="性别：" class="active_form_radio">
								<el-radio v-model="formLabelAlign.sex" label="1">男</el-radio>
								<el-radio v-model="formLabelAlign.sex" label="2">女</el-radio>
							</el-form-item>
							<el-form-item label="身份证号：" prop="idno">
								<el-input placeholder="请输入您的身份证号码" v-model="formLabelAlign.idno"></el-input>
							</el-form-item>
							<el-form-item label="年龄：">
								<el-input placeholder="请输入您的年龄" v-model="formLabelAlign.age"></el-input>
							</el-form-item>
							<el-form-item label="出生年月：">
								<el-input placeholder="请输入您的出生年月" v-model="formLabelAlign.birthday"></el-input>
							</el-form-item>
							<el-form-item label="手机号：" prop="phone">
								<el-input placeholder="请输入您的手机号码" v-model="formLabelAlign.phone"></el-input>
							</el-form-item>
							<el-form-item label="居住地址：">
								<el-input placeholder="请输入您的居住地址" v-model="formLabelAlign.address"></el-input>
							</el-form-item>
							<el-form-item label="监护人姓名：" prop="guardianname" :rules="formLabelAlign.idno ? [{ required: false }] : rules.guardianname">
								<el-input placeholder="请输入您的监护人姓名" v-model="formLabelAlign.guardianname"></el-input>
							</el-form-item>
							<el-form-item label="监护人证件号：" prop="guardianidno" :rules="formLabelAlign.idno ? [{ required: false }] : rules.guardianidno">
								<el-input placeholder="请输入您的监护人证件号" v-model="formLabelAlign.guardianidno"></el-input>
							</el-form-item>
							<el-form-item label="监护人电话：" prop="guardianphone" :rules="formLabelAlign.idno ? [{ required: false }] : rules.guardianphone">
								<el-input placeholder="请输入您的监护人电话" v-model="formLabelAlign.guardianphone"></el-input>
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
						<el-button type="primary" round @click="queryRegister">注册</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
		<Popup :show="show" :title="'温馨提示'" @hideModal="hideModal" @submit="submit">
			<h3 style="text-align: center;">
				{{ title }}
			</h3>
		</Popup>
	</div>
</template>

<script>
//预约挂号 Page
import Logo from "../logo/index.vue";
import QuickNavigation from "../QuickNavigation/index.vue";
import DBDH from "../dbdh/index.vue";
import WebApi from "../../webapi/modules/webapi";
import Appointment from "../Appointment/index.vue";
import Popup from "../Popup/index.vue";
// import getTime from "../../utils/getTime";
// import axios from "axios";
import Sidentify from "../sidentify/canvasPassWord.vue";
import { validate } from "@/utils";
export default {
	data() {
		let checkPhone = (rule, value, callback) => {
			if (!validate.phone(value)) {
				return callback(new Error("请填写正确的手机号码"));
			}
			callback();
		};
		// let isCardNo = (rule, value, callback) => {
		// 	if (!validate.isCardNo(value)) {
		// 		return callback(new Error("请填写正确的身份证号码"));
		// 	}

		// 	callback();
		// };

		let verificationCode = (rule, value, callback) => {
			if (value !== this.identifyCode) {
				return callback(new Error("输入的图形码不正确，请您重新输入!"));
			}
			callback();
		};
		return {
			title: "", //弹窗标题
			show: false, //弹窗状态
			formLabelAlign: {
				patientname: null,
				sex: "1",
				idno: null,
				age: null,
				birthday: null,
				phone: null,
				verificationCode: null,
				address: null,
				guardianname: null,
				guardianidno: null,
				guardianphone: null,
			},
			rules: {
				patientname: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
				phone: [
					{ required: true, message: "请填写您的手机号码", trigger: "blur" },
					{ validator: checkPhone, trigger: ["blur", "change"] },
				],
				idno: [
					{ required: true, message: "请输入您的证件号码", trigger: "blur" },
					{ validator: this.validID, trigger: ["blur", "change"] },
				],
				verificationCode: [
					{ required: true, message: "请输入图形码", trigger: "blur" },
					{ validator: verificationCode, trigger: ["blur", "change"] },
				],
				guardianname: [{ required: true, message: "请输入监护人的姓名", trigger: "blur" }],
				guardianidno: [{ required: true, message: "请输入监护人证件号码", trigger: "blur" }],
				guardianphone: [{ required: true, message: "请输入监护人手机号码", trigger: "blur" }],
			},
			identifyCodes: "1234567890", // 设置验证码为数字验证码，如果想要验证码为字母数字组合，可以加字母，如： identifyCodes: 'ABCD1234567890abcd'
			identifyCode: "", //随机生成的图形码
			addRegisterBoolen: true,
			loading: true,
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
		async validID(rule, value, callback) {
			// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if (reg.test(value)) {
				await this.go(value.length);
				callback();
			} else {
				callback(new Error("身份证号码不正确"));
			}
		},
		// 实现自动生成生日，性别，年龄
		go(val) {
			console.log(val);

			let iden = this.formLabelAlign.idno;
			let sex = null;
			let birth = null;
			let myDate = new Date();
			let month = myDate.getMonth() + 1;
			let day = myDate.getDate();
			let age = 0;

			if (val === 18) {
				age = myDate.getFullYear() - iden.substring(6, 10) - 1;
				sex = iden.substring(16, 17);
				birth = iden.substring(6, 10) + "-" + iden.substring(10, 12) + "-" + iden.substring(12, 14);
				if (iden.substring(10, 12) < month || (iden.substring(10, 12) == month && iden.substring(12, 14) <= day)) age++;
			}
			if (val === 15) {
				age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
				sex = iden.substring(13, 14);
				birth = "19" + iden.substring(6, 8) + "-" + iden.substring(8, 10) + "-" + iden.substring(10, 12);
				if (iden.substring(8, 10) < month || (iden.substring(8, 10) == month && iden.substring(10, 12) <= day)) age++;
			}

			if (sex % 2 === 0) sex = "2";
			else sex = "1";
			if (val === 18) {
				this.formLabelAlign.sex = sex;
				this.formLabelAlign.age = age.toString();
				this.formLabelAlign.birthday = birth;
			} else {
				this.formLabelAlign.sex = "男";
				this.formLabelAlign.age = null;
				this.formLabelAlign.birthday = null;
			}
		},
		queryRegister() {
			console.log(this.formLabelAlign);

			this.$refs.formLabelAlign.validate((valid) => {
				if (valid) {
					console.log(this.formLabelAlign);
					WebApi.registerCard(this.formLabelAlign)
						.then(({ data }) => {
							console.log(data);

							// if (data.resultCode !== 1000) {
							// 	this.$alert(data.errorMsg, `提示${data.resultCode}`);
							// 	return;
							// }

							this.show = true;
							this.title = data.errorMsg;
						})
						.catch((err) => {
							console.log(err, "注册错误");
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		hide() {
			this.$router.push({ name: "Home" });
		},
		goBack() {
			this.$router.push({ name: "Home" });
		},
		hideModal() {
			this.$router.push({ name: "Home" });
		},
		submit() {
			// 确认弹窗回调
			this.show = false;
			this.$router.push({ name: "AppointmentRegister" });
		},
	},
	watch: {},
	components: {
		Logo,
		// IMG,
		QuickNavigation,
		DBDH,
		Appointment,
		Popup,
		Sidentify,
	},
};
</script>
<style lang="scss" scoped>
@mixin p_department {
	width: 150px;
	font-size: 24px;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: #005197;
	border-bottom: 2px solid #005197;
}
@mixin right_department {
	display: flex;
	flex-wrap: wrap;
	padding: 20px 35px;
	li {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 23.79%;
		height: 58px;
		font-size: 17px;
		background: #dedede;
		border-radius: 10px;
		margin: 5px;
		cursor: pointer;
	}
	li:hover {
		background: #005197;
		color: #fff;
	}
}
._active_div {
	width: 100px;
	height: 50px;
	background: #005197;
	color: #fff;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	font-weight: 400;
}
.appointment {
	width: 100%;
	height: 100%;
	.overview {
		.overview-left {
			width: 24%;
		}
		.overview-right {
			width: 75%;
			.crumbs_h2 {
				font-size: 18px;
				height: 40px;
				margin-bottom: 10px;
				border-bottom: #01b9b7 3px solid;
				span:nth-child(1) {
					color: #00b3b1;
				}
				span:nth-child(2) {
					font-size: 12px;

					color: #555555;

					span:hover {
						cursor: pointer;
					}
				}
			}

			.active4 {
				width: 100%;

				.el-col-8 {
					padding-left: 0px !important;
					padding-right: 0px !important;

					div {
						width: 114px;
						height: 40px;
					}
				}

				.active_p {
					font-size: 36px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #555555;
					text-align: center;
					margin: 24px auto;
				}

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
		}
	}
	.popup_8p {
		display: flex;
		flex-wrap: wrap;
		span {
			display: block;
			width: 100%;
			text-indent: 1rem;
		}
	}
}
</style>
