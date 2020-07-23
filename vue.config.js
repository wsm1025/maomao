module.exports = {
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
	}
}