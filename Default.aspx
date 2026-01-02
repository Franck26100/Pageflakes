<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
</asp:Content>

<asp:Content ID="FlakesContain" ContentPlaceHolderID="FlakesContainers" runat="Server">
    <div class="sendFlakeOptionsContainer" id="sendFlakeOptionsMenu" style="display: none">
        <b></b>
        <div class="sendFlakeOptions" onclick="FlakeMenu.emailFriend();" onmouseover="hover(this)" onmouseout="hout(this)"> 
            <strong>Email to a friend</strong>
        </div>
        <div class="sendFlakeOptions" onclick="FlakeMenu.putInBlog();" onmouseover="hover(this)" onmouseout="hout(this)">
            <strong>Take Flake</strong>
        </div>
    </div>
</asp:Content>
<asp:Content ID="LoaderPostFramework" ContentPlaceHolderID="PostFrameWorkLoad" runat="server">

<script id="PostFrameworkLoaderScript" type="text/javascript" >
    var PostFrameworkLoader =
{
    load: function () {
        PF.addScript('PostFrameworkScriptSource', 'f.axd?s=PostFramework&t=j&v=217en');
    }
};
</script>
<script type="text/javascript">
   // var StartPage = { init: function () { if (window.startupinfo != null) { $DC(function () { loadFirstPage(); }); } } };
</script>
</asp:Content>
<asp:Content ID="CheckerStartPage" ContentPlaceHolderID="CheckStartPage" runat="server">
    <script type="text/javascript">
        if (typeof Sys == "undefined" || typeof App == "undefined" || typeof PrimaryFramework == "undefined") {
            document.write("<" + "script src=\"test/log.ashx?" + encodeURI(window.navigator.userAgent) + "\" type=\"text/javascript\" /><" + "/script>");
            if (confirm("There has been an error loading the page. Would you please take a minute and report the problem in our forum so that we can try to fix this?"))
                document.location.href = "http://forums.pageflakes.com/";
        }
        else {
           /* $DC(function () { SearchForm.init(); });
            if (typeof StartPage != "undefined") $DC(function () { if (StartPage) StartPage.init(); });*/
            var StartPage = { init: function () { if (window.startupinfo != null) { $DC(function () { loadFirstPage(); }); } } };
        }
    </script>
</asp:Content>
<asp:Content ID="GoogleScriptContain" ContentPlaceHolderID="GoolgleConatainer" runat="server">
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol ) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript" language="Javascript" src="/JavaScripts/GoogleAnalyticsPF.js"></script>
    <script type="text/javascript" >
        if (SITE_PREFIX != "undefined")
            {
            var SITE_PREFIX = "http://10.0.0.1/pageflakes";
            }
        if (typeof _gat != 'undefined')
            {
            var pageTracker = _gat._getTracker('UA-2320375-1');
            pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            GA.init();
            }
    </script>
</asp:Content>
<asp:Content ID="ContentFooter" ContentPlaceHolderID="FooterPlace" Runat="Server">
    <style>
        .footer_wrapper
        {
        margin: 6px 0 0 0;width: 100%;font: 10px/12px Verdana,Arial,Helvetica,sans-serif;
        padding: 24px 0;text-align: center; clear:both;
        }
        .footer_block
        {
        float:none; width:auto;
        }
        ul.footer_block
        {
        margin: 0 auto; padding: 0; list-style: none; 
        }
        ul.footer_block li
        {
        display: inline;
        }
        ul.footer_block a
        {
        padding: 0 .5em;
        }
    </style>
    <div class="footer_wrapper">
        <ul class="footer_block">
        <li><a href="/Community/Pages/Page.aspx">Pagecasts</a> |</li>
        <li><a href="/Community/Content/Flakes.aspx">Flakes</a> |</li>
        <li><a href="/Community/ProfileDirectory.aspx">People</a> |</li>
        <!--
        <li><a href="http://forums.pageflakes.com/">Help & Support</a> |</li>
        //--><li><a href="http://company.pageflakes.com/tos">Terms</a> |</li>
        <li><a href="http://company.pageflakes.com/privacy">Privacy</a> |</li>
        <li><a href="http://company.pageflakes.com/aboutus">About Us</a> </li>
        <!--
        <li><a href="http://developers.pageflakes.com/">Developers</a></li>
        //-->
        </ul>
    </div>
</asp:Content>
<asp:Content ID="StartPageLoad" ContentPlaceHolderID="SartPageLoader" runat="server">
    <!--<script id="StartPage" type="text/javascript">
        $DC(function () { loadFirstPage() });
        //App.IsCompactFramework = false;
        App.startup();
    </script>-->
</asp:Content>
<asp:Content ID="DomReadyContain" ContentPlaceHolderID="DomReadyContainer" runat="server">
<script id="CheckForDOMReady" type="text/javascript">
    function domReady() { window.DOMReady = true; }
        if (Browser.isFirefox) {
            document.addEventListener("DOMContentLoaded", domReady, false);
        }
        else if (Browser.isIE)
        {
            document.write('<' + 'script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
        var contentloadtag=document.getElementById("contentloadtag");
        contentloadtag.onreadystatechange=function(){if (this.readyState=="complete")domReady();}
        }
        else
        {
        domReady();
        }
</script>
</asp:Content>