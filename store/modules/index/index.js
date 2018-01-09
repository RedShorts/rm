var AjaxMethod = require("../../getAjax.js"); 
var ajax = new  AjaxMethod;
export default{
    state:{
        //user_name:"1 + ",
        timeNodeList:'', // 数据抓取的时间节点
    },
    mutations:{
        // showUserName(state){
        //     alert(state.user_name);
        // },
        set_timeNode:function(state,{list}){
			state.timeNodeList = list;
		},
    },
    actions:{
    	//数据抓取的时间节点
		get_timeNode(context){
			var Atype = "post",
				Aurl = baseUrl + 'timeNode',
				Adata = {};
			ajax.getJson(Atype,Aurl,Adata,function(res){
				//console.log(context)
				//console.log(res)
				context.commit('set_timeNode',{list:res});
			},function(err){
				console.log(err)
			},function(){

			})
		},
    }
}