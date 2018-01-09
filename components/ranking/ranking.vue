<template>
	<div class="ranking_div">
		ranking
		<backtop-com></backtop-com>
		<footer-com></footer-com>
	</div>
</template>
<script>
	import footer from '../footer/footer.vue'
	import backtop from '../public/backtop.vue'
	export default{
		name: 'ranking',
		data(){
			return {

			}
		},
		components:{
		    "footer-com": footer,
		    "backtop-com": backtop
		},
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
</style>