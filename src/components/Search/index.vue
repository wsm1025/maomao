<template>
	<Scroller>
	<div class="search_body">
		<div class="search_input">
			<div class="search_input_wrapper">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" v-model="message">
			</div>
		</div>
		<div class="search_result">
			<h3>电影/电影院</h3>
				<ul>
					<li v-for="n in movielist" :key="n.id">
						<div class="img"><img :src="n.img | imgpath"></div>
						<div class="info">
							<p><span style="display: block;">{{n.nm}}</span><span>{{n.sc}}</span></p>
							<p v-if="n.enm">{{n.enm}}</p>
							<p v-else>无</p>
							<p>{{n.cat}}</p>
							<p>{{n.rt}}</p>
						</div>
					</li>
				</ul>
		</div>
	</div>
</Scroller>
</template>

<script>
	import Vue from 'vue'
	Vue.filter("imgpath", function(res) {
		return res.replace("w.h", "128.168");
	});
	export default {
		name: 'search',
		data() {
			return {
				message: '',
				movielist: []
			}
		},
		methods: {
			cancelRequest() {
				if (typeof this.source === 'function') {
					this.source('终止请求')
				}
			},
		},
		watch: {
			message(newVal) {
				var that = this;
				this.cancelRequest();
				this.axios.get(`/searchlist/movies?keyword=${newVal}&ci=30&offset=20&limit=20`, {
					cancelToken: new this.axios.CancelToken(function(c) {
						that.source = c;
					})
				}).then(res => {
					this.movielist = res.data.movies; //重启
				}).catch((err) => {
					if (this.axios.isCancel(err)) {
						return 1;
					} else {
						//handle error
						return;
					}
				})
			}
		},
	}
</script>

<style scoped>
	#content .search_body {
		flex: 1;
		overflow: hidden;
	}

	.search_body .search_input {
		padding: 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
	}

	.search_body .search_input_wrapper {
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		display: flex;
		line-height: 20px;
	}

	.search_body .search_input_wrapper i {
		font-size: 16px;
		padding: 4px 0;
	}

	.search_body .search_input_wrapper input {
		border: none;
		font-size: 13px;
		color: #333;
		padding: 4px 0;
		outline: none;
		margin-left: 5px;
		width: 100%;
	}


	.search_body .search_result h3 {
		font-size: 15px;
		color: #999;
		padding: 9px 15px;
		border-bottom: 1px solid #e6e6e6;
	}

	.search_body .search_result li {
		border-bottom: 1px #c9c9c9 dashed;
		padding: 10px 15px;
		box-sizing: border-box;
		display: flex;
	}

	.search_body .search_result .img {
		width: 60px;
		float: left;
	}

	.search_body .search_result .img img {
		width: 100%;
	}

	.search_body .search_result .info {
		float: left;
		margin-left: 15px;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search_body .search_result .info p {
		height: 22px;
		display: flex;
		line-height: 22px;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search_body .search_result .info p span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
		font-size: 18px;
		flex: 1;
	}

	.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
		font-size: 16px;
		color: #fc7103;
	}
</style>
