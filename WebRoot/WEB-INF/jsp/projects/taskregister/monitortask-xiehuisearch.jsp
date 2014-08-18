<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>委托监测任务查询</title>
		<link rel="stylesheet" href="${ctx }/js/DatePicker/skin/WdatePicker.css" type="text/css" />
		<link rel="stylesheet" href="${ctx}/themes/default/easyui.css"	type="text/css"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/themes/icon.css"/>
		<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${ctx }/js/DatePicker/WdatePicker.js"></script>
		<script language="javascript">
			var rootPath="${ctx}";
		</script>
	</head>
	<body onkeydown="PreventBSK();">
				<table class="Main_Tab_Style" style="width: 100%; height: 60px">
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 100px; text-align: left">
						手术单位：
					</td>
					<td class="Main_Tab_Style_Content" colspan="3">
						<input type="text" id="wtentprise" name="wtentprise" class="TextBox" style="width: 150px" />
					</td>
				</tr>
				<tr>
					<td class="Main_Tab_Style_title"
						style="width: 70px; text-align: left">
						登记日期：
					</td>
					<td colspan="3">
						<table>
							<tr>
								<td>
									<input type="text" id="registdateFirst" name="registdateFirst" class="Wdate" 
									onFocus="showDataTimeDailog('yyyy-MM-dd')" style="width: 150px; height: 20px;" />
								</td>
								<td style="width: 40px; text-align: center">
									<font style="font-size: 12px;color:#1281bb;">至</font>
								</td>
								<td>
									<input type="text" id="registdateSecond" name="registdateSecond" class="Wdate" 
									onFocus="showDataTimeDailog('yyyy-MM-dd')"style="width: 150px; height: 20px;" />
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
	</body>
</html>
