//-----Au-----wjy~~

$(document).ready(function() {
	initDataGrid();
	//人员表里面不需要提供增加和删除的办法~只需要提供查看和修改以及查询的功能
	//只需要在用户进行添加的时候，自动在人员表里面增加一条记录~~而后在人员表进行维护
	//在用户进行删除的时候，把人员表 的数据也进行级联删除

});

// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#customgrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						singleSelect:true,
						url : 'custom!customList.action',
						sortName : 'customid',
						sortOrder : 'asc',
						remoteSort : false,
						//idField : 'methodid',
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						columns : [ [
								{
									field : 'customname',
									title : '姓名',
									width : 180,
									align : 'center'
								},

								{
									field : 'sex',
									title : '性别',

									width : 120,
									align : "center"
								},

								{
									field : 'mobilephone',
									title : '联系电话',

									width : 120,
									align : "center"
								},
								{
									field : 'status',
									title : '状态',

									width : 100,
									align : "center"
								},
								{
									field : 'option',
									title : '操作',
									width : 100,
									align : 'center',
									formatter : function(value, rec) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/xiangxiimage.png" id="btnshow" onclick="detail(\''
												+ rec.customid
												+ '\')" alt="查看"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.customid
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''
												+ rec.customid
												+ '\')" alt="删除"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true

					});
	$(window).resize(function() {
		$("#customgrid").datagrid('resize');
	});
}

//单条删除
function del(uid) {
	$('#customgrid').datagrid('clearSelections');
	if (window.confirm('是否删除？')) {
		$.post("custom!deleteOnlyOne.action", {
			id : uid
		}, function(del) {
			if (del == 'success') {
				alert("删除成功！");
				$("#customgrid").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
}

//删除功能~批量
function delAll() {
	var selected = $('#customgrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].customid;
			}
			$.post(rootPath + "/custom/custom!betchDeleteMethod.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#customgrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#customgrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}
}

//详情
function detail(id,userid) {
	$('#customgrid').datagrid('clearSelections');
	var url = rootPath + "/custom/custom!view.action";
	if (id != ""&&id!=null) {
		url = url + "?id=" + id+"&userids="+userid;
	}else{
		url = url + "?userids="+userid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="detailFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '人员详情',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '800',
		height : '400'
	});
	_dialog.dialog('open');
}

//添加
function addWin(id,userid){
	if(id=='null'){
		id='';
	}
	var url = rootPath + "/custom/custom!input.action";
	if (id != ""&&id!=null) {
		url = url + "?id=" + id+"&userids="+userid;
	}else{
		url = url + "?userids="+userid;
	}
	var _dialog = window.top
			.$('<div id ="role-dlg" style="padding:0px;"><iframe id="custominfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog({
		title:'人员编辑',
		autoOpen:false,
		modal:true,
		closed:true,
		width : '800',
		height : '400',
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
			
				$("#custominfoFrame",top.document.body).contents().find("#custominfoForm").form('submit',{
					url:rootPath +'/custom/custom!save.action?id=' + id+'&userids='+userid,
					onSubmit:function(){
					var objs= $("#custominfoFrame",top.document.body).contents().find(".grkj-validate");
					if(!saveCheck(objs)){						
							$("#custominfoFrame",top.document.body).contents().find(":input").focus();
							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
							return false;
						}
					},
					success:function(data){
						if(data=='success'){
						_dialog.dialog('close');
						$("#customgrid").datagrid('reload');
						alert('保存成功');
						}					},
					error:function(){
						alert("保存失败");
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
	var customname = $("#customname").val();//展示的名字~是用用户id去用户表查询的realname
	var sex = $("#sex").val();//职务
//	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	$('#customgrid').datagrid( {
		queryParams : {
		customname : customname,
//		post:post,
		sex:sex
		},
		pageNumber : 1  //查询后指定页码为1
	});
}



//导出
function ExportExcel() {
		//poi导出
			var urlParmDown=rootPath +"/custom/custom!exportInfo.action";
			$("#exportExcel").attr("action",urlParmDown);
			$("#exportExcel").submit();	
}


