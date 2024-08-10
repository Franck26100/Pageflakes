<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Tester.aspx.cs" Inherits="Tester" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    <div class="flake_placeholder"><div class="flake"><div class="flake_header" onmouseover="opqTb(this)" onmouseout="alphaTb(this)" id="handle_FLAKE_ID_"><div class="flake_toolbar"><a class="refresh_icon" style="display:none;" title="Refresh Flake" id="refresh_FLAKE_ID_" onmouseover="hover(this)" onmouseout="hout(this)" onclick="$module('_FLAKE_ID_').refresh()">Refresh</a><a class="sendFlake_icon" id="sendFlake_FLAKE_ID_" onmouseover="hover(this)" onmouseout="hout(this)" onmousedown="$stopBubble(event)" onclick="$module('_FLAKE_ID_').showFlakeMenu()">Send</a><a class="settings_icon" id="editLink_FLAKE_ID_" title="Edit Flake settings" onmouseover="hover(this)" onmouseout="hout(this)" onmousedown="$stopBubble(event)" onclick="$module('_FLAKE_ID_').toggleEdit()">EDIT</a><a class="close_icon" id="closeLink_FLAKE_ID_" title="Remove Flake" onmouseover="hover(this)" onmousedown="$stopBubble(event)" onmouseout="hout(this)" onclick="$module('_FLAKE_ID_').close()" >x</a></div><div class="flake_title"><div class="flake_icon"><img OnError='$module("_FLAKE_ID_").loadDefaultFavicon("icon_FLAKE_ID_");' id="icon_FLAKE_ID_" /></div><div class="flake_name_container"><span class="flake_name" id="title_FLAKE_ID_">_FLAKE_TITLE_</span><span class="rss_number" id="number_FLAKE_ID_"></span></div></div></div><div id="editContainer_FLAKE_ID_" style="display:none" ><table class="flake_tabbar" cellspacing="0" cellpadding="0"><tr><td width="100" id="td_tab_basic_FLAKE_ID_"><div id="tab_basic_FLAKE_ID_" class="edit_tabup" onclick="$module('_FLAKE_ID_').showBasicSetting()" disable="$remove('td_tab_basic_FLAKE_ID_')" >Settings</div></td><td width="100" id="td_tab_other_FLAKE_ID_"><div id="tab_other_FLAKE_ID_" class="edit_tabdown" onclick="$module('_FLAKE_ID_').showAdvancedSetting()" disable="$remove('td_tab_other_FLAKE_ID_')" >Preferences</div>                        </td><td> >&nbsp;</td></tr></table><div class="flake_settings"><div id="editBody_FLAKE_ID_" style="padding:8px"></div><div id="editOthers_FLAKE_ID_" style="padding:8px;display:none; height:100px"><table width="100%"> <tr><td width="70">Flake title:</td><td>><input style="width:70%" type="text" id="flakeTitleEdit_FLAKE_ID_" onkeypress="if(event.keyCode==13)$module('_FLAKE_ID_').editEdit();" value="_FLAKE_TITLE_"/></td></tr><tr><td>>&nbsp;</td><td><input type="button" value="Save" onclick="$module('_FLAKE_ID_').editEdit()" class="button"/>&nbsp; &nbsp;<input type="button" onclick="$module('_FLAKE_ID_').toggleEdit()" class="button cancel" value="Cancel"/></td></tr></table></div></div></div><div class="flake_content" style="_FLAKE_COLLAPSED_" id="body_FLAKE_ID_"><div class="flake_spaceholder">Loading...</div></div><div class="flake_footer"><a id="collapseLink_FLAKE_ID_" title="Collapse Flake" class="colapse_icon" onmouseover="hover(this)" onmouseout="hout(this)" style="_FLAKE_COLLAPSED_" onclick="$module('_FLAKE_ID_').collapse()">-</a><a id="expandLink_FLAKE_ID_" class="expand_icon" title="Expand Flake" style="_FLAKE_EXPANDED_" onmouseover="hover(this)" onmouseout="hout(this)" onclick="$module('_FLAKE_ID_').expand()">+</a></div></div></div>








    <div class="flake_placeholder"><div class="flake"><div class="flake_header" id="Div1" onmouseover="opqTb(this)" onmouseout="alphaTb(this)"><div class="flake_toolbar"><div class="close_icon" id="Div2" onmouseover="hover(this)" onmouseout="hout(this)">x</div></div><div class="flake_title"><span class="flake_icon"><img src="images/pficon.gif" id="Img1" /></span><span class="flake_name flake_name_popup" id="Span1">_FLAKE_TITLE_</span></div></div><div class="popup_content" id="Div3">Loading...</div><div class="flake_footer"></div></div></div>






    </div>
    </form>
</body>
</html>
