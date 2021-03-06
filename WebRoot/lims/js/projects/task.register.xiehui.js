function initDataGrid(){
	$('#datagrid').treegrid({
		singleSelect:true,//文本框的多选 单选  因为判断比较麻烦，容易出问题，所以修改成单选
		nowrap: false,
		striped: true,
		collapsible:true,
		url:'taskregister!xiehuitaskList.action',
		queryParams : {
			monitortype : 7
		},
		fit:true,
		border:true,
		fitColumns:false,
		scrollbarSize:0,
		checkOnSelect:true,
		idField:'projectitemid',
		treeField:'projectitemid',
		frozenColumns:[[
//	       {field : ' ',
//				title : '&nbsp;',
//				width : 30,
//				align : 'center',
//				formatter : function(value){
//					return "<input type='radio' name='radio'/>";}
//		 	},
		 	{field:'customid',title:'编号',width:50,align : 'center'},
       	    {field:'customname',title:'名字',width:80,align : 'center'}
		]],
		columns:[[
			{field:'monitorentname',title:'手术单位',width:180,align : 'center'},
	        {field:'mobilephone',title:'电话',width:180,align : 'center'},	        
	        {field:'sex',title:'性别',width:80,align : 'center'},
	        {field:'age',title:'年龄',width:110,align : 'center'},
	        {field:'itemname',title:'项目',width:180,align : 'center'},
	        {field:'standfee',title:'费用',width:80,align : 'center'},	        
			{field:'dealdate',title:'时间',width:280,align : 'center'}					
//			{field:'monitortype',title:'业务类型',width:100,align : 'center'},
//			{field:'completedate',title:'要求完成时间',width:80,align : 'center'}
		]],
		pagination:true,
		rownumbers:false,
		pageSize:20,
		pageList:[20,30,40,50],
		onLoadSuccess:function(data){
			if(data.rows.length>0){
				setTimeout("mergeCellsByField(\"datagrid\",\"monitorentid,customid\")",10)
			}
		},
		onContextMenu:function(e,node){
//			$('#datagrid').tree("select",node.target);
			$("#projectcode").val(node.projectcode);
//			$("#stepcode").val(node.stepcode);
//			$("#issubbackage").val(node.issubpackage);
//			$("#taskContextMenu").menu("show", {left: e.pageX,top: e.pageY});
//			$('#delTask').removeAttr("disabled");
//			$('#copyTask').removeAttr("disabled");
//			$('#viewTask').removeAttr("disabled");
			
			e.preventDefault();
		},
		onSelect:function(node){
			$("#projectcode").val(node.projectcode);
//			$("#stepcode").val(node.stepcode);
//			alert(node.issubpackage+"ll");
//			$("#issubbackage").val(node.issubpackage);
			
//			$($("input[type=radio]")[rowIndex]).attr("checked", true);
		},
		onClickRow:function(node){
//			$('#BasicInfoFrame').attr("src","");
//			$('#MonitorEntFrame').attr("src","");
//			$('#AppraiseOpinionFrame').attr("src","");
//			$('#WorkflowImgFrame').attr("src","");
//			$('#AttachmentFrame').attr("src","");
//			$('#TaskListFrame').attr("src","");
//			$('#WeituoFrame').attr("src","");
//			$('#ChargeFrame').attr("src","");
//			$('#SubFrame').attr("src","");
			
//			addtabs(node.projectcode);
//			selectView('基本信息');
//			$(window.parent.document).find("#hdnButton").click();
		}
	});
	
	$(window).resize(function(){
		$("#datagrid").treegrid('resize');
	});	
}
//当存在分包时显示分包信息
function addtabs(projectcode){
	if($('#tt').tabs('exists','分包信息')){
		$('#tt').tabs('close','分包信息');
	}
	
	$.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getSubInfo.action?timeStamp='+new Date().getTime(),
		data : {'projectcode' : $('#projectcode').val()},
		success : function(data) {
			if(data=="1"){
				$('#tt').tabs('add',{
					title:'分包信息',
					content:'<iframe id="SubFrame" width="100%" height="568"	frameborder="0" scrolling="no" src=""></iframe>'
				});
				selectView('基本信息');
			}
		}
	});
	selectView('基本信息');
}


//点击某一行数据时默认选中基本信息标签
function selectView(title){
	$('#tt').tabs({
		onSelect: function(title){
			if(title == '流程图'){
				if($('#projectcode').val()!=''){
					if($('#WorkflowImgFrame').attr('src')==undefined||$('#WorkflowImgFrame').attr('src')==""){
						$("#WorkflowImgFrame").attr("src",rootPath+"/projects/flowchart/flowchart!toFlowChartPage.action?entityid="+$('#projectcode').val());
					}
				}
			}else if(title == '基本信息'){
				if($('#projectcode').val()!=''){
					if($('#BasicInfoFrame').attr('src')==undefined||$('#BasicInfoFrame').attr('src')==""){
						if($('#stepcode').val()=='TaskApprove'){
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!yiyuanInput.action?id="+$('#projectcode').val());
						}else{
							$("#BasicInfoFrame").attr("src",rootPath +"/projects/taskregister/taskregister!yiyuanView.action?id="+$('#projectcode').val()+"&timeStamp="+new Date().getTime()+"&monitortype=7");
						}
					}
				}	

			}else if(title == '任务通知单'){
				if($('#projectcode').val()!=''){
					//if($('#TaskListFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						var projectcode = $('#projectcode').val();
						$.ajax( {
								type : 'POST',
								url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action",
								data : {'projectcode' : projectcode},
								success : function(data) {
									if (data == 'fail') {
										alert("加载失败！");
										return;
									}else if (data == '1' || data== '3'){
										$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("检测任务通知单.raq"))+"&projectcode="+$('#projectcode').val());
									}else if (data == '2'){
										$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("来样送检通知单.raq"))+"&projectcode="+$('#projectcode').val());
									}else{
										alert(data);
									}
					
									}
						});
						
						
						//$("#TaskListFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("任务计划单.raq"))+"&projectcode="+$('#projectcode').val());
						
				}
			}else if(title == '监测企业'){
				if($('#projectcode').val()!=''){
					if($('#MonitorEntFrame').attr('src')==undefined||$('#MonitorEntFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'&&$('#stepcode').val()!='SampeRegister'){
							$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!view.action?id="+$('#projectcode').val());
						}else{
							$("#MonitorEntFrame").attr("src",rootPath +"/projects/taskregister/projectdetail!list.action?id="+$('#projectcode').val());
						}
						
					}	
				}
			}else if(title == '委托协议'){
				if($('#projectcode').val()!=''){
					//if($('#WeituoFrame').attr('src')==undefined||$('#TaskListFrame').attr('src')==""){
						var projectcode = $('#projectcode').val();
						$.ajax( {
								type : 'POST',
								url :rootPath + "/projects/taskregister/taskregister!matchingsamplesource.action",
								data : {'projectcode' : projectcode},
								success : function(data) {
									
									if (data == 'fail') {
										alert("加载失败！");
										return;
									}else if (data == '1' || data== '3'){
										$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
									}else if (data == '2'){
										$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("样品送检委托协议.raq"))+"&projectcode="+$('#projectcode').val());
									}else{
										alert(data);
									}
					
									}
						});
						
						//$("#WeituoFrame").attr("src",rootPath + "/common/report!toReportPage.action?raq="+encodeURI(encodeURI("通用委托监测协议.raq"))+"&projectcode="+$('#projectcode').val());
						
				}
			}else if(title == '流转记录'){
				if($('#projectcode').val()!=''){
					if($('#AppraiseOpinionFrame').attr('src')==undefined||$('#AppraiseOpinionFrame').attr('src')==""){
						$("#AppraiseOpinionFrame").attr("src",rootPath + "/projects/opinion/opinion!list.action?id="+$('#projectcode').val());
					}
				}
			}else if(title == '附件'){
				if($('#projectcode').val()!=''){
					if($('#AttachmentFrame').attr('src')==undefined||$('#AttachmentFrame').attr('src')==""){
						$("#AttachmentFrame").attr("src",rootPath+"/projects/attachment/projectattachment!list.action?id="+$('#projectcode').val());	
					}
				}
			}
			else if(title == '费用明细'){
				if($('#projectcode').val()!=''){
					if($('#ChargeFrame').attr('src')==undefined||$('#ChargeFrame').attr('src')==""){
						//if($('#stepcode').val()!='Register'){
							$("#ChargeFrame").attr("src",rootPath +"/projects/taskregister/chargedetail!view.action?id="+$('#projectcode').val());
						//}else{
						//	$("#ChargeFrame").attr("src",rootPath +"/projects/taskregister/chargedetail!list.action?id="+$('#projectcode').val());
						//}
						
					}	
				}
			}else if(title == '分包信息'){
				$('#SubFrame').attr("src","");
				if($('#projectcode').val()!=''){
					if($('#SubFrame').attr('src')==undefined||$('#SubFrame').attr('src')==""){
						if($('#stepcode').val()!='Register'&& $('#stepcode').val()!='TaskApprove'){
							$("#SubFrame").attr("src",rootPath +"/projects/taskregister/taskregister!toSubPageView.action?projectcode="+$('#projectcode').val()+"&timeStamp="+new Date().getTime());
						}else{
							$("#SubFrame").attr("src",rootPath +"/projects/taskregister/taskregister!toSubbackageList.action?projectcode="+$('#projectcode').val()+"&timeStamp="+new Date().getTime());
						}
						
					}
				}
			}
		}			
	});

}
		
//新建任务
function addTask()
{
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage.action";
	var _dialog =  window.top.$('<div id ="entDlg" style="padding:0px;"><iframe id="entFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'企业选择',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'700',
	buttons:[{
			text:'下一步',
			iconCls:'icon-next',
			handler:function(){
				var ent = $("#entFrame",top.document.body).contents().find('#entid').val();
				if(ent==''||ent==null){
					alert("请选择一个企业！");
					return ;
				}
				_dialog.dialog('close');
				
				toTaskBasicInfo(ent);
				
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

//跳转到任务基本信息页面
function toTaskBasicInfo(){
	var url = rootPath + "/projects/taskregister/taskregister!waiweiInfo.action?monitortype=7";
	var _dialog =  window.top.$('<div id ="infoDlg" style="padding:0px;"><iframe id="infoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'监测基本信息登记',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'950',
	height:'400',
	buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(){
				$("#infoFrame",window.top.document).contents().find("#MonitorForm").form('submit',
					{
						url:rootPath + "/projects/taskregister/taskregister!add.action",
						onSubmit:function(){
							var name = $("#infoFrame",window.top.document).contents().find("#subName").val();
							//alert(name);
							var objs = $("#infoFrame",window.top.document).contents().find(".grkj-validate");
							
							if(!saveCheck(objs)){
								$("#infoFrame",window.top.document).contents().find(":input").focus();
								alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
								return false;
							}
						},
						success : function(data) {
							if (data == 'fail') {
								_dialog.dialog('close');
								alert("保存失败！");
								return;
							}
							if (data == 'success') {
								_dialog.dialog('close');
								alert('保存成功！');
//								$('#datagrid').treegrid('reload');
								initDataGrid();
							}
							
						
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

//委托企业选择
function selectEntinfo(){
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="entInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#entname").val(entName);
					$("#entid").val(entId);
					$("#entaddress").val(address);
//					$("#projectname").val(entName);
					_dialog.dialog('close');
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

//客户选择
function selectCustom(){
	var url = rootPath + "/projects/taskregister/taskregister!toCustomListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="customInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择客户',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var customId=$("#customInfoFrame",top.document.body).contents().find("#customid").val();				
					var customName=$("#customInfoFrame",top.document.body).contents().find("#name").val();
					var customphone=$("#customInfoFrame",top.document.body).contents().find("#phone").val();
					$("#customname").val(customName);
					$("#customid").val(customId);
					$("#customphone").val(customphone);
//					$("#projectname").val(entName);
					_dialog.dialog('close');
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

//代理人选择
function selectEmployee(){
	var url = rootPath + "/projects/taskregister/taskregister!toEmployeeListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="employeeInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择代理人',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var employeeId=$("#employeeInfoFrame",top.document.body).contents().find("#employeeid").val();				
					var employeeName=$("#employeeInfoFrame",top.document.body).contents().find("#name").val();
					var employeephone=$("#employeeInfoFrame",top.document.body).contents().find("#phone").val();
					$("#employeename").val(employeeName);
					$("#employeeid").val(employeeId);
					$("#employeephone").val(employeephone);
//					$("#projectname").val(entName);
					_dialog.dialog('close');
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

//主治医生选择
function selectEmployee2(){
	var url = rootPath + "/projects/taskregister/taskregister!toEmployeeListPage.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="employeeInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择主治医生',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
					
					var employeeId=$("#employeeInfoFrame",top.document.body).contents().find("#employeeid").val();				
					var employeeName=$("#employeeInfoFrame",top.document.body).contents().find("#name").val();
					var employeephone=$("#employeeInfoFrame",top.document.body).contents().find("#phone").val();
					$("#doctorname").val(employeeName);
					$("#doctorid").val(employeeId);
					$("#doctorphone").val(employeephone);
//					$("#projectname").val(entName);
					_dialog.dialog('close');
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

function selectEntinfo2()
{
	var url = rootPath + "/projects/taskregister/taskregister!toEntpriseListPage2.action";
	var _dialog =  window.top.$('<div id ="plans-dlg" style="padding:0px;"><iframe id="monitorentInfoFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
		title:'选择企业',
		autoOpen:false,
		modal:true,
		closed:true,
		width:'950',
		height:'580',
		buttons:[{
			text:'确定',
			iconCls:'icon-save',
			handler:function(){
				$("#monitorentInfoFrame",top.document.body).contents().find("#ents").click();
				var ents = $("#monitorentInfoFrame",top.document.body).contents().find("#ents").val();
				var entnames = $("#monitorentInfoFrame",top.document.body).contents().find("#entnames").val();
//					var entId=$("#entInfoFrame",top.document.body).contents().find("#entid").val();				
//					var entName=$("#entInfoFrame",top.document.body).contents().find("#name").val();
//					var address=$("#entInfoFrame",top.document.body).contents().find("#address").val();
					$("#monitorentname").val(entnames);
					$("#monitorentid").val(ents);
//					$("#entaddress").val(address);
//					$("#projectname").val(ents);
					_dialog.dialog('close');
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

//获取监测性质
function getMonitornature(monitortypeid,reportform){		
	 $.ajax( {
		type : 'GET',
		url : rootPath+'/projects/taskregister/taskregister!getMonitorTypeMonitornature.action?timeStamp='+new Date().getTime(),
		data : {'monitortypeid' : monitortypeid},
		success : function(data) {
			$("#monitornature").val('');
			$("#monitornature").val(data);
			
			var option;
			if(data=='委托监测'){
				option = '<option value="监测报告">监测报告</option>';
			}else if(data==''){
				option = '<option value="">---请选择---</option>';
			}else{
				option = '<option value="汇总表">汇总表</option>'+
					'<option value="监测报告">监测报告</option>';
			}
			$('#reportform').html('');
			$('#reportform').append(option);
		}
	});
}


/**
 * 保存
 * @return
 */
function moditfyTask(){
	$("#MonitorForm").form('submit',{
			type : 'POST',
			url :rootPath +'/projects/taskregister/taskregister!updateyiyuan.action',
			onSubmit:function(){
				var objs = 	$("#MonitorForm").find(".grkj-validate");
				if(!saveCheck(objs)){
					$("#MonitorForm").find(":input").focus();
					alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
					return false;
				}
			},
			success : function(data) {
				if (data == 'fail') {
					alert("失败！");
					return;
				}else if (data == 'success') {
					$('#datagrid').treegrid('reload');
					alert('成功！');
//					initDataGrid();
					window.parent.location.reload();
				}
			}
	} );	
}

//删除任务
function removeTask(){
	if($("#stepcode").val()!='Register'){
		alert('该条记录已提交，不能进行删除操作！');
		$("#datagrid").datagrid("clearSelections");
		return;
	}else{
		var projectcode = $("#projectcode").val();
		//单个删除
	 	if(window.confirm('是否删除？'))
	 	{ 		
			 $.ajax( {
				type : 'POST',
				url :rootPath + "/projects/taskregister/taskregister!remove.action",
				data : {'projectcode' : projectcode},
				success : function(data) {
					if (data == 'fail') {
						alert("删除失败！");
						return;
					}else if (data == 'success'){
						alert('删除成功！');						
						$('#BasicInfoFrame').attr("src","");
//						$('#MonitorEntFrame').attr("src","");
//						$('#AppraiseOpinionFrame').attr("src","");
//						$('#WorkflowImgFrame').attr("src","");
						$('#AttachmentFrame').attr("src","");
						
						$('#projectcode').val('');
//						$('#datagrid').treegrid('reload');
//						initDataGrid();
						window.location.reload();
					}
					
				}
			});
		}
 	}
}

//进入选择项目界面
function selectItem(){
	var url = rootPath +'/projects/taskregister/taskregister!toItemPage.action?itemid='+$("#itemid").val();
	var _dialog = window.top
			.$('<div id="item-dlg"  style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-save',
			handler : function() {
					$("#itemFrame",top.document.body).contents().find("#btnGetItem").click();						
					var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
					
					$('#itemid').val(itemid);
					$('#itemname').val(itemname);
					_dialog.dialog('close');
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

//复制任务
function copyTask(){
	var projectcode = $("#projectcode").val();
 	if(window.confirm('是否复制？'))
 	{ 		
		 $.ajax( {
			type : 'POST',
			url :rootPath + "/projects/taskregister/taskregister!copy.action",
			data : {'projectcode' : projectcode},
			success : function(data) {
				if (data == 'fail') {
					alert("复制失败！");
					return;
				}
				if (data == 'success') {
					alert('复制成功！');
//					initDataGrid();
					window.location.reload();
					$('#BasicInfoFrame',parent.document).attr("src","");				
					$('#MonitorEntFrame',parent.document).attr("src","");
					$('#AppraiseOpinionFrame',parent.document).attr("src","");
					$('#WorkflowImgFrame',parent.document).attr("src","");
					$('#AttachmentFrame',parent.document).attr("src","");
					$('#projectcode').val('');
					
				}
			}
		});
	}
}

//查看任务单
function viewTaskList(){
	var projectcode = $("#projectcode").val();
	var reportname = encodeURI(encodeURI("例行监测任务计划单（监控性监测任务单）.raq"));
	var url = rootPath + "/common/report!toReportPage.action?raq="+reportname+"&projectcode="+projectcode;
	
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="frame" width="100%" height="100%" frameborder="0" scrolling="yes" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'任务计划单',
	autoOpen:false,
	modal:true,
	closed:true,
	maximizable:true,
	width:'800',
	height:'600',
	onClose:function(){
			_dialog.dialog("destroy");					
		}
	});
	_dialog.dialog('open');
}

//进入查询页面
function toSearchObj(){
	var url = rootPath + "/projects/taskregister/taskregister!toxiehuiSearchPage.action?monitortype=7";
	var _dialog =  window.top.$('<div id ="tg-dlg" style="padding:0px;"><iframe id="searchFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	_dialog.dialog({
	title:'任务查询',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'500',
	height:'250',
	buttons:[{
		text:'确定',
		iconCls:'icon-save',
		handler:function(){
				//操作列表页面的查询按钮
//				var registby = $("#searchFrame",top.document.body).contents().find("#registby").val();
//				var monitortype = $("#searchFrame",top.document.body).contents().find("#monitortype").val();
				var wtentprise = $("#searchFrame",top.document.body).contents().find("#wtentprise").val();
				var registdate1 = $("#searchFrame",top.document.body).contents().find("#registdateFirst").val();
				var registdate2 = $("#searchFrame",top.document.body).contents().find("#registdateSecond").val();
//				var projectrealcode = $("#searchFrame",top.document.body).contents().find("#projectrealcode").val();
//				var projectname = $("#searchFrame",top.document.body).contents().find("#projectname").val();
//				var projectcode = $("#searchFrame",top.document.body).contents().find("#projectcode").val();
				
				$('#datagrid').treegrid({
					queryParams : {
//						projectcode : projectcode,
//						projectrealcode : projectrealcode,
//						projectname : projectname,
//						registby : registby,
//						monitortype : monitortype,
						wtentprise : wtentprise,
						registdate1 : registdate1,
						registdate2 : registdate2
					},
					pageNumber : 1
				});
				_dialog.dialog('close');
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


//////////////////////以下是流程操作///////////////////////////
//提交
function openDialog(action){
	var projectcode = $("#projectcode").val();
	if(projectcode==''){
		alert('请选择要提交的任务！');
		return;
	}else{
		if(action=='终止'){
			var isStop =  $("#taskFrame",window.parent.body).contents().find("#isStop").val();
			
			if(isStop=='true'){
				alert('该记录已经终止！');
				$("#taskFrame",window.parent.body).contents().find("#clearSelected").click();
				return;
			}else if(isStop=='stop'){
				checkFuntion(action);	
			}else{
				alert('该记录不能终止！')
				return;
			}
		}else if(action=='提交'){
			if($('#stepcode').val()=='Register'){
				if(window.confirm('是否提交？')){
					operate(action,"0","");	
				}
			}else{
				alert("任务已经提交，请重新选择");
			}
		}
	}
}
//进入评审意见页面
function checkFuntion(action){	
	var url = rootPath + "/projects/appraiseopinion/appraiseopinion!opinionNew.action?showName="+encodeURI(encodeURI(action+"意见"))+"&projectcode="+$("#projectcode").val()+"&scode="+$('#stepcode').val();
	var _dialog =  window.top.$('	<div id ="dlg" style="padding:0px;"><iframe id="dlgFrame" width="100%" height="100%" frameborder="0" scrolling="no" src='+url+'></iframe></div>').appendTo(window.top.document.body);
	initWorkflow();
	_dialog.dialog({
	title:action+'意见',
	autoOpen:false,
	modal:true,
	closed:true,
	width:'520',
	height:'320',
	buttons:[{
		text:'确定',
		iconCls:'icon-ok',
		handler:function(){
			var userPwd = $("#dlgFrame",window.top.document).contents().find("#userPwd").val();
			var loginpwd = $("#dlgFrame",window.top.document).contents().find("#loginpwd").val();
			if(userPwd != loginpwd){
				alert("密码输入错误，请重新输入！")
				return;
			}
			var projectcode = $("#dlgFrame",window.top.document).contents().find("#projectcode").val();
			$("#dlgFrame",top.document.body).contents().find("#opinionform").form('submit',{
					
					url:rootPath +'/projects/attachment/projectattachment!save.action?projectid='+projectcode,
					onSubmit:function(){
//						var objs= $("#dlgFrame",top.document.body).contents().find(".grkj-validate");
//						if(!saveCheck(objs)){
//							$("#dlgFrame",window.parent.body).contents().find(":input").focus();
//							alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
//							return false;
//						}
					},
					success:function(data){
						if(data=='success'){
						}else if(data=='fail'){
							alert('保存失败,请查看你上传的文件是否为空！');
						}			
					},
					error:function(data){
						alert("失误");
					}
				});	
			var taskid=$("#dlgFrame",window.top.document).contents().find("#nextWorkflow").val();
			var userid = $("#dlgFrame",window.top.document).contents().find("#userid").val();
			var opinion = $("#dlgFrame",window.top.document).contents().find("#opinion").val();
			operate(action,taskid,userid,opinion);
			
			_dialog.dialog('close');
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



/**
 * 批量添加月份
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function batchSettingMonth(){
	$("#settingMonthForm input[name=month]:checkbox").each(function(){ 
		$(this).removeAttr("checked");
	});
	$("#settingMonthForm").css('display','');
	$('#settingMonthForm').dialog({
		title : '批量设置月份',
		width : 490,
		height : 180,
		closed : false,
		cache : false,
		modal : true,
		buttons : [{
			text : '保存',
			iconCls:'icon-save',
			handler : function(){
				var months = '';
				$("#settingMonthForm input[name=month]:checkbox:checked").each(function(){ 
					if(months!='') months = months + ',';
					months = months+$(this).val();
				});
//				alert(months);
				$("#monitormonth").val(months);
				$('#settingMonthForm').dialog('close');
		    }
		},{
			text : '关闭',
			iconCls:'icon-cancel',
			handler : function() {
				$('#settingMonthForm').dialog('close');
			}
		}]
	});
}

/**
 * 批量设置月份中的区间快速选择
 * @param {Object} type
 */
function setMonitorMonthByCycle(type){
	clearCheckBox();
	if(type=="one"){
		for(var i=1;i<=12;i++){
			var id="month"+i;
			$('#'+id+'')[0].checked=true;
		}
	}else if(type=="two"){
		for(var i=1;i<=6;i++){
			var id="month"+i;
			$('#'+id+'')[0].checked=true;
		}
	}else if(type=="three"){
		for(var i=7;i<=12;i++){
			var id="month"+i;
			$('#'+id+'')[0].checked=true;
		}
	}else if(type=="four"){
		for(var i=1;i<=12;i++){
			if(i%2==1){
				var id="month"+i;
				$('#'+id+'')[0].checked=true;
			}
		}
	}else if(type=="five"){
		for(var i=1;i<=12;i++){
			if(i%2==0){
				var id="month"+i;
				$('#'+id+'')[0].checked=true;
			}
		}
	}
}
//清除选中的日期
function clearCheckBox(){
	$("#settingMonthForm input[name=month]:checkbox").each(function(){ 
		$(this).removeAttr("checked");
	});
}



//进入分包选择项目界面
function selectItem1(){
	var url = rootPath +'/projects/taskregister/taskregister!toItemPage.action';
	var _dialog = window.top
			.$('<div id="item-dlg"  style="padding:0px;"><iframe id="itemFrame" width="100%" height="100%" frameborder="0" scrolling="yes" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);
	_dialog.dialog( {
		title : '项目管理',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '500',
		height : '500',
		maximizable:true,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-save',
			handler : function() {
					$("#itemFrame",top.document.body).contents().find("#btnGetItem").click();						
					var itemid = $("#itemFrame",top.document.body).contents().find("#itemid").val();
					var itemname = $("#itemFrame",top.document.body).contents().find("#itemname").val();
					$('#subitems').val(itemname);
					_dialog.dialog('close');
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
//以下操作为修改工作流
function modifyWorkflow(){
	if($('#stepcode').val()=='TaskApprove')
	{
		var _dialog =  window.top.$('<div onkeydown="PreventBSK()" id ="dlg" style="left:100px;top:180px;">'
				+'最终结果:<select id="nextWorkflow" name="nextWorkflow" class="TextBox" style="width: 50%;height:20px;">'
				+'<option value="deal">成交</option>'
				+'<option value="nodeal">未成交</option>'
				+'</select><br>'
				+'意见：<br><textarea id="opinion" name="opinion"  style="width:100%;height:60px;">'
				+'</textarea><br>'
				+'</div>').appendTo(window.top.document.body);
		
//		initWorkflow();
		_dialog.dialog({
			title:'下一步操作',
			autoOpen:false,
			modal:true,
			closed:true,
			width:'300',
			height:'200',
			buttons:[{
				text:'确定',
				iconCls:'icon-save',
				handler:function(){
					var taskid=$(window.top.document).find("#nextWorkflow").val();
					var opinion = $(window.top.document).find("#opinion").val();
	//				alert(taskid);
					operate("提交",taskid,"",opinion);
					_dialog.dialog('close');
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
	}else{
		alert("任务已经提交，请重新选择");
		return;
	}
}
function initWorkflow(){
	if(window.confirm('是否提交？')){
		var projectcode = $("#projectcode").val();
		$.ajax( {
			type : 'POST',
			url : rootPath +'/projects/taskregister/taskregister!initworkflow1.action',
			data: "status=Register&workflowcode=JC_PROJECT&projectcode="+projectcode,
			success : function(data) {
				var vData = eval("(" + data + ")");
				var lList = "";
				jQuery.each(vData, function(i, n) {
					lList += "<option value=" + n.code + ">" + n.value	+ "</option>";
				});				
	//			$('#nextWorkflow',window.top.document).html(lList);
				$('#dlgFrame',window.top.document).contents().find("#nextWorkflow").html(lList);
			}
		});
	}
}
//流程操作
function operate(action,taskid,userid,message){
	var strjson = "[{'projectcode':'"+$("#projectcode").val()+"','stepcode':'"+$("#stepcode").val()+"'}]";
	$.post(
		rootPath + "/projects/taskregister/taskregister!operateyiyuan.action",
		{json:strjson,info:action,taskid:taskid,userid:userid,opinion:message},
		function(msg){
			if(msg=="success"){
				alert("提交成功！");
				$('#datagrid').datagrid('clearSelections');
				window.location.reload();
//				$('#taskWtmonitorFrame').attr("src","");				
//				$('#taskFuzerenFrame').attr("src","");
//				$('#taskSchemeFrame').attr("src","");
//				$('#appraiseopinionFrame').attr("src","");
//				$('#taskFlowChartFrame').attr("src","");
//				$('#attachmentFrame').attr("src","");
				
				$('#projectcode').val('');
				$('#stepcode').val('');
			}else if(msg=="doctor"){
				alert("请选择主治医生！");
			}else if(msg=="item"){
				alert("请选择手术项目！");
			}
		}
	);
}

//流程操作
function operateNew(){
	var projectcode=$("#projectcode").val();
	if(projectcode==null||projectcode=='')
	{
		alert("请选择要提交的任务！");
	}else
	{
		if(window.confirm('是否提交？')){
			var strjson = "[{'projectcode':'"+$("#projectcode").val()+"','stepcode':'"+$("#stepcode").val()+"'}]";
			$.post(
				rootPath + "/projects/taskregister/taskregister!operate.action",
				{json:strjson},
				function(msg){
					if(msg=="success"){
						alert("提交成功！");
						$('#datagrid').datagrid('clearSelections');
						window.location.reload();
		//				$('#taskWtmonitorFrame').attr("src","");				
		//				$('#taskFuzerenFrame').attr("src","");
		//				$('#taskSchemeFrame').attr("src","");
		//				$('#appraiseopinionFrame').attr("src","");
		//				$('#taskFlowChartFrame').attr("src","");
		//				$('#attachmentFrame').attr("src","");
						
						$('#projectcode').val('');
						$('#stepcode').val('');
					}else if(msg=="agent"){
						alert("请选择代理人！");
					}else if(msg=="custom"){
						alert("请选择客户！");
					}else if(msg=="monitor"){
						alert("请选择提交机构！");
					}
				}
			);
		}
	}

}

function checkAuditPerson(action){
	var projectcode = $("#projectcode").val();
	if(projectcode==''){
		alert('请选择要提交的任务！');
		return;
	}else{
			$.ajax( {//判断是否计算费用
				type : 'POST',
				url : rootPath +'/projects/taskregister/projectdetail!checkFee.action?projectcode='+projectcode,
				//data: "projectcode:projectcode",
				success : function(data) {
					if(data=="success"){
						if($('#stepcode').val()=='Register'){
//							if(window.confirm('是否提交？')){
								checkFuntion(action);
							//}
						}else{
							alert("任务已经提交，请重新选择");
							return;
						}
					}else if(data == "fail"){
						alert("请先填写监测企业信息!");
					}else if(data == "nofee"){
						alert("请先计算费用信息");
					}else{
						alert("操作异常请与管理员联系");
					}
				}
			});
	}
}
function initdept(){
	$.ajax({
		type:'post',
		url:rootPath +'/departmentinfo/departmentinfo!getDeptAll.action?timeStamp='+new Date().getTime(),
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.deptid+"'>"+n.deptname+"</option>"
			});
			$("#deptid",window.top.document).html(List);	
		}
	});
}

function inituser(deptid){
	$.ajax({
		type:'post',
		url:rootPath +'/userinfo/userinfo!getUserBydept.action?timeStamp='+new Date().getTime(),
		data:{deptid:deptid},
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
			});
			window.top.document.getElementById("userid").options.length=0;
			$("#userid",window.top.document).html(List);	
		}
	});
}

function inituserList(){
	$.ajax({
		type:'post',
		url:rootPath +'/userinfo/userinfo!getUser.action?timeStamp='+new Date().getTime(),
		success:function(data){
			var vData = eval("("+data+")");
			var List = "";
			jQuery.each(vData,function(i,n){
				List +="<option value='"+n.userid+"'>"+n.realname+"</option>"
			});
			window.top.document.getElementById("userid").options.length=0;
			$("#userid",window.top.document).html(List);	
		}
	});
}
function mergeCellsByField(tableID,colList){
    var ColArray = colList.split(",");
    var tTable = $('#'+tableID);
    var TableRowCnts=tTable.datagrid("getRows").length;
    var tmpA;
    var tmpB;
    var PerTxt = "";
    var CurTxt = "";
    var alertStr = "";
    //for (j=0;j<=ColArray.length-1 ;j++ )
    for (j=ColArray.length-1;j>=0 ;j-- )
    {
        //当循环至某新的列时，变量复位。
        PerTxt="";
        tmpA=1;
        tmpB=0;
        
        //从第一行（表头为第0行）开始循环，循环至行尾(溢出一位)
        for (i=0;i<=TableRowCnts ;i++ )
        {
            if (i==TableRowCnts)
            {
                CurTxt="";
            }
            else
            {
                CurTxt=tTable.datagrid("getRows")[i][ColArray[j]];
            }
            if (PerTxt==CurTxt)
            {
                tmpA+=1;
            }
            else
            {
                tmpB+=tmpA;
                tTable.datagrid('mergeCells',{
                    index:i-tmpA,
                    field:ColArray[j],
                    rowspan:tmpA,
                    colspan:null
                });
                tmpA=1;
            }
            PerTxt=CurTxt;
        }
    }
}

//查询
function query() {
	var wtentprise = $("#wtentprise").val();//展示的名字~是用用户id去用户表查询的realname
	var registdate1 = $("#registdateFirst").val();//职务
	var registdate2 = $("#registdateSecond").val();//职务
//	var deptidnames= $("#deptidnames").val();//用户获取部门信息
	$('#datagrid').treegrid( {
		queryParams : {
		wtentprise : wtentprise,
		registdate1:registdate1,
		registdate2:registdate2
		},
		pageNumber : 1  //查询后指定页码为1
	});
}