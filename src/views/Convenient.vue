<template>
	<div class="convenient">
		<Logo></Logo>
		<IMG :fontSize="55" :imgURL="require('@/assets/imgs/4da23bcead02e9ce2b8474e8d596c5f.jpg')"></IMG>
		<div class="overview w1200 flex-space-between">
			<div class="overview-left">
				<QuickNavigation :keyBoolen="true"></QuickNavigation>
			</div>
			<div class="overview-right">
				<Crumbs></Crumbs>
				<el-form label-width="120px" class="form-div" v-if="$route.query.id == 0">
					<el-form-item label="医疗服务名称：">
						<!-- <el-select v-model="medicalService.servicePrice" placeholder="请选择">
							<el-option v-for="item in serviceList" :key="item.id" :label="item.value" :value="item.id"> </el-option>
						</el-select>
						<el-input placeholder="请输入医疗服务名称" v-model="medicalService.servicePrice" clearable></el-input> -->
						<el-input placeholder="请输入医疗服务名称" v-model="medicalService.serviceText" clearable class="input-with-select">
							<el-select v-model="medicalService.servicePrice" slot="prepend" clearable placeholder="请选择医疗类型" style="width:145px;">
								<el-option v-for="item in serviceList" :key="item.ejxmxx_xmbmchr" :label="item.ejxmxx_xmmcchr" :value="item.ejxmxx_xmbmchr"> </el-option>
							</el-select>
						</el-input>
					</el-form-item>
					<div class="h20"></div>
					<el-row :gutter="24">
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="query(medicalService, 0)">查询</el-button>
						</el-col>
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="reset(0)">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-form label-width="120px" class="form-div" v-if="$route.query.id == 1">
					<el-form-item label="常用药品名称：">
						<el-input placeholder="请输入常用药品名称" v-model="medicalService.drugPrice" clearable></el-input>
					</el-form-item>
					<div class="h20"></div>
					<el-row :gutter="24">
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="query(medicalService, 1)">查询</el-button>
						</el-col>
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="reset(1)">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-form label-width="120px" class="form-div" v-if="$route.query.id == 2">
					<el-form-item label="医疗耗材名称：">
						<el-input placeholder="请输入医疗耗材名称：" v-model="medicalService.consumables" clearable></el-input>
					</el-form-item>
					<div class="h20"></div>
					<el-row :gutter="24">
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="query(medicalService, 2)">查询</el-button>
						</el-col>
						<el-col :span="12" align="middle">
							<el-button type="primary" @click="reset(2)">重置</el-button>
						</el-col>
					</el-row>
				</el-form>
				<div class="h20"></div>
				<div v-loading="fullscreenLoading" v-if="fullscreenLoading" class="loading"></div>
				<!-- 医疗服务_0  常用药品_1 医疗耗材_2-->
				<div v-if="$route.query.id == 0">
					<el-table :data="mnemonicList" border style="width: 100%" v-if="mnemonicList.length !== 0">
						<el-table-column prop="priceno" label="编码" width="175"> </el-table-column>
						<el-table-column prop="pricename" label="项目名称" width="454"> </el-table-column>
						<el-table-column prop="priceunit" label="计价单位" width="80"> </el-table-column>
						<el-table-column prop="hospitalprice" label="区级价格" width="160" :formatter="rounding"> </el-table-column>
					</el-table>
				</div>
				<div v-if="$route.query.id == 1">
					<el-table :data="mnemonicList" border style="width: 100%" v-if="mnemonicList.length !== 0">
						<el-table-column prop="drugno" label="编码" width="109"> </el-table-column>
						<el-table-column prop="drugname" label="药品名称" width="350"> </el-table-column>
						<el-table-column prop="drugspec" label="药品规格" width="150"> </el-table-column>
						<el-table-column prop="drugtype" label="药品类型" width="80"> </el-table-column>
						<el-table-column prop="drugunit" label="计价单位" width="80"> </el-table-column>
						<el-table-column prop="drugprice" label="价格" width="100" :formatter="rounding"> </el-table-column>
					</el-table>
				</div>
				<div v-if="$route.query.id == 2">
					<el-table :data="mnemonicList" border style="width: 100%" v-if="mnemonicList.length !== 0">
						<el-table-column prop="priceno" label="编码" width="159"> </el-table-column>
						<el-table-column prop="pricename" label="医疗耗材名称" width="350"> </el-table-column>
						<el-table-column prop="specunit" label="医疗耗材型号" width="110"> </el-table-column>
						<el-table-column prop="priceunit" label="医疗耗材规格" width="150"> </el-table-column>
						<el-table-column prop="hospitalprice" label="价格" width="100" :formatter="rounding"> </el-table-column>
					</el-table>
				</div>
				<div class="h20"></div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageAmount" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="mnemonicLength" v-if="mnemonicLength > 10"> </el-pagination>
			</div>
		</div>
		<div class="h20"></div>
		<DBDH></DBDH>
	</div>
</template>

<script>
//首页-便民查询-医疗服务价格 Page
import Logo from "../components/logo/index.vue";
import IMG from "../components/IMG/index.vue";
import QuickNavigation from "../components/QuickNavigation/index.vue";
import DBDH from "../components/dbdh/index.vue";
import Crumbs from "../components/crumbs/index.vue";
import WebApi from "../webapi/modules/webapi";
export default {
	data() {
		return {
			tableText: "",
			synopsis: "",
			synopsisList: [],
			synopsisHtmlContent: [],
			//1.检查 2.化验 3.手术 4.床位 5.诊疗6.挂号 7.处置费
			serviceList: [
				{
					id: 1,
					value: "检查",
				},
				{
					id: 2,
					value: "化验",
				},
				{
					id: 3,
					value: "手术",
				},
				{
					id: 4,
					value: "床位",
				},
				{
					id: 5,
					value: "诊疗",
				},
				{
					id: 6,
					value: "挂号",
				},
				{
					id: 7,
					value: "处置费",
				},
			],
			medicalService: {
				servicePrice: "", //医疗服务select内容
				serviceText: "", //医疗服务input内容
				drugPrice: "",
				consumables: "",
			},
			mnemonicList: [],
			newMnemonicList: [],
			mnemonicLength: 0,
			currentPage: 1,
			pageAmount: 10,
			fullscreenLoading: false,
		};
	},
	created() {
		this.service();
	},
	mounted() {
		this.request(this.$route.query.id);
	},
	methods: {
		service() {
			WebApi.getPriceInformationType()
				.then(({ data }) => {
					console.log(data, "便民查询__医疗类型");
					this.serviceList = data.data;
				})
				.catch((err) => {
					console.log(`请联系平台人员${err}`);
				});
		},
		async request() {
			this.mnemonicList = [];
			this.currentPage = 1;
			this.mnemonicLength = 0;
			this.fullscreenLoading = false;
		},
		async query(value, type) {
			console.log(value, type, "---查询");
			this.request();
			// this.mnemonicList = [];
			// this.currentPage = 1; //每次请求变成第一页
			this.fullscreenLoading = true;
			if (type == 0) {
				// this.mnemonicList = [{ cityprice: "5999.00", priceno: "110900303", pricename: "双人间", mnemonic: "SRJ", contryprice: "45.00", provinceprice: "45.00", hospitalprice: "45.00" }];
				WebApi.priceType(value.servicePrice, value.serviceText)
					.then(({ data }) => {
						console.log(data);
						// this.$message({ type: "success", message: data.errorMsg })
						this.newMnemonicList = data.data;
						this.mnemonicLength = data.data.length;
						this.getTableData(1);
						this.fullscreenLoading = false;
					})
					.catch((err) => {
						console.log(`请联系平台人员${err}`);
					});
			} else if (type == 1) {
				WebApi.mnemonic(value.drugPrice)
					.then(({ data }) => {
						// this.$message({ type: "success", message: data.errorMsg })
						this.newMnemonicList = data.data;
						this.mnemonicLength = data.data.length;
						this.getTableData(2);
						this.fullscreenLoading = false;
					})
					.catch((err) => {
						console.log(`请联系平台人员${err}`);
					});
			} else if (type == 2) {
				// this.$message.error("暂无信息！");
				WebApi.getMedicalconsumables(value.consumables)
					.then(({ data }) => {
						// this.$message({ type: "success", message: data.errorMsg })
						console.log(data, "---耗材");
						this.newMnemonicList = data.data;
						this.mnemonicLength = data.data.length;
						this.getTableData(3);
						this.fullscreenLoading = false;
					})
					.catch((err) => {
						console.log(`请联系平台人员${err}`);
					});
				this.fullscreenLoading = false;
			}
		},
		reset(type) {
			if (type == 0) {
				this.medicalService.servicePrice = "";
				this.medicalService.serviceText = "";
			} else if (type == 1) {
				this.medicalService.drugPrice = "";
			} else if (type == 2) {
				this.medicalService.consumables = "";
			}
		},
		async newPage(item) {
			// console.log(item, index)
			// this.$store.commit("newBanner", this.$store.state.banner); //详情换details
			let newPageUrl = this.$router.resolve({
				name: "Details",
				query: { id: item.id, data: item.title, time: item.createTime.slice(0, 11), type: 2, newBanner: this.$store.state.banner, newBannerText: this.$store.state.bannerText },
			});
			window.open(newPageUrl.href);
		},
		handleSizeChange(val) {
			this.pageAmount = val;
			this.getTableData();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getTableData();
		},
		getTableData() {
			this.mnemonicList = this.newMnemonicList.slice((this.currentPage - 1) * this.pageAmount, this.currentPage * this.pageAmount);
		},
		rounding(row, column) {
			return parseFloat(row[column.property]).toFixed(2);
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
		QuickNavigation,
		DBDH,
		Crumbs,
	},
};
</script>
<style lang="scss" scoped>
.convenient {
	width: 100%;
	height: 100%;
	.overview {
		// display: flex;
		// justify-content: space-between;
		.overview-left {
			width: 24%;
		}
		.overview-right {
			width: 870px;
			.form-div {
				margin: auto 180px;
				margin-top: 5%;
			}
			.el-form-item {
				font-size: 20px;
				font-weight: bold;
			}
			.el-button {
				width: 100%;
			}
			.loading {
				height: 200px;
			}
			ul {
				li {
					width: 100%;
					height: 40px;
					font-size: 14px;
					a {
						display: block;
						width: 100%;
						height: 100%;
						color: #57afd5;
						display: flex;
						justify-content: space-between;
					}
					a:hover {
						color: cornflowerblue;
					}
				}
			}
		}
	}
}
</style>
