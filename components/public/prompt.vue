<template>
	<div class="prompt_div">
		<div class="check_box">
			<p class="prompt_title">{{HTitle}}<span class="btn_close" @click="btn_close">X</span></p>
			<p>请发送验证码到{{HPhone}}</p>
			<div>
				<input type="text" name="" v-model="checkCode" value="">
				<input type="button" value="发送验证码" @click="btn_sendCode" name="">
			</div>
			<p class="show_tips tl" v-show="show_tips">{{tips}}</p>
			<p class="btn_nextStep bdr3" @click="btn_nextStep">下一步</p>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'prompt',
		data(){
			return {
				tips: '验证码不能为空',
				checkCode:'',
				show_tips:false
			}
		},
		props:['HTitle','HPhone'],
		methods:{
			btn_sendCode:function(){
				this.$store.dispatch('get_code');
			},
			btn_nextStep:function(){
				if(this.checkCode != ''){
					this.show_tips = false;
					if(this.HTitle == "身份认证"){
						// 验证身份
					}else{
						//修改密码
					}
				}else{
					this.show_tips = true;
				}
			},
			btn_close:function(){
				this.show_tips = false;
				this.$parent.show_prompt = false;
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.prompt_div{
		position: fixed;
		width: 100%;
		max-width: 750px;
		height: 100%;
		background-color: rgba(0,0,0,.7);
		z-index: 99;
		top: 0;
		.check_box{
			background-color: #FFF;
			width: 7.2rem;
			height: 5.3333rem;
			box-sizing: border-box;
			padding: 0.5333rem;
			padding-top: 1.0667rem;
			margin: 0 auto;
			position: fixed;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    font-size: 0.3733rem;
		    border-radius: 0.0533rem;
			.prompt_title{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 1.0667rem;
				line-height: 1.0667rem;
				.btn_close{
					position:absolute;
					top: 0;
					right: 0;
					width: 0.6667rem;
					height: 0.6667rem;
					text-align: center;
					line-height: 0.6667rem;
					font-size: 0.4267rem;
				}
			}
			div{
				margin-top: 0.5333rem;
				input{
					height: 0.9333rem;
					line-height: 0.9333rem;
					border-radius: 0.08rem;
					border:1px solid #ebebeb;
					font-size: 0.32rem;
				}
				input[type=text]{
					padding: 0 0.2667rem;
					width: 2.6667rem;
				}
				input[type=button]{
					padding: 0 0.2667rem;
					color: #FFF;
					margin-left: 0.1333rem;
					background-color: #115991;
				}
			}
			.show_tips{
				margin-top:0.1333rem;
				text-indent: 0.2667rem;
				color:red;
			}
			.btn_nextStep{
				position: absolute;
				bottom: 0.2667rem;
				width: 5.6rem;
				margin: 0.2667rem;
				background-color: #115991;
				color: #FFF;
				padding: 0.16rem 0;
			}
		}
	}
</style>