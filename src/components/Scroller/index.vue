<template>
	<div class="contain" ref="contain">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'Scroller',
		props:{
			handleToScroll:{
				type:Function,
				default:function(){}
			},
			handelToTouchEnd:{
				type:Function,
				default:function(){}
			}
		},
		mounted() {
			var scroll = new BScroll(this.$refs.contain, {
					tap: true,
					probeType: 1
				});
				scroll.on('scroll', (pos) => {
					this.handleToScroll(pos);
					});
				scroll.on('scroll', (pos) => {
					this.handelToTouchEnd(pos);
					});
		}
	}
</script>

<style scoped>
	.contain{height: 100%; overflow: hidden;}
</style>
