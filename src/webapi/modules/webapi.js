import appRequst from "../../utils/http.js";
//默认引入utils下面的index 默认导出为intface，改默认导出为appRequst
const URL01 = "http://117.159.7.252:8090"; //通用
const URL0 = URL01 + "/officialwebsite/webApi/api/homePage/getNewsDetails?pid=";
const URL1 = URL01 + "/officialwebsite/webApi/api/homePage/getHomePageIndex?pid="; //网站首页
const URL7 = URL01 + "/officialwebsite/webApi/api/his/"; //获取所有科室
const URL8 = URL01 + "/officialwebsite/webApi/api/his/getPriceInformation?priceType="; //医疗服务价格
const URL9 = URL01 + "/officialwebsite/webApi/api/his/getDurg?mnemonic="; //药品价格
const URL10 = URL01 + "/officialwebsite/webApi/api/homePage/getCharacteristicDept"; //特色科室
const URL11 = URL01 + "/officialwebsite/webApi/api/homePage/getLbt"; //首页轮播图
const URL12 = URL01 + "/officialwebsite/webApi/api/his/getDoctor"; //获取医生
const URL13 = URL01 + "/officialwebsite/webApi/api/homePage/getNewsDetails?id=";
const URL14 = URL01 + "/officialwebsite/webApi/api/homePage/getChildHospationInfo?id=";
const URL15 = URL01 + "/officialwebsite/webApi/api/homePage/getNewsDetails?wxId=";
// const URL16 = URL01 + "/officialwebsite/webApi/api/make";

export default {
	//就是这个default
	ceshi() {
		return appRequst.get("http://117.159.7.252:8090/webApi/api/healthManagement/queryJyPopularScience");
	},
	//网站首页--患者服务
	getHomePageIndex(data) {
		return appRequst.get(URL1 + `${data}`);
	},
	//网站首页--三级菜单
	getNewsDetails(pid, val) {
		return appRequst.get(URL0 + `${pid}&title=${val}`);
	},
	//网站首页--三级菜单--详情页
	getNewsDetailsPage(pid) {
		return appRequst.get(URL0 + `${pid}`);
	},
	getNewsDetailsPage2(pid, val) {
		return appRequst.get(URL15 + `${pid}&title=${val}`);
	},
	//网站首页--特设科室简介
	characteristicDeptId(id) {
		// return appRequst.get(URL0 + `78&characteristicDeptId=` + `${id}`);
		return appRequst.get(URL13 + `${id}`);
	},
	//医院概况---医院简介
	queryHospitalProfileInfo() {
		//return appRequst.get(URL1 + `queryHospitalProfileInfo`)
		return appRequst.get(URL0 + "44");
	},
	// 医院概况---医院文化
	queryHospitalCulture() {
		//return appRequst.get(URL1 + 'queryHospitalCulture')
		return appRequst.get(URL0 + "45");
	},
	// 医院概况---医院荣誉
	queryHospitalHonors() {
		//return appRequst.get(URL1 + 'queryHospitalHonors')
		return appRequst.get(URL0 + "46");
	},
	// 医院概况---医院大事记
	queryHospitalMemorabilia() {
		//return appRequst.get(URL1 + 'queryHospitalMemorabilia')
		return appRequst.get(URL0 + "47");
	},
	// 医院动态---最新公告
	queryLatestAnnouncement() {
		return appRequst.get(URL0 + "50");
	},
	// 医院动态---新闻资讯
	queryNewsInformation() {
		return appRequst.get(URL0 + "49");
	},
	// 医院动态---卫生城市复审
	queryCityReview() {
		return appRequst.get(URL0 + "51");
	},
	// 医院动态---金医讯息
	queryPartyBuildingGarden() {
		return appRequst.get(URL0 + "49");
	},
	// 党群工作---党建园地    53-57
	partyPlaceOfBirth(data) {
		return appRequst.get(URL0 + `${data}`);
	},
	// // 党群工作---网上党课
	// queryPartyOnlineCourse() {
	// 	return appRequst.get(URL0 + '54')
	// },
	// // 党群工作---廉政教育
	// queryCleanGovernmentEducation() {
	// 	return appRequst.get(URL0 + '55')
	// },
	// // 党群工作---职工之家
	// queryStaffHome() {
	// 	return appRequst.get(URL0 + '56')
	// },
	// // 党群工作---社会活动
	// querySocialActivities() {
	// 	return appRequst.get(URL0 + '57')
	// },
	// 科研教学---科研工作
	queryResearchWork(data) {
		return appRequst.get(URL0 + `${data}`);
	},
	// // 科研教学---学术交流
	// queryAcademicExchange() {
	// 	return appRequst.get(URL0 + '60')
	// },
	// // 科研教学---
	// queryHousingTraining() {
	// 	return appRequst.get(URL0 + '61')
	// },
	// // 科研教学---教学工作
	// queryUndergraduateTeaching() {
	// 	return appRequst.get(URL0 + '62')
	// },
	// // 科研教学---研究生教育
	// queryPostgraduateEducation() {
	// 	return appRequst.get(URL0 + '63')
	// },
	// 健康管理---金医科普 65 66
	queryJyPopularScience(data) {
		return appRequst.get(URL0 + `${data}`);
	},
	// // 健康管理---专题讲座
	// querySpecialLecture() {
	// 	return appRequst.get(URL5 + 'querySpecialLecture')
	// },
	// 院务公开---招标公告
	queryTenderAnnouncement(data) {
		return appRequst.get(URL0 + `${data}`);
	},
	// 院务公开---人才招聘
	queryTalentRecruitment() {
		return appRequst.get(URL0 + "queryTalentRecruitment");
	},
	// 院务公开---金医药讯
	queryJyPharmaceuticalNews() {
		return appRequst.get(URL0 + "queryJyPharmaceuticalNews");
	},
	// 院务公开---医院制度
	queryHospitalSystem() {
		return appRequst.get(URL0 + "queryHospitalSystem");
	},
	// 院务公开---普法园地
	queryPopularizeLaw() {
		return appRequst.get(URL0 + "queryPopularizeLaw");
	},
	//获取所有科室
	getDept() {
		return appRequst.get(URL7 + "getDept");
	},
	//医疗服务价格查询
	priceType(data, val) {
		return appRequst.get(URL8 + `${data}&mnemonic=${val}`);
	},
	//药品价格查询
	mnemonic(data) {
		return appRequst.get(URL9 + `${data}`);
	},
	//特色科室
	getCharacteristicDept() {
		return appRequst.get(URL10);
	},
	//首页轮播图
	getLbt() {
		return appRequst.get(URL11);
	},
	//获取医生-专家团队
	getDoctor(page, size, data) {
		// return appRequst.get(URL12 + "?deptNumber=")
		return appRequst.get(URL12 + `?page=${page}&size=${size}&sort=deptno,level,mnemonic,id,asc&deptNumber=${data}&levelType=2`);
	},
	//获取医生
	getDoctorMnemonic(data) {
		return appRequst.get(URL12 + `?mnemonic=${data}`);
	},
	//专家简介
	doctorNo(data) {
		return appRequst.get(URL12 + `?id=${data}`);
	},
	//科室导航
	getDeptInfo() {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDept?queryType=0`);
	},
	//科室简介
	deptName(data) {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDept?deptname=${data}`);
	},
	//专家团队
	deptNo(data, data2, page, size) {
		// return appRequst.get(URL01 + `webApi/api/his/getDoctor?deptNumber=` + `${data}` + `&mnemonic=` + `${data2}`)
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDoctor?page=${page}&size=${size}&sort=level,mnemonic,id,asc&deptNumber=${data}&mnemonic=${data2}&levelType=2`);
	},
	//专家团_new
	newDeptNo(data, data2, name, page, size) {
		// return appRequst.get(URL01 + `webApi/api/his/getDoctor?deptNumber=` + `${data}` + `&mnemonic=` + `${data2}`)
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getTeamExpertDoctor?page=${page}&size=${size}&sort=deptno,doctorSort,asc&deptNumber=${data}&levelType=2&subjectId=${data2}&mnemonic=${name}`);
		// return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDoctor?page=${page}&size=${size}&sort=level,mnemonic,id,asc&deptNumber=${data}&mnemonic=${data2}&levelType=2`);
	},
	//科室导航_不加&levelType=2
	deptNo2(data, data2, page, size) {
		// return appRequst.get(URL01 + `webApi/api/his/getDoctor?deptNumber=` + `${data}` + `&mnemonic=` + `${data2}`)
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDoctor?page=${page}&size=${size}&sort=doctorSort,asc&deptNumber=${data}&mnemonic=${data2}`);
	},
	//底部导航栏  首页底部配置信息：
	getIndexConfig() {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/homePage/getIndexConfig`);
	},
	//获取精彩专题-四个园区的名称
	getHospationInfo() {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/homePage/getHospationInfo`);
	},
	getChildHospationInfo(id, data) {
		return appRequst.get(URL14 + `${id}&hospitalName=${data}`);
	},
	//挂号预约-获取院区列表
	hospitalList() {
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/hospitalList`,
			data: {
				channel: "3",
			},
		});
	},
	//学科列表
	getSubjects(data) {
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/getDeptsBySubjectId`,
			data: {
				channel: "3",
				hosCode: "",
				subjectId: data,
			},
		});
	},
	//医生号源
	registrationSources(jobNumber, depID, date) {
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/registrationSources`,
			data: {
				channel: "3",
				number: jobNumber,
				date: date,
				deptId: depID,
			},
		});
	},
	//预约记录查询
	reservationList(idCard, type) {
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/registrationList`,
			data: {
				channel: "3",
				cardNo: idCard,
				type: type,
				appointType: 1,
			},
		});
	},
	// 取消预约挂号
	registrationCancel(data) {
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/registrationCancel`,
			data: {
				channel: "3",
				appointmentId: data,
				deviceId: "",
			},
		});
	},
	// 获取医生列表
	getDoctorList(item, data) {
		console.log(item, data);
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/getDoctorList`,
			data: {
				channel: "3",
				// pageNumer: 1,
				// pageSize: 10,
				// doctorLevel: "",
				deptId: item.primaryKey,
				date: data,
				keyWord: item.title,
			},
		});
	},
	// 保存预约挂号
	registrationSave(item) {
		console.log(item);
		return appRequst({
			method: "POST",
			url: `http://117.159.7.252:8090/officialwebsite/webApi/api/make/registrationSave`,
			data: item,
		});
	},
	// 预约挂号页面，获取医生头像
	getDoctorPic(doctor, deptName) {
		return appRequst.get(`http://117.159.7.252:8090/officialwebsite/webApi/api/make/getDoctorPic?doctor=${doctor}&deptName=${deptName}`);
	},
	// 预约挂号注册
	registerCard(data) {
		return appRequst({
			method: "POST",
			url: "http://117.159.7.252:8090/officialwebsite/webApi/api/make/registerCard",
			data: data,
		});
	},
	// 获取学科信息
	getSubject() {
		return appRequst.get(`http://117.159.7.252:8090/officialwebsite/webApi/api/his/getSubject`);
	},
	//学科ID_查询学科下的科室
	subjectId(data) {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getDept?subjectId=${data}`);
	},
	//专家团队_各个学科
	getTeamExpertSubject() {
		return appRequst.get(URL01 + `/officialwebsite/webApi/api/his/getTeamExpertSubject`);
	},
	// quickMenus获取学科信息
	getSubject2() {
		return appRequst.get(`http://117.159.7.252:8090/officialwebsite/webApi/api/his/getSubject2`);
	},
	//便民查询__医疗类型
	getPriceInformationType() {
		return appRequst.get(`http://117.159.7.252:8090/officialwebsite/webApi/api/his/getPriceInformationType`);
	}, //便民查询__医疗耗材
	getMedicalconsumables(data) {
		return appRequst.get(`http://117.159.7.252:8090/officialwebsite/webApi/api/his/getMedicalconsumables?mnemonic=${data}`);
	},
};
