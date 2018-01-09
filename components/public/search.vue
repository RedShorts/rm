<template>
	<div class="search_div">
		<div class="newPub_search" >
			<input type="text" name="" class="bdr3 tl" v-model="searVal" placeholder="请输入文章标题" >
			<input type="button" value="搜 索" class="bdr3  tc" @click="btn_search" name="">
			<input type="button" value="取 消" class="bdr3  tc" @click="btn_back" name="">
		</div>
		<newpub-wx v-if="sType == 'Wx'"  :keywordsWx="searVal" :allLoaded_wx = "stopLoad"></newpub-wx>
		<newpub-wb v-if="sType == 'Wb'" :keywordsWb="searVal" :allLoaded_wb = "stopLoad"></newpub-wb>
		<newpub-tt v-if="sType == 'Tt'"></newpub-tt>
		<!-- <div class="default_tips">
			默认显示头条
		</div> -->
		<alert-com :alertMsg="alertWord" v-show="alertWord != ''" ></alert-com>
	</div>
</template>
<script>
	import newPubWx from '../index/newPubWx.vue'
	import newPubWb from '../index/newPubWb.vue'
	import newPubTt from '../index/newPubTt.vue'
	import alert from '../public/alert.vue'
	export default{
		name: 'search',
		data(){
			return {
				searVal: '',
				sType: '',
				alertWord:'',
				stopLoad:true,
				//dispatchType: ''
			}
		},
		components:{
			"newpub-wx": newPubWx,
			"newpub-wb": newPubWb,
			"newpub-tt": newPubTt,
			"alert-com": alert
		},
		beforeRouteEnter:function(to,from,next){
			next(function(vm){
				if(from.path == '/index'){// 判断上一页路由来源， 如果为首页，设置当前要请求首页的接口， 如果为监控，...
					vm.$store.state._dispatchType = 'index';
					//vm.dispatchType = 'index';
				}else if(from.path == '/monitor'){
					//vm.dispatchType = 'monitor';
					vm.$store.state._dispatchType = 'monitor';
				}
			});
		},
		computed:{
			
		},
		methods:{
			btn_search:function(){
				if(this.searVal == ''){
					this.alertWord =  '请输入关键字';
					var self=this;  
					setTimeout(function(){
						self.alertWord = '';
					},3000);
					return false;
				}else{
					if(this.$store.state._dispatchType == 'index'){// 通过判断 当前请求接口的类型来确定下一步操作
						this.$store.state.index._pageNow_wx = 1;
						this.$store.state.index._pageNow_wb = 1;
						this.$store.state.index.newPubList = [];
						this.$store.state.index.newPubListWb = [];
						this.$store.state.index._newPubKeywords = this.searVal;
						// 当前搜索类型 微信/微博 / 头条
						var Type = this.$store.state._searchType;
						this.sType = Type;
						if(Type == 'Wx'){
							this.$store.dispatch('get_newPubList');
						}else if(Type == 'Wb'){
							this.$store.dispatch('get_newPubListWb');
						}else if(Type == 'Tt'){
							console.log('tt  keywords search')
						}
					}else if(this.$store.state._dispatchType == 'monitor'){
						console.log('monoitor')
					}
				}
			},
			btn_back:function(){
				this.searVal = '';
				this.sType = ''; // 每次取消清空查询类型，
				this.$store.state.index._newPubKeywords = '';
				// 上面关键字查询的时候把列表都清空了，再次返回的时候重新请求填充列表
				this.$store.dispatch('get_newPubList');
            	this.$store.dispatch('get_newPubListWb');
				this.$router.go(-1);
			}
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import '../../assets/css/index.scss';
	.newPub_search{
		background-color: #0b5d9c ;
		height: 1.0667rem;
		line-height: 1.0667rem;
		overflow: hidden;
		input{
			height: 0.8rem;
			line-height: 0.8rem;
		}
		input[type=text]{
			padding: 0 0.2667rem;
		}
		input[type=button]{
			padding: 0 0.1333rem;
			font-size: 0.32rem;
		}
	}
</style>