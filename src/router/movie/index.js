export default{
	path:'/movie',
	component:()=> import('@/views/Movie'),
	children:[
		{
			path:'city',
			component:()=>import("@/components/City")
		},
		{
			path:'search',
			component:()=>import("@/components/Search")
		},
		{
			path:'comingsoon',
			component:()=>import("@/components/Comingsoon")
		},
		{
			path:'nowplaying',
			component:()=>import("@/components/Nowplaying")
		},
		{
			path:'detail/1/:MovieId',
			components:{
				default:()=>import('@/components/Nowplaying'),
				detail:()=>import("@/views/Movie/detail")
			},
			props:{
				detail:true
			}
		},
		{
			path:'detail/2/:MovieId',
			components:{
				default:()=>import('@/components/Comingsoon'),
				detail:()=>import("@/views/Movie/detail")
			},
			props:{
				detail:true
			}
		},
		{
			path:'/movie',
			component:()=>import("@/components/Nowplaying")
		}
	]
}