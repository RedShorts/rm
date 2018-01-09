import Vue from 'vue'
import Vuex from 'vuex'
import Mint from 'mint-ui';
import $ from 'jquery' 
//import index from './index'; //首页
//import index from "./modules/index/index";
import index from "./index/index";
import login from "./login/index";
import monitor from "./monitor/index";
import mine from "./mine/index";
var AjaxMethod = require("./getAjax.js"); 
var ajax = new  AjaxMethod;
Vue.use(Vuex)
Vue.use(Mint)

const  store = new Vuex.Store({
	state:{
		// _pageNow_wx: 1, // 发布大厅 微信页码
		// _pageNow_wb: 1, // 发布大厅 微博页码
		// _newPubType: 'Wx',  
		// _newPubKeywords:'', //  发布大厅 关键字
		// newPubList:[], //   发布大厅  微信list
		// newPubListWb:[],
		// loginList:{},// 登录成功后的信息对象
		// formState:{}, //用户登录表单,
		// loginOutList:{},// 退出 
		timeNodeList:'', // 数据抓取的时间节点
		codeList:{},
		// _searchType:'', // 索索框 的搜索类型 默认 微信Wx
		// JKDataList:{}, // 监控数据
		// JKList:[], // 監控列表
		// _pageNow_JKWX: 1,  //监控 微信 当前页码
		_dispatchType: '', // 在search。vue中使用，主要用于区别当前需要请求的是哪个tab的接口，index还是monitor
	},
	modules:{
		index,
		login,
		monitor,
		mine
		//index
	},
	actions:{
		//数据抓取的时间节点
		get_timeNode:function(){
			var Atype = "post",
				Aurl = baseUrl + 'timeNode',
				Adata = {};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				//console.log(res)
				store.commit('set_timeNode',{list:res});
			},function(err){
				console.log(err)
			},function(){

			})
		},
		// //新媒体发布大厅 微信
		// get_newPubList:function(){//a,b,c,d,e,f,g,h
		// 	var Atype = "post", 
		// 		Aurl = baseUrl+'dt'+store.state._newPubType+'Data',
		// 		Adata = {
		// 			keyword:store.state._newPubKeywords,//查询关键字，若没有查询，可不填
  //                   orderType:1, //排序 1：时间  2：阅读数  3:点赞数
  //                   timeType: 1,  //时间  1：三天  2：七天   3：自定义
  //                   startTime: 1, //timeType为3时，开始时间
  //                   endTime: 1, //timeType为3时，结束时间
  //                   type: 1,  //分类  1：全部   2：原创  3：转载
  //                   pageNow: store.state._pageNow_wx  //当前页码
		// 		};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		console.log(res)
		// 		var _arr = res.data;
		// 		if(store.state._pageNow_wx>1){
		// 			store.commit("set_newPubList",{list:store.state.newPubList.concat(_arr)});
		// 		}else{
		// 			store.commit("set_newPubList",{list:res.data});
		// 		}
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// },	
		// //新媒体发布大厅 微博
		// get_newPubListWb:function(){//a,b,c,d,e,f,g,h
		// 	var Atype = "post", 
		// 		Aurl = baseUrl+'dt'+'Wb'+'Data',
		// 		Adata = {
		// 			keyword:store.state._newPubKeywords,//查询关键字，若没有查询，可不填
  //                   orderType:1, //排序 1：时间  2：阅读数  3:点赞数
  //                   timeType: 1,  //时间  1：三天  2：七天   3：自定义
  //                   startTime: 1, //timeType为3时，开始时间
  //                   endTime: 1, //timeType为3时，结束时间
  //                   type: 1,  //分类  1：全部   2：原创  3：转载
  //                   pageNow: store.state._pageNow_wb  //当前页码
		// 		};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		console.log(res)
		// 		var _arr = res.data;
		// 		if(store.state._pageNow_wb>1){
		// 			store.commit("set_newPubListWb",{list:store.state.newPubListWb.concat(_arr)});
		// 		}else{
		// 			store.commit("set_newPubListWb",{list:res.data});
		// 		}
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// },
		// //login
		// get_login:function(){
		// 	var Atype = "post", 
		// 		Aurl = baseUrl + 'adminLogin',
		// 		Adata = {
		// 			uname: store.state.formState._uname,
	 //                pwd: store.state.formState._psw
		// 		};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		console.log(res)
		// 		if(res.code == 1){
		// 			//window.localStorage['login'] = store.state.formState;
		// 			localMethod.prototype.setObject('web_login',{
		// 				"jcy_name":res.data.jcy_name,
		// 				"dwbm":res.data.dwbm,
		// 				"zhiwu":res.data.zhiwu,
		// 				"keshi":res.data.keshi,
		// 				"name":res.data.name,
		// 				"phone":res.data.phone,
		// 				"remPsw":store.state.formState._remPsw, // 记住密码
		// 				"uname": store.state.formState._uname,
	 //                	"pwd": store.state.formState._psw
		// 			})
		// 			store.commit("set_login",{list:res})
		// 		}
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// },
		//loginOut
		// get_loginOut:function(){
		// 	var Atype = "post",
		// 		Aurl = baseUrl + 'adminLogout',
		// 		Adata = {};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		store.commit("set_loginOut",{list:res})
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// },
		//发送验证码（验证身份和修改密码）
		get_code:function(){
			var Atype = "get",
				Aurl = baseUrl + 'sms',
				Adata = {};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				//console.log(res)
				store.commit("set_code",{list:res})
			},function(err){	
				console.log(err)
			},function(){

			})
		},
		// //监控数据
		// get_JKData:function(){
		// 	var Atype = "post",
		// 		Aurl = baseUrl + 'jkDate',
		// 		Adata = {};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		console.log(res)
		// 		store.commit("set_JKData",{list:res})
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// },
		// //監控數據列表
		// get_JKList:function(){
		// 	var Atype = "post", 
		// 		Aurl = baseUrl+'jk'+'Wx'+'Data',
		// 		Adata = {
		// 			keyword: '',//查询关键字，若没有查询，可不填
		// 			orderType: 1, //排序 1：时间  2：阅读数  3:点赞数
		// 			timeType: 1,  //时间  1：三天  2：七天   3：自定义
		// 			startTime: '', //timeType为3时，开始时间
		// 			endTime: '', //timeType为3时，结束时间
		// 			type: 1,  //1：全部   2：原创  3：转载省院  4：转自高检
		// 			pageNow: store.state._pageNow_JKWX, //当前页码
		// 			dwbm: 999999, // 单位编码
		// 		};
		// 	ajax.getJson(Atype,Aurl,Adata,function(res){
		// 		console.log(res)
		// 		var _arr = res.data;
		// 		if(store.state._pageNow_JKWX>1){
		// 			store.commit("set_JKList",{list:store.state.JKList.concat(_arr)});
		// 		}else{
		// 			store.commit("set_JKList",{list:res.data});
		// 		}
		// 	},function(err){
		// 		console.log(err)
		// 	},function(){

		// 	})
		// }
	},
	getters:{

	},
	mutations:{
		set_timeNode:function(state,{list}){
			store.state.timeNodeList = list;
		},
		// set_newPubList:function(state,{list}){
		// 	store.state.newPubList = list;
		// },
		// set_newPubListWb:function(state,{list}){
		// 	store.state.newPubListWb = list;
		// },
		// set_login:function(state,{list}){
		// 	store.state.loginList = list;
		// },
		// set_loginOut:function(state,{list}){
		// 	store.state.loginOutList = list;
		// },
		set_code:function(state,{list}){
			store.state.codeList = list;
		},
		// set_JKData:function(state,{list}){
		// 	store.state.JKDataList = list;
		// },
		// set_JKList:function(state,{list}){
		// 	store.state.JKList = list;	
		// }
	}
})
export default store