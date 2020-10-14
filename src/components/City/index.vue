<template>
	<div class="city_body">
		<Loading v-if="isLoading"></Loading>
		<div v-else class="city_list">
				<div class="city_hot">
					<h2>热门城市</h2>
					<ul class="clearfix">
						<li v-for="city in hotcity" :key="city.cityId" @click="getCity(city.cityId,city.name)">
							{{city.name}}
						</li>
					</ul>
				</div>
					<mt-index-list>
						<mt-index-section :index="data.index" v-for="data in citieslist" :key="data.index">
								<div v-for="city in data.list" :key="city.cityId" @click="getCity(city.cityId,city.name)">
									<mt-cell :title="city.name"></mt-cell>
								</div>
							</mt-index-section>
					</mt-index-list>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'city',
		data() {
			return {
				citieslist: [],
				hotcity: [],
				isLoading:true
			}
		},
		mounted() {
			var cityList = window.localStorage.getItem("cityList");
			var hotcity = window.localStorage.getItem('hotcity');
			if(cityList && hotcity ){
				this.hotcity = JSON.parse(hotcity);
				this.citieslist = JSON.parse(cityList);
				this.isLoading = false;
			}
			else
			{
			this.axios({
				url: 'https://m.maizuo.com/gateway?k=9061035',
				headers: {
					'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1594690023749407368642561","bc":"310100"}',
					'X-Host': 'mall.film-ticket.city.list'
				}
			}).then(res => {
				var msg = res.data.msg;
				if (msg === "ok") {
					this.citieslist = this.set(res.data.data.cities);
					this.isLoading = false;
					for (var i = 0;i < res.data.data.cities.length;i++){
						if(res.data.data.cities[i].isHot == 1){
							this.hotcity.push({
								cityId: res.data.data.cities[i].cityId,
								name: res.data.data.cities[i].name
							})
						}
					}
					window.localStorage.setItem("hotcity",JSON.stringify(this.hotcity))
				}
			})
			}
		},
		methods: {
			set(list) {
				var letterArr = [];
				for (var i = 65; i < 91; i++) {
					letterArr.push(String.fromCharCode(i));
				}
				// console.log(letterArr)
				var newList = [];
				for (var j = 0; j < letterArr.length; j++) {
					var arr = list.filter(item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase())
					if (arr.length > 0) {
						newList.push({
							index: letterArr[j],
							list: arr
						})
						window.localStorage.setItem("cityList",JSON.stringify(newList));
					}
				}
				return newList;
			},
			getCity(cityId,name){
				this.$store.commit('city/CITY_INFO',{cityId,name});
				console.log(cityId,name);
				window.localStorage.setItem("cityId",cityId);
				window.localStorage.setItem("cityName",name);
				this.$router.push('/movie/nowplaying');
				
				 // window.location.reload() ;
			}
		}
	}
</script>

<style scoped>
	#content .city_body {
		margin-top: 20px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #FFF5F0;
	}

	.city_body .city_hot {
		margin-top: 20px;
	}

	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #F0F0F0;
		font-weight: normal;
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 25px;
		margin-top: 8px;
		margin-left: 3%;
		padding: 0 3px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 25px;
		text-align: center;
		box-sizing: border-box;
	}
</style>
