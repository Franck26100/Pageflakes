﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PageSettingsDropdown1.aspx.cs" Inherits="PageSettingsDropdown2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" method="post">
    
        

        <table id="SettingsTable" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td id="SettingsLeftMenuTD" valign="top">
                        <div id="SettingsLeftMenuContainer" style="padding-top:5px;">
                            <ul id="settingsLeftMenuUL">
                                <li class="settingsLeftMenu">
                                    <a title="Our Coolest Flakes" id="TopFlakesLink" onclick="Start.loadPageSettingGrid(0,1,1)" href="javascript:void(0)">Top Flakes</a>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="Find new stuff" id="BrowseFlakesLink" onclick="Start.loadPageSettingGrid(1,1,1)" href="javascript:void(0)">Browse Flakes</a>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="View Selection of public page" id="PagecastLink" onclick="Start.loadPageSettingGrid(2,1,1)" href="javascript:void(0)">PageCasts</a> 
                                </li>
                                <li class="settingLeftMenuHr">
                                    <div>
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" alt="" />
                                    </div>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="Create Your Own Shared" onclick="Start.loadPageSettingGrid(3,1,1)" href="javascript:void(0)">Make PageCast</a>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="Personalize your Page" id="ChangeThemeLink" onclick="Start.loadPageSettingGrid(4,1,1)" href="javascript:void(0)">Change Theme</a>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="Rearrange your Page" id="ChangeLayoutLink" onclick="Start.loadPageSettingGrid(5,1,1)" href="javascript:void(0)">Change Layout</a>
                                </li>
                                <li class="settingsLeftMenuHr">
                                    <div>
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" alt="" />
                                    </div>
                                </li>
                                <li class="settingsLeftMenu">
                                    <a title="Upload Your Photo & Add something about yourself" class="" onclick="Start.loadPageSettingGrid(6,1,1)" href="javascript:void(0)">My Profile</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td id="SettingsMidMenuTD" valign="top">
                        <div id="OnsiteFlakeCategoryList">
                        </div>
                    </td>
                    <td id="SettingsRightMenuTD" valign="top" rowspan="2">
                        <div id="PageSettingGrid">
                            <div id="PageSettingLoading">&nbsp;</div>                           
                            <div class="SettingsRightMenuTD" id="PageSettingGridTopFlake">
                            </div>
                            <div id="PageSettingGridBrowseFlake"></div>
                            <div id="PageSettingGridCommunityPage"></div>
                            <div class="SettingsRightMenuTD" id="PageSettingGridSharePage" style="display:none">
                                <div id="SharingOptionsDisabled">
                                    Vous  n'avez pas l'autorisation d'acces à ces options sur cette page
                                </div>
                                <div id="SharingOptions">
                                    <div class="StartPanelHeader">
                                        <a onclick="Start.toggleStart(1)" href="javascript:void(0)">
                                            <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" style="border:0;" />
                                        </a>
                                        <span class="bold120" style="float:none;">
                                            Vous voullez partager cette page avec d'autre personnes ? &nbsp;
                                        </span>
                                        <div class="FlakeGridSep FlakeGridTitleSep">
                                            <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif" alt="" />
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
                                            <span class="disabled">&nbsp;To share your page, please &nbsp;
                                                <a href="Login.aspx" class="bold">login</a> or <a href="SignUp.aspx" class="bold">sign up</a>
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
                                                    Entrez les emails separés par des virgules
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
                                                        <input id="PublisOptions_UserNameUrl" size="54" value="http://www.Pageflakes.com/.../" onkeyup="Settings.handleUniqueNameChange();" readonly="readonly" />
                                                    </td>
                                                </tr>
                                            </table>
                                            <div id="divUserNameNotUnique" style="color: red; display: none;">
                                                Username already Exits
                                            </div>
                                            <p>
                                                Pagecast title (will be used in our Public Pagecasts Gallery)
                                                <br />
                                                <input id="PublishOptions_Title" value="" onfocus="this.select()" size="80" /><br />
                                                <label id="PublishOptions_TitleReq" class="small_text">
                                                    Please enter a public page title
                                                </label>
                                            </p>
                                            <p>
                                                Enter a brief description of your Pagecast
                                                <br />
                                                <textarea id="PublishOptions_Description" onfocus="this.select()" rows="2" cols="20"></textarea>
                                                <br />
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
                            <div class="SettingsRightMenuTD" id="PageSettingGridChangeTheme">
                                <div id="ThemeAreaDisabled">
                                    Vous n'avez pas la permission d'acceder a cet option sur cette page
                                </div>
                                <div id="ThemeArea">
                                <textarea id="ThemeHtml">&lt;div id=&quot;PageSettings_ThemeArea&quot;&gt;&lt;div id=&quot;PageSettings_SelectTheme&quot;&gt;&lt;div class=&quot;StartPanelHeader&quot;&gt;&lt;a onclick=&quot;Start.Theme.cancelOut(1)&quot; href=&quot;javascript:void(0)&quot; style=&quot;padding: 2px; float: right; margin-top: -3px;&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif&quot; alt=&quot;Cancel&quot; title=&quot;Cancel&quot; border=&quot;0&quot; /&gt;&lt;/a&gt; &lt;span class=&quot;bold120&quot;&gt;Choose one of the themes below or&amp;nbsp;&lt;/span&gt; &lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; class=&quot;OnsiteBtnTbl&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;div style=&quot;display:inline&quot; onclick=&quot;Start.Theme.createNew()&quot;&gt;&lt;div class=&quot;OnsiteBtnLeft&quot;&gt;&lt;div class=&quot;OnsiteBtnRight&quot;&gt;&lt;span class=&quot;OnsiteGalleryBtn&quot;&gt;Create Your Own Theme&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
                                    &lt;div class=&quot;FlakeGridSep FlakeGridTitleSep&quot;&gt;&lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif&quot;/&gt;&lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div class=&quot;Start_Themes_Div_Selection&quot; id=&quot;PageSettings_SelectTheme_Div&quot; &gt;
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
                                <textarea id="CreateThemeHtml">&lt;div id=&quot;PageSettings_CreateNewTheme_Tabs&quot;&gt;&lt;ul class=&quot;themetabs&quot;&gt;&lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_HeaderTab&quot; class=&quot;themetab themeactivetab&quot; onclick=&quot;Start.Theme.showHeaderTab()&quot;&gt;&lt;a&gt;Header&lt;/a&gt;&lt;/li&gt; &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_TabButtonTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showTabButtonTab()&quot;&gt;&lt;a&gt;Tabs &amp; Buttons&lt;/a&gt;&lt;/li&gt; &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_PageTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showPageTab()&quot;&gt;&lt;a&gt;Page&lt;/a&gt;&lt;/li&gt; &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_FlakeTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showFlakesTab()&quot;&gt;&lt;a&gt;Flakes&lt;/a&gt;&lt;/li&gt; &lt;li id=&quot;PageSettings_CreateNewTheme_Tabs_AdvancedTab&quot; class=&quot;themetab&quot; onclick=&quot;Start.Theme.showAdvancedTab()&quot;&gt;&lt;a&gt;Advanced&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;div style=&quot;padding: 2px; float: right; margin-top: -2px;&quot;&gt;&lt;a onclick=&quot;Start.Theme.cancel()&quot; href=&quot;javascript:void(0)&quot;&gt; &lt;img src=&quot;http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif&quot; alt=&quot;Cancel&quot; title=&quot;Cancel&quot; border=&quot;0&quot; /&gt;&lt;/a&gt;&lt;/div&gt;&lt;/li&gt; &lt;/ul&gt; &lt;/div&gt; &lt;div id=&quot;PageSettings_NewTheme_Header&quot; class=&quot;NewThemePanel&quot;&gt; &lt;div class=pageThemeTitle &gt;&lt;b&gt;Background&lt;/b&gt;&lt;/div&gt; &lt;div id=&quot;PageSettings_NewTheme_Header_Image&quot;&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_Header&quot; id=&quot;PageSettings_NewTheme_Header_ImageRadio&quot; onclick=&quot;Start.Theme.radioClick('headerpic', 'headermode', 'picture')&quot; /&gt;Select a header background image from the gallery&lt;/label&gt; &lt;iframe allowtransparency=&quot;true&quot; id=&quot;Theme_HeaderIFRAME&quot; src=&quot;HeaderPictures.aspx&quot; style=&quot;width:390px;margin-left:15px;height:200px;padding-top:5px;&quot; frameborder="0"&gt; &lt;/iframe&gt; &lt;div id=&quot;PageSettings_NewTheme_HeaderMenu&quot; class=&quot;clear marginTop20&quot;&gt; &lt;div class=pageThemeTitle &gt;&lt;b&gt;Pageflakes logo:&lt;/b&gt;&lt;/div&gt; &lt;div&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot; id=&quot;PageSettings_NewTheme_LogoRADIO_Standard&quot; value=&quot;Standard&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Standard&lt;/label&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_LightBlue&quot; value=&quot;LightBlue&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Light&lt;/label&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_Lighter&quot; value=&quot;Lighter&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot; /&gt;Very Light&lt;/label&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_DarkBlue&quot; value=&quot;DarkBlue&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot;/&gt;Dark&lt;/label&gt; &lt;label&gt;&lt;input type=&quot;radio&quot; class=&quot;radioInput&quot; name=&quot;PageSettings_NewTheme_LogoRADIO&quot;  id=&quot;PageSettings_NewTheme_LogoRADIO_Darker&quot; value=&quot;Darker&quot; onclick=&quot;Start.Theme.setLogo(this.value)&quot;/&gt;Very Dark&lt;/label&gt;&lt;/div&gt; &lt;br /&gt; &lt;div class=clear &gt;&lt;b&gt;Links:&lt;/b&gt;&lt;/div&gt; &lt;table cellpadding=&quot;2&quot; cellspacing=&quot;0&quot;&gt;
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
                                    &lt;li value=&quot;images/themes/startbuttons/1.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/1'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_1.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/2.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/2'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_2.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/3.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/3'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_3.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/4.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/4'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_4.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/5.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/5'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_5.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/6.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/6'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_6.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/7.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/7'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_7.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/8.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/8'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_8.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/9.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/9'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_9.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
                                    &lt;li value=&quot;images/themes/startbuttons/10.png&quot; onclick=&quot;Start.Theme.setStartButton('images/themes/startbuttons/10'); $select(this, 'Selected', 'LI')&quot;&gt;&lt;div class=&quot;PageSettings_NewTheme_Start_Image_Holder&quot;&gt;&lt;img src=&quot;http://pfimg.liveuniversenetwork.com/images/themes/startbuttons/th_10.png&quot; /&gt;&lt;/div&gt;&lt;/li&gt;
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
				                    &lt;div class=&quot;pageThemeTitle&quot; &gt;&lt;b&gt;Background&lt;/b&gt;&lt;/div&gt;
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
                            <div class="SettingsRightMenuTD" id="PageSettingGridChangeLayout" style="display:none">
                            <div id="PageSettingsBodyDisabled">
                                You do not have permissions to access this feature on this page
                            </div>
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
                                                                    <td>
                                                                        &nbsp;
                                                                    </td>
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
                            <input type="radio" name="PageLayout" value="50%,50%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td>
                                        &nbsp;</td>
                                    <td>
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="33%,33%,33%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 33%">
                                        &nbsp;</td>
                                    <td style="width: 33%">
                                        &nbsp;</td>
                                    <td style="width: 33%">
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="25%,25%,25%,25%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 25%">
                                        &nbsp;</td>
                                    <td style="width: 25%">
                                        &nbsp;</td>
                                    <td style="width: 25%">
                                        &nbsp;</td>
                                    <td style="width: 25%">
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="30%,70%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 25%">
                                        &nbsp;</td>
                                    <td>
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="25%,50%,25%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 20%">
                                        &nbsp;</td>
                                    <td style="width: 60%">
                                        &nbsp;</td>
                                    <td style="width: 20%">
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="70%,30%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 75%">
                                        &nbsp;</td>
                                    <td>
                                        &nbsp;</td>
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
                            <input type="radio" name="PageLayout" value="50%,25%,25%" onclick="Settings.applyColumnLayout(this.value)" /></td>
                        <td>
                            <table class="LayoutPreviewTable">
                                <tr>
                                    <td style="width: 60%">
                                        &nbsp;</td>
                                    <td style="width: 20%">
                                        &nbsp;</td>
                                    <td style="width: 20%">
                                        &nbsp;</td>
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
                            <div class="SettingsRightMenuTD" id="PageSettingGridMyProfile" style="display:none;">
                                <div id="PageSettingsProfileAreaDisabled">
                                </div>
                                <div id="PageSettingsProfileArea">
                                </div>
                            </div>
                            <div class="SettingsRightMenuTD" id="PageSettingGridFeedBody" style="display:none">
                                <div class="StartPanelHeader">
                                    <a onclick="Start.toggleStart(1)" href="javascript:void(0)" style="padding: 2px; float: right; margin-top: -3px;">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/closeButtonSettings.gif" alt="Cancel" title="Cancel" border="0" />
                                    </a>
                                    <span class="bold120" style="float:none;">
                                        Add any RSS feed to your page or import an OPML file
                                    </span>
                                    <div class="FlakeGridSep FlakeGridTitleSep">
                                        <img src="http://marquisfranck.perso.sfr.fr/pageflakes/images/space.gif"/>
                                    </div>
                                    <table width="500" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:40px;">
                                                <span class="bold120">Add Feed:</span>
                                            </td>
                                            <td>
                                                <input id="AddFeedUrl_URL" type="text" value="Enter URL here" onfocus="this.select();" onkeypress="if( event.keyCode == 13 ) $('AddFeedUrl_Go').click()" size="20" style="width: 250px" />
                                                <input class="button" id="AddFeedUrl_Go" type="button" value="Get Feed" onclick="javascript:AddContent_Scripts_addContentInPage('AddFeedUrl_URL','AddFeedTips','AddFeedBox_Result' )" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;" valign="top">
                                                <span class="bold120">Import OPML:</span>
                                            </td>
                                            <td id="OPMLOptionContainer">
                                                <iframe id="OPMLoptions" src="OPMLimporter.aspx?v=1" scrolling="no" border="0" frameborder="no" framespacing="0" style="width: 100%; height: 50px;border:none;position: static;background: transparent;" allowtransparency="true"></iframe>
                                            </td>
                                        </tr>                                
                                    </table>
                                    <div style="display: none;" id="AddFeedBox_Result">
                                        result
                                    </div>                            
                                    <a id="OpmlLink" href="javascript:AddContent_ManageBookmarks()" ></a>
                                    <a id="LinkManageBookmarks" style="color:#DDD;" href="javascript:AddContent_ManageBookmarks()">
                                        Manage Bookmarked feeds
                                    </a>
                                    <!-- < %=_("(Enter URL here)")%> < %=_("Get Feed")%> < %=_("result")%> < %=_("Import OPML")%> Manage Bookmarked feeds -->
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="browseFlakesAddRSS">
                        <a title="Add RSS feed or Import OPML" onclick="Start.loadPageSettingGrid(7,1,1)" href="javascript:void(0)">
                            Add RSS Feed
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>    



    
   
    </form>
</body>
</html>
