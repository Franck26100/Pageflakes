<%@ Page Language="C#" AutoEventWireup="true" CodeFile="search.aspx.cs" Inherits="search" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
    <head runat="server">
        <title>
	        Search Results
        </title>
        <link rel="stylesheet" href="s.axd?s=CSS1&h=http://localhost/pageflakes&l=en&v=217en&b=IE&m=9&t=App_Themes%2fPurple_Unified&e=community" />
        <script src="http:/localhost/pageflakes/Utility.js?v=217en" type="text/javascript" ></script>
        <script type="text/javascript">
            var SITE_PREFIX = 'http://localhost/pageflakes/';
            var DefaultMaster =
            {
                goBackToMyPage: function (label) {
                    $trackEventNoTimeOut("Back To My Page Button", "Click", label);
                    window.location.href = SITE_PREFIX;
                }
            }
        </script>
        <script id="SessionTracker" src="/SessionTracker.js?v=217en"></script>
        <base href="http://localhost/pageflakes/" />    
        <style type="text/css">
            #googleSearchUnitIframe { 
                width: 66%; 
                margin: 0 0 0 42px;
                padding: 50px 0 0 0;
                float: left;
            } 
            iframe {
	            height: 1500px;
	            float: left;
	            margin: 0;
	            padding: 0;
            }
            iframe a:link, a:link {
	            color: black;
            }
            .backToMyPage
            {
	            width:149px;
	            height:48px;
	            display:block;
	            margin-top:-9px;
	            cursor:pointer;
	            cursor:hand;
            }
            .backToMyPage{background-image:url('/Community/images/backToHome.gif');}
        </style>
    </head>
    <body style="background:none">    
        <div id="header" style="height:70px">
            <div id="header_extra">
	            <table cellpadding="0" cellspacing="0" width="100%">
	                <tr>
	                    <td colspan="2" style="position:relative;">
                            <div id="headerLeft"> 
                                <a href="http://localhost/pageflakes/">
                                    <div class="logo" >
                                    </div> 
                                </a>
                                <div class="partnerlogo"></div>
                            </div>
                            <div id="headerRight" style="height:65px">
                                <!-- Search Google In the future the search box hmtl will be coming from the Settins XML but PM wants time to re-vamp the Settings XML hierarchy -->
		                        <!-- the CSS that reference the div below control position -->
		                        <div id="searchPageSearchContainer">
		                            <form  method="get" action="search.aspx" target="_top">
		                                <!-- the CSS that references the input box below control the background position of the text inside -->
		                                <input id="domainSearchBox" name="q" type="text" onblur="if(this.value=='')this.value='Google';" onfocus="if(this.value=='Google')this.value='';" size="25" maxlength="255" value="Google" />
		                                <!-- the value below is used as a manual version, increment it when changes are made to the search html so the browser retrieves the new hmtl -->
		                                <input type="hidden" name="v" value="1"/>
		                                <input type="hidden" name="client" value="pub-3514338521707944"/>
		                                <input type="hidden" name="forid" value="1"/>
		                                <input type="hidden" name="ie" value="UTF-8"/>
		                                <input type="hidden" name="oe" value="UTF-8"/>
		                                <input type="hidden" name="safe" value="active"/>
		                                <input type="hidden" name="cof" value="S:http://;FORID:11"/>
		                                <input type="hidden" name="hl" value="en"/>
		                            </form>
		                        </div>
		                        <!-- End Search Google -->
	                        </div>
			            </td>
			            <td style="" align="right">
                            <a id="BackToMyStartPageLink" class="backToMyPage" title="Back to my startpage" href="http://localhost/pageflakes/?track=search"></a>
                        </td>
                    </tr>
			    </table>
            </div>
        </div>
        <!-- Google Search Result Snippet Begins -->
        <div id="googleSearchUnitIframe"></div>
        <script type="text/javascript">
            var googleSearchIframeName = "googleSearchUnitIframe";
            var googleSearchFrameWidth = 600;
            var googleSearchFrameborder = 0;
            var googleSearchDomain = "www.google.com";
            var searchBox = $("domainSearchBox");
            var searchValue = '';
            if (searchValue.length > 0) {
                searchBox.value = searchValue.replace(/\+/g, " ");
            }
        </script>
        <script type="text/javascript" src="http://www.google.com/afsonline/show_afs_search.js"></script>
        <!-- Google Search Result Snippet Ends -->
        <div id="footer_wrapper" >
            <div id="footer" >
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
					    list-style
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
                <div class="pushdown"><input type="text" id="txtFooter" style="display:none;" /></div>
            </div>
        </div> 
        <script type="text/javascript">
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript" language="Javascript" src="/JavaScripts/GoogleAnalyticsPF.js"></script>
        <script type="text/javascript"  >
            if (SITE_PREFIX != "undefined") {
                var SITE_PREFIX = "http://localhost/pageflakes/";
            }
            if (typeof _gat != 'undefined') {
                var pageTracker = _gat._getTracker('UA-2320375-1');
                pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
                pageTracker._initData();
                GA.init();
            }        
        </script>
        <script type="text/javascript">
            if (typeof (Sys) !== "undefined") Sys.Application.notifyScriptLoaded();
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
