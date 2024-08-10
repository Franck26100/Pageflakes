<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CacheCss.aspx.cs" Inherits="CacheCss" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <style>
        a
{
    text-decoration:none;
    color:Navy;
}
a.regular
{
    color:Navy;
    text-decoration:none;
}
body 
{
    background:url(./App_Themes/Purple_Unified/background.gif) repeat;
    margin:0;
    font:8pt Tahoma,Arial,Helvetica;
    height:auto;
    width:100%;
}
form
{
    padding:0;
    margin:0;
}
input
{
    padding-right:3px;
    padding-left:3px;
    padding-bottom:1px;
    font:8pt Tahoma,Arial, Helvetica;
    padding-top:1px;
}
input.button2
{
    margin:10px 0px 0px 84px;
    width:100%;
}
input.textfield
{
    float:left;
    margin:5px 0px 0px 5px;
    width:150px;
}
p
{
    padding:5px 0 5px 0;
    line-height:150%;
    margin:0;
}
#body
{
    clear:both;
    padding-right:5px;
    padding-left:5px;
    min-height:600px;
    padding-bottom:5px;
    padding-top:5px;
}
#body a:hover
{
    color:#F63;
}
#ColumnLayout
{
    width:400px;
}
#CommunityButton
{
    font-size:12px;
    z-index:1000;
    float:right;
    background-image:url(App_Themes/common/newcommunitybutton_flat.png);
    margin-left:5px;
    text-transform:uppercase;
    width:94px;
    cursor:pointer;
    text-indent:-10000px;
    background-repeat:no-repeat;
    position:absolute;
    top:60px;
    height:24;
}
#container 
{ 
    margin:0pt auto; 
    text-align:left;
    padding-left:0px;
}
#domainSearchContainer
{
    float:right;
    margin:-6px 50px 0px 0px;
    padding-top:15px;
}
#errorMsg
{
    display:block;
    padding-left:26px;
    background:url(App_Themes/common/InfoIcon.gif) no-repeat 2px 50%;
}
#gray_panel
{
    clear:both;
    padding-left:3px;
    background:#dadada;
    padding-bottom:2px;
    overflow:hidden;
    border-bottom:#b3b3b3 1px solid;
    height:5px;
    text-align:right;
}
#gray_panel_dropdown_settings
{
    border-top:#fff 1px solid;
    background:#54585c url(App_Themes/Purple_Unified/SettingsLeftBg.png) repeat-x;
    color:#ddd;
    border-bottom:#b3b3b3 1px solid;
    font-family:Tahoma;
    height:auto;
}
#gray_panel_dropdown_settings .settingsLeftMenuHr hr
{
    border-top:#999 1px dashed;
    border-left-width:0px;
    border-bottom-width:0px;
    border-right-width:0px;
}
#gray_panel_table
{
    clear:left;
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:0px;
    width:100%;
    padding-top:0px;
}
#gray_panel_table_outside_left
{
    padding-right:15px;
    padding-left:15px;
    padding-bottom:0px;
    margin:20px;
    width:20%;
    padding-top:0px;
}
#gray_panel_table_outside_right
{
    padding-right:15px;
    padding-left:0px;
    padding-bottom:0px;
    margin:20px;
    width:20%;
    padding-top:0px;
}
#gray_panel_table_inside
{
    padding-right:15px;
    padding-left:0px;
    padding-bottom:0px;
    width:20%;
    padding-top:0px;
}
#gray_panel_table_none
{
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:20px;
    width:20%;
    padding-bottom:0px;
}
#gray_panel_table tr
{
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:0px;
    padding-top:0px;
}
#gray_panel_table a
{
    padding-right:0px;
    display:block;
    padding-left:30px;
    padding-bottom:2px;
    font:8pt Tahoma,Arial,Helvetica;
    overflow:hidden;
    color:#000;
    padding-top:2px;
    height:14px;
    text-decoration:none;
    background:url(App_Themes/Purple_Unified/rss.gif) no-repeat 3px 50%;
}
#gray_panel_table a:hover
{
    background:#ccc url(App_Themes/Purple_Unified/rss.gif) no-repeat 3px 50%;
}
#header 
{
    background:url(App_Themes/Purple_Unified/s.png) no-repeat top left; 
    margin:0px;
    color:#fff;
    height:auto;
    position:relative; 
}
#header .Start_down
{
    /*background-image:none;*/
    background:url(App_Themes/Purple_Unified/s.png) no-repeat -295px -80px;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="App_Theme/Purple_Unified/addFlakeCommonDownM.png",sizingMethod="crop");}

#header #header_extra
{
    padding-right:5px;
    padding-left:10px;
    padding-bottom:0px;
    margin:0px;
    padding-top:5px;
    height:auto;
    /*position:relative;*/
    background:url(App_Themes/Purple_Unified/s.png) no-repeat top right;
}
#headerLeft
{
    padding-right:0px;
    padding-left:0px;
    float:left;
    padding-bottom:0px;
    margin:0px;
    padding-top:0px;
    height:50px;
}
#headerRight
{
    padding-right:0px;
    padding-left:0px;
    right:0px;
    padding-bottom:0px;
    margin:0px;
    padding-top:0px;
    top:5px;
}
#HideThisMessageLink
{
    float:right;
    text-align:right;
}
#left_scroll
{
    z-index:10;
    position:relative;
    margin-top:2px;
    text-indent:-5000px;
    width:18px;
}
#messageBar
{
    border-right:#fb1 1px solid;
    padding-right:5px;
    border-top:#fb1 1px solid;
    padding-left:5px;
    font-size:10pt;
    padding-bottom:5px;
    margin:10px;
    border-left:#fb1 1px solid;
    padding-top:5px;
    border-bottom:#fb1 1px solid;
    font-family:Tahoma,Arial,Helvetica;
    background-color:#fe8;
}
#OnsiteFlakeCategoryList .onsite_gallery_table_inside {
	padding: 0;
}
#OnsiteFlakeCategoryList .onsite_gallery_table_inside a {
	font-size: 9pt;
	height: 14px;
	background-image: none;
	padding: 4px 5px 4px 14px;
	color: #DDD;
}
#OnsiteFlakeCategoryList .onsite_gallery_table_inside a:hover {
	background-image: none;
	background-color: #7D8083;
}
#PageFlakesTV
{
    top:50px;
}
#PageLoadProgress
{
    background:url(App_Themes/common/s.gif) no-repeat 0px 0px;
    left:50%;
    margin-left:-110px;
    width:220px;
    position:absolute;
    top:200px;
    height:19px;
}
#PageSettings {
	padding-left: 10px;
	padding-right: 10px;
}
#PageSettingsContainer {
	height: auto;
	width: 100%;
}

#PageSettingsGrid hr
{
    border-top:#999 1px solid;
    border-left-width:0px;
    border-bottom-width:0px;
    border-right-width:0px;
}
#right_scroll
{
    z-index:10;
    position:relative;
    text-indent:-5000px;
    margin:2px 0px 0px 3px;
    width:18px;
}
#SettingsContainer
{
    border-right:#333 5px solid;
    padding-right:20px;
    border-top:#333 5px solid;
    padding-left:20px;
    background:white;
    padding-bottom:20px;
    border-left:#333 5px solid;
    width:450px;
    padding-top:20px;
    border-bottom:#333 5px solid;
}

.settingsLeftMenuHr div
{
    background:url(App_Themes/Purple_Unified/SettingsLnkSep.gif) repeat-x;
    height:1px;
}
#settingsLeftMenuUL
{
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:0px;
    padding-top:0px;
    list-style-type:none;
}
#settingsLeftMenuUL .settingsLeftMenu a
{
    padding-right:5px;
    display:block;
    padding-left:14px;
    font-size:9pt;
    padding-bottom:2px;
    color:#ddd;
    padding-top:2px;
}
#settingsLeftMenuUL .settingsLeftMenu a:hover
{
    background-color:#7d8083;
}
#settingsLeftMenuUL .settingsLeftMenu .a_hover
{
    background-color:#999;
}
#SettingsLeftMenuTD
{
    border-right:#999 1px solid;
    width:140px;
}
#SettingsMidMenuTD
{
    border-right:#999 1px solid;
    background:url(App_Themes/Purple_Unified/SettingsMidBg.jpg) #65696d repeat-x;
    vertical-align:top;
    width:140px;
}
#SettingsRightMenuTD
{
    background:url(App_Themes/Purple_Unified/SettingsRightBg.jpg) #74777a repeat-x;
    border-left:#333 1px solid;
}
#SettingsTable
{
    margin-top: -1px;
    background:url(App_Themes/Purple_Unified/SettingsLeftBg.jpg) #54585c repeat-x;
    width:100%;
}
#Start
{
    padding-left:2px;
    top:-5px;
    /*background-image:none;*/
    background:url(App_Themes/Purple_Unified/s.png) no-repeat -200px -80px;
    float:right;
    width:93px;
    height:94px;
    position:absolute;
    right:10px;
    top:-5px;
    cursor:hand;
    cursor:pointer;
    z-index:1000;
    padding-left:2px;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="App_Theme/Purple_Unified/addFlakeCommonM.png",sizingMethod="crop");
    /*background-image:none;*/
}
#StartAnimation {
	position: absolute;
	z-index: 1001;
	cursor: pointer;
}
#StartFlashAnim
{
    left:1px;
    position:relative;
    top:-1px;
}
#tabs_container
{
    position:relative;
    width:231px;
    left:0px;
}
#tabs_container_td
{
    width:100%;
}
#tabs_container_scroll
{
    float:left;
    overflow:hidden;
    position:relative;
    height:20px;
}
#tabs_container .tabs .page_tab_over,.page_tab_hover
{
    background:lightyellow;
}
.AddFeedButton_off
{
    display:none;
    position:absolute;
    text-indent:-10000px;
}
.add_Page
{
    float:left;
    margin:0px 1px 0px 0px;
    list-style-type:none;
    padding-bottom:3px;
    padding-left:6px;
    padding-right:8px;
    padding-top:2px;
    white-space:nowrap;
    /*background:none transparent scroll repeat 0% 0%; voir pour reactiver plus tard */
    height:14px;
    color:White;
}
.box h1
{
    font-size:18px;
    margin:0px 0px 10px;
    border-top-style:none;
    border-right-style:none;
    border-left-style:none;
    border-bottom-style:none;
}
.bold120
{
    padding-right:5px;
    padding-left:0px;
    font-weight:bold;
    font-size:10pt;
    float:left;
    padding-bottom:5px;
    color:#ddd;
    padding-top:5px;
}
.alerts
{
    background-color:#8283c3;
    clear:both;
    padding-right:0px;
    padding-left:0px;
    padding-bottom:5px;
    width:100%;
    padding-top:5px;
}
.alertsMessages
{
    padding-right:5px;
    padding-left:10px;
    padding-bottom:9px;
    color:#fff;
    padding-top:5px;
}
.box
{
    padding-right:10px;
    padding-left:10px;
    padding-bottom:10px;
    margin:10px;
    overflow:visible;
    padding-top:10px;   
}
.clear
{
    clear:both;
}
.close_icon
{
    background:url(App_Themes/common/s.gif) no-repeat 0px -260px;
    float:left;
    width:9px;
    cursor:pointer;
    text-indent:-2000px;
    height:18px;
}
.colapse_icon
{
    display:block;
    background:url(App_Themes/common/flake/colapse.gif) no-repeat 50% 1px;
    margin:0px auto;
    overflow:hidden;
    cursor:pointer;
    text-indent:-2000px;
    height:6px;
}
    
.column
{
    padding:5px;
    vertical-align:top;
}
.container 
{	
    border-right: #333 5px solid;	
    border-top: #333 5px solid;	
    background: white;
    border-left: #333 5px solid;
    width: 445px;
    border-bottom: #333 5px solid
}
.contentPanel
{
    padding-right:11px;
    border-top:#e2e2ee 1px solid;
    padding-left:11px;
    background:#ebeef7;
    padding-bottom:5px;
    padding-top:11px;
    border-bottom:#e2e2ee 1px solid;
}
.delete_page
{
    background:url(App_Themes/Purple_Unified/s.gif) no-repeat 0px -100px;
    filter:alpha(opacity=50);
    float:left;
    margin-left:0px;
    width:9px;
    cursor:pointer;
    text-indent:-10000px;
    height:17px;
    -moz-opacity:.5;
    opacity:.5;
}
.delete_page_hover
{
    background-position:0px -130px;
}
.downloadInProgress
{
    vertical-align:middle;
    width:99%;
    line-height:198px;
    height:198px;
    text-align:center;
}
.errortext
{
    font-size:8pt;
    color:Red;
}
.expand_icon
{
    display:block;
    background:url(App_Themes/common/flake/expand.gif) no-repeat 50% 1px;
    margin:0px auto;
    overflow:hidden;
    width:100%;
    cursor:pointer;
    text-indent:-2000px;
    height:6px;
}
.FlakeGridSep
{
    overflow:hidden;
    height:1px;
    background-color:#fff;
}
.FlakeGridTitleSep
{
    margin:4px 0px;
}
.flake
{
    border-right:#ccc 1px solid;
    border-top:#ccc 1px solid;
    border-left:#ccc 1px solid;
    border-bottom:#ccc 1px solid;
}
.flake_content
{
    padding-right:8px;
    padding-left:8px;
    background:#fff;
    padding-bottom:8px;
    font:8pt/150% Tahoma,Arial,Helvetica;
    overflow:hidden;
    padding-top:8px;
    border-bottom:#b3b3b3 1px solid;
}
.flake_footer
{
    clear:both;
    border-top:#ededed 1px solid;
    background:#dadada;
    height:6px;
}
.flake_header
{
    background:url(App_Themes/common/s.gif) repeat-x 0px -320px;
    overflow:hidden;
    cursor:move;
    border-bottom:#b3b3b3 1px solid;
    height:22px;
    moz-user-select:none;
    khtml-user-select:none;
    user-select:none;
}
.flake_icon
{
    padding-right:0px;
    padding-left:2px;
    float:left;
    padding-bottom:5px;
    margin-left:5px;
    vertical-align:middle;
    overflow:hidden;
    width:16px;
    padding-top:3px;
    height:16px;
}
.flake_name
{
    padding-right:0px;
    padding-left:0px;
    float:left;
    padding-bottom:0px;
    margin-left:5px;
    line-height:200%;
    padding-top:0px;
    height:25px;
}
.flake_name_container
{
    line-height:200%;
    height:25px;
}
.flake_placeholder
{
    padding-right:4px;
    padding-left:4px;
    background:#ececec;
    margin-bottom:5px;
    padding-bottom:4px;
    padding-top:4px;
}
.flake_title
{
    moz-user-select:none;
    khtml-user-select:none;
    user-select:none;
}
.flake_toolbar
{
    padding-right:1px;
    padding-left:0px;
    right:0px;
    filter:alpha(opacity=20);
    float:right;
    padding-bottom:0px;
    padding-top:1px;
    moz-opacity:.2;
    opacity:.2;
}
.flake_toolbar_hover
{
    -moz-opacity:1;
    opacity:1;
    filter:alpha(opacity=100);
}
.footer
{
    width:650px;
}
.footer_block
{
    float:left;
    margin:7px 0px 0px 20px;
    width:150px;
    padding-top:11px;
}
.footer_wrapper
{
    clear:both;
    background:#eee repeat-x top left;
    padding-bottom:20px;
    list-style-type:none;
    text-align:center;
    padding-top:24px;
    margin:6px 0px 0px;
    font:10px/12px Verdana,Arial,Helvetica,sans-serif;
    width:100%;
}
.header
{
    background-color:#7274b0;
    height:70px;
    background:#32489A url(App_Themes/Purple_Unified/PageFlakes.gif) no-repeat;
}
.hidden
{
    visibility:hidden;
}
.InProductLink
{
    color:Blue;
}
.layout
{
    border-right:0px;
    table-layout:fixed;
    padding-right:0px;
    border-top:0px;
    margin-top:10px;
    padding-left:0px;
    padding-bottom:0px;
    border-left:0px;
    padding-top:0px;
    border-bottom:0px;
    border-collapse:collapse;
}
.layout tr td
{
    border-right:gray 1px solid;
    padding-right:0px;
    border-top:gray 1px solid;
    padding-left:0px;
    padding-bottom:0px;
    width:60px;
    padding-top:0px;
    border-bottom:gray 1px solid;
    text-align:left;
}
.LayoutPreviewTable
{
    border-right:gray 1px solid;
    padding-right:0px;
    border-top:gray 1px solid;
    padding-left:0px;
    padding-bottom:0px;
    border-left:gray 1px solid;
    width:60px;
    padding-top:0px;
    border-bottom:gray 1px solid;
}
.layoutPreviewTable tr td
{
    padding-right:3px;
    background-color:#b8b8b8;
}
.loginfield
{
    font-size:12px;
    float:left;
    margin-bottom:1px;
    width:320px;
    color:White;
}
.logo
{
    background:url(App_Themes/Purple_Unified/Pageflakes-Logo.pnd) no-repeat;
    float:left;
    margin:3px 7px 8px;
    width:167px;
    cursor:hand;
    cursor:pointer;
    height:39px;
}
.logo_box
{
    background:url(App_Themes/Purple_Unified/123_logo_bg.gif) no-repeat top right;
}
.menu
{
    clear:right;
    padding-right:10px;
    padding-left:0px;
    background:5px 50%;
    float:right;
    padding-bottom:0;
    margin:7px 50px 0px 0px;
    padding-top:0px;
    white-space:nowrap;
}
.menu *
{
    color:#ffffff;
    font:#ffffff;
}
.menu a
{
    color:#252e5e;
    float:left;
    font-weight:bold;
    text-decoration:none;
}
.menu li
{
    float:left;
    margin:0px;
    white-space:nowrap;
    list-style-type:none;
}
.nodisplay
{
    display:none;
}
.OnsiteButtonContainer
{
    display:inline;
    cursor:pointer;
}
.OnsiteBtnLeft
{
    background:url(App_Themes/Purple_Unified/YellowButtonStartMenuLeft.gif) no-repeat;
    float:left;
    cursor:hand;
    height:28px;
}
.OnsiteBtnRight
{
    height:28px;
}
.OnsiteBtnTbl
{
    cursor:pointer;
    position:relative;
    height:28px;
}
.OnsiteBtnTbl a
{
    text-decoration:none;
}
.OnsiteFlakeGrid .onsite_gallery_table_inside
{
    height:12px;
}
.OnsiteFlakeGrid .onsite_gallery_table_inside a
{
    padding-right:5px;
    background-position:3px 2px;
    padding-left:25px;
    padding-bottom:3px;
    padding-top:2px;
}
.OnsiteFlakeGrid .onsite_gallery_table_inside a div
{
    padding-right:20px;
    background:no-repeat right 50%;
}
.OnsiteGalleryBtn
{
    padding-right:0px;
    padding-left:0px;
    font-weight:bold;
    font-size:9pt;
    background:url(App_Themes/Purple_Unified/YellowButtonStartMenuMiddle.gif) repeat-x 50% top;
    padding-bottom:8px;
    margin:0px 15px;
    color:#000;
    padding-top:6px;
    position:relative;
    top:6px;
    height:28px;
}
.onsiteTopFlakesTd
{
    width:20%;
}
.Onsite_Gallery_table
{
    clear:left;
    padding-right:0px;
    padding-left:0px;
    padding-bottom:5px;
    margin:0px;
    width:100%;
    padding-top:5px;
}
.Onsite_Gallery_table tr
{
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:0px;
    padding-top:0px;
}
.onsite_gallery_table_inside
{
    vertical-align:top;
    width:19%;
}
onsite_gallery_table_inside a div
{
    line-height:14px;
}
.page_table
{
    table-layout:fixed;
    border-collapse:collapse;
    min-height:400px;
}
 .page_tab
 {
     background:#E6E6E6 url(App_Themes/Purple_Unified/s.png) no repeat -480px -80px;
 }
 .page_tab_off
 {
     background:#2B3566 none;
     color:#afafff;
     cursor:hand;
     cursor:pointer;
     padding-right:8px;
 }
 .page_tab,.page_tab_hover,.page_tab_over,.page_tab_off
 {
     color:#595959;
     margin:0;
     height:19px;
     padding:1px 1px 0 6px;
     -moz-user-select:none;
     -khtml-user-select:none;
     user-select:none;
 }
 .page_title
 {
     float:left;
     padding-top:2px;
     white-space:nowrap;
 }
 .partnerlogo
 {
     float:left;
     width:1px;
     height:37px;
 }
 .popup
 {
     z-index:60000;
     width:450px;
     position:absolute;
 }
 .pushdown
 {
     clear:both;
     padding-right:0px;
     padding-left:0px;
     padding-bottom:0px;
     overflow:hidden;
     line-height:0;
     padding-top:0px;
     height:0px;
 }
 .refresh_icon
 {
     background:url(App_Themes/common/flake/refresh.gif) no-repeat 1px 1px;
     float:left;
     margin:2px 1px 0px 0px;
     width:17px;
     cursor:pointer;
     text-indent:-2000px;
     height:15px;
 }
 .rss_number
 {
     display:block;
     float:left;
     visibility:hidden;
     margin:4px 0px 0px 3px;
     font:8pt Tahoma,Arial;
     overflow:visible;
     width:20px;
     color:#999;
     text-align:center;
 }
 .sendFlake_icon
 {
     background:url(App_Themes/common/s.gif) no-repeat 0px -278px;
     float:left;
     margin:2px 1px 0px 0px;
     width:20px;
     cursor:pointer;
     text-indent:-2000px;
     height:13px;
 }
 sendFlakeOptions
 {
     padding-right:6px;
     padding-left:6px;
     padding-bottom:3px;
     cursor:pointer;
     color:#2a2a2a;
     padding-top:3px;
 }
 sendFlakeOptionsContainer
 {
     border-right:#999 1px solid;
     padding-right:0px;
     border-top:#999 1px solid;
     display:none;
     padding-left:0px;
     background:#fff;
     padding-bottom:3px;
     border-left:#999 1px solid;
     width:120px;
     padding-top:3px;
     border-bottom:#999 1px solid;
     position:absolute;
 }
 .settings_icon
 {
     background:url(App_Themes/common/s.gif) no-repeat 1px -158px;
     float:left;
     margin:2px 3px 0px 0px;
     width:24px;
     cursor:pointer;
     text-indent:-2000px;
     height:15px;
 }
 .settings_icon_open
 {
     background:url(App_Themes/common/flake/settings.gif) no-repeat 1px -13px;
     margin:2px 3px 0px 0px;
     width:54px;
     text-indent:-2000px;
     height:15px;
 }
 .settingsCategoryName
 {
     font-weight:bold;
     padding-bottom:3px;
 }
.sendFlakeOptions
{
    padding-right:6px;
    padding-left:6px;
    background:#fff;
    padding-bottom:3px;
    cursor:pointer;
    color:#2a2a2a;
    padding-top:3px;
}
.sendFlakeOptionsContainer
{
    border-right:#999 1px solid;
    padding-right:0px;
    border-top:#999 1px solid;
    display:none;
    padding-left:0px;
    background:#fff;
    padding-bottom:3px;
    border-left:#999 1px solid;
    width:120px;
    padding-top:3px;
    border-bottom:#999 1px solid;
    position:absolute;
}   
.settingsLeftMenuHr
{
    padding-right:10px;
    padding-left:10px;
    padding-bottom:10px;
    padding-top:10px;
}
.settingsRightMenuTD
{
    padding-right:14px;
    padding-left:14px;
    padding-bottom:14px;
    padding-top:14px;
}
.SettingsRightMenuTD A 
{	
    color: #eee;
}
.slogan
{
    font-size:13.5pt;
    padding-bottom:15px;
    font-face:Tahoma;
}    
.StartPanelHeader .button
{
    padding-right:3px;
    padding-left:3px;
    padding-bottom:3px;
    padding-top:3px;
}
.StartPanelHeader .cancel
{
    float:right;
}
.Start_Wizard_Back
{
    font-weight:bold;
    font-size:120%;
    float:right;
    margin:25px 20px 0px 0px;
 }   
.T12
{
    width:100%;
    display:block;
}
.tab_container
{
    width:98%;
    position:relative;
}
.tab_container_header
{
    overflow:hidden;
    position:relative;
    float:left;
    width:68%;
}
.tabs
{
    padding-right:0px;
    padding-left:0px;
    background:5px 50%;
    padding-bottom:0px;
    margin:0px;
    font:11px Verdana,sans-serif,Tahoma,Arial,Helvetica;
    width:auto;
    cursor:pointer;
    padding-top:0px;
}
.tabs li
{
    float:left;
    margin:0px 1px 0px 0px;
    list-style-type:none;
}
.tabs li a
{
    display:block;
    float:left;
}
.tabs div
{
    float:left;
}
.textbox
{
    border-right:#7f9db9 1px solid;
    border-top:#7f9db9 1px solid;
    border-bottom:#7f9db9 1px solid;
    width:170px;
    border-bottom:#7f9db9 1px solid;
    height:13px;
}
.textlabel
{
    font-weight:bold;
    font-size:8pt;
    font-face:Tahoma;
}
ul.tabs
{
    list-style-type:none;
    margin:0px;
    padding:0px;
    width:5000px;
}
ul.footer_block
{
    padding-right:0px;
    padding-left:0px;
    padding-bottom:0px;
    margin:0px auto;
    padding-top:0px;
    list-style-type:none;
}
    </style>
</body>

</html>
