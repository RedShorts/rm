<template>
	<div class="alert_div">
		<div class="alert_wrap bdr3">
			<p>{{alertMsg}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'alert',
		data(){
			return {

			}
		},
		props:['alertMsg']
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.alert_div{
		background-color: rgba(255,255,255,0);
		width: 100%;
		height: 100%;
		max-width: 750px;
		position: fixed;
		top: 0;
		z-index: 3;
		.alert_wrap{
			padding: 0.1333rem 0.4rem;
			background-color: rgba(0,0,0,.8);
			text-align: center;
			height: 1.0667rem;
			line-height: 1.0667rem;
			color: #FFF;
			width: 70%;
			margin: 0 auto;
			position:fixed;
			top: 50%;
		  	left: 50%;
		  	transform: translate(-50%, -50%);
		}
	}
</style>