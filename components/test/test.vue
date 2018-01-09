<template>
	<div>
		{{ttt}}
	</div>
</template>
<script>
	export default{
		name: 'test',
		data(){
			return {

			}
		},
		created(){
			console.log(this.$store.state.test1.user_name)
			this.$store.dispatch('get_timeNode'); 
		},
		computed:{
			ttt(){
				return this.$store.state.timeNodeList
			}
		}
	}
</script>