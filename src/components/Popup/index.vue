<template>
	<div class="modal-bg" v-show="show">
		<div class="modal-container">
			<div class="modal-header">
				{{ title }}
			</div>
			<div class="modal-main">
				<slot></slot>
			</div>
			<div class="modal-footer" :style="hideBoolen ? 'justify-content: space-between;' : 'justify-content: center;'">
				<el-button round @click="hideModal" v-if="hideBoolen">取消</el-button>
				<el-button type="primary" round @click="submit">确认</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "modal",
	props: {
		show: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: "",
		},
		hideBoolen: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			x: 0,
			y: 0,
			node: null,
			isCanMove: false,
		};
	},
	mounted() {
		this.node = document.querySelector(".modal-container");
	},
	methods: {
		hideModal() {
			this.$emit("hideModal");
		},

		submit() {
			this.$emit("submit");
		},

		setStartingPoint(e) {
			this.x = e.clientX - this.node.offsetLeft;
			this.y = e.clientY - this.node.offsetTop;
			this.isCanMove = true;
		},

		modalMove(e) {
			if (this.isCanMove) {
				this.node.style.left = e.clientX - this.x + "px";
				this.node.style.top = e.clientY - this.y + "px";
			}
		},

		cancelMove() {
			this.isCanMove = false;
		},
	},
};
</script>

<style lang="scss" scoped>
@mixin fontSize {
	font-family: Source Han Sans CN;
	font-weight: bold;
}
.modal-bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 10000;
}
.modal-container {
	background: #fff;
	border-radius: 10px;
	overflow: hidden;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 887px;
	color: #555555;
	font-size: 16px;
	font-family: SourceHanSansCN-Normal;
	transform: translate(-50%, -50%);
}
.modal-header {
	@include fontSize;
	height: 81px;
	background: #005197;
	color: #fff;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	// cursor: move;
}
.modal-footer {
	display: flex;
	align-items: center;
	justify-content: center;
	justify-content: space-between;
	padding: 0px 253px 83px 253px;

	button {
		@include fontSize;
		width: 150px;
		height: 58px;
		border: 2px solid #005197;
		border-radius: 10px;
		color: #005197;
	}
	button:last-child {
		color: #fff;
		background: #005197;
	}
}
.modal-main {
	padding: 41px 46px;
}
</style>
