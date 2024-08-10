<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Signup.aspx.cs" Inherits="Signup" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Pageflakes</title>
    <link id="themeStylesheet" href="/s.axd?s=CSS1&h=www.pageflakes.com&l=en&v=200en&b=Unknown&m=0&t=&e=mainsite" rel="stylesheet" type="text/css" /> 
    <link id="SecondayCss" href="/s.axd?s=CSS2&h=www.pageflakes.com&l=en&v=204en&b=Unknown&m=0" rel="stylesheet" type="text/css" />
    <link id="pageTheme" href="/p.axd?i=12&t=&h=www.pageflakes.com&v=4&b=Unknown&m=0" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        var SITE_PREFIX = "http://169.235.1.2/Pageflakes/";
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
        <script type="text/javascript" id="StartupJSON">
            //<%=Session["currentuser"] %>

            var __getJsonQueryString = '?<%=Session["currentuser"] %>&<%=Session["TimeSpamp"] %>';
            document.write('<' + 'script type="text/javascript" id="GetJSON" src="GetJSON.ashx' + __getJsonQueryString + '"> <' + '/script>');  
    </script>
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
        <div id="messageBar" style="display: block;">
            <span id="HideThisMessageLink">
                <a class="InProductLink" href="javascript:void(0)" id="messageBarClose" onclick="$nodisplay('messageBar')">Hide This message</a>
            </span>
            <span id="errorMsg">        
            </span>
            <div class="pushdown">
            </div>
        </div>
        <script src="f.axd?s=Framework&t=j&v=204en&l=en" type="text/javascript" ></script>
        <form id="aspnetForm" runat="server">
            <div>
                <input id="CreateUserWizard1_CreateUserStepContainer_" type="hidden" />
                <input id="controlInitialValue" type="hidden" />
                <input id="LastFocus" type="hidden"  />        
            </div>
            <script type="text/javascript">
                function startUpTrackEvent() {
                    $trackEvent('Signup Page 1', 'Open');
                }
            </script>
            <div class="T12">
                <div style="position:absolute; height:auto; visibility:visible; top:7px;left:600px" id="Signup" class="wizardbox popup container hidden;">
                <style>
                    .ValidationSummary {
	                    PADDING-bottom: 8px; BACKGROUND-COLOR: #ffffcc; PADDING-LEFT: 20px; PADDING-right: 8px; display: block; COLOR: red; PADDING-top: 8px
                    }
                    .graytext {
	                    COLOR: gray; FONT-SIZE: 7pt
                    }
                    .editgraytext {
	                    COLOR: gray
                    }
                    .contentPanel {
	                    border-bottom: #e2e2ee 1px solid; PADDING-bottom: 5px; PADDING-LEFT: 11px; PADDING-right: 11px; BACKGROUND: #ebeef7; border-top: #e2e2ee 1px solid; PADDING-top: 11px
                    }
                    .textbox {
	                    border-bottom: #7f9db9 1px solid; border-LEFT: #7f9db9 1px solid; width: 170px; height: 13px; border-top: #7f9db9 1px solid; border-right: #7f9db9 1px solid
                    }
                    .dropdown {
	                    border-bottom: #7f9db9 1px solid; border-LEFT: #7f9db9 1px solid; border-top: #7f9db9 1px solid; border-right: #7f9db9 1px solid
                    }
                    .textlabel {
	                    FONT-SIZE: 8pt; FONT-WEIGHT: bold;font-face: Tahoma
                    }
                    .textoptional {
	                    FONT-SIZE: 8pt; FONT-WEIGHT: normal; font-face: Tahoma
                    }
                    .errortext {
	                    COLOR: red; FONT-SIZE: 8pt
                    }
                    .slogan {
	                    PADDING-bottom: 15px; FONT-SIZE: 13.5pt; font-face: Tahoma
                    }
                </style>
                <script language="javascript" type="text/javascript">
                    function getControlPrefix() {
                        var prefixControl = document.getElementById('CreateUserWizard1_CreateUserStepContainer_');
                        if (prefixControl) {
                            return prefixControl.value;
                        }
                        else {
                            return null;
                        }
                    }
                    var daysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    var maxDay = 31;
                    function onDayChange(elementid) {
                        var item = document.getElementById(elementid);
                        if (item != null) {
                            if (item.className == 'editgraytext') {
                                item.value = '';
                                item.className = 'textoptional';
                            }
                            else {
                                try {
                                    var newValue = item.value.replace(/(\s|\.|[a-z]|[A-Z]|\[|\]|\{|\}|\(|\)|\+|\-|\/|\\|!|@|#|\$|%|\^|&|\*|\(|\)|=|,|\?|\<|\>)*/g, "");
                                    item.value = newValue;
                                    try {
                                        var intValue = parseInt(newValue);
                                        if (intValue > maxDay) {
                                            item.value = item.previousValue;
                                            return;
                                        }
                                    }
                                    catch (x) {
                                        item.value = item.previousValue;
                                    }
                                    item.value = newValue;
                                    item.previousValue = item.value;
                                }
                                catch (ex) {
                                    item.value = item.previousValue;
                                }
                            }
                        }
                    }
                    function onYearChange(elementid) {
                        var item = document.getElementById(elementid);
                        if (item != null) {
                            if (item.className == 'editgraytext') {
                                item.value = '';
                                item.className = 'textoptional';
                            }
                            else {
                                try {
                                    var newValue = item.value.replace(/(\s|\.|[a-z]|[A-Z]|\[|\]|\{|\}|\(|\)|\+|\-|\/|\\|!|@|#|\$|%|\^|&|\*|\(|\)|=|,|\?|\<|\>)*/g, "");
                                    item.value = newValue;
                                    try {
                                        var intValue = parseInt(newValue);
                                        if (intValue > 2007) {
                                            item.value = item.previousValue;
                                            return;
                                        }
                                        if ($trim(newValue).length > 3) {
                                            if (intValue < 1900) {
                                                item.value = item.previousValue;
                                                return;
                                            }
                                        }
                                    }
                                    catch (x) {
                                        item.value = item.previousValue;
                                    }
                                    item.value = newValue;
                                    item.previousValue = item.value;
                                }
                                catch (ex) {
                                    item.value = item.previousValue;
                                }
                            }
                        }
                    }
                    function validateDayOfTheMonth(elementid, dayid, yearid) {
                        var item = document.getElementById(elementid);
                        if (item != null) {
                            var month = 0;
                            try {
                                month = parseInt(item.value);
                            }
                            catch (ex) {
                            }
                            if (month > 0) {
                                maxDay = daysInMonth[month - 1];
                                var dayElement = document.getElementById(dayid);
                                var yearElement = document.getElementById(yearid);
                                if (dayElement) {
                                    if (yearElement) {
                                        var day = 0; var year = 0;
                                        try {
                                            day = parseInt(dayElement.value);
                                            if (month != 2) {
                                                if (day > maxDay) {
                                                    dayElement.value = '';
                                                }
                                            }
                                            else {
                                                try {
                                                    year = parseInt(yearElement.value);
                                                    if (year % 4 == 0) {
                                                        maxDay = 29;
                                                    }
                                                    else {
                                                        maxDay = 28;
                                                    }
                                                    if (!year) {
                                                        maxDay = 29;
                                                    }
                                                }
                                                catch (ex) {
                                                    maxDay = 29;
                                                }
                                                if (day > maxDay) {
                                                    dayElement.value = '';
                                                }
                                            }
                                        }
                                        catch (ex) {
                                            dayElement.value = '';
                                        }
                                    }
                                }
                            }
                        }
                    }
                    function postFormOnEnter(e) {
                        document.getElementById('btnCreate').click();
                    }
                    function makeGray() {
                        var day = document.getElementById(getControlPrefix() + 'txtDay');
                        if (day) {
                            if (day.value == '') {
                                day.value = 'DD';
                                day.className = 'editgraytext';
                            }
                        }
                        var year = document.getElementById(getControlPrefix() + 'txtYear');
                        if (year) {
                            if (year.value == '') {
                                year.value = 'YYYY';
                                year.className = 'editgraytext';
                            }
                        }
                    }
                </script>
                <img style="width:0px;height:0px;" src="images/pfDlgHeader.png" alt=""/>
                
                    <div class="dlgheader">
                        <div style="width:440px; height:25px">
                            <div style="vertical-align:top; padding-top:10px" align="right">
                    <!--<img src="http://www.pageflakes.com/images/cross_cancel.gif" onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Close Click', '', '');document.location.href='http://169.235.1.2/pageflakes/default.aspx';" style="cursor:pointer;cursor:hand;" />-->
                                <div class="dlgheader_cross handCursor" onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Close Click', '', '');document.location.href='http://169.235.1.2/pageflakes/default.aspx';">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slogan">
                    Sign up to get the most out of Pageflakes!
                    </div>
                    <asp:CreateUserWizard ID="CreateUserWizard1" runat="server">                                      
                        <WizardSteps>
                            <asp:CreateUserWizardStep ID="CreateUserWizardStep1" runat="server">
                                <ContentTemplate>
                                    <table>                                        
                                        <tr>
                                            <td style="width:110px; vertical-align:top;">
                                                <div style="margin-top:3px">
                                                    <asp:Label ID="UserNameLabel" runat="server" CssClass="textlabel" AssociatedControlID="UserName">Nom d&#39;utilisateur&nbsp;:</asp:Label>
                                                </div>
                                            </td>
                                            <td>
                                                <table cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="UserName" runat="server" CssClass="textbox"></asp:TextBox>
                                                            <br />
                                                        </td>
                                                        <td class="errortext">
                                                            <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" 
                                                                ControlToValidate="UserName" ErrorMessage="Un nom d'utilisateur est requis." 
                                                                ToolTip="Un nom d'utilisateur est requis." ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>                            
                                            <td valign="top">
                                                <div style="margin-top:3px">
                                                    <asp:Label ID="Label1" CssClass="textlabel" runat="server" AssociatedControlID="Surname">Prenon&nbsp;:</asp:Label>
                                                </div>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="Surname" runat="server" CssClass="textbox"></asp:TextBox>
                                                <br />
                                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
                                                    ControlToValidate="Surname" ErrorMessage="Un nom d'utilisateur est requis." 
                                                    ToolTip="Un nom d'utilisateur est requis." ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                                            </td>                            
                                        </tr>
                                        <tr>
                                            <td valign="top">
                                                <div style="margin-top:3px">
                                                    <asp:Label ID="EmailLabel" CssClass="textlabel" runat="server" AssociatedControlID="Email">Adresse de messagerie&nbsp;:</asp:Label>
                                                </div>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="Email" runat="server" CssClass="textbox"></asp:TextBox>
                                                <br />
                                                <asp:RequiredFieldValidator ID="EmailRequired" runat="server" 
                                                    ControlToValidate="Email" ErrorMessage="Une adresse de messagerie est requise." 
                                                    ToolTip="Une adresse de messagerie est requise." 
                                                    ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top">
                                                <div style="margin-top:3px">
                                                    <asp:Label ID="PasswordLabel" CssClass="textlabel" runat="server" AssociatedControlID="Password">Mot de passe&nbsp;:</asp:Label>
                                                </div>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="Password" runat="server" TextMode="Password" CssClass="textbox"></asp:TextBox>
                                                <br />
                                                <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" 
                                                    ControlToValidate="Password" ErrorMessage="Un mot de passe est requis." 
                                                    ToolTip="Un mot de passe est requis." ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top">
                                                <div style="margin-top:3px">
                                                    <asp:Label ID="ConfirmPasswordLabel" CssClass="textlabel" runat="server" AssociatedControlID="ConfirmPassword">Confirmer le mot de passe&nbsp;:</asp:Label>
                                                </div>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="ConfirmPassword" runat="server" TextMode="Password" CssClass="textbox"></asp:TextBox>
                                                <br />
                                                <asp:RequiredFieldValidator ID="ConfirmPasswordRequired" runat="server" ControlToValidate="ConfirmPassword" 
                                                    ErrorMessage="La confirmation du mot de passe est requise." 
                                                    ToolTip="La confirmation du mot de passe est requise." 
                                                    ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" colspan="2">
                                                <asp:CompareValidator ID="PasswordCompare" runat="server" 
                                                    ControlToCompare="Password" ControlToValidate="ConfirmPassword" 
                                                    Display="Dynamic" 
                                                    ErrorMessage="Le mot de passe et le mot de passe de confirmation doivent correspondre." 
                                                    ValidationGroup="CreateUserWizard1"></asp:CompareValidator>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" colspan="2" style="color:Red;">
                                                <asp:Literal ID="ErrorMessage" runat="server" EnableViewState="False"></asp:Literal>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellspacing="5" style="width:100%;height:100%;">
                                    <tr>
                                        <td>
                                            <div style="padding-bottom:10px">
                                                The optional information below helps us provide recommendations for you:
                                            </div>
                                            <table border="0" cellspacing="0" cellpadding="0" width="100%">          
                                                <tr>
                                                    <td style="width:110px" valign="top">
                                                        <div style="margin-top:3px">
                                                            <table cellspacing="0" cellpadding="0">                                                                
                                                                <tr>
                                                                    <td>
                                                                        <asp:Label ID="lblInterests" runat="server" Text="" CssClass="textoptional">
                                                                            Interests:
                                                                        </asp:Label>                                            
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="graytext">
                                                                        (optional)
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <table cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td>
                                                                    <textarea id="txtInterests" runat="server" style="width:240px;height:50px;" class="textbox" rows="2" cols="20"></textarea>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="graytext">
                                                                    Example: snowboarding, adventure travel, hip-hop
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width:110px" valign="top">
                                                        <div style="margin-top:3px">
                                                            <table cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Label ID="lblGender" runat="server" Text="" CssClass="textoptional">
                                                                            Gender:
                                                                        </asp:Label>                                        
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="graytext">
                                                                        (optional)
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select style="width:170px" id="drpGender" class="dropdown">
                                                            <option selected="selected" value="">
                                                                Select Gender
                                                            </option>
                                                            <option value="H">
                                                                Homme
                                                            </option>
                                                            <option value="F">
                                                                Femme
                                                            </option>
                                                        </select>                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width:110px" valign="top">
                                                        <div style="margin-top:3px">
                                                            <table cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td>
                                                                        <asp:Label ID="lblDOB" runat="server" Text="" CssClass="textoptional">
                                                                            Date of Birth:
                                                                        </asp:Label>                                        
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="graytext">
                                                                        (optional)
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select id="drpMonth" class="dropdown" onchange="javascript:validateDayOfTheMonth ('CreateUserWizard1_CreateUserStepContainer_drpMonth', 'CreateUserWizard1_CreateUserStepContainer_txtDay', 'CreateUserWizard1_CreateUserStepContainer_txtYear');" > 
                                                            <option selected="selected" value="">Month</option> 
                                                            <option value="1">January</option> 
                                                            <option value="2">February</option> 
                                                            <option value="3">March</option>
                                                            <option value="4">April</option> 
                                                            <option value="5">May</option> 
                                                            <option value="6">June</option> 
                                                            <option value="7">July</option> 
                                                            <option value="8">August</option> 
                                                            <option value="9">September</option> 
                                                            <option value="10">October</option> 
                                                            <option value="11">November</option> 
                                                            <option value="12">December</option>
                                                        </select>                    
                                                        <input style="width: 30px" id="txtDay" class="editgraytext" onkeyup="onDayChange ('CreateUserWizard1_CreateUserStepContainer_txtDay');validateDayOfTheMonth ('CreateUserWizard1_CreateUserStepContainer_drpMonth', 'CreateUserWizard1_CreateUserStepContainer_txtDay', 'CreateUserWizard1_CreateUserStepContainer_txtYear');" onclick="onDayChange ('CreateUserWizard1_CreateUserStepContainer_txtDay');validateDayOfTheMonth ('CreateUserWizard1_CreateUserStepContainer_drpMonth', 'CreateUserWizard1_CreateUserStepContainer_txtDay', 'CreateUserWizard1_CreateUserStepContainer_txtYear');" value="DD" type="text" runat="server"/> 
                                                        <input onblur="validateDayOfTheMonth ('CreateUserWizard1_CreateUserStepContainer_drpMonth', 'CreateUserWizard1_CreateUserStepContainer_txtDay', 'CreateUserWizard1_CreateUserStepContainer_txtYear');" style="width:55px" id="txtYear" class="editgraytext" onkeyup="onYearChange ('CreateUserWizard1_CreateUserStepContainer_txtYear');" onclick="onYearChange ('CreateUserWizard1_CreateUserStepContainer_txtYear');validateDayOfTheMonth ('CreateUserWizard1_CreateUserStepContainer_drpMonth', 'CreateUserWizard1_CreateUserStepContainer_txtDay', 'CreateUserWizard1_CreateUserStepContainer_txtYear');" value="YYYY" type="text" runat="server"/> 
                                                    </td>
                                                </tr>        
                                            </table>
                                        </td>
                                    </tr>
                                    <tr align="right">
                                        <td align="right" valign="middle">
                                            <div style="height:13px">
                                                <input id="raiseClick" type="hidden"/>
                                            </div>
                                            <center>
                                                <div style="display:none" id="progress">
                                                    Please wait ... we are creating your account.
                                                </div>
                                                <asp:ImageButton ID="btnCreate" ValidationGroup="CreateUserWizard1" CommandName="MoveNext"
                                                    src="images/btnSignUp.gif" runat="server" style="border-right-width:0px; border-top-width:0px; border-bottom-width:0px; border-left-width:0px" /> 
                                                <div style="height:10px">
                                                </div>
                                                <div style="height:20px" class="graytext">
                                                    By signing up you agree to the 
                                                    <a onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Terms Click', ''); this.href='/Community/Terms.aspx'" href="javascript:void(0);" target="_blank">
                                                        Terms &amp; Conditions
                                                    </a>
                                                </div>
                                            </center>
                                        </td>
                                    </tr>
                                </table>
                                </ContentTemplate>                            
                                <CustomNavigationTemplate>
                                    <table border="0" cellspacing="5" style="width:100%;height:100%;">
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </CustomNavigationTemplate>
                        </asp:CreateUserWizardStep>
                        <asp:CompleteWizardStep ID="CompleteWizardStep1" runat="server">
                            <ContentTemplate>
                                <table style="font-family:Verdana;font-size:100%;height:358px;width:443px;">
                                    <tr>
                                        <td align="center" colspan="2" style="color:White;background-color:#507CD1;font-weight:bold;">
                                            Terminé
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Votre compte a été créé correctement.</td>
                                    </tr>
                                    <tr>
                                        <td align="right" colspan="2">
                                            <asp:Button ID="ContinueButton" runat="server" BackColor="White" BorderColor="#507CD1" BorderStyle="Solid" BorderWidth="1px" 
                                                CausesValidation="False" CommandName="Continue" Font-Names="Verdana" 
                                                ForeColor="#284E98" Text="Continuer" ValidationGroup="CreateUserWizard1" />
                                        </td>
                                    </tr>
                                </table>
                            </ContentTemplate>
                        </asp:CompleteWizardStep>
                    </WizardSteps>                    
                </asp:CreateUserWizard>
                </div>
            </div>
            <script type="text/javascript">

                function showProgress() {
                    $('progress').style.display = "";
                    $(getControlPrefix() + 'btnCreate').style.display = "none";
                }


                function modifySubmit() {
                    $('aspnetForm').oldsubmit = $('aspnetForm').onsubmit;
                    $('aspnetForm').onsubmit = submitHandler;
                }

                function submitHandler() {
                    var valueToReturn = $('aspnetForm').oldsubmit();
                    if (valueToReturn) {
                        $('raiseClick').value = 'ok';
                        // submit button has been clicked
                        // create the submit events
                        trackEventOnSubmit();

                        showProgress();
                    }
                    else {   // submit failed
                        $trackEvent('Signup Page 1', 'Signup', 'Fields missing');

                    }
                    return valueToReturn;
                }

                function trackEventOnSubmit() {
                    var idPrefix = getControlPrefix();
                    var txtInterests = document.getElementById(idPrefix + 'txtInterests');

                    var trackingLabels = '';

                    if (txtInterests.value == $('controlInitialValue').value) {
                        trackingLabels = 'No Interests Provided|';
                    }
                    else {
                        trackingLabels = 'Interests Provided|';
                    }

                    var drpGender = document.getElementById(idPrefix + 'drpGender');

                    if (drpGender.selectedIndex == 0) {
                        trackingLabels += 'No Gender Provided|';
                    }
                    else {
                        trackingLabels += 'Gender Provided|';
                    }

                    var drpMonth = document.getElementById(idPrefix + 'drpMonth');
                    var txtDay = document.getElementById(idPrefix + 'txtDay');
                    var txtYear = document.getElementById(idPrefix + 'txtYear');

                    if (drpMonth.selectedIndex == 0 && isNaN(txtDay.value) && isNaN(txtYear.value)) {
                        // all DOB fields are in their default state
                        trackingLabels += 'No DOB Provided';
                    }
                    else {
                        trackingLabels += 'DOB Provided';
                    }

                    // create event
                    $trackEvent('Signup Page 1', 'Click', trackingLabels);

                }

                window.onload = function (event) {
                    PU.blockUI();
                    $DC(function () {
                        PU.centerDiv($('Signup'));
                        $visible('Signup');
                        makeGray();                       
                        //$(getControlPrefix() + 'UserName').focus();
                    });
                    window.setTimeout("modifySubmit();", 2000);
                    // call GA track event function, this is defined on the server.
                    startUpTrackEvent();
                    // save the intial value to compare later.
                    //$('controlInitialValue').value = $(getControlPrefix() + 'txtInterests').value;
                }


            </script>
            <script id="PostFrameworkLoaderScript" type="text/javascript">
                var PostFrameworkLoader = { load: function () { PF.addScript('PostFrameworkScriptSource', 'f.axd?s=PostFramework&t=j&v=213en'); } };
            </script>
        </form>
    </div>
</body>
</html>
