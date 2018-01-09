var AjaxMethod = require("../getAjax.js"); 
var ajax = new  AjaxMethod;
export default{
	state:{
		loginList:{},// 登录成功后的信息对象
		formState:{}, //用户登录表单,
	},
	mutations:{
		set_login:function(state,{list}){
			state.loginList = list;
		},
	},
	actions:{
		//login
		get_login:function(context){
			var Atype = "post", 
				Aurl = baseUrl + 'adminLogin',
				Adata = {
					uname: context.state.formState._uname,
	                pwd: context.state.formState._psw
				};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				console.log(res)
				if(res.code == 1){
					var _storage = {
						"jcy_name":res.data.jcy_name,
						"dwbm":res.data.dwbm,
						"zhiwu":res.data.zhiwu,
						"keshi":res.data.keshi,
						"name":res.data.name,
						"phone":res.data.phone,
						"remPsw":context.state.formState._remPsw, // 记住密码
						"uname": context.state.formState._uname,
	                	"pwd": context.state.formState._psw,
	                	"level":res.data.level
					};
					if(context.state.formState._remPsw == 1){// 记住了密码 存入localstorage
						localMethod.prototype.setObject('web_login',_storage)
					}else{
						localMethod.prototype.setSessionObj('web_login',_storage)
					}
					//window.localStorage['login'] = store.state.formState;
					context.commit("set_login",{list:res})
				}
			},function(err){
				console.log(err)
			},function(){

			})
		},
	}
}