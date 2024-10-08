function WeatherLocation(C, B, A) {
    this.ID = C;
    this.Name = B;
    this.Enabled = (A == "1")
}
function WeatherComFlake(N) {
    var S = "flakes/WeatherComFlake/";
    var A = null;
    var B = null;
    var C = this;
    this.WeatherLocations = null;
    var M = "DEFAULTLOC";
    var R = "LOCID";
    var E = "LOCNAME";
    var T = "LOCCHK";
    var Q = "UNIT";
    var D = "SHOWCITIES";
    var P = "OPENLINKS";
    var I = "TABSELECT";
    var J = false;
    var H = null;
    var K = 0;
    var G = "";
    var O = 0;
    this.load = function(U) {
        var V = window.IMAGE_PREFIX;
        U.body.innerHTML = '<div id="' + N + 'weatherdata" style="display:none;padding-left:8px;padding-right:8px;padding-bottom:8px;"><div id="' + N + 'weathertabsdiv" style="margin:0 -8px;"><table cellpadding="0" cellspacing="0" style="width:100%;background-color:#646464;"><tr><td id="' + N + 'weathertabs" style="padding-top:6px;padding-left:8px;"></td></tr></table></div><div id="' + N + 'weatherlocations" style="clear:both;"></div></div><div id="' + N + 'noLocation" style="padding:0"> </div><table width="100%" cellspacing="0" cellpadding="2" style="background-image:url(flakes/WeatherComFlake/images/bg.png);height:38px;"><tr><td style="padding-top:16px;padding-right:8px;" align="right"><a id="' + N + 'twclogo_link" href="javascript:void(0)" target="_blank"><img src="' + V + 'flakes/WeatherComFlake/images/WeatherChannelLogo.gif" width="140" height="16" border="0" alt="Powered by weather.com" /></a></td></tr></table>';
        U.setEditArea('<table width="100%" cellpadding="0" cellspacing="0"><tr><td colspan="2"><div id="' + N + 'foundnothing" style="border:1px solid #666666;background-color:#FFFFCC;padding:8px;display:none;margin-bottom:8px;"><table><tr><td style="width:40px;text-align:center;padding-right:6px;vertical-align:top;"><img src="' + V + 'flakes/WeatherComFlake/images/nolocations.png" width="17" height="15"></img></td><td><div id="' + N + 'foundnothingmsg" style="font-weight:700;color:#CC0000;margin-bottom:4px;"></div><ul><li>Spelling correct?</li><li>Want to look up the next bigger city?</li><li>Need help? Email us at <a href="mailto:info@Pageflakes.com" target="_blank">info@Pageflakes.com</a>.</li></ul></td></tr></table></div></td></tr> <tr> <td colspan="2"> <div id="' + N + 'ALTLOC"></div> <div id="' + N + 'NEWLOC"></div> </td> </tr><tr><td class="edittd" style="border-top: #b3b3b3 1px solid;border-bottom: #b3b3b3 1px solid;padding:2px 8px 25px 2px;" colspan="2"><table><tr><td style="width:14px;"><img src="' + V + 'flakes/WeatherComFlake/images/add.png" alt="add" /></td><td align="left" valign="middle"><a href="javascript:void(0);" onclick="' + N + '.showAddLocation()"> Add Location </a></td></tr></table></td></tr><tr><td colspan="2"> <table border="0" cellpadding="2" cellspacing="2" style="width: 100%"> <tr><td align="left" style="width: 89px">Unit: </td><td align="left"><select id="' + N + 'unit"><option value="s">&deg;F</option><option value="m">&deg;C</option></select></td></tr><tr><td align="left" style="width: 89px; height: 24px">Show: </td><td align="left" style="height: 24px"><select id="' + N + 'showcities"><option value="all">all cities at once</option><option value="tabs">just one city with tabs</option></select></td></tr><tr><td align="left" style="width: 89px">Open links in: </td><td align="left"><select id="' + N + 'openlinks"><option value="new">new browser window</option><option value="same">this browser windows</option></select></td></tr><tr><td style="width: 89px">&nbsp;</td><td align="left"><input type="button" class="button" onclick="' + N + '.saveProfile();" value="Save" /> <input type="button" class="button cancel" onclick="' + N + '.cancelEdit();" value="Cancel" /></td></tr> </table></td></tr></table>');
        A = U;
        B = N;
        this.initUI();
        WeatherComService.GetComponents(A.internalId, F(this, this.onGetComponents), F(this, PU.dumpException))
    };
    this.onGetComponents = function(W) {
        this.WeatherLocations = new Array();
        for (var X = 0; X < W.Locations.length; X++) {
            var V = W.Locations[X];
            var Y = new WeatherLocation(V.ID, V.Name, V.Enabled);
            this.WeatherLocations.add(Y)
        }
        var U = PF.$(N + "weatherlocations");
        U.innerHTML = W.LocationHtml;
        PF.D(U);
        PF.D(PF.$(N + "weatherdata"));
        PF.$(N + "weathertabs").innerHTML = W.TabHtml;
        $(N + "weathertabsdiv").style.display = (A.Profiles[D] == "tabs") ? "block" : "none";
        if (A.Profiles[D] == "tabs") {
            this.showTab(A.Profiles[I])
        } A.Profiles[Q] = W.Unit;
        this.setEditEvent();
        this.loadOptions();
        this.setWeatherLinks()
    };
    this.initUI = function() {
        $("body" + N).style.padding = "0px";
        var U = A.$("noLocation");
        PF.ND(U);
        U.innerHTML = ""
    };
    this.setDefaultOptionsToProfile = function() {
        if (A.Profiles[Q] == null) { A.Profiles[Q] = "s" } if (A.Profiles[D] == null) { A.Profiles[D] = "all" } if (A.Profiles[P] == null) { A.Profiles[P] = "new" }
    }; this.loadOptions = function() { A.$("unit").value = A.Profiles[Q]; A.$("showcities").value = A.Profiles[D]; A.$("openlinks").value = A.Profiles[P] }; this.tryGetWeather = function(V) { G = V; var U = "http://Pageflakes.weather.com/search/search?where=" + encodeURIComponent(V); App.ContentProxy.GetUrl(U, F(this, this.onTryGetWeather)) }; this.onTryGetWeather = function(U) { var W = PageflakesUtility.getXmlDoc(U); var V = W.documentElement.getElementsByTagName("loc"); if (V.length > 0) { this.foundLocation(V); K = 0 } else { if (!L) { K++; this.setupDefaultLocation() } else { this.showLocationNotFound(G) } } L = false }; this.showLocationNotFound = function(U) { this.showAddError('No weather information for "' + U + '" is available.') }; this.showAddError = function(U) { $(B + "foundnothingmsg").innerHTML = U; $display($(B + "foundnothing")) }; this.findMatchingLocation = function(U, W) { var b = U.split(","); if (b.length < 2) { return null } var Y = b[0]; var d = b[1]; for (var Z = 0; Z < W.length; Z++) { var a = W[Z].firstChild.data; var e = a.split(","); if (e.length >= 2) { var V = e[0]; var f = e[1]; if ($trim(Y) == $trim(V) && $trim(d) == $trim(f)) { var c = W[Z].getAttribute("id"); var X = new WeatherLocation(c, a, true); return X } } } return null }; this.foundLocation = function(W) { $nodisplay($(B + "foundnothing")); var X; if (W.length > 1) { X = this.findMatchingLocation(G, W) } else { var V = W[0].firstChild.data; var U = W[0].getAttribute("id"); X = new WeatherLocation(U, V, true) } if (X == null) { return } if (this.locationAlreadyExists(X)) { this.showAddError("The Location already exists."); return } if (this.WeatherLocations == null) { this.WeatherLocations = new Array() } this.WeatherLocations.add(X); if (A.Profiles[M] == null) { A.Profiles[M] = X.Name } this.setWeatherLocationToProfile(); this.setDefaultOptionsToProfile(); A.save(F(this, this.onSaveNoToggle)); this.showSavedLocations() }; this.locationAlreadyExists = function(X) { if (this.WeatherLocations == null) { return false } var W = X.ID.toLowerCase(); for (var V = 0; V < this.WeatherLocations.length; V++) { var U = this.WeatherLocations[V]; if (U.ID.toLowerCase() == W) { return true } } return false }; this.setWeatherLocationToProfile = function() { if (this.WeatherLocations == null) { return } var Y = new Array(); var W = new Array(); var V = new Array(); for (var X = 0; X < this.WeatherLocations.length; X++) { var U = this.WeatherLocations[X]; Y.add(U.ID); W.add(U.Name); V.add(U.Enabled ? "1" : "0") } A.Profiles[R] = Y.join("|"); A.Profiles[E] = W.join("|"); A.Profiles[T] = V.join("|") }; this.showTab = function(X) { var V = false; for (var W = 0; W < this.WeatherLocations.length; W++) { var U = this.WeatherLocations[W]; if (U.Enabled) { if (U.ID == "[none]") { continue } if ($(N + "tabli" + W)) { $(N + "tabli" + W).style.backgroundColor = (X == W) ? "#ffffff" : "#646464" } if ($(N + "taba" + W)) { $(N + "taba" + W).style.color = (X == W) ? "#000000" : "#ffffff" } if (X == W) { $D(N + "tabcontent" + W) } else { $ND(N + "tabcontent" + W) } } } if (!this.WeatherLocations[X].Enabled && X > 0) { V = true; this.showTab(X - 1) } if (!this.WeatherLocations[X].Enabled && X == 0) { V = true; this.showTab(X + 1) } else { if (this.WeatherLocations[X].Name == "[none]") { V = true; this.showTab(X + 1) } else { A.Profiles[I] = X; if (O || V) { A.save() } O = 1 } } }; this.showAddLocation = function() { J = true; var U = new Array(); U.add('<table border="0" cellpadding="2" cellspacing="0" style="width: 100%;border-top: #b3b3b3 1px solid;"><tr><td style="width: 11px;" ><input id="'); U.add(N); U.add('ALTCHK_n" type="checkbox" checked="checked" /></td><td align ="left" id="'); U.add(N); U.add('newLocContainer"><div id="'); U.add(N); U.add('newGeoBox"><input id="'); U.add(N); U.add('ATLText_n" type="text" value="Enter city or US ZIP code" style="color:Gray;width:160px;" onfocus="'); U.add(N); U.add('.enableLocBox()" onblur="'); U.add(N); U.add('.setNewLocation()" /></div></td></tr></table>'); $(N + "NEWLOC").innerHTML = U.join(""); if (typeof GeoLocation != "undefined") { H = new GeoLocation($(N + "ATLText_n"), false, RenderMode.TABULAR, false) } }; var L = false; this.setNewLocation = function() { var U = this.getGeoLocationFromInput(); if (H.City.length == 0) { return } L = true; this.tryGetWeather(U) }; this.getGeoLocationFromInput = function() { H.parseLocation(); var U = $(N + "ATLText_n").value; var V = H.City; if (H.Country == "US" || H.Country == "USA") { V += ", " + H.State } else { if (H.Country == "UK" || H.Country == "GB") { V += ", United Kingdom" } else { V += ", " + H.Country } } return V }; this.enableLocBox = function() { if (J == true) { $(N + "ATLText_n").style.color = "black"; $(N + "ATLText_n").value = "" } }; this.setEditEvent = function() { if (!A._toggleEdit) { A._toggleEdit = A.toggleEdit; A.toggleEdit = function() { if (!A.page.CanEditFlake) { return } C.showSavedLocations(); A._toggleEdit() } } }; this.setWeatherLinks = function() { linktarget = (A.Profiles[P] == "new") ? "_blank" : ""; $(B + "twclogo_link").href = "http://www.weather.com?par=pageflakesxml&site=Pageflakes&cm_ven=bd_select&cm_cat=pageflakesxml&cm_pla=Pageflakes&cm_ite=HomePage"; $(B + "twclogo_link").target = linktarget }; this.showSavedLocations = function() { var X = ""; for (var W = 0; W < this.WeatherLocations.length; W++) { var V = this.WeatherLocations[W]; var Z = ""; var Y = ""; if (this.WeatherLocations.length > 1) { delhtml = "<div style='float:right;'><a id='" + N + "DELBTN_" + W + "' href='javascript:void(0);' onclick='" + N + ".deleteLocation(" + W + ");' title='Click to delete this location'><img src='" + S + "images/delete.png' class='WC_delButton' height='14' border='0'></a></div>" } else { delhtml = "" } if (V.Enabled) { Z = "checked" } else { Z = "" } if (this.WeatherLocations.length == 2 && this.WeatherLocations[0].ID == "[none]") { Y = "disabled" } var U = '<table border="0" cellpadding="2" cellspacing="0"><tr><td style="width: 11px;" ><input id="' + N + "ALTCHK_" + W + '" type="checkbox" onclick="' + N + ".toggleLocation(" + W + ')" ' + Z + " " + Y + '/></td><td align ="left">' + V.Name + "</td></tr></table>"; X += "<div style='border-top:1px solid #b3b3b3;'>" + delhtml + U + "</div>" } PF.$(B + "ALTLOC").innerHTML = X; PF.$(B + "NEWLOC").innerHTML = ""; this.manageLocationToggle() }; this.saveProfile = function() { A.Profiles[Q] = $(B + "unit").value; if (A.Profiles[D] != $(B + "showcities").value) { A.Profiles[I] = 0 } A.Profiles[D] = $(B + "showcities").value; A.Profiles[P] = $(B + "openlinks").value; if (A.Profiles[I] >= this.WeatherLocations.length) { A.Profiles[I] = 0 } this.setWeatherLocationToProfile(); A.save(F(this, this.onSave)) }; this.onSave = function() { WeatherComService.GetComponents(A.internalId, F(this, this.onGetComponents), F(this, PU.dumpException)); $nodisplay($(B + "foundnothing")); if (!$isVisible($("body" + B))) { A._toggleEdit() } }; this.onSaveNoToggle = function() { WeatherComService.GetComponents(A.internalId, F(this, this.onGetComponents), F(this, PU.dumpException)) }; this.cancelEdit = function() { $nodisplay($(B + "foundnothing")); A._toggleEdit(); WeatherComService.GetComponents(A.internalId, F(this, this.onGetComponents), F(this, PU.dumpException)) }; this.deleteLocation = function(U) { this.WeatherLocations.removeAt(U); this.setWeatherLocationToProfile(); A.Profiles[I] = 0; A.save(F(this, this.onSaveNoToggle)); this.showSavedLocations() }; this.toggleLocation = function(U) { if (this.WeatherLocations == null) { return } var V = this.WeatherLocations[U]; if (V != null) { V.Enabled = !V.Enabled } this.manageLocationToggle() }; this.manageLocationToggle = function() { var X = 0; var a = -1; for (var V = 0; V < this.WeatherLocations.length; V++) { if (this.WeatherLocations[V].Enabled) { a = V; X++ } } if (X == 1 && a > -1) { if (this.WeatherLocations[a] != null) { var Z = PF.$(N + "ALTCHK_" + a); if (Z != null) { Z.disabled = true } var U = PF.$(N + "DELBTN_" + a); if (U != null) { U.disabled = true } } } else { for (var V = 0; V < this.WeatherLocations.length; V++) { var W = PF.$(N + "ALTCHK_" + V); if (W != null) { W.disabled = false } var Y = PF.$(N + "DELBTN_" + V); if (Y != null) { Y.disabled = false } } } }
}
var WeatherComService = function() {
    WeatherComService.initializeBase(this);
    this._timeout = 0;
    this._userContext = null;
    this._succeeded = null;
    this._failed = null
};
WeatherComService.prototype = {
    GetComponents: function(C, B, A, D) {
        return this._invoke(WeatherComService.get_path(), "GetComponents", true, { flakeId: C }, B, A, D)
    }
};
WeatherComService.registerClass("WeatherComService", Sys.Net.WebServiceProxy);
WeatherComService._staticInstance = new WeatherComService();
WeatherComService.set_path = function(A) {
    WeatherComService._staticInstance.set_path(A)
};
WeatherComService.get_path = function() {
    return WeatherComService._staticInstance.get_path()
};
WeatherComService.set_timeout = function(A) {
    WeatherComService._staticInstance.set_timeout(A)
};
WeatherComService.get_timeout = function() {
    return WeatherComService._staticInstance.get_timeout()
};
WeatherComService.set_defaultUserContext = function(A) {
    WeatherComService._staticInstance.set_defaultUserContext(A)
};
WeatherComService.get_defaultUserContext = function() {
    return WeatherComService._staticInstance.get_defaultUserContext()
};
WeatherComService.set_defaultSucceededCallback = function(A) {
    WeatherComService._staticInstance.set_defaultSucceededCallback(A)
};
WeatherComService.get_defaultSucceededCallback = function() {
    return WeatherComService._staticInstance.get_defaultSucceededCallback()
};
WeatherComService.set_defaultFailedCallback = function(A) {
    WeatherComService._staticInstance.set_defaultFailedCallback(A)
};
WeatherComService.get_defaultFailedCallback = function() {
    return WeatherComService._staticInstance.get_defaultFailedCallback()
};
WeatherComService.set_path("/flakes/WeatherComFlake/WeatherComServices.soap");
WeatherComService.GetComponents = function(B, C, A, D) {
    WeatherComService._staticInstance.GetComponents(B, C, A, D)
};


var FlickrService = function() {
    FlickrService.initializeBase(this);
    this._timeout = 0;
    this._userContext = null;
    this._succeeded = null;
    this._failed = null
};
FlickrService.prototype = {
    ParseLocationXML: function(B, C, A, D) {
        return this._invoke(FlickrService.get_path(), "ParseLocationXML", false, { details: B }, C, A, D)
    }
};
FlickrService.registerClass("FlickrService", Sys.Net.WebServiceProxy);
FlickrService._staticInstance = new FlickrService();
FlickrService.set_path = function(A) {
    FlickrService._staticInstance._path = A
};
FlickrService.get_path = function() {
    return FlickrService._staticInstance._path
};
FlickrService.set_timeout = function(A) {
    FlickrService._staticInstance._timeout = A
};
FlickrService.get_timeout = function() {
    return FlickrService._staticInstance._timeout
};
FlickrService.set_defaultUserContext = function(A) {
    FlickrService._staticInstance._userContext = A
};
FlickrService.get_defaultUserContext = function() {
    return FlickrService._staticInstance._userContext
};
FlickrService.set_defaultSucceededCallback = function(A) {
    FlickrService._staticInstance._succeeded = A
};
FlickrService.get_defaultSucceededCallback = function() {
    return FlickrService._staticInstance._succeeded
};
FlickrService.set_defaultFailedCallback = function(A) {
    FlickrService._staticInstance._failed = A
};
FlickrService.get_defaultFailedCallback = function() {
    return FlickrService._staticInstance._failed
};
FlickrService.set_path("/flakes/kishore/Flickr/FlickrService.soap");
FlickrService.ParseLocationXML = function(B, C, A, D) {
    FlickrService._staticInstance.ParseLocationXML(B, C, A, D)
};
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
if (typeof (FlickrObject) === "undefined") {
    var FlickrObject = gtc("FlickrObject");
    FlickrObject.registerClass("FlickrObject")
}
function FlickrPhotosFlake_v0(id) {
    var instance;
    var profile;
    var defaultLocs = new Array(1);
    var OPTION = "profile-option";
    var INPUT = "profile-input";
    var USERNAME = "profile-username";
    var MORE_OPTIONS = "profile-more-options";
    var DISPLAY_OPTION = "profile-display-option";
    var MY_STARRED_PHOTOS = "profile-my-starred-photos";
    var FLICKR_PHOTOS_FEED = "profile-flickr-photos-feed";
    var EMPTY = "";
    var SHOW = "";
    var HIDE = "none";
    var imageSize = "";
    var FLICKR_API_KEY = "67a0bdf6edc20f2cd9a922e4c1afb005";
    var FLICKR_SERVER_URL = "http://static.flickr.com/";
    var PAGEFLAKES_PHOTOVIEWER = SITE_PREFIX + "AddFlake.aspx?Title=Photo Viewer&url=flakes/kishore/flickr/photoView/flake.aspx";
    var FLICKR_PHOTO_URL = "http://www.flickr.com/photos/";
    var photos = [];
    var pageIndex = 0;
    var favoritePhotos;
    var _self = this;
    var forcedToSinglePhotoView = false;
    var shareTimerID;
    var tagsforLocation = "";
    var DEFAULT_SHARE_CLOSE_TIME_OUT = 60000;
    var PHOTO_SHARING_TEMPLATE = "FlickrTemplate";
    var PHOTO_SHARE_EMAIL_MESSAGE = "FLICKR_SHARE_EMAIL_MESSAGE";
    var ContentTypeEnum = { TEXT: 0, HTML: 1 };
    var counter = 0;
    var IMG_SRC_REGEXP = /img src=\"((.|\.)*?)\"/;
    var URL_REGEXP = /a href=\"((.|\.)*?)\"/;
    var STARTS_WITH_HTTP_REGEXP = /^http:\/\//;
    var STARTS_WITH_FEED_REGEXP = /^feed:\/\//;
    var FAV_IMG_SRC_REGEXP = /^http:\/\/static\.flickr\.com\/((.|\.)*?)_(m|s)\.jpg$/;
    var FAV_IMG_SRC_REGEXP_FEED = /^http:\/\/farm[0-9]\.static\.flickr\.com\/((.|\.)*?)_(m|s)\.jpg$/;
    var IMG_ID_REGEXP = /^.*\/(.*?)_.*$/;
    var PhotoOptionEnum = {
        MOST_RECENT: "most_recent", INTERESTING: "interesting", MY_STARRED_PHOTOS: "my_starred_photos", ENTER_LOC: "enter_loc", ENTER_TAG: "enter_tag", PHOTOS_FROM_FLICKR_USER: "photos_from_flickr_user", THIS_FLICKR_FEED: "this_flickr_feed"
    };
    var FeedEnum = {
        FETCH: "fetch", USE_FROM_PROFILE: "use_from_profile", USE_FROM_PROFILE_AND_UPDATE_FEED: "use_from_profile_and_update_feed"
    };
    var PhotoDisplayOptionEnum = {
        TILED: "0", SINGLE: "1"
    };
    var FavoritePhotoEnum = {
        STARRED: IMAGE_PREFIX + "flakes/kishore/flickr/images/starred.gif", UNSTARRED: IMAGE_PREFIX + "flakes/kishore/flickr/images/notstarred.gif"
    };
    var FavoritePhotoTitleEnum = {
        STARRED: "Click to mark as favorite", UNSTARRED: "Click to un-mark as favorite"
    };
    var ELS;
    var Photo = function(src, title, flickrUrl) {
        this.src = src;
        this.title = title;
        this.flickrUrl = flickrUrl
    };
    var FlickrUrlEnum = {
        LOCATION_TAG: "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=all&tags=", MOST_RECENT: "http://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + FLICKR_API_KEY, INTERESTING: "http://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=" + FLICKR_API_KEY, ENTER_TAG: "http://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_API_KEY + "&tags=", FIND_BY_USERNAME: "http://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=" + FLICKR_API_KEY + "&username=", FIND_BY_EMAIL: "http://www.flickr.com/services/rest/?method=flickr.people.findByEmail&api_key=" + FLICKR_API_KEY + "&find_email=", PHOTOS_FROM_FLICKR_USER: "http://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + FLICKR_API_KEY + "&user_id="
    };
    var share_with_friend = "";
    var sharelink = "";
    this.load = function(flakeInstance) {
        flakeInstance.setIcon(IMAGE_PREFIX + "images/flakes/FlickrIcon.gif");
        flakeInstance.setEditArea('<div id="' + id + 'edit" width="100%"><table width="100%" cellpadding="4"><tr><td width="5%" valign="top"><b>Show:</b></td><td valign="top"><table cellpadding="1" cellspacing="0"><tr><td><input id="' + id + 'interesting" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="interesting"/></td><td>Interesting</td></tr><tr><td width="1%"><input id="' + id + 'most_recent" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="most_recent"/></td><td width="99%">Most recent</td></tr><tr><td width="1%" valign="top"><input id="' + id + 'enter_loc" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="enter_loc"/></td><td valign="top" width="1%"><div>Enter Location</div><div><input id="' + id + 'enter_loc_text" onKeyDown="' + id + '.handleEnter(event)" type="text" size="25"/></div><span id="' + id + 'enter_loc_error" style="display:none;color:#ff0000;font-size:-2"></span><div><font size="-2">e.g. sanfrancisco california</font></div></td></tr><tr><td width="1%" valign="top"><input id="' + id + 'enter_tag" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="enter_tag"/></td><td valign="top" width="1%"><div>Enter tag</div><div><input id="' + id + 'enter_tag_text" onKeyDown="' + id + '.handleEnter(event)" type="text" size="25"/></div><span id="' + id + 'enter_tag_error" style="display:none;color:#ff0000;font-size:-2"></span><div><font size="-2">e.g. colorful nature people</font></div></td></tr><tr id="' + id + 'my_starred_photos_tr" style="display:none"><td width="1%"><input id="' + id + 'my_starred_photos" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="my_starred_photos"/></td><td width="99%">My starred photos</td></tr><tr><td colspan="2" valign="top"><div id="' + id + 'more_options"><table width="100%" cellpadding="1" cellspacing="0"><tr><td valign="top" width="1%"><input id="' + id + 'photos_from_flickr_user" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="photos_from_flickr_user"/></td><td valign="top" width="99%"><div>Photos from this Flickr user:</div><div><input id="' + id + 'photos_from_flickr_user_text" onKeyDown="' + id + '.handleEnter(event)" type="text" size="25"/></div><span id="' + id + 'photos_from_flickr_user_error" style="display:none;color:#ff0000;font-size:-2"></span><div><font size="-2">e.g. Edgar Yang or user@example.com</font></div></td></tr><tr><td valign="top" width="1%"><input id="' + id + 'this_flickr_feed" type="radio" name="' + id + 'radio_group" onclick="' + id + '.clearErrors()" value="this_flickr_feed"/></td><td valign="top" width="99%"><div>This Flickr feed(URL):</div><div><input id="' + id + 'this_flickr_feed_text" onKeyDown="' + id + '.handleEnter(event)" type="text" size="25"/></div><span id="' + id + 'this_flickr_feed_error" style="display:none;color:#ff0000;font-size:-2"></span></span></td></tr></table></div><span id="' + id + 'more_options_text" style="padding-left:5px;cursor:hand;cursor:pointer;font-size:-2;color:#0000ff;text-decoration:underline" onclick="' + id + '.toggleMoreOptions()"></span></td></tr></table></td></tr><tr><td><b>Display:<b></td><td style="padding-left:10px"><select id="' + id + 'display"> <option value="0">Tiled (3 x 3)</option> <option value="1">Single photo</option> </select></td></tr><tr><td>&nbsp;</td><td><table width="100%" cellpadding="1" cellspacing="0"><tr><td style="padding-left:5px" colspan="2"><input class="button" id="' + id + 'save" type="button" onclick="' + id + '.saveProfile();" value="Save"/>&nbsp;<input class="button cancel" id="' + id + 'cancel" type="button" onclick="' + id + '.cancelEdit();" value="Cancel"/></td></tr></table></td></tr></table></div>'); instance = flakeInstance; profile = instance.Profiles; if (profile[FLICKR_PHOTOS_FEED] != null) { profile[FLICKR_PHOTOS_FEED] = null; window.setTimeout(function() { instance.save() }, 10000) } instance.enableRefresh(); sharelink = "Send to a friend"; share_with_friend = '<span id="' + id + 'share_link" style="text-decoration: none; color: navy;" onmouseout="' + id + '.setOutStyle()" onmouseover="' + id + '.setStyle()" onclick="' + id + '.showShare()">' + sharelink + "</span>";
        var I = window.IMAGE_PREFIX; flakeInstance.body.innerHTML = '<div id="' + id + 'photo_display" style="padding-top:5px; height:200px;vertical-align:middle;overflow:hidden" align="center"></div><div id="' + id + 'photo_navigation" align="center" style="padding-top:6px"><table cellpadding="0" width="100%"><tr><td width="50%" align="right"><img id="' + id + 'photo_navigation_empty" src="' + I + 'flakes/kishore/flickr/images/empty.gif" border="0"/><img id="' + id + 'photo_navigation_prev" style="padding:2px;cursor:hand;cursor:pointer;margin:0px" src="' + I + 'flakes/kishore/Flickr/images/actPrev.gif" title="Previous" alt="Previous" border="0" onclick="' + id + '.decrementPageCounterAndDisplayPhoto()"></td><td align="left" width="34px"><img id="' + id + 'photo_navigation_empty" src="' + I + 'flakes/kishore/flickr/images/empty.gif" border="0"/><img id="' + id + 'photo_navigation_next" title="Next" alt="Next" src="' + I + 'flakes/kishore/Flickr/images/actNext.gif" border="0" style="padding:2px;cursor:hand;cursor:pointer;margin:0px" onclick="' + id + '.incrementPageCounterAndDisplayPhoto()"></td><td nowrap="nowrap" valign="bottom" align="right" style="margin:0px"><div id="' + id + 'share_div">' + share_with_friend + '</div></td></tr></table></div><div id="' + id + 'share" style="display:none;background-color:#e4ecf4;padding:8px 8px 8px 8px"><div id="' + id + 'ss" style="padding:4px 4px 4px 4px;background-color:#ffffcc;display:none;background-color:#ffffdd"></div><div style="padding-bottom:8px"><div style="font-weight:bold">Friend\'s Name :</div><input type="text" id="' + id + 'flickrFriendName" style="width:90%;height:15px;border:1px solid #7f9db9;"><div style="font-weight:bold">Friend\'s Email Address :</div><div><input type="text" id="' + id + 'emails" style="width:90%;height:15px;border:1px solid #7f9db9;"><div style="line-height:1em;font-size:0.9em;">Separate multiple addresses by commas.</div><div style="line-height:1.2em;font-size:0.9em;">Your friends\' email addresses are safe. No spam, ever.</div></div></div><div style="padding-bottom:8px"><div><span style="font-weight:bold;padding-right:4px;">Your first name</span><span>(optional)</span></div><input type="text" id="' + id + 'sfn" style="width:90%;height:15px;border:1px solid #7f9db9;"></div><div><input type="button" onclick="' + id + '.sendPhotoShareEmail()" value="Send">&nbsp;<input type="button" onclick="' + id + '.closeShare()" value="Cancel"></div></div>';
        var addURL = typeof (instance.url) == "undefined" ? "" : instance.url; addURL = addURL.substr(addURL.indexOf("?") + 1);
        var URLArrays = null; URLArrays = addURL.split("=");
        var useLocation = null;
        var useTag = null;
        if (URLArrays[0].toLowerCase() == "tag") {
            useTag = 1
        }
        if (useTag == null) {
            try {
                if (App.My.Country == "USA") {
                    if (App.My.City != "" && App.My.State != "") {
                        defaultLocs[0] = App.My.City.toLowerCase() + " " + App.My.State.toLowerCase()
                    }
                }
                else {
                    if (App.My.City != "" && App.My.Country != "") {
                        defaultLocs[0] = App.My.City.toLowerCase() + " " + App.My.Country.toLowerCase()
                    }
                }
                if (defaultLocs[0] == "" || defaultLocs[0] == null) {
                    defaultLocs = null
                }
            }
            catch (e) {
                defaultLocs = null
            }
        }
        else {
            if (useTag == 1) {
                this.setProfileDefault(OPTION, PhotoOptionEnum.ENTER_TAG);
                URLArrays[1] = URLArrays[1].split(",");
                var tagsforuser = "";
                for (var ind = 0; ind < URLArrays[1].length; ind++) {
                    if (ind < (URLArrays[1].length - 1)) {
                        tagsforuser += URLArrays[1][ind].trim() + ", "
                    }
                    else {
                        tagsforuser += URLArrays[1][ind].trim()
                    }
                }
                if (tagsforuser[tagsforuser.length - 1] == " " && tagsforuser[tagsforuser.length - 2] == ",") {
                    tagsforuser = tagsforuser.substring(0, tagsforuser.length - 2)
                }
                this.setProfileDefault(INPUT, tagsforuser)
            }
        }
        if (defaultLocs != null && useTag == null) {
            this.setProfileDefault(OPTION, PhotoOptionEnum.ENTER_LOC);
            tagsforLocation += defaultLocs[0].trim();
            this.setProfileDefault(INPUT, tagsforLocation)
        }
        else {
            if (defaultLocs == null && useTag == null) {
                this.setProfileDefault(OPTION, PhotoOptionEnum.INTERESTING);
                this.setProfileDefault(INPUT, EMPTY)
            }
        }
        this.setProfileDefault(MORE_OPTIONS, HIDE);
        this.setProfileDefault(USERNAME, EMPTY);
        this.setProfileDefault(DISPLAY_OPTION, PhotoDisplayOptionEnum.SINGLE);
        this.setProfileDefault(MY_STARRED_PHOTOS, "{}");
        ELS = {};
        for (var key in PhotoOptionEnum) {
            var v = PhotoOptionEnum[key]; ELS[v] = {
                RADIO: $(id + v), INPUT: $(id + v + "_text"), ERROR: $(id + v + "_error"), DEFAULT_ERROR: this.getDefaultErrorMessage(v)
            }
        }
        for (var key in ELS) {
            var els = ELS[key];
            if (els.RADIO) {
                if (mz) {
                    els.RADIO.style.margin = "4px 4px 0px 0px"
                }
                else {
                    els.RADIO.style.margin = "0px 0px 0px -4px"
                }
            }
        }
        $PageFlakesHelper.addRefreshLink(id, "displayPhotos");
        this.loadProfile();
        this.setTitle(profile[OPTION]);
        this.displayPhotos(FeedEnum.FETCH);
        if (!instance._toggleEdit) {
            instance._toggleEdit = instance.toggleEdit;
            instance.toggleEdit = $PageFlakesHelper.bind(function() {
                this.loadProfile();
                instance._toggleEdit()
            }, this)
        }
    };
    this.refresh = function() { this.loadProfile(); this.displayPhotos(FeedEnum.FETCH); if (!instance._toggleEdit) { instance._toggleEdit = instance.toggleEdit; instance.toggleEdit = $PageFlakesHelper.bind(function() { this.loadProfile(); instance._toggleEdit() }, this) } };
    this.setProfileDefault = function(key, defaultValue) { if (profile[key] == null) { profile[key] = defaultValue } };
    this.setStyle = function() { var obj = $(id + "share_link"); obj.style.color = "Red"; obj.style.cursor = "hand"; obj.style.cursor = "pointer" };
    this.setOutStyle = function() { var obj = $(id + "share_link"); obj.style.color = "navy" };
    this.getDefaultErrorMessage = function(v) { if (v == PhotoOptionEnum.ENTER_TAG) { return "Please enter a tag." } else { if (v == PhotoOptionEnum.ENTER_LOC) { return "Please enter location." } else { if (v == PhotoOptionEnum.PHOTOS_FROM_FLICKR_USER) { return "Please enter an user." } else { if (PhotoOptionEnum.THIS_FLICKR_FEED) { return "Please enter a Flickr feed." } } } } };
    this.setTitle = function(ro) { var title = ""; if (instance.title != "" || instance.title != null) { title = instance.title } if (title == "Flickr" || title == "Interesting photos" || title == "New photos" || title.indexOf("Photos for ") == 0 || title.indexOf("Photos from") == 0 || title == "My starred photos" || title == "Flickr photos") { if (ro == PhotoOptionEnum.INTERESTING) { title = "Interesting photos" } else { if (ro == PhotoOptionEnum.MOST_RECENT) { title = "New photos" } else { if (ro == PhotoOptionEnum.ENTER_TAG) { var tags_ = profile[INPUT].split(" "); var titleTag = ""; for (var i = 0; i < tags_.length; i++) { if ((tags_[i].trim()) != "") { if (i < tags_.length - 1) { titleTag += tags_[i].trim() + " " } else { titleTag += tags_[i].trim() } } } title = "Photos for " + titleTag } else { if (ro == PhotoOptionEnum.ENTER_LOC) { var tags_ = profile[INPUT].split(" "); var titleTag = ""; for (var i = 0; i < tags_.length; i++) { if ((tags_[i].trim()) != "") { if (i < tags_.length - 1) { titleTag += tags_[i].trim() + " " } else { titleTag += tags_[i].trim() } } } if ((tagsforLocation == titleTag) && (typeof (App.My.City) != "undefined")) { titleTag = App.My.City.toLowerCase() } title = "Photos for " + titleTag } else { if (ro == PhotoOptionEnum.PHOTOS_FROM_FLICKR_USER) { title = "Photos from " + profile[INPUT] } else { if (ro == PhotoOptionEnum.MY_STARRED_PHOTOS) { title = "My starred photos" } else { title = "Flickr photos" } } } } } } instance.setTitle(title) } };
    this.showImageSmoothly = function(imgObject) { var OPACITY = { IMG: imgObject }; var timerid = setInterval(function() { try { var count = mz ? (OPACITY.IMG.style.MozOpacity * 100) : OPACITY.IMG.filters.alpha.opacity; count += 5; if (count <= 100) { if (mz) { OPACITY.IMG.style.MozOpacity = (count / 100) } else { OPACITY.IMG.filters.alpha.opacity = count } } else { clearInterval(OPACITY.TIMER) } } catch (e) { } }, 25); OPACITY.TIMER = timerid };
    this.handleEnter = function(e) { var key; if (e.which) { key = e.which } else { if (e.keyCode) { key = e.keyCode } } if (key == 13) { this.saveProfile() } };

    this.loadProfile = function() {
        var moreOptionsElement = $(id + "more_options");
        var photoDisplayOptionElement = $(id + "display");
        var myStarredPhotosElement = $(id + "my_starred_photos_tr");
        var ro = profile[OPTION];
        this.clearAll();
        moreOptionsElement.style.display = profile[MORE_OPTIONS];
        this.setMoreOptionsText();
        for (var key in ELS) {
            var inputElement = ELS[key].INPUT;
            if (key == ro) {
                ELS[key].RADIO.checked = true;
                if (inputElement) {
                    inputElement.disabled = false;
                    inputElement.style.backgroundColor = "#ffffff";
                    inputElement.value = profile[INPUT]
                }
            }
            else {
                if (inputElement) {
                    inputElement.disabled = true;
                    inputElement.style.backgroundColor = "#d4d2cc"
                }
            }
        }
        photoDisplayOptionElement.value = profile[DISPLAY_OPTION];
        favoritePhotos = eval("(" + profile[MY_STARRED_PHOTOS] + ")");
        myStarredPhotosElement.style.display = this.hasFavorites() ? SHOW : HIDE
    };
    this.toggleMoreOptions = function() { var moreOptionsElement = $(id + "more_options"); moreOptionsElement.style.display = (moreOptionsElement.style.display == SHOW) ? HIDE : SHOW; this.setMoreOptionsText() };
    this.setMoreOptionsText = function() { var moreOptionsElement = $(id + "more_options"); var moreOptionsTextElement = $(id + "more_options_text"); moreOptionsTextElement.innerHTML = (moreOptionsElement.style.display == SHOW) ? "Fewer options" : "More options" };
    this.clearAll = function() { for (var elKey in ELS) { var el = ELS[elKey]; el.RADIO.checked = false; var inputElement = el.INPUT; if (inputElement) { inputElement.value = EMPTY } var errorElement = el.ERROR; if (errorElement) { $ND(errorElement) } } };
    this.clearErrors = function() { for (var elKey in ELS) { var el = ELS[elKey]; var errorElement = el.ERROR; if (errorElement) { $ND(errorElement) } if (el.RADIO.checked) { if (el.INPUT) { el.INPUT.disabled = false; el.INPUT.style.backgroundColor = "#ffffff" } } else { if (el.INPUT) { el.INPUT.disabled = true; el.INPUT.style.backgroundColor = "#d4d2cc" } } } };

    this.saveProfile = function() {
        var noErrors = true;
        var radioValue;
        var inputValue = "";
        var selectedEl;
        for (var elKey in ELS) {
            var el = ELS[elKey];
            if (Boolean(el.RADIO.checked)) {
                selectedEl = el;
                radioValue = el.RADIO.value;
                if (el.INPUT) {
                    inputValue = el.INPUT.value;
                    if ($PageFlakesHelper.trim(inputValue) == EMPTY) {
                        noErrors = false;
                        el.ERROR.innerHTML = el.DEFAULT_ERROR;
                        el.ERROR.style.display = ""
                    }
                }
                break
            }
        }
        if (noErrors) {
            if (radioValue == PhotoOptionEnum.PHOTOS_FROM_FLICKR_USER) {
                var findUser = (inputValue.indexOf("@") == -1) ? FlickrUrlEnum.FIND_BY_USERNAME : FlickrUrlEnum.FIND_BY_EMAIL;
                App.ContentProxy.GetUrl(findUser + inputValue, F(this, this.saveProfileSuccess))
            }
            else {
                var moreOptionsElement = $(id + "more_options");
                var photoDisplayOptionElement = $(id + "display");
                profile[OPTION] = radioValue;
                profile[INPUT] = inputValue;
                profile[MORE_OPTIONS] = moreOptionsElement.style.display;
                profile[DISPLAY_OPTION] = photoDisplayOptionElement.value;
                forcedToSinglePhotoView = false;
                instance.save();
                this.closeShare();
                instance._toggleEdit();
                this.displayPhotos(FeedEnum.FETCH);
                this.setTitle(profile[OPTION])
            }
        }
    };

    this.saveProfileSuccess = function(details) {
        var radioValue;
        var inputValue = "";
        var selectedEl;
        for (var elKey in ELS) {
            var el = ELS[elKey];
            if (Boolean(el.RADIO.checked)) {
                selectedEl = el;
                radioValue = el.RADIO.value;
                if (el.INPUT) {
                    inputValue = el.INPUT.value;
                    if ($PageFlakesHelper.trim(inputValue) == EMPTY) {
                        el.ERROR.innerHTML = el.DEFAULT_ERROR;
                        el.ERROR.style.display = ""
                    }
                }
                break
            }
        }
        var xmlDoc = $PageFlakesHelper.getXmlDoc(details);
        var anyErrors = xmlDoc.getElementsByTagName("err");
        if ((typeof (anyErrors) != "undefined") && (anyErrors.length > 0)) {
            var errorMessage = anyErrors[0].getAttribute("msg");
            selectedEl.ERROR.innerHTML = errorMessage;
            selectedEl.ERROR.style.display = ""
        }
        else {
            var moreOptionsElement = $(id + "more_options");
            var photoDisplayOptionElement = $(id + "display");
            profile[OPTION] = radioValue;
            profile[INPUT] = inputValue;
            profile[MORE_OPTIONS] = moreOptionsElement.style.display;
            profile[DISPLAY_OPTION] = photoDisplayOptionElement.value;
            profile[USERNAME] = xmlDoc.getElementsByTagName("user")[0].getAttribute("nsid");
            forcedToSinglePhotoView = false;
            instance.save();
            this.closeShare();
            instance._toggleEdit();
            this.displayPhotos(FeedEnum.FETCH);
            this.setTitle(profile[OPTION])
        }
    };

    this.cancelEdit = function() { instance._toggleEdit() };
    this.resetPageCounter = function() { pageIndex = 0 };
    this.incrementPageCounterAndDisplayPhoto = function() { pageIndex++; this.displayCurrentPagePhotos() };
    this.decrementPageCounterAndDisplayPhoto = function() { pageIndex--; this.displayCurrentPagePhotos() };
    this.setStatusMessage = function(message, color) { var photoDisplayElement = $(id + "photo_display"); color = typeof (color) == "undefined" ? "#000000" : color; photoDisplayElement.innerHTML = '<div style="color:' + color + ';position:relative;padding-top:90px;" align="center" valign="middle">' + message + "</div>" };
    this.showFavoriteOption = function(divEl, pageIndex) { var allDivs = divEl.getElementsByTagName("div"); var favoriteElement; if (allDivs.length == 0) { var photo = photos[pageIndex]; var favorite = false; var imageSrc = ""; var imageId = ""; if (profile[OPTION] == "this_flickr_feed") { imageSrc = photo.src.match(FAV_IMG_SRC_REGEXP_FEED)[1]; imageId = imageSrc.match(IMG_ID_REGEXP)[1] } else { if (profile[OPTION] == "enter_loc") { imageSrc = photo.src.match(FAV_IMG_SRC_REGEXP_FEED)[1]; imageId = imageSrc.match(IMG_ID_REGEXP)[1] } else { imageSrc = photo.src.match(FAV_IMG_SRC_REGEXP)[1]; imageId = imageSrc.match(IMG_ID_REGEXP)[1] } } var userId = photo.flickrUrl.substring(FLICKR_PHOTO_URL.length); userId = userId.substring(0, userId.indexOf("/")); if (favoritePhotos[imageId]) { favorite = true } var params = { IMAGESOURCE: imageSrc, TITLE: photo.title, USERID: userId, IMAGEID: imageId }; var single = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.SINGLE); var favoritesImgElement = $PageFlakesHelper.newNode("img"); favoritesImgElement.src = (favorite) ? FavoritePhotoEnum.STARRED : FavoritePhotoEnum.UNSTARRED; favoritesImgElement.title = (favorite) ? FavoritePhotoTitleEnum.UNSTARRED : FavoritePhotoTitleEnum.STARRED; favoriteElement = $PageFlakesHelper.newNode("div"); favoriteElement.style.position = "absolute"; favoriteElement.style.zIndex = 1000; var pos = PU.getPosition(divEl); favoriteElement.style.top = (Number(pos[1]) - 8) + "px"; favoriteElement.style.left = (Number(pos[0]) + Number(pos[2]) - 24) + "px"; favoriteElement.style.cursor = "hand"; favoriteElement.style.cursor = "pointer"; if (favoriteElement.addEventListener) { favoriteElement.addEventListener("click", $PageFlakesHelper.bind(function(event) { this.updateFavorite(favoritesImgElement, params) }, this), false) } else { if (favoriteElement.attachEvent) { favoriteElement.attachEvent("onclick", $PageFlakesHelper.bind(function(event) { this.updateFavorite(favoritesImgElement, params) }, this)) } } favoriteElement.appendChild(favoritesImgElement); divEl.appendChild(favoriteElement) } else { favoriteElement = allDivs[0]; var pos = PU.getPosition(divEl); favoriteElement.style.top = (Number(pos[1]) - 8) + "px"; favoriteElement.style.left = (Number(pos[0]) + Number(pos[2]) - 24) + "px"; favoriteElement.style.cursor = "hand"; favoriteElement.style.cursor = "pointer" } favoriteElement.style.display = SHOW };
    this.hideFavoriteOption = function(divEl) { var favoriteElement = divEl.getElementsByTagName("div")[0]; $ND(favoriteElement) };
    this.updateFavorite = function(favoritesImgElement, params) { var favorite = (favoritePhotos[params.IMAGEID] != null); favoritesImgElement.src = (favorite) ? FavoritePhotoEnum.UNSTARRED : FavoritePhotoEnum.STARRED; favoritesImgElement.title = (favorite) ? FavoritePhotoTitleEnum.STARRED : FavoritePhotoTitleEnum.UNSTARRED; favoritePhotos[params.IMAGEID] = (favorite) ? null : { S: params.IMAGESOURCE, T: params.TITLE.replace(/'/g, "&#039;").replace(/"/g, "&#034;"), U: params.USERID }; profile[MY_STARRED_PHOTOS] = this.mapOfMapsToString(favoritePhotos); instance.save(); if (profile[OPTION] == PhotoOptionEnum.MY_STARRED_PHOTOS) { photos = this.getFavoritePhotos(); var single = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.SINGLE); var npp = single ? 1 : 9; if (photos.length <= pageIndex * npp) { pageIndex-- } this.showPhotos("No starred photos found.") } };
    this.hasFavorites = function() { for (var key in favoritePhotos) { return true } return false };
    this.getFavoritePhotos = function() { var small = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.TILED); var p = []; for (var photoId in favoritePhotos) { var map = favoritePhotos[photoId]; if (map) { p.push(new Photo((FLICKR_SERVER_URL + map.S + (small ? "_s.jpg" : "_m.jpg")), map.T, (FLICKR_PHOTO_URL + map.U + "/" + photoId))) } } return p };
    this.mapToString = function(map) { var str = "{"; for (var key in map) { if (map[key]) { str += key + ":'" + map[key] + "'," } } str = str.substring(0, str.length - 1); str += "}"; return str }; this.mapOfMapsToString = function(map) { var str = "{"; for (var key in map) { if (map[key]) { str += key + ":" + this.mapToString(map[key]) + "," } } if (str.length > 1) { str = str.substring(0, str.length - 1) } str += "}"; return str };

    this.displayPhotos = function(fetchStrategy) {
        var photoNavigationElement = $(id + "photo_navigation");
        $ND(photoNavigationElement);
        counter = 0;
        this.setStatusMessage('<div class="downloadInProgress">Loading...</div>');
        this.resetPageCounter();
        var ro = profile[OPTION];
        var flickrUrl = "";
        var small = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.TILED);
        var userFeed = false;
        if (ro != PhotoOptionEnum.MY_STARRED_PHOTOS) {
            if (ro == PhotoOptionEnum.MOST_RECENT) {
                flickrUrl = FlickrUrlEnum.MOST_RECENT
            }
            else {
                if (ro == PhotoOptionEnum.INTERESTING) {
                    flickrUrl = FlickrUrlEnum.INTERESTING
                }
                else {
                    if (ro == PhotoOptionEnum.ENTER_TAG) {
                        var tags = $PageFlakesHelper.trim(ELS[PhotoOptionEnum.ENTER_TAG].INPUT.value).split(" ");
                        flickrUrl = FlickrUrlEnum.ENTER_TAG + tags.join(", ")
                    }
                    else {
                        if (ro == PhotoOptionEnum.ENTER_LOC) {
                            var tags = $PageFlakesHelper.trim(ELS[PhotoOptionEnum.ENTER_LOC].INPUT.value).split(" ");
                            if (tags != null) {
                                flickrUrl = FlickrUrlEnum.LOCATION_TAG + tags.join(",")
                            }
                        }
                        else {
                            if (ro == PhotoOptionEnum.PHOTOS_FROM_FLICKR_USER) {
                                var username = profile[USERNAME]; flickrUrl = FlickrUrlEnum.PHOTOS_FROM_FLICKR_USER + username
                            }
                            else {
                                if (ro == PhotoOptionEnum.THIS_FLICKR_FEED) {
                                    flickrUrl = $PageFlakesHelper.trim(ELS[PhotoOptionEnum.THIS_FLICKR_FEED].INPUT.value);
                                    var startsWithHttpMatch = flickrUrl.match(STARTS_WITH_HTTP_REGEXP, "/i");
                                    if (!startsWithHttpMatch && !Browser.isSafari) {
                                        flickrUrl = "http://" + flickrUrl
                                    }
                                    else {
                                        if (!startsWithHttpMatch && Browser.isSafari) {
                                            flickrUrl = flickrUrl.substr(7);
                                            flickrUrl = "http://" + flickrUrl
                                        }
                                    }
                                    userFeed = true
                                }
                            }
                        }
                    }
                }
            }
            if (fetchStrategy != FeedEnum.FETCH) {
                var feed = profile[FLICKR_PHOTOS_FEED];
                this.parsePhotos(feed, userFeed, small);
                this.showPhotos();
                if (fetchStrategy == FeedEnum.USE_FROM_PROFILE_AND_UPDATE_FEED) {
                    window.setTimeout(id + ".displayPhotos('" + FeedEnum.FETCH + "')", 20000)
                }
            }
            else {
                App.ContentProxy.GetUrl(flickrUrl, F(this, this.displayPhotosSuccess), F(this, this.displayPhotosFailure))
            }
        }
        else {
            photos = this.getFavoritePhotos();
            this.showPhotos("No starred photos found.")
        }
    };

    this.displayPhotosSuccess = function(details) { var small = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.TILED); var ro = profile[OPTION]; var userFeed = false; if (ro == PhotoOptionEnum.THIS_FLICKR_FEED) { userFeed = true } this.parsePhotos(details, userFeed, small); if (Browser.isSafari && ro == PhotoOptionEnum.ENTER_LOC) { } else { this.showPhotos() } };
    this.displayPhotosFailure = function(error) { var ro = profile[OPTION]; if ((ro == PhotoOptionEnum.THIS_FLICKR_FEED)) { this.setStatusMessage('Error occurred while loading feed from <a href="' + flickrUrl + '">' + flickrUrl + "</a>") } else { this.setStatusMessage("Error occurred while loading photos.") } };

    this.parsePhotos = function(details, userFeed, small) {
        var ro = profile[OPTION];
        var xmlDoc = $PageFlakesHelper.getXmlDoc(details);
        photos = [];
        if (!userFeed) {
            if (ro == PhotoOptionEnum.ENTER_LOC) {
                if (Browser.isSafari) {
                    FlickrService.ParseLocationXML(details, function(result) {
                        var flickrArray = result;
                        for (i = 0; i < flickrArray.length; i++) {
                            var imgsrc = flickrArray[i].ImageURL.toString();
                            if (small) {
                                imgsrc = imgsrc.replace(/_m/g, "_s")
                            }
                            photos.push(new Photo(imgsrc, flickrArray[i].Title, flickrArray[i].FlickrLink))
                        } _self.showPhotos()
                    }, function(error) { photos = [] })
                }
                else {
                    var photoElements = xmlDoc.getElementsByTagName("entry");
                    $PageFlakesHelper.foreach(photoElements, function(photoElement) {
                        var linkNodes = photoElement.getElementsByTagName("link");
                        var flickrLink = linkNodes[0].getAttribute("href");
                        var titleNode = photoElement.getElementsByTagName("title");
                        var title = titleNode[0].firstChild.nodeValue;
                        var contents = photoElement.getElementsByTagName("content");
                        var content = contents[0].firstChild.nodeValue.substr(contents[0].firstChild.nodeValue.indexOf('src="') + 5);
                        var imageURL = content.substring(0, content.indexOf('"'));
                        if (small) {
                            imageURL = imageURL.replace("_m", "_s")
                        }
                        photos.push(new Photo(imageURL, title, flickrLink))
                    })
                }
            }
            else {
                var photoElements = xmlDoc.getElementsByTagName("photo");
                $PageFlakesHelper.foreach(photoElements, function(photoElement) {
                    photos.push(new Photo(FLICKR_SERVER_URL + photoElement.getAttribute("server") + "/" + photoElement.getAttribute("id") + "_" + photoElement.getAttribute("secret") + (small ? "_s.jpg" : "_m.jpg"), photoElement.getAttribute("title"), FLICKR_PHOTO_URL + photoElement.getAttribute("owner") + "/" + photoElement.getAttribute("id")))
                })
            }
        }
        else {
            var isRss = xmlDoc.getElementsByTagName("channel").length != 0;
            var isFeed = xmlDoc.getElementsByTagName("feed").length != 0;
            if (isRss) {
                var items = xmlDoc.getElementsByTagName("item");
                $PageFlakesHelper.foreach(items, function(itemXml) {
                    var description = itemXml.getElementsByTagName("description")[0].firstChild.nodeValue; var match = description.match(IMG_SRC_REGEXP); if (match) { var titleEls = itemXml.getElementsByTagName("title"); photos.push(new Photo((small ? match[1].replace(/_m.jpg/, "_s.jpg") : match[1]), ((titleEls.length > 0) && (titleEls[0].firstChild)) ? titleEls[0].firstChild.nodeValue : "", description.replace(URL_REGEXP, EMPTY).match(URL_REGEXP)[1])) }
                })
            }
            else {
                if (isFeed) {
                    var entries = xmlDoc.getElementsByTagName("entry");
                    $PageFlakesHelper.foreach(entries, function(entryXml) {
                        var content = entryXml.getElementsByTagName("content")[0].firstChild.nodeValue; var match = content.match(IMG_SRC_REGEXP); if (match) { photos.push(new Photo((small ? match[1].replace(/_m.jpg/, "_s.jpg") : match[1]), entryXml.getElementsByTagName("title")[0].firstChild.nodeValue, content.replace(URL_REGEXP, EMPTY).match(URL_REGEXP)[1])) }
                    })
                }
            }
        }
    };

    this.showPhotos = function(message) { this.displayCurrentPagePhotos(message); if (photos.length > 0) { var photoNavigationElement = $(id + "photo_navigation"); $D(photoNavigationElement) } };
    this.showFullImage = function(pageIndex) { var single = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.SINGLE); var flickrURL = photos[pageIndex].src; if (single) { flickrURL = flickrURL.replace(/_m.jpg/, ".jpg") } else { flickrURL = flickrURL.replace(/_s.jpg/, ".jpg") } App.showHtmlViewer("Flickr", flickrURL) };
    this.getPhotoHtml = function(pageIndex) { var title; if (typeof (photos[pageIndex].title) != "undefined") { title = photos[pageIndex].title } else { title = "" } if (instance.page.CanChangeFlake) { return '<div onmouseover="' + id + ".showFavoriteOption(this, " + pageIndex + ')" onmouseout="' + id + '.hideFavoriteOption(this)"><a href="' + photos[pageIndex].flickrUrl + '" target="_blank"><img src="' + photos[pageIndex].src + '" title="' + title.replace(/"/g, "&#034;") + '" border="0"></a></div>' } else { return '<a href="' + photos[pageIndex].flickrUrl + '" target="_blank"><img src="' + photos[pageIndex].src + '" title="' + title.replace(/"/g, "&#034;") + '" border="0"></a></div>' } };
    this.displayCurrentPagePhotos = function(message) { var photoDisplayElement = $(id + "photo_display"); var single = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.SINGLE); var npp = single ? 1 : 9; var prev = $(id + "photo_navigation_prev"); var next = $(id + "photo_navigation_next"); if (photos.length > 0) { if (((pageIndex + 1) * npp) >= photos.length) { $ND(next) } else { $D(next) } if (pageIndex <= 0) { $ND(prev) } else { $D(prev) } if (single) { photoDisplayElement.style.height = "200px"; photoDisplayElement.innerHTML = '<table height="100%"><tr><td valign="middle">' + this.getPhotoHtml(pageIndex) + "</td></tr></table>" } else { var html = '<table cellpadding="4">'; photoDisplayElement.style.height = "250px"; var count = pageIndex * npp; for (var i = 0; i < 3; i++) { html += '<tr height="75px">'; for (var j = 0; j < 3; j++) { html += '<td align="center" width="75px">'; if (count < photos.length) { html += this.getPhotoHtml(count++) } else { $ND(next); html += "&nbsp;" } html += "</td>" } html += "</tr>" } html += "</table>"; photoDisplayElement.innerHTML = html } } else { this.setStatusMessage(message ? message : "No photos found."); if (!message) { if (counter == 0) { profile[OPTION] = PhotoOptionEnum.INTERESTING; this.setTitle(profile[OPTION]); this.displayPhotos(FeedEnum.FETCH) } counter++ } } };
    this.showShare = function() { var shareLinkEl = $(id + "share_link"); var shareEl = $(id + "share"); var emailsEl = $(id + "emails"); var firstNameEl = $(id + "sfn"); var shareStatusEl = $(id + "ss"); if (shareTimerID != 0) { window.clearTimeout(shareTimerID) } if (shareEl.style.display == HIDE) { var single = (profile[DISPLAY_OPTION] == PhotoDisplayOptionEnum.SINGLE); if (!single) { profile[DISPLAY_OPTION] = PhotoDisplayOptionEnum.SINGLE; forcedToSinglePhotoView = true; this.displayPhotos(FeedEnum.FETCH) } shareLinkEl.innerHTML = ""; emailsEl.value = EMPTY; firstNameEl.value = App.UserFullName; shareEl.style.display = SHOW; $(id + "flickrFriendName").focus() } else { if (forcedToSinglePhotoView) { profile[DISPLAY_OPTION] = PhotoDisplayOptionEnum.TILED; forcedToSinglePhotoView = false; window.setTimeout(id + ".displayPhotos('" + FeedEnum.FETCH + "')", 1) } shareLinkEl.innerHTML = "Send to a friend"; $ND(shareEl, shareStatusEl) } };
    this.closeShare = function() { var shareLinkEl = $(id + "share_link"); var shareEl = $(id + "share"); var shareStatusEl = $(id + "ss"); shareLinkEl.innerHTML = "Send to a friend"; if (forcedToSinglePhotoView) { profile[DISPLAY_OPTION] = PhotoDisplayOptionEnum.TILED } forcedToSinglePhotoView = false; this.displayPhotos(FeedEnum.FETCH); shareStatusEl.innerHTML = EMPTY; $ND(shareEl, shareStatusEl) };
    this.sendPhotoShareEmail = function() { var emailsEl = $(id + "emails"); var email = $PageFlakesHelper.trim(emailsEl.value); var shareStatusEl = $(id + "ss"); shareStatusEl.innerHTML = EMPTY; $ND(shareStatusEl); var emails = email.replace("\n", ""); emails = email.replace(" ", ""); emails = email.split(","); if ((email != EMPTY) && this.validEmails(emails)) { this.sendFlickrShareEmails(emails); if (shareTimerID != 0) { window.clearTimeout(shareTimerID) } shareTimerID = window.setTimeout(id + ".closeShare()", DEFAULT_SHARE_CLOSE_TIME_OUT); $(id + "flickrFriendName").focus() } else { shareStatusEl.innerHTML = '<table cellpadding="2"><tr><td width="1%"><div style="padding-right:8px"><img src="' + IMAGE_PREFIX + 'flakes/kishore/flickr/images/failure.gif"/></div></td><td><div style="font-weight:bold;color:#c00000">Your photo could not been sent.</div><div>Please make sure that you enter a valid email address and try again.</div></td></tr></table>'; $D(shareStatusEl) } };
    this.encodeURI = function(uri) { if (window.encodeURIComponent) { return encodeURIComponent(uri) } else { return uri } };
    this.isValidEmail = function(email) { if (email != null) { var indexOfAt = email.indexOf("@"); if ((indexOfAt != -1) && (indexOfAt != 0)) { var indexOfDot = email.indexOf(".", (indexOfAt + 1)); return (indexOfDot != -1) && (indexOfDot != (indexOfAt + 1)) } } return false };
    this.validEmails = function(emails) { for (var i = 0; i < emails.length; i++) { var validEmail = this.isValidEmail(emails[i]); if (!validEmail) { return false } } return true };
    this.sendFlickrShareEmails = function(emails) { var firstNameEl = $(id + "sfn"); var firstName = firstNameEl.value; var friendName = $(id + "flickrFriendName").value; var shareStatusEl = $(id + "ss"); if (pageIndex >= 0) { var photo = photos[pageIndex]; var flickrUrl = photo.flickrUrl; var src = photo.src; photoViewerFlakeUrl = "?imageURL=" + src + "&altImage=" + photo.title; photoViewerFlakeUrl = PAGEFLAKES_PHOTOVIEWER + photoViewerFlakeUrl; var html = '<div style="padding-top:5px">'; html += '<div style="padding-top:20px">'; html += "<span>Hello </span>"; html += '<span style="padding-left:4px">' + ((friendName != EMPTY) ? friendName : "#{EMAIL_ADDRESS}") + ",</span>"; html += "</div>"; html += '<div style="padding-top:15px">'; html += "<span >"; html += " I've been using Pageflakes, the easy and fun way to personalize the Internet and make it yours.  I've personalized it with a feature that shows me great new photos, which is where I found this one.<br>"; html += "</span>"; html += "</div>"; html += '<div style="padding-top:10px">'; html += '<div style="width:75px;border:1px solid #999999;padding:4px 4px 4px 4px">'; html += "<span>"; html += '<a href="'; html += photoViewerFlakeUrl; html += '">'; html += '<img src="' + src + '" border="0">'; html += "</a>"; html += "</span>"; html += "</div>"; html += "</div>"; html += '<div style="padding-top:15px">'; html += "<span>"; html += '<a href="'; html += photoViewerFlakeUrl; html += '">'; html += "Click to see the original and larger version"; html += "</a>"; html += "</span>"; html += "</div>"; html += '<div style="padding-top:5px">'; html += "<span><br>Your own personal Pageflakes page can include news, weather, sports, entertainment, events, photos, videos, music and e-mail., and just about anything else you do on the web - all in one place.<br><br>It's quick and free, so give it a try at "; html += '<a href="http://www.Pageflakes.com">www.Pageflakes.com</a><br>I\'ll see you soon on Pageflakes!<br><br>' + ((firstName != EMPTY) ? firstName : App.UserFullName); html += "</span>"; html += "</div>"; html += "</div>"; html += "</div>"; var subject = " wants to share a photo with you"; var from = "<info@Pageflakes.com>"; if (firstName != EMPTY) { subject = ((firstName != EMPTY) ? firstName : App.UserFullName) + subject; from = '"' + firstName + '"' + from } else { subject = "Someone" + subject; from = '"Pageflakes"' + from } for (var i = 0; i < emails.length; i++) { var email = emails[i]; var params = [[PHOTO_SHARE_EMAIL_MESSAGE, html.replace("#{EMAIL_ADDRESS}", email)]]; App.Server.SendEmail2(from, email, "", subject, PHOTO_SHARING_TEMPLATE, 1, params, function() { shareStatusEl.innerHTML = '<table cellpadding="2"><tr><td width="1%"><div style="padding-right:8px"><img src="' + IMAGE_PREFIX + 'flakes/kishore/flickr/images/success.gif"/></div></td><td><div style="font-weight:bold;color:#333333">Your photo has been sent.</div><div>Feel free to send more photos.</div></td></tr></table>'; $D(shareStatusEl) }, function() { shareStatusEl.innerHTML = '<table cellpadding="2"><tr><td width="1%"><div style="padding-right:8px"></div></td><td><div style="font-weight:bold;color:#333333">Your photo could not be sent.</div><div>Please try again.</div></td></tr></table>'; $D(shareStatusEl) }, function(exception) { shareStatusEl.innerHTML = '<table cellpadding="2"><tr><td width="1%"><div style="padding-right:8px"></div></td><td><div style="font-weight:bold;color:#333333">' + exception.message + "</div></td></tr></table>"; $D(shareStatusEl); PU.dumpException(exception) }) } } else { shareStatusEl.innerHTML = '<table cellpadding="2"><tr><td width="1%"><div style="padding-right:8px"></div></td><td><div style="font-weight:bold;color:#333333">There is no starred photo to send.</div><div>Please select one from any of the other photos.</div></td></tr></table>'; $D(shareStatusEl) } }
};

function AOLVideoFlake(p) {
    var N = "flakes/amit/AOLVideo/";
    var Y = window.IMAGE_PREFIX + N;
    var D = { SEARCH: 0, BROWSE: 1 };
    var Aa = "selectedTab";
    var c = "displayMode";
    var b = "cost";
    var q = "family";
    var I = "format";
    var Ag = "length";
    var o = "quality";
    var l = "sortBy";
    var Ac = "openLink";
    var a = "lastSearch";
    var n = "";
    var Ae = "lp47hbp4jikb5q5qr";
    var A = "http://api.searchvideo.com/apiv3";
    var X = 50;
    var R;
    var u;
    var m;
    var C;
    var f;
    var Q;
    var Z;
    var d;
    var t;
    var e;
    var Ad;
    var j;
    var L;
    var i;
    var P;
    var O;
    var B;
    var z;
    var x;
    var h;
    var H;
    var J;
    var E;
    var v;
    var W;
    var E;
    var U;
    var r;
    var g;
    var s;
    var V;
    var T;
    var Af = "";
    var y = 0;
    var G = false;
    var w = 0;
    var M = 0;
    var S = new Array();
    var k = 0;
    var K = this;
    this.load = function(Ai) {
        var Ak = window.IMAGE_PREFIX;
        Ai.body.innerHTML = '<div> <div id="' + p + 'content" style="background-color:#646464"> <table border="0" cellspacing="0" cellpadding="0" style="width:100%"> <tbody>  <tr>  <td style="vertical-align: bottom;padding-left:8px;padding-top:5px;width:100%">  <div id="' + p + 'divTabSearch" class="aolVideoTabDown">Search</div>  <div id="' + p + 'divTabBrowse" class="aolVideoTabUp">Browse</div>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:top;background-color:#e6e6e6;height:8px;width:100%"></td>  </tr>  <tr>  <td id="' + p + 'tdSearch" style="text-align:center;vertical-align:top;background-color:#ffffff;width:100%">  <table id="' + p + 'tblSearch" border="0" cellspacing="0" cellpadding="2" style="width:100%;display:none">  <tbody>   <tr>   <td style="width:50%;padding-top:6px;padding-bottom:6px;"></td>   <td style="text-align:left;vertical-align:top;padding-top:6px;padding-bottom:6px;white-space:nowrap">   <input id="' + p + 'txtSearch" type="text" style="width:180px" />   </td>   <td style="text-align:left;vertical-align:top;padding-top:6px;padding-bottom:6px;white-space:nowrap">   <input id="' + p + 'btnSearch" type="Button" value="Search" />   </td>   <td style="padding-top:6px;padding-bottom:6px;width:50%"></td>   </tr>  </tbody>  </table>  </td>  </tr>  <tr>  <td id="' + p + 'tdBrowseList" style="text-align:center;vertical-align:top;background-color:#ffffff;width:100%">  <table id="' + p + 'tblBrowseList" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;width:100%;display:none">  <tbody>   <tr>   <td style="padding-top:6px;padding-bottom:6px;width:50%"></td>   <td style="text-align:left;vertical-align:top;padding-top:18px;padding-right:12px;white-space:nowrap">   <a id="' + p + 'lnkAllTop" href="javascript:void(0)">All Top Videos</a>   </td>   <td style="text-align:left;vertical-align:top;padding-top:18px;padding-left:12px;white-space:nowrap">   <a id="' + p + 'lnkNews" href="javascript:void(0)">Top News Videos</a>   </td>   <td style="padding-top:6px;width:50%"></td>   </tr>   <tr>   <td style="width:50%"></td>   <td style="text-align:left;vertical-align:top;padding-top:4px;padding-right:12px;white-space:nowrap">   <a id="' + p + 'lnkSports" href="javascript:void(0)">Top Sports Videos</a>   </td>   <td style="text-align:left;vertical-align:top;padding-top:4px;padding-left:12px;white-space:nowrap">   <a id="' + p + 'lnkEntertainment" href="javascript:void(0)">Top Entertainment Videos</a>   </td>   <td style="width:50%"></td>   </tr>   <tr>   <td style="padding-bottom:6px;width:50%"></td>   <td style="text-align:left;vertical-align:top;padding-top:4px;padding-bottom:6px;padding-right:12px;white-space:nowrap">   <a id="' + p + 'lnkMovies" href="javascript:void(0)">Top Movies Videos</a>   </td>   <td style="text-align:left;vertical-align:top;padding-top:4px;padding-left:12px;padding-bottom:6px;white-space:nowrap">   <a id="' + p + 'lnkMusic" href="javascript:void(0)">Top Music Videos</a>   </td>   <td style="padding-bottom:6px;width:50%"></td>   </tr>  </tbody>  </table>  </td>  </tr>  <tr>  <td style="text-align:center;vertical-align:top;background-color:#ffffff;width:100%">  <table id="' + p + 'tblBrowseDropDownList" border="0" cellspacing="0" cellpadding="0" style="background-color:#e6e6e6;width:100%;display:none">  <tbody>   <tr>   <td style="padding-top:6px;padding-bottom:6px;width:50%"></td>   <td style="text-align:left;vertical-align:top;padding-top:0px;padding-bottom:6px;white-space:nowrap">   <select id="' + p + 'ddlBrowse">   <option value="">All Top Videos</option>   <option value="category:news">Top News Videos</option>   <option value="category:sports">Top Sports Videos</option>   <option value="category:entertainment">Top Entertainment Videos</option>   <option value="category:movies">Top Movies Videos</option>   <option value="category:music">Top Music Videos</option>   </select>   </td>   <td style="padding-top:6px;padding-bottom:6px;width:50%"></td>   </tr>  </tbody>  </table>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:top;background-color:#ffffff;width:100%">  <div id="' + p + 'divMessage"></div>  <div id="' + p + 'divResult" style="display:none"></div>  </td>  </tr> </tbody> </table> </div> </div>';
        Ai.setEditArea('<table cellpadding="3" cellspacing="0" style="width:100%"> <tbody>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlDisplay">Display:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlDisplay">  <option value="1">Single Video</option>  <option value="3">3 Videos</option>  <option value="5">5 Videos</option>  <option value="9">3 x 3 Grid</option>  <option value="16" selected="selected">4 x 4 Grid</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlCost">License:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlCost">  <option value="">All</option>  <option value="type:buy">Buy</option>  <option value="type:free">Free</option>  <option value="type:rent">Rent</option>  <option value="type:sub">Subscription</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlFamily">Family filter:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlFamily">  <option value="0">On</option>  <option value="1">Off</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlFormat">Format:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlFormat">  <option value="">All</option>  <option value="format:flash">Flash</option>  <option value="format:real">Real Media</option>  <option value="format:qt">QuickTime</option>  <option value="format:win">Windows Media</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlLength">Length:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlLength">  <option value="">All</option>  <option value="runtime:&gt;10">Long</option>  <option value="runtime:&gt;2 AND runtime:&lt;10">Medium</option>  <option value="runtime:&lt;2">Short</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlQuality">Quality:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlQuality">  <option value="">All</option>  <option value="quality:excellent">Excellent</option>  <option value="quality:fair">Fair</option>  <option value="quality:good">Good</option>  <option value="quality:poor">Poor</option>  </select>  </td>  </tr>  <tr>  <td style="text-align:left;vertical-align:middle;white-space:nowrap">  <strong><label for="' + p + 'ddlSortBy">Sort by:</label></strong>  </td>  <td style="text-align:left;vertical-align:middle;width:100%">  <select id="' + p + 'ddlSortBy">  <option value="">Rank</option>  <option value="sort:highestRated">Highest Rated</option>  <option value="sort:mostPopular">Most Popular</option>  <option value="sort:mostPopularNow">Most Popular Now</option>  <option value="sort:mostPopularThisHour">Most Popular This Hour</option>  <option value="sort:mostPopularToday">Most Popular Today</option>  <option value="sort:mostPopularThisWeek">Most Popular This Week</option>  <option value="sort:mostPopularThisMonth">Most Popular This Month</option>  <option value="sort:mostRecent" selected="selected">Most Recent</option>  <option value="sort:mostRelevant">Most Relevant</option>  <option value="sort:random">Random</option>  <option value="sort:title">Title</option>  <option value="sort:topFavorites">Top Favorites</option>  </select>  </td>  </tr>  <tr>  <td></td>  <td style="text-align:left;vertical-align:top;width:100%">  <input id="' + p + 'btnSave" class="button" type="button" value="Save" />&nbsp;  <input id="' + p + 'btnCancel" class="button cancel" type="button" value="Cancel" />  </td>  </tr> </tbody> </table>');
        R = Ai; R.setIcon(window.IMAGE_PREFIX + "flakes/amit/AOLVideo/Images/icon.gif");
        R.body.style.padding = "0px";
        u = $(p + "ddlDisplay");
        m = $(p + "ddlCost");
        C = $(p + "ddlFamily");
        f = $(p + "ddlFormat");
        Q = $(p + "ddlLength");
        Z = $(p + "ddlQuality");
        d = $(p + "ddlSortBy");
        t = $(p + "btnSave");
        e = $(p + "btnCancel");
        Ad = $(p + "divTabSearch");
        j = $(p + "divTabBrowse");
        L = $(p + "tdSearch");
        i = $(p + "tblSearch");
        P = $(p + "txtSearch");
        O = $(p + "btnSearch");
        B = $(p + "tdBrowseList"); z = $(p + "tblBrowseList"); x = $(p + "lnkAllTop"); h = $(p + "lnkNews");
        H = $(p + "lnkSports"); J = $(p + "lnkEntertainment"); E = $(p + "lnkMovies"); v = $(p + "lnkMusic");
        r = $(p + "tblBrowseDropDownList");
        g = $(p + "ddlBrowse");
        V = $(p + "divMessage");
        s = $(p + "divResult");
        if (ie) {
            u.onkeydown = this.onIEEditKeyDown;
            m.onkeydown = this.onIEEditKeyDown;
            C.onkeydown = this.onIEEditKeyDown;
            f.onkeydown = this.onIEEditKeyDown;
            Q.onkeydown = this.onIEEditKeyDown;
            Z.onkeydown = this.onIEEditKeyDown;
            d.onkeydown = this.onIEEditKeyDown
        }
        else {
            u.onkeydown = this.onMozillaEditKeyDown;
            m.onkeydown = this.onMozillaEditKeyDown;
            C.onkeydown = this.onMozillaEditKeyDown;
            f.onkeydown = this.onMozillaEditKeyDown;
            Q.onkeydown = this.onMozillaEditKeyDown;
            Z.onkeydown = this.onMozillaEditKeyDown;
            d.onkeydown = this.onMozillaEditKeyDown
        }
        t.onclick = function(Al) {
            K.save()
        };
        e.onclick = function(Al) {
            K.selectListBoxByProfileKey(u, c);
            K.selectListBoxByProfileKey(m, b);
            K.selectListBoxByProfileKey(C, q);
            K.selectListBoxByProfileKey(f, I);
            K.selectListBoxByProfileKey(Q, Ag);
            K.selectListBoxByProfileKey(Z, o);
            K.selectListBoxByProfileKey(d, l);
            R.hideEditArea()
        };
        Ad.onclick = function(Al) {
            G = false;
            T = D.SEARCH;
            K.showTab(T);
            R.ProtectedProfiles[Aa] = T;
            R.save()
        };
        j.onclick = function(Al) {
            G = false;
            T = D.BROWSE;
            K.showTab(T);
            R.ProtectedProfiles[Aa] = T;
            R.save()
        };
        if (ie) {
            P.onkeydown = this.onIESearchKeyDown
        }
        else {
            P.onkeydown = this.onMozillaSearchKeyDown
        }
        O.onclick = function(Al) {
            K.search()
        };
        x.onclick = function(Al) {
            g.selectedIndex = 0;
            K.loadResultByCategory()
        };
        h.onclick = function(Al) {
            g.selectedIndex = 1;
            K.loadResultByCategory()
        };
        H.onclick = function(Al) {
            g.selectedIndex = 2;
            K.loadResultByCategory()
        };
        J.onclick = function(Al) {
            g.selectedIndex = 3;
            K.loadResultByCategory()
        };
        E.onclick = function(Al) {
            g.selectedIndex = 4;
            K.loadResultByCategory()
        };
        v.onclick = function(Al) {
            g.selectedIndex = 5;
            K.loadResultByCategory()
        };
        g.onchange = function(Al) {
            K.loadResultByCategory()
        };
        this.selectListBoxByProfileKey(u, c);
        this.selectListBoxByProfileKey(m, b);
        this.selectListBoxByProfileKey(C, q);
        this.selectListBoxByProfileKey(f, I);
        this.selectListBoxByProfileKey(Q, Ag);
        this.selectListBoxByProfileKey(Z, o);
        this.selectListBoxByProfileKey(d, l);
        var Ah = R.Profiles[a];
        var Aj = D.SEARCH;
        if ((Ah != null) && (Ah.length > 0)) {
            this.showTab(Aj); P.value = Ah;
            this.search()
        }
        else {
            if (R.ProtectedProfiles[Aa] != null) {
                Aj = parseInt(R.ProtectedProfiles[Aa], 10);
                this.showTab(Aj);
                if (Aj == D.SEARCH) {
                    this.searchOnFirstTimeLoad()
                }
            }
            else {
                this.showTab(Aj);
                this.searchOnFirstTimeLoad()
            }
        }
    };
    this.searchOnFirstTimeLoad = function() {
        this.reset();
        if (R.Profiles[a]) {
            P.value = R.Profiles[a]
        }
        else {
            P.value = "funny"
        }
        Af = $trim(P.value);
        Af = this.prepareQuery(Af);
        this.loadResult(Af)
    };
    this.search = function() {
        this.reset();
        Af = $trim(P.value);
        if (Af != R.Profiles[a]) {
            R.Profiles[a] = Af;
            R.save()
        }
        Af = $trim(P.value);
        Af = this.prepareQuery(Af);
        this.loadResult(Af)
    };
    this.loadResultByCategory = function() {
        this.reset();
        Af = g.options[g.selectedIndex].value;
        Af = this.prepareQuery(Af);
        this.loadResult(Af)
    };
    this.reset = function() {
        w = 0;
        M = 0;
        k = 0;
        y = 0;
        S = new Array()
    };
    this.loadResult = function(Aj) {
        var Ai = (w * X);
        Af = Aj;
        var Ah = A + "?appid=" + Ae + "&method=truveo.videos.getVideos&query=" + Af + "&results=" + X.toString() + "&start=" + Ai.toString() + "&showRelatedItems=0&tagResults=0&channelResults=0&categoryResults=0&userResults=0";
        if (C.selectedIndex == 1) {
            Ah += "&showAdult=" + C.options[C.selectedIndex].value
        }
        P.style.backgroundColor = "#d4d2cc";
        P.disabled = true;
        O.disabled = true;
        if (y == 0) {
            V.innerHTML = '<span style="padding-left:4px">Loading...</span>'
        }
        else {
            V.innerHTML = '<span style="padding-left:4px;color:#ff0000">Failed to retrieve video(s), trying again...</span>'
        }
        App.startWork(R.id);
        G = true;
        App.ContentProxy.GetUrl(Ah, F(this, this.onLoadResult), F(this, this.onException))
    };
    this.onException = function(Ah) {
        y = 0;
        V.innerHTML = '<span style="padding-left:4px;color:#ff0000">An unexpected error has occurred while loading the video(s).</span>';
        P.style.backgroundColor = "#ffffff";
        P.disabled = false;
        O.disabled = false;
        PageflakesUtility.dumpException(Ah);
        App.endWork(R.id)
    };
    this.prepareQuery = function(Ai) {
        var Ah = $trim(Ai);
        if (m.options[m.selectedIndex].value != "") {
            Ah += " " + m.options[m.selectedIndex].value
        }
        if (f.options[f.selectedIndex].value != "") {
            Ah += " " + f.options[f.selectedIndex].value
        }
        if (Q.options[Q.selectedIndex].value != "") {
            Ah += " " + Q.options[Q.selectedIndex].value
        }
        if (Z.options[Z.selectedIndex].value != "") {
            Ah += " " + Z.options[Z.selectedIndex].value
        }
        if (d.options[d.selectedIndex].value != "") {
            Ah += " " + d.options[d.selectedIndex].value
        }
        return $trim(Ah)
    };
    this.onLoadResult = function(Ah) {
        P.style.backgroundColor = "#ffffff";
        P.disabled = false;
        O.disabled = false;
        App.endWork(R.id);
        if (Ah == null) {
            V.innerHTML = '<span style="padding-left:4px;color:#ff0000">Did not find any video for the specified criteria.</span>';
            s.innerHTML = "";
            S = new Array();
            k = 0;
            y = 0
        }
        else {
            var Ai = K.getError(Ah);
            if (Ai.length > 0) {
                if (y == 0) {
                    y += 1;
                    V.innerHTML = '<span style="padding-left:4px;color:#ff0000">Failed to retrieve video(s), trying again...</span>';
                    MethodQueue.add((p + new Date()), 500, true, K.reloadResult)
                }
                else {
                    V.innerHTML = '<span style="padding-left:4px;color:#ff0000">' + Ai + '.</span> <a href="javascript:void(0)" onclick="' + p + ".loadResult('" + Af + "')\"> Click here</a><span> to try again.</span>";
                    s.innerHTML = "";
                    S = new Array();
                    k = 0;
                    y = 0
                }
            }
            else {
                var An = PU.getXmlDoc(Ah);
                var Am = null;
                var Ao = null;
                if (An.documentElement != null) {
                    Am = An.documentElement.getElementsByTagName("VideoSet");
                    if (Am != null) {
                        if (Am[0] != null) {
                            Ao = Am[0].getElementsByTagName("Video");
                            var Al = Am[0].getElementsByTagName("totalResultsAvailable");
                            if (Al != null) {
                                if (Al[0] != null) {
                                    k = parseInt(Al[0].firstChild.nodeValue, 10)
                                }
                            }
                        }
                    }
                }
                if ((Ao != null) && (Ao.length > 0)) {
                    var Ak = new Array(Ao.length);
                    for (var Aj = 0; Aj < Ao.length; Aj++) {
                        Ak[Aj] = new Ab(Ao[Aj])
                    }
                    for (var Aj = 0; Aj < Ak.length; Aj++) {
                        if (Ak[Aj].thumbnail.indexOf("dailymotion") != -1) {
                            k--
                        }
                        else {
                            S.push(Ak[Aj])
                        }
                    }
                    K.showResult();
                    V.innerHTML = ""
                }
                else {
                    V.innerHTML = '<span style="padding-left:4px;color:#ff0000">Did not find any video for the specified criteria.</span>';
                    s.innerHTML = "";
                    S = new Array();
                    k = 0
                } y = 0
            }
        }
    };
    this.reloadResult = function() {
        V.innerHTML = '<span style="padding-left:4px;color:#ff0000">Failed to retrieve video(s), trying again...</span>';
        K.loadResult(Af)
    };
    this.getError = function(Ah) {
        if (Ah == null) {
            return "An unexpected error has occurred."
        }
        var Ai = Ah.match(/<error>(.*?)<\/error>/i);
        if (Ai) {
            return Ai[1]
        }
        return ""
    };
    this.showResult = function() {
        var At = parseInt(u.options[u.selectedIndex].value, 10);
        var AF = (M * At);
        var Ah = (AF + (At - 1));
        if (Ah > (k - 1)) {
            Ah = (k - 1)
        }
        var Ar = new Array();
        var AC = 0;
        for (AC = 0; AC < S.length; AC++) {
            if ((AC >= AF) && AC <= Ah) {
                Ar.push(S[AC]);
                if (AC == Ah) {
                    break
                }
            }
        }
        s.innerHTML = "";
        var AD = window.IMAGE_PREFIX;
        if ((At == 16) || (At == 9)) {
            var Au = new Sys.StringBuilder();
            var AJ = ' target="_blank"';
            var AA = new Array();
            var Am = new Array();
            Au.append('<table border="0" cellpadding="0" cellspacing="0" style="width:100%">');
            Au.append("<tbody>");
            Au.append("<tr>");
            Au.append('<td style="width:50%"></td>');
            Au.append('<td style="text-align:center;vertical-align:middle">');
            Au.append('<table border="0" cellpadding="0" cellspacing="8" style="width:100%">');
            Au.append("<tbody>");
            var Ap = -1;
            var As = 4;
            var AI = 4;
            if (At == 9 || $(p + "content").offsetWidth < 300) {
                As = 3;
                AI = 3;
                At = 9;
                u.value = 9
            }
            for (var Ao = 0; Ao < As; Ao++) {
                Au.append("<tr>");
                for (var Ak = 0; Ak < AI; Ak++) {
                    Ap += 1;
                    Au.append('<td style="text-align:center;vertical-align:middle;height:50px;width:100%">');
                    if (Ap < Ar.length) {
                        var AE = Ar[Ap];
                        var AG = "div" + p + AE.id.toString();
                        Au.append('<div id="' + AG + '" style="display:block;width:65px;height:50px;position:absolute"><a href="' + AE.url + '"' + AJ + '><img src="' + AD + 'flakes/amit/AOLVideo/Images/border.gif" border="0"/></a></div><img id="i' + AG + '" src="' + AE.thumbnail + '" onerror="' + p + ".imageBroken('" + AG + '\')" style="cursor:pointer;width:65px;height:50px;border:0px"/>');
                        AA.push(AG);
                        Am.push(this.buildTip(AE))
                    }
                    Au.append("</td>")
                }
                Au.append("</tr>")
            }
            Au.append("</tbody>");
            Au.append("</table>");
            Au.append("</td>");
            Au.append('<td style="width:50%"></td>');
            Au.append("</tr>");
            Au.append("</tbody>");
            Au.append("</table>");
            s.innerHTML = Au.toString();
            for (var AC = 0; AC < AA.length; AC++) {
                TooltipManager.setTooltip($(AA[AC]), Am[AC])
            }
        }
        else {
            for (AC = 0; AC < Ar.length; AC++) {
                var AE = Ar[AC];
                var Az = document.createElement("div");
                Az.style.textAlign = "left";
                Az.style.verticalAlign = "top";
                Az.style.whiteSpace = "nowrap";
                Az.innerHTML = K.populateListItem(AE);
                s.appendChild(Az);
                if ($trim(AE.description).length > 0) {
                    var Az = $("div" + p + AE.id.toString());
                    var AH = $("lnk" + p + AE.id.toString());
                    if ((Az != null) && (AH != null)) {
                        var Al = this.wrapText($trim(AE.description));
                        TooltipManager.setTooltip(Az, Al);
                        TooltipManager.setTooltip(AH, Al)
                    }
                }
            }
        }
        var Ai = (AF > 0);
        var Aj = (Ah < (k - 1));
        var Ay = this.createCell("center", "middle");
        Ay.style.width = "100%";
        var Aw = document.createElement("img");
        if (Ai) {
            Aw.src = Y + "Images/prev.gif";
            Aw.alt = "Previous";
            Aw.title = "Previous";
            Aw.style.cursor = "pointer";
            Aw.onclick = function(AK) {
                TooltipManager.hideTooltip();
                M -= 1;
                K.showResult()
            }
        }
        else {

            Aw.src = Y + "Images/prevd.gif"
        }
        Ay.appendChild(Aw);
        Ay.appendChild(document.createTextNode(" "));
        var Ax = document.createElement("img");
        if (Aj) {
            Ax.src = Y + "Images/next.gif";
            Ax.alt = "Next";
            Ax.title = "Next";
            Ax.style.cursor = "pointer";
            Ax.onclick = function(AL) {
                TooltipManager.hideTooltip();
                M += 1;
                var AM = parseInt(u.options[u.selectedIndex].value, 10);
                var AK = ((M + 1) * AM);
                if (S.length < AK) {
                    if (AK >= k) {
                        K.showResult()
                    }
                    else {
                        y = 0;
                        w += 1;
                        K.loadResult(Af)
                    }
                }
                else {
                    K.showResult()
                }
            }
        }
        else {
            Ax.src = Y + "Images/nextd.gif"
        }
        Ay.appendChild(Ax);
        var AB = document.createElement("tr");
        AB.appendChild(Ay);
        var Aq = document.createElement("tbody");
        Aq.appendChild(AB);
        var An = document.createElement("table");
        An.style.width = "100%";
        An.cellpadding = "0";
        An.cellspacing = "0";
        An.border = "0";
        An.appendChild(Aq);
        var Av = document.createElement("div");
        Av.style.textAlign = "center";
        Av.style.verticalAlign = "middle";
        Av.style.whiteSpace = "nowrap";
        Av.appendChild(An);
        s.appendChild(Av);
        L.style.backgroundColor = "#e6e6e6";
        B.style.backgroundColor = "#e6e6e6";
        if (T == D.BROWSE) {
            $nodisplay(z);
            $display(r)
        }
        $display(s)
    };
    this.imageBroken = function(Ah) {
        document.getElementById("i" + Ah).src = Y + "Images/no_image.jpg"
    };
    this.populateListItem = function(Ai) {
        var Aj = ' target="_blank"';
        var Ah = '<table border="0" cellpadding="0" cellspacing="0" style="width:100%"><tbody><tr><td style="text-align:left;vertical-align:top;width:65px;height:50px;padding-top:3px;padding-bottom:3px;padding-left:11px;padding-right:9px"><div id="div' + p + Ai.id.toString() + '" style="display:block;width:65px;height:50px;position:absolute"><a href="' + Ai.url + '"' + Aj + '><img src="' + _I + 'flakes/amit/AOLVideo/Images/border.gif" border="0"/></a></div><img src="' + Ai.thumbnail + '" style="cursor:pointer;width:65px;height:50px;border:0px"/></td><td style="text-align:left;vertical-align:top;width:100%;padding-top:6px;padding-bottom:6px">' + this.populateContent(Ai) + "</td></tr></tbody></table>";
        return Ah
    };
    this.populateContent = function(Aj) {
        var Al = 'target="_blank"';
        var Ai = "n/a";
        if ($trim(Aj.channel).length > 0) {
            Ai = $trim(Aj.channel);
            if ($trim(Aj.channelUrl).length > 0) {
                var Ak = Aj.channelUrl;
                if ((Ak.indexOf("http://") < 0) && (Ak.indexOf("https://") < 0)) {
                    Ak = "http://" + Ak
                }
                Ai = '<a href="' + Ak + '"' + Al + ' style="color:#007600">' + Ai + "</a>"
            }
        }
        var Ah = '<table cellpadding="0" cellspacing="0" style="width:100%"><tbody><tr><td style="text-align:left;vertical-align:top;padding-top:0px"><a id="lnk' + p + Aj.id.toString() + '" href="' + Aj.url + '"' + Al + "><strong>" + this.wrapText(Aj.title, 32) + '</strong></a></td></tr><tr><td style="text-align:left;vertical-align:top">Runtime: ' + this.calculateRuntime(Aj.length) + " | Views: " + Aj.viewCount.toString() + '</td></tr><tr><td style="text-align:left;vertical-align:middle">Channel: ' + Ai + "</td></tr></tbody></table>";
        return Ah
    };
    this.buildTip = function(Ah) {
        var Ai = new Sys.StringBuilder();
        Ai.append('<div style="text-align:left;vertical-align:top">');
        Ai.append('<div style="text-align:left;vertical-align:top"><span style="font-weight:bold">' + this.wrapText(Ah.title, 64) + "</span></div>");
        if (Ah.description.length > 0) {
            Ai.append('<div style="text-align:left;vertical-align:top"><span>' + this.wrapText(Ah.description, 255) + "</span></div>")
        }
        Ai.append('<div style="text-align:left;vertical-align:top"><span style="font-weight:bold">Runtime:</span> ' + this.calculateRuntime(Ah.length) + ' | <span style="font-weight:bold">Views:</span> ' + Ah.viewCount.toString() + '</div><div style="text-align:left;vertical-align:top"><span style="font-weight:bold">Channel:</span> <span style="color:#007600">' + Ah.channel + "</span></div>");
        Ai.append("</div>");
        return Ai.toString()
    };
    this.calculateRuntime = function(Ai) {
        var Aj = new Date;
        Aj.setHours(0, 0, 0, 0);
        Aj.setSeconds(Ai);
        var Ah = "";
        if (Aj.getHours > 0) {
            Ah = Aj.getHours().toString() + ":"
        }
        Ah += Aj.getMinutes().toString() + ":";
        Ah += Aj.getSeconds().toString();
        return Ah
    };
    this.onIEEditKeyDown = function() {
        if (event.keyCode == 13) {
            event.returnValue = false;
            event.cancel = true;
            t.focus();
            t.click()
        }
    };
    this.onMozillaEditKeyDown = function(Ah) {
        if (Ah.which == 13) {
            Ah.returnValue = false;
            Ah.cancel = true;
            t.focus();
            t.click()
        }
    };
    this.onIESearchKeyDown = function() {
        if (event.keyCode == 13) {
            event.returnValue = false;
            event.cancel = true;
            O.focus();
            O.click()
        }
    };
    this.onMozillaSearchKeyDown = function(Ah) {
        if (Ah.which == 13) {
            Ah.returnValue = false;
            Ah.cancel = true;
            O.focus();
            O.click()
        }
    };
    this.showTab = function(Ah) {
        Ad.className = "aolVideoTabUp";
        j.className = "aolVideoTabUp";
        L.style.backgroundColor = "#ffffff";
        B.style.backgroundColor = "#ffffff";
        $nodisplay(i);
        $nodisplay(z);
        $nodisplay(r);
        $nodisplay(s);
        if (Ah == D.BROWSE) {
            j.className = "aolVideoTabDown";
            g.selectedIndex = 0;
            $display(z)
        }
        else {
            Ad.className = "aolVideoTabDown";
            $display(i);
            P.value = ""
        }
        s.innerHTML = "";
        V.innerHTML = "";
        TooltipManager.hideTooltip()
    };
    this.save = function() {
        R.Profiles[c] = u.options[u.selectedIndex].value;
        R.Profiles[b] = m.options[m.selectedIndex].value;
        R.Profiles[q] = C.options[C.selectedIndex].value;
        R.Profiles[I] = f.options[f.selectedIndex].value;
        R.Profiles[Ag] = Q.options[Q.selectedIndex].value;
        R.Profiles[o] = Z.options[Z.selectedIndex].value;
        R.Profiles[l] = d.options[d.selectedIndex].value;
        R.save();
        R.toggleEdit();
        if (G) {
            if (T == D.BROWSE) {
                this.loadResultByCategory()
            }
            else {
                this.search()
            }
        }
    };
    function Ab(An) {
        if (An != null) {
            this.id = parseInt(An.getElementsByTagName("id")[0].firstChild.nodeValue);
            this.title = An.childNodes[1].firstChild.nodeValue;
            this.url = An.getElementsByTagName("videoUrl")[0].firstChild.nodeValue;
            this.thumbnail = An.getElementsByTagName("thumbnailUrl")[0].firstChild.nodeValue;
            this.description = Ap(An.getElementsByTagName("description"));
            this.channel = Ak(An.getElementsByTagName("channel"));
            this.channelUrl = Ak(An.getElementsByTagName("channelUrl"));
            this.length = Ai(An.getElementsByTagName("runtime"));
            this.viewCount = Aq(An.getElementsByTagName("viewCount"))
        }
        function Ap(Ar) {
            var As = "";
            if (Ar != null) {
                if (Ar[0] != null) {
                    if (Ar[0].firstChild != null) {
                        if (Ar[0].firstChild.nodeValue != null) {
                            As = Ar[0].firstChild.nodeValue
                        }
                    }
                }
            }
            return As
        }
        function Al(As) {
            var Ar = "";
            if (As != null) {
                if (As[0] != null) {
                    if (As[0].firstChild != null) {
                        if (As[0].firstChild.nodeValue != null) {
                            Ar = As[0].firstChild.nodeValue
                        }
                    }
                }
            }
            return Ar
        }
        function Ah(As) {
            var Ar = "";
            if (As != null) {
                if (As[0] != null) {
                    if (As[0].firstChild != null) {
                        if (As[0].firstChild.nodeValue != null) {
                            Ar = As[0].firstChild.nodeValue
                        }
                    }
                }
            }
            return Ar
        }
        function Ak(As) {
            var Ar = "";
            if (As != null) {
                if (As[0] != null) {
                    if (As[0].firstChild != null) {
                        if (As[0].firstChild.nodeValue != null) {
                            Ar = As[0].firstChild.nodeValue
                        }
                    }
                }
            }
            return Ar
        }
        function Aj(Ar) {
            var As = "";
            if (Ar != null) {
                if (Ar[0] != null) {
                    if (Ar[0].firstChild != null) {
                        if (Ar[0].firstChild.nodeValue != null) {
                            As = Ar[0].firstChild.nodeValue
                        }
                    }
                }
            }
            return As
        }
        function Ai(Ar) {
            var As = 0;
            if (Ar != null) {
                if (Ar[0] != null) {
                    if (Ar[0].firstChild != null) {
                        if (Ar[0].firstChild.nodeValue != null) {
                            As = parseFloat(Ar[0].firstChild.nodeValue)
                        }
                    }
                }
            }
            return As
        }
        function Aq(Ar) {
            var As = 0;
            if (Ar != null) {
                if (Ar[0] != null) {
                    if (Ar[0].firstChild != null) {
                        if (Ar[0].firstChild.nodeValue != null) {
                            As = parseInt(Ar[0].firstChild.nodeValue)
                        }
                    }
                }
            }
            return As
        }
        function Am(Ar) {
            var As = 0;
            if (Ar != null) {
                if (Ar[0] != null) {
                    if (Ar[0].firstChild != null) {
                        if (Ar[0].firstChild.nodeValue != null) {
                            As = parseInt(Ar[0].firstChild.nodeValue)
                        }
                    }
                }
            }
            return As
        }
        function Ao(Au) {
            var As = new Array();
            if (Au != null) {
                if (Au[0] != null) {
                    if (Au[0].firstChild != null) {
                        if (Au[0].firstChild.nodeValue != null) {
                            var Ar = Au[0].firstChild.nodeValue.split(",");
                            if ((Ar != null) && (Ar.length > 0)) {
                                for (var At = 0; At < Ar.length; At++) {
                                    As.push(Ar[At])
                                }
                            }
                        }
                    }
                }
            }
            return As
        }
    }
    this.createCell = function(Aj, Ah) {
        var Ai = document.createElement("td");
        Ai.style.textAlign = Aj;
        Ai.style.verticalAlign = Ah;
        return Ai
    };
    this.selectListBoxByProfileKey = function(Ai, Ah) {
        if (R.Profiles[Ah] != null) {
            this.selectListBoxByValue(Ai, R.Profiles[Ah])
        }
    };
    this.selectListBoxByValue = function(Aj, Ai) {
        Aj.selectedIndex = 0;
        for (var Ah = 0; Ah < Aj.options.length; Ah++) {
            if (Aj.options[Ah].value == $trim(Ai)) {
                Aj.selectedIndex = Ah;
                break
            }
        }
    };
    this.encodeUri = function(Ah) {
        if (typeof encodeURIComponent != "undefined") {
            return encodeURIComponent(Ah)
        }
        return escape(Ah)
    };
    this.wrapText = function(Ai, Ah) {
        Ai = $trim(Ai); if (Ah == null) {
            Ah = 255
        }
        if (Ai.length > Ah) {
            Ai = Ai.substring(0, (Ah - 3));
            Ai += "..."
        }
        return Ai
    }
};


function Facebookjs(id) {
    var _self = this;
    var _instance = null;
    var secret = "5cf780dd2420f98917ba35907a2749bb";
    var secretCopy = "5cf780dd2420f98917ba35907a2749bb";
    var api_key = "e71ee518d51a8afd32b9be567d09628e";
    this.widgitTitle = "Facebook";
    var v = "1.0";
    var format = "JSON";
    var login_url = "http://www.facebook.com/login.php";
    var server_url = "http://api.facebook.com/restserver.php";
    var sec_server_url = "https://api.facebook.com/restserver.php";
    var RES_PATH = "flakes/facebook/images/";
    var extPermissions_url = "http://www.facebook.com/authorize.php?api_key=" + api_key + "&v=" + v + "&ext_perm=status_update";
    var editLinkTextNoStatus = "Update your status!";
    var editLinkTextDefault = "edit";
    var checkPermissionWindowInterval = 0;
    _self.loginWindow = "";
    _self.permissionsWindow = "";
    _self.first_Name = "";
    _self.status = "";
    var token = null;
    var session_key = null;
    var uid = 0;
    var titleBarCount = 0;
    _self.clickOnCancel = false;
    _self.photoView = "photoView";
    _self.detailedView = "detailedView";
    _self.currentPageForDetailView = 1;
    _self.currentPageForPhotoView = 1;
    _self.currentCategory = _self.detailedView;
    _self.numFriendsPhotoView = 30;
    _self.numFriendsDetailedView = 5;
    _self.showBirthdays = true;
    _self.showSearchbox = true;
    _self.categorySortOfFriends = "statusUpdate";
    _self.detailedShowFrs = true;
    _self.friendsInfoObj = [];
    _self.friendsInfoObjFiltered = [];
    _self.canOpenNewLoginWindow = true;
    _self.alwaysValidSession = false;
    _self.saveLoginAreaContent = null;
    _self.saveFlakeAreaContent = null;
    _self.errorMessage = "";
    _self.thereIsError = false;
    _self.startRefresh = false;
    _self.statusUpdateOpt = "statusUpdate";
    _self.profileUpdateOpt = "profileUpdate";
    _self.sortByLastNameUpOpt = "sortByLastNameUp";
    _self.sortByLastNameDownOpt = "sortByLastNameDown";
    _self.grantedAppPermissions = false;
    var call_id = 0;
    var profile_fields = ["about_me", "activities", "affiliations", "birthday", "books", "current_location", "education_history", "first_name", "last_name", "name", "sex", "status", "profile_update_time", "pic", "pic_big", "pic_small", "pic_square"];
    this.load = function(instance) {
        var I = window.IMAGE_PREFIX;
        instance.body.innerHTML = '<div class="facebook_main_container"> <div id="' + id + 'preloader" class="preloader">Loading ...</div> <p id="' + id + 'errorArea" class="loading" style="display:none">Error area</p> <p id="' + id + 'loginArea" class="loading" style="display:none"> <a class="login" id="' + id + 'login" title="Open a Facebook window to authenticate" target="_blank"> <img src="' + I + 'flakes/facebook/images/splash.gif" alt="login in to my account" /> </a> <span>Please <a class="login" id="' + id + 'login2" title="Open a Facebook window to authenticate" target="_blank">click here</a> and follow the instructions on the popup window in order to login to Facebook from this Flake.</span> <span> If you don\'t have a Facebook account, you can <a id="A1" href="http://www.facebook.com/r.php" target="_blank">register now</a>. </span> </p> <div id="' + id + 'contentArea" class="fbmodule" style="display:none;"> <div class="notifications"> <p class="message"><a href="http://www.facebook.com/inbox/" target="_blank"><span id="messages"></span>�unread messages</a></p> <p class="poke"><a href="http://www.facebook.com/home.php" target="_blank"><span id="poke"></span>�unread pokes</a></p> <p class="friend"><a href="http://www.facebook.com/reqs.php#friend" target="_blank"><span id="friend"></span>�friend requests</a></p> <p class="group"><a href="http://www.facebook.com/reqs.php#group_confirm" target="_blank"><span id="group"></span>�group invites</a></p> <p class="event"><a href="http://www.facebook.com/reqs.php#event_confirm" target="_blank"><span id="event"></span>�event invites</a></p> <br class="clear" /> </div> <div class="user" style=""> <a id="' + id + 'linkBigPicture" href="#"><img id="' + id + 'mypicture" class="picture" src="' + I + 'images/space.gif" border="0" alt="mypicture" /></a> <ul> <li> <a title="Go to my Facebook profile" id="' + id + 'profile" href="#" target="_blank">Profile</a> </li> <li> <a title="Browse my friends list on Facebook" href="http://www.facebook.com/friends.php?r" target="_blank">Friends</a> </li> <li> <a title="Browse my networks on Facebook" href="http://www.facebook.com/networks/" target="_blank">Networks</a> </li> </ul>  <div align="center" class="statusForm" id="' + id + 'statusForm"> <div class="username" id="' + id + 'nameStatus"> </div> <span id="' + id + 'authLinkWrapper" style="display:none;"><a id="' + id + 'auth" target="_blank" onclick="' + id + '.callPermissionsPopup();" class="popupLink"></a></span> <div id="' + id + 'statusDisplayWrapper" class="statusVisible"> <span id="' + id + 'updtTime" class="updtTime"></span> <a id="' + id + 'editLink" onclick="' + id + '.toggleEditor();" class="editLink" href="javascript:void(0)">edit</a> </div> <div id="' + id + 'editorWrapper" class="statusHidden">  <input class="statusTextEdit" id="' + id + 'statusTextEdit" onkeypress="' + id + '.updateStatus(event, this.value);" type="text" value="" />  <input class="submit" style=" display:none; margin-left: 5px; " onclick="" type="button" value="Go" />  <br /> <span class="clearstatus" id="' + id + 'clearstatus">  <a href="javascript:void(0);" onclick="' + id + '.clearStatus();">clear status </a>�|�  <a href="javascript:void(0);" onclick="' + id + '.cancelStatus();">cancel</a> </span> </div> </div> </div> <div id="' + id + 'users_birthdays" class="birthday_wraper"></div> <br class="clear" /> <div id="' + id + 'preloderInFlakeContent" class="preloader preloderInFlakeContent">Loading ...</div> <div style="display: none;" id="' + id + 'prof_table"></div> <br class="clear" /> <div class="expanded" id="' + id + 'titlebar"> <span> <span id="' + id + 'photolink" class="photolink" title="Switch to photo view">Photo view</span> </span> <div>Friends</div> </div> <br class="clear" /> <div id="' + id + 'friends_container"> <div align="center" class="search inactive" id="' + id + 'searchForm"> <input class="search" id="' + id + 'search" type="text" onkeyup="' + id + '.filterFriends(0);" value="search within friends" style="padding-right: 18px;" />  <img id="' + id + 'clearSearchForm" class="clearHide" alt="Clear" title="Clear" src="' + I + 'images/space.gif" /> <input class="submit" style="display:none; margin-left: 5px; " type="submit" value="Go" /> </div> <div class="friends" id="' + id + 'friends"></div> <br class="clear" /> <div class="paging"> <div class="nv-pager"> <a id="' + id + 'lnkPrev" style="display:none; border:none;" class="prev" href="#" target="_blank" onclick="' + id + '.goToPrevPage(); return false;">prev</a> <a id="' + id + 'lnkNext" style="display:none; border:none;" class="next" href="#" target="_blank" onclick="' + id + '.goToNextPage(); return false;">next</a> </div> </div> <br class="clear" /> </div> </div>  </div>'; instance.setEditArea('<div class="facebook_info_settings"> <label> <span>Sort friends by:</span> <select name="sort" id="' + id + 'sort"> <option value="statusUpdate" selected="selected">Status update</option> <option value="profileUpdate">Profile update</option> <option value="sortByLastNameUp">Last name (A-Z)</option> <option value="sortByLastNameDown">Last name (Z-A)</option> </select> </label> <label> <span>Number of friends in detailed view:</span> <select id="' + id + 'numFriendsDetailedView"> <option value="1">1</option> <option value="2">2</option> <option value="5" selected="selected">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> </select> </label> <label> <span>Number of friends in photo view:</span> <select id="' + id + 'numFriendsPhotoView"> <option value="1">1</option> <option value="2">2</option> <option value="5">5</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="25">25</option> <option value="30" selected="selected">30</option> <option value="35">35</option> <option value="40">40</option> <option value="45">45</option> <option value="50">50</option> <option value="55">55</option> <option value="60">60</option> <option value="65">65</option> <option value="70">70</option> <option value="75">75</option> <option value="80">80</option> <option value="85">85</option> <option value="90">90</option> <option value="95">95</option> </select> </label> <label> <span>Display today\'s birthdays, if any:</span> <input id="' + id + 'birthdays" type="checkbox" name="birthdays" /> </label> <br class="clear" /> <label> <span>Display search box:</span> <input id="' + id + 'searchbox" type="checkbox" name="searchbox" /> </label> <br class="clear" /> <label class="logout"> <span>Logout:</span> <input id="' + id + 'logout" class="button" type="button" value="logout" /> </label> <br class="clear" /> <label> <input id="' + id + 'saveButton" onclick="' + id + '.saveOptions();" class="button" type="button" value="Save" /> <input id="' + id + 'cancelButton" onclick="' + id + '.cancelOptions();" style="margin-left:10px; text-decoration:none;" class="button cancel" type="button" value="Cancel" /> </label> <br class="clear" /><br class="clear" /> </div>');
        _instance = instance;
        _instance.setTitle(_self.widgitTitle);
        _instance.beforeClose = function() {
            _self.doLogout();
            return true
        };
        if (_instance.page.IsOwner == false) {
            _self.showError("1")
        }
        else {
            _instance.setIcon(RES_PATH + "facebook.ico");
            _instance.enableRefresh();
            _self.createToken();
            if (_instance.PrivateProfiles.session_key) {
                _self.alwaysValidSession = true
            }
            else {
                $nodisplay($(id + "preloader"));
                $display($(id + "loginArea"))
            }
            _self.loadOptions();
            _self.disableLogout();
            $(id + "clearSearchForm").src = RES_PATH + "clear.gif";
            PF.addEvent($(id + "search"), "focus", this.formActive);
            PF.addEvent($(id + "search"), "blur", this.formUnActive);
            PF.addEvent($(id + "clearSearchForm"), "click", this.clearSearch);
            PF.addEvent($(id + "search"), "keyup", this.onKeyUpClearImgControl);
            PF.addEvent($(id + "titlebar"), "click", this.changeTitlebar);
            PF.addEvent($(id + "photolink"), "click", this.ViewFriendsControl);
            PF.addEvent($(id + "logout"), "click", this.logout);
            PF.addEvent($(id + "editstatus"), "click", this.editStatus)
        }
    };
    this.refresh = function() {
        if (uid != 0 && _self.startRefresh != false) {
            $display($(id + "preloderInFlakeContent"));
            _self.startRefresh = false; this.showContent()
        }
    };
    _self.loadOptions = function() {
        _self.loadSortOptions();
        _self.loadNumFriendsDetailedView();
        _self.loadNumFriendsPhotoView();
        _self.loadBirthdaysSettings();
        _self.loadSearchBoxSettings()
    };
    _self.saveOptions = function() {
        if (_self.clickOnCancel != true) {
            _self.numFriendsPhotoView = $(id + "numFriendsPhotoView").value;
            _instance.Profiles.numFriendsPhotoViewProfile = _self.numFriendsPhotoView;
            _self.numFriendsDetailedView = $(id + "numFriendsDetailedView").value;
            _instance.Profiles.numFriendsDetailedViewProfile = _self.numFriendsDetailedView;
            _self.showBirthdays = ($(id + "birthdays").checked == true) ? true : false;
            _instance.Profiles.birthdays = _self.showBirthdays;
            if (_self.showBirthdays) {
                $display($(id + "users_birthdays"));
                _self.showUsersBirthdays()
            }
            else {
                $nodisplay($(id + "users_birthdays"))
            }
            if ($(id + "sort").value == _self.statusUpdateOpt) {
                _self.statusUpdate();
                _instance.Profiles.sort = "statusUpdate";
                _self.categorySortOfFriends = "statusUpdate"
            }
            else {
                if ($(id + "sort").value == _self.profileUpdateOpt) {
                    _self.profileUpdate();
                    _instance.Profiles.sort = "profileUpdate";
                    _self.categorySortOfFriends = "profileUpdate"
                }
                else {
                    if ($(id + "sort").value == _self.sortByLastNameUpOpt) {
                        _self.sortByLastNameUp();
                        _instance.Profiles.sort = "sortByLastNameUp";
                        _self.categorySortOfFriends = "sortByLastNameUp"
                    }
                    else {
                        if ($(id + "sort").value == _self.sortByLastNameDownOpt) {
                            _self.sortByLastNameDown();
                            _instance.Profiles.sort = "sortByLastNameDown";
                            _self.categorySortOfFriends = "sortByLastNameDown"
                        }
                    }
                }
            }
            _self.showSearchbox = ($(id + "searchbox").checked == true) ? true : false;
            _instance.Profiles.showSearchbox = _self.showSearchbox;
            if (_self.showSearchbox == true) {
                $display($(id + "searchForm"))
            }
            else {
                $nodisplay($(id + "searchForm"))
            }
            _instance.save()
        }
        _self.showFriends(_self.getCurrentCategory(), _self.getCurrentPage());
        _self.clickOnCancel = false; _instance.hideEditArea()
    };
    _self.disableLogout = function() {
        PF.disabled($(id + "logout"))
    };
    _self.enableLogout = function() {
        PF.enabled($(id + "logout"))
    };
    _self.cancelOptions = function() {
        _self.clickOnCancel = true;
        _instance.hideEditArea();
        _self.loadOptions()
    };
    _self.loadSortOptions = function() {
        if (_instance.Profiles.sort) {
            _self.categorySortOfFriends = _instance.Profiles.sort
        }
        if ("statusUpdate" == _self.categorySortOfFriends) {
            $(id + "sort").value = _self.statusUpdateOpt
        }
        else {
            if ("profileUpdate" == _self.categorySortOfFriends) {
                $(id + "sort").value = _self.profileUpdateOpt
            }
            else {
                if ("sortByLastNameUp" == _self.categorySortOfFriends) {
                    $(id + "sort").value = _self.sortByLastNameUpOpt
                }
                else {
                    if ("sortByLastNameDown" == _self.categorySortOfFriends) {
                        $(id + "sort").value = _self.sortByLastNameDownOpt
                    }
                }
            }
        }
    };
    _self.loadNumFriendsDetailedView = function() {
        if (_instance.Profiles.numFriendsDetailedViewProfile) {
            _self.numFriendsDetailedView = _instance.Profiles.numFriendsDetailedViewProfile;
            $(id + "numFriendsDetailedView").value = _self.numFriendsDetailedView
        }
        else {
            $(id + "numFriendsDetailedView").value = _self.numFriendsDetailedView
        }
    };
    _self.loadNumFriendsPhotoView = function() {
        if (_instance.Profiles.numFriendsPhotoViewProfile) {
            _self.numFriendsPhotoView = _instance.Profiles.numFriendsPhotoViewProfile;
            $(id + "numFriendsPhotoView").value = _self.numFriendsPhotoView
        }
        else {
            $(id + "numFriendsPhotoView").value = _self.numFriendsPhotoView
        }
    };
    _self.loadBirthdaysSettings = function() {
        if (_instance.Profiles.birthdays == "False" || _instance.Profiles.birthdays == false) {
            _self.showBirthdays = false;
            $(id + "birthdays").checked = false
        }
        else {
            _self.showBirthdays = true;
            $(id + "birthdays").checked = true
        }
    };
    _self.loadSearchBoxSettings = function() {
        if (_instance.Profiles.showSearchbox == "False" || _instance.Profiles.showSearchbox == false) {
            $(id + "searchbox").checked = false;
            $nodisplay($(id + "searchForm"))
        }
        else {
            $(id + "searchbox").checked = true;
            $display($(id + "searchForm"))
        }
    };
    function _postRequest(data, callback) {
        data.api_key = api_key;
        data.v = v;
        data.format = format;
        data.call_id = call_id;
        if (session_key != null) {
            data.session_key = session_key
        }
        data.secret = secret;
        data.auth_token = token;
        var sig = _self.createSignature(data);
        var query = _self.createQueryString(data, sig);
        var url = sec_server_url + query;
        ContentProxy.GetUrlNonCached(url, callback, _self.showProxyError);
        call_id++
    }
    _self.createToken = function() {
        var data = {
            method: "facebook.auth.createToken"
        }
  ;
        _postRequest(data, _tokenCallback)
    };
    this.createSignature = function(args) {
        var str = "";
        var sorted_args_str = _self.getArrayQueryStr(args, "=", "");
        str += sorted_args_str + secret;
        return hex_md5(str)
    };
    _self.getArrayQueryStr = function(array, valSep, pairSep) {
        var keys = [];
        var str = "";
        for (key in array) {
            keys.push(key)
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            str += keys[i] + valSep + array[keys[i]] + pairSep
        }
        return str
    };
    _self.createQueryString = function(args, sig) {
        var query_str = "?"; query_str += _self.getArrayQueryStr(args, "=", "&");
        query_str += "sig=" + sig;
        return query_str
    };
    _self.parseJSON = function(JSON) {
        if (JSON != "" && JSON.indexOf("<error>") == -1 && _self.thereIsError != true) {
            var jsontype = eval("(" + JSON + ")");
            if (jsontype == "") {
                _self.thereIsError = true;
                return false
            }
            else {
                return jsontype
            }
        }
        else {
            _self.thereIsError = true;
            return false
        }
    };
    _self.parseJSONOrError = function(JSON) {
        var jsontype = eval("(" + JSON + ")");
        var isParsable = false;
        if (JSON.indexOf("error") == -1 && JSON != "" && _self.thereIsError != true) {
            isParsable = true
        }
        else {
            if (typeof (jsontype.error_code) != "undefined" && typeof (jsontype.error_msg) != "undefined") {
                isParsable = true
            }
        }
        if (isParsable) {
            if (jsontype == "") {
                _self.thereIsError = true;
                return false
            }
            else {
                return jsontype
            }
        }
        else {
            _self.thereIsError = true;
            return false
        }
    };
    _self.showError = function(code) {
        _self.nodisplayFlakeContent();
        var errorMessage = "";
        if (typeof (code) == "undefined") {
            errorMessage = "An error occurred. Please resubmit the request or try later."
        }
        else {
            if (code == "1") {
                errorMessage = "This flake cannot be shared for privacy reasons."
            }
            else {
                if (code == "2") {
                    errorMessage = "The service is temporarily unavailable. You have to refresh page."
                }
                else {
                    errorMessage = "An error occurred. Please resubmit the request or try later."
                }
            }
        }
        _self.startRefresh = false;
        $(id + "errorArea").innerHTML = errorMessage;
        $display(id + "errorArea")
    };
    _self.showProxyError = function(exception) {
        _self.nodisplayFlakeContent();
        errorMessage = "An error occurred. Please resubmit the request or try later.";
        $(id + "errorArea").innerHTML = errorMessage;
        PF.dumpException(exception)
    };
    _self.clearErrorLog = function() {
        $(id + "errorArea").innerHTML = "";
        $nodisplay(id + "errorArea")
    };
    _self.showErrorAndErrorCode = function(errResponse) {
        if (typeof (errResponse.error_code) != "undefined" && typeof (errResponse.error_msg) != "undefined") {
            _self.nodisplayFlakeContent();
            _self.startRefresh = false;
            $(id + "errorArea").innerHTML = "Facebook returned an error <br/>" + errResponse.error_msg + "<br/> Facebook error code: " + errResponse.error_code;
            $display(id + "errorArea")
        }
        else {
            _self.showError()
        }
    };
    function _tokenCallback(JSON) {
        var response = _self.parseJSON(JSON);
        if (response != false) {
            token = response;
            if (!_self.alwaysValidSession) {
                _self.addEventToLoginLinks()
            }
            else {
                uid = _instance.PrivateProfiles.uid;
                session_key = _instance.PrivateProfiles.session_key;
                secret = _instance.PrivateProfiles.session_secret;
                _self.showContent()
            }
        }
        else {
            _self.showError()
        }
    }
    _self.addEventToLoginLinks = function() {
        PF.addEvent($(id + "login"), "click", _self.showLoginPopup);
        PF.addEvent($(id + "login2"), "click", _self.showLoginPopup)
    };
    _self.showLoginPopup = function() {
        var url = login_url + "?api_key=" + api_key + "&v=" + v + "&popup=1&auth_token=" + token;
        _self.saveFlakeAreaContent = $(id + "contentArea").innerHTML;
        _self.saveLoginAreaContent = $(id + "loginArea").innerHTML;
        $(id + "loginArea").innerHTML = "Once you have logged in, you must close the Facebook window to start retrieving your information.";
        _self.loginWindow = window.open(url, "Facebook", "toolbar=no,status=no,width=646,height=436");
        if (_self.loginWindow) {
            checkLoginWindowInterval = setInterval(checkLoginWindow, 500)
        }
    };
    _self.doLogout = function() {
        var url = "http://www.facebook.com/logout.php?session_key=" + session_key + "&uid=" + uid;
        var postdata = {};
        postdata.confirm = "1";
        App.ContentProxy.FormPost(url, postdata, _self.httpReqChange)
    };
    _self.httpReqChange = function(data) { };
    function checkLoginWindow() {
        if (_self.loginWindow.closed) {
            clearInterval(checkLoginWindowInterval);
            $display(id + "preloader");
            $nodisplay(id + "loginArea");
            var data = { method: "facebook.auth.getSession" };
            _postRequest(data, _sessionCallback)
        }
    }
    function _sessionCallback(JSON) {
        var response = _self.parseJSONOrError(JSON);
        if (response != false) {
            if (typeof (response.error_code) != "undefined") {
                if (response.error_code == 100) {
                    $(id + "loginArea").innerHTML = _self.saveLoginAreaContent;
                    $nodisplay(id + "preloader");
                    $display(id + "loginArea");
                    _self.addEventToLoginLinks()
                }
                else {
                    _self.showErrorAndErrorCode(response)
                }
            }
            else {
                secret = response.secret;
                session_key = response.session_key;
                uid = response.uid;
                if (session_key != null) {
                    if (response.expires == 0) {
                        _instance.PrivateProfiles.session_secret = response.secret;
                        _instance.PrivateProfiles.session_key = response.session_key;
                        _instance.PrivateProfiles.uid = response.uid;
                        _self.alwaysValidSession = true;
                        _instance.save()
                    }
                    _self.showContent()
                }
            }
        }
        else {
            _self.showError()
        }
    }
    this.showContent = function() {
        var data1 = { uids: uid, fields: profile_fields, method: "facebook.users.getInfo" };
        var data2 = { uids: uid, method: "facebook.notifications.get" };
        var data3 = { uids: uid, method: "facebook.friends.get" };
        if (_self.thereIsError != true) {
            _postRequest(data1, getMyInfoCallback)
        }
        if (_self.thereIsError != true) {
            _postRequest(data2, getNotificationsCallback)
        }
        if (_self.thereIsError != true) {
            _postRequest(data3, getFriendsCallback)
        }
    };
    function getFriendsCallback(data) {
        var usersList = _self.parseJSON(data);
        if (usersList != false && typeof usersList[0] != "undefined") {
            var data = { uids: usersList, fields: profile_fields, method: "facebook.users.getInfo" };
            _postRequest(data, parseFriends)
        }
        else {
            if (usersList == false) {
                _self.showError("2")
            }
        }
        _self.showModuleContent()
    }
    function parseFriends(data) {
        _self.friendsInfoObj = _self.parseJSON(data);
        if (_self.friendsInfoObj != false) {
            for (var i = 0; i < _self.friendsInfoObj.length; i++) {
                if (_self.friendsInfoObj[i].status == null) {
                    _self.friendsInfoObj[i].status = { time: 0, message: "" }
                }
            }
            _self.friendsInfoObjFiltered = _self.friendsInfoObj;
            _self.showModuleContent();
            _self.showUsersBirthdays();
            _self.showFriends(_self.getCurrentCategory(), _self.getCurrentPage())
        }
        else {
            _self.showError()
        }
    }
    _self.showModuleContent = function() {
        if (_self.thereIsError != true) {
            $nodisplay($(id + "loginArea"));
            $nodisplay($(id + "preloader"));
            $nodisplay($(id + "preloderInFlakeContent"));
            _self.enableLogout();
            _self.startRefresh = true;
            $display($(id + "contentArea"))
        }
    };
    function getMyInfoCallback(data) {
        var userInfo = _self.parseJSON(data)[0];
        if (userInfo != false && typeof userInfo != "undefined") {
            userInfo.pic_square = (userInfo.pic_square == null || userInfo.pic_square == "") ? ("http://static.ak.facebook.com/pics/t_default.jpg") : (userInfo.pic_square);
            $(id + "mypicture").setAttribute("src", userInfo.pic_square);
            $(id + "linkBigPicture").setAttribute("href", "http://www.facebook.com/profile.php?id=" + userInfo.uid);
            $(id + "linkBigPicture").setAttribute("target", "_blank");
            $(id + "profile").setAttribute("href", "http://www.facebook.com/profile.php?id=" + userInfo.uid);
            if (userInfo.status != null) {
                if (userInfo.status.message != "") {
                    var updTime = convertTime(userInfo.status.time);
                    _self.first_Name = userInfo.first_name;
                    _self.status = userInfo.status.message;
                    $(id + "nameStatus").innerHTML = _self.first_Name + " " + _self.status;
                    $(id + "updtTime").innerHTML = updTime; $(id + "editLink").innerHTML = editLinkTextDefault;
                    $display($(id + "updtTime"))
                }
                else {
                    $(id + "editLink").innerHTML = editLinkTextNoStatus;
                    $nodisplay($(id + "updtTime"))
                }
            }
            var title = _self.widgitTitle + " - " + userInfo.name;
            _instance.setTitle(title);
            var diveHol = $(id + "prof_table");
            diveHol.innerHTML = "";
            var tableHolM = $$("table");
            var tableHol = $$("tbody");
            tableHolM.className = "profileTable";
            tableHolM.appendChild(tableHol);
            diveHol.appendChild(tableHolM);
            _self.addNetworksInfo(tableHol, userInfo.affiliations);
            _self.addSexInfo(tableHol, userInfo.sex);
            _self.addBirthdayInfo(tableHol, userInfo.birthday);
            _self.addHometownInfo(tableHol, userInfo.current_location);
            TooltipManager.setTooltip($(id + "mypicture"), userInfo.name)
        }
        else {
            _self.showError()
        }
    }
    _self.setStatusLink = function(uid) {
        var stLink = $$("a");
        $(id + "status").innerHTML = "";
        stLink.innerHTML = "Update my status!";
        stLink.setAttribute("target", "_blank");
        $(id + "status").appendChild(stLink)
    };
    _self.addNetworksInfo = function(tableLink, affiliations) {
        if (affiliations.length != 0) {
            var netInfo = 0;
            for (var i = 0; i < affiliations.length; i++) {
                netInfo = affiliations[i];
                var tr = $$("tr");
                var td1 = $$("td");
                var td2 = $$("td");
                if (i == 0) {
                    td1.innerHTML = "Networks:"
                }
                td1.className = "label";
                var aLink = $$("a");
                aLink.setAttribute("href", "http://www.facebook.com/networks/?nk=" + netInfo.nid); aLink.innerHTML = netInfo.name;
                aLink.setAttribute("target", "_blank");
                td2.appendChild(aLink);
                td2.className = "data";
                tableLink.appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2)
            }
        }
    };
    _self.addSexInfo = function(tableLink, usersex) {
        if (typeof usersex != "undefined" && usersex != "") {
            var tr = $$("tr");
            var td1 = $$("td");
            var td2 = $$("td");
            td1.innerHTML = "Sex:";
            td1.className = "label";
            var sex = (usersex == "male") ? (2) : (1);
            var aLink = $$("a");
            aLink.setAttribute("href", "http://www.facebook.com/b.php?k=100000010&n=-1&sx=" + sex + "&o=4");
            aLink.innerHTML = usersex;
            aLink.setAttribute("target", "_blank");
            td2.appendChild(aLink);
            td2.className = "data";
            tableLink.appendChild(tr);
            tr.appendChild(td1);
            tr.appendChild(td2)
        }
    };
    _self.addBirthdayInfo = function(tableLink, birthday) {
        if (typeof birthday != "undefined") {
            word_month = {
                January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
            };
            var tr = $$("tr");
            var td1 = $$("td");
            var td2 = $$("td");
            td1.innerHTML = "Birthday:";
            td1.className = "label";
            var userDate = new Date();
            userDate.setTime(Date.parse(birthday)); var userYear = userDate.getFullYear(); if (!isNaN(userYear)) { var userDate = new Date(); userDate.setTime(Date.parse(birthday)); var userMonth = userDate.getMonth(); var normalMonth = userMonth + 1; var userDay = userDate.getDate(); var aLink = $$("a"); aLink.setAttribute("href", "http://www.facebook.com/s.php?adv&k=100000010&n=-1&67=" + normalMonth + "%2F" + userDay + "&o=4"); var monthToShow = ""; for (monthName in word_month) { if (userMonth == word_month[monthName]) { monthToShow = monthName } } aLink.innerHTML = monthToShow + " " + userDay; aLink.setAttribute("target", "_blank"); td2.appendChild(aLink); var currentDate = new Date(); var currentYear = currentDate.getFullYear(); var age = currentYear - userYear; var bLink = $$("a"); bLink.setAttribute("href", "http://www.facebook.com/b.php?k=100000010&n=-1&y1=" + age + "&y2=" + age + "&o=4"); bLink.innerHTML = ", " + userYear; bLink.setAttribute("target", "_blank"); td2.appendChild(bLink) } else { var foundOfpoint = birthday.indexOf(" "); var userMonth = birthday.substring(0, foundOfpoint); var userDay = birthday.substring(foundOfpoint + 1, birthday.length); var normalMonth = word_month[userMonth]; var aLink = $$("a"); aLink.setAttribute("href", "http://www.facebook.com/s.php?adv&k=100000010&n=-1&67=" + normalMonth + "%2F" + userDay + "&o=4"); aLink.setAttribute("target", "_blank"); aLink.innerHTML = userMonth + " " + userDay; td2.appendChild(aLink) } td2.className = "data"; tableLink.appendChild(tr); tr.appendChild(td1); tr.appendChild(td2)
        } 
    }; _self.addHometownInfo = function(tableLink, home) { if (home != null) { if ((typeof home.city != "undefined" && home.city != "") || (typeof home.country != "undefined" && home.country != "")) { var tr = $$("tr"); var td1 = $$("td"); var td2 = $$("td"); td1.innerHTML = "Hometown:"; td1.className = "label"; var cityIsNotEmpty = false; if (home.city != "" && typeof home.city != "undefined") { var cityLink = $$("a"); cityLink.setAttribute("href", "http://www.facebook.com/s.php?adv&k=100000010&n=-1&c1=" + home.city + "&o=4"); cityLink.innerHTML = home.city; cityLink.setAttribute("target", "_blank"); td2.appendChild(cityLink); cityIsNotEmpty = true } if (home.country != "" && typeof home.country != "undefined") { var countryHold = $$("span"); countryHold.setAttribute("target", "_blank"); if (cityIsNotEmpty == true) { countryHold.innerHTML = ", " + home.country } else { countryHold.innerHTML = " " + home.country } td2.appendChild(countryHold) } td2.className = "data"; tableLink.appendChild(tr); tr.appendChild(td1); tr.appendChild(td2) } } }; _self.statusUpdate = function() { var temp = null; for (var pass = 0; pass < _self.friendsInfoObjFiltered.length; pass++) { for (var i = 0; i < _self.friendsInfoObjFiltered.length - 1; i++) { if (_self.friendsInfoObjFiltered[i].status.time < _self.friendsInfoObj[i + 1].status.time) { temp = _self.friendsInfoObjFiltered[i]; _self.friendsInfoObjFiltered[i] = _self.friendsInfoObjFiltered[i + 1]; _self.friendsInfoObjFiltered[i + 1] = temp } } } }; _self.profileUpdate = function() { var temp = null; for (var pass = 0; pass < _self.friendsInfoObjFiltered.length; pass++) { for (var i = 0; i < _self.friendsInfoObjFiltered.length - 1; i++) { if (_self.friendsInfoObjFiltered[i].profile_update_time < _self.friendsInfoObjFiltered[i + 1].profile_update_time) { temp = _self.friendsInfoObjFiltered[i]; _self.friendsInfoObjFiltered[i] = _self.friendsInfoObjFiltered[i + 1]; _self.friendsInfoObjFiltered[i + 1] = temp } } } }; _self.sortByLastNameUp = function() { var temp = null; for (var pass = 0; pass < _self.friendsInfoObjFiltered.length; pass++) { for (var i = 0; i < _self.friendsInfoObjFiltered.length - 1; i++) { if (_self.friendsInfoObjFiltered[i].last_name > _self.friendsInfoObjFiltered[i + 1].last_name) { temp = _self.friendsInfoObjFiltered[i]; _self.friendsInfoObjFiltered[i] = _self.friendsInfoObjFiltered[i + 1]; _self.friendsInfoObjFiltered[i + 1] = temp } } } }; _self.sortByLastNameDown = function() { var temp = null; for (var pass = 0; pass < _self.friendsInfoObjFiltered.length; pass++) { for (var i = 0; i < _self.friendsInfoObjFiltered.length - 1; i++) { if (_self.friendsInfoObjFiltered[i].last_name < _self.friendsInfoObjFiltered[i + 1].last_name) { temp = _self.friendsInfoObjFiltered[i]; _self.friendsInfoObjFiltered[i] = _self.friendsInfoObjFiltered[i + 1]; _self.friendsInfoObjFiltered[i + 1] = temp } } } }; function getNotificationsCallback(info) { var data = _self.parseJSON(info); if (data != false) { if (typeof data.messages.unread != "undefined" && data.messages.unread != null) { $("messages").innerHTML = data.messages.unread } if (typeof data.pokes.unread != "undefined" && data.pokes.unread != null) { $("poke").innerHTML = data.pokes.unread } $("friend").innerHTML = (typeof data.friend_requests[0] != "undefined" && data.friend_requests != null) ? (data.friend_requests.length) : (0); $("group").innerHTML = (typeof data.group_invites.length != "undefined" && data.group_invites != null) ? (data.group_invites.length) : (0); $("event").innerHTML = (typeof data.event_invites[0] != "undefined" && data.event_invites != null) ? (data.event_invites.length) : (0) } else { _self.showError() } } _self.detailedViewFriends = function() { _self.sorting(); _self.changeTitlebar("openTitleBar"); var usersList = _self.friendsInfoObjFiltered; var page = _self.getCurrentPage(); var userInfo = null; var statusMessage = ""; var profileMessage = ""; var updTime = ""; $(id + "friends").innerHTML = ""; var startIndex = page * _self.numFriendsDetailedView - _self.numFriendsDetailedView; var endIndex = _self.numFriendsDetailedView * page; if (usersList.length > _self.numFriendsDetailedView) { _self.showNextLink() } if (endIndex >= usersList.length) { endIndex = usersList.length; _self.hideNextLink() } if (startIndex >= usersList.length) { startIndex = usersList.length } if (endIndex == startIndex) { startIndex = 0; endIndex = usersList.length; _self.hideNextLink(); _self.hidePrevLink(); _self.setCurrentPage("1"); page = 1 } if (page != 1) { _self.showPrevLink() } else { _self.hidePrevLink() } for (var i = startIndex; i < endIndex; i++) { statusMessage = ""; profileMessage = ""; userInfo = usersList[i]; userInfo.pic_square = (userInfo.pic_square == "" || userInfo.pic_square == null) ? ("http://static.ak.facebook.com/pics/t_default.jpg") : (userInfo.pic_square); if (userInfo.status != null && userInfo.status.message != "") { updTime = convertTime(userInfo.status.time); statusMessage = '<p class="status">' + userInfo.status.message + "<span>Updated " + updTime + "</span></p>" } if (userInfo.profile_update_time != 0) { var profileUpdTime = convertTime(userInfo.profile_update_time); profileMessage = '<p class="profile">' + userInfo.name + " profile updated " + profileUpdTime + "</p>" } var friend = $$("div"); var str = '<div class="friend"><div class="toolbar"><a class="message" href="http://www.facebook.com/message.php?id=' + userInfo.uid + '" title="Send a message to ' + userInfo.first_name + '" target="_blank"></a><a class="wall_post" href="http://www.facebook.com/wall.php?id=' + userInfo.uid + '" title="Write a post on ' + userInfo.first_name + '\'s wall" target="_blank"></a><a class="poke" href="http://www.facebook.com/poke.php?id=' + userInfo.uid + '" title="Poke ' + userInfo.first_name + '!" target="_blank"></a></div><a href="http://www.facebook.com/message.php?id=' + userInfo.uid + '" target="_blank"><img id=' + userInfo.uid + ' class="picture" width="50" height="50" alt="picture" src="' + userInfo.pic_square + '"/></a><p><a href="http://www.facebook.com/profile.php?id=' + userInfo.uid + '" target="_blank">' + userInfo.name + "</a>" + statusMessage + profileMessage + "</p></div>"; friend.innerHTML = str; $(id + "friends").appendChild(friend); TooltipManager.setTooltip($(userInfo.uid), userInfo.name) } }; _self.showUsersBirthdays = function() { if (_self.showBirthdays == true) { $(id + "users_birthdays").innerHTML = ""; var usersList = _self.friendsInfoObj; word_month2 = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 }; var userInfo = null; for (var i = 0; i < usersList.length; i++) { userInfo = usersList[i]; var birthday = userInfo.birthday; var name = userInfo.name; var uid = userInfo.uid; if (birthday != null) { var userDate = new Date(); userDate.setTime(Date.parse(birthday)); var userDay = userDate.getDate(); var userMonth = userDate.getMonth(); var userYear = userDate.getFullYear(); var currentDate = new Date(); var currentDay = currentDate.getDate(); var currentMonth = currentDate.getMonth(); var currentYear = currentDate.getFullYear(); if (!isNaN(userYear) && userYear != currentYear) { var age = currentYear - userYear; if (userDay == currentDay && userMonth == currentMonth) { var blink = $$("a"); blink.setAttribute("href", "http://www.facebook.com/profile.php?id=" + uid); blink.setAttribute("target", "_blank"); blink.innerHTML = name + " (" + age + ")" } } else { var foundOfpoint = birthday.indexOf(" "); var userMonth = birthday.substring(0, foundOfpoint); var userDay = birthday.substring(foundOfpoint + 1, birthday.length); var userMonth = word_month2[userMonth]; if (userDay == currentDay && userMonth == currentMonth) { var blink = $$("a"); blink.setAttribute("href", "http://www.facebook.com/profile.php?id=" + uid); blink.setAttribute("target", "_blank"); blink.innerHTML = name } } if (userDay == currentDay && userMonth == currentMonth) { var alink = $$("a"); alink.setAttribute("href", "http://www.facebook.com/bdaycal.php"); alink.innerHTML = "Today's birthday: "; alink.setAttribute("target", "_blank"); alink.className = "padHelper"; var pHolder = $$("p"); pHolder.className = "birthday"; pHolder.appendChild(alink); pHolder.appendChild(blink); $(id + "users_birthdays").appendChild(pHolder) } } } } }; _self.showFriends = function(categoryName, page) { _self.setCurrentCategory(categoryName); if (_self.getCurrentPage() != page) { _self.setCurrentPage(page) } if (_self.getCurrentCategory() == _self.photoView) { _self.photoViewFriends() } else { _self.detailedViewFriends() } }; _self.ViewFriendsControl = function(event) { PF.stopBubble(event); if (_self.detailedShowFrs == true) { $(id + "photolink").innerHTML = "Detailed view"; _self.showFriends(_self.photoView, _self.getCurrentPageForPhotoView()); _self.detailedShowFrs = false } else { $(id + "photolink").innerHTML = "Photo view"; _self.showFriends(_self.detailedView, _self.getCurrentPageForDetailView()); _self.detailedShowFrs = true } }; _self.photoViewFriends = function() { _self.changeTitlebar("openTitleBar"); _self.sorting(); var usersList = _self.friendsInfoObjFiltered; var page = _self.getCurrentPage(); var userInfo = null; $(id + "friends").innerHTML = ""; var startIndex = page * _self.numFriendsPhotoView - _self.numFriendsPhotoView; var endIndex = _self.numFriendsPhotoView * page; _self.hideNextLink(); _self.hidePrevLink(); if (usersList.length > _self.numFriendsPhotoView) { _self.showNextLink() } if (endIndex >= usersList.length) { endIndex = usersList.length; _self.hideNextLink() } if (startIndex >= usersList.length) { startIndex = usersList.length } if (endIndex == startIndex) { startIndex = 0; endIndex = usersList.length; _self.hideNextLink(); _self.hidePrevLink(); _self.setCurrentPage("1"); page = 1 } if (page != 1) { _self.showPrevLink() } else { _self.hidePrevLink() } for (var i = startIndex; i < endIndex; i++) { userInfo = usersList[i]; userInfo.pic_square = (userInfo.pic_square == "" || userInfo.pic_square == null) ? ("http://static.ak.facebook.com/pics/t_default.jpg") : (userInfo.pic_square); statusMessage = ""; if (userInfo.status.message != "") { updTime = convertTime(userInfo.status.time); statusMessage = ' <span class="status">' + userInfo.status.message + "<span> Updated " + updTime + "</span></span>" } var friend = $$("a"); friend.setAttribute("href", "http://www.facebook.com/profile.php?id=" + userInfo.uid); friend.setAttribute("target", "_blank"); friend.style.border = "none"; friend.innerHTML = "<img id=" + userInfo.uid + ' class="picture2" width="50" height="50" alt="picture" src="' + userInfo.pic_square + '"/>'; $(id + "friends").appendChild(friend); TooltipManager.setTooltip($(userInfo.uid), userInfo.name + statusMessage) } }; this.updateStatus = function(objEvent, objValue) { var keycode = null; if (typeof (objEvent.keyCode) != "undefined") { keycode = objEvent.keyCode } else { if (typeof (objEvent.which) != "undefined") { keycode = objEvent.which } } if (keycode != null) { if (keycode == 13) { objValue = _self.cleanStatusText(objValue); _self.setStatus(objValue) } } }; _self.cleanStatusText = function(txt) { txt = $trim(txt); var parts = txt.split(" "); if (parts.length > 0) { if (parts[0].toLowerCase() == "is") { parts.shift(); txt = parts.join(" ") } } return txt }; this.toggleEditor = function(isCancel) { var editor = $(id + "editorWrapper"); var statusDisplay = $(id + "statusDisplayWrapper"); if (editor.className == "statusHidden") { editor.className = "statusVisible"; statusDisplay.className = "statusHidden"; if (!isCancel) { $(id + "nameStatus").innerHTML = (_self.first_Name == "") ? "" : _self.first_Name + "..."; $(id + "statusTextEdit").value = _self.status } $(id + "statusTextEdit").focus(); $(id + "statusTextEdit").select() } else { editor.className = "statusHidden"; statusDisplay.className = "editorVisible"; if (isCancel) { $(id + "nameStatus").innerHTML = _self.first_Name + " " + _self.status } $(id + "editLink").focus() } }; this.clearStatus = function() { $(id + "nameStatus").innerHTML = _self.first_Name; $(id + "editLink").innerHTML = editLinkTextNoStatus; $(id + "statusTextEdit").value = ""; _self.status = ""; $nodisplay($(id + "updtTime")); _self.setStatus("") }; this.cancelStatus = function() { $(id + "statusTextEdit").value = ""; if ($(id + "auth") != null) { _self.hideAuthLink() } this.toggleEditor(true) }; _self.setStatus = function(statusMsg) { var data1 = { method: "facebook.users.setStatus", status: statusMsg }; if (_self.thereIsError != true) { _postRequest(data1, setStatusCallback) } }; function setStatusCallback(data) { if (data != "true") { var jsontype = eval("(" + data + ")"); if (typeof (jsontype.error_code) != "undefined" && jsontype.error_code == 250) { _self.callPermissionsPopup() } else { _self.showErrorAndErrorCode(jsontype) } } else { _self.hideAuthLink(); _self.refreshStatus() } } _self.callPermissionsPopup = function() { _self.permissionsWindow = window.open(extPermissions_url, "Facebook", "toolbar=no,status=no,width=646,height=436"); if (_self.permissionsWindow != null) { checkPermissionWindowInterval = setInterval(checkPermissionWindow, 500) } else { _self.showAuthLink() } }; function checkPermissionWindow() { if (_self.permissionsWindow.closed) { clearInterval(checkPermissionWindowInterval); _self.hasAppPermission() } } _self.hasAppPermission = function() { var data = { method: "facebook.users.hasAppPermission", ext_perm: "status_update" }; if (_self.thereIsError != true) { _postRequest(data, hasAppPermissionCallback) } }; function hasAppPermissionCallback(data) { if (data == "1") { var statusText = $(id + "statusTextEdit").value; statusText = _self.cleanStatusText(statusText); _self.setStatus(statusText) } else { _self.showAuthLink() } } _self.showAuthLink = function() { $(id + "auth").innerHTML = "Please click here and follow the instructions on the popup to authorize this Flake to be able to update your status."; $display($(id + "authLinkWrapper")) }; _self.hideAuthLink = function() { $(id + "auth").innerHTML = ""; $nodisplay($(id + "authLinkWrapper")) }; _self.refreshStatus = function() { var editor = $(id + "statusTextEdit"); if ($trim(editor.value).length > 0) { var data1 = { uids: uid, fields: profile_fields, method: "facebook.users.getInfo" }; if (_self.thereIsError != true) { _postRequest(data1, getMyInfoCallback) } } editor.value = ""; this.toggleEditor(false) }; this.filterFriends = function(data) { var usersList = _self.friendsInfoObj; var copyFriends = []; var userInfo = null; var substring = $(id + "search").value.toLowerCase(); if (data == 1) { substring = "" } for (var i = 0; i < usersList.length; i++) { userInfo = usersList[i]; var lname = userInfo.last_name.toLowerCase(); var fname = userInfo.first_name.toLowerCase(); if (lname.substring(0, substring.length) == substring || fname.substring(0, substring.length) == substring) { copyFriends.push(userInfo) } } _self.friendsInfoObjFiltered = copyFriends; _self.currentPageForDetailView = 1; _self.currentPageForPhotoView = 1; _self.showFriends(_self.getCurrentCategory(), _self.getCurrentPage()) }; _self.formActive = function() { var substring = $(id + "search").value.toLowerCase(); if (substring == "search within friends") { PF.removeClass($(id + "searchForm"), "inactive"); $(id + "search").value = "" } }; this.onKeyUpClearImgControl = function() { var substring = $(id + "search").value.toLowerCase(); if (substring.length == 0) { _self.hideClearImg() } if (substring.length >= 1) { _self.showClearImg() } }; _self.formUnActive = function() { var substring = $(id + "search").value.toLowerCase(); if (substring.length == 0) { PF.addClass($(id + "searchForm"), "inactive"); _self.hideClearImg(); $(id + "search").value = "Search within friends"; _self.filterFriends(1) } }; this.clearSearch = function() { $(id + "search").value = ""; _self.formUnActive() }; _self.hideClearImg = function() { PF.removeClass($(id + "clearSearchForm"), "clearShow"); PF.addClass($(id + "clearSearchForm"), "clearHide") }; _self.showClearImg = function() { PF.removeClass($(id + "clearSearchForm"), "clearHide"); PF.addClass($(id + "clearSearchForm"), "clearShow") }; _self.sorting = function() { if ("statusUpdate" == _self.categorySortOfFriends) { _self.statusUpdate() } else { if ("profileUpdate" == _self.categorySortOfFriends) { _self.profileUpdate() } else { if ("sortByLastNameUp" == _self.categorySortOfFriends) { _self.sortByLastNameUp() } else { if ("sortByLastNameDown" == _self.categorySortOfFriends) { _self.sortByLastNameDown() } } } } }; _self.changeTitlebar = function(param) { if (param != "openTitleBar") { if (titleBarCount % 2) { _self.showTitlebar() } else { _self.hideTitlebar() } titleBarCount++ } else { _self.showTitlebar(); titleBarCount = 2 } return false }; _self.showTitlebar = function() { $(id + "titlebar").className = "expanded"; $display($(id + "friends")); if (_self.showSearchbox == true) { $display($(id + "searchForm")) } $display($(id + "friends_container")) }; _self.hideTitlebar = function() { $(id + "titlebar").className = "collapsed"; $nodisplay($(id + "friends_container")); $nodisplay($(id + "friends")); $nodisplay($(id + "searchForm")) }; _self.goToNextPage = function() { var waspage = _self.getCurrentPage(); if (_self.getCurrentCategory() == _self.detailedView) { _self.currentPageForDetailView++ } else { _self.currentPageForPhotoView++ } var curpage = _self.getCurrentPage(); _self.showFriends(_self.getCurrentCategory(), _self.getCurrentPage()) }; _self.goToPrevPage = function() { if (_self.getCurrentCategory() == _self.detailedView) { _self.currentPageForDetailView-- } else { _self.currentPageForPhotoView-- } _self.showFriends(_self.getCurrentCategory(), _self.getCurrentPage()) }; _self.logout = function() { if (_self.thereIsError != true && uid != 0) { if (typeof _self.saveLoginAreaContent != "undefined" && _self.saveLoginAreaContent != null) { $(id + "loginArea").innerHTML = _self.saveLoginAreaContent } $nodisplay($(id + "contentArea")); if (typeof _self.saveFlakeAreaContent != "undefined" && _self.saveLoginAreaContent != null) { $(id + "contentArea").innerHTML = _self.saveFlakeAreaContent } _self.setSettingsToDefault(); $display($(id + "loginArea")); _instance.hideEditArea(); _self.createToken() } else { _instance.hideEditArea() } }; _self.setSettingsToDefault = function() { _instance.PrivateProfiles.session_secret = ""; _instance.PrivateProfiles.session_key = ""; _instance.PrivateProfiles.uid = ""; _instance.Profiles.numFriendsPhotoViewProfile = ""; _instance.Profiles.numFriendsDetailedViewProfile = ""; _instance.Profiles.birthdays = "true"; _instance.Profiles.sort = ""; _instance.Profiles.showSearchbox = "true"; _instance.setTitle(_self.widgitTitle); _self.alwaysValidSession = false; _self.disableLogout(); token = null; session_key = null; secret = secretCopy; uid = 0; _self.photoView = "photoView"; _self.detailedView = "detailedView"; _self.currentPageForDetailView = 1; _self.currentPageForPhotoView = 1; _self.currentCategory = _self.detailedView; _self.numFriendsPhotoView = 30; _self.numFriendsDetailedView = 5; _self.showBirthdays = true; _self.showSearchbox = true; _self.categorySortOfFriends = "statusUpdate"; _self.detailedShowFrs = true; _self.friendsInfoObj = []; _self.friendsInfoObjFiltered = []; _self.canOpenNewLoginWindow = true; _self.errorMessage = ""; _self.thereIsError = false; _self.loadOptions(); _self.clearErrorLog(); PF.addEvent($(id + "search"), "focus", this.formActive); PF.addEvent($(id + "search"), "blur", this.formUnActive); PF.addEvent($(id + "clearSearchForm"), "click", this.clearSearch); PF.addEvent($(id + "search"), "keyup", this.onKeyUpClearImgControl); PF.addEvent($(id + "titlebar"), "click", this.changeTitlebar); PF.addEvent($(id + "photolink"), "click", this.ViewFriendsControl); PF.addEvent($(id + "logout"), "click", this.logout); $(id + "clearSearchForm").src = RES_PATH + "clear.gif"; _instance.save() }; _self.setCurrentCategory = function(categoryName) { _self.currentCategory = categoryName }; _self.getCurrentCategory = function() { return _self.currentCategory }; _self.setCurrentPage = function(page) { if (_self.getCurrentCategory() == _self.detailedView) { _self.currentPageForDetailView = page } else { _self.currentPageForPhotoView = page } }; _self.getCurrentPage = function() { if (_self.getCurrentCategory() == _self.detailedView) { return _self.currentPageForDetailView } else { return _self.currentPageForPhotoView } }; _self.getCurrentPageForDetailView = function() { return _self.currentPageForDetailView }; _self.getCurrentPageForPhotoView = function() { return _self.currentPageForPhotoView }; _self.hidePrevLink = function() { $nodisplay($(id + "lnkPrev")) }; _self.hideNextLink = function() { $nodisplay($(id + "lnkNext")) }; this.showPrevLink = function() { $display($(id + "lnkPrev")) }; this.showNextLink = function() { $display($(id + "lnkNext")) }; _self.nodisplayFlakeContent = function() { $nodisplay(id + "preloader"); $nodisplay(id + "preloderInFlakeContent"); $nodisplay(id + "contentArea"); $nodisplay(id + "loginArea"); _self.startRefresh = false }; function convertTime(sec) { if (sec != 0) { var sec = sec * 1000; var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Today", "Yesterday"]; var xm = ""; var day = ""; var d = new Date(sec); var eventHours = d.getHours() % 12; if (eventHours == 0) { eventHours = 12 } xm = (d.getHours() < 12) ? "am" : "pm"; var eventMinutes = d.getMinutes(); var eventDay = d.getDate(); if (eventMinutes < 10) { eventMinutes = "0" + eventMinutes } var curruntTime = new Date(); var today = curruntTime.getDate(); if ((today - eventDay) == 0) { day = weekday["7"] } else { if ((today - eventDay) == 1) { day = weekday["8"] } else { day = weekday[d.getDay()] } } return day + " at " + eventHours + ":" + eventMinutes + " " + xm } else { return "" } } var hexcase = 0; var b64pad = ""; var chrsz = 8; function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)) } function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)) } function str_md5(s) { return binl2str(core_md5(str2binl(s), s.length * chrsz)) } function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)) } function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)) } function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)) } function md5_vm_test() { return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72" } function core_md5(x, len) { x[len >> 5] |= 128 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len; var a = 1732584193; var b = -271733879; var c = -1732584194; var d = 271733878; for (var i = 0; i < x.length; i += 16) { var olda = a; var oldb = b; var oldc = c; var oldd = d; a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330); a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983); a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162); a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329); a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302); a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848); a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501); a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734); a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556); a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640); a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189); a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651); a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055); a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799); a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649); a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551); a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd) } return Array(a, b, c, d) } function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b) } function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t) } function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t) } function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t) } function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t) } function core_hmac_md5(key, data) { var bkey = str2binl(key); if (bkey.length > 16) { bkey = core_md5(bkey, key.length * chrsz) } var ipad = Array(16), opad = Array(16); for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 909522486; opad[i] = bkey[i] ^ 1549556828 } var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz); return core_md5(opad.concat(hash), 512 + 128) } function safe_add(x, y) { var lsw = (x & 65535) + (y & 65535); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 65535) } function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)) } function str2binl(str) { var bin = Array(); var mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) { bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32) } return bin } function binl2str(bin) { var str = ""; var mask = (1 << chrsz) - 1; for (var i = 0; i < bin.length * 32; i += chrsz) { str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask) } return str } function binl2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 15) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 15) } return str } function binl2b64(binarray) { var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var str = ""; for (var i = 0; i < binarray.length * 4; i += 3) { var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 255) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 255) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 255); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > binarray.length * 32) { str += b64pad } else { str += tab.charAt((triplet >> 6 * (3 - j)) & 63) } } } return str } 
};
var TwitterService = function() {
    TwitterService.initializeBase(this);
    this._timeout = 0; this._userContext = null; this._succeeded = null; this._failed = null
}; TwitterService.prototype = { GetUsernamePassword: function(B, C, A, D) { return this._invoke(TwitterService.get_path(), "GetUsernamePassword", true, { flakeID: B }, C, A, D) }, UpdateUsernamePassword: function(C, H, A, G, D, B, E) { return this._invoke(TwitterService.get_path(), "UpdateUsernamePassword", true, { flakeID: C, username: H, password: A, update: G }, D, B, E) }, DeleteFlake: function(B, C, A, D) { return this._invoke(TwitterService.get_path(), "DeleteFlake", true, { flakeID: B }, C, A, D) }, UpdateStatus: function(B, D, C, A, E) { return this._invoke(TwitterService.get_path(), "UpdateStatus", true, { flakeID: B, msg: D }, C, A, E) } }; TwitterService.registerClass("TwitterService", Sys.Net.WebServiceProxy); TwitterService._staticInstance = new TwitterService(); TwitterService.set_path = function(A) { TwitterService._staticInstance._path = A }; TwitterService.get_path = function() { return TwitterService._staticInstance._path }; TwitterService.set_timeout = function(A) { TwitterService._staticInstance._timeout = A }; TwitterService.get_timeout = function() { return TwitterService._staticInstance._timeout }; TwitterService.set_defaultUserContext = function(A) { TwitterService._staticInstance._userContext = A }; TwitterService.get_defaultUserContext = function() { return TwitterService._staticInstance._userContext }; TwitterService.set_defaultSucceededCallback = function(A) { TwitterService._staticInstance._succeeded = A }; TwitterService.get_defaultSucceededCallback = function() { return TwitterService._staticInstance._succeeded }; TwitterService.set_defaultFailedCallback = function(A) { TwitterService._staticInstance._failed = A }; TwitterService.get_defaultFailedCallback = function() { return TwitterService._staticInstance._failed }; TwitterService.set_path("/flakes/twitter/TwitterService.soap"); TwitterService.GetUsernamePassword = function(B, C, A, D) { TwitterService._staticInstance.GetUsernamePassword(B, C, A, D) }; TwitterService.UpdateUsernamePassword = function(C, H, A, G, D, B, E) { TwitterService._staticInstance.UpdateUsernamePassword(C, H, A, G, D, B, E) }; TwitterService.DeleteFlake = function(B, C, A, D) { TwitterService._staticInstance.DeleteFlake(B, C, A, D) }; TwitterService.UpdateStatus = function(B, D, C, A, E) { TwitterService._staticInstance.UpdateStatus(B, D, C, A, E) }; function Twitter_v1(id) { var _instance = null; var _updateBtn = null; var _statusList = null; var _usern = null; var _pass = null; var _inProcess = false; var _instantTime = null; var _currentview = null; var _page = 1; var LOADER = '<div class="downloadInProgress" style="padding:10px 0 5px;">&nbsp;</div>'; var PROFILE_ENUM = { USERNAME: "username", USERID: "uid" }; var TIME_ENUM = { MSECOND: 1000, SECOND: 60, MINUTE: 60, HOUR: 24 }; var TWITTER_ENUM = { URL: "http://twitter.com/", IMAGE_URL: "flakes/twitter/images/", USERURL: "http://twitter.com/#USERNAME#/statuses/#ID#", PUBLIC_TITLE: "<b>Recent public updates</b>", SIGNIN: ' <span style="font-size:7pt;"><b><a onClick=' + id + '.showEdit() href="javascript:void(0)">Sign in</a></b> to your Twitter account</span>', RECENT_TITLE: "<b>What you and your friends are doing</b>", ARCHIVE_TITLE: "<b>What you are doing</b>" }; var TWITTER_TIMELINE = { USER: "http://twitter.com/statuses/user_timeline/#.json", FRIEND: "http://twitter.com/statuses/friends_timeline/#.json", PUBLIC: "http://twitter.com/statuses/public_timeline.json" }; var base64Utility = new Base64Utility(); this.load = function(instance) { _instance = instance; _instance.body.innerHTML = '<div id="' + id + 'tabs" class="TW_tabs"><table cellpadding="0" cellspacing="0"><tr><td id="' + id + 'updateTab" class="TW_unselTab" onclick="' + id + ".select('update')\">Update</td><td id=\"" + id + 'recentTab" class="TW_selTab" onclick="' + id + ".select('recent')\">Recent</td><td id=\"" + id + 'archiveTab" class="TW_unselTab" onclick="' + id + ".select('archive')\">Archive</td><td id=\"" + id + 'publicTab" class="TW_unselTab" onclick="' + id + ".select('public')\">Public</td></tr></table></div><div id=\"" + id + 'contentPnl" ><div id="' + id + 'titleTxt" style="padding:8px 8px 8px 8px;"></div><div id="' + id + 'contTbl" style="padding:0 0 8px 0;"></div><div id="' + id + 'updatePnl" class="TW_update"><table cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding-bottom:5px;"><div style="float:left;clear:left;"><b>What are you doing?</b></div><div id="' + id + 'wordCnt" style="float:right;width:110px;text-align:right;"></div></td></tr><tr><td><textarea id="' + id + 'updateTxt" rows="4" cols="20" style="width:98%;padding-right:0px;border:1px solid #B0B0B0;" onkeypress="' + id + '.wordLeft()"></textarea></td></tr><tr><td><div id="' + id + 'msgView" class="TW_error"></div></td></tr><tr><td style="padding-top:5px;"><input id="' + id + 'updBtn" class="button" type="button" value="Update" onclick="' + id + '.updateStat()" /></td></tr></table></div><div id="' + id + 'paging" align="center" style="padding:2px 0 7px 0;display:none;"><table width="100%"><tr><td id="' + id + 'prev" style="width:50%;text-align:right;padding-right:3px;"></td><td id="' + id + 'next" style="width:50%;text-align:left;padding-left:3px;"></td></tr></table></div></div><div  style="display:none;height:38px;background-image:url(flakes/WeatherComFlake/images/bg.png);"></div>'; _instance.setEditArea('<div id="' + id + 'edit" class="edit"><table cellpadding="2" cellspacing="0" width="100%"><tr><td style="width:100px;">Twitter user name:<br />(or email)</td><td valign="top"><input type="text" id="' + id + 'username" value="" style="width:80%;" /><div style="display:none;width:80%;" id="' + id + 'errFormEmail" class="TW_error"></div></td></tr><tr><td style="width:100px;">Password:</td><td><input type="password" id="' + id + 'pass" value="" style="width:80%" onkeypress="if( event.keyCode == 13 ) ' + id + '.login()" /></td></tr><tr><td>&nbsp;</td><td><div style="display:none;width:80%;" id="' + id + 'errFormPass" class="TW_error"></div></td></tr><tr><td style="width:85px;"></td><td><input type="button" id="' + id + 'login" value="Sign in" class="button" onclick="' + id + '.login()" />&nbsp;<input type="button" id="' + id + 'cLogin" value="Cancel" class="button cancel" onclick="' + id + '.loginCancel()" /></td></tr></table></div>'); _updateBtn = $(id + "updBtn"); _instance.beforeClose = function() { TooltipManager.hideTooltip(); if (instance.page.CanChangeFlake) { TwitterService.DeleteFlake(_instance.internalId) } return true }; var usernameTxt = $(id + "username"); var passTxt = $(id + "pass"); $("body" + id).style.padding = "0px"; $(id + "contTbl").innerHTML = LOADER; $ND($(id + "tabs"), $(id + "paging"), $(id + "msgView")); if (!_instance.Profiles[PROFILE_ENUM.USERID]) { _currentview = "public"; this.getPublic() } else { $D($(id + "tabs")); if (!_instance.page.CanChangeFlake) { usernameTxt.disabled = "disabled"; passTxt.disabled = "disabled"; $(id + "login").disabled = "disabled"; _updateBtn.disabled = "disabled"; this.select("archive") } else { this.showUpdatePnl() } } _instance.enableRefresh() }; this.refresh = function() { this.select(_currentview) }; this.showEdit = function() { _instance.toggleEdit() }; this.initTab = function() { $(id + "updateTab").className = "TW_unselTab"; $(id + "recentTab").className = "TW_unselTab"; $(id + "archiveTab").className = "TW_unselTab"; $(id + "publicTab").className = "TW_unselTab" }; this.select = function(op) { if (_inProcess == true) { return } $(id + "contTbl").innerHTML = LOADER; _page = 1; _inProcess = true; _currentview = op; switch (op) { case "update": this.initTab(); $(id + "updateTab").className = "TW_selTab"; this.showUpdatePnl(); break; case "recent": this.initTab(); $(id + "recentTab").className = "TW_selTab"; if (!_instance.page.CanChangeFlake) { this.initView(); $(id + "titleTxt").innerHTML = TWITTER_ENUM.RECENT_TITLE; $(id + "contTbl").innerHTML = "<div style=\"padding:0 8px 0 8px;\">You don't have enough permission to view this tab's content</div>"; _inProcess = false; $ND($(id + "paging")) } else { this.getRecent() } break; case "archive": this.initTab(); $(id + "archiveTab").className = "TW_selTab"; this.getArchive(); break; case "public": this.initTab(); $(id + "publicTab").className = "TW_selTab"; this.getPublic(); break } }; this.wordLeft = function() { var charCnt = $(id + "updateTxt").value.length; $(id + "wordCnt").innerHTML = "Characters left: " + (140 - charCnt) }; this.initView = function() { _statusList = null; $D($(id + "contTbl"), $(id + "titleTxt")); $ND($(id + "paging"), $(id + "updatePnl"), $(id + "msgView")); $(id + "contentPnl").style.padding = "0" }; this.viewUpdate = function(response) { var errorPnl = $(id + "errFormEmail"); var errorPnlPass = $(id + "errFormPass"); if (typeof (response) != "undefined") { if (response.indexOf("<error>") != -1 || response == "") { errorPnlPass.innerHTML = "Wrong username/password."; $display(errorPnlPass); this.defaultViewOnError(); _instance.toggleEdit(); return } else { if (response.indexOf('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">') != -1) { $(id + "contTbl").innerHTML = '<div style="padding:0 8px 0 8px;">Twitter data service is not available now. Please try later.</div>' } else { this.showUpdatePnl(response, 1) } } } }; this.showUpdatePnl = function(response, savevalue) { this.initTab(); $(id + "updateTab").className = "TW_selTab"; _currentview = "update"; if (!_instance.page.CanChangeFlake) { $(id + "updateTxt").disabled = true; $(id + "msgView").innerHTML = "You dont have permission to update."; $D($(id + "msgView")) } else { this.wordLeft() } $D($(id + "tabs"), $(id + "updatePnl")); $ND($(id + "contTbl"), $(id + "paging"), $(id + "titleTxt")); $(id + "contentPnl").style.padding = "8px"; _inProcess = false; if (typeof (response) != "undefined" && savevalue == "1") { if (_instance.Profiles[PROFILE_ENUM.USERID] == null) { TwitterService.UpdateUsernamePassword(_instance.internalId, _usern, _pass, false) } else { TwitterService.UpdateUsernamePassword(_instance.internalId, _usern, _pass, true) } _usern = null; _pass = null; this.parseJSON(response, savevalue) } }; this.login = function() { var errorPnl = $(id + "errFormEmail"); var errorPnlPass = $(id + "errFormPass"); $nodisplay(errorPnl); $nodisplay(errorPnlPass); $ND($(id + "titleTxt"), $(id + "paging")); var usernameTxt = $(id + "username"); var passTxt = $(id + "pass"); var username = usernameTxt.value.trim(); var password = passTxt.value; if (password == "" || username == "") { if (password == "" && username == "") { errorPnlPass.innerHTML = "Please enter username/email and password."; $display(errorPnlPass); this.defaultViewOnError(); return } else { if (username == "") { errorPnl.innerHTML = "Please enter username/email."; $display(errorPnl); this.defaultViewOnError(); return } else { errorPnlPass.innerHTML = "Please enter password."; $display(errorPnlPass); this.defaultViewOnError(); return } } } else { if (username.indexOf("@") != -1) { var emailRegxp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g; if (emailRegxp.test(username) != true) { if (emailRegxp.test(username) != true) { errorPnl.innerHTML = "Invalid email address"; $display(errorPnl); this.defaultViewOnError(); return } } } else { var emailRegxp = /^([a-zA-Z0-9_\-\.]+)$/g; if (emailRegxp.test(username) != true) { if (emailRegxp.test(username) != true) { errorPnl.innerHTML = "Invalid username"; $display(errorPnl); this.defaultViewOnError(); return } } } } var url = TWITTER_TIMELINE.USER.substring(0, TWITTER_TIMELINE.USER.indexOf("#")); url += username + ".json"; this.authenticate(url, username, password, 1); $(id + "contTbl").innerHTML = LOADER; _instance.toggleEdit() }; this.defaultViewOnError = function() { if (!_instance.Profiles[PROFILE_ENUM.USERNAME]) { $ND($(id + "tabs"), $(id + "paging"), $(id + "msgView")); this.getPublic() } else { $D($(id + "tabs")); this.initTab(); $(id + "recentTab").className = "TW_selTab"; this.getRecent() } }; this.authenticate = function(url, username, pass, auth) { var base64 = base64Utility.encodeBase64(username + ":" + pass); _usern = username; _pass = pass; var headers = [["Authorization", "Basic " + base64]]; if (auth == 1) { App.ContentProxy.GetUrl2(url, headers, F(this, this.viewUpdate), F(this, this.noView)) } else { App.ContentProxy.GetUrlNonCached2(url, headers, [], F(this, this.view), F(this, this.noView)) } }; this.loginCancel = function() { $D($(id + "tabs")); this.select(_currentview); var errorPnl = $(id + "errFormEmail"); var errorPnlPass = $(id + "errFormPass"); $nodisplay(errorPnl); $nodisplay(errorPnlPass); _instance.toggleEdit() }; this.getRecent = function() { this.initView(); $(id + "titleTxt").innerHTML = TWITTER_ENUM.RECENT_TITLE; TwitterService.GetUsernamePassword(_instance.internalId, F(this, this.getCredentialSuccess), F(this, this.noView)) }; this.getCredentialSuccess = function(credentials) { if (credentials) { var url = TWITTER_TIMELINE.FRIEND.replace(/\/#/g, ""); var crds = credentials.split(":"); this.authenticate(url, crds[0], crds[1], 0) } else { $(id + "contTbl").innerHTML = "&nbsp;You need to <b><a onClick=" + id + '.showEdit() href="javascript:void(0)">Sign in</a></b> to your Twitter account in order to view recent history.'; _inProcess = false; _instance.Profiles[PROFILE_ENUM.USERID] = null; _instance.save() } }; this.getArchive = function() { this.initView(); $(id + "titleTxt").innerHTML = TWITTER_ENUM.ARCHIVE_TITLE; if (_instance.Profiles[PROFILE_ENUM.USERID]) { var url = TWITTER_TIMELINE.USER.replace(/#/g, _instance.Profiles[PROFILE_ENUM.USERID]); this.authenticate(url, "", "", 0) } else { this.noView() } }; this.getPublic = function() { this.initView(); $(id + "titleTxt").innerHTML = TWITTER_ENUM.PUBLIC_TITLE; if (!_instance.Profiles[PROFILE_ENUM.USERID]) { $(id + "titleTxt").innerHTML = TWITTER_ENUM.PUBLIC_TITLE + "(" + TWITTER_ENUM.SIGNIN + ")" } App.ContentProxy.GetUrlNonCached(TWITTER_TIMELINE.PUBLIC, F(this, this.view), F(this, this.noView)) }; this.noView = function() { $(id + "contTbl").innerHTML = '<div style="padding:0 8px 0 8px;">No activity found.</div>'; _inProcess = false }; this.view = function(response, savevalue) { if (response != null) { if (typeof (response.Content) != "undefined") { response = response.Content.toString() } else { if (typeof (response) != "object") { response = response.toString() } } } if (_statusList != null || response.indexOf("<error>") == -1 || response != "") { this.parsexml(response, savevalue) } else { if (response.indexOf('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">') != -1) { $(id + "contTbl").innerHTML = '<div style="padding:0 8px 0 8px;">Twitter data service is not available now. Please try later.</div>' } else { this.noView() } } }; this.parseJSON = function(response, v) { eval("var statuses = " + response); var users = statuses[0].user; var userid = users.id; if (v == "1") { _instance.Profiles[PROFILE_ENUM.USERID] = userid; _instance.save() } }; this.parsexml = function(response, savevalue) { $D($(id + "titleTxt")); var pgVar = 0; if (_statusList == null) { eval("var statusList = " + response); _statusList = statusList } if (_statusList.length == 0) { this.noView(); return } var builder = new Sys.StringBuilder(); var userid; builder.append('<table  cellpadding="0" cellspacing="0" border="0" width="100%">'); for (var i = (_page - 1) * 5; i < _statusList.length && i < _page * 5; i++) { var node = _statusList[i]; var dt = node.created_at; var statusid = node.id; var text = node.text; var temp = text; var end; while (temp.indexOf("http://") != -1) { var start = temp.indexOf("http://"); var url = temp.substr(start); if (url.indexOf(" ") != -1) { url = url.substr(0, url.indexOf(" ")) } end = stringFilter(url); url = url.substr(0, end); while (url.charAt(url.Length - 1) == ".") { url = url.substr(0, url.Length - 1) } while (url.charAt(url.Length - 1) == "/") { url = url.substr(0, url.Length - 1) } while (url.charAt(url.Length - 1) == "-") { url = url.substr(0, url.Length - 1) } temp = temp.substr(start + end); text = text.replace(url, '<a target="_blank" href="' + url + '">' + url + "</a>") } var user = node.user; var screen_name = user.screen_name; var image = user.profile_image_url; var userstatusurl = TWITTER_ENUM.USERURL.replace(/#USERNAME#/g, screen_name); userstatusurl = userstatusurl.replace(/#ID#/g, statusid); var userurl = '<a target="_blank" href="' + TWITTER_ENUM.URL + screen_name + '"><b>' + screen_name + "</b></a>"; var content; var times = getTimeDifference(dt); if (pgVar % 2) { content = '<tr class="TW_evenRow"><td valign="top" class="TW_list-image"><a href="' + TWITTER_ENUM.URL + screen_name + '" target="_blank"><img src="' + image + '" border="0" alt="" class="TW_thumb" width="40" height="40" /></a></td><td class="TW_list-td" valign="top">' + userurl + " " + text + '<a href="' + userstatusurl + '" target="_blank"> ' + times + " ago</a></td></tr>"; pgVar = 0 } else { content = '<tr class="TW_oddRow"><td valign="top" class="TW_list-image"><a href="' + TWITTER_ENUM.URL + screen_name + '" target="_blank"><img src="' + image + '" border="0" alt="" class="TW_thumb" width="40" height="40" /></a></td><td class="TW_list-td" valign="top" >' + userurl + " " + text + ' <a href="' + userstatusurl + '" target="_blank"> ' + times + " ago</a></td></tr>"; pgVar = 1 } builder.append(content) } builder.append("</table>"); $(id + "contTbl").innerHTML = builder.toString(); if (_statusList.length > 5) { this.showNevigation(_statusList.length) } _inProcess = false }; this.showNevigation = function(len) { var activeLinkPrefix = '<a href="javascript:void(0)" style="cursor:hand;cursor:pointer;" onclick="' + id + ".pagination("; var activeLinkSuffix = ')">'; var activeNext = '<img border="0" title="Next" alt="Next" src="' + TWITTER_ENUM.IMAGE_URL + 'actNext.gif">'; var iActiveNext = '<img border="0" src="' + TWITTER_ENUM.IMAGE_URL + 'iactNext.gif">'; var activePrev = '<img border="0" title="Previous" alt="Previous" src="' + TWITTER_ENUM.IMAGE_URL + 'actPrev.gif">'; var iActivePrev = '<img border="0" src="' + TWITTER_ENUM.IMAGE_URL + 'iactPrev.gif">'; if (_page == 1) { $(id + "prev").innerHTML = iActivePrev; var next = activeLinkPrefix + "1" + activeLinkSuffix + activeNext + "</a>"; $(id + "next").innerHTML = next } else { if (_page > 1 && parseInt(_page * 5) < len) { var prev = activeLinkPrefix + "-1" + activeLinkSuffix + activePrev + "</a>"; $(id + "prev").innerHTML = prev; var next = activeLinkPrefix + "1" + activeLinkSuffix + activeNext + "</a>"; $(id + "next").innerHTML = next } else { if (parseInt(_page * 5) >= len) { $(id + "next").innerHTML = iActiveNext; var prev = activeLinkPrefix + "-1" + activeLinkSuffix + activePrev + "</a>"; $(id + "prev").innerHTML = prev } } } $D($(id + "paging")) }; this.pagination = function(dir) { if (dir > 0) { _page++ } else { _page-- } this.view() }; this.updateStat = function() { message = $(id + "updateTxt").value; if (message.trim() == "") { return } TwitterService.GetUsernamePassword(_instance.internalId, F(this, this.getCredentialSuccessforUpdate), F(this, this.noView)) }; this.getCredentialSuccessforUpdate = function(crd) { if (crd != "") { var crds = crd.split(":"); TwitterService.UpdateStatus(_instance.internalId, message, F(this, this.updateSuccess), F(this, this.updateFail)) } else { $(id + "msgView").innerHTML = "You need to <b><a onClick=" + id + '.showEdit() href="javascript:void(0)">Sign in</a></b> to your Twitter account in order to update status'; $D($(id + "msgView")); _instance.Profiles[PROFILE_ENUM.USERID] = null; _instance.save() } }; this.updateSuccess = function(response) { if (response == true) { this.select("recent"); $(id + "updateTxt").value = "" } else { this.select("update"); $(id + "msgView").innerHTML = "Update failed, please try again"; $D($(id + "msgView")) } }; this.updateFail = function() { $(id + "msgView").innerHTML = "Update failed, please try again"; $D($(id + "msgView")) }; function getTimeDifference(feedDate) { var dtSplit = feedDate.split(" "); var dtMain = dtSplit[0] + " " + dtSplit[1] + " " + dtSplit[2] + " " + dtSplit[3] + " UTC" + dtSplit[4] + " " + dtSplit[5]; var fDate = new Date(dtMain); _instantTime = new Date(); var dateDiff = _instantTime.getTime() - fDate.getTime(); if (dateDiff < (TIME_ENUM.MSECOND * TIME_ENUM.SECOND)) { var seconds = Math.round(dateDiff / TIME_ENUM.MSECOND); if (seconds < 5) { return "less than 5 seconds" } else { return "less than " + seconds + " seconds" } } else { if ((dateDiff > (TIME_ENUM.MSECOND * TIME_ENUM.SECOND)) && (dateDiff < (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE))) { return "about " + (Math.round((dateDiff / (TIME_ENUM.MSECOND * TIME_ENUM.SECOND)))) + " minutes" } else { if ((dateDiff > (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE)) && (dateDiff < (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE * TIME_ENUM.HOUR))) { return "about " + (Math.round((dateDiff / (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE)))) + " Hours" } else { if ((dateDiff > (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE * TIME_ENUM.HOUR))) { return "about " + (Math.round(dateDiff / (TIME_ENUM.MSECOND * TIME_ENUM.SECOND * TIME_ENUM.MINUTE * TIME_ENUM.HOUR))) + " days" } } } } } function urlDecode(str) { str = str.replace(new RegExp("\\+", "g"), " "); return unescape(str) } function urlEncode(str) { str = escape(str); str = str.replace(new RegExp("\\+", "g"), "%2B"); return str.replace(new RegExp("%20", "g"), "+") } function stringFilter(str) { var filteredValues = "()<>\\{}[]_!*|,;'\""; var i; var returnString = ""; for (i = 0; i < str.length; i++) { var c = str.charAt(i); if (filteredValues.indexOf(c) != -1) { return i } } return i } };
function Base64Utility() { var D = -1; var C = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"); var A = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63"); var F; var B; this.setBase64Str = function(G) { F = G; B = 0 }; this.readBase64 = function() { if (!F) { return D } if (B >= F.length) { return D } var G = F.charCodeAt(B) & 255; B++; return G }; this.encodeBase64 = function(K) { this.setBase64Str(K); var G = ""; var J = new Array(3); var I = 0; var H = false; while (!H && (J[0] = this.readBase64()) != D) { J[1] = this.readBase64(); J[2] = this.readBase64(); G += (C[J[0] >> 2]); if (J[1] != D) { G += (C[((J[0] << 4) & 48) | (J[1] >> 4)]); if (J[2] != D) { G += (C[((J[1] << 2) & 60) | (J[2] >> 6)]); G += (C[J[2] & 63]) } else { G += (C[((J[1] << 2) & 60)]); G += ("="); H = true } } else { G += (C[((J[0] << 4) & 48)]); G += ("="); G += ("="); H = true } I += 4; if (I >= 76) { G += ("\n"); I = 0 } } return G }; this.readReverseBase64 = function() { if (!F) { return D } while (true) { if (B >= F.length) { return D } var G = F.charAt(B); B++; if (A[G]) { return A[G] } if (G == "A") { return 0 } } return D }; this.ntos = function(G) { G = G.toString(16); if (G.length == 1) { G = "0" + G } G = "%" + G; return unescape(G) }; this.decodeBase64 = function E(J) { this.setBase64Str(J); var G = ""; var I = new Array(4); var H = false; while (!H && (I[0] = this.readReverseBase64()) != D && (I[1] = this.readReverseBase64()) != D) { I[2] = this.readReverseBase64(); I[3] = this.readReverseBase64(); G += ntos((((I[0] << 2) & 255) | I[1] >> 4)); if (I[2] != D) { G += ntos((((I[1] << 4) & 255) | I[2] >> 2)); if (I[3] != D) { G += ntos((((I[2] << 6) & 255) | I[3])) } else { H = true } } else { H = true } } return G } };
