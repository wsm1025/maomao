<template>
	<div class="movie_body">
		<ul v-if="movielist.length">
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
	</div>
</template>
<script>
	import Vue from 'vue'
	import moment from 'moment'
	Vue.filter("actorfilter", function(data) {
		var newlist = data.map(item => item.name);
		return (newlist.join(' '))
	});
	Vue.filter('formatDate',function(dates,pattern='MM-DD'){
		return moment(dates).format(pattern)
	});
	export default {
		name: 'comingsoon',
		data() {
			return {
				movielist: []
			}
		},
		mounted() {
			var id = localStorage.getItem('cityId');
			this.axios({
				url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=9738843`,
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561","bc":"110100"}',
					'X-Host': 'mall.film-ticket.film.list'
				}
			}).then(res => {
				this.movielist = res.data.data.films;
			})
		}
	}
</script>

<style>
	#content .movie_body {
		flex: 1;
		overflow: auto;
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
