<template>
	<div class="newPubTt_div">
		<endtime-com></endtime-com>
		<p style="padding: 25px 0 20px 0;">功能开发中，等待...</p>
	</div>
</template>
<script>
	import endtime from './endtime.vue'
	export default{
		name: 'newPubTt',
		data(){
			return {

			}
		},
		components:{
			"endtime-com": endtime
		},
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import '../../assets/css/index.scss';
</style>