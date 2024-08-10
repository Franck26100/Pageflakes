<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Signup2.aspx.cs" Inherits="Signup" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
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
    <script type="text/javascript">
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript" src="/JavaScript/GoogleAnalyticsPF.js"></script>
    <script type="text/javascript" >
        if (SITE_PREFIX != "undefined") {
            var SITE_PREFIX = "http://soulsociety.servehttp.com/pageflakes/";
        }
        if (typeof _gat != 'undefined') {
            var pageTracker = _gat._getTracker('UA-38090433-1');
            pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            GA.init();
        }    
    </script>

<form id="aspnetForm" method="post" name="aspnetForm" action="Signup.aspx?track=hpheader" runat="server">
    <div>
        <input id="controlPrefix" type="hidden" name="controlPrefix" />
        <input id="controlInitialValue" type="hidden" name="controlInitialValue" />
        <input id="LastFocus" type="hidden" name="LastFocus" />
        
    </div>
    <script type="text/javascript">
        function startUpTrackEvent() {
            $trackEvent('Signup Page 1', 'Open');
        }
    </script>
    <script type="text/javascript">
//<![CDATA[
        function WebForm_OnSubmit() {
            if (typeof (ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
            return true;
        }
//]]>
    </script>
    <div class="T12">
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
                var prefixControl = document.getElementById('controlPrefix');
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
                document.getElementById('Content_btnCreate').click();
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
    <div style="position:absolute; height:auto; visibility:visible; top:7px; left:600px" id="Signup" class="wizardbox popup container hidden;">
        <div class="dlgheader">
            <div style="width:440px; height:25px">
                <div style="vertical-align:top; padding-top:10px" align="right">
                    <!--<img src="http://www.pageflakes.com/images/cross_cancel.gif" onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Close Click', '', '');document.location.href='http://www.pageflakes.com/default.aspx';" style="cursor:pointer;cursor:hand;" />-->
                    <div class="dlgheader_cross handCursor" onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Close Click', '', '');document.location.href='http://soulsociety.servehttp.com/pageflakes/default.aspx';">
                    </div>
                </div>
            </div>
        </div>
        <div style="padding-bottom:10px; padding-left:10px; padding-right:10px; padding-top:10px">
            <div class="contentPanel">
                <div class="slogan">
                    Sign up to get the most out of Pageflakes!
                </div>

                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                        <tr>
                            <td style="width:110px; vertical-align:top;">
                                <div style="margin-top:3px">
                                    <asp:Label ID="Content_Label7" runat="server" CssClass="textlabel" >
                                        First Name:
                                    </asp:Label>
                                </div>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                
                                                <input runat="server" id="controlPrefix_txtFirstName" type="text" class="textbox" name="$controlPrefix$txtFirstName" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="errortext">                                                                                                
                                                <asp:RequiredFieldValidator runat="server" Visible="false" ID="Content_RequiredFieldValidatorUserName" ControlToValidate="Content_txtFirstName" SetFocusOnError="true" ErrorMessage="First name is required" Display="Dynamic" InitialValue="" isvalide="true">
                                                    First name required
                                                </asp:RequiredFieldValidator>                                                
                                                &nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div style="margin-top:3px">
                                    <asp:Label ID="Content_Label11" runat="server" CssClass="textlabel">
                                        Last Name:
                                    </asp:Label>                                    
                                </div>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input id="controlPrefix_txtLastName" class="textbox" type="text" name="$controlPrefix$txtLastName" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="errortext">
                                                <asp:RequiredFieldValidator Visible="false" ForeColor="Red" ID="Content_RequiredFieldValidatorLastName" runat="server" ControlToValidate="Content_txtLastName" SetFocusOnError="true" ErrorMessage="Last name is required" Display="Dynamic">
                                                    Last name is required
                                                </asp:RequiredFieldValidator>                                                
                                                &nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div style="margin-top:3px">
                                    <asp:Label ID="Content_Label1" runat="server" Text="" CssClass="textlabel"> 
                                        Email Address:
                                    </asp:Label>                                    
                                </div>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input id="controlPrefix_txtUserId" runat="server" class="textbox" type="text" name="$controlPrefix$txtUserId" />
                                                <br />                                                
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <asp:RequiredFieldValidator Visible="false" ForeColor="Red" ID="Content_RequiredFieldValidator1" runat="server" ControlToValidate="Content_txtUserId" SetFocusOnError="true" ErrorMessage="Email address required" Display="Dynamic" InitialValue="">
                                                Email address required
                                            </asp:RequiredFieldValidator>
                                            <asp:RegularExpressionValidator Visible="false" ForeColor="Red" ID="Content_RegularExpressionValidator1" ControlToValidate="Content_txtUserId" runat="server" ErrorMessage="Invalid Email Address" Display="Dynamic" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*">
                                                Invalid Email Address
                                            </asp:RegularExpressionValidator>                                            
                                            &nbsp; 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <div style="margin-top:3px">
                                <asp:Label ID="Content_Label2" runat="server" Text="" CssClass="textlabel">
                                    Pick a Password:
                                </asp:Label>                                
                            </div>
                        </td>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <input id="Content_txtPassword" type="password" class="textbox" value="" name="$Content$txtPassword" />
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <asp:RequiredFieldValidator Visible="false" ForeColor="Red" ID="Content_RequiredFieldValidator2" runat="server" ControlToValidate="Content_txtPassword" SetFocusOnError="true" ErrorMessage="Password is required" Display="Dynamic">
                                            Password is required
                                        </asp:RequiredFieldValidator>
                                        <asp:RegularExpressionValidator Visible="false" ForeColor="Red" ID="Content_RegularExpressionValidator2" ControlToValidate="Content_txtPassword" SetFocusOnError="true" runat="server" ErrorMessage="Password must be at least 6 characters" Display="Dynamic" ValidationExpression=".{6,255}">
                                            Password must be at least 6 characters
                                        </asp:RegularExpressionValidator>                                                                               
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td valign="top" nowrap="nowrap">
                        <div style="margin-top:3px">
                            <asp:Label ID="Content_Label3" runat="server" Text="" CssClass="textlabel">
                                Retype Password:
                            </asp:Label>                           
                            &nbsp; 
                        </div>
                    </td>
                    <td>
                        <input onkeydown="postFormOnEnter" id="Content_ConfirmPassword" class="textbox" value="" type="password" name="$Content$ConfirmPassword" />                        
                        <br />
                        <asp:RequiredFieldValidator Visible="false" ForeColor="Red" ID="Content_RequiredFieldValidator3" runat="server" ControlToValidate="Content_ConfirmPassword" SetFocusOnError="true" ErrorMessage="Confirm Password is required" Display="Dynamic">
                            Confirm Password is required
                        </asp:RequiredFieldValidator>
                        <asp:CompareValidator Visible="false" ForeColor="Red" ID="Content_PasswordCompare" ControlToValidate="Content_ConfirmPassword" SetFocusOnError="true" runat="server" ErrorMessage="The Password and Confirmation Password must match." Display="Dynamic" ControlToCompare="Content_txtPassword" ControlHookup="Content_txtPassword">
                            The Password and Confirmation Password must match.
                        </asp:CompareValidator>                       
                        &nbsp; 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="height:10px">
    </div>
    <div class="contentPanel">
        <div style="padding-bottom:10px">
            The optional information below helps us provide recommendations for you:
        </div>
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <tbody>
                <tr>
                    <td style="width:110px" valign="top">
                        <div style="margin-top:3px">
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <asp:Label ID="controlPrefix_lblInterests" runat="server" Text="" CssClass="textoptional">
                                                Interests:
                                            </asp:Label>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="graytext">
                                            (optional)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                    <td>
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea style="width:240px; height:50px" id="controlPrefix_txtInterests" class="textbox" rows="2" cols="20" name="$controlPrefix$txtInterests">
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="graytext">
                                    Example: snowboarding, adventure travel, hip-hop
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="width:110px" valign="top">
                    <div style="margin-top:3px">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <asp:Label ID="Content_lblGender" runat="server" Text="" CssClass="textoptional">
                                            Gender:
                                        </asp:Label>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td class="graytext">
                                        (optional)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td>
                    <select style="width:170px" id="Content_drpGender" class="dropdown" name="$Content$drpGender">
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
                            <tbody>
                                <tr>
                                    <td>
                                        <asp:Label ID="Content_lblDOB" runat="server" Text="" CssClass="textoptional">
                                            Date of Birth:
                                        </asp:Label>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td class="graytext">
                                        (optional)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td>
                    <select id="Content_drpMonth" class="dropdown" onchange="javascript:validateDayOfTheMonth ('Content_drpMonth', 'Content_txtDay', 'Content_txtYear');" name="$Content$drpMonth"> 
                        <option selected="selected" value="">Month
                        </option> 
                        <option value="1">January
                        </option> 
                        <option value="2">February
                        </option> 
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
                    <input style="width: 30px" id="Content_txtDay" class="editgraytext" onkeyup="onDayChange ('Content_txtDay');validateDayOfTheMonth ('Content_drpMonth', 'Content_txtDay', 'Content_txtYear');" onclick="onDayChange ('Content_txtDay');validateDayOfTheMonth ('Content_drpMonth', 'Content_txtDay', 'Content_txtYear');" value="DD" type="text" name="$Content$txtDay" runat="server"/> 
                    <input onblur="validateDayOfTheMonth ('Content_drpMonth', 'Content_txtDay', 'Content_txtYear');" style="width:55px" id="Content_txtYear" class="editgraytext" onkeyup="onYearChange ('Content_txtYear');" onclick="onYearChange ('Content_txtYear');validateDayOfTheMonth ('Content_drpMonth', 'Content_txtDay', 'Content_txtYear');" value="YYYY" type="text" name="$Content$txtYear" runat="server"/> 
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div style="height:13px">
    <input id="raiseClick" type="hidden" name="raiseClick"/>
</div>
<center>
    <div style="display:none" id="progress">
        Please wait ... we are creating your account.
    </div>
    <asp:ImageButton ID="Content_btnCreate" name="$Content$btnCreate" src="images/btnSignUp.gif" runat="server" style="border-right-width:0px; border-top-width:0px; border-bottom-width:0px; border-left-width:0px" />

    <div style="height:10px">
        
    </div>
    <div style="height:20px" class="graytext">
        By signing up you agree to the 
        <a onclick="javascript:$trackEventNoTimeOut('Signup Page 1','Terms Click', ''); this.href='/Community/Terms.aspx'" href="javascript:void(0);" target="_blank">
            Terms &amp; Conditions
        </a>
    </div>
</center>
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
            $(getControlPrefix() + 'txtFirstName').focus();
        });
        window.setTimeout("modifySubmit();", 2000);
        // call GA track event function, this is defined on the server.
        startUpTrackEvent();
        // save the intial value to compare later.
        $('controlInitialValue').value = $(getControlPrefix() + 'txtInterests').value;
    }


</script>
</div>
<script type="text/javascript">
//<![CDATA[
    var Page_Validators = new Array(document.getElementById("Content_RequiredFieldValidatorUserName"), document.getElementById("Content_RequiredFieldValidatorLastName"), document.getElementById("Content_RequiredFieldValidator1"), document.getElementById("Content_RegularExpressionValidator1"), document.getElementById("Content_RequiredFieldValidator2"), document.getElementById("Content_RegularExpressionValidator2"), document.getElementById("Content_RequiredFieldValidator3"), document.getElementById("Content_PasswordCompare"));
//]]>
</script>

<script id="PostFrameworkLoaderScript" type="text/javascript">
    var PostFrameworkLoader = { load: function () { PF.addScript('PostFrameworkScriptSource', 'f.axd?s=PostFramework&t=j&v=213en'); } };
</script>


<script type="text/javascript">
<!--
    var Page_ValidationActive = false;
    if (typeof (ValidatorOnLoad) == "function") {
        ValidatorOnLoad();
    }

    function ValidatorOnSubmit() {
        if (Page_ValidationActive) {
            return ValidatorCommonOnSubmit();
        }
        else {
            return true;
        }
    }
// -->
</script>

<script type="text/javascript">
//<![CDATA[
    WebForm_AutoFocus('controlPrefix_txtFirstName');//]]>
</script>
<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
<asp:LoginName ID="LoginName1" runat="server" />
<input id="Text1" type="text" runat="server" />
</form>
</div>
    
    
    
</body>
</html>
