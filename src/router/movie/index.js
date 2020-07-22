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
			path:'/movie',
			component:()=>import("@/components/Nowplaying")
		}
	]
}