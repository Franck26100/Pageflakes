<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageFinal_Dev.master" AutoEventWireup="true" CodeFile="DefaultDevFinal.aspx.cs" Inherits="Pageflakes.DefaultDevFinal" %>


<asp:Content ID="ThemeLink" ContentPlaceHolderID="head" Runat="Server">
    <link id="pagetheme_T12" href="<%= ResolveUrl("~/p.axd?i=12&v=213&h=http:\\10.0.0.1")%>" rel="stylesheet" type="text/css"/>
   <title="Pageflakes"></title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Head_Page_Script" Runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Head_Page_Theme" Runat="Server">
</asp:Content>
<asp:Content ID="Body" ContentPlaceHolderID="ContentPlaceBody" Runat="Server">
    <div id="public_page_tab_placeholder">
        <div id="pagecast_invite_panel" style="DISPLAY: none">
<div style="PADDING-RIGHT: 7px; DISPLAY: inline"><strong>Pagecast URL:</strong> <input id="pIUrl" style="BORDER-RIGHT: #b3b3b3 1px solid; BORDER-TOP: #b3b3b3 1px solid; BACKGROUND: #dadada; BORDER-LEFT: #b3b3b3 1px solid; WIDTH: 250px; BORDER-BOTTOM: #b3b3b3 1px solid" onfocus="this.select()" readonly> </div>
<div style="DISPLAY: inline; PADDING-LEFT: 8px; BORDER-LEFT: #b3b3b3 1px solid"><strong>Invite People:</strong> <input id="pIEmail" style="WIDTH: 300px">&nbsp;<input class="button" id="pIButton" style="MARGIN-TOP: 1px; CURSOR: pointer" type="button" value="Send Link"> &nbsp; <a id="pIImportAddress" style="FONT-SIZE: 7pt; CURSOR: pointer">Import addresses</a> 
<div id="pISendInProgress" style="DISPLAY: none; MARGIN-LEFT: -10px; POSITION: absolute">
<div id="pISending" style="DISPLAY: inline">
<table style="MARGIN-TOP: 2px; MARGIN-LEFT: 0px">
<tbody>
<tr>
<td><span class="ajax_indicator"></span><!--<img src="indicator.gif" alt="send" />--></td>
<td>&nbsp;Sending...</td></tr></tbody></table></div>
<div id="pISent" style="DISPLAY: none">
<table style="MARGIN-TOP: 2px; MARGIN-LEFT: 0px">
<tbody>
<tr>
<td>Sent!</td></tr></tbody></table></div></div><!-- trick to hold the items togher -->
<input style="MARGIN-TOP: 1px; VISIBILITY: hidden; WIDTH: 0px" type="button"> </div></div></div>


        </div>      
</asp:Content>
<asp:Content id="Public_Page" ContentPlaceHolderID="PlaceHolder_PublicPage" Runat="Server">
    <div id="publicPageHeaderContainer" style="display: none;">
        <div id="publicPageHeader"><!--<td class="headerlogo"><div class="hLogo" id="PUBLIC_HEADER_IMG_HOME"><img src="http://www.pageflakes.com/App_Themes/common/PublicPageHeader/hlogo.png" border="0" alt="Pageflakes" /></div></td>-->
        <table class="ppMain" cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr>
        <td class="left">
        <div style="DISPLAY: inline; POSITION: relative"><a href="https://web.archive.org/web/20100928190054/http://www.pageflakes.com/">Create your own page!</a> (Pageflakes members: <a id="PUBLIC_PAGE_HEADER_LOGIN_LINK" href="/web/20100928190054/http://www.pageflakes.com/login.aspx?ReturnURL=/Default.aspx?userName=A131FAC5979F47b4931BFF8A3C64EFD0&amp;">login</a>) </div></td>
        <td class="middle">
        <div id="PUBLIC_PAGE_HEADER_OWNER" style="DISPLAY: inline; FONT-WEIGHT: bold; POSITION: relative; TEXT-ALIGN: center"></div></td>
        <td class="pright" align="right">
        <table class="controlPanel" cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr>
        <td class="itemStart"><img alt="Watch this Pagecast! (Add it as a tab to your own pages)" src="https://web.archive.org/web/20100928190054im_/http://pfimg.liveuniversenetwork.com/images/PublicPageHeader/pBookMark.gif" border="0"></td>
        <td class="itemEnd"><a id="PUBLIC_PAGE_HEADER_BOOKMARK" title="Watch this Pagecast! (Add it as a tab to your own pages)" href="javascript:void(0)">Watch this Pagecast</a></td>
        <td class="itemStart"><img style="PADDING-TOP: 2px" alt="Get a copy of this Pagecast" src="https://web.archive.org/web/20100928190054im_/http://pfimg.liveuniversenetwork.com/images/PublicPageHeader/pCopy.gif" border="0"> </td>
        <td class="itemEnd"><a id="PUBLIC_PAGE_HEADER_COPY" title="Get a copy of this Pagecast" href="javascript:void(0)">Copy</a></td>
        <td class="itemStart"><img style="PADDING-TOP: 2px" alt="Send a copy of this Pagecast" src="https://web.archive.org/web/20100928190054im_/http://pfimg.liveuniversenetwork.com/images/PublicPageHeader/pEmail.gif" border="0"> </td>
        <td class="itemEnd"><a id="PUBLIC_PAGE_HEADER_SEND" title="Send a copy of this Pagecast" href="javascript:void(0)">Send To a Friend</a></td>
        <td class="itemStart"><img style="PADDING-TOP: 2px" alt="Show a random Pagecast!" src="https://web.archive.org/web/20100928190054im_/http://pfimg.liveuniversenetwork.com/images/PublicPageHeader/pRandom.gif" border="0"></td>
        <td class="itemEnd"><a id="PUBLIC_PAGE_HEADER_RANDOM" title="Show a random Pagecast!" href="javascript:void(0)">Random Pagecast</a></td></tr></tbody></table></td></tr></tbody></table></div></div>
        <!--<script id="SettingsScript" src="PublicPageHeader.js?v=< %= Pageflakes.ObjectModel.Constants.VERSION_SUFFIX % >" type="text/javascript"></script>--><span id="DomainSuperHeader"></span>
        
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolder_SetAsStartPage" Runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="Content_Page_Begin" Runat="Server">
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="PopUp_Page" Runat="Server">
    <asp:Literal ID="StartPageMarkup" runat="server" Mode="PassThrough" />
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="Script_Page_Middle" Runat="Server">
    
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="Content_Page_End" Runat="Server">
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="Footer_Page" Runat="Server">
    <style type="text/css">
                    .footer_wrapper
                    {
                        margin: 6px 0 0 0;
                        width: 100%;
                        font: 10px/12px Verdana,Arial,Helvetica,sans-serif;
                        padding: 24px 0;
                        text-align: center;
                        clear:both;
                    }.footer_block
                    {
                        float:none;
                        width:auto;
                    }ul.footer_block
                    {
                        margin: 0 auto;
                        padding: 0;
                        list-style: none;                        
                    }ul.footer_block li
                    {
                        display: inline;
                    }ul.footer_block a
                    {
                        padding: 0 .5em;
                    }
                </style> 
        <div class="footer_wrapper">
            <ul class="footer_block">
                <li><a href="<%= ResolveUrl("~/Community/Pages/Page.aspx")%>">Pagecasts</a> |</li>
                <li><a href="<%= ResolveUrl("~/Community/Content/Flakes.aspx")%>">Flakes</a> |</li>
                <li><a href="<%= ResolveUrl("~/Community/ProfileDirectory.aspx")%>">People</a> |</li>
                <!--
                <li><a href="http://forums.Pageflakes.com/">Help & Support</a> |</li>
                //-->   
                <li><a href="http://company.Pageflakes.com/tos">Terms</a> |</li>
                <li><a href="http://company.Pageflakes.com/privacy">Privacy</a> |</li>
                <li><a href="http://company.Pageflakes.com/aboutus">About Us</a> </li>
                <!--
                <li><a href="http://developers.Pageflakes.com/">Developers</a></li>
                //-->
            </ul>
        </div>    
</asp:Content>
<asp:Content ID="Content11" ContentPlaceHolderID="Sript_Page_End_1" Runat="Server">
   
        
</asp:Content>
<asp:Content ID="Content12" ContentPlaceHolderID="Script_Page_End_2" Runat="Server">
</asp:Content>

