<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DefaultPageContent.aspx.cs" Inherits="DefaultPageContent" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    
<div id="pagecast_invite_panel" style="display:none;">

    <div style="display:inline;padding-right:7px;">

        <strong>Pagecast URL:</strong> <input type="text" id="pIUrl" readonly="readonly" onfocus="this.select()"  style="background:#DADADA;border: solid 1px #b3b3b3;width:250px;"/>

   </div>

   <div style="border-left:solid 1px #b3b3b3;padding-left:8px;display:inline"> 

    <strong>Invite People:</strong>

    <input id="pIEmail" type=text style="width:300px;" />&nbsp;<input type="button" id="pIButton" class="button"  style="cursor:hand;cursor:pointer;margin-top:1px;" value="Send Link" /> &nbsp; <a id="pIImportAddress"  style="cursor:hand;cursor:pointer;font-size:7pt;">Import addresses</a>  

    

    <div id="pISendInProgress" style="display:none;position:absolute;margin-left:-10px;">

     <div id="pISending" style="display:inline;" >

        <table style="margin-top:2px;margin-left:0px;"><tr><td><span class="ajax_indicator"></span><!--<img src="indicator.gif" alt="send" />--></td><td>&nbsp;Sending...</td></tr></table>

     </div>

     <div id="pISent" style="display:none;">

        <table style="margin-top:2px;margin-left:0px;"><tr><td>Sent!</td></tr></table>

     </div>

     

    </div>

    <!-- trick to hold the items togher -->

    <input type="button" style="margin-top:1px;visibility:hidden;width:0px;"/>

  </div>

</div>

<div align="center" style="display:none;" id="quick_invite_bar">

    <a class="colapse_icon" id="collaspe_link" href="javascript:void(0)" style="display:none;" title="Click to collapse" ></a>

    <a class="expand_icon" id="expand_link" style="display:none;" href="javascript:void(0)"  title="Click to expand" ></a>

</div>  





 



<div class="sendFlakeOptionsContainer" id="sendFlakeOptionsMenu" style="display:none">

    <b></b>

    <div class="sendFlakeOptions" onclick="FlakeMenu.emailFriend();" onmouseover="hover(this)" onmouseout="hout(this)"><strong>Email to a friend</strong></div>

    <div class="sendFlakeOptions" onclick="FlakeMenu.putInBlog();" onmouseover="hover(this)" onmouseout="hout(this)"><strong>Take Flake</strong></div>

</div>





<div id="improvedTooltip_NO_" class="improvedTooltip">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">

        <tr>

            <td class="improvedTooltip_lt">

            </td>

            <td class="improvedTooltip_t">

                <span id="improvedTooltipTop_NO_" class="improvedTooltipArrow_top"></span>

            </td>

            <td class="improvedTooltip_rt">

            </td>

        </tr>

        <tr>

            <td class="improvedTooltip_l">

                <span id="improvedTooltipLeft_NO_" class="improvedTooltipArrow_left"></span>

            </td>

            <td bgcolor="#ffffcc">

                <span class="improvedTooltip_close" id="improvedTooltipClose_NO_">X</span><div class="improvedTooltipContent">

                    _CONTENT_</div>

            </td>

            <td class="improvedTooltip_r">

                <span id="improvedTooltipRight_NO_" class="improvedTooltipArrow_right"></span>

            </td>

        </tr>

        <tr>

            <td class="improvedTooltip_lb">

            </td>

            <td class="improvedTooltip_b">

                <span id="improvedTooltipBottom_NO_" class="improvedTooltipArrow_bottom"></span>

            </td>

            <td class="improvedTooltip_rb">

            </td>

        </tr>

    </table>

</div>

<!--

<div id="FlakePreview" style="left: 0px; top: -1000px">

    <div id="FlakeContainer">

    </div>

    <div id="FlakePreviewButtons">

        <input id="AddToPageButton" type="button" value="Add to Page" />

        <input id="CancelFlakeAdd" type="button" value="Cancel" />

    </div>

</div>

-->

<div id="confirmDialog" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <div id="confirmDialog_title">

            Are you sure you want to do this?

        </div>

        <fieldset>

            <legend>What would you like to do?</legend>

            <div class="confirm_choices">

                <div class="confirmDialog_yes_div">

                    <input id="confirmDialog_yes" checked="checked" type="radio" name="confirmDialog_choice" /><label

                        id="confirmDialog_yes_title" for="confirmDialog_yes">Yes</label></div>

                <div class="confirmDialog_no_div">

                    <input id="confirmDialog_no" type="radio" name="confirmDialog_choice" /><label id="confirmDialog_no_title"

                        for="confirmDialog_no">No</label></div>

            </div>

        </fieldset>

        <br />

        <table>

            <tr>

                <td>

                    <input type="button" id="confirmDialog_ok" class="button" style="width: 50px" value="OK" /></td>

                <td id="confirm_cancel_content" style="padding-top: 8px">

                    or

                    <a href="javascript:void(0)" class="cancel" id="confirmDialog_cancel">

                        Cancel

                    </a>

                </td>

            </tr>

        </table>

    </div>

</div>

<div id="BusyDialog" class="popup container hidden" style="left: 0px; top: -1000px">

    <div id="BusyDialogMsg" class="centerDiv padding15">

        Changing theme...</div>

</div>

<div id="SetAsStartPageHelpDialogSafari" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <p>

            <b>

                Follow these steps to make Pageflakes your startpage:

            </b>

            <br />

            <br />

            <ol><li>Select "Preferences" from Safari Menu.<br /></li><li>Go to the "General" category.<br /></li><li>Under "Homepage", type wwww.Pageflakes.com in the location box.<br /></li><li>Click the red x in the top left corner to close the Preference window.<br /><strong>That's it!</strong></li><ol>

        </p>

        <p>

            <input type="button" class="button" value="Close" onclick="javascript:StartPageHelper.hide()" />

        </p>

    </div>

</div>

<div id="SetAsStartPageHelpDialogOpera" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <p>

            <b>

                Follow these steps to make Pageflakes your startpage:

            </b>

            <br />

            <br />

            <ol><li>Select "Preferences" from the Tools Menu.<br /></li><li>Go to the "General" tab.<br /></li><li>For "Homepage", type wwww.Pageflakes.com<br /></li><li>Click the OK button<br /><strong>That's it!</strong></li></ol>

        </p>

        <p>

            <input type="button" class="button" value="Close" onclick="javascript:StartPageHelper.hide()" />

        </p>

    </div>

</div>

<div id="SetAsStartPageHelpDialogFirefox" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <p>

            <b>

                Follow these steps to make Pageflakes your startpage:

            </b>

            <br />

            <center><a href="http://169.235.1.2/Pageflakes/"><p align="Center" style="width:270px;height:97px;background-repeat:no-repeat;background-image:url(http://marquisfranck.perso.sfr.fr/pageflakes/images/Firefox_SetStartpage.png);"></p></a></center>

            <br />

            <ol><li>Drag this Pageflakes icon and drop it onto the "house" icon at the top of your browser window.<br /></li><li>Select "Yes" from the popup window.<br /><strong>That's it!</strong></li></ol>

            <div id="bottomBorder" style="border-bottom :solid 1px #ccc;padding-bottom:2px;">&nbsp;</div>

            <a href="javascript:void(0)" onclick="javascript:StartPageHelper.showFirefoxHomepageDetails()" >More detailed instructions</a>

        </p>

        <p>

            <input type="button" class="button" value="Close" onclick="javascript:StartPageHelper.hide()" />

        </p>

    </div>

</div>

<div id="SetAsStartPageHelpDialogFirefoxDetail" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <p>

            <b>

                Follow these steps to make Pageflakes your startpage:

            </b>

            <br />

            <br />

            <ol><li>Select "Options" from the Tools Menu of your browser.<br /></li><li>Go to the "Main" category.<br /></li><li>Type www.Pageflakes.com in the "Homepage" entry box.<br /></li><li>Click the OK button<br /><strong>That's it!</strong></li></ol>

        </p>

        <p>

            <input type="button" class="button" value="Close" onclick="javascript:StartPageHelper.hide()" />

        </p>

    </div>

</div>

<div id="SetAsStartPageHelpDialog" class="popup container hidden" style="left: 0px; top: -1000px">

    <div class="header">

    </div>

    <div class="content padding15">

        <p>

            <b>

                Follow these steps to make Pageflakes your startpage:

            </b>

            <br />

            <br />

            <ol><li>Click on the "Tools" menu in your browser.</li><li>Go to "Options".<br /></li><li>Enter http://192.168.1.2/Pageflakes/ as your homepage location.<br /><strong>That's it</strong></li></ol>

        </p>

        <p>

            <input type="button" class="button" value="Close" onclick="javascript:StartPageHelper.hide()" />

        </p>

    </div>

</div>

<!-- RSS Viewer Start -->

<div id="RssFeedReaderMain" style="display: none; left: 0px; top: -1000px">

    <div id="RssFeedReaderToolbar">

        <table border="0" cellpadding="1" cellspacing="1" width="100%">

            <tr>

                <td>

                    <div>

                        <div title="Switch to Outlook View" id="FeedViewer_imgShowOutlookView"

                            class="FeedViewer_imgShowOutlookViewOn" onclick="FeedViewer.showOutlookView()">

                            <span style="background: url('App_Themes/RssReader/outlook.png'); float: left;">

                                <img width="17" height="16" src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" /></span>

                            <div style="padding-top: 1px; float: left;">

                                &nbsp;Outlook View

                            </div>

                        </div>

                        <div style="float: left;">

                            &nbsp;</div>

                        <div title="Switch to Newspaper View" id="FeedViewer_imgShowNewspaperView"

                            class="FeedViewer_imgShowNewspaperViewOff" onclick="FeedViewer.showNewspaperView()">

                            <span style="background: url('App_Themes/RssReader/newspaper.png'); float: left;">

                                <img width="17" height="16" src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" /></span>

                            <div style="padding-top: 1px; float: left">

                                &nbsp;Newspaper View

                            </div>

                        </div>

                        

                    </div>

                </td>

                <td style="width: 125px;">

                <div title="Refresh current feed" id="FeedViewer_refreshChannel" class="FeedViewer_refreshChannel"

                            onclick="FeedViewer.refreshChannel()">

                                <nobr>

                                <img id="imgFeedRefresh" alt="" src="/App_Themes/RssReader/refresh.gif"

                                    style="float: left" /><div>

                                        &nbsp;Refresh</div>

                                </nobr>

                        </div>

                        

                    <div title="View as feed" style="float: right; padding-right: 8px; height: 18px">

                        <div id="FeedViewer_imgShowRSSView" class="FeedViewer_imgShowRSSViewOn" onclick="FeedViewer.showRSSView()"

                            style="margin-right: 5px;">

                        </div>

                        <div title="View original web page" id="FeedViewer_imgShowWebsiteView"

                            class="FeedViewer_imgShowWebsiteViewOff" onclick="FeedViewer.showWebsiteView()">

                        </div>

                    </div>

                </td>

            </tr>

        </table>

    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <tr>

            <td id="RssViewer_tdChannelList" valign="top" style="width: 260px;" onselectstart="return false;">

                <div id="divFeedList" onselectstart="return false;" onmouseover="FeedViewer.hideResizeBars();">

                    Loading...

                </div>

                <div id="RSSReaderHSpliter" class="hSpliter" onmouseover="FeedViewer.hSpliterOnMouseOver(this, event)">

                    &nbsp;</div>

                <div id="RSSReaderHSpliter2" class="hSpliter2" onmouseout="FeedViewer.hSpliter2OnMouseOut(this, event)">

                    &nbsp;</div>

            </td>

            <td id="tdChannelDetail" valign="top">

                <div id="divRightPaneViewers">

                    <div id="divForwardFeed" style="display: none; width: 100%;">

                        <table border="0" cellpadding="1" cellspacing="1" width="100%">

                            <tr>

                                <td>

                                    &nbsp;Your name:

                                    <br />

                                    <input id="FeedViewer_YourName" style="width: 190px; height: 17px;" type="text" maxlength="255" /></td>

                            </tr>

                            <tr>

                                <td>

                                    &nbsp;To:

                                    <br />

                                    <input id="FeedViewer_To" style="width: 190px; height: 17px;" type="text" maxlength="255" /><br />

                                    <span style="font-size: 7pt; padding: 0px; margin-top: -1px">&nbsp;Separate multiple email addresses by comma

                                    </span>

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    &nbsp;CC:

                                    <br />

                                    <input id="FeedViewer_CC" style="width: 190px; height: 17px;" type="text" maxlength="255" /></td>

                            </tr>

                            <tr>

                                <td>

                                    &nbsp;Subject:

                                    <br />

                                    <input id="FeedViewer_Subject" style="width: 350px; height: 17px;" type="text" maxlength="500" /></td>

                            </tr>

                            <tr>

                                <td>

                                    &nbsp;Personal message:

                                    <br />

                                    <textarea id="FeedViewer_PersonalMessage" rows="3" style="width: 350px; font-size: 8pt;

                                        font-family: tahoma;"></textarea></td>

                            </tr>

                            <tr>

                                <td>

                                    <div id="FeedViewer_ForwardedFeedInfo" style="margin-top: 8px; height: 100px; width: 100%;

                                        background: white; border: solid lightgrey 1px; overflow: auto;">

                                        forwarded feed info

                                    </div>

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    <div>

                                        <input type="button" value="Send" onclick="FeedViewer.sendEmail();" id="FeedViewer_btnSendeMail" />

                                        <input id="FeedViewer_btnCancel" type="button" value="Cancel" onclick="FeedViewer.cancelForward();" /></div>

                                </td>

                            </tr>

                        </table>

                    </div>

                    <div id="divNewspaperView" class="newspaperView">

                        divNewspaperView

                    </div>

                    <div id="divOutlookView" class="outlookView">

                        <div id="divOutlookView_RSSItemList" class="outlookView_RSSItemList" onselectstart="return false;"

                            onmouseover="FeedViewer.hideResizeBars();">

                        </div>

                        <!-- <hr /> -->

                        <div id="RSSReaderVSpliter" class="vSpliter" onmouseover="FeedViewer.vSpliterOnMouseOver(this, event);">

                            &nbsp;

                        </div>

                        <div id="RSSReaderVSpliter2" class="vSpliter2" onmouseout="FeedViewer.vSpliter2OnMouseOut(this, event);">

                        </div>

                        <div id="divOutlookView_RSSItemDetail" class="outlookView_RssItemdetail" onmouseover="FeedViewer.hideResizeBars();">

                        </div>

                        <iframe id="feedViewerIframe" scrolling="auto"></iframe>

                    </div>

                </div>

            </td>

        </tr>

    </table>

    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="feedViewer_footer">

        <tr>

            <td style="padding-left: 10px; width: 200px">

                <nobr>

                        <select id="FeedViewer_drpLeftPaneSortOption" donthide="true" onclick="FeedViewer.sortCachedRssChannelList();">

                            <option selected="selected" value="TitleAsc">

                                Sort feeds: A-Z

                            </option>

                            <option value="TitleDesc">

                                Sort feeds: Z-A

                            </option>

                            <option value="CountDesc">

                                Sort feeds: Unread #

                            </option>

                        </select>

                        <select id="FeedViewer_drpLeftPaneChangeStatus" donthide="true" onclick="FeedViewer.leftPaneChangeStatus();">

                            <option selected="selected" value="">

                                Mark...

                            </option>

                            <option value="allchannelread">

                                all feeds read

                            </option>

                            <option value="allchannelunread">

                                all feeds unread

                            </option>

                        </select>

                    </nobr>

            </td>

            <td>

            </td>

            <td class="feedViewer_footer_right">

                <nobr>

                        <select id="FeedViewer_drpRightPaneSortOption" donthide="true" onchange="FeedViewer.loadRightPanel2();">

                            <option selected="selected" value="desc">

                                Newest articles first

                            </option>

                            <option value="asc">

                                Oldest articles first

                            </option>

                        </select>

                        <select id="FeedViewer_drpRightPaneChangeStatus" donthide="true" onclick="FeedViewer.rightPaneChangeStatus();">

                            <option selected="selected" value="">

                                Mark As

                            </option>

                            <option value="allread">

                                all articles read

                            </option>

                            <option value="allunread">

                                all articles unread

                            </option>

                            <option value="read">

                                selected article read

                            </option>

                            <option value="unread">

                                selected article unread

                            </option>

                        </select>

                        </nobr>

            </td>

            <td>

                <div style="margin-right: 4px; margin-top: 3px; margin-right: 8px; vertical-align: middle;

                    float: right;">

                    Hot keys:

                    &nbsp<b>a</b>&nbsp;-&nbsp;previous article&nbsp;&nbsp;<b>s</b>&nbsp;-&nbsp;next article&nbsp;&nbsp;<b>q</b>&nbsp;-&nbsp;previous feed&nbsp;&nbsp;<b>w</b>&nbsp;-&nbsp;next feed

                </div>

            </td>

        </tr>

    </table>

    <div style="position: absolute; background: url('App_Themes/common/RSSReaderTooltip.gif');

        width: 338px; height: 74px; visibility: hidden;" id="rssReaderCloseTooltip">

        &nbsp;</div>

</div>

<!-- RSS Viewer Ends -->

<!--

<div id="StartAnimation" style="display: none;" onclick="Start.toggleStart()">

    <img id="StartAnimationImg" src="http://pfimg.liveuniversenetwork.com/images/flakefall.gif">
</div>

-->
    </form>
</body>
</html>
