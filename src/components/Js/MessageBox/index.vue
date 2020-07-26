<template>
	<div class="messagebox">
		<h2>{{title}}</h2>
		<p>{{content}}</p>
		<div>
			<div @touchstart="handleCancel">{{cancel}}</div>
			<div @touchstart="handleOk">{{ok}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'messageBox'
	}
</script>

<style scoped>
	.messagebox{
		width: 198px;
		height: 118px;
		border: 1px burlywood solid;
		border-radius: 4px;
		background-color: wheat;
		box-shadow: 3px 3px 3px 3px #ccc;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -58px 0 0 -98px ;
		z-index: 999;
	}
	.messagebox h2{
		text-align: center;
		line-height: 40px;
		font-size: 18px;
	}
	.messagebox p{
		text-align: center;
		line-height: 40px;
	}
	.messagebox >div{
		display: flex;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px #ccc solid;
	}
	.messagebox>div div{
		flex:1;
		text-align: center;
		line-height: 30px;
		border-right: 1px #ccc solid;	
	}
	.messagebox>div div:last-child{
		border: none;
	}
</style>
