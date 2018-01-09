// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//import 'lib-flexible'
import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/dist/css/swiper.css"
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: 'http://img0.imgtn.bdimg.com/it/u=493287347,2949150661&fm=27&gp=0.jpg',
	loading: 'http://img.zcool.cn/community/01cdf25816a625a84a0e282b17fffa.gif',
	attempt: 1
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

//空格过滤器
Vue.filter('trim_filter', function(value) {
  if (!value) { return ''}
  value = value.trim();
  return value;
})
//日期
Vue.filter('date_filter',function(time){
	if(!time){ return ''}
	var d = new Date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes();
	if(hour<10){
		hour = '0'+hour;
	}
	if(minutes<10){
		minutes = '0'+minutes; 
	}
    var seconds = d.getSeconds();
    return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes;// + ':' + seconds
})
//关键字高亮
Vue.prototype.highlight = function(title,keywords){
	if(!keywords){
		return title;
	}
	var regex = new RegExp(keywords, 'gi')//gi 全部匹配
    var result = title.replace(regex, '<span class="highlightedText">$&</span>');
    return result;
}
//http filter
Vue.filter('httpFilter',function(link){
	var _link = "http://http://";
	if(link.indexOf(_link) >= 0){
		link = link.substring(7);
		return link;
	}
})
//自定义指令
// Vue.directive('drag', function() {
// 	var oDiv = this.el;
// 	console.log(this);
// 	oDiv.onmousedown = function(ev) {
// 		var disX = ev.clientX - oDiv.offsetLeft;
// 		var disY = ev.clientY - oDiv.offsetTop;
// 		document.onmousemove = function(ev) {
// 			var l = ev.clientX - disX;
// 			var t = ev.clientY - disY;
// 			oDiv.style.left = l + 'px';
// 			oDiv.style.top = t + 'px';
// 		};
// 		document.onmouseup = function() {
// 			document.onmousemove = null;
// 			document.onmouseup = null;
// 		};
// 	};
// });
