const state = {
	name :window.localStorage.getItem("cityName") || '北京',
	cityId : window.localStorage.getItem("cityId")||'110100'
};

const actions = {
	
};
const mutations = {
	CITY_INFO(state,payload){
		state.cityId = payload.cityId;
		state.name = payload.name;
	}
};
export default{
	namespaced : true,
	state,
	actions,
	mutations
}