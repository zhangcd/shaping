
function initDataGrid() {
	$('#attachmentgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url:rootPath + '/projects/attachment/projectattachment!toAtt.action?projectid='+projectid,
						sortName : 'attachmentid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'attachmentid',
							checkbox : true,
							align : 'center'
						} ] ],
						columns : [ [
						       
								{
									field : 'attachmentname',
									title : '附件名称',
									width : 200,
									align : 'center'
								},  {field:'attachment',title : '附件',
									width : 200,
									align : 'center',
									formatter:function(value,rowData){
									if(rowData.attachment!=null){
											var str = rowData.attachment.split(',');
											var links = "";
											for(var i=0;i<str.length;i++){
												var name=rowData.attachmentname;
												var downname=str[i];
												links +='<a style="cursor:pointer"  onclick="return loadFile(\''+downname+'\');" alt="下载">'+downname.substring(13)+'</a><br>';
											}
												return links;
									}else{
										return "";
									}
								}},
								{
									field : 'attachmenttype',
									title : '附件类型',

									width : 80,
									align : "center"
								},
								{
									field : 'uploadperson',
									title : '上传人',

									width : 80,
									align : "center"
								},
								{
									field : 'uploadtime',
									title : '上传时间',
									width : 80,
									align : 'center'
								} ] ],
						pagination : true,
						rownumbers : true	
					});
	$(window).resize(function() {
		$("#attachmentgrid").datagrid('resize');
	});
}

function initDataGrid1() {
	$('#attachmentgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url:rootPath + '/projects/attachment/projectattachment!toList.action?projectid='+projectid,
						sortName : 'attachmentid',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'attachmentid',
							checkbox : true,
							align : 'center'
						} ] ],
						columns : [ [
						       
								{
									field : 'attachmentname',
									title : '附件名称',
									width : 200,
									align : 'center'
								},  {field:'attachment',title : '附件',
									width : 200,
									align : 'center',
									formatter:function(value,rowData){
									if(rowData.attachment!=null){
											var str = rowData.attachment.split(',');
											var links = "";
											for(var i=0;i<str.length;i++){
												var name=rowData.attachmentname;
												var downname=str[i];
												links +='<a style="cursor:pointer"  onclick="return loadFile(\''+downname+'\');" alt="下载">'+downname.substring(13)+'</a><br>';
											}
												return links;
									}else{
										return "";
									}
								}},
								{
									field : 'uploadperson',
									title : '附件类型',

									width : 80,
									align : "center"
								},
								{
									field : 'uploadperson',
									title : '上传人',

									width : 80,
									align : "center"
								},
								{
									field : 'uploadtime',
									title : '上传时间',
									width : 80,
									align : 'center'
								} ] ],
						pagination : true,
						rownumbers : true	
					});
	$(window).resize(function() {
		$("#attachmentgrid").datagrid('resize');
	});
}
//文件名称转义
function URLencode(sStr) 
{
    return encodeURI(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}
/**
 * 下载的时候使用的方法~~
 * @param name
 * @return
 */
function loadFile(name){
 	 var encodeParm=encodeURIComponent(encodeURIComponent(name.toString()));
	var urlParm=rootPath +'/projects/attachment/projectattachment!downLoad.action?path='+encodeParm+"&flg="+"0";
	$.ajax({
		type:"POST",
		url:urlParm,
		success:function(data){
			cache:false;
		if(data=="success"){
			var urlParmDown=rootPath +'/projects/attachment/projectattachment!downLoad.action?path='+encodeParm+"&flg="+"1";
			$("#methoddownload").attr("action",urlParmDown);
			$("#path").val(name);
			$("#methoddownload").submit();
		}else{			
			alert("当前文件不存在");
			}
		},
		error:function(data){
			alert("服务器正在维修，请稍后！");
		}
	}
);	
}

//删除功能~批量
function delAll() {
	var selected = $('#attachmentgrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			var attachmentsel = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].attachmentid;
				attachmentsel[i]=selected[i].attachment;
			}
			var encodestr= encodeURI(attachmentsel);
			$.post(rootPath + "/projects/attachment/projectattachment!betchDelete.action?id="+ selcheck+"&attfilname="+encodestr, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#attachmentgrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#attachmentgrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}



//添加
function addWin(projectid){
	//需要穿过去的值有当前的projectid~~
	var url = rootPath + "/projects/attachment/projectattachment!input.action";
	if (projectid != "") {
		url = url + "?projectid="+projectid;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="attFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'附件编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '450',
		height : '350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#attFrame",top.document.body).contents().find("#attform").form('submit',{
					url:rootPath +'/projects/attachment/projectattachment!save.action?projectid='+projectid,
					onSubmit:function(){
					var objs= $("#attFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#attFrame",top.document.body).contents().find(":input").focus();//
							$("#attFrame",top.document.body).contents().find("#attachmenttypeid").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#attachmentgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='fail'){
							alert('保存失败,请查看你上传的文件是否为空！');
						}			
					},
					error:function(data){
						alert("失误");
					}
				});	
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
//添加
function addWin2(projectid){
	//需要穿过去的值有当前的projectid~~
	var url = rootPath + "/projects/attachment/projectattachment!input.action";
	if (projectid != "") {
		url = url + "?projectid="+projectid;
	}
	var _dialog = window.top
			.$('<div id ="cert-dlg" style="padding:0px;"><iframe id="attFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'附件编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '450',
		height : '350',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#attFrame",top.document.body).contents().find("#attform").form('submit',{
					url:rootPath +'/projects/attachment/projectattachment!save2.action?projectid='+projectid,
					onSubmit:function(){
					var objs= $("#attFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#attFrame",top.document.body).contents().find(":input").focus();//
							$("#attFrame",top.document.body).contents().find("#attachmenttypeid").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=='success'){
							_dialog.dialog('close');
							$("#attachmentgrid").datagrid('reload');
							alert('保存成功');
						}else if(data=='fail'){
							alert('保存失败,请查看你上传的文件是否为空！');
						}			
					},
					error:function(data){
						alert("失误");
					}
				});	
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
//查询
function query() {
	var attachmenttypeid = $("#attachmenttypeid").val();//附件类型
	var attachmentname = $("#attachmentname").val();// 附件名称
	$('#attachmentgrid').datagrid( {
		queryParams : {
		attachmenttypeid:attachmenttypeid,
		attachmentname : attachmentname
		},
		pageNumber : 1
	// 查询后指定页码为1
	});
}

