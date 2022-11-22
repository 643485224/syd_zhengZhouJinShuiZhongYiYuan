import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		banner: "",
		bannerType: "",
		bannerText: "",
		bannerList: [],
		synopsisHtmlContent: [],
		deptamentList: [],
		TeamExpertsText: "专家列表",
	},
	mutations: {
		banner: (state, val) => {
			state.banner = val;
		},
		bannerType: (state, val) => {
			state.bannerType = val;
		},
		bannerText: (state, val) => {
			state.bannerText = val;
		},
		bannerList: (state, val) => {
			state.bannerList = [];
			state.bannerList = val;
		},
		synopsisHtmlContent: (state, val) => {
			state.synopsisHtmlContent = [];
			state.synopsisHtmlContent = val;
		},
		deptamentList: (state, val) => {
			state.deptamentList = val;
		},
		TeamExpertsText: (state, val) => {
			state.TeamExpertsText = val;
		},
	},
	actions: {},
	modules: {},
});
