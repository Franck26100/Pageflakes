
var SETTINGS_POPUP_ID='SettingsPopup';
var SHARINGOPTIONS_NOSHARE="SharingOptions_NoShare";
var SHARINGOPTIONS_PUBLIC="SharingOptions_Public";
var SHARINGOPTIONS_SHARE="SharingOptions_Share";
var SHARINGOPTIONS_SHAREDUSERS="SharingOptions_SharedUsers";
var PUBLISHOPTIONS_SHAREDUSERS="PublishOptions_SharedUsers";
var PUBLISHOPTIONS_USERNAME="PublisOptions_UserName";
var PUBLISHOPTIONS_USERNAMEURL="PublisOptions_UserNameUrl";
var SHARINGOPTIONS_NOSHARE_TOOLTIP=Lang.SHARINGOPTIONS_NOSHARE_TOOLTIP;
var SHARINGOPTIONS_PUBLIC_TOOLTIP=Lang.SHARINGOPTIONS_PUBLIC_TOOLTIP;
var SHARINGOPTIONS_SHARE_TOOLTIP=Lang.SHARINGOPTIONS_SHARE_TOOLTIP;
var SHARINGOPTIONS_NOSHARE_LABEL="SharingOptions_NoShareLabel";
var SHARINGOPTIONS_PUBLIC_LABEL="SharingOptions_PublicLabel";
var SHARINGOPTIONS_SHARE_LABEL="SharingOptions_ShareLabel";
var PUBLISHOPTIONS_PAGETITLE="PublishOptions_Title";
var PUBLISHOPTIONS_TITLE_REQ="PublishOptions_TitleReq";
var PUBLISHOPTIONS_DESCRIPTION="PublishOptions_Description";
var PUBLISHOPTIONS_DESCRIPTION_REQ="PublishOptions_DescriptionReq";
var PUBLISHOPTIONS_TAGS="PublishOptions_Tags";
var PUBLISHOPTIONS_TAQ_REQ="PublishOptions_TagReq";
var PUBLISHOPTIONS_ALLOW_EDIT="PublishOptions_AllowEdit";
var SHAREDIALOG_ERRORINMAIL="shareDialog_ErrorInMail";
var SHAREDIALOG_ERRORTITLE="shareDialog_ErrorTitle";
var SHARINGOPTIONS_ALLOWEDIT="SharingOptions_AllowEdit";
var PAGELAYOUT_PAGETITLE="PageLayout_PageTitle";
var PUBLISHDIALOG_ERRORINMAIL="PublishDialog_ErrorInMail";
var PUBLISHDIALOG_ERRORTITLE="PublishDialog_ErrorTitle";
var PUBLISHDIALOG_MESSAGE="PublishDialog_Message";
var SHARINGOPTIONS_SAVE="SharingOptions_Save";
var SHARINGOPTIONSBODY="SharingOptionsBody";
var SHARINGOPTIONSBODY_DUMMY="SharingOptionsDummyBody";
var tempGlobalLocation='';
var tempGlobalTimezone='';
var tempGlobalZip='';
var PROFILE_PUBLIC_ShowInPublicDirectory=0;
var PROFILE_PUBLIC_UniqueName=1;
var PROFILE_PUBLIC_EcoStorageId=2;
var PROFILE_PUBLIC_AboutMe=3;
var PROFILE_PUBLIC_WelcomesMessages=4;
var PROFILE_PUBLIC_ImageHandlerPath=5;
var PROFILE_PUBLIC_StorageIdKey=6;
var PROFILE_PUBLIC_Size=7;
var PROFILE_PUBLIC_UrlPrefix=8;
var PROFILE_PUBLIC_HasPagecasts=9;
var PROFILE_PUBLIC_Sex=10;
var PUBLIC_PROFILE_LINK="Public_Profile_Link";
var PAPER_ICON="paperIcon.png";
var MANAGE_BOOKMARK_POPUP_ID="ManageBookmarkPopup";
var PAGE_SETTINGS_POPUP_ID='gray_panel_dropdown_settings';
var PAGESETTINGS_PROFILE_MESSAGE="PageSettings_Profile_Message";
var savedUniqueName;
var _profilePublicIsLoaded=false;
var _profileBasicIsLoaded=false;
var _profileInterestIsLoaded=false;
var _showInPublicDirectory;
var _uniqueName;
var _ecoStorageId;
var _aboutMe;
var _welcomesMessages;
var _sex;
var _location;
var _firstName;
var _lastName;
var _email;
var _interests;
var _dobDay;
var _dobMonth;
var _dobYear;
var _dobGender;
var _hometown;
var _showFirstName;
var _showLastName;
var _showGender;
var _showDob;
var _showLocation;
var _showHometown;
var _showInterests;
var _urlPrefix;
var _imageHandlerPath;
var _storageIDKey;
var _size;
var _hasPagecasts;
var Start_isLoaded=false;
var OPMLOptionContents='<iframe id="OPMLoptions" src="OPMLimporter.aspx?v=1" scrolling="no" border="0" frameborder="no" framespacing="0" style="width: 100%; height: 50px;border:none;position: static;background: transparent;" allowtransparency="true"></iframe>';
var OPMLMessage;
var _browseFlakeScrollTopPos=0;
var _browseFlakeScrollHeight=0;
var _browseFlakeInitScrollPos=0;
var si=null;
var Start=
{
showPageSettings:function()
{
Start.isLocked=false;
var div=$(PAGE_SETTINGS_POPUP_ID);
if(div.innerHTML=='')
{
Start.hidePageSettings();
$D(div);
$('Start').className="Start_down";
div.innerHTML=Lang.LOADING;
var scriptLoader=new ScriptLoader();
scriptLoader.load(SITE_PREFIX+'PageSettingsDropdown2.aspx?v='+VERSION_SUFFIX,function(content)
{
div.innerHTML=content;
Start_isLoaded=true;
$track('/StartMenu/Show');
$DC(function()
{
Start.keepSelectedMenu('settingsLeftMenuUL',0);});});}
else
{
if($isVisible(div))
{
Start.hidePageSettings();
$('Start').className="";}
else
{
Start.hidePageSettings();
Start.loadPageSettingGrid(0,App.DomainID,App.LanguageID);
$D(div);
$('Start').className="Start_down";
$track('/StartMenu/ShowAgain');}}
$DC($fixTable);
return $isVisible(div);},
hidePageSettings:function(event)
{
$ND(PAGE_SETTINGS_POPUP_ID);
$('Start').className="";},
loadOnsiteItemGallery:function(categoryID,a)
{
Start.keepSelectedMenu('onsite_gallery_table',a);
$("OnsiteFlakeGrid").innerHTML="<div class='downloadInProgress' valign='middle' style='height:144px' >&nbsp;</div>";
_browseFlakeScrollTopPos=$('OnsiteFlakeCategoryList').scrollTop;
_browseFlakeScrollHeight=$('SettingsMidMenuTD').offsetHeight;
AddContentWS.GetOnsiteItemGrid(categoryID,VERSION_SUFFIX,
function(result)
{
$("OnsiteFlakeGrid").innerHTML=result;
$nodisplay($("OnsiteFlakeCategoryList"));
var displayHeight=$("SettingsGridTable").offsetHeight;
$display($("OnsiteFlakeCategoryList"));
$("OnsiteFlakeCategoryList").style.height=displayHeight.toString()+"px";
var scrollDiff=$('SettingsMidMenuTD').offsetHeight-_browseFlakeScrollHeight;
$('OnsiteFlakeCategoryList').scrollTop=_browseFlakeScrollTopPos-scrollDiff;
_browseFlakeInitScrollPos=$('OnsiteFlakeCategoryList').scrollTop;});},
loadOnsiteItemGalleryForRSS:function()
{
try
{
window.setTimeout(function()
{
if($('OPMLoptions')){$('OPMLoptions').src=SITE_PREFIX+"/OpmlImporter.aspx?v=1";}},300);}
catch(xx)
{}},
fixOPMLWindow:function()
{
window.setTimeout(new function(){try{$('OPMLoptions').src=SITE_PREFIX+"/OpmlImporter.aspx?v=1";}catch(rx){}},200);},
hidePageSettingGrids:function()
{
$ND('PageSettingGridTopFlake','PageSettingGridBrowseFlake','PageSettingGridCommunityPage','PageSettingGridSharePage','PageSettingGridChangeTheme','PageSettingGridChangeLayout','PageSettingGridMyProfile','PageSettingsGridAddFeedBody');},
keepSelectedMenu:function(ulId,noOrEl)
{
var a=$(ulId).getElementsByTagName('a');
for(var i=0;i<a.length;i++)
{
a[i].className="";}
if(noOrEl!=7)
{
if(typeof noOrEl!="object")noOrEl=a[noOrEl];
noOrEl.className="a_hover";}},
onsiteThumbHover:function(index)
{
$addClass($('OnSiteThumb'+index),'OnsiteThumbHover');},
onsiteThumbHoverOut:function(index)
{
$removeClass($('OnSiteThumb'+index),'OnsiteThumbHover');},
loadPageSettingGrid:function(pageSettingVal,domainID,languageID)
{
if(Start.isLocked)
return;
Start.isLocked=true;
if($('settingsLeftMenuUL')!=null)
Start.keepSelectedMenu('settingsLeftMenuUL',pageSettingVal);
Start.hidePageSettingGrids();
$D('PageSettingLoading');
if($('PageSettingGrid'))$('PageSettingGrid').style.padding="10px";
$('PageSettingLoading').innerHTML="<div class='downloadInProgress' valign='middle' style='height:144px' >&nbsp;</div>";
if(pageSettingVal==0||pageSettingVal==1||pageSettingVal==2)
{
AddContentWS.GetPageSettingsGrid(pageSettingVal,domainID,languageID,VERSION_SUFFIX,function(result)
{
$ND('PageSettingLoading');
if(pageSettingVal==0)
{
$('PageSettingGridTopFlake').innerHTML="";
$('PageSettingGridTopFlake').innerHTML=result;
$D('PageSettingGridTopFlake');
$('PageSettingGrid').style.padding="0";}
else if(pageSettingVal==1)
{
$('PageSettingGridBrowseFlake').innerHTML="";
$('PageSettingGridBrowseFlake').innerHTML=result;
$D('PageSettingGridBrowseFlake');
$('PageSettingGrid').style.padding="0px";
if(Browser.isIE6)
{
$('SettingsGridTable').style.height='215px';
$('OnsiteFlakeCategoryList').style.height='215px';}
$('OnsiteFlakeCategoryList').style.height=$('SettingsGridTable').offsetHeight+'px';}
else if(pageSettingVal==2)
{
$('PageSettingGridCommunityPage').innerHTML="";
$('PageSettingGridCommunityPage').innerHTML=result;
$D('PageSettingGridCommunityPage');}
Start.isLocked=false;});}
else if(pageSettingVal==3)
{
$('PageSettingGrid').style.padding='0';
Start.loadPublish();
Start.isLocked=false;}
else if(pageSettingVal==4)
{
$('PageSettingGrid').style.padding='0';
Start.loadTheme();}
else if(pageSettingVal==5)
{
$('PageSettingGrid').style.padding='0';
Start.loadPageLayout();
Start.isLocked=false;}
else if(pageSettingVal==6)
{
_profilePublicIsLoaded=false;
_profileBasicIsLoaded=false;
_profileInterestIsLoaded=false;
Start.Profile.load();
$('PageSettingGrid').style.padding='0';
$ND('PageSettingLoading');
$D('PageSettingGridMyProfile');
Start.isLocked=false;
$track('/StartMenu/Profile');}
else if(pageSettingVal==7)
{
$('PageSettingGrid').style.padding='0';
$ND('PageSettingLoading');
$D('PageSettingsGridAddFeedBody');
Start.loadOnsiteItemGalleryForRSS();
Start.isLocked=false;}},
loadPublish:function()
{
Settings.initSharing();
$ND('PageSettingLoading');
$D('PageSettingGridSharePage');
if(!App.currentPage.IsOwner&&!App.currentPage.CanEditPage)
{
$D('SharingOptionsDisabled');
$ND('SharingOptions');}
else
{
$ND('SharingOptionsDisabled');
$D('SharingOptions');}
$track('/StartMenu/Show');},
loadTheme:function()
{
Start.Theme.load(function()
{
$ND('PageSettingLoading');
$D('PageSettingGridChangeTheme');
Start.isLocked=false;
if(!App.currentPage.IsOwner&&!App.currentPage.CanEditPage)
{
$ND('ThemeArea');
$D('ThemeAreaDisabled');}
else
{
$D('ThemeArea');
$ND('ThemeAreaDisabled');}
$track('/StartMenu/Theme/Show');});},
loadPageLayout:function()
{
$ND('PageSettingLoading');
$D('PageSettingGridChangeLayout');
Settings.initLayout();
if(!App.currentPage.IsOwner&&!App.currentPage.CanEditPage)
{
$D('PageSettingsBodyDisabled');
$ND('PageSettingsBody');}
else
{
$ND('PageSettingsBodyDisabled');
$D('PageSettingsBody');}
$track('/StartMenu/PageLayout');},
toggleStart:function()
{
Start.showPageSettings();
$ND("StartAnimation");}};
Start.isLocked=false;
Start.ProfileDIV=
{
PROFILE_AREA:"PageSettingsProfileArea",
PROFILE_AREA_DISABLED:"PageSettingsProfileAreaDisabled",
PROFILE_BASIC:"PageSettings_Profile_Basic",
PROFILE_PUBLIC:"PageSettings_Profile_Public",
PROFILE_INTEREST:"PageSettings_Profile_Interest",
PROFILE_ACCOUNT:"PageSettings_Profile_Account"};
Start.ProfileGeo=null;
Start.ProfileGeo2=null;
Start.Location='';
Start.SiteUrl='';
Start.Profile={
load:function()
{
$D(Start.ProfileDIV.PROFILE_AREA_DISABLED);
$ND(Start.ProfileDIV.PROFILE_AREA);
if(!App.IsAnonymous)
{
$ND(Start.ProfileDIV.PROFILE_AREA_DISABLED);
$D(Start.ProfileDIV.PROFILE_AREA);
$select($('profileListPublic'),'themeactivetab','LI')
Start.Profile.setProfileTab(Start.ProfileDIV.PROFILE_PUBLIC);
Start.Location=App.getLocationVariable();}},
checkShowInPublicProfile:function()
{
if($('PageSettings_Profile_Public_chkShowInPublicDirectory').checked)
{
this.showUrls();}
else
{
$('ProfileAddressLinkDiv').innerHTML='';}
this.enableControls();},
enableControls:function()
{
this.enablePublicProfileControls();
this.enableShowInCheckboxes();},
enablePublicProfileControls:function()
{
var disabled=!($('PageSettings_Profile_Public_chkShowInPublicDirectory').checked);
$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkWelcomesMessages").disabled=disabled;},
enableShowInCheckboxes:function()
{
var disabled=!($('PageSettings_Profile_Public_chkShowInPublicDirectory').checked);
$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkWelcomesMessages").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkFirstName").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLastName").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkGender").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkDateOfBirth").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLocation").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkHometown").disabled=disabled;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkInterest").disabled=disabled;},
toggleProfileUrl:function()
{
if($('PageSettings_Profile_Public_chkShowInPublicDirectory').checked)
{
this.showUrls();}
else
{
$('ProfileAddressLinkDiv').innerHTML='';}},
setProfileTab:function(tabId)
{
this.clearAllSaveMessages();
$ND(Start.ProfileDIV.PROFILE_BASIC,Start.ProfileDIV.PROFILE_PUBLIC,Start.ProfileDIV.PROFILE_INTEREST);
Start.Profile.initTab(tabId);
$D(tabId);},
refreshProfilePhoto:function(imageHandlerPath,storageIDKey,ecoStorageId,size)
{
$D("PhotoCommandDiv");
$ND("PhotoUploadDiv");
$visible("DeletePhotoLink")
_imageHandlerPath=imageHandlerPath;
_storageIDKey=storageIDKey;
_ecoStorageId=ecoStorageId;
_size=size;
Start.Profile.displayProfilePhoto(imageHandlerPath,storageIDKey,ecoStorageId,size);},
displayProfilePhoto:function(imageHandlerPath,storageIDKey,ecoStorageId,size,sex)
{
var src="";
if(ecoStorageId.length>0&&
ecoStorageId!="0")
{
src=imageHandlerPath+"?"+storageIDKey+"="+ecoStorageId+"&width="+size+"&height="+size+"&rnd="+Math.random()*5;}
else
{
src=IMAGE_PREFIX+"images/MaleLarge.gif";
if(sex!=null)
{
if(sex=="1")
src=IMAGE_PREFIX+"images/MaleLarge.gif";
else if(sex=="2")
src=IMAGE_PREFIX+"images/FemaleLarge.gif";
else
src=IMAGE_PREFIX+"images/MaleLarge.gif";}
$hide("DeletePhotoLink");}
var profileImage=$("PageSettings_Profile_Public_imgProfile");
profileImage.src=src;},
getDefaultPhoto:function()
{
var src=IMAGE_PREFIX+"images/MaleLarge.gif";
if(_sex!=null)
{
if(_sex=="1")
src=IMAGE_PREFIX+"images/MaleLarge.gif";
else if(_sex=="2")
src=IMAGE_PREFIX+"images/FemaleLarge.gif";
else
src=IMAGE_PREFIX+"images/MaleLarge.gif";}
return src;},
deletePhoto:function(siteUrl)
{
_ecoStorageId="";
CoreServices.DeleteProfilePhoto(
function(result)
{
if(result)
{
$hide("DeletePhotoLink");
var src=Start.Profile.getDefaultPhoto();
var profileImage=$("PageSettings_Profile_Public_imgProfile");
profileImage.src=src;}});},
showUrls:function()
{
if(_urlPrefix==null||
_urlPrefix.length==0||
_hasPagecasts==null)
{
CoreServices.GetPublicUrlInfo
(
function(resultArray)
{
var ExternalSitePrefix=0;
var HasPagecasts=1;
var externalSitePrefix=resultArray[ExternalSitePrefix];
var hasPagecasts=resultArray[HasPagecasts];
Start.Profile.doShowUrls(externalSitePrefix,hasPagecasts);});}
else
{
Start.Profile.doShowUrls(_urlPrefix,_hasPagecasts,uniqueName);}},
doShowUrls:function(siteUrl,hasPagecasts)
{
var usernameTextBox=$("PageSettings_Profile_Public_txtUsername");
uniqueName=usernameTextBox.value;
showInPublicDirectory=$('PageSettings_Profile_Public_chkShowInPublicDirectory').checked
var pageCastUrl=siteUrl+uniqueName;
var profileUrl=pageCastUrl+"/p";
if(!showInPublicDirectory)
{
profileUrl="";}
if(typeof hasPagecasts=="undefined"||
hasPagecasts!="true")
{
hasPagecasts="false";}
if(hasPagecasts!="true")
{
pageCastUrl="";}
this.setUrlValues(profileUrl,pageCastUrl);},
setUrlValues:function(profileUrl,pageCastUrl)
{
var profileAddressLinkDiv=$("ProfileAddressLinkDiv");
if(profileAddressLinkDiv!=null)
{
if($trim(profileUrl).length>0)
{
profileAddressLinkDiv.innerHTML=this.createHyperLink(profileUrl,profileUrl);}
else
{
profileAddressLinkDiv.innerHTML="";}}
var pagecastLinkDiv=$("PagecastLinkDiv");
if(pagecastLinkDiv!=null)
{
if($trim(pageCastUrl).length>0)
{
pagecastLinkDiv.innerHTML=this.createHyperLink(pageCastUrl,pageCastUrl);}
else
{
pagecastLinkDiv.innerHTML="";}}},
createHyperLink:function(url,text)
{
var link='<a href="'+url+'">'+text+'</a>';
return link;},
showUploadPhoto:function()
{
$ND("PhotoCommandDiv");
$D("PhotoUploadDiv");},
cancelUploadPhoto:function()
{
$ND("PhotoUploadDiv");
$D("PhotoCommandDiv");},
typeUsername:function()
{
this.validateUsername(false,
function(errorMessage)
{
if(errorMessage.length>0)
{
Start.Profile.setUsernameMessage(errorMessage);
Start.Profile.setUrlValues("","");}
else
{
Start.Profile.setUsernameMessage("");
Start.Profile.showUrls();}});
usernameTextBox=null;},
savePublicProfile:function(originatingTabId)
{
this.clearSaveMessage(Start.ProfileDIV.PROFILE_PUBLIC);
Start.Profile.setUsernameMessage("");
this.validateUsername(true,
function(errorMessage)
{
if(errorMessage.length>0)
{
Start.Profile.setUsernameMessage(errorMessage);}
else
{
Start.Profile.doSavePublicProfile(originatingTabId);}});},
validateUsername:function(validateUniqueName,resultCallback)
{
var errorMessage="";
var usernameTextBox=$(Start.ProfileDIV.PROFILE_PUBLIC+"_txtUsername");
var username=$trim(usernameTextBox.value);
if(username.length==0)
{
errorMessage="Username cannot be blank."}
if(errorMessage.length==0)
{
if(username.substring(0,1)=="."||
username.substring(0,1)=="_")
{
errorMessage="Must start with an alpha or number";}}
if(errorMessage.length==0)
{
if(username.substring(username.length-1,username.length)=="."||
username.substring(username.length-1,username.length)=="_")
{
errorMessage="Must end with an alpha or number";}}
if(errorMessage.length==0)
{
var usernameRegExFilter=new RegExp("([^a-zA-Z0-9._])");
var results=username.match(usernameRegExFilter);
if(results!=null)
{
errorMessage="There are invalid characters in the username.";}}
if(errorMessage.length==0)
{
var extCount=0;
for(var i=0;i<username.length;i++)
{
var curChar=username.substring(i,i+1);
if(curChar=="."||curChar=="_")
{
extCount++;}}
if(extCount>1)
{
errorMessage="Only 1 '.' or '_' is allowed.";}}
if(errorMessage.length>0)
{
if(typeof resultCallback=="function")
{
resultCallback(errorMessage);}}
else
{
if(validateUniqueName)
{
CoreServices.ValidateUniqename(username,
function(available)
{
if(!available)
{
resultCallback("Username is already taken.");}
else
{
resultCallback("");}});}
else
{
resultCallback("");}}
usernameTextBox=null;},
setUsernameMessage:function(message)
{
var usernameMessageTD=document.getElementById("UsernameMessageTD");
if(usernameMessageTD!=null)
{
usernameMessageTD.innerHTML=message;}},
doSavePublicProfile:function(originatingTabId)
{
_showInPublicDirectory=$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkShowInPublicDirectory").checked;
_uniqueName=$trim($(Start.ProfileDIV.PROFILE_PUBLIC+"_txtUsername").value);
_aboutMe=$trim($(Start.ProfileDIV.PROFILE_PUBLIC+"_txtAboutMe").value);
_welcomesMessages=$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkWelcomesMessages").checked;
var profileDataArray=new Array();
profileDataArray[PROFILE_PUBLIC_ShowInPublicDirectory]=_showInPublicDirectory?"1":"0";
profileDataArray[PROFILE_PUBLIC_UniqueName]=_uniqueName;
profileDataArray[PROFILE_PUBLIC_AboutMe]=_aboutMe;
profileDataArray[PROFILE_PUBLIC_WelcomesMessages]=_welcomesMessages?"1":"0";
CoreServices.SavePublicProfile(profileDataArray,
function(result)
{
if(!result)
{
Start.Profile.showError(tabId,'Sorry! there was a problem saving your information');}
else
{
App.UserUniqueName=profileDataArray[PROFILE_PUBLIC_UniqueName];
App.My.Profile["UserNameChanged"]="1";
App.saveUserInfo();
Start.Profile.showSaveMessage(originatingTabId);
Start.Profile.showUrls();
var _homeProfileLink=$('homeProfileLink');
if(_showInPublicDirectory)
{
_homeProfileLink.href=SITE_PREFIX+App.UserUniqueName+"/p";}
else
{
_homeProfileLink.href=SITE_PREFIX;}}});},
showSaveMessage:function(tabId)
{
var isPublicProfile=$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkShowInPublicDirectory").checked?true:false;
if(isPublicProfile)
{
$visible($(PUBLIC_PROFILE_LINK));}
else
{
$hide($(PUBLIC_PROFILE_LINK))}
$("settingMessage").style.display="block";
$ND($("errorMsgPublic"));
$ND($("errorMsgBasic"));
$ND($("errorMsgInterest"));
if(tabId==Start.ProfileDIV.PROFILE_PUBLIC)
$D($("errorMsgPublic"));
else if(tabId==Start.ProfileDIV.PROFILE_BASIC)
$D($("errorMsgBasic"));
else if(tabId==Start.ProfileDIV.PROFILE_INTEREST)
$D($("errorMsgBasic"));},
clearSaveMessage:function(tabId)
{
$("settingMessage").style.display="none";},
clearAllSaveMessages:function()
{
this.clearSaveMessage(Start.ProfileDIV.PROFILE_BASIC);
this.clearSaveMessage(Start.ProfileDIV.PROFILE_PUBLIC);
this.clearSaveMessage(Start.ProfileDIV.PROFILE_INTEREST);},
cancelMyProfile:function(originatingtabId)
{
Start.hidePageSettings();
switch(originatingtabId)
{
case Start.ProfileDIV.PROFILE_PUBLIC:
this.initTabsFromMemberVars(originatingtabId);
this.setUsernameMessage('');
this.cancelUploadPhoto();
break;
case Start.ProfileDIV.PROFILE_BASIC:
_profileBasicIsLoaded=false;
this.initTab(originatingtabId);
break;
case Start.ProfileDIV.PROFILE_INTEREST:
_profileInterestIsLoaded=false;
this.initTab(originatingtabId);
break;}},
saveMyProfile:function(originatingtabId)
{
if(_profilePublicIsLoaded&&originatingtabId==Start.ProfileDIV.PROFILE_PUBLIC)
{
this.savePublicProfile(originatingtabId);}
else if(_profileBasicIsLoaded&&originatingtabId==Start.ProfileDIV.PROFILE_BASIC)
{
this.saveTab(Start.ProfileDIV.PROFILE_BASIC,originatingtabId);}
else if(_profileInterestIsLoaded&&originatingtabId==Start.ProfileDIV.PROFILE_INTEREST)
{
this.saveTab(Start.ProfileDIV.PROFILE_INTEREST);}
$track('/StartMenu/Profile/Save');},
saveTab:function(tabId,originatingTabId)
{
if(!App.IsAnonymous)
{
var hasError=false;
var changePassword=false;
var changeProfile=false;
Start.Profile.clearError(tabId);
var isLocChanged=false;
var isTimeChanged=false;
if(tabId==Start.ProfileDIV.PROFILE_BASIC)
{
Start.Profile.clearAllSaveMessages();
Start.Profile.clearError(tabId);
_firstName=$trim($(Start.ProfileDIV.PROFILE_BASIC+'_txtFirstName').value);
_lastName=$trim($(Start.ProfileDIV.PROFILE_BASIC+'_txtLastName').value);
if(_firstName=='')
{
$(Start.ProfileDIV.PROFILE_BASIC+'_errFirstName').style.display='';
Start.Profile.showError(tabId,'Please provide your first name');
return;}
else if(_lastName=='')
{
$(Start.ProfileDIV.PROFILE_BASIC+'_errLastName').style.display='';
Start.Profile.showError(tabId,'Please provide your last name');
return;}
if($isVisible(Start.ProfileDIV.PROFILE_BASIC+"_frmPassword"))
{
var oldPass=$trim($(Start.ProfileDIV.PROFILE_BASIC+'_txtPassword').value);
var newPass=$trim($(Start.ProfileDIV.PROFILE_BASIC+'_txtNewPassword').value);
var confPass=$trim($(Start.ProfileDIV.PROFILE_BASIC+'_txtConfirmPassword').value);
if(oldPass!="")
{
if(newPass!=confPass)
{
Start.Profile.clearAllSaveMessages();
Start.Profile.showError(tabId,'New Password and confirmation does not match');
$(Start.ProfileDIV.PROFILE_BASIC+'_errNewPassword').style.display='';
$D(Start.ProfileDIV.PROFILE_BASIC+'_errConfirmPassword');
return;}
else
changePassword=true;}
else
{
$(Start.ProfileDIV.PROFILE_BASIC+'_errPassword').style.display='';
Start.Profile.clearAllSaveMessages();
Start.Profile.showError(tabId,'Please enter password');
return;}}
if(null!=Start.ProfileGeo)
{
Start.Profile.geoLocated();
if(App.My.Country!=Start.ProfileGeo.Country||App.My.State!=Start.ProfileGeo.State||
App.My.City!=Start.ProfileGeo.City||App.My.ZipCode!=Start.ProfileGeo.ZipCode)
isLocChanged=true;
App.My.Country=Start.ProfileGeo.Country;
App.My.State=Start.ProfileGeo.State;
App.My.City=Start.ProfileGeo.City;
App.My.ZipCode=Start.ProfileGeo.ZipCode;}
changeProfile=true;
App.My.FirstName=_firstName;
App.My.LastName=_lastName;
var interestArray=$(Start.ProfileDIV.PROFILE_BASIC+'_txtInterest').value.split(',');
App.My.Interests=interestArray;
_dobMonth=$(Start.ProfileDIV.PROFILE_BASIC+"_drpMonth").value;
_dobDay=$(Start.ProfileDIV.PROFILE_BASIC+"_drpDay").value;
_dobYear=$(Start.ProfileDIV.PROFILE_BASIC+"_drpYear").value;
_dobGender=$(Start.ProfileDIV.PROFILE_BASIC+"_drpGender").value;
_sex=_dobGender;
_hometown=$(Start.ProfileDIV.PROFILE_BASIC+"_txtHometown").value;
_showFirstName=$(Start.ProfileDIV.PROFILE_BASIC+"_chkFirstName").checked;
_showLastName=$(Start.ProfileDIV.PROFILE_BASIC+"_chkLastName").checked;
_showGender=$(Start.ProfileDIV.PROFILE_BASIC+"_chkGender").checked;
_showDob=$(Start.ProfileDIV.PROFILE_BASIC+"_chkDateOfBirth").checked;
_showLocation=$(Start.ProfileDIV.PROFILE_BASIC+"_chkLocation").checked;
_showHometown=$(Start.ProfileDIV.PROFILE_BASIC+"_chkHometown").checked;
_showInterests=$(Start.ProfileDIV.PROFILE_BASIC+"_chkInterest").checked;
var uprofile=new Array();
uprofile[0]=_dobMonth;
uprofile[1]=_dobDay;
uprofile[2]=_dobYear;
uprofile[3]=_dobGender;
uprofile[4]=_hometown;
uprofile[4]=uprofile[4].replace(/\|/g,"");
uprofile[5]=_showFirstName?"1":"0";
uprofile[6]=_showLastName?"1":"0";
uprofile[7]=_showGender?"1":"0";
uprofile[8]=_showDob?"1":"0";
uprofile[9]=_showLocation?"1":"0";
uprofile[10]=_showHometown?"1":"0";
uprofile[11]=_showInterests?"1":"0";
var uprofileStr=uprofile[0]+"|"+uprofile[1]+"|"+uprofile[2]+"|"+uprofile[3]+"|"+uprofile[4]+"|"+uprofile[5]+"|"+
uprofile[6]+"|"+uprofile[7]+"|"+uprofile[8]+"|"+uprofile[9]+"|"+uprofile[10]+"|"+uprofile[11];}
else if(tabId==Start.ProfileDIV.PROFILE_INTEREST)
{
if($(Start.ProfileDIV.PROFILE_BASIC+'_chkNewsletter').checked)
App.IsSubscribedForNewsletter=true;
else
App.IsSubscribedForNewsletter=false;
if($(Start.ProfileDIV.PROFILE_BASIC+'_chkSearch').checked)
{
App.ShowSearchBar=true;
SearchForm.open();}
else
{
App.ShowSearchBar=false;
SearchForm.close(true);}}
App.saveUserInfo(
function(result)
{
if(tabId==Start.ProfileDIV.PROFILE_BASIC)
{
CoreServices.SaveUserProfile(uprofileStr,
function(result)
{
App.UserFullName=App.My.FirstName+" "+App.My.LastName;
App.UserFullName=$trim(App.UserFullName);
var _UserFullLI=$('UserFullName');
_UserFullLI.innerHTML="";
var _homeProfileLink=$$('a');
_homeProfileLink.setAttribute("id","homeProfileLink");
if(_showInPublicDirectory)
{
_homeProfileLink.href=SITE_PREFIX+App.UserUniqueName+"/p";}
else
{
_homeProfileLink.href=SITE_PREFIX;}
_UserFullLI.appendChild(_homeProfileLink);
T('homeProfileLink',App.My.FirstName.substring(0,Math.min(15,App.UserFullName.length)));
if(isTimeChanged)
{
App.changeGlobalTimezone(App.My.Timezone);}
if(isLocChanged)
{
App.changeGlobalLocation(App.My.City,App.My.State,App.My.ZipCode,App.My.Country,false);}
if(changePassword)
{
App.changePassword(oldPass,newPass,
function(errorMsg)
{
if(errorMsg.length!=0)
{
Start.Profile.showError(tabId,errorMsg);
$(Start.ProfileDIV.PROFILE_BASIC+'_errPassword').style.display='';
$(Start.ProfileDIV.PROFILE_BASIC+'_errNewPassword').style.display='';
$(Start.ProfileDIV.PROFILE_BASIC+'_errConfirmPassword').style.display='';
return;}
else
{
Start.Profile.togglePasswordForm();
Start.Profile.showSaveMessage(originatingTabId);}},
function(msg)
{
Start.Profile.showError(tabId,msg);
return;});}
else
{
Start.Profile.showSaveMessage(originatingTabId);}
Settings.hideUserNameInPublishSettingsIfRequired();},
function(result)
{
Start.Profile.showError(tabId,'Sorry! there was a problem saving your information');});}
else
{
Start.Profile.showSaveMessage(Start.ProfileDIV.PROFILE_INTEREST);}},
function(msg){
Start.Profile.showError(tabId,'Sorry! there was a problem saving your information');});}
else
{
Start.Profile.showError(tabId,'sorry, you have to register or login first');}},
showError:function(tabId,message)
{
if(null!=$(tabId+'_lblMessage'))
T($(tabId+'_lblMessage'),message);
return;},
clearError:function(tabId)
{
if(tabId==Start.ProfileDIV.PROFILE_BASIC)
{
$ND(Start.ProfileDIV.PROFILE_BASIC+'_errFirstName');
$ND(Start.ProfileDIV.PROFILE_BASIC+'_errLastName');
$ND(Start.ProfileDIV.PROFILE_BASIC+'_errPassword');
$ND(Start.ProfileDIV.PROFILE_BASIC+'_errNewPassword');
$ND(Start.ProfileDIV.PROFILE_BASIC+'_errConfirmPassword');}
if(null!=$(tabId+'_lblMessage'))
T($(tabId+'_lblMessage'),' ');},
geoLocated:function()
{
if(null!=Start.ProfileGeo)
{
Start.ProfileGeo.forceEnter();
var match=Start.ProfileGeo.textBox.value;
if(match.length>0)
{
Start.ProfileGeo.parseLocation();}}},
togglePasswordForm:function()
{
var frm=$(Start.ProfileDIV.PROFILE_BASIC+'_frmPassword');
if($isVisible(frm))
{
$ND(frm);
T($(Start.ProfileDIV.PROFILE_BASIC+'_lnkPassword'),'Change Password');}
else
{
$D(frm);
T($(Start.ProfileDIV.PROFILE_BASIC+'_lnkPassword'),'Hide');}},
initTabsFromMemberVars:function(tabId)
{
if(tabId==Start.ProfileDIV.PROFILE_PUBLIC)
{
if(_showInPublicDirectory=="true")
{
$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkShowInPublicDirectory").checked=true;}
else
{
$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkShowInPublicDirectory").checked=false;}
if(_uniqueName.length>0)
{
var uniqueNameTextBox=$(Start.ProfileDIV.PROFILE_PUBLIC+"_txtUsername");
uniqueNameTextBox.value=_uniqueName;}
var aboutMeTextBox=$(Start.ProfileDIV.PROFILE_PUBLIC+"_txtAboutMe");
aboutMeTextBox.value=_aboutMe;
if(_welcomesMessages=="true")
{
$(Start.ProfileDIV.PROFILE_PUBLIC+"_chkWelcomesMessages").checked=true;}
Start.Profile.displayProfilePhoto(_imageHandlerPath,_storageIDKey,_ecoStorageId,_size,_sex);
Start.Profile.doShowUrls(_urlPrefix,_hasPagecasts);}},
initTab:function(tabId)
{
Start.Profile.clearError(tabId);
if(tabId==Start.ProfileDIV.PROFILE_PUBLIC)
{
if(_profilePublicIsLoaded)
{
Start.Profile.displayProfilePhoto(_imageHandlerPath,_storageIDKey,_ecoStorageId,_size,_sex);
return;}
if(!App.IsAnonymous)
{
CoreServices.GetPublicProfile(function(profileDataArray)
{
_profilePublicIsLoaded=true;
if(profileDataArray.length==11)
{
_showInPublicDirectory=profileDataArray[PROFILE_PUBLIC_ShowInPublicDirectory].toLowerCase();
_uniqueName=profileDataArray[PROFILE_PUBLIC_UniqueName];
_ecoStorageId=profileDataArray[PROFILE_PUBLIC_EcoStorageId];
_aboutMe=profileDataArray[PROFILE_PUBLIC_AboutMe];
_welcomesMessages=profileDataArray[PROFILE_PUBLIC_WelcomesMessages].toLowerCase();
_sex=profileDataArray[PROFILE_PUBLIC_Sex].toString();
_urlPrefix=profileDataArray[PROFILE_PUBLIC_UrlPrefix];
Start.SiteUrl=_urlPrefix;
_imageHandlerPath=profileDataArray[PROFILE_PUBLIC_ImageHandlerPath];
_storageIDKey=profileDataArray[PROFILE_PUBLIC_StorageIdKey];
_size=profileDataArray[PROFILE_PUBLIC_Size];
_hasPagecasts=profileDataArray[PROFILE_PUBLIC_HasPagecasts];
Start.Profile.initTabsFromMemberVars(tabId);
Start.Profile.enablePublicProfileControls();}});}}
else if(tabId==Start.ProfileDIV.PROFILE_BASIC)
{
_location=App.getLocationVariable();
_firstName=App.My.FirstName;
_lastName=App.My.LastName;
if(null==Start.ProfileGeo)
Start.ProfileGeo=new GeoLocation($(Start.ProfileDIV.PROFILE_BASIC+'_txtLocation'),false,RenderMode.TABULAR,Start.Profile.geoLocated);
if(null==Start.ProfileGeo2)
Start.ProfileGeo2=new GeoLocation($(Start.ProfileDIV.PROFILE_BASIC+'_txtHometown'),false,RenderMode.TABULAR,Start.Profile.geoLocated);
if(_profileBasicIsLoaded)
{
return;}
$(Start.ProfileDIV.PROFILE_BASIC+'_txtFirstName').value=(_firstName==null?'a':_firstName);
$(Start.ProfileDIV.PROFILE_BASIC+'_txtLastName').value=_lastName;
$(Start.ProfileDIV.PROFILE_BASIC+'_txtLocation').value=_location;
$(Start.ProfileDIV.PROFILE_BASIC+'_txtFirstName').select();
if(!App.IsAnonymous)
{
CoreServices.GetUserEmail(function(result)
{
_email=result;
T($(Start.ProfileDIV.PROFILE_BASIC+'_lblEmail'),result);});
$(Start.ProfileDIV.PROFILE_BASIC+'_txtPassword').value='';
$(Start.ProfileDIV.PROFILE_BASIC+'_txtNewPassword').value='';
$(Start.ProfileDIV.PROFILE_BASIC+'_txtConfirmPassword').value='';
_interests='';
for(var i=0;i<App.My.Interests.length;i++)
{
_interests+=App.My.Interests[i].toString();
if(i!=(App.My.Interests.length-1))
_interests+=",";}
$(Start.ProfileDIV.PROFILE_BASIC+'_txtInterest').value=_interests;
$(Start.ProfileDIV.PROFILE_BASIC+'_txtInterest').select();
_appBasicIsLoaded=true;}
CoreServices.GetUserProfile(
function(uprofileStr)
{
var uprofile=uprofileStr.split('|');
if(uprofile.length==12)
{
_dobDay=uprofile[1];
_dobMonth=uprofile[0];
_dobYear=uprofile[2];
_dobGender=uprofile[3];
_hometown=uprofile[4];
_showFirstName=uprofile[5];
_showLastName=uprofile[6];
_showGender=uprofile[7];
_showDob=uprofile[8];
_showLocation=uprofile[9];
_showHometown=uprofile[10];
_showInterests=uprofile[11];
if(!(_dobDay=="1"&&_dobMonth=="1"&&_dobYear=="1900"))
{
$(Start.ProfileDIV.PROFILE_BASIC+"_drpDay").value=_dobDay;
$(Start.ProfileDIV.PROFILE_BASIC+"_drpMonth").value=_dobMonth;
$(Start.ProfileDIV.PROFILE_BASIC+"_drpYear").value=_dobYear;}
$(Start.ProfileDIV.PROFILE_BASIC+"_drpGender").value=_dobGender;
$(Start.ProfileDIV.PROFILE_BASIC+"_txtHometown").value=_hometown;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkFirstName").checked=_showFirstName=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLastName").checked=_showLastName=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkGender").checked=_showGender=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkDateOfBirth").checked=_showDob=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLocation").checked=_showLocation=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkHometown").checked=_showHometown=="True"?true:false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkInterest").checked=_showInterests=="True"?true:false;
Start.Profile.enableShowInCheckboxes();}
else
{
$(Start.ProfileDIV.PROFILE_BASIC+"_drpDay").value=$(Start.ProfileDIV.PROFILE_BASIC+"_drpDay").options[0].value;
$(Start.ProfileDIV.PROFILE_BASIC+"_drpMonth").value=$(Start.ProfileDIV.PROFILE_BASIC+"_drpMonth").options[0].value;
$(Start.ProfileDIV.PROFILE_BASIC+"_drpYear").value=$(Start.ProfileDIV.PROFILE_BASIC+"_drpYear").options[0].value;
$(Start.ProfileDIV.PROFILE_BASIC+"_drpGender").value=$(Start.ProfileDIV.PROFILE_BASIC+"_drpGender").options[0].value;
$(Start.ProfileDIV.PROFILE_BASIC+"_txtHometown").value="";
$(Start.ProfileDIV.PROFILE_BASIC+"_chkFirstName").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLastName").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkGender").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkDateOfBirth").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkLocation").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkHometown").checked=false;
$(Start.ProfileDIV.PROFILE_BASIC+"_chkInterest").checked=false;}});
_profileBasicIsLoaded=true;}
else if(tabId==Start.ProfileDIV.PROFILE_INTEREST)
{
Settings.setEmailVerificationOption();
if(_profileInterestIsLoaded)
return;
if(App.IsSubscribedForNewsletter)
$(Start.ProfileDIV.PROFILE_BASIC+'_chkNewsletter').checked=true;
else
$(Start.ProfileDIV.PROFILE_BASIC+'_chkNewsletter').checked=false;
if(App.ShowSearchBar)
$(Start.ProfileDIV.PROFILE_BASIC+'_chkSearch').checked=true;
else
$(Start.ProfileDIV.PROFILE_BASIC+'_chkSearch').checked=false;
_profileInterestIsLoaded=true;}}}
Start.Theme={
themes:[],
currentTheme:null,
savedTheme:null,
selectedIndex:0,
customTheme:[],
THEME_INTRO:"/* For example */ .menu a {{ color:white }}\n",
newThemeMode:true,
lastThemeIndex:0,
originalTheme:null,
uiLoaded:false,
createThemeUiLoaded:false,
createThemeHtml:null,
dispose:function()
{
var ul=$('Start_Themes_UL');
if(null!=ul)$removeAll(ul);
if(Start.Theme.createThemeUiLoaded)$removeAll('PageSettings_CreateNewTheme');},
load:function(callback)
{
if(!Start.Theme.uiLoaded)
{
var content=$('ThemeHtml').value;
Start.Theme.createThemeHtml=$('CreateThemeHtml').value;
$('ThemeArea').innerHTML=content;
Start.Theme.uiLoaded=true;
$DC(function(){Start.Theme.loadUI(callback);});}
else
{
Start.Theme.loadUI(callback);}},
loadUI:function(callback)
{
$ND('PageSettings_CreateNewTheme');
$D('PageSettings_SelectTheme');
if(Browser.isIE6)
{
$('PageSettings_SelectTheme_Div').style.width=($('PageSettingGrid').offsetWidth-28)+"px";}
Start.Theme.savedTheme=null;
Start.Theme.currentTheme=null;
Start.Theme.originalTheme=new $cloneObject(App.currentPage.pageTheme);
App.Server.GetThemesOfUser(function(themes)
{
Start.Theme.themes=themes;
Start.Theme.renderThemeList();
if(typeof callback=="function")callback();});},
cancelOut:function()
{
if(null!=Start.Theme.originalTheme)P.setTheme(Start.Theme.originalTheme);
Start.toggleStart();},
renderThemeList:function()
{
$ND('PageSettings_CreateNewTheme');
$D('PageSettings_SelectTheme');
var ul=$('Start_Themes_UL');
$removeAll(ul);
var div=$$('div','CreateOwnTheme','CreateOwnTheme');
T(div,Lang.CREATE_NEW_THEME);
var li=$$('li','CreateOwnThemeLI','Start_Themes_LI');
li.onclick=Start.Theme.createNew;
li.appendChild(div);
ul.appendChild(li);
Start.Theme.themes.forEach(function(item,index){Start.Theme.createThemeItem(item,index);});
Start.Theme.select(Start.Theme.themes.findIndex(function(item){return item.ThemeShortcut==App.currentPage.pageTheme.ThemeShortcut}));},
createThemeItem:function(theme,i)
{
var ul=$('Start_Themes_UL');
var li=$$('li','ThemeItem_'+theme.ThemeShortcut,'Start_Themes_LI');
$addEvent(li,'click',Func('Start.Theme.select('+i+')'));
$addHover(li,'ThemeItemHover');
var div=$$('div','','ThemeItemDiv');
var shadowBlur=$$('div','','DRP_blur');
var shadowShd=$$('div','','DRP_shadow');
var imgDiv=$$('div','','ThemeItemImg');
var img=$$('img');
img.src=theme.PreviewHandlerUrl;
imgDiv.appendChild(img);
shadowShd.appendChild(imgDiv);
shadowBlur.appendChild(shadowShd);
div.appendChild(shadowBlur);
if(theme.IsCustomTheme)
{
var divMenu=$$('div','','ThemeItemMenu');
var aEdit=$$('a','','ThemeItemMenuEdit','edit');
aEdit.onclick=Func('Start.Theme.edit('+i+')');
var aDelete=$$('a','','ThemeItemMenuDelete','delete');
aDelete.onclick=Func('Start.Theme.remove('+i+')');
divMenu.appendChild(aEdit);
divMenu.appendChild(aDelete);
div.appendChild(divMenu);}
else
{
var divName=$$('div','','ThemeItemName');
T(divName,theme.ThemeName);
div.appendChild(divName);}
li.appendChild(div);
ul.insertBefore(li,ul.lastChild);},
cancel:function()
{
var newThemeIndex=Start.Theme.selectedIndex;
Start.Theme.revertPage();
if(Start.Theme.newThemeMode)
{
Start.Theme.remove(newThemeIndex);}
$ND('PageSettings_CreateNewTheme');
$D('PageSettings_SelectTheme');},
revertPage:function()
{
if(Start.Theme.savedTheme!=null)
{
if(Start.Theme.savedTheme.IsCustomTheme)
{
Start.Theme.changeTheme(Start.Theme.savedTheme.Properties);}
else
{
Start.Theme.select(Start.Theme.lastThemeIndex);}}},
select:function(themeIndex)
{
if(themeIndex<0)return;
var oldTheme=Start.Theme.themes[Start.Theme.selectedIndex];
var newTheme=Start.Theme.themes[themeIndex];
var liID='ThemeItem_'+newTheme.ThemeShortcut;
$selectChild($('Start_Themes_UL'),'LI','Selected',function(item){return item.id==liID;});
Start.Theme.selectedIndex=themeIndex;
P.setTheme(newTheme);
App.currentPage.pageTheme=newTheme;
App.currentPage.save();
Start.Theme.currentTheme=newTheme;},
saveState:function()
{
Start.Theme.savedTheme=new $cloneObject(App.currentPage.pageTheme);
Start.Theme.lastThemeIndex=Start.Theme.themes.findIndex(function(item){return item.ThemeShortcut==Start.Theme.savedTheme.ThemeShortcut;});},
finish:function()
{
Start.hidePageSettings();},
edit:function(themeIndex)
{
if(!Start.Theme.createThemeUiLoaded)
{
$('PageSettings_CreateNewTheme').innerHTML=Start.Theme.createThemeHtml;
Start.Theme.createThemeUiLoaded=true;
if(Browser.isIE6)PU.blockUI("Loading...");}
$DC(function()
{
Start.Theme.saveState();
if(Start.Theme.selectedIndex!=themeIndex)Start.Theme.select(themeIndex);
Start.Theme.setNewThemeTab('PageSettings_NewTheme_Header');
$D('PageSettings_CreateNewTheme');
$ND('PageSettings_SelectTheme');
Start.Theme.populateHeaderTab(Start.Theme.currentTheme);
Start.Theme.populatePageTab(Start.Theme.currentTheme);
Start.Theme.populateTabsTab(Start.Theme.currentTheme);
Start.Theme.populateFlakeTab(Start.Theme.currentTheme);
Start.Theme.populateAdvancedTab(Start.Theme.currentTheme);
Start.Theme.newThemeMode=false;
Start.Theme.showHeaderTab();
if(Browser.isIE6)PU.unblockUI();});},
showHeaderTab:function()
{
$visible('Theme_HeaderIFRAME');
$hide('Theme_PageBackgroundIFRAME');
Start.Theme.setNewThemeTab('PageSettings_NewTheme_Header');
$select($('PageSettings_CreateNewTheme_Tabs_HeaderTab'),'themeactivetab','LI');},
showTabButtonTab:function()
{
Start.Theme.setNewThemeTab('PageSettings_NewTheme_TabButtons');
$select($('PageSettings_CreateNewTheme_Tabs_TabButtonTab'),'themeactivetab','LI');},
showPageTab:function()
{
$hide('Theme_HeaderIFRAME');
$visible('Theme_PageBackgroundIFRAME');
Start.Theme.setNewThemeTab('PageSettings_NewTheme_Page');
$select($('PageSettings_CreateNewTheme_Tabs_PageTab'),'themeactivetab','LI');},
showFlakesTab:function()
{
Start.Theme.setNewThemeTab('PageSettings_NewTheme_Flakes');
$select($('PageSettings_CreateNewTheme_Tabs_FlakeTab'),'themeactivetab','LI');},
showAdvancedTab:function()
{
Start.Theme.setNewThemeTab('PageSettings_NewTheme_Advanced');
$select($('PageSettings_CreateNewTheme_Tabs_AdvancedTab'),'themeactivetab','LI');},
showColorPicker:function(id,callback)
{
var item=$(id);
var pos=PU.getPosition(item);
if(null==Start.Theme._colorPicker)Start.Theme._colorPicker=new ThemeColorPicker();
if(Start.Theme._colorPicker.isVisible)
{
Start.Theme._colorPicker.hide();}
else
{
var currentColor=item.style.backgroundColor;
Start.Theme._colorPicker.initialize(currentColor,pos[0],pos[1]+pos[3],function(color)
{
var colorValue=(color=="transparent"?color:'#'+color);
item.style.backgroundColor=colorValue;
callback(colorValue);
Start.Theme._colorPicker.hide();});
$DC(function(){Start.Theme._colorPicker.show();});}},
setImageUploadIframe:function(iframe,imageId,callbackFunc,maxUpload,message,width,height)
{
window.setTimeout(function()
{
iframe.src=String.format('CustomTheme/ThemeImageUploader.aspx?Message={0}&Max={1}&eco_storageId={2}&Width={4}&Height={5}&Callback=window.parent.Start.Theme.{3}({{0}})',
message,maxUpload,imageId,callbackFunc,width,height);},1000);},
populateHeaderTab:function(theme)
{
$('PageSettings_NewTheme_Header_ColorPicker').style.backgroundColor=theme.Properties["headercolor"];
var customPicIframe=$('PageSettings_NewTheme_HeaderCustomPicIFRAME');
Start.Theme.setImageUploadIframe(customPicIframe,theme.Properties["headercustompic"],'setHeaderCustomPic',75*1024,'JPG, PNG or GIF, 75KB max\\rIdeal size: 1600 X 75px','230px','20px');
if(Browser.isIE6){$DC(function(){var iframe=$('Theme_HeaderIFRAME');iframe.src=iframe.src;});}
if(theme.Properties["headermode"]=="picture")$('PageSettings_NewTheme_Header_ImageRadio').checked=true;
else if(theme.Properties["headermode"]=="color")$('PageSettings_NewTheme_Header_ColorRadio').checked=true;
else if(theme.Properties["headermode"]=="custom")$('PageSettings_NewTheme_Header_UploadImageRadio').checked=true;
var logo=theme.Properties["logo"]||"Standard";
$('PageSettings_NewTheme_LogoRADIO_'+logo).checked=true;},
populateTabsTab:function(theme)
{
if(Browser.isIE6)
{
var ul=$('Pagesettins_NewTheme_TabButtons_Start');
var liList=ul.getElementsByTagName("LI");
for(var i=0;i<liList.length;i++)
{
var li=liList[i];
var img=li.firstChild.firstChild;
img.src=img.src;}}
$('PageSettings_NewTheme_TabButtons_ActiveTabColor').style.backgroundColor=theme.Properties["activetabcolor"];
$('PageSettings_NewTheme_TabButtons_InactiveTabColor').style.backgroundColor=theme.Properties["inactivetabcolor"];
$('PageSettings_NewTheme_TabButtons_ActiveTabTextColor').style.backgroundColor=theme.Properties["activetabtextcolor"];
$('PageSettings_NewTheme_TabButtons_InactiveTabTextColor').style.backgroundColor=theme.Properties["inactivetabtextcolor"];
$selectChild($('Pagesettins_NewTheme_TabButtons_Start'),'LI','Selected',function(item){return item.getAttribute("value")==theme.Properties["startbutton"];});},
populatePageTab:function(theme)
{
$('PageSettings_NewTheme_HeaderMenuColor1').style.backgroundColor=theme.Properties["headermenucolor1"];
$('PageSettings_NewTheme_HeaderMenuColor2').style.backgroundColor=theme.Properties["headermenucolor2"];
$('PageSettings_NewTheme_FooterBGColor').style.backgroundColor=theme.Properties["footerbgcolor"];
$('PageSettings_NewTheme_FooterBGColor2').style.backgroundColor=theme.Properties["footerbgcolor2"];
$('PageSettings_NewTheme_FooterTextColor').style.backgroundColor=theme.Properties["footertextcolor"];
$('PageSettings_NewTheme_Page_BgColor').style.backgroundColor=theme.Properties["pagecolor"];
var customPicIframe=$('PageSettings_NewTheme_PageCustomPicIFRAME');
Start.Theme.setImageUploadIframe(customPicIframe,theme.Properties["pagecustompic"],'setPageCustomPic',1024*1024,'JPG, PNG or GIF, 1MB max\\rIdeal size: 1600 x 3000px','230px','80px');
if(theme.Properties["pagemode"]=="picture")$('PageSettings_NewTheme_Page_ImageRADIO').checked=true;
else if(theme.Properties["pagemode"]=="color")$('PageSettings_NewTheme_Page_ColorRADIO').checked=true;
else if(theme.Properties["pagemode"]=="custom")$('PageSettings_NewTheme_Page_UploadRADIO').checked=true;
if(Browser.isIE6){$DC(function(){var iframe=$('Theme_PageBackgroundIFRAME');iframe.src=iframe.src;});}},
populateFlakeTab:function(theme)
{
$('PageSettings_NewTheme_Flakes_HeaderColor').style.backgroundColor=theme.Properties["flakeheadercolor"];
$('PageSettings_NewTheme_Flakes_TitleColor').style.backgroundColor=theme.Properties["flaketitlecolor"];
$('PageSettings_NewTheme_Flakes_BorderColor').style.backgroundColor=theme.Properties["flakebordercolor"];
$('PageSettings_NewTheme_Flakes_OuterBorderColor').style.backgroundColor=theme.Properties["flakeouterbordercolor"];},
populateAdvancedTab:function(theme)
{
$('PageSettings_NewTheme_Advanced_CustomCSS').value=theme.Properties["customcss"]||String.format(Start.Theme.THEME_INTRO,theme.ThemeShortcut);},
remove:function(themeIndex)
{
var theme=Start.Theme.themes[themeIndex];
App.Server.DeleteCustomTheme(theme.ThemeID);
if(Start.Theme.selectedIndex==themeIndex)
{
Start.Theme.select(0);}
$remove('ThemeItem_'+theme.ThemeShortcut);},
radioClick:function(property,modename,modevalue)
{
var value=Start.Theme.currentTheme.Properties[property];
if(value)
{
var properties={};
properties[property]=value;
if(modename)properties[modename]=modevalue;
Start.Theme.changeTheme(properties);}},
createNew:function()
{
if(!Start.Theme.createThemeUiLoaded)
{
$('PageSettings_CreateNewTheme').innerHTML=Start.Theme.createThemeHtml;
Start.Theme.createThemeUiLoaded=true;
if(Browser.isIE6)PU.blockUI("Loading...");}
App.Server.CreateCustomTheme(function(pageTheme)
{
Start.Theme.showCreateThemeUI(pageTheme);
if(Browser.isIE6)PU.unblockUI();
$track('/StartMenu/Theme/New');},function(){$showMsg("Error occured while creating theme. Please try again",10000);});},
showCreateThemeUI:function(pageTheme)
{
Start.Theme.themes.push(pageTheme);
Start.Theme.createThemeItem(pageTheme,Start.Theme.themes.length-1);
Start.Theme.edit(Start.Theme.themes.length-1);
Start.Theme.newThemeMode=true;},
changeTheme:function(properties)
{
App.Server.ChangeCustomTheme(Start.Theme.currentTheme.ThemeID,properties,function(pageTheme)
{
Start.Theme.reapply(pageTheme);});},
setStartButton:function(img)
{
Start.Theme.changeTheme({"startbutton":img+".png","startbuttondown":img+"_down.png"});},
setLogo:function(logo)
{
Start.Theme.changeTheme({"logo":logo});},
setHeaderColor:function(color)
{
$('PageSettings_NewTheme_Header_ColorPicker').style.backgroundColor=color;
$('PageSettings_NewTheme_Header_ColorRadio').checked=true;
Start.Theme.changeTheme({"headercolor":color,"headermode":"color"});},
setHeaderPic:function(imgSrc)
{
$('PageSettings_NewTheme_Header_ImageRadio').checked=true;
Start.Theme.changeTheme({"headerpic":imgSrc,"headermode":"picture"});},
setCustomCss:function(css)
{
Start.Theme.changeTheme({"customcss":css});},
setHeaderMenuColor1:function(color)
{
Start.Theme.changeTheme({"headermenucolor1":color});},
setHeaderMenuColor2:function(color)
{
Start.Theme.changeTheme({"headermenucolor2":color});},
setFooterBGColor:function(color)
{
Start.Theme.changeTheme({"footerbgcolor":color});},
setFooterBGColor2:function(color)
{
Start.Theme.changeTheme({"footerbgcolor2":color});},
setFooterTextColor:function(color)
{
Start.Theme.changeTheme({"footertextcolor":color});},
setHeaderCustomPic:function(id)
{
$('PageSettings_NewTheme_Header_UploadImageRadio').checked=true;
Start.Theme.changeTheme({"headermode":"custom","headercustompic":""+id});},
setActiveTabColor:function(color)
{
Start.Theme.changeTheme({"activetabcolor":color});},
setActiveTabTextColor:function(color)
{
Start.Theme.changeTheme({"activetabtextcolor":color});},
setInactiveTabColor:function(color)
{
Start.Theme.changeTheme({"inactivetabcolor":color});},
setInactiveTabTextColor:function(color)
{
Start.Theme.changeTheme({"inactivetabtextcolor":color});},
setPagePic:function(imgSrc)
{
$('PageSettings_NewTheme_Page_ImageRADIO').checked=true;
Start.Theme.changeTheme({"pagemode":"picture","pagepic":imgSrc});},
setPageColor:function(color)
{
$('PageSettings_NewTheme_Page_ColorRADIO').checked=true;
Start.Theme.changeTheme({"pagecolor":color,"pagemode":"color"});},
setPageCustomPic:function(id)
{
$('PageSettings_NewTheme_Page_UploadRADIO').checked=true;
Start.Theme.changeTheme({"pagemode":"custom","pagecustompic":""+id});},
setFlakeHeaderColor:function(color)
{
Start.Theme.changeTheme({"flakeheadercolor":color});},
setFlakeTitleColor:function(color)
{
Start.Theme.changeTheme({"flaketitlecolor":color});},
setFlakeBorderColor:function(color)
{
Start.Theme.changeTheme({"flakebordercolor":color});},
setFlakeOuterBorderColor:function(color)
{
Start.Theme.changeTheme({"flakeouterbordercolor":color});},
reapply:function(theme)
{
App.currentPage.pageTheme=Start.Theme.currentTheme=theme;
$DC(function(){P.setTheme(theme,true)});},
setNewThemeTab:function(tabId)
{
$selectChild($(tabId).parentNode,'DIV','',function(item){if(item.className=="NewThemePanel"){if(item.id==tabId)$D(item);else $ND(item);}return false;});},
sendTheme:function()
{
if(App.IsAnonymous)
{
alert('Please login or signup before you can share your theme');
return;}
var themeName=$('PageSettings_NewTheme_Advanced_ThemeName').value;
var button=$('PageSettings_NewTheme_Advanced_SendButton');
$disabled(button);
button.value="Sending...";
App.Server.SendTheme(themeName,Start.Theme.currentTheme.ThemeID,function()
{
$enabled(button);
button.value="Send";
alert("We have received your theme. We will review it and get back to you shortly.");});}};
var Settings=
{
requiresRestart:false,
onUniqueNameChange:function(event)
{
event=PageflakesUtility.fix(event);
var textBox=$('Settings_UniqueName');
var uniqueName=textBox.value.replace(/(\s|\.|\+|\-|\/|\\|!|@|#|\$|%|\^|&|\*|\(|\)|=|,|\?|\<|\>)*/g,"");
textBox.value=uniqueName;
$('Settings_PublicSiteName').value=SITE_PREFIX+uniqueName;},
hideUserNameInPublishSettingsIfRequired:function()
{
if(App.My.Profile["UserNameChanged"])
{
if($('tblUserNameIn').rows[0].cells.length>1)
{
try
{
$('tblUserNameIn').rows[0].cells[0].parentNode.removeChild($('tblUserNameIn').rows[0].cells[0]);
$('tblUserNameIn').rows[1].cells[0].parentNode.removeChild($('tblUserNameIn').rows[1].cells[0]);
$('tblUserNameIn').rows[0].cells[0].style.paddingLeft="";
$('tblUserNameIn').rows[1].cells[0].style.paddingLeft="";
$('tblUserNameIn').style.width="100%";}catch(ex){}}
try
{
$(PUBLISHOPTIONS_USERNAMEURL).value=Settings.getCurrentPagePublishUrl($(PUBLISHOPTIONS_USERNAME).value);}catch(ex2){}}},
initAccountInfo:function()
{
$('Settings_Name').value=App.UserFullName;
$('Settings_CurrentPassword').value="";
$('Settings_Password').value="";
$('Settings_ConfirmPassword').value="";
if(App.IsAnonymous)
{
$('Settings_Name').disabled=true;
$('Settings_CurrentPassword').disabled=true;
$('Settings_Password').disabled=true;
$('Settings_ConfirmPassword').disabled=true;
$('EmailVerification').style.display='none';}},
initPreference:function()
{
$('Settings_TimeZone').value=App.My.Timezone;
$('Settings_ZipCode').value=App.My.ZipCode;
$('Settings_Newsletter').checked=App.IsSubscribedForNewsletter;
if(App.IsAnonymous)$('Settings_Newsletter').disabled=true;
$('Settings_ShowSearchBar').checked=App.ShowSearchBar;
var txt=document.getElementById("Settings_Location");
txt.value=App.getLocationVariable();
if(typeof GeoLocation!='undefined')
var geo=new GeoLocation(txt,false,RenderMode.TABULAR,
function(p)
{
tempGlobalLocation=$('Settings_Location').value;
var zip=$('Settings_ZipCode').value;
tempGlobalZip=CoreServices.GetZipCode($('Settings_Location').value,function(result)
{
$('Settings_ZipCode').value=result;
tempGlobalZip=result;},
function(error){App.My.ZipCode=zip;});});},
initTheme:function()
{
var currentThemeName=App.currentTemplate.name;
var inputs=document.getElementsByTagName('INPUT');
for(var i=0;i<inputs.length;i++)
{
var input=inputs[i];
if(input.name=='Settings_Theme')
{
if(input.value==currentThemeName)
{
input.checked=true;
break;}}}},
initLayout:function()
{
var columnSizes=App.currentPage.columnSizes.join(",").trim();
var inputs=document.getElementsByTagName("INPUT");
for(var i=0;i<inputs.length;i++)
{
var input=inputs[i];
if(input.name=="PageLayout")
{
if(input.value==columnSizes)
input.checked=true;}}},
saveLayout:function()
{
App.currentPage.save();
Start.hidePageSettings();},
initButtons:function()
{
$(SHARINGOPTIONS_SAVE).value="Save Changes";
$enabled(SHARINGOPTIONS_SAVE);},
initSharing:function()
{
$ND(PUBLISHOPTIONS_TITLE_REQ);
$ND(PUBLISHOPTIONS_DESCRIPTION_REQ);
$ND(PUBLISHOPTIONS_TAQ_REQ);
if(App.IsAnonymous)
{
$ND(SHARINGOPTIONSBODY);
$D(SHARINGOPTIONSBODY_DUMMY);
return;}
else
{
$D(SHARINGOPTIONSBODY);
$ND(SHARINGOPTIONSBODY_DUMMY);}
Settings.initButtons();
$ND(SHAREDIALOG_ERRORINMAIL);
TooltipManager.setTooltip($(SHARINGOPTIONS_NOSHARE_LABEL),SHARINGOPTIONS_NOSHARE_TOOLTIP,1000);
TooltipManager.setTooltip($(SHARINGOPTIONS_PUBLIC_LABEL),SHARINGOPTIONS_PUBLIC_TOOLTIP,1000);
TooltipManager.setTooltip($(SHARINGOPTIONS_SHARE_LABEL),SHARINGOPTIONS_SHARE_TOOLTIP,1000);
var textArea1=$(SHARINGOPTIONS_SHAREDUSERS);
var textArea2=$(PUBLISHOPTIONS_SHAREDUSERS);
var tags=$(PUBLISHOPTIONS_TAGS);
var commentBox=$(PUBLISHOPTIONS_DESCRIPTION);
var titleBox=$(PUBLISHOPTIONS_PAGETITLE);
titleBox.value="";
commentBox.value="";
textArea1.value=textArea2.value=Lang.EMAIL_COMMA;
tags.value=Lang.TAGS_COMMA;
var allowEditCheckBox=$(SHARINGOPTIONS_ALLOWEDIT);
allowEditCheckBox.checked=(App.currentPage.sharingStatus==SharingStatus.AllowEdit);
$('UserPublishUrl').innerHTML=App.UserPublishURL;
if(App.currentPage.IsPublished)
{
$(SHARINGOPTIONS_PUBLIC).click();
if(Browser.isSafari)
$(SHARINGOPTIONS_PUBLIC).checked=true;
tags.value=Lang.LOADING;
App.Server.GetPublishedPage(App.currentPage.id,function(result)
{
if(null!=result)
{
$ND(PUBLISHOPTIONS_TITLE_REQ);
$ND(PUBLISHOPTIONS_DESCRIPTION_REQ);
$ND(PUBLISHOPTIONS_TAQ_REQ);
var title=result[0];
var comments=result[1];
var tagNames=result[2];
titleBox.value=title;
commentBox.value=comments;
if(tagNames=="")
tags.value=Lang.TAGS_COMMA;
else
tags.value=tagNames;}
else
{
tags.value=Lang.TAGS_COMMA;}});}
else if(App.currentPage.IsShared)
{
$(SHARINGOPTIONS_SHARE).click();
if(Browser.isSafari)
$(SHARINGOPTIONS_SHARE).checked=true;}
else
{
$(SHARINGOPTIONS_NOSHARE).click();
if(Browser.isSafari)
$(SHARINGOPTIONS_NOSHARE).checked=true;}
if(App.currentPage.IsShared)
{
var emailAddresses="";
App.Server.GetSharedUserNames(App.currentPage.id,function(result)
{
if(result.length>0)
{
emailAddresses=result.join(',');
textArea1.value=emailAddresses;
if(App.currentPage.sharingStatus==SharingStatus.AllowEdit)
{
$(PUBLISHOPTIONS_ALLOW_EDIT).checked=true;}
textArea2.value=emailAddresses;}
else
{
textArea1.value=textArea2.value=Lang.EMAIL_COMMA;
$(SHARINGOPTIONS_NOSHARE).click();}});}
else
{
textArea1.value=textArea2.value=Lang.EMAIL_COMMA;}},
handleUniqueNameChange:function()
{
try
{
$(PUBLISHOPTIONS_USERNAME).value=Settings.getUserNameValidatedText($(PUBLISHOPTIONS_USERNAME).value);
if($(PUBLISHOPTIONS_USERNAME).value.length>0)
{
$(PUBLISHOPTIONS_USERNAMEURL).value=Settings.getCurrentPagePublishUrl($(PUBLISHOPTIONS_USERNAME).value);}
else
{
$(PUBLISHOPTIONS_USERNAMEURL).value=Settings.getCurrentPagePublishUrl('');}}catch(ex){}},
getUserNameValidatedText:function(text)
{
var cleartext=text.replace(/(\s|[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890._]|)*/g,"");
if(cleartext.length>1)
{
if(cleartext.charAt(0)=="."|cleartext.charAt(0)=="_")
{
return cleartext.substring(1,cleartext.length);}}
else if(cleartext.length==1)
{
if(cleartext.charAt(0)=="."|cleartext.charAt(0)=="_")
{
return"";}}
return cleartext;},
getCurrentPagePublishUrl:function(username)
{
var publicPageCount=0;
var userNameToUse="";
if(username)
{
if($trim(username).length>0)
{
userNameToUse=$trim(username);}
else
{
userNameToUse="...";}}
else
{
userNameToUse="...";}
for(i=0;i<App.pages.length;i++)
{
if(App.pages[i].IsPublished==true)
{
publicPageCount++;}}
var prefix=SITE_PREFIX;
if(publicPageCount>0)
{
if(publicPageCount==1)
{
if(App.currentPage.IsPublished)
{
return prefix+userNameToUse+"/";}
else
{
return prefix+userNameToUse+"/"+App.currentPage.id.toString();}}
else
{
return prefix+userNameToUse+"/"+App.currentPage.id.toString();}}
else
{
return prefix+userNameToUse+"/";}},
saveSharingProxy:function()
{
if(App.IsAnonymous)return;
try
{
if($(SHARINGOPTIONS_PUBLIC))
{
if($(SHARINGOPTIONS_PUBLIC).checked)
{
if($(PUBLISHOPTIONS_USERNAME))
{
if($trim($(PUBLISHOPTIONS_USERNAME).value).length==0)
{
$('divUserNameNotUnique').innerHTML="Username is blank.";
$D('divUserNameNotUnique');
return;}
CoreServices.ValidateUniqename($(PUBLISHOPTIONS_USERNAME).value,
function(available)
{
if(!available)
{
$('divUserNameNotUnique').innerHTML="Username not unique.";
$D('divUserNameNotUnique');
return;}
else
{
$ND('divUserNameNotUnique');
if(App.My.Profile["UserNameChanged"])
{
Settings.saveSharing();}
else
{
Settings.saveSharing(true);}}});}
else
{
Settings.saveSharing();}}
else
{
Settings.saveSharing();}}}catch(ex){Settings.saveSharing();}},
saveSharing:function(changeUserNameToo)
{
if(App.IsAnonymous)return false;
$(SHARINGOPTIONS_SAVE).value=Lang.SAVING;
$disabled(SHARINGOPTIONS_SAVE);
if($(SHARINGOPTIONS_NOSHARE).checked)
{
if(App.currentPage.IsPublished||App.currentPage.IsShared)
{
ShareManager.makePrivate(App.currentPage.id,
function(){
Start.hidePageSettings();$showMsg(Lang.PAGE_MADE_PRIVATE);
TabManager.refresh();},function(){Settings.initButtons();});
if(null!=$('PagecastLinkDiv'))
{
if(null!=$('PagecastLinkDiv').childNodes[0])
{
var pagecastUrl=$('PagecastLinkDiv').childNodes[0].innerHTML
$('PagecastLinkDiv').innerHTML='';
T($('PagecastLinkDiv'),pagecastUrl);}}}
else
{
Start.hidePageSettings();}}
else if($(SHARINGOPTIONS_PUBLIC).checked)
{
ShareManager.publishPage(App.currentPage.id,PUBLISHOPTIONS_PAGETITLE,PUBLISHOPTIONS_DESCRIPTION,PUBLISHOPTIONS_TAGS,PUBLISHOPTIONS_SHAREDUSERS,PUBLISHDIALOG_ERRORINMAIL,PUBLISHDIALOG_ERRORTITLE,
function(urlInCommunity,publishPageUrl,publicProfileUrl)
{
if(changeUserNameToo)
{
if(changeUserNameToo==true)
{
App.UserUniqueName=$(PUBLISHOPTIONS_USERNAME).value;
CoreServices.ChangeUniqueName($(PUBLISHOPTIONS_USERNAME).value,
function(success)
{
$(PUBLISHOPTIONS_USERNAMEURL).value=Settings.getCurrentPagePublishUrl($(PUBLISHOPTIONS_USERNAME).value);
App.My.Profile["UserNameChanged"]="1";
App.saveUserInfo();
Settings.handleUniqueNameChange();});}}
if(null!=$('PagecastLinkDiv'))
{
if(null!=$('PagecastLinkDiv').childNodes[0])
{
var pagecastUrl=$('PagecastLinkDiv').childNodes[0].innerHTML
if(null==pagecastUrl)
pagecastUrl=T($('PagecastLinkDiv'));
$('PagecastLinkDiv').innerHTML='';
$('PagecastLinkDiv').innerHTML=Start.Profile.createHyperLink(pagecastUrl,pagecastUrl);}}
Settings.hideUserNameInPublishSettingsIfRequired();
if(publicProfileUrl=='true')
{
publicProfileUrl=SITE_PREFIX+App.UserUniqueName+"/p";
Start.hidePageSettings();$showMsg(String.format(Lang.PAGE_MADE_PUBLIC_AT,publishPageUrl,urlInCommunity,publicProfileUrl));}
else
{
Start.hidePageSettings();$showMsg(String.format(Lang.PAGE_MADE_PUBLIC_AT_NOPROFILE,publishPageUrl,urlInCommunity));}
TabManager.refresh();},
function()
{Settings.initButtons();return false;});}
else if($(SHARINGOPTIONS_SHARE).checked)
{
ShareManager.SetSharedUsers(App.currentPage.id,SHARINGOPTIONS_SHAREDUSERS,$(SHARINGOPTIONS_ALLOWEDIT).checked,SHAREDIALOG_ERRORINMAIL,SHAREDIALOG_ERRORTITLE,
function()
{
Start.hidePageSettings();$showMsg(Lang.PAGE_MADE_SHARED,5000);
TabManager.refresh();},function(){Settings.initButtons();});}},
saveUserInfo:function()
{
var locationChange=false;
var txt=document.getElementById("Settings_Location");
if(App.getLocationVariable()!=txt.value)
{
locationChange=true;}
App.saveUserInfo(function()
{
if(Settings.requiresRestart){document.location.reload();}
else App.hideSettings();
if(locationChange)
App.changeGlobalLocation(txt.value);},function(msg){Settings.registerError(msg);});},
saveAccountInfo:function()
{
App.UserFullName=$('Settings_Name').value;
T('UserFullName',App.UserFullName.substring(0,Math.min(15,App.UserFullName.length)))
var password=$trim($('Settings_Password').value);
var confirmPassword=$trim($('Settings_ConfirmPassword').value);
var currentPassword=$trim($('Settings_CurrentPassword').value);
if(password!="")
{
if(password!=confirmPassword)
Settings.registerError('Password and confirmation does not match');
else
App.changePassword(currentPassword,password,function(errorMsg)
{
if(errorMsg.length==0)
Settings.saveUserInfo();
else
Settings.registerError(errorMsg);},function(msg){Settings.registerError(msg);});}
else
{
Settings.saveUserInfo();}},
savePreference:function()
{
App.My.Timezone=parseInt($('Settings_TimeZone').value);
App.My.ZipCode=$('Settings_ZipCode').value;
App.My.Profile["ZipCode"]=App.My.ZipCode;
App.ShowSearchBar=$('Settings_ShowSearchBar').checked;
if(App.ShowSearchBar)SearchForm.open();
else SearchForm.close(true);
App.IsSubscribedForNewsletter=$('Settings_Newsletter').checked;},
registerError:function(msg)
{
var errorDiv=$('SettingsError');
var newErrorMsg=$$("p");
newErrorMsg.className="ErrorMsg";
newErrorMsg.innerHTML=msg;
errorDiv.appendChild(newErrorMsg);
Settings.resetButtons();},
resetButtons:function()
{
$('SaveSettings').value=Lang.SAVE;
$enabled('SaveSettings');},
clearError:function()
{
var errorDiv=$('SettingsError');
errorDiv.innerHTML="";},
cancel:function()
{
App.hideSettings();},
applyColumnLayout:function(layout)
{
var columnSizes=layout.split(',');
var columnCount=columnSizes.length;
App.currentPage.setColumns(columnCount,columnSizes);},
applyTheme:function(name)
{
App.changeTheme(name);},
blurText:function(element,text)
{
element.className="blurText";
if(element.value=='')element.value=text;},
focusText:function(element,text)
{
element.className="focusText";
if(element.value==text)
element.value='';
else
element.select();},
resendVerificationEmail:function()
{
var btn=$('btnResendVerificationEmail');
btn.disabled=true;
btn.value='Processing...';
CoreServices.ResendVerificationEmail(function(result)
{
if(result)
{
btn.value='Email sent';}
else
{
btn.value='Failed to send email to your address!';}});},
setEmailVerificationOption:function()
{
CoreServices.IsUserRequiredToVerifyEmail(function(result)
{
var panel=$('EmailVerification');
if(result)
{
var panel=$('EmailVerification');
if(panel!=null)
panel.style.display="";
Settings.setVerificationMailButton();}
else
{
if(panel!=null)
panel.style.display="none";}});},
setVerificationMailButton:function()
{
CoreServices.CanSendVerificationEmail(function(result)
{
var btn=$('btnResendVerificationEmail');
if(btn!=null)
{
btn.disabled=!result;
btn.value="Resend verification email";}});}};
var ShareManager=
{
publishDialogID:"publishDialog",
shareDialogID:"shareDialog",
sendPublishInvite:function(pageId,emailBox,errorDiv,errorMsg,successCallback,failureCallback)
{
var emailAddresses=""+$(emailBox).value;
if(0==emailAddresses.trim().length)
{
$(errorMsg).innerHTML=Lang.ONE_EMAIL;
$D(errorDiv);
return;}
var to=emailAddresses.trim().split(',');
App.startWork();
App.Server.PublishPageInvite(pageId,to,function(result)
{
if(result.length==0)
{
$ND(errorDiv);}
else
{
$D(errorDiv);
$(errorMsg).innerHTML=P.formatText(result);}
App.endWork();
TabManager.refresh();
successCallback();},
function(result)
{
App.endWork();
failureCallback();});},
sendTemplateInvite:function(pageId,emailBox,errorDiv,errorMsg,successCallback,failureCallback)
{
var emailAddresses=""+$(emailBox).value;
if(0==emailAddresses.trim().length)
{
$(errorMsg).innerHTML=Lang.ONE_EMAIL;
$D(errorDiv);
return;}
var to=emailAddresses.trim().split(',');
App.startWork();
App.Server.PublishPageInvite(pageId,to,function(result)
{
if(result.length==0)
{
$ND(errorDiv);}
else
{
$D(errorDiv);
$(errorMsg).innerHTML=P.formatText(result);}
App.endWork();
TabManager.refresh();
successCallback();},
function(result)
{
App.endWork();
failureCallback();});},
makePrivate:function(pageId,successCallback,failureCallback)
{
App.Server.MakePrivate(pageId,function(pageVersionNo)
{
var page=App.getPageById(pageId);
page.IsPublished=page.IsShared=false;
P.precachePage(pageId,pageVersionNo);
successCallback();},function(msg)
{
failureCallback();});},
SetSharedUsers:function(pageId,emailBox,allowEdit,errorDiv,errorMsg,successCallback,failureCallback)
{
var emailAddresses=""+$(emailBox).value;
if(0==emailAddresses.trim().length)
{
$(errorMsg).innerHTML=Lang.ONE_EMAIL;
$D(errorDiv);
failureCallback();
return;}
App.Server.SetSharedUsers(pageId,emailAddresses,allowEdit,function(result)
{
if(result.length==0)
{
var page=App.getPageById(pageId);
page.IsShared=true;
page.IsPublished=false;
page.sharingStatus=(allowEdit?SharingStatus.AllowEdit:SharingStatus.ReadOnly);
$ND(errorDiv);
$(errorMsg).innerHTML="";
ShareManager.refreshSettings(pageId);
successCallback();
$track('/StartMenu/Share');}
else
{
$(errorMsg).innerHTML=PageflakesUtility.formatText(result);
$D(errorDiv);
failureCallback();}
App.endWork();},
function(msg)
{
App.endWork();
$(errorMsg).innerHTML=PageflakesUtility.formatText(msg);
$D(errorDiv);});},
shareWith:function(pageId,allowEdit,emailBox,errorDiv,errorMsg,successCallback,failureCallback)
{
var emailAddresses=""+$(emailBox).value;
if(0==emailAddresses.trim().length)
{
$(errorMsg).innerHTML=Lang.ONE_EMAIL;
$D(errorDiv);
return;}
var to=emailAddresses.trim();
App.startWork();
App.Server.SharePage(pageId,to,allowEdit,function(result)
{
if(result.length==0)
{
App.getPageById(pageId).IsShared=true;
$ND(errorDiv);
$(errorMsg).innerHTML="";
TabManager.refresh();
ShareManager.refreshSettings(pageId);
successCallback();
$track('/StartMenu/Share');}
else
{
$(errorMsg).innerHTML=PageflakesUtility.formatText(result);
$D(errorDiv);
failureCallback();}
App.endWork();},
function(msg)
{
App.endWork();
$(errorMsg).innerHTML=PageflakesUtility.formatText(msg);
$D(errorDiv);});},
publishPage:function(pageId,pageTitle,pageDescription,tagBoxName,emailBox,errorDiv,errorMsg,successCallback,failureCallback)
{
var emailAddresses=""+$(emailBox).value.trim();
var title=$(pageTitle).value.trim();
var description=$(pageDescription).value.trim();
var allowEdit=$(PUBLISHOPTIONS_ALLOW_EDIT).checked?true:false;
$ND(PUBLISHOPTIONS_TITLE_REQ);
$ND(PUBLISHOPTIONS_DESCRIPTION_REQ);
$ND(PUBLISHOPTIONS_TAQ_REQ);
var isRequiredFieldMissing=false;
if(title=="")
{
$D(PUBLISHOPTIONS_TITLE_REQ);
isRequiredFieldMissing=true;}
if(description=="")
{
$D(PUBLISHOPTIONS_DESCRIPTION_REQ);
isRequiredFieldMissing=true;}
var tags=(""+$(tagBoxName).value).trim();
if(tags==Lang.TAGS_COMMA)
tags="";
if(tags==""||typeof(tags)=='undefined')
{
$D(PUBLISHOPTIONS_TAQ_REQ);
isRequiredFieldMissing=true;}
else
{
var tempTag=tags;
tempTag=tempTag.replace(/\,/g,"").trim();
if(tempTag.length==0)
{
$D(PUBLISHOPTIONS_TAQ_REQ);
isRequiredFieldMissing=true;}}
if(isRequiredFieldMissing)
{
Settings.initButtons();
return;}
if(emailAddresses.trim()==Lang.EMAIL_COMMA)
emailAddresses="";
App.Server.PublishPage(pageId,title,description,tags,emailAddresses,allowEdit,true,function(result)
{
var urlInCommunity=result[0];
var publishPageUrl=result[1];
var error=result[2];
var publicProfileUrl=result[3]
if(error==0)
{
var page=App.getPageById(pageId);
page.sharingStatus=allowEdit?SharingStatus.AllowEdit:SharingStatus.ReadOnly;
page.IsPublished=true;
if(emailAddresses!="")page.IsShared=true;
$ND(errorDiv);
$(errorMsg).innerHTML="";
ShareManager.refreshSettings(pageId);
successCallback(urlInCommunity,publishPageUrl,publicProfileUrl);
$track('/StartMenu/Publish');}
else
{
$(errorMsg).innerHTML=PU.formatText(error);
$D(errorDiv);
failureCallback(errorMsg);}
App.endWork();},
function(result)
{
PageflakesUtility.dumpException(result);
App.endWork();
failureCallback();});},
unsharePage:function(pageId,email,successCallback,failCallback)
{
var msg=email.length==0?Lang.CONF_UNSHARE:Lang.CONF_UNINVITE;
var yes=email.length==0?Lang.YES_MAKEPRIVATE:Lang.USER_NOMORE;
var no=email.legnth==0?Lang.NO_KEEPSHARE:Lang.NO_USERCONTINUE;
App.confirm(msg,yes,no,function()
{
App.startWork();
App.Server.UnsharePage(pageId,email,function(isShared)
{
App.endWork();
App.getPageById(pageId).IsShared=isShared;
ShareManager.refreshSettings(pageId);
TabManager.refresh();
successCallback();},
function(result)
{
App.endWork();
failCallback();});},
function(){},function(){});},
unpublishPage:function(pageId,successCallback,failCallback)
{
App.confirm(Lang.CONFIRM_UNPUB,Lang.YES_UNPUB,Lang.NO_KEEPPUB,function()
{
App.startWork();
App.Server.UnpublishPage(pageId,function()
{
App.getPageById(pageId).IsPublished=false;
App.endWork();
TabManager.refresh();
ShareManager.refreshSettings(pageId);
successCallback();},
function(result)
{
App.endWork();
failureCallback();});},function(){},function(){});},
refreshSettings:function(pageId)
{
var page=App.getPageById(pageId);
var m=page.modules["Publish"+page.id];
if(null!=m)
{
var instance=eval(m.id);
instance.refresh();}
var m=page.modules["Share"+page.id];
if(null!=m)
{
var instance=eval(m.id);
instance.refresh();}},
showPublishSettings:function(page)
{
var col=page.columnCount-1;
var m=App.createTempModule(page,"Publish"+page.id,Lang.PUB_SET,"flakes/Sharing/PublishPage.html?123",function(){},0,col);},
showShareSettings:function(page)
{
var col=page.columnCount-1;
var m=App.createTempModule(page,"Share"+page.id,Lang.SH_SET,"flakes/Sharing/SharePage.html?123",function(){},0,col);},
showPagesSharedToMe:function(page)
{
var col=page.columnCount-1;
var m=App.createTempModule(page,"Shared"+page.id,Lang.SH_TO_ME,"flakes/Sharing/SharedPages.html?123",function(){},0,col);}};
function PageSettings_ShowPageLayout()
{
$D('PageSettingsContainer');$ND('SharingOptions');$ND('PublishInCommunity');$ND('DeletePageContainer');}
function PageSettings_ShowSharingOptions()
{
$ND('PageSettingsContainer');$D('SharingOptions');$ND('PublishInCommunity');$ND('DeletePageContainer');}
function PageSettings_ShowCommunityPublish()
{
$ND('PageSettingsContainer');$ND('SharingOptions');$D('PublishInCommunity');$ND('DeletePageContainer');}
function PageSettings_ShowDeletePage()
{
$ND('PageSettingsContainer');$ND('SharingOptions');$ND('PublishInCommunity');$D('DeletePageContainer');}
function PageSettings_ShowNoShare()
{
$('PageSettings_NoShareRadio').className='radio_item_active';
$('PageSettings_PublishRadio').className=$('PageSettings_ShareRadio').className='radio_item';
$ND('PageSettings_PublishOptions');
$ND('PageSettings_ShareOptions');}
function PageSettings_ShowMakePublic()
{
$('PageSettings_PublishRadio').className='radio_item_active';
$('PageSettings_NoShareRadio').className=$('PageSettings_ShareRadio').className='radio_item'
$D('PageSettings_PublishOptions');
$ND('PageSettings_ShareOptions');
Settings.hideUserNameInPublishSettingsIfRequired();
try
{
if($(PUBLISHOPTIONS_USERNAME))
{
$(PUBLISHOPTIONS_USERNAME).value=App.UserUniqueName;
$ND('divUserNameNotUnique');}}catch(ex){}
$(PUBLISHOPTIONS_USERNAMEURL).value=Settings.getCurrentPagePublishUrl(App.UserUniqueName);}
function PageSettings_ShowShare()
{
$('PageSettings_ShareRadio').className='radio_item_active';
$('PageSettings_NoShareRadio').className=$('PageSettings_PublishRadio').className='radio_item'
$ND('PageSettings_PublishOptions');
$D('PageSettings_ShareOptions');}
function AddContent_Scripts_addFeed(title,url)
{
App.createNewModule(title,RSS_FEED_FLAKE_URL+escape(url),function(){PageflakesUtility.setIdle();},0,parseInt(App.currentPage.columnCount/2));}
function AddContent_Scripts_addContentInPage(urlBoxId,tipsDivId,resultDivId)
{
$ND(tipsDivId);
$D(resultDivId);
var urlTextBox=$(urlBoxId);
var resultDiv=$(resultDivId);
resultDiv.innerHTML="Discovering...";
resultDiv.style.display="block";
App.Server.Discover(urlTextBox.value,function(contentTypes)
{
AddContent_Scripts_showResults(resultDivId,contentTypes);});}
function AddContent_Scripts_showResults(resultDivId,contentTypes)
{
var resultNode=$$('div');
var isError=false;
var foundContentToAdd=false;
var counter=0;
for(var i=0;i<contentTypes.length;i++)
{
var contentType=contentTypes[i];
var title=contentType.Title;
var url=contentType.Url;
var type=contentType.TypeOfContent;
if(type==-1)
{
var itemNode=$$('div');
T(itemNode,title);
resultNode.appendChild(itemNode);
isError=true;}
else if(type==0)
{}
else
{
foundContentToAdd=true;
var itemNode=$$('div');
itemNode.className="AddContentResultItem";
var link=$$('a');
link.className="AddFeedPopup_FeedItem";
formattedTitle=title.replace(/'/g,"\\'");
formattedUrl=url.replace(/'/g,"\\'");
link.href="javascript:AddContent_Scripts_addContent('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"', "+type+");";
T(link,unescape(title));
itemNode.appendChild(link);
itemNode.appendChild($$('br'));
var typeNode=$$('small');
T(typeNode,AddContent_getTypeDescription(type));
itemNode.appendChild(typeNode);
resultNode.appendChild(itemNode);
var optionNode=$$('div');
optionNode.id="AddContentResultOption";
optionNode.width="100%";
if(type==1||type==2)
{
var addToBookmarkImg=$$('img');
addToBookmarkImg.src=IMAGE_PREFIX+"images/addToBookmark.png";
addToBookmarkImg.align="middle";
addToBookmarkImg.style.width=19;
addToBookmarkImg.style.Height=18;
optionNode.appendChild(addToBookmarkImg);
var addToBookmarkLink=$$('a');
addToBookmarkLink.href="javascript:AddContent_addBookmark('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"');";
T(addToBookmarkLink,Lang.ADD_FEED_BOOKMARK_LATER);
optionNode.appendChild(addToBookmarkLink);
var spc=$$('span');
PageflakesUtility.setInnerText(spc,' ');
spc.width=10;
optionNode.appendChild(spc);}
var addToPageImg=$$('img');
addToPageImg.style.width=23;
addToPageImg.style.Height=18;
addToPageImg.src=IMAGE_PREFIX+"images/addToPage.png";
addToPageImg.align="middle";
optionNode.appendChild(addToPageImg);
var addToPageLink=$$('a');
addToPageLink.href="javascript:AddContent_Scripts_addContent('"+escape(formattedTitle)+"', '"+escape(formattedUrl)+"', "+type+");";
if(counter==0)
{
AddContent_Scripts_addContent(title,url,type);
counter++;
var outputDiv=$(resultDivId);
outputDiv.innerHTML="<b>Feed Added.</b>";
return;}
T(addToPageLink,Lang.ADD_FEED_ADD_TO_MY_PAGE);
optionNode.appendChild(addToPageLink);
resultNode.appendChild(optionNode);}}
var resultDiv=$(resultDivId);
if(!isError)
{
if(foundContentToAdd)
{
resultDiv.innerHTML="<table cellspacing=\"0\" cellpadding=\"0\" width=\"95%\">"+"<tr><td>&nbsp;<b>"+Lang.ADD_FEED_AVAILABLE_CONTENT+":</b></td><td valign=\"center\" align=\"right\">"+"<img src=\""+IMAGE_PREFIX+"images/closeFeedResult.PNG\" onclick=\"$ND('"+resultDivId+"');\""+" style=\"cursor: pointer; cursor: hand;\"/></td></tr></table>";
resultDiv.appendChild(resultNode);}
else
{
resultDiv.innerHTML="The address you have entered does not contain an RSS Feed. Please enter the address of the RSS Feed you wish to add.<br />Example: http://rss.cnn.com/rss/cnn_topstories.rss";}}
else
{
resultDiv.innerHTML="The address you have entered does not contain an RSS Feed. Please enter the address of the RSS Feed you wish to add.<br />Example: http://rss.cnn.com/rss/cnn_topstories.rss<br/>";}}
function AddContent_Scripts_addContent(title,url,type)
{
title=unescape(title);
if(type==0)
{
AddContent_Scripts_addFlake(title,url);}
else if(type==1)
{
AddContent_Scripts_addFeed(title,url);}
else if(type==2)
{
AddContent_Scripts_addFeed(title,url);}
else if(type==3)
{
AddContent_Scripts_addFlake(title,url);}}
function AddContent_getTypeDescription(typeNo)
{
var descriptions=new Array("Web Page",Lang.ADD_FEED_RSS_FEED,Lang.ADD_FEED_ATOM_FEED,"Pageflake");
return descriptions[typeNo];}
function AddContent_toggleTreeNode(Id)
{
AddContent_toggleTreeImage(Id);}
function AddContent_toggleTreeImage(Id)
{
var divId='div_'+Id;
var imgId='img_'+Id;
$toggle(imgId,divId);}
function AddContent_collapseFeedTreeNodes()
{
try
{
var feedRoots=$('FeedRoots');
var nodes=feedRoots.getElementsByTagName('ul');
for(var i=0;i<nodes.length;i++)
{
if(nodes.item(i).style.display!="none")
{
var itemId=nodes.item(i).id.substring(nodes.item(i).id.indexOf('_')+1);
$('div_'+itemId).style.display='none';
var img=$('img_'+itemId);
if(img!=null)
img.src=IMAGE_PREFIX+'images/LeftArrow.png';}}}
catch(ex)
{
alert(ex.message);}}
function AddContent_toggle(btnId,divId)
{
$toggle(btnId,divId);}
function AddContent_addRssToPage(url,bookmarkId)
{
AddContent_Scripts_addContent('',url,1);}
function AddContent_addBookmark(title,url)
{
App.Server.AddBookmark(title,url,function(result)
{
AddContent_refreshBookmarkList(result);
RssCache.addChannelInCache(url);});}
function AddContent_deleteAllBookmark()
{
App.Server.DeleteAllBookmark(function(result)
{
AddContent_refreshBookmarkList(result);
RssCache.refreshCachedRssChannelList();});}
function AddContent_deleteBookmark(bookmarkId,url)
{
var cell=$('bookmark_'+bookmarkId);
cell.innerHTML="removing...";
App.Server.DeleteBookmark(bookmarkId,function(result)
{
AddContent_refreshBookmarkList(result);});
RssCache.removeChannelFromCache(url);}
function AddContent_loadBookmarks()
{
App.Server.GetAllBookmarksHtml(function(result)
{
AddContent_refreshBookmarkList(result);});}
function AddContent_refreshBookmarkList(result)
{
var img=new Image();
var div=$('Bookmarks');
if(null==div)return;
div.innerHTML=result;
if(result.length==0)$('Bookmarks').innerHTML=Lang.NO_BOOKMARKS;}
function AddContent_ToggleOPMLoptions()
{
var options=$("OPMLoptionsDiv");
if(options.style.display=="none")
$display(options);
else
$nodisplay(options);}
function AddContent_showOPMLmessage(message)
{
try
{
AddContent_ManageBookmarks();
OPMLMessage=message;
setTimeout(AddContent_showOPMLmessageDelayed,2000);}catch(e){}}
function AddContent_showOPMLmessageDelayed()
{
if($("OPMLmessageDiv")!=null)
{
$("OPMLmessageDiv").innerHTML=OPMLMessage;
$display($("OPMLmessageDiv"));
OPMLMessage='';
var container=$('OPMLOptionContainer');
container.innerHTML='';
container.innerHTML=OPMLOptionContents;
RssCache.refreshCachedRssChannelList();}
else
setTimeout(AddContent_showOPMLmessageDelayed,2000);}
function AddContent_ManageBookmarks()
{
var div=$(MANAGE_BOOKMARK_POPUP_ID);
if(div==null)
{
var body=App.createPopup(MANAGE_BOOKMARK_POPUP_ID,'<b>'+Lang.BOOKMARKED_FEEDS+'</b>',450,"auto");
div=$(MANAGE_BOOKMARK_POPUP_ID);
div.style.left="300px";
var pos=PU.getPosition($("OpmlLink"));
div.style.top=pos[1]+"px";
var closeLink=$('closeLink'+MANAGE_BOOKMARK_POPUP_ID);
closeLink.onclick=function(event)
{
$ND(div);
App.showAllControls();}
var url="BookmarkPopup.aspx";
App.Server.GetPage(MANAGE_BOOKMARK_POPUP_ID,SITE_PREFIX+url,function(result)
{
if(!P.loadPage(result,body))
{
$showError(Lang.COMMON_ERROR_ALERT);
return;}
else
{
if(typeof AddContent_loadBookmarks=="function")AddContent_loadBookmarks();}});
App.hideAllControls();}
else
{
AddContent_loadBookmarks();
$D(div);
$("OPMLmessageDiv").innerHTML='';
$nodisplay($("OPMLmessageDiv"));}}
var ThemeColorPicker=function()
{
this.isVisible=false;
this.NO_COLOR_TEXT="No Color (transparent)";}
ThemeColorPicker.prototype=
{
initialize:function(color,left,top,onSelectionChange)
{
if(color==""||color=="transparent")color="#FFFFFF";
this.color=this.cssColorToRGB(color);
this.left=left;this.top=top;this.onSelectionChange=onSelectionChange;
if(this.colorPicker==null)
{
this.colorPicker=$$("div");
this.colorPicker.style.border="2px solid dimgray";
this.colorPicker.style.backgroundColor="white";
this.colorPicker.style.position="absolute";
this.colorPicker.style.padding="6px";
this.colorPicker.style.zIndex="10000";
$ND(this.colorPicker);
$addEvent(this.colorPicker,'click',F(this,this.onColorPicked));
document.body.appendChild(this.colorPicker);}
else
{
$ND(this.colorPicker);}},
ToRGB1:function(rm1,rm2,rh)
{
if(rh>360.0)rh-=360.0;
else if(rh<0.0)rh+=360.0;
if(rh<60.0)rm1=rm1+(rm2-rm1)*rh/60.0;
else if(rh<180.0)rm1=rm2;
else if(rh<240.0)rm1=rm1+(rm2-rm1)*(240.0-rh)/60.0;
return Math.round(rm1*255);},
HSLtoRGB:function(h,s,l)
{
var rm2,rm1;
if(s==0)
return[l,l,l];
h=h*360/255;s/=255;l/=255;
if(l<=0.5)
rm2=l+l*s;
else
rm2=l+s-l*s;rm1=2.0*l-rm2;
return[this.ToRGB1(rm1,rm2,h+120.0),this.ToRGB1(rm1,rm2,h),this.ToRGB1(rm1,rm2,h-120.0)];},
cssColorToRGB:function(value)
{
var j;
if(value.indexOf('#')==0)
{
value=value.toUpperCase();
return[this.hex2dec(value.substr(1,2)),this.hex2dec(value.substr(3,2)),this.hex2dec(value.substr(5,2))]}
else if(value.indexOf('rgb')==0)
{
j=(value.substr(4,value.indexOf(')')-4)).split(',');
return j;}},
hex2dec:function(h)
{
var hD="0123456789ABCDEF";
var out=0;
for(a=h.length-1;a>=0;a--)
out+=Math.pow(16,h.length-a-1)*hD.indexOf(h.charAt(a));
return out;},
dec2hex:function(d)
{
var hD="0123456789ABCDEF";
var h=hD.substr(d&15,1);
while(d>15)
{
d>>=4;h=hD.substr(d&15,1)+h;}
if(h.length==1)h='0'+h;
return h;},
build:function()
{
var table=$$('table');
table.style.borderCollapse="collapse";
table.style.cursor="pointer";
table.style.clear="both";
var tbody=$$('tbody');
var colorSelected=(this.color=="transparent");
for(l=0;l<=250;l+=10)
{
if(l==250)
{
l=255;}
var tr=$$('tr');
var td=$$('td');
td.style.height="10px";
td.style.width="10px";
td.style.backgroundColor='rgb('+l+','+l+','+l+')';
if(this.color&&this.color[0]==l&&this.color[1]==l&&this.color[2]==l)
{
if(l>130)
{
td.style.color="black";}
else
{
td.style.color="white";}
td.style.textAlign="center";
if(!colorSelected)
{
colorSelected=true;
if(Browser.isIE)
{
td.innerHTML="<div style='position: absolute; margin-top: -4px;margin-left:-2px'>x</div>";}
else
{
td.innerHTML="<div style='position: absolute; margin-top: -9px;margin-left:2px'>x</div>";}}
var cross=td.firstChild;this.current=false;}
tr.appendChild(td);
for(t=0;t<=240;t+=10)
{
td=$$('td');
var color=this.HSLtoRGB(t,240,l);
td.style.height="10px";
td.style.width="10px";
if(!colorSelected&&this.color[0]==color[0]&&this.color[1]==color[1]&&this.color[2]==color[2])
{
colorSelected=true;
td.style.color='rgb('+(255-color[0])+','+(255-color[1])+','+(255-color[2])+')';
td.style.textAlign="center";
if(Browser.isIE)
{
td.innerHTML="<div style='position: absolute; margin-top: -4px;margin-left:-2px'>x</div>";}
else
{
td.innerHTML="<div style='position: absolute; margin-top: -9px;margin-left:2px'>x</div>";}
var cross=td.firstChild;}
td.style.backgroundColor='rgb('+color[0]+','+color[1]+','+color[2]+')';
tr.appendChild(td);}
tbody.appendChild(tr);}
tr=$$('tr');
tr.style.backgroundColor="white";
td=$$('td');
td.setAttribute("colSpan","26");
td.innerHTML='RGB: #<input type=text value="" id="ColorPickerRGBInput" style="width:40px;" maxlength=6 />';
tr.appendChild(td);
tbody.appendChild(tr);
tr=$$('tr');
tr.style.backgroundColor="white";
td=$$('td');
td.setAttribute("colSpan","13");
T(td,this.NO_COLOR_TEXT);
td.style.backgroundColor="transparent";
tr.appendChild(td);
td2=$$('td');
td2.setAttribute("colSpan","13");
td2.setAttribute("align","right");
T(td2,"Close");
tr.appendChild(td2);
tbody.appendChild(tr);
table.appendChild(tbody);return table;},
setColorFromInput:function()
{
var rgb=this.colorPickerInput.value;
this.onSelectionChange(rgb);},
onColorPicked:function(e)
{
e=$fix(e);
$stopBubble(e);
var td=e.target;
if(td.tagName=="INPUT")return;
while(td.tagName!="TD"&&td!=null)td=td.parentNode;
if(null==td)return;
var color=td.style.backgroundColor;
if(T(td)==this.NO_COLOR_TEXT)this.onSelectionChange("transparent");
else if(T(td)=="Close"){this.hide(e);}
else
{
var rgb=this.cssColorToRGB(td.style.backgroundColor);
rgb=this.dec2hex(rgb[0])+this.dec2hex(rgb[1])+this.dec2hex(rgb[2]);
this.onSelectionChange(rgb);}
$ND(this.colorPicker);},
show:function(item)
{
this.control=item;
this.colorPicker.innerHTML='';
this.colorPicker.appendChild(this.build());
if((this.left+312)>PU.getPosition($('Content'))[2])
this.left-=312-15;
this.colorPicker.style.left=this.left+'px';
this.colorPicker.style.top=this.top+'px';
$D(this.colorPicker);
this.isVisible=true;
this.colorPickerInput=$('ColorPickerRGBInput');
this.colorPickerInput.colorPicker=this;
this.colorPickerInput.onkeydown=function(event){event=$fix(event);if(event.keyCode==13)this.colorPicker.setColorFromInput();}
this.colorPickerInput.value=this.dec2hex(this.color[0])+this.dec2hex(this.color[1])+this.dec2hex(this.color[2]);},
hide:function(e)
{
this.isVisible=false;
$ND(this.colorPicker);}};
var ADD_FLAKE_POPUP_ID='gray_panel_dropdown_flake';
var ADD_FEED_POPUP_ID='gray_panel_dropdown_feed';
var PAGE_SETTINGS_POPUP_ID='gray_panel_dropdown_settings';
var FLAKE_EXPORT_POPUP_ID='flake_export_popup';
var PUBLIC_PAGE_INVITE_POPUP_ID='public_page_invite_popup';
var TOGGLE_ICON_COLLAPSE="toggleIconCollapse";
var TOGGLE_ICON_EXPAND="toggleIconExpand";
var AddRSSHtml='';
TM.currentItem=null;
TM.tooltipDiv=null;
TM.tooltipText="";
TM.tooltipWidthMargin=240;
TM.onmousemove=function(event)
{
event=$fix(event);
var posX=event.clientX;
var posY=event.clientY;
TM.moveTooltip(posX,posY+PU.getViewportScrollY());}
TM.onmouseout=function(event,delay)
{
event=$fix(event);
MQ.remove('TooltipShow',delay);
MQ.add('TooltipHide',delay,true,function()
{
TM.hideTooltip();});
if(Browser.isSafari)$fixTable('body');}
TM.showTooltipNow=
TM.onmouseover=function(event,item,text,delay)
{
TM.hideTooltip();
if(delay)MQ.remove('TooltipHide',delay);
event=$fix(event);
TM.currentItem=item;
TM.tooltipText=text;
var posX=event.clientX;
var posY=event.clientY;
if(delay)
{
MQ.add('TooltipShow',delay,true,function()
{
var mPosY=posY;
if(!Browser.isSafari)
mPosY+PU.getViewportScrollY();
TM.showTooltip(posX,mPosY);});}
else
{
var mPosY=posY;
if(!Browser.isSafari)
mPosY+PU.getViewportScrollY();
TM.showTooltip(posX,mPosY);}}
TM.showTooltip=function(posX,posY)
{
if(null!=TM.currentItem)
{
if(TM.currentItem.style.visibility!="hidden"&&
TM.currentItem.style.display!="none")
{
var pos=PU.getPosition(TM.currentItem);
TM.tooltipDiv=$$("div");
TM.tooltipDiv.className="tooltip";
var left=posX;
var top=posY+20;
if(left+TM.tooltipWidthMargin>window.Width)
left=window.Width-TM.tooltipWidthMargin;
TM.tooltipDiv.style.left=left+"px";
TM.tooltipDiv.style.top=top+"px";
TM.tooltipDiv.innerHTML=TM.tooltipText;
if(Browser.isFirefox)$ND(TM.tooltipDiv);
document.body.appendChild(TM.tooltipDiv);
TM.currentItem.tooltipDiv=TM.tooltipDiv;
if(Browser.isFirefox)$D(TM.tooltipDiv);
if(Browser.isSafari)$fixTable('body');}}}
TM.moveTooltip=function(posX,posY)
{
if(TM.currentItem)
{
if(typeof TM.currentItem.tooltipDiv=="object"&&TM.currentItem.tooltipDiv!=null){
if(typeof TM.currentItem.tooltipDiv=="string")
$showMsg(TM.currentItem.tooltipDiv);
var pos=PU.getPosition(TM.currentItem);
TM.tooltipDiv=TM.currentItem.tooltipDiv;
var left=posX;
var top=posY+20;
if(left+TM.tooltipWidthMargin>window.Width)
left=window.Width-TM.tooltipWidthMargin;
TM.tooltipDiv.style.left=left+"px";
TM.tooltipDiv.style.top=top+"px";}}}
TM.hideTooltip=function()
{
if(null!=TM.currentItem&&null!=TM.currentItem.tooltipDiv&&typeof TM.currentItem.tooltipDiv=="object")
{
TM.removeTooltip(TM.currentItem.tooltipDiv);
TM.currentItem.tooltipDiv=null;}
TM.currentItem=null;}
TM.removeTooltip=function(div)
{
$remove(div);
delete div;}
TM.unset=function(item,hide)
{
if(hide)TM.hideTooltip();
if(item.onmouseoverCallback)$removeEvent(item,'mouseover',item.onmouseoverCallback);
if(item.onmouseoutCallback)$removeEvent(item,'mouseout',item.onmouseoutCallback);
if(item.onmousemoveCallback)$removeEvent(item,'mousemove',item.onmousemoveCallback);
item.onmouseoverCallback=null;
item.onmouseoutCallback=null;
item.onmousemoveCallback=null;}
App.footerHover=function()
{
var footer_wrapper=$('footer_wrapper');
var img=$('footerBarImg');
if($isVisible(footer_wrapper))
{
img.src=IMAGE_PREFIX+'images/downArrow_h.gif';}
else
{
img.src=IMAGE_PREFIX+'images/upArrow_h.gif';}}
App.footerHoverOut=function()
{
var footer_wrapper=$('footer_wrapper');
var img=$('footerBarImg');
img.src=IMAGE_PREFIX+'images/downArrow.gif';
if($isVisible(footer_wrapper))
{
img.src=IMAGE_PREFIX+'images/downArrow.gif';}
else
{
img.src=IMAGE_PREFIX+'images/upArrow.gif';}}
App.toggleFooter=function()
{
var footer_wrapper=$('footer_wrapper');
var footer=$('footer');
var img=$('footerBarImg');
var footerAnchor=$('footerAnchor');
if($isVisible(footer_wrapper))
{
$ND(footer_wrapper,footer,'drpChangeLanguage');
App.footerHoverOut();
footerAnchor.blur();
img.src=IMAGE_PREFIX+"images/upArrow.gif";
if(App.IsMySite)App.saveProfile("ShowFooter","0");}
else
{
$D(footer_wrapper,footer,'drpChangeLanguage');
App.footerHoverOut();
footerAnchor.blur();
img.src=IMAGE_PREFIX+"images/downArrow.gif";
if(App.IsMySite)App.saveProfile("ShowFooter","1");
$scrollBottom();}}
App.hideFooter=function()
{
var footer=$('footer_wrapper');
var img=$('footerBarImg');
$ND(footer);
img.src=IMAGE_PREFIX+"images/upArrow.gif";}
App.startOver=function()
{
App.confirm(Lang.START_OVER,Lang.YES_START_OVER,Lang.NO_START_OVER,function()
{
document.location.href="Logout.aspx?startover=true";},function()
{});}
App.changeLanguage=function()
{
var control=$('drpChangeLanguage');
document.location.href=SITE_PREFIX+"ChangeLanguage.aspx?lang="+control.value;}
App.createNewPage=function(title)
{
var newPageTheme=new $cloneObject(App.currentPage.pageTheme);
var newPage=new Page(App.getNewId(),App.pages.length,title,3,true,newPageTheme);
App.pages.push(newPage);
P.orderPages();
TabManager.create();
newPage.show();
newPage.save();
ScrollManager.moveLeft(true);}
App.hideAllControls=function()
{
var controls=document.getElementsByTagName("SELECT");
for(var i=0;i<controls.length;i++)
{
var control=controls[i];
if(!control.getAttribute("dontHide"))
{
control.hidden=true;
$hide(control);}}}
App.showAllControls=function()
{
var controls=document.getElementsByTagName("SELECT");
for(var i=0;i<controls.length;i++)
{
var control=controls[i];
if(control.hidden)
{
control.hidden=false;
$visible(control);}}}
App.saveProfile=function(name,value)
{
App.My.Profile[name]=value;
App.Server.SaveProfile(name,value,Function.emptyFunction,function(){$showMsg("Error occured user saving profile. Please refresh");});}
App.saveUserInfo=function(successCallback,failureCallback)
{
if(!App.IsMySite)return;
if(typeof successCallback!="function")successCallback=function(){}
if(typeof failureCallback!="function")failureCallback=function(){}
App.Server.SaveUserInfo([App.UserFullName,App.UserUniqueName,
App.OpenLinksIn,App.ShowSharedPagesWithMine,App.IsSubscribedForNewsletter,App.DownloadFeedsAutometically,
App.ShowSearchBar,App.SearchEngineType,App.My],
function(my)
{
App.My.FirstName=my.FirstName;
App.My.LastName=my.LastName;
App.My.Profile=my.Profile;
App.My.City=my.City;
App.My.State=my.State;
App.My.ZipCode=my.ZipCode;
App.My.Country=my.Country;
App.My.Interests=my.Interests;
App.My.SpecificInterests=my.SpecificInterests;
App.My.Timezone=my.Timezone;
successCallback();},
function(failure)
{
failureCallback();});}
App.GetZipCode=function()
{
if(App.My.Country=="US"||App.My.Country=="USA")
{
if(App.My.City!=""&&App.My.State!=""&&App.My.ZipCode=="")
App.ZipCode=CoreServices.GetZipCode(App.My.City,App.My.State,function(result)
{
if(result!="")
{
App.My.ZipCode=result;
App.changeGlobalLocation(App.My.City,App.My.State,App.My.ZipCode,App.My.Country);}});}}
App.changeGlobalTimezone=function(timezoneValue)
{
try
{
App.My.Timezone=parseInt(timezoneValue);
App.saveUserInfo(
function(successResult)
{
App.notifySubscribers('OnTimeZoneChange');},
function(errorResult)
{});}
catch(exp)
{}}
App.changeGlobalLocation=function(city,state,zip,country,dontSave)
{
App.setLocationVariables(city,state,zip,country);
if(null==dontSave)
{
App.saveUserInfo(
function(successResult)
{
App.notifySubscribers('OnLocationChange');},
function(errorResult)
{});}
else
{
App.notifySubscribers('OnLocationChange');}}
App.notifySubscribers=function(eventName)
{
var locationValue=App.getLocationVariable();
for(var i=0;i<Events[eventName].length;i++)
{
var instanceRef=Events[eventName][i];
try
{
instanceRef.onEvent(eventName,locationValue);}
catch(exp)
{}}}
App.setLocationVariables=function(city,state,zip,country)
{
App.My.City=city;
App.My.State=state;
App.My.ZipCode=zip,
App.My.Country=country;}
App.loadFlakeGallery=function(categoryID)
{
$("OnsiteFlakeGrid").innerHTML="<div class='downloadInProgress' valign='middle' style='height:144px' >&nbsp;</div>";
AddContentWS.GetOnsiteFlakeGrid(categoryID,
function(result)
{
$("OnsiteFlakeGrid").innerHTML=result;});}
App.changePassword=function(oldPassword,password,successCallback,failureCallback)
{
App.Server.ChangePassword(oldPassword,password,
successCallback,failureCallback);}
App.hidePushdowns=function()
{
Start.hidePageSettings();}
App.hideSettings=function()
{
$ND(SETTINGS_POPUP_ID);
PU.unblockUI();
App.showAllControls();}
App.showSettings=function()
{
PU.blockUI();
App.hideAllControls();
var div=$(SETTINGS_POPUP_ID)
if(div==null)
{
div=$$('div',SETTINGS_POPUP_ID);
div.className="popup";
div.innerHTML=Lang.LOADING;
$(MODULE_CONTAINER).appendChild(div);
PU.centerDiv(div);
var url="SettingsPopup.aspx";
App.Server.GetPage(SETTINGS_POPUP_ID,SITE_PREFIX+url,function(result)
{
$track('/StartMenu/Show');
if(!P.loadPage(result,div))
{
$showMsg(Lang.COMMON_ERROR_ALERT);
return;}
else
{
PU.centerDiv(div);
div.style.zIndex=$('blockUI').style.zIndex+1;
if(typeof Settings!="undefined")Settings.init();}});
App.hideAllControls();}
else
{
Settings.init();
$D(div);
PU.centerDiv(div);
div.style.zIndex=$('blockUI').style.zIndex+1;
$track('/StartMenu/Show');}}
App.showFlakeExport=function(instanceId)
{
PU.blockUI();
App.hideAllControls();
var div=$(FLAKE_EXPORT_POPUP_ID);
if(div==null)
{
div=$$('div',FLAKE_EXPORT_POPUP_ID);
div.className="popup";
div.innerHTML=Lang.LOADING;
$(MODULE_CONTAINER).appendChild(div);
PU.centerDiv(div);
var url="FlakeExportPopup.aspx";
App.Server.GetPage(FLAKE_EXPORT_POPUP_ID,SITE_PREFIX+url,function(result)
{
$track('/ExportFlake/Show');
$hide(div);
if(!P.loadPage(result,div))
{
$showMsg(Lang.COMMON_ERROR_ALERT);
$D(div);
$visible(div);
return;}
else
{
div.style.zIndex=$('blockUI').style.zIndex+1;
if(typeof FlakeExport!="undefined")FlakeExport.init();}});
App.hideAllControls();}
else
{
FlakeExport.init();
$D(div);
PU.centerDiv(div);
div.style.zIndex=$('blockUI').style.zIndex+1;
$track('/ExportFlake/Show');}}
App.hideFlakeExport=function()
{
$ND(FLAKE_EXPORT_POPUP_ID);
PU.unblockUI();
App.showAllControls();}
App.showPublicPageInvite=function()
{
PU.blockUI();
App.hideAllControls();
var div=$(PUBLIC_PAGE_INVITE_POPUP_ID);
if(div==null)
{
div=$$('div',PUBLIC_PAGE_INVITE_POPUP_ID);
div.className="popup";
div.style.height="480px";
div.innerHTML=Lang.LOADING;
$(MODULE_CONTAINER).appendChild(div);
PU.centerDiv(div);
var url="PublicPageInvitePopup.aspx";
App.Server.GetPage(PUBLIC_PAGE_INVITE_POPUP_ID,SITE_PREFIX+url,function(result)
{
if(!P.loadPage(result,div))
{
$showMsg(Lang.COMMON_ERROR_ALERT);
$D(div);
$visible(div);
return;}
else
{
div.style.zIndex=$('blockUI').style.zIndex+1;
if(typeof PublicPageInvite!="undefined")
{
PublicPageInvite.init();}}});
App.hideAllControls();}
else
{
$D(div);
PU.centerDiv(div);
div.style.zIndex=$('blockUI').style.zIndex+1;
PublicPageInvite.init();}}
App.hidePublicPageInvite=function()
{
$ND(PUBLIC_PAGE_INVITE_POPUP_ID);
PU.unblockUI();
App.showAllControls();}
App.confirm=function(title,yesTitle,noTitle,yesCallback,noCallback,cancelCallback)
{
P.showConfirmDialog(title,yesTitle,noTitle,(typeof cancelCallback=="function"));
$('confirmDialog_ok').onclick=function()
{
P.hideConfirmDialog();
if($('confirmDialog_yes').checked)
{
yesCallback();}
else if($('confirmDialog_no').checked)
{
noCallback();}
else
{
P.showConfirmDialog(title,yesTitle,noTitle);}}
$('confirmDialog_cancel').onclick=function()
{
P.hideConfirmDialog();
cancelCallback();}}
App.lastNewId=-1;
App.getNewId=function()
{
return App.lastNewId--;}
App.removePageById=function(id)
{
var i;
for(i=0;i<App.pages.length;i++)
if(App.pages[i].id==id)
{
App.pages.removeAt(i);
break;}
P.orderPages();
if(i==App.pages.length)i--;
return i;}
App.moveModuleToPage=function(module,page)
{
var oldPageId=module.page.id;
var newPageId=page.id;
var oldPageVersionNo=++module.page.versionNo;
var newPageVersionNo=++page.versionNo;
module.page.removeModule(module.id);
page.addModule(module);
App.Server.MoveModuleToPage(module.internalId,oldPageId,newPageId,
function()
{
P.precachePage(oldPageId,oldPageVersionNo);
P.precachePage(newPageId,newPageVersionNo);});}
App.moveModuleToPage2=function(module,page)
{
var oldPageId=module.page.id;
var oldPageVersionNo=++module.page.versionNo;
var newPageVersionNo=++page.versionNo;
var newPageId=page.id;
App.Server.MoveModuleToPage(module.internalId,oldPageId,newPageId,function()
{
P.precachePage(oldPageId,oldPageVersionNo);
P.precachePage(newPageId,newPageVersionNo);});
module.removeFromPage();}
App.closePreviewModule=function(removeModule)
{
if(null!=App.lastPreviewModule)
{
var m=App.lastPreviewModule;
m.dragStart2=m.dragEnd2=function(x,y){};
if(m.closeLink)
m.closeLink.onclick=m.closeLink._onclick;
if(removeModule)m.close();}
App.lastPreviewModule=null;
$hide('FlakePreview');
PU.unblockUI();
window.clearInterval(App.previewModuleTimerID);
App.showAllControls();}
App.previewModule=function(title,url,successCallback)
{
App.closePreviewModule(true);
var page=App.currentPage;
var previewDiv=$('FlakePreview');
PU.blockUI();
PU.centerDiv(previewDiv);
var middleCol=parseInt(page.columnCount/2);
var previewContainer=$("FlakeContainer");
T(previewContainer,Lang.LOADING);
$disabled('AddToPageButton');
$disabled('CancelFlakeAdd');
$visible(previewDiv);
App.hideAllControls();
App.Server.CreateNewModule(title,url,page.id,-1,-1,function(result)
{
var m=new Module();
m.Build(result);
m.temp=true;
if(previewContainer.firstChild)previewContainer.removeChild(previewContainer.firstChild);
m=P.createNewModule(page,m,previewContainer);
m.col=m.row=-1;
m.loader=new ModuleLoader(m);
m.loader.load(result.Parts);
PU.centerDiv(previewDiv);
App.previewModuleTimerID=window.setInterval(function(){if(previewDiv&&$isVisible(previewDiv))PU.centerDiv(previewDiv);},500);
m.closeLink._onclick=m.closeLink.onclick;
m.closeLink.onclick=function(event)
{
App.closePreviewModule(true);
return true;}
$enabled('AddToPageButton');
$enabled('CancelFlakeAdd');
m.dragStart2=function(x,y)
{
App.hideAddFlakePopup();
PU.changeParent(m.div,MODULE_CONTAINER);
m.div.style.position="absolute";
var previewPos=PU.getPosition(previewDiv);
m.div.style.left=(previewPos[0]+10)+"px";
m.div.style.top=(previewPos[1]+20)+"px";
m.div.style.width=previewPos[2]+"px";
PU.makeOnTop(m.div);
m.temp=false;
App.closePreviewModule();
m.dragEnd2=function(x,y)
{
m.flakeAdded();
m.dragEnd(x,y);}
m.dragStart(x,y);}
PU.setIdle();
App.lastPreviewModule=m;
PU.centerDiv(previewDiv);
$('AddToPageButton').onclick=function(event)
{
var oldpos=PU.getPosition(m);
m.dragStart(oldpos[0],oldpos[1]);
m.temp=false;
m.div.style.position="";
m.div.style.left="";
m.div.style.top="";
m.div.style.width="";
P.insertModule(page,m,0,middleCol);
P.saveLayoutNow(page);
App.closePreviewModule();
App.hideAddFlakePopup();
$fixTable(page.table);
m.resolve();
var pos=PU.getPosition(m);
m.flakeAdded();
m.dragEnd(pos[0],pos[1]);}
$('CancelFlakeAdd').onclick=function(event)
{
App.closePreviewModule(true);}});}
App.sendErrorReport=function()
{
MQ.add('ErrorReport',30000,true,App.sendErrorReport);
if(App.errors.length>0)
{
Log.add(P.buildLoadTimeLogs());
App.Server.ErrorReports(App.errors,Log.items,
function(){App.errors=[];Log.clear();},
function(){App.addError("Error report send timed out");},
function(exception){PU.dumpException(exception);});}}
App.createTempModule=function(page,id,title,url,callback,row,col)
{
if(null!=page.modules[id])return;
var m=new Module(id,row,col,title,url,true,0,page.id,page);
m.temp=true;
m=P.createNewModule(page,m,page.columns[col].div);
m.loader=new ModuleLoader(m);
m.loader.load();
if(row!=-1&&col!=-1)
P.insertModule(page,m,row,col);
if(typeof callback=="function")
callback(m);
return m;}
App.createNewModule=function(title,url,callback,row,col)
{
if(!App.currentPage.CanAddFlake)
{
alert(App.ViewingPageOf+Lang._THE_OWNER_CAN_ADD);
return;}
App.Server.CreateNewModule(title,url,App.currentPage.id,row,col,
function(result)
{
App.currentPage.modules.add(result);
var m=new Module();
m.Build(result);
m.row=row;m.col=col;
m=P.createNewModule(App.currentPage,m,App.currentPage.columns[col].div);
m.loader=new ModuleLoader(m);
m.loader.load(result.Parts);
P.insertModule(App.currentPage,m,row,col);
P.saveLayout(App.currentPage);
if(typeof callback=="function")
callback(m);});}
App.createPopup=function(id,title,left,top,width,height,className,isVisible)
{
var existing=$(id);
if(null!=existing)
{
return $('body'+id);}
var div=$$("DIV");
div.id=id;
if(className&&className.length>0)
div.className=className;
else
div.className="popup";
if(arguments.length==8){if(isVisible)$visible(div);else $hide(div);}
div.innerHTML=App.getPopupHtml(id,title);
$('Content').appendChild(div);
if(arguments.length>4)
{
div.style.left=left+(typeof(left)=="string"?"":"px");
div.style.top=top+(typeof(top)=="string"?"":"px");
div.style.width=width+(typeof(width)=="string"?"":"px");
if(height!="auto")
div.style.height=height+(typeof(height)=="string"?"":"px");}
else if(arguments.length>2)
{
div.style.width=left+(typeof(left)=="string"?"":"px");
if(height!="auto")
div.style.height=top+(typeof(top)=="string"?"":"px");
PU.centerDiv(div);}
else
{
div.style.width=(PU.getViewportWidth()*0.6)+"px";
div.style.height=(PU.getViewportHeight()*0.6)+"px";
PU.centerDiv(div);}
var handle=$('handle'+id);
Drag.init(handle,div);
var closeLink=$('closeLink'+id);
closeLink.onclick=function(event)
{
$('Content').removeChild(div);}
PU.makeOnTop(div);
var body=$('body'+id);
return body;}
App.createPopupPage=function(id,title,url,left,top,width,height)
{
var existing=$(id);
if(null!=existing)existing.parentNode.removeChild(existing);
var m=new Module(id,-1,-1,title,url,true,0,0,App.currentPage);
if(width)
var body=App.createPopup(id,title,left,top,width,height);
else
var body=App.createPopup(id,title,left,top);
App.Server.GetPage(m.id,url,function(result)
{
P.loadPage(result,body);});
return m;}
App.showHtmlViewer=function(title,url)
{
var scrollHeight=0;
if(window.innerHeight)
{
scrollHeight=window.pageYOffset}
else if(document.documentElement&&document.documentElement.scrollTop)
{
scrollHeight=document.documentElement.scrollTop}
var windowWidth=PU.getViewportWidth();
var viewerWidth=830;
var left=Math.round((windowWidth-viewerWidth)/2);
var body=App.createPopup('HtmlViewer',title,left,scrollHeight+90,viewerWidth,450);
var div=$('HtmlViewer');
App.Server.GetHtmlViewer(url,function(arg)
{
P.loadPage(arg,body);},
function(error){body.innerHTML=error;});}
function AnimatedMover(div,tox,toy,callback)
{
var itemToMove=div,toX=tox,toY=toy;
var __ANIMATION_STEPS=5.0;
var __ANIMATION_DURATION=10;
var stepCount=__ANIMATION_STEPS;
var callbackFunction=callback;
registerMoveTimer();
function registerMoveTimer()
{
window.setTimeout(moveItemSmoothly,__ANIMATION_STEPS);}
function moveItemSmoothly()
{
var pos=PU.getPosition(itemToMove);
if(stepCount==0)
{
itemToMove.style.left=toX+"px";
itemToMove.style.top=toY+"px";
callbackFunction();}
else
{
var xStep=parseFloat(pos[0]-toX)/stepCount;
var yStep=parseFloat(pos[1]-toY)/stepCount;
itemToMove.style.left=(pos[0]-xStep)+"px";
itemToMove.style.top=(pos[1]-yStep)+"px";
registerMoveTimer();
stepCount--;}}}
function AddContent_Scripts_popup(id,title,url,width,height)
{
App.createPopupPage(id,title,url,width,height);}
function AddContent_Scripts_addFlake(title,url)
{
PU.setBusy();
var pageId=App.currentPage.id;
var middleCol=parseInt(App.currentPage.columnCount/2);
App.Server.CreateNewModule(title,url,pageId,middleCol,0,function(result)
{
var page=App.getPageById(pageId);
var m=new Module();
m.Build(result);
m.page=page;
P.createNewModule(page,m);
m.loader=new ModuleLoader(m);
m.loader.load(result.Parts);
P.insertModule(page,m,m.col,m.row);
P.saveLayoutNow(page);
PU.setIdle();});}
var TabManager={
enabled:true,
menuPageId:0,
menuTimeout:null,
draggingPageId:null,
dragDiv:null,
dragOverTab:null,
draggingTab:null,
tabChangeCallback:function(pageId){},
create:function()
{
var ul=$('tabs');
$removeAll(ul);
for(var i=0;i<App.pages.length;i++)
{
var page=App.pages[i];
var pageId=page.id;
var title=page.title;
if(title=="")title=Lang.UNTITLED;
if(!page.IsOwner&&App.IsMySite)title+=" ("+page.OwnerFullname+")";
var a=TabManager.addNewTab(ul,pageId,title,page.IsPublished);
a.id=pageId;
if(page.IsOwner)
{}
else
{
if(page.IsShared)
{
TM.setTooltip(a,Lang.THIS_PAGE_+page.OwnerName+Lang._SHARED_WITH_YOU);}
else
{
TM.setTooltip(a,Lang.THIS_PAGE_OF_+page.OwnerName+Lang._VIEW_NOT_EDIT);}}}
if(App.IsMySite)
{
var newTabLink=$$('li');
newTabLink.id='NewTabLink';
T(newTabLink,Lang.ADD_PAGE);
newTabLink.className="add_page";
$addHandler(newTabLink,"click",TabManager.newTabClicked);
ul.appendChild(newTabLink);}
TabManager.refresh();},
newTabClicked:function()
{
Start.hidePageSettings();
if(TabManager.enabled)App.createNewPage(Lang.MY_NEW_PAGE,App.pages.length);},
getTotalWidth:function()
{
var ul=$('tabs');
var child=ul.firstChild;
var totalWidth=0;
while(child!=null)
{
totalWidth+=child.offsetWidth+1;
child=child.nextSibling;}
return totalWidth;},
dragTab:function(event,item)
{
event=$fix(event);
$addEvent(document.body,'selectstart',function(event){return false;});
var pos=PU.getPosition(item);
var div=$$("div");
div.className="page_tab_hover";
div.style.position="absolute";
div.style.left=pos[0]+"px";
div.style.top=pos[1]+"px";
div.innerHTML=item.firstChild.innerHTML;
$('header').appendChild(div);
Drag.init(div,div,event);
div.onDrag=TabManager.onDragTab;
div.onDragStart=TabManager.onDragTab;
div.onDragEnd=TabManager.onDragEnd;
TabManager.draggingPageId=item.id;
TabManager.draggingTab=item;
TabManager.dragDiv=div;
TabManager.dragOverTab=TabManager.draggingTab;
item.className+=" translucent";},
onDragTab:function(x,y,mx,my)
{
var ul=$('tabs');
var hoveredTab=TabManager.findTabAt(mx,my);
if(null==hoveredTab)
{
var pos=PU.getPosition(ul);
if(x<pos[0])
{
if(ul.firstChild!=TabManager.draggingTab)
{
ul.removeChild(TabManager.draggingTab);
ul.insertBefore(TabManager.draggingTab,ul.firstChild);}}
else
{
if(ul.lastChild.previousSibling!=TabManager.draggingTab)
{
ul.removeChild(TabManager.draggingTab);
ul.insertBefore(TabManager.draggingTab,ul.lastChild);}}}
else
{
if(TabManager.dragOverTab!=hoveredTab)
{
if(hoveredTab==TabManager.dragOverTab.nextSibling)
ul.insertBefore(TabManager.draggingTab,hoveredTab.nextSibling);
else
ul.insertBefore(TabManager.draggingTab,hoveredTab);
TabManager.dragOverTab=hoveredTab;}}
ScrollManager.dragStart(x,y);},
onDragEnd:function(x,y)
{
$('header').removeChild(TabManager.dragDiv);
TabManager.dragDiv=null;
TabManager.draggingTab.className="page_tab";
TabManager.draggingTab=null;
TabManager.dragOverTab=null;
var ul=$('tabs');
var li=ul.firstChild;
var index=0;
var newPages=[];
do
{
var pageId=parseInt(li.id);
if(pageId>0)
{
var page=App.getPageById(pageId);
newPages[index]=page;
page.index=index++;}}while((li=li.nextSibling)!=null);
App.pages=newPages;
P.savePageOrder();
TabManager.create();
ScrollManager.dragEnd();},
getTabBottom:function()
{
return $('header').offsetTop+$('header').offsetHeight;},
findTabAt:function(x,y)
{
var ul=$('tabs');
var li=ul.firstChild;
do
{
if(li.tagName=="LI")
{
if(parseInt(li.id)>0)
{
var tabPos=PU.getPosition(li);
if(x>=tabPos[0]&&y>=tabPos[1])
{
if(x<=tabPos[0]+tabPos[2]&&y<=tabPos[1]+tabPos[3])
{
return li;}}}}}while((li=li.nextSibling)!=null);
return null;},
highlightTabAt:function(x,y)
{
var li=TabManager.findTabAt(x,y+15);
if(li!=null)
{
if(li.firstChild.className.indexOf("_over")<0)
{
TabManager.refresh();
li.firstChild.className+=" page_tab_over";}
return parseInt(li.id);}
return 0;},
findTabPosition:function(pageId)
{
var ul=$('tabs');
var li=ul.firstChild;
do
{
if(li.tagName=="LI")
{
if(li.id==pageId)
{
var pos=PU.getPosition(li);
return pos;}}}while((li=li.nextSibling)!=null);},
deletePage:function()
{
var page=App.getPageById(TabManager.menuPageId);
if(confirm(Lang.DELETE_PAGE+" '"+page.title+"' "+Lang.AND_ALL_FLAKE))
{
page.remove();}},
addNewTab:function(ul,id,title,isPublished)
{
var li=$$('li');
ul.appendChild(li);
li.id=id;
var mDiv=$$('a');
var div1=$$('div');
div1.className="page_title";
T(div1,title);
var div2=$$('a');
div2.className="delete_page";
T(div2,'X');
mDiv.appendChild(div1);
mDiv.appendChild(div2);
li.appendChild(mDiv);
if(id!='NewTabLink')
$addEvent(li,'click',new Func("TabManager.activate("+id+")"));
return li;},
activate:function(pageId)
{
if(!TabManager.enabled)return;
if(pageId!=App.currentPage.id)App.hidePushdowns();
var page=App.getPageById(pageId);
page.show();
if(typeof TabManager.tabChangeCallback=="function")TabManager.tabChangeCallback(pageId);},
editTabTitle:function(event,item)
{
var input=$$('input','TabTitleEditTextBox');
var originalTitle=T(item);
var pos=PU.getPosition(item);
input.className='editTitleBox';
input.style.left=pos[0]+"px";
if(Browser.isIE6)input.style.left=(pos[0]-13)+"px";
input.style.top=pos[1]+2+"px";
input.style.width=pos[2]+10+"px";
input.value=originalTitle;
$('header').appendChild(input);
function applyTitle(input,item)
{
if($trim(input.value)=="")
{
$showMsg(Lang.ENTER_SOME_TEXT);
return;}
$hideMsg();
$remove(input);
var page=App.getPageById(parseInt(item.parentNode.parentNode.id));
page.title=input.value;
page.save();
TabManager.refresh();
document.onclick=null;
TabManager.enable();}
input.onclick=$stopBubble;
$addEvent(input,'keypress',function(event)
{
event=$fix(event);
if(event.keyCode==13)
{
applyTitle(this,item);}
else if(event.keyCode==27)
{
T(item,originalTitle);
$remove(this);
document.onclick=null;}
else
{
T(item,this.value);}
this.style.width=item.offsetWidth+10+"px";});
window.setTimeout(function(){$('TabTitleEditTextBox').focus(1);document.onclick=function(event){applyTitle($('TabTitleEditTextBox'),item);document.onclick=null;}},500);
TabManager.disable();},
refresh:function()
{
if(null==App.currentPage)return;
var ul=$('tabs');
for(var i=0;i<ul.childNodes.length;i++)
{
var li=ul.childNodes[i];
var page=App.getPageById(parseInt(li.id));
if(page!=null)
{
var mDiv=li.firstChild;
var div1=mDiv.firstChild;
var div2=div1.nextSibling;
li.title="";
div1.title="";
div2.title="";
$clearEvent(li);$clearEvent(div1);$clearEvent(div2);$clearEvent(mDiv);
$addEvent(li,'click',new Func("TabManager.activate("+page.id+")"));
li.className=page.pageTheme.ThemeShortcut+"_tab";
if(li.id==App.currentPage.id)
{
if(page.IsOwner)
{
mDiv.className=" page_tab page_tab"+(page.IsPublished?"_public":(page.IsShared?"_shared":""));
$addEvent(li,"mousedown",new Func("TabManager.dragTab(event, this)"));
$addEvent(div1,"click",new Func("TabManager.editTabTitle(event, this)"));
if(Browser.isIE)
{
$addEvent(mDiv,'mousedown',function(event){$stopBubble(event);this.buttonDown=1;});
$addEvent(mDiv,'mouseup',function(event){$stopBubble(event);this.buttonDown=0;});
$addEvent(mDiv,'mousemove',function(event){if(this.buttonDown){this.buttonDown=0;TabManager.dragTab(event,this.parentNode);}});}
else
{
$addEvent(mDiv,'mousedown',function(event){$stopBubble(event);this.buttonDown=1;});
$addEvent(mDiv,'mouseup',function(event){$stopBubble(event);this.buttonDown=0;});
$addEvent(mDiv,'mousemove',function(event){if(this.buttonDown){this.buttonDown=0;TabManager.dragTab(event,this.parentNode);}});}
$addEvent(div2,'mousedown',$stopBubble);
$addEvent(div2,'click',function(event){if(confirm("Are you sure you want to remove this page?")){App.currentPage.remove();Start.hidePageSettings();}});
$D(div2);
div1.title="Click to rename this page.";
li.title="";
div2.title="Click to delete this page";}
else
{
if(App.IsMySite)
{
mDiv.className="page_tab page_tab_notmine"+(page.IsPublished?"_public":(page.IsShared?"_shared":""));}
else
{
mDiv.className="page_tab page_tab";}
if(page.IsShared)
{
$D(div2);
div2.title="Click to unshare this page.";}
else if(App.IsMySite&&page.IsPublished)
{
$D(div2);}
else
{
div2.style.width="0px";
div2.style.marginRight="5px";}
$addEvent(div2,'click',function(event){if(confirm("Are you sure you want to remove this page?")){App.currentPage.remove();App.hidePageSettings();}});}
$addEvent(mDiv,'mouseover',function(event){this.className+=' page_tab_h';});
$addEvent(mDiv,'mouseout',function(event){var cn=this.className;this.className=cn.replace(/page_tab_h/g,'');});
$addEvent(div2,'mouseover',function(event){this.className+=' delete_page_hover';});
$addEvent(div2,'mouseout',function(event){this.className='delete_page';});}
else
{
if(page.IsOwner)
{
mDiv.className="page_tab_off page_tab"+(page.IsPublished?"_public":(page.IsShared?"_shared":""))+"_off";}
else
{
if(App.IsMySite)
{
mDiv.className="page_tab_off page_tab_notmine"+(page.IsPublished?"_public":(page.IsShared?"_shared":""))+"_off";}
else
{
mDiv.className="page_tab_off page_tab_off";}}
div1.title=li.title="Go to page '"+page.title+"'";
$ND(div2);}
if(page.title=="")page.title=Lang.UNTITLED;
T(div1,page.title);}}
MQ.add("ScrollRefresh",100,false,ScrollManager.refresh);},
disable:function()
{
TabManager.enabled=false;
var ul=$('tabs');
for(var i=0;i<ul.childNodes.length;i++)
{
var li=ul.childNodes[i];
var mDiv=li.firstChild;
if(mDiv==null)continue;
var div1=mDiv.firstChild;
if(div1==null)continue;
var div2=div1.nextSibling;
$clearEvent(li);
$clearEvent(mDiv);
$clearEvent(div1);
$clearEvent(div2);}},
enable:function()
{
TabManager.enabled=true;
TabManager.refresh();},
dispose:function()
{
var ul=$('tabs');
$removeAll(ul);}};
P.insertModule=function(page,module,row,col)
{
var columnDiv=page.columns[col].div;
var modules=page.columns[col].modules;
module.row=row;module.col=col;
module.div.parentNode.removeChild(module.div);
if(row==modules.length)
{
columnDiv.appendChild(module.div);}
else
{
columnDiv.insertBefore(module.div,modules[row].div);}
if(module.pageId!=page.id)
App.moveModuleToPage(module,page);
else
page.addModule(module);
module.div.style.position="";
module.div.style.width="100%";
module.div.style.height="auto";}
P.removeModule=function(page,module)
{
page.removeModule(module.id);
PU.changeParent(module.div,MODULE_CONTAINER);}
P.makeSpaceForModule=function(page,m,x,y)
{
P.createDropPlaceholder(page,m);
var col=P.findNearestColumn(page,m.col,x);
if(col<0)col=parseInt(page.columnCount/2);
P.resizeDraggingModule(page,m,col);
var row=P.findNearestRow(page.columns[col].modules,y);
P.moveDropPlaceholder(page,row,col);}
P.findModuleAt=function(page,x,y)
{
var minDistance=65535;
var minDistantModule=null;
var col=P.findNearestColumn(page,parseInt(page.columnCount/2),x);
for(var i=0;i<page.modules.length;i++)
{
var module=page.modules[i];
if(module.col==col)
{
var pos=PU.getPosition(module.div);
var distance=Math.abs(pos[1]-y);
if(distance<minDistance)
{
minDistance=distance;
minDistantModule=module;}}}
return minDistantModule;}
P.resizeDraggingModule=function(page,module,col)
{
return;
var oldWidth=parseInt(module.div.style.width);
var newWidth=page.columns[col].width;
if(oldWidth!=newWidth)
{
var widthChange=oldWidth-newWidth;
module.div.style.width=newWidth;
module.div.style.left=window.event.clientX-(newWidth/2);
module.drag.recalculateDelta();}}
P.findNearestColumn=function(page,defaultCol,x)
{
for(var i=0;i<page.columnCount;i++)
{
if(x>page.table.offsetLeft+page.columns[i].div.offsetLeft&&
x<page.table.offsetLeft+page.columns[i].div.offsetLeft+page.columns[i].div.offsetWidth)
return i;}
return defaultCol;}
P.findNearestRow=function(modules,y)
{
if(null==modules)return;
var minDistance=10000;
var row=0;
for(row=0;row<modules.length;row++)
{
var module=modules[row];
var pos=PU.getPosition(module.div);
if(y<=pos[1])break;}
return row;}
P.createDropPlaceholder=function(page,module)
{
if(App.dropPlaceholder==null)
{
App.dropPlaceholder=$$('DIV');
App.dropPlaceholder.className='dropplaceholder';
App.dropPlaceholder.style.height=module.div.offsetHeight+"px";}}
P.moveDropPlaceholder=function(page,row,col)
{
if(App.dropPlaceholder.row!=row||App.dropPlaceholder.col!=col)
{
if(!isNaN(App.dropPlaceholder.col))
{
if(App.dropPlaceholder.parentNode==page.columns[App.dropPlaceholder.col].div)
page.columns[App.dropPlaceholder.col].div.removeChild(App.dropPlaceholder);}
if(row==page.columns[col].modules.length)page.columns[col].div.appendChild(App.dropPlaceholder);
else page.columns[col].div.insertBefore(App.dropPlaceholder,page.columns[col].modules[row].div);
App.dropPlaceholder.row=row;
App.dropPlaceholder.col=col;}}
P.hideDropPlaceholder=function()
{
if(null!=App.dropPlaceholder)
{
App.dropPlaceholder.parentNode.removeChild(App.dropPlaceholder);
App.dropPlaceholder=null;}}
P.showLogs=function()
{
alert(P.buildLoadTimeLogs()+Log.items.join('\n'));}
P.buildLoadTimeLogs=function()
{
var dt=new Date();
return"Start Time: "+l.startDateTime+"\n"+"End Time: "+l.endDateTime+"\n"+"Duration: "+((l.endDateTime.getTime()-l.startDateTime.getTime())/1000)+"\n"+"Online for: "+((dt.getTime()-l.startDateTime.getTime())/1000)+"\n";}
P.showConfirmDialog=function(title,yesTitle,noTitle,showCancel)
{
PU.blockUI();
App.hideAllControls();
PU.centerDiv($('confirmDialog'));
$('confirmDialog_title').innerHTML=title;
$('confirmDialog_yes_title').innerHTML=yesTitle;
$('confirmDialog_no_title').innerHTML=noTitle;
if(showCancel)$D('confirm_cancel_content');
else $ND('confirm_cancel_content');
$visible('confirmDialog');}
P.shiftPageLeft=function(pageId)
{
var page=App.getPageById(pageId);
var pageAtLeft=App.pages[page.index-1];
pageAtLeft.index++;
page.index--;
App.pages[page.index]=page;
App.pages[pageAtLeft.index]=pageAtLeft;
TabManager.create();
P.savePageOrder();}
P.shiftPageRight=function(pageId)
{
var page=App.getPageById(pageId);
var pageAtRight=App.pages[page.index+1];
pageAtRight.index--;
page.index++;
App.pages[page.index]=page;
App.pages[pageAtRight.index]=pageAtRight;
TabManager.create();
P.savePageOrder();}
P.orderPages=function()
{
var isChanged=false;
for(var i=0;i<App.pages.length;i++)
{
if(App.pages[i].index!=i)
isChanged=true;
App.pages[i].index=i;}}
P.moveModules=function(pageId,fromColumn,toColumn)
{
var page=App.getPageById(pageId);
var fromModules=page.columns[fromColumn].modules;
var toModules=page.columns[toColumn].modules;
var toContainer=page.columns[toColumn].div;
for(var i=0;i<fromModules.length;i++)
{
var module=fromModules[i];
P.removeModule(page,module);
P.insertModule(page,module,0,toColumn);}
fromColumn.modules=[];}
P.removeColumn=function(pageId,colNo)
{
var page=App.getPageById(pageId);
var trObj=page.table.firstChild.firstChild;
var td=trObj.childNodes[colNo];
trObj.removeChild(td);
var newColumns=[];var index=0;
for(var col=0;col<page.columnCount;col++)
if(col!=colNo)
newColumns[index++]=page.columns[col];
page.columns=newColumns;
page.columnCount--;}
P.addNewColumn=function(pageId,width)
{
var page=App.getPageById(pageId);
var trObj=page.table.firstChild.firstChild;
var td=$$('td');
td.className="column";
trObj.appendChild(td);
td.setAttribute("width",width);
page.columns.add({div:td,modules:[],width:width});
page.columnCount++;}
P.setColumnWidth=function(pageId,sizes)
{
var page=App.getPageById(pageId);
var trObj=page.table.firstChild.firstChild;
for(var i=0;i<sizes.length;i++)
{
var td=trObj.childNodes[i];
td.setAttribute("width",sizes[i]);
page.columns[i].width=sizes[i];}
page.columnSizes=sizes;
$fixTable(page.table);}
P.savePageOrder=function()
{
var pageOrders=[];
for(var i=0;i<App.pages.length;i++)
pageOrders[i]={id:App.pages[i].id,index:App.pages[i].index};
App.Server.SavePageOrder(pageOrders);}
P.hideConfirmDialog=function()
{
PU.unblockUI();
$hide('confirmDialog');
App.showAllControls();}
P.onResize=function(event)
{
window.Width=PU.getViewportWidth();
window.Height=PU.getViewportHeight();
FeedViewer.ui_resetOutlookDefaultSize=true;
MQ.add('FeedViewer.resizeRssViewer',200,false,FeedViewer.resizeRssViewer);
MQ.add('RssFlakeResizer.resizeGridView',100,false,RssFlakeResizer.resizeAllGridView);
MQ.add("ScrollRefresh",100,false,ScrollManager.refresh);}
var RssFlakeResizer=
{
flakeList:[],
subscribe:function(flake)
{
RssFlakeResizer.flakeList.add(flake);},
unSubscribe:function(flake)
{
RssFlakeResizer.flakeList.remove(flake);},
resizeAllGridView:function()
{
for(var i=0;i<RssFlakeResizer.flakeList.length;i++)
{
RssFlakeResizer.flakeList[i].resizeGridView();}}}
var FeedViewer=
{
V_SPLITER_PADDING:20,
H_SPLITER_PADDING:10,
vSplitDragStart:false,
vSpliterRightPadding:10,
hSplitDragStart:false,
hSpliter:null,
hSpliter2:null,
vSpliter:null,
vSpliter2:null,
vSplitOldTop:0,
readingAreaTop:53,
articleIcon:'<div class="feedViewer_FeedIcon"></div>',
iframe_Loading:'<div style="margin-left:300px;margin-top:200px">Loading...</div>',
previousonkeyupHandle:null,
SelectedList:'',
FEED_LIST:'FeedList',
CHANNEL_LIST:'ChannelList',
ALL_CHANNELS_WRAPPER_ID:'AllChannelWrapper',
PAGETOPMARKER_PREFIX:'mr',
WRAPPER_PREFIX:'wrap',
WRAPPER_START_PREFIX:'wrapStr',
WRAPPER_END_PREFIX:'wrapEnd',
LEFT_PANE_ITEM_TITLE_PREFIX:'lnk',
LEFT_PANE_ITEM_TITLE_MAX_LENGTH:50,
RSS_READER_ID:'RssViewer',
SELECTED_CHANNEL_ALLFEEDS_ID:-1,
SELECTED_CHANNEL_SAVEDFEEDS_ID:-2,
RSSItemDetailWidth:0,
VIEWER_TOP:78,
LEFT_POS:0,
RIGHT_POS:0,
WIDTH:960,
FEEDTITLEPREFIX:"feedTitle",
DIVID_PREFIXLEN:10,
MAX_CHANNELTITLE_WIDTH:20,
DEFAULT_PAGE_SIZE:20,
NEWSPAPER_VIEW_PAGESIZE:20,
OUTLOOK_VIEW_PAGESIZE:20,
SPACE:"&nbsp;|&nbsp;",
NEW_WINDOW_TARGET:"_blank",
MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER:50,
MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER:200,
MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL:300,
MAX_FEED_VIEWER_TITLE_LENGTH:200,
MARK_ALL_READ:'allread',
MARK_ALL_UNREAD:'allunread',
MARK_READ:'read',
MARK_UNREAD:'unread',
MARK_ALL_CHANNEL_READ:'allchannelread',
MARK_ALL_CHANNEL_UNREAD:'allchannelunread',
BODY_CONTAINER:MODULE_CONTAINER,
OUTLOOK_VIEW_RSS:"OutlookViewRSS",
OUTLOOK_VIEW_WEBSITE:"OutlookViewWebsite",
NEWSPAPER_VIEW:"NewspaperView",
OUTLOOK_ON:"FeedViewer_imgShowOutlookViewOn",
OUTLOOK_OFF:"FeedViewer_imgShowOutlookViewOff",
NEWSPAPER_ON:"FeedViewer_imgShowNewspaperViewOn",
NEWSPAPER_OFF:"FeedViewer_imgShowNewspaperViewOff",
CSS_CHANNEL_DELETE:'feedViewer_ChannelDelete',
CSS_CHANNEL_ICON:'feedViewer_ChannelIcon',
CSS_CHANNEL_ICON_READ:'feedViewer_ChannelIcon_read',
RSS_ON:"FeedViewer_imgShowRSSViewOn",
RSS_OFF:"FeedViewer_imgShowRSSViewOff",
WEBSITE_ON:"FeedViewer_imgShowWebsiteViewOn",
WEBSITE_OFF:"FeedViewer_imgShowWebsiteViewOff",
WEBSITE_DISABLED:"FeedViewer_imgShowWebsiteViewDisabled",
FEEDVIEWER_RSSITEM_TITLE:"FeedViewer_RSSItem_Title",
FEEDVIEWER_RSSITEM_DESCRIPTION:"FeedViewer_RSSItem_Description",
FEEDVIEWER_RSSITEM_DESCRIPTION_READ:"FeedViewer_RSSItem_Description_Read",
FEEDVIEWER_RSSITEM_PUBLISHEDDATE:"Feedviewer_RSSItem_PublishedDate",
FEEDVIEWER_RSSITEM_PUBLISHEDDATE_READ:"Feedviewer_RSSItem_PublishedDate_Read",
SORT_ORDER_DESC:'desc',
SORT_ORDER_ASC:'asc',
_selectedChannelId:0,
_selectedRssItemID:0,
_tmpChannelID:0,
_allFeedCurrentIndex:0,
_allFeedItems:null,
_currentViewMode:"OutlookViewRSS",
_lastSelectedLeftPaneItemDiv:null,
_lastSelectedRSSItemDiv:null,
_savedRssItemsChannelDiv:null,
_allFeedsRssItemsChannelDiv:null,
_divLoadNextFeeds:null,
_leftPaneChannelDivs:null,
DIV_FEEDLIST:'divFeedList',
DIV_TITLE:'titleRssViewer',
STYLE_CH_MOUSEOVER:"feedViewer_channelMouseOver",
STYLE_CH_SELECTED:"feedViewer_channelSelected",
STYLE_CH_NOTSELECTED:"feedViewer_channelNotSelected",
STYLE_MOUSEOVER:"feedViewer_mouseOver",
STYLE_SELECTED:"feedViewer_selected",
STYLE_NOTSELECTED:"feedViewer_notSelected",
STYLE_NOTSELECTEDALT:"feedViewer_notSelectedAltRow",
STYLE_ALLSELECTED:"feedViewer_allSelected",
STYLE_ALLNOTSELECTED:"feedViewer_allNotSelected",
STYLE_RSSITEM_WRAPPER:"FeedViewer_RSSItem_Wrapper",
STYLE_FEEDVIEWER_OPTIONS:"FeedViewer_options",
STYLE_OUTLOOKVIEW_RSSITEMDETAIL_IE:"outlookView_RssItemdetail_IE",
STYLE_OUTLOOKVIEW_RSSITEMDETAIL_FF:"outlookView_RssItemdetail_FF",
STYLE_OUTLOOKVIEW_IFRAME_IE:"outlookView_IFRAME_IE",
STYLE_OUTLOOKVIEW_IFRAME_FF:"outlookView_IFRAME_FF",
STYLE_NEWSPAPERVIEW_SELECTEDITEM:"newspaperView_SelectedRSSItem",
SPC:'&nbsp;',
FROM_PAGEFLAKES:"Pageflakes",
ui_rss_reader:null,
ui_outlookView:null,
ui_newspaperView:null,
ui_outlook_FeedDetail:null,
ui_resetOutlookDefaultSize:true,
ui_feedViewerIframe:null,
ui_forwardFeedOptions:null,
ui_leftPane:null,
ui_npv_selectedItemMarker:null,
ui_drpLeftPaneSortOption:null,
ui_drpRightPaneSortOption:null,
ui_drpRightPaneChangeStatus:null,
ui_toolbar_ShowOutlookView:null,
ui_toolbar_ShowNewspaperView:null,
ui_toolbar_ShowRSSView:null,
ui_toolbar_ShowWebsiteView:null,
ui_divForwardFeed:null,
ui_divOutlookView_RSSItemList:null,
ui_allChannelsWrapper:null,
EMAIL_FORMAT_HTML:1,
ui_SendMail_To:null,
ui_Your_Name:null,
ui_SendMail_CC:null,
ui_SendMail_Subject:null,
ui_SendMail_PersonalMessage:null,
ui_SendMail_btnSendMail:null,
ui_divFeedList:null,
LEFTPANE_SAVEDCHANNEL_ID:'divSavedChannels',
LEFTPANE_ALLFEEDSCHANNEL_ID:'divAllFeedsChannels',
LEFTPANE_CHANNEL_ID_PREFIX:'lcnl',
MOUSEOVER_TITLE_BACKGROUNDCOLOR:'#D8E7F6',
SELECTED_TITLE_BACKGROUNDCOLOR:'#D8E7F6',
NOTSELECTED_TITLE_BACKGROUNDCOLOR:'#FFFFFF',
NOTSELECTEDALT_TITLE_BACKGROUNDCOLOR:'#F1F6FC',
newspaper_currentPageIndex:0,
ref_allNewspaperItems:null,
rssNewspaperTopMarker:null,
outlookRssItemListTopMarker:null,
outlookRssItemDetailTopMarker:null,
vSplit2_left:270,
vSplit2_left_iePadding:10,
vSplit2_width:530,
tdChannelList:null,
tdRssItemList:null,
document_event_moveHandle:null,
document_event_moveHandle:null,
ref_event:null,
document_pos_x:0,
document_pos_y:0,
diff_y:0,
refreshChannelListWidth:false,
refreshOutlookViewHeight:false,
resizeTimer:null,
rssItemMinHeight:60,
rssItemMaxHeight:600,
channelListMinWidth:170,
channelListMaxWidth:700,
resizerRefreshTime:10,
tdChannelDetail:null,
divRightPaneViewers:null,
OUTLOOKVIEW_PAGING:'navigationPane',
markFirstItemSelected:false,
initializeComponent:function()
{
FeedViewer._leftPaneChannelDivs=null;
FeedViewer.ui_rss_reader=$(FeedViewer.RSS_READER_ID);
FeedViewer.ui_outlookView=$('divOutlookView');
FeedViewer.ui_newspaperView=$('divNewspaperView');
FeedViewer.ui_outlook_FeedDetail=$('divOutlookView_RSSItemDetail');
FeedViewer.ui_feedViewerIframe=$('feedViewerIframe');
FeedViewer.ui_forwardFeedOptions=$('FeedViewer_ForwardedFeedInfo');
FeedViewer.ui_leftPane=$(FeedViewer.DIV_FEEDLIST);
FeedViewer.ui_drpLeftPaneSortOption=$('FeedViewer_drpLeftPaneSortOption');
FeedViewer.ui_drpRightPaneChangeStatus=$('FeedViewer_drpRightPaneChangeStatus');
FeedViewer.ui_drpRightPaneSortOption=$('FeedViewer_drpRightPaneSortOption');
FeedViewer.ui_drpLeftPaneChangeStatus=$('FeedViewer_drpLeftPaneChangeStatus');
FeedViewer.ui_toolbar_ShowOutlookView=$('FeedViewer_imgShowOutlookView');
FeedViewer.ui_toolbar_ShowNewspaperView=$('FeedViewer_imgShowNewspaperView');
FeedViewer.ui_toolbar_ShowRSSView=$('FeedViewer_imgShowRSSView');
FeedViewer.ui_toolbar_ShowWebsiteView=$('FeedViewer_imgShowWebsiteView');
FeedViewer.ui_divForwardFeed=$('divForwardFeed');
FeedViewer.ui_divOutlookView_RSSItemList=$('divOutlookView_RSSItemList');
FeedViewer.ui_SendMail_To=$('FeedViewer_To');
FeedViewer.ui_Your_Name=$('FeedViewer_YourName');
FeedViewer.ui_SendMail_CC=$('FeedViewer_CC');
FeedViewer.ui_SendMail_Subject=$('FeedViewer_Subject');
FeedViewer.ui_SendMail_PersonalMessage=$('FeedViewer_PersonalMessage');
FeedViewer.ui_SendMail_btnSendMail=$("FeedViewer_btnSendeMail");
FeedViewer.tdChannelList=$('RssViewer_tdChannelList');
FeedViewer.tdChannelDetail=$('tdChannelDetail');
FeedViewer.divRightPaneViewers=$('divRightPaneViewers');
FeedViewer.hSpliter=$('feedReader_hSpliter');
var headerIcon=$('icon'+FeedViewer.RSS_READER_ID);
headerIcon.src=IMAGE_PREFIX+"images/rss.gif";},
resizeRssViewer:function()
{
FeedViewer.resizeRssViewer2();},
resizeRssViewer2:function()
{
var grayBar=$('gray_panel');
if(grayBar!=null)
{
var grayBarPos=PU.getPosition(grayBar);
FeedViewer.VIEWER_TOP=grayBarPos[1];}
var height=PU.getViewportHeight()-80-FeedViewer.VIEWER_TOP;
var width=PU.getViewportWidth()-15;
var VIEWER_LEFT=FeedViewer.LEFT_POS+"px";
var VIEWER_TOP=FeedViewer.VIEWER_TOP+"px";
var READER_HEIGHT=(height+50)+"px";
var READER_WIDTH=width+14;
var SPLITERBAR_HEIGHT=12;
var PADDING=2;
if(Browser.isIE)
PADDING=-14
if(Browser.isIE7)
height-=10;
var OUTLOOK_VIEW_HEIGHT=height-SPLITERBAR_HEIGHT+PADDING+"px";
var NEWSPAPER_VIEW_HEIGHT=height-SPLITERBAR_HEIGHT+PADDING+"px";
var LEFTPANE_HEIGHT=height-SPLITERBAR_HEIGHT+PADDING;
var RIGHTPANE_HEIGHT=height-SPLITERBAR_HEIGHT+PADDING;
var FORWARD_ENTRYFORMS_HEIGHT=290;
var LEFTPANE_WIDTH=270;
FeedViewer.RSSItemDetailWidth=(READER_WIDTH-LEFTPANE_WIDTH);
var NEWSPAPER_VIEW_WIDTH=FeedViewer.RSSItemDetailWidth;
var OUTLOOK_VIEW_WIDTH=FeedViewer.RSSItemDetailWidth;
if(FeedViewer.ui_rss_reader!=null)
{
FeedViewer.ui_rss_reader.style.left=VIEWER_LEFT;
FeedViewer.ui_rss_reader.style.top=VIEWER_TOP;
FeedViewer.ui_rss_reader.style.height=READER_HEIGHT;
FeedViewer.ui_rss_reader.style.width=READER_WIDTH+"px";
FeedViewer.ui_outlookView.style.height=OUTLOOK_VIEW_HEIGHT;
FeedViewer.ui_newspaperView.style.height=NEWSPAPER_VIEW_HEIGHT;
FeedViewer.ui_leftPane.style.height=LEFTPANE_HEIGHT+"px";
FeedViewer.hSpliter.style.height=LEFTPANE_HEIGHT+"px";
if(FeedViewer.ui_resetOutlookDefaultSize)
{
FeedViewer.ui_resetOutlookDefaultSize=false;
var listHight=(RIGHTPANE_HEIGHT)/3;
if(FeedViewer.ui_divOutlookView_RSSItemList!=null)
FeedViewer.ui_divOutlookView_RSSItemList.style.height=(listHight)+"px";
FeedViewer.ui_outlook_FeedDetail.style.height=(RIGHTPANE_HEIGHT-SPLITERBAR_HEIGHT-listHight)+"px";
FeedViewer.ui_feedViewerIframe.style.height=(RIGHTPANE_HEIGHT-SPLITERBAR_HEIGHT-listHight)+"px";}
if(RIGHTPANE_HEIGHT>FORWARD_ENTRYFORMS_HEIGHT)
FeedViewer.ui_forwardFeedOptions.style.height=(RIGHTPANE_HEIGHT-FORWARD_ENTRYFORMS_HEIGHT-20)+"px";
else
FeedViewer.ui_forwardFeedOptions.style.height="100px";
if(FeedViewer.vSpliter2!=null)
if(Browser.isIE)
FeedViewer.vSpliter2.style.width=FeedViewer.RSSItemDetailWidth-FeedViewer.vSpliterRightPadding+FeedViewer.vSplit2_left_iePadding+'px';
else
FeedViewer.vSpliter2.style.width=FeedViewer.RSSItemDetailWidth-FeedViewer.vSpliterRightPadding+'px';
var leftPanePos=PU.getPosition(FeedViewer.ui_leftPane);
if(FeedViewer.hSpliter2==null)
FeedViewer.hSpliter2=$('RSSReaderHSpliter2');
FeedViewer.readingAreaTop=leftPanePos[1]-1;
FeedViewer.hSpliter2.style.top=(FeedViewer.readingAreaTop-FeedViewer.VIEWER_TOP)+"px";
if(FeedViewer.ui_leftPane==null)
FeedViewer.ui_leftPane=$(FeedViewer.DIV_FEEDLIST);
var leftPanePos=PU.getPosition(FeedViewer.ui_leftPane);
setTimeout(FeedViewer.resetRightPaneContentLength,100);}},
onkeyup:function(e)
{
if(FeedViewer.enableHotkeys)
{
if(e==null)
e=event;
if(e.keyCode=='83'||e.keyCode=='115')
{
FeedViewer.nextArticle();}
else if(e.keyCode=='65'||e.keyCode=='97')
{
FeedViewer.previousArticle();}
else if(e.keyCode=='81'||e.keyCode=='113')
{
FeedViewer.previousFeed();}
else if(e.keyCode=='87'||e.keyCode=='119')
{
FeedViewer.nextFeed();}
else if(e.keyCode=='80'||e.keyCode=='112')
{
FeedViewer.previousPage();}
else if(e.keyCode=='78'||e.keyCode=='110')
{
FeedViewer.nextPage();}}},
selectFeedList:function()
{
FeedViewer.SelectedList=FeedViewer.FEED_LIST;},
selectChannelList:function()
{
FeedViewer.SelectedList=FeedViewer.CHANNEL_LIST;},
previousPage:function()
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.newspaperView_prevPage();}
else
{
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
FeedViewer.loadAllFeedsInOutlookView_prev();}}},
nextPage:function()
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.newspaperView_nextPage();}
else
{
if(FeedViewer._selectedChannelId>0)
{
FeedViewer.loadNextFeeds();}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
FeedViewer.loadAllFeedsInOutlookView_next();}}},
getChannelListDivs:function()
{
if(FeedViewer._leftPaneChannelDivs==null)
{
var allDivs=FeedViewer.ui_leftPane.getElementsByTagName('div');
FeedViewer._leftPaneChannelDivs=new Array();
var index=0;
for(var j=0;j<allDivs.length;j++)
if(allDivs[j].id!=null&&allDivs[j].id.length>0)
FeedViewer._leftPaneChannelDivs.add(allDivs[j]);}
return FeedViewer._leftPaneChannelDivs;},
nextFeed:function()
{
var nextFeedDivId=FeedViewer._lastSelectedLeftPaneItemDiv.getAttribute('next');
if(nextFeedDivId.length>0)
{
var nextDiv=$(nextFeedDivId);
nextDiv.onclick(self);
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+nextFeedDivId);
if(Browser.isIE)
{
setTimeout(FeedViewer.focusCurrentChannel,300);}}},
previousFeed:function()
{
if(FeedViewer._lastSelectedRSSItemDiv!=null)
{
var prevFeedDivId=FeedViewer._lastSelectedLeftPaneItemDiv.getAttribute('prev');
if(prevFeedDivId.length>0)
{
$(prevFeedDivId).onclick(self);
var prevDiv=$(prevFeedDivId);
prevDiv.onclick(self);
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+prevFeedDivId);
if(Browser.isIE)
{
setTimeout(FeedViewer.focusCurrentChannel,300);}}}},
focusCurrentChannel:function()
{
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+FeedViewer._selectedChannelId);},
delayedChannelClickEvent:function()
{
FeedViewer._lastSelectedLeftPaneItemDiv.onclick();
debug.dump('clicked: '+T(FeedViewer._lastSelectedLeftPaneItemDiv));},
nextArticle:function(e,self)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
var markers=FeedViewer.ui_newspaperView.getElementsByTagName('input');
for(var i=2;i<markers.length-1;i+=2)
{
if(markers[i-1]==FeedViewer.ui_npv_selectedItemMarker||markers[i]==FeedViewer.ui_npv_selectedItemMarker)
{
var marker=markers[i+2];
FeedViewer.clearNewspaperItemSelection(markers[i]);
FeedViewer.selectNewspaperItem(marker);
FeedViewer.selectNewspaperItem(markers[i+1]);
FeedViewer._selectedRssItemID=marker.id.substring(FeedViewer.PAGETOPMARKER_PREFIX.length+FeedViewer.WRAPPER_START_PREFIX.length,marker.id.length);
break;}}}
else
{
if(FeedViewer._lastSelectedRSSItemDiv!=null)
{
var nextFeedDivId=FeedViewer._lastSelectedRSSItemDiv.getAttribute('next');
if(nextFeedDivId.length>0)
{
var nextDiv=$(FeedViewer.FEEDTITLEPREFIX+nextFeedDivId);
nextDiv.onclick(self);
var nextNextDivId=nextDiv.getAttribute('next');
if(nextNextDivId.length>0)
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+nextNextDivId);
else
FeedViewer.gotoPageTop(FeedViewer.OUTLOOKVIEW_PAGING);}}}},
previousArticle:function(e,self)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
var markers=FeedViewer.ui_newspaperView.getElementsByTagName('input');
for(var i=3;i<markers.length-1;i+=2)
{
if(markers[i]==FeedViewer.ui_npv_selectedItemMarker||markers[i+1]==FeedViewer.ui_npv_selectedItemMarker)
{
FeedViewer.clearNewspaperItemSelection(markers[i]);
FeedViewer.selectNewspaperItem(markers[i-2]);
var marker=markers[i-2];
FeedViewer._selectedRssItemID=marker.id.substring(FeedViewer.PAGETOPMARKER_PREFIX.length+FeedViewer.WRAPPER_START_PREFIX.length,marker.id.length);
break;}}}
else
{
if(FeedViewer._lastSelectedRSSItemDiv!=null)
{
var prevFeedDivId=FeedViewer._lastSelectedRSSItemDiv.getAttribute('prev');
if(prevFeedDivId.length>0)
{
$(FeedViewer.FEEDTITLEPREFIX+prevFeedDivId).onclick(self);
var prevDiv=$(FeedViewer.FEEDTITLEPREFIX+prevFeedDivId);
prevDiv.onclick(self);
var prev2DivId=prevDiv.getAttribute('prev');
if(prev2DivId.length>0)
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+prev2DivId);}}}},
clearNewspaperItemSelection:function(marker)
{
if(marker.parentElement)
marker.parentElement.className="FeedViewer_RSSItem_Wrapper";},
selectNewspaperItem:function(marker)
{
if(marker.parentElement)
marker.parentElement.className="newspaperView_SelectedRSSItem";
FeedViewer.ui_npv_selectedItemMarker=marker;
FeedViewer.gotoPageTop(marker.id);},
resizeOutlookPane:function(e)
{
var currPos1=FeedViewer.ui_divOutlookView_RSSItemList.style.height.substring(0,FeedViewer.ui_divOutlookView_RSSItemList.style.height.length-2);
var currPos2=FeedViewer.ui_outlook_FeedDetail.style.height.substring(0,FeedViewer.ui_outlook_FeedDetail.style.height.length-2);
var newHeight1=parseInt(currPos1)+parseInt(FeedViewer.diff_y);
if(newHeight1<FeedViewer.rssItemMinHeight)
{
newHeight1=FeedViewer.rssItemMinHeight;}
else if(newHeight1>FeedViewer.rssItemMaxHeight)
{
newHeight1=FeedViewer.rssItemMaxHeight;}
var newHeight2=parseInt(currPos2)+parseInt(currPos1)-parseInt(newHeight1);
FeedViewer.ui_divOutlookView_RSSItemList.style.height=newHeight1+'px';
if(newHeight2>0)
{
if(Browser.isIE)
{
FeedViewer.ui_outlook_FeedDetail.style.height=newHeight2+'px';
FeedViewer.ui_feedViewerIframe.style.height=newHeight2+'px';}
else
{
FeedViewer.ui_outlook_FeedDetail.style.height=newHeight2+'px';
FeedViewer.ui_feedViewerIframe.style.height=newHeight2+'px';}}},
IMG_REFRESH_IDLE:"App_Themes/RssReader/refresh.gif",
IMG_REFRESH_INPROGRESS:"App_Themes/indicator2.gif",
refreshChannel:function()
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel!=null)
{
$('imgFeedRefresh').src=FeedViewer.IMG_REFRESH_INPROGRESS;
var leftPaneChannelDivId=FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channel.ID;
var div=$(leftPaneChannelDivId);
FeedViewer.updateChannel(channel.FeedSource,FeedViewer.refreshChannel2,leftPaneChannelDivId);}},
refreshChannel2:function(channelDivID)
{
var div=$(channelDivID);
if(div!=null)
FeedViewer.leftPane_channel_onClick(div);
$('imgFeedRefresh').src=FeedViewer.IMG_REFRESH_IDLE;},
loadRssReaderDiv2:function()
{
if(RC._cachedRssChannelList.length>0)
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel==null)
if(RC._cachedRssChannelList.length>0)
{
FeedViewer._selectedChannelId=RC._cachedRssChannelList[0].ID;
channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel.Feeds.length>0)
FeedViewer._selectedRssItemID=channel.Feeds[0].ID;}
FeedViewer.loadChannel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);}
else
{
FeedViewer.loadChannel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,0);}
$track('/RssReader/Show');},
hideRssCloseTooltip:function()
{
if(App.IsMySite)App.saveProfile("rssReaderCloseTooltip",'true');
$hide('rssReaderCloseTooltip');},
showRssCloseTooltip:function()
{
var closeLink=$('closeLinkRssViewer');
var closeTooltip=$('rssReaderCloseTooltip');
var pos=PU.getPosition(closeLink);
closeTooltip.style.left=(pos[0]-closeTooltip.offsetWidth)+"px";
closeTooltip.style.top='-10px';
$visible(closeTooltip);
closeTooltip.onclick=FeedViewer.hideRssCloseTooltip;
SessionTracker.activity(SessionTracker.RssReaderUsed);},
loadRssReaderDiv:function()
{
var availableWidth=document.body.offsetWidth;
if(availableWidth>1400)
{
FeedViewer.channelListMaxWidth=900;}
else if(availableWidth>1200)
{
FeedViewer.channelListMaxWidth=700;}
if(availableWidth>1000)
{
FeedViewer.channelListMaxWidth=550;}
else
{
FeedViewer.channelListMaxWidth=400;}
$ND('body');
FeedViewer.resizeRssViewer2();
FeedViewer.ui_rss_reader=$(FeedViewer.RSS_READER_ID);
if(FeedViewer.ui_rss_reader==null)
{
var bodyPos=PU.getPosition($(FeedViewer.BODY_CONTAINER));
var body=App.createPopup(FeedViewer.RSS_READER_ID,'<b>'+Lang.RSS_READER+'</b>',FeedViewer.LEFT_POS,bodyPos[1]+FeedViewer.RIGHT_POS,FeedViewer.WIDTH,"auto");
FeedViewer.ui_rss_reader=$(FeedViewer.RSS_READER_ID);
$ND(FeedViewer.ui_rss_reader);
$('handleRssViewer').onmousedown=null;
$('handleRssViewer').style.cursor="auto";
var closeLink=$('closeLinkRssViewer');
if(App.My.Profile["rssReaderCloseTooltip"]!='true')
{
MQ.add('RssReader.closeRssTooltip',200,false,FeedViewer.showRssCloseTooltip);}
closeLink.onclick=function(event)
{
FeedViewer.hideRssCloseTooltip();
$ND(FeedViewer.ui_rss_reader);
App.showAllControls();
setTimeout(RC.refreshSubscribedFlakes,100);
document.onkeyup=FeedViewer.previousonkeyupHandle;
$D('body');
PU.unblockUI();
$('blockUI').onclick=null;}
var RssFeedReaderMainDiv=$('RssFeedReaderMain');
$D(RssFeedReaderMainDiv);
body.innerHTML="";
PU.changeParent('RssFeedReaderMain',body);
FeedViewer.initializeComponent();
if(Browser.isIE)
{
FeedViewer.ui_outlook_FeedDetail.className=FeedViewer.STYLE_OUTLOOKVIEW_RSSITEMDETAIL_IE;
FeedViewer.ui_feedViewerIframe.className=FeedViewer.STYLE_OUTLOOKVIEW_IFRAME_IE;}
else
{
FeedViewer.ui_outlook_FeedDetail.className=FeedViewer.STYLE_OUTLOOKVIEW_RSSITEMDETAIL_FF;
FeedViewer.ui_feedViewerIframe.className=FeedViewer.STYLE_OUTLOOKVIEW_IFRAME_FF;}
var x=$('RssViewer');
var allDivsInReader=x.getElementsByTagName('div');
for(var i=0;i<allDivsInReader.length;i++)
{
if(allDivsInReader[i].className=="flake_placeholder")
{
allDivsInReader[i].className="";}
if(allDivsInReader[i].className=="flake_footer")
{
allDivsInReader[i].className="";
break;}}}
if(document.onkeyup)
FeedViewer.previousonkeyupHandle=document.onkeyup;
document.onkeyup=FeedViewer.onkeyup;
App.hideAllControls();
RC.CacheBookmarkedFeeds=true;
setTimeout("RC.startCachingFeeds()",10);
FeedViewer.vSpliter=$('RSSReaderVSpliter');
FeedViewer.vSpliter2=$('RSSReaderVSpliter2');
FeedViewer.hSpliter=$('RSSReaderHSpliter');
FeedViewer.hSpliter2=$('RSSReaderHSpliter2');
FeedViewer.vSpliter2.div=FeedViewer.vSpliter2;
FeedViewer.vSpliter2.drag=Drag.init(FeedViewer.vSpliter2,FeedViewer.vSpliter2);
FeedViewer.vSpliter2.onDrag=function(x,y,mx,my)
{
var vSpliterLeftEnd=FeedViewer.hSpliter.offsetLeft+FeedViewer.hSpliter.offsetWidth;
FeedViewer.vSpliter2.style.left=vSpliterLeftEnd+'px';
if(y<FeedViewer.rssItemMinHeight)
{
FeedViewer.vSpliter2.style.top=FeedViewer.rssItemMinHeight+"px";}
else if(y>FeedViewer.rssItemMaxHeight)
{
FeedViewer.vSpliter2.style.top=FeedViewer.rssItemMaxHeight+"px";}
else
{}};
FeedViewer.vSpliter2.onDragStart=function(x,y,mx,my){
FeedViewer.vSplitDragStart=true;
FeedViewer.vSplitOldTop=FeedViewer.vSpliter2.style.top.substring(0,FeedViewer.vSpliter2.style.top.length-2);};
FeedViewer.vSpliter2.onDragEnd=function(x,y){
var newTop=FeedViewer.vSpliter2.style.top.substring(0,FeedViewer.vSpliter2.style.top.length-2);
FeedViewer.diff_y=newTop-FeedViewer.vSplitOldTop;
FeedViewer.vSplitOldTop=FeedViewer.vSpliter2.style.top.substring(0,FeedViewer.vSpliter2.style.top.length-2);
FeedViewer.vSplitDragStart=false;
FeedViewer.resizeOutlookPane(null);
FeedViewer.vSpliter2.style.display="none";};
FeedViewer.hSpliter2.div=FeedViewer.hSpliter2;
FeedViewer.hSpliter2.drag=Drag.init(FeedViewer.hSpliter2,FeedViewer.hSpliter2);
FeedViewer.hSpliter2.onDrag=function(x,y,mx,my)
{
FeedViewer.hSpliter2.style.top=(FeedViewer.readingAreaTop-FeedViewer.VIEWER_TOP)+"px";
if(x<FeedViewer.channelListMinWidth)
{
FeedViewer.hSpliter2.style.left=FeedViewer.channelListMinWidth+"px";}
else if(x>FeedViewer.channelListMaxWidth)
{
FeedViewer.hSpliter2.style.left=FeedViewer.channelListMaxWidth+"px";}
else
{}};
FeedViewer.hSpliter2.onDragStart=function(x,y,mx,my)
{
FeedViewer.hSplitDragStart=true;};
FeedViewer.hSpliter2.onDragEnd=function(x,y)
{
$ND(FeedViewer.hSpliter2);
var newLeft=parseInt(FeedViewer.hSpliter2.style.left.substring(0,FeedViewer.hSpliter2.style.left.length-2))+FeedViewer.H_SPLITER_PADDING;
FeedViewer.hSplitDragStart=false;
FeedViewer.tdChannelList.style.width=(parseInt(newLeft)+6)+"px";
FeedViewer.ui_leftPane.style.width=newLeft+"px";
FeedViewer.resetLeftPaneContentLength();
FeedViewer.resetRightPaneContentLength();};
FeedViewer.resizeRssViewer();
MQ.add('FeedViewer.resizeRssViewer',200,false,FeedViewer.resizeRssViewer);
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false&&page.IsShared==false)
{
FeedViewer.ui_drpLeftPaneChangeStatus.disabled=true;
FeedViewer.ui_drpRightPaneChangeStatus.disabled=true;}
PU.blockUI();
$('blockUI').style.height="400px";
FeedViewer.ui_rss_reader.style.zIndex=$('blockUI').style.zIndex+1;
var closeLink=$('closeLinkRssViewer');
$('blockUI').onclick=closeLink.onclick;
$track('/RssReader/Show');},
resetLeftPaneContentLength:function()
{
var spaceForText=FeedViewer.ui_leftPane.offsetWidth-105;
FeedViewer.MAX_CHANNELTITLE_WIDTH=Math.round(spaceForText/7);
FeedViewer.loadLeftPane();},
resetRightPaneContentLength:function()
{
if(FeedViewer._currentViewMode!=FeedViewer.NEWSPAPER_VIEW)
{
var spaceForText=300;
try
{
if(FeedViewer._selectedChannelId>0)
spaceForText=FeedViewer.ui_divOutlookView_RSSItemList.offsetWidth;
else
spaceForText=FeedViewer.ui_divOutlookView_RSSItemList.offsetWidth-240;}catch(ex){}
FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER=Math.round(spaceForText/7);
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);}},
vSpliterOnMouseOver:function(self,e)
{
FeedViewer.hideResizeBars();
var hPos=PU.getPosition(FeedViewer.hSpliter);
var vPos=PU.getPosition(FeedViewer.vSpliter);
var articleListPos=PU.getPosition(FeedViewer.ui_divOutlookView_RSSItemList);
var vSpliterLeftEnd=FeedViewer.hSpliter.offsetLeft+FeedViewer.hSpliter.offsetWidth;
FeedViewer.vSpliter2.style.left=vSpliterLeftEnd+'px';
FeedViewer.vSpliter2.style.top=(articleListPos[1]+articleListPos[3]-FeedViewer.V_SPLITER_PADDING-FeedViewer.VIEWER_TOP)+"px";
FeedViewer.vSpliter2.style.width=articleListPos[2]+'px';
$D(FeedViewer.vSpliter2);},
vSpliter2OnMouseOut:function()
{
if(FeedViewer.vSplitDragStart!=true)
FeedViewer.vSpliter2.style.display='none';},
hSpliterOnMouseOver:function(self,e)
{
FeedViewer.hideResizeBars();
var hPos=PU.getPosition(FeedViewer.hSpliter);
FeedViewer.hSpliter2.style.left=hPos[0]-FeedViewer.H_SPLITER_PADDING+"px";
FeedViewer.hSpliter2.style.height=FeedViewer.ui_leftPane.style.height;
$D(FeedViewer.hSpliter2);},
hSpliter2OnMouseOut:function()
{
if(FeedViewer.hSplitDragStart!=true)
FeedViewer.hSpliter2.style.display='none';},
hideResizeBars:function()
{
$ND(FeedViewer.hSpliter2);
$ND(FeedViewer.vSpliter2);},
leftPane_channel_onClick:function(self)
{
if(FeedViewer._lastSelectedLeftPaneItemDiv!=null)
{
var tmp=$(FeedViewer._lastSelectedLeftPaneItemDiv.id);
if(tmp)
{
tmp.className=FeedViewer.STYLE_CH_NOTSELECTED;}}
FeedViewer._selectedChannelId=self.id.substring(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX.length,self.id.length);
self.className=FeedViewer.STYLE_CH_SELECTED;
FeedViewer.ui_allChannelsWrapper.className=FeedViewer.STYLE_ALLNOTSELECTED;
if(FeedViewer._selectedChannelId>0)
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel.Feeds.length>0)
{
FeedViewer._selectedRssItemID=channel.Feeds[0].ID;
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);
FeedViewer.setChannelHeaderText(self,FeedViewer._selectedChannelId,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);}
else
{
FeedViewer._selectedRssItemID=0;
FeedViewer.ui_outlook_FeedDetail.innerHTML="";
FeedViewer.ui_divOutlookView_RSSItemList.innerHTML='<div style="margin-left:2px;padding:5px;">'+Lang.DOWNLOADING+'</div>';
FeedViewer.updateChannel(channel.FeedSource,null,null);}}
FeedViewer._lastSelectedLeftPaneItemDiv=self;
FeedViewer.refreshAllFeedUnreadCount();
FeedViewer.resetRightPaneContentLength();},
updateChannel:function(url,callback,callbackParam)
{
RssServices.GetRSSChannel3(url,true,0,FeedViewer.DEFAULT_PAGE_SIZE,function(result)
{
if(result!=null)
{
RC.updateCachedRssChannel(result,true);
if(FeedViewer._selectedChannelId==result.ID)
{
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);
FeedViewer.setChannelHeaderText(self,result.ID,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);
var rssItemRow=$(FeedViewer.FEEDTITLEPREFIX+FeedViewer._selectedRssItemID);
if(rssItemRow!=null)
rssItemRow.onclick(null,rssItemRow);
FeedViewer.refreshAllFeedUnreadCount();
if(callback!=null)
callback(callbackParam);}}
else
{
alert("Failed to download feed from '"+url+"'");}});},
leftPane_channel_onMouseOut:function(self)
{
var channelID=self.id.substring(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX.length,self.id.length);
if(FeedViewer._selectedChannelId!=channelID)
self.className=FeedViewer.STYLE_CH_NOTSELECTED;
else
self.className=FeedViewer.STYLE_CH_SELECTED;},
leftPane_allFeedsChannel_onClick:function(self)
{
FeedViewer._selectedChannelId=FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID;
if(FeedViewer._lastSelectedLeftPaneItemDiv!=null)
{
var tmp=$(FeedViewer._lastSelectedLeftPaneItemDiv.id);
if(tmp!=null)
tmp.className=FeedViewer.STYLE_CH_NOTSELECTED;}
self.className=FeedViewer.STYLE_CH_SELECTED;
FeedViewer.ui_allChannelsWrapper.className=FeedViewer.STYLE_ALLSELECTED;
FeedViewer._selectedRssItemID=0;
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);
FeedViewer._lastSelectedLeftPaneItemDiv=self;
FeedViewer.refreshAllFeedUnreadCount();
FeedViewer.resetRightPaneContentLength();},
leftPane_allFeedsChannel_onMouseOut:function(self)
{
if(FeedViewer._selectedChannelId!=FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
self.className=FeedViewer.STYLE_CH_NOTSELECTED;
else
self.className=FeedViewer.STYLE_CH_SELECTED;},
leftPane_savedChannel_onClick:function(self)
{
FeedViewer._selectedChannelId=FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID;
if(FeedViewer._lastSelectedLeftPaneItemDiv!=null)
if(FeedViewer._lastSelectedLeftPaneItemDiv.id!=null&&FeedViewer._lastSelectedLeftPaneItemDiv.id.length>0)
$(FeedViewer._lastSelectedLeftPaneItemDiv.id).className=FeedViewer.STYLE_CH_NOTSELECTED;
self.className=FeedViewer.STYLE_CH_SELECTED;
FeedViewer.ui_allChannelsWrapper.className=FeedViewer.STYLE_ALLNOTSELECTED;
if(RC._savedRSSItemChannel==null)
{
alert('Saved articles not yet loaded');
return;}
if(RC._savedRSSItemChannel.Feeds.length>0)
{
var tmpFeedList=RC._savedRSSItemChannel.Feeds.slice();
FeedViewer.sortFeedList(tmpFeedList,false);
FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,tmpFeedList[0].ID);}
else
FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,0);
FeedViewer._lastSelectedLeftPaneItemDiv=self;
FeedViewer.refreshAllFeedUnreadCount();
FeedViewer.resetRightPaneContentLength();},
leftPane_savedChannel_onMouseOut:function(self)
{
if(FeedViewer._selectedChannelId!=FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
self.className=FeedViewer.STYLE_CH_NOTSELECTED;
else
self.className=FeedViewer.STYLE_CH_SELECTED;},
getChannelIconHTML:function(isRead,allowDelete,channelId)
{
var id='';
var className=' class="'+FeedViewer.CSS_CHANNEL_ICON+'"';
var onclick='';
var onMouseOver='';
var onMouseOut='';
if(channelId!=null&&channelId!=undefined)
{
id=' id="btnDelete"'+channelId+'"';}
if(isRead)
className=' class="'+FeedViewer.CSS_CHANNEL_ICON_READ+'"';
else
className=' class="'+FeedViewer.CSS_CHANNEL_ICON+'"';
if(allowDelete)
{
onMouseOver=' onmouseover="FeedViewer.showChannelDelete(this);"';
onMouseOut=' onmouseout="FeedViewer.hideChannelDelete(this, '+isRead+');"';
onclick=' onclick="FeedViewer.deleteChannel('+channelId+', this, event);"';}
html='<div '+id+className+onclick+onMouseOver+onMouseOut+'></div>';
return html;},
deleteChannel:function(channelId,self,e)
{
var channel=RC.getCachedRssChannel(channelId);
if(channel!=null)
{
if(confirm(Lang.SURE_REMOVE_+channel.Title+Lang._NO_UNDO))
{
RssServices.Unsubscribe(channel.FeedSource,function()
{
FeedViewer.removeRssFlake(channel.FeedSource);});
var divRef=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channelId);
var divToSelect=null;
if(FeedViewer._selectedChannelId==channel.ID)
{
var channelToSelectAfterDelete=divRef.getAttribute('prev');
if(channelToSelectAfterDelete!=null&&channelToSelectAfterDelete!=FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID&&channelToSelectAfterDelete.length>0)
{
divToSelect=$(channelToSelectAfterDelete);
if(divToSelect==null)
{
channelToSelectAfterDelete=divRef.getAttribute('next');
if(channelToSelectAfterDelete!=null||channelToSelectAfterDelete.length>0)
{
divToSelect=$(channelToSelectAfterDelete);
if(divToSelect==null)
{
if(RC._cachedRssChannelList.length>0)
{
var channelId=RC._cachedRssChannelList[0].ID;
channelToSelectAfterDelete=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channelId);}}}}}
var failedToSelect=false;
if(divToSelect!=null)
{
divToSelect.onclick();}
else
{
failedToSelect=true;}
if(failedToSelect)
{
var allFeedsDiv=$(FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID);
if(allFeedsDiv!=null)
{
setTimeout(allFeedsDiv.onclick,50);}}}}
if(divRef)
{
divRef.parentNode.removeChild(divRef);}}
$stopBubble(e);},
removeRssFlake:function(url)
{
var pageCount=App.pages.length;
var selectedModules=new Array();
var index=0;
for(var i=0;i<pageCount;i++)
{
var moduleCount=App.pages[i].modules.length;
for(var j=0;j<moduleCount;j++)
{
if(App.pages[i].modules[j].url.indexOf('__RSSFEED')>-1)
{
if(App.pages[i].modules[j].url.indexOf(url)>0||unescape(App.pages[i].modules[j].url).indexOf(url)>0)
{
var moduleId=App.pages[i].modules[j].id;
selectedModules[index++]=App.pages[i].modules[moduleId];}}}}
var moduleInstance=null;
for(var i=0;i<selectedModules.length;i++)
{
selectedModules[i].close(true);}},
showChannelDelete:function(self)
{
self.className=FeedViewer.CSS_CHANNEL_DELETE;},
hideChannelDelete:function(self,isRead)
{
if(isRead)
self.className=FeedViewer.CSS_CHANNEL_ICON_READ;
else
self.className=FeedViewer.CSS_CHANNEL_ICON;},
loadLeftPane:function()
{
var content=new Sys.StringBuilder("");
var unReadCount=0;
var totalCount=0;
var savedFeedTitle='';
var channelIcon=FeedViewer.getChannelIconHTML(false,false);
if(RC._savedRSSItemChannel!=null)
{
unReadCount=FeedViewer.getUnreadCount(RC._savedRSSItemChannel);
totalCount=RC._savedRSSItemChannel.Feeds.length;
if(totalCount>0&&unReadCount>0)
savedFeedTitle=FeedViewer.getFormatedChannelInfo(Lang.MY_SAVED_ARTICLES,unReadCount+'/'+totalCount,true);
else if(totalCount>0&&unReadCount==0)
savedFeedTitle=FeedViewer.getFormatedChannelInfo(Lang.MY_SAVED_ARTICLES,unReadCount+'/'+totalCount,false);
else
savedFeedTitle=Lang.MY_SAVED_ARTICLES;}
else
{
savedFeedTitle=Lang.MY_SAVED_ARTICLES;
channelIcon=FeedViewer.getChannelIconHTML(true,false);}
content.append('<div id="'+FeedViewer.LEFTPANE_SAVEDCHANNEL_ID+'" onclick="FeedViewer.leftPane_savedChannel_onClick(this);"'+'" prev="" '+'" next="'+FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID+'" '+
(FeedViewer._selectedChannelId!=-2?' class="'+FeedViewer.STYLE_CH_NOTSELECTED+'"':' class="'+FeedViewer.STYLE_CH_SELECTED+'"')+'>'+channelIcon);
if(unReadCount>0)
content.append('<b>'+savedFeedTitle+'</b>');
else
content.append(savedFeedTitle);
content.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_SAVEDCHANNEL_ID));
content.append('</div>');
content.append('<div id="'+FeedViewer.ALL_CHANNELS_WRAPPER_ID+'"'+
(FeedViewer._selectedChannelId!=-1?' class="'+FeedViewer.STYLE_ALLNOTSELECTED+'"':' class="'+FeedViewer.STYLE_ALLSELECTED+'"')+'>');
var allUnReadCount=FeedViewer.getAllUnreadCount();
var allFeedsTitle=Lang.ALL_FEEDS;
var channelIcon=FeedViewer.getChannelIconHTML(false,false);
if(allUnReadCount>0)
allFeedsTitle=FeedViewer.getFormatedChannelInfo(Lang.ALL_FEEDS,allUnReadCount);
else
channelIcon=FeedViewer.getChannelIconHTML(true,false);
var firstChannelDivId='';
if(RC._cachedRssChannelList.length>0)
firstChannelDivId=FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+RC._cachedRssChannelList[0].ID;
content.append('<div id="'+FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID+'" '+'" onclick="FeedViewer.leftPane_allFeedsChannel_onClick(this);"'+'" prev="'+FeedViewer.LEFTPANE_SAVEDCHANNEL_ID+'" '+'" next="'+firstChannelDivId+'" '+
(FeedViewer._selectedChannelId!=-1?' class="'+FeedViewer.STYLE_CH_NOTSELECTED+'"':' class="'+FeedViewer.STYLE_CH_SELECTED+'"')
+'>'+channelIcon);
if(allUnReadCount>0)
content.append('<b>'+allFeedsTitle+'</b>');
else
content.append(allFeedsTitle);
content.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID));
content.append('</div>');
var len=RC._cachedRssChannelList.length;
for(var i=0;i<len;i++)
{
var channel=RC._cachedRssChannelList[i];
var unRead=FeedViewer.getUnreadCount(channel);
var channelTitle=channel.Title;
var channelIcon=FeedViewer.getChannelIconHTML(false,true,channel.ID);
if(unRead>0)
{
channelTitle=FeedViewer.getFormatedChannelInfo(channel.Title,unRead,true);}
else
{
channelTitle=FeedViewer.getFormatedChannelInfo(channel.Title,'',false);
channelIcon=FeedViewer.getChannelIconHTML(true,true,channel.ID);}
var next="";
var prev="";
if(i>0)
prev=FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+RC._cachedRssChannelList[i-1].ID;
else
{
prev=FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID}
if(i<len-1)
next=FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+RC._cachedRssChannelList[i+1].ID;
content.append('<div id="'+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channel.ID+'" onclick="FeedViewer.leftPane_channel_onClick(this);"'+'" prev="'+prev+'"'+'" next="'+next+'"'+'" style="padding-left:20px;"'+
(FeedViewer._selectedChannelId!=channel.ID?' class="'+FeedViewer.STYLE_CH_NOTSELECTED+'"':' class="'+FeedViewer.STYLE_CH_SELECTED+'"')
+'>'+channelIcon);
content.append(channelTitle);
content.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channel.ID));
content.append('</div>');}
content.append('<div>');
FeedViewer.ui_leftPane.innerHTML=content.toString();
FeedViewer._savedRssItemsChannelDiv=$(FeedViewer.LEFTPANE_SAVEDCHANNEL_ID);
FeedViewer._allFeedsRssItemsChannelDiv=$(FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID);
FeedViewer.ui_allChannelsWrapper=$(FeedViewer.ALL_CHANNELS_WRAPPER_ID);
if(FeedViewer._selectedChannelId>0)
FeedViewer._lastSelectedLeftPaneItemDiv=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+FeedViewer._selectedChannelId);
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
FeedViewer._lastSelectedLeftPaneItemDiv=FeedViewer._savedRssItemsChannelDiv;
else
FeedViewer._lastSelectedLeftPaneItemDiv=FeedViewer._allFeedsRssItemsChannelDiv;},
sortCachedRssChannelList:function()
{
var x,y,holder;
for(x=0;x<RC._cachedRssChannelList.length;x++)
{
for(y=0;y<(RC._cachedRssChannelList.length-1-x);y++)
{
if(FeedViewer.ui_drpLeftPaneSortOption.value=='TitleDesc')
{
if(RC._cachedRssChannelList[y].Title.toLowerCase()<RC._cachedRssChannelList[y+1].Title.toLowerCase())
{
holder=RC._cachedRssChannelList[y+1];
RC._cachedRssChannelList[y+1]=RC._cachedRssChannelList[y];
RC._cachedRssChannelList[y]=holder;}}
else if(FeedViewer.ui_drpLeftPaneSortOption.value=='CountDesc')
{
if(RC._cachedRssChannelList[y].UnreadCount<RC._cachedRssChannelList[y+1].UnreadCount)
{
holder=RC._cachedRssChannelList[y+1];
RC._cachedRssChannelList[y+1]=RC._cachedRssChannelList[y];
RC._cachedRssChannelList[y]=holder;}}
else
{
if(RC._cachedRssChannelList[y].Title.toLowerCase()>RC._cachedRssChannelList[y+1].Title.toLowerCase())
{
holder=RC._cachedRssChannelList[y+1];
RC._cachedRssChannelList[y+1]=RC._cachedRssChannelList[y];
RC._cachedRssChannelList[y]=holder;}}}}
FeedViewer.loadLeftPane();},
sortFeedList:function(feedList,isAsc)
{
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
RC.sortFeedList2(feedList,isAsc);}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
RC.sortFeedList2(feedList,isAsc);}
else
{
RC.sortFeedList(feedList,isAsc);}},
loadChannel:function(channelId,rssItemId)
{
scroll(0,0);
FeedViewer.loadRssReaderDiv();
if(RC._savedRSSItemChannel==null)
RC.cacheAllSavedRssItem();
FeedViewer._selectedChannelId=channelId;
FeedViewer._selectedRssItemID=rssItemId;
FeedViewer.loadLeftPane();
FeedViewer.loadRightPanel(channelId,rssItemId);
var channel=RC.getCachedRssChannel(channelId);
if(channel!=null)
{
if(channel.Feeds.length<FeedViewer.DEFAULT_PAGE_SIZE)
if(channel.FeedSource!=null)
FeedViewer.updateChannel(channel.FeedSource,null,null);
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+channel.ID);
var rssItemRow=$(FeedViewer.FEEDTITLEPREFIX+FeedViewer._selectedRssItemID);
if(FeedViewer._currentViewMode!=FeedViewer.NEWSPAPER_VIEW&&rssItemId!=0)
{
var nextNextDivId=$(FeedViewer.FEEDTITLEPREFIX+rssItemId).getAttribute('next');
if(nextNextDivId.length>0)
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+nextNextDivId);
else
FeedViewer.gotoPageTop(FeedViewer.OUTLOOKVIEW_PAGING);}}
$D(FeedViewer.ui_rss_reader);},
loadRightPanel2:function()
{
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);},
loadRightPanel:function(channelId,rssItemId)
{
if(rssItemId>0)
FeedViewer._selectedRssItemID=rssItemId;
else
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel!=null)
if(channel.Feeds.length>0)
FeedViewer._selectedRssItemID=channel.Feeds[0].ID;}
FeedViewer._selectedChannelId=channelId;
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.loadAllFeedsInNewspaperView();}
else
{
FeedViewer.loadAllFeedsInOutlookView(true);}}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.loadAllSavedFeedsInNewspaperView();}
else
{
FeedViewer.loadAllSavedFeedsInOutlookView();}}
else
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(channel==null)
{
return;}
else if(channel.Feeds.length>0)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.showNewspaperView();}
else
{
FeedViewer.showOutlookView();}}
else
{
FeedViewer.ui_divOutlookView_RSSItemList.innerHTML="<div style='padding:5px;'>Loading...</div>";
FeedViewer.ui_outlook_FeedDetail.innerHTML="";
RssServices.GetRSSChannel3(channel.FeedSource,false,0,FeedViewer.DEFAULT_PAGE_SIZE,function(result)
{
RC.updateCachedRssChannel(result,false);
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.showNewspaperView();}
else
{
FeedViewer.showOutlookView();}});}}},
loadAllFeedsInOutlookView:function(rebuildCachedList)
{
FeedViewer.enableHotkeys=true;
var commonChannel=new Object();
commonChannel.ID=FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID;
commonChannel.Feeds=new Array();
if((FeedViewer._allFeedItems==null)||rebuildCachedList)
{
FeedViewer._allFeedCurrentIndex=0;
var index=commonChannel.Feeds.length;
var length=RC._cachedRssChannelList.length;
for(var i=0;i<length;i++)
{
var channel=RC._cachedRssChannelList[i];
for(var j=0;j<channel.Feeds.length;j++)
{
commonChannel.Feeds[index++]=channel.Feeds[j];}}
var drpRightPaneSort=$('FeedViewer_drpRightPaneSortOption');
FeedViewer._allFeedItems=commonChannel.Feeds.slice();
if(drpRightPaneSort.value==FeedViewer.SORT_ORDER_ASC)
FeedViewer.sortFeedList(FeedViewer._allFeedItems,true);
else
FeedViewer.sortFeedList(FeedViewer._allFeedItems,false);}
var endIndex=FeedViewer._allFeedCurrentIndex+FeedViewer.OUTLOOK_VIEW_PAGESIZE;
if(endIndex>FeedViewer._allFeedItems.length)
endIndex=FeedViewer._allFeedItems.length;
commonChannel.Feeds=FeedViewer._allFeedItems.slice(FeedViewer._allFeedCurrentIndex,endIndex);
if(FeedViewer._selectedRssItemID==0)
if(commonChannel.Feeds.length>0)
FeedViewer._selectedRssItemID=commonChannel.Feeds[0].ID;
FeedViewer.renderOutlookView(commonChannel);
var wrapper=$$('div');
wrapper.appendChild(FeedViewer.createMarker('Navigation'));
wrapper.className='outlookView_Navigation';
if(FeedViewer._allFeedCurrentIndex>0)
{
var prev=$$('a');
prev.innerHTML=Lang.PREVIOUS2+FeedViewer.SPC+FeedViewer.SPC;
prev.onclick=function()
{
FeedViewer.loadAllFeedsInOutlookView_prev();}
wrapper.appendChild(prev);}
if(FeedViewer._allFeedItems.length>FeedViewer._allFeedCurrentIndex+FeedViewer.OUTLOOK_VIEW_PAGESIZE)
{
var next=$$('a');
next.innerHTML=Lang.NEXT2;
next.id="lnkLoadNextFeeds";
next.onclick=function()
{
FeedViewer.loadAllFeedsInOutlookView_next();}
wrapper.appendChild(next);}
wrapper.style.paddingLeft="10px";
wrapper.className="outlookView_Navigation";
FeedViewer.ui_divOutlookView_RSSItemList.appendChild(wrapper);
FeedViewer.gotoPageTop(FeedViewer.outlookRssItemListTopMarker);},
loadAllFeedsInOutlookView_next:function()
{
if(FeedViewer._allFeedItems.length>FeedViewer._allFeedCurrentIndex+FeedViewer.OUTLOOK_VIEW_PAGESIZE)
{
FeedViewer._allFeedCurrentIndex+=FeedViewer.OUTLOOK_VIEW_PAGESIZE;
FeedViewer.loadAllFeedsInOutlookView(false);}},
loadAllFeedsInOutlookView_prev:function()
{
if(FeedViewer._allFeedCurrentIndex>0)
{
FeedViewer._allFeedCurrentIndex-=FeedViewer.OUTLOOK_VIEW_PAGESIZE;
FeedViewer.loadAllFeedsInOutlookView(false);}},
loadAllFeedsInNewspaperView:function()
{
FeedViewer.markFirstItemSelected=true;
if(RC._cachedRssChannelList.length>0)
{
var commonChannel=new Object();
commonChannel.Feeds=new Array();
var index=commonChannel.Feeds.length;
var length=RC._cachedRssChannelList.length;
for(var i=0;i<length;i++)
{
var channel=RC._cachedRssChannelList[i];
for(var j=0;j<channel.Feeds.length;j++)
{
commonChannel.Feeds[index++]=channel.Feeds[j];}}
FeedViewer.newspaper_currentPageIndex=0;
FeedViewer.renderNewspaperView(commonChannel);}},
loadAllSavedFeedsInOutlookView:function()
{
if(RC._savedRSSItemChannel==null)
{
RssServices.GetSavedRssItems(function(result)
{
FeedViewer.renderOutlookView(result);
FeedViewer.refreshSavedRssItemChannelTitle();});}
else
{
FeedViewer.renderOutlookView(RC._savedRSSItemChannel);
FeedViewer.refreshSavedRssItemChannelTitle();}},
loadAllSavedFeedsInNewspaperView:function()
{
if(RC._savedRSSItemChannel==null)
{
RssServices.GetSavedRssItems(function(result)
{
FeedViewer.newspaper_currentPageIndex=0;
FeedViewer.renderNewspaperView(result);
FeedViewer.refreshSavedRssItemChannelTitle();});}
else
{
FeedViewer.newspaper_currentPageIndex=0;
FeedViewer.renderNewspaperView(RC._savedRSSItemChannel);
FeedViewer.refreshSavedRssItemChannelTitle();}},
setToolbarSettings:function()
{
if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_RSS)
{
FeedViewer.ui_toolbar_ShowOutlookView.className=FeedViewer.OUTLOOK_ON;
FeedViewer.ui_toolbar_ShowNewspaperView.className=FeedViewer.NEWSPAPER_OFF;
FeedViewer.ui_toolbar_ShowRSSView.className=FeedViewer.RSS_ON;
FeedViewer.ui_toolbar_ShowWebsiteView.className=FeedViewer.WEBSITE_OFF;}
else if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_WEBSITE)
{
FeedViewer.ui_toolbar_ShowOutlookView.className=FeedViewer.OUTLOOK_ON;
FeedViewer.ui_toolbar_ShowNewspaperView.className=FeedViewer.NEWSPAPER_OFF;
FeedViewer.ui_toolbar_ShowRSSView.className=FeedViewer.RSS_OFF;
FeedViewer.ui_toolbar_ShowWebsiteView.className=FeedViewer.WEBSITE_ON;}
else if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.ui_toolbar_ShowOutlookView.className=FeedViewer.OUTLOOK_OFF;
FeedViewer.ui_toolbar_ShowNewspaperView.className=FeedViewer.NEWSPAPER_ON;
FeedViewer.ui_toolbar_ShowRSSView.className=FeedViewer.RSS_ON;
FeedViewer.ui_toolbar_ShowWebsiteView.className=FeedViewer.WEBSITE_DISABLED;}},
showNewspaperView:function()
{
FeedViewer.enableHotkeys=true;
FeedViewer.removeAllOptions(FeedViewer.ui_drpRightPaneChangeStatus);
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK,'');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK_ALL_ARTICLES_READ,'allread');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK_ALL_ARTICLES_UNREAD,'allunread');
FeedViewer._currentViewMode=FeedViewer.NEWSPAPER_VIEW;
if(FeedViewer._selectedChannelId>0)
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
FeedViewer.newspaper_currentPageIndex=0;
if(FeedViewer._selectedRssItemID==0)
if(channel.Feeds.length>0)
$FeedViewer._selectedRssItemID=channel.Feeds[0].ID;
FeedViewer.renderNewspaperView(channel);}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
FeedViewer.markFirstItemSelected=true;
FeedViewer.loadAllFeedsInNewspaperView();}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
FeedViewer.markFirstItemSelected=true;
FeedViewer.loadAllSavedFeedsInNewspaperView();}
FeedViewer.setToolbarSettings();
$track('/RssReader/Newspaper');},
renderNewspaperView:function(channel)
{
var prevHtml='';
var nextHtml='';
$ND(FeedViewer.ui_outlookView);
$D('divNewspaperView');
$ND('divForwardFeed');
FeedViewer.ui_newspaperView.innerHTML='';
var allNewspaperItems=$$('div');
allNewspaperItems.id="allNewspaperItems";
FeedViewer.rssNewspaperTopMarker=FeedViewer.getPageTopMarker();
allNewspaperItems.appendChild(FeedViewer.rssNewspaperTopMarker);
var tmpFeedList=channel.Feeds.slice();
if(FeedViewer.ui_drpRightPaneSortOption.value==FeedViewer.SORT_ORDER_ASC)
FeedViewer.sortFeedList(tmpFeedList,true);
else
FeedViewer.sortFeedList(tmpFeedList,false);
FeedViewer.ref_allNewspaperItems=tmpFeedList;
var tmpStartMarker=null;
var tmpEndMarker=null;
if(tmpFeedList.length>=FeedViewer.NEWSPAPER_VIEW_PAGESIZE)
{
var end=FeedViewer.newspaper_currentPageIndex+FeedViewer.NEWSPAPER_VIEW_PAGESIZE;
if(end>tmpFeedList.length)
end=tmpFeedList.length;
for(var i=FeedViewer.newspaper_currentPageIndex;i<end;i++)
{
if(tmpFeedList[i].ID==FeedViewer._selectedRssItemID||FeedViewer.markFirstItemSelected)
{
var itemDiv=FeedViewer.getHtmlForRssItem(tmpFeedList[i],true);
tmpEndMarker=FeedViewer.getObjectMarker(itemDiv,true);
tmpStartMarker=FeedViewer.getObjectMarker(itemDiv,false);
allNewspaperItems.appendChild(itemDiv,false);
FeedViewer.markFirstItemSelected=false;
FeedViewer._selectedRssItemID=tmpFeedList[i].ID;}
else
{
allNewspaperItems.appendChild(FeedViewer.getHtmlForRssItem(tmpFeedList[i],true));}}
nextHtml='<a id="lnkNewspaperView_loadNextPage" href="javascript:void(0);" onclick="FeedViewer.newspaperView_nextPage();">'+Lang.NEXT2+' '+FeedViewer.NEWSPAPER_VIEW_PAGESIZE+' > </a>';
if(FeedViewer.newspaper_currentPageIndex>0)
prevHtml='<a href="javascript:void(0);" onclick="FeedViewer.newspaperView_prevPage();"> < '+Lang.PREVIOUS2+' '+FeedViewer.NEWSPAPER_VIEW_PAGESIZE+'</a>';}
else
{
for(var i=0;i<tmpFeedList.length;i++)
if(tmpFeedList[i].ID==FeedViewer._selectedRssItemID||FeedViewer.markFirstItemSelected)
{
var itemDiv=FeedViewer.getHtmlForRssItem(tmpFeedList[i],true);
tmpEndMarker=FeedViewer.getObjectMarker(itemDiv,true);
tmpStartMarker=FeedViewer.getObjectMarker(itemDiv,false);
allNewspaperItems.appendChild(itemDiv,false);
FeedViewer.markFirstItemSelected=false;
FeedViewer._selectedRssItemID=tmpFeedList[i].ID}
else
{
allNewspaperItems.appendChild(FeedViewer.getHtmlForRssItem(tmpFeedList[i],true));}}
var navigationDiv=$$('div');
navigationDiv.innerHTML='<table style="width:96%"><tr><td style="width:40%">&nbsp;'+prevHtml
+'</td><td style="width:30%" align="center">&nbsp;</td><td align="right">&nbsp;'+nextHtml+'</td></tr></table>';
FeedViewer.ui_newspaperView.appendChild(allNewspaperItems);
FeedViewer.ui_newspaperView.appendChild(navigationDiv);
try
{
FeedViewer.selectNewspaperItem(tmpEndMarker);
FeedViewer.selectNewspaperItem(tmpStartMarker);}
catch(ex)
{
FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker);}},
newspaperView_MarkAllRead:function()
{
FeedViewer.newspaperView_UpdateAllReadStatus(true);},
newspaperView_MarkAllUnRead:function()
{
FeedViewer.newspaperView_UpdateAllReadStatus(false);},
newspaperView_UpdateAllReadStatus:function(isRead)
{
var lnk=$('newspaperView_UpdateAllReadStatus');
var end=FeedViewer.newspaper_currentPageIndex+FeedViewer.NEWSPAPER_VIEW_PAGESIZE;
if(end>FeedViewer.ref_allNewspaperItems.length)
end=FeedViewer.ref_allNewspaperItems.length;
var index=0;
var feedsToUpdate=new Array();
if(FeedViewer._selectedChannelId==-1)
{
for(var i=FeedViewer.newspaper_currentPageIndex;i<end;i++)
{
FeedViewer.ref_allNewspaperItems[i].IsRead=isRead;
feedsToUpdate[index++]=FeedViewer.ref_allNewspaperItems[i];
var rssChannelInCache=RC.getCachedRssChannel(FeedViewer.ref_allNewspaperItems[i].ChannelID);
var len=rssChannelInCache.Feeds.length;
for(var j=0;j<len;j++)
{
if(rssChannelInCache.Feeds[j].ID==FeedViewer.ref_allNewspaperItems[i].ID)
rssChannelInCache.Feeds[j].IsRead=isRead;}}
FeedViewer.loadLeftPane();
RssServices.ChangeRSSItemReadStatus3(feedsToUpdate);}
else if(FeedViewer._selectedChannelId==-2)
{
var rssItemIds=new Array();
for(var i=FeedViewer.newspaper_currentPageIndex;i<end;i++)
{
rssItemIds[index++]=FeedViewer.ref_allNewspaperItems[i].ID;
for(var j=0;j<RC._savedRSSItemChannel.Feeds.length;j++)
{
if(RC._savedRSSItemChannel.Feeds[j].ID==FeedViewer.ref_allNewspaperItems[i].ID)
{
RC.updateSavedRssItemList(RC._savedRSSItemChannel.Feeds[i].ID,isRead);
break;}}}
FeedViewer.refreshSavedRssItemChannelTitle();}
else
{
var rssItemIds=new Array();
var rssChannelInCache=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
var len=rssChannelInCache.Feeds.length;
for(var i=FeedViewer.newspaper_currentPageIndex;i<end;i++)
{
rssItemIds[index++]=FeedViewer.ref_allNewspaperItems[i].ID;
for(var j=0;j<len;j++)
{
if(rssChannelInCache.Feeds[j].ID==FeedViewer.ref_allNewspaperItems[i].ID)
{
rssChannelInCache.Feeds[j].IsRead=isRead;
break;}}}
RssServices.ChangeRSSItemReadStatus2(FeedViewer._selectedChannelId,rssItemIds,isRead);}
FeedViewer.refreshChannelTitles(FeedViewer._selectedChannelId);
var dummyChannel=new Object();
dummyChannel.Feeds=FeedViewer.ref_allNewspaperItems;
FeedViewer.renderNewspaperView(dummyChannel);},
refreshChannelTitles:function(channelId)
{
FeedViewer.refreshAllFeedUnreadCount();
eval('channelDiv = $("lnk'+channelId+'");');
if(channelDiv!=null)
FeedViewer.setChannelHeaderText(channelDiv,channelId,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);},
newspaperView_prevPage:function()
{
FeedViewer.markFirstItemSelected=true;
if(FeedViewer.newspaper_currentPageIndex>0)
FeedViewer.newspaper_currentPageIndex=FeedViewer.newspaper_currentPageIndex-FeedViewer.NEWSPAPER_VIEW_PAGESIZE;
var channel=new Object();
channel.Feeds=FeedViewer.ref_allNewspaperItems;
FeedViewer.renderNewspaperView(channel);
FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker);},
newspaperView_nextPage:function()
{
FeedViewer.markFirstItemSelected=true;
if(FeedViewer.newspaper_currentPageIndex+FeedViewer.NEWSPAPER_VIEW_PAGESIZE<FeedViewer.ref_allNewspaperItems.length)
{
FeedViewer.newspaper_currentPageIndex=FeedViewer.newspaper_currentPageIndex+FeedViewer.NEWSPAPER_VIEW_PAGESIZE;
var channel=new Object();
channel.Feeds=FeedViewer.ref_allNewspaperItems;
FeedViewer.renderNewspaperView(channel);}
else if(FeedViewer._selectedChannelId>0)
{
var lnkNewspaperViewNextPage=$('lnkNewspaperView_loadNextPage');
T(lnkNewspaperViewNextPage,Lang.DOWNLOADING);
lnkNewspaperViewNextPage.disabled=true;
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
RssServices.GetRSSChannel3(channel.FeedSource,false,channel.Feeds.length,FeedViewer.DEFAULT_PAGE_SIZE,function(result)
{
RC.updateCachedRssChannel(result,false);
if(result.Feeds.length>0)
{
var updatedChannel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
FeedViewer.refreshAllFeedUnreadCount();
var channelDiv=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+result.ID);
if(channelDiv!=null)
FeedViewer.setChannelHeaderText(channelDiv,result.ID,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);
FeedViewer.newspaper_currentPageIndex=FeedViewer.newspaper_currentPageIndex+FeedViewer.NEWSPAPER_VIEW_PAGESIZE;
T($('lnkNewspaperView_loadNextPage'),Lang.NEXT);
FeedViewer.renderNewspaperView(channel);}
else
{
$ND('lnkNewspaperView_loadNextPage');}});}
else
{
$ND('lnkNewspaperView_loadNextPage');}
FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker);},
showRSSView:function()
{
if(FeedViewer._currentViewMode!=FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer._currentViewMode=FeedViewer.OUTLOOK_VIEW_RSS;
FeedViewer.showOutlookView();}},
loadSiteInWebSiteView:function(link)
{
$ND(FeedViewer.ui_outlook_FeedDetail);
$D(FeedViewer.ui_feedViewerIframe);
FeedViewer.ui_feedViewerIframe.src='about:blank';
if(link!=null||link.length>0)
setTimeout("FeedViewer.ui_feedViewerIframe.src = '"+link+"'",10);},
showWebsiteView:function()
{
if(FeedViewer._currentViewMode!=FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer._currentViewMode=FeedViewer.OUTLOOK_VIEW_WEBSITE;
FeedViewer.showOutlookView();
var rssItem=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,FeedViewer._selectedChannelId);
$ND(FeedViewer.ui_outlook_FeedDetail);
$D(FeedViewer.ui_feedViewerIframe);
if(rssItem!=null)
FeedViewer.loadSiteInWebSiteView(rssItem.Link);}},
showOutlookView:function()
{
FeedViewer.enableHotkeys=true;
FeedViewer.removeAllOptions(FeedViewer.ui_drpRightPaneChangeStatus);
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK,'');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK_ALL_ARTICLES_READ,'allread');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.MARK_ALL_ARTICLES_UNREAD,'allunread');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.SELECTED_ARTICLES_READ,'read');
FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus,Lang.SELECTED_ARTICLES_UNREAD,'unread');
if(FeedViewer._currentViewMode!=FeedViewer.OUTLOOK_VIEW_WEBSITE)
FeedViewer._currentViewMode=FeedViewer.OUTLOOK_VIEW_RSS;
if(FeedViewer._selectedChannelId>0)
{
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
FeedViewer.renderOutlookView(channel);}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID)
{
FeedViewer.loadAllFeedsInOutlookView(true);}
else if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
FeedViewer.loadAllSavedFeedsInOutlookView();}
FeedViewer.setToolbarSettings();},
stripHTML:function(oldString){return oldString.replace(/<[^>]*>/g,"");},
renderOutlookView:function(channel)
{
FeedViewer.enableHotkeys=true;
if(channel.ID>0&&channel.Feeds.length==0)
{
var msg=String.format(Lang.NO_FEED_TO_VIEW,channel.FeedSource)}
var tmpSelectedItem=null;
$D(FeedViewer.ui_outlookView,FeedViewer.ui_outlook_FeedDetail);
$ND(FeedViewer.ui_newspaperView,FeedViewer.ui_divForwardFeed,FeedViewer.ui_feedViewerIframe);
var content=new Sys.StringBuilder("");
var tmpFeedList=channel.Feeds.slice();
if(FeedViewer.ui_drpRightPaneSortOption.value==FeedViewer.SORT_ORDER_ASC)
{
FeedViewer.sortFeedList(tmpFeedList,true);}
else
{
FeedViewer.sortFeedList(tmpFeedList,false);}
var tmpChannel=null;
var len=tmpFeedList.length;
var articleCount=0;
for(var i=0;i<len;i++)
{
articleCount++;
var isOddRow=(i%2==0);
var next='';
var prev='';
if(i<len-1)next=tmpFeedList[i+1].ID;
if(i>0)prev=tmpFeedList[i-1].ID;
var channelId=tmpFeedList[i].ChannelID;
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
channelId=FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID;}
content.append('<div id="'+FeedViewer.FEEDTITLEPREFIX+tmpFeedList[i].ID+'" '+'channelId="'+channelId+'" '+'rssItemId="'+tmpFeedList[i].ID+'" '+'isOddRow="'+(isOddRow?'1':'0')+'" '+'next="'+next+'" '+'prev="'+prev+'" ');
content.append('class = "'+FeedViewer.STYLE_NOTSELECTED+'" ');
content.append('onclick="FeedViewer.outlookView_FeedTitleClicked(event,this); "');
if(!tmpFeedList[i].IsRead)
content.append('style="font-weight:bold" ');
else
content.append('style="font-weight:normal" ');
content.append('>');
content.append(FeedViewer.articleIcon);
var title=FeedViewer.stripHTML(tmpFeedList[i].Title);
if(title.length>FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER)
title=title.substring(0,FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER)+'...';
content.append('<div class="outlookView_FeedTitle">'+title+'</div>');
content.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+tmpFeedList[i].ID));
if(channel.ID<0)
{
if(channel.ID==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
content.append("<div class='outlookView_FeedTitle_DeleteButton' onclick='FeedViewer.deleteSavedRssItem( "+tmpFeedList[i].ID+", "+tmpFeedList[i].ChannelID+");'/></div>");
var channelTitle=FeedViewer.stripHTML(tmpFeedList[i].ChannelTitle);
if(channelTitle.length>30)
channelTitle=channelTitle.substring(0,30)+"...";
content.append("<div class=\"outlookView_FeedLink\"><a href='"+tmpFeedList[i].ChannelLink+"' target='_blank' >"+channelTitle+"</a></div>");}
else
{
if(tmpChannel==null||tmpFeedList[i].ChannelID!=tmpChannel.ID)
tmpChannel=RC.getCachedRssChannel(tmpFeedList[i].ChannelID);
var channelTitle=FeedViewer.stripHTML(tmpChannel.Title);
if(channelTitle.length>30)
channelTitle=channelTitle.substring(0,30)+"...";
content.append("<div class=\"outlookView_FeedLink\"><a href='"+tmpChannel.Link+"' target='_blank' >"+channelTitle+"</a></div>");}}
content.append('</div>');}
if(FeedViewer._selectedChannelId>0)
{
content.append('<div class="'+FeedViewer.STYLE_NOTSELECTED+'" style="padding-left:10px;">');
var selectedChannel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
if(selectedChannel.Feeds.length>=FeedViewer.OUTLOOK_VIEW_PAGESIZE)
{
content.append("<a id=\"lnkLoadNextFeeds\" href=\"javascript:void(0);\" onclick=\"FeedViewer.loadNextFeeds();\">"+Lang.LOAD_NEXT+' '+FeedViewer.OUTLOOK_VIEW_PAGESIZE+' '+Lang.ARTICLES+"</a>");}
content.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.OUTLOOKVIEW_PAGING));
content.append('</div>');}
FeedViewer.ui_divOutlookView_RSSItemList.innerHTML=content.toString();
if(tmpFeedList.length>0)
{
if(FeedViewer._selectedRssItemID==0)
FeedViewer._selectedRssItemID=tmpFeedList[0].ID;
var item=null;
if(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID==FeedViewer._selectedChannelId)
item=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID);
else
item=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,tmpFeedList[0].ChannelID);
FeedViewer._lastSelectedRSSItemDiv=$(FeedViewer.FEEDTITLEPREFIX+FeedViewer._selectedRssItemID);
if(FeedViewer._lastSelectedRSSItemDiv!=null)
FeedViewer._lastSelectedRSSItemDiv.style.backgroundColor=FeedViewer.SELECTED_TITLE_BACKGROUNDCOLOR;
if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_RSS)
{
$D(FeedViewer.ui_outlook_FeedDetail);
$ND(FeedViewer.ui_feedViewerIframe);
FeedViewer.ui_outlook_FeedDetail.innerHTML="";
if(item!=null)
FeedViewer.ui_outlook_FeedDetail.appendChild(FeedViewer.getHtmlForRssItem(item,true));
else
FeedViewer.ui_outlook_FeedDetail.appendChild(FeedViewer.getHtmlForRssItem(tmpFeedList[0],true));}
else
{
$ND(FeedViewer.ui_outlook_FeedDetail);
$D(FeedViewer.ui_feedViewerIframe);
FeedViewer.loadSiteInWebSiteView(item.Link);}
if(Browser.isIE)
{
setTimeout("FeedViewer.focusArticle()",300);}
else
{
FeedViewer.focusArticle();}}
else
{
if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_RSS)
{
$D(FeedViewer.ui_outlook_FeedDetail);
$ND(FeedViewer.ui_feedViewerIframe);
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
FeedViewer.ui_divOutlookView_RSSItemList.innerHTML="<div style='padding:5px'>"+Lang.YOU_DID_NOT_SAVE_ANY_ARTICLES_YET+"</div>";
else
FeedViewer.ui_divOutlookView_RSSItemList.innerHTML="<div style='padding:5px'>No articles found.</div>";
FeedViewer.ui_outlook_FeedDetail.innerHTML="";}
else
{
FeedViewer.loadSiteInWebSiteView("about:blank");}}},
focusArticle:function()
{
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+FeedViewer._selectedRssItemID);},
outlookView_FeedTitleClicked:function(event,self)
{
if(FeedViewer._lastSelectedRSSItemDiv!=null)
{
FeedViewer._lastSelectedRSSItemDiv.style.backgroundColor=FeedViewer.NOTSELECTED_TITLE_BACKGROUNDCOLOR;}
self.className=FeedViewer.STYLE_SELECTED;
self.style.fontWeight="normal";
self.style.backgroundColor=FeedViewer.SELECTED_TITLE_BACKGROUNDCOLOR;
var currentRssItemChannelId=self.getAttribute('channelId');
var _rssItemId=self.getAttribute('rssItemId');
FeedViewer._selectedRssItemID=_rssItemId;
var rssItem=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,currentRssItemChannelId);
if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_RSS)
{
FeedViewer.ui_feedViewerIframe.src="about:blank";
var itemDiv=FeedViewer.getHtmlForRssItem(rssItem,true);
$D(FeedViewer.ui_outlook_FeedDetail);
FeedViewer.ui_outlook_FeedDetail.innerHTML="";
if(itemDiv!=null)
FeedViewer.ui_outlook_FeedDetail.appendChild(itemDiv);}
else if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_WEBSITE)
{
FeedViewer.loadSiteInWebSiteView(rssItem.Link);}
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
RC.changeReadStatus(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,_rssItemId,true);
else
RC.changeReadStatus(currentRssItemChannelId,_rssItemId,true);
var channelDiv=null;
eval('channelDiv = $("'+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+currentRssItemChannelId+'");');
if(channelDiv!=null)
FeedViewer.setChannelHeaderText(channelDiv,currentRssItemChannelId,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);
FeedViewer.refreshAllFeedUnreadCount();
FeedViewer.refreshSavedRssItemChannelTitle();
FeedViewer._lastSelectedRSSItemDiv=self;
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.WRAPPER_START_PREFIX+_rssItemId);},
loadNextFeeds:function()
{
if($('lnkLoadNextFeeds')!=null)
{
T($('lnkLoadNextFeeds'),Lang.LOADING);
$('lnkLoadNextFeeds').disabled=true;}
var channel=RC.getCachedRssChannel(FeedViewer._selectedChannelId);
RssServices.GetRSSChannel3(channel.FeedSource,false,channel.Feeds.length,FeedViewer.DEFAULT_PAGE_SIZE,function(result)
{
RC.updateCachedRssChannel(result,false);
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
FeedViewer.showNewspaperView();}
else
{
FeedViewer.showOutlookView();}
FeedViewer.refreshAllFeedUnreadCount();
FeedViewer.setChannelHeaderText(FeedViewer._lastSelectedLeftPaneItemDiv,FeedViewer._selectedChannelId,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);
if(result!=null&&result.Feeds!=null&&result.Feeds.length==0)
{
var nextLink=$('lnkLoadNextFeeds');
if(nextLink!=null)
$ND(nextLink);}});},
getRssItemByID:function(rssItemId,channelId)
{
if(channelId>0)
{
if(rssItemId>0)
{
var channel=RC.getCachedRssChannel(channelId);
if(channel!=null)
if(channel.Feeds!=null)
for(var i=0;i<channel.Feeds.length;i++)
if(channel.Feeds[i].ID==rssItemId)
return channel.Feeds[i];}}
else if(channelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
var channel=RC._savedRSSItemChannel;
if(channel!=null)
if(channel.Feeds!=null)
for(var i=0;i<channel.Feeds.length;i++)
if(channel.Feeds[i].ID==rssItemId)
return channel.Feeds[i];}
return null;},
deleteSavedRssItem:function(rssItemID,rssItemChannelID)
{
var doyou=confirm(Lang.DELETE_ARTICLE_CONFIRM);
if(doyou==true)
{
var selectedRssItem=FeedViewer.getRssItemByID(rssItemID,rssItemChannelID);
RC.removeFromSavedRssItemList(rssItemID);
FeedViewer.refreshSavedRssItemChannelTitle();
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
var allNewspaperItems=$('allNewspaperItems');
var wrapper=$(FeedViewer.WRAPPER_END_PREFIX+rssItemID);
allNewspaperItems.removeChild(wrapper);}
else
{
if(RC._savedRSSItemChannel.Feeds.length>0)
FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,RC._savedRSSItemChannel.Feeds[0].ID);
else
FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID,0);}}},
refreshSavedRssItemChannelTitle:function()
{
var marker=FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_SAVEDCHANNEL_ID);
if(RC._savedRSSItemChannel!=null)
{
if(RC._savedRSSItemChannel.Feeds.length>0)
{
RC._savedRSSItemChannel.UnreadCount=FeedViewer.getUnreadCount(RC._savedRSSItemChannel);
if(RC._savedRSSItemChannel.UnreadCount>0)
FeedViewer._savedRssItemsChannelDiv.innerHTML=FeedViewer.getChannelIconHTML(false,false)+FeedViewer.getFormatedChannelInfo(RC._savedRSSItemChannel.Title,RC._savedRSSItemChannel.UnreadCount+"/"+RC._savedRSSItemChannel.Feeds.length)+marker;
else
FeedViewer._savedRssItemsChannelDiv.innerHTML=FeedViewer.getChannelIconHTML(true,false)+FeedViewer.getFormatedChannelInfo(RC._savedRSSItemChannel.Title,"0/"+RC._savedRSSItemChannel.Feeds.length,false)+marker;}
else
{
FeedViewer._savedRssItemsChannelDiv.innerHTML=FeedViewer.getChannelIconHTML(true,false)+RC._savedRSSItemChannel.Title+marker;}}},
showForwardOption:function(itemId,channelId)
{
FeedViewer.enableHotkeys=false;
$D(FeedViewer.ui_divForwardFeed);
$ND(FeedViewer.ui_outlookView);
$ND(FeedViewer.ui_newspaperView);
var rssItem=FeedViewer.getRssItemByID(itemId,channelId);
var itemHtml=FeedViewer.getHtmlForRssItem(rssItem,true);
$('FeedViewer_Subject').value='FW: '+rssItem.Title;
FeedViewer.ui_forwardFeedOptions.innerHTML="";
FeedViewer.ui_forwardFeedOptions.appendChild(itemHtml);},
sendEmail:function()
{
if(FeedViewer.ui_SendMail_To.value.length<5)
{
alert(Lang.ENTER_VALID_ADDRESS);
return;}
else
{
var selectedFeed=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,FeedViewer._tmpChannelID);
var selectedChannel=RC.getCachedRssChannel(selectedFeed.ChannelID);
if(selectedChannel!=null&&selectedChannel.FeedSource.length>0)
{
FeedViewer.prepareEmailContentAndSend(selectedFeed,selectedChannel.FeedSource);}
else
{
RssServices.GetSourceURLByRSSChannelID(FeedViewer._selectedRssItemID,function(result)
{
if(result!=null)
{
var selectedFeed=FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID,FeedViewer._tmpChannelID);
FeedViewer.prepareEmailContentAndSend(selectedFeed,result);}
else
{
alert('Failed to send mail');}});}}},
prepareEmailContentAndSend:function(selectedFeed,rssUrl)
{
var feedTitle=selectedFeed.Title;
if(feedTitle.length==FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER)
feedTitle.substring(0,FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER)+"...";
var feedDescription=FeedViewer.stripHTML(selectedFeed.Description);
if(feedDescription.length==0)
feedDescription=FeedViewer.stripHTML(selectedFeed.EncodedContent);
if(feedDescription.length>FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER)
feedDescription=feedDescription.substring(0,FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER)+"...";
var parameters="selectedFeedLink="+escape(selectedFeed.Link)+"&feedTitle="+escape(feedTitle)+"&detail="+escape(feedDescription)+"&rssUrl="+escape(rssUrl);
var urlToAddFlake=SITE_PREFIX+"AddFlake.aspx?redirect=true&url="+
escape("__FORWARDED_FEED_VIEWER__?"+parameters);
FeedViewer.sendMail2(selectedFeed,urlToAddFlake);},
sendMail2:function(selectedFeed,urlToAddFlake)
{
var from=FeedViewer.ui_Your_Name.value;
if(from.length==0)
from=FeedViewer.FROM_PAGEFLAKES;
var to=FeedViewer.ui_SendMail_To.value;
var cc=FeedViewer.ui_SendMail_CC.value;
var subject=FeedViewer.ui_SendMail_Subject.value;
var personalMessage=FeedViewer.ui_SendMail_PersonalMessage.value;
if(personalMessage.length>0)
personalMessage="<b>"+Lang.PERSONAL_MSG+"</b> <br />"+personalMessage;
var feedDescription=selectedFeed.Description;
if(feedDescription.length==0)
feedDescription=selectedFeed.EncodedContent;
if(feedDescription.length>FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL)
feedDescription=feedDescription.substring(0,FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL)+"...";
var sender=Lang.SOMEONE;
if(FeedViewer.ui_Your_Name.value.length>0)
sender=FeedViewer.ui_Your_Name.value;
FeedViewer.ui_SendMail_btnSendMail.disabled=true;
FeedViewer.ui_SendMail_btnSendMail.value=Lang.SENDING;
App.Server.SendEmail2(from+'<info@P.com>',to,cc,subject,Lang.RSS_FEED_FORWARD_EMAIL_TEMPLATE,FeedViewer.EMAIL_FORMAT_HTML,
new Array(new Array("URL",urlToAddFlake),
new Array("SENDER",sender),
new Array("FEED_TITLE",selectedFeed.Title),
new Array("FEED_DETAIL",feedDescription),
new Array("PERSONAL_MESSAGE",personalMessage)),
function()
{
alert(Lang.EMAIL_SUCCESS);
FeedViewer.ui_SendMail_btnSendMail.disabled=false;
FeedViewer.ui_SendMail_btnSendMail.value=Lang.SEND;
FeedViewer.cancelForward();},function()
{
alert(Lang.EMAIL_FAILED);
FeedViewer.ui_SendMail_btnSendMail.disabled=false;
FeedViewer.ui_SendMail_btnSendMail.value=Lang.SEND;},
function(exception)
{
alert(Lang.EMAIL_FAILED);
PU.dumpException(exception);
FeedViewer.ui_SendMail_btnSendMail.disabled=false;
FeedViewer.ui_SendMail_btnSendMail.value=Lang.SEND;});},
cancelForward:function()
{
$ND(FeedViewer.ui_divForwardFeed);
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
FeedViewer.showNewspaperView();
else if(FeedViewer._currentViewMode==FeedViewer.OUTLOOK_VIEW_RSS)
FeedViewer.showRSSView();
else
FeedViewer.showWebsiteView();
FeedViewer.enableHotkeys=true;},
rightPaneChangeStatus:function()
{
if(FeedViewer.ui_drpRightPaneChangeStatus.value==FeedViewer.MARK_ALL_READ)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
FeedViewer.newspaperView_MarkAllRead()
else
RC.changeChannelReadStatus(FeedViewer._selectedChannelId,true);}
else if(FeedViewer.ui_drpRightPaneChangeStatus.value==FeedViewer.MARK_ALL_UNREAD)
{
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
FeedViewer.newspaperView_MarkAllUnRead();
else
RC.changeChannelReadStatus(FeedViewer._selectedChannelId,false);}
else if(FeedViewer.ui_drpRightPaneChangeStatus.value==FeedViewer.MARK_READ)
{
RC.changeReadStatus(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID,true);}
else if(FeedViewer.ui_drpRightPaneChangeStatus.value==FeedViewer.MARK_UNREAD)
{
RC.changeReadStatus(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID,false);}
if(FeedViewer.ui_drpRightPaneChangeStatus.value.length>0)
{
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);
FeedViewer.loadLeftPane();
FeedViewer.ui_drpRightPaneChangeStatus.value="";}},
leftPaneChangeStatus:function()
{
var drpLeftPaneChangeStatus=$('FeedViewer_drpLeftPaneChangeStatus');
if(drpLeftPaneChangeStatus.value==FeedViewer.MARK_ALL_CHANNEL_READ)
{
RC.changeAllChannelReadStatus(true);}
else if(drpLeftPaneChangeStatus.value==FeedViewer.MARK_ALL_CHANNEL_UNREAD)
{
RC.changeAllChannelReadStatus(false);}
if(drpLeftPaneChangeStatus.value.length>0)
{
FeedViewer.loadRightPanel(FeedViewer._selectedChannelId,FeedViewer._selectedRssItemID);
FeedViewer.loadLeftPane();
drpLeftPaneChangeStatus.value="";}},
refreshAllFeedUnreadCount:function()
{
var unreadCount=0;
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
var channel=RC._cachedRssChannelList[i];
if(channel.UnreadCount)
unreadCount+=channel.UnreadCount;}
if(FeedViewer._allFeedsRssItemsChannelDiv!=null)
{
var marker=FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID);;
if(unreadCount>0)
{
FeedViewer._allFeedsRssItemsChannelDiv.innerHTML=FeedViewer.getChannelIconHTML(false,false)+FeedViewer.getFormatedChannelInfo(Lang.ALL_FEEDS,unreadCount)+marker;}
else
{
FeedViewer._allFeedsRssItemsChannelDiv.innerHTML=FeedViewer.getChannelIconHTML(true,false)+Lang.ALL_FEEDS+marker;}}},
getFormatedPublishDate:function(date)
{
var hour="";
if(date.getHours()<11)
{
hour=date.getHours()+" AM";}
else
{
if(date.getHours()>12)
hour=(date.getHours()-12)+" PM";
else
hour=date.getHours()+" PM";}
return MonthNames[date.getMonth()]+" "+date.getDate()+', '+date.getFullYear();},
setChannelHeaderText:function(e,channelId,maxLength,formatText,addChannelLink,setFocus)
{
var allowDelete=(channelId>0);
if(setFocus)
FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX+channelId);
var item=null;
if(typeof e=="object")item=e;else item=$(e);
if(item==null)
return;
var rssChannel=RC.getCachedRssChannel(channelId);
if(rssChannel==null)
return;
rssChannel.UnreadCount=0;
for(var i=0;i<rssChannel.Feeds.length;i++)
{
if(!rssChannel.Feeds[i].IsRead)
rssChannel.UnreadCount++;}
var marker=FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+rssChannel.ID);
if(rssChannel.UnreadCount>0)
{
item.innerHTML='<div style="font-weight:bold;">'+FeedViewer.getChannelIconHTML(false,allowDelete,rssChannel.ID)+FeedViewer.getFormatedChannelInfo(rssChannel.Title,rssChannel.UnreadCount,true)+marker+"</div>";}
else
{
item.innerHTML='<div style="float: left;">'+FeedViewer.getChannelIconHTML(true,allowDelete,rssChannel.ID)+FeedViewer.getFormatedChannelInfo(rssChannel.Title,'',false)+marker+"</div>";}},
getFormatedChannelInfo:function(title,count,isBold)
{
if(title.length>FeedViewer.MAX_CHANNELTITLE_WIDTH)
title=title.substring(0,FeedViewer.MAX_CHANNELTITLE_WIDTH)+"...";
var className="feedReader_rss_number";
if((count+'').length>2)
className="feedReader_rss_number2";
var fontWeight="normal";
if(isBold==true||isBold==null)
fontWeight="bold";
var countHtml='';
if((count+'').length>0)
countHtml='<div class="'+className+'"'+'>'+count+'<'+'/'+'div>';
return'<div style="float: left;font-weight:'+fontWeight+';">'+title+'</div>'+countHtml;},
setMarker:function(parent)
{
var marker=FeedViewer.getPageTopMarker();
marker.id=FeedViewer.PAGETOPMARKER_PREFIX+parent.id;
parent.appendChild(marker);},
createMarker:function(id)
{
var marker=FeedViewer.getPageTopMarker();
marker.id=id;
return marker;},
getPageTopMarkerHTML:function(parent)
{
return FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX+parent.id);},
getPageTopMarkerHTML2:function(id)
{
return'<input type="text" autocomplete="off" style="width:0px; float:left; display:none;" id="'+id+'" />';},
getPageTopMarker:function()
{
var marker=$$('input');
marker.type='text';
marker.setAttribute('autocomplete','off');
marker.setAttribute('customType','marker');
marker.style.width="0px";
$ND(marker);
return marker;},
getObjectMarker:function(object,endMarker)
{
var inputObjs=object.getElementsByTagName('input');
for(var i=0;i<inputObjs.length;i++)
if(inputObjs[i].getAttribute("customType")=='marker')
if(endMarker)
return inputObjs[i+1];
else
return inputObjs[i];
return null;},
gotoPageTop:function(marker)
{
if(!(typeof marker=="object"))
{
marker=$(marker);}
try
{
if(marker)
{
$D(marker);
marker.focus();
$ND(marker);}}
catch(ex)
{}},
getHtmlForRssItem:function(rssItem,showEncodedContent)
{
if(rssItem==null)
return $$('div');
FeedViewer._tmpChannelID=rssItem.ChannelID;
var wrapper=$$('div');
wrapper.className=FeedViewer.STYLE_RSSITEM_WRAPPER;
var title=$$('a');
title.className=FeedViewer.FEEDVIEWER_RSSITEM_TITLE;
title.innerHTML=rssItem.Title;
title.href=rssItem.Link;
title.target="_blank";
var description=$$('div');
if(rssItem.Description.length>0)
description.innerHTML=rssItem.Description;
else
description.innerHTML=rssItem.EncodedContent;
if(rssItem.IsRead)
{
description.className=FeedViewer.FEEDVIEWER_RSSITEM_DESCRIPTION_READ;}
else
{
description.className=FeedViewer.FEEDVIEWER_RSSITEM_DESCRIPTION;}
try
{
if(showEncodedContent)
if(rssItem.EncodedContent!=null)
if(rssItem.EncodedContent.length>0)
description.innerHTML=rssItem.EncodedContent;}
catch(ex)
{
PU.dumpException(ex.message);}
var options=$$('div');
var lnkSource=$$('a');
var lnkForward=$$('a');
var spc1=$$('span');
var spc2=$$('span');
var spc3=$$('span');
var spc4=$$('span');
spc1.innerHTML=FeedViewer.SPACE;
spc2.innerHTML=FeedViewer.SPACE;
spc3.innerHTML=FeedViewer.SPACE;
spc4.innerHTML=FeedViewer.SPACE;
options.className=FeedViewer.STYLE_FEEDVIEWER_OPTIONS;
T(lnkSource,Lang.GOTO_SOURCE);
lnkSource.href=rssItem.Link;
lnkSource.target=FeedViewer.NEW_WINDOW_TARGET;
options.appendChild(lnkSource);
options.appendChild(spc1);
T(lnkForward,Lang.FORWARD_ARTICLE);
lnkForward.href="javascript:void(0);";
var attRSSItemId=document.createAttribute('rssItemID');
attRSSItemId.value=rssItem.ID;
lnkForward.setAttributeNode(attRSSItemId);
var attChannelId=document.createAttribute('channelID');
attChannelId.value=rssItem.ChannelID;
lnkForward.setAttributeNode(attChannelId);
lnkForward.onclick=function(event)
{
var itemId=this.getAttribute('rssItemID');
var channelId=this.getAttribute('channelID');
FeedViewer.showForwardOption(itemId,channelId);};
options.appendChild(lnkForward);
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
options.appendChild(spc2);
var lnkDeleteArticle=$$('a');
T(lnkDeleteArticle,Lang.DELETE_ARTICLE);
lnkDeleteArticle.href="javascript:void(0);";
var attChannelID=document.createAttribute('channelID');
attChannelID.value=rssItem.ChannelID;
lnkDeleteArticle.setAttributeNode(attChannelID);
var attRSSItemId=document.createAttribute('rssItemID');
attRSSItemId.value=rssItem.ID;
lnkDeleteArticle.setAttributeNode(attRSSItemId);
lnkDeleteArticle.onclick=function(event)
{
var rssItemChannelID=this.getAttribute('channelID');
var rssItemID=this.getAttribute('rssItemID');
FeedViewer.deleteSavedRssItem(rssItemID,rssItemChannelID);}
options.appendChild(lnkDeleteArticle);}
else
{
options.appendChild(spc2);
var lnkSaveArticle=$$('a');
T(lnkSaveArticle,Lang.SAVE_ARTICLE);
lnkSaveArticle.href="javascript:void(0);";
var attChannelID=document.createAttribute('channelID');
attChannelID.value=rssItem.ChannelID;
lnkSaveArticle.setAttributeNode(attChannelID);
var attRSSItemId=document.createAttribute('rssItemID');
attRSSItemId.value=rssItem.ID;
lnkSaveArticle.setAttributeNode(attRSSItemId);
$addEvent(lnkSaveArticle,"click",Func("FeedViewer.saveArticle_click( this,"+rssItem.ChannelID+", "+rssItem.ID+")"));
options.appendChild(lnkSaveArticle);}
wrapper.id=FeedViewer.WRAPPER_START_PREFIX+rssItem.ID;
FeedViewer.setMarker(wrapper);
if(FeedViewer._currentViewMode==FeedViewer.NEWSPAPER_VIEW)
{
var page=P.currentPage;
if(page.IsPublished==true&&page.IsOwner==false)
{}
else
{
options.appendChild(spc3);
options.appendChild(FeedViewer.getHtmlForChangeReadStatus(rssItem));}
var publishDate=$$('div');
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
T(publishDate,rssItem.ChannelTitle+', '+FeedViewer.getFormatedPublishDate(rssItem.PublishDate));}
else
{
var channel=RC.getCachedRssChannel(rssItem.ChannelID);
if(channel)
T(publishDate,channel.Title+', '+FeedViewer.getFormatedPublishDate(rssItem.PublishDate));}
publishDate.className=FeedViewer.FEEDVIEWER_RSSITEM_PUBLISHEDDATE_READ;
wrapper.appendChild(publishDate);}
wrapper.appendChild(title);
wrapper.appendChild(description);
wrapper.appendChild(options);
wrapper.id=FeedViewer.WRAPPER_END_PREFIX+rssItem.ID;
FeedViewer.setMarker(wrapper);
return wrapper;},
saveArticle_click:function(me,channelId,itemId)
{
var selectedRssItem=FeedViewer.getRssItemByID(itemId,channelId);
this.disabled=true;
T(me,'Saved');
var channel=RC.getCachedRssChannel(channelId);
var savedItem=new $cloneObject(selectedRssItem);
savedItem.ChannelID=FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID;
savedItem.ChannelTitle=channel.Title;
savedItem.ChannelLink=channel.Link;
savedItem.ChannelSource=channel.FeedSource;
RC.addToSavedRssItemList(savedItem);
FeedViewer.refreshSavedRssItemChannelTitle();},
removeAllOptions:function(selectbox)
{
try
{
var i;
for(i=selectbox.options.length-1;i>=0;i--)
{
selectbox.remove(i);}}
catch(ex)
{}},
addOption:function(selectbox,text,value)
{
var optn=document.createElement("OPTION");
optn.innerHTML=text;
optn.value=value;
selectbox.appendChild(optn);},
getHtmlForChangeReadStatus:function(rssItem)
{
var lnkChangeReadStatus=$$('a');
var attRSSItemId=document.createAttribute('rssItemID');
attRSSItemId.value=rssItem.ID;
lnkChangeReadStatus.setAttributeNode(attRSSItemId);
var attChannelID=document.createAttribute('channelID');
attChannelID.value=rssItem.ChannelID;
lnkChangeReadStatus.setAttributeNode(attChannelID);
lnkChangeReadStatus.href="javascript:void(0);";
if(rssItem.IsRead)
T(lnkChangeReadStatus,Lang.MARK_AS_UNREAD);
else
T(lnkChangeReadStatus,Lang.MARK_AS_READ);
lnkChangeReadStatus.onclick=function(event)
{
var rssItemID=this.getAttribute('rssItemID');
var rssItemChannelID=this.getAttribute('channelID');
if(T(lnkChangeReadStatus)==Lang.MARK_AS_UNREAD)
{
T(lnkChangeReadStatus,Lang.MARK_AS_READ);
RC.changeReadStatus(rssItemChannelID,rssItemID,false);}
else
{
T(lnkChangeReadStatus,Lang.MARK_AS_UNREAD);
RC.changeReadStatus(rssItemChannelID,rssItemID,true);}
if(FeedViewer._selectedChannelId==FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID)
{
FeedViewer.refreshSavedRssItemChannelTitle();}
else
{
var channelDiv=$(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX+rssItemChannelID);
if(channelDiv!=null)
FeedViewer.setChannelHeaderText(channelDiv,rssItemChannelID,FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH,true,false,true);
FeedViewer.refreshAllFeedUnreadCount();}}
return lnkChangeReadStatus;},
getUnreadCount:function(channel)
{
if(channel!=null)
{
channel.UnreadCount=0;
if(channel.Feeds!=null)
{
for(var i=0;i<channel.Feeds.length;i++)
if(!channel.Feeds[i].IsRead)
channel.UnreadCount++;}
return channel.UnreadCount;}
else
return 0;},
getAllUnreadCount:function()
{
var unreadCount=0;
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
var channel=RC._cachedRssChannelList[i];
unreadCount+=FeedViewer.getUnreadCount(channel);}
return unreadCount;},
getAllFeedCount:function()
{
var feedCount=0;
for(var i=0;i<RC._cachedRssChannelList.length;i++)
{
var channel=RC._cachedRssChannelList[i];
feedCount+=channel.Feeds.length;}
return feedCount;},
backGroundWorker:function(functionToExecute,delay,key,param)
{
MQ.add(key,delay,true,function(param)
{
var x=0;
functionToExecute(param);});},
backGroundWorker2:function(scriptToExecute,delay,key)
{
MQ.add(key,delay,true,function(scriptToExecute)
{
var x=0;
eval(scriptToExecute);});}};
if(DragHandler)delete DragHandler;
var DragHandler=
{
onDrag:function(m,x,y,mx,my)
{
if(m.dragging)
{
P.makeSpaceForModule(App.currentPage,m,mx,y);
if(y<TabManager.getTabBottom()&&App.currentPage.CanDeleteFlake)
{
var pageId=TabManager.highlightTabAt(mx,y);
if(pageId>0)
if(App.currentPage.id!=pageId&&m.dropOnPageId!=pageId)
{
PU.changeOpac(40,m.div.id);
TabManager.refresh();
m.dropOnPageId=pageId;}
m.draggingOnTabs=true;}
else
{
if(m.draggingOnTabs)
{
PU.clearOpac(m.div.id);
TabManager.refresh();
MQ.remove('SwitchTabWhileDragging',1000);
m.draggingOnTabs=false;
m.dropOnPageId=0;}}
m.dragOver(mx,my);
m.dragOver2(mx,my);}},
onDragStart:function(m,x,y,mx,my)
{
m.hideEditArea();
m.dragStart(x,y);
m.dragStart2(x,y);
var pos=PU.getPosition(m.div);
m.page.table.style.height=m.page.table.offsetHeight+(pos[3]*2)+"px";
m.div.style.position="absolute";
m.div.style.left=pos[0]+"px";
m.div.style.top=pos[1]+"px";
m.div.style.width=pos[2]+"px";
m.div.style.height=pos[3]+"px";
P.removeModule(App.currentPage,m);
P.makeSpaceForModule(App.currentPage,m,mx,pos[1]);
PU.makeOnTop(m.div);
m.dragging=true;
P.dontSaveLayout(App.currentPage);},
onDragEnd:function(m,x,y)
{
if(m.dragging)
{
m.dragging=false;
PU.clearOpac(m.div.id);
if(m.draggingOnTabs&&m.dropOnPageId>0&&m.dropOnPageId!=App.currentPage.id)
{
var currentPage=App.currentPage;
P.hideDropPlaceholder();
var dropPage=App.getPageById(m.dropOnPageId);
if(!dropPage.CanAddFlake)
{
P.insertModule(m.page,m,0,0);
alert(Lang.NO_PERM_ADD_FLAKE);
TabManager.refresh();}
else
{
if(dropPage.isLoaded)
{
P.insertModule(dropPage,m,0,parseInt(dropPage.columnCount/2));
P.saveLayoutNow(currentPage);
P.saveLayoutNow(dropPage);
TabManager.refresh();
$track('/DragDrop/Tab');}
else
{
App.moveModuleToPage2(m,dropPage);
P.saveLayoutNow(dropPage);
TabManager.refresh();
$track('/DragDrop/Tab');}}
m.page.table.style.height="";
$fixTable(m.page.table);}
else
{
var pos=PU.getPosition(App.dropPlaceholder);
var mover=new AnimatedMover(m.div,pos[0],pos[1],function()
{
var newCol=App.dropPlaceholder?App.dropPlaceholder.col:0;
var newRow=App.dropPlaceholder?App.dropPlaceholder.row:0;
P.hideDropPlaceholder();
if(!App.currentPage.CanAddFlake)
{
P.insertModule(m.page,m,0,0);
alert(Lang.NO_PERM_ADD_FLAKE);}
else
P.insertModule(App.currentPage,m,newRow,newCol);
P.saveLayoutNow(App.currentPage);
TabManager.refresh();
m.page.table.style.height="";
m.dragEnd(x,y);
m.dragEnd2(x,y);
$fixTable(m.page.table);
$track('/DragDrop');});}
TabManager.enable();}}};
var StartPageHelper=
{
init:function()
{
var link=$('Footer_SetAsStartpage');
if(Browser.isIE|Browser.isOpera)
{
link.style.behavior='url(#default#homepage)';
$addEvent(link,'click',function(e){this.setHomePage(SITE_PREFIX);$track('/SetAsHomepage');});}
else if(Browser.isSafari)
{
$addEvent(link,'click',function(e){$scrollTop();PU.centerDiv($('SetAsStartPageHelpDialogSafari'));PU.blockUI();$visible('SetAsStartPageHelpDialogSafari');$track('/SetAsHomepage');});}
else
{
$addEvent(link,'click',function(e){$scrollTop();PU.centerDiv($('SetAsStartPageHelpDialog'));PU.blockUI();$visible('SetAsStartPageHelpDialog');$track('/SetAsHomepage');});}},
hide:function()
{
PU.unblockUI();
if(Browser.isSafari)
$hide('SetAsStartPageHelpDialogSafari');
else
$hide('SetAsStartPageHelpDialog');}};
var SF=SecondaryFramework=
{
initialized:false,
showPageCastTimerId:0,
showPageCastStep:0,
showPageCastTries:0,
showPageCastSubStep:0,
firstVisitTooltip:function()
{
window.setTimeout(function(){
if(App.My.Profile["BVSTT"]!="1"&&App.IsMySite==true)
{
animateStartButton();
var clickHereTT=ImprovedTooltip("Start","Start","Start","<b>Personalize Your Page!</b><br/>Click the Pageflakes button to find fresh<br/>new Flakes and Pagecasts, customize the look<br/>and feel of your page, share your page and more.","rt",
function()
{
App.saveProfile("BVSTT","1");});
clearInterval(clickHereTT.si);
clickHereTT.style.left="";
clickHereTT.style.right="78px";
clickHereTT.style.top="0px";}},2000);},
showPagecast:function()
{
try
{
if(SF.showPageCastStep==0)
{
window.clearInterval(SF.showPageCastTimerId);
SF.showPageCastStep++;
App.My.Profile["ShowPagecast"]="0";
App.saveProfile("ShowPagecast","0");
SF.showPageCastTimerId=window.setInterval(SF.showPagecast,1000);
return;}
else if(SF.showPageCastStep==1)
{
window.clearInterval(SF.showPageCastTimerId);
if(typeof Start!='undefined')
{
SF.showPageCastStep++;
Start.showPageSettings();
$ND("StartAnimation");}
SF.showPageCastTimerId=window.setInterval(SF.showPagecast,1000);}
else if(SF.showPageCastStep==2)
{
window.clearInterval(SF.showPageCastTimerId);
var continueIteration=true;
if(SF.showPageCastTries<20)
{
SF.showPageCastTries++;
if(typeof Start!='undefined'&&$('SettingsLeftMenuContainer')!=null&&Start_isLoaded==true)
{
if(SF.showPageCastSubStep==0)
{
Start.loadPageSettingGrid(3,App.DomainID,App.LanguageID);
SF.showPageCastTries=0;
SF.showPageCastTimerId=window.setInterval(SF.showPagecast,1000);
SF.showPageCastSubStep++;}
else if(SF.showPageCastSubStep==1)
{
if($isVisible('PageSettingGridSharePage'))
{
PageSettings_ShowMakePublic();
SF.showPageCastSubStep++;}}
else if(SF.showPageCastSubStep==2)
{
if($isVisible('SharingOptions_Public'))
{
continueIteration=false;
$('SharingOptions_Public').checked=true;
$('PublishOptions_Title').focus();}}}}
else
{
window.clearInterval(SF.showPageCastTimerId);
continueIteration=false;}
if(continueIteration)
{
SF.showPageCastTimerId=window.setInterval(SF.showPagecast,1000);}}}
catch(exp)
{}},
initialize:function()
{
if(!App.loaded)return;
if(SF.initialized==true)return;
SF.initialized=true;
TabManager.create();
ScrollManager.init();
window.onresize=P.onResize;
P.onResize();
$("Start").onclick=function()
{
Start.toggleStart();};
StartPageHelper.init();
if(App.My.Profile)
{
if(App.My.Profile["ShowFooter"])
if(App.My.Profile["ShowFooter"]=="0")
{}}
CoreServices.GetTooltips(
function(result)
{
if((result!=null)&&(result.length>0))
{
TipFactory.showTips(result);}});
if(App.My.Profile["ShowPagecast"])
{
if(App.My.Profile["ShowPagecast"]=="1")
{
SF.showPageCastStep=0;
SF.showPageCastTimerId=window.setInterval(SF.showPagecast,1000);}}
SF.firstVisitTooltip();}};
var AlertManager=
{
init:function()
{
var div=$('alertMessages');
AlertManager.getPendingAlerts(function(alertList)
{
if(alertList.length>0)
{
var builder=new Sys.StringBuilder();
for(var j=0;j<alertList.length;j++)
{
builder.append('<div class="alertItem" id="alert'+alertList[j].AlertID.toString()+'">'+'<div class="alertNew" id="alertNew'+alertList[j].AlertID.toString()+'" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'+'<div class="alertSubject" id="alertSubject'+alertList[j].AlertID.toString()+'" > '+alertList[j].Subject.toString()+'</div>'+'<span id="alertOr'+alertList[j].AlertID.toString()+'" >&nbsp;or&nbsp;</span>'+'<div class="alertHide" id="alertHide'+alertList[j].AlertID.toString()+'" >'+'<a id="alertHideLink'+alertList[j].AlertID.toString()+'" onclick="AlertManager.hideAlert(\''+alertList[j].AlertID.toString()+'\' )">hide this message</a>'+'</div>'+'<div id="alertSpace'+alertList[j].AlertID.toString()+'" class="alertSpace">&nbsp;</div>'+'</div>');}
div.innerHTML=builder.toString();
for(var j=0;j<alertList.length;j++)
{
if(alertList[j].Details.length>0)
TM.setTooltip($('alertSubject'+alertList[j].AlertID.toString()),alertList[j].Details.toString(),3);}
if($('alerts').style.display!="block")
{
$D('alerts');
$a=$("alerts");
$am=$("alertMessages");
$a.style.overflow="hidden";
$a.style.height="1px";
var si=setInterval(
function(){
diff=$am.offsetHeight-$a.offsetHeight;
$a.style.height=($a.offsetHeight+diff/5)+"px";
$fixTable();
if(diff<2){
$a.style.height=$am.offsetHeight+"px";
clearInterval(si);
$a.style.overflow="";
$a.style.height="";
$fixTable();}},50);}}});},
getPendingAlerts:function(callback)
{
AlertService.GetPendingAlerts(callback);},
hideAlert:function(alertID,callback)
{
AlertService.HideAlert(alertID,
function(result)
{
var alertDiv=$('alertMessages');
var childAlertDiv=$('alert'+alertID.toString());
var newSpan=$('alertNew'+alertID.toString());
var subjectDiv=$('alertSubject'+alertID.toString());
var orSpan=$('alertOr'+alertID.toString());
var hideDiv=$('alertHide'+alertID.toString());
var hideLnk=$('alertHideLink'+alertID.toString());
var spaceDiv=$('alertSpace'+alertID.toString());
if(Browser.isIE)
hideLnk["onclick"]=null;
hideDiv.removeChild(hideLnk);
childAlertDiv.removeChild(spaceDiv);
childAlertDiv.removeChild(hideDiv);
childAlertDiv.removeChild(orSpan);
childAlertDiv.removeChild(subjectDiv);
childAlertDiv.removeChild(newSpan);
TM.hideTooltip();
alertDiv.removeChild(childAlertDiv);
if(!alertDiv.hasChildNodes())
{
$ND('alertMessages');
$ND('alerts');}
$fixTable();});}};
var ScrollManager={
_tabs:null,
_fc:null,
_lc:null,
_tc:null,
_tcs:null,
_si:null,
_moving:false,
_initialized:false,
_speed:5,
_hyperSpeed:20,
_minus:80,
_refreshing:false,
_sliding:null,
_rightZone:null,
_leftZone:null,
_tdWidth:null,
init:function()
{
if(ScrollManager._initialized)return;
ScrollManager._initialized=true;
ScrollManager._tdWidth=$("TopMenuContainer").childNodes[0].offsetWidth;
ScrollManager._tabs=$("tabs");
ScrollManager._fc=ScrollManager._tabs.firstChild;
ScrollManager._lc=$("NewTabLink");
ScrollManager._tc=$("tabs_container");
ScrollManager._tcs=$("tabs_container_scroll");
var pos=PU.getPosition(ScrollManager._tcs);
ScrollManager._rightZone=pos[0]+pos[2]/4*3;
ScrollManager._leftZone=pos[0]+pos[2]/4;
$('left_scroll').onmouseover=ScrollManager.moveRight;
$('left_scroll').onmousedown=function(event){ScrollManager.shiftRight(true);}
$('left_scroll').onmouseout=ScrollManager.stop;
$('right_scroll').onmouseover=ScrollManager.moveLeft;
$('right_scroll').onmousedown=function(event){ScrollManager.shiftLeft(true);}
$('right_scroll').onmouseout=ScrollManager.stop;
MQ.add("ScrollRefresh",100,false,ScrollManager.refresh);},
stop:function()
{
ScrollManager._moving=false;
window.clearInterval(ScrollManager._si);},
moveLeft:function(){
if(ScrollManager._moving!=true){
ScrollManager._moving=true;
ScrollManager._si=window.setInterval(function(){ScrollManager.shiftLeft(false);},20);}},
shiftLeft:function(hyperdrive)
{
if((ScrollManager._tc.offsetLeft+ScrollManager._tc.offsetWidth)>=ScrollManager._tcs.offsetWidth)
ScrollManager._tc.style.left=(ScrollManager._tc.offsetLeft-(hyperdrive==true?Math.min(ScrollManager._hyperSpeed,(ScrollManager._tc.offsetLeft+ScrollManager._tc.offsetWidth)-ScrollManager._tcs.offsetWidth):ScrollManager._speed))+"px";
else
ScrollManager.stop();},
shiftRight:function(hyperdrive)
{
if(ScrollManager._tc.offsetLeft<0)
ScrollManager._tc.style.left=(ScrollManager._tc.offsetLeft+(hyperdrive==true?Math.min(-ScrollManager._tc.offsetLeft,ScrollManager._hyperSpeed):ScrollManager._speed))+"px";
else
ScrollManager.stop();},
moveRight:function(){
if(ScrollManager._moving!=true){
ScrollManager._moving=true;
ScrollManager._si=window.setInterval(function(){ScrollManager.shiftRight(false);},20);}},
refresh:function()
{
if(ScrollManager._tcs.offsetParent)
{
$("TopMenuContainer").style.width=(ScrollManager._tdWidth+15)+"px";
ScrollManager._tcs.style.width=($("Content").offsetWidth-ScrollManager._tdWidth-15-ScrollManager._minus)+"px";
ScrollManager._tc.style.width=(TabManager.getTotalWidth()+2)+"px";
ScrollManager._fc=ScrollManager._tabs.firstChild;
ScrollManager._lc=$("NewTabLink");
if(ScrollManager._lc==null)ScrollManager._lc=ScrollManager._tabs.lastChild;
var maxCount=20;
while(ScrollManager._lc.offsetTop>ScrollManager._fc.offsetTop&&--maxCount>0)
{
ScrollManager._tc.style.width=(ScrollManager._tc.offsetWidth+10)+"px";}
ScrollManager._hyperSpeed=ScrollManager._tcs.offsetWidth/2;
if(ScrollManager._tc.offsetWidth<=ScrollManager._tcs.offsetWidth){
$ND("left_scroll");
$ND("right_scroll");
ScrollManager._tc.style.left="0px";}
else{
$D("left_scroll",true);
$D("right_scroll",true);
var pos=TabManager.findTabPosition(App.currentPage.id);
var leftPos=$(App.currentPage.id).offsetLeft+pos[2]/2;
var target=leftPos-ScrollManager._tcs.offsetWidth/2;
var limit=ScrollManager._tc.offsetWidth-ScrollManager._tcs.offsetWidth;
if(target>0&&target<limit)
ScrollManager.scrollTo(-target);
else if(target>limit)
ScrollManager.scrollTo(-limit);
else
ScrollManager.scrollTo(0);}
ScrollManager._refreshing=false;}},
scrollTo:function(target)
{
clearInterval(ScrollManager._sliding);
ScrollManager._sliding=setInterval(function()
{
if(ScrollManager._moving==true){
clearInterval(ScrollManager._sliding);
return;}
var left=ScrollManager._tc.offsetLeft;
var newDiff=(target-left)/2;
if(Math.abs(newDiff)>1){
ScrollManager._tc.style.left=(left+newDiff)+"px";}
else{
ScrollManager._tc.style.left=target+"px";
clearInterval(ScrollManager._sliding);}},20);},
dragStart:function(x,y)
{
if(x>ScrollManager._rightZone)ScrollManager.moveLeft();
else if(x<ScrollManager._leftZone)ScrollManager.moveRight();
else ScrollManager.stop();},
dragEnd:function()
{
ScrollManager.stop();}};
function showMessage(str)
{
setTimeout('showMessage2("'+str+'")',10);}
function showMessage2(str)
{
var msg=null;
if($('msgBox')==null)
{
msg=$$('div');
msg.id='msgBox';
document.body.appendChild(msg);
msg.style.top='0px'
msg.style.zIndex=99999;
msg.style.background='white';
msg.style.position="absolute";}
else
{
msg=$('msgBox');}
msg.innerHTML=str+'<br/>'+msg.innerHTML;}
var SendPageToFriend={
sharePopupName:"SendPageToFriendPopup",
emailProvider:"gmail",
importPanel:"SendFriendImportPanel",
importResult:"SendFriendImportResult",
importEmailDialog:"sendPageImportEmail",
emailBox:'SPTFEmailAddresses',
loadedStr:'',
show:function()
{
var div=$(SendPageToFriend.sharePopupName);
PU.blockUI();
App.hideAllControls();
div=$$("div",SendPageToFriend.sharePopupName);
div.className="popup container";
$('Content').appendChild(div);
if(SendPageToFriend.loadedStr=='')
{
PU.centerDiv(div);
var url="sendThisPageToFriend.aspx";
App.Server.GetPage(SendPageToFriend.sharePopupName,SITE_PREFIX+url,function(r)
{
var div=$(SendPageToFriend.sharePopupName);
r.body=r.body.replace("##CONTENT##","Hi,\nI just found a really cool Page. Check it out!\nCheers");
div.innerHTML=r.body;
SendPageToFriend.loadedStr=r.body;
PU.centerDiv(div);});}
else
{
var div=$(SendPageToFriend.sharePopupName);
div.innerHTML=SendPageToFriend.loadedStr;
div.innerHTML=div.innerHTML.replace("##CONTENT##","test");
PU.centerDiv(div);}
$track('/SendPage/Show');},
hide:function()
{
var div=$(SendPageToFriend.sharePopupName);
div.parentNode.removeChild(div);
PU.unblockUI();
App.showAllControls();},
showImport:function(util)
{
$D(SendPageToFriend.importEmailDialog);
$hide('SPTFTip');
if(util)
{
$('import'+util+'AB').checked=true;
SendPageToFriend.setImportFrom(util);}},
hideAddressInput:function()
{
$visible('SPTFTip');
$ND(SendPageToFriend.importEmailDialog);},
setImportFrom:function(whom)
{
SendPageToFriend.emailProvider=whom;
T('SPTFUsernameT',whom+" username:");
T('SPTFPasswordT',whom+" password:");},
scanAddressBook:function()
{
$ND('SPTFImportError');
var username=$('sendPageToFriendUsername').value;
var password=$('sendPageToFriendPassword').value;
if(SendPageToFriend.checkError('sendPageToFriendUsername')==true||SendPageToFriend.checkError('sendPageToFriendPassword')==true)
return;
var provider=SendPageToFriend.emailProvider;
$D('ScanningAddressBook');
$ND(SendPageToFriend.importEmailDialog);
App.Server.ImportContacts(provider,username,password,
function(r)
{
$D(SendPageToFriend.importPanel);
$ND('ScanningAddressBook');
$D(SendPageToFriend.importResult);
if(r)
{
var rDiv=$(SendPageToFriend.importResult);
rDiv.innerHTML="";
var str="";
for(var i=0;i<r.length;i++)
{
str+='<div style="background:#eee; border-bottom:#ccc 1px solid;width:320px;"><input name="user" type="checkbox" value="'+r[i].Value+'" /><span>'+r[i].Key+' ('+r[i].Value+')</span></div>';}
rDiv.innerHTML=str;
$('SPTFImportButton').disabled=false;}
else
{
T(SendPageToFriend.importResult,' No result found!');
$('SPTFImportButton').disabled=true;}},
function(ex)
{
$ND('ScanningAddressBook');
T('SPTFImportError','Authentication failed. Please make sure you have entered a correct user name and password.');
$D('SPTFImportError');
SendPageToFriend.scanAgain();});
$track('/SendPage/ScanAddressbook');},
importEmails:function()
{
var rDiv=$(SendPageToFriend.importResult);
if(rDiv.childNodes.length>0)
{
var emails=$(SendPageToFriend.emailBox);
var inputEmails=new Array();
if(emails.value)
if(emails.value.indexOf(', ')>0)
inputEmails=emails.value.split(', ');
else
inputEmails=emails.value.split(',');
for(i=0;i<rDiv.childNodes.length;i++)
{
var input;
if(input=rDiv.childNodes[i].firstChild)
{
if(input.checked)
inputEmails=inputEmails.concat(input.value);}}
emails.value=inputEmails.join(', ');
$ND(SendPageToFriend.importPanel);
SendPageToFriend.hideAddressInput();}},
scanAgain:function()
{
$ND(SendPageToFriend.importPanel);
$D('sendPageImportEmail');},
sendPage:function()
{
var emails=$(SendPageToFriend.emailBox).value;
var errorArea='SPTFEmailAddresses_error';
var confArea='SPTFSentMailConfirmation';
var sendButton='SPTFButton';
$(sendButton).disabled=true;
$(sendButton).value='Sending...';
$ND(confArea);
if($trim(emails)=='')
{
T(errorArea,'Please enter at least one email address');
$D(errorArea);
$(sendButton).disabled=false;
$(sendButton).value='Send';
return;}
if(!ValidateEmails.isValidEmailList(emails,','))
{
T(errorArea,'Please enter valid email address/s');
$D(errorArea);
$(sendButton).disabled=false;
$(sendButton).value='Send';
return;}
if(SendPageToFriend.checkError(SendPageToFriend.emailBox)==true||SendPageToFriend.checkError('SPTFMessage')==true)
{
$(sendButton).disabled=false;
$(sendButton).value='Send';
return;}
var message=$('SPTFMessage').value;
var pageId=App.currentPage.id;
App.Server.SendThisPageToFriend(pageId,emails,message,
function(r)
{
SendPageToFriend.sendComplete();});},
sendComplete:function()
{
var confirmation=$('SPTFSentMailConfirmation');
var errArea=$('SPTFEmailAddresses_error');
var sendButton='SPTFButton';
$D(confirmation);
$ND(errArea);
$('SPTFEmailAddresses').value='';
$(sendButton).disabled=false;
$(sendButton).value='Send';
$track('/SendPage/Sent');},
checkError:function(str)
{
var ob=$(str);
if(ob==null)return false;
if(ob.value=="")
{
$D(str+"_error");
ob.onclick=function()
{
$ND(str+"_error");}
return true;}
else
{
return false;}}}
var SendFlakeToFriend={
flakeId:null,
sendFlakePopupName:"SPTFPopup",
loadedStr:'',
init:function(flakeId)
{
SendFlakeToFriend.flakeId=flakeId;
SendFlakeToFriend.show();},
show:function()
{
var div=$(SendFlakeToFriend.sendFlakePopupName);
PU.blockUI();
div=$$("div",SendFlakeToFriend.sendFlakePopupName);
div.className="popup container";
div.style.width="855px";
$('Content').appendChild(div);
div.innerHTML="Loading...";
if(SendFlakeToFriend.loadedStr=='')
{
PU.centerDiv(div);
var url="sendFlakeToFriend.aspx";
App.Server.GetPage(SendFlakeToFriend.sendFlakePopupName,SITE_PREFIX+url,function(r)
{
var div=$(SendFlakeToFriend.sendFlakePopupName);
div.innerHTML=r.body;
SendFlakeToFriend.loadedStr=r.body;
SendFlakeToFriend.loadModule();
PU.centerDiv(div);});}
else
{
var div=$(SendFlakeToFriend.sendFlakePopupName);
div.innerHTML=SendFlakeToFriend.loadedStr;
SendFlakeToFriend.loadModule();
PU.centerDiv(div);}
$track('/SendFlake/Show');},
hide:function()
{
var div=$(SendFlakeToFriend.sendFlakePopupName);
$('SFTFModuleContainer').innerHTML="";
div.parentNode.removeChild(div);
PU.unblockUI();
$ND('SFTFBlockUI');
App.showAllControls();},
loadModule:function()
{
var c=$('SFTFModuleContainer');
App.hideAllControls();
c.innerHTML="";
c.appendChild($("module"+SendFlakeToFriend.flakeId).cloneNode(true));
var SFTFblockUI=$('SFTFBlockUI');
var pos=PU.getPosition(c);
var pos1=PU.getPosition($('SPTFPopup'));
$D(SFTFblockUI);
SFTFblockUI.style.left=(pos[0]-pos1[0])+"px";
SFTFblockUI.style.top=(pos[1]-pos1[1])+"px";
SFTFblockUI.style.width=pos[2]+"px";
SFTFblockUI.style.height=pos[3]+"px";},
sendFlake:function()
{
var emails=$(SendPageToFriend.emailBox).value;
var errorArea='SPTFEmailAddresses_error';
var confArea='SFTFSentMailConfirmation';
var sendBtn='SFTFButton';
$(sendBtn).disabled=true;
$(sendBtn).value='Sending...';
$ND(confArea);
if($trim(emails)=='')
{
T(errorArea,'Please enter at least one email address');
$D(errorArea);
$(sendBtn).disabled=false;
$(sendBtn).value='Send';
return;}
if(!ValidateEmails.isValidEmailList(emails,','))
{
T(errorArea,'Please enter valid email address/s');
$D(errorArea);
$(sendBtn).disabled=false;
$(sendBtn).value='Send';
return;}
if(SendPageToFriend.checkError(SendPageToFriend.emailBox)==true||SendPageToFriend.checkError('SPTFMessage')==true)
{
$(sendBtn).disabled=false;
$(sendBtn).value='Send';
return;}
var message=$('SPTFMessage').value;
message=message.replace(/\n/g,'<br />');
var flakeId=SendFlakeToFriend.flakeId.substr(1);
App.Server.SendThisFlakeToFriend(flakeId,emails,message,function(r){SendFlakeToFriend.sendComplete();});},
sendComplete:function()
{
var confirmation=$('SFTFSentMailConfirmation');
var sendBtn='SFTFButton';
$D(confirmation);
$('SPTFEmailAddresses').value='';
$(sendBtn).disabled=false;
$(sendBtn).value='Send';
$track('/SendFlake/Sent');}}
var ValidateEmails=
{
isValidEmailList:function(emailList,separator)
{
var emails=emailList.trim().split(separator);
if((emails!=null)&&(emails.length>0))
{
for(var i=0;i<emails.length;i++)
{
if(emails[i].trim().length>0)
{
if(!this.isValidEmail(emails[i].trim()))
{
return false;}}}}
return true;},
isValidEmail:function(email)
{
var regExp=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
return regExp.test(email);}}
var ImprovedTooltipNo=0;
var ImprovedTooltipCollection=new Array();
function ImprovedTooltip(target,objectId,tipId,tipText,tipAnchor,onCloseHandler)
{
if(typeof(target)=="string")target=$(target);
var targetId=target.id;
var div=$$("div");
if(ImprovedTooltipCollection[tipId]!=null)
{
var elementArray=ImprovedTooltipCollection[tipId];
for(var i=0;i<elementArray.length;i++)
{
if(elementArray[i]==targetId)
{
return;}}
ImprovedTooltipCollection[tipId].push(targetId);}
else
{
ImprovedTooltipCollection[tipId]=new Array();
ImprovedTooltipCollection[tipId].push(targetId);}
var no=ImprovedTooltipNo++;
var id="improvedTooltip"+no;
var html=$("improvedTooltip_NO_").innerHTML;
var leg,diff;
var tl,tr,bl,br,lt,lb,rt,rb;
tipAnchor=tipAnchor.toLowerCase();
div.id=id;
div.className="improvedTooltip";
html=html.replace(/_NO_/g,no);
div.innerHTML=html.replace(/_CONTENT_/g,tipText);
$('Content').appendChild(div);
$D(div);
function position()
{
if($(targetId)==null)
{
close();
return;}
else
{
target=$(targetId);}
if(canYouSeeMe(targetId))$D(div);
else $ND(div);
var pos=PU.getPosition(target);
var myPos=PU.getPosition(div);
var divLeft;
if(tipAnchor=="tl")
{
leg=$("improvedTooltipTop"+no);
diff=(myPos[2]/3-12);
$D(leg);
leg.style.left=diff+"px";
divLeft=(pos[0]-diff-20);
div.style.top=(pos[1]+pos[3])+"px";}
else if(tipAnchor=="tr")
{
leg=$("improvedTooltipTop"+no);
diff=(myPos[2]/3*2-12);
$D(leg);
leg.style.left=diff+"px";
divLeft=(pos[0]-diff-20);
div.style.top=(pos[1]+pos[3])+"px";}
else if(tipAnchor=="bl")
{
leg=$("improvedTooltipBottom"+no);
diff=(myPos[2]/3-12);
$D(leg);
leg.style.left=diff+"px";
divLeft=(pos[0]-diff-20);
div.style.top=(pos[1]-myPos[3])+"px";}
else if(tipAnchor=="br")
{
leg=$("improvedTooltipBottom"+no);
$D(leg);
diff=(myPos[2]/3*2-12);
leg.style.left=diff+"px";
divLeft=(pos[0]-diff-20);
div.style.top=(pos[1]-myPos[3])+"px";}
else if(tipAnchor=="lt")
{
leg=$("improvedTooltipLeft"+no);
diff=((leg.parentNode.offsetHeight+10)/3-5-12);
$D(leg);
leg.style.top=diff+"px";
divLeft=(pos[0]+pos[2]);
div.style.top=(pos[1]-diff-20)+"px";}
else if(tipAnchor=="lb")
{
leg=$("improvedTooltipLeft"+no);
diff=((leg.parentNode.offsetHeight+10)/3*2-5-12);
$D(leg);
leg.style.top=diff+"px";
divLeft=(pos[0]+pos[2]);
div.style.top=(pos[1]-diff-20)+"px";}
else if(tipAnchor=="rt")
{
leg=$("improvedTooltipRight"+no);
diff=((leg.parentNode.offsetHeight+10)/3-5-12);
if(Browser.isSafari)
diff+=20;
$D(leg);
leg.style.top=diff+"px";
divLeft=(pos[0]-myPos[2]);
div.style.top=(pos[1]+pos[3]/2-diff-20)+"px";}
else if(tipAnchor=="rb")
{
leg=$("improvedTooltipRight"+no);
diff=((leg.parentNode.offsetHeight+10)/3*2-5-12);
$D(leg);
leg.style.top=diff+"px";
divLeft=(pos[0]-myPos[2]);
div.style.top=(pos[1]-diff-20)+"px";}
if(divLeft<0)
div.style.left="0px";
else if(divLeft+myPos[2]>PU.getPosition($('Content'))[2])
div.style.left=PU.getPosition($('Content'))[2]-myPos[2]+"px";
else
div.style.left=divLeft+'px';}
position();
var si=setInterval(position,100);
$('improvedTooltipClose'+no).onclick=close;
function close()
{
clearInterval(si);
TipFactory.removeTip(objectId,tipId);
div.parentNode.removeChild(div);
var elementArray=ImprovedTooltipCollection[tipId];
Array.remove(elementArray,targetId);
if(elementArray.length==0)ImprovedTooltipCollection[tipId]=null;
if(typeof onCloseHandler=="function")
{
onCloseHandler();}}
div.si=si;
return div;}
var TipFactory=
{
_tooltips:[],
_flakeTips:[],
_pageTips:[],
_hasInitialized:false,
showTips:function(tooltips)
{
if(arguments[0]!=null)
{
TipFactory._tooltips=tooltips;}
if((TipFactory._tooltips==null)||(TipFactory._tooltips.length==0))
{
return;}
for(var i=0;i<App.pages.length;i++)
{
TipFactory.showPageTip(App.pages[i].id,'sendPageToFriend','onLoad');}
var page=App.currentPage;
if(page==null)return;
if((page.modules!=null)&&(page.modules.length>0))
{
for(var j=0;j<page.modules.length;j++)
{
TipFactory.showFlakeTip(page.modules[j].internalID,'sendFlakeToFriend','onLoad');}}
if(App.IsMySite)
{
TipFactory.showPageTip(page.id,'pageAddedAsbookmark','onLoad');
TipFactory.showPageTip(page.id,'pageCopied','onLoad');}},
showPageTip:function(pageId,when,trigger)
{
var tip=TipFactory._getPageTip(pageId,when,trigger)
if(tip!=null)
{
var tabs=$get('tabs');
if(tabs!=null)
{
var li=$get(pageId.toString(),tabs);
if(li!=null)
{
ImprovedTooltip(li,pageId,tip.id,tip.content,tip.anchor);}}}},
showFlakeTip:function(flakeId,when,trigger)
{
var tip=TipFactory._getFlakeTip(flakeId,when,trigger);
if(tip!=null)
{
var flakeHandle=$get('handle'+'m'+flakeId.toString());
if(flakeHandle!=null)
{
ImprovedTooltip(flakeHandle,flakeId,tip.id,tip.content,tip.anchor);}}},
removeTip:function(objectId,tipId)
{
var array=TipFactory._flakeTips[objectId];
if((array==null)||(array.length==0))
{
array=TipFactory._pageTips[objectId];}
if((array!=null)&&(array.length>0))
{
for(var i=array.length-1;i>-1;i--)
{
if(array[i].id==tipId)
{
Array.remove(array,array[i]);}}}
var userProfileTips=App.My.Profile['tooltips'];
if((userProfileTips!=null)&&(userProfileTips.length>0))
{
var userProfileTipArray=userProfileTips.split(',');
if((userProfileTipArray!=null)&&(userProfileTipArray.length>0))
{
var targetIndex=-1;
for(var i=0;i<userProfileTipArray.length;i++)
{
var tipParts=userProfileTipArray[i].split('=');
if((tipParts!=null)&&(tipParts.length>0))
{
if(parseInt(tipParts[0])==tipId)
{
if(tipParts.length>1)
{
var values=tipParts[1].split('&');
if((values!=null)&&(values.length>0))
{
if((values[0]=='_M_'+objectId)||(values[0]=='_P_'+objectId))
{
targetIndex=i;
break;}}}
else
{
targetIndex=i;
break;}}}}
if(targetIndex>-1)
{
var userProfileTipNewArray=new Array();
for(var i=0;i<userProfileTipArray.length;i++)
{
if(i!=targetIndex)
{
userProfileTipNewArray.push(userProfileTipArray[i]);}}
var tooltips='';
if(userProfileTipNewArray.length>0)
{
tooltips=userProfileTipNewArray.join(',');}
if(App.IsMySite)App.saveProfile("tooltips",tooltips);}}}},
_getPageTip:function(pageId,when,trigger)
{
if(!TipFactory._hasInitialized)
{
TipFactory._init();}
if(TipFactory._pageTips!=null)
{
var tipArray=TipFactory._pageTips[pageId];
if((tipArray!=null)&&(tipArray.length>0))
{
for(var i=0;i<tipArray.length;i++)
{
if((tipArray[i].when==when)&&(tipArray[i].trigger==trigger))
{
return tipArray[i];}}}}
return null;},
_getFlakeTip:function(flakeId,when,trigger)
{
if(!TipFactory._hasInitialized)
{
TipFactory._init();}
if(TipFactory._flakeTips!=null)
{
var tipArray=TipFactory._flakeTips[flakeId];
if((tipArray!=null)&&(tipArray.length>0))
{
for(var i=0;i<tipArray.length;i++)
{
if((tipArray[i].when==when)&&(tipArray[i].trigger==trigger))
{
return tipArray[i];}}}}
return null;},
_init:function()
{
if(TipFactory._hasInitialized)
{
return;}
var userProfileTips=App.My.Profile['tooltips'];
if((userProfileTips!=null)&&(userProfileTips.length>0))
{
var tipId=0;
var tip=null;
var objectId='';
var userProfileTipArray=userProfileTips.split(',');
if((userProfileTipArray!=null)&&(userProfileTipArray.length>0))
{
for(var i=0;i<userProfileTipArray.length;i++)
{
var tipParts=userProfileTipArray[i].split('=');
if((tipParts!=null)&&(tipParts.length>0))
{
tipId=parseInt(tipParts[0]);
tip=null;
if(tipParts.length==2)
{
var values=tipParts[1].split('&');
if((values!=null)&&(values.length>0))
{
tip=TipFactory._buildTip(tipId);
if(tip!=null)
{
objectId=values[0];
if(values.length>1)
{
for(var j=1;j<values.length;j++)
{
tip.content=TipFactory._replaceText(tip.content,'{'+(j-1)+'}',values[j]);}}
if(objectId.startsWith('_M_'))
{
objectId=parseInt(TipFactory._replaceText(objectId,'_M_',''));
if(TipFactory._flakeTips[objectId]==null)
{
TipFactory._flakeTips[objectId]=new Array();}
TipFactory._flakeTips[objectId].push(tip);}
else if(objectId.startsWith('_P_'))
{
objectId=parseInt(TipFactory._replaceText(objectId,'_P_',''));
if(TipFactory._pageTips[objectId]==null)
{
TipFactory._pageTips[objectId]=new Array();}
TipFactory._pageTips[objectId].push(tip);}}}}
else
{}}}}}
TipFactory._hasInitialized=true;},
_buildTip:function(tipId)
{
if((TipFactory._tooltips==null)||(TipFactory._tooltips.length==0))
{
return null;}
var tip;
for(var i=0;i<TipFactory._tooltips.length;i++)
{
tip=TipFactory._tooltips[i];
if(tipId==tip.id)
{
return{id:tip.id,when:tip.when,anchor:tip.anchor,trigger:tip.trigger,content:tip.tip};}}
return null;},
_replaceText:function(text,oldText,newText)
{
var replacedText=text.split(oldText);
replacedText=replacedText.join(newText);
return replacedText;}}
function hideMessage()
{
if(T('errorMsg')=="Welcome to the new Pageflakes! We've made some changes - click here to learn more!")
{
var a=$('messageBarClose');
App.My.Profile["BN"]="0";
$clearEvent(a);
App.saveProfile("BN","0");}
$nodisplay('messageBar');}
function animateStartButton(firstTime)
{
if($("Start").className=="Start_down")return;
var aniDiv=$('StartAnimation');
var si;
if(!aniDiv)
si=window.setTimeout(animateStartButton,2000);
if(!$isVisible($("Start")))
{
$ND(aniDiv);
return;}
$D(aniDiv);
var img=aniDiv.getElementsByTagName("img")[0];
var src=img.src;
if(firstTime)
{
if(src.indexOf('_text')<0)
img.src=src.replace(/flakefall/g,"flakefall_text");}
else
{
if(src.indexOf('_text')>0)
img.src=src.replace(/_text/g,"");
else
img.src=src;}
var pos=PU.getPosition($('Start'));
aniDiv.style.left=pos[0]+10+'px';
aniDiv.style.top=15+'px';}
$DC(function()
{
if(!window.startupInfo.IsFirstVisit&&!window.suppressLoad)SF.initialize();});
