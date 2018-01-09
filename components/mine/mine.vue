<template>
	<div class="mine_div">
		<div class="img_div_wrap"><!-- :login_data="loginData"-->
			<div class="img_div">
				<img src="https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-11-01/96a03af62f8fd5e5c81e648b11607538.jpg" alt="" style="width: 100%; height: 100%;">
			</div>
		</div>
		<div class="userInfo_list tl">
			<p>基本信息</p>
			<ul>
			    <li>单位：{{userInfo.jcy_name}}</li>
			    <li>职务：{{userInfo.zhiwu}}</li>
			    <li>科室：{{userInfo.keshi}}</li>
			</ul>
		</div>
		<div class="userInfo_list tl">
			<p>账号信息</p>
			<ul>
			    <li>账号：{{userInfo.name}}</li>
			    <li>手机：{{userInfo.phone}}
			    	<p class="btn_change" @click="change_phone">修改</p>
			    </li>
			    <li>密码：******
					<p class="btn_change" @click="change_psw">修改</p>
			    </li>
			</ul>
		</div>
		<p class="loginOut_p " :loginOut_data="loginOutData">
			<input type="button" class="bdr3" name="" value="退出" @click="loginOut">
		</p>
		<footer-com></footer-com>
		<prompt-com :HTitle="tit" :HPhone="userInfo.phone" v-show="show_prompt"></prompt-com>
	</div>
</template>
<script>
	import footer from '../footer/footer.vue'
	import prompt from '../public/prompt.vue'
	export default{
		name:'mine',
		data(){
			return{
				userInfo:{},
				tit:'',
				show_prompt:false
			}
		},
		beforeRouteEnter:function(to,from,next){
		    if(to.path == '/mine'){
		    	var l = window.localStorage['web_login'] || window.sessionStorage['web_login'];
		    	if(l){
		    		next()
		    	}else{
		    		next({
		    			path: '/login'
		    		})
		    	}
		    }
		},
		components: {
			"footer-com":footer,
			"prompt-com":prompt
		},
		methods: {
			change_phone:function(){
				this.tit = "身份认证";
				this.show_prompt = true;
			},
			change_psw:function(){
				this.tit = "修改密码";
				this.show_prompt = true;
			},
			loginOut:function(){
				this.$store.dispatch("get_loginOut");
			}
		},
		created:function(){
			var loginInfo = {};
			if(JSON.stringify(localMethod.prototype.getObject("web_login")) == "{}"){
					loginInfo = localMethod.prototype.getSessionObj("web_login");
				}else{
					loginInfo = localMethod.prototype.getObject("web_login");
				}
			this.userInfo = loginInfo;
		},
		computed:{
			loginOutData(){
				var _res = this.$store.state.mine.loginOutList;
				if(_res.code == 1 || _res.code == 1005 ){
					localMethod.prototype.removeObject('web_login');
					localMethod.prototype.removeSessObject('web_login');
					this.$router.push({ path: '/login' })
				}else{
					
				}
				return this.$store.state.mine.loginOutList;
			}
		}
	}
</script>
<style scoped rel="stylesheet" lang="scss">
	@import "../../assets/css/index.scss";
	.mine_div{
		.img_div_wrap{
			width: 100%;
			height: 2.6667rem;
			background-color: #0b5d9c;
			position: relative;
			.img_div{
				width: 1.3333rem;
				height: 1.3333rem;
				border-radius: 0.08rem;
				position:absolute;
				bottom: 0.4rem;
				left: 0.4rem;
				
			}
		}
		.userInfo_list{
			margin: 0 0.2667rem;
			margin-top: 0.2133rem;
			& p{
				font-size:0.4267rem;
				color: #333; 
			}
			& li{
				color: #7d7e80;
				position:relative;
				font-size: 0.32rem;
				.btn_change{
					position: absolute;
					right: 0px;
					top: 0.2rem;
					color: #FFF;
					padding: 0.0267rem 0.2133rem;
					height: 0.5333rem;
					font-size: 0.32rem;
					line-height: 0.5333rem;
					border-radius: 3px;
					background-color: #337ab7;
				}
			}
			& p, & li{
				height: 1.0667rem;
				line-height: 1.0667rem;
				border-bottom: 1px solid #ececec;
			}
		}
		.loginOut_p input{
			background-color: #0b5d9c;
			color: #FFF;
		    padding: 0.1333rem 0.6667rem;
		    margin-top: 1.3333rem;
		}
	}
</style>