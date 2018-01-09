var AjaxMethod = require("../getAjax.js"); 
var ajax = new  AjaxMethod;
export default{
    state:{
        //user_name:"1 + ",
        _pageNow_wx: 1, // 发布大厅 微信页码
		_pageNow_wb: 1, // 发布大厅 微博页码
		// _scrollTop_wx: 0,
		// _scrollTop_wb: 0,
		_newPubType: 'Wx',  
		_newPubKeywords:'', //  发布大厅 关键字
		newPubList:[], //   发布大厅  微信list
		newPubListWb:[],
		Ajaxing: false, // 数据请求中
    },
    mutations:{
        // showUserName(state){
        //     alert(state.user_name);
        // },
		set_newPubList:function(state,{list}){
			state.newPubList = list;
		},
		set_newPubListWb:function(state,{list}){
			state.newPubListWb = list;
		},
    },
    actions:{
		//新媒体发布大厅 微信
		get_newPubList:function(context){//a,b,c,d,e,f,g,h
			var Atype = "post", 
				Aurl = baseUrl+'dt'+context.state._newPubType+'Data',
				Adata = {
					keyword:context.state._newPubKeywords,//查询关键字，若没有查询，可不填
                    orderType:1, //排序 1：时间  2：阅读数  3:点赞数
                    timeType: 1,  //时间  1：三天  2：七天   3：自定义
                    startTime: 1, //timeType为3时，开始时间
                    endTime: 1, //timeType为3时，结束时间
                    type: 1,  //分类  1：全部   2：原创  3：转载
                    pageNow: context.state._pageNow_wx  //当前页码
				};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				context.state.Ajaxing = false; // 加载中隐藏...
				var _arr = res.data;
				if(context.state._pageNow_wx>1){
					context.commit("set_newPubList",{list:context.state.newPubList.concat(_arr)});
				}else{
					context.commit("set_newPubList",{list:res.data});
				}
			},function(err){
				console.log(err)
			},function(){
				context.state.Ajaxing = true; // 加载中显示...
			})
		},	
		//新媒体发布大厅 微博
		get_newPubListWb:function(context){//a,b,c,d,e,f,g,h
			var Atype = "post", 
				Aurl = baseUrl+'dt'+'Wb'+'Data',
				Adata = {
					keyword:context.state._newPubKeywords,//查询关键字，若没有查询，可不填
                    orderType:1, //排序 1：时间  2：阅读数  3:点赞数
                    timeType: 1,  //时间  1：三天  2：七天   3：自定义
                    startTime: 1, //timeType为3时，开始时间
                    endTime: 1, //timeType为3时，结束时间
                    type: 1,  //分类  1：全部   2：原创  3：转载
                    pageNow: context.state._pageNow_wb  //当前页码
				};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				//console.log(res)
				var _arr = res.data;
				if(context.state._pageNow_wb>1){
					context.commit("set_newPubListWb",{list:context.state.newPubListWb.concat(_arr)});
				}else{
					context.commit("set_newPubListWb",{list:res.data});
				}
			},function(err){
				console.log(err)
			},function(){

			})
		},
    }
}
// // import state from './state.js'
// // import getters from './getters.js'
// // import actions from './actions.js'
// // import mutations from './mutations.js'
// const state = {
// 	timeNodeList:'', // 数据抓取的时间节点
// }
// const getters = {
// 	 // wxlist(states){
//   //       return states
//   //   }
// }
// const actions = {
// 	//数据抓取的时间节点
// 	get_timeNode:function(){
// 		var Atype = "post",
// 			Aurl = baseUrl + 'timeNode',
// 			Adata = {};
// 		ajax.getJson(Atype,Aurl,Adata,function(res){
// 			console.log(res)
// 			commit('set_timeNode',{list:res});
// 		},function(err){
// 			console.log(err)
// 		},function(){

// 		})
// 	},
// }
// const mutations = {
// 	set_timeNode:function(states,{list}){
// 		state.timeNodeList = list;
// 	},
// }
// export default{
// 	state,
// 	getters,
// 	actions,
// 	mutations
// }
