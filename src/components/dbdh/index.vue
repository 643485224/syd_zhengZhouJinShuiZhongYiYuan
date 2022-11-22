<template>
	<div>
		<div class="h20"></div>
		<div class="yqlj flex-center-center" style="height:1px;">
			<!-- <p class="flex-center">
				&nbsp;友情链接：
				<a href="http://www.cha.org.cn/" target="_blank">中国医院协会</a>
				<a href="http://www.hnwsjsw.gov.cn/" target="_blank">河南省卫生健康委员会</a>
				<a href="http://wjw.zhengzhou.gov.cn" target="_blank">郑州市卫生健康委员会</a>
			</p> -->
		</div>
		<div class="dbxx">
			<div class="w1200">
				<el-form label-width="100px" class="demo-ruleForm">
					<el-form-item label="咨询电话:" v-if="bottomInformation.length !== 0">{{ bottomInformation.consultationTelephone }} </el-form-item>
					<el-form-item label="急救电话:" v-if="bottomInformation.length !== 0">{{ bottomInformation.emergencyTelephone }}</el-form-item>
					<el-form-item label="预约挂号:" v-if="bottomInformation.length !== 0">{{ bottomInformation.makeRegister }}</el-form-item>
					<el-form-item label="电子邮箱:" v-if="bottomInformation.length !== 0">{{ bottomInformation.email }}</el-form-item>
					<el-form-item label="医院地址:" v-if="bottomInformation.length !== 0">
						<p class="text-wrap">
							{{ bottomInformation.address }}
						</p>
					</el-form-item>
					<el-form-item label="乘车路线:" v-if="bottomInformation.length !== 0">
						<p class="text-wrap">
							{{ bottomInformation.busLine }}
						</p>
					</el-form-item>
				</el-form>
				<ul class="flex-space-evenly-center">
					<li>
						<img src="../../assets/imgs/service.jpg" alt="微信服务号" width="90" height="90" />
						<p>扫码关注</p>
						<p>微信服务号</p>
					</li>
					<li>
						<img src="../../assets/imgs/subscribe.jpg" alt="微信订阅号" width="90" height="90" />
						<p>扫码关注</p>
						<p>微信订阅号</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="yqlj flex-center-center">
			<p class="flex-space-evenly-center">
				<span>Copyright © 2015-2022 郑州市金水区总医院</span>
				<span>
					<a href="https://beian.miit.gov.cn/#/Integrated/index">豫ICP备17001621号-1</a>
				</span>
			</p>
		</div>
	</div>
</template>
<script>
import WebApi from "../../webapi/modules/webapi";
export default {
	name: "DBDH",
	data() {
		return {
			bottomInformation: [],
		};
	},
	created() {
		this.getIndexConfig();
	},
	methods: {
		getIndexConfig() {
			WebApi.getIndexConfig()
				.then(({ data }) => {
					// console.log(data, "--底部请求返回")
					this.bottomInformation = data.data[0];
				})
				.catch((err) => {
					console.log("网络请求失败", err);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.yqlj {
	height: 36px;
	background: #005197;
	p {
		width: 40%;
		font-size: 14px;
		color: #fff;

		a {
			// margin-left: 20px;
			color: #fff;
		}
	}
}
.dbxx {
	width: 100%;
	height: 170px;
	background: #f3fffe;
	padding: 20px 0px 10px 0px;
	box-sizing: border-box;

	.text-wrap {
		white-space: pre-wrap;
		margin-top: 6px;
		font: -webkit-small-control;
		line-height: initial;
		line-height: 13px;
		text-indent: -4px;
	}
	div {
		position: relative;

		ul {
			position: absolute;
			right: 0px;
			top: 0px;

			li {
				img {
					object-fit: cover;
				}
				p {
					height: 20px;
					line-height: 20px;
					text-align: center;
					font-size: 13px;
				}
			}
		}
	}
}
</style>
