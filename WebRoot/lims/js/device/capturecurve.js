
// 页面加载，数据的展示~~datagrid~~
function initDataGrid(deviceid) {
	$('#captureitem')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : rootPath +'/device/capture/capturecurvemap!captureList.action?deviceid='+deviceid,
						sortName : 'id',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'id',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 10,
						pageList : [ 10,20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [
								{
									field : 'itemname',
									title : '项目名称',
									width : 100,
									align : 'center'
								},
								{
									field : 'methodname',
									title : '方法名称',
									width : 200,
									align : 'center'
								},

								{
									field : 'analysname',
									title : '分析项',
									width : 100,
									align : "center"
								},

								{
									field : 'aliasname',
									title : '分析项别名',

									width : 100,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 70,
									align : 'center',
									formatter : function(value, rec) {
										var links =  '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.id
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.id
												+ '\')" alt="删除"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						toolbar:"#tb"

					});
	$(window).resize(function() {
		$("#captureitem").datagrid('resize');
	});

}



//修改
function addWin(id) {
	$('#captureitem').datagrid('clearSelections');
	var url =rootPath+"/device/capture/capturecurvemap!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="captureFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '数据采集编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '440',
		height : '400',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
							handler : function() {
						$("#captureFrame",top.document.body).contents().find("#captureform").form('submit',{
								url:rootPath +'/device/capture/capturecurvemap!savecapture.action?id='+id,
								onSubmit:function(){
								},
								success:function(data){
									if(data=="success"){
										_dialog.dialog('close');
										alert('成功');
										$("#captureitem").datagrid('reload');
									}
									if(data=="fail"){
										alert('失败');
									} 
									if(data=="exit"){
										alert('该名字已经存在，请重新输入');
									}
								}
						});	
					}
				}, {
					text : '取消',
					iconCls : 'icon-cancel',
					handler : function() {
						_dialog.dialog('close');
					}
				} ],
		onClose : function() {
			_dialog.dialog("destroy");

		}
	});
	_dialog.dialog('open');
}

 
// 单条删除
function del(uid) {
	$('#captureitem').datagrid('clearSelections');
//	$('#captureitem').datagrid('selectRecord',uid);
	if (window.confirm('是否删除？')) {
		$.post(rootPath+"/device/capture/capturecurvemap!deleteOnlyOne.action", {id : uid}, function(del) {
			if (del == 'success') {
				alert("删除成功！");
				$("#captureitem").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
} 
  
//删除功能~批量
function delAll() {
	var selected = $('#captureitem').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].id;
			}
			$.post(rootPath+"/device/capture/capturecurvemap!betchDeleteMethod.action?id="
					+ selcheck, function(del) {

				if (del == 'success') {
					alert("删除成功!");
					$("#captureitem").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#captureitem").datagrid('reload');
				}
			});

		}
	} else {

		alert('请至少选择一条记录！');
		return;
	}

}


//添加数据采集~~与校准曲线信息的查询（项目和方法）的是同一个方法  页面时单独的
function addCurveDialog(){
	var url = rootPath+"/device/capture/capturecurvemap!tocapturecurveInput.action?deviceid="+$("#deviceid").val();
	var curve_dialog =  window.top.$('	<div id ="jzqxgl" style="padding:0px;"><iframe id="captureFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
	curve_dialog.dialog({
		title:'数据采集',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'730',
		height:'350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#captureFrame",top.document.body).contents().find("#curveform").form('submit',{
						url:rootPath +'/device/capture/capturecurvemap!savecapture.action',
						onSubmit:function(){
							var objs = $("#captureFrame",top.document.body).contents().find(".grkj-validate");
							if(!saveCheck(objs)){
								$("#captureFrame",top.document.body).contents().find("#itemname").focus();
								$("#captureFrame",top.document.body).contents().find("select").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
							  
						},
						success:function(data){
							if(data=="success"){
								curve_dialog.dialog('close');
								alert('成功');
								$("#captureitem").datagrid('reload');
							}
							if(data=="fail"){
								alert('失败');
							} 
							if(data=="exist"){
								alert('已经添加过，请勿重复添加！');
							} 
						}
				});	
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){	
				curve_dialog.dialog('close');
			}
		}],
		onClose:function(){
			curve_dialog.dialog("destroy");
		}
	});
	curve_dialog.dialog('open');
}	

//未过滤了的~~begin ================================================================
		
		//做项目弹出窗口使用  单选
		function showitem(){
			url=rootPath +"/certificateinfo/certificateinfo!showitem.action";
			var _dialog =  window.top.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="ItemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
			_dialog.dialog({
				title:'项目选择',
				autoOpen:false,
				modal:true,
				closed:true,
				width:'600',
				height:'450',
				buttons:[{
					text:'确定',
					iconCls:'icon-save',
					handler:function(){
					var itemname=$("#ItemFrame",top.document.body).contents().find("#itemname").val();
					var itemid=$("#ItemFrame",top.document.body).contents().find("#itemid").val();
					if(itemid==""||itemid==null){
						alert("请选择项目");
						return false;
					}
					$("#itemid").val(itemid);
					$("#itemname").val(itemname);
					_dialog.dialog('close');
					//加载方法下拉框
					methodDataSingle(itemid);		
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
						_dialog.dialog('close');
					}
				}],
				onClose:function(){
					_dialog.dialog("destroy");
					
				}
			});
			_dialog.dialog('open');
			
		}
		
		
		//加载方法下拉框
		function methodDataSingle(itemid){
			$('#methodlist').html('');
			$.ajax( {
				type : 'GET',
				url : rootPath+'/device/capture/capturecurvemap!initMethod.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
				data : {'itemid':itemid},
				async:false,//同步
				success : function(data) {
					var vData = eval("(" + data + ")");
					var lList = "<option value=\"\">---请选择---</option>";
					var methodid = $('#methodid').val();
					//遍历json数据  
					jQuery.each(vData.rowsData, function(i, n) {
						if(methodid==n.methodid){
							lList += "<option  value=" + n.methodid + " selected >" + n.methodname	+ "</option>";
						}else{
							lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
						}
					});				
					//绑定数据到listLeft
					$('#methodlist').append(lList);
					//加载当前选中项目所配置的分析参数们
				}
			});
		}
// 未过滤了的~~end ================================================================

//打开项目信息  过滤了的~~begin  ================================================================
function openItemsList(deviceid){
	var url = rootPath+"/curve/devicecalibratecurve!toitem.action?deviceid="+deviceid;
	var curve_dialog =  window.top.$('	<div id ="item" style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="no" src="'+url+'"></iframe></div>').appendTo(window.top.document.body);
	curve_dialog.dialog({
		title:'项目',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'500',
		height:'400',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#itemFrame",top.document.body).contents().find("#itemid").click();
				var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
				var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
				var departid = $("#itemFrame",top.document.body).contents().find("#departid").val();
				var groupid = $("#itemFrame",top.document.body).contents().find("#groupid").val();
				var devicetype = $("#itemFrame",top.document.body).contents().find("#devicetype").val();
				$("#itemid").val(itemid);
				$("#itemname").val(itemname);
				curve_dialog.dialog('close');
				//加载方法下拉框
				methodData(devicetype,itemid,departid,groupid);					
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){	
				curve_dialog.dialog('close');
			}
		}],
		onClose:function(){
			curve_dialog.dialog("destroy");
		}
	});
	curve_dialog.dialog('open');
}




//加载方法下拉框
function methodData(devicetype,itemid,departid,groupid){
	$('#methodlist').html('');
	$.ajax( {
		type : 'GET',
		url : rootPath+'/curve/devicecalibratecurve!initMethod.action?'+'timeStamp='+new Date().getTime(),//给该url一个时间戳~~这样就必须每次从服务器读取数据,
		data : {'devicetype' : devicetype,'itemid':itemid,'departid':departid,'groupid':groupid},
		async:false,//同步
		success : function(data) {
			var vData = eval("(" + data + ")");
			var lList = "<option value=\"\">---请选择---</option>";
			var methodid = $('#methodid').val();
			//遍历json数据  
			jQuery.each(vData.rowsData, function(i, n) {
				if(methodid==n.methodid){
					lList += "<option  value=" + n.methodid + " selected >" + n.methodname	+ "</option>";
				}else{
					lList += "<option value=" + n.methodid + ">" + n.methodname	+ "</option>";
				}
			});				
			//绑定数据到listLeft
			$('#methodlist').append(lList);
		}
	});
}

//过滤了的~~end~~~ ================================================================


