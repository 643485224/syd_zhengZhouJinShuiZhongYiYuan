import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const routes = [
	{
		path: "/",
		name: "Home",
		meta: {
			title: "首页",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
	},
	{
		path: "/PatientServices",
		name: "PatientServices",
		meta: {
			title: "患者服务",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/PatientServices.vue"),
	},
	{
		path: "/Convenient",
		name: "Convenient",
		meta: {
			title: "便民服务",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/Convenient.vue"),
	},
	{
		path: "/WonderfulTopic",
		name: "WonderfulTopic",
		meta: {
			title: "专题专栏",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/WonderfulTopic.vue"),
	},
	{
		path: "/HospitalOverview",
		name: "HospitalOverview",
		meta: {
			title: "医院概况",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/HospitalOverview.vue"),
	},
	{
		path: "/HospitalNews",
		name: "HospitalNews",
		meta: {
			title: "医院动态",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/HospitalNews.vue"),
	},
	{
		path: "/PartyMassWork",
		name: "PartyMassWork",
		meta: {
			title: "党群工作",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/PartyMassWork.vue"),
	},
	{
		path: "/TeamExperts",
		name: "TeamExperts",
		meta: {
			title: "专家团队",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/TeamExperts.vue"),
	},
	{
		path: "/ResearchTeaching",
		name: "ResearchTeaching",
		meta: {
			title: "科研教学",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/ResearchTeaching.vue"),
	},
	{
		path: "/HealthControl",
		name: "HealthControl",
		meta: {
			title: "健康管理",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/HealthControl.vue"),
	},
	{
		path: "/HospitalAffairs",
		name: "HospitalAffairs",
		meta: {
			title: "院务公开",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/HospitalAffairs.vue"),
	},
	{
		path: "/Details",
		name: "Details",
		meta: {
			title: "详情页",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index.vue"),
	},
	{
		path: "/Details2",
		name: "Details2",
		meta: {
			title: "详情页2",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index2.vue"),
	},
	{
		path: "/Details3",
		name: "Details3",
		meta: {
			title: "详情页3",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index3.vue"),
	},
	{
		path: "/Details4",
		name: "Details4",
		meta: {
			title: "详情页4",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index4.vue"),
	},
	{
		path: "/Details5",
		name: "Details5",
		meta: {
			title: "详情页5",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index5.vue"),
	},
	{
		path: "/Details6",
		name: "Details6",
		meta: {
			title: "详情页6",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index6.vue"),
	},
	{
		path: "/Details7",
		name: "Details7",
		meta: {
			title: "注册页7",
		},
		component: () => import(/* webpackChunkName: "about" */ "../components/DetailsPage/index7.vue"),
	},
	{
		path: "/DepartmentNavigation",
		name: "DepartmentNavigation",
		meta: {
			title: "科室导航",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/DepartmentNavigation.vue"),
	},

	{
		path: "/EachHospitalArea",
		name: "EachHospitalArea",
		meta: {
			title: "各院区",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/EachHospitalArea.vue"),
	},
	{
		path: "/AppointmentRegister",
		name: "AppointmentRegister",
		meta: {
			title: "预约挂号",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/AppointmentRegister.vue"),
	},
	{
		path: "/AppointmentQuery",
		name: "AppointmentQuery",
		meta: {
			title: "查询预约",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/AppointmentQuery.vue"),
	},
	{
		path: "/AppointmentCancel",
		name: "AppointmentCancel",
		meta: {
			title: "取消预约",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/AppointmentCancel.vue"),
	},
	{
		path: "/404",
		name: "Four",
		meta: {
			title: "404未找到",
		},
		component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
	},
	{
		path: "*",
		redirect: "/404",
	},
];

const router = new VueRouter({
	// mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
