<template>
	<div class="movie_body">
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else :handelToTouchEnd="handelToTouchEnd" :handleToScroll="handleToScroll">
			<ul v-if="movielist.length"><!-- 此处用了v-if指令，用better-scroller，如果没有v-else会报错 -->
			<li class="pulldown">{{pulldownmessage}}</li>
				<li v-for="n in movielist" :key="n.filmId">
					<div class="pic_show"><img :src="n.poster"></div>
					<div class="info_list">
						<h2>{{n.name}}</h2>
						<p v-if="n.actors">主演:{{n.actors | actorfilter}}</p>
						<p v-else>暂无主演</p>
						<p>上映时间:{{n.premiereAt*1000 | formatDate('MM月DD日')}}</p>
					</div>
					<div class="btn_pre">
						预售
					</div>
				</li>
			</ul>
			<ul v-else>暂无信息</ul>
		</Scroller>
	</div>
</template>
<script>
	import Vue from 'vue'
	import moment from 'moment'
	Vue.filter("actorfilter", function(data) {
		var newlist = data.map(item => item.name);
		return (newlist.join(' '))
	});
	Vue.filter('formatDate', function(dates, pattern = 'MM-DD') {
		return moment(dates).format(pattern)
	});
	export default {
		name: 'comingsoon',
		data() {
			return {
				movielist: [],
				pulldownmessage: '',
				isLoading:true,
				prevCityId:-1
			}
		},
		activated() {
			var id = this.$store.state.city.cityId;
			if(this.prevCityId === id){return ;}
			this.isLoading = true;
			this.axios({
				url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=9738843`,
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561","bc":"110100"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(res => {
				this.movielist = res.data.data.films;
				this.isLoading = false;
				this.prevCityId = id;
			})
		},
		methods:{
			handleToScroll(pos) {
				if (pos.y > 20) {
					this.pulldownmessage = '正在更新';
				}
			},
			handelToTouchEnd(pos){
			    var id = this.$store.state.city.cityId;
				if (pos.y > 20) {
							this.axios({
								url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=9738843`,
								headers: {
									'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561","bc":"110100"}',
									'X-Host': 'mall.film-ticket.film.list'
								}
							}).then(res => {
								this.pulldownmessage = '更新成功';
								setTimeout(() => {
									this.movielist = res.data.data.films;
									this.pulldownmessage = ' ';
								}, 1000)
							});
						}
			}
		}
	}
</script>

<style>
	.movie_body .pulldown {
		margin: 0;
		display: block;
		padding: 0;
		border: none;
		text-align: center;
		font-size: 12px;
	}
	#content .movie_body {
		flex: 1;
		overflow: hidden;
	}

	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}

	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}

	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}

	.movie_body .pic_show img {
		width: 100%;
	}

	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}

	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list p {
		font-size: 16px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}

	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}

	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}

	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
</style>
