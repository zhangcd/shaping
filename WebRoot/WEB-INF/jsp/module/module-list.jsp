<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
    <title>模块管理</title>
		<link rel="stylesheet" href="${ctx }/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/validate/validate.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript">	
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/module.js"></script>
	<style type="text/css">
		a{text-decoration:none;}
	</style>
  </head>
  
<body>
	
	<span id="msg"></span>
	<table class="Main_Tab_Style" style="width: 100%; height: 22px">
		<tr>
			<td class="Main_Tab_Style_title" style="width: 10%;">模块名称:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="modulename" id="modulename" class="TextBox" style="width:150px;"/>
			</td>
			<td class="Main_Tab_Style_title" style="width: 10%;">模块类型:</td>
			<td class="Main_Tab_Style_Content" style="width: 15%;">	
				<input type="text" name="moduletype" id="moduletype" class="TextBox" style="width:150px;"/>
			</td>					
			<td>
				<input type="button" value="查询"  class="Button_out" onclick="searchObj()"/>
			</td>						
		</tr>
	</table>
	<div class="grid-headerSpace">
		<input type="button" value="添加" class="Button_out" onClick="editModule('')" />
	</div>

	<div style="width: 100%; height: 650px;">
		<table id="datagrid" width="100%"></table>
	</div>

  </body>
</html>
