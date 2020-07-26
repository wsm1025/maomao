<template>
	<div id="main">
		<Header title="猫猫电影"></Header>
		<div id="content">
			<div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{$store.state.city.name}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
					<router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	import Header from '@/components/header'
	import Tabbar from '@/components/tabbar'
	import {messageBox} from '@/components/Js'
	export default {
		name: 'Movie',
		components: {
			Header,
			Tabbar
		},
		mounted() {
			setTimeout(() => {
					this.axios.get('https://tianqiapi.com/api?version=v61&appid=44148117&appsecret=cYkMG4cL').then(res => {
						// console.log(res.data)
						// console.log(res.data.city)
						if(window.localStorage.getItem("cityName") == res.data.city){return;}//判断当前选中城市是否为所在城市
						messageBox({
							title: '定位',
							content: res.data.city,
							cancel: '取消',
							ok: '切换城市',
							handleOk() { //因为调用不同的api，返回的城市Id不同。故写代码匹配上
								window.localStorage.setItem('cityName', res.data.city);
								//因为调用不同的api，返回的城市Id不同。故写代码匹配上
								var WAIICITY = res.data.city;
								this.axios({
									url: 'https://m.maizuo.com/gateway?k=9061035',
									headers: {
										'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561","bc":"310100"}',
										'X-Host': 'mall.film-ticket.city.list'
									}
								}).then(res=>{
									// console.log( WAIICITY);
									for(var n in res.data.data.cities){
									var arr = res.data.data.cities.filter(item => item.name.substring(0, 2) == WAIICITY);//匹配数据
									}
									window.localStorage.setItem('cityId', arr[0].cityId);//可能有多个返回数组，arr[0]
									window.location.reload();
								})
							}
						})
					})
				}, 3000);
		},
	}
</script>

<style scoped>
	#content .movie_menu {
		width: 100%;
		height: 45px;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		z-index: 10;
	}

	.movie_menu .city_name {
		margin-left: 20px;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .hot_swtich {
		display: flex;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .hot_item {
		font-size: 15px;
		color: #666;
		width: 80px;
		text-align: center;
		margin: 0 12px;
		font-weight: 700;
	}

	.movie_menu .search_entry {
		margin-right: 20px;
		height: 100%;
		line-height: 45px;
	}

	.movie_menu .search_entry i {
		font-size: 24px;
		color: red;
	}

	.router-link-active {
		color: #ef4238;
		border-bottom: 2px #ef4238 solid;
	}
</style>
