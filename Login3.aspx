<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login3.aspx.cs" Inherits="Login3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="aspnetForm" runat="server">
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
<script type="text/javascript" >
    if (SITE_PREFIX != "undefined") {
        var SITE_PREFIX = "http://169.235.1.2/pageflakes/";
        //login.aspx?ReturnURL=/Default.aspx?userName='+++homeUrl+++'&;
    }    
    </script>
    </form>
</body>
</html>
