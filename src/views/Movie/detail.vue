<template>
	<div id="detailContent" class="slide-enter">
		<Header title="影片详情">
			<i class="iconfont icon-right" @touchstart="Back"></i>
		</Header>
		<Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="DetailList.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{DetailList.name}}</h2>
						<p>导演:{{DetailList.director}}</p>
						<p>评分:{{DetailList.grade}}</p>
						<p>{{DetailList.category}}</p>
						<p>{{DetailList.nation}} / {{DetailList.runtime}}分钟</p>
						<p>{{DetailList.language}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{DetailList.synopsis}}</p>
			</div>
			<div class="detail_player swiper-container">
				<ul class="swiper-wrapper">
					<li v-for=" n in DetailList.actors"  class="swiper-slide">
						<div>
							<img :src="n.avatarAddress" alt="">
						</div>
						<p>{{n.name}}</p>

					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/header'
	export default {
		name: 'Detail',
		data() {
			return {
				DetailList: [],
				isLoading:true,
			}
		},
		components: {
			Header
		},
		props: ['MovieId'],
		methods: {
			Back() {
				this.$router.back()
			}
		},
		mounted() {
			// console.log(this.MovieId)
			this.axios({
				url: `https://m.maizuo.com/gateway?filmId=${this.MovieId}&k=3743290`,
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561"}',
					'X-Host': 'mall.film-ticket.film.info'
				}
			}).then(res => {
				this.DetailList = res.data.data.film;
				this.isLoading = false;
				this.$nextTick(() => {
					new Swiper('.detail_player', {
						slidesPerView: 'auto',
						freeMode: true,
						freeModeSticky: true
					});
				});
			})
		}
	}
</script>

<style scoped>
	#detailContent {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		min-height: 100%;
		background: white;
	}

	.slide-enter {
		animation: .3s slideMove;
	}

	@keyframes slideMove {
		from {
			transform: translateX(100%);
		}

		to {
			transform: translateX(0);
		}
	}

	#content.contentDetail {
		display: block;
		margin-bottom: 0;
	}

	#content .detail_list {
		height: 200px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.detail_list .detail_list_bg {
		width: 100%;
		height: 100%;
		background: url(/images/movie_1.jpg) 0 40%;
		filter: blur(20px);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
	}

	.detail_list .detail_list_filter {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #40454d;
		opacity: .55;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.detail_list .detail_list_content {
		display: flex;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.detail_list .detail_list_img {
		width: 108px;
		height: 150px;
		border: solid 1px #f0f2f3;
		margin: 20px;
	}

	.detail_list .detail_list_img img {
		width: 100%;
		height: 100%;
	}

	.detail_list .detail_list_info {
		margin-top: 20px;
	}

	.detail_list .detail_list_info h2 {
		font-size: 20px;
		color: white;
		font-weight: normal;
		line-height: 40px;
	}

	.detail_list .detail_list_info p {
		color: white;
		line-height: 20px;
		font-size: 14px;
		color: #ccc;
	}

	#content .detail_intro {
		padding: 10px;
	}

	#content .detail_player {
		margin: 20px;
	}

	.detail_player .swiper-slide {
		width: 70px;
		margin-right: 20px;
		text-align: center;
		font-size: 14px;
	}

	.detail_player .swiper-slide img {
		width: 100%;
		margin-bottom: 5px;
	}

	.detail_player .swiper-slide p:nth-of-type(2) {
		color: #999;
	}
</style>
