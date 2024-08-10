﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PageSettingsDropdown2.aspx.cs" Inherits="PageSettingsDropdown2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <div>
        <div>
            <table cellpadding="0" cellspacing="0" id="SettingsTable">
                <tr>                
                    <td valign="top" id="SettingsLeftMenuTD">
                    <!--FS431:FIX<td valign="top" style="width: 115px; border-right: 1px solid #999">-->
                        <div id="SettingsLeftMenuContainer" style="padding-top: 5px;">
                            <ul id="settingsLeftMenuUL">
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Our coolest Flakes for your page" onclick="Start.loadPageSettingGrid(0,1,1)" id="TopFlakesLink">
                                    Top Flakes</a></li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Find new stuff for your page sorted by category" onclick="Start.loadPageSettingGrid(1,1,1)" id="BrowseFlakesLink">
                                    Browse Flakes</a></li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="View a selection of public pages by members and media partners" onclick="Start.loadPageSettingGrid(2,1,1)" id="PagecastLink">
                                    Pagecasts</a></li>
                                <li class="settingsLeftMenuHr">
                                    <div><img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"></div>
                                </li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Create your own shared public or group page in seconds" onclick="Start.loadPageSettingGrid(3,1,1)">
                                    Make Pagecast</a></li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Personalize your page with photos, colors & much more" onclick="Start.loadPageSettingGrid(4,1,1)" id="ChangeThemeLink">
                                    Change Theme</a></li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Rearrange your page" onclick="Start.loadPageSettingGrid(5,1,1)" id="ChangeLayoutLink">
                                    Change Layout</a></li>
                                <li class="settingsLeftMenuHr">
                                    <div><img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"></div>
                                </li>
                                <li class="settingsLeftMenu"><a href="javascript:void(0)" title="Upload your photo & add something about yourself" onclick="Start.loadPageSettingGrid(6,1,1)">
                                    My Profile</a></li>
                            </ul>
                        </div>
                    </td>
                    <td valign="top" id="SettingsRightMenuTD" rowspan="2">
                        <div id="PageSettingGrid">                        
                        <!-- Loading Grid -->
                            <div id="PageSettingLoading" class='downloadInProgress' valign='middle' style="display: none">
                                &nbsp;</div>                        
                        <!-- Top Flakes DIV -->
                            <div id="PageSettingGridTopFlake" class="SettingsRightMenuTD" style="display:block;">
                                
                            </div>                        
                        <!-- Browse Flakes DIV -->
                            <div id="PageSettingGridBrowseFlake" style="display: none">
                            </div>                        
                        <!-- CommunityPage DIV -->
                            <div id="PageSettingGridCommunityPage" style="display: none">
                            </div>                        
                        <!-- Share Page DIV -->
                            <div id="PageSettingGridSharePage" style="display: none" class="SettingsRightMenuTD">
                            <div id="SharingOptionsDisabled">You do not have permissions to access this feature on this page</div>
                            <div id="SharingOptions">                                
                                <div class="StartPanelHeader">
                                    <a onclick="Start.toggleStart(1)" href="javascript:void(0)" style="padding: 2px; float: right; margin-top: -3px;">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" border="0" />
                                    </a>
                                    <span class="bold120" style="float:none;">Want to share this page with other people? &nbsp;</span>
                                    <div class="FlakeGridSep FlakeGridTitleSep">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"/>
                                    </div>
                                </div>
                                <div id="SharingOptionsDummyBody" style="display: none">
                                    <div class="radio_item">
                                        <label class="radio">
                                            <input name="Dummy" type="radio" checked="checked" />Keep it private</label>
                                    </div>
                                    <div class="radio_item">
                                        <label class="radio disabled">
                                            <input disabled="disabled" name="Dummy" type="radio" />Publish page to the world (Public Pagecast) at 
                                        </label>
                                        <span class="disabled">&nbsp;To publish your page, please &nbsp;
                                            <a href="Login.aspx" class="bold">login</a> or <a href="SignUp.aspx" class="bold">sign up</a>
                                        </span>
                                    </div>
                                    <div class="radio_item">
                                        <label class="radio disabled">
                                            <input disabled="disabled" name="Dummy" type="radio" />Share page with a group (Group Pagecast) 
                                        </label>
                                        <span class="disabled">&nbsp;To share your page, please &nbsp;<a href="Login.aspx" class="bold">login</a> or <a href="SignUp.aspx" class="bold">sign up</a>
                                        </span>
                                    </div>
                                </div>
                                <div id="SharingOptionsBody">
                                    <div class="radio_item" id="PageSettings_NoShareRadio">
                                        <label id="SharingOptions_NoShareLabel" class="radio">
                                            <input id="SharingOptions_NoShare" onclick="PageSettings_ShowNoShare()" name="PageShareMode" type="radio" />Keep it private
                                        </label>
                                    </div>
                                    <div class="radio_item_active" id="PageSettings_ShareRadio">
                                        <label id="SharingOptions_ShareLabel" class="radio">
                                            <input type="radio" onclick="PageSettings_ShowShare()" id="SharingOptions_Share" name="PageShareMode" />Share it with a friend or a group (Group Pagecast)
                                        </label>
                                        <div id="PageSettings_ShareOptions">
                                            <label class="radio_right">
                                                <input type="checkbox" id="SharingOptions_AllowEdit" />Allow these people to edit
                                            </label>
                                            <div id="SharingOptions_EmailAddressBox">
                                                <textarea id="SharingOptions_SharedUsers" rows="3" cols="40"></textarea>
                                                <div>
                                                    <small>
                                                        Enter emails separated by commas
                                                    </small>
                                                </div>
                                            </div>
                                            <div id="shareDialog_ErrorInMail" style="display: none" class="errorInMail">
                                                <div class="errorIcon">
                                                </div>
                                                <div id="shareDialog_ErrorTitle" class="errorTitle">
                                                    Email could not be sent
                                                </div>
                                                <div id="shareDialog_Message" class="errorMsg">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="radio_item" id="PageSettings_PublishRadio">
                                        <label id="SharingOptions_PublicLabel" class="radio">
                                            <input id="SharingOptions_Public" onclick="PageSettings_ShowMakePublic()" name="PageShareMode" type="radio" />Publish Page to the world (Public Pagecast)
                                            <span id="UserPublishUrl" class="cursorText" style="display: none"></span>
                                        </label>
                                        <div id="PageSettings_PublishOptions">
                                            <div id="PublishOptions_EmailAddressBox">
                                                <br />
                                                <table cellpadding="0" cellspacing="0" id="tblUserNameIn">
                                                    <tr>
                                                        <td style="width: 150px;">
                                                            Pick a username
                                                        </td>
                                                        <td style="padding-left: 15px">
                                                            Web address (URL) of your Pagecast
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input id="PublisOptions_UserName" value="" onfocus="this.select()" size="30" onkeyup="Settings.handleUniqueNameChange();" />
                                                        </td>
                                                        <td style="padding-left: 15px">
                                                            <input id="PublisOptions_UserNameUrl" size="54" value="http://www.pageflakes.com/.../" onkeyup="Settings.handleUniqueNameChange();" readonly="readonly" />
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div id="divUserNameNotUnique" style="color: red; display: none;">
                                                    Username already Exits
                                                </div>
                                                <p>
                                                    Pagecast title (will be used in our Public Pagecasts Gallery)
                                                    <br />
                                                    <input id="PublishOptions_Title" value="" onfocus="this.select()" size="80" />
                                                    <br />
                                                    <label id="PublishOptions_TitleReq" class="small_text">
                                                        Please enter a public page title
                                                    </label>
                                                </p>
                                                <p>
                                                    Enter a brief description of your Pagecast
                                                    <br />
                                                    <textarea id="PublishOptions_Description" onfocus="this.select()" rows="2" cols="20"></textarea><br />
                                                    <label id="PublishOptions_DescriptionReq" class="small_text">
                                                        Please enter a description of your page
                                                    </label>
                                                </p>
                                                <p>
                                                    Enter some tags/kewords that describe your page (e.g. sports, finance):
                                                    <br />
                                                    <input id="PublishOptions_Tags" value="" size="80" onfocus="this.select()" /><br />
                                                    <label id="PublishOptions_TagReq" class="small_text">
                                                        Please enter at least one tag/keyword
                                                    </label>
                                                </p>
                                                <div class="radio_right2">
                                                    <table cellpadding="0">
                                                        <tr>
                                                            <td valign="top">
                                                                <input type="checkbox" id="PublishOptions_AllowEdit" style="width: 15px;" />
                                                            </td>
                                                            <td>
                                                                Allow these people to edit
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <p>
                                                    Invite people
                                                    <br />
                                                    <input id="PublishOptions_SharedUsers" value="" onfocus="this.select()" size="80" />
                                                </p>
                                            </div>
                                            <div id="PublishDialog_ErrorInMail" style="display: none" class="errorInMail">
                                                <div class="errorIcon">
                                                </div>
                                                <div id="PublishDialog_ErrorTitle" class="errorTitle">
                                                    Email could not be sent
                                                </div>
                                                <div id="PublishDialog_Message" class="errorMsg">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="page_settings_buttons">
                                        <input id="SharingOptions_Save" class="button" type="button" value="Save Changes" onclick="Settings.saveSharingProxy()" /><!--<small>
                                                < %=_("OR") %> <a href="javascript:void(0);" onclick="Start.hidePageSettings()" class="cancel">< %=_("CANCEL") % ></a></small>-->
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <!-- Change Theme DIV -->
                        <div id="PageSettingGridChangeTheme" style="display: none" class="SettingsRightMenuTD">
                            <div id="ThemeAreaDisabled">
                                You do not have permissions to access this feature on this page
                            </div>
                            <div id="ThemeArea">
                                <textarea id="ThemeHtml">
                                    &lt;div id=&quot;PageSettings_ThemeArea&quot;&gt;
                                    &lt;div id=&quot;PageSettings_SelectTheme&quot;&gt;
		                            &lt;div class=&quot;StartPanelHeader&quot;&gt;
		                            &lt;a onclick=&quot;Start.Theme.cancelOut(1)&quot; href=&quot;javascript:void(0)&quot; style=&quot;padding: 2px; float: right; margin-top: -3px;&quot;&gt;
                                    &lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif&quot; alt=&quot;Cancel&quot; title=&quot;Cancel&quot; border=&quot;0&quot; /&gt;&lt;/a&gt;
                                    &lt;span class=&quot;bold120&quot;&gt;Choose one of the themes below or&amp;nbsp;&lt;/span&gt
		                            &lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; class=&quot;OnsiteBtnTbl&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;div style=&quot;display:inline&quot; onclick=&quot;Start.Theme.createNew()&quot;&gt;&lt;div class=&quot;OnsiteBtnLeft&quot;&gt;&lt;div class=&quot;OnsiteBtnRight&quot;&gt;&lt;span class=&quot;OnsiteGalleryBtn&quot;&gt;Create Your Own Theme&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
                                    &lt;div class=&quot;FlakeGridSep FlakeGridTitleSep&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif&quot;/&gt;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=Start_Themes_Div_Selection id=&quot;PageSettings_SelectTheme_Div&quot; &gt;
                                    &lt;ul id=&quot;Start_Themes_UL&quot;&gt;&lt;/ul&gt;
                                    &lt;/div&gt;
		                            &lt;div class=&quot;clear&quot; style=&quot;padding-left: 10px;padding-top:10px;&quot;  &gt;
			                        &lt;input type=&quot;button&quot; class=&quot;button&quot; value=&quot;Save&quot; onclick=&quot;Start.toggleStart()&quot; /&gt;
			                        &lt;input type=&quot;button&quot; class=&quot;button cancel&quot; value=&quot;Cancel&quot; onclick=&quot;Start.Theme.cancelOut(1)&quot; /&gt;
		                            &lt;/div&gt;
                                    &lt;/div&gt;    
                                    &lt;div id=&quot;PageSettings_CreateNewTheme&quot; style=&quot;display:none&quot; &gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                </textarea>
                                <textarea id="CreateThemeHtml">
                                    &lt;div id=&quot;PageSettings_CreateNewTheme_Tabs&quot;&gt;
                                    &lt;ul class=&quot;themetabs&quot;&gt;
                                    &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_HeaderTab&quot; class=&quot;themetab themeactivetab&quot; onclick=&quot;Start.Theme.showHeaderTab()&quot;&gt;&lt;a&gt;Header&lt;/a&gt;&lt;/li&gt;
                                    &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_TabButtonTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showTabButtonTab()&quot;&gt;&lt;a&gt;Tabs &amp; Buttons&lt;/a&gt;&lt;/li&gt;
                                    &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_PageTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showPageTab()&quot;&gt;&lt;a&gt;Page&lt;/a&gt;&lt;/li&gt;
                                    &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_FlakeTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showFlakesTab()&quot;&gt;&lt;a&gt;Flakes&lt;/a&gt;&lt;/li&gt;
                                    &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_AdvancedTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showAdvancedTab()&quot;&gt;&lt;a&gt;Advanced&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;div style=&quot;padding: 2px; float: right; margin-top: -2px;&quot;&gt;&lt;a onclick=&quot;Start.Theme.cancel()&quot; href=&quot;javascript:void(0)&quot;&gt;
                                    &lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif&quot; alt=&quot;Cancel&quot; title=&quot;Cancel&quot; border=&quot;0&quot; /&gt;&lt;/a&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;/ul&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Header&quot; class=&quot;NewThemePanel&quot;&gt;
                                    &lt;div class=pageThemeTitle &gt;&lt;b&gt;Background&lt;/b&gt;&lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Header_Image&quot;&gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Header&quot; id=&quot;PageSettings_NewTheme_Header_ImageRadio&quot; onclick=&quot;Start.Theme.radioClick('headerpic', 'headermode', 'picture')&quot; /&gt;Select a header background image from the gallery&lt;/label&gt;
                                    &lt;iframe allowtransparency=&quot;true&quot; id=&quot;Theme_HeaderIFRAME&quot; src=&quot;HeaderPictures.aspx&quot; style=&quot;width:390px;margin-left:15px;height:200px;padding-top:5px;&quot; frameborder="0"&gt;
                                    &lt;/iframe&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_HeaderMenu&quot; class=&quot;clear marginTop20&quot;&gt;
				                    &lt;div class=pageThemeTitle &gt;&lt;b&gt;Pageflakes logo:&lt;/b&gt;&lt;/div&gt;
				                    &lt;div&gt;
				                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot; id=&quot;PageSettings_NewTheme_LogoRADIO_Standard&quot; value=&quot;Standard&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Standard&lt;/label&gt;
				                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_LightBlue&quot; value=&quot;LightBlue&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Light&lt;/label&gt;
				                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_Lighter&quot; value=&quot;Lighter&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Very Light&lt;/label&gt;
				                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_DarkBlue&quot; value=&quot;DarkBlue&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot;/&gt;Dark&lt;/label&gt;
				                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_Darker&quot; value=&quot;Darker&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot;/&gt;Very Dark&lt;/label&gt;&lt;/div&gt;
				                    &lt;br /&gt;
				                    &lt;div class=clear &gt;&lt;b&gt;Links:&lt;/b&gt;&lt;/div&gt;
				                    &lt;table cellpadding=&quot;2&quot; cellspacing=&quot;0&quot;&gt;
				                    &lt;tr&gt;
				                    &lt;td class=&quot;textCell&quot;&gt;Link Text:&lt;/td&gt;
				                    &lt;td class=&quot;colorCell&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_HeaderMenuColor1&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setHeaderMenuColor1);&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
				                    &lt;td class=&quot;textCell&quot;&gt;Title Text:&lt;/td&gt;
				                    &lt;td class=&quot;colorCell&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_HeaderMenuColor2&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setHeaderMenuColor2);&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
				                    &lt;/tr&gt;
				                    &lt;/table&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Header_UploadImage&quot; &gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Header&quot; id=&quot;PageSettings_NewTheme_Header_UploadImageRadio&quot; onclick=&quot;Start.Theme.radioClick('headercustompic', 'headermode', 'custom')&quot; /&gt;Or upload your own picture&lt;/label&gt;
                                    &lt;br /&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Panel&quot;&gt;
                                    &lt;iframe allowtransparency=&quot;true&quot;  class=&quot;PageSettings_NewTheme_ImageUploadIFRAME&quot; id=&quot;PageSettings_NewTheme_HeaderCustomPicIFRAME&quot; src=&quot;&quot; width=&quot;200px&quot; height=&quot;300px&quot; frameborder=&quot;0&quot; allowtransparency=&quot;true&quot; scrolling=&quot;no&quot;&gt;&lt;/iframe&gt;
                                    &lt;/div&gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Header&quot; id=&quot;PageSettings_NewTheme_Header_ColorRadio&quot;  onclick=&quot;Start.Theme.radioClick('headercolor', 'headermode', 'color')&quot; /&gt;Or pick a color&lt;/label&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Panel&quot;&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Header_ColorPicker&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setHeaderColor);&quot; &gt;&amp;nbsp;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Nav&quot;&gt;
			                        &lt;div&gt;&lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showTabButtonTab()&quot; value=&quot;Next&quot; class=&quot;button&quot; /&gt;&lt;/div&gt;
			                        &lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.finish()&quot; value=&quot;Save&quot; class=&quot;button&quot; /&gt;
			                        &lt;input type=&quot;button&quot; value=&quot;Cancel&quot; class=&quot;button cancel&quot; onclick=&quot;Start.Theme.cancel()&quot; /&gt;
			                        &lt;/div&gt;&lt;div align=right&gt;
			                        &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_TabButtons&quot; class=&quot;NewThemePanel&quot;&gt;
                                    &lt;div&gt;
                                    &lt;div&gt;
					                &lt;div&gt;&lt;b&gt;Active Tab:&lt;/b&gt;&lt;/div&gt;
                                    &lt;div style=&quot;width: 80px; float:left; padding-top: 10px&quot;&gt;Background:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_ActiveTabColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setActiveTabColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;div style=&quot;width: 40px; float:left; padding-top: 10px&quot;&gt;Text:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_ActiveTabTextColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setActiveTabTextColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;clear&quot; style=&quot;padding-top:10px;&quot;&gt;
					                &lt;div&gt;&lt;b&gt;Inactive Tab:&lt;/b&gt;&lt;/div&gt;
                                    &lt;div style=&quot;width: 80px; float:left; padding-top: 10px&quot;&gt;Background:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_InactiveTabColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setInactiveTabColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;div style=&quot;width: 40px; float:left; padding-top: 10px&quot;&gt;Text:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_InactiveTabTextColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setInactiveTabTextColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;clear&quot; style=&quot;padding-top:10px;&quot;&gt;
					                &lt;div&gt;&lt;b&gt;Add Page:&lt;/b&gt;&lt;/div&gt;
					                &lt;div style=&quot;width: 80px; float:left; padding-top: 10px&quot;&gt;Background:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_AddPageBackColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setAddPageBackColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;div style=&quot;width: 40px; float:left; padding-top: 10px&quot;&gt;Text:&lt;/div&gt;&lt;div style=&quot;width: 100px; float:left; padding-top: 10px&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_TabButtons_AddPageTextColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setAddPageLinkColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;clear&quot; style=&quot;padding-top:10px;&quot;&gt;
                                    &lt;div style=&quot;width: 80px; float:left; font-weight:bold&quot;&gt;Start Button&lt;/div&gt;
                                    &lt;div style=&quot;float:left;clear:left;&quot;&gt;
                                    &lt;ul id=&quot;Pagesettins_NewTheme_TabButtons_Start&quot; class=&quot;flat_horizontal_ul clickable&quot;&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/1.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/1'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_1.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/2.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/2'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_2.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/3.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/3'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_3.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/4.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/4'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_4.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/5.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/5'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_5.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/6.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/6'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_6.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/7.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/7'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_7.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/8.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/8'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_8.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/9.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/9'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_9.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/10.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/10'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/themes/startbuttons/th_10.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;/ul&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Nav&quot;&gt;
			                        &lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showHeaderTab()&quot; value=&quot;Previous&quot; class=&quot;button&quot;  /&gt;
			                        &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showPageTab()&quot; value=&quot;Next&quot; class=&quot;button&quot;  /&gt;
			                        &lt;/div&gt;&lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.finish()&quot; value=&quot;Save&quot; class=&quot;button&quot; /&gt;
			                        &lt;input type=&quot;button&quot; value=&quot;Cancel&quot; class=&quot;button cancel&quot; onclick=&quot;Start.Theme.cancel()&quot; /&gt;
			                        &lt;/div&gt;&lt;div align=right&gt;
			                        &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Page&quot; class=&quot;NewThemePanel&quot;&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Page_Image&quot;&gt;
				                    &lt;div class=pageThemeTitle &gt;&lt;b&gt;Background&lt;/b&gt;&lt;/div&gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Page&quot; id=&quot;PageSettings_NewTheme_Page_ImageRADIO&quot;  onclick=&quot;Start.Theme.radioClick('pagepic', 'pagemode', 'picture')&quot; /&gt;Select Image&lt;/label&gt;
                                    &lt;iframe allowtransparency=&quot;true&quot; id=&quot;Theme_PageBackgroundIFRAME&quot; src=&quot;PageBackgrounds.aspx&quot; style=&quot;width:370px;margin-left:15px; height:200px&quot; frameborder="0"&gt;
                                    &lt;/iframe&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Footer&quot; class=&quot;clear marginTop20&quot; &gt;
				                    &lt;div&gt;&lt;b&gt;Footer Background: &lt;/b&gt;&lt;/div&gt;
				                    &lt;table cellpadding=&quot;2&quot; cellspacing=&quot;0&quot;&gt;
				                    &lt;tr&gt;
				                    &lt;td class=&quot;textCell&quot;&gt;Background 1 : &lt;/td&gt;
				                    &lt;td class=&quot;colorCell&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_FooterBGColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFooterBGColor); &quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
				                    &lt;td class=&quot;textCell&quot;&gt;Background 2 : &lt;/td&gt;&lt;td class=&quot;colorCell&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_FooterBGColor2&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFooterBGColor2); &quot; &gt;&amp;nbsp;&lt;/div&gt;
                                    &lt;/td&gt;&lt;td class=&quot;textCell&quot;&gt;Footer Text: &lt;/td&gt;&lt;td class=&quot;colorCell&quot;&gt;&lt;div id=&quot;PageSettings_NewTheme_FooterTextColor&quot; class=&quot;handCursor themecolorboxSmall&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFooterTextColor); &quot; &gt;&amp;nbsp;&lt;/div&gt;
				                    &lt;/td&gt;&lt;/tr&gt;
				                    &lt;/table&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Page_UploadImage&quot;&gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Page&quot; id=&quot;PageSettings_NewTheme_Page_UploadRADIO&quot;  onclick=&quot;Start.Theme.radioClick('pagecustompic', 'pagemode', 'custom')&quot; /&gt;Upload Image&lt;/label&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Panel&quot;&gt;
                                    &lt;iframe allowtransparency=&quot;true&quot;  class=&quot;PageSettings_NewTheme_ImageUploadIFRAME&quot; id=&quot;PageSettings_NewTheme_PageCustomPicIFRAME&quot; src=&quot;&quot; width=&quot;200px&quot; height=&quot;300px&quot;  frameborder=&quot;0&quot; scrolling=&quot;no&quot; allowtransparency=&quot;true&quot;&gt;&lt;/iframe&gt;
                                    &lt;/div&gt;
                                    &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Page&quot; id=&quot;PageSettings_NewTheme_Page_ColorRADIO&quot; onclick=&quot;Start.Theme.radioClick('pagecolor', 'pagemode', 'color')&quot; /&gt;Select Color&lt;/label&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Panel&quot;&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Page_BgColor&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setPageColor); &quot; &gt;&amp;nbsp;&lt;/div&gt;   
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Nav&quot;&gt;
				                    &lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showTabButtonTab()&quot; value=&quot;Previous&quot;  class=&quot;button&quot; /&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showFlakesTab()&quot; value=&quot;Next&quot;  class=&quot;button&quot; /&gt;
				                    &lt;/div&gt;&lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.finish()&quot; value=&quot;Save&quot; class=&quot;button&quot; /&gt;
				                    &lt;input type=&quot;button&quot; value=&quot;Cancel&quot; class=&quot;button cancel&quot; onclick=&quot;Start.Theme.cancel()&quot; /&gt;
				                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Flakes&quot; class=&quot;NewThemePanel&quot;&gt;
                                    &lt;table border=&quot;0&quot;&gt;
                                    &lt;tr valign=&quot;middle&quot; &gt;
                                    &lt;td class=&quot;PageSettings_NewTheme_Flakes_Item&quot;&gt;Flake Header:&lt;/td&gt;
                                    &lt;td&gt;&lt;div id=&quot;PageSettings_NewTheme_Flakes_HeaderColor&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFlakeHeaderColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
                                    &lt;/tr&gt;
                                    &lt;tr&gt;
                                    &lt;td valign=&quot;middle&quot; class=&quot;PageSettings_NewTheme_Flakes_Item&quot;&gt;Flake Title:&lt;/td&gt;    
                                    &lt;td&gt;&lt;div id=&quot;PageSettings_NewTheme_Flakes_TitleColor&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFlakeTitleColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
                                    &lt;/tr&gt;
                                    &lt;tr&gt;
                                    &lt;td valign=&quot;middle&quot; class=&quot;PageSettings_NewTheme_Flakes_Item&quot;&gt;Flake Border:&lt;/td&gt;    
                                    &lt;td&gt;&lt;div id=&quot;PageSettings_NewTheme_Flakes_BorderColor&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFlakeBorderColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
                                    &lt;/tr&gt;
				                    &lt;tr&gt;
                                    &lt;td valign=&quot;middle&quot; class=&quot;PageSettings_NewTheme_Flakes_Item&quot;&gt;Flake Outer Border:&lt;/td&gt;    
                                    &lt;td&gt;&lt;div id=&quot;PageSettings_NewTheme_Flakes_OuterBorderColor&quot; class=&quot;handCursor themecolorbox&quot; onclick=&quot;Start.Theme.showColorPicker(this.id, Start.Theme.setFlakeOuterBorderColor)&quot; &gt;&amp;nbsp;&lt;/div&gt;&lt;/td&gt;
                                    &lt;/tr&gt;
                                    &lt;/table&gt;
                                    &lt;div class=&quot;PageSettings_NewTheme_Nav&quot;&gt;
				                    &lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.showPageTab()&quot; value=&quot;Previous&quot;  class=&quot;button&quot; /&gt;
				                    &lt;/div&gt;&lt;div&gt;
                                    &lt;input type=&quot;button&quot; onclick=&quot;Start.Theme.finish()&quot; value=&quot;Finish&quot;  class=&quot;button&quot; /&gt;
				                    &lt;input type=&quot;button&quot; value=&quot;Cancel&quot; class=&quot;button cancel&quot; onclick=&quot;Start.Theme.cancel()&quot; /&gt;
				                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div id=&quot;PageSettings_NewTheme_Advanced&quot; class=&quot;NewThemePanel&quot;&gt;
                                    &lt;table cellspacing=&quot;10&quot;&gt;
                                    &lt;tr&gt;
                                    &lt;td width=&quot;50%&quot;&gt;&lt;b&gt;Custom CSS:&lt;/b&gt;&lt;/td&gt;
                                    &lt;td width=&quot;50%&quot;&gt;&lt;b&gt;Send us your theme!&lt;/b&gt;&lt;/td&gt;
                                    &lt;/tr&gt;            
                                    &lt;tr&gt;            
                                    &lt;td&gt;
                                    &lt;textarea id=&quot;PageSettings_NewTheme_Advanced_CustomCSS&quot; cols=&quot;40&quot; rows=&quot;10&quot; maxlength=&quot;4000&quot; &gt;&lt;/textarea&gt;
                                    &lt;br /&gt;
                                    &lt;input class=&quot;button&quot; type=&quot;button&quot; value=&quot;Apply&quot; onclick=&quot;Start.Theme.setCustomCss($('PageSettings_NewTheme_Advanced_CustomCSS').value)&quot; /&gt;
                                    &lt;/td&gt;           
                                    &lt;td&gt;
                                    &lt;p&gt;Send us your theme and we will review it. If it's a cool theme, &lt;br /&gt;
                                    we will publish it on the &quot;Change Theme&quot; section so that everyone &lt;br /&gt;
                                    at Pageflakes can use it!&lt;/p&gt;                
                                    &lt;b&gt;Name your theme:&lt;/b&gt;&lt;br /&gt;
                                    &lt;input type=&quot;text&quot; value=&quot;My cool theme&quot; id=&quot;PageSettings_NewTheme_Advanced_ThemeName&quot; /&gt;
                                    &lt;br /&gt;
                                    &lt;input class=&quot;button&quot; type=&quot;button&quot; value=&quot;Send&quot; onclick=&quot;Start.Theme.sendTheme()&quot; id=&quot;PageSettings_NewTheme_Advanced_SendButton&quot; /&gt;
                                    &lt;/td&gt;
                                    &lt;/tr&gt;
                                    &lt;/table&gt;
                                    &lt;/div&gt;
                                </textarea>
                            </div>
                        </div>                        
                        <!-- Change Layout DIV -->
                        <div id="PageSettingGridChangeLayout" style="display: none" class="SettingsRightMenuTD">
                            <div id="PageSettingsBodyDisabled">You do not have permissions to access this feature on this page</div>
                            <div id="PageSettingsBody">                            
                                <div class="StartPanelHeader">
                                    <a onclick="Start.toggleStart(1)" href="javascript:void(0)" style="padding: 2px; float: right; margin-top: -3px;">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" border="0" />
                                    </a>
                                    <span class="bold120" style="float:none;">
                                        Want to change the column layout of this page? &nbsp;
                                    </span>
                                    <div class="FlakeGridSep FlakeGridTitleSep">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"/>
                                    </div>
                                </div>
                                <div id="ColumnLayout">
                                    <table class="layout">
                                        <tr>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="100%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="50%,50%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="33%,33%,33%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td style="width: 33%">&nbsp;</td>
                                                                    <td style="width: 33%">&nbsp;</td>
                                                                    <td style="width: 33%">&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="25%,25%,25%,25%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td style="width: 25%">&nbsp;</td>
                                                                    <td style="width: 25%">&nbsp;</td>
                                                                    <td style="width: 25%">&nbsp;</td>
                                                                    <td style="width: 25%">&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="30%,70%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td style="width: 25%">&nbsp;</td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="25%,50%,25%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                                <tr>
                                                                    <td style="width: 20%">&nbsp;</td>
                                                                    <td style="width: 60%">&nbsp;</td>
                                                                    <td style="width: 20%">&nbsp;</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <input type="radio" name="PageLayout" value="70%,30%" onclick="Settings.applyColumnLayout(this.value)" />
                                                        </td>
                                                        <td>
                                                            <table class="LayoutPreviewTable">
                                                        <tr>
                                                            <td style="width: 75%">&nbsp;</td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <input type="radio" name="PageLayout" value="50%,25%,25%" onclick="Settings.applyColumnLayout(this.value)" />
                                                </td>
                                                <td>
                                                    <table class="LayoutPreviewTable">
                                                        <tr>
                                                            <td style="width: 60%">&nbsp;</td>
                                                            <td style="width: 20%">&nbsp;</td>
                                                            <td style="width: 20%">&nbsp;</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                    </table>
                                    <br />
                                    <input class="button" type="button" value="Save Changes" onclick="Settings.saveLayout()" /> 
                                    <input class="button" type="button" value="CANCEL" onclick="Settings.cancelLayout()" />
                                    <div class="pushdown">
                                    </div>
                                </div>
                            </div>
                        </div>                        
                <!-- My Profile DIV -->
                        <div id="PageSettingGridMyProfile" style="display: none" class="SettingsRightMenuTD">
                            <div id="PageSettingsProfileAreaDisabled">
                                Please <a title='log in' class='bold' href='Login.aspx'>log in</a> or <a title='sign up' class='bold' href='Signup.aspx'>
                                    sign up</a> to change your account settings or set up a public profile.
                            </div>
                            <div id="PageSettingsProfileArea">                                
                                <!--<form name="aspnetForm" method="post" action="pagesettingsdropdown2.aspx" id="aspnetForm">
                                    <div>
                                        <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTU1OTc2NDIxNA9kFgICAw9kFgICAQ9kFgJmDxYCHgRUZXh0BYQCPHNlbGVjdCBpZD0iZHJwQ2hhbmdlTGFuZ3VhZ2UiIG9uY2hhbmdlPSJqYXZhc2NyaXB0OnZvaWQoMCk7Ij48b3B0aW9uIHNlbGVjdGVkIHZhbHVlPSJlbiI+RW5nbGlzaDwvb3B0aW9uPjxvcHRpb24gdmFsdWU9ImRlIj5EZXV0c2NoPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT0icHQiPlBvcnR1Z3Vlc2U8L29wdGlvbj48b3B0aW9uIHZhbHVlPSJ6aC1jbiI+Q2hpbmVzZTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9ImJuIj5CYW5nbGE8L29wdGlvbj48L3NlbGVjdD5kZDMR42CCQvQhy4qkay72JMLdPhFc" />
                                    </div>
                                -->
                                <div>
                                    <div id="PageSettings_Profile_Tabs">
                                        <!--input type="button cancel" value="Cancel" class="PageSettings_CreateNewTheme_Cancel button cancel" onclick="Start.toggleStart()" /-->
                                        <ul class="themetabs">
                                            <li id="profileListPublic" class="themetab themeactivetab" onclick="Start.Profile.setProfileTab('PageSettings_Profile_Public'); $select(this, 'themeactivetab', 'LI')"><a>Public Profile</a></li>
                                            <li id="profileListBasic" class="themetab" onclick="Start.Profile.setProfileTab('PageSettings_Profile_Basic'); $select(this, 'themeactivetab', 'LI')"><a>Account</a></li>
                                            <li id="profileListInterest" class="themetab" onclick="Start.Profile.setProfileTab('PageSettings_Profile_Interest'); $select(this, 'themeactivetab', 'LI')"><a>Settings</a></li>
                                            <li><div style="padding:2px; float:right; margin-top:-3px; position:relative;"><a onclick="Start.toggleStart(1)" href="javascript:void(0)"><img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" border="0" /></a></div></li>
                                        <!--<li id="profileListAccount" class="themetab" onclick="Start.Profile.setProfileTab('PageSettings_Profile_Account'); $select(this, 'themeactivetab', 'LI')"><a>Account</a></li>-->
                                        </ul>
                                    </div>
                                    <div id="settingMessage" class="settingMessageBar" style="margin-left:0px;display:none;">
                                        <span id="errorMsgPublic" class="settingInfoIcon" > 
                                            <strong>Changes saved.</strong>
                                            <a id="Public_Profile_Link" href="http://www.pageflakes.com/Community/Profile.aspx"> Click here to view your public profile page</a> 
                                        </span>
                                        <span id="errorMsgBasic" class="settingInfoIcon" > 
                                            <strong>Changes saved.</strong>
                                        </span>
                                        <span id="errorMsgInterest" class="settingInfoIcon"> <strong>Changes saved.</strong></span>
                                        <!--<span id="errorMsg"> </span>-->
                                    </div>
                                    <div id="PageSettings_Profile_Public" class="ProfilePanel" style="display:none;" >
                                        <table border="0" cellpadding="2" cellspacing="0">
                                            <tr>
                                                <td colspan="4">
                                                    <input onclick="Start.Profile.checkShowInPublicProfile()" type="Checkbox" id="PageSettings_Profile_Public_chkShowInPublicDirectory"/>
                                                    <label for="PageSettings_Profile_Public_chkShowInPublicDirectory">Enable public profile and show it in the People Gallery</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">    
                                                    Username:
                                                </td>
                                                <td style="width: 1px;"></td>
                                                <td style="height: 29px">    
                                                    <input type="text" id="PageSettings_Profile_Public_txtUsername" onkeyup="Start.Profile.typeUsername();" maxlength="255" style="width:160px" />
                                                </td>
                                                <td id="UsernameMessageTD" style="color:Red; font-weight:bold; text-align:left; padding-left:5px">
                                                </td>   
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">
                                                    My profile address:
                                                </td>
                                                <td style="width: 1px"></td>
                                                <td colspan="2"> 
                                                    <div id="ProfileAddressLinkDiv">
                                                    </div>
                                                </td>            
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">
                                                    My Pagecast address:
                                                </td>
                                                <td style="width: 1px"></td>
                                                <td colspan="2">
                                                    <div id="PagecastLinkDiv"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">
                                                    Photo:
                                                </td>
                                                <td style="width: 1px"></td>
                                                <td colspan="2">
                                                    <table border="0" cellspacing="2" cellpadding="0">
                                                        <tr>
                                                            <td id="PhotoImageTD" style="vertical-align:bottom; height:120px; width:120px">
                                                                <img id="PageSettings_Profile_Public_imgProfile" src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" />
                                                            </td>
                                                            <td style="vertical-align:bottom">
                                                                <div id="PhotoCommandDiv" style="display:visible; padding-left:5px">
                                                                    <br />
                                                                    <a id="DeletePhotoLink" href="Javascript:void(0)" onclick="Start.Profile.deletePhoto('http://www.pageflakes.com/')">Delete photo</a><br />
                                                                    <a id="UploadPhotoLink" href="Javascript:void(0)" onclick="Start.Profile.showUploadPhoto()">Upload new photo</a>                                    
                                                                </div>                            
                                                                <div id="PhotoUploadDiv" style="display:none; padding-left:5px">
                                                                    <iframe runat="server" id="PageSettings_Profile_UploadPhotoIFRAME" src="Community/ProfilePhotoUploader/ProfilePhotoUploader.aspx" style="width:250px; height:65px" frameborder="0" allowtransparency="true">
                                                                    </iframe>
                                                                </div>                              
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">
                                                    About me
                                                </td>
                                                <td style="width: 1px"></td>
                                                <td colspan="2"> 
                                                    <textarea id="PageSettings_Profile_Public_txtAboutMe" rows="3" cols="20" style="width:350px"></textarea>
                                                </td>
                                            </tr> 
                                            <tr>
                                                <td style="width: 109px">
                                                    Contact settings:
                                                </td>
                                                <td style="width: 179px" colspan="3">
                                                    <input type="checkbox" id="PageSettings_Profile_Public_chkWelcomesMessages" /><label for="PageSettings_Profile_Public_chkWelcomesMessages">Other users can email me</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 109px">
                                                </td>
                                                <td style="width: 1px">
                                                </td>
                                                <td colspan="2"> 
                                                    <input type="button"  class="button" id="PublicProfileSaveChanges" name="PublicProfileSaveChanges" value="Save Changes" onclick="Start.Profile.saveMyProfile('PageSettings_Profile_Public');" />   
                                                    &nbsp;
                                                    <input type="button" class="button cancel" id="PublicProfileCancel" name="PublicProfileCancel" value="Cancel" onclick="Start.Profile.cancelMyProfile('PageSettings_Profile_Public');" />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div id="PageSettings_Profile_Basic" class="ProfilePanel"  style="display:none" >
                                        <table width="100%" cellpadding="2" cellspacing="2" >
                                            <tr>
                                                <td valign="top" width="109"></td>
                                                <td valign="top" width="300"></td>
                                                <td>
                                                    Show in public profile
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="109px" valign="top">First name:</td>
                                                <td width="300px" valign="top">
                                                    <input type="text" id="PageSettings_Profile_Basic_txtFirstName" value="" />&nbsp;<span id="PageSettings_Profile_Basic_errFirstName" style="display:none;color:Red" ><strong>*</strong></span>
                                                </td>
                                                <td>
                                                    <input id="PageSettings_Profile_Basic_chkFirstName" type="checkbox" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="109px" valign="top">Last name:</td>
                                                <td width="300px" valign="top">
                                                    <input type="text" id="PageSettings_Profile_Basic_txtLastName" value="" />
                                                    &nbsp;<span id="PageSettings_Profile_Basic_errLastName" style="display:none;color:Red" ><strong>*</strong></span>
                                                </td>
                                                <td><input id="PageSettings_Profile_Basic_chkLastName" type="checkbox" /></td>
                                            </tr>
                                            <tr style="display:">
                                                <td valign="top" width="109">
                                                    Email Address:
                                                </td>
                                                <td valign="top" width="300">
                                                    <span id="PageSettings_Profile_Basic_lblEmail"></span>
                                                    <div>For security reasons, <a href="EditUserProfile.aspx">click here</a> to change email</div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr style="display:">
                                                <td valign="top" width="109">Password:</td>
                                                <td valign="top" width="300"><a href="javascript:void(0)" onclick="Start.Profile.togglePasswordForm()">
                                                    <span id="PageSettings_Profile_Basic_lnkPassword">Change password</span></a><br />
                                                    <table id="PageSettings_Profile_Basic_frmPassword" style="width: 100%;display:none;">
                                                        <tr>
                                                            <td style="width: 100px">Current</td>
                                                            <td style="width: 242px" valign="top">
                                                                <input type="password" id="PageSettings_Profile_Basic_txtPassword" />
                                                                &nbsp;<span id="PageSettings_Profile_Basic_errPassword" style="display:none;color:Red" ><strong>*</strong></span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100px">New</td>
                                                            <td style="width: 242px">
                                                                <input type="password" id="PageSettings_Profile_Basic_txtNewPassword" />
                                                                &nbsp;<span id="PageSettings_Profile_Basic_errNewPassword" style="display:none;color:Red" ><strong>*</strong></span>    
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100px">Confirm</td>
                                                            <td style="width: 242px">
                                                                <input type="password" id="PageSettings_Profile_Basic_txtConfirmPassword" />
                                                                &nbsp;<span id="PageSettings_Profile_Basic_errConfirmPassword" style="display:none;color:Red" ><strong>*</strong></span>    
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="109" valign="middle" >Gender:</td>
                                                <td valign="top" width="300">
                                                    <select id="PageSettings_Profile_Basic_drpGender">
                                                        <option value=""></option>
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                    </select>
                                                </td>
                                                <td valign="top"><input id="PageSettings_Profile_Basic_chkGender" type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                            <td valign="middle" width="109">Date of birth:</td>
                                            <td valign="top" width="300">
                                                <select id="PageSettings_Profile_Basic_drpMonth">
                                                    <option value=""></option>
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
                                                </select>&nbsp;
                                                <select id="PageSettings_Profile_Basic_drpDay">
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                            </select>&nbsp;
                                                <select id="PageSettings_Profile_Basic_drpYear">
                                                <option value=""></option>
                                                <option value="2011">2011</option>
                                                <option value="2010">2010</option>
                                                <option value="2009">2009</option>
                                                <option value="2008">2008</option>
                                                <option value="2007">2007</option>
                                                <option value="2006">2006</option>
                                                <option value="2005">2005</option>         
                                                <option value="2004">2004</option>     
                                                <option value="2003">2003</option>    
                                                <option value="2002">2002</option>
                                                <option value="2001">2001</option>
                                                <option value="2000">2000</option>    
                                                <option value="1999">1999</option>   
                                                <option value="1998">1998</option>                 
                                                <option value="1997">1997</option>                
                                                <option value="1996">1996</option>                 
                                                <option value="1995">1995</option>                 
                                                <option value="1994">1994</option>                 
                                                <option value="1993">1993</option>                 
                                                <option value="1992">1992</option>                 
                                                <option value="1991">1991</option>                 
                                                <option value="1990">1990</option>                 
                                                <option value="1989">1989</option>
                                                <option value="1988">1988</option>
                                                <option value="1987">1987</option>
                                                <option value="1986">1986</option>
                                                <option value="1985">1985</option>
                                                <option value="1984">1984</option>
                                                    <option value="1983">1983</option>
                                                <option value="1982">1982</option>
                                                <option value="1981">1981</option>
                                                <option value="1980">1980</option>
                                                <option value="1979">1979</option>
                                                <option value="1978">1978</option>
                                                <option value="1977">1977</option>
                                                <option value="1976">1976</option>
                                                <option value="1975">1975</option>
                                                <option value="1974">1974</option>
                                                <option value="1973">1973</option>
                                                <option value="1972">1972</option>
                                                <option value="1971">1971</option>
                                                <option value="1970">1970</option>
                                                <option value="1969">1969</option>
                                                <option value="1968">1968</option>                 
                                                <option value="1967">1967</option>
                 
                        <option value="1966">1966</option>
                 
                        <option value="1965">1965</option>
                 
                        <option value="1964">1964</option>
                 
                        <option value="1963">1963</option>
                 
                        <option value="1962">1962</option>
                 
                        <option value="1961">1961</option>
                 
                        <option value="1960">1960</option>
                 
                        <option value="1959">1959</option>
                 
                        <option value="1958">1958</option>
                 
                        <option value="1957">1957</option>
                 
                        <option value="1956">1956</option>
                 
                        <option value="1955">1955</option>
                 
                        <option value="1954">1954</option>
                 
                                                <option value="1953">1953</option>
                 
                        <option value="1952">1952</option>
                 
                        <option value="1951">1951</option>
                 
                        <option value="1950">1950</option>
                 
                        <option value="1949">1949</option>
                 
                        <option value="1948">1948</option>
                 
                        <option value="1947">1947</option>
                 
                        <option value="1946">1946</option>
                 
                        <option value="1945">1945</option>
                 
                        <option value="1944">1944</option>
                 
                        <option value="1943">1943</option>
                 
                        <option value="1942">1942</option>
                 
                        <option value="1941">1941</option>
                 
                                                <option value="1940">1940</option>                     
                                        </select>
                                            </td>
                                            <td valign="top"><input id="PageSettings_Profile_Basic_chkDateOfBirth" type="checkbox" checked="CHECKED" /></td>
                                        </tr>
                                        <tr>
                                            <td width="109px" valign="middle">I live in:</td>
                                            <td width="300px" valign="top"><input type="text" id="PageSettings_Profile_Basic_txtLocation" value="" /></td>
                                            <td><input id="PageSettings_Profile_Basic_chkLocation" type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td valign="middle" width="109">Childhood Hometown:</td>
                                            <td valign="top" width="300">
                                                <input class="Location_Box_Relative" type="text" id="PageSettings_Profile_Basic_txtHometown" onblur="Start.Profile.geoLocated();" value="" />
                                            </td>
                                            <td>
                                                <input id="PageSettings_Profile_Basic_chkHometown" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" width="109">Interests:</td>
                                            <td valign="top" width="300">
                                                <textarea rows="4" cols="30" id="PageSettings_Profile_Basic_txtInterest"></textarea>
                                            </td>
                                            <td valign="top">
                                                <input id="PageSettings_Profile_Basic_chkInterest" type="checkbox" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="109px" valign="top" >&nbsp;</td>
                                            <td width="300px" valign="top" >
                                                <input type="button" id="PageSettings_Profile_Basic_btnSave" class="button" value="Save Changes" onclick="Start.Profile.saveMyProfile('PageSettings_Profile_Basic')" />         
                                                &nbsp;
                                                <input type="button" class="button cancel" id="PageSettings_Profile_Basic_btnCancel" name="PageSettings_Profile_Basic_btnCancel" value="Cancel" onclick="Start.Profile.cancelMyProfile('PageSettings_Profile_Basic');" />
                                            </td>
                                            <td ><span style="color:Red" id="PageSettings_Profile_Basic_lblMessage"/></td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="PageSettings_Profile_Interest" class="ProfilePanel"  style="display:none" >
                                    <table width="100%" >
                                    <tr>
                                        <td width="100px" >&nbsp;</td>
                                        <td width="300px" >&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td  width="109px" valign="top">Language: </td>
                                        <td width="300px" valign="top"> 
                                            <select id="drpChangeLanguage" onchange="javascript:void(0);">
                                                <option selected value="en">English</option>
                                                <option value="de">Deutsch</option>
                                                <option value="pt">Portuguese</option>
                                                <option value="zh-cn">Chinese</option>
                                                <option value="bn">Bangla</option>
                                                <option value="fr">French</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="109px" valign="top">Newsletter:</td>
                                        <td width="300px" valign="top"><input type="checkbox" id="PageSettings_Profile_Basic_chkNewsletter" value="" /></td>
                                        <td>&nbsp;</td>
                                    </tr >
                                    <tr style="display:none;">
                                        <td valign="top" width="109">Search bar:</td>
                                        <td valign="top" width="300">
                                            <input type="checkbox" id="PageSettings_Profile_Basic_chkSearch" value="" />
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" width="109"></td>
                                        <td valign="top" width="300">
                                            <input type="button" id="PageSettings_Profile_Interest_btnSave" class="button" value="Save Changes" onclick="Start.Profile.saveMyProfile('PageSettings_Profile_Interest')" />
                                            &nbsp;
                                            <input type="button" class="button cancel" id="PageSettings_Profile_Interest_btnCancel" name="PageSettings_Profile_Interest_btnCancel" value="Cancel" onclick="Start.Profile.cancelMyProfile('PageSettings_Profile_Interest');" />
                                        </td>            
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" width="109"></td>
                                        <td valign="top" width="300"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td valign="top" width="109"></td>
                                        <td valign="top" width="300">
                                            <div id="EmailVerification" style="padding-top:5px">
                                                Please verify your email address by clicking on the email link sent to you. If you
                                                can't find the email, please check your spam filter.
                                                <br />
                                                <input value="Resend verification email" class="button" type="button" onclick="Settings.resendVerificationEmail();" id="btnResendVerificationEmail"/>
                                            </div>
                                        </td>
                                    <td valign="top"></td>
                                </tr>
                                <tr>
                                    <td valign="top" width="109"></td>
                                    <td valign="top" width="300"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td width="109px" valign="top">&nbsp;</td>
                                    <td width="300px" valign="top"></td>
                                    <td><span  style="color:Red"  id="PageSettings_Profile_Interest_lblMessage"></span></td>
                                </tr>
                            </table>
                                </div>
                            </div>
                        <!--</form>-->
                        </div>
                    </div>                        
                    <!-- Add Feed / Bookmark OPML DIV -->
                    <div id="PageSettingsGridAddFeedBody" class="SettingsRightMenuTD" style="display: none">
                        <div class="StartPanelHeader">
                            <a onclick="Start.toggleStart(1)" href="javascript:void(0)" style="padding: 2px; float: right; margin-top: -3px;"><img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" border="0" /></a> 
                            <span class="bold120" style="float:none;">Add any RSS feed to your page or import an OPML file</span>
                            <div class="FlakeGridSep FlakeGridTitleSep">
                                <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"/>
                            </div>
                        </div>
                        <table width="500" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:40px;">
                                    <span class="bold120">Add Feed:</span></td>
                                <td>
                                    <input id="AddFeedUrl_URL" type="text" value="Enter URL here" onfocus="this.select();" onkeypress="if( event.keyCode == 13 ) $('AddFeedUrl_Go').click()" size="20" style="width: 250px" />
                                    <input class="button" id="AddFeedUrl_Go" type="button" value="Get Feed" onclick="javascript:AddContent_Scripts_addContentInPage('AddFeedUrl_URL','AddFeedTips','AddFeedBox_Result' )" />
                                </td>
                            </tr>
                            <tr>
                                    <td style="height:40px;" valign="top">
                                        <span class="bold120">Import OPML:</span></td>
                                    <td id="OPMLOptionContainer">
                                        <iframe id="OPMLoptions" src="OPMLimporter.aspx?v=1" scrolling="no" border="0" frameborder="no" framespacing="0" style="width: 100%; height: 50px;border:none;position: static;background: transparent;" allowtransparency="true"></iframe>
                                    </td>
                                </tr>                                
                            </table>
                            <div style="display: none;" id="AddFeedBox_Result">result</div>
                            
                            <a id="OpmlLink" href="javascript:AddContent_ManageBookmarks()" ></a>
                             <a id="LinkManageBookmarks" style="color:#DDD;" href="javascript:AddContent_ManageBookmarks()">Manage
                                Bookmarked feeds</a>
                                
 
                            <!-- < %=_("(Enter URL here)")%> < %=_("Get Feed")%> < %=_("result")%> < %=_("Import OPML")%> Manage Bookmarked feeds -->
                        </div>
                        
                    </div>
                </td>
            </tr>
            <tr>
                <td class="browseFlakesAddRSS"><a href="javascript:void(0)" title="Add RSS feed or Import OPML" onclick="Start.loadPageSettingGrid(7,1,1)">Add RSS Feed</a></td>
            </tr>
        </table>
    </div>
</div>

</body>
</html>
