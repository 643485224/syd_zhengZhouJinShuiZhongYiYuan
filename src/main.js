import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/public.scss"; //公共css
import "./assets/css/common.scss"; //公共css
import VueLazyload from "vue-lazyload";

Vue.use(ElementUI);
Vue.use(VueLazyload, {
	// 可以通过配置loading来设置图片还未加载好之前的占位图片
	loading: require("./assets/imgs/biaoti.jpg"),
});
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
