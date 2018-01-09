<template>
	<div class="footer_div">
		<ul>
			<router-link to="/index" tag="li"  class="footer_li">
				<p class="icon-home"></p>
				<p>首页</p>
			</router-link>
			<router-link to="/monitor" tag="li"  class="footer_li">
				<p class="icon-calendar"></p>
				<p>监控</p>
			</router-link>
			<router-link to="/ranking" tag="li"  class="footer_li">
				<p class="icon-bin"></p>
				<p>排行</p>
			</router-link>
			<router-link to="/mine" tag="li"  class="footer_li">
				<p class="icon-mine"></p>
				<p>我的</p>
			</router-link>
		</ul>
	</div>
</template>
<script>
	export default{
		name: 'footer',
		data(){
			return {}
		}
	}

</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
	.footer_div{
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 750px;
		padding-bottom: 0.1333rem;
		background-color: #FFF;
		ul{
			overflow: hidden;
			.footer_li{
				float: left;
				width: 25%;
				color: #494949;
				p:nth-child(1){
					height: 0.6667rem;
					line-height: 0.6667rem !important;
					font-size: 0.3733rem;
				}
				p:nth-child(2){
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: 0.32rem;
				}
			}
		}
	}
</style>