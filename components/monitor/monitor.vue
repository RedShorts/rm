<template>
	<div class="monitor_div">
		<div style="position: relative;" id="monitor_data">
			<img src="../../assets/images/monitorBanner.jpg" alt="" style="width: 100%; height: auto;">
			<div class="jkdata_wrap" :jk_data="JKdata">
				<div class="calendar_wrap">
					<p>{{JKdata.day}}</p>
					<p>数据</p>
				</div>
				<div class="data_wrap">
					<div class="weixin_wrap">
						<div class="icon_wrap">
							<img src="../../assets/images/icon-wx.png" alt="" style="width: 100%; height: 100%;">
						</div>
						<p>{{JKdata.wxnum}}条</p>
						<p>微信</p>
					</div>
					<div class="weibo_wrap">
						<div class="icon_wrap">
							<img src="../../assets/images/icon-wb.png" alt="" style="width: 100%; height: 100%;">
						</div>
						<p>{{JKdata.wbnum}}条</p>
						<p>微博</p>
					</div>
					<div class="toutiao_wrap">
						<div class="icon_wrap">
							<img src="../../assets/images/icon-tt.png" alt="" style="width: 100%; height: 100%;">
						</div>
						<p>----</p>
						<p>头条</p>
					</div>
				</div>
			</div>
		</div>
		<div>
			<mt-navbar  :class="nowFixed?'isFixed':''">
				<mt-tab-item id="1" :class="active === 'Wx'?'nowActive':''" >微信</mt-tab-item>
				<mt-tab-item id="2" :class="active === 'Wb'?'nowActive':''" >微博</mt-tab-item>
				<mt-tab-item id="3" :class="active === 'Tt'?'nowActive':''" >头条</mt-tab-item>
			</mt-navbar>
	    </div>
	    <mt-tab-container v-model="active" swipeable>
			<mt-tab-container-item id="Wx">
				<keep-alive>
					<newpub-wx></newpub-wx>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="Wb">
				<keep-alive>
					<newpub-wb></newpub-wb>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="Tt">
				<keep-alive>
					<newpub-tt></newpub-tt>
				</keep-alive>
			</mt-tab-container-item>
	    </mt-tab-container>
		<backtop-com></backtop-com>
		 <alert-com :alertMsg="alertWord" v-show="alertWord != ''"></alert-com>
		<footer-com></footer-com>
	</div>
</template>
<script>
	import footer from '../footer/footer.vue'
	import backtop from '../public/backtop.vue'
	import newPubWx from '../index/newPubWx.vue'
	import newPubWb from '../index/newPubWb.vue'
	import newPubTt from '../index/newPubTt.vue'
	import alert from '../public/alert.vue'
	export default{
		name: 'monitor',
		data(){
			return {
				H: 0,
				nowFixed:false,
				active:'Wx',
				alertWord:'',
				scrollTop_wx:0,
                scrollTop_wb:0,
                scrollTop_tt:0,
			}
		},//
		beforeRouteEnter:function(to,from,next){
		    if(to.path == '/monitor'){
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
		components:{
		    "footer-com": footer,
		    "backtop-com": backtop,
		    "newpub-wx":newPubWx,
		    "newpub-wb":newPubWb,
		    "newpub-tt":newPubTt,
		    "alert-com": alert
		},
		methods:{
			scrollTop(){
		      var $scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		      if($scrollTop > this.H ){
		        this.nowFixed = true
		      } else{
		        this.nowFixed = false
		      }
		    },
		},
		mounted:function(){
			this.$store.dispatch('get_JKData'); // 监控数据
			this.$store.dispatch('get_JKList'); // 监控数据 - 微信
			this.$store.dispatch('get_JKListWb'); // 监控数据 - 微博
			window.onload = function(){
		      this.H = $('#monitor_data').height();
		    };
		    window.addEventListener('scroll', this.scrollTop)
		},
		computed:{
			JKdata(){
				var _RES = this.$store.state.monitor.JKDataList;
				var _res = {};
				if(JSON.stringify(localMethod.prototype.getObject("web_login")) == "{}"){
					_res = localMethod.prototype.getSessionObj("web_login");
				}else{
					_res = localMethod.prototype.getObject("web_login");
				}
				if(_res){
					var _RES = this.$store.state.monitor.JKDataList;
					if(_RES.code == 1){
						console.log('111')
						this.alertWord = '';
						var _res = {};
						if(JSON.stringify(localMethod.prototype.getObject("web_login")) == "{}"){
							_res = localMethod.prototype.getSessionObj("web_login");
						}else{
							_res = localMethod.prototype.getObject("web_login");
						}
					}else{
						console.log('222')
						// this.alertWord =  _RES.message;
						// var self=this;  
						// setTimeout(function(){
						// 	self.alertWord = '';
						// },3000);
						// setTimeout(function(){
						// 	localMethod.prototype.removeObject('web_login');
						// 	self.$router.push({ path: '/login' })
						// },4000);
					}
				}else{
					this.alertWord =  _res.message;
					var self=this;  
					setTimeout(function(){
						self.alertWord = '';
					},3000);
					setTimeout(function(){
						localMethod.prototype.removeObject('web_login');
						self.$router.push({ path: '/login' })
					},4000);
				}
				return this.$store.state.monitor.JKDataList;
			},
			
		},
		watch:{
			active(curVal,oldVal){
				this.$store.state._searchType = curVal;
				this.active = curVal;
				// tab切换时记住当前页面的scrolltop，下次切换回来时显示到浏览位置
                var s = 0, nowScrollTop = 0;
                if(curVal == "Wx"){
                    nowScrollTop = document.body.scrollTop;
                    this.scrollTop_wb = nowScrollTop;
                    s = this.scrollTop_wx;
                    document.body.scrollTop = s;
                }else if(curVal == "Wb"){
                        if(oldVal == 'Wx'){
                            nowScrollTop = document.body.scrollTop;
                            this.scrollTop_wx = nowScrollTop;
                        }else if(oldVal == 'Tt'){
                            nowScrollTop = document.body.scrollTop;
                            this.scrollTop_tt = nowScrollTop;
                        }
                        s = this.scrollTop_wb;  
                        document.body.scrollTop = s;
                }else if(curVal == "Tt"){
                    nowScrollTop = document.body.scrollTop;
                    this.scrollTop_wb = nowScrollTop;
                    s = this.scrollTop_tt;
                    document.body.scrollTop = s;
                }
				if(curVal == "Tt"){ // 头条目前没有内容所以先不请求
					return false;
				}else{
					//document.body.scrollTop=0;
					// this.$store.state._pageNow = 1;
					// this.$store.state._newPubType = curVal;
					// this.$store.dispatch('get_newPubList');
				}
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.mint-navbar .mint-tab-item{
	  padding: 0.2667rem 0 !important;
	}
	.jkdata_wrap{
		position: absolute; 
		top: 50%;
	  	left: 50%;
	  	transform: translate(-50%, -50%);
	  	-webkit-transform: translate(-50%, -50%);
	  	-moz-transform: translate(-50%, -50%);
	  	-ms-transform: translate(-50%, -50%);
		width: 8.0rem; 
		height: 4.0rem; 
		background-color: rgba(0,0,0,.5); 
		z-index: 1;
		color: #FFF;
		.calendar_wrap{
			background-image: url('../../assets/images/calendar.png');
			background-size: 100% 100%;
			width: 1.44rem;
    		height: 1.52rem;
    		position: absolute;
    		right: 0.2667rem;
    		top: 1.24rem;
    		padding-top: 0.32rem;
    		box-sizing: border-box;
		}
		.data_wrap{
			padding-left: 0.2667rem;
			padding-top: 0.45rem;
			.weixin_wrap, .weibo_wrap, .toutiao_wrap{
				width: 2.2333rem;
				height: 1.0933rem;
				position: relative;
				text-indent: 0.6rem;
			}
			.weibo_wrap{
				margin-left: 1rem;
			}
			.toutiao_wrap{
				margin-left:2rem;
			}
			.icon_wrap{
				width: 0.8267rem;
				height: 0.8267rem;
				position: absolute;
			}
		}
	}
</style>