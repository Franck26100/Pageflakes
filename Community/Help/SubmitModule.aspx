
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="Content-language" content="COM"/>
<meta name="Robots" content="INDEX,FOLLOW"/>
<meta name="Page-topic" content="Free Content and Applications" />
<title>Pageflakes Community</title>

<script type="text/javascript" src="http://www.Pageflakes.com/Community/basic.js?v=206en" ></script>
<script type="text/javascript" src="http://www.Pageflakes.com/Community/rater.js?v=206en" ></script>
<script type="text/javascript" id="Utility" src="http://www.Pageflakes.com/Utility.js?v=206en"></script>
<link rel="stylesheet" href="/Community/CommunityStyleSheetHandler.axd?h=www.Pageflakes.com&v=206en&b=Unknown&m=0" type="text/css" media="screen" />
    
    <script type="text/javascript">
       function sstchur_SmartScroller_GetCoords()
       {
          var scrollX, scrollY;
          
          if (document.all)
          {
             if (!document.documentElement.scrollLeft)
                scrollX = document.body.scrollLeft;
             else
                scrollX = document.documentElement.scrollLeft;
                   
             if (!document.documentElement.scrollTop)
                scrollY = document.body.scrollTop;
             else
                scrollY = document.documentElement.scrollTop;
          }   
          else
          {
             scrollX = window.pageXOffset;
             scrollY = window.pageYOffset;
          }
       
          document.forms[0].xCoordHolder.value = scrollX;
          document.forms[0].yCoordHolder.value = scrollY;
       }
       
       function sstchur_SmartScroller_Scroll()
       {
          var x = document.forms[0].xCoordHolder.value;
          var y = document.forms[0].yCoordHolder.value;
          window.scrollTo(x, y);
       }
       
       window.onload = sstchur_SmartScroller_Scroll;
       window.onscroll = sstchur_SmartScroller_GetCoords;
       window.onkeypress = sstchur_SmartScroller_GetCoords;
       window.onclick = sstchur_SmartScroller_GetCoords;
    </script>
    
    <link rel="stylesheet" type="text/css" href="/Community/profile.css?v=206en" /><meta http-equiv="Pragma" content="no-cache" /><script id="SessionTracker" src="/SessionTracker.js?v=206en"></script><base href="http://www.Pageflakes.com/Community/Help/" />
<script type="text/javascript">  
    var gaJsHost = (("https:" == document.location.protocol ) ? "https://ssl." : "http://www.");  
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>

<script type="text/javascript" language="Javascript" src="/JavaScripts/GoogleAnalyticsPF.js"></script>

<script type="text/javascript"  >    
    if (SITE_PREFIX != "undefined")
    {
        var SITE_PREFIX = "http://www.Pageflakes.com/"; 
    }        

    if (typeof _gat != 'undefined')
    {
        var pageTracker = _gat._getTracker('UA-2320375-1');
        
        pageTracker._setDomainName(GA.domainName()); // set the domain for the cookie
        pageTracker._initData();  
        GA.init();
    }
        
</script>


<title>

</title></head>


<script type="text/javascript">
    var SITE_PREFIX = 'http://www.Pageflakes.com/';
    
    var DefaultMaster = 
    {
        goBackToMyPage : function(label)
        {
            $trackEventNoTimeOut("Back To My Page Button", "Click", label);
            window.location.href = SITE_PREFIX;
        }
    }
    
</script>
    
<body >
    
    
 	    <div class="header_wrapper">
 	    <div class="header_wrapper_inside">
     	
 		    <div class="header">
 		    <table style="width:100%">
 		    <tr>
 		    <td style="width:50%;" align="left" ><a href="http://www.Pageflakes.com/" title="Pageflakes" class="logo2"><!--img style="float:right" class="logo"  border="0" alt="" src="http://www.Pageflakes.com/Community//Images/backToHome.gif" /--></a></td>
 		    <td style="width:50%" align="right">
 		        <a id="ctl00_BackToMyStartPageLink" class="backToMyPage" title="Back to my startpage" href="http://www.Pageflakes.com/?track=community-help-submitmodule"></a>
 		        </td>
 		    </tr>
 		    <tr>
 		    <td colspan="2" style="width:100%" align="right">
 		    <ul id="ctl00_list" class="navbar2">
 		             <li id="ctl00_default">
                        <a id="ctl00_lnkCentral" href="http://www.Pageflakes.com/Community/?track=commheader">Community Central</a>
                    </li>   
			        <li id="ctl00_flakes">
                        <a id="ctl00_lnkCommunity" href="http://www.Pageflakes.com/Community/Content/Flakes.aspx?track=commheader">Flakes</a>
                    </li>
                    <li id="ctl00_pages">
                        <a id="ctl00_lnkPagecasts" href="http://www.Pageflakes.com/Community/Pages/?track=commheader">Pagecasts</a>
                    </li>
				    <li id="ctl00_profileDirectory">&nbsp;<a id="ctl00_lnkPeople" href="http://www.Pageflakes.com/Community/ProfileDirectory.aspx?track=commheader">People</a>
                    </li>           
                    <li id="ctl00_faq"><a id="ctl00_lnkFaq" href="http://forums.Pageflakes.com/?track=commheader">Help</a></li>           
				    <li id="ctl00_blog" style="border-right:none;"><a id="ctl00_lnkBlog" href="http://blog.Pageflakes.com/?track=commheader">Blog</a></li>           
    				
				    </ul>
 		    </td>
 		    </tr>
 		    </table>
	        </div>
	    </div>
	    </div>
	
	
	
	
	
    	
    <!--div class="header_extraborder_c">
		<!--<div class="back_sp_wrapper">
	        
		</div>
	</div-->

	
	<div class="content_wrapper">
	    
		<div class="content">

            <form name="aspnetForm" method="post" action="SubmitModule.aspx?Module=1" id="aspnetForm" enctype="multipart/form-data">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTEzNzc3ODkxMQ9kFgJmD2QWBAIEDxYCHgdlbmN0eXBlBRNtdWx0aXBhcnQvZm9ybS1kYXRhFgICAQ9kFgICAQ9kFgQCAQ9kFhICAQ8PFgQeBFRZUEUCDB4IVGFiX1NPUlRmZBYEAgEPFgIeBWNsYXNzBQd0YWJzIGNwFgYCAQ8PFgIeB1Zpc2libGVoZBYGAgMPZBYCAgEPDxYCHgtOYXZpZ2F0ZVVybAU3aHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvQ29udGVudC9GbGFrZXMuYXNweGRkAgUPZBYCAgEPDxYCHwUFM2h0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L1BhZ2VzL1BhZ2UuYXNweGRkAgcPZBYCAgEPDxYCHwUFOWh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L1Byb2ZpbGVEaXJlY3RvcnkuYXNweGRkAgMPDxYCHwRoZBYGAgEPZBYCZg8PFgIfBQUbaHR0cDovL2Jsb2cucGFnZWZsYWtlcy5jb20vZGQCAg9kFgJmDw8WAh8FBTFodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9IZWxwL0ZhcS5hc3B4ZGQCAw9kFgJmDw8WAh8FBR1odHRwOi8vZm9ydW1zLnBhZ2VmbGFrZXMuY29tL2RkAgUPDxYCHwRoZBYGAgEPZBYCZg8PFgIfBQVBaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvRGV2ZWxvcGVycy9Eb2N1bWVudGF0aW9uLmFzcHhkZAIDD2QWAmYPDxYCHwUFN2h0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L0RldmVsb3BlcnMvRkFRLmFzcHhkZAIFD2QWAmYPDxYCHwUFOWh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L0RldmVsb3BlcnMvRm9ydW0uYXNweGRkAgMPZBYEAgIPDxYEHgRUZXh0BQlTb3J0IGJ5OiAfBGhkZAIEDxAPFgIfBGgWAh4Ib25jaGFuZ2UFlwFqYXZhc2NyaXB0OnJlbG9hZFBhZ2UoJ2N0bDAwX01haW5Ib2xkZXJfZmVlZENvbnRyb2xfbGVmdE1haW5Db250cm9sX3RhYkNvbnRyb2xfZHJwU29ydEJ5JywnaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvSGVscC9TdWJtaXRNb2R1bGUuYXNweCcpDxYDZgIBAgIWAxAFDCBQb3B1bGFyaXR5IAUBMGcQBQggUmF0aW5nIAUBMWcQBRIgUHVibGljYXRpb24gZGF0ZSAFATRnFgFmZAIDDw8WAh8EaGRkAgUPDxYCHwRoZBYCAgEPZBYCAgIPZBYCAgEPZBYEAgEPZBYEAgMPEA9kFgIfBwVtamF2YXNjcmlwdDpyZWxvYWRQYWdlKCdjdGwwMF9NYWluSG9sZGVyX2ZlZWRDb250cm9sX2xlZnRNYWluQ29udHJvbF9mb3J1bUNvbnRyb2xfZm9ydW1Db250cm9sX2Ryb3Bkb3dHcm91cHMnKWQWAGQCBQ8PFgIfBGhkZAICD2QWAgIID2QWAgIBDw8WAh8EaGRkAgcPZBYCAgEPZBYCAgMPZBYCAgMPZBYCAgEPZBYCAgEPZBYCAgEPZBYCAgMPZBYCAgEPFgIeC18hSXRlbUNvdW50AgUWCmYPZBYCAgEPZBYCAgEPDxYEHgtDb21tYW5kTmFtZQUJU3RhcnRUcmVrHg9Db21tYW5kQXJndW1lbnQFATFkZAIBD2QWAgIBD2QWAgIBDw8WBB8JBQlTdGFydFRyZWsfCgUBMmRkAgIPZBYCAgEPZBYCAgEPDxYEHwkFCVN0YXJ0VHJlax8KBQEzZGQCAw9kFgICAQ9kFgICAQ8PFgQfCQUJU3RhcnRUcmVrHwoFATRkZAIED2QWAgIBD2QWAgIBDw8WBB8JBQlTdGFydFRyZWsfCgUBNWRkAgkPDxYCHwRoZBYCAgEPZBYCAgIPZBYCZg88KwAJAGQCCw8PFgIfBGhkFgQCAQ8WAh8EaGQCEQ8PFgIfBQUqL0NvbW11bml0eS9IZWxwL1N1Ym1pdE1vZHVsZS5hc3B4P01vZHVsZT0xZGQCDQ8PFgIfBGhkZAIPDw8WAh8EaGRkAhEPDxYCHwRnZBYIAgMPEA8WAh4HQ2hlY2tlZGdkZGRkAg8PDxYCHwRoZGQCEg8PFgIfBGhkZAIUDw8WAh8FBTZodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9Db250ZW50L0ZlZWRzLmFzcHhkZAIDD2QWCgIBDw8WAh8EaGQWAgIBD2QWAgIDD2QWAgIDDxBkZBYAZAIDDw8WAh8EZ2QWBAIBD2QWBAIBDw8WAh8GBQlQYWdlY2FzdHNkZAIDDxYCHwgCChYUZg9kFgQCAQ8PFgIfBQUwaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9udXR0eWxvdmVzbWEvMjAxODgyMjAvZBYCZg8PFgQeDUFsdGVybmF0ZVRleHQFCVZpZXcgcGFnZR4ISW1hZ2VVcmwFNGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L2ltYWdlcy92UGx1cy5naWZkZAICDw8WBB8GBQxzY2hvb2wgdG9vbHMfBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMTZkZAIBD2QWBAIBDw8WAh8FBStodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0xva2FycmkvMjYyNjY5MDYvZBYCZg8PFgQfDAUJVmlldyBwYWdlHw0FNGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L2ltYWdlcy92UGx1cy5naWZkZAICDw8WBB8GBRdFbmNlcnJhZG9zIC0gSXR4aWFsZC4uLh8FBURodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9QYWdlcy9QYWdlLmFzcHg/bW9kdWxlS2V5PTM1OTAxNWRkAgIPZBYEAgEPDxYCHwUFM2h0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vbGVzbGllLmJvcmRlYXV4LzI2MjY1MjA4L2QWAmYPDxYEHwwFCVZpZXcgcGFnZR8NBTRodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9pbWFnZXMvdlBsdXMuZ2lmZGQCAg8PFgQfBgUOQ2xhc3MgV2ViIFBhZ2UfBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMTRkZAIDD2QWBAIBDw8WAh8FBStodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL2tyODM4NzAvMjYyNjUxNTcvZBYCZg8PFgQfDAUJVmlldyBwYWdlHw0FNGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L2ltYWdlcy92UGx1cy5naWZkZAICDw8WBB8GBQVzYXJhaB8FBURodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9QYWdlcy9QYWdlLmFzcHg/bW9kdWxlS2V5PTM1OTAxM2RkAgQPZBYEAgEPDxYCHwUFMGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vbWF3ZXN0ZW5kb3JmLzI2MDA1OTczL2QWAmYPDxYEHwwFCVZpZXcgcGFnZR8NBTRodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9pbWFnZXMvdlBsdXMuZ2lmZGQCAg8PFgQfBgUXUmVzZWFyY2ggYW5kIEV2YWx1YXQuLi4fBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMTJkZAIFD2QWBAIBDw8WAh8FBTBodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL21hd2VzdGVuZG9yZi8yNjIxNDM3NS9kFgJmDw8WBB8MBQlWaWV3IHBhZ2UfDQU0aHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvaW1hZ2VzL3ZQbHVzLmdpZmRkAgIPDxYEHwYFE0ZydWl0dmFsZSBMaWJyYXJpZXMfBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMTBkZAIGD2QWBAIBDw8WAh8FBTBodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL21hd2VzdGVuZG9yZi8yNjE5MTYwMC9kFgJmDw8WBB8MBQlWaWV3IHBhZ2UfDQU0aHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvaW1hZ2VzL3ZQbHVzLmdpZmRkAgIPDxYEHwYFCk11bHRpbWVkaWEfBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMTFkZAIHD2QWBAIBDw8WAh8FBStodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL3NiODM3NTMvMjYyNjUxNTgvZBYCZg8PFgQfDAUJVmlldyBwYWdlHw0FNGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L2ltYWdlcy92UGx1cy5naWZkZAICDw8WBB8GBQVTYXJhaB8FBURodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9QYWdlcy9QYWdlLmFzcHg/bW9kdWxlS2V5PTM1OTAwOWRkAggPZBYEAgEPDxYCHwUFMGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vbWF3ZXN0ZW5kb3JmLzI1ODMxMzU5L2QWAmYPDxYEHwwFCVZpZXcgcGFnZR8NBTRodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9pbWFnZXMvdlBsdXMuZ2lmZGQCAg8PFgQfBgUXRmF2b3JpdGUgRnJ1aXR2YWxlIFcuLi4fBQVEaHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4P21vZHVsZUtleT0zNTkwMDhkZAIJD2QWBAIBDw8WAh8FBTBodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL21hd2VzdGVuZG9yZi8yNTgzMTM1My9kFgJmDw8WBB8MBQlWaWV3IHBhZ2UfDQU0aHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvaW1hZ2VzL3ZQbHVzLmdpZmRkAgIPDxYEHwYFF0hlYWx0aCBhbmQgUC5FLiBMaW5rLi4uHwUFRGh0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L1BhZ2VzL1BhZ2UuYXNweD9tb2R1bGVLZXk9MzU5MDA3ZGQCAw8PFgIfBGhkZAIFDw8WAh8EaGQWAgIBDw8WAh8EaGRkAgcPDxYCHwRoZGQCCQ9kFgICAQ8WAh8IAgEWAmYPZBYKAgEPDxYCHwUFQ2h0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L0hlbHAvU3VibWl0TW9kdWxlLmFzcHg/TW9kdWxlPTBkFgJmDw8WAh8NBTpodHRwOi8vd3d3LnBhZ2VmbGFrZXMuY29tL0NvbW11bml0eS9pbWFnZXMvc3VibWl0Rmxha2UucG5nZGQCAw8PFgQfDQU6aHR0cDovL3d3dy5wYWdlZmxha2VzLmNvbS9Db21tdW5pdHkvaW1hZ2VzL3N1Ym1pdEZsYWtlLnBuZx8EaGRkAgUPDxYEHwUFQ2h0dHA6Ly93d3cucGFnZWZsYWtlcy5jb20vQ29tbXVuaXR5L0hlbHAvU3VibWl0TW9kdWxlLmFzcHg/TW9kdWxlPTAfBgUPSGVscCB1cyBpbXByb3ZlZGQCBg8PFgIfBGhkZAIIDw8WAh8GBaMBWW91ciBmYXZvcml0ZSBibG9nIGZlZWQgaXMgbWlzc2luZyBpbiBvdXIgZGlyZWN0b3J5PyBPciB5b3UndmUgZGV2ZWxvcGVkIDxiciAvPmEgZmxha2UgYW5kIHdhbnQgdG8gYWRkIGl0IHRvIDxiciAvPnRoZSBzaXRlPyBXZSBsb29rIGZvcndhcmQgdG8geW91ciBjb250cmlidXRpb25zIWRkAgUPZBYCAgEPFgIfBgWDCjxzdHlsZT4NCgkJCQkuZm9vdGVyX3dyYXBwZXIgDQoJCQkJew0KCQkJCQltYXJnaW46IDZweCAwIDAgMDsNCgkJCQkJd2lkdGg6IDEwMCU7DQoJCQkJCWZvbnQ6IDEwcHgvMTJweCBWZXJkYW5hLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOw0KCQkJCQlwYWRkaW5nOiAyNHB4IDA7DQoJCQkJCXRleHQtYWxpZ246IGNlbnRlcjsNCgkJCQkJY2xlYXI6Ym90aDsNCgkJCQl9DQoNCgkJCQkuZm9vdGVyX2Jsb2NrDQoJCQkJew0KCQkJCQlmbG9hdDpub25lOw0KCQkJCQl3aWR0aDphdXRvOw0KCQkJCX0NCg0KCQkJCXVsLmZvb3Rlcl9ibG9jayANCgkJCQl7DQoJCQkJCW1hcmdpbjogMCBhdXRvOw0KCQkJCQlwYWRkaW5nOiAwOw0KCQkJCQlsaXN0LXN0eWxlOiBub25lOw0KCQkJCQlsaXN0LXN0eWxlDQoJCQkJfQ0KDQoJCQkJdWwuZm9vdGVyX2Jsb2NrIGxpDQoJCQkJew0KCQkJCQlkaXNwbGF5OiBpbmxpbmU7DQoJCQkJfQ0KDQoJCQkJdWwuZm9vdGVyX2Jsb2NrIGEgDQoJCQkJew0KCQkJCQlwYWRkaW5nOiAwIC41ZW07DQoJCQkJfQ0KDQoJCQk8L3N0eWxlPg0KCQkJPGRpdiBjbGFzcz0iZm9vdGVyX3dyYXBwZXIiPg0KCQkJPHVsIGNsYXNzPSJmb290ZXJfYmxvY2siPg0KCQkJPGxpPjxhIGhyZWY9Ii9Db21tdW5pdHkvUGFnZXMvUGFnZS5hc3B4Ij5QYWdlY2FzdHM8L2E+IHw8L2xpPg0KCQkJPGxpPjxhIGhyZWY9Ii9Db21tdW5pdHkvQ29udGVudC9GbGFrZXMuYXNweCI+Rmxha2VzPC9hPiB8PC9saT4NCgkJCTxsaT48YSBocmVmPSIvQ29tbXVuaXR5L1Byb2ZpbGVEaXJlY3RvcnkuYXNweCI+UGVvcGxlPC9hPiB8PC9saT4NCgkJCTxsaT48YSBocmVmPSJodHRwOi8vZm9ydW1zLnBhZ2VmbGFrZXMuY29tLyI+SGVscCAmIFN1cHBvcnQ8L2E+IHw8L2xpPg0KPCEtLQ0KCQkJPGxpPjxhIGhyZWY9Imh0dHA6Ly9ibG9nLnBhZ2VmbGFrZXMuY29tLyI+SW5zaWRlciBCbG9nPC9hPiB8PC9saT4gDQotLT4NCgkJCTxsaT48YSBocmVmPSJodHRwOi8vY29tcGFueS5wYWdlZmxha2VzLmNvbS90b3MiPlRlcm1zPC9hPiB8PC9saT4NCgkJCTxsaT48YSBocmVmPSJodHRwOi8vY29tcGFueS5wYWdlZmxha2VzLmNvbS9wcml2YWN5Ij5Qcml2YWN5PC9hPiB8PC9saT4NCgkJCTxsaT48YSBocmVmPSJodHRwOi8vY29tcGFueS5wYWdlZmxha2VzLmNvbS9hYm91dHVzIj5BYm91dCBVczwvYT4gfDwvbGk+IA0KCQkJDQoJCQk8bGk+PGEgaHJlZj0iaHR0cDovL2RldmVsb3BlcnMucGFnZWZsYWtlcy5jb20vIj5EZXZlbG9wZXJzPC9hPjwvbGk+DQoJCQk8L3VsPg0KCQkJPC9kaXY+ZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBQVDY3RsMDAkTWFpbkhvbGRlciRmZWVkQ29udHJvbCRsZWZ0TWFpbkNvbnRyb2wkZmVlZENvbnRyb2wkcmFkaW9GbGFrZQVDY3RsMDAkTWFpbkhvbGRlciRmZWVkQ29udHJvbCRsZWZ0TWFpbkNvbnRyb2wkZmVlZENvbnRyb2wkcmFkaW9GbGFrZQVCY3RsMDAkTWFpbkhvbGRlciRmZWVkQ29udHJvbCRsZWZ0TWFpbkNvbnRyb2wkZmVlZENvbnRyb2wkcmFkaW9GZWVkBUVjdGwwMCRNYWluSG9sZGVyJGZlZWRDb250cm9sJGxlZnRNYWluQ29udHJvbCRmZWVkQ29udHJvbCRyYWRpb1BvZGNhc3QFRWN0bDAwJE1haW5Ib2xkZXIkZmVlZENvbnRyb2wkbGVmdE1haW5Db250cm9sJGZlZWRDb250cm9sJHJhZGlvUG9kY2FzdG+Y9D3Nz6dImPKXbPGV4b0EaBKP" />


<script src="/ScriptResource.axd?d=QPuADODZlK2fOf0wCTcaqdlLNOc2epOsV5g4CPqyDxIByVn2jv6wiSrmDzDYdBTuAk7HgRGi89Go9puDW0BDru7cAfIm0hF5w-uYpRPDVls1&amp;t=633546675112678110" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
Sys.Services._AuthenticationService.DefaultWebServicePath = '../../Authentication_JSON_AppService.axd';
Sys.Services.AuthenticationService._setAuthenticated(true);
//]]>
</script>
 
                
                
            <input type="hidden" name="xCoordHolder" id="xCoordHolder" value="0" />
            <input type="hidden" name="yCoordHolder" id="yCoordHolder" value="0" />
            
            
    

<div id="ContentControl">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td valign="top">
                

<div class="left_column">
    
    
 
 <script type="text/javascript">
 
 function reloadPage(elementId, homeurl)
 {
   var element = $get(elementId);
   
   var url ='';
   
   var sortByParam = "Sort=" + element.value;
   
   if (homeurl.indexOf('?') > 0)
   {
        url = homeurl + '&' + sortByParam;
   }
   else 
   {
        url = homeurl + '?' + sortByParam;
   }
   document.location.href = url;
 }
 
 </script>



<ul id="ctl00_MainHolder_feedControl_leftMainControl_tabControl_list" class="tabs cp">
    
    
    
    
         
          
 </ul>			
 
 
 <div class="tabs_select" >
    <div id="ctl00_MainHolder_feedControl_leftMainControl_tabControl_UpdateProgress1" style="display:none;">
	
            <img src="../images/indicator.gif" alt="loading.." />
        
</div>&nbsp;</div>
    <div class="uf">
    &nbsp;</div> 
    


   
    
	
    
    
	
    
	
	
    <!-- support control -->
    
    
    
    

<div style="display:none;">
    <span id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_lblTrace"></span>
</div>

<div class="submit_form submit_fb">
	

	 
	
	<label >Category:</label>
	    <table cellpadding="0" cellspacing="0"><tr><td><input id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_radioFlake" type="radio" name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$pType" value="radioFlake" onclick="javascript:setTimeout('__doPostBack(\'ctl00$MainHolder$feedControl$leftMainControl$feedControl$radioFlake\',\'\')', 0)" /></td><td>Flake
        </td>
            <td>
                <input id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_radioFeed" type="radio" name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$pType" value="radioFeed" checked="checked" /></td>
            <td>
                Feed 
            </td>
            <td>
                <input id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_radioPodcast" type="radio" name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$pType" value="radioPodcast" onclick="javascript:setTimeout('__doPostBack(\'ctl00$MainHolder$feedControl$leftMainControl$feedControl$radioPodcast\',\'\')', 0)" /></td>
            <td>
                Podcast</td>
        </tr></table>
        <br />
    <label>
        Feed Name:</label> 
	    <table cellpadding="0" cellspacing="0"><tr><td><input name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$textBoxFlakeName" type="text" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_textBoxFlakeName" /></td>
	        <td>
	        &nbsp;
	          
	        </td>
	        </tr> 
	    </table>
	       
	<div class="form_space"></div>
	<label>Tags:</label><table cellpadding="0" cellspacing="0"><tr><td> <input name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$textBoxTags" type="text" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_textBoxTags" />	</td><td>
	&nbsp; </td></tr>
        <tr>
            <td class="small_text" colspan="2">
                Enter multiple tags separated by commas</td>
       </tr>
    </table>
	<label>Description:</label>
	<table cellpadding="0" cellspacing="0" align="left"><tr><td><textarea name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$textBoxDescription" rows="5" cols="20" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_textBoxDescription"></textarea></td>
	<td valign="top" style="padding-top:4px;">&nbsp; </td></tr></table>
	
	<div class="form_space"></div>
	
	
	
	<div id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_panelOtherUrl" style="display:inline;">
	
       
     

	<label>Feed URL:</label> 
        <input name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$textBoxModuleOther" type="text" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_textBoxModuleOther" /> 
        &nbsp;
          
        <div class="form_space"></div>
        <label>Email Address:</label>
        <table cellpadding="0" cellspacing="0" id="tableTextboxOtheremail"><tr><td><input name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$textBoxOthersEmail" type="text" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_textBoxOthersEmail" /></td><td class="small_text" >Optional</td></tr></table>       
        <div class="form_space"></div>
	
</div>

  <label>Upload Thumbnail:</label>
     
  <table cellpadding="0" cellspacing="0"><tr>
  <td><input type="file" name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$fileUploadThumbImage" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_fileUploadThumbImage" /></td>
  <td class="small_text">Optional</td></tr>
    <tr><td class="small_text" colspan="2">
        JPG or GIF, 80KB max<br />
        80X80 pixels</td></tr>
  </table>
  
  <div class="form_space"></div>     
  	
	
    
    
    
    <input type="submit" name="ctl00$MainHolder$feedControl$leftMainControl$feedControl$btnSave" value="Submit" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$MainHolder$feedControl$leftMainControl$feedControl$btnSave&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_btnSave" class="button" /><span class="orcancel">or&nbsp;<a id="ctl00_MainHolder_feedControl_leftMainControl_feedControl_lnkCancel" href="http://www.Pageflakes.com/Community/Content/Feeds.aspx">cancel</a></span>
</div>
		
</div>
            </td>
            <td valign="top" align="left">
                

<div class="right_column">



<div class="popular_wrapper">
    <div id="ctl00_MainHolder_feedControl_rightControl_miscModules">
	
        


<h3>New <span id="ctl00_MainHolder_feedControl_rightControl_popControl_headerText">Pagecasts</span></h3>


   <div class="pop_row odd_pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl00_lnkAddToPage" href="http://www.Pageflakes.com/nuttylovesma/20188220/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl00_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl00_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359016">school tools</a><br/>
   </div>

   <div class="pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl01_lnkAddToPage" href="http://www.Pageflakes.com/Lokarri/26266906/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl01_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl01_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359015">Encerrados - Itxiald...</a><br/>
   </div>

   <div class="pop_row odd_pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl02_lnkAddToPage" href="http://www.Pageflakes.com/leslie.bordeaux/26265208/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl02_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl02_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359014">Class Web Page</a><br/>
   </div>

   <div class="pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl03_lnkAddToPage" href="http://www.Pageflakes.com/kr83870/26265157/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl03_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl03_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359013">sarah</a><br/>
   </div>

   <div class="pop_row odd_pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl04_lnkAddToPage" href="http://www.Pageflakes.com/mawestendorf/26005973/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl04_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl04_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359012">Research and Evaluat...</a><br/>
   </div>

   <div class="pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl05_lnkAddToPage" href="http://www.Pageflakes.com/mawestendorf/26214375/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl05_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl05_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359010">Fruitvale Libraries</a><br/>
   </div>

   <div class="pop_row odd_pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl06_lnkAddToPage" href="http://www.Pageflakes.com/mawestendorf/26191600/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl06_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl06_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359011">Multimedia</a><br/>
   </div>

   <div class="pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl07_lnkAddToPage" href="http://www.Pageflakes.com/sb83753/26265158/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl07_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl07_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359009">Sarah</a><br/>
   </div>

   <div class="pop_row odd_pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl08_lnkAddToPage" href="http://www.Pageflakes.com/mawestendorf/25831359/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl08_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl08_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359008">Favorite Fruitvale W...</a><br/>
   </div>

   <div class="pop_row">
        <a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl09_lnkAddToPage" href="http://www.Pageflakes.com/mawestendorf/25831353/"><img id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl09_addImage" class="addtomyflakes" src="http://www.Pageflakes.com/Community/images/vPlus.gif" alt="View page" border="0" /></a><a id="ctl00_MainHolder_feedControl_rightControl_popControl_lstPopular_ctl09_lnkTitle" href="http://www.Pageflakes.com/Community/Pages/Page.aspx?moduleKey=359007">Health and P.E. Link...</a><br/>
   </div>

<span id="ctl00_MainHolder_feedControl_rightControl_popControl_lblNoModules"></span>

        <br />
        
    
</div>
    
    
    
        
</div>
    
<div class="forum_post"></div>

<div class="rc_item">
           
          <a id="ctl00_MainHolder_feedControl_rightControl_info_lstInfo_ctl00_lnkImageLink" href="http://www.Pageflakes.com/Community/Help/SubmitModule.aspx?Module=0"><img id="ctl00_MainHolder_feedControl_rightControl_info_lstInfo_ctl00_icon" class="rc_icon" src="http://www.Pageflakes.com/Community/images/submitFlake.png" alt="icon" border="0" /></a>
          
        <div class="rc_text">
	        <h3><a id="ctl00_MainHolder_feedControl_rightControl_info_lstInfo_ctl00_lnkTextLink" href="http://www.Pageflakes.com/Community/Help/SubmitModule.aspx?Module=0">Help us improve</a></h3>
	        <p>
              <span id="ctl00_MainHolder_feedControl_rightControl_info_lstInfo_ctl00_lblDescription" class="right_panel_info">Your favorite blog feed is missing in our directory? Or you've developed <br />a flake and want to add it to <br />the site? We look forward to your contributions!</span>
            </p>
	        <br />
	        <br />
        </div>
         
</div>
 
        
</div>
            </td>
        </tr>
    </table>
</div>

                            
            
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWCwKT6OG3AQLaq46hCgLz+M3tAgKx1/LtBAKyqfGrBALZ2fKPCQLxsbesBQL2ndj8AwKZgcj2AQLt0pKHBgKgj4aWCXFwMsA/yhvoM6mMsBU7A4VrvxyR" />

<script type="text/javascript">
//<![CDATA[
Sys.Application.initialize();
//]]>
</script>
</form>
    
        </div>
       
    </div> 
    <div id="pushItem" class="push">
        
    </div>
    
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
			<li><a href="http://forums.Pageflakes.com/">Help & Support</a> |</li>
<!--
			<li><a href="http://blog.Pageflakes.com/">Insider Blog</a> |</li> 
-->
			<li><a href="http://company.Pageflakes.com/tos">Terms</a> |</li>
			<li><a href="http://company.Pageflakes.com/privacy">Privacy</a> |</li>
			<li><a href="http://company.Pageflakes.com/aboutus">About Us</a> |</li> 
			
			<li><a href="http://developers.Pageflakes.com/">Developers</a></li>
			</ul>
			</div>
    <div class="pushdown"><input type="text" id="txtFooter" style="display:none;" /></div>
</div>
</div>

    

	





<script type="text/javascript"> 
      if (typeof(Sys) !== "undefined") Sys.Application.notifyScriptLoaded();
</script>


<script type="text/javascript"> 
       $get('pushItem').style.height = document.body.clientHeight < 600 ?  "250px" : "70px";
</script>

<script id="CheckForDOMReady" type="text/javascript">
    function domReady() { window.DOMReady = true; }

    if (Browser.isFirefox) {
        document.addEventListener("DOMContentLoaded", domReady, false);
    }
    else if (Browser.isIE)
    { 
      document.write('<' + 'script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
      var contentloadtag=document.getElementById("contentloadtag");
      contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete")
          domReady();
      }
    }
    else 
    { 
        domReady(); 
    }
</script>

</body>
     
     
</html>
