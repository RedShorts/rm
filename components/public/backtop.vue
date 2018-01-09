<template>
	<div class="backtop_div">
		<p @click="toTop">Top</p>
	</div>
</template>
<script>
	export default{
		name: 'backtop',
		data(){
			return {

			}
		},
		methods:{
			toTop:function(){
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.backtop_div{
		position: fixed;
		width: 1.3333rem;
		height: 1.3333rem;
		line-height: 1.3333rem;
		text-align: center;
		background-color: rgba(40,132,199,.7);
		right: 0.1333rem;
		color: #FFF;
		bottom: 1.6rem;
		z-index: 2;
	}
</style>