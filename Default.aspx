<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" Async="true" AsyncTimeout="20" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Pragma" content="no-cache" />
<meta id="MetaTagKeywords" name="Keywords" content="Personalized Desktop, start page, Ajax Desktop, customization, rss reader, rss feed, atom reader, blog reader, blog, flickr, delicious, gmail, pop3 mail, xml, rss, news feed, pageflakes, aggregate content" />
<meta id="MetaTagDescription" name="Description" content="Social personalized homepage - the easiest way to read, see, discover and share your favorite things on the Web." />
<meta id="MetaTagPageTopic" name="Page-topic" content="Start Page" />
<meta name="Content-language" content="English" />
<meta name="Robots" content="INDEX,FOLLOW" />
    <title>Pageflakes</title>
    <base href="http://192.168.1.2/Pageflakes/" />
    <script type="text/javascript">
        try { if (document.execCommand) document.execCommand("BackgroundImageCache", false, true); } catch (err) { }
    </script>
    <link rel="alternate" type="application/rss+xml" title="RSS" href="http://192.168.1.2/Pageflakes/insider?feed=rss2" />  
    <link id="themeStylesheet" href="/s.axd?s=CSS1&h=www.pageflakes.com&l=en&v=200en&b=Unknown&m=0&t=&e=mainsite" rel="stylesheet" type="text/css" /> 
    <script type="text/javascript">
        var l = {};
        l.startDateTime = new Date();
        var SITE_PREFIX = "http://192.168.1.2/Pageflakes/";
        var IMAGE_PREFIX = "http://marquisfranck.perso.sfr.fr/pageflakes/";
        var VERSION_SUFFIX = "217en";
        var LANGUAGE = "en";
        var SOURCE = '';
        var PAGE_ID = '';                
        var loadFeedWithSingleConnection = false;
        var op = /opera 5|opera\/5/i.test(navigator.userAgent) && window.opera;
        var ie = !op && /msie/i.test(navigator.userAgent);
        var mz = !op && /mozilla\/5/i.test(navigator.userAgent);
        var safari = /Safari/i.test(navigator.userAgent);
        function $reload(msg) {
            if (confirm("Problem occured while loading site. Press OK to retry.\nProblem:" + msg))
                document.location.reload(true);
        }
    </script>         
</head>
<body>
    <noscript>
        <p>This page is designed for JavaScript-only browsers. In case you have disabled JavaScript, please enable it and reload this page.</p>
        <p>Alternatively, consider installing a JavaScript capable browser such as <a href="http://www.getfirefox.com/">Mozilla Firefox</a>.</p>
    </noscript>
    <div id="blockUI" style="display: none; background-color: black; width: 100%; height: 5000px; position: absolute; left: 0px; top: 0px; z-index: 50000;-moz-opacity:0.5;opacity:0.5;filter:alpha(opacity=50);"onclick="return false" onmousedown="return false" onmousemove="return false"onmouseup="return false" ondblclick="return false"></div>
        <div id="Content" class="T26">
            <div id="alerts" class="alerts" style="display:none">
            <div id="alertMessages" class="alertMessages"></div>
        </div>
        <span id="DomainSuperHeader"></span>
        <div id="header">
            <div id="header_extra">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td colspan="2" style="position:relative;">
                            <div id="headerLeft">
                                <a href="http://192.168.1.2/Pageflakes/">
                                    <div class="logo">
                                    </div>
                                </a>                            
                                <div id="partnerlogo">
                                </div>
                            </div>
                            <div id="headerRight">
                                <ul id="TopMenu" class="menu">
                                    <li>
                                        <a href="javascript:UserRegistration('?track=hpheader')" id="SignupLink">
                                            Sign up &nbsp;|&nbsp;
                                        </a>
                                    </li>
                                    <li id="LoginLink">
                                        <a href="/Pageflakes/Login.aspx?track=header">
                                            Login
                                        </a>
                                        &nbsp;|&nbsp;
                                    </li>
                                    <li id="ReaderLink">
                                        <a href="javascript:void(0)" onclick="FeedViewer.loadRssReaderDiv2()" id="RssReaderLink">
                                            Reader
                                        </a>
                                        &nbsp;|&nbsp;
                                    </li>
                                    <li id="SetAsHomePage">
                                        <a href="javascript:void(0)" onmouseover="if(typeof StartPageHelper != 'undefined') StartPageHelper.attachLink(this)" id="SetAsHomePageLink">
                                            Make this my homepage
                                        </a>
                                    </li>
                                </ul>
                                <div id="domainSearchContainer">
                                    <form action="search.aspx" method="get" target="_top">
                                        <input id="domainSearchBox" type="text" name="q" size="25px" maxlength="255" value="Google" onblur="if(this.value=='')this.value='Google';" onfocus="if(this.value=='Google')this.value='';"  />                                        
                                        <input type="hidden" name="v" value="1" />
                                        <input type="hidden" name="client" value="pub-0657560217705811" />
                                        <input type="hidden" name="forid" value="1" />
                                        <input type="hidden" name="ie" value="ISO-8859-1" />
                                        <input type="hidden" name="oe" value="ISO-8859-1" />
                                        <input type="hidden" name="safe" value="active" />
                                        <input type="hidden" name="cof" value="S:http://;FORID:11" />
                                        <input type="hidden" name="hl" value="en" />                                    
                                    </form>
                                </div>
                                <div id="PageflakesTV" title="Open Pageflakes Central" style="display:none;" class="AddFeedButton_off">
                                    <div class="add_right">
                                        ADD FEED
                                    </div>
                                </div>
                                <div id="CommunityButton" style="display:block;" title="Browse other people's profiles, public pages, and get even more stuff for your page" onclick="document.location.href='community'">
                                    Community
                                </div>
                                <div id="Start" title="Get More Stuff for your page, pick a theme, share your page, and update your profile" onclick="Start.toggleStart()">
                                    <!--<div class="add_right">ADD&nbsp;FLAKE</div>-->
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td id="tabs_container_td">
                            <div id="left_scroll">
                                &lt;
                            </div>
                            <div id="tabs_container_scroll">
                                <div id="tabs_container">
                                    <ul id="tabs" class="tabs">                                        
                                    </ul>
                                </div>
                            </div>
                            <div id="right_scroll">
                                &gt;
                            </div>
                        </td>
                    
                        <td valign="top" id="TopMenuContainer" align="right" style="width:215px;">
                            <div style="width:200px;">
                                &nbsp;
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
        <div id="gray_panel_dropdown_settings"></div>
        <div id="messageBar" style="display: block;">
            <span id="HideThisMessageLink">
                <a class="InProductLink" href="javascript:void(0)" id="messageBarClose" onclick="$nodisplay('messageBar')">Hide This message</a>
            </span>
            <span id="errorMsg">        
            </span>
            <div class="pushdown">
            </div>
        </div>
        <div id="PageLoadProgress">
        </div>                       
        <div id="body">
            <pre id="ErrorOnPage" enableviewstate="false" runat="server" visible="false"></pre>
        </div>
	    <div class="pushdown"></div>
        <div id="busyUI" style="display: none;background-color: black;width: 100%;height: 100px;position: absolute;left: 0px;top: 0px;z-index: 50001;-moz-opacity: 0;opacity: 0; cursor: wait" onclick="return false" onmousedown="return false" onmousemove="return false" onmouseup="return false" ondblclick="return false">
            &nbsp;
        </div>
        <div class="sendFlakeOptionsContainer" id="sendFlakeOptionsMenu" style="display: none;">
            <b>
            </b>
            <div class="sendFlakeOptions" onclick="FlakeMenu.emailFriend();" onmouseover="hover(this)" onmouseout="hout(this)">
                <strong>
                    Email to a friend
                </strong>
            </div>
            <div class="sendFlakeOptions" onclick="FlakeMenu.putInBlog();" onmouseover="hover(this)" onmouseout="hout(this)">
                <strong>
                    Take Flake
                </strong>
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
                <li><a href="/Community/Pages/Page.aspx">Pagecasts</a> |</li>
                <li><a href="/Community/Content/Flakes.aspx">Flakes</a> |</li>
                <li><a href="/Community/ProfileDirectory.aspx">People</a> |</li>
                <!--
                <li><a href="http://forums.Pageflakes.com/">Help & Support</a> |</li>
                //--><li><a href="http://company.Pageflakes.com/tos">Terms</a> |</li>
                <li><a href="http://company.Pageflakes.com/privacy">Privacy</a> |</li>
                <li><a href="http://company.Pageflakes.com/aboutus">About Us</a> |</li>
                <!-- may be cached
                <li><a href="http://developers.Pageflakes.com/">Developers</a></li>
                //-->
                <li><a href="http://192.168.1.2/pageflakes/developers/Gettingstarted.html">Developers</a></li>
            </ul>
        </div>      
        </div>
    <div>

    </div>
    
     <script type="text/javascript" id="StartupJSON">
         

         var __getJsonQueryString = '?<%=Session["currentuser"] %>&<%=Session["TimeSpamp"] %>';
         document.write('<' + 'script type="text/javascript" id="GetJSON" src="GetJSON.ashx' + __getJsonQueryString + '"> <' + '/script>');  
    </script> 
       
     <script type="text/javascript" src="f.axd?s=Framework&t=j&v=217en&l=en" ></script> 
     <script type="text/javascript">
     //f.axd?s=Framework&t=j&v=217en&l=en

         App.IsCompactFramework = false;
         var StartPage = { init: function () { if (window.startupInfo != null) { $DC(function () { loadFirstPage(); }); } } };
         App.startup(true);  
    </script>     
     <script type="text/javascript">
         if (typeof Sys == "undefined" || typeof App == "undefined" || typeof PrimaryFramework == "undefined") {
             document.write("<" + "script src=\"test/log.ashx?" + encodeURI(window.navigator.userAgent) + "\" type=\"text/javascript\" /><" + "/script>");
             if (confirm("typeof primary " + typeof PrimaryFramework ))
                 document.location.href = "http://forums.Pageflakes.com/";
         }
         else {
             $DC(function () { SearchForm.init(); });
             if (typeof StartPage != "undefined") $DC(function () { if (StartPage) StartPage.init(); });

         }
    </script>
    <script id="PostFrameworkLoaderScript" type="text/javascript">
        //PF.addScript('PostFrameworkScriptSource', 'f.axd?s=PostFramework&t=j&v=217en');
        var PostFrameworkLoader = {
            load: function () {
                PF.addScript('PostFrameworkScriptSource', 'f.axd?s=PostFramework&t=j&v=217en');
            }
        };       
    </script>
    
     

    <script type="text/vbscript">
        'do a one-time test for a version of VBScript that can handle this code
        detectableWithVB = False
        If ScriptEngineMajorVersion >= 2 then
            detectableWithVB = True
        End If'this next function will detect most plugins
        Function detectActiveXControl(activeXControlName)
        ' on error resume next
        ' detectActiveXControl = False
            If detectableWithVB Then
                detectActiveXControl = IsObject(CreateObject(activeXControlName))
            End If
        End Function'and the following function handles QuickTime
        Function detectQuickTimeActiveXControl()
            on error resume next
            detectQuickTimeActiveXControl = False
            If detectableWithVB Then
                detectQuickTimeActiveXControl = False
                hasQuickTimeChecker = false
                Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1")
                If IsObject(hasQuickTimeChecker) Then
                    If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then
                        detectQuickTimeActiveXControl = True
                    End If
                End If
            End If
        End Function
    </script>
   
    <script type="text/javascript">
        
        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        
    </script>
    <script type="text/javascript" src ="Javascript/GoogleAnalyticsPF.js"></script>
    <script type="text/javascript" >
        
        if (SITE_PREFIX != "undefined") {
            var SITE_PREFIX = "http://192.168.1.2/Pageflakes/";
        }
        if (typeof _gat != 'undefined') {
            var pageTracker = _gat._getTracker('UA-38090433-1');
            pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
            pageTracker._initData();
            GA.init();
        }
          
    </script>

    <script id="CheckForDOMReady" type="text/javascript">
        function domReady() { window.DOMReady = true; } if (Browser.isFirefox) {
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
