<template>
	<div>
		<div class="w1200 IMG" v-if="fontSize == 34">
			<img v-if="type == 0" src="../../assets/imgs/120111.jpg" alt="" />
			<img v-else-if="type == 1" src="../../assets/imgs/12012.jpg" alt="" />
			<img v-else-if="type == 2" src="../../assets/imgs/12013.jpg" alt="" />
			<img v-else src="../../assets/imgs/f01ebbfac91056abd6f40a75e917702.jpg" alt="" />
		</div>
		<div v-else-if="fontSize == 10" class="w1200 IMG">
			<img :src="`${imgURL}`" alt="" />
			<p>{{ titlePage }}</p>
		</div>
		<div v-else class="w1200 IMG">
			<img :src="`${imgURL}`" alt="" />
			<p :style="`fontSize:${fontSize}px;`">{{ banner }}</p>
		</div>
		<div class="h20"></div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: {
		fontSize: {
			type: Number,
			required: false,
		},
		type: {
			type: Number,
			required: false,
		},
		imgURL: {
			type: String,
			required: false,
			default: "",
		},
		titlePage: {
			type: String,
			required: false,
			default: "",
		},
	},
	name: "IMG",
	data() {
		return {};
	},

	computed: {
		...mapState(["banner", "newBanner"]),
	},
};
</script>

<style lang="scss" scoped>
@mixin font {
	position: absolute;
	top: 0%;
	left: 0%;
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 10px;
	padding: 10px;
	box-sizing: border-box;
	font-family: serif;
	// font-family: FangSong;
	font-size: 36px;
	font-weight: normal;
	color: #fff;
	text-indent: 2rem;
}
.IMG {
	position: relative;
	h3 {
		position: absolute;
		top: 15%;
		left: 10%;
		width: 400px;
		height: 100%;
		word-wrap: break-word;
		font-size: 36px;
		font-weight: normal;
		color: #fff;
	}
	// p {
	// 	@include font;
	// }

	// p {
	// 	@include font;
	// 	font-weight: bold;
	// 	color: transparent;
	// 	background-color: #fff;
	// 	text-shadow: rgba(255, 255, 255, 0.5) 0 5px 6px, rgba(255, 255, 255, 0.2) 1px 3px 3px;
	// 	-webkit-background-clip: text;
	// }
	// p {
	// 	@include font;
	// 	color: cornflowerblue;
	// 	font-weight: bold;
	// 	text-shadow: 4px 4px 0 white, 4px -4px 0 white, -4px -4px 0 white, -4px 4px 0 white, 4px 3px 0 white, 4px -3px 0 white, -4px -3px 0 white, -4px 3px 0 white, 4px 2px 0 white, 4px -2px 0 white, -4px -2px 0 white, -4px 2px 0 white, 4px 1px 0 white, 4px -1px 0 white, -4px -1px 0 white,
	// 		-4px 1px 0 white, 4px 0px 0 white, 4px 0px 0 white, -4px 0px 0 white, -4px 0px 0 white, 3px 4px 0 white, 3px -4px 0 white, -3px -4px 0 white, -3px 4px 0 white, 3px 3px 0 white, 3px -3px 0 white, -3px -3px 0 white, -3px 3px 0 white, 3px 2px 0 white, 3px -2px 0 white, -3px -2px 0 white,
	// 		-3px 2px 0 white, 3px 1px 0 white, 3px -1px 0 white, -3px -1px 0 white, -3px 1px 0 white, 3px 0px 0 white, 3px 0px 0 white, -3px 0px 0 white, -3px 0px 0 white, 2px 4px 0 white, 2px -4px 0 white, -2px -4px 0 white, -2px 4px 0 white, 2px 3px 0 white, 2px -3px 0 white, -2px -3px 0 white,
	// 		-2px 3px 0 white, 2px 2px 0 white, 2px -2px 0 white, -2px -2px 0 white, -2px 2px 0 white, 2px 1px 0 white, 2px -1px 0 white, -2px -1px 0 white, -2px 1px 0 white, 2px 0px 0 white, 2px 0px 0 white, -2px 0px 0 white, -2px 0px 0 white, 1px 4px 0 white, 1px -4px 0 white, -1px -4px 0 white,
	// 		-1px 4px 0 white, 1px 3px 0 white, 1px -3px 0 white, -1px -3px 0 white, -1px 3px 0 white, 1px 2px 0 white, 1px -2px 0 white, -1px -2px 0 white, -1px 2px 0 white, 1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px 0px 0 white, 1px 0px 0 white, -1px 0px 0 white,
	// 		-1px 0px 0 white, 0px 4px 0 white, 0px -4px 0 white, 0px -4px 0 white, 0px 4px 0 white, 0px 3px 0 white, 0px -3px 0 white, 0px -3px 0 white, 0px 3px 0 white, 0px 2px 0 white, 0px -2px 0 white, 0px -2px 0 white, 0px 2px 0 white, 0px 1px 0 white, 0px -1px 0 white, 0px -1px 0 white,
	// 		0px 1px 0 white;
	// }

	// p {
	// 	@include font;
	// 	// color: cornflowrblue;
	// 	font-weight: bold;
	// 	text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;

	// 	-webkit-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;

	// 	-moz-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;

	// 	*filter: Glow(color=#000, strength=1);
	// }
	p {
		@include font;
		// color: cornflowrblue;
		font-size: 60px;
		font-family: KaiTi;
		font-weight: bold;
		color: #fff;
		// -webkit-text-stroke-width: 1px;
		// -webkit-text-stroke-color: #fff;
		// -webkit-text-fill-color: #fff;
	}
	// p {
	// 	@include font;
	// 	font-size: 60px;
	// 	font-family: KaiTi;
	// 	font-weight: bold;
	// 	color: #0e79d9;
	// 	// line-height: 50px;
	// 	text-shadow: 0px 5px 1px rgba(23, 23, 23, 0.51);
	// 	// -webkit-text-stroke: 2px #ffffff;
	// 	// -webkit-text-stroke-width: 2px;
	// 	// -webkit-text-stroke-color: #fff;
	// 	-webkit-text-stroke: 0px #ffffff;
	// 	text-shadow: 4px 4px 0 white, 4px -4px 0 white, -4px -4px 0 white, -4px 4px 0 white, 4px 3px 0 white, 4px -3px 0 white, -4px -3px 0 white, -4px 3px 0 white, 4px 2px 0 white, 4px -2px 0 white, -4px -2px 0 white, -4px 2px 0 white, 4px 1px 0 white, 4px -1px 0 white, -4px -1px 0 white,
	// 		-4px 1px 0 white, 4px 0px 0 white, 4px 0px 0 white, -4px 0px 0 white, -4px 0px 0 white, 3px 4px 0 white, 3px -4px 0 white, -3px -4px 0 white, -3px 4px 0 white, 3px 3px 0 white, 3px -3px 0 white, -3px -3px 0 white, -3px 3px 0 white, 3px 2px 0 white, 3px -2px 0 white, -3px -2px 0 white,
	// 		-3px 2px 0 white, 3px 1px 0 white, 3px -1px 0 white, -3px -1px 0 white, -3px 1px 0 white, 3px 0px 0 white, 3px 0px 0 white, -3px 0px 0 white, -3px 0px 0 white, 2px 4px 0 white, 2px -4px 0 white, -2px -4px 0 white, -2px 4px 0 white, 2px 3px 0 white, 2px -3px 0 white, -2px -3px 0 white,
	// 		-2px 3px 0 white, 2px 2px 0 white, 2px -2px 0 white, -2px -2px 0 white, -2px 2px 0 white, 2px 1px 0 white, 2px -1px 0 white, -2px -1px 0 white, -2px 1px 0 white, 2px 0px 0 white, 2px 0px 0 white, -2px 0px 0 white, -2px 0px 0 white, 1px 4px 0 white, 1px -4px 0 white, -1px -4px 0 white,
	// 		-1px 4px 0 white, 1px 3px 0 white, 1px -3px 0 white, -1px -3px 0 white, -1px 3px 0 white, 1px 2px 0 white, 1px -2px 0 white, -1px -2px 0 white, -1px 2px 0 white, 1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px 0px 0 white, 1px 0px 0 white, -1px 0px 0 white,
	// 		-1px 0px 0 white, 0px 4px 0 white, 0px -4px 0 white, 0px -4px 0 white, 0px 4px 0 white, 0px 3px 0 white, 0px -3px 0 white, 0px -3px 0 white, 0px 3px 0 white, 0px 2px 0 white, 0px -2px 0 white, 0px -2px 0 white, 0px 2px 0 white, 0px 1px 0 white, 0px -1px 0 white, 0px -1px 0 white,
	// 		0px 1px 0 white;
	// }
}
</style>
