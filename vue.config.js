const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	//基本路径
	publicPath: "./",
	// devServer: {
	// 	port: 8888,
	// 	open: true,
	// },
	productionSourceMap: false,
	//构建时的输出目录
	// outputDir: "www",
	//html的输出路径
	// indexPath: "index.html",
	//文件名哈希
	// filenameHashing: true,
	configureWebpack: {
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: true, //干掉那些console;
							drop_debugger: true, //干掉那些debugger;
						},
					},
				}),
			],
		},
	},
};
