<template>
  <div id="app">
  	<keep-alive>
    	<router-view/>
  	</keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import "./assets/css/public.css";
  @import "../static/style.css";
</style>
