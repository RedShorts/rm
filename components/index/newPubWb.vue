<template>
	<div class="newPubWb_div">
		<endtime-com></endtime-com>
		<mt-loadmore :class="loadFinish?'hasPadding':''" :bottom-method="wbLoadMore" :bottom-all-loaded="loadFinish" 
			:bottomDropText="loadFinishText" :auto-fill="false"  ref="bottom"  :bottomDistance=40 
			@bottom-status-change="handleBottomChange_Wb">
			<ul>
				<li class="list_li" v-for="(item,index) in wblist">
					<a :href="item.link|httpFilter" target="_blank">
						<div class="tl wb_content_div">
							<span v-html="highlight(item.content,keywordsWb)"></span>
							<span style="color:#32689A; font-size: 0.32rem;">【查看原文】</span>
						</div>
						<p class="tl wb_approve_p">
							<span><mark class="icon-good"></mark>&nbsp;{{item.approve_count}}</span>&nbsp;&nbsp;&nbsp;
							<span><mark class="icon-good"></mark>&nbsp;{{item.commtcount}}</span>
						</p>
						<p class="tl wb_time_name_p ">
							<span style="float: left;">{{item.wb_name}}</span>
							<span style="float: right;">{{item.time|date_filter}}</span>
						</p>
					</a>
				</li>
			</ul>
			<div slot="bottom" class="mint-loadmore-bottom">
		      	<p v-show="bottomStatus !== 'drop'" >{{loadFinishText}}</p>
			    <p v-show="bottomStatus === 'drop'">
					<span :class="{'rotate': bottomStatus === 'drop' }">↑</span>
			      	<span>Loading...</span>
			    </p>
		    </div>
		</mt-loadmore>
	</div>
</template>
<script>
	import endtime from './endtime.vue'
	export default{
		name:'newPubWb',
		data(){
			return {
				loadFinish:false,
				loadFinishText:'默认显示100条。',
				bottomStatus: ''
			}
		},
		components:{
			"endtime-com": endtime
		},
		props:[
			'keywordsWb',
			'allLoaded_wb'
		],
		methods:{
		    //上拉加载更多
		    wbLoadMore(id){
		    	if(this.$route.path == '/index'){ 
			      	if(this.$store.state.index._pageNow_wb<=5){
			      	 	this.$store.state.index._pageNow_wb ++;
			      		if(this.$store.state.index._pageNow_wb>5){
			      			this.loadFinish = true;
			      			return false;
			      		}
			      	}
		      		this.$store.dispatch('get_newPubListWb');	
		    	}else if(this.$route.path == '/monitor'){
		    		if(this.$store.state.monitor._pageNow_JKWB<=3){
			      		this.$store.state.monitor._pageNow_JKWB ++;
			      		if(this.$store.state.monitor._pageNow_JKWB>3){
			      			this.loadFinish = true;
			      			return false;
			      		}
			      	}
		  			this.$store.dispatch('get_JKListWb');
		    	}
		      	//必须有的代码，请求完之后重置当前结构
		      	this.$refs.bottom.onBottomLoaded(id); 
		    },
		    handleBottomChange_Wb(status){
				//必须有的代码。，上下拉释放的状态
		    	this.bottomStatus = status;
				if(status !== 'drop'){
					if(this.$route.path == '/index'){ 
	      				this.loadFinishText = "默认显示结果100条，若需要更精确的搜索结果，请联系客服：010-53109796。"
	      			}else if(this.$route.path == '/monitor'){
	      				this.loadFinishText = "默认显示结果60条，若需要更精确的搜索结果，请联系客服：010-53109796。"
	      			}
	      		}else{
	      			this.loadFinishText = "Loading... "
	      		}
			}
		},
		computed:{
		  	wblist(){
		  		if(this.$route.path == '/index'){
		  			return this.$store.state.index.newPubListWb;
		  		}else if(this.$route.path == '/monitor'){
		  			return this.$store.state.monitor.JKListWb;
		  		}
		  	}
		},
		mounted:function(){
			this.$store.dispatch('get_newPubListWb');
		}
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.newPubWb_div{
		padding-bottom: 1.2rem;
	}
	.list_li{
		/* height: 1.3333rem; */
		box-sizing: border-box;
		padding: 0.16rem 0;
		margin: 0 0.16rem;
    	border-bottom: 1px solid #E6E6E6;
		.wb_content_div{
			word-wrap: break-word;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    -webkit-box-orient: vertical;
		    -moz-box-orient: vertical;
		    display: -webkit-box;
		    
		}
		& p{
			height: 0.5333rem;
			line-height: 0.5333rem;
			overflow: hidden;
			color: #7d7e80;	
		}
		.wb_approve_p{
			padding-top: 0.08rem;
		}
		.wb_time_name_p{

		}
	}
	
</style>