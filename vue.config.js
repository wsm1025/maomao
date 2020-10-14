module.exports = {
	publicPath:'/maomao',
	devServer: {
		proxy: {
			'/searchlist': {
				target:"https://m.maoyan.com",
				changeOrigin: true
			},
			'/ajax':{
				target:"https://m.maoyan.com",
				changeOrigin: true
			}
		}
	},
   publicPath: process.env.NODE_ENV === "production" ?  "/miaomiao" : "/",
}