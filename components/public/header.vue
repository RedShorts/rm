<template>
	<div class="header_div">
		<p class="icon-backWeight" @click="goback"></p>登录
	</div>
</template>
<script>
	export default{
		name: 'header',
		data(){
			return {

			}
		},
		methods:{
			goback:function(){
				var l = window.localStorage['login'];
				//如果 没有登录信息， 登录页后退按钮回到首页，因为有一种情况是，当退出账号后，按钮后退又会返回到个人中心。所以验证一下后退按钮，但是这种情况只适用于登录页的后退按钮
		    	if(l){
					this.$router.go(-1);
		    	}else{
		    		this.$router.push({ path: '/index' })
		    	}
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.header_div{
		width: 100%;
		max-width: 750px;
		height: 0.9333rem;
		line-height: 0.9333rem;
		position: fixed;
		top:0;
		font-size: 0.4rem;
		background-color: rgba(19,37,90,.9);
		z-index: 1;
		color:#FFF;
	}
</style>