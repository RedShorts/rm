var AjaxMethod = require("../getAjax.js"); 
var ajax = new  AjaxMethod;
export default{
	state:{
		loginOutList:{},// 退出 
	},
    mutations:{
    	set_loginOut:function(state,{list}){
			state.loginOutList = list;
		},
    },
	actions:{
		//loginOut
		get_loginOut:function(context){
			var Atype = "post",
				Aurl = baseUrl + 'adminLogout',
				Adata = {};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				context.commit("set_loginOut",{list:res})
			},function(err){
				console.log(err)
			},function(){

			})
		},
	}
}