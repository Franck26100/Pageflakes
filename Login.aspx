<%@ Page Language="C#" AutoEventWireup="false" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<base href="http://192.168.1.2/pageflakes/" />
    <title>Pageflakes</title>
    <link id="themeStylesheet" href="~/s.axd?s=CSS1&h=www.pageflakes.com&l=en&v=200en&b=Unknown&m=0&t=&e=mainsite" rel="stylesheet" type="text/css" />
    <link id="SecondayCss" href="~/s.axd?s=CSS2&h=www.pageflakes.com&l=en&v=204en&b=Unknown&m=0" rel="stylesheet" type="text/css" />
    <link id="pageTheme" href="~/p.axd?i=12&t=&h=www.pageflakes.com&v=4&b=Unknown&m=0" rel="stylesheet" type="text/css" />

<script type="text/javascript">
    var SITE_PREFIX = "http://192.168.1.2/Pageflakes/";
    var RSS_FEED_FLAKE_URL = "__RSSFEED__?url=";
    var IMAGE_PREFIX = "http://marquisfranck.perso.sfr.fr/pageflakes/";
    var op = /opera 5|opera\/5/i.test(navigator.userAgent) && window.opera; var ie = !op && /msie/i.test(navigator.userAgent); 
    var mz = !op && /mozilla\/5/i.test(navigator.userAgent); var safari = /Safari/i.test(navigator.userAgent);
</script>

</head>
<body>
<div class="T12">
    <div id="alerts" class="alerts" style="display:none">
        <div id="alertMessages" class="alertMessages"></div>
    </div>
    <div id="header">
	    <div id="header_extra">
	        <table cellpadding="0" cellspacing="0" width="100%">
	            <tr>
                    <td colspan="2">
                        <div id="headerLeft">
                            <div class="logo"></div>    
                        </div>
                        <div id="headerRight">
	                        <ul class="menu">
		                        <li><a href="#">Logout</a>&nbsp;|&nbsp;</li>
		                        <li><a href="#">Reader</a>&nbsp;|&nbsp;</li>
		                        <li><a href="#">Make this my homepage</a></li>
	                        </ul>	
                        </div>
                        <div class="Start" id="Start">
                            <div class="add_right">&nbsp;</div>
                        </div>
	                </td>
                </tr>
	            <tr>
                    <td id="tabs_container_td">
	                    <ul id="tabs" class="tabs">
		                    <li class="T12_tab">
                                <div class="page_tab">
                                    <div class="page_title">Page One</div>
                                </div>                            
                            </li>
		                    <li class="T12_tab">
                                <div class="page_tab_off">
                                    <div class="page_title">Page Two</div>
                                </div>
                            </li>
		                    <li class="add_page">Add Page</li>
    	                </ul>
	                </td>
	                <td width="300" align="right">
                    </td>
                </tr>
            </table>
	        <div class="pushdown"></div>    
	    </div>
    </div>
    <div id="gray_panel"></div>
    <div id="blockUI" style="display: none; background-color: black; width: 100%; height: 5000px; position: absolute; left: 0px; top: 0px; z-index: 50000;-moz-opacity:0.5;opacity:0.5;filter:alpha(opacity=50);"onclick="return false" onmousedown="return false" onmousemove="return false"onmouseup="return false" ondblclick="return false">
        &nbsp;
    </div> 
    <script type="text/javascript">
        window.suppressLoad = true;
    </script>
    <!--<script src="f.axd?s=Framework&t=j&v=217en&l=en" type="text/javascript" ></script> -->
    <script src="script/Framework.js" type="text/javascript" ></script>
    <script type="text/javascript">
        if (typeof Sys == "undefined" || typeof App == "undefined" || typeof PrimaryFramework == "undefined") {
            document.write("<" + "script src=\"test/log.ashx?" + encodeURI(window.navigator.userAgent) + "\" type=\"text/javascript\" /><" + "/script>");
            if (confirm("There has been an error loading the page. Would you please take a minute and report the problem in our forum so that we can try to fix this?"))
                document.location.href = "http://www.pageflakes.com/forums/posting.php?mode=post&f=6";
        }
        else {
            $DC(function () { SearchForm.init(); });
            if (typeof StartPage != "undefined") $DC(function () { if (StartPage) StartPage.init(); });
        }
    </script>
    <script id="PostFrameworkLoaderScript" type="text/javascript" >
        var PostFrameworkLoader =
        {
            load: function () {
                PF.addScript('PostFrameworkScriptSource', '/f.axd?s=PostFramework&t=j&v=217en');
            }
        };   
    </script>

    <form id="aspnetForm" runat="server" onsubmit="LW.login('Default.aspx?userName=\'+++HomeUrl+++\'')">        
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

    <input type="hidden" id="returnUrlFromLogin" runat="server" /> 
    <input id="loginSuccess" type="hidden" runat="server"/> 
<div style="visibility:visible; top:126px; left:600px" id="Login" class="wizardbox popup container hidden">
    <div class="header">
        <a class="Start_Wizard_Back" href="default.aspx">
            Back
        </a> 
    </div>
    <div class="content">
        <div style="background-position:right bottom; height:160px" class="box logo_box">
            <h1>Log in</h1>
            <p>Please enter your email address and password:</p>
            <div>
                <label>
                    Email:
                </label> 
                <div id="LoginWizard_Email" class="loginfield">
                    <asp:TextBox runat="server" accesskey="u" id="LoginWizard_EmailField" CssClass="textfield" type="text"/> 
                    <div id="LoginWizard_Email_Msg" class="nodisplay">
                        Incorrect user name or
                    </div>
                    <br />
                </div>
                <br />
                <label>
                    Password:
                </label> 
                <div id="LoginWizard_Password" class="loginfield">
                    <asp:TextBox runat="server" accesskey="p" id="LoginWizard_PasswordField" CssClass="textfield" type="password" /> 
                    <div id="LoginWizard_Password_Msg" class="nodisplay">
                        <asp:Label ID="ErrorMsgLogin" runat="server" Visible="false">
                        Incorrect password
                        </asp:Label>
                        
                    </div>
                    <br />
                </div>
                <br />
                <div id="LoginWizard_StepWorking" style="display:none;">
                <label>Working...</label>
                </div>
                <label style="width:auto">
                    <asp:CheckBox runat="server" id="LoginWizard_RememberMe" Checked="true"/>
                    Keep me logged in, unless I log out.
                </label> 
                <br />
                <div>
                    
                    <input class="button2" runat="server" type="submit" id="LoginButton" name="Login" value="Login" tabindex="4" />&nbsp;&nbsp;&nbsp;&nbsp;                    
                    <a href="javascript:showPasswordSend();">
                        Lost Password?
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script id="LoginPage_Script" src="LoginWizard.js" type="text/javascript"></script>
    <script type="text/javascript">
        window.onload = function (event) { PU.blockUI(); PU.centerDiv($('Login')); $visible('Login'); }
    </script>
</div></div>
           </form>
</div>  
 
    
        
    <script type="text/javascript" >
        if (SITE_PREFIX != "undefined") {
            var SITE_PREFIX = "http://192.168.1.2/pageflakes/";
            //login.aspx?ReturnURL=/Default.aspx?userName='+++homeUrl+++'&;
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
</body>
</html>
