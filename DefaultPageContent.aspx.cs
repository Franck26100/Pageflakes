using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Pageflakes
{
    public partial class DefaultPageContent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.ContentType = "application/javascript";
            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            // Bloc Tooltip
            WriteHtml(@"
<div id='improvedTooltip_NO_' class='improvedTooltip'>
 <table width='100%' border='0' cellspacing='0' cellpadding='0'>
  <tr>
   <td class='improvedTooltip_lt'></td>
   <td class='improvedTooltip_t'><span id='improvedTooltipTop_NO_' class='improvedTooltipArrow_top'></span></td>
   <td class='improvedTooltip_rt'></td>
  </tr>
  <tr>
   <td class='improvedTooltip_l'><span id='improvedTooltipLeft_NO_' class='improvedTooltipArrow_left'></span></td>
   <td bgcolor='#ffffcc'>
    <span class='improvedTooltip_close' id='improvedTooltipClose_NO_'>X</span>
    <div class='improvedTooltipContent'>_CONTENT_</div>
   </td>
   <td class='improvedTooltip_r'><span id='improvedTooltipRight_NO_' class='improvedTooltipArrow_right'></span></td>
  </tr>
  <tr>
   <td class='improvedTooltip_lb'></td>
   <td class='improvedTooltip_b'><span id='improvedTooltipBottom_NO_' class='improvedTooltipArrow_bottom'></span></td>
   <td class='improvedTooltip_rb'></td>
  </tr>
 </table>
</div>");

            // Bloc FlakePreview
            WriteHtml(@"
<div id='FlakePreview' style='left:0px;top:-1000px'>
 <div id='FlakeContainer'></div>
 <div id='FlakePreviewButtons'>
  <input id='AddToPageButton' type='button' value='Add to Page' />
  <input id='CancelFlakeAdd' type='button' value='Cancel' />
 </div>
</div>");

            // Bloc ConfirmDialog
            WriteHtml(@"
<div id='confirmDialog' class='popup container hidden' style='left:0px;top:-1000px'>
 <div class='header'></div>
 <div class='content padding15'>
  <div id='confirmDialog_title'>Are you sure you want to do this?</div>
  <fieldset>
   <legend>What would you like to do?</legend>
   <div class='confirm_choices'>
    <div class='confirmDialog_yes_div'>
     <input id='confirmDialog_yes' checked='checked' type='radio' name='confirmDialog_choice'/>
     <label id='confirmDialog_yes_title' for='confirmDialog_yes'>Yes</label>
    </div>
    <div class='confirmDialog_no_div'>
     <input id='confirmDialog_no' type='radio' name='confirmDialog_choice'/>
     <label id='confirmDialog_no_title' for='confirmDialog_no'>No</label>
    </div>
   </div>
  </fieldset>
  <br/>
  <table>
   <tr>
    <td><input type='button' id='confirmDialog_ok' class='button' style='width:50px' value='OK'/></td>
    <td id='confirm_cancel_content' style='padding-top:8px'>or <a href='javascript:void(0)' class='cancel' id='confirmDialog_cancel'>Cancel</a></td>
   </tr>
  </table>
 </div>
</div>");

            // Bloc BusyDialog
            WriteHtml(@"
<div id='BusyDialog' class='popup container hidden' style='left:0px;top:-1000px'>
 <div id='BusyDialogMsg' class='centerDiv padding15'>Changing theme...</div>
</div>");

            // Bloc SetAsStartPageHelpDialog (Safari + général)
            WriteHtml(@"
<div id='SetAsStartPageHelpDialogSafari' class='popup container hidden' style='left:0px;top:-1000px'>
 <div class='header'></div>
 <div class='content padding15'>
  <p><b>Follow these steps to make Pageflakes your startpage:</b><br/><br/>
   1. Go to Safari Preferences.<br/>
   2. On the General tab, set the 'New windows open with' dropdown menu to 'Homepage'.<br/>
   3. Click the 'Set to Current Page' button.
  </p>
  <p><input type='button' class='button' value='Close' onclick='javascript:StartPageHelper.hide()'/></p>
 </div>
</div>
<div id='SetAsStartPageHelpDialog' class='popup container hidden' style='left:0px;top:-1000px'>
 <div class='header'></div>
 <div class='content padding15'>
  <p><b>Follow these steps to make Pageflakes your startpage:</b><br/><br/>
   1. Click on the 'Tools' menu in your browser.<br/>
   2. Go to 'Options'.<br/>
   3. Enter http://www.pageflakes.com as your homepage location.
  </p>
  <p><input type='button' class='button' value='Close' onclick='javascript:StartPageHelper.hide()'/></p>
 </div>
</div>");

            // Bloc RSS Feed Reader (simplifié)
            WriteHtml(@"
<div id='RssFeedReaderMain' style='display:none;left:0px;top:-1000px'>
 <div id='RssFeedReaderToolbar'>...toolbar markup...</div>
 <div id='divFeedList'>Loading...</div>
 <div id='divRightPaneViewers'>
  <div id='divNewspaperView' class='newspaperView'>divNewspaperView</div>
  <div id='divOutlookView' class='outlookView'>
   <div id='divOutlookView_RSSItemList' class='outlookView_RSSItemList'></div>
   <div id='divOutlookView_RSSItemDetail' class='outlookView_RssItemdetail'></div>
   <iframe id='feedViewerIframe' scrolling='auto'></iframe>
  </div>
 </div>
</div>");

            // Bloc StartAnimation
            WriteHtml(@"
<div id='StartAnimation' style='display:none;' onclick='Start.toggleStart()'>
 <img id='StartAnimationImg' src='/Pageflakes/images/flakefall.gif'/>
</div>");
        }

        private void WriteHtml(string html)
        {
            string js = "document.write(\"" + html.Replace("\"", "\\\"").Replace("\r", "").Replace("\n", "") + "\");";
            Response.Write(js);
        }
    }

}
    
