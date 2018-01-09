<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>
				<img src="../../assets/images/newPubBanner.jpg" alt="" style="width: 100%; height: auto;">
			</swiper-slide>
			<swiper-slide>
				<img src="../../assets/images/rankBanner.jpg" alt="" style="width: 100%; height: auto;">
			</swiper-slide>
			<swiper-slide>
				<img src="../../assets/images/monitorBanner.jpg" alt="" style="width: 100%; height: auto;">
			</swiper-slide>
			<swiper-slide>
				<img src="../../assets/images/evaluateBanner.jpg" alt="" style="width: 100%; height: auto;">
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>

	</div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
  	name: 'carrousel',
  	data() {
  		return {
  			swiperOption: {
  				autoplay:3000,
          loop:true,
  				pagination: '.swiper-pagination',
  				direction: 'horizontal',
  				slidesPerView: 1,
  				paginationClickable: true,
  				mousewheelControl: true,
  				autoplayDisableOnInteraction:false
  			}
  		}
  	},
  	components: {
	    "swiper":swiper,
	    "swiper-slide":swiperSlide
	},
    computed: {
    	swiper() {
    		return this.$refs.mySwiper.swiper
    	}
    },
    mounted() {
    	//console.log('this is current swiper instance object', this.swiper)获取当前swiper对象做自己想做的事
      	//this.swiper.slideTo(3, 1000, false)
    }
}
</script>
<style rel="stylesheet" lang="scss" scoped>
	@import "../../assets/css/index.scss";
</style>
