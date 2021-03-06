$(document).ready(function() {
	initDataGrid();
});
// 页面加载，数据的展示~~datagrid~~
function initDataGrid() {
	$('#spotrecordconfiggrid')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						collapsible : true,
						url : 'spotrecordconfig!toList.action',
						onLoadSuccess:function(data){
							if(data.rows.length>0){
								setTimeout("mergeCellsByField(\"spotrecordconfiggrid\",\"monitorpointtypename\")",1)
							}
						},
						sortName : 'monitorpointtypename',
						sortOrder : 'asc',
						remoteSort : false,
						fit : true,
						fitColumns : true,
						scrollbarSize : 0,
						pageSize : 20,
						pageList : [ 20, 30, 40, 50 ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true,align:'center'
						} ] ],
						columns : [ [
								{
									field : 'monitorpointtypename',
									title : '监测点类型',
									width : 180,
									align : 'center'
								},
								{
									field : 'paramname',
									title : '记录参数',
									width : 200,
									align : 'center'
								},
								{
									field : 'unitname',
									title : '计量单位',
									width : 70,
									align : 'center'
								},
								{
									field : 'sign',
									title : '符号',
									width : 70,
									align : 'center'
								},
								{
									field : 'maxvalue',
									title : '最大有效值',
									width : 70,
									align : 'center'
								},
								{
									field : 'minvalue',
									title : '最小有效值',
									width : 70,
									align : 'center'
								},
								{
									field : 'option',
									title : '操作',
									width : 80,
									align : 'center',
									formatter : function(value, rec,rowIndex) {
										var links = '<img src="'
												+ rootPath
												+ '/themes/default/images/bianjiimage.png" id="btnshow" onclick="addWin(\''
												+ rec.id
												+ '\')" alt="编辑"/>&nbsp;&nbsp;';
										links += '<img src="'
												+ rootPath
												+ '/themes/default/images/deleteimage.png" id="btnshow" onclick="del(\''+rec.id+ '\',\''+ rowIndex+'\')" alt="删除"/>&nbsp;&nbsp;';
										return links;
									}
								} ] ],
						pagination : true,
						rownumbers : true
					});
	$(window).resize(function() {
		$("#spotrecordconfiggrid").datagrid('resize');
	});

}


//合并监测点名字的相同列
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
// 修改
function addWin(id) {
	$('#spotrecordconfiggrid').datagrid('clearSelections');
	var url = rootPath + "/spot/spotrecord/spotrecordconfig!input.action";
	if (id != "") {
		url = url + "?id=" + id;
	}
	var _dialog = window.top.$('<div id ="role-dlg" style="padding:0px;"><iframe id="spotrecordConfigForm" width="100%" height="100%" frameborder="0" scrolling="no" src=' + url + '></iframe></div>')
			.appendTo(window.top.document.body);

	_dialog.dialog( {
		title : '现场记录参数编辑',
		autoOpen : false,
		modal : true,
		closed : true,
		width : '900',
		height : '300',
		buttons : [
				{
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
						$("#spotrecordConfigForm",top.document.body).contents().find("#spotrecordConfigForm").form('submit', {
							url : rootPath + "/spot/spotrecord/spotrecordconfig!save.action",
							onSubmit : function() {
									var objs= $("#spotrecordConfigForm",top.document.body).contents().find(".grkj-validate");
									if(!saveCheck(objs)){
										$("#spotrecordConfigForm",top.document.body).contents().find(":input").focus();
										alert("数据输入不符合格式，请查看红色边框的输入框的输入提示！");
										return false;
									}
							},
							success : function(data) {
								if (data == 'success') {
									_dialog.dialog('close');
									alert("保存成功！");
									$("#spotrecordconfiggrid").datagrid('reload');
								} else if(data == 'faild'){
									alert("保存失败");
								}else if(data == 'exist'){
									alert("当前监测点类型的参数名字已经存在，请重新填写！");
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
//单条删除
function del(uid,row) {
	$('#spotrecordconfiggrid').datagrid('clearSelections');
	$('#spotrecordconfiggrid').datagrid('selectRow',row);
	if (window.confirm('是否删除？')) {
		$.post(rootPath + "/spot/spotrecord/spotrecordconfig!betchDeleteMethod.action", {
			id : uid
		}, function(del) {

			if (del == 'success') {
				alert("删除成功！");
				$("#spotrecordconfiggrid").datagrid('reload');
			}else{
				alert("删除失败！");
			}
		});
	}
} 

//删除功能~批量
function delAll() {
	var selected = $('#spotrecordconfiggrid').datagrid('getSelections');
	if (selected != null && selected != "") {
		if (window.confirm("是否删除？")) {
			var selcheck = new Array();
			for ( var i = 0; i < selected.length; i++) {
				selcheck[i] = selected[i].id;
			}
			$.post(rootPath + "/spot/spotrecord/spotrecordconfig!betchDeleteMethod.action?id="
					+ selcheck, function(del) {
				if (del == 'success') {
					alert("删除成功!");
					$("#spotrecordconfiggrid").datagrid('reload');
				}else{
					alert("删除失败!");
					$("#spotrecordconfiggrid").datagrid('reload');
				}
			});
		}
	} else {
		alert('请至少选择一条记录！');
		return;
	}

}

//查询
function query() {

	var monitorpointtypeid = $("#monitorpointtypeid").val();//监测点类型
	
	$('#spotrecordconfiggrid').datagrid( {
		queryParams : {
		monitorpointtypeid : monitorpointtypeid
		},
		pageNumber : 1  //查询后指定页码为1
	});
}
