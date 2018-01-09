<template>
	<div class="newPubWx_div">
		<endtime-com></endtime-com>
		<mt-loadmore :class="loadFinish?'hasPadding':''" :bottom-method="wxLoadMore" :bottom-all-loaded="loadFinish" 
			:bottomDropText="loadFinishText" :auto-fill="false"  ref="bottom"  :bottomDistance=40
			@bottom-status-change="handleBottomChange_wx">
			<ul class="newPubWx_ul">
				<li class="list_li" v-for="(item,index) in wxlist">
					<a :href="item.link" target="_blank">
						<div class="coverImg_div">
							<img v-lazy="item.coverpic" alt="" style="width: 100%; height: 100%;">
						</div>
						<div class="content_div">
							<p class="tl title_p" v-html="highlight(item.title,keywordsWx)"></p>
							<p class="tl desc_p">{{ item.summary|trim_filter }}</p>
							<p class="tl read_point_p">
								<span class="read_span">
									<mark class="icon-eye"></mark>&nbsp;
									{{item.read_num}}
								</span>&nbsp;&nbsp;&nbsp;
								<span>
									<mark class="icon-good"></mark>&nbsp;
									{{item.point_num}}
								</span>
							</p>
							<p class="tl source_time_p">
								<span>{{item.wx_name}}</span>
								<span>{{item.time|date_filter}}</span>
							</p>
						</div>
					</a>
				</li>
			</ul>
			<div slot="bottom" class="mint-loadmore-bottom">
		      <p v-show="bottomStatus !== 'drop'" >{{loadFinishText}}</p>
		      <p v-show="bottomStatus === 'drop'">
				<span :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
		      	<span>Loading...</span>
		      </p>
		    </div>
		</mt-loadmore>
		<loading-com :loadingShow="show_hide"></loading-com>
	</div>
</template>
<script>
	import loading from '../public/loading.vue'
	import endtime from './endtime.vue'
	export default{
		name:'newPubWx',
		data(){
			return {
				loadFinish:false, // true: 已加载到最底部， 默认为false，
				loadFinishText:'默认显示100条。',
				_show_hide:false,
				bottomStatus:'',
				eve:''
			}
		},
		components:{
			"loading-com":loading,
			"endtime-com": endtime
		},
		props:[
			'keywordsWx',
			'allLoaded_wx',
			
		],
		methods:{
		    //上拉加载更多
		    wxLoadMore(id){
		    	// 先判断当前是哪个路由，来确定请求哪个接口，首页的还是监控的。，
		    	// 当开始请求接口之后，判断当前页码，确认权限
		      	if(this.$route.path == '/index'){ 
			      	if(this.$store.state.index._pageNow_wx<=5){
			      		this.$store.state.index._pageNow_wx ++;
			      		if(this.$store.state.index._pageNow_wx>5){
			      			this.loadFinish = true;
			      			return false;
			      		}
			      	}
		      		this.$store.dispatch('get_newPubList');
		  		}else if(this.$route.path == '/monitor'){
		  			if(this.$store.state.monitor._pageNow_JKWX<=3){
			      		this.$store.state.monitor._pageNow_JKWX ++;
			      		if(this.$store.state.monitor._pageNow_JKWX>3){
			      			this.loadFinish = true;
			      			return false;
			      		}
			      	}
		  			this.$store.dispatch('get_JKList');
		  		}else if(this.$route.path == '/search'){

		  		}
		      	this.$refs.bottom.onBottomLoaded(id);
		    },
	      	handleBottomChange_wx(status){
	      		if(status !== 'drop'){
	      			if(this.$route.path == '/index'){ 
	      				this.loadFinishText = "默认显示结果100条，若需要更精确的搜索结果，请联系客服：010-53109796。"
	      			}else if(this.$route.path == '/monitor'){
	      				this.loadFinishText = "默认显示结果60条，若需要更精确的搜索结果，请联系客服：010-53109796。"
	      			}
	      		}else{
	      			this.loadFinishText = "Loading... "
	      		}
			},
		},
		computed:{
		  	wxlist(){
				if(this.$route.path == '/index'){
		  			return this.$store.state.index.newPubList;
		  		}else if(this.$route.path == '/monitor'){
		  			return this.$store.state.monitor.JKList;
		  		}else if(this.$route.path == '/search'){
		  			if(this.$store.state._dispatchType == 'index'){
		  				return this.$store.state.index.newPubList;
		  			}else if(this.$store.state._dispatchType == 'monitor'){
		  				return this.$store.state.monitor.JKList;
		  			}
		  		}
		  	},
		  	show_hide(){
		  		this._show_hide = this.$store.state.index.Ajaxing;
		  		return this.$store.state.index.Ajaxing;
		  	}
		},
		created:function(){
		  	this.$store.dispatch('get_newPubList');
		  }
		}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import '../../assets/css/index.scss';
	.newPubWx_div{
		padding-bottom: 1.2rem;
	}
	.list_li{
		position: relative;
		overflow: hidden;
		height: 2.72rem;
		padding-left:3.52rem; 
		box-sizing: border-box;
		margin: 0 0.16rem;
    	border-bottom: 1px solid #E6E6E6;
		.coverImg_div{
			position: absolute;
			left: 0;
			top: 0;
			width: 3.2rem;
			height: 2.4rem;
			padding:0.16rem 0;
		}
		.content_div{
			position:relative;
			padding: 0.16rem 0;
			height: 2.4rem;
			padding-right: 0.16rem;
			p{
				word-wrap: break-word;
			    text-overflow: ellipsis;
			    overflow: hidden;
			    -webkit-box-orient: vertical;
			    -moz-box-orient: vertical;
			    display: -webkit-box;
			}
			.title_p{
			    -webkit-line-clamp: 1;
			    -moz-line-clamp: 1;
				font-size: 0.3733rem;
				height: 0.5333rem;
				line-height: 0.5333rem;
				color: #333;
			}
			.desc_p{
				/* margin-top: 0.1333rem; */
				-webkit-line-clamp: 2;
			    -moz-line-clamp: 2;
				font-size:0.32rem;
				color: #7d7e80;	
			}
			.read_point_p{
				font-size:0.32rem;
				color: #7d7e80;	
				padding-top: 0.0533rem;
				span{
					display: inline-block;
					height: 0.5333rem;
					mark{
						display: inline-block;
						line-height: 0.5333rem !important;
						color:#7d7e80 !important;
					}
				}
			}
			.source_time_p{
				overflow: hidden;
				height: 0.5333rem;
				line-height: 0.5333rem;
				font-size:0.32rem;
				color: #7d7e80;	
				position: absolute;
				bottom:0.1rem;
				width: 100%;
				span{
					position: absolute;
					bottom:0;
				}	
				& span:first-child{
					left:0;
				}
				& span:last-child{
					right:0.16rem;
				}	
			}
		}
	}
</style>