function AjaxMethod(){

}
AjaxMethod.prototype = {
	getJsonp:function(type,url,params,fun1,fun2){
		$.ajax({
			type:type,
			url:url,
			data:params,
			dataType: "jsonp",  
			jsonp: "callback",  
			success:function(res){
				fun1(res)
			},
			error:function(err){
				fun2(err)
			},
			complete:function(){
			}
		})
	},
	getJson:function(type,url,params,fun1,fun2,fun0){
		$.ajax({
			type:type,
			url:url,
			data:params,
			dataType: "json",
			beforeSend:function(){
				fun0()
			},  
			success:function(res){
				fun1(res)
			},
			error:function(err){
				fun2(err)
			},
			complete:function(){
			}
		})
	}
}
module.exports = AjaxMethod; 