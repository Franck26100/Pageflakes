<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDev.master" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" EnableViewState="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Pageflakes - Connexion</title>
<script src="<%= ResolveUrl("~/script/LoginWizard.js")%>" type="text/javascript"></script>
 <link id="themeStylesheet" href="<%= ResolveUrl("~/s.axd?s=css2&h=localhost")%>" rel="stylesheet" type="text/css"/>
</asp:Content>
<asp:Content ID="aspnetForm" ContentPlaceHolderID="PlaceHolder_Login_Register" Runat="Server" EnableViewState="true" ViewStateMode="Inherit">
    <div class="T12">
         <script type="text/javascript">

    function pageLoad() {
        var loginTxt = $('LoginWizard_EmailField');

        if (loginTxt != null)
            loginTxt.focus();
    }

    function showPasswordSend() {
        var url = document.location.href;

        if (url.indexOf("?") > 0)
            url = url + "&Forgot=Yes";
        else
            url = url + "?Forgot=Yes";

        document.location.href = url;
    }

</script> 

    <div id="Login" class="wizardbox popup container hidden">
    <div class="header">
        <a class="Start_Wizard_Back" href="<%= ResolveUrl("~/defaultdev.aspx")%>">Back</a>
    </div>
        <div class="content">
            <div class="box logo_box" style="height: 160px; background-position:bottom right">
        <!-- Zone de login -->
        
            <h1>Log In</h1>

            <p>Please enter your email address and password:</p>
            <div>
            <label>Email:</label>
            <div class="loginfield" id="LoginWizard_Email"><input id="LoginWizard_EmailField" class="textfield" type="text" name="os_username" value="" accesskey="u" tabindex="1"/>
                <div id="LoginWizard_Email_Msg" class="nodisplay">Incorrect user name or</div><br/>
            </div>
            <br/>
            <label>Password:</label>
            <div class="loginfield" id="LoginWizard_Password"><input id="LoginWizard_PasswordField" class="textfield" type="password" name="os_password" accesskey="p" tabindex="2"/>
            <div class="nodisplay" id="LoginWizard_Password_Msg">Incorrect password</div><br/>
            </div>
            <br/>
            <label></label> <label style="width:auto"><input type="checkbox" tabindex="3" checked="true" name="rememberme" id="LoginWizard_RememberMe"/>Keep me logged in, unless I log out.</label>
            <br/>
                <div><input class="button2" type="submit" id="LoginButton" name="Login" value="Login" tabindex="4"/>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:showPasswordSend();">Lost Password?</a></div>
            </div>
        </div>
        </div>
       </div> 
    </div>
    <script type="text/javascript">
        window.onload = function (event) { PU.blockUI(); PU.centerDiv($('Login')); $visible('Login'); }
    </script>
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript async src='" + gaJsHost + "localhost/Pageflakes/JavaScripts/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript" language="Javascript" src="<%= ResolveUrl("~/JavaScripts/GoogleAnalyticsPF.js?v=1")%>"></script>
    <script type="text/javascript">
        if (SITE_PREFIX != "undefined") {
            var SITE_PREFIX = "http://10.0.0.1/Pageflakes/";
        }
        if (typeof _gat != 'undefined') {
            var pageTracker = _gat._getTracker('UA-2320375-1');
            pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            GA.init();
        }
    </script>
    <script id="CheckForDOMReady" type="text/javascript">
        function domReady() { window.DOMReady = true; }
        if (Browser.isFirefox) {
            document.addEventListener("DOMContentLoaded", domReady, false);
        }
        else if (Browser.isIE) {
            document.write('<' + 'script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
            var contentloadtag = document.getElementById("contentloadtag");
            contentloadtag.onreadystatechange = function () {
                if (this.readyState == "complete")
                    domReady();
            }
        }
        else {
            domReady();
        }
    </script>  
</asp:Content>

