var SETTINGS_POPUP_ID = "SettingsPopup";
var SHARE_NOSHARE = "SharingOptions_NoShare";
var SHARE_PUBLIC = "SharingOptions_Public";
var SHARE_SHARE = "SharingOptions_Share";
var SHARE_SHAREDUSERS = "SharingOptions_SharedUsers";
var PUB_SHAREDUSERS = "PublishOptions_SharedUsers";
var PUB_USERNAME = "PublisOptions_UserName";
var PUB_USERNAMEURL = "PublisOptions_UserNameUrl";
var SHARINGOPTIONS_NOSHARE_TOOLTIP = Lang.SHARINGOPTIONS_NOSHARE_TOOLTIP;
var SHARINGOPTIONS_PUBLIC_TOOLTIP = Lang.SHARINGOPTIONS_PUBLIC_TOOLTIP;
var SHARINGOPTIONS_SHARE_TOOLTIP = Lang.SHARINGOPTIONS_SHARE_TOOLTIP;
var SHARE_NOSHARE_LBL = "SharingOptions_NoShareLabel";
var SHARE_PUBLIC_LBL = "SharingOptions_PublicLabel";
var SHARE_SHARE_LBL = "SharingOptions_ShareLabel";
var PUB_PAGETITLE = "PublishOptions_Title";
var PUB_TITLE_REQ = "PublishOptions_TitleReq";
var PUB_DESC = "PublishOptions_Description";
var PUB_DESC_REQ = "PublishOptions_DescriptionReq";
var PUB_TAGS = "PublishOptions_Tags";
var PUB_TAG_REQ = "PublishOptions_TagReq";
var PUB_ALLOW_EDIT = "PublishOptions_AllowEdit";
var SHAREDIALOG_ERRORINMAIL = "shareDialog_ErrorInMail";
var SHAREDIALOG_ERRORTITLE = "shareDialog_ErrorTitle";
var SHARINGOPTIONS_ALLOWEDIT = "SharingOptions_AllowEdit";
var PAGELAYOUT_PAGETITLE = "PageLayout_PageTitle";
var PUBDIALOG_ERRORINMAIL = "PublishDialog_ErrorInMail";
var PUBDIALOG_ERRORTITLE = "PublishDialog_ErrorTitle";
var PUBDIALOG_MESSAGE = "PublishDialog_Message";
var SHARINGOPTIONS_SAVE = "SharingOptions_Save";
var SHARINGOPTIONSBODY = "SharingOptionsBody";
var SHARINGOPTIONSBODY_DUMMY = "SharingOptionsDummyBody";
var tempGlobalLocation = "";
var tempGlobalTimezone = "";
var tempGlobalZip = "";
var PROFILE_Public = 0;
var PROFILE_UniqueName = 1;
var PROFILE_StorageId = 2;
var PROFILE_AboutMe = 3;
var PROFILE_Msgs = 4;
var PROFILE_ImagePath = 5;
var PROFILE_StorageIdKey = 6;
var PROFILE_Size = 7;
var PROFILE_UrlPrefix = 8;
var PROFILE_HasPagecasts = 9;
var PROFILE_Sex = 10;
var PUBLIC_PROFILE_LINK = "Public_Profile_Link";
var PAPER_ICON = "paperIcon.png";
var MANAGE_BOOKMARK_POPUP_ID = "ManageBookmarkPopup";
var PAGE_SETTINGS_POPUP_ID = "gray_panel_dropdown_settings";
var PAGESETTINGS_PROFILE_MESSAGE = "PageSettings_Profile_Message";
var savedUniqueName;
var _profilePublicIsLoaded = false;
var _profileBasicIsLoaded = false;
var _profileInterestIsLoaded = false;
var _showInPublicDirectory;
var _uniqueName;
var _ecoStorageId;
var _aboutMe;
var _welcomesMessages;
var _sex;
var _location; var _firstName; var _lastName; var _email; var _interests; var _dobDay;
var _dobMonth; var _dobYear; var _dobGender; var _hometown; var _showFirstName;
var _showLastName; var _showGender; var _showDob; var _showLocation; var _showHometown;
var _showInterests; var _urlPrefix; var _imageHandlerPath; var _storageIDKey; var _size;
var _hasPagecasts;
var OPMLOptionContents = '<iframe id="OPMLoptions" src="OPMLimporter.aspx?v=1" scrolling="no" border="0" frameborder="no" framespacing="0" style="width: 100%; height: 50px;border:none;position: static;background: transparent;" allowtransparency="true"></iframe>';
var OPMLMessage;
var _browseFlakeScrollTopPos = 0;
var _browseFlakeScrollHeight = 0;
var _browseFlakeInitScrollPos = 0;
var si = null;
var Start = {
    MenuIsOpen: false,
    showPageSettings: function (A, B, D) {
        Start.isLocked = false;
        var E = $(PAGE_SETTINGS_POPUP_ID);
        if (typeof (B) == "undefined") {
            B = 0
        }
        $fixTable("body");
        var C = PF.$("Start");
        if (Start.MenuIsOpen) {
            Start.closeStartButton(C, A)
        }
        else {
            Start.openStartButton(C, E, B, D)
        }
        $DC($fixTable);
        return $isVisible(E)
    }, openStartButton: function (B, D, A, C) {
        if (D.innerHTML.length == 0) {
            Start.hidePageSettings();
            $D(D);
            D.innerHTML = Lang.LOADING;
            Start.MenuIsOpen = true;
            B.className = "Start_down";
            HttpLoader.getUrl(SITE_PREFIX + "PageSettingsDropdown2.aspx?userGuid=" + App.UserGUID + "&v=" + VERSION_SUFFIX, function (E) {
                D.innerHTML = E;
                $trackEvent("Menu Button", "Open", "Direct Click");
                if (A > 0) {
                    $DC(function () {
                        Start.keepSelectedMenu("settingsLeftMenuUL", A);
                        Start.loadPageSettingGrid(A, App.DomainID, App.LanguageID, true, C)
                    })
                }
                else {
                    $DC(function () {
                        Start.keepSelectedMenu("settingsLeftMenuUL", A)
                    })
                }
                if (Browser.isIE6) {
                    Start.fixGallery();
                    D.innerHTML = E
                }
            })
        }
        else {
            Start.hidePageSettings();
            $trackEvent("Menu Button", "Open", "Direct Click");
            Start.loadPageSettingGrid(A, App.DomainID, App.LanguageID, true, C);
            $D(D);
            Start.MenuIsOpen = true;
            B.className = "Start_down"
        }
    }, closeStartButton: function (B, A) {
        Start.hidePageSettings();
        B.className = "";
        Start.MenuIsOpen = false;
        if (isNaN(A)) {
            $trackEvent("Menu Button", "Close", "Direct Click")
        }
        else {
            $trackEvent("Menu Button", "Close", "Close Click")
        }
    }, hidePageSettings: function (A) {
        $ND(PAGE_SETTINGS_POPUP_ID);
        $("Start").className = ""
    }, loadOnsiteItemGallery: function (B, A) {
        Start.keepSelectedMenu("onsite_gallery_table", A);
        $("OnsiteFlakeGrid").innerHTML = "<div class='downloadInProgress' valign='middle' style='height:144px' >&nbsp;</div>";
        _browseFlakeScrollTopPos = $("OnsiteFlakeCategoryList").scrollTop;
        _browseFlakeScrollHeight = $("SettingsMidMenuTD").offsetHeight;
        AddContentWS.GetOnsiteItemGrid(B, VERSION_SUFFIX, function (C) { $("OnsiteFlakeGrid").innerHTML = C; $nodisplay($("OnsiteFlakeCategoryList")); var D = $("SettingsGridTable").offsetHeight; $display($("OnsiteFlakeCategoryList")); $("OnsiteFlakeCategoryList").style.height = D.toString() + "px"; var E = $("SettingsMidMenuTD").offsetHeight - _browseFlakeScrollHeight; $("OnsiteFlakeCategoryList").scrollTop = _browseFlakeScrollTopPos - E; _browseFlakeInitScrollPos = $("OnsiteFlakeCategoryList").scrollTop })
    }, loadOnsiteItemGalleryForRSS: function () {
        try {
            window.setTimeout(function () {
                if ($("OPMLoptions")) {
                    $("OPMLoptions").src = SITE_PREFIX + "/OpmlImporter.aspx?v=1"
                }
            }, 300)
        }
        catch (A) { }
    }, fixOPMLWindow: function () {
        window.setTimeout(new function () {
            try {
                $("OPMLoptions").src = SITE_PREFIX + "/OpmlImporter.aspx?v=1"
            }
            catch (A) { }
        }, 200)
    }, hidePageSettingGrids: function () {
        $ND("PageSettingGridTopFlake", "PageSettingGridBrowseFlake", "PageSettingGridCommunityPage", "PageSettingGridSharePage", "PageSettingGridChangeTheme", "PageSettingGridChangeLayout", "PageSettingGridMyProfile", "PageSettingsGridAddFeedBody")
    }, keepSelectedMenu: function (D, C) {
        var A = $(D).getElementsByTagName("a");
        for (var B = 0; B < A.length; B++) {
            A[B].className = ""
        }
        if (C != 7) {
            if (typeof C != "object") {
                C = A[C]
            }
            C.className = "a_hover"
        }
    }, onsiteThumbHover: function (A) {
        $addClass($("OnSiteThumb" + A), "OnsiteThumbHover")
    }, onsiteThumbHoverOut: function (A) {
        $removeClass($("OnSiteThumb" + A), "OnsiteThumbHover")
    }, loadPageSettingGrid: function (B, D, A, E, C) {
        if (Start.isLocked) {
            return
        }
        Start.isLocked = true;
        if ($("settingsLeftMenuUL") != null) {
            Start.keepSelectedMenu("settingsLeftMenuUL", B)
        }
        Start.hidePageSettingGrids();
        $D("PageSettingLoading");
        if ($("PageSettingGrid")) {
            $("PageSettingGrid").style.padding = "10px"
        }
        $("PageSettingLoading").innerHTML = "<div class='downloadInProgress' valign='middle' style='height:144px' >&nbsp;</div>";
        if (B == 0 || B == 1 || B == 2) {
            AddContentWS.GetPageSettingsGrid(B, D, A, VERSION_SUFFIX, function (G) {
                $ND("PageSettingLoading");
                G = G.hasOwnProperty("d") ? G.d : G; // added by franck a cause du d:
                if (B == 0) {
                    $("PageSettingGridTopFlake").innerHTML = "";

                    $("PageSettingGridTopFlake").innerHTML = G; // should be only G
                    $D("PageSettingGridTopFlake");
                    $("PageSettingGrid").style.padding = "0";
                    var J = typeof (E) != "undefined" && E ? false : true;
                    if (J) {
                        $trackEvent("Onsite Gallery", "Top Level Selection", "Top Flakes")
                    }
                }
                else {
                    if (B == 1) {
                        $("PageSettingGridBrowseFlake").innerHTML = "";
                        $("PageSettingGridBrowseFlake").innerHTML = G;
                        $D("PageSettingGridBrowseFlake");
                        $("PageSettingGrid").style.padding = "0px";
                        if (Browser.isIE6) {
                            $("SettingsGridTable").style.height = "215px";
                            $("OnsiteFlakeCategoryList").style.height = "215px"
                        }
                        $("OnsiteFlakeCategoryList").style.height = $("SettingsGridTable").offsetHeight + "px";
                        $trackEvent("Onsite Gallery", "Top Level Selection", "Browse Flakes");
                        if (typeof (C) != "undefined") {
                            var I = PF.$("OnsiteFlakeCategoryList").getElementsByTagName("DIV");
                            C = C.replace(/_/g, " ");
                            C = C.replace("and", "&amp;");
                            for (var H = 0; H < I.length; H++) {
                                if (I[H].innerHTML.toLowerCase() == C) {
                                    I[H].parentNode.onclick()
                                }
                            }
                        }
                    }
                    else {
                        if (B == 2) {
                            $("PageSettingGridCommunityPage").innerHTML = "";
                            $("PageSettingGridCommunityPage").innerHTML = G;
                            $D("PageSettingGridCommunityPage");
                            $trackEvent("Onsite Gallery", "Top Level Selection", "Pagecasts")
                        }
                    }
                }
                Start.isLocked = false
            })
        }
        else {
            if (B == 3) {
                $("PageSettingGrid").style.padding = "0"; Start.loadPublish();
                Start.isLocked = false
            }
            else {
                if (B == 4) {
                    $("PageSettingGrid").style.padding = "0"; Start.loadTheme();
                }
                else {
                    if (B == 5) {
                        $("PageSettingGrid").style.padding = "0";
                        Start.loadPageLayout();
                        Start.isLocked = false
                    }
                    else {
                        if (B == 6) {
                            _profilePublicIsLoaded = false;
                            _profileBasicIsLoaded = false;
                            _profileInterestIsLoaded = false;
                            Start.Profile.load(C);
                            $("PageSettingGrid").style.padding = "0";
                            $ND("PageSettingLoading");
                            $D("PageSettingGridMyProfile");
                            Start.isLocked = false;
                            $trackEvent("Onsite Gallery", "Top Level Selection", "My Profile")
                        }
                        else {
                            if (B == 7) {
                                $("PageSettingGrid").style.padding = "0";
                                $ND("PageSettingLoading");
                                $D("PageSettingsGridAddFeedBody");
                                Start.loadOnsiteItemGalleryForRSS();
                                Start.isLocked = false;
                                $trackEvent("Onsite Gallery", "Top Level Selection", "Add RSS Feed")
                            }
                        }
                    }
                }
            }
        }
        if (Browser.isIE6) {
            Start.fixGallery()
        }
    }, fixGallery: function () {
        $(PAGE_SETTINGS_POPUP_ID).style.height = $("SettingsTable").offsetHeight + "px"
    }, loadPublish: function () {
        Settings.initSharing();
        $ND("PageSettingLoading");
        $D("PageSettingGridSharePage");
        if (!App.currentPage.IsOwner && !App.currentPage.CanEditPage) {
            $D("SharingOptionsDisabled");
            $ND("SharingOptions")
        }
        else {
            $ND("SharingOptionsDisabled");
            $D("SharingOptions")
        }
        $trackEvent("Onsite Gallery", "Top Level Selection", "Make Pagecast")
    }, loadTheme: function () {
        Start.Theme.load(function () {
            $ND("PageSettingLoading");
            $D("PageSettingGridChangeTheme");
            Start.isLocked = false;
            if (!App.currentPage.IsOwner && !App.currentPage.CanEditPage) {
                $ND("ThemeArea");
                $D("ThemeAreaDisabled")
            }
            else {
                $D("ThemeArea");
                $ND("ThemeAreaDisabled")
            }
            $trackEvent("Onsite Gallery", "Top Level Selection", "Change Theme")
        })
    }, loadPageLayout: function () {
        $ND("PageSettingLoading");
        $D("PageSettingGridChangeLayout");
        Settings.initLayout();
        if (!App.currentPage.IsOwner && !App.currentPage.CanEditPage) {
            $D("PageSettingsBodyDisabled");
            $ND("PageSettingsBody")
        }
        else {
            $ND("PageSettingsBodyDisabled");
            $D("PageSettingsBody")
        }
        $trackEvent("Onsite Gallery", "Top Level Selection", "Change Layout")
    }, toggleStart: function (A, B, C) {
        Start.showPageSettings(A, B, C);
        $ND("StartAnimation")
    }
};
Start.isLocked = false;
Start.ProfileDIV = {
    PROFILE_AREA: "PageSettingsProfileArea"
    , PROFILE_AREA_DISABLED: "PageSettingsProfileAreaDisabled"
    , PROFILE_BASIC: "PageSettings_Profile_Basic"
    , PROFILE_PUBLIC: "PageSettings_Profile_Public"
    , PROFILE_INTEREST: "PageSettings_Profile_Interest"
    , PROFILE_ACCOUNT: "PageSettings_Profile_Account"
};
Start.ProfileGeo = null;
Start.ProfileGeo2 = null;
Start.Location = "";
Start.SiteUrl = "";
Start.Profile = { 
    load: function (A) {
        $D(Start.ProfileDIV.PROFILE_AREA_DISABLED);
        $ND(Start.ProfileDIV.PROFILE_AREA);
        if (!App.IsAnonymous) {
            $ND(Start.ProfileDIV.PROFILE_AREA_DISABLED);
            $D(Start.ProfileDIV.PROFILE_AREA);
            if (A == "account") {
                Start.Profile.setProfileTab(Start.ProfileDIV.PROFILE_BASIC);
                $select($("profileListBasic"), "themeactivetab", "LI")
            }
            else {
                if (A == "settings") {
                    Start.Profile.setProfileTab(Start.ProfileDIV.PROFILE_INTEREST);
                    $select($("profileListInterest"), "themeactivetab", "LI")
                }
                else {
                    Start.Profile.setProfileTab(Start.ProfileDIV.PROFILE_PUBLIC);
                    $select($("profileListPublic"), "themeactivetab", "LI")
                } 
            }
            Start.Location = App.getLocationVariable()
        }
    }, checkShowInPublicProfile: function () {
        if ($("PageSettings_Profile_Public_chkShowInPublicDirectory").checked) {
            this.showUrls()
        }
        else {
            $("ProfileAddressLinkDiv").innerHTML = ""
        }
        this.enableControls()
    }, enableControls: function () {
        this.enablePublicProfileControls();
        this.enableShowInCheckboxes()
    }, enablePublicProfileControls: function () {
        var A = !($("PageSettings_Profile_Public_chkShowInPublicDirectory").checked);
        $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkWelcomesMessages").disabled = A
    }, enableShowInCheckboxes: function () {
        var A = !($("PageSettings_Profile_Public_chkShowInPublicDirectory").checked);
        $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkWelcomesMessages").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkFirstName").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLastName").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkGender").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkDateOfBirth").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLocation").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkHometown").disabled = A;
        $(Start.ProfileDIV.PROFILE_BASIC + "_chkInterest").disabled = A
    }, toggleProfileUrl: function () {
        if ($("PageSettings_Profile_Public_chkShowInPublicDirectory").checked) {
            this.showUrls()
        }
        else {
            $("ProfileAddressLinkDiv").innerHTML = ""
        }
    }, setProfileTab: function (A) {
        this.clearAllSaveMessages();
        $ND(Start.ProfileDIV.PROFILE_BASIC, Start.ProfileDIV.PROFILE_PUBLIC, Start.ProfileDIV.PROFILE_INTEREST);
        Start.Profile.initTab(A); $D(A); if (Browser.isIE6) { setTimeout(Start.fixGallery, 2000) } 
    },refreshProfilePhoto: function (A, D, C, B) {
        $D("PhotoCommandDiv");
        $ND("PhotoUploadDiv");
        $visible("DeletePhotoLink");
        _imageHandlerPath = A;
        _storageIDKey = D;
        _ecoStorageId = C;
        _size = B;
        Start.Profile.displayProfilePhoto(A, D, C, B)
    }, displayProfilePhoto: function (A, G, C, B, D) {
        var H = "";
        if (C.length > 0 && C != "0") {
            H = A + "?" + G + "=" + C + "&width=" + B + "&height=" + B + "&rnd=" + Math.random() * 5
        }
        else {
            H = IMAGE_PREFIX + "images/MaleLarge.gif";
            if (D != null) {
                if (D == "2") {
                    H = IMAGE_PREFIX + "images/FemaleLarge.gif"
                }
            }
            $hide("DeletePhotoLink")
        }
        var E = $("PageSettings_Profile_Public_imgProfile");
        E.src = H
    }, getDefaultPhoto: function () {
        var A = IMAGE_PREFIX + "images/MaleLarge.gif";
        if (_sex != null) {
            if (_sex == "2") {
                A = IMAGE_PREFIX + "images/FemaleLarge.gif"
            }
        }
        return A
    }, deletePhoto: function (A) {
        _ecoStorageId = "";
        CoreServices.DeleteProfilePhoto(function (B) {
            if (B) {
                $hide("DeletePhotoLink");
                var D = Start.Profile.getDefaultPhoto();
                var C = $("PageSettings_Profile_Public_imgProfile");
                C.src = D
            }
        })
    }, showUrls: function () {
        if (_urlPrefix == null || _urlPrefix.length == 0 || _hasPagecasts == null) {
            CoreServices.GetPublicUrlInfo(function (D) {
                var C = 0;
                var B = 1;
                var E = D[C];
                var A = D[B];
                Start.Profile.doShowUrls(E, A)
            })
        }
        else {
            Start.Profile.doShowUrls(_urlPrefix, _hasPagecasts, uniqueName)
        }
    }, doShowUrls: function (E, B) {
        var A = $("PageSettings_Profile_Public_txtUsername");
        uniqueName = A.value;
        showInPublicDirectory = $("PageSettings_Profile_Public_chkShowInPublicDirectory").checked;
        var D = E + uniqueName;
        var C = D + "/p";
        if (!showInPublicDirectory) {
            C = ""
        }
        if (typeof B == "undefined" || B != "true") {
            B = "false"
        }
        if (B != "true") {
            D = ""
        }
        this.setUrlValues(C, D)
    }, setUrlValues: function (B, D) {
        var A = $("ProfileAddressLinkDiv");
        if (A != null) {
            if ($trim(B).length > 0) {
                A.innerHTML = this.createHyperLink(B, B)
            }
            else {
                A.innerHTML = ""
            }
        }
        var C = $("PagecastLinkDiv");
        if (C != null) {
            if ($trim(D).length > 0) {
                C.innerHTML = this.createHyperLink(D, D)
            }
            else {
                C.innerHTML = ""
            }
        }
    }, createHyperLink: function (A, C) {
        var B = '<a href="' + A + '">' + C + "</a>";
        return B
    }, showUploadPhoto: function () {
        $ND("PhotoCommandDiv");
        $D("PhotoUploadDiv")
    }, cancelUploadPhoto: function () {
        $ND("PhotoUploadDiv");
        $D("PhotoCommandDiv")
    }, typeUsername: function () {
        this.validateUsername(false, function (A) {
            if (A.length > 0) {
                Start.Profile.setUsernameMessage(A);
                Start.Profile.setUrlValues("", "")
            }
            else {
                Start.Profile.setUsernameMessage("");
                Start.Profile.showUrls()
            }
        });
        usernameTextBox = null
    }, savePublicProfile: function (A) {
        this.clearSaveMessage(Start.ProfileDIV.PROFILE_PUBLIC);
        Start.Profile.setUsernameMessage("");
        this.validateUsername(true, function (B) {
            if (B.length > 0) {
                Start.Profile.setUsernameMessage(B)
            }
            else {
                Start.Profile.doSavePublicProfile(A)
            }
        })
    }, validateUsername: function (J, C) {
        var H = "";
        var I = $(Start.ProfileDIV.PROFILE_PUBLIC + "_txtUsername");
        var E = $trim(I.value);
        if (E.length == 0) {
            H = "Username cannot be blank."
        }
        if (H.length == 0) {
            if (E.substring(0, 1) == "." || E.substring(0, 1) == "_") {
                H = "Must start with an alpha or number"
            }
        }
        if (H.length == 0) {
            if (E.substring(E.length - 1, E.length) == "." || E.substring(E.length - 1, E.length) == "_") {
                H = "Must end with an alpha or number"
            }
        }
        if (H.length == 0) {
            var A = new RegExp("([^a-zA-Z0-9._])");
            var G = E.match(A);
            if (G != null) {
                H = "There are invalid characters in the username."
            }
        }
        if (H.length == 0) {
            var K = 0;
            for (var D = 0; D < E.length; D++) {
                var B = E.substring(D, D + 1);
                if (B == "." || B == "_") {
                    K++
                }
            }
            if (K > 1) {
                H = "Only 1 '.' or '_' is allowed."
            }
        }
        if (H.length > 0) {
            if (typeof C == "function") {
                C(H)
            }
        }
        else {
            if (J) {
                CoreServices.ValidateUniqename(E, function (L) {
                    if (!L) {
                        C("Username is already taken.")
                    }
                    else {
                        C("")
                    }
                })
            }
            else {
                C("")
            }
        }
        I = null
    }, setUsernameMessage: function (B) {
        var A = document.getElementById("UsernameMessageTD");
        if (A != null) {
            A.innerHTML = B
        }
    }, doSavePublicProfile: function (A) {
        _showInPublicDirectory = $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkShowInPublicDirectory").checked;
        _uniqueName = $trim($(Start.ProfileDIV.PROFILE_PUBLIC + "_txtUsername").value);
        _aboutMe = $trim($(Start.ProfileDIV.PROFILE_PUBLIC + "_txtAboutMe").value);
        _welcomesMessages = $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkWelcomesMessages").checked;
        var B = new Array();
        B[PROFILE_Public] = _showInPublicDirectory ? "1" : "0";
        B[PROFILE_UniqueName] = _uniqueName;
        B[PROFILE_AboutMe] = _aboutMe;
        B[PROFILE_Msgs] = _welcomesMessages ? "1" : "0";
        CoreServices.SavePublicProfile(B, function (D) {
            if (!D) {
                Start.Profile.showError(tabId, "Sorry! there was a problem saving your information")
            }
            else {
                App.UserUniqueName = B[PROFILE_UniqueName];
                App.saveProfile("UserNameChanged", "1");
                Start.Profile.showSaveMessage(A);
                Start.Profile.showUrls();
                var C = $("homeProfileLink");
                if (_showInPublicDirectory) {
                    C.href = SITE_PREFIX + App.UserUniqueName + "/p"
                }
                else {
                    C.href = SITE_PREFIX
                }
                PublicPageTab.init(App.currentPage.IsPublished)
            }
        })
    }, showSaveMessage: function (A) {
        var B = $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkShowInPublicDirectory").checked ? true : false;
        if (B) {
            $visible($(PUBLIC_PROFILE_LINK))
        }
        else {
            $hide($(PUBLIC_PROFILE_LINK))
        }
        $("settingMessage").style.display = "block";
        $ND($("errorMsgPublic"));
        $ND($("errorMsgBasic"));
        $ND($("errorMsgInterest"));
        if (A == Start.ProfileDIV.PROFILE_PUBLIC) {
            $D($("errorMsgPublic"))
        }
        else {
            if (A == Start.ProfileDIV.PROFILE_BASIC) {
                $D($("errorMsgBasic"))
            }
            else {
                if (A == Start.ProfileDIV.PROFILE_INTEREST) {
                    $D($("errorMsgBasic"))
                }
            }
        }
    }, clearSaveMessage: function (A) {
        $("settingMessage").style.display = "none"
    }, clearAllSaveMessages: function () {
        this.clearSaveMessage(Start.ProfileDIV.PROFILE_BASIC);
        this.clearSaveMessage(Start.ProfileDIV.PROFILE_PUBLIC);
        this.clearSaveMessage(Start.ProfileDIV.PROFILE_INTEREST)
    }, cancelMyProfile: function (A) {
        Start.hidePageSettings();
        switch (A) {
            case Start.ProfileDIV.PROFILE_PUBLIC: this.initTabsFromMemberVars(A);
                this.setUsernameMessage("");
                this.cancelUploadPhoto();
                break;
            case Start.ProfileDIV.PROFILE_BASIC: _profileBasicIsLoaded = false;
                this.initTab(A);
                break;
            case Start.ProfileDIV.PROFILE_INTEREST: _profileInterestIsLoaded = false;
                this.initTab(A);
                break
        }
    }, saveMyProfile: function (A) {
        if (_profilePublicIsLoaded && A == Start.ProfileDIV.PROFILE_PUBLIC) {
            this.savePublicProfile(A)
        }
        else {
            if (_profileBasicIsLoaded && A == Start.ProfileDIV.PROFILE_BASIC) {
                this.saveTab(Start.ProfileDIV.PROFILE_BASIC, A)
            }
            else {
                if (_profileInterestIsLoaded && A == Start.ProfileDIV.PROFILE_INTEREST) {
                    this.saveTab(Start.ProfileDIV.PROFILE_INTEREST)
                }
            }
        }
    }, saveTab: function (E, C) {
        if (!App.IsAnonymous) {
            var O = false;
            var D = false;
            var B = false;
            Start.Profile.clearError(E);
            var J = false;
            var L = false;
            if (E == Start.ProfileDIV.PROFILE_BASIC) {
                Start.Profile.clearAllSaveMessages();
                Start.Profile.clearError(E);
                _firstName = $trim($(Start.ProfileDIV.PROFILE_BASIC + "_txtFirstName").value);
                _lastName = $trim($(Start.ProfileDIV.PROFILE_BASIC + "_txtLastName").value);
                if (_firstName == "") {
                    $(Start.ProfileDIV.PROFILE_BASIC + "_errFirstName").style.display = "";
                    Start.Profile.showError(E, "Please provide your first name");
                    return
                }
                else {
                    if (_lastName == "") {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_errLastName").style.display = "";
                        Start.Profile.showError(E, "Please provide your last name");
                        return
                    }
                }
                if ($isVisible(Start.ProfileDIV.PROFILE_BASIC + "_frmPassword")) {
                    var Q = $trim($(Start.ProfileDIV.PROFILE_BASIC + "_txtPassword").value);
                    var I = $trim($(Start.ProfileDIV.PROFILE_BASIC + "_txtNewPassword").value);
                    var K = $trim($(Start.ProfileDIV.PROFILE_BASIC + "_txtConfirmPassword").value);
                    if (Q != "") {
                        if (I != K) {
                            Start.Profile.clearAllSaveMessages();
                            Start.Profile.showError(E, "New Password and confirmation does not match");
                            $(Start.ProfileDIV.PROFILE_BASIC + "_errNewPassword").style.display = "";
                            $D(Start.ProfileDIV.PROFILE_BASIC + "_errConfirmPassword");
                            return
                        }
                        else {
                            D = true
                        }
                    }
                    else {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_errPassword").style.display = "";
                        Start.Profile.clearAllSaveMessages();
                        Start.Profile.showError(E, "Please enter password");
                        return
                    }
                }
                if (null != Start.ProfileGeo) {
                    Start.Profile.geoLocated();
                    var N = App.My;
                    var A = Start.ProfileGeo;
                    if (N.Country != A.Country || N.State != A.State || N.City != A.City || N.ZipCode != A.ZipCode) {
                        J = true
                    }
                    N.Country = A.Country;
                    N.State = A.State;
                    N.City = A.City;
                    N.ZipCode = A.ZipCode
                }
                B = true;
                App.My.FirstName = _firstName;
                App.My.LastName = _lastName;
                var M = $(Start.ProfileDIV.PROFILE_BASIC + "_txtInterest").value.split(",");
                App.My.Interests = M;
                _dobMonth = $(Start.ProfileDIV.PROFILE_BASIC + "_drpMonth").value;
                _dobDay = $(Start.ProfileDIV.PROFILE_BASIC + "_drpDay").value;
                _dobYear = $(Start.ProfileDIV.PROFILE_BASIC + "_drpYear").value;
                _dobGender = $(Start.ProfileDIV.PROFILE_BASIC + "_drpGender").value;
                _sex = _dobGender;
                _hometown = $(Start.ProfileDIV.PROFILE_BASIC + "_txtHometown").value;
                _showFirstName = $(Start.ProfileDIV.PROFILE_BASIC + "_chkFirstName").checked;
                _showLastName = $(Start.ProfileDIV.PROFILE_BASIC + "_chkLastName").checked;
                _showGender = $(Start.ProfileDIV.PROFILE_BASIC + "_chkGender").checked;
                _showDob = $(Start.ProfileDIV.PROFILE_BASIC + "_chkDateOfBirth").checked;
                _showLocation = $(Start.ProfileDIV.PROFILE_BASIC + "_chkLocation").checked;
                _showHometown = $(Start.ProfileDIV.PROFILE_BASIC + "_chkHometown").checked;
                _showInterests = $(Start.ProfileDIV.PROFILE_BASIC + "_chkInterest").checked;
                var G = new Array();
                G[0] = _dobMonth;
                G[1] = _dobDay;
                G[2] = _dobYear;
                G[3] = _dobGender;
                G[4] = _hometown;
                G[4] = G[4].replace(/\|/g, "");
                G[5] = _showFirstName ? "1" : "0";
                G[6] = _showLastName ? "1" : "0";
                G[7] = _showGender ? "1" : "0";
                G[8] = _showDob ? "1" : "0";
                G[9] = _showLocation ? "1" : "0";
                G[10] = _showHometown ? "1" : "0";
                G[11] = _showInterests ? "1" : "0";
                var H = G[0] + "|" + G[1] + "|" + G[2] + "|" + G[3] + "|" + G[4] + "|" + G[5] + "|" + G[6] + "|" + G[7] + "|" + G[8] + "|" + G[9] + "|" + G[10] + "|" + G[11]
            }
            else {
                if (E == Start.ProfileDIV.PROFILE_INTEREST) {
                    if ($(Start.ProfileDIV.PROFILE_BASIC + "_chkNewsletter").checked) {
                        App.IsSubscribedForNewsletter = true
                    }
                    else {
                        App.IsSubscribedForNewsletter = false
                    }
                    if ($(Start.ProfileDIV.PROFILE_BASIC + "_chkSearch").checked) {
                        App.ShowSearchBar = true;
                        SearchForm.open()
                    }
                    else {
                        App.ShowSearchBar = false;
                        SearchForm.close(true)
                    }
                    if (typeof (LANGUAGE) != "undefined") {
                        if ($("drpChangeLanguage").value != LANGUAGE) {
                            App.changeLanguage()
                        }
                    }
                }
            }
            App.saveUserInfo(function (R) {
                if (E == Start.ProfileDIV.PROFILE_BASIC) {
                    App.Server.SaveUserProfile(H, function (U) {
                        App.UserFullName = App.My.FirstName + " " + App.My.LastName;
                        App.UserFullName = $trim(App.UserFullName);
                        var V = $("UserFullName");
                        V.innerHTML = "";
                        var S = $$("a");
                        S.setAttribute("id", "homeProfileLink");
                        if (_showInPublicDirectory) {
                            S.href = SITE_PREFIX + App.UserUniqueName + "/p"
                        }
                        else {
                            S.href = SITE_PREFIX
                        }
                        V.appendChild(S);
                        T("homeProfileLink", App.My.FirstName.substring(0, Math.min(15, App.UserFullName.length)));
                        if (L) {
                            App.changeGlobalTimezone(App.My.Timezone)
                        }
                        if (J) {
                            App.changeGlobalLocation(App.My.City, App.My.State, App.My.ZipCode, App.My.Country, false)
                        }
                        if (D) {
                            App.changePassword(Q, I, function (W) {
                                if (W.length != 0) {
                                    Start.Profile.showError(E, W);
                                    $(Start.ProfileDIV.PROFILE_BASIC + "_errPassword").style.display = "";
                                    $(Start.ProfileDIV.PROFILE_BASIC + "_errNewPassword").style.display = "";
                                    $(Start.ProfileDIV.PROFILE_BASIC + "_errConfirmPassword").style.display = "";
                                    return
                                }
                                else {
                                    Start.Profile.togglePasswordForm();
                                    Start.Profile.showSaveMessage(C)
                                }
                            }, function (W) {
                                Start.Profile.showError(E, W);
                                return
                            })
                        }
                        else {
                            Start.Profile.showSaveMessage(C)
                        }
                        Settings.hideUserNameInPublishSettingsIfRequired()
                    }, function (S) {
                        Start.Profile.showError(E, "Sorry! there was a problem saving your information")
                    })
                }
                else {
                    Start.Profile.showSaveMessage(Start.ProfileDIV.PROFILE_INTEREST)
                }
            }, function (R) {
                Start.Profile.showError(E, "Sorry! there was a problem saving your information")
            })
        }
        else {
            Start.Profile.showError(E, "sorry, you have to register or login first")
        }
    }, showError: function (A, B) {
        if (null != $(A + "_lblMessage")) {
            T($(A + "_lblMessage"), B)
        }
        return
    }, clearError: function (A) {
        if (A == Start.ProfileDIV.PROFILE_BASIC) {
            $ND(Start.ProfileDIV.PROFILE_BASIC + "_errFirstName");
            $ND(Start.ProfileDIV.PROFILE_BASIC + "_errLastName");
            $ND(Start.ProfileDIV.PROFILE_BASIC + "_errPassword");
            $ND(Start.ProfileDIV.PROFILE_BASIC + "_errNewPassword");
            $ND(Start.ProfileDIV.PROFILE_BASIC + "_errConfirmPassword")
        }
        if (null != $(A + "_lblMessage")) {
            T($(A + "_lblMessage"), " ")
        }
    }, geoLocated: function () {
        if (null != Start.ProfileGeo) {
            Start.ProfileGeo.forceEnter();
            var A = Start.ProfileGeo.textBox.value;
            if (A.length > 0) {
                Start.ProfileGeo.parseLocation()
            }
        }
    }, togglePasswordForm: function () {
        var A = $(Start.ProfileDIV.PROFILE_BASIC + "_frmPassword");
        if ($isVisible(A)) {
            $ND(A);
            T($(Start.ProfileDIV.PROFILE_BASIC + "_lnkPassword"), "Change Password")
        }
        else {
            $D(A);
            T($(Start.ProfileDIV.PROFILE_BASIC + "_lnkPassword"), "Hide")
        }
    }, initTabsFromMemberVars: function (B) {
        if (B == Start.ProfileDIV.PROFILE_PUBLIC) {
            if (_showInPublicDirectory == "true") {
                $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkShowInPublicDirectory").checked = true
            }
            else {
                $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkShowInPublicDirectory").checked = false
            }
            if (_uniqueName.length > 0) {
                var A = $(Start.ProfileDIV.PROFILE_PUBLIC + "_txtUsername");
                A.value = _uniqueName
            }
            var C = $(Start.ProfileDIV.PROFILE_PUBLIC + "_txtAboutMe");
            C.value = _aboutMe;
            if (_welcomesMessages == "true") {
                $(Start.ProfileDIV.PROFILE_PUBLIC + "_chkWelcomesMessages").checked = true
            }
            Start.Profile.displayProfilePhoto(_imageHandlerPath, _storageIDKey, _ecoStorageId, _size, _sex);
            Start.Profile.doShowUrls(_urlPrefix, _hasPagecasts)
        }
    }, initTab: function (A) {
        Start.Profile.clearError(A);
        if (A == Start.ProfileDIV.PROFILE_PUBLIC) {
            if (_profilePublicIsLoaded) {
                Start.Profile.displayProfilePhoto(_imageHandlerPath, _storageIDKey, _ecoStorageId, _size, _sex);
                return
            }
            if (!App.IsAnonymous) {
                CoreServices.GetPublicProfile(function (C) {
                    _profilePublicIsLoaded = true;
                    if (C.length == 11) {
                        _showInPublicDirectory = C[PROFILE_Public].toLowerCase();
                        _uniqueName = C[PROFILE_UniqueName];
                        _ecoStorageId = C[PROFILE_StorageId];
                        _aboutMe = C[PROFILE_AboutMe];
                        _welcomesMessages = C[PROFILE_Msgs].toLowerCase();
                        _sex = C[PROFILE_Sex].toString();
                        _urlPrefix = C[PROFILE_UrlPrefix];
                        Start.SiteUrl = _urlPrefix;
                        _imageHandlerPath = C[PROFILE_ImagePath];
                        _storageIDKey = C[PROFILE_StorageIdKey];
                        _size = C[PROFILE_Size];
                        _hasPagecasts = C[PROFILE_HasPagecasts];
                        Start.Profile.initTabsFromMemberVars(A);
                        Start.Profile.enablePublicProfileControls()
                    }
                })
            }
        }
        else {
            if (A == Start.ProfileDIV.PROFILE_BASIC) {
                _location = App.getLocationVariable();
                _firstName = App.My.FirstName;
                _lastName = App.My.LastName;
                if (null == Start.ProfileGeo) {
                    Start.ProfileGeo = new GeoLocation($(Start.ProfileDIV.PROFILE_BASIC + "_txtLocation"), false, RenderMode.TABULAR, Start.Profile.geoLocated)
                }
                if (null == Start.ProfileGeo2) {
                    Start.ProfileGeo2 = new GeoLocation($(Start.ProfileDIV.PROFILE_BASIC + "_txtHometown"), false, RenderMode.TABULAR, Start.Profile.geoLocated)
                }
                if (_profileBasicIsLoaded) {
                    return
                }
                $(Start.ProfileDIV.PROFILE_BASIC + "_txtFirstName").value = (_firstName == null ? "a" : _firstName);
                $(Start.ProfileDIV.PROFILE_BASIC + "_txtLastName").value = _lastName;
                $(Start.ProfileDIV.PROFILE_BASIC + "_txtLocation").value = _location;
                $(Start.ProfileDIV.PROFILE_BASIC + "_txtFirstName").select();
                if (!App.IsAnonymous) {
                    CoreServices.GetUserEmail(function (C) {
                        _email = C;
                        T($(Start.ProfileDIV.PROFILE_BASIC + "_lblEmail"), C)
                    });
                    $(Start.ProfileDIV.PROFILE_BASIC + "_txtPassword").value = "";
                    $(Start.ProfileDIV.PROFILE_BASIC + "_txtNewPassword").value = "";
                    $(Start.ProfileDIV.PROFILE_BASIC + "_txtConfirmPassword").value = "";
                    _interests = "";
                    for (var B = 0; B < App.My.Interests.length; B++) {
                        _interests += App.My.Interests[B].toString();
                        if (B != (App.My.Interests.length - 1)) {
                            _interests += ","
                        }
                    }
                    $(Start.ProfileDIV.PROFILE_BASIC + "_txtInterest").value = _interests;
                    $(Start.ProfileDIV.PROFILE_BASIC + "_txtInterest").select();
                    _appBasicIsLoaded = true
                }
                CoreServices.GetUserProfile(function (D) {
                    var C = D.split("|");
                    if (C.length == 12) {
                        _dobDay = C[1];
                        _dobMonth = C[0];
                        _dobYear = C[2];
                        _dobGender = C[3];
                        _hometown = C[4];
                        _showFirstName = C[5];
                        _showLastName = C[6];
                        _showGender = C[7];
                        _showDob = C[8];
                        _showLocation = C[9];
                        _showHometown = C[10];
                        _showInterests = C[11];
                        if (!(_dobDay == "1" && _dobMonth == "1" && _dobYear == "1900")) {
                            $(Start.ProfileDIV.PROFILE_BASIC + "_drpDay").value = _dobDay;
                            $(Start.ProfileDIV.PROFILE_BASIC + "_drpMonth").value = _dobMonth;
                            $(Start.ProfileDIV.PROFILE_BASIC + "_drpYear").value = _dobYear
                        }
                        $(Start.ProfileDIV.PROFILE_BASIC + "_drpGender").value = _dobGender;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_txtHometown").value = _hometown;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkFirstName").checked = _showFirstName == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLastName").checked = _showLastName == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkGender").checked = _showGender == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkDateOfBirth").checked = _showDob == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLocation").checked = _showLocation == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkHometown").checked = _showHometown == "True" ? true : false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkInterest").checked = _showInterests == "True" ? true : false;
                        Start.Profile.enableShowInCheckboxes()
                    }
                    else {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_drpDay").value = $(Start.ProfileDIV.PROFILE_BASIC + "_drpDay").options[0].value;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_drpMonth").value = $(Start.ProfileDIV.PROFILE_BASIC + "_drpMonth").options[0].value;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_drpYear").value = $(Start.ProfileDIV.PROFILE_BASIC + "_drpYear").options[0].value;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_drpGender").value = $(Start.ProfileDIV.PROFILE_BASIC + "_drpGender").options[0].value;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_txtHometown").value = "";
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkFirstName").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLastName").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkGender").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkDateOfBirth").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkLocation").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkHometown").checked = false;
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkInterest").checked = false
                    }
                });
                _profileBasicIsLoaded = true
            }
            else {
                if (A == Start.ProfileDIV.PROFILE_INTEREST) {
                    Settings.setEmailVerificationOption();
                    if (_profileInterestIsLoaded) {
                        return
                    }
                    if (App.IsSubscribedForNewsletter) {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkNewsletter").checked = true
                    }
                    else {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkNewsletter").checked = false
                    }
                    if (App.ShowSearchBar) {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkSearch").checked = true
                    }
                    else {
                        $(Start.ProfileDIV.PROFILE_BASIC + "_chkSearch").checked = false
                    }
                    if (typeof (LANGUAGE) != "undefined") {
                        $("drpChangeLanguage").value = LANGUAGE
                    }
                    _profileInterestIsLoaded = true
                }
            }
        }
    }
};
Start.Theme = {
    themes: [],
    currentTheme: null
    , savedTheme: null
    , selectedIndex: 0
    , customTheme: []
    , THEME_INTRO: "/* For example */ .menu a {{ color:white }}\n"
    , newThemeMode: true
    , lastThemeIndex: 0
    , originalTheme: null
    , uiLoaded: false
    , createThemeUiLoaded: false
    , createThemeHtml: null
    , dispose: function () {
        var A = $("Start_Themes_UL");
        if (null != A) {
            $removeAll(A)
        }
        if (Start.Theme.createThemeUiLoaded) {
            $removeAll("PageSettings_CreateNewTheme")
        }
    }, load: function (B) {
        if (!Start.Theme.uiLoaded) {
            var A = $("ThemeHtml").value;
            Start.Theme.createThemeHtml = $("CreateThemeHtml").value;
            $("ThemeArea").innerHTML = A;
            Start.Theme.uiLoaded = true;
            $DC(function () {
                Start.Theme.loadUI(B)
            })
        }
        else {
            Start.Theme.loadUI(B)
        }
    }, loadUI: function (A) {
        $ND("PageSettings_CreateNewTheme");
        $D("PageSettings_SelectTheme");
        if (Browser.isIE6) {
            $("PageSettings_SelectTheme_Div").style.width = ($("PageSettingGrid").offsetWidth - 28) + "px"
        }
        Start.Theme.savedTheme = null;
        Start.Theme.currentTheme = null;
        Start.Theme.originalTheme = new $cloneObject(App.currentPage.pageTheme);
        App.Server.GetThemesOfUser(function (B) {
            B = B.hasOwnProperty("d") ? B.d : B; // added by franck a cause du d:
            Start.Theme.themes = B;
            Start.Theme.renderThemeList();
            if (typeof A == "function") { A() }
        })
    }, cancelOut: function (A) {
        if (null != Start.Theme.originalTheme) {
            P.setTheme(Start.Theme.originalTheme)
        }
        Start.toggleStart(A)
    }, renderThemeList: function () {
        $ND("PageSettings_CreateNewTheme");
        $D("PageSettings_SelectTheme");
        var B = $("Start_Themes_UL");
        $removeAll(B);
        var C = $$("div", "CreateOwnTheme", "CreateOwnTheme");
        T(C, Lang.CREATE_NEW_THEME);
        var A = $$("li", "CreateOwnThemeLI", "Start_Themes_LI");
        A.onclick = Start.Theme.createNew;
        A.appendChild(C);
        B.appendChild(A);
        Start.Theme.themes.forEach(function (E, D) {
            Start.Theme.createThemeItem(E, D)
        });
        Start.Theme.select(Start.Theme.themes.findIndex(function (D) {
            return D.ThemeShortcut == App.currentPage.pageTheme.ThemeShortcut
        }))
    }, createThemeItem: function (E, G) {
        var I = $("Start_Themes_UL");
        var M = $$("li", "ThemeItem_" + E.ThemeShortcut, "Start_Themes_LI");
        $addEvent(M, "click", Func("Start.Theme.select(" + G + ")"));
        $addHover(M, "ThemeItemHover");
        var A = $$("div", "", "ThemeItemDiv");
        var C = $$("div", "", "DRP_blur");
        var B = $$("div", "", "DRP_shadow");
        var N = $$("div", "", "ThemeItemImg");
        var D = $$("img");
        D.src = E.PreviewHandlerUrl; 
        N.appendChild(D);
        B.appendChild(N);
        C.appendChild(B);
        A.appendChild(C);
        if (E.IsCustomTheme) {
            var J = $$("div", "", "ThemeItemMenu");
            var K = $$("a", "", "ThemeItemMenuEdit", "edit");
            K.onclick = Func("Start.Theme.edit(" + G + ")");
            var L = $$("a", "", "ThemeItemMenuDelete", "delete");
            L.onclick = Func("Start.Theme.remove(" + G + ")");
            J.appendChild(K);
            J.appendChild(L);
            A.appendChild(J)
        }
        else {
            var H = $$("div", "", "ThemeItemName");
            T(H, E.ThemeName); A.appendChild(H)
        }
        M.appendChild(A);
        I.insertBefore(M, I.lastChild)
    }, cancel: function () {
        var A = Start.Theme.selectedIndex;
        Start.Theme.revertPage();
        if (Start.Theme.newThemeMode) {
            Start.Theme.remove(A)
        }
        $ND("PageSettings_CreateNewTheme");
        $D("PageSettings_SelectTheme")
    }, revertPage: function () {
        if (Start.Theme.savedTheme != null) {
            if (Start.Theme.savedTheme.IsCustomTheme) {
                Start.Theme.changeTheme(Start.Theme.savedTheme.Properties)
            }
            else {
                Start.Theme.select(Start.Theme.lastThemeIndex)
            }
        }
    }, select: function (C) {
        if (C < 0) {
            return
        }
        var B = Start.Theme.themes[Start.Theme.selectedIndex];
        var D = Start.Theme.themes[C];
        var A = "ThemeItem_" + D.ThemeShortcut;
        $selectChild($("Start_Themes_UL"), "LI", "Selected", function (E) {
            return E.id == A
        });
        Start.Theme.selectedIndex = C;
        P.setTheme(D);
        App.currentPage.pageTheme = D;
        App.currentPage.save();
        Start.Theme.currentTheme = D
    }, saveState: function () {
        Start.Theme.savedTheme = new $cloneObject(App.currentPage.pageTheme);
        Start.Theme.lastThemeIndex = Start.Theme.themes.findIndex(function (A) {
            return A.ThemeShortcut == Start.Theme.savedTheme.ThemeShortcut
        })
    }, finish: function () {
        Start.hidePageSettings()
    }, edit: function (A) {
        if (!Start.Theme.createThemeUiLoaded) {
            $("PageSettings_CreateNewTheme").innerHTML = Start.Theme.createThemeHtml;
            Start.Theme.createThemeUiLoaded = true;
            if (Browser.isIE6) {
                PU.blockUI("Loading...")
            }
        }
        $DC(function () {
            Start.Theme.saveState();
            if (Start.Theme.selectedIndex != A) {
                Start.Theme.select(A)
            }
            Start.Theme.setNewThemeTab("PageSettings_NewTheme_Header");
            $D("PageSettings_CreateNewTheme");
            $ND("PageSettings_SelectTheme");
            Start.Theme.populateHeaderTab(Start.Theme.currentTheme);
            Start.Theme.populatePageTab(Start.Theme.currentTheme);
            Start.Theme.populateTabsTab(Start.Theme.currentTheme);
            Start.Theme.populateFlakeTab(Start.Theme.currentTheme);
            Start.Theme.populateAdvancedTab(Start.Theme.currentTheme);
            Start.Theme.newThemeMode = false; Start.Theme.showHeaderTab();
            if (Browser.isIE6) {
                PU.unblockUI()
            }
        })
    }, showHeaderTab: function () {
        $visible("Theme_HeaderIFRAME");
        $hide("Theme_PageBackgroundIFRAME");
        Start.Theme.setNewThemeTab("PageSettings_NewTheme_Header");
        $select($("PageSettings_CreateNewTheme_Tabs_HeaderTab"), "themeactivetab", "LI")
    }, showTabButtonTab: function () {
        Start.Theme.setNewThemeTab("PageSettings_NewTheme_TabButtons");
        $select($("PageSettings_CreateNewTheme_Tabs_TabButtonTab"), "themeactivetab", "LI")
    }, showPageTab: function () {
        $hide("Theme_HeaderIFRAME");
        $visible("Theme_PageBackgroundIFRAME");
        Start.Theme.setNewThemeTab("PageSettings_NewTheme_Page");
        $select($("PageSettings_CreateNewTheme_Tabs_PageTab"), "themeactivetab", "LI")
    }, showFlakesTab: function () {
        Start.Theme.setNewThemeTab("PageSettings_NewTheme_Flakes");
        $select($("PageSettings_CreateNewTheme_Tabs_FlakeTab"),
             "themeactivetab", "LI")
    }, showAdvancedTab: function () {
        Start.Theme.setNewThemeTab("PageSettings_NewTheme_Advanced");
        $select($("PageSettings_CreateNewTheme_Tabs_AdvancedTab"), "themeactivetab", "LI")
    }, showColorPicker: function (E, D) {
        var B = $(E);
        var C = PU.getPosition(B);
        if (null == Start.Theme._colorPicker) {
            Start.Theme._colorPicker = new ThemeColorPicker()
        }
        if (Start.Theme._colorPicker.isVisible) {
            Start.Theme._colorPicker.hide()
        }
        else {
            var A = B.style.backgroundColor;
            Start.Theme._colorPicker.initialize(A, C[0], C[1] + C[3], function (G) {
                var H = (G == "transparent" ? G : "#" + G);
                B.style.backgroundColor = H; D(H);
                Start.Theme._colorPicker.hide()
            });
            $DC(function () {
                Start.Theme._colorPicker.show()
            })
        }
    }, setImageUploadIframe: function (E, C, B, H, G, D, A) {
        window.setTimeout(function () {
            E.src = String.format("CustomTheme/ThemeImageUploader.aspx?Message={0}&Max={1}&eco_storageId={2}&Width={4}&Height={5}&Callback=window.parent.Start.Theme.{3}({{0}})", G, H, C, B, D, A)
        }, 1000)
    }, populateHeaderTab: function (C) {
        $("PageSettings_NewTheme_Header_ColorPicker").style.backgroundColor = C.Properties.headercolor;
        var A = $("PageSettings_NewTheme_HeaderCustomPicIFRAME");
        Start.Theme.setImageUploadIframe(A, C.Properties.headercustompic, "setHeaderCustomPic", 75 * 1024, "JPG, PNG or GIF, 75KB max\\rIdeal size: 1600 X 75px", "230px", "20px");
        if (Browser.isIE6) {
            $DC(function () {
                var D = $("Theme_HeaderIFRAME");
                D.src = D.src
            })
        }
        if (C.Properties.headermode == "picture") {
            $("PageSettings_NewTheme_Header_ImageRadio").checked = true
        }
        else {
            if (C.Properties.headermode == "color") {
                $("PageSettings_NewTheme_Header_ColorRadio").checked = true
            }
            else {
                if (C.Properties.headermode == "custom") {
                    $("PageSettings_NewTheme_Header_UploadImageRadio").checked = true
                }
            }
        }
        var B = C.Properties.logo || "Standard"; $("PageSettings_NewTheme_LogoRADIO_" + B).checked = true
    }, populateTabsTab: function (G) {
        if (Browser.isIE6) {
            var E = $("Pagesettins_NewTheme_TabButtons_Start");
            var B = E.getElementsByTagName("LI");
            for (var D = 0; D < B.length; D++) {
                var A = B[D];
                var C = A.firstChild.firstChild;
                C.src = C.src
            }
        }
        $("PageSettings_NewTheme_TabButtons_ActiveTabColor").style.backgroundColor = G.Properties.activetabcolor;
        $("PageSettings_NewTheme_TabButtons_InactiveTabColor").style.backgroundColor = G.Properties.inactivetabcolor;
        $("PageSettings_NewTheme_TabButtons_AddPageTextColor").style.backgroundColor = G.Properties.addpagetextcolor;
        $("PageSettings_NewTheme_TabButtons_AddPageBackColor").style.backgroundColor = G.Properties.addpagebackcolor;
        $("PageSettings_NewTheme_TabButtons_ActiveTabTextColor").style.backgroundColor = G.Properties.activetabtextcolor;
        $("PageSettings_NewTheme_TabButtons_InactiveTabTextColor").style.backgroundColor = G.Properties.inactivetabtextcolor;
        $selectChild($("Pagesettins_NewTheme_TabButtons_Start"), "LI", "Selected", function (H) {
            return H.getAttribute("value") == G.Properties.startbutton
        })
    }, populatePageTab: function (B) {
        $("PageSettings_NewTheme_HeaderMenuColor1").style.backgroundColor = B.Properties.headermenucolor1;
        $("PageSettings_NewTheme_HeaderMenuColor2").style.backgroundColor = B.Properties.headermenucolor2;
        $("PageSettings_NewTheme_FooterBGColor").style.backgroundColor = B.Properties.footerbgcolor;
        $("PageSettings_NewTheme_FooterBGColor2").style.backgroundColor = B.Properties.footerbgcolor2;
        $("PageSettings_NewTheme_FooterTextColor").style.backgroundColor = B.Properties.footertextcolor;
        $("PageSettings_NewTheme_Page_BgColor").style.backgroundColor = B.Properties.pagecolor;
        var A = $("PageSettings_NewTheme_PageCustomPicIFRAME");
        Start.Theme.setImageUploadIframe(A, B.Properties.pagecustompic, "setPageCustomPic", 1024 * 1024, "JPG, PNG or GIF, 1MB max\\rIdeal size: 1600 x 3000px", "230px", "80px");
        if (B.Properties.pagemode == "picture") {
            $("PageSettings_NewTheme_Page_ImageRADIO").checked = true
        }
        else {
            if (B.Properties.pagemode == "color") {
                $("PageSettings_NewTheme_Page_ColorRADIO").checked = true
            }
            else {
                if (B.Properties.pagemode == "custom") {
                    $("PageSettings_NewTheme_Page_UploadRADIO").checked = true
                }
            }
        }
        if (Browser.isIE6) {
            $DC(function () {
                var C = $("Theme_PageBackgroundIFRAME");
                C.src = C.src
            })
        }
    }, populateFlakeTab: function (A) {
        $("PageSettings_NewTheme_Flakes_HeaderColor").style.backgroundColor = A.Properties.flakeheadercolor;
        $("PageSettings_NewTheme_Flakes_TitleColor").style.backgroundColor = A.Properties.flaketitlecolor;
        $("PageSettings_NewTheme_Flakes_BorderColor").style.backgroundColor = A.Properties.flakebordercolor;
        $("PageSettings_NewTheme_Flakes_OuterBorderColor").style.backgroundColor = A.Properties.flakeouterbordercolor
    }, populateAdvancedTab: function (A) {
        $("PageSettings_NewTheme_Advanced_CustomCSS").value = A.Properties.customcss || String.format(Start.Theme.THEME_INTRO, A.ThemeShortcut)
    }, remove: function (A) {
        var B = Start.Theme.themes[A];
        App.Server.DeleteCustomTheme(B.ThemeID);
        if (Start.Theme.selectedIndex == A) {
            Start.Theme.select(0)
        }
        $remove("ThemeItem_" + B.ThemeShortcut)
    }, radioClick: function (D, A, E) {
        var C = Start.Theme.currentTheme.Properties[D];
        if (C) {
            var B = {};
            B[D] = C;
            if (A) {
                B[A] = E
            }
            Start.Theme.changeTheme(B)
        }
    }, createNew: function () {
        if (!Start.Theme.createThemeUiLoaded) {
            $("PageSettings_CreateNewTheme").innerHTML = Start.Theme.createThemeHtml;
            Start.Theme.createThemeUiLoaded = true;
            if (Browser.isIE6) {
                PU.blockUI("Loading...")
            }
        }
        App.Server.CreateCustomTheme(function (A) {
            Start.Theme.showCreateThemeUI(A);
            if (Browser.isIE6) {
                PU.unblockUI()
            }
        }, function () {
            $showMsg("Error occured while creating theme. Please try again", 10000)
        })
    }, showCreateThemeUI: function (A) {
        Start.Theme.themes.push(A);
        Start.Theme.createThemeItem(A, Start.Theme.themes.length - 1);
        Start.Theme.edit(Start.Theme.themes.length - 1);
        Start.Theme.newThemeMode = true
    }, changeTheme: function (A) {
        App.Server.ChangeCustomTheme(Start.Theme.currentTheme.ThemeID, A, function (B) {
            Start.Theme.reapply(B)
        })
    }, setStartButton: function (A) {
        Start.Theme.changeTheme({ startbutton: A + ".png", startbuttondown: A + "_down.png" })
    }, setLogo: function (A) {
        Start.Theme.changeTheme({ logo: A })
    }, setHeaderColor: function (A) {
        $("PageSettings_NewTheme_Header_ColorPicker").style.backgroundColor = A;
        $("PageSettings_NewTheme_Header_ColorRadio").checked = true;
        Start.Theme.changeTheme({ headercolor: A, headermode: "color" })
    }, setHeaderPic: function (A) {
        $("PageSettings_NewTheme_Header_ImageRadio").checked = true;
        Start.Theme.changeTheme({ headerpic: A, headermode: "picture" })
    }, setCustomCss: function (A) {
        Start.Theme.changeTheme({ customcss: A })
    }, setHeaderMenuColor1: function (A) {
        Start.Theme.changeTheme({ headermenucolor1: A })
    }, setHeaderMenuColor2: function (A) {
        Start.Theme.changeTheme({ headermenucolor2: A })
    }, setFooterBGColor: function (A) {
        Start.Theme.changeTheme({ footerbgcolor: A })
    }, setFooterBGColor2: function (A) {
        Start.Theme.changeTheme({ footerbgcolor2: A })
    }, setFooterTextColor: function (A) {
        Start.Theme.changeTheme({ footertextcolor: A })
    }, setHeaderCustomPic: function (A) {
        $("PageSettings_NewTheme_Header_UploadImageRadio").checked = true;
        Start.Theme.changeTheme({ headermode: "custom", headercustompic: "" + A })
    }, setActiveTabColor: function (A) {
        Start.Theme.changeTheme({ activetabcolor: A })
    }, setActiveTabTextColor: function (A) {
        Start.Theme.changeTheme({ activetabtextcolor: A })
    }, setInactiveTabColor: function (A) {
        Start.Theme.changeTheme({ inactivetabcolor: A })
    }, setAddPageLinkColor: function (A) {
        Start.Theme.changeTheme({ addpagetextcolor: A })
    }, setAddPageBackColor: function (A) {
        Start.Theme.changeTheme({ addpagebackcolor: A });
        $DC(function () {
            TabManager.createNewTabLink()
        }, 1000)
    }, setInactiveTabTextColor: function (A) {
        Start.Theme.changeTheme({ inactivetabtextcolor: A })
    }, setPagePic: function (A) {
        $("PageSettings_NewTheme_Page_ImageRADIO").checked = true;
        Start.Theme.changeTheme({ pagemode: "picture", pagepic: A })
    }, setPageColor: function (A) {
        $("PageSettings_NewTheme_Page_ColorRADIO").checked = true;
        Start.Theme.changeTheme({ pagecolor: A, pagemode: "color" })
    }, setPageCustomPic: function (A) {
        $("PageSettings_NewTheme_Page_UploadRADIO").checked = true;
        Start.Theme.changeTheme({ pagemode: "custom", pagecustompic: "" + A })
    }, setFlakeHeaderColor: function (A) {
        Start.Theme.changeTheme({ flakeheadercolor: A })
    }, setFlakeTitleColor: function (A) {
        Start.Theme.changeTheme({ flaketitlecolor: A })
    }, setFlakeBorderColor: function (A) {
        Start.Theme.changeTheme({ flakebordercolor: A })
    }, setFlakeOuterBorderColor: function (A) {
        Start.Theme.changeTheme({ flakeouterbordercolor: A })
    }, reapply: function (A) {
        App.currentPage.pageTheme = Start.Theme.currentTheme = A;
        $DC(function () {
            P.setTheme(A, true)
        })
    }, setNewThemeTab: function (A) {
        $selectChild($(A).parentNode, "DIV", "", function (B) { if (B.className == "NewThemePanel") { if (B.id == A) { $D(B) } else { $ND(B) } } return false })
    }, sendTheme: function () { if (App.IsAnonymous) { alert("Please login or signup before you can share your theme"); return } var B = $("PageSettings_NewTheme_Advanced_ThemeName").value; var A = $("PageSettings_NewTheme_Advanced_SendButton"); $disabled(A); A.value = "Sending..."; App.Server.SendTheme(B, Start.Theme.currentTheme.ThemeID, function () { $enabled(A); A.value = "Send"; alert("We have received your theme. We will review it and get back to you shortly.") }) }
};
var Settings = {
    requiresRestart: false
    , onUniqueNameChange: function (B) {
        B = PageflakesUtility.fix(B);
        var C = $("Settings_UniqueName");
        var A = C.value.replace(/(\s|\.|\+|\-|\/|\\|!|@|#|\$|%|\^|&|\*|\(|\)|=|,|\?|\<|\>)*/g, "");
        C.value = A;
        $("Settings_PublicSiteName").value = SITE_PREFIX + A
    }, hideUserNameInPublishSettingsIfRequired: function () {
        if (App.My.Profile.UserNameChanged) {
            if ($("tblUserNameIn").rows[0].cells.length > 1) {
                try {
                    $("tblUserNameIn").rows[0].cells[0].parentNode.removeChild($("tblUserNameIn").rows[0].cells[0]);
                    $("tblUserNameIn").rows[1].cells[0].parentNode.removeChild($("tblUserNameIn").rows[1].cells[0]);
                    $("tblUserNameIn").rows[0].cells[0].style.paddingLeft = "";
                    $("tblUserNameIn").rows[1].cells[0].style.paddingLeft = "";
                    $("tblUserNameIn").style.width = "100%"
                }
                catch (A) { }
            }
            try {
                $(PUB_USERNAMEURL).value = Settings.getCurrentPagePublishUrl($(PUB_USERNAME).value)
            }
            catch (B) { }
        }
    }, initAccountInfo: function () {
        $("Settings_Name").value = App.UserFullName;
        $("Settings_CurrentPassword").value = "";
        $("Settings_Password").value = "";
        $("Settings_ConfirmPassword").value = "";
        if (App.IsAnonymous) {
            $("Settings_Name").disabled = true;
            $("Settings_CurrentPassword").disabled = true;
            $("Settings_Password").disabled = true;
            $("Settings_ConfirmPassword").disabled = true;
            $("EmailVerification").style.display = "none"
        }
    }, initPreference: function () {
        $("Settings_TimeZone").value = App.My.Timezone;
        $("Settings_ZipCode").value = App.My.ZipCode;
        $("Settings_Newsletter").checked = App.IsSubscribedForNewsletter;
        if (App.IsAnonymous) {
            $("Settings_Newsletter").disabled = true
        }
        $("Settings_ShowSearchBar").checked = App.ShowSearchBar;
        var A = document.getElementById("Settings_Location");
        A.value = App.getLocationVariable();
        if (typeof GeoLocation != "undefined") {
            var B = new GeoLocation(A, false, RenderMode.TABULAR, function (D) {
                tempGlobalLocation = $("Settings_Location").value;
                var C = $("Settings_ZipCode").value;
                tempGlobalZip = CoreServices.GetZipCode($("Settings_Location").value, function (E) {
                    $("Settings_ZipCode").value = E; tempGlobalZip = E
                }, function (E) { App.My.ZipCode = C })
            })
        }
    }, initTheme: function () {
        var D = App.currentTemplate.name;
        var A = document.getElementsByTagName("INPUT");
        for (var C = 0; C < A.length; C++) {
            var B = A[C];
            if (B.name == "Settings_Theme") {
                if (B.value == D) {
                    B.checked = true; break
                }
            }
        }
    }, initLayout: function () {
        var D = App.currentPage.columnSizes.join(",").trim();
        var A = document.getElementsByTagName("INPUT");
        for (var C = 0; C < A.length; C++) {
            var B = A[C];
            if (B.name == "PageLayout") {
                if (B.value == D) {
                    B.checked = true
                }
            }
        }
    }, saveLayout: function () {
        App.currentPage.save();
        Start.hidePageSettings(); 
        Settings.lastPreservedLayout = null
    }, preserveColumnLayout: function () {
        Settings.lastPreservedLayout = [];
        Settings.lastPreservedLayout.columnCount = App.currentPage.columnCount;
        Settings.lastPreservedLayout.columnSizes = App.currentPage.columnSizes;
        for (var B = 0; B < App.currentPage.columnCount; B++) {
            var A = App.currentPage.columns[B].modules; for (var C = 0; C < A.length; C++) {
                Settings.lastPreservedLayout.push({ module: A[C], id: A[C].id, row: A[C].row, col: B })
            } 
        }
    }, restoreColumnLayout: function () {
        var A = Settings.lastPreservedLayout; if (null == A) { return } App.currentPage.setColumns(A.columnCount, A.columnSizes); PF.hide(MODULE_CONTAINER); A.forEach(function (B) { P.removeModule(App.currentPage, B.module) }); A.forEach(function (B) { P.insertModule(App.currentPage, B.module, B.row, B.col) }); PF.visible(MODULE_CONTAINER)
    }, cancelLayout: function () {
        Settings.restoreColumnLayout(); Settings.lastPreservedLayout = null; Start.hidePageSettings()
    }, initButtons: function () {
        $(SHARINGOPTIONS_SAVE).value = "Save Changes"; $enabled(SHARINGOPTIONS_SAVE)
    }, initSharing: function () {
        $ND(PUB_TITLE_REQ); $ND(PUB_DESC_REQ); $ND(PUB_TAG_REQ); if (App.IsAnonymous) { $ND(SHARINGOPTIONSBODY); $D(SHARINGOPTIONSBODY_DUMMY); return } else { $D(SHARINGOPTIONSBODY); $ND(SHARINGOPTIONSBODY_DUMMY) } Settings.initButtons(); $ND(SHAREDIALOG_ERRORINMAIL); TooltipManager.setTooltip($(SHARE_NOSHARE_LBL), SHARINGOPTIONS_NOSHARE_TOOLTIP, 1000); TooltipManager.setTooltip($(SHARE_PUBLIC_LBL), SHARINGOPTIONS_PUBLIC_TOOLTIP, 1000); TooltipManager.setTooltip($(SHARE_SHARE_LBL), SHARINGOPTIONS_SHARE_TOOLTIP, 1000); var G = $(SHARE_SHAREDUSERS); var E = $(PUB_SHAREDUSERS); var D = $(PUB_TAGS); var C = $(PUB_DESC); var B = $(PUB_PAGETITLE); B.value = ""; C.value = ""; G.value = E.value = Lang.EMAIL_COMMA; D.value = Lang.TAGS_COMMA; var H = $(SHARINGOPTIONS_ALLOWEDIT); H.checked = (App.currentPage.sharingStatus == SharingStatus.AllowEdit); $("UserPublishUrl").innerHTML = App.UserPublishURL; if (App.currentPage.IsPublished) { $(SHARE_PUBLIC).click(); if (Browser.isSafari) { $(SHARE_PUBLIC).checked = true } D.value = Lang.LOADING; App.Server.GetPublishedPage(App.currentPage.id, function (J) { if (null != J) { $ND(PUB_TITLE_REQ); $ND(PUB_DESC_REQ); $ND(PUB_TAG_REQ); var L = J[0]; var K = J[1]; var I = J[2]; B.value = L; C.value = K; if (I == "") { D.value = Lang.TAGS_COMMA } else { D.value = I } } else { D.value = Lang.TAGS_COMMA } }) } else { if (App.currentPage.IsShared) { $(SHARE_SHARE).click(); if (Browser.isSafari) { $(SHARE_SHARE).checked = true } } else { $(SHARE_NOSHARE).click(); if (Browser.isSafari) { $(SHARE_NOSHARE).checked = true } } } if (App.currentPage.IsShared) { var A = ""; App.Server.GetSharedUserNames(App.currentPage.id, function (I) { if (I.length > 0) { A = I.join(","); G.value = A; if (App.currentPage.sharingStatus == SharingStatus.AllowEdit) { $(PUB_ALLOW_EDIT).checked = true } E.value = A } else { G.value = E.value = Lang.EMAIL_COMMA; $(SHARE_NOSHARE).click() } }) } else { G.value = E.value = Lang.EMAIL_COMMA }
    }, handleUniqueNameChange: function () {
        try { $(PUB_USERNAME).value = Settings.getUserNameValidatedText($(PUB_USERNAME).value); if ($(PUB_USERNAME).value.length > 0) { $(PUB_USERNAMEURL).value = Settings.getCurrentPagePublishUrl($(PUB_USERNAME).value) } else { $(PUB_USERNAMEURL).value = Settings.getCurrentPagePublishUrl("") } } catch (A) { }
    }, getUserNameValidatedText: function (B) {
        var A = B.replace(/(\s|[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890._]|)*/g, ""); if (A.length > 1) { if (A.charAt(0) == "." | A.charAt(0) == "_") { return A.substring(1, A.length) } } else { if (A.length == 1) { if (A.charAt(0) == "." | A.charAt(0) == "_") { return "" } } } return A
    }, getCurrentPagePublishUrl: function (A) {
        return App.getCurrentPagePublishUrl(A)
    }, saveSharingProxy: function () {
        if (App.IsAnonymous) { return } try { var A = $(SHARE_PUBLIC); if (A) { if (A.checked) { var C = $(PUB_USERNAME); if (C) { if ($trim(C.value).length == 0) { $("divUserNameNotUnique").innerHTML = "Username is blank."; $D("divUserNameNotUnique"); return } CoreServices.ValidateUniqename(C.value, function (D) { if (!D) { $("divUserNameNotUnique").innerHTML = "Username not unique."; $D("divUserNameNotUnique"); return } else { $ND("divUserNameNotUnique"); if (App.My.Profile.UserNameChanged) { Settings.saveSharing() } else { Settings.saveSharing(true) } } }) } else { Settings.saveSharing() } } else { Settings.saveSharing() } } } catch (B) { Settings.saveSharing() }
    }, saveSharing: function (A) {
        if (App.IsAnonymous) { return false } $(SHARINGOPTIONS_SAVE).value = Lang.SAVING; $disabled(SHARINGOPTIONS_SAVE); if ($(SHARE_NOSHARE).checked) { if (App.currentPage.IsPublished || App.currentPage.IsShared) { ShareManager.makePrivate(App.currentPage.id, function () { Start.hidePageSettings(); $showMsg(Lang.PAGE_MADE_PRIVATE); TabManager.refresh() }, function () { Settings.initButtons() }); if (null != $("PagecastLinkDiv")) { if (null != $("PagecastLinkDiv").childNodes[0]) { var B = $("PagecastLinkDiv").childNodes[0].innerHTML; $("PagecastLinkDiv").innerHTML = ""; T($("PagecastLinkDiv"), B) } } if (App.IsMySite) { PublicPageTab.init(false) } } else { Start.hidePageSettings() } } else { if ($(SHARE_PUBLIC).checked) { ShareManager.publishPage(App.currentPage.id, PUB_PAGETITLE, PUB_DESC, PUB_TAGS, PUB_SHAREDUSERS, PUBDIALOG_ERRORINMAIL, PUBDIALOG_ERRORTITLE, function (D, E, C) { if (A) { if (A == true) { App.UserUniqueName = App.My.UniqueName = $(PUB_USERNAME).value; CoreServices.ChangeUniqueName($(PUB_USERNAME).value, function (J) { var H = Settings.getCurrentPagePublishUrl($(PUB_USERNAME).value); $(PUB_USERNAMEURL).value = H; var I = H + App.currentPage.id; App.saveProfile("UserNameChanged", "1"); Settings.handleUniqueNameChange(); Settings.showPublicUrls(D, I, C) }) } } if (null != $("PagecastLinkDiv")) { if (null != $("PagecastLinkDiv").childNodes[0]) { var G = $("PagecastLinkDiv").childNodes[0].innerHTML; if (null == G) { G = T($("PagecastLinkDiv")) } $("PagecastLinkDiv").innerHTML = ""; $("PagecastLinkDiv").innerHTML = Start.Profile.createHyperLink(G, G) } } Settings.hideUserNameInPublishSettingsIfRequired(); if (!A) { Settings.showPublicUrls(D, E, C) } TabManager.refresh(); if (App.IsMySite) { PublicPageTab.showToolBar(); PublicPageTab.init(true) } }, function () { Settings.initButtons(); return false }) } else { if ($(SHARE_SHARE).checked) { ShareManager.SetSharedUsers(App.currentPage.id, SHARE_SHAREDUSERS, $(SHARINGOPTIONS_ALLOWEDIT).checked, SHAREDIALOG_ERRORINMAIL, SHAREDIALOG_ERRORTITLE, function () { Start.hidePageSettings(); $showMsg(Lang.PAGE_MADE_SHARED, 5000); TabManager.refresh(); PublicPageTab.init(false) }, function () { Settings.initButtons() }) } } }
    }, showPublicUrls: function (B, C, A) {
        if (A == "true") { A = SITE_PREFIX + App.UserUniqueName + "/p"; Start.hidePageSettings(); $showMsg(String.format(Lang.PAGE_MADE_PUBLIC_AT, C, B, A)) } else { Start.hidePageSettings(); $showMsg(String.format(Lang.PAGE_MADE_PUBLIC_AT_NOPROFILE, C, B)) }
    }, saveUserInfo: function () {
        var B = false; var A = document.getElementById("Settings_Location"); if (App.getLocationVariable() != A.value) { B = true } App.saveUserInfo(function () { if (Settings.requiresRestart) { document.location.reload() } else { Start.hidePageSettings() } if (B) { App.changeGlobalLocation(A.value) } }, function (C) { Settings.registerError(C) })
    }, saveAccountInfo: function () {
        App.UserFullName = $("Settings_Name").value;
        T("UserFullName", App.UserFullName.substring(0, Math.min(15, App.UserFullName.length)));
        var B = $trim($("Settings_Password").value);
        var A = $trim($("Settings_ConfirmPassword").value);
        var C = $trim($("Settings_CurrentPassword").value);
        if (B != "") {
            if (B != A) {
                Settings.registerError("Password and confirmation does not match")
            }
            else {
                App.changePassword(C, B, function (D) {
                    if (D.length == 0) {
                        Settings.saveUserInfo()
                    }
                    else {
                        Settings.registerError(D)
                    }
                }, function (D) {
                    Settings.registerError(D)
                })
            }
        }
        else {
            Settings.saveUserInfo()
        }
    }, savePreference: function () {
        App.My.Timezone = parseInt($("Settings_TimeZone").value);
        App.My.ZipCode = $("Settings_ZipCode").value;
        App.My.Profile.ZipCode = App.My.ZipCode;
        App.ShowSearchBar = $("Settings_ShowSearchBar").checked;
        if (App.ShowSearchBar) {
            SearchForm.open()
        }
        else {
            SearchForm.close(true)
        }
        App.IsSubscribedForNewsletter = $("Settings_Newsletter").checked
    }, registerError: function (C) {
        var B = $("SettingsError");
        var A = $$("p");
        A.className = "ErrorMsg";
        A.innerHTML = C;
        B.appendChild(A);
        Settings.resetButtons()
    }, resetButtons: function () {
        $("SaveSettings").value = Lang.SAVE;
        $enabled("SaveSettings")
    }, clearError: function () {
        var A = $("SettingsError");
        A.innerHTML = ""
    }, cancel: function () {
        Start.hidePageSettings()
    }, applyColumnLayout: function (A) {
        if (Settings.lastPreservedLayout == null) {
            Settings.preserveColumnLayout()
        }
        var C = A.split(",");
        var B = C.length;
        App.currentPage.setColumns(B, C)
    }, applyTheme: function (A) {
        App.changeTheme(A)
    }, blurText: function (A, B) {
        A.className = "blurText";
        if (A.value == "") {
            A.value = B
        }
    }, focusText: function (A, B) {
        A.className = "focusText";
        if (A.value == B) {
            A.value = ""
        }
        else {
            A.select()
        }
    }, resendVerificationEmail: function () {
        var A = $("btnResendVerificationEmail");
        A.disabled = true;
        A.value = "Processing...";
        CoreServices.ResendVerificationEmail(function (B) {
            if (B) {
                A.value = "Email sent"
            }
            else {
                A.value = "Failed to send email to your address!"
            }
        })
    }, setEmailVerificationOption: function () {
        CoreServices.IsUserRequiredToVerifyEmail(function (A) {
            var B = $("EmailVerification");
            if (A) {
                var B = $("EmailVerification");
                if (B != null) {
                    B.style.display = ""
                }
                Settings.setVerificationMailButton()
            }
            else {
                if (B != null) {
                    B.style.display = "none"
                }
            }
        })
    }, setVerificationMailButton: function () {
        CoreServices.CanSendVerificationEmail(function (A) {
            var B = $("btnResendVerificationEmail");
            if (B != null) {
                B.disabled = !A;
                B.value = "Resend verification email"
            }
        })
    }
};
var ShareManager = {
    publishDialogID: "publishDialog"
    , shareDialogID: "shareDialog"
    , sendPublishInvite: function (C, I, E, D, A, G) {
        var B = "" + $(I).value;
        if (0 == B.trim().length) {
            $(D).innerHTML = Lang.ONE_EMAIL;
            $D(E);
            return
        }
        var H = B.trim().split(",");
        App.startWork();
        App.Server.PublishPageInvite(C, H, function (J) {
            if (J.length == 0) {
                $ND(E)
            }
            else {
                $D(E);
                $(D).innerHTML = P.formatText(J)
            }
            App.endWork();
            TabManager.refresh();
            A()
        }, function (J) {
            App.endWork();
            G()
        })
    }, sendTemplateInvite: function (C, I, E, D, A, G) {
        var B = "" + $(I).value;
        if (0 == B.trim().length) {
            $(D).innerHTML = Lang.ONE_EMAIL;
            $D(E);
            return
        }
        var H = B.trim().split(",");
        App.startWork();
        App.Server.PublishPageInvite(C, H, function (J) {
            if (J.length == 0) {
                $ND(E)
            }
            else {
                $D(E);
                $(D).innerHTML = P.formatText(J)
            }
            App.endWork();
            TabManager.refresh();
            A()
        }, function (J) {
            App.endWork(); G()
        })
    }, makePrivate: function (B, A, C) {
        App.Server.MakePrivate(B, function (E) {
            var D = App.getPageById(B);
            D.IsPublished = D.IsShared = false;
            P.precachePage(B, E); A()
        }, function (D) { C() })
    }, SetSharedUsers: function (C, I, D, G, E, A, H) {
        var B = "" + $(I).value;
        if (0 == B.trim().length) {
            $(E).innerHTML = Lang.ONE_EMAIL;
            $D(G);
            H();
            return
        }
        App.Server.SetSharedUsers(C, B, D, function (J) {
            if (J.length == 0) {
                var K = App.getPageById(C);
                K.IsShared = true;
                K.IsPublished = false;
                K.sharingStatus = (D ? SharingStatus.AllowEdit : SharingStatus.ReadOnly);
                $ND(G);
                $(E).innerHTML = "";
                ShareManager.refreshSettings(C);
                A()
            }
            else {
                $(E).innerHTML = PageflakesUtility.formatText(J);
                $D(G);
                H()
            }
            App.endWork()
        }, function (J) {
            App.endWork();
            $(E).innerHTML = PageflakesUtility.formatText(J); $D(G)
        })
    }, shareWith: function (D, B, J, G, H, C, A) {
        var E = "" + $(J).value;
        if (0 == E.trim().length) {
            $(H).innerHTML = Lang.ONE_EMAIL;
            $D(G);
            return
        }
        var I = E.trim();
        App.startWork();
        App.Server.SharePage(D, I, B, function (K) {
            if (K.length == 0) {
                App.getPageById(D).IsShared = true;
                $ND(G);
                $(H).innerHTML = "";
                TabManager.refresh();
                ShareManager.refreshSettings(D);
                C()
            }
            else {
                $(H).innerHTML = PageflakesUtility.formatText(K);
                $D(G);
                A()
            }
            App.endWork()
        }, function (K) {
            App.endWork();
            $(H).innerHTML = PageflakesUtility.formatText(K);
            $D(G)
        })
    }, publishPage: function (H, K, A, B, R, J, L, E, D) {
        var G = "" + $(R).value.trim();
        var N = $(K).value.trim();
        var O = $(A).value.trim();
        var C = $(PUB_ALLOW_EDIT).checked ? true : false;
        $ND(PUB_TITLE_REQ);
        $ND(PUB_DESC_REQ);
        $ND(PUB_TAG_REQ);
        var M = false;
        if (N == "") {
            $D(PUB_TITLE_REQ);
            M = true
        }
        if (O == "") {
            $D(PUB_DESC_REQ);
            M = true
        }
        var Q = ("" + $(B).value).trim();
        if (Q == Lang.TAGS_COMMA) {
            Q = ""
        }
        if (Q == "" || typeof (Q) == "undefined") {
            $D(PUB_TAG_REQ);
            M = true
        }
        else {
            var I = Q;
            I = I.replace(/\,/g, "").trim();
            if (I.length == 0) {
                $D(PUB_TAG_REQ); M = true
            }
        }
        if (M) {
            Settings.initButtons();
            return
        }
        if (G.trim() == Lang.EMAIL_COMMA) {
            G = ""
        }
        App.Server.PublishPage(H, N, O, Q, G, C, true, function (U) {
            var W = U[0];
            var Y = U[1];
            var V = U[2];
            var S = U[3];
            if (V == 0) {
                var X = App.getPageById(H);
                X.sharingStatus = C ? SharingStatus.AllowEdit : SharingStatus.ReadOnly;
                X.IsPublished = true;
                if (G != "") {
                    X.IsShared = true
                }
                $ND(J);
                $(L).innerHTML = "";
                ShareManager.refreshSettings(H);
                E(W, Y, S);
                $track("/StartMenu/Publish")
            }
            else {
                $(L).innerHTML = PU.formatText(V);
                $D(J);
                D(L)
            }
            App.endWork()
        }, function (S) {
            PageflakesUtility.dumpException(S);
            App.endWork();
            D()
        })
    }, unsharePage: function (B, C, A, D) {
        var H = C.length == 0 ? Lang.CONF_UNSHARE : Lang.CONF_UNINVITE;
        var G = C.length == 0 ? Lang.YES_MAKEPRIVATE : Lang.USER_NOMORE;
        var E = C.legnth == 0 ? Lang.NO_KEEPSHARE : Lang.NO_USERCONTINUE;
        App.confirm(H, G, E, function () {
            App.startWork();
            App.Server.UnsharePage(B, C, function (I) {
                App.endWork();
                App.getPageById(B).IsShared = I;
                ShareManager.refreshSettings(B);
                TabManager.refresh();
                A()
            }, function (I) {
                App.endWork(); D()
            })
        }, function () { }, function () { })
    }, unpublishPage: function (B, A, C) {
        App.confirm(Lang.CONFIRM_UNPUB, Lang.YES_UNPUB, Lang.NO_KEEPPUB, function () {
            App.startWork();
            App.Server.UnpublishPage(B, function () {
                App.getPageById(B).IsPublished = false;
                App.endWork();
                TabManager.refresh();
                ShareManager.refreshSettings(B); A()
            }, function (D) {
                App.endWork();
                failureCallback()
            })
        }, function () {
        }, function () { })
    }, refreshSettings: function (pageId) {
        var page = App.getPageById(pageId);
        var m = page.modules["Publish" + page.id];
        if (null != m) {
            var instance = eval(m.id);
            instance.refresh()
        }
        var m = page.modules["Share" + page.id];
        if (null != m) {
            var instance = eval(m.id);
            instance.refresh()
        }
    }, showPublishSettings: function (C) {
        var B = C.columnCount - 1;
        var A = App.createTempModule(C, "Publish" + C.id, Lang.PUB_SET, "flakes/Sharing/PublishPage.html?123", function () { }, 0, B)
    }, showShareSettings: function (C) {
        var B = C.columnCount - 1;
        var A = App.createTempModule(C, "Share" + C.id, Lang.SH_SET, "flakes/Sharing/SharePage.html?123", function () { }, 0, B)
    }, showPagesSharedToMe: function (C) {
        var B = C.columnCount - 1;
        var A = App.createTempModule(C, "Shared" + C.id, Lang.SH_TO_ME, "flakes/Sharing/SharedPages.html?123", function () { }, 0, B)
    } 
};
function PageSettings_ShowPageLayout() {
    $D("PageSettingsContainer");
    $ND("SharingOptions");
    $ND("PublishInCommunity");
    $ND("DeletePageContainer")
}
function PageSettings_ShowSharingOptions() {
    $ND("PageSettingsContainer");
    $D("SharingOptions");
    $ND("PublishInCommunity");
    $ND("DeletePageContainer")
}
function PageSettings_ShowCommunityPublish() {
    $ND("PageSettingsContainer");
    $ND("SharingOptions");
    $D("PublishInCommunity");
    $ND("DeletePageContainer")
}
function PageSettings_ShowDeletePage() {
    $ND("PageSettingsContainer");
    $ND("SharingOptions");
    $ND("PublishInCommunity");
    $D("DeletePageContainer")
}
function PageSettings_ShowNoShare() {
    $("PageSettings_NoShareRadio").className = "radio_item_active";
    $("PageSettings_PublishRadio").className = $("PageSettings_ShareRadio").className = "radio_item";
    $ND("PageSettings_PublishOptions");
    $ND("PageSettings_ShareOptions")
}
function PageSettings_ShowMakePublic() {
    $("PageSettings_PublishRadio").className = "radio_item_active";
    $("PageSettings_NoShareRadio").className = $("PageSettings_ShareRadio").className = "radio_item";
    $D("PageSettings_PublishOptions");
    $ND("PageSettings_ShareOptions");
    Settings.hideUserNameInPublishSettingsIfRequired();
    try {
        if ($(PUB_USERNAME)) {
            $(PUB_USERNAME).value = App.UserUniqueName;
            $ND("divUserNameNotUnique")
        } 
    }
    catch (A) { }
    $(PUB_USERNAMEURL).value = Settings.getCurrentPagePublishUrl(App.UserUniqueName)
}
function PageSettings_ShowShare() {
    $("PageSettings_ShareRadio").className = "radio_item_active";
    $("PageSettings_NoShareRadio").className = $("PageSettings_PublishRadio").className = "radio_item";
    $ND("PageSettings_PublishOptions");
    $D("PageSettings_ShareOptions")
}
function AddContent_Scripts_popup(E, D, B, C, A) {
    App.createPopupPage(E, D, B, C, A)
}
function AddContent_Scripts_addFlake(D, B) {
    PU.setBusy();
    var A = App.currentPage.id;
    var C = parseInt(App.currentPage.columnCount / 2);
    App.Server.CreateNewModule(D, B, A, C, 0, function (G) {
        var H = App.getPageById(A);
        var E = new Module();
        E.Build(G);
        E.page = H;
        P.createNewModule(H, E);
        E.loader = new ModuleLoader(E);
        E.loader.load(G.Parts);
        P.insertModule(H, E, E.col, E.row);
        P.saveLayoutNow(H); 
        PU.setIdle()
    })
}
function AddContent_Scripts_addFeed(B, A) {
    App.createNewModule(B, RSS_FEED_FLAKE_URL + escape(A), function () {
        PageflakesUtility.setIdle()
    }, 0, parseInt(App.currentPage.columnCount / 2))
}
function AddContent_Scripts_addContentInPage(E, A, D) {
    $ND(A); $D(D);
    var C = $(E);
    var B = $(D);
    B.innerHTML = "Discovering...";
    B.style.display = "block";
    App.Server.Discover(C.value, function (G) {
        AddContent_Scripts_showResults(D, G)
    })
}
function AddContent_Scripts_showResults(R, L) {
    var U = $$("div");
    var W = false;
    var D = false;
    var K = 0;
    for (var Q = 0; Q < L.length; Q++) {
        var V = L[Q];
        var Y = V.Title;
        var E = V.Url;
        var C = V.TypeOfContent;
        if (C == -1) {
            var N = $$("div");
            T(N, Y);
            U.appendChild(N);
            W = true
        }
        else {
            if (C == 0) { }
            else {
                D = true;
                var N = $$("div");
                N.className = "AddContentResultItem";
                var H = $$("a");
                H.className = "AddFeedPopup_FeedItem";
                formattedTitle = Y.replace(/'/g, "\\'");
                formattedUrl = E.replace(/'/g, "\\'");
                H.href = "javascript:AddContent_Scripts_addContent('" + escape(formattedTitle) + "', '" + escape(formattedUrl) + "', " + C + ");";
                T(H, unescape(Y));
                N.appendChild(H);
                N.appendChild($$("br"));
                var A = $$("small");
                T(A, AddContent_getTypeDescription(C));
                N.appendChild(A);
                U.appendChild(N);
                var I = $$("div");
                I.id = "AddContentResultOption";
                I.width = "100%";
                if (C == 1 || C == 2) {
                    var G = $$("img");
                    G.src = IMAGE_PREFIX + "images/addToBookmark.png";
                    G.align = "middle";
                    G.style.width = 19;
                    G.style.Height = 18;
                    I.appendChild(G);
                    var X = $$("a");
                    X.href = "javascript:AddContent_addBookmark('" + escape(formattedTitle) + "', '" + escape(formattedUrl) + "');";
                    T(X, Lang.ADD_FEED_BOOKMARK_LATER);
                    I.appendChild(X); 
                    var O = $$("span");
                    PageflakesUtility.setInnerText(O, " ");
                    O.width = 10;
                    I.appendChild(O)
                }
                var S = $$("img");
                S.style.width = 23;
                S.style.Height = 18;
                S.src = IMAGE_PREFIX + "images/addToPage.png";
                S.align = "middle";
                I.appendChild(S);
                var B = $$("a");
                B.href = "javascript:AddContent_Scripts_addContent('" + escape(formattedTitle) + "', '" + escape(formattedUrl) + "', " + C + ");";
                if (K == 0) {
                    AddContent_Scripts_addContent(Y, E, C);
                    K++;
                    var J = $(R);
                    J.innerHTML = "<b>Feed Added.</b>";
                    return
                }
                T(B, Lang.ADD_FEED_ADD_TO_MY_PAGE);
                I.appendChild(B);
                U.appendChild(I)
            } 
        } 
    }
    var M = $(R);
    if (!W) {
        if (D) {
            M.innerHTML = '<table cellspacing="0" cellpadding="0" width="95%"><tr><td>&nbsp;<b>' + Lang.ADD_FEED_AVAILABLE_CONTENT + ':</b></td><td valign="center" align="right"><img src="' + IMAGE_PREFIX + 'images/closeFeedResult.PNG" onclick="$ND(\'' + R + '\');" style="cursor: pointer; cursor: hand;"/></td></tr></table>';
            M.appendChild(U)
        }
        else {
            M.innerHTML = "The address you have entered does not contain an RSS Feed. Please enter the address of the RSS Feed you wish to add.<br />Example: http://rss.cnn.com/rss/cnn_topstories.rss"
        } 
    }
    else {
        M.innerHTML = "The address you have entered does not contain an RSS Feed. Please enter the address of the RSS Feed you wish to add.<br />Example: http://rss.cnn.com/rss/cnn_topstories.rss<br/>"
    } 
}
function AddContent_Scripts_addContent(C, A, B) {
    C = unescape(C);
    if (B == 0) {
        AddContent_Scripts_addFlake(C, A)
    }
    else {
        if (B == 1) {
            AddContent_Scripts_addFeed(C, A)
        }
        else {
            if (B == 2) {
                AddContent_Scripts_addFeed(C, A)
            }
            else {
                if (B == 3) {
                    AddContent_Scripts_addFlake(C, A)
                } 
            } 
        } 
    } 
}
function AddContent_getTypeDescription(B) {
    var A = new Array("Web Page", Lang.ADD_FEED_RSS_FEED, Lang.ADD_FEED_ATOM_FEED, "Pageflake");
    return A[B]
}
function AddContent_toggleTreeNode(A) {
    AddContent_toggleTreeImage(A)
}
function AddContent_toggleTreeImage(B) {
    var A = "div_" + B;
    var C = "img_" + B;
    $toggle(C, A)
}
function AddContent_collapseFeedTreeNodes() {
    try {
        var G = $("FeedRoots");
        var B = G.getElementsByTagName("ul");
        for (var D = 0; D < B.length; D++) {
            if (B.item(D).style.display != "none") {
                var E = B.item(D).id.substring(B.item(D).id.indexOf("_") + 1);
                $("div_" + E).style.display = "none";
                var A = $("img_" + E);
                if (A != null) {
                    A.src = IMAGE_PREFIX + "images/LeftArrow.png"
                } 
            } 
        } 
    }
    catch (C) {
        alert(C.message)
    } 
}
function AddContent_toggle(B, A) {
    $toggle(B, A)
}
function AddContent_addRssToPage(A, B) {
    AddContent_Scripts_addContent("", A, 1)
}
function AddContent_addBookmark(B, A) {
    App.Server.AddBookmark(B, A, function (C) {
        AddContent_refreshBookmarkList(C);
        RssCache.addChannelInCache(A)
    })
}
function AddContent_deleteAllBookmark() {
    App.Server.DeleteAllBookmark(function (A) {
        AddContent_refreshBookmarkList(A);
        RssCache.refreshCachedRssChannelList()
    })
}
function AddContent_deleteBookmark(C, B) {
    var A = $("bookmark_" + C);
    A.innerHTML = "removing...";
    App.Server.DeleteBookmark(C, function (D) {
        AddContent_refreshBookmarkList(D)
    });
    RssCache.removeChannelFromCache(B)
}
function AddContent_loadBookmarks() {
    App.Server.GetAllBookmarksHtml(function (A) {
        AddContent_refreshBookmarkList(A)
    })
}
function AddContent_refreshBookmarkList(A) {
    var B = new Image();
    var C = $("Bookmarks");
    if (null == C) {
        return
    }
    C.innerHTML = A;
    if (A.length == 0) {
        $("Bookmarks").innerHTML = Lang.NO_BOOKMARKS
    } 
}
function AddContent_ToggleOPMLoptions() {
    var A = $("OPMLoptionsDiv");
    if (A.style.display == "none") {
        $display(A)
    }
    else {
        $nodisplay(A)
    } 
}
function AddContent_showOPMLmessage(A) {
    try {
        AddContent_ManageBookmarks();
        OPMLMessage = A;
        setTimeout(AddContent_showOPMLmessageDelayed, 2000)
    }
    catch (B) { } 
}
function AddContent_showOPMLmessageDelayed() {
    if ($("OPMLmessageDiv") != null) {
        $("OPMLmessageDiv").innerHTML = OPMLMessage;
        $display($("OPMLmessageDiv"));
        OPMLMessage = "";
        var A = $("OPMLOptionContainer");
        A.innerHTML = "";
        A.innerHTML = OPMLOptionContents;
        RssCache.refreshCachedRssChannelList()
    }
    else {
        setTimeout(AddContent_showOPMLmessageDelayed, 2000)
    } 
}
function AddContent_ManageBookmarks() {
    var E = $(MANAGE_BOOKMARK_POPUP_ID);
    if (E == null) {
        var A = App.createPopup(MANAGE_BOOKMARK_POPUP_ID, "<b>" + Lang.BOOKMARKED_FEEDS + "</b>", 450, "auto");
        E = $(MANAGE_BOOKMARK_POPUP_ID);
        E.style.left = "300px";
        var D = PU.getPosition($("OpmlLink"));
        E.style.top = D[1] + "px";
        var C = $("closeLink" + MANAGE_BOOKMARK_POPUP_ID);
        C.onclick = function (G) {
            $ND(E);
            App.showAllControls()
        };
        var B = "BookmarkPopup.aspx";
        App.Server.GetPage(MANAGE_BOOKMARK_POPUP_ID, SITE_PREFIX + B, function (G) {
            if (!P.loadPage(G, A)) {
                $showError(Lang.COMMON_ERROR_ALERT);
                return
            }
            else {
                if (typeof AddContent_loadBookmarks == "function") {
                    AddContent_loadBookmarks()
                } 
            } 
        });
        App.hideAllControls()
    }
    else {
        AddContent_loadBookmarks();
        $D(E); $("OPMLmessageDiv").innerHTML = "";
        $nodisplay($("OPMLmessageDiv"))
    } 
}
var ThemeColorPicker = function () {
    this.isVisible = false;
    this.NO_COLOR_TEXT = "No Color (transparent)"
};
ThemeColorPicker.prototype = {
    initialize: function (A, D, C, B) {
        if (A == "" || A == "transparent") {
            A = "#FFFFFF"
        }
        this.color = this.cssColorToRGB(A);
        this.left = D;
        this.top = C;
        this.onSelectionChange = B;
        if (this.colorPicker == null) {
            this.colorPicker = $$("div");
            this.colorPicker.style.border = "2px solid dimgray";
            this.colorPicker.style.backgroundColor = "white";
            this.colorPicker.style.position = "absolute";
            this.colorPicker.style.padding = "6px";
            this.colorPicker.style.zIndex = "10000";
            $ND(this.colorPicker);
            $addEvent(this.colorPicker, "click", F(this, this.onColorPicked));
            document.body.appendChild(this.colorPicker)
        }
        else {
            $ND(this.colorPicker)
        }
    }, ToRGB1: function (C, B, A) {
        if (A > 360) {
            A -= 360
        }
        else {
            if (A < 0) { A += 360 } 
        }
        if (A < 60) {
            C = C + (B - C) * A / 60
        }
        else {
            if (A < 180) { C = B }
            else {
                if (A < 240) { C = C + (B - C) * (240 - A) / 60 } 
            } 
        }
        return Math.round(C * 255)
    }, HSLtoRGB: function (C, B, A) {
        var D, E;
        if (B == 0) {
            return [A, A, A]
        }
        C = C * 360 / 255;
        B /= 255; A /= 255;
        if (A <= 0.5) {
            D = A + A * B
        }
        else {
            D = A + B - A * B
        }
        E = 2 * A - D;
        return [this.ToRGB1(E, D, C + 120), this.ToRGB1(E, D, C), this.ToRGB1(E, D, C - 120)]
    }, cssColorToRGB: function (B) {
        var A;
        if (B.indexOf("#") == 0) {
            B = B.toUpperCase();
            return [this.hex2dec(B.substr(1, 2)), this.hex2dec(B.substr(3, 2)), this.hex2dec(B.substr(5, 2))]
        }
        else {
            if (B.indexOf("rgb") == 0) {
                A = (B.substr(4, B.indexOf(")") - 4)).split(",");
                return A
            } 
        }
    }, hex2dec: function (B) {
        var C = "0123456789ABCDEF";
        var A = 0;
        for (a = B.length - 1; a >= 0; a--) {
            A += Math.pow(16, B.length - a - 1) * C.indexOf(B.charAt(a))
        }
        return A
    }, dec2hex: function (C) {
        var B = "0123456789ABCDEF";
        var A = B.substr(C & 15, 1);
        while (C > 15) {
            C >>= 4;
            A = B.substr(C & 15, 1) + A
        }
        if (A.length == 1) {
            A = "0" + A
        }
        return A
    }, build: function () {
        var D = $$("table");
        D.style.borderCollapse = "collapse";
        D.style.cursor = "pointer";
        D.style.clear = "both";
        var B = $$("tbody");
        var C = (this.color == "transparent");
        for (l = 0; l <= 250; l += 10) {
            if (l == 250) { l = 255 }
            var E = $$("tr");
            var H = $$("td");
            H.style.height = "10px";
            H.style.width = "10px";
            H.style.backgroundColor = "rgb(" + l + "," + l + "," + l + ")";
            if (this.color && this.color[0] == l && this.color[1] == l && this.color[2] == l) {
                if (l > 130) {
                    H.style.color = "black"
                }
                else {
                    H.style.color = "white"
                }
                H.style.textAlign = "center";
                if (!C) {
                    C = true;
                    if (Browser.isIE) {
                        H.innerHTML = "<div style='position: absolute; margin-top: -4px;margin-left:-2px'>x</div>"
                    }
                    else {
                        H.innerHTML = "<div style='position: absolute; margin-top: -9px;margin-left:2px'>x</div>"
                    } 
                }
                var G = H.firstChild;
                this.current = false
            }
            E.appendChild(H);
            for (t = 0; t <= 240; t += 10) {
                H = $$("td");
                var A = this.HSLtoRGB(t, 240, l);
                H.style.height = "10px";
                H.style.width = "10px";
                if (!C && this.color[0] == A[0] && this.color[1] == A[1] && this.color[2] == A[2]) {
                    C = true;
                    H.style.color = "rgb(" + (255 - A[0]) + "," + (255 - A[1]) + "," + (255 - A[2]) + ")";
                    H.style.textAlign = "center";
                    if (Browser.isIE) {
                        H.innerHTML = "<div style='position: absolute; margin-top: -4px;margin-left:-2px'>x</div>"
                    }
                    else {
                        H.innerHTML = "<div style='position: absolute; margin-top: -9px;margin-left:2px'>x</div>"
                    }
                    var G = H.firstChild
                }
                H.style.backgroundColor = "rgb(" + A[0] + "," + A[1] + "," + A[2] + ")";
                E.appendChild(H)
            }
            B.appendChild(E)
        }
        E = $$("tr");
        E.style.backgroundColor = "white";
        H = $$("td");
        H.setAttribute("colSpan", "26");
        H.innerHTML = 'RGB: #<input type=text value="" id="ColorPickerRGBInput" style="width:40px;" maxlength=6 />';
        E.appendChild(H);
        B.appendChild(E);
        E = $$("tr");
        E.style.backgroundColor = "white";
        H = $$("td");
        H.setAttribute("colSpan", "13");
        T(H, this.NO_COLOR_TEXT);
        H.style.backgroundColor = "transparent";
        E.appendChild(H);
        td2 = $$("td");
        td2.setAttribute("colSpan", "13");
        td2.setAttribute("align", "right");
        T(td2, "Close");
        E.appendChild(td2);
        B.appendChild(E);
        D.appendChild(B);
        return D
    }, setColorFromInput: function () {
        var A = this.colorPickerInput.value;
        this.onSelectionChange(A)
    }, onColorPicked: function (C) {
        C = $fix(C);
        $stopBubble(C);
        var D = C.target;
        if (D.tagName == "INPUT") {
            return
        }
        while (D.tagName != "TD" && D != null) {
            D = D.parentNode
        }
        if (null == D) {
            return
        }
        var A = D.style.backgroundColor;
        if (T(D) == this.NO_COLOR_TEXT) {
            this.onSelectionChange("transparent")
        }
        else {
            if (T(D) == "Close") {
                this.hide(C)
            }
            else {
                var B = this.cssColorToRGB(D.style.backgroundColor);
                B = this.dec2hex(B[0]) + this.dec2hex(B[1]) + this.dec2hex(B[2]);
                this.onSelectionChange(B)
            } 
        }
        $ND(this.colorPicker) 
    }, show: function (A) {
        this.control = A;
        this.colorPicker.innerHTML = "";
        this.colorPicker.appendChild(this.build());
        if ((this.left + 312) > PU.getPosition($("Content"))[2]) {
            this.left -= 312 - 15
        } 
        this.colorPicker.style.left = this.left + "px";
        this.colorPicker.style.top = this.top + "px";
        $D(this.colorPicker); 
        this.isVisible = true;
        this.colorPickerInput = $("ColorPickerRGBInput"); 
        this.colorPickerInput.colorPicker = this;
        this.colorPickerInput.onkeydown = function (B) {
            B = $fix(B);
            if (B.keyCode == 13) {
                this.colorPicker.setColorFromInput()
            } 
        };
        this.colorPickerInput.value = this.dec2hex(this.color[0]) + this.dec2hex(this.color[1]) + this.dec2hex(this.color[2])
    }, hide: function (A) {
        this.isVisible = false;
        $ND(this.colorPicker)
    } 
};

var AddContentWS = function () {
    AddContentWS.initializeBase(this);
    this._timeout = 0;
    this._userContext = null;
    this._succeeded = null;
    this._failed = null
};
AddContentWS.prototype = {
    GetOnsiteFlakeGrid: function (B, C, A, D) {
        return this._invoke(AddContentWS.get_path(), "GetOnsiteFlakeGrid", false, {
            categoryID: B
        }, C, A, D)
    }, GetOnsiteItemGrid: function (C, A, D, B, E) {
        return this._invoke(AddContentWS.get_path(), "GetOnsiteItemGrid", true, {
            categoryID: C, version: A
        }, D, B, E)
    }, GetPageSettingsGrid: function (C, G, B, A, E, D, H) {
        return this._invoke(AddContentWS.get_path(), "GetPageSettingsGrid", true, {
            pageSettingValue: C, domainID: G, languageID: B, version: A
        }, E, D, H)
    } 
};
AddContentWS.registerClass("AddContentWS", Sys.Net.WebServiceProxy);
AddContentWS._staticInstance = new AddContentWS();
AddContentWS.set_path = function (A) { AddContentWS._staticInstance._path = A };
AddContentWS.get_path = function () { return AddContentWS._staticInstance._path };
AddContentWS.set_timeout = function (A) { AddContentWS._staticInstance._timeout = A };
AddContentWS.get_timeout = function () { return AddContentWS._staticInstance._timeout };
AddContentWS.set_defaultUserContext = function (A) { AddContentWS._staticInstance._userContext = A };
AddContentWS.get_defaultUserContext = function () { return AddContentWS._staticInstance._userContext };
AddContentWS.set_defaultSucceededCallback = function (A) { AddContentWS._staticInstance._succeeded = A };
AddContentWS.get_defaultSucceededCallback = function () { return AddContentWS._staticInstance._succeeded };
AddContentWS.set_defaultFailedCallback = function (A) { AddContentWS._staticInstance._failed = A };
AddContentWS.get_defaultFailedCallback = function () { return AddContentWS._staticInstance._failed };
AddContentWS.set_path("./AddContentWS.asmx");
AddContentWS.GetOnsiteFlakeGrid = function (B, C, A, D) { AddContentWS._staticInstance.GetOnsiteFlakeGrid(B, C, A, D) };
AddContentWS.GetOnsiteItemGrid = function (C, A, D, B, E) { AddContentWS._staticInstance.GetOnsiteItemGrid(C, A, D, B, E) };
AddContentWS.GetPageSettingsGrid = function (C, E, B, A, G, D, H) { AddContentWS._staticInstance.GetPageSettingsGrid(C, E, B, A, G, D, H) };


var SF = SecondaryFramework = {
    initialized: false
    , firstVisitTooltip: function () {
        PF.DC(function () {
            if (App.My.Profile.BVSTT != "1" && App.IsMySite == true) {
                App.saveProfile("BVSTT", "1")
            }
        }, 2000)
    }, initPublicPageTab: function () {
        PF.changeParent("pagecast_invite_panel", "public_page_tab_placeholder");
        if (!App.IsMySite) {
            if (!App.IsCompactFramework) {
                PublicPageHeaderClass.init()
            }
        }
        else {
            if (App.IsMySite && App.currentPage.IsPublished) {
                if (!App.IsCompactFramework) { PublicPageTab.init(App.currentPage.IsPublished) }
            }
        }
    }, SaveFSBS: function () {
        App.saveProfile("FSBS", "1")
    }, initialize: function () {        
        var C = "";
        var A = "";
        if (Browser.isIE6) {
            C = "IE"; A = "6"
        }
        else {
            if (Browser.isIE7) {
                C = "IE"; A = "7"
            }
            else {
                if (Browser.isIE8) {
                    C = "IE"; A = "8"
                }
                else {
                    if (Browser.isFirefox) {
                        C = "Firefox";
                        A = "2";
                        if (typeof (Sys.Browser.version) != "undefined") {
                            A = parseInt(Sys.Browser.version)
                        }
                    }
                    else {
                        if (Browser.isSafari) {
                            C = "AppleMAC-Safari"; A = "5"
                        }
                    }
                } 
            }
        }
        PU.addCss("SecondaryCss", "s.axd?s=CSS2&h=" + document.location.host + "&l=" + LANGUAGE + "&v=" + VERSION_SUFFIX + "&b=" + C + "&m=" + A);
       
                
        if (!App.loaded) {
            return
        }
        
        if (SF.initialized == true) {
            return
        }
        SF.initialized = true;

        TabManager.create();
        ScrollManager.init();
        window.onresize = P.onResize;
        P.onResize();
        StartPageHelper.init();
        App.Server.GetTooltips(function (E) {
            if ((E != null) && (E.length > 0)) {
                TipFactory.showTips(E)
            }
        });
        SF.firstVisitTooltip();
        SF.showInProductMessage();
        SF.loadDefaultPageContent(function () {
            SF.initPublicPageTab()
        });
        SF.showWW();
        var B = new Object();
        B.top_flakes = function () {
            Start.toggleStart(false, 0)
        };
        B.browse_flakes = function (E) {
            Start.toggleStart(false, 1, E)
        };
        B.pagecasts = function () {
            Start.toggleStart(false, 2)
        };
        B.make_pagecast = function () {
            Start.toggleStart(false, 3)
        };
        B.change_theme = function () { Start.toggleStart(false, 4) }; B.change_layout = function () { Start.toggleStart(false, 5) }; B.my_profile = function (E) { Start.toggleStart(false, 6, E) }; var D = new Object(); window.location.search.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function (F, E, H, G) { D[E] = G }); if (D.go != undefined) { if (B[D.go] != undefined) { B[D.go]() } else { if (D.go.toString().substring(0, 14) == "browse_flakes:") { B.browse_flakes(D.go.toString().substring(14, D.go.toString().length)) } else { if (D.go.toString().substring(0, 11) == "my_profile:") { B.my_profile(D.go.toString().substring(11, D.go.toString().length)) } } } }
    }, showWW: function () {
        if (document.location.href.indexOf("?personalize") > 0) {
            WWHelper.show()
        }
    }, loadDefaultPageContent: function (A) {
        PF.getUrl("DefaultPageContent.aspx?v=" + VERSION_SUFFIX, function (B) {
            var C = $$("div");
            C.innerHTML = B;
            document.body.appendChild(C); A()
        })
    }, showInProductMessage: function () {
        if (!App.IsMySite) {
            return
        }
        if (App.My.InProductMessage.length > 0) {
            var B = App.My.InProductMessage.split("|");
            $("errorMsg").innerHTML = B[1].toString();
            var A = $("messageBarClose");
            A.className = "InProductLink";
            if (T(A) != "Hide this") {
                T(A, "Hide this")
            }
            $D("messageBar");
            PF.addEvent(A, "click", function (C) { if (T(A) == "Hide this" && null != B[0]) { SF.hideInProductMessage(B[0].toUpperCase()) } else { PU.hideMsg() } })
        }
    }, hideInProductMessage: function (A) {
        PU.hideMsg();
        App.My.InProductMessage = "";
        App.Server.UpdateInProductMessageSettings(A)
    }
};

$DC(function () {
    if (typeof window.startupInfo == "undefined") {
        $showMsg(Lang.SOMETHING_WRONG)
        
        return
    }
    if (!window.startupInfo.IsFirstVisit && !window.suppressLoad) {
        SF.initialize()
        //$showMsg(!window.suppressLoad + " PostFrameWork $DC")       
    }
});

var PUBLIC_PAGE_URL_TEXT = "pIUrl";
var PUBLIC_PAGE_EMAIL = "pIEmail";
var PUBLIC_EMAIL_SEND_PROGRESS = "pISendInProgress";
var PUBLIC_EMAIL_SEND_BUTTON = "pIButton";
var PUBLIC_PAGE_INVITE_CONTAINER = "pagecast_invite_panel";
var NORMAL_GRAY_PANEL = "gray_panel";
var PUBLIC_QUICK_INVITE_TEXTBOX_ENABLED = "pagecast_quick_invite_textbox_enabled";
var PUBLIC_QUICK_INVITE_TEXTBOX_DISABLED = "pagecast_quick_invite_textbox_disabled";
var PUBLIC_QUICK_INVITE_SEND_PROGRESS = "pISending";
var PUBLIC_QUICK_INVITE_SEND_DONE = "pISent";
var PUBLIC_QUICKE_INVITIE_IMPORT_ADDRESS = "pIImportAddress";
var PUBLIC_QUICK_COLLAPSE_LINK = "collaspe_link";
var PUBLIC_QUICK_EXPAND_LINK = "expand_link";
var PUBLIC_QUICK_INVITE_BAR = "quick_invite_bar";
var PAGECAST_BAR_PROFILE_KEY = "ShowPagecastBar";
var EMPTY = "";
var DEFAULT_EMAIL_TEXT = "email1, email2, ...";
var SEND_TOOLTIP_NO_EMAIL = "Please enter an email address";
var SEND_TOOLTIP_INVALID_EMAIL_TEXT = "Please enter at one valid email address";
var SEND_TOOLTIP_VALID_EMAIL_TEXT = "Send Link!";
var PAGECAST_BAR_INTIAL = "PFVM";

var PublicPageTab = {
    username: ""
    , init: function (B) {
        $ND(PUBLIC_PAGE_INVITE_CONTAINER);
        $ND(PUBLIC_QUICK_INVITE_BAR);
        var A = false;
        if (B) {
            if (App.currentPage.IsOwner) {
                PublicPageTab.loadTab(App.UserUniqueName);
                A = true
            }
            else {
                if (App.currentPage.IsShared && App.currentPage.sharingStatus == SharingStatus.AllowEdit) {
                    PublicPageTab.loadTab(App.currentPage.OwnerName);
                    A = true
                }
            }
        }
        if (!A) {
            $D(NORMAL_GRAY_PANEL)
        }
    }, loadTab: function (C) {
        PublicPageTab.username = C;
        $(PUBLIC_PAGE_URL_TEXT).value = App.getCurrentPagePublishUrl(PublicPageTab.username);
        $ND(NORMAL_GRAY_PANEL);
        $D(PUBLIC_QUICK_INVITE_BAR);
        var A = false;
        var B = PAGECAST_BAR_INTIAL + "_" + App.currentPage.id;
        if (typeof App.My.Profile[B] == "undefined") {
            A = true; App.saveProfile(B, "1")
        }
        else {
            if (App.My.Profile[B] == "1") {
                A = true
            }
        }
        if (App.My.Profile[PAGECAST_BAR_PROFILE_KEY + "_" + App.currentPage.id] == "1" || A) {
            $D(PUBLIC_PAGE_INVITE_CONTAINER);
            $ND(PUBLIC_QUICK_EXPAND_LINK);
            $D(PUBLIC_QUICK_COLLAPSE_LINK)
        }
        else {
            $ND(PUBLIC_PAGE_INVITE_CONTAINER);
            $D(PUBLIC_QUICK_EXPAND_LINK);
            $ND(PUBLIC_QUICK_COLLAPSE_LINK)
        }
        PublicPageTab.sendButton = $(PUBLIC_EMAIL_SEND_BUTTON);
        PublicPageTab.inviteText = $(PUBLIC_PAGE_EMAIL);
        PublicPageTab.importAddress = $(PUBLIC_QUICKE_INVITIE_IMPORT_ADDRESS);
        PublicPageTab.collaspeLink = $(PUBLIC_QUICK_COLLAPSE_LINK);
        PublicPageTab.expandLink = $(PUBLIC_QUICK_EXPAND_LINK);
        PublicPageTab.sendButton.disabled = true;
        PublicPageTab.sendButton.title = SEND_TOOLTIP_NO_EMAIL;
        PublicPageTab.inviteText.value = DEFAULT_EMAIL_TEXT;
        PublicPageTab.inviteText.className = PUBLIC_QUICK_INVITE_TEXTBOX_DISABLED;
        PublicPageTab.collaspeLink.onmouseover = function (D) {
            PublicPageTab.collaspeLink.className = "colapse_icon colapse_icon_hover"
        };
        PublicPageTab.expandLink.onmouseover = function (D) {
            PublicPageTab.expandLink.className = "expand_icon expand_icon_hover"
        };
        PublicPageTab.collaspeLink.onmouseout = function (D) {
            PublicPageTab.collaspeLink.className = "colapse_icon"
        };
        PublicPageTab.collaspeLink.onclick = function (D) {
            PublicPageTab.toggleBar()
        };
        PublicPageTab.expandLink.onmouseout = function (D) {
            PublicPageTab.expandLink.className = "expand_icon"
        };
        PublicPageTab.expandLink.onclick = function (D) {
            PublicPageTab.toggleBar()
        };
        PublicPageTab.sendButton.onclick = function (D) {
            PublicPageTab.sendNotification()
        };
        PublicPageTab.sendButton.onclick = function (D) {
            PublicPageTab.sendNotification()
        };
        PublicPageTab.importAddress.onclick = function (D) {
            if (PublicPageTab.validateEmail(PublicPageTab.inviteText.value)) {
                SendPageToFriend.show(PublicPageTab.inviteText.value.replace(/\s/gi, ""), true)
            }
            else {
                SendPageToFriend.show("", true)
            }
        };
        PublicPageTab.inviteText.onblur = function () {
            if (PublicPageTab.inviteText.value == "") {
                PublicPageTab.inviteText.value = DEFAULT_EMAIL_TEXT
            }
            if (PublicPageTab.inviteText.value == DEFAULT_EMAIL_TEXT) {
                PublicPageTab.inviteText.className = PUBLIC_QUICK_INVITE_TEXTBOX_DISABLED;
                PublicPageTab.sendButton.title = SEND_TOOLTIP_NO_EMAIL
            }
        };
        PublicPageTab.inviteText.onfocus = function () {
            PublicPageTab.inviteText.className = PUBLIC_QUICK_INVITE_TEXTBOX_ENABLED;
            if (PublicPageTab.inviteText.value == DEFAULT_EMAIL_TEXT) {
                PublicPageTab.inviteText.value = EMPTY
            }
        };
        PublicPageTab.inviteText.onkeyup = function (D) {
            if (PublicPageTab.validateEmail(PublicPageTab.inviteText.value)) {
                PublicPageTab.sendButton.disabled = false;
                PublicPageTab.sendButton.title = SEND_TOOLTIP_VALID_EMAIL_TEXT
            }
            else {
                PublicPageTab.sendButton.disabled = true;
                PublicPageTab.sendButton.title = SEND_TOOLTIP_INVALID_EMAIL_TEXT
            }
        }
    }, showToolBar: function () {
        App.saveProfile(PAGECAST_BAR_PROFILE_KEY + "_" + App.currentPage.id, "1");
        App.saveProfile(PAGECAST_BAR_INTIAL + "_" + App.currentPage.id, "0")
    }, toggleBar: function () {
        if ($isVisible(PUBLIC_QUICK_COLLAPSE_LINK)) {
            $D(PUBLIC_QUICK_EXPAND_LINK);
            $ND(PUBLIC_QUICK_COLLAPSE_LINK);
            $ND(PUBLIC_PAGE_INVITE_CONTAINER);
            if (App.IsMySite) {
                App.saveProfile(PAGECAST_BAR_PROFILE_KEY + "_" + App.currentPage.id, "0")
            }
        }
        else {
            $ND(PUBLIC_QUICK_EXPAND_LINK);
            $D(PUBLIC_PAGE_INVITE_CONTAINER);
            $D(PUBLIC_QUICK_COLLAPSE_LINK);
            if (App.IsMySite) {
                App.saveProfile(PAGECAST_BAR_PROFILE_KEY + "_" + App.currentPage.id, "1")
            }
        }
        if (App.IsMySite) {
            App.saveProfile(PAGECAST_BAR_INTIAL + "_" + App.currentPage.id, "0")
        }
    }, validateEmail: function (E) {
        var B = false;
        var D = E.replace(/\s/gi, "");
        if (D.indexOf(",") > 0) {
            var A = D.split(",");
            for (var C = 0; C < A.length; C++) {
                if (A[C].length > 0) {
                    B = PublicPageTab.checkEmail(A[C])
                }
            }
        }
        else {
            B = PublicPageTab.checkEmail(D)
        }
        return B
    }, checkEmail: function (C) {
        var A = false;
        var B = /^.+@.+\..{2,3}$/;
        if (B.test(C)) {
            A = true
        }
        return A
    }, sendNotification: function () {
        $(PUBLIC_EMAIL_SEND_PROGRESS).style.display = "inline";
        $ND(PUBLIC_EMAIL_SEND_BUTTON, PUBLIC_QUICKE_INVITIE_IMPORT_ADDRESS);
        App.Server.SendPublicPageInvitation(App.currentPage.id, $(PUBLIC_PAGE_EMAIL).value, EMPTY, function (A) {
            $(PUBLIC_QUICK_INVITE_SEND_DONE).style.display = "inline";
            $ND(PUBLIC_QUICK_INVITE_SEND_PROGRESS);
            window.setTimeout("PublicPageTab.showNormalLayout();", 1000)
        }, function (A) {
            PageflakesUtility.dumpException(A);
            PublicPageTab.showNormalLayout()
        })
    }, showNormalLayout: function () {
        $ND(PUBLIC_QUICK_INVITE_SEND_DONE);
        $(PUBLIC_QUICK_INVITE_SEND_PROGRESS).style.display = "inline";
        $ND(PUBLIC_EMAIL_SEND_PROGRESS);
        $(PUBLIC_QUICKE_INVITIE_IMPORT_ADDRESS).style.display = "inline";
        $(PUBLIC_EMAIL_SEND_BUTTON).style.display = "inline"
    }
};
var PUBLIC_PAGE_HEADER_OWNER = "PUBLIC_PAGE_HEADER_OWNER";
var PUBLIC_PAGE_HEADER_COPY = "PUBLIC_PAGE_HEADER_COPY";
var PUBLIC_PAGE_HEADER_RANDOM = "PUBLIC_PAGE_HEADER_RANDOM";
var PUBLIC_PAGE_HEADER_LOGIN_LINK = "PUBLIC_PAGE_HEADER_LOGIN_LINK";
var PUBLIC_PAGE_HEADER_SEND = "PUBLIC_PAGE_HEADER_SEND";
var PUBLIC_PAGE_HEADER_BOOKMARK = "PUBLIC_PAGE_HEADER_BOOKMARK";
var PUBLIC_HEADER_IMG_HOME = "PUBLIC_HEADER_IMG_HOME";
var PUBLIC_HEADER_CONTAINTER = "publicPageHeaderContainer";

var PublicPageHeaderClass = {
    copyButton: null
    , randomButton: null
    , profileId: 0
    , init: function () {
        PublicPageHeaderClass.showHeader(false);
        if (App.currentPage.IsPublished) {
            SearchForm.close(true);
            PublicPageHeaderClass.showHeader(true);
            if (App.ViewingPageOf == "") {
                window.setTimeout("PublicPageHeaderClass.setText()", 100)
            }
            else {
                PublicPageHeaderClass.setText()
            }
            PublicPageHeaderClass.copyButton = $(PUBLIC_PAGE_HEADER_COPY);
            PublicPageHeaderClass.randomButton = $(PUBLIC_PAGE_HEADER_RANDOM);
            PublicPageHeaderClass.sendButton = $(PUBLIC_PAGE_HEADER_SEND);
            PublicPageHeaderClass.bookmarkButton = $(PUBLIC_PAGE_HEADER_BOOKMARK);
            PublicPageHeaderClass.copyButton.onclick = function (A) {
                PublicPageHeaderClass.getACopy()
            };
            PublicPageHeaderClass.sendButton.onclick = function (A) {
                SendPageToFriend.show()
            };
            PublicPageHeaderClass.randomButton.onclick = function (A) {
                PublicPageHeaderClass.getRandomPublicPage()
            };
            PublicPageHeaderClass.bookmarkButton.onclick = function (A) {
                PublicPageHeaderClass.boomarkPage()
            };
            if ($(PUBLIC_PAGE_HEADER_LOGIN_LINK) != null) {
                $(PUBLIC_PAGE_HEADER_LOGIN_LINK).href = SITE_PREFIX + "login.aspx?ReturnUrl=" + document.location.href
            }
            PublicPageHeaderClass.initializeProfile()
        }
    }, showHeader: function (A) {
        if ($(PUBLIC_HEADER_CONTAINTER) != null) {
            if (!A) {
                $("header").style.marginTop = "0px";
                $(PUBLIC_HEADER_CONTAINTER).style.display = "none"
            }
            else {
                $("header").style.marginTop = "20px";
                $(PUBLIC_HEADER_CONTAINTER).style.display = "block"
            }
        }
    }, setText: function () {
        $(PUBLIC_PAGE_HEADER_OWNER).innerHTML = App.ViewingPageOf + "'s Pagecast"
    }, getACopy: function () {
        PU.blockUI("Copying Pagecast...");
        App.Server.CreateCopyOfPage(App.currentPage.id, App.ViewingPageOf, function (A) {
            if (A) {
                document.location.href = SITE_PREFIX
            }
            PU.unblockUI()
        }, function (A) {
            PageflakesUtility.dumpException(A); PU.unblockUI()
        })
    }, getRandomPublicPage: function () {
        App.Server.GetRandomPageUrlFromRepository(function (A) {
            document.location.href = A
        }, function (A) {
            PageflakesUtility.dumpException(A)
        })
    }, boomarkPage: function () {
        PublicPageHeaderClass.performBookmark()
    }, performBookmark: function () {
        PU.blockUI("Please wait...");
        App.Server.BookmarkPageForUser(App.currentPage.id, App.ViewingPageOf, function (A) {
            document.location.href = SITE_PREFIX; PU.unblockUI()
        }, function (A) {
            PageflakesUtility.dumpException(A); PU.unblockUI()
        })
    }, initializeProfile: function () {
        App.Server.GetUserProfileId(App.currentPage.id, function (A) {
            if (A > 0) {
                $(PUBLIC_PAGE_HEADER_OWNER).innerHTML = '<a href="' + SITE_PREFIX + "Community/Profile.aspx?profileID=" + A + '">' + App.ViewingPageOf + "</a>'s Pagecast"
            }
        }, function (A) {
            PageflakesUtility.dumpException(A)
        })
    }
};
var FeedViewer = {
    V_SPLITER_PADDING: 20
    , H_SPLITER_PADDING: 10
    , vSplitDragStart: false
    , vSpliterRightPadding: 10
    , hSplitDragStart: false
    , hSpliter: null
    , hSpliter2: null
    , vSpliter: null
    , vSpliter2: null
    , vSplitOldTop: 0
    , readingAreaTop: 53
    , articleIcon: '<div class="feedViewer_FeedIcon"></div>'
    , iframe_Loading: '<div style="margin-left:300px;margin-top:200px">Loading...</div>'
    , previousonkeyupHandle: null
    , SelectedList: ""
    , FEED_LIST: "FeedList"
    , CHANNEL_LIST: "ChannelList"
    , ALL_CHANNELS_WRAPPER_ID: "AllChannelWrapper"
    , PAGETOPMARKER_PREFIX: "mr"
    , WRAPPER_PREFIX: "wrap"
    , WRAPPER_START_PREFIX: "wrapStr"
    , WRAPPER_END_PREFIX: "wrapEnd", LEFT_PANE_ITEM_TITLE_PREFIX: "lnk", LEFT_PANE_ITEM_TITLE_MAX_LENGTH: 50
    , RSS_READER_ID: "RssViewer", SELECTED_CHANNEL_ALLFEEDS_ID: -1, SELECTED_CHANNEL_SAVEDFEEDS_ID: -2
    , RSSItemDetailWidth: 0, VIEWER_TOP: 78, LEFT_POS: 0, RIGHT_POS: 0, WIDTH: 960
    , FEEDTITLEPREFIX: "feedTitle", DIVID_PREFIXLEN: 10, MAX_CHANNELTITLE_WIDTH: 20, DEFAULT_PAGE_SIZE: 20
    , NEWSPAPER_VIEW_PAGESIZE: 20, OUTLOOK_VIEW_PAGESIZE: 20, SPACE: "&nbsp;|&nbsp;", NEW_WINDOW_TARGET: "_blank"
    , MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER: 50, MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER: 200
    , MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL: 300, MAX_FEED_VIEWER_TITLE_LENGTH: 200, MARK_ALL_READ: "allread"
    , MARK_ALL_UNREAD: "allunread", MARK_READ: "read", MARK_UNREAD: "unread", MARK_ALL_CHANNEL_READ: "allchannelread"
    , MARK_ALL_CHANNEL_UNREAD: "allchannelunread", BODY_CONTAINER: MODULE_CONTAINER, OUTLOOK_VIEW_RSS: "OutlookViewRSS"
    , OUTLOOK_VIEW_WEBSITE: "OutlookViewWebsite", NEWSPAPER_VIEW: "NewspaperView"
    , OUTLOOK_ON: "FeedViewer_imgShowOutlookViewOn", OUTLOOK_OFF: "FeedViewer_imgShowOutlookViewOff"
    , NEWSPAPER_ON: "FeedViewer_imgShowNewspaperViewOn", NEWSPAPER_OFF: "FeedViewer_imgShowNewspaperViewOff"
    , CSS_CHANNEL_DELETE: "feedViewer_ChannelDelete", CSS_CHANNEL_ICON: "feedViewer_ChannelIcon"
    , CSS_CHANNEL_ICON_READ: "feedViewer_ChannelIcon_read", RSS_ON: "FeedViewer_imgShowRSSViewOn"
    , RSS_OFF: "FeedViewer_imgShowRSSViewOff", WEBSITE_ON: "FeedViewer_imgShowWebsiteViewOn", WEBSITE_OFF: "FeedViewer_imgShowWebsiteViewOff"
    , WEBSITE_DISABLED: "FeedViewer_imgShowWebsiteViewDisabled", FEEDVIEWER_RSSITEM_TITLE: "FeedViewer_RSSItem_Title"
    , FEEDVIEWER_RSSITEM_DESCRIPTION: "FeedViewer_RSSItem_Description"
    , FEEDVIEWER_RSSITEM_DESCRIPTION_READ: "FeedViewer_RSSItem_Description_Read"
    , FEEDVIEWER_RSSITEM_PUBLISHEDDATE: "Feedviewer_RSSItem_PublishedDate"
    , FEEDVIEWER_RSSITEM_PUBLISHEDDATE_READ: "Feedviewer_RSSItem_PublishedDate_Read", SORT_ORDER_DESC: "desc"
    , SORT_ORDER_ASC: "asc", _selectedChannelId: 0, _selectedRssItemID: 0, _tmpChannelID: 0
    , _allFeedCurrentIndex: 0, _allFeedItems: null, _currentViewMode: "OutlookViewRSS"
    , _lastSelectedLeftPaneItemDiv: null, _lastSelectedRSSItemDiv: null, _savedRssItemsChannelDiv: null
    , _allFeedsRssItemsChannelDiv: null, _divLoadNextFeeds: null, _leftPaneChannelDivs: null
    , DIV_FEEDLIST: "divFeedList", DIV_TITLE: "titleRssViewer", STYLE_CH_MOUSEOVER: "feedViewer_channelMouseOver"
    , STYLE_CH_SELECTED: "feedViewer_channelSelected", STYLE_CH_NOTSELECTED: "feedViewer_channelNotSelected"
    , STYLE_MOUSEOVER: "feedViewer_mouseOver", STYLE_SELECTED: "feedViewer_selected", STYLE_NOTSELECTED: "feedViewer_notSelected"
    , STYLE_NOTSELECTEDALT: "feedViewer_notSelectedAltRow", STYLE_ALLSELECTED: "feedViewer_allSelected"
    , STYLE_ALLNOTSELECTED: "feedViewer_allNotSelected", STYLE_RSSITEM_WRAPPER: "FeedViewer_RSSItem_Wrapper"
    , STYLE_FEEDVIEWER_OPTIONS: "FeedViewer_options", STYLE_OUTLOOKVIEW_RSSITEMDETAIL_IE: "outlookView_RssItemdetail_IE"
    , STYLE_OUTLOOKVIEW_RSSITEMDETAIL_FF: "outlookView_RssItemdetail_FF"
    , STYLE_OUTLOOKVIEW_IFRAME_IE: "outlookView_IFRAME_IE", STYLE_OUTLOOKVIEW_IFRAME_FF: "outlookView_IFRAME_FF"
    , STYLE_NEWSPAPERVIEW_SELECTEDITEM: "newspaperView_SelectedRSSItem", SPC: "&nbsp;"
    , FROM_PAGEFLAKES: "Pageflakes", ui_rss_reader: null, ui_outlookView: null, ui_newspaperView: null
    , ui_outlook_FeedDetail: null, ui_resetOutlookDefaultSize: true, ui_feedViewerIframe: null
    , ui_forwardFeedOptions: null, ui_leftPane: null, ui_npv_selectedItemMarker: null, ui_drpLeftPaneSortOption: null
    , ui_drpRightPaneSortOption: null, ui_drpRightPaneChangeStatus: null, ui_toolbar_ShowOutlookView: null
    , ui_toolbar_ShowNewspaperView: null, ui_toolbar_ShowRSSView: null, ui_toolbar_ShowWebsiteView: null
    , ui_divForwardFeed: null, ui_divOutlookView_RSSItemList: null, ui_allChannelsWrapper: null
    , EMAIL_FORMAT_HTML: 1, ui_SendMail_To: null, ui_Your_Name: null, ui_SendMail_CC: null
    , ui_SendMail_Subject: null, ui_SendMail_PersonalMessage: null, ui_SendMail_btnSendMail: null
    , ui_divFeedList: null, LEFTPANE_SAVEDCHANNEL_ID: "divSavedChannels"
    , LEFTPANE_ALLFEEDSCHANNEL_ID: "divAllFeedsChannels", LEFTPANE_CHANNEL_ID_PREFIX: "lcnl"
    , MOUSEOVER_TITLE_BACKGROUNDCOLOR: "#D8E7F6", SELECTED_TITLE_BACKGROUNDCOLOR: "#D8E7F6"
    , NOTSELECTED_TITLE_BACKGROUNDCOLOR: "#FFFFFF", NOTSELECTEDALT_TITLE_BACKGROUNDCOLOR: "#F1F6FC"
    , newspaper_currentPageIndex: 0, ref_allNewspaperItems: null, rssNewspaperTopMarker: null
    , outlookRssItemListTopMarker: null, outlookRssItemDetailTopMarker: null, vSplit2_left: 270
    , vSplit2_left_iePadding: 10, vSplit2_width: 530, tdChannelList: null, tdRssItemList: null
    , document_event_moveHandle: null, document_event_moveHandle: null, ref_event: null
    , document_pos_x: 0, document_pos_y: 0, diff_y: 0, refreshChannelListWidth: false
    , refreshOutlookViewHeight: false, resizeTimer: null, rssItemMinHeight: 60, rssItemMaxHeight: 600
    , channelListMinWidth: 170, channelListMaxWidth: 700, resizerRefreshTime: 10, tdChannelDetail: null
    , divRightPaneViewers: null, OUTLOOKVIEW_PAGING: "navigationPane", markFirstItemSelected: false
    , initializeComponent: function () {
        FeedViewer._leftPaneChannelDivs = null;
        FeedViewer.ui_rss_reader = $(FeedViewer.RSS_READER_ID);
        FeedViewer.ui_outlookView = $("divOutlookView");
        FeedViewer.ui_newspaperView = $("divNewspaperView");
        FeedViewer.ui_outlook_FeedDetail = $("divOutlookView_RSSItemDetail");
        FeedViewer.ui_feedViewerIframe = $("feedViewerIframe");
        FeedViewer.ui_forwardFeedOptions = $("FeedViewer_ForwardedFeedInfo");
        FeedViewer.ui_leftPane = $(FeedViewer.DIV_FEEDLIST);
        FeedViewer.ui_drpLeftPaneSortOption = $("FeedViewer_drpLeftPaneSortOption");
        FeedViewer.ui_drpRightPaneChangeStatus = $("FeedViewer_drpRightPaneChangeStatus");
        FeedViewer.ui_drpRightPaneSortOption = $("FeedViewer_drpRightPaneSortOption");
        FeedViewer.ui_drpLeftPaneChangeStatus = $("FeedViewer_drpLeftPaneChangeStatus");
        FeedViewer.ui_toolbar_ShowOutlookView = $("FeedViewer_imgShowOutlookView");
        FeedViewer.ui_toolbar_ShowNewspaperView = $("FeedViewer_imgShowNewspaperView");
        FeedViewer.ui_toolbar_ShowRSSView = $("FeedViewer_imgShowRSSView");
        FeedViewer.ui_toolbar_ShowWebsiteView = $("FeedViewer_imgShowWebsiteView");
        FeedViewer.ui_divForwardFeed = $("divForwardFeed");
        FeedViewer.ui_divOutlookView_RSSItemList = $("divOutlookView_RSSItemList");
        FeedViewer.ui_SendMail_To = $("FeedViewer_To");
        FeedViewer.ui_Your_Name = $("FeedViewer_YourName"); FeedViewer.ui_SendMail_CC = $("FeedViewer_CC");
        FeedViewer.ui_SendMail_Subject = $("FeedViewer_Subject"); FeedViewer.ui_SendMail_PersonalMessage = $("FeedViewer_PersonalMessage");
        FeedViewer.ui_SendMail_btnSendMail = $("FeedViewer_btnSendeMail"); FeedViewer.tdChannelList = $("RssViewer_tdChannelList");
        FeedViewer.tdChannelDetail = $("tdChannelDetail"); FeedViewer.divRightPaneViewers = $("divRightPaneViewers");
        FeedViewer.hSpliter = $("feedReader_hSpliter");
        var A = $("icon" + FeedViewer.RSS_READER_ID);
        A.src = IMAGE_PREFIX + "images/rss.gif"
    }, resizeRssViewer: function () {
        FeedViewer.resizeRssViewer2()
    }, resizeRssViewer2: function () {
        var L = $("gray_panel");
        if (!$isVisible(L)) {
            L = $("pagecast_invite_panel");
            if (!$isVisible(L)) {
                L = $("pagecast_quick_invite_bar")
            } 
        }
        if (L != null) {
            var R = PU.getPosition(L);
            FeedViewer.VIEWER_TOP = R[1] + 5
        }
        var G = PU.getViewportHeight() - 80 - FeedViewer.VIEWER_TOP;
        var I = PU.getViewportWidth() - 15;
        var N = FeedViewer.LEFT_POS + "px";
        var M = FeedViewer.VIEWER_TOP + "px";
        var O = (G + 50) + "px";
        var F = I + 14; var V = 12; var B = 2;
        if (Browser.isIE) {
            B = -14
        } 
        if(Browser.isIE7) {
            G -= 10
        }
        var Q = G - V + B + "px";
        var H = G - V + B + "px"; var K = G - V + B;
        var E = G - V + B; var S = 290;
        var D = 270;
        FeedViewer.RSSItemDetailWidth = (F - D);
        var A = FeedViewer.RSSItemDetailWidth;
        var U = FeedViewer.RSSItemDetailWidth;
        if (FeedViewer.ui_rss_reader != null) {
            FeedViewer.ui_rss_reader.style.left = N;
            FeedViewer.ui_rss_reader.style.top = M;
            FeedViewer.ui_rss_reader.style.height = O;
            FeedViewer.ui_rss_reader.style.width = F + "px";
            FeedViewer.ui_outlookView.style.height = Q;
            FeedViewer.ui_newspaperView.style.height = H;
            FeedViewer.ui_leftPane.style.height = K + "px";
            FeedViewer.hSpliter.style.height = K + "px";
            if (FeedViewer.ui_resetOutlookDefaultSize) {
                FeedViewer.ui_resetOutlookDefaultSize = false;
                var J = (E) / 3;
                if (FeedViewer.ui_divOutlookView_RSSItemList != null) {
                    FeedViewer.ui_divOutlookView_RSSItemList.style.height = (J) + "px"
                }
                FeedViewer.ui_outlook_FeedDetail.style.height = (E - V - J) + "px";
                FeedViewer.ui_feedViewerIframe.style.height = (E - V - J) + "px"
            }
            if (E > S) {
                FeedViewer.ui_forwardFeedOptions.style.height = (E - S - 20) + "px"
            }
            else {
                FeedViewer.ui_forwardFeedOptions.style.height = "100px"
            }
            if (FeedViewer.vSpliter2 != null) {
                if (Browser.isIE) {
                    FeedViewer.vSpliter2.style.width = FeedViewer.RSSItemDetailWidth - FeedViewer.vSpliterRightPadding + FeedViewer.vSplit2_left_iePadding + "px"
                }
                else {
                    FeedViewer.vSpliter2.style.width = FeedViewer.RSSItemDetailWidth - FeedViewer.vSpliterRightPadding + "px"
                } 
            }
            var C = PU.getPosition(FeedViewer.ui_leftPane);
            if (FeedViewer.hSpliter2 == null) {
                FeedViewer.hSpliter2 = $("RSSReaderHSpliter2")
            }
            FeedViewer.readingAreaTop = C[1] - 1;
            FeedViewer.hSpliter2.style.top = (FeedViewer.readingAreaTop - FeedViewer.VIEWER_TOP) + "px";
            if (FeedViewer.ui_leftPane == null) {
                FeedViewer.ui_leftPane = $(FeedViewer.DIV_FEEDLIST)
            }
            var C = PU.getPosition(FeedViewer.ui_leftPane);
            setTimeout(FeedViewer.resetRightPaneContentLength, 100)
        }
    }, onkeyup: function (A) {
        if (FeedViewer.enableHotkeys) {
            if (A == null) {
                A = event
            }
            if (A.keyCode == "83" || A.keyCode == "115") {
                FeedViewer.nextArticle()
            }
            else {
                if (A.keyCode == "65" || A.keyCode == "97") {
                    FeedViewer.previousArticle()
                }
                else {
                    if (A.keyCode == "81" || A.keyCode == "113") {
                        FeedViewer.previousFeed()
                    }
                    else {
                        if (A.keyCode == "87" || A.keyCode == "119") { FeedViewer.nextFeed() }
                        else {
                            if (A.keyCode == "80" || A.keyCode == "112") { FeedViewer.previousPage() }
                            else { if (A.keyCode == "78" || A.keyCode == "110") { FeedViewer.nextPage() } } 
                        } 
                    } 
                } 
            } 
        }
    }, selectFeedList: function () {
        FeedViewer.SelectedList = FeedViewer.FEED_LIST
    }, selectChannelList: function () {
        FeedViewer.SelectedList = FeedViewer.CHANNEL_LIST
    }, previousPage: function () {
        if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.newspaperView_prevPage() }
        else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { FeedViewer.loadAllFeedsInOutlookView_prev() } }
    }, nextPage: function () {
        if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.newspaperView_nextPage() }
        else {
            if (FeedViewer._selectedChannelId > 0) { FeedViewer.loadNextFeeds() }
            else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { FeedViewer.loadAllFeedsInOutlookView_next() } } 
        }
    }, getChannelListDivs: function () {
        if (FeedViewer._leftPaneChannelDivs == null) {
            var C = FeedViewer.ui_leftPane.getElementsByTagName("div");
            FeedViewer._leftPaneChannelDivs = new Array();
            var B = 0;
            for (var A = 0; A < C.length; A++) {
                if (C[A].id != null && C[A].id.length > 0) { FeedViewer._leftPaneChannelDivs.add(C[A]) } 
            } 
        }
        return FeedViewer._leftPaneChannelDivs
    }, nextFeed: function () {
        var B = FeedViewer._lastSelectedLeftPaneItemDiv.getAttribute("next");
        if (B.length > 0) {
            var A = $(B); A.onclick(self); FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + B);
            if (Browser.isIE) { setTimeout(FeedViewer.focusCurrentChannel, 300) } 
        }
    }, previousFeed: function () {
        if (FeedViewer._lastSelectedRSSItemDiv != null) {
            var B = FeedViewer._lastSelectedLeftPaneItemDiv.getAttribute("prev");
            if (B.length > 0) {
                $(B).onclick(self);
                var A = $(B);
                A.onclick(self);
                FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + B);
                if (Browser.isIE) { setTimeout(FeedViewer.focusCurrentChannel, 300) } 
            } 
        }
    }, focusCurrentChannel: function () {
        FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + FeedViewer._selectedChannelId)
    }, delayedChannelClickEvent: function () {
        FeedViewer._lastSelectedLeftPaneItemDiv.onclick();
        debug.dump("clicked: " + T(FeedViewer._lastSelectedLeftPaneItemDiv))
    }, nextArticle: function (E, B) {
        if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) {
            var G = FeedViewer.ui_newspaperView.getElementsByTagName("input");
            for (var C = 2; C < G.length - 1; C += 2) {
                if (G[C - 1] == FeedViewer.ui_npv_selectedItemMarker || G[C] == FeedViewer.ui_npv_selectedItemMarker) {
                    var A = G[C + 2]; FeedViewer.clearNewspaperItemSelection(G[C]);
                    FeedViewer.selectNewspaperItem(A); FeedViewer.selectNewspaperItem(G[C + 1]);
                    FeedViewer._selectedRssItemID = A.id.substring(FeedViewer.PAGETOPMARKER_PREFIX.length + FeedViewer.WRAPPER_START_PREFIX.length, A.id.length);
                    break
                } 
            } 
        } else {
            if (FeedViewer._lastSelectedRSSItemDiv != null) {
                var H = FeedViewer._lastSelectedRSSItemDiv.getAttribute("next");
                if (H.length > 0) {
                    var D = $(FeedViewer.FEEDTITLEPREFIX + H);
                    D.onclick(B); var F = D.getAttribute("next");
                    if (F.length > 0) {
                        FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + F)
                    }
                    else { FeedViewer.gotoPageTop(FeedViewer.OUTLOOKVIEW_PAGING) } 
                } 
            } 
        }
    }, previousArticle: function (G, C) {
        if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) {
            var H = FeedViewer.ui_newspaperView.getElementsByTagName("input");
            for (var F = 3; F < H.length - 1; F += 2) {
                if (H[F] == FeedViewer.ui_npv_selectedItemMarker || H[F + 1] == FeedViewer.ui_npv_selectedItemMarker) {
                    FeedViewer.clearNewspaperItemSelection(H[F]);
                    FeedViewer.selectNewspaperItem(H[F - 2]);
                    var B = H[F - 2];
                    FeedViewer._selectedRssItemID = B.id.substring(FeedViewer.PAGETOPMARKER_PREFIX.length + FeedViewer.WRAPPER_START_PREFIX.length, B.id.length);
                    break
                } 
            } 
        }
        else {
            if (FeedViewer._lastSelectedRSSItemDiv != null) {
                var E = FeedViewer._lastSelectedRSSItemDiv.getAttribute("prev");
                if (E.length > 0) {
                    $(FeedViewer.FEEDTITLEPREFIX + E).onclick(C);
                    var A = $(FeedViewer.FEEDTITLEPREFIX + E); A.onclick(C);
                    var D = A.getAttribute("prev");
                    if (D.length > 0) { FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + D) } 
                } 
            } 
        }
    }, clearNewspaperItemSelection: function (A) {
        if (A.parentElement) { A.parentElement.className = "FeedViewer_RSSItem_Wrapper" }
    }, selectNewspaperItem: function (A) {
        if (A.parentElement) { A.parentElement.className = "newspaperView_SelectedRSSItem" } FeedViewer.ui_npv_selectedItemMarker = A; FeedViewer.gotoPageTop(A.id)
    }, resizeOutlookPane: function (C) {
        var E = FeedViewer.ui_divOutlookView_RSSItemList.style.height.substring(0, FeedViewer.ui_divOutlookView_RSSItemList.style.height.length - 2);
        var D = FeedViewer.ui_outlook_FeedDetail.style.height.substring(0, FeedViewer.ui_outlook_FeedDetail.style.height.length - 2);
        var B = parseInt(E) + parseInt(FeedViewer.diff_y);
        if (B < FeedViewer.rssItemMinHeight) { B = FeedViewer.rssItemMinHeight }
        else {
            if (B > FeedViewer.rssItemMaxHeight) { B = FeedViewer.rssItemMaxHeight } 
        }
        var A = parseInt(D) + parseInt(E) - parseInt(B);
        FeedViewer.ui_divOutlookView_RSSItemList.style.height = B + "px"; 
        if (A > 0) {
            if (Browser.isIE) {
                FeedViewer.ui_outlook_FeedDetail.style.height = A + "px";
                FeedViewer.ui_feedViewerIframe.style.height = A + "px"
            }
            else {
                FeedViewer.ui_outlook_FeedDetail.style.height = A + "px";
                FeedViewer.ui_feedViewerIframe.style.height = A + "px"
            } 
        }
    }, IMG_REFRESH_IDLE: IMAGE_PREFIX + "App_Themes/RssReader/refresh.gif"
    , IMG_REFRESH_INPROGRESS: IMAGE_PREFIX + "App_Themes/indicator2.gif"
    , refreshChannel: function () {
        var B = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (B != null) { $("imgFeedRefresh").src = FeedViewer.IMG_REFRESH_INPROGRESS; var A = FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + B.ID; var C = $(A); FeedViewer.updateChannel(B.FeedSource, FeedViewer.refreshChannel2, A) }
    }, refreshChannel2: function (B) {
        var A = $(B); if (A != null) { FeedViewer.leftPane_channel_onClick(A) } $("imgFeedRefresh").src = FeedViewer.IMG_REFRESH_IDLE
    }, loadRssReaderDiv2: function () {
        Start.hidePageSettings(); if (RC._cachedRssChannelList.length > 0) { var A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (A == null) { if (RC._cachedRssChannelList.length > 0) { FeedViewer._selectedChannelId = RC._cachedRssChannelList[0].ID; A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (A.Feeds.length > 0) { FeedViewer._selectedRssItemID = A.Feeds[0].ID } } } FeedViewer.loadChannel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID) } else { FeedViewer.loadChannel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, 0) } $trackEventNoTimeOut("Header Links Top", "Click", "Reader Open")
    }, hideRssCloseTooltip: function () {
        if (App.IsMySite) { App.saveProfile("rssReaderCloseTooltip", "true") } $hide("rssReaderCloseTooltip"); $trackEvent("Header Links Top", "Click", "Reader Close")
    }, showRssCloseTooltip: function () {
        var B = $("closeLinkRssViewer"); var A = $("rssReaderCloseTooltip"); var C = PU.getPosition(B); A.style.left = (C[0] - A.offsetWidth) + "px"; A.style.top = "-10px"; $visible(A); A.onclick = FeedViewer.hideRssCloseTooltip
    }, loadRssReaderDiv: function () { var I = document.body.offsetWidth; if (I > 1400) { FeedViewer.channelListMaxWidth = 900 } else { if (I > 1200) { FeedViewer.channelListMaxWidth = 700 } } if (I > 1000) { FeedViewer.channelListMaxWidth = 550 } else { FeedViewer.channelListMaxWidth = 400 } $ND("body"); FeedViewer.resizeRssViewer2(); FeedViewer.ui_rss_reader = $(FeedViewer.RSS_READER_ID); if (FeedViewer.ui_rss_reader == null) { var H = PU.getPosition($(FeedViewer.BODY_CONTAINER)); var D = App.createPopup(FeedViewer.RSS_READER_ID, "<b>" + Lang.RSS_READER + "</b>", FeedViewer.LEFT_POS, H[1] + FeedViewer.RIGHT_POS, FeedViewer.WIDTH, "auto"); FeedViewer.ui_rss_reader = $(FeedViewer.RSS_READER_ID); $ND(FeedViewer.ui_rss_reader); $("handleRssViewer").onmousedown = null; $("handleRssViewer").style.cursor = "auto"; var A = $("closeLinkRssViewer"); if (App.My.Profile.rssReaderCloseTooltip != "true") { MQ.add("RssReader.closeRssTooltip", 200, false, FeedViewer.showRssCloseTooltip) } A.onclick = function (J) { FeedViewer.hideRssCloseTooltip(); $ND(FeedViewer.ui_rss_reader); App.showAllControls(); setTimeout(RC.refreshSubscribedFlakes, 100); document.onkeyup = FeedViewer.previousonkeyupHandle; $D("body"); PU.unblockUI(); $("blockUI").onclick = null }; var B = $("RssFeedReaderMain"); $D(B); D.innerHTML = ""; PU.changeParent("RssFeedReaderMain", D); FeedViewer.initializeComponent(); if (Browser.isIE) { FeedViewer.ui_outlook_FeedDetail.className = FeedViewer.STYLE_OUTLOOKVIEW_RSSITEMDETAIL_IE; FeedViewer.ui_feedViewerIframe.className = FeedViewer.STYLE_OUTLOOKVIEW_IFRAME_IE } else { FeedViewer.ui_outlook_FeedDetail.className = FeedViewer.STYLE_OUTLOOKVIEW_RSSITEMDETAIL_FF; FeedViewer.ui_feedViewerIframe.className = FeedViewer.STYLE_OUTLOOKVIEW_IFRAME_FF } var G = $("RssViewer"); var E = G.getElementsByTagName("div"); for (var C = 0; C < E.length; C++) { if (E[C].className == "flake_placeholder") { E[C].className = "" } if (E[C].className == "flake_footer") { E[C].className = ""; break } } } if (document.onkeyup) { FeedViewer.previousonkeyupHandle = document.onkeyup } document.onkeyup = FeedViewer.onkeyup; App.hideAllControls(); RC.CacheBookmarkedFeeds = true; setTimeout("RC.startCachingFeeds()", 10); FeedViewer.vSpliter = $("RSSReaderVSpliter"); FeedViewer.vSpliter2 = $("RSSReaderVSpliter2"); FeedViewer.hSpliter = $("RSSReaderHSpliter"); FeedViewer.hSpliter2 = $("RSSReaderHSpliter2"); FeedViewer.vSpliter2.div = FeedViewer.vSpliter2; FeedViewer.vSpliter2.drag = Drag.init(FeedViewer.vSpliter2, FeedViewer.vSpliter2); FeedViewer.vSpliter2.onDrag = function (J, N, M, L) { var K = FeedViewer.hSpliter.offsetLeft + FeedViewer.hSpliter.offsetWidth; FeedViewer.vSpliter2.style.left = K + "px"; if (N < FeedViewer.rssItemMinHeight) { FeedViewer.vSpliter2.style.top = FeedViewer.rssItemMinHeight + "px" } else { if (N > FeedViewer.rssItemMaxHeight) { FeedViewer.vSpliter2.style.top = FeedViewer.rssItemMaxHeight + "px" } else { } } }; FeedViewer.vSpliter2.onDragStart = function (J, M, L, K) { FeedViewer.vSplitDragStart = true; FeedViewer.vSplitOldTop = FeedViewer.vSpliter2.style.top.substring(0, FeedViewer.vSpliter2.style.top.length - 2) }; FeedViewer.vSpliter2.onDragEnd = function (J, L) { var K = FeedViewer.vSpliter2.style.top.substring(0, FeedViewer.vSpliter2.style.top.length - 2); FeedViewer.diff_y = K - FeedViewer.vSplitOldTop; FeedViewer.vSplitOldTop = FeedViewer.vSpliter2.style.top.substring(0, FeedViewer.vSpliter2.style.top.length - 2); FeedViewer.vSplitDragStart = false; FeedViewer.resizeOutlookPane(null); FeedViewer.vSpliter2.style.display = "none" }; FeedViewer.hSpliter2.div = FeedViewer.hSpliter2; FeedViewer.hSpliter2.drag = Drag.init(FeedViewer.hSpliter2, FeedViewer.hSpliter2); FeedViewer.hSpliter2.onDrag = function (J, M, L, K) { FeedViewer.hSpliter2.style.top = (FeedViewer.readingAreaTop - FeedViewer.VIEWER_TOP) + "px"; if (J < FeedViewer.channelListMinWidth) { FeedViewer.hSpliter2.style.left = FeedViewer.channelListMinWidth + "px" } else { if (J > FeedViewer.channelListMaxWidth) { FeedViewer.hSpliter2.style.left = FeedViewer.channelListMaxWidth + "px" } else { } } }; FeedViewer.hSpliter2.onDragStart = function (J, M, L, K) { FeedViewer.hSplitDragStart = true }; FeedViewer.hSpliter2.onDragEnd = function (J, L) { $ND(FeedViewer.hSpliter2); var K = parseInt(FeedViewer.hSpliter2.style.left.substring(0, FeedViewer.hSpliter2.style.left.length - 2)) + FeedViewer.H_SPLITER_PADDING; FeedViewer.hSplitDragStart = false; FeedViewer.tdChannelList.style.width = (parseInt(K) + 6) + "px"; FeedViewer.ui_leftPane.style.width = K + "px"; FeedViewer.resetLeftPaneContentLength(); FeedViewer.resetRightPaneContentLength() }; FeedViewer.resizeRssViewer(); MQ.add("FeedViewer.resizeRssViewer", 200, false, FeedViewer.resizeRssViewer); var F = P.currentPage; if (F.IsPublished == true && F.IsOwner == false && F.IsShared == false) { FeedViewer.ui_drpLeftPaneChangeStatus.disabled = true; FeedViewer.ui_drpRightPaneChangeStatus.disabled = true } PU.blockUI(); $("blockUI").style.height = "400px"; FeedViewer.ui_rss_reader.style.zIndex = $("blockUI").style.zIndex + 1; var A = $("closeLinkRssViewer"); $("blockUI").onclick = A.onclick }, resetLeftPaneContentLength: function () { var A = FeedViewer.ui_leftPane.offsetWidth - 105; FeedViewer.MAX_CHANNELTITLE_WIDTH = Math.round(A / 7); FeedViewer.loadLeftPane() }, resetRightPaneContentLength: function () { if (FeedViewer._currentViewMode != FeedViewer.NEWSPAPER_VIEW) { var B = 300; try { if (FeedViewer._selectedChannelId > 0) { B = FeedViewer.ui_divOutlookView_RSSItemList.offsetWidth } else { B = FeedViewer.ui_divOutlookView_RSSItemList.offsetWidth - 240 } } catch (A) { } FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER = Math.round(B / 7); FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID) } }, vSpliterOnMouseOver: function (B, F) { FeedViewer.hideResizeBars(); var A = PU.getPosition(FeedViewer.hSpliter); var D = PU.getPosition(FeedViewer.vSpliter); var E = PU.getPosition(FeedViewer.ui_divOutlookView_RSSItemList); var C = FeedViewer.hSpliter.offsetLeft + FeedViewer.hSpliter.offsetWidth; FeedViewer.vSpliter2.style.left = C + "px"; FeedViewer.vSpliter2.style.top = (E[1] + E[3] - FeedViewer.V_SPLITER_PADDING - FeedViewer.VIEWER_TOP) + "px"; FeedViewer.vSpliter2.style.width = E[2] + "px"; $D(FeedViewer.vSpliter2) }, vSpliter2OnMouseOut: function () { if (FeedViewer.vSplitDragStart != true) { FeedViewer.vSpliter2.style.display = "none" } }, hSpliterOnMouseOver: function (B, C) { FeedViewer.hideResizeBars(); var A = PU.getPosition(FeedViewer.hSpliter); FeedViewer.hSpliter2.style.left = A[0] - FeedViewer.H_SPLITER_PADDING + "px"; FeedViewer.hSpliter2.style.height = FeedViewer.ui_leftPane.style.height; $D(FeedViewer.hSpliter2) }, hSpliter2OnMouseOut: function () { if (FeedViewer.hSplitDragStart != true) { FeedViewer.hSpliter2.style.display = "none" } }, hideResizeBars: function () { $ND(FeedViewer.hSpliter2); $ND(FeedViewer.vSpliter2) }, leftPane_channel_onClick: function (A) { if (FeedViewer._lastSelectedLeftPaneItemDiv != null) { var B = $(FeedViewer._lastSelectedLeftPaneItemDiv.id); if (B) { B.className = FeedViewer.STYLE_CH_NOTSELECTED } } FeedViewer._selectedChannelId = A.id.substring(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX.length, A.id.length); A.className = FeedViewer.STYLE_CH_SELECTED; FeedViewer.ui_allChannelsWrapper.className = FeedViewer.STYLE_ALLNOTSELECTED; if (FeedViewer._selectedChannelId > 0) { var C = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (C.Feeds.length > 0) { FeedViewer._selectedRssItemID = C.Feeds[0].ID; FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID); FeedViewer.setChannelHeaderText(A, FeedViewer._selectedChannelId, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true) } else { FeedViewer._selectedRssItemID = 0; FeedViewer.ui_outlook_FeedDetail.innerHTML = ""; FeedViewer.ui_divOutlookView_RSSItemList.innerHTML = '<div style="margin-left:2px;padding:5px;">' + Lang.DOWNLOADING + "</div>"; FeedViewer.updateChannel(C.FeedSource, null, null) } } FeedViewer._lastSelectedLeftPaneItemDiv = A; FeedViewer.refreshAllFeedUnreadCount(); FeedViewer.resetRightPaneContentLength() }, updateChannel: function (A, C, B) { RssServices.GetRSSChannel3(A, true, 0, FeedViewer.DEFAULT_PAGE_SIZE, function (D) { if (D != null) { RC.updateCachedRssChannel(D, true); if (FeedViewer._selectedChannelId == D.ID) { FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID); FeedViewer.setChannelHeaderText(self, D.ID, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true); var E = $(FeedViewer.FEEDTITLEPREFIX + FeedViewer._selectedRssItemID); if (E != null) { E.onclick(null, E) } FeedViewer.refreshAllFeedUnreadCount(); if (C != null) { C(B) } } } else { alert("Failed to download feed from '" + A + "'") } }) }, leftPane_channel_onMouseOut: function (A) { var B = A.id.substring(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX.length, A.id.length); if (FeedViewer._selectedChannelId != B) { A.className = FeedViewer.STYLE_CH_NOTSELECTED } else { A.className = FeedViewer.STYLE_CH_SELECTED } }, leftPane_allFeedsChannel_onClick: function (A) { FeedViewer._selectedChannelId = FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID; if (FeedViewer._lastSelectedLeftPaneItemDiv != null) { var B = $(FeedViewer._lastSelectedLeftPaneItemDiv.id); if (B != null) { B.className = FeedViewer.STYLE_CH_NOTSELECTED } } A.className = FeedViewer.STYLE_CH_SELECTED; FeedViewer.ui_allChannelsWrapper.className = FeedViewer.STYLE_ALLSELECTED; FeedViewer._selectedRssItemID = 0; FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID); FeedViewer._lastSelectedLeftPaneItemDiv = A; FeedViewer.refreshAllFeedUnreadCount(); FeedViewer.resetRightPaneContentLength() }, leftPane_allFeedsChannel_onMouseOut: function (A) { if (FeedViewer._selectedChannelId != FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { A.className = FeedViewer.STYLE_CH_NOTSELECTED } else { A.className = FeedViewer.STYLE_CH_SELECTED } }, leftPane_savedChannel_onClick: function (A) { FeedViewer._selectedChannelId = FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID; if (FeedViewer._lastSelectedLeftPaneItemDiv != null) { if (FeedViewer._lastSelectedLeftPaneItemDiv.id != null && FeedViewer._lastSelectedLeftPaneItemDiv.id.length > 0) { $(FeedViewer._lastSelectedLeftPaneItemDiv.id).className = FeedViewer.STYLE_CH_NOTSELECTED } } A.className = FeedViewer.STYLE_CH_SELECTED; FeedViewer.ui_allChannelsWrapper.className = FeedViewer.STYLE_ALLNOTSELECTED; if (RC._savedRSSItemChannel == null) { alert("Saved articles not yet loaded"); return } if (RC._savedRSSItemChannel.Feeds.length > 0) { var B = RC._savedRSSItemChannel.Feeds.slice(); FeedViewer.sortFeedList(B, false); FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, B[0].ID) } else { FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, 0) } FeedViewer._lastSelectedLeftPaneItemDiv = A; FeedViewer.refreshAllFeedUnreadCount(); FeedViewer.resetRightPaneContentLength() }, leftPane_savedChannel_onMouseOut: function (A) { if (FeedViewer._selectedChannelId != FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { A.className = FeedViewer.STYLE_CH_NOTSELECTED } else { A.className = FeedViewer.STYLE_CH_SELECTED } }, getChannelIconHTML: function (G, B, F) { var H = ""; var D = ' class="' + FeedViewer.CSS_CHANNEL_ICON + '"'; var C = ""; var E = ""; var A = ""; if (F != null && F != undefined) { H = ' id="btnDelete"' + F + '"' } if (G) { D = ' class="' + FeedViewer.CSS_CHANNEL_ICON_READ + '"' } else { D = ' class="' + FeedViewer.CSS_CHANNEL_ICON + '"' } if (B) { E = ' onmouseover="FeedViewer.showChannelDelete(this);"'; A = ' onmouseout="FeedViewer.hideChannelDelete(this, ' + G + ');"'; C = ' onclick="FeedViewer.deleteChannel(' + F + ', this, event);"' } html = "<div " + H + D + C + E + A + "></div>"; return html }, deleteChannel: function (E, I, G) { var H = RC.getCachedRssChannel(E); if (H != null) { if (confirm(Lang.SURE_REMOVE_ + H.Title + Lang._NO_UNDO)) { RssServices.Unsubscribe(H.FeedSource, function () { FeedViewer.removeRssFlake(H.FeedSource) }); var B = $(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + E); var C = null; if (FeedViewer._selectedChannelId == H.ID) { var F = B.getAttribute("prev"); if (F != null && F != FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID && F.length > 0) { C = $(F); if (C == null) { F = B.getAttribute("next"); if (F != null || F.length > 0) { C = $(F); if (C == null) { if (RC._cachedRssChannelList.length > 0) { var E = RC._cachedRssChannelList[0].ID; F = $(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + E) } } } } } var A = false; if (C != null) { C.onclick() } else { A = true } if (A) { var D = $(FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID); if (D != null) { setTimeout(D.onclick, 50) } } } } if (B) { B.parentNode.removeChild(B) } } $stopBubble(G) }, removeRssFlake: function (B) { var F = App.pages.length; var J = new Array(); var I = 0; for (var H = 0; H < F; H++) { var E = App.pages[H].modules.length; for (var G = 0; G < E; G++) { if (App.pages[H].modules[G].url.indexOf("__RSSFEED") > -1) { var C = App.pages[H].modules[G].id; var A = App.pages[H].modules[C]; if ((App.pages[H].modules[G].url.indexOf(B) > 0 || unescape(App.pages[H].modules[G].url).indexOf(B) > 0) && A.Profiles.custUrl == null) { RC.removeChannelFromCache(B); J[I++] = A } else { if (A.Profiles.custUrl != null && A.Profiles.custUrl.indexOf(B) > -1) { RC.removeChannelFromCache(B); J[I++] = A } } } } } var D = null; for (var H = 0; H < J.length; H++) { J[H].close(true) } }, showChannelDelete: function (A) { A.className = FeedViewer.CSS_CHANNEL_DELETE }, hideChannelDelete: function (A, B) { if (B) { A.className = FeedViewer.CSS_CHANNEL_ICON_READ } else { A.className = FeedViewer.CSS_CHANNEL_ICON } }, updateSavedRssChannelTitle: function () { var B = 0; var A = 0; var C = ""; var D = FeedViewer.getChannelIconHTML(false, false); B = FeedViewer.getUnreadCount(RC._savedRSSItemChannel); A = RC._savedRSSItemChannel.Feeds.length; if (A > 0 && B > 0) { C = "<b>" + FeedViewer.getFormatedChannelInfo(Lang.MY_SAVED_ARTICLES, B + "/" + A, true) + "</b>" } else { if (A > 0 && B == 0) { C = FeedViewer.getFormatedChannelInfo(Lang.MY_SAVED_ARTICLES, B + "/" + A, false) } else { C = Lang.MY_SAVED_ARTICLES } } return C }, loadLeftPane: function () { var A = ""; var J = new Sys.StringBuilder(""); if (RC._savedRSSItemChannel != null) { A = FeedViewer.updateSavedRssChannelTitle() } else { RC.cacheAllSavedRssItem(FeedViewer.updateSavedRssChannelTitle); A = Lang.MY_SAVED_ARTICLES } G = FeedViewer.getChannelIconHTML(true, false); J.append('<div id="' + FeedViewer.LEFTPANE_SAVEDCHANNEL_ID + '" onclick="FeedViewer.leftPane_savedChannel_onClick(this);"" prev="" " next="' + FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID + '" ' + (FeedViewer._selectedChannelId != -2 ? ' class="' + FeedViewer.STYLE_CH_NOTSELECTED + '"' : ' class="' + FeedViewer.STYLE_CH_SELECTED + '"') + ">" + G); J.append(A); J.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_SAVEDCHANNEL_ID)); J.append("</div>"); J.append('<div id="' + FeedViewer.ALL_CHANNELS_WRAPPER_ID + '"' + (FeedViewer._selectedChannelId != -1 ? ' class="' + FeedViewer.STYLE_ALLNOTSELECTED + '"' : ' class="' + FeedViewer.STYLE_ALLSELECTED + '"') + ">"); var C = FeedViewer.getAllUnreadCount(); var K = Lang.ALL_FEEDS; var G = FeedViewer.getChannelIconHTML(false, false); if (C > 0) { K = FeedViewer.getFormatedChannelInfo(Lang.ALL_FEEDS, C) } else { G = FeedViewer.getChannelIconHTML(true, false) } var M = ""; if (RC._cachedRssChannelList.length > 0) { M = FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + RC._cachedRssChannelList[0].ID } J.append('<div id="' + FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID + '" " onclick="FeedViewer.leftPane_allFeedsChannel_onClick(this);"" prev="' + FeedViewer.LEFTPANE_SAVEDCHANNEL_ID + '" " next="' + M + '" ' + (FeedViewer._selectedChannelId != -1 ? ' class="' + FeedViewer.STYLE_CH_NOTSELECTED + '"' : ' class="' + FeedViewer.STYLE_CH_SELECTED + '"') + ">" + G); if (C > 0) { J.append("<b>" + K + "</b>") } else { J.append(K) } J.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID)); J.append("</div>"); var H = RC._cachedRssChannelList.length; for (var D = 0; D < H; D++) { var I = RC._cachedRssChannelList[D]; var L = FeedViewer.getUnreadCount(I); var F = I.Title; var G = FeedViewer.getChannelIconHTML(false, true, I.ID); if (L > 0) { F = FeedViewer.getFormatedChannelInfo(I.Title, L, true) } else { F = FeedViewer.getFormatedChannelInfo(I.Title, "", false); G = FeedViewer.getChannelIconHTML(true, true, I.ID) } var E = ""; var B = ""; if (D > 0) { B = FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + RC._cachedRssChannelList[D - 1].ID } else { B = FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID } if (D < H - 1) { E = FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + RC._cachedRssChannelList[D + 1].ID } J.append('<div id="' + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + I.ID + '" onclick="FeedViewer.leftPane_channel_onClick(this);"" prev="' + B + '"" next="' + E + '"" style="padding-left:20px;"' + (FeedViewer._selectedChannelId != I.ID ? ' class="' + FeedViewer.STYLE_CH_NOTSELECTED + '"' : ' class="' + FeedViewer.STYLE_CH_SELECTED + '"') + ">" + G); J.append(F); J.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + I.ID)); J.append("</div>") } J.append("</div>"); FeedViewer.ui_leftPane.innerHTML = J.toString(); FeedViewer._savedRssItemsChannelDiv = $(FeedViewer.LEFTPANE_SAVEDCHANNEL_ID); FeedViewer._allFeedsRssItemsChannelDiv = $(FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID); FeedViewer.ui_allChannelsWrapper = $(FeedViewer.ALL_CHANNELS_WRAPPER_ID); if (FeedViewer._selectedChannelId > 0) { FeedViewer._lastSelectedLeftPaneItemDiv = $(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + FeedViewer._selectedChannelId) } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { FeedViewer._lastSelectedLeftPaneItemDiv = FeedViewer._savedRssItemsChannelDiv } else { FeedViewer._lastSelectedLeftPaneItemDiv = FeedViewer._allFeedsRssItemsChannelDiv } } }, sortCachedRssChannelList: function () { var A, C, B; for (A = 0; A < RC._cachedRssChannelList.length; A++) { for (C = 0; C < (RC._cachedRssChannelList.length - 1 - A); C++) { if (FeedViewer.ui_drpLeftPaneSortOption.value == "TitleDesc") { if (RC._cachedRssChannelList[C].Title.toLowerCase() < RC._cachedRssChannelList[C + 1].Title.toLowerCase()) { B = RC._cachedRssChannelList[C + 1]; RC._cachedRssChannelList[C + 1] = RC._cachedRssChannelList[C]; RC._cachedRssChannelList[C] = B } } else { if (FeedViewer.ui_drpLeftPaneSortOption.value == "CountDesc") { if (RC._cachedRssChannelList[C].UnreadCount < RC._cachedRssChannelList[C + 1].UnreadCount) { B = RC._cachedRssChannelList[C + 1]; RC._cachedRssChannelList[C + 1] = RC._cachedRssChannelList[C]; RC._cachedRssChannelList[C] = B } } else { if (RC._cachedRssChannelList[C].Title.toLowerCase() > RC._cachedRssChannelList[C + 1].Title.toLowerCase()) { B = RC._cachedRssChannelList[C + 1]; RC._cachedRssChannelList[C + 1] = RC._cachedRssChannelList[C]; RC._cachedRssChannelList[C] = B } } } } } FeedViewer.loadLeftPane() }, sortFeedList: function (B, A) { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { RC.sortFeedList2(B, A) } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { RC.sortFeedList2(B, A) } else { RC.sortFeedList(B, A) } } }, loadChannel: function (D, A) { scroll(0, 0); FeedViewer.loadRssReaderDiv(); if (RC._savedRSSItemChannel == null) { RC.cacheAllSavedRssItem() } FeedViewer._selectedChannelId = D; FeedViewer._selectedRssItemID = A; FeedViewer.loadLeftPane(); FeedViewer.loadRightPanel(D, A); var C = RC.getCachedRssChannel(D); if (C != null) { if (C.Feeds.length < FeedViewer.DEFAULT_PAGE_SIZE) { if (C.FeedSource != null) { FeedViewer.updateChannel(C.FeedSource, null, null) } } FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + C.ID); var B = $(FeedViewer.FEEDTITLEPREFIX + FeedViewer._selectedRssItemID); if (FeedViewer._currentViewMode != FeedViewer.NEWSPAPER_VIEW && A != 0) { var E = $(FeedViewer.FEEDTITLEPREFIX + A).getAttribute("next"); if (E.length > 0) { FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + E) } else { FeedViewer.gotoPageTop(FeedViewer.OUTLOOKVIEW_PAGING) } } } $D(FeedViewer.ui_rss_reader) }, loadRightPanel2: function () { FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID) }, loadRightPanel: function (C, A) { if (A > 0) { FeedViewer._selectedRssItemID = A } else { var B = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (B != null) { if (B.Feeds.length > 0) { FeedViewer._selectedRssItemID = B.Feeds[0].ID } } } FeedViewer._selectedChannelId = C; if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.loadAllFeedsInNewspaperView() } else { FeedViewer.loadAllFeedsInOutlookView(true) } } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.loadAllSavedFeedsInNewspaperView() } else { FeedViewer.loadAllSavedFeedsInOutlookView() } } else { var B = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (B == null) { return } else { if (B.Feeds.length > 0) { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.showNewspaperView() } else { FeedViewer.showOutlookView() } } else { FeedViewer.ui_divOutlookView_RSSItemList.innerHTML = "<div style='padding:5px;'>Loading...</div>"; FeedViewer.ui_outlook_FeedDetail.innerHTML = ""; RssServices.GetRSSChannel3(B.FeedSource, false, 0, FeedViewer.DEFAULT_PAGE_SIZE, function (D) { RC.updateCachedRssChannel(D, false); if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.showNewspaperView() } else { FeedViewer.showOutlookView() } }) } } } } }, loadAllFeedsInOutlookView: function (D) { FeedViewer.enableHotkeys = true; var L = new Object(); L.ID = FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID; L.Feeds = new Array(); if ((FeedViewer._allFeedItems == null) || D) { FeedViewer._allFeedCurrentIndex = 0; var I = L.Feeds.length; var B = RC._cachedRssChannelList.length; for (var F = 0; F < B; F++) { var J = RC._cachedRssChannelList[F]; for (var E = 0; E < J.Feeds.length; E++) { L.Feeds[I++] = J.Feeds[E] } } var K = $("FeedViewer_drpRightPaneSortOption"); FeedViewer._allFeedItems = L.Feeds.slice(); if (K.value == FeedViewer.SORT_ORDER_ASC) { FeedViewer.sortFeedList(FeedViewer._allFeedItems, true) } else { FeedViewer.sortFeedList(FeedViewer._allFeedItems, false) } } var H = FeedViewer._allFeedCurrentIndex + FeedViewer.OUTLOOK_VIEW_PAGESIZE; if (H > FeedViewer._allFeedItems.length) { H = FeedViewer._allFeedItems.length } L.Feeds = FeedViewer._allFeedItems.slice(FeedViewer._allFeedCurrentIndex, H); if (FeedViewer._selectedRssItemID == 0) { if (L.Feeds.length > 0) { FeedViewer._selectedRssItemID = L.Feeds[0].ID } } FeedViewer.renderOutlookView(L); var A = $$("div"); A.appendChild(FeedViewer.createMarker("Navigation")); A.className = "outlookView_Navigation"; if (FeedViewer._allFeedCurrentIndex > 0) { var C = $$("a"); C.innerHTML = Lang.PREVIOUS2 + FeedViewer.SPC + FeedViewer.SPC; C.onclick = function () { FeedViewer.loadAllFeedsInOutlookView_prev() }; A.appendChild(C) } if (FeedViewer._allFeedItems.length > FeedViewer._allFeedCurrentIndex + FeedViewer.OUTLOOK_VIEW_PAGESIZE) { var G = $$("a"); G.innerHTML = Lang.NEXT2; G.id = "lnkLoadNextFeeds"; G.onclick = function () { FeedViewer.loadAllFeedsInOutlookView_next() }; A.appendChild(G) } A.style.paddingLeft = "10px"; A.className = "outlookView_Navigation"; FeedViewer.ui_divOutlookView_RSSItemList.appendChild(A); FeedViewer.gotoPageTop(FeedViewer.outlookRssItemListTopMarker) }, loadAllFeedsInOutlookView_next: function () { if (FeedViewer._allFeedItems.length > FeedViewer._allFeedCurrentIndex + FeedViewer.OUTLOOK_VIEW_PAGESIZE) { FeedViewer._allFeedCurrentIndex += FeedViewer.OUTLOOK_VIEW_PAGESIZE; FeedViewer.loadAllFeedsInOutlookView(false) } }, loadAllFeedsInOutlookView_prev: function () { if (FeedViewer._allFeedCurrentIndex > 0) { FeedViewer._allFeedCurrentIndex -= FeedViewer.OUTLOOK_VIEW_PAGESIZE; FeedViewer.loadAllFeedsInOutlookView(false) } }, loadAllFeedsInNewspaperView: function () { FeedViewer.markFirstItemSelected = true; if (RC._cachedRssChannelList.length > 0) { var F = new Object(); F.Feeds = new Array(); var B = F.Feeds.length; var E = RC._cachedRssChannelList.length; for (var C = 0; C < E; C++) { var D = RC._cachedRssChannelList[C]; for (var A = 0; A < D.Feeds.length; A++) { F.Feeds[B++] = D.Feeds[A] } } FeedViewer.newspaper_currentPageIndex = 0; FeedViewer.renderNewspaperView(F) } }, loadAllSavedFeedsInOutlookView: function () { if (RC._savedRSSItemChannel == null) { RssServices.GetSavedRssItems(function (A) { FeedViewer.renderOutlookView(A); FeedViewer.refreshSavedRssItemChannelTitle() }) } else { FeedViewer.renderOutlookView(RC._savedRSSItemChannel); FeedViewer.refreshSavedRssItemChannelTitle() } }, loadAllSavedFeedsInNewspaperView: function () { if (RC._savedRSSItemChannel == null) { RssServices.GetSavedRssItems(function (A) { FeedViewer.newspaper_currentPageIndex = 0; FeedViewer.renderNewspaperView(A); FeedViewer.refreshSavedRssItemChannelTitle() }) } else { FeedViewer.newspaper_currentPageIndex = 0; FeedViewer.renderNewspaperView(RC._savedRSSItemChannel); FeedViewer.refreshSavedRssItemChannelTitle() } }, setToolbarSettings: function () { if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_RSS) { FeedViewer.ui_toolbar_ShowOutlookView.className = FeedViewer.OUTLOOK_ON; FeedViewer.ui_toolbar_ShowNewspaperView.className = FeedViewer.NEWSPAPER_OFF; FeedViewer.ui_toolbar_ShowRSSView.className = FeedViewer.RSS_ON; FeedViewer.ui_toolbar_ShowWebsiteView.className = FeedViewer.WEBSITE_OFF } else { if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_WEBSITE) { FeedViewer.ui_toolbar_ShowOutlookView.className = FeedViewer.OUTLOOK_ON; FeedViewer.ui_toolbar_ShowNewspaperView.className = FeedViewer.NEWSPAPER_OFF; FeedViewer.ui_toolbar_ShowRSSView.className = FeedViewer.RSS_OFF; FeedViewer.ui_toolbar_ShowWebsiteView.className = FeedViewer.WEBSITE_ON } else { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.ui_toolbar_ShowOutlookView.className = FeedViewer.OUTLOOK_OFF; FeedViewer.ui_toolbar_ShowNewspaperView.className = FeedViewer.NEWSPAPER_ON; FeedViewer.ui_toolbar_ShowRSSView.className = FeedViewer.RSS_ON; FeedViewer.ui_toolbar_ShowWebsiteView.className = FeedViewer.WEBSITE_DISABLED } } } }, showNewspaperView: function () { FeedViewer.enableHotkeys = true; FeedViewer.removeAllOptions(FeedViewer.ui_drpRightPaneChangeStatus); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK, ""); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK_ALL_ARTICLES_READ, "allread"); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK_ALL_ARTICLES_UNREAD, "allunread"); FeedViewer._currentViewMode = FeedViewer.NEWSPAPER_VIEW; if (FeedViewer._selectedChannelId > 0) { var A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); FeedViewer.newspaper_currentPageIndex = 0; if (FeedViewer._selectedRssItemID == 0) { if (A.Feeds.length > 0) { $FeedViewer._selectedRssItemID = A.Feeds[0].ID } } FeedViewer.renderNewspaperView(A) } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { FeedViewer.markFirstItemSelected = true; FeedViewer.loadAllFeedsInNewspaperView() } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { FeedViewer.markFirstItemSelected = true; FeedViewer.loadAllSavedFeedsInNewspaperView() } } } FeedViewer.setToolbarSettings(); $track("/RssReader/Newspaper") }, renderNewspaperView: function (I) { var C = ""; var H = ""; $ND(FeedViewer.ui_outlookView); $D("divNewspaperView"); $ND("divForwardFeed"); FeedViewer.ui_newspaperView.innerHTML = ""; var L = $$("div"); L.id = "allNewspaperItems"; FeedViewer.rssNewspaperTopMarker = FeedViewer.getPageTopMarker(); L.appendChild(FeedViewer.rssNewspaperTopMarker); var D = I.Feeds.slice(); if (FeedViewer.ui_drpRightPaneSortOption.value == FeedViewer.SORT_ORDER_ASC) { FeedViewer.sortFeedList(D, true) } else { FeedViewer.sortFeedList(D, false) } FeedViewer.ref_allNewspaperItems = D; var A = null; var B = null; if (D.length >= FeedViewer.NEWSPAPER_VIEW_PAGESIZE) { var F = FeedViewer.newspaper_currentPageIndex + FeedViewer.NEWSPAPER_VIEW_PAGESIZE; if (F > D.length) { F = D.length } for (var G = FeedViewer.newspaper_currentPageIndex; G < F; G++) { if (D[G].ID == FeedViewer._selectedRssItemID || FeedViewer.markFirstItemSelected) { var E = FeedViewer.getHtmlForRssItem(D[G], true); B = FeedViewer.getObjectMarker(E, true); A = FeedViewer.getObjectMarker(E, false); L.appendChild(E, false); FeedViewer.markFirstItemSelected = false; FeedViewer._selectedRssItemID = D[G].ID } else { L.appendChild(FeedViewer.getHtmlForRssItem(D[G], true)) } } H = '<a id="lnkNewspaperView_loadNextPage" href="javascript:void(0);" onclick="FeedViewer.newspaperView_nextPage();">' + Lang.NEXT2 + " " + FeedViewer.NEWSPAPER_VIEW_PAGESIZE + " > </a>"; if (FeedViewer.newspaper_currentPageIndex > 0) { C = '<a href="javascript:void(0);" onclick="FeedViewer.newspaperView_prevPage();"> < ' + Lang.PREVIOUS2 + " " + FeedViewer.NEWSPAPER_VIEW_PAGESIZE + "</a>" } } else { for (var G = 0; G < D.length; G++) { if (D[G].ID == FeedViewer._selectedRssItemID || FeedViewer.markFirstItemSelected) { var E = FeedViewer.getHtmlForRssItem(D[G], true); B = FeedViewer.getObjectMarker(E, true); A = FeedViewer.getObjectMarker(E, false); L.appendChild(E, false); FeedViewer.markFirstItemSelected = false; FeedViewer._selectedRssItemID = D[G].ID } else { L.appendChild(FeedViewer.getHtmlForRssItem(D[G], true)) } } } var K = $$("div"); K.innerHTML = '<table style="width:96%"><tr><td style="width:40%">&nbsp;' + C + '</td><td style="width:30%" align="center">&nbsp;</td><td align="right">&nbsp;' + H + "</td></tr></table>"; FeedViewer.ui_newspaperView.appendChild(L); FeedViewer.ui_newspaperView.appendChild(K); try { FeedViewer.selectNewspaperItem(B); FeedViewer.selectNewspaperItem(A) } catch (J) { FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker) } }, newspaperView_MarkAllRead: function () {
        FeedViewer.newspaperView_UpdateAllReadStatus(true)
    }, newspaperView_MarkAllUnRead: function () {
        FeedViewer.newspaperView_UpdateAllReadStatus(false) 
    }, newspaperView_UpdateAllReadStatus: function (I) {
        var E = $("newspaperView_UpdateAllReadStatus"); var B = FeedViewer.newspaper_currentPageIndex + FeedViewer.NEWSPAPER_VIEW_PAGESIZE; if (B > FeedViewer.ref_allNewspaperItems.length) { B = FeedViewer.ref_allNewspaperItems.length } var G = 0; var F = new Array(); if (FeedViewer._selectedChannelId == -1) { for (var D = FeedViewer.newspaper_currentPageIndex; D < B; D++) { FeedViewer.ref_allNewspaperItems[D].IsRead = I; F[G++] = FeedViewer.ref_allNewspaperItems[D]; var J = RC.getCachedRssChannel(FeedViewer.ref_allNewspaperItems[D].ChannelID); var H = J.Feeds.length; for (var C = 0; C < H; C++) { if (J.Feeds[C].ID == FeedViewer.ref_allNewspaperItems[D].ID) { J.Feeds[C].IsRead = I } } } FeedViewer.loadLeftPane(); RssServices.ChangeRSSItemReadStatus3(F) } else { if (FeedViewer._selectedChannelId == -2) { var K = new Array(); for (var D = FeedViewer.newspaper_currentPageIndex; D < B; D++) { K[G++] = FeedViewer.ref_allNewspaperItems[D].ID; for (var C = 0; C < RC._savedRSSItemChannel.Feeds.length; C++) { if (RC._savedRSSItemChannel.Feeds[C].ID == FeedViewer.ref_allNewspaperItems[D].ID) { RC.updateSavedRssItemList(RC._savedRSSItemChannel.Feeds[D].ID, I); break } } } FeedViewer.refreshSavedRssItemChannelTitle() } else { var K = new Array(); var J = RC.getCachedRssChannel(FeedViewer._selectedChannelId); var H = J.Feeds.length; for (var D = FeedViewer.newspaper_currentPageIndex; D < B; D++) { K[G++] = FeedViewer.ref_allNewspaperItems[D].ID; for (var C = 0; C < H; C++) { if (J.Feeds[C].ID == FeedViewer.ref_allNewspaperItems[D].ID) { J.Feeds[C].IsRead = I; break } } } RssServices.ChangeRSSItemReadStatus2(FeedViewer._selectedChannelId, K, I) } } FeedViewer.refreshChannelTitles(FeedViewer._selectedChannelId); var A = new Object(); A.Feeds = FeedViewer.ref_allNewspaperItems; FeedViewer.renderNewspaperView(A) 
    }, refreshChannelTitles: function (channelId) {
        FeedViewer.refreshAllFeedUnreadCount(); eval('channelDiv = $("lnk' + channelId + '");'); if (channelDiv != null) { FeedViewer.setChannelHeaderText(channelDiv, channelId, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true) } 
    }, newspaperView_prevPage: function () {
        FeedViewer.markFirstItemSelected = true; if (FeedViewer.newspaper_currentPageIndex > 0) { FeedViewer.newspaper_currentPageIndex = FeedViewer.newspaper_currentPageIndex - FeedViewer.NEWSPAPER_VIEW_PAGESIZE } var A = new Object(); A.Feeds = FeedViewer.ref_allNewspaperItems; FeedViewer.renderNewspaperView(A); FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker) 
    }, newspaperView_nextPage: function () {
        FeedViewer.markFirstItemSelected = true; if (FeedViewer.newspaper_currentPageIndex + FeedViewer.NEWSPAPER_VIEW_PAGESIZE < FeedViewer.ref_allNewspaperItems.length) { FeedViewer.newspaper_currentPageIndex = FeedViewer.newspaper_currentPageIndex + FeedViewer.NEWSPAPER_VIEW_PAGESIZE; var A = new Object(); A.Feeds = FeedViewer.ref_allNewspaperItems; FeedViewer.renderNewspaperView(A) } else { if (FeedViewer._selectedChannelId > 0) { var B = $("lnkNewspaperView_loadNextPage"); T(B, Lang.DOWNLOADING); B.disabled = true; var A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); RssServices.GetRSSChannel3(A.FeedSource, false, A.Feeds.length, FeedViewer.DEFAULT_PAGE_SIZE, function (C) { RC.updateCachedRssChannel(C, false); if (C.Feeds.length > 0) { var E = RC.getCachedRssChannel(FeedViewer._selectedChannelId); FeedViewer.refreshAllFeedUnreadCount(); var D = $(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + C.ID); if (D != null) { FeedViewer.setChannelHeaderText(D, C.ID, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true) } FeedViewer.newspaper_currentPageIndex = FeedViewer.newspaper_currentPageIndex + FeedViewer.NEWSPAPER_VIEW_PAGESIZE; T($("lnkNewspaperView_loadNextPage"), Lang.NEXT); FeedViewer.renderNewspaperView(A) } else { $ND("lnkNewspaperView_loadNextPage") } }) } else { $ND("lnkNewspaperView_loadNextPage") } } FeedViewer.gotoPageTop(FeedViewer.rssNewspaperTopMarker) 
    }, showRSSView: function () {
        if (FeedViewer._currentViewMode != FeedViewer.NEWSPAPER_VIEW) { FeedViewer._currentViewMode = FeedViewer.OUTLOOK_VIEW_RSS; FeedViewer.showOutlookView() } 
    }, loadSiteInWebSiteView: function (A) {
        $ND(FeedViewer.ui_outlook_FeedDetail); $D(FeedViewer.ui_feedViewerIframe); FeedViewer.ui_feedViewerIframe.src = "about:blank"; if (A != null || A.length > 0) { setTimeout("FeedViewer.ui_feedViewerIframe.src = '" + A + "'", 10) } 
    }, showWebsiteView: function () {
        if (FeedViewer._currentViewMode != FeedViewer.NEWSPAPER_VIEW) { FeedViewer._currentViewMode = FeedViewer.OUTLOOK_VIEW_WEBSITE; FeedViewer.showOutlookView(); var A = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, FeedViewer._selectedChannelId); $ND(FeedViewer.ui_outlook_FeedDetail); $D(FeedViewer.ui_feedViewerIframe); if (A != null) { FeedViewer.loadSiteInWebSiteView(A.Link) } } 
    }, showOutlookView: function () {
        FeedViewer.enableHotkeys = true; FeedViewer.removeAllOptions(FeedViewer.ui_drpRightPaneChangeStatus); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK, ""); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK_ALL_ARTICLES_READ, "allread"); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.MARK_ALL_ARTICLES_UNREAD, "allunread"); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.SELECTED_ARTICLES_READ, "read"); FeedViewer.addOption(FeedViewer.ui_drpRightPaneChangeStatus, Lang.SELECTED_ARTICLES_UNREAD, "unread"); if (FeedViewer._currentViewMode != FeedViewer.OUTLOOK_VIEW_WEBSITE) { FeedViewer._currentViewMode = FeedViewer.OUTLOOK_VIEW_RSS } if (FeedViewer._selectedChannelId > 0) { var A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); FeedViewer.renderOutlookView(A) } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_ALLFEEDS_ID) { FeedViewer.loadAllFeedsInOutlookView(true) } else { if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { FeedViewer.loadAllSavedFeedsInOutlookView() } } } FeedViewer.setToolbarSettings()
    }, stripHTML: function (A) {
        return A.replace(/<[^>]*>/g, "") 
    }, renderOutlookView: function (K) {
        FeedViewer.enableHotkeys = true; if (K.ID > 0 && K.Feeds.length == 0) { var B = String.format(Lang.NO_FEED_TO_VIEW, K.FeedSource) } var F = null; $D(FeedViewer.ui_outlookView, FeedViewer.ui_outlook_FeedDetail); $ND(FeedViewer.ui_newspaperView, FeedViewer.ui_divForwardFeed, FeedViewer.ui_feedViewerIframe); var L = new Sys.StringBuilder(""); var E = K.Feeds.slice(); if (FeedViewer.ui_drpRightPaneSortOption.value == FeedViewer.SORT_ORDER_ASC) { FeedViewer.sortFeedList(E, true) } else { FeedViewer.sortFeedList(E, false) } var N = null; var J = E.length; var A = 0; for (var G = 0; G < J; G++) { A++; var Q = (G % 2 == 0); var I = ""; var D = ""; if (G < J - 1) { I = E[G + 1].ID } if (G > 0) { D = E[G - 1].ID } var C = E[G].ChannelID; if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { C = FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID } L.append('<div id="' + FeedViewer.FEEDTITLEPREFIX + E[G].ID + '" channelId="' + C + '" rssItemId="' + E[G].ID + '" isOddRow="' + (Q ? "1" : "0") + '" next="' + I + '" prev="' + D + '" '); L.append('class = "' + FeedViewer.STYLE_NOTSELECTED + '" '); L.append('onclick="FeedViewer.outlookView_FeedTitleClicked(event,this); "'); if (!E[G].IsRead) { L.append('style="font-weight:bold" ') } else { L.append('style="font-weight:normal" ') } L.append(">"); L.append(FeedViewer.articleIcon); var M = FeedViewer.stripHTML(E[G].Title); if (M.length > FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER) { M = M.substring(0, FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER) + "..." } L.append('<div class="outlookView_FeedTitle">' + M + "</div>"); L.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + E[G].ID)); if (K.ID < 0) { if (K.ID == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { L.append("<div class='outlookView_FeedTitle_DeleteButton' onclick='FeedViewer.deleteSavedRssItem( " + E[G].ID + ", " + E[G].ChannelID + ");'/></div>"); var H = FeedViewer.stripHTML(E[G].ChannelTitle); if (H.length > 30) { H = H.substring(0, 30) + "..." } L.append('<div class="outlookView_FeedLink"><a href=\'' + E[G].ChannelLink + "' target='_blank' >" + H + "</a></div>") } else { if (N == null || E[G].ChannelID != N.ID) { N = RC.getCachedRssChannel(E[G].ChannelID) } var H = FeedViewer.stripHTML(N.Title); if (H.length > 30) { H = H.substring(0, 30) + "..." } L.append('<div class="outlookView_FeedLink"><a href=\'' + N.Link + "' target='_blank' >" + H + "</a></div>") } } L.append("</div>") } if (FeedViewer._selectedChannelId > 0) { L.append('<div class="' + FeedViewer.STYLE_NOTSELECTED + '" style="padding-left:10px;">'); var O = RC.getCachedRssChannel(FeedViewer._selectedChannelId); if (O.Feeds.length >= FeedViewer.OUTLOOK_VIEW_PAGESIZE) { L.append('<a id="lnkLoadNextFeeds" href="javascript:void(0);" onclick="FeedViewer.loadNextFeeds();">' + Lang.LOAD_NEXT + " " + FeedViewer.OUTLOOK_VIEW_PAGESIZE + " " + Lang.ARTICLES + "</a>") } L.append(FeedViewer.getPageTopMarkerHTML2(FeedViewer.OUTLOOKVIEW_PAGING)); L.append("</div>") } FeedViewer.ui_divOutlookView_RSSItemList.innerHTML = L.toString(); if (E.length > 0) { if (FeedViewer._selectedRssItemID == 0) { FeedViewer._selectedRssItemID = E[0].ID } var R = null; if (FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID == FeedViewer._selectedChannelId) { R = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) } else { R = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, E[0].ChannelID) } FeedViewer._lastSelectedRSSItemDiv = $(FeedViewer.FEEDTITLEPREFIX + FeedViewer._selectedRssItemID); if (FeedViewer._lastSelectedRSSItemDiv != null) { FeedViewer._lastSelectedRSSItemDiv.style.backgroundColor = FeedViewer.SELECTED_TITLE_BACKGROUNDCOLOR } if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_RSS) { $D(FeedViewer.ui_outlook_FeedDetail); $ND(FeedViewer.ui_feedViewerIframe); FeedViewer.ui_outlook_FeedDetail.innerHTML = ""; if (R != null) { FeedViewer.ui_outlook_FeedDetail.appendChild(FeedViewer.getHtmlForRssItem(R, true)) } else { FeedViewer.ui_outlook_FeedDetail.appendChild(FeedViewer.getHtmlForRssItem(E[0], true)) } } else { $ND(FeedViewer.ui_outlook_FeedDetail); $D(FeedViewer.ui_feedViewerIframe); FeedViewer.loadSiteInWebSiteView(R.Link) } if (Browser.isIE) { setTimeout("FeedViewer.focusArticle()", 300) } else { FeedViewer.focusArticle() } } else { if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_RSS) { $D(FeedViewer.ui_outlook_FeedDetail); $ND(FeedViewer.ui_feedViewerIframe); if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { FeedViewer.ui_divOutlookView_RSSItemList.innerHTML = "<div style='padding:5px'>" + Lang.YOU_DID_NOT_SAVE_ANY_ARTICLES_YET + "</div>" } else { FeedViewer.ui_divOutlookView_RSSItemList.innerHTML = "<div style='padding:5px'>No articles found.</div>" } FeedViewer.ui_outlook_FeedDetail.innerHTML = "" } else { FeedViewer.loadSiteInWebSiteView("about:blank") } } 
    }, focusArticle: function () {
        FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + FeedViewer._selectedRssItemID) 
    }, outlookView_FeedTitleClicked: function (event, self) {
        if (FeedViewer._lastSelectedRSSItemDiv != null) { FeedViewer._lastSelectedRSSItemDiv.style.backgroundColor = FeedViewer.NOTSELECTED_TITLE_BACKGROUNDCOLOR } self.className = FeedViewer.STYLE_SELECTED; self.style.fontWeight = "normal"; self.style.backgroundColor = FeedViewer.SELECTED_TITLE_BACKGROUNDCOLOR; var currentRssItemChannelId = self.getAttribute("channelId"); var _rssItemId = self.getAttribute("rssItemId"); FeedViewer._selectedRssItemID = _rssItemId; var rssItem = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, currentRssItemChannelId); if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_RSS) { FeedViewer.ui_feedViewerIframe.src = "about:blank"; var itemDiv = FeedViewer.getHtmlForRssItem(rssItem, true); $D(FeedViewer.ui_outlook_FeedDetail); FeedViewer.ui_outlook_FeedDetail.innerHTML = ""; if (itemDiv != null) { FeedViewer.ui_outlook_FeedDetail.appendChild(itemDiv) } } else { if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_WEBSITE) { FeedViewer.loadSiteInWebSiteView(rssItem.Link) } } if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { RC.changeReadStatus(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, _rssItemId, true) } else { RC.changeReadStatus(currentRssItemChannelId, _rssItemId, true) } var channelDiv = null; eval('channelDiv = $("' + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + currentRssItemChannelId + '");'); if (channelDiv != null) { FeedViewer.setChannelHeaderText(channelDiv, currentRssItemChannelId, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true) } FeedViewer.refreshAllFeedUnreadCount(); FeedViewer.refreshSavedRssItemChannelTitle(); FeedViewer._lastSelectedRSSItemDiv = self; FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.WRAPPER_START_PREFIX + _rssItemId) 
    }, loadNextFeeds: function () {
        if ($("lnkLoadNextFeeds") != null) { T($("lnkLoadNextFeeds"), Lang.LOADING); $("lnkLoadNextFeeds").disabled = true } var A = RC.getCachedRssChannel(FeedViewer._selectedChannelId); RssServices.GetRSSChannel3(A.FeedSource, false, A.Feeds.length, FeedViewer.DEFAULT_PAGE_SIZE, function (C) { RC.updateCachedRssChannel(C, false); if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.showNewspaperView() } else { FeedViewer.showOutlookView() } FeedViewer.refreshAllFeedUnreadCount(); FeedViewer.setChannelHeaderText(FeedViewer._lastSelectedLeftPaneItemDiv, FeedViewer._selectedChannelId, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true); if (C != null && C.Feeds != null && C.Feeds.length == 0) { var B = $("lnkLoadNextFeeds"); if (B != null) { $ND(B) } } }) 
    }, getRssItemByID: function (A, D) {
        if (D > 0) { if (A > 0) { var C = RC.getCachedRssChannel(D); if (C != null) { if (C.Feeds != null) { for (var B = 0; B < C.Feeds.length; B++) { if (C.Feeds[B].ID == A) { return C.Feeds[B] } } } } } } else { if (D == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { var C = RC._savedRSSItemChannel; if (C != null) { if (C.Feeds != null) { for (var B = 0; B < C.Feeds.length; B++) { if (C.Feeds[B].ID == A) { return C.Feeds[B] } } } } } } return null 
    }, deleteSavedRssItem: function (A, B) {
        var E = confirm(Lang.DELETE_ARTICLE_CONFIRM); if (E == true) { var D = FeedViewer.getRssItemByID(A, B); RC.removeFromSavedRssItemList(A); FeedViewer.refreshSavedRssItemChannelTitle(); if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { var C = $("allNewspaperItems"); var F = $(FeedViewer.WRAPPER_END_PREFIX + A); C.removeChild(F) } else { if (RC._savedRSSItemChannel.Feeds.length > 0) { FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, RC._savedRSSItemChannel.Feeds[0].ID) } else { FeedViewer.loadRightPanel(FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID, 0) } } } 
    }, refreshSavedRssItemChannelTitle: function () {
        var A = FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_SAVEDCHANNEL_ID); if (RC._savedRSSItemChannel != null) { if (RC._savedRSSItemChannel.Feeds.length > 0) { RC._savedRSSItemChannel.UnreadCount = FeedViewer.getUnreadCount(RC._savedRSSItemChannel); if (RC._savedRSSItemChannel.UnreadCount > 0) { FeedViewer._savedRssItemsChannelDiv.innerHTML = FeedViewer.getChannelIconHTML(false, false) + FeedViewer.getFormatedChannelInfo(RC._savedRSSItemChannel.Title, RC._savedRSSItemChannel.UnreadCount + "/" + RC._savedRSSItemChannel.Feeds.length) + A } else { FeedViewer._savedRssItemsChannelDiv.innerHTML = FeedViewer.getChannelIconHTML(true, false) + FeedViewer.getFormatedChannelInfo(RC._savedRSSItemChannel.Title, "0/" + RC._savedRSSItemChannel.Feeds.length, false) + A } } else { FeedViewer._savedRssItemsChannelDiv.innerHTML = FeedViewer.getChannelIconHTML(true, false) + RC._savedRSSItemChannel.Title + A } } 
    }, showForwardOption: function (D, B) {
        FeedViewer.enableHotkeys = false; $D(FeedViewer.ui_divForwardFeed); $ND(FeedViewer.ui_outlookView); $ND(FeedViewer.ui_newspaperView); var A = FeedViewer.getRssItemByID(D, B); var C = FeedViewer.getHtmlForRssItem(A, true); $("FeedViewer_Subject").value = "FW: " + A.Title; FeedViewer.ui_forwardFeedOptions.innerHTML = ""; FeedViewer.ui_forwardFeedOptions.appendChild(C) 
    }, sendEmail: function () {
        if (FeedViewer.ui_SendMail_To.value.length < 5) { alert(Lang.ENTER_VALID_ADDRESS); return } else { var B = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, FeedViewer._tmpChannelID); var A = RC.getCachedRssChannel(B.ChannelID); if (A != null && A.FeedSource.length > 0) { FeedViewer.prepareEmailContentAndSend(B, A.FeedSource) } else { RssServices.GetSourceURLByRSSChannelID(FeedViewer._selectedRssItemID, function (C) { if (C != null) { var D = FeedViewer.getRssItemByID(FeedViewer._selectedRssItemID, FeedViewer._tmpChannelID); FeedViewer.prepareEmailContentAndSend(D, C) } else { alert("Failed to send mail") } }) } } 
    }, prepareEmailContentAndSend: function (E, A) {
        var D = E.Title; if (D.length == FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER) { D.substring(0, FeedViewer.MAX_FEED_TITLE_LENGTH_IN_ARTICLE_VIEWER) + "..." } var B = FeedViewer.stripHTML(E.Description); if (B.length == 0) { B = FeedViewer.stripHTML(E.EncodedContent) } if (B.length > FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER) { B = B.substring(0, FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_ARTICLE_VIEWER) + "..." } var C = "selectedFeedLink=" + escape(E.Link) + "&feedTitle=" + escape(D) + "&detail=" + escape(B) + "&rssUrl=" + escape(A); FeedViewer.sendMail2(E, E.Link) 
    }, sendMail2: function (A, C) {
        var H = FeedViewer.ui_Your_Name.value; if (H.length == 0) { H = FeedViewer.FROM_PAGEFLAKES } var I = FeedViewer.ui_SendMail_To.value; var B = FeedViewer.ui_SendMail_CC.value; var F = FeedViewer.ui_SendMail_Subject.value; var E = FeedViewer.ui_SendMail_PersonalMessage.value; var G = A.Description; if (G.length == 0) { G = A.EncodedContent } G = G.replace(/<[^>]*>/g, ""); if (G.length > FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL) { G = G.substring(0, FeedViewer.MAX_FEED_DESCRIPTION_LENGTH_IN_EMAIL) + "..." } var D = Lang.SOMEONE; if (FeedViewer.ui_Your_Name.value.length > 0) { D = FeedViewer.ui_Your_Name.value } FeedViewer.ui_SendMail_btnSendMail.disabled = true; FeedViewer.ui_SendMail_btnSendMail.value = Lang.SENDING; App.Server.SendEmail2(H + "<info@P.com>", I, B, F, "RssFeedForwardEmailTemplate", FeedViewer.EMAIL_FORMAT_HTML, new Array(new Array("URL", C), new Array("SENDER", D), new Array("FEED_TITLE", A.Title), new Array("FEED_DETAIL", G), new Array("PERSONAL_MESSAGE", E)), function () { alert(Lang.EMAIL_SUCCESS); FeedViewer.ui_SendMail_btnSendMail.disabled = false; FeedViewer.ui_SendMail_btnSendMail.value = Lang.SEND; FeedViewer.cancelForward() }, function () { alert(Lang.EMAIL_FAILED); FeedViewer.ui_SendMail_btnSendMail.disabled = false; FeedViewer.ui_SendMail_btnSendMail.value = Lang.SEND }, function (J) { alert(Lang.EMAIL_FAILED); PU.dumpException(J); FeedViewer.ui_SendMail_btnSendMail.disabled = false; FeedViewer.ui_SendMail_btnSendMail.value = Lang.SEND }) 
    }, cancelForward: function () {
        $ND(FeedViewer.ui_divForwardFeed); if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.showNewspaperView() } else { if (FeedViewer._currentViewMode == FeedViewer.OUTLOOK_VIEW_RSS) { FeedViewer.showRSSView() } else { FeedViewer.showWebsiteView() } } FeedViewer.enableHotkeys = true 
    }, rightPaneChangeStatus: function () {
        if (FeedViewer.ui_drpRightPaneChangeStatus.value == FeedViewer.MARK_ALL_READ) { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.newspaperView_MarkAllRead() } else { RC.changeChannelReadStatus(FeedViewer._selectedChannelId, true) } } else { if (FeedViewer.ui_drpRightPaneChangeStatus.value == FeedViewer.MARK_ALL_UNREAD) { if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { FeedViewer.newspaperView_MarkAllUnRead() } else { RC.changeChannelReadStatus(FeedViewer._selectedChannelId, false) } } else { if (FeedViewer.ui_drpRightPaneChangeStatus.value == FeedViewer.MARK_READ) { RC.changeReadStatus(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID, true) } else { if (FeedViewer.ui_drpRightPaneChangeStatus.value == FeedViewer.MARK_UNREAD) { RC.changeReadStatus(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID, false) } } } } if (FeedViewer.ui_drpRightPaneChangeStatus.value.length > 0) { FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID); FeedViewer.loadLeftPane(); FeedViewer.ui_drpRightPaneChangeStatus.value = "" } 
    }, leftPaneChangeStatus: function () {
        var A = $("FeedViewer_drpLeftPaneChangeStatus"); if (A.value == FeedViewer.MARK_ALL_CHANNEL_READ) { RC.changeAllChannelReadStatus(true) } else { if (A.value == FeedViewer.MARK_ALL_CHANNEL_UNREAD) { RC.changeAllChannelReadStatus(false) } } if (A.value.length > 0) { FeedViewer.loadRightPanel(FeedViewer._selectedChannelId, FeedViewer._selectedRssItemID); FeedViewer.loadLeftPane(); A.value = "" } 
    }, refreshAllFeedUnreadCount: function () {
        var B = 0; for (var C = 0; C < RC._cachedRssChannelList.length; C++) { var D = RC._cachedRssChannelList[C]; if (D.UnreadCount) { B += D.UnreadCount } } if (FeedViewer._allFeedsRssItemsChannelDiv != null) { var A = FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_ALLFEEDSCHANNEL_ID); if (B > 0) { FeedViewer._allFeedsRssItemsChannelDiv.innerHTML = FeedViewer.getChannelIconHTML(false, false) + FeedViewer.getFormatedChannelInfo(Lang.ALL_FEEDS, B) + A } else { FeedViewer._allFeedsRssItemsChannelDiv.innerHTML = FeedViewer.getChannelIconHTML(true, false) + Lang.ALL_FEEDS + A } } 
    }, getFormatedPublishDate: function (B) {
        var A = ""; if (B.getHours() < 11) { A = B.getHours() + " AM" } else { if (B.getHours() > 12) { A = (B.getHours() - 12) + " PM" } else { A = B.getHours() + " PM" } } return MonthNames[B.getMonth()] + " " + B.getDate() + ", " + B.getFullYear()
    }, setChannelHeaderText: function (I, C, A, J, H, F) {
        var G = (C > 0); if (F) { FeedViewer.gotoPageTop(FeedViewer.PAGETOPMARKER_PREFIX + C) } var K = null; if (typeof I == "object") { K = I } else { K = $(I) } if (K == null) { return } var B = RC.getCachedRssChannel(C); if (B == null) { return } B.UnreadCount = 0; for (var E = 0; E < B.Feeds.length; E++) { if (!B.Feeds[E].IsRead) { B.UnreadCount++ } } var D = FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + B.ID); if (B.UnreadCount > 0) { K.innerHTML = '<div style="font-weight:bold;">' + FeedViewer.getChannelIconHTML(false, G, B.ID) + FeedViewer.getFormatedChannelInfo(B.Title, B.UnreadCount, true) + D + "</div>" } else { K.innerHTML = '<div style="float: left;">' + FeedViewer.getChannelIconHTML(true, G, B.ID) + FeedViewer.getFormatedChannelInfo(B.Title, "", false) + D + "</div>" } 
    }, getFormatedChannelInfo: function (F, D, C) {
        if (F.length > FeedViewer.MAX_CHANNELTITLE_WIDTH) { F = F.substring(0, FeedViewer.MAX_CHANNELTITLE_WIDTH) + "..." } var B = "feedReader_rss_number"; if ((D + "").length > 2) { B = "feedReader_rss_number2" } var A = "normal"; if (C == true || C == null) { A = "bold" } var E = ""; if ((D + "").length > 0) { E = '<div class="' + B + '">' + D + "</div>" } return '<div style="float: left;font-weight:' + A + ';">' + F + "</div>" + E
    }, setMarker: function (B) {
        var A = FeedViewer.getPageTopMarker(); A.id = FeedViewer.PAGETOPMARKER_PREFIX + B.id; B.appendChild(A) 
    }, createMarker: function (B) {
        var A = FeedViewer.getPageTopMarker(); A.id = B; return A 
    }, getPageTopMarkerHTML: function (A) {
        return FeedViewer.getPageTopMarkerHTML2(FeedViewer.PAGETOPMARKER_PREFIX + A.id) 
    }, getPageTopMarkerHTML2: function (A) {
        return '<input type="text" autocomplete="off" style="width:0px; float:left; display:none;" id="' + A + '" />' 
    }, getPageTopMarker: function () {
        var A = $$("input"); A.type = "text"; A.setAttribute("autocomplete", "off"); A.setAttribute("customType", "marker"); A.style.width = "0px"; $ND(A); return A 
    }, getObjectMarker: function (A, C) {
        var D = A.getElementsByTagName("input"); for (var B = 0; B < D.length; B++) { if (D[B].getAttribute("customType") == "marker") { if (C) { return D[B + 1] } else { return D[B] } } } return null 
    }, gotoPageTop: function (A) {
        if (!(typeof A == "object")) { A = $(A) } try { if (A) { $D(A); A.focus(); $ND(A) } } catch (B) { } 
    }, getHtmlForRssItem: function (I, L) {
        if (I == null) { return $$("div") } FeedViewer._tmpChannelID = I.ChannelID; var G = $$("div"); G.className = FeedViewer.STYLE_RSSITEM_WRAPPER; var W = $$("a"); W.className = FeedViewer.FEEDVIEWER_RSSITEM_TITLE; W.innerHTML = I.Title; W.href = I.Link; W.target = "_blank"; var Q = $$("div"); if (I.Description.length > 0) { Q.innerHTML = I.Description } else { Q.innerHTML = I.EncodedContent } if (I.IsRead) { Q.className = FeedViewer.FEEDVIEWER_RSSITEM_DESCRIPTION_READ } else { Q.className = FeedViewer.FEEDVIEWER_RSSITEM_DESCRIPTION } try { if (L) { if (I.EncodedContent != null) { if (I.EncodedContent.length > 0) { Q.innerHTML = I.EncodedContent } } } } catch (U) { PU.dumpException(U.message) } var D = $$("div"); var K = $$("a"); var A = $$("a"); var R = $$("span"); var O = $$("span"); var N = $$("span"); var M = $$("span"); R.innerHTML = FeedViewer.SPACE; O.innerHTML = FeedViewer.SPACE; N.innerHTML = FeedViewer.SPACE; M.innerHTML = FeedViewer.SPACE; D.className = FeedViewer.STYLE_FEEDVIEWER_OPTIONS; T(K, Lang.GOTO_SOURCE); K.href = I.Link; K.target = FeedViewer.NEW_WINDOW_TARGET; D.appendChild(K); D.appendChild(R); T(A, Lang.FORWARD_ARTICLE); A.href = "javascript:void(0);"; var H = document.createAttribute("rssItemID"); H.value = I.ID; A.setAttributeNode(H); var C = document.createAttribute("channelID"); C.value = I.ChannelID; A.setAttributeNode(C); A.onclick = function (X) { var Z = this.getAttribute("rssItemID"); var Y = this.getAttribute("channelID"); FeedViewer.showForwardOption(Z, Y) }; D.appendChild(A); if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { D.appendChild(O); var F = $$("a"); T(F, Lang.DELETE_ARTICLE); F.href = "javascript:void(0);"; var S = document.createAttribute("channelID"); S.value = I.ChannelID; F.setAttributeNode(S); var H = document.createAttribute("rssItemID"); H.value = I.ID; F.setAttributeNode(H); F.onclick = function (Z) { var Y = this.getAttribute("channelID"); var X = this.getAttribute("rssItemID"); FeedViewer.deleteSavedRssItem(X, Y) }; D.appendChild(F) } else { D.appendChild(O); var J = $$("a"); T(J, Lang.SAVE_ARTICLE); J.href = "javascript:void(0);"; var S = document.createAttribute("channelID"); S.value = I.ChannelID; J.setAttributeNode(S); var H = document.createAttribute("rssItemID"); H.value = I.ID; J.setAttributeNode(H); $addEvent(J, "click", Func("FeedViewer.saveArticle_click( this," + I.ChannelID + ", " + I.ID + ")")); D.appendChild(J) } G.id = FeedViewer.WRAPPER_START_PREFIX + I.ID; FeedViewer.setMarker(G); if (FeedViewer._currentViewMode == FeedViewer.NEWSPAPER_VIEW) { var E = P.currentPage; if (E.IsPublished == true && E.IsOwner == false) { } else { D.appendChild(N); D.appendChild(FeedViewer.getHtmlForChangeReadStatus(I)) } var B = $$("div"); if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { T(B, I.ChannelTitle + ", " + FeedViewer.getFormatedPublishDate(I.PublishDate)) } else { var V = RC.getCachedRssChannel(I.ChannelID); if (V) { T(B, V.Title + ", " + FeedViewer.getFormatedPublishDate(I.PublishDate)) } } B.className = FeedViewer.FEEDVIEWER_RSSITEM_PUBLISHEDDATE_READ; G.appendChild(B) } G.appendChild(W); G.appendChild(Q); G.appendChild(D); G.id = FeedViewer.WRAPPER_END_PREFIX + I.ID; FeedViewer.setMarker(G); return G 
    }, saveArticle_click: function (B, D, F) {
        var C = FeedViewer.getRssItemByID(F, D); this.disabled = true; T(B, "Saved"); var A = RC.getCachedRssChannel(D); var E = new $cloneObject(C); E.ChannelID = FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID; E.ChannelTitle = A.Title; E.ChannelLink = A.Link; E.ChannelSource = A.FeedSource; RC.addToSavedRssItemList(E); FeedViewer.refreshSavedRssItemChannelTitle() 
    }, removeAllOptions: function (A) {
        try { var C; for (C = A.options.length - 1; C >= 0; C--) { A.remove(C) } } catch (B) { } 
    }, addOption: function (B, D, C) {
        var A = document.createElement("OPTION"); A.innerHTML = D; A.value = C; B.appendChild(A) 
    }, getHtmlForChangeReadStatus: function (B) {
        var C = $$("a"); var A = document.createAttribute("rssItemID"); A.value = B.ID; C.setAttributeNode(A); var D = document.createAttribute("channelID"); D.value = B.ChannelID; C.setAttributeNode(D); C.href = "javascript:void(0);"; if (B.IsRead) { T(C, Lang.MARK_AS_UNREAD) } else { T(C, Lang.MARK_AS_READ) } C.onclick = function (H) { var E = this.getAttribute("rssItemID"); var G = this.getAttribute("channelID"); if (T(C) == Lang.MARK_AS_UNREAD) { T(C, Lang.MARK_AS_READ); RC.changeReadStatus(G, E, false) } else { T(C, Lang.MARK_AS_UNREAD); RC.changeReadStatus(G, E, true) } if (FeedViewer._selectedChannelId == FeedViewer.SELECTED_CHANNEL_SAVEDFEEDS_ID) { FeedViewer.refreshSavedRssItemChannelTitle() } else { var F = $(FeedViewer.LEFTPANE_CHANNEL_ID_PREFIX + G); if (F != null) { FeedViewer.setChannelHeaderText(F, G, FeedViewer.MAX_FEED_VIEWER_TITLE_LENGTH, true, false, true) } FeedViewer.refreshAllFeedUnreadCount() } }; return C 
    }, getUnreadCount: function (B) {
        if (B != null) { B.UnreadCount = 0; if (B.Feeds != null) { for (var A = 0; A < B.Feeds.length; A++) { if (!B.Feeds[A].IsRead) { B.UnreadCount++ } } } return B.UnreadCount } else { return 0 } 
    }, getAllUnreadCount: function () {
        var A = 0; for (var B = 0; B < RC._cachedRssChannelList.length; B++) { var C = RC._cachedRssChannelList[B]; A += FeedViewer.getUnreadCount(C) } return A 
    }, getAllFeedCount: function () {
        var B = 0; for (var A = 0; A < RC._cachedRssChannelList.length; A++) { var C = RC._cachedRssChannelList[A]; B += C.Feeds.length } return B 
    }, backGroundWorker: function (C, A, B, D) {
        MQ.add(B, A, true, function (F) { var E = 0; C(F) })
    }, backGroundWorker2: function (scriptToExecute, delay, key) { MQ.add(key, delay, true, function (scriptToExecute) { var x = 0; eval(scriptToExecute) }) } 
};

var StartPageHelper = {
    init: function () {
        StartPageHelper.attachLink($("Footer_SetAsStartpage"))
    }, trackSetAsHomePage: function (A) {
        if (typeof (A) != "undefined" && A) {
            $trackEvent("InProductMessaging", "Click", "MakePageFlakesYourHomePage")
        }
        else {
            $trackEvent("SetAsStartpage", "Click", "HomepageMenu")
        }
    }, attachLink: function (A) {
        if (null != A) {
            if (A.attached) {
                return
            }
            A.attached = true;
            if (Browser.isIE) {
                A.style.behavior = "url(#default#homepage)"
            }
            $addEvent(A, "click", function (B) {
                StartPageHelper.setAsStartPage(B.target)
            })
        }
    }, setAsStartPage: function (A, B) {
        StartPageHelper.trackSetAsHomePage(B);
        if (Browser.isIE) {
            A.style.behavior = "url(#default#homepage)";
            A.setHomePage(SITE_PREFIX)
        }
        else {
            if (Browser.isOpera) {
                $scrollTop();
                PU.centerDiv($("SetAsStartPageHelpDialogOpera"));
                PU.blockUI();
                $visible("SetAsStartPageHelpDialogOpera")
            }
            else {
                if (Browser.isFirefox) {
                    $scrollTop();
                    PU.centerDiv($("SetAsStartPageHelpDialogFirefox"));
                    PU.blockUI();
                    $visible("SetAsStartPageHelpDialogFirefox")
                }
                else {
                    if (Browser.isSafari) {
                        $scrollTop();
                        PU.centerDiv($("SetAsStartPageHelpDialogSafari"));
                        PU.blockUI();
                        $visible("SetAsStartPageHelpDialogSafari")
                    }
                    else {
                        $scrollTop();
                        PU.centerDiv($("SetAsStartPageHelpDialog"));
                        PU.blockUI();
                        $visible("SetAsStartPageHelpDialog")
                    }
                }
            }
        }
        CoreServices.UpdateInProductMessageSettings("HOMEPAGE");
        PU.hideMsg()
    }, showFirefoxHomepageDetails: function () {
        if (Browser.isFirefox) {
            $hide("SetAsStartPageHelpDialogFirefox");
            PU.centerDiv($("SetAsStartPageHelpDialogFirefoxDetail"));
            $visible("SetAsStartPageHelpDialogFirefoxDetail")
        }
    }, hide: function () {
        PU.unblockUI();
        if (Browser.isSafari) {
            $hide("SetAsStartPageHelpDialogSafari")
        }
        else {
            if (Browser.isOpera) {
                $hide("SetAsStartPageHelpDialogOpera")
            }
            else {
                if (Browser.isFirefox) {
                    $hide("SetAsStartPageHelpDialogFirefox");
                    $hide("SetAsStartPageHelpDialogFirefoxDetail")
                }
                else {
                    $hide("SetAsStartPageHelpDialog")
                }
            }
        }
    }
};

if (DragHandler) {
    delete DragHandler
}
var DragHandler = {
    onDrag: function (B, A, F, E, D) {
        if (B.dragging) {
            P.makeSpaceForModule(App.currentPage, B, E, F);
            if (F < TabManager.getTabBottom() && App.currentPage.CanDeleteFlake) {
                var C = TabManager.highlightTabAt(E, F);
                if (C > 0) {
                    if (App.currentPage.id != C && B.dropOnPageId != C) {
                        PU.changeOpac(40, B.div.id);
                        TabManager.refresh();
                        B.dropOnPageId = C
                    } 
                }
                B.draggingOnTabs = true
            }
            else {
                if (B.draggingOnTabs) {
                    PU.clearOpac(B.div.id);
                    TabManager.refresh();
                    MQ.remove("SwitchTabWhileDragging", 1000);
                    B.draggingOnTabs = false;
                    B.dropOnPageId = 0
                } 
            }
            B.dragOver(E, D);
            B.dragOver2(E, D)
        }
    }, onDragStart: function (B, A, F, D, C) {
        B.hideEditArea();
        B.dragStart(A, F);
        B.dragStart2(A, F);
        var E = PU.getPosition(B.div);
        B.page.table.style.height = B.page.table.offsetHeight + (E[3] * 2) + "px";
        B.div.style.position = "absolute"; 
        B.div.style.left = E[0] + "px";
        B.div.style.top = E[1] + "px";
        B.div.style.width = E[2] + "px";
        B.div.style.height = E[3] + "px";
        P.removeModule(App.currentPage, B);
        P.makeSpaceForModule(App.currentPage, B, D, E[1]);
        PU.makeOnTop(B.div); B.dragging = true;
        P.dontSaveLayout(App.currentPage)
    }, onDragEnd: function (B, A, G) {
        if (B.dragging) {
            B.dragging = false;
            PU.clearOpac(B.div.id);
            if (B.draggingOnTabs && B.dropOnPageId > 0 && B.dropOnPageId != App.currentPage.id) {
                var E = App.currentPage; 
                P.hideDropPlaceholder();
                var D = App.getPageById(B.dropOnPageId);
                if (!D.CanAddFlake) {
                    P.insertModule(B.page, B, 0, 0);
                    alert(Lang.NO_PERM_ADD_FLAKE);
                    TabManager.refresh()
                }
                else {
                    if (D.isLoaded) {
                        P.insertModule(D, B, 0, parseInt(D.columnCount / 2));
                        P.saveLayoutNow(E); 
                        P.saveLayoutNow(D);
                        TabManager.refresh();
                        $track("/DragDrop/Tab");
                        if (null != B.page.table) {
                            B.page.table.style.height = "";
                            $fixTable(B.page.table)
                        } 
                    }
                    else {
                        App.moveModuleToPage2(B, D);
                        P.saveLayoutNow(D);
                        TabManager.refresh();
                        $track("/DragDrop/Tab")
                    } 
                } 
            }
            else {
                var F = PU.getPosition(App.dropPlaceholder);
                var C = new AnimatedMover(B.div, F[0], F[1], function () {
                    var I = App.dropPlaceholder ? App.dropPlaceholder.col : 0;
                    var H = App.dropPlaceholder ? App.dropPlaceholder.row : 0; P.hideDropPlaceholder();
                    if (!App.currentPage.CanAddFlake) {
                        P.insertModule(B.page, B, 0, 0);
                        alert(Lang.NO_PERM_ADD_FLAKE)
                    }
                    else {
                        P.insertModule(App.currentPage, B, H, I)
                    }
                    P.saveLayoutNow(App.currentPage);
                    TabManager.refresh();
                    B.page.table.style.height = "";
                    B.dragEnd(A, G);
                    B.dragEnd2(A, G);
                    $fixTable(B.page.table)
                })
            }
            TabManager.enable()
        } 
    } 
};
function AnimatedMover(A, D, B, L) {
    var M = A, J = D, H = B;
    var I = 5; var G = 10;
    var C = I; var F = L; E();
    function E() {
        window.setTimeout(K, I)
    }
    function K() {
        var Q = PU.getPosition(M);
        if (C == 0) {
            M.style.left = J + "px";
            M.style.top = H + "px"; F()
        }
        else {
            var O = parseFloat(Q[0] - J) / C;
            var N = parseFloat(Q[1] - H) / C;
            M.style.left = (Q[0] - O) + "px";
            M.style.top = (Q[1] - N) + "px"; E();
            C--
        } 
    } 
};
var AlertManager = {
    init: function () {
        var A = $("alertMessages");
        AlertManager.getPendingAlerts(function (E) {
            if (E.length > 0) {
                var B = new Sys.StringBuilder();
                for (var D = 0; D < E.length; D++) {
                    B.append('<div class="alertItem" id="alert' + E[D].AlertID.toString() + '"><div class="alertNew" id="alertNew' + E[D].AlertID.toString() + '" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="alertSubject" id="alertSubject' + E[D].AlertID.toString() + '" > ' + E[D].Subject.toString() + '</div><span id="alertOr' + E[D].AlertID.toString() + '" >&nbsp;or&nbsp;</span><div class="alertHide" id="alertHide' + E[D].AlertID.toString() + '" ><a id="alertHideLink' + E[D].AlertID.toString() + '" onclick="AlertManager.hideAlert(\'' + E[D].AlertID.toString() + '\' )">hide this message</a></div><div id="alertSpace' + E[D].AlertID.toString() + '" class="alertSpace">&nbsp;</div></div>')
                }
                A.innerHTML = B.toString();
                for (var D = 0; D < E.length; D++) {
                    if (E[D].Details.length > 0) {
                        TM.setTooltip($("alertSubject" + E[D].AlertID.toString()), E[D].Details.toString(), 3)
                    } 
                }
                if ($("alerts").style.display != "block") {
                    $D("alerts");
                    $a = $("alerts");
                    $am = $("alertMessages");
                    $a.style.overflow = "hidden";
                    $a.style.height = "1px";
                    var C = setInterval(function () {
                        diff = $am.offsetHeight - $a.offsetHeight;
                        $a.style.height = ($a.offsetHeight + diff / 5) + "px";
                        $fixTable();
                        if (diff < 2) {
                            $a.style.height = $am.offsetHeight + "px"; clearInterval(C);
                            $a.style.overflow = "";
                            $a.style.height = "";
                            $fixTable()
                        } 
                    }, 50)
                } 
            } 
        })
    }, getPendingAlerts: function (A) {
        AlertService.GetPendingAlerts(A)
    }, hideAlert: function (A, B) {
        AlertService.HideAlert(A, function (K) {
            var C = $("alertMessages");
            var H = $("alert" + A.toString());
            var F = $("alertNew" + A.toString());
            var J = $("alertSubject" + A.toString());
            var E = $("alertOr" + A.toString());
            var G = $("alertHide" + A.toString());
            var D = $("alertHideLink" + A.toString());
            var I = $("alertSpace" + A.toString());
            if (Browser.isIE) {
                D.onclick = null
            }
            G.removeChild(D);
            H.removeChild(I);
            H.removeChild(G);
            H.removeChild(E);
            H.removeChild(J); H.removeChild(F); TM.hideTooltip(); C.removeChild(H);
            if (!C.hasChildNodes()) {
                $ND("alertMessages"); $ND("alerts")
            }
            $fixTable()
        })
    } 
};
var AlertService = function () {
    AlertService.initializeBase(this);
    this._timeout = 0;
    this._userContext = null;
    this._succeeded = null;
    this._failed = null
};
AlertService.prototype = {
    GetPendingAlerts: function (B, A, C) {
        return this._invoke(AlertService.get_path(), "GetPendingAlerts", true, {}, B, A, C)
    }, HideAlert: function (A, C, B, D) {
        return this._invoke(AlertService.get_path(), "HideAlert", true, {
            alertID: A
        }, C, B, D)
    } 
};
AlertService.registerClass("AlertService", Sys.Net.WebServiceProxy);
AlertService._staticInstance = new AlertService();
AlertService.set_path = function (A) { AlertService._staticInstance._path = A };
AlertService.get_path = function () { return AlertService._staticInstance._path };
AlertService.set_timeout = function (A) { AlertService._staticInstance._timeout = A };
AlertService.get_timeout = function () { return AlertService._staticInstance._timeout };
AlertService.set_defaultUserContext = function (A) { AlertService._staticInstance._userContext = A };
AlertService.get_defaultUserContext = function () { return AlertService._staticInstance._userContext };
AlertService.set_defaultSucceededCallback = function (A) { AlertService._staticInstance._succeeded = A };
AlertService.get_defaultSucceededCallback = function () { return AlertService._staticInstance._succeeded };
AlertService.set_defaultFailedCallback = function (A) { AlertService._staticInstance._failed = A };
AlertService.get_defaultFailedCallback = function () { return AlertService._staticInstance._failed };
AlertService.set_path("./AlertService.asmx");
AlertService.GetPendingAlerts = function (B, A, C) { AlertService._staticInstance.GetPendingAlerts(B, A, C) };
AlertService.HideAlert = function (A, C, B, D) { AlertService._staticInstance.HideAlert(A, C, B, D) };

var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;

if (typeof (AlertService_AlertObject) === "undefined") {
    var AlertService_AlertObject = gtc("AlertService+AlertObject");
    AlertService_AlertObject.registerClass("AlertService_AlertObject")
} 
AlertService.set_path("./AlertService.soap");

var ScrollManager = {
    _tabs: null
    , _fc: null
    , _lc: null, _tc: null
    , _tcs: null, _si: null
    , _moving: false, _initialized: false
    , _speed: 5, _hyperSpeed: 20
    , _minus: 80, _refreshing: false
    , _sliding: null, _rightZone: null
    , _leftZone: null, _tdWidth: null
    , init: function () {
        if (ScrollManager._initialized) {
            return
        }
        ScrollManager._initialized = true;
        ScrollManager._tdWidth = $("TopMenuContainer").childNodes[0].offsetWidth;
        ScrollManager._tabs = $("tabs");
        ScrollManager._fc = ScrollManager._tabs.firstChild;
        ScrollManager._lc = $("NewTabLink");
        ScrollManager._tc = $("tabs_container");
        ScrollManager._tcs = $("tabs_container_scroll");
        ScrollManager._tcs.style.overflow = "hidden";
        var A = PU.getPosition(ScrollManager._tcs);
        ScrollManager._rightZone = A[0] + A[2] / 4 * 3;
        ScrollManager._leftZone = A[0] + A[2] / 4;
        $("left_scroll").onmouseover = ScrollManager.moveRight;
        $("left_scroll").onmousedown = function (B) { ScrollManager.shiftRight(true) };
        $("left_scroll").onmouseout = ScrollManager.stop;
        $("right_scroll").onmouseover = ScrollManager.moveLeft;
        $("right_scroll").onmousedown = function (B) {
            ScrollManager.shiftLeft(true)
        };
        $("right_scroll").onmouseout = ScrollManager.stop;
        MQ.add("ScrollRefresh", 100, false, ScrollManager.refresh)
    }, stop: function () {
        ScrollManager._moving = false;
        window.clearInterval(ScrollManager._si)
    }, moveLeft: function () {
        if (ScrollManager._moving != true) {
            ScrollManager._moving = true;
            ScrollManager._si = window.setInterval(function () {
                ScrollManager.shiftLeft(false)
            }, 20)
        }
    }, shiftLeft: function (A) {
        if ((ScrollManager._tc.offsetLeft + ScrollManager._tc.offsetWidth) >= ScrollManager._tcs.offsetWidth) {
            ScrollManager._tc.style.left = (ScrollManager._tc.offsetLeft - (A == true ? Math.min(ScrollManager._hyperSpeed, (ScrollManager._tc.offsetLeft + ScrollManager._tc.offsetWidth) - ScrollManager._tcs.offsetWidth) : ScrollManager._speed)) + "px"
        }
        else {
            ScrollManager.stop()
        }
    }, shiftRight: function (A) {
        if (ScrollManager._tc.offsetLeft < 0) {
            ScrollManager._tc.style.left = (ScrollManager._tc.offsetLeft + (A == true ? Math.min(-ScrollManager._tc.offsetLeft, ScrollManager._hyperSpeed) : ScrollManager._speed)) + "px"
        }
        else {
            ScrollManager.stop()
        }
    }, moveRight: function () {
        if (ScrollManager._moving != true) {
            ScrollManager._moving = true;
            ScrollManager._si = window.setInterval(function () {
                ScrollManager.shiftRight(false)
            }, 20)
        }
    }, refresh: function () {
        if (ScrollManager._tcs.offsetParent) {
            $("TopMenuContainer").style.width = (ScrollManager._tdWidth + 15) + "px";
            ScrollManager._tcs.style.width = ($("Content").offsetWidth - ScrollManager._tdWidth - 15 - ScrollManager._minus) + "px";
            ScrollManager._tc.style.width = (TabManager.getTotalWidth() + 2) + "px";
            ScrollManager._fc = ScrollManager._tabs.firstChild;
            ScrollManager._lc = $("NewTabLink");
            if (ScrollManager._lc == null) {
                ScrollManager._lc = ScrollManager._tabs.lastChild
            }
            var C = 20;
            while (ScrollManager._lc.offsetTop > ScrollManager._fc.offsetTop && --C > 0) {
                ScrollManager._tc.style.width = (ScrollManager._tc.offsetWidth + 10) + "px"
            }
            ScrollManager._hyperSpeed = ScrollManager._tcs.offsetWidth / 2;
            if (ScrollManager._tc.offsetWidth <= ScrollManager._tcs.offsetWidth) {
                $ND("left_scroll");
                $ND("right_scroll");
                ScrollManager._tc.style.left = "0px"
            }
            else {
                $D("left_scroll", true);
                $D("right_scroll", true);
                var E = TabManager.findTabPosition(App.currentPage.id);
                var B = $(App.currentPage.id).offsetLeft + E[2] / 2;
                var D = B - ScrollManager._tcs.offsetWidth / 2;
                var A = ScrollManager._tc.offsetWidth - ScrollManager._tcs.offsetWidth;
                if (D > 0 && D < A) {
                    ScrollManager.scrollTo(-D)
                }
                else {
                    if (D > A) {
                        ScrollManager.scrollTo(-A)
                    }
                    else {
                        ScrollManager.scrollTo(0)
                    }
                }
            }
            ScrollManager._refreshing = false
        }
    }, scrollTo: function (A) {
        clearInterval(ScrollManager._sliding);
        ScrollManager._sliding = setInterval(function () {
            if (ScrollManager._moving == true) {
                clearInterval(ScrollManager._sliding);
                return
            }
            var C = ScrollManager._tc.offsetLeft;
            var B = (A - C) / 2;
            if (Math.abs(B) > 1) {
                ScrollManager._tc.style.left = (C + B) + "px"
            }
            else {
                ScrollManager._tc.style.left = A + "px";
                clearInterval(ScrollManager._sliding)
            }
        }, 20)
    }, dragStart: function (A, B) {
        if (A > ScrollManager._rightZone) {
            ScrollManager.moveLeft()
        }
        else {
            if (A < ScrollManager._leftZone) {
                ScrollManager.moveRight()
            }
            else {
                ScrollManager.stop()
            }
        }
    }, dragEnd: function () {
        ScrollManager.stop()
    }
};

var SendPageToFriend = {
    sharePopupName: "SendPageToFriendPopup"
    , emailProvider: "gmail"
    , importPanel: "SendFriendImportPanel"
    , importResult: "SendFriendImportResult"
    , importEmailDialog: "sendPageImportEmail"
    , emailBox: "SPTFEmailAddresses", loadedStr: ""
    , show: function (A, C) {
        var D = $(SendPageToFriend.sharePopupName);
        PU.blockUI(); App.hideAllControls();
        D = $$("div", SendPageToFriend.sharePopupName);
        D.className = "popup container"; 
        $("Content").appendChild(D);
        if (SendPageToFriend.loadedStr == "") {
            var B = "sendThisPageToFriend.aspx";
            App.Server.GetPage(SendPageToFriend.sharePopupName, B, function (E) {
                D.innerHTML = E.body;
                SendPageToFriend.loadedStr = E.body;
                SendPageToFriend.fillText(A, C);
                PU.centerDiv(D)
            })
        }
        else {
            D.innerHTML = SendPageToFriend.loadedStr;
            SendPageToFriend.fillText(A, C);
            PU.centerDiv(D)
        }
        $track("/SendPage/Show");
        $trackEvent("Header Links Top", "Click", "Send To Friend")
    }, fillText: function (B, D) {
        var C = $("SPTFHeader");
        var E = $("SPTFMessage");
        var A = $("SPTFEmailAddresses");
        if (D && App.IsMySite) {
            C.innerHTML = "Invite people to your Pagecast!"
        }
        else {
            E.value = Lang.SEND_THIS_PAGE_TO_FRIEND_TEXT;
            C.innerHTML = "Send this page to someone!"
        }
        if (typeof B != "undefined" && B != "") {
            A.value = B
        }
    }, hide: function () {
        var A = $(SendPageToFriend.sharePopupName);
        A.parentNode.removeChild(A);
        PU.unblockUI();
        App.showAllControls()
    }, showImport: function (A) {
        $D(SendPageToFriend.importEmailDialog);
        $hide("SPTFTip");
        if (A) {
            $("import" + A + "AB").checked = true;
            SendPageToFriend.setImportFrom(A)
        }
    }, hideAddressInput: function () {
        $visible("SPTFTip");
        $("sendPageToFriendUsername").value = "";
        $("sendPageToFriendPassword").value = "";
        $ND("SPTFImportError");
        $ND(SendPageToFriend.importEmailDialog)
    }, setImportFrom: function (A) {
        SendPageToFriend.emailProvider = A;
        T("SPTFUsernameT", A + " username:");
        T("SPTFPasswordT", A + " password:")
    }, scanAddressBook: function () {
        $ND("SPTFImportError");
        var C = $("sendPageToFriendUsername").value;
        var A = $("sendPageToFriendPassword").value;
        if (SendPageToFriend.checkError("sendPageToFriendUsername") == true || SendPageToFriend.checkError("sendPageToFriendPassword") == true) {
            return
        }
        var B = SendPageToFriend.emailProvider;
        $D("ScanningAddressBook");
        $ND(SendPageToFriend.importEmailDialog);
        App.Server.ImportContacts(B, C, A, function (G) {
            $D(SendPageToFriend.importPanel);
            $ND("ScanningAddressBook");
            $D(SendPageToFriend.importResult);
            if (G) {
                var F = $(SendPageToFriend.importResult);
                F.innerHTML = "";
                var H = "";
                for (var E = 0; E < G.length; E++) {
                    var D = 348;
                    if (Browser.isSafari) {
                        D = 345
                    }
                    H += '<div style="background:#eee; border-bottom:#ccc 1px solid;width:' + D + 'px;"><input name="user" type="checkbox" value="' + G[E].Value + '" /><span> ' + G[E].Key + " (" + G[E].Value + ")</span></div>"
                }
                F.innerHTML = H;
                if (Browser.isSafari) {
                    F.style.overflow = "auto";
                    F.style.width = "360px"
                }
                $("SPTFImportButton").disabled = false
            }
            else {
                T(SendPageToFriend.importResult, " No result found!");
                $("SPTFImportButton").disabled = true
            }
        }, function (D) {
            $ND("ScanningAddressBook");
            if (D._message.indexOf("Invalid") == 0) {
                T("SPTFImportError", "Authentication failed. Please make sure you have entered a correct user name and password.")
            }
            else {
                T("SPTFImportError", D._message)
            }
            $D("SPTFImportError");
            if (Browser.isIE) {
                $("SPTFImportError").style.paddingTop = "5px"
            }
            SendPageToFriend.scanAgain()
        });
        $track("/SendPage/ScanAddressbook")
    }, importEmails: function () {
        var C = $(SendPageToFriend.importResult);
        if (C.childNodes.length > 0) {
            var D = $(SendPageToFriend.emailBox);
            var B = new Array();
            if (D.value) {
                if (D.value.indexOf(", ") > 0) {
                    B = D.value.split(", ")
                }
                else { B = D.value.split(",") } 
            }
            for (i = 0; i < C.childNodes.length; i++) {
                var A;
                if (A = C.childNodes[i].firstChild) {
                    if (A.checked) {
                        B = B.concat(A.value)
                    } 
                } 
            }
            D.value = B.join(", ");
            $ND(SendPageToFriend.importPanel);
            SendPageToFriend.hideAddressInput()
        }
    }, scanAgain: function () {
        $ND(SendPageToFriend.importPanel);
        $D("sendPageImportEmail")
    }, sendPage: function () {
        var F = $(SendPageToFriend.emailBox).value;
        var E = "SPTFEmailAddresses_error";
        var B = "SPTFSentMailConfirmation";
        var C = "SPTFButton";
        $(C).disabled = true;
        $(C).value = "Sending...";
        $ND(B); 
        if ($trim(F) == "") {
            T(E, "Please enter at least one email address");
            $D(E);
            $(C).disabled = false;
            $(C).value = "Send";
            return
        }
        if (!ValidateEmails.isValidEmailList(F, ",")) {
            T(E, "Please enter valid email address/s");
            $D(E);
            $(C).disabled = false;
            $(C).value = "Send";
            return
        }
        if (SendPageToFriend.checkError(SendPageToFriend.emailBox) == true) {
            $(C).disabled = false;
            $(C).value = "Send";
            return
        }
        var D = $("SPTFMessage").value;
        var A = App.currentPage.id;
        if (App.currentPage.IsPublished && App.IsMySite) {
            App.Server.SendPublicPageInvitation(A, F, D, function (G) {
                SendPageToFriend.sendComplete()
            }, function (G) {
                PageflakesUtility.dumpException(G)
            })
        }
        else {
            App.Server.SendThisPageToFriend(A, F, D, function (G) {
                SendPageToFriend.sendComplete()
            })
        }
    }, sendComplete: function () {
        var C = $("SPTFSentMailConfirmation");
        var B = $("SPTFEmailAddresses_error");
        var A = "SPTFButton"; 
        $D(C);
        $ND(B);
        $("SPTFEmailAddresses").value = "";
        $(A).disabled = false;
        $(A).value = "Send";
        $track("/SendPage/Sent")
    }, checkError: function (B) {
        var A = $(B);
        if (A == null) {
            return false
        }
        if (A.value == "") {
            $D(B + "_error");
            A.onclick = function () {
                $ND(B + "_error")
            };
            return true
        }
        else {
            return false
        } 
    } 
};

var SendFlakeToFriend = {
    flakeId: null
    , sendFlakePopupName: "SPTFPopup"
    , loadedStr: ""
    , init: function (A) {
        SendFlakeToFriend.flakeId = A;
        SendFlakeToFriend.show()
    }, show: function () {
        var B = $(SendFlakeToFriend.sendFlakePopupName);
        PU.blockUI();
        B = $$("div", SendFlakeToFriend.sendFlakePopupName);
        B.className = "popup container";
        B.style.width = "855px";
        $("Content").appendChild(B);
        B.innerHTML = "Loading...";
        if (SendFlakeToFriend.loadedStr == "") {
            PU.centerDiv(B);
            var A = "sendFlakeToFriend.aspx";
            App.Server.GetPage(SendFlakeToFriend.sendFlakePopupName, A, function (C) {
                var D = $(SendFlakeToFriend.sendFlakePopupName);
                D.innerHTML = C.body;
                SendFlakeToFriend.loadedStr = C.body;
                SendFlakeToFriend.loadModule();
                PU.centerDiv(D)
            })
        }
        else {
            var B = $(SendFlakeToFriend.sendFlakePopupName);
            B.innerHTML = SendFlakeToFriend.loadedStr;
            SendFlakeToFriend.loadModule();
            PU.centerDiv(B)
        }
        $track("/SendFlake/Show")
    }, hide: function () {
        var A = $(SendFlakeToFriend.sendFlakePopupName);
        $("SFTFModuleContainer").innerHTML = "";
        A.parentNode.removeChild(A);
        PU.unblockUI();
        $ND("SFTFBlockUI");
        App.showAllControls()
    }, loadModule: function () {
        var D = $("SFTFModuleContainer");
        App.hideAllControls();
        D.innerHTML = "";
        D.appendChild($("module" + SendFlakeToFriend.flakeId).cloneNode(true));
        var B = $("SFTFBlockUI");
        var C = PU.getPosition(D);
        var A = PU.getPosition($("SPTFPopup"));
        $D(B);
        B.style.left = (C[0] - A[0]) + "px";
        B.style.top = (C[1] - A[1]) + "px"; B.style.width = C[2] + "px"; B.style.height = C[3] + "px" 
    }, sendFlake: function () { var F = $(SendPageToFriend.emailBox).value; var E = "SPTFEmailAddresses_error"; var B = "SFTFSentMailConfirmation"; var A = "SFTFButton"; $(A).disabled = true; $(A).value = "Sending..."; $ND(B); if ($trim(F) == "") { T(E, "Please enter at least one email address"); $D(E); $(A).disabled = false; $(A).value = "Send"; return } if (!ValidateEmails.isValidEmailList(F, ",")) { T(E, "Please enter valid email address/s"); $D(E); $(A).disabled = false; $(A).value = "Send"; return } if (SendPageToFriend.checkError(SendPageToFriend.emailBox) == true || SendPageToFriend.checkError("SPTFMessage") == true) { $(A).disabled = false; $(A).value = "Send"; return } var C = $("SPTFMessage").value; C = C.replace(/\n/g, "<br />"); var D = SendFlakeToFriend.flakeId.substr(1); App.Server.SendThisFlakeToFriend(D, F, C, function (G) { SendFlakeToFriend.sendComplete() }) }, sendComplete: function () { var B = $("SFTFSentMailConfirmation"); var A = "SFTFButton"; $D(B); $("SPTFEmailAddresses").value = ""; $(A).disabled = false; $(A).value = "Send"; $track("/SendFlake/Sent") } };
var ImprovedTooltipNo = 0;
var ImprovedTooltipCollection = new Array();
function ImprovedTooltip(Z, A, U, G, I, L) {
    if (typeof (Z) == "string") {
        Z = $(Z)
    }
    var E = Z.id;
    var O = $$("div");
    if (ImprovedTooltipCollection[U] != null) {
        var N = ImprovedTooltipCollection[U];
        for (var T = 0; T < N.length; T++) {
            if (N[T] == E) {
                return
            }
        }
        ImprovedTooltipCollection[U].push(E)
    }
    else {
        ImprovedTooltipCollection[U] = new Array();
        ImprovedTooltipCollection[U].push(E)
    }
    var D = ImprovedTooltipNo++;
    var Q = "improvedTooltip" + D;
    var K = $("improvedTooltip_NO_").innerHTML;
    var X, M; var F, C, B, W, H, R, J, S; I = I.toLowerCase();
    O.id = Q;
    O.className = "improvedTooltip";
    K = K.replace(/_NO_/g, D);
    O.innerHTML = K.replace(/_CONTENT_/g, G);
    $("Content").appendChild(O);
    $D(O);
    function Y() {
        if ($(E) == null) {
            P();
            return
        }
        else {
            Z = $(E)
        }
        if (canYouSeeMe(E)) {
            $D(O)
        }
        else {
            $ND(O)
        }
        var c = PU.getPosition(Z);
        var a = PU.getPosition(O);
        var b;
        if (I == "tl") {
            X = $("improvedTooltipTop" + D);
            M = (a[2] / 3 - 12); $D(X);
            X.style.left = M + "px";
            b = (c[0] - M - 20);
            O.style.top = (c[1] + c[3]) + "px"
        }
        else {
            if (I == "tr") {
                X = $("improvedTooltipTop" + D);
                M = (a[2] / 3 * 2 - 12);
                $D(X);
                X.style.left = M + "px";
                b = (c[0] - M - 20);
                O.style.top = (c[1] + c[3]) + "px"
            }
            else {
                if (I == "bl") {
                    X = $("improvedTooltipBottom" + D);
                    M = (a[2] / 3 - 12);
                    $D(X);
                    X.style.left = M + "px";
                    b = (c[0] - M - 20);
                    O.style.top = (c[1] - a[3]) + "px"
                }
                else {
                    if (I == "br") {
                        X = $("improvedTooltipBottom" + D);
                        $D(X);
                        M = (a[2] / 3 * 2 - 12);
                        X.style.left = M + "px";
                        b = (c[0] - M - 20);
                        O.style.top = (c[1] - a[3]) + "px"
                    }
                    else {
                        if (I == "lt") {
                            X = $("improvedTooltipLeft" + D);
                            M = ((X.parentNode.offsetHeight + 10) / 3 - 5 - 12);
                            $D(X);
                            X.style.top = M + "px";
                            b = (c[0] + c[2]);
                            O.style.top = (c[1] - M - 20) + "px"
                        }
                        else {
                            if (I == "lb") {
                                X = $("improvedTooltipLeft" + D);
                                M = ((X.parentNode.offsetHeight + 10) / 3 * 2 - 5 - 12);
                                $D(X);
                                X.style.top = M + "px";
                                b = (c[0] + c[2]);
                                O.style.top = (c[1] - M - 20) + "px"
                            }
                            else {
                                if (I == "rt") {
                                    X = $("improvedTooltipRight" + D);
                                    M = ((X.parentNode.offsetHeight + 10) / 3 - 5 - 12);
                                    if (Browser.isSafari) {
                                        M += 20
                                    }
                                    $D(X);
                                    X.style.top = M + "px";
                                    b = (c[0] - a[2]);
                                    O.style.top = (c[1] + c[3] / 2 - M - 20) + "px"
                                }
                                else {
                                    if (I == "rb") {
                                        X = $("improvedTooltipRight" + D);
                                        M = ((X.parentNode.offsetHeight + 10) / 3 * 2 - 5 - 12);
                                        $D(X);
                                        X.style.top = M + "px";
                                        b = (c[0] - a[2]);
                                        O.style.top = (c[1] - M - 20) + "px"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (b < 0) {
            O.style.left = "0px"
        }
        else {
            if (b + a[2] > PU.getPosition($("Content"))[2]) {
                O.style.left = PU.getPosition($("Content"))[2] - a[2] + "px"
            }
            else {
                O.style.left = b + "px"
            }
        }
    }
    Y();
    var V = setInterval(Y, 100);
    $("improvedTooltipClose" + D).onclick = P;
    function P() {
        clearInterval(V);
        TipFactory.removeTip(A, U);
        O.parentNode.removeChild(O);
        var a = ImprovedTooltipCollection[U];
        Array.remove(a, E);
        if (a.length == 0) {
            ImprovedTooltipCollection[U] = null
        }
        if (typeof L == "function") {
            L()
        }
    }
    O.si = V;
    return O
}
var TipFactory = { _tooltips: [], _flakeTips: [], _pageTips: [], _hasInitialized: false
    , showTips: function (C) {
        if (arguments[0] != null) { TipFactory._tooltips = C } if ((TipFactory._tooltips == null) || (TipFactory._tooltips.length == 0)) { return } for (var B = 0; B < App.pages.length; B++) { TipFactory.showPageTip(App.pages[B].id, "sendPageToFriend", "onLoad") } var D = App.currentPage; if (D == null) { return } if ((D.modules != null) && (D.modules.length > 0)) { for (var A = 0; A < D.modules.length; A++) { TipFactory.showFlakeTip(D.modules[A].internalID, "sendFlakeToFriend", "onLoad") } } if (App.IsMySite) { TipFactory.showPageTip(D.id, "pageAddedAsbookmark", "onLoad"); TipFactory.showPageTip(D.id, "pageCopied", "onLoad") }
    }, showPageTip: function (C, B, D) {
        var F = TipFactory._getPageTip(C, B, D); if (F != null) { var E = $get("tabs"); if (E != null) { var A = $get(C.toString(), E); if (A != null) { ImprovedTooltip(A, C, F.id, F.content, F.anchor) } } }
    }, showFlakeTip: function (E, A, B) {
        var D = TipFactory._getFlakeTip(E, A, B); if (D != null) { var C = $get("handlem" + E.toString()); if (C != null) { ImprovedTooltip(C, E, D.id, D.content, D.anchor) } }
    }, removeTip: function (I, C) {
        var F = TipFactory._flakeTips[I]; if ((F == null) || (F.length == 0)) { F = TipFactory._pageTips[I] } if ((F != null) && (F.length > 0)) { for (var E = F.length - 1; E > -1; E--) { if (F[E].id == C) { Array.remove(F, F[E]) } } } var B = App.My.Profile.tooltips; if ((B != null) && (B.length > 0)) { var A = B.split(","); if ((A != null) && (A.length > 0)) { var D = -1; for (var E = 0; E < A.length; E++) { var J = A[E].split("="); if ((J != null) && (J.length > 0)) { if (parseInt(J[0]) == C) { if (J.length > 1) { var K = J[1].split("&"); if ((K != null) && (K.length > 0)) { if ((K[0] == "_M_" + I) || (K[0] == "_P_" + I)) { D = E; break } } } else { D = E; break } } } } if (D > -1) { var H = new Array(); for (var E = 0; E < A.length; E++) { if (E != D) { H.push(A[E]) } } var G = ""; if (H.length > 0) { G = H.join(",") } if (App.IsMySite) { App.saveProfile("tooltips", G) } } } }
    }, _getPageTip: function (B, A, C) {
        if (!TipFactory._hasInitialized) { TipFactory._init() } if (TipFactory._pageTips != null) { var E = TipFactory._pageTips[B]; if ((E != null) && (E.length > 0)) { for (var D = 0; D < E.length; D++) { if ((E[D].when == A) && (E[D].trigger == C)) { return E[D] } } } } return null
    }, _getFlakeTip: function (E, A, B) {
        if (!TipFactory._hasInitialized) { TipFactory._init() } if (TipFactory._flakeTips != null) { var D = TipFactory._flakeTips[E]; if ((D != null) && (D.length > 0)) { for (var C = 0; C < D.length; C++) { if ((D[C].when == A) && (D[C].trigger == B)) { return D[C] } } } } return null
    }, _init: function () {
        if (TipFactory._hasInitialized) { return } var B = App.My.Profile.tooltips; if ((B != null) && (B.length > 0)) { var C = 0; var H = null; var F = ""; var A = B.split(","); if ((A != null) && (A.length > 0)) { for (var E = 0; E < A.length; E++) { var G = A[E].split("="); if ((G != null) && (G.length > 0)) { C = parseInt(G[0]); H = null; if (G.length == 2) { var I = G[1].split("&"); if ((I != null) && (I.length > 0)) { H = TipFactory._buildTip(C); if (H != null) { F = I[0]; if (I.length > 1) { for (var D = 1; D < I.length; D++) { H.content = TipFactory._replaceText(H.content, "{" + (D - 1) + "}", I[D]) } } if (F.startsWith("_M_")) { F = parseInt(TipFactory._replaceText(F, "_M_", "")); if (TipFactory._flakeTips[F] == null) { TipFactory._flakeTips[F] = new Array() } TipFactory._flakeTips[F].push(H) } else { if (F.startsWith("_P_")) { F = parseInt(TipFactory._replaceText(F, "_P_", "")); if (TipFactory._pageTips[F] == null) { TipFactory._pageTips[F] = new Array() } TipFactory._pageTips[F].push(H) } } } } } else { } } } } } TipFactory._hasInitialized = true
    }, _buildTip: function (A) {
        if ((TipFactory._tooltips == null) || (TipFactory._tooltips.length == 0)) { return null } var C; for (var B = 0; B < TipFactory._tooltips.length; B++) { C = TipFactory._tooltips[B]; if (A == C.id) { return { id: C.id, when: C.when, anchor: C.anchor, trigger: C.trigger, content: C.tip} } } return null
    }, _replaceText: function (D, A, C) { var B = D.split(A); B = B.join(C); return B }
};
WWHelper = {
    show: function () {
        if (typeof WW == "undefined") {
            PU.blockUI("Loading...");
            App.Server.GetWWHtml(function (A) {
                HttpLoader.process(A, PU.hideBlockMsg)
            })
        }
        else {
            PU.blockUI();
            WW.init()
        }
    }
};

var FLAKE_EXPORT_POPUP_ID = "flake_export_popup";
var PUBLIC_PAGE_INVITE_POPUP_ID = "public_page_invite_popup";
App.startOver = function () {
    App.confirm(Lang.START_OVER, Lang.YES_START_OVER, Lang.NO_START_OVER, function () {
        document.location.href = "Logout.aspx?startover=true"
    }, PF.empty)
};
App.changeLanguage = function () {
    var A = $("drpChangeLanguage");
    document.location.href = SITE_PREFIX + "ChangeLanguage.aspx?lang=" + A.value
};
App.createNewPage = function (C) {
    var A = new $cloneObject(App.currentPage.pageTheme); 
    var B = new Page(App.getNewId(), App.pages.length, C, 3, true, A);
    App.pages.push(B);
    P.orderPages();
    TabManager.create();
    B.show();
    B.save(); 
    ScrollManager.moveLeft(true)
};
App.hideAllControls = function () {
    var A = document.getElementsByTagName("SELECT");
    for (var B = 0; B < A.length; B++) {
        var C = A[B];
        if (!C.getAttribute("dontHide")) {
            C.hidden = true;
            $hide(C)
        } 
    } 
};
App.showAllControls = function () {
    var A = document.getElementsByTagName("SELECT");
    for (var B = 0; B < A.length; B++) {
        var C = A[B];
        if (C.hidden) {
            C.hidden = false;
            $visible(C)
        } 
    } 
};
App.GetZipCode = function () { var A = App.My; if (A.Country == "US" || A.Country == "USA") { if (A.City != "" && A.State != "" && A.ZipCode == "") { App.ZipCode = App.Server.GetZipCode(A.City, A.State, function (B) { if (B != "") { A.ZipCode = B; App.changeGlobalLocation(A.City, A.State, A.ZipCode, A.Country) } }) } } };
App.changeGlobalTimezone = function (B) { try { App.My.Timezone = parseInt(B); App.saveUserInfo(function (C) { App.notifySubscribers("OnTimeZoneChange", B) }, PF.empty) } catch (A) { } }; 
App.changePassword = function (C, B, A, D) { App.Server.ChangePassword(C, B, A, D) };
App.showFlakeExport = function (B) {
    PU.blockUI();
    App.hideAllControls(); var C = $(FLAKE_EXPORT_POPUP_ID); if (C == null) { C = $$("div", FLAKE_EXPORT_POPUP_ID); C.className = "popup"; C.innerHTML = Lang.LOADING; $(MODULE_CONTAINER).appendChild(C); PU.centerDiv(C); var A = "FlakeExportPopup.aspx"; App.Server.GetPage(FLAKE_EXPORT_POPUP_ID, SITE_PREFIX + A, function (D) { $track("/ExportFlake/Show"); $hide(C); if (!P.loadPage(D, C)) { $showMsg(Lang.COMMON_ERROR_ALERT); $D(C); $visible(C); return } else { C.style.zIndex = $("blockUI").style.zIndex + 1; if (typeof FlakeExport != "undefined") { FlakeExport.init() } } }); App.hideAllControls() } else { FlakeExport.init(); $D(C); PU.centerDiv(C); C.style.zIndex = $("blockUI").style.zIndex + 1; $track("/ExportFlake/Show") } 
};
App.hideFlakeExport = function () { $ND(FLAKE_EXPORT_POPUP_ID); PU.unblockUI(); App.showAllControls() };
App.showPublicPageInvite = function () {
    PU.blockUI();
    App.hideAllControls(); var B = $(PUBLIC_PAGE_INVITE_POPUP_ID); if (B == null) { B = $$("div", PUBLIC_PAGE_INVITE_POPUP_ID); B.className = "popup"; B.style.height = "480px"; B.innerHTML = Lang.LOADING; $(MODULE_CONTAINER).appendChild(B); PU.centerDiv(B); var A = "PublicPageInvitePopup.aspx"; App.Server.GetPage(PUBLIC_PAGE_INVITE_POPUP_ID, SITE_PREFIX + A, function (C) { if (!P.loadPage(C, B)) { $showMsg(Lang.COMMON_ERROR_ALERT); $D(B); $visible(B); return } else { B.style.zIndex = $("blockUI").style.zIndex + 1; if (typeof PublicPageInvite != "undefined") { PublicPageInvite.init() } } }); App.hideAllControls() } else { $D(B); PU.centerDiv(B); B.style.zIndex = $("blockUI").style.zIndex + 1; PublicPageInvite.init() } 
}; 
App.hidePublicPageInvite = function () { $ND(PUBLIC_PAGE_INVITE_POPUP_ID); PU.unblockUI(); App.showAllControls() };
App.confirm = function (E, F, D, A, C, B) {
    P.showConfirmDialog(E, F, D, (typeof B == "function")); 
    $("confirmDialog_ok").onclick = function () {
        P.hideConfirmDialog();
        if ($("confirmDialog_yes").checked) {
            A()
        } 
        else {
            if ($("confirmDialog_no").checked) {
                C()
            }
            else {
                P.showConfirmDialog(E, F, D)
            } 
        } 
    };     
    $("confirmDialog_cancel").onclick = function () { P.hideConfirmDialog(); B() }
}; 
App.lastNewId = -1;
App.getNewId = function () {
    return App.lastNewId--
};
App.removePageById = function (B) {
    var A;
    for (A = 0; A < App.pages.length; A++) {
        if (App.pages[A].id == B) {
            App.pages.removeAt(A);
            break
        } 
    }
    P.orderPages();
    if (A == App.pages.length) {
        A--
    }
    return A
};
App.moveModuleToPage = function (D, F) {
    var A = D.page.id;
    var C = F.id;
    var E = ++D.page.versionNo;
    var B = ++F.versionNo;
    D.page.removeModule(D.id);
    F.addModule(D);
    App.Server.MoveModuleToPage(D.internalId, A, C, function () { P.precachePage(A, E); P.precachePage(C, B) });
    D.page = F
};
App.moveModuleToPage2 = function (D, F) {
    var A = D.page.id;
    var E = ++D.page.versionNo;
    var C = ++F.versionNo;
    var B = F.id;
    App.Server.MoveModuleToPage(D.internalId, A, B, function () { P.precachePage(A, E); P.precachePage(B, C) });
    D.removeFromPage();
    D.page = F
};
App.sendErrorReport = function () {
    MQ.add("ErrorReport", 30000, true, App.sendErrorReport);
    if (App.errors.length > 0) {
        Log.add(P.buildLoadTimeLogs());
        App.Server.ErrorReports(App.errors, Log.items, function () { App.errors = []; Log.clear() }, function () { App.addError("Error report send timed out") }, function (A) { PU.dumpException(A) })
    }
};
App.createNewModule = function (D, B, E, C, A) {
    if (!App.currentPage.CanAddFlake) {
        alert(App.ViewingPageOf + Lang._THE_OWNER_CAN_ADD);
        return
    }
    App.Server.CreateNewModule(D, B, App.currentPage.id, C, A, function (G) { App.currentPage.modules.add(G); var F = new Module(); F.Build(G); F.row = C; F.col = A; F = P.createNewModule(App.currentPage, F, App.currentPage.columns[A].div); F.loader = new ModuleLoader(F); F.loader.load(G.Parts); P.insertModule(App.currentPage, F, C, A); P.saveLayout(App.currentPage); if (typeof E == "function") { E(F) } })
};
App.createPopup = function (C, L, F, K, D, M, J, G) {
    var B = $(C);
    if (null != B) {
        return $("body" + C)
    }
    var A = $$("DIV");
    A.id = C;
    if (J && J.length > 0) {
        A.className = J
    }
    else {
        A.className = "popup"
    }
    if (arguments.length == 8) {
        if (G) {
            $visible(A)
        }
        else {
            $hide(A)
        } 
    }
    A.innerHTML = App.getPopupHtml(C, L);
    $("Content").appendChild(A);
    if (arguments.length > 4) {
        A.style.left = F + (typeof (F) == "string" ? "" : "px");
        A.style.top = K + (typeof (K) == "string" ? "" : "px");
        A.style.width = D + (typeof (D) == "string" ? "" : "px");
        if (M != "auto") {
            A.style.height = M + (typeof (M) == "string" ? "" : "px")
        } 
    }
    else {
        if (arguments.length > 2) {
            A.style.width = F + (typeof (F) == "string" ? "" : "px");
            if (M != "auto") {
                A.style.height = K + (typeof (K) == "string" ? "" : "px")
            }
            PU.centerDiv(A)
        }
        else {
            A.style.width = (PU.getViewportWidth() * 0.6) + "px";
            A.style.height = (PU.getViewportHeight() * 0.6) + "px"; PU.centerDiv(A)
        } 
    }
    var I = $("handle" + C);
    Drag.init(I, A);
    var E = $("closeLink" + C);
    E.onclick = function (N) { $("Content").removeChild(A) };
    PU.makeOnTop(A);
    var H = $("body" + C);
    return H
};
App.createPopupPage = function (B, I, A, F, H, D, J) {
    var C = $(B);
    if (null != C) {
        C.parentNode.removeChild(C)
    }
    var E = new Module(B, -1, -1, I, A, true, 0, 0, App.currentPage);
    if (D) {
        var G = App.createPopup(B, I, F, H, D, J)
    }
    else {
        var G = App.createPopup(B, I, F, H)
    }
    App.Server.GetPage(E.id, A, function (K) { P.loadPage(K, G) });
    return E
};
App.showHtmlViewer = function (F, B) {
    var D = 0;
    if (window.innerHeight) {
        D = window.pageYOffset
    }
    else {
        if (document.documentElement && document.documentElement.scrollTop) {
            D = document.documentElement.scrollTop
        } 
    }
    var C = PU.getViewportWidth();
    var H = 830;
    var E = Math.round((C - H) / 2);
    var A = App.createPopup("HtmlViewer", F, E, D + 90, H, 450);
    var G = $("HtmlViewer");
    App.Server.GetHtmlViewer(B, function (I) { P.loadPage(I, A) }, function (I) { A.innerHTML = I })
};

TM.currentItem = null;
TM.tooltipDiv = null;
TM.tooltipText = "";
TM.tooltipWidthMargin = 240;
TM.onmousemove = function (A) {
    A = $fix(A);
    var C = A.clientX;
    var B = A.clientY;
    TM.moveTooltip(C, B + PU.getViewportScrollY())
};
TM.onmouseout = function (B, A) {
    B = $fix(B);
    MQ.remove("TooltipShow", A);
    MQ.add("TooltipHide", A, true, function () {
        TM.hideTooltip()
    });
    if (Browser.isSafari) {
        $fixTable("body")
    } 
};
TM.showTooltipNow = TM.onmouseover = function (D, C, F, B) {
    TM.hideTooltip();
    if (B) {
        MQ.remove("TooltipHide", B)
    }
    D = $fix(D);
    TM.currentItem = C;
    TM.tooltipText = F;
    var G = D.clientX;
    var E = D.clientY;
    if (B) {
        MQ.add("TooltipShow", B, true, function () {
            var H = E;
            if (!Browser.isSafari) {
                H + PU.getViewportScrollY()
            }
            TM.showTooltip(G, H)
        })
    }
    else {
        var A = E;
        if (!Browser.isSafari) {
            A + PU.getViewportScrollY()
        }
        TM.showTooltip(G, A)
    } 
};
TM.showTooltip = function (E, C) {
    if (null != TM.currentItem) {
        if (TM.currentItem.style.visibility != "hidden" && TM.currentItem.style.display != "none") {
            var D = PU.getPosition(TM.currentItem);
            TM.tooltipDiv = $$("div");
            TM.tooltipDiv.className = "tooltip";
            var B = E;
            var A = C + 20;
            if (B + TM.tooltipWidthMargin > window.Width) {
                B = window.Width - TM.tooltipWidthMargin
            }
            TM.tooltipDiv.style.left = B + "px";
            TM.tooltipDiv.style.top = A + "px";
            TM.tooltipDiv.innerHTML = TM.tooltipText;
            if (Browser.isFirefox) {
                $ND(TM.tooltipDiv)
            }
            document.body.appendChild(TM.tooltipDiv);
            TM.currentItem.tooltipDiv = TM.tooltipDiv;
            if (Browser.isFirefox) {
                $D(TM.tooltipDiv)
            }
            if (Browser.isSafari) {
                $fixTable("body")
            } 
        } 
    } 
};
TM.moveTooltip = function (E, C) {
    if (TM.currentItem) {
        if (typeof TM.currentItem.tooltipDiv == "object" && TM.currentItem.tooltipDiv != null) {
            if (typeof TM.currentItem.tooltipDiv == "string") {
                $showMsg(TM.currentItem.tooltipDiv)
            }
            var D = PU.getPosition(TM.currentItem);
            TM.tooltipDiv = TM.currentItem.tooltipDiv;
            var B = E;
            var A = C + 20;
            if (B + TM.tooltipWidthMargin > window.Width) {
                B = window.Width - TM.tooltipWidthMargin
            }
            TM.tooltipDiv.style.left = B + "px";
            TM.tooltipDiv.style.top = A + "px"
        } 
    } 
};
TM.hideTooltip = function () { if (null != TM.currentItem && null != TM.currentItem.tooltipDiv && typeof TM.currentItem.tooltipDiv == "object") { TM.removeTooltip(TM.currentItem.tooltipDiv); TM.currentItem.tooltipDiv = null } TM.currentItem = null };
TM.removeTooltip = function (A) { $remove(A); delete A }; 
TM.unset = function (B, A) { if (A) { TM.hideTooltip() } if (B.onmouseoverCallback) { $removeEvent(B, "mouseover", B.onmouseoverCallback) } if (B.onmouseoutCallback) { $removeEvent(B, "mouseout", B.onmouseoutCallback) } if (B.onmousemoveCallback) { $removeEvent(B, "mousemove", B.onmousemoveCallback) } B.onmouseoverCallback = null; B.onmouseoutCallback = null; B.onmousemoveCallback = null };

var TabManager = {
    enabled: true
    , menuPageId: 0
    , menuTimeout: null
    , draggingPageId: null
    , dragDiv: null
    , dragOverTab: null
    , draggingTab: null
    , tabChangeCallback: function (A) { }
    , create: function () {
        var A = $("tabs");
        $removeAll(A);
        App.pages.forEach(function (D) {
            var C = D.id;
            var E = D.title;
            if (E == "") {
                E = Lang.UNTITLED
            }
            if (!D.IsOwner && App.IsMySite) {
                E += " (" + D.OwnerFullname + ")"
            }
            var B = TabManager.addNewTab(A, C, E, D.IsPublished);
            B.id = C;
            if (D.IsOwner) { }
            else {
                if (D.IsShared) {
                    TM.setTooltip(B, Lang.THIS_PAGE_ + D.OwnerName + Lang._SHARED_WITH_YOU)
                }
                else {
                    TM.setTooltip(B, Lang.THIS_PAGE_OF_ + D.OwnerName + Lang._VIEW_NOT_EDIT)
                }
            }
        });
        TabManager.createNewTabLink();
        TabManager.refresh()
    }, createNewTabLink: function () {
        if (App.IsMySite) {
            if ($("NewTabLink")) {
                $remove("NewTabLink")
            }
            var A = $$("li", "NewTabLink", "add_page add_page2", Lang.ADD_PAGE);
            $addHandler(A, "click", TabManager.newTabClicked);
            $("tabs").appendChild(A)
        }
    }, newTabClicked: function () {
        $trackEvent("Add New Page Tab", "Click", "Page " + (App.pages.length + 1));
        Start.hidePageSettings();
        if (TabManager.enabled) {
            App.createNewPage(Lang.MY_NEW_PAGE, App.pages.length)
        }
        PublicPageTab.init(false)
    }, getTotalWidth: function () {
        var B = $("tabs");
        var C = B.firstChild;
        var A = 0;
        while (C != null) {
            A += C.offsetWidth + 1;
            C = C.nextSibling
        }
        return A
    }, dragTab: function (B, A) {
        B = $fix(B);
        $addEvent(document.body, "selectstart", function (E) { return false });
        var D = PU.getPosition(A);
        var C = $$("div");
        C.className = "page_tab_hover";
        C.style.position = "absolute";
        C.style.left = D[0] + "px";
        C.style.top = D[1] + "px";
        C.innerHTML = A.firstChild.innerHTML;
        $("header").appendChild(C);
        Drag.init(C, C, B);
        C.onDrag = TabManager.onDragTab;
        C.onDragStart = TabManager.onDragTab;
        C.onDragEnd = TabManager.onDragEnd;
        TabManager.draggingPageId = A.id;
        TabManager.draggingTab = A;
        TabManager.dragDiv = C;
        TabManager.dragOverTab = TabManager.draggingTab;
        A.className += " translucent"
    }, onDragTab: function (A, G, E, D) {
        var B = $("tabs");
        var C = TabManager.findTabAt(E, D);
        if (null == C) {
            var F = PU.getPosition(B);
            if (A < F[0]) {
                if (B.firstChild != TabManager.draggingTab) {
                    B.removeChild(TabManager.draggingTab);
                    B.insertBefore(TabManager.draggingTab, B.firstChild)
                }
            }
            else {
                if (B.lastChild.previousSibling != TabManager.draggingTab) {
                    B.removeChild(TabManager.draggingTab);
                    B.insertBefore(TabManager.draggingTab, B.lastChild)
                }
            }
        }
        else {
            if (TabManager.dragOverTab != C) {
                if (C == TabManager.dragOverTab.nextSibling) {
                    B.insertBefore(TabManager.draggingTab, C.nextSibling)
                }
                else {
                    B.insertBefore(TabManager.draggingTab, C)
                }
                TabManager.dragOverTab = C
            }
        }
        ScrollManager.dragStart(A, G)
    }, onDragEnd: function (B, H) {
        $("header").removeChild(TabManager.dragDiv);
        TabManager.dragDiv = null;
        TabManager.draggingTab.className = "page_tab";
        TabManager.draggingTab = null;
        TabManager.dragOverTab = null;
        var F = $("tabs");
        var A = F.firstChild;
        var E = 0; var C = [];
        do {
            var D = parseInt(A.id);
            if (D > 0) {
                var G = App.getPageById(D);
                C[E] = G;
                G.index = E++
            }
        }
        while ((A = A.nextSibling) != null);
        App.pages = C;
        P.savePageOrder();
        TabManager.create();
        ScrollManager.dragEnd()
    }, getTabBottom: function () {
        return $("header").offsetTop + $("header").offsetHeight
    }, findTabAt: function (B, E) {
        var D = $("tabs");
        var A = D.firstChild;
        do {
            if (A.tagName == "LI") {
                if (parseInt(A.id) > 0) {
                    var C = PU.getPosition(A);
                    if (B >= C[0] && E >= C[1]) {
                        if (B <= C[0] + C[2] && E <= C[1] + C[3]) {
                            return A
                        }
                    }
                }
            }
        }
        while ((A = A.nextSibling) != null);
        return null
    }, highlightTabAt: function (B, C) {
        var A = TabManager.findTabAt(B, C + 15);
        if (A != null) {
            if (A.firstChild.className.indexOf("_over") < 0) {
                TabManager.refresh();
                A.firstChild.className += " page_tab_over"
            }
            return parseInt(A.id)
        }
        return 0
    }, findTabPosition: function (B) {
        var C = $("tabs");
        var A = C.firstChild;
        do {
            if (A.tagName == "LI") {
                if (A.id == B) {
                    var D = PU.getPosition(A);
                    return D
                }
            }
        }
        while ((A = A.nextSibling) != null)
    }, deletePage: function () {
        var A = App.getPageById(TabManager.menuPageId);
        if (confirm(Lang.DELETE_PAGE + " '" + A.title + "' " + Lang.AND_ALL_FLAKE)) {
            A.remove()
        }
    }, addNewTab: function (D, H, G, B) {
        var A = $$("li");
        D.appendChild(A);
        A.id = H;
        var F = $$("a");
        var E = $$("div");
        E.className = "page_title";
        T(E, G);
        var C = $$("a");
        C.className = "delete_page";
        T(C, "X");
        F.appendChild(E);
        F.appendChild(C);
        A.appendChild(F);
        if (H != "NewTabLink") {
            $addEvent(A, "click", new Func("TabManager.activate(" + H + ")"))
        } return A
    }, activate: function (A) {
        if (!TabManager.enabled) {
            return
        }
        if (A != App.currentPage.id) {
            Start.hidePageSettings()
        }
        var B = App.getPageById(A);
        B.show();
        if (App.IsMySite) {
            PublicPageTab.init(App.currentPage.IsPublished)
        }
        if (typeof TabManager.tabChangeCallback == "function") {
            TabManager.tabChangeCallback(A)
        }
    }, editTabTitle: function (A, I) {
        var G = $$("input", "TabTitleEditTextBox");
        var F = T(I);
        var H = PU.findParent(I, "LI");
        var E = PU.getPosition(H);
        var C = parseInt(H.id);
        G.className = "editTitleBox";
        G.style.left = E[0] + "px";
        G.style.top = E[1] + 2 + "px";
        G.style.width = E[2] + 10 + "px";
        G.value = F;
        G.onselectstart = function (J) {
            return true
        };
        document.body.appendChild(G);
        function D(K, J) {
            if ($trim(K.value) == "") {
                $showMsg(Lang.ENTER_SOME_TEXT);
                return
            }
            $hideMsg();
            $remove(K);
            var L = App.getPageById(J);
            L.title = K.value;
            L.save(); B()
        }
        function B() {
            TabManager.refresh();
            document.onclick = null;
            TabManager.enable()
        }
        G.onclick = $stopBubble;
        $addEvent(G, "keypress", function (J) {
            J = $fix(J);
            if (J.keyCode == 13) {
                D(this, C)
            }
            else {
                if (J.keyCode == 27) {
                    T(I, F);
                    $remove(this); B()
                }
                else {
                    T(I, this.value)
                }
            }
            this.style.width = I.offsetWidth + 10 + "px"
        });
        window.setTimeout(function () {
            $("TabTitleEditTextBox").focus(1);
            document.onclick = function (J) {
                D($("TabTitleEditTextBox"), C);
                document.onclick = null
            }
        }, 500);
        TabManager.disable()
    }, refresh: function () {
        if (null == App.currentPage) {
            return
        }
        var D = $("tabs");
        for (var C = 0; C < D.childNodes.length; C++) {
            var A = D.childNodes[C];
            var F = App.getPageById(parseInt(A.id));
            if (F != null) {
                var G = A.firstChild;
                var E = G.firstChild;
                var B = E.nextSibling;
                A.title = ""; E.title = "";
                B.title = "";
                $clearEvent(A);
                $clearEvent(E);
                $clearEvent(B);
                $clearEvent(G);
                $addEvent(A, "click", new Func("TabManager.activate(" + F.id + ")"));
                A.className = F.pageTheme.ThemeShortcut + "_tab";
                if (A.id == App.currentPage.id) {
                    if (App.IsMySite) {
                        TabManager.hookDrag(A, G, E, B)
                    }
                    if (F.IsOwner) {
                        G.className = " page_tab page_tab" + (F.IsPublished ? "_public" : (F.IsShared ? "_shared" : ""));
                        $addEvent(E, "click", new Func("TabManager.editTabTitle(event, this)"));
                        $addEvent(B, "click", function (H) {
                            if (confirm("Are you sure you want to remove this page?")) {
                                App.currentPage.remove();
                                Start.hidePageSettings()
                            }
                        });
                        $D(B);
                        E.title = "Click to rename this page.";
                        A.title = "";
                        B.title = "Click to delete this page"
                    }
                    else {
                        if (App.IsMySite) {
                            G.className = "page_tab page_tab_notmine" + (F.IsPublished ? "_public" : (F.IsShared ? "_shared" : ""))
                        }
                        else {
                            G.className = "page_tab page_tab"
                        }
                        if (F.IsShared) {
                            $D(B);
                            B.title = "Click to unshare this page."
                        }
                        else {
                            if (App.IsMySite && F.IsPublished) { $D(B) }
                            else {
                                B.style.width = "0px"; B.style.marginRight = "5px"
                            }
                        }
                        $addEvent(B, "click", function (H) {
                            if (confirm("Are you sure you want to remove this page?")) {
                                App.currentPage.remove(); Start.hidePageSettings()
                            }
                        })
                    }
                    $addEvent(G, "mouseover", function (H) {
                        this.className += " page_tab_h"
                    });
                    $addEvent(G, "mouseout", function (H) {
                        var I = this.className; this.className = I.replace(/page_tab_h/g, "")
                    });
                    $addEvent(B, "mouseover", function (H) { this.className += " delete_page_hover" });
                    $addEvent(B, "mouseout", function (H) { this.className = "delete_page" })
                } else { if (F.IsOwner) { G.className = "page_tab_off page_tab" + (F.IsPublished ? "_public" : (F.IsShared ? "_shared" : "")) + "_off" } else { if (App.IsMySite) { G.className = "page_tab_off page_tab_notmine" + (F.IsPublished ? "_public" : (F.IsShared ? "_shared" : "")) + "_off"; TabManager.hookDrag(A, G, E, B) } else { G.className = "page_tab_off page_tab_off" } } E.title = A.title = "Go to page '" + F.title + "'"; $ND(B) } if (F.title == "") { F.title = Lang.UNTITLED } T(E, F.title)
            }
        } MQ.add("ScrollRefresh", 100, false, ScrollManager.refresh)
    }, hookDrag: function (A, D, C, B) {
        $addEvent(A, "mousedown", new Func("TabManager.dragTab(event, this)")); if (Browser.isIE) { $addEvent(D, "mousedown", function (E) { $stopBubble(E); this.buttonDown = 1 }); $addEvent(D, "mouseup", function (E) { $stopBubble(E); this.buttonDown = 0 }); $addEvent(D, "mousemove", function (E) { if (this.buttonDown) { this.buttonDown = 0; TabManager.dragTab(E, this.parentNode) } }) } else { $addEvent(D, "mousedown", function (E) { $stopBubble(E); this.buttonDown = 1 }); $addEvent(D, "mouseup", function (E) { $stopBubble(E); this.buttonDown = 0 }); $addEvent(D, "mousemove", function (E) { if (this.buttonDown) { this.buttonDown = 0; TabManager.dragTab(E, this.parentNode) } }) } $addEvent(B, "mousedown", $stopBubble)
    }, disable: function () {
        TabManager.enabled = false;
        var D = $("tabs");
        for (var C = 0; C < D.childNodes.length; C++) {
            var A = D.childNodes[C];
            var F = A.firstChild;
            if (F == null) {
                continue
            }
            var E = F.firstChild;
            if (E == null) {
                continue
            }
            var B = E.nextSibling;
            $clearEvent(A);
            $clearEvent(F);
            $clearEvent(E);
            $clearEvent(B)
        }
    }, enable: function () {
        TabManager.enabled = true;
        TabManager.refresh()
    }, dispose: function () {
        var A = $("tabs");
        $removeAll(A)
    }
};

var PROFILE_PAGE_ORDER = "PageOrder";

P.insertModule = function (E, C, F, B) {
    var D = E.columns[B].div;
    var A = E.columns[B].modules;
    C.row = F; C.col = B; C.div.parentNode.removeChild(C.div);
    if (F == A.length) {
        D.appendChild(C.div)
    }
    else { D.insertBefore(C.div, A[F].div) }
    if (C.pageId != E.id) { App.moveModuleToPage(C, E) }
    else { E.addModule(C) }
    C.div.style.position = ""; C.div.style.width = "100%"; C.div.style.height = "auto"
};
P.removeModule = function (B, A) {
    B.removeModule(A.id); PU.changeParent(A.div, MODULE_CONTAINER)
};
P.makeSpaceForModule = function (D, B, A, F) {
    P.createDropPlaceholder(D, B);
    var C = P.findNearestColumn(D, B.col, A);
    if (C < 0) {
        C = parseInt(D.columnCount / 2)
    } 
    P.resizeDraggingModule(D, B, C);
    var E = P.findNearestRow(D.columns[C].modules, F); 
    P.moveDropPlaceholder(D, E, C)
};
P.findModuleAt = function (F, I, H) {
    var J = 65535; var D = null;
    var C = P.findNearestColumn(F, parseInt(F.columnCount / 2), I);
    for (var E = 0; E < F.modules.length; E++) {
        var B = F.modules[E];
        if (B.col == C) {
            var G = PU.getPosition(B.div);
            var A = Math.abs(G[1] - H); if (A < J) { J = A; D = B }
        }
    } return D
};
P.resizeDraggingModule = function (F, D, C) {
    return;
    var B = parseInt(D.div.style.width);
    var E = F.columns[C].width;
    if (B != E) {
        var A = B - E; D.div.style.width = E;
        D.div.style.left = window.event.clientX - (E / 2); D.drag.recalculateDelta()
    }
};
P.findNearestColumn = function (D, C, A) {
    for (var B = 0; B < D.columnCount; B++) {
        if (A > D.table.offsetLeft + D.columns[B].div.offsetLeft && A < D.table.offsetLeft + D.columns[B].div.offsetLeft + D.columns[B].div.offsetWidth) {
            return B
        }
    } return C
};
P.findNearestRow = function (A, F) { if (null == A) { return } var D = 10000; var C = 0; for (C = 0; C < A.length; C++) { var B = A[C]; var E = PU.getPosition(B.div); if (F <= E[1]) { break } } return C };
P.createDropPlaceholder = function (B, A) {
    if (App.dropPlaceholder == null) {
        App.dropPlaceholder = $$("DIV");
        App.dropPlaceholder.className = "dropplaceholder";
        App.dropPlaceholder.style.height = A.div.offsetHeight + "px"
    }
};
P.moveDropPlaceholder = function (B, C, A) {
    if (App.dropPlaceholder.row != C || App.dropPlaceholder.col != A) {
        if (!isNaN(App.dropPlaceholder.col)) {
            if (App.dropPlaceholder.parentNode == B.columns[App.dropPlaceholder.col].div) {
                B.columns[App.dropPlaceholder.col].div.removeChild(App.dropPlaceholder)
            }
        } if (C == B.columns[A].modules.length) {
            B.columns[A].div.appendChild(App.dropPlaceholder)
        } else
        { B.columns[A].div.insertBefore(App.dropPlaceholder, B.columns[A].modules[C].div) }
        App.dropPlaceholder.row = C; App.dropPlaceholder.col = A
    }
};
P.hideDropPlaceholder = function () {
    if (null != App.dropPlaceholder) {
        App.dropPlaceholder.parentNode.removeChild(App.dropPlaceholder);
        App.dropPlaceholder = null
    }
};
P.showLogs = function () { alert(P.buildLoadTimeLogs() + Log.items.join("\n")) };
P.buildLoadTimeLogs = function () {
    var A = new Date();
    return "Start Time: " + l.startDateTime + "\nEnd Time: " + l.endDateTime + "\nDuration: " + ((l.endDateTime.getTime() - l.startDateTime.getTime()) / 1000) + "\nOnline for: " + ((A.getTime() - l.startDateTime.getTime()) / 1000) + "\n"
};
P.showConfirmDialog = function (C, D, B, A) {
    PU.blockUI();
    App.hideAllControls();
    PU.centerDiv($("confirmDialog")); $("confirmDialog_title").innerHTML = C;
    $("confirmDialog_yes_title").innerHTML = D; $("confirmDialog_no_title").innerHTML = B;
    if (A) { $D("confirm_cancel_content") } else {
        $ND("confirm_cancel_content")
    } $visible("confirmDialog")
};
P.shiftPageLeft = function (A) {
    var C = App.getPageById(A); var B = App.pages[C.index - 1]; B.index++; C.index--; App.pages[C.index] = C;
    App.pages[B.index] = B; TabManager.create(); P.savePageOrder()
};
P.shiftPageRight = function (A) {
    var C = App.getPageById(A); var B = App.pages[C.index + 1]; B.index--; C.index++; App.pages[C.index] = C;
    App.pages[B.index] = B; TabManager.create(); P.savePageOrder()
};
P.orderPages = function () {
    var A = false; for (var B = 0; B < App.pages.length; B++) {
        if (App.pages[B].index != B) { A = true } App.pages[B].index = B
    }
};
P.moveModules = function (C, I, H) {
    var G = App.getPageById(C);
    var E = G.columns[I].modules;
    var A = G.columns[H].modules;
    var F = G.columns[H].div;
    for (var D = 0; D < E.length; D++) {
        var B = E[D];
        P.removeModule(G, B);
        P.insertModule(G, B, 0, H)
    } 
    I.modules = []
};
P.removeColumn = function (A, D) {
    var F = App.getPageById(A);
    var E = F.table.firstChild.firstChild;
    var H = E.childNodes[D];
    E.removeChild(H);
    var G = [];
    var C = 0;
    for (var B = 0; B < F.columnCount; B++) {
        if (B != D) {
            G[C++] = F.columns[B]
        } 
    }
    F.columns = G;
    F.columnCount--
};
P.addNewColumn = function (A, B) {
    var D = App.getPageById(A);
    var C = D.table.firstChild.firstChild;
    var E = $$("td");
    E.className = "column";
    C.appendChild(E);
    E.setAttribute("width", B);
    D.columns.add({ div: E, modules: [], width: B });
    D.columnCount++
};
P.setColumnWidth = function (A, D) {
    var E = App.getPageById(A);
    var C = E.table.firstChild.firstChild;
    for (var B = 0; B < D.length; B++) {
        var F = C.childNodes[B];
        F.setAttribute("width", D[B]);
        E.columns[B].width = D[B]
    }
    E.columnSizes = D;
    $fixTable(E.table)
};
P.savePageOrder = function () {
    var A = [];
    var C = [];
    for (var B = 0; B < App.pages.length; B++) {
        A[B] = { id: App.pages[B].id, index: App.pages[B].index };
        C[B] = App.pages[B].id
    }
    App.saveProfile(PROFILE_PAGE_ORDER, C.join(","))
};
P.hideConfirmDialog = function () {
    PU.unblockUI();
    $hide("confirmDialog");
    App.showAllControls()
};
P.onResize = function (A) {
    window.Width = PU.getViewportWidth();
    window.Height = PU.getViewportHeight();
    FeedViewer.ui_resetOutlookDefaultSize = true;
    MQ.add("FeedViewer.resizeRssViewer", 200, false, FeedViewer.resizeRssViewer);
    MQ.add("RssFlakeResizer.resizeGridView", 100, false, RssFlakeResizer.resizeAllGridView);
    MQ.add("ScrollRefresh", 100, false, ScrollManager.refresh)
};

var ValidateEmails = {
    isValidEmailList: function (C, B) {
        var D = C.trim().split(B);
        if ((D != null) && (D.length > 0)) {
            for (var A = 0; A < D.length; A++) {
                if (D[A].trim().length > 0) {
                    if (!this.isValidEmail(D[A].trim())) {
                        return false
                    } 
                } 
            } 
        }
        return true
    }, containsAValidEmail: function (C, B) {
        var D = C.trim().split(B);
        if ((D != null) && (D.length > 0)) {
            for (var A = 0; A < D.length; A++) {
                if (D[A].trim().length > 0) {
                    if (this.isValidEmail(D[A].trim())) {
                        return true
                    } 
                } 
            } 
        }
        return false
    }, isValidEmail: function (B) {
        var A = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return A.test(B)
    } 
};

