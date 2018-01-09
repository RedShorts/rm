var AjaxMethod = require("../getAjax.js"); 
var ajax = new  AjaxMethod;
export default{
	state:{
		_searchType:'', // 索索框 的搜索类型 默认 微信Wx
		JKDataList:{}, // 监控数据
		JKList:[], // 監控列表 - weixin 
		JKListWb:[], // 監控列表 - weibo 
		_pageNow_JKWX: 1,  //监控 微信 当前页码
		_pageNow_JKWB: 1,  //监控 微信 当前页码
	},
	mutations:{
		set_JKData:function(state,{list}){
			state.JKDataList = list;
		},
		set_JKList:function(state,{list}){
			state.JKList = list;	
		},
		set_JKListWb:function(state,{list}){
			state.JKListWb = list;	
		}
	},
	actions:{
		//监控数据
		get_JKData:function(context){
			var Atype = "post",
				Aurl = baseUrl + 'jkDate',
				Adata = {};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				console.log(res)
				context.commit("set_JKData",{list:res})
			},function(err){
				console.log(err)
			},function(){

			})
		},
		//監控數據列表 - weixin
		get_JKList:function(context){
			var Atype = "post", 
				Aurl = baseUrl+'jk'+'Wx'+'Data',
				Adata = {
					keyword: '',//查询关键字，若没有查询，可不填
					orderType: 1, //排序 1：时间  2：阅读数  3:点赞数
					timeType: 1,  //时间  1：三天  2：七天   3：自定义
					startTime: '', //timeType为3时，开始时间
					endTime: '', //timeType为3时，结束时间
					type: 1,  //1：全部   2：原创  3：转载省院  4：转自高检
					pageNow: context.state._pageNow_JKWX, //当前页码
					dwbm: 999999, // 单位编码
				};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				console.log(res)
				var _arr = res.data;
				if(context.state._pageNow_JKWX>1){
					context.commit("set_JKList",{list:context.state.JKList.concat(_arr)});
				}else{
					context.commit("set_JKList",{list:res.data});
				}
			},function(err){
				console.log(err)
			},function(){

			})
		},
		//監控數據列表 - weibo
		get_JKListWb:function(context){
			var Atype = "post", 
				Aurl = baseUrl+'jk'+'Wb'+'Data',
				Adata = {
					keyword: '',//查询关键字，若没有查询，可不填
					orderType: 1, //排序 1：时间  2：阅读数  3:点赞数
					timeType: 1,  //时间  1：三天  2：七天   3：自定义
					startTime: '', //timeType为3时，开始时间
					endTime: '', //timeType为3时，结束时间
					type: 1,  //1：全部   2：原创  3：转载省院  4：转自高检
					pageNow: context.state._pageNow_JKWB, //当前页码
					dwbm: 999999, // 单位编码
				};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				console.log(res)
				var _arr = res.data;
				if(context.state._pageNow_JKWB>1){
					context.commit("set_JKListWb",{list:context.state.JKListWb.concat(_arr)});
				}else{
					context.commit("set_JKListWb",{list:res.data});
				}
			},function(err){
				console.log(err)
			},function(){

			})
		}
	}
}