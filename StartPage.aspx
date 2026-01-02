<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPageFinal_Dev.master" AutoEventWireup="true" CodeFile="StartPage.aspx.cs" Inherits="Pageflakes.StartPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
 
</asp:Content>
<asp:Content ID="Script_Human" ContentPlaceHolderID="Head_Page_Script" Runat="Server">
    <script id="humanIdentifier" type="text/javascript" src="/Pageflakes/human.ashx"></script>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Head_Page_Theme" Runat="Server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceBody" Runat="Server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolder_SetAsStartPage" Runat="Server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="Content_Page_Begin" Runat="Server">
</asp:Content>
<asp:Content ID="Content_PopUP" ContentPlaceHolderID="PopUp_Page" Runat="Server">
    
    <script type="text/javascript" src="/Pageflakes/script/StartPage.js"></script>
    
    <span>
    <!-- inserer automatiquement par le PreFramework -->
    </span>
    <img class="Location_Progress" src="/Pageflakes/images/indicator.gif" style="display: none;">
    <div class="Location_Match" style="visibility: hidden;"></div>
    <script type="text/javascript">
        if (typeof Sys == "undefined") $reload();
        if (typeof App == "undefined") $reload("App");
        if (typeof PrimaryFramework == "undefined") $reload("PrimaryFramework");
    </script>
    <!--<script id="AdditionalContent" type="text/javascript" src="http://Localhost/Pageflakes/DefaultPageContent.aspx?v=5en"></script>-->
    <div id="improvedTooltip_NO_" class="improvedTooltip"> 
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="improvedTooltip_lt">  </td>  
                    <td class="improvedTooltip_t">  <span id="improvedTooltipTop_NO_" class="improvedTooltipArrow_top"></span>  </td>  
                    <td class="improvedTooltip_rt">  </td> 
                </tr>
                <tr>
                    <td class="improvedTooltip_l">  <span id="improvedTooltipLeft_NO_" class="improvedTooltipArrow_left"></span>  </td>  
                    <td bgcolor="#ffffcc">  <span class="improvedTooltip_close" id="improvedTooltipClose_NO_">X</span>
                        <div class="improvedTooltipContent"> _CONTENT_</div>  
                    </td>
                    <td class="improvedTooltip_r">  <span id="improvedTooltipRight_NO_" class="improvedTooltipArrow_right"></span>  </td> 
                </tr> 
                <tr>
                    <td class="improvedTooltip_lb">  </td>  
                    <td class="improvedTooltip_b">  <span id="improvedTooltipBottom_NO_" class="improvedTooltipArrow_bottom"></span>  </td>  
                    <td class="improvedTooltip_rb">  
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
    <div id="FlakePreview" style="left: 0px; top: -1000px"> 
        <div id="FlakeContainer"> </div> 
        <div id="FlakePreviewButtons"> 
            <input id="AddToPageButton" type="button" value="Add to Page"> 
            <input id="CancelFlakeAdd" type="button" value="Cancel"> 
        </div>
    </div>
    <div id="confirmDialog" class="popup container hidden" style="left: 0px; top: -1000px"> 
        <div class="header"> </div> 
        <div class="content padding15"> 
            <div id="confirmDialog_title">  Are you sure you want to do this? </div> 
            <fieldset>  <legend>What would you like to do?</legend>  
                <div class="confirm_choices">  
                    <div class="confirmDialog_yes_div"> 
                        <input id="confirmDialog_yes" checked="checked" type="radio" name="confirmDialog_choice">
                        <label id="confirmDialog_yes_title" for="confirmDialog_yes">Yes</label>
                    </div>  
                    <div class="confirmDialog_no_div"> 
                        <input id="confirmDialog_no" type="radio" name="confirmDialog_choice">
                        <label id="confirmDialog_no_title" for="confirmDialog_no">No</label>
                    </div>  
                </div> 
            </fieldset> 
            <br> 
            <table>  
                <tbody>
                    <tr>  
                        <td> 
                            <input type="button" id="confirmDialog_ok" class="button" style="width: 50px" value="OK">
                        </td>  
                        <td id="confirm_cancel_content" style="padding-top: 8px"> or <a href="javascript:void(0)" class="cancel" id="confirmDialog_cancel"> Cancel </a>  
                        </td>  
                    </tr> 
                </tbody>
            </table> 
        </div>
    </div>
    
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="Script_Page_Middle" Runat="Server">
<script type="text/javascript" id="StartupJSON">
    window.startupInfo = { "VersionSuffix": "5en", "Language": "en", "DomainID": 1, "LanguageID": 1, "UserPublishURL": "", "UserUniqueName": "", "UserFullName": "", "UserGUID": "7332dea8-aeed-435d-80e9-b8abf2675e98", "UserVersionNo": 2, "CurrentPageID": 14928870, "CurrentPageVersionNo": 0, "IsSubscribedForNewsletter": false, "ViewingPageOf": "", "Template": { "ModuleHtml": "\u003cdiv class=\"flake_placeholder\"\u003e\r\n\t\u003cdiv class=\"flake\"\u003e\r\n\t\t\u003cdiv class=\"flake_header\" onmouseover=\"opqTb(this)\" onmouseout=\"alphaTb(this)\" id=\"handle_FLAKE_ID_\"\u003e \r\n\t\t\u003cdiv class=\"flake_toolbar\"\u003e\r\n\t\t\t\u003ca class=\"refresh_icon\" style=\"display:none;\" title=\"Refresh Flake\" id=\"refresh_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).refresh()\"\u003eRefresh\u003c/a\u003e\r\n\t\t\t\u003ca class=\"sendFlake_icon\" id=\"sendFlake_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showFlakeMenu()\"\u003eSend\u003c/a\u003e\r\n\t\t\t\u003ca class=\"settings_icon\" id=\"editLink_FLAKE_ID_\" title=\"Edit Flake settings\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).toggleEdit()\"\u003eEDIT\u003c/a\u003e\r\n\t\t\t\u003ca class=\"close_icon\" id=\"closeLink_FLAKE_ID_\" title=\"Remove Flake\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).close()\"\u003ex\u003c/a\u003e\r\n\t\t\u003c/div\u003e\r\n\t\t\u003cdiv class=\"flake_title\"\u003e\r\n\t\t\t\u003cdiv class=\"flake_icon\"\u003e\u003cimg OnError=\u0027$module(\"_FLAKE_ID_\").loadDefaultFavicon(\"icon_FLAKE_ID_\");\u0027 id=\"icon_FLAKE_ID_\" /\u003e\u003c/div\u003e\r\n\t\t\t\u003cdiv class=\"flake_name_container\"\u003e\r\n\t\t\t\t\u003cspan class=\"flake_name\" id=\"title_FLAKE_ID_\"\u003e_FLAKE_TITLE_\u003c/span\u003e\r\n\t\t\t\t\u003cspan class=\"rss_number\" id=\"number_FLAKE_ID_\"\u003e\u003c/span\u003e\r\n\t\t\t\u003c/div\u003e\r\n\t\t\u003c/div\u003e\r\n\t\t\u003c/div\u003e\r\n\t\t\u003cdiv id=\"editContainer_FLAKE_ID_\" style=\"display:none\" \u003e\t\t\r\n\t\t\u003ctable class=\"flake_tabbar\" cellspacing=\"0\" cellpadding=\"0\"\u003e\r\n\t\t\u003ctr\u003e\r\n\t\t\u003ctd width=\"100\" id=\"td_tab_basic_FLAKE_ID_\"\u003e\u003cdiv id=\"tab_basic_FLAKE_ID_\" class=\"edit_tabup\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showBasicSetting()\" disable=\"$remove(\u0027td_tab_basic_FLAKE_ID_\u0027)\" \u003eSettings\u003c/div\u003e\u003c/td\u003e\r\n\t\t\u003ctd width=\"100\" id=\"td_tab_other_FLAKE_ID_\"\u003e\u003cdiv id=\"tab_other_FLAKE_ID_\" class=\"edit_tabdown\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).showAdvancedSetting()\" disable=\"$remove(\u0027td_tab_other_FLAKE_ID_\u0027)\" \u003ePreferences\u003c/div\u003e\u003c/td\u003e\r\n\t\t\u003ctd \u003e&nbsp;\u003c/td\u003e\r\n\t\t\u003c/tr\u003e\r\n\t\t\u003c/table\u003e\r\n\t\t\u003cdiv class=\"flake_settings\" \u003e\r\n\t\t\u003cdiv id=\"editBody_FLAKE_ID_\" style=\"padding:8px\"\u003e\u003c/div\u003e\r\n\t\t\u003cdiv id=\"editOthers_FLAKE_ID_\" style=\"padding:8px;display:none; height:100px\"\u003e\r\n\t\t\t\u003ctable width=100%\u003e\r\n\t\t\t\u003ctr\u003e\u003ctd width=70\u003eFlake title:\u003c/td\u003e\u003ctd\u003e\u003cinput style=\"width:70%\" type=\"text\" id=\"flakeTitleEdit_FLAKE_ID_\" onkeypress=\"if(event.keyCode==13)$module(\u0027_FLAKE_ID_\u0027).editEdit();\" value=\"_FLAKE_TITLE_\"/\u003e\u003c/td\u003e\u003c/tr\u003e\r\n\t\t\t\u003ctr\u003e\u003ctd\u003e&nbsp;\u003c/td\u003e\u003ctd\u003e\u003cinput type=\"button\" value=\"Save\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).editEdit()\" class=\"button\"/\u003e&nbsp;&nbsp;\u003cinput type=\"button\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).toggleEdit()\" class=\"button cancel\" value=\"Cancel\"/\u003e\u003c/td\u003e\u003c/tr\u003e\r\n\t\t\t\u003c/table\u003e\r\n\t\t\u003c/div\u003e\t\t\r\n\t\t\u003c/div\u003e\t\t\r\n\t\t\u003c/div\u003e\r\n\t\t\u003cdiv class=\"flake_content\" style=\"_FLAKE_COLLAPSED_\" id=\"body_FLAKE_ID_\"\u003e\u003c/div\u003e\r\n\t\t\u003cdiv class=\"flake_footer\"\u003e\u003ca id=\"collapseLink_FLAKE_ID_\" title=\"Collapse Flake\" class=\"colapse_icon\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" style=\"_FLAKE_COLLAPSED_\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).collapse()\"\u003e-\u003c/a\u003e\r\n\t\t\t\u003ca id=\"expandLink_FLAKE_ID_\" class=\"expand_icon\" title=\"Expand Flake\" style=\"_FLAKE_EXPANDED_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\" onclick=\"$module(\u0027_FLAKE_ID_\u0027).expand()\"\u003e+\u003c/a\u003e\u003c/div\u003e\r\n\t\u003c/div\u003e\r\n\u003c/div\u003e\r\n", "StylesheetHref": "https://web.archive.org/web/20070930213203/http://www1.pageflakes.com/App_Themes/T12/http://www1.pageflakes.com/StylesheetHandler.axd?host=www.pageflakes.com&lang=T12&browser=Firefox2.0.0.7&v=en", "PopupHtml": "\u003cdiv class=\"flake_placeholder\"\u003e\r\n\u003cdiv class=\"flake\"\u003e\r\n\u003cdiv class=\"flake_header\" id=\"handle_FLAKE_ID_\" onmouseover=\"opqTb(this)\" onmouseout=\"alphaTb(this)\"\u003e\r\n\u003cdiv class=\"flake_toolbar\"\u003e\u003cdiv class=\"close_icon\" id=\"closeLink_FLAKE_ID_\" onmouseover=\"hover(this)\" onmouseout=\"hout(this)\"\u003ex\u003c/div\u003e\u003c/div\u003e\r\n\u003cdiv class=\"flake_title\"\u003e\r\n\u003cspan class=\"flake_icon\"\u003e\u003cimg src=\"images/pficon.gif\" id=\"icon_FLAKE_ID_\" /\u003e\u003c/span\u003e\r\n\u003cspan class=\"flake_name flake_name_popup\" id=\"title_FLAKE_ID_\"\u003e_FLAKE_TITLE_\u003c/span\u003e\r\n\u003c/div\u003e\r\n\u003c/div\u003e\r\n\u003cdiv class=\"popup_content\" id=\"body_FLAKE_ID_\"\u003eLoading...\u003c/div\u003e\r\n\u003cdiv class=\"flake_footer\"\u003e\u003c/div\u003e\r\n\u003c/div\u003e\r\n\u003c/div\u003e\r\n", "ThemePath": "https://web.archive.org/web/20070930213203/http://www1.pageflakes.com/App_Themes/T12/" }, "CurrentPageTheme": { "IsCustomTheme": false, "ThemeName": "Blue", "CanEdit": false, "CanDelete": false, "ThemeID": 12, "VersionNo": 2, "CSS": "", "PreviewGraphics": "App_Themes/Purple_Unified/ThemePreview.png", "Properties": {}, "ThemeHandlerUrl": "https://web.archive.org/web/20070930213203/http://www1.pageflakes.com/PagelevelTheme.axd?ID=12&Type=System&Version=2", "ThemeShortcut": "T12", "PreviewHandlerUrl": "App_Themes/Purple_Unified/ThemePreview.png" }, "OpenLinksIn": 0, "Pages": [{ "ID": 14928870, "VersionNo": 0, "Name": "My 2nd Page", "OrderNo": 0, "SharingStatus": 0, "ColumnCount": 3, "OwnerName": null, "OwnerFullname": null, "HitCount": 0, "IsPublished": false, "IsOwner": true, "IsShared": false, "Modules": null, "PageParts": null, "Scripts": null, "Stylesheets": null, "CanMoveFlakes": true, "CanAddFlake": true, "CanEditFlake": true, "CanDeleteFlake": true, "CanChangeFlake": true, "CanRemovePage": true, "CanChangePage": true, "CanInviteOthers": true, "IsNewlyShared": false, "SharedBy": "", "HasChanged": false, "ColumnSizes": "33%,33%,33%", "Theme": { "IsCustomTheme": false, "ThemeName": "Blue", "CanEdit": false, "CanDelete": false, "ThemeID": 12, "VersionNo": 2, "CSS": "", "PreviewGraphics": "App_Themes/Purple_Unified/ThemePreview.png", "Properties": {}, "ThemeHandlerUrl": "https://web.archive.org/web/20070930213203/http://www1.pageflakes.com/PagelevelTheme.axd?ID=12&Type=System&Version=2", "ThemeShortcut": "T12", "PreviewHandlerUrl": "App_Themes/Purple_Unified/ThemePreview.png"}}], "SearchEngine": 0, "ShowSearchBar": true, "IsAnonymous": true, "IsMySite": true, "PageSharedWithMeCount": 0, "ShowSharedPagesWithMine": false, "DownloadFeedsAutometically": false, "Channels": null, "IsFirstVisit": true, "ShowWelcomeWizard": false, "ErrorMsg": "", "My": { "UniqueName": "", "Interests": [""], "SpecificInterests": "", "Country": "USA", "State": "CA", "City": "Oakland", "Timezone": 0, "ZipCode": "", "Profile": { "BV": "0", "BN": "0" }, "FirstName": "", "LastName": ""} };
    if (typeof window.startupInfo == "undefined" || window.startupInfo == null) $reload();
</script>

</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="Content_Page_End" Runat="Server">
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="Footer_Page" Runat="Server">

</asp:Content>
<asp:Content ID="Content11" ContentPlaceHolderID="Sript_Page_End_1" Runat="Server">
    
</asp:Content>
<asp:Content ID="Content12" ContentPlaceHolderID="Script_Page_End_2" Runat="Server">
</asp:Content>

