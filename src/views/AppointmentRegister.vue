<template>
	<div class="appointment">
		<Logo></Logo>
		<div class="overview w1200">
			<img src="@/assets/imgs/b660ae9c8bc23670cf0d0f6e04ecd21.jpg" alt="" />
		</div>
		<div class="h20"></div>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<Appointment :Message="'预约挂号'"></Appointment>
				<QuickNavigation :keyBoolen="false"></QuickNavigation>
			</div>
			<div class="overview-right">
				<h2 class="crumbs_h2 flex-space-between-center">
					<span>预约挂号</span>
					<span>您的当前位置：<span @click="goBack">首页</span>>>>预约挂号 </span>
				</h2>
				<div v-if="active == 1" class="active1">
					<ul class="right_appointment flex-center-center">
						<li class="flex-center-center" v-for="(item, i) in synopsisList" :key="i" @click="changeIndex(item, i)" :class="i == synopsisListIndex ? 'Before_li' : 'After_li'">
							{{ item.hosname.slice(6, 9) }}
						</li>
					</ul>
					<ul>
						<li v-for="(item, i) in getSubjects" :key="i">
							<div class="h20"></div>
							<p class="p_department">{{ item.title }}</p>
							<el-divider class="p_department_divider"></el-divider>
							<ul class="right_department">
								<li v-for="(items, index) in item.newGetSubjects" :key="index" @click="SelectDepartment(items)">
									{{ items.title }}
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div v-if="active == 2" class="active2">
					<ul class="active2_ul">
						<li class="active2_li_top flex-center-center">
							<div class="flex-center-center">医生列表</div>
							<div class="flex-center-center">时间段</div>
							<div class="flex-center-center">
								<ul>
									<li class="flex-center-center" v-for="(item, index) in thList" :key="index" @click="changethListIndex(item, index)" :class="index == thListIndex ? 'Before_li' : 'After_li'">
										{{ item.time_week }}<br />
										{{ item.time_date }}
									</li>
								</ul>
							</div>
						</li>
						<li class="noRegisterList" v-if="doctorList.length == 0">
							<!-- <el-skeleton :rows="1" :loading="loading" animated /> -->
							<div v-loading="loading" v-if="loading" class="loading" style="height:377px;"></div>
							<p>暂无医生信息！</p>
						</li>
						<li v-else class="active2_li_down flex-space-between-center" v-for="(item, index) in doctorList" :key="index" @click="SelectDoctor(item, index)">
							<div class="li_down_left">
								<div>
									<img v-if="doctorImgList && doctorImgList[index]" :src="`http://117.159.7.252:8090/officialwebsite/file/${doctorImgList[index].type}/${doctorImgList[index].realName}`" alt="" />
								</div>
								<div>
									<p>{{ item.title }}医生</p>
									<p><span>科室:</span>{{ item.deptName }}</p>
									<p><span>职称:</span>{{ item.doctortitle }}</p>
									<p><span style="color:red;">挂号费：</span>{{ item.clinicfee }}元</p>
								</div>
							</div>
							<div class="li_down_center flex-center-center">
								{{ item.schedutime == "AM" ? "上午" : item.schedutime == "PM" ? "下午" : item.schedutime == "ALL" ? "全天" : "" }}
							</div>
							<div class="li_down_right flex-center-center" :class="item.lefted == '0' ? 'Before_li ' : ' After_li'">
								<p>余号({{ item.lefted }})</p>
							</div>
						</li>
					</ul>
					<div class="h20"></div>
					<div class="_active_div" @click="_goActive(2)">
						上一步
					</div>
				</div>
				<div v-if="active == 3" class="active3">
					<ul class="active3_ul">
						<li class="active3_li_top flex-center-center">
							<div class="flex-center-center">{{ this.RegisterList.date.slice(0, 4) }}年 {{ this.RegisterList.date.slice(5, 7) }}月 {{ this.RegisterList.date.slice(8, 10) }}日</div>
						</li>
						<li class="active3_li_down flex-space-between-center">
							<div class="li_down_left">
								<div>
									<img v-if="selectDoctorImg && selectDoctorImg.type && selectDoctorImg.realName" :src="`http://117.159.7.252:8090/officialwebsite/file/${selectDoctorImg.type}/${selectDoctorImg.realName}`" alt="" />
								</div>
								<div>
									<p>{{ selectDoctorObj.title }}医生</p>
									<p><span>科室:</span>{{ selectDoctorObj.deptName }}</p>
									<p><span>职称:</span>{{ selectDoctorObj.doctortitle }}</p>
									<p><span style="color:red;">挂号费：</span>{{ selectDoctorObj.clinicfee }}元</p>
								</div>
							</div>

							<div class="li_down_right">
								<ul>
									<li v-for="(item, index) in selectDoctorList" :key="index" class="flex-center-center" @click="goRegister(item)" :class="item.surplus == 0 ? 'hsBG' : 'lsBG'">
										<span>{{ item.value }}</span>
										<br />
										<span>余号({{ item.surplus }})</span>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<div class="h20"></div>
					<div class="_active_div" @click="_goActive(3)">
						上一步
					</div>
				</div>
				<div v-if="active == 4" class="active4">
					<div class="_active_div" @click="_goActive(4)">
						上一步
					</div>
					<div class="h20"></div>
					<p class="active_p">身份信息</p>
					<div class="active_div">
						<el-form class="active_form" label-position="right" label-width="150px" ref="formLabelAlign" :model="formLabelAlign" :rules="rules" :hide-required-asterisk="true">
							<el-form-item label="姓名：" prop="name">
								<el-input placeholder="请输入您的姓名" v-model="formLabelAlign.name"></el-input>
							</el-form-item>
							<el-form-item label="性别：" class="active_form_radio">
								<el-radio v-model="formLabelAlign.sex" label="男">男</el-radio>
								<el-radio v-model="formLabelAlign.sex" label="女">女</el-radio>
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
						<el-button type="primary" round @click="queryRegister">预约挂号</el-button>
					</div>
				</div>
				<div v-if="active == 5" class="active5">
					<p class="active1_p">订单详情</p>
					<ul v-if="addRegisterBoolen">
						<li>
							<div class="record_head">
								<!-- <span class="head_span">订单号：{{ item.patientName }}</span> -->
								<el-row :gutter="24" class="body_row">
									<el-col :span="12"> <span>就诊人：</span>{{ RegisterList.patientName }} </el-col>
									<el-col :span="12"> <span>身份证号：</span>{{ RegisterList.cardNo }} </el-col>
								</el-row>
							</div>
							<div class="record_body">
								<el-row :gutter="21">
									<el-col :span="8"> <span>医院：</span>{{ RegisterList.hospital_name }} </el-col>
									<el-col :span="8"> <span>预约日期：</span>{{ RegisterList.date }} </el-col>
									<el-col :span="8"> <span>就诊时间：</span>{{ RegisterList.section }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span>医生姓名：</span>{{ RegisterList.doctorName }} </el-col>
									<el-col :span="8"> <span>职位昵称：</span>{{ RegisterList.doctortitle }} </el-col>
									<el-col :span="8"> <span>科室：</span>{{ RegisterList.dept }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span style="color:red;">支付费用：</span>{{ RegisterList.clinicfee }} <span>元</span></el-col>
								</el-row>
							</div>
							<div class="modal-footer flex-space-between-center">
								<el-button round @click="cancel">取消</el-button>
								<el-button type="primary" round @click="placeAnOrder">确认</el-button>
							</div>
						</li>
					</ul>
					<ul v-else>
						<li>
							<div class="success_record_head">
								<p>恭喜您，预约成功！</p>
								<span class="head_span">订单号：{{ successRegisterList.appointmentId }}</span>
								<el-row :gutter="21" class="body_row">
									<el-col :span="10"> <span>就诊人：</span>{{ RegisterList.patientName }} </el-col>,
									<el-col :span="10"> <span>身份证号：</span>{{ RegisterList.cardNo }} </el-col>
								</el-row>
							</div>
							<div class="record_body">
								<el-row :gutter="21">
									<el-col :span="8"> <span>医院：</span>{{ RegisterList.hospital_name }} </el-col>
									<el-col :span="8"> <span>预约日期：</span>{{ RegisterList.date }} </el-col>
									<el-col :span="8"> <span>就诊时间：</span>{{ RegisterList.section }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span>医生姓名：</span>{{ RegisterList.doctorName }} </el-col>
									<el-col :span="8"> <span>职位昵称：</span>{{ RegisterList.doctortitle }} </el-col>
									<el-col :span="8"> <span>科室：</span>{{ RegisterList.dept }} </el-col>
								</el-row>
								<el-row :gutter="24">
									<el-col :span="8"> <span style="color:red;">支付费用：</span>{{ RegisterList.clinicfee }} <span>元</span></el-col>
								</el-row>
							</div>
							<div class="modal-footer flex-center-center">
								<el-button type="primary" round @click="revert">点击返回</el-button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
		<Popup :show="show" :title="title" @hideModal="hideModal" @submit="submit">
			<div>
				<p>尊敬的患者及家属：</p>
				<p style="text-indent: 2rem;">您好！</p>
				<p style="text-indent: 2rem;">根据《国家卫健委医政医管局关于科学有序恢复日常医疗服务工作》（联防联控机制发〔2020〕35号）及《郑防控转发国务院进一步推荐分区分级恢复正常医疗服务工作通知》（〔2020〕141号）文件精神，对我院门诊管理做以下调整：</p>

				<p>1.门诊科室均可正常开展诊疗活动。</p>
				<p>2.来我院就诊的患者需正确佩戴防护口罩，进行体温检测及扫码，发热病人由预检分诊到发热门诊就诊。</p>
				<p>3.门诊严格执行“一医一患一诊室”，防止院内交叉感染。为保证您顺利挂号就诊，请您认真阅读并遵守挂号就诊须知，充分理解各项条款。</p>
				<p>4.减少诊区人员聚集，请您按照“一米线”地标排队，保持有效防护距离。进入诊区后，请您在诊室外候诊。</p>

				<p class="popup_8p">
					5.凡有以下情况之一的患者，请主动前往发热门诊接受筛查：
					<span>（1）从国外回国人员； </span>
					<span>（2）有发热（体温≥37.3℃）、干咳、咽痛、鼻塞、流鼻涕、眼部结膜炎、肌肉酸痛、味觉改变、嗅觉改变、腹泻等症状者; </span>
					<span>（3）近两周内去过中高风险地区者； </span>
					<span>（4）近两周明确接触过中高风险地区的患者； </span>
					<span>（5）身边有多名人员发热，或与新型冠状病毒感染者有流行病学关联。 </span>
				</p>
				<p>6.在我院定点治疗的门诊慢性病患者，可按自然季度取药，不能跨季度取药（如第一季度有未开药的月份，第二季度将无法补开第一季度未开月份的药）</p>
				<p style="text-indent: 2rem;">为了您和家人的生命健康，请配合以上医院防控措施。给您带来的不便，敬请谅解！</p>
				<br />
				<p style="text-align: right;">郑州市金水区总医院</p>
				<p style="text-align: right;">2021年11月</p>
			</div>
		</Popup>
		<Popup :show="newShow" :hideBoolen="false" :title="'温馨提示'" @submit="submitFn">
			<h3 style="text-align: center;">
				您已预约成功，就诊时请携带身份证至医院 自助机取号、缴费后就诊！
			</h3>
		</Popup>
	</div>
</template>

<script>
//预约挂号 Page
import Logo from "../components/logo/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import WebApi from "../webapi/modules/webapi";
import Appointment from "../components/Appointment/index.vue";
import Popup from "../components/Popup/index.vue";
import getTime from "../utils/getTime";
import axios from "axios";
import Sidentify from "../components/sidentify/canvasPassWord.vue";
import { validate } from "@/utils";
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
			active: 1,
			title: "郑州市金水区总医院患者就诊须知", //弹窗标题
			show: true, //弹窗状态
			synopsisList: [], //院区数据
			synopsisListIndex: 0, //改变class
			thListIndex: 0, //改变class
			getSubjects: [], //学科
			thList: [], //未来一周的时间
			deptList: {}, //选中的科室
			time_date: "", //选中的日期
			doctorList: [], //医生列表
			doctorImgList: [], //医生头像
			selectDoctorImg: {}, // 选中医生的头像
			selectDoctorObj: {},
			formLabelAlign: {
				name: null,
				sex: "男",
				idCard: null,
				phone: null,
				verificationCode: null,
			},
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
			identifyCodes: "1234567890", // 设置验证码为数字验证码，如果想要验证码为字母数字组合，可以加字母，如： identifyCodes: 'ABCD1234567890abcd'
			identifyCode: "", //随机生成的图形码
			signalSource: [], //医生列表余号
			selectDoctorList: [
				{
					value: "8:00-8:30",
					surplus: 0,
					item: {},
				},
				{
					value: "8:30-9:00",
					surplus: 0,
					item: {},
				},
				{
					value: "9:00-9:30",
					surplus: 0,
					item: {},
				},
				{
					value: "9:30-10:00",
					surplus: 0,
					item: {},
				},
				{
					value: "10:00-10:30",
					surplus: 0,
					item: {},
				},
				{
					value: "10:30-11:00",
					surplus: 0,
					item: {},
				},
				{
					value: "11:00-11:30",
					surplus: 0,
					item: {},
				},
				{
					value: "11:30-12:00",
					surplus: 0,
					item: {},
				},
				{
					value: "14:30-15:00",
					surplus: 0,
					item: {},
				},
				{
					value: "15:00-15:30",
					surplus: 0,
					item: {},
				},
				{
					value: "15:30-16:00",
					surplus: 0,
					item: {},
				},
				{
					value: "16:00-16:30",
					surplus: 0,
					item: {},
				},
				{
					value: "16:30-17:00",
					surplus: 0,
					item: {},
				},
				{
					value: "17:00-17:30",
					surplus: 0,
					item: {},
				},
				{
					value: "17:30-18:00",
					surplus: 0,
					item: {},
				},
			], //医生排班信息表
			addRegisterBoolen: true,
			RegisterList: {
				doctorName: null,
				hospital_name: null,
				doctortitle: null,
				channel: "3",
				hosCode: null,
				deptId: null,
				dept: null,
				number: null,
				cardNo: null,
				type: 1,
				sectionId: null,
				section: null,
				date: null,
				clinicfee: null,
				visitType: 1,
				origin: 3,
				deviceId: "",
				patientName: null,
				phone: null,
			},
			loading: true,
			successRegisterList: {},
			newShow: false,
		};
	},
	created() {
		this.request();
		this.thList = getTime; //获取一周的时间
		// console.log(this.thList);
		this.RegisterList.date = this.thList[0].time_str;
	},
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
		//获取院区
		request() {
			WebApi.hospitalList()
				.then(({ data }) => {
					console.log(data);
					if (data.resultCode !== "1000") {
						console.log("获取院区失败！");
						return;
					}
					// this.synopsisList = data.data.reverse();
					let hosList = [
						{
							hoscode: "2011040921425930922835891",
							title: "郑州市金水区总医院",
							hosname: "郑州市金水区总医院",
							primaryKey: "2011040921425930922835891",
						},
					];

					this.synopsisList = hosList;
					// this.synopsisList = this.changeIndex(data.data[0], 0);
					this.changeIndex(this.synopsisList[0], 0);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//获取科室
		changeIndex(item, index) {
			console.log(item);
			this.synopsisListIndex = index;
			this.RegisterList.hosCode = item.hoscode; //默认第一个院区编码
			this.cancelRequest();

			axios({
				method: "POST",
				url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/getSubjects`,
				data: {
					channel: "3",
					hosCode: item.hoscode,
				},
				cancelToken: new axios.CancelToken((c) => {
					this.source = c;
				}),
			})
				.then(({ data }) => {
					if (data.resultCode !== "1000") {
						console.log("学科列表失败！");
						return;
					}

					this.getSubjects = data.data;
					this.getSubjects.forEach(async (item, index) => {
						await WebApi.getSubjects(item.primaryKey)
							.then((resp) => {
								this.getSubjects[index].newGetSubjects = resp.data.data;
							})
							.catch((err) => {
								console.log(err);
							});
						this.$forceUpdate();
					});
				})
				.catch((err) => {
					if (axios.isCancel(err)) {
						// console.log("Rquest canceled", err)
						//请求如果被取消，这里是返回取消的message
					} else {
						console.log(err);
					}
				});
		},
		//选择科室--循环医生得到号源
		async SelectDepartment(item, date) {
			console.log(item, date, "循环");
			this.RegisterList.deptId = item.primaryKey; //预约保存_科室ID
			this.deptList = item;
			this.active = 2;
			this.cancelRequest();
			this.doctorList = [];
			this.doctorImgList = []; //添加之前清空
			this.loading = true; //加载动画
			if (date) {
				this.RegisterList.date = date; //预约保存_时间
			}
			await WebApi.getDoctorList(item, date)
				.then(({ data }) => {
					console.log(data, `医生列表`);
					this.loading = false; //取消加载动画
					this.doctorList = data.data.list;
					if (data.data.list.length == 0) {
						return;
					}
					this.doctorList.forEach(async (item, index) => {
						console.log(item, index);
						await WebApi.getDoctorPic(item.title, item.deptName)
							.then(({ data }) => {
								console.log(data, "医生图片");
								if (data.data.length == 0) {
									console.log("空");
								} else {
									this.doctorImgList[index] = data.data[0].localStorage;
								}
							})
							.catch((err) => {
								console.log(err);
							});
						console.log(this.doctorImgList, "医生列表图片");
						this.$forceUpdate();
					});
				})
				.catch((err) => {
					console.log(err);
					this.loading = false; //取消加载动画
				});
		},
		//选择医生
		async SelectDoctor(item, index) {
			console.log(item, index);
			if (item.lefted == 0) {
				return;
			}
			this.RegisterList.dept = item.deptName; //预约保存_科室名称
			this.RegisterList.number = item.number; //预约保存_医生工号
			this.RegisterList.clinicfee = item.clinicfee; //预约保存_挂号费
			this.RegisterList.doctorName = item.title; //预约保存_医生名称
			this.RegisterList.hospital_name = item.hospital_name; //预约保存_医院名称
			this.RegisterList.doctortitle = item.doctortitle; //预约保存_医生职称

			this.active = 3;
			this.selectDoctorObj = item;
			await WebApi.registrationSources(item.number, item.deptId, this.time_date)
				.then(async ({ data }) => {
					console.log(data);
					for (let index = 0; index < data.data.sources.length; index++) {
						for (let i = 0; i < this.selectDoctorList.length; i++) {
							if (this.selectDoctorList[i].value == data.data.sources[index].time) {
								this.selectDoctorList[i].surplus = data.data.sources[index].surplus;
								this.selectDoctorList[i].item = data.data.sources[index];
							}
						}
					}
					await WebApi.getDoctorPic(item.title, item.deptName)
						.then(({ data }) => {
							console.log(data, "医生图片");
							if (data.data.length == 0) {
								console.log("空");
							} else {
								this.selectDoctorImg = data.data[0].localStorage;
							}
						})
						.catch((err) => {
							console.log(err);
						});

					this.$forceUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		changethListIndex(item, index) {
			console.log(item);
			this.thListIndex = index;
			this.time_date = item.time_str;
			this.SelectDepartment(this.deptList, item.time_str);
		},

		hide() {
			console.log("取消");
		},
		queryRegister() {
			console.log(this.formLabelAlign);
			this.$refs.formLabelAlign.validate((valid) => {
				if (valid) {
					this.active = 5;

					this.RegisterList.cardNo = this.formLabelAlign.idCard; //预约保存_就诊卡号
					this.RegisterList.phone = this.formLabelAlign.phone; //预约保存_留存手机号
					this.RegisterList.patientName = this.formLabelAlign.name; //预约保存_就诊人手机号
					if (this.RegisterList.date !== this.thList[0].time_str) {
						this.RegisterList.type = 2; //预约保存_暂时设置为当天
					} else {
						this.RegisterList.type = 1; //预约保存_暂时设置为当天
					}

					this.RegisterList.visitType = "1"; //预约保存_就诊类型
					this.RegisterList.origin = "8";
				} else {
					console.log("error submit!!");
					return false;
				}
			});
			console.log(this.RegisterList, "提交的信息");
		},
		cancel() {
			console.log("取消挂号");
			this.active = 4;
		},
		placeAnOrder() {
			console.log("下单");
			WebApi.registrationSave(this.RegisterList)
				.then(({ data }) => {
					console.log(data, "下单结果");
					if (data.resultCode == "4000") {
						if (data.errorMsg.indexOf("没有查到患者信息") != -1) {
							this.$confirm(data.errorMsg, "提示", { confirmButtonText: "确定", cancelButtonText: "取消" })
								.then(() => {
									let newPageUrl = this.$router.resolve({ name: "Details7" });
									window.open(newPageUrl.href);
								})
								.catch(() => {
									this.active = 4;
								});
						} else {
							this.$confirm(data.errorMsg, "提示", { confirmButtonText: "确定", cancelButtonText: "取消" })
								.then(() => {
									this.active = 5;
								})
								.catch(() => {
									this.active = 4;
								});
						}
						return;
					}
					if (data.resultCode !== "1000") {
						this.$alert(data.errorMsg, `提示${data.resultCode}`);
						this.active = 1;
						return;
					}
					this.newShow = true;
					this.addRegisterBoolen = false;
					this.successRegisterList = data.data;
					this.$forceUpdate();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		revert() {
			this.$router.push({ name: "Home" });
		},
		goRegister(item, index) {
			console.log(item, index);
			if (item.surplus == 0) {
				return;
			}
			this.RegisterList.sectionId = item.item.timeId; //预约保存_号源ID
			this.RegisterList.section = item.item.time; //预约保存_预约时间段

			this.RegisterList.visitType = 1; //预约保存_号源ID
			this.RegisterList.origin = 3;
			this.RegisterList.deviceId = "";
			this.active = 4;
		},
		goBack() {
			this.$router.push({ name: "Home" });
		},
		cancelRequest() {
			if (typeof this.source === "function") {
				this.source();
			}
		},
		hideModal() {
			// 取消弹窗回调
			// this.show = false;
			this.$router.push({ name: "Home" });
		},
		submit() {
			// 确认弹窗回调
			this.show = false;
		},
		submitFn() {
			// 确认弹窗回调
			this.newShow = false;
		},
		_goActive(type) {
			// this.active = type - 1;
			switch (type) {
				case 2:
					this.active = type - 1;
					this.thListIndex = 0;
					break;
				case 3:
					this.active = type - 1;
					break;
				case 4:
					this.active = type - 1;
					break;
				default:
					break;
			}
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
				.right_appointment {
					width: 80%;
					margin-left: 10%;
					margin-top: 5%;
					height: 82px;
					li {
						width: 215px;
						height: 82px;
						font-size: 24px;
						font-weight: bold;
						color: #fff;
						border: 2px solid #005197;
						padding: 10px;
						box-sizing: border-box;
						cursor: pointer;
						border-radius: 30px;
						overflow: hidden;
					}
					.Before_li {
						background: #005197;
						color: #fff;
					}
					.After_li {
						color: #005197;
					}
					// li:first-child {
					// 	border-radius: 30px 0px 0px 30px;
					// }
					// li:last-child {
					// 	border-radius: 0px 30px 30px 0px;
					// }
				}
				.right_department {
					@include right_department;
				}
				.p_department {
					@include p_department;
				}
			}
			.active2 {
				width: 100%;

				.active2_ul {
					width: 100%;
					border: 1px solid #005197;
					box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.3);
					border-radius: 15px;
					overflow: hidden;
					.active2_li_top {
						height: 100px;
						// border-radius: 25px 25px 0px 0px;
						border-bottom: 1px solid #888;
						div {
							height: 100%;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #ffffff;
						}
						div:first-child {
							width: 30%;
							background: #005197;
							color: #fff;
							// border-radius: 25px 0px 0px 0px;
						}
						div:nth-child(2) {
							width: 10%;
							background: #005197;
							color: #fff;
						}
						div:nth-child(3) {
							width: 60%;
							color: #555555;
							font-size: 20px;
							ul {
								width: 100%;
								height: 100%;
								display: flex;
								li {
									width: 15%;
									border-left: 1px solid #888;
									cursor: pointer;
								}
								// li:last-child {
								// 	border-radius: 0px 25px 0px 0px;
								// }
								li:hover {
									background: #005197;
									color: #fff;
								}
								.Before_li {
									background: #005197;
									color: #fff;
								}
								.After_li {
									color: #005197;
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
					.active2_li_down {
						width: 100%;
						height: 143px;
						cursor: pointer;
						.li_down_left {
							width: 30%;
							height: 100%;
							display: flex;
							justify-content: space-between;
							border-bottom: 1px solid #888;
							padding: 5px;
							box-sizing: border-box;
							div:nth-child(1) {
								width: 40%;
								display: flex;
								justify-content: center;
								align-items: center;
								// padding: 10px;
								box-sizing: border-box;
								border: 1px solid #57afd5;
								box-sizing: border-box;
								img {
									width: 100%;
									height: 100%;
									object-fit: cover;
								}
							}
							div:nth-child(2) {
								width: 55%;
								text-align: left;
								padding: 0px 5px;

								box-sizing: border-box;
								p:nth-child(1) {
									font-size: 18px;
									font-family: Source Han Sans CN;
									font-weight: bold;
									color: #005197;
									margin-bottom: 5px;
								}
								p {
									// height: 25px;
									line-height: 25px;
									color: #555555;
								}
							}
						}
						.li_down_center {
							width: 10%;
							height: 100%;
							border-left: 1px solid #888;
							border-bottom: 1px solid #888;
							box-sizing: border-box;
						}
						.li_down_center:last-child {
							border-bottom: 0px;
						}
						.li_down_right {
							width: 60%;
							height: 143px;
							background: #005197;
							color: #fff;
							border-bottom: 1px solid #888;
							box-sizing: border-box;
							ul {
								height: 143px;
								display: flex;
								flex-wrap: wrap;
								li {
									// width: 14.28%;
									width: 100%;
									height: 100%;
									border-left: 1px solid #888;
									border-bottom: 1px solid #888;
									box-sizing: border-box;
								}
							}
						}
						// .li_down_right:last-child{
						// 	border-bottom: 0px;
						// }
						// .li_down_right:first-child {
						// 	border-top: 0px;
						// 	border-bottom: 0px;
						// 	box-sizing: border-box;
						// }
						.Before_li {
							background: #999;
							color: #fff;
						}
						.After_li {
							background: #005197;
							color: #fff;
						}
					}
					// .active2_li_down:last-child {
					// 	ul:last-child {
					// 		li:last-child {
					// 			border-radius: 0px 0px 25px 0px;
					// 		}
					// 	}
					// }
				}

				.active2_table_body {
					width: 100%;
					display: flex;
					justify-content: space-between;
					div:nth-child(1) {
						width: 40%;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 2px;
						box-sizing: border-box;
						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					div:nth-child(2) {
						width: 55%;
						text-align: left;
						padding: 13px 0px;
						p:nth-child(1) {
							font-size: 18px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #005197;
							margin-bottom: 10px;
						}
						p {
							height: 25px;
							line-height: 25px;
							color: #555555;
						}
					}
				}
			}
			.active3 {
				width: 100%;
				.active3_ul {
					width: 100%;
					border: 1px solid #005197;
					box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.3);
					border-radius: 25px;
					overflow: hidden;
					.active3_li_top {
						height: 100px;
						background: #005197;
						color: #fff;

						border-bottom: 1px solid #888;
						div {
							width: 33.333%;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							// color: #ffffff;
						}
					}
					.active3_li_down {
						width: 100%;
						height: 213px;

						.li_down_left {
							width: 30%;
							height: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 10px;
							box-sizing: border-box;
							div:nth-child(1) {
								width: 45%;
								height: 80%;
								display: flex;
								justify-content: center;
								align-items: center;
								// padding: 10px;
								box-sizing: border-box;
								border: 1px solid #57afd5;
								img {
									width: 100%;
									object-fit: cover;
								}
							}
							div:nth-child(2) {
								width: 55%;
								text-align: left;
								padding: 10px 5px;
								box-sizing: border-box;
								p:nth-child(1) {
									font-size: 18px;
									font-family: Source Han Sans CN;
									font-weight: bold;
									color: #005197;
									margin-bottom: 5px;
								}
								p {
									// height: 25px;
									line-height: 25px;
									color: #555555;
								}
							}
						}
						.li_down_right {
							width: 70%;
							ul {
								display: flex;
								flex-wrap: wrap;
								li {
									width: 20%;
									height: 71px;
									border-left: 1px solid #888;
									border-bottom: 1px solid #888;
									box-sizing: border-box;
									flex-wrap: wrap;
									cursor: pointer;
									span {
										display: block;
										width: 100%;
										text-align: center;
									}
								}
								.lsBG {
									background: #005197;
									color: #fff;
									font-size: 16px;
									font-weight: 400;
								}
								.hsBG {
									font-size: 16px;
									font-weight: 400;
								}
								li:nth-child(n + 11) {
									border-bottom: 0px;
								}
							}
						}
					}
				}
			}
			.active4 {
				width: 100%;
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
			.active5 {
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
							height: 70px;
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
							.body_row {
								position: absolute;
								bottom: 10px;
								width: 100%;
								display: flex;
								align-items: center;
								// justify-content: center;
								text-align: center;
								margin: 0 !important;

								.el-col {
									padding-left: 20px !important;
								}
							}
						}
						.success_record_head {
							position: relative;
							height: 140px;
							border-bottom: 1px solid #888;
							p {
								font-size: 18px;
								font-family: Source Han Sans CN;
								font-weight: bold;
								color: #005197;
								margin: 11px 0px 0px 24px;
							}
							.head_span {
								position: absolute;
								left: 0px;
								top: 40px;
								display: block;
								width: 350px;
								height: 50px;
								line-height: 50px;
								background: #005197;
								border-radius: 0px 25px 25px 0px;
								font-size: 18px;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #ffffff;
							}
							.body_row {
								position: absolute;
								bottom: 10px;
								width: 100%;
								display: flex;
								align-items: center;
								// justify-content: center;
								text-align: center;
								margin: 0 !important;

								.el-col {
									padding-left: 20px !important;
								}
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
						.modal-footer {
							// display: flex;
							// align-items: center;
							// justify-content: center;
							// justify-content: space-between;
							padding: 55px 253px 60px 254px;

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
