<template>
	<div class="loading_div">
		<div class="loading_inner_div" v-if="loadingShow">
			<mt-spinner :type="1"  color="rgb(38, 162, 255)" class="loading_spin"></mt-spinner>
		</div>
	</div>
</template>
<script>
	export default{
		name:'loading',
		data(){
			return {
				
			}
		},
		props:['loadingShow']
	}
</script>
<style rel="stylesheet" lang="scss" scoped>
	.loading_inner_div{
	    background-color: rgba(0,0,0,.5);
	    height: 100%;
	    position: fixed;
	    top: 0;
	    width: 100%;
	    max-width:750px;
	    z-index: 99;
		.loading_spin{
			position: absolute;
			top: 50%;
			z-index: 1;
		}
	}
</style>

