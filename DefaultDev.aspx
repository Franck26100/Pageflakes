<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDev.master" AutoEventWireup="true" CodeFile="DefaultDev.aspx.cs" Inherits="Pageflakes.DefaultDev" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link id="pagetheme_T12" href="/Pageflakes/p.axd?i=12&v=213" rel="stylesheet" type="text/css"/>

</asp:Content>
<asp:Content ID="Page_Title" ContentPlaceHolderID="Header_Page_Title" runat="server">pageflakesd</asp:Content>
<asp:Content ID="MainContent" ContentPlaceHolderID="ContentPlaceBody" runat="server">
     <!-- Popup StartPage -->
    <div id="startPagePopup" class="popup hidden">
        <asp:PlaceHolder ID="StartPageContent" runat="server" />
    </div>
</asp:Content>
<asp:Content ID="Content_T12" ContentPlaceHolderID="PlaceHolder_T12" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderAutre" Runat="Server">
    <div id="PageflakesContainer">
            <!-- Le flake météo par défaut sera injecté ici -->            
       </div>
</asp:Content>

<asp:Content ID="SetAsStartPage_PlaceHolder" ContentPlaceHolderID="PlaceHolder_SetAsStartPage" runat="server">
 <!-- Popups SetAsStartPage -->
        <div id="SetAsStartPageHelpDialog" class="popup" style="display:none;">
            <div class="popup_header">
                <span class="popup_title">Set Pageflakes as your homepage</span>
                <a href="javascript:void(0)" class="close_icon" onclick="StartPageHelper.hide()">x</a>
            </div>
            <div class="popup_body">
                <p>Drag this link to your browser’s home icon or follow your browser’s instructions.</p>
            </div>
        </div>

        <div id="SetAsStartPageHelpDialogFirefox" class="popup" style="display:none;">
            <div class="popup_header">
                <span class="popup_title">Firefox Homepage Setup</span>
                <a href="javascript:void(0)" class="close_icon" onclick="StartPageHelper.hide()">x</a>
            </div>
            <div class="popup_body">
                <p>Go to <strong>Tools → Options → General</strong> and set Pageflakes as your homepage.</p>
                <a href="javascript:void(0)" onclick="StartPageHelper.showFirefoxHomepageDetails()">More details</a>
            </div>
        </div>
        
        <div id="SetAsStartPageHelpDialogFirefoxDetail" class="popup" style="display:none;">
            <div class="popup_header">
                <span class="popup_title">Firefox Detailed Instructions</span>
                <a href="javascript:void(0)" class="close_icon" onclick="StartPageHelper.hide()">x</a>
            </div>
            <div class="popup_body">
                <p>Paste this URL into the homepage field:</p>
                <code>http://www.pageflakes.com</code>
            </div>
        </div>

        <div id="SetAsStartPageHelpDialogOpera" class="popup" style="display:none;">
            <div class="popup_header">
                <span class="popup_title">Opera Homepage Setup</span>
                <a href="javascript:void(0)" class="close_icon" onclick="StartPageHelper.hide()">x</a>
            </div>
            <div class="popup_body">
                <p>Go to <strong>Tools → Preferences → General</strong> and set Pageflakes as your homepage.</p>
            </div>
        </div>

        <div id="SetAsStartPageHelpDialogSafari" class="popup" style="display:none;">
            <div class="popup_header">
                <span class="popup_title">Safari Homepage Setup</span>
                <a href="javascript:void(0)" class="close_icon" onclick="StartPageHelper.hide()">x</a>
            </div>
            <div class="popup_body">
                <p>Go to <strong>Preferences → General</strong> and set Pageflakes as your homepage.</p>
            </div>
        </div>
</asp:Content>
<asp:Content ID="GetJsonPaceHolder" ContentPlaceHolderID="PlaceHolderGetJson_Default" runat="server">

   
    <!--<script type="text/javascript" src="/Pageflakes/GetJSON.ashx?r=634135175139218750"></script>-->
    <!-- 4. StartupJSON : appel du handler GetJSON -->


<!-- 5. Diagnostic après injection 
    <script type="text/javascript">
        console.log("=== Diagnostic après GetJSON ===");
        console.log("window.startupInfo:", window.startupInfo);
    if (window.startupInfo && window.startupInfo.Template) {
        console.log("Template OK:", window.startupInfo.Template);
    } else {
        console.error("ATTENTION: Template absent ou startupInfo non défini !");
    }
</script>-->

</asp:Content>

<asp:Content id="ContentGA" ContentPlaceHolderID="ContentGA" runat="server">
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://");
        document.write(unescape("%3Cscript async src='" + gaJsHost + "localhost/Pageflakes/JavaScripts/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript" language="Javascript" src="/Pageflakes/JavaScripts/GoogleAnalyticsPF.js"></script>
    <script type="text/javascript">    
        if (SITE_PREFIX != "undefined") {
            var SITE_PREFIX = "http://localhost/Pageflakes/";
        }
        if (typeof _gat != 'undefined') {
            var pageTracker = _gat._getTracker('UA-2320375-1');
            pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            GA.init();
        }
    </script>
</asp:Content>
<asp:Content ID="FooterPlace" ContentPlaceHolderID="ContentPlaceFooter" runat="server">
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
                <li><a href="http://localhost/Pageflakes/Community/Pages/Page.aspx">Pagecasts</a> |</li>
                <li><a href="http://localhost/Pageflakes/Community/Content/Flakes.aspx">Flakes</a> |</li>
                <li><a href="http://localhost/Pageflakes/Community/ProfileDirectory.aspx">People</a> |</li>
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
<asp:Content ContentPlaceHolderID="PlaceHolder_Fin_Script" runat="server">
    <script id="StartPage" type="text/javascript">
    /*
        $DC(function () { loadFirstPage() });
        App.IsCompactFramework = false;
        //App.startup(); */
        $DC(function () {
            // Attendre que le JSON soit prêt avant de lancer loadFirstPage
            var check = setInterval(function () {
                if (window.jsonReady && window.startupInfo){clearInterval(check);loadFirstPage();}}, 100);});
        //App.startup();
            </script>
</asp:Content>
