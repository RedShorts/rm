<template>
	<div :bindDate="forDate">
		<p class="endtime_p ">内容展示{{getDataTime}}以前的数据（含阅读数和点赞数)</p>
	</div>
</template>
<script>
	export default{
		name: 'endtime',
		data(){
			return {
				getDataTime:''
			}
		},
		computed:{
			forDate(){
				var _res = this.$store.state.timeNodeList;
                if(_res== undefined){
                    return false
                }else{
                    if(_res.code == 1){
                        this.getDataTime = _res.node;
                    }
                }
                return this.$store.state.timeNodeList;
			}
		},
		created:function(){
			this.$store.dispatch('get_timeNode'); // 数据抓取节点，
		}
	}
</script>