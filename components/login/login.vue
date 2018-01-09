<template>
	<div class="login_div">
		<header-com></header-com>
		<div class="logo_div" :login_data="loginData">
			<p><img src="../../assets/images/jianhui.png" alt="" style="margin: 0 auto;"></p>
			<h3>检察新媒体大数据云平台</h3>
			<div class="login_box">
				<mt-field label="账号" class="tl" placeholder="请输入账号" type="text" v-model="login_username"></mt-field>
				<mt-field label="密码" class="tl" placeholder="请输入密码" type="password" v-model="login_password" ></mt-field>
				<div class="psw_Area_div">
					<p class="psw_rem_p tl" @click="btn_rem_psw">
						<span class="checkboxwrap bdr3">
							<span class="icon-checkmark" v-show="checkmark"></span>&nbsp;&nbsp;
						</span>
						<span>记住密码</span>
					</p>
					<p class="psw_for_p tr"><input type="checkbox" name="" value="啦啦">忘记密码</p>
				</div>
				<mt-button type="default" :class="!btn_login_disabled?'btn_login':''" :disabled="btn_login_disabled"  @click="btn_login">登录</mt-button>
			</div>
		</div>
		<div class="Copyright_div">
			<p>正义创新</p>
			<p>Copyright 2015 Justice Creative Inc. All Rights Reserved. </p>
			<p>京ICP备 15003481号-1</p>
		</div>
		<alert-com :alertMsg="alertWord" v-show="alertWord != ''"></alert-com>
	</div>
</template>
<script>
	import header from '../public/header.vue'
	import alert from '../public/alert.vue'
	export default{
		name: 'login',
		data(){
			return {
				login_username:'',
				login_password:'',
				btn_login_disabled:true,
				checkmark:false,
				alertWord: '',
				userInfo:{}
			}
		},
		components:{
			"header-com":header,
			"alert-com": alert
		},
		watch:{// 监听username，psw 的值的变化，如果有输入，则登录按钮可用，反之
			login_username(oldVal,newVal){
				if(this.login_password != '' && oldVal != ''){
					this.btn_login_disabled = false;	
				}else{
					this.btn_login_disabled = true;	
				}
			},
			login_password(oldVal,newVal){
				if(this.login_username != '' && oldVal != ''){
					this.btn_login_disabled = false;	
				}else{
					this.btn_login_disabled = true;	
				}
			}
		},
		created:function(){
			var _loginInfo = {};
			if(JSON.stringify(localMethod.prototype.getObject("web_login"))){
				_loginInfo = localMethod.prototype.getSessionObj("web_login");
			}else{
				_loginInfo = localMethod.prototype.getObject("web_login");
			}
			if(_loginInfo.remPsw == 1){
				this.checkmark = true;
				this.login_username = _loginInfo.uname;
				this.login_password = _loginInfo.pwd.substr(0, 11)
			}else{
				this.checkmark = false;
				this.login_username = '';
				this.login_password = '';
			}
		},
		methods:{
			btn_login:function(){
				var _loginInfo = localMethod.prototype.getObject("web_login");
				var loginInfo = {};
				loginInfo._uname = this.login_username;
				if(_loginInfo.remPsw == 1){ // 登录时先判断是否有本地存
					loginInfo._psw = _loginInfo.pwd; // 如果有，直接拿本地存的去提交
				}else{
					// 如果没有，拿到输入框的加密去提交
					loginInfo._psw = hex_sha1(this.login_password); 
				}
				if(this.checkmark){// 是否记住密码
					loginInfo._remPsw = 1;//1:记住密码
					localMethod.prototype.setObject('web_login',loginInfo)
				}else{
					loginInfo._remPsw = 0;
					localMethod.prototype.setSessionObj('web_login',loginInfo)
				}
				this.$store.state.login.formState = loginInfo;
				this.$store.dispatch('get_login');
			},
			btn_rem_psw:function(){
				var _che = this.checkmark;
				if(_che){
					this.checkmark = false;
				}else{
					this.checkmark = true;
				}
			}
		},
		computed:{
			loginData(){
				var _res = this.$store.state.login.loginList;
				if(JSON.stringify(_res) != "{}"){
					if(_res.code == 1){
						this.$router.push({ path: '/mine' })
					}else{
						this.alertWord = _res.message;
					}
				}
				return this.$store.state.login.loginList;
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.login_div{
		background-color: #13255A;
		width: 100%;
		height: 100%;
		max-width: 750px;
		position:fixed;
		.logo_div{
			margin-top: 20%;
		}
		h3{
			font-size: 0.48rem;
			color:#FFF;
			font-weight: 100;
		}
		.login_box{
			margin: 0 10%;
			margin-top: 10%;
			border-radius: 0.08rem;
			& *{
				font-size: 0.3733rem;
			}
			.form-group{
				margin: 0.1333rem;
				input{
					padding: 0.08rem 0.1333rem;
					border-radius:0.0533rem;
				}
			}
			button{
				width: 100%;
				margin-top: 5%;
			}
			.btn_login{
				background-color: #13255A;
			}
		}
		.psw_Area_div{
			height: 35px;
			position: relative;
			p{
				position:absolute;
				height: 0.5333rem;
				top: 0.2rem;
				width:2.6667rem;
				color: #FFF;
			}
			.psw_rem_p{
				left: 0.1333rem;
				padding-left: 0.6933rem;
				.checkboxwrap{
					position:absolute;
					width: 0.4rem;
				    height: 0.4rem;
				    border: 1px solid;
					left: 0;
					top: 0.04rem;
					.icon-checkmark{
						position: absolute;
						top: 0px;
						left: 0;
						width: 0.4533rem;
				   		height: 0.4533rem;
					    display: inline-block;
					    text-align: center;
					    line-height: 0.4533rem !important;
					}
				}
			}
			.psw_for_p{
				right: 0;
			}
		}
	}
</style>