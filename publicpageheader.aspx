﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="publicpageheader.aspx.cs" Inherits="publicpageheader" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <body>
        <noscript><p>This page is designed for JavaScript-only browsers. In case you have disabled JavaScript, please enable it and reload this page.</p><p>Alternatively, consider installing a JavaScript capable browser such as <a href="http://www.getfirefox.com/">Mozilla Firefox</a>.</p></noscript>
        <div id="blockUI" style="display: none; background-color: black; width: 100%; height: 100px; position: absolute; left: 0px; top: 0px; z-index: 50000; -moz-opacity: 0.5; opacity: 0.5; filter: alpha(opacity=50);" onclick="return false" onmousedown="return false" onmousemove="return false" onmouseup="return false" ondblclick="return false">&nbsp;
        </div>
        <div id="Content" class="T12 ">
            <div id="alerts" class="alerts" style="display:none"><div id="alertMessages" class="alertMessages"></div>
        </div>
        <style type="text/css">
            #TopMenu
            {
                display:none;
            }
            #PageflakesTV
            {
                display:none;
            }
            #header
            {
                margin-top:20px;
            }
            #searchForm
            {
                display:none;
                visibility:hidden;
            }
        </style>
        <div id="publicPageHeaderContainer">
            <div id="publicPageHeader">
                <!--<td class="headerlogo">
                    <div class="hLogo" id="PUBLIC_HEADER_IMG_HOME">
                        <img src="http://www.pageflakes.com/App_Themes/common/PublicPageHeader/hlogo.png" border="0" alt="Pageflakes" />
                    </div>
                </td>-->
                <table cellpadding="0" cellspacing="0" border="0" class="ppMain">
                    <tr>
                        <td class="left">
                            <div style="display:inline;position:relative;">
                                <a href="http://www.pageflakes.com/">
                                    Create your own page!
                                </a> 
                                (Pageflakes members: <a id="PUBLIC_PAGE_HEADER_LOGIN_LINK" href="/login.aspx?ReturnURL=/Default.aspx?userName=GetJSON.ashx'%20+%20__getJsonQueryString%20+%20'&">login</a>)
                            </div>
                        </td>
                        <td class="middle">
                            <div style="position:relative;display:inline;font-weight:bold;text-align:center;" id="PUBLIC_PAGE_HEADER_OWNER"></div>
                        </td>
                        <td class="pright" align="right">
                            <table cellpadding="0" cellspacing="0" border="0" class="controlPanel" >
                                <tr>
                                    <td class="itemStart">
                                        <img src="http://flakepage.com/images/PublicPageHeader/pBookMark.gif" border="0" alt="Watch this Pagecast! (Add it as a tab to your own pages)" />
                                    </td>
                                    <td class="itemEnd">
                                        <a href="javascript:void(0)" id="PUBLIC_PAGE_HEADER_BOOKMARK" title="Watch this Pagecast! (Add it as a tab to your own pages)">Watch this Pagecast</a>
                                    </td>
                                    <td class="itemStart"> 
                                        <img src="http://flakepage.com/images/PublicPageHeader/pCopy.gif" style="padding-top:2px;" border="0" alt="Get a copy of this Pagecast" /> 
                                    </td>
                                    <td class="itemEnd">
                                        <a href="javascript:void(0)" id="PUBLIC_PAGE_HEADER_COPY" title="Get a copy of this Pagecast" >Copy</a>
                                    </td>
                                    <td class="itemStart">
                                        <img src="http://flakepage.com/images/PublicPageHeader/pEmail.gif" style="padding-top:2px;" border="0" alt="Send a copy of this Pagecast" /> 
                                    </td>
                                    <td class="itemEnd" ><a href="javascript:void(0)" id="PUBLIC_PAGE_HEADER_SEND" title="Send a copy of this Pagecast">Send To a Friend</a></td>
                                    <td class="itemStart" ><img src="http://flakepage.com/images/PublicPageHeader/pRandom.gif" style="padding-top:2px;" border="0" alt="Show a random Pagecast!" /></td>
                                    <td class="itemEnd" ><a href="javascript:void(0)" id="PUBLIC_PAGE_HEADER_RANDOM" title="Show a random Pagecast!">Random Pagecast</a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
       <!--<script id="SettingsScript" src="PublicPageHeader.js?v=< %= Pageflakes.ObjectModel.Constants.VERSION_SUFFIX % >" type="text/javascript"></script>-->
        <span id="DomainSuperHeader"></span>
        <div id="header">
            <div id="header_extra">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td colspan="2" style="position: relative;">
                            <div id="headerLeft">
                                <a href="http://www.pageflakes.com/">
                                    <div class="logo">
                                    </div>
                                </a>
                                <div class="partnerlogo">
                                </div>
                            </div>
                            <div id="headerRight">
                                <ul id="TopMenu" class="menu">
                                    <li>
                                        <a href="javascript:UserRegistration('?track=hpheader')" id="SignupLink">Sign up&nbsp;|&nbsp;</a>
                                    </li>
                                    <li id="LoginLink"><a href="http://www.pageflakes.com/Login.aspx?track=hpheader">
                                        Login
                                        </a>&nbsp;|&nbsp;
                                    </li>
                                    <li id="ReaderLink">
                                        <a href="javascript:void(0)" onclick="FeedViewer.loadRssReaderDiv2()" id="RssReaderLink">
                                            Reader</a>&nbsp;|&nbsp;
                                    </li>
                                    <li id="SetAsHomePage">
                                        <a id="SetAsHomePageLink" href="javascript:void(0)" onmouseover="if(typeof StartPageHelper != 'undefined') StartPageHelper.attachLink(this)">
                                            Make this my homepage
                                        </a>
                                    </li>
                                </ul>
                                <!-- Search Google -->
                                <!-- the CSS that reference the div below control position -->
                                <div id="domainSearchContainer">
                                    <form method="get" action="search.aspx" target="_top">
                                        <!-- the CSS that references the input box below control the background position of the text inside -->
                                        <input id="domainSearchBox" name="q" type="text" onblur="if(this.value=='')this.value='Google';" onfocus="if(this.value=='Google')this.value='';" size="25" maxlength="255" value="Google" />
                                        <!-- the value below is used as a manual version, increment it when changes are made to the search html so the browser retrieves the new hmtl -->
                                        <input type="hidden" name="v" value="1"/>
                                        <input type="hidden" name="client" value="pub-0657560217705811"/>
                                        <input type="hidden" name="forid" value="1"/>
                                        <input type="hidden" name="ie" value="ISO-8859-1"/>
                                        <input type="hidden" name="oe" value="ISO-8859-1"/>
                                        <input type="hidden" name="safe" value="active"/>
                                        <input type="hidden" name="cof" value="S:http://;FORID:11"/>
                                        <input type="hidden" name="hl" value="en"/>
                                    </form>
                                </div>
                                <!-- End Search Google -->
                                <div id="PageflakesTV" title="Open Pageflakes Central" style="display: none;" class="AddFeedButton_off">
                                    <div class="add_right">
                                        ADD&nbsp;FEED
                                    </div>
                                </div>
                                <div id="CommunityButton" style="display: none" title="Browse other people’s profiles, public pages, and get even more stuff for your page"onclick="$trackEventNoTimeOut('Community Button','Click', 'Direct Click'); document.location.href='community/'">
                                    Community
                                </div>
                                <div id="Start" title="Get more stuff for your page, pick a theme, share your page, and update your profile" onclick="Start.toggleStart()">
                                    <!--<div class="add_right">ADD&nbsp;FLAKE</div>-->
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td id="tabs_container_td">
                            <div id="left_scroll">&lt;</div>
                            <div id="tabs_container_scroll">
                                <div id="tabs_container">
                                    <ul id="tabs" class="tabs"></ul>
                                </div>
                            </div>
                            <div id="right_scroll">&gt;</div>
                        </td>
                        <td valign="top" id="TopMenuContainer" align="right">
                            <div style="width: 200px;">&nbsp;
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="pushdown">
                </div>
            </div>
        </div>
        <div id="public_page_tab_placeholder"></div>
        <div id="gray_panel"></div>
        <div id="gray_panel_dropdown_settings" style="display: none"></div>
        <div id="messageBar" style="display: none">
            <span id="HideThisMessageLink">
                <a href="javascript:void(0)" onclick="$nodisplay('messageBar')"id="messageBarClose">Hide this message</a>
            </span>
            <span id="errorMsg"></span>
            <div class="pushdown">
            </div>
        </div>
        <div id="PageLoadProgress">
        </div>
        <div id="body">
            <div style="height: 400px">
                &nbsp;
            </div>
        </div>
        <div class="pushdown">
            &nbsp;
        </div>
        <div id="busyUI" style="display: none; background-color: black; width: 100%; height: 100px;position: absolute; left: 0px; top: 0px; z-index: 50001; -moz-opacity: 0; opacity: 0;filter: alpha(opacity=0); cursor: wait" onclick="return false" onmousedown="return false"onmousemove="return false" onmouseup="return false" ondblclick="return false">
            &nbsp;
        </div>
        <div class="sendFlakeOptionsContainer" id="sendFlakeOptionsMenu" style="display: none">
            <b></b>
            <div class="sendFlakeOptions" onclick="FlakeMenu.emailFriend();" onmouseover="hover(this)"onmouseout="hout(this)">
                <strong>Email to a friend</strong>
            </div>
            <div class="sendFlakeOptions" onclick="FlakeMenu.putInBlog();" onmouseover="hover(this)"onmouseout="hout(this)">
                <strong>Take Flake</strong>
            </div>
        </div>
        <style>
            .footer_wrapper
                {
                    margin: 6px 0 0 0;
                    width: 100%;
                    font: 10px/12px Verdana,Arial,Helvetica,sans-serif;
                    padding: 24px 0;
                    text-align: center;
                    clear:both;
                }
            .footer_block
                {
                    float:none;
                    width:auto;
                }
            ul.footer_block
                {
                    margin: 0 auto;
                    padding: 0;
                    list-style: none;
                    list-style;
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
                <li><a href="http://forums.pageflakes.com/">Help & Support</a> |</li>
                <li><a href="http://blog.pageflakes.com/">Insider Blog</a> |</li>
                <li><a href="http://company.pageflakes.com/tos">Terms</a> |</li>
                <li><a href="http://company.pageflakes.com/privacy">Privacy</a> |</li>
                <li><a href="http://company.pageflakes.com/aboutus">About Us</a> |</li>
                <li><a href="http://developers.pageflakes.com/">Developers</a></li>
            </ul>
        </div>
    </div>
        <script type="text/javascript" id="StartupJSON">
            /*var __getJsonQueryString = '?userName=GetJSON.ashx'++ + __getJsonQueryString++ + '&r=633649368466041805';
            document.write('<' + 'script type="text/javascript" id="GetJSON" src="/GetJSON.ashx' + __getJsonQueryString + '"> <' + '/script>');
            */
            var __getJsonQueryString = '<%=Session["currentuser"] %>';
            document.write('<' + 'script type="text/javascript" id="GetJSON" src="GetJSON2.ashx' + __getJsonQueryString + '"> <' + '/script>')
        </script>
        <script src="f.axd?s=Framework&t=j&v=200en&l=en" type="text/javascript" ></script>
        <script type="text/javascript">
            if (typeof Sys == "undefined" || typeof App == "undefined" || typeof PrimaryFramework == "undefined") {
                document.write("<" + "script src=\"test/log.ashx?" + encodeURI(window.navigator.userAgent) + "\" type=\"text/javascript\" /><" + "/script>");
                if (confirm("There has been an error loading the page. Would you please take a minute and report the problem in our forum so that we can try to fix this?"))
                    document.location.href = "http://www.pageflakes.com/forums/posting.php?mode=post&f=6";
            }
            else {
                $DC(function () { SearchForm.init(); }); if (typeof StartPage != "undefined") $DC(function () { if (StartPage) StartPage.init(); });
            }
        </script>
        <script id="PostFrameworkLoaderScript" type="text/javascript" >
            var PostFrameworkLoader = { load: function () { PF.addScript('PostFrameworkScriptSource', '/f.axd?s=PostFramework&t=j&v=200en'); } };
        </script>
        <script type="text/javascript">
            // var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            // document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript" language="Javascript" src="/JavaScripts/GoogleAnalyticsPF.js"></script>
        <script type="text/javascript" >
            if (SITE_PREFIX != "undefined") { var SITE_PREFIX = "http://localhost/pageflakes/"; }
            /*if (typeof _gat != 'undefined') {
            var pageTracker = _gat._getTracker('UA-2320375-1'); pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            //GA.init();
            }*/
        </script>
        <script id="CheckForDOMReady" type="text/javascript">
            function domReady() { window.DOMReady = true; }
            if (Browser.isFirefox) {
                document.addEventListener("DOMContentLoaded", domReady, false);
            }
            else if (Browser.isIE) {
                document.write('<' + 'script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
                var contentloadtag = document.getElementById("contentloadtag");
                contentloadtag.onreadystatechange = function () { if (this.readyState == "complete") domReady(); }
            }
            else {
                domReady();
            }
        </script>
    </body>

</html>
