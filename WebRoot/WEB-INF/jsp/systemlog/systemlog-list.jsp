<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>系统日志</title>
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="${ctx}themes/icon.css">
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/js/CommonCheck.js"></script>
		<link rel="stylesheet" href="${ctx}/validate/validate.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/validate/input.validate.js"></script>
		<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
		<link rel="stylesheet" href="${ctx}/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<script language="JavaScript" type="text/javascript">
			var rootPath="${ctx}";
		</script>
		<script type="text/javascript" src="${ctx}/lims/js/system.log.js"></script>
	</head>
	<body>
		<div  style="height: 30px; size: 12px">
			<div>
				<table class="Main_Tab_Style" style="width: 100%; height: 22px">
					<tr>
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							操作人：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<input type="text" id="realname" class="TextBox"
								style="width: 150px; "/>
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 80px; text-align: left">
							操作时间：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<input type="text" id="startime"  class="Wdate" onFocus="showDataTimeDailog('yyyy-MM-dd');"
								style="width: 150px;"/>
						</td>
						<td class="Main_Tab_Style_title"
							style="width: 20px; text-align: left">
							 至：
						</td>
						<td class="Main_Tab_Style_Content" style="width: 150px;">
							<input type="text" id="endtime"  class="Wdate" onFocus="showDataTimeDailog('yyyy-MM-dd');"
								style="width: 150px;"/>
						</td>
						<td class="Main_Tab_Style_Content"
							style="width: 45%; text-align: left;">
							&nbsp;<input type="button" class="Button_out" value="查询" onclick="query()"/>
						</td>
					</tr>
				</table>
				
			</div>
		</div>
		<table width="100%" class="grid" >
				<tr height="25" class="grid-header">
					<td colspan="6" style="text-align: left">
						<input type="button" value="删除" class="Button_out" onClick="delAll('')" />
						<input type="button" value="清空日志" class="Button_out" onClick="delAllData()" />
					</td>
				</tr>
		</table>
		<div  style="width: 100%;height: 655px" >
			<table id="datagrid1"></table>
		
		</div>
		
		
		
	</body>
</html>
