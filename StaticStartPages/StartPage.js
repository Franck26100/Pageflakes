
var SP={
    GEO_BOX:'StartPage_GeolocationBox',
    GEO_INDICATOR:'StartPage_GeoIndicator',
    SHOWPAGE_BUTTON:'StartPage_ShowMyPage',
    PROGRESS: 'StartPage_ShowMyPageProgress',
    MULTIPLE_MATCH:'StartWizard_MultipleMatch',
    GEOLOCATE_PROGRESS:'',
    STARTPAGE_DIV:'StartPage',
    MAINPAGE_DIV:'Content',
    Interests:[],
    SpecificInterests:"",
    City:"",
    State:"",
    ZipCode:"",
    Country:"",
    predefinedTemplate:"",
    init:function()
    {
        SP.Interests=["News"];
        SP.Others=SP.City=SP.State=SP.Country="";
        $(SP.GEO_BOX).value='Loading...';
        PF.addEvent(PF.$(SP.SHOWPAGE_BUTTON),'click',SP.showPage);
        if(Browser.isIE)
        {
            PF.addEvent(PF.$(SP.SHOWPAGE_BUTTON),'mouseover',SP.showButtonOver);
            PF.addEvent(PF.$(SP.SHOWPAGE_BUTTON), 'mouseout', SP.showButtonOut);
        }
        PF.until(SP.canGeolocate,function()
        {
            PF.ND(SP.GEO_INDICATOR);
            SP.GeoLocation = new GeoLocation(PF.$(SP.GEO_BOX), true, RenderMode.DIV, SP.locationSelected);
        });
    },canGeolocate:function()
        {
            return PF.primaryFrameworkLoaded() && window.DOMReady;
    },showButtonOver:function()
        {
            if (PF.$(SP.SHOWPAGE_BUTTON).className == 'showmypage') {
                PF.$(SP.SHOWPAGE_BUTTON).className = 'showmypageOver';
                PF.$(SP.SHOWPAGE_BUTTON).style.clear = 'left';
            }
            else if (PF.$(SP.SHOWPAGE_BUTTON).className == 'showmypageG') {
                PF.$(SP.SHOWPAGE_BUTTON).className = 'showmypageOverG';
                PF.$(SP.SHOWPAGE_BUTTON).style.clear = 'left';
            }
    },showButtonOut:function()
        {
            if (PF.$(SP.SHOWPAGE_BUTTON).className == 'showmypageOver') {
                PF.$(SP.SHOWPAGE_BUTTON).className = 'showmypage';
            }
            if (PF.$(SP.SHOWPAGE_BUTTON).className == 'showmypageOverG') PF.$(SP.SHOWPAGE_BUTTON).className = 'showmypageG';
    },dispose:function() {
    },login:function()
        {
            document.location.href = unescape("login.aspx");
    },getLocation:function()
        {
            var result=SP.GeoLocation.parseLocation();
            if(result)
            {
                SP.City=SP.GeoLocation.City;
                SP.State=SP.GeoLocation.State;
                SP.ZipCode=SP.GeoLocation.ZipCode;
                SP.Country = SP.GeoLocation.Country;
            }
            return result;
    },locationSelected:function()
        {
            PF.hide(SP.MULTIPLE_MATCH);
            var match=$(SP.GEO_BOX).value;
            if(match.length>0)
            {
                if(!SP.getLocation())return;
                if(SP.City.length>0 && SP.Country.length>0 && (SP.State.length>0||SP.ZipCode.length>0))
                {
                    SP.complete();
                }
                else
                {
                    var location=SP.City+", "+(SP.State.length>0?SP.State+", ":"")+SP.Country;
                    CoreServices.MatchLocation(location,function(matches)
                    {
                        SP.matches=matches;
                        if(matches.length==0)
                        {
                            SP.GeoLocation.doMatch(matches);
                        }
                            else if(matches.length>1)
                        {
                            var exactMatch=false;
                            for(var i=0;i<matches.length;i++)
                                if(matches[i].toLowerCase()==match.toLowerCase())
                                    exactMatch=true;
                                if(!exactMatch)
                                {
                                    PF.$(SP.MULTIPLE_MATCH).innerHTML=String.format(Lang.MULTIPLE_MATCH,match);
                                    PF.D(SP.MULTIPLE_MATCH);
                                    SP.GeoLocation.doMatch(matches);
                                }
                                else
                                {
                                    SP.complete();
                                }
                            }
                            else {
                                SP.complete();
                            }
                        });
                    }
                }
                else
                {
                    SP.Country=SP.City=SP.State="";
                    SP.complete();
                }
            }, hide: function ()
                {
                    PF.removeEvent(PF.$(SP.SHOWPAGE_BUTTON),'click',SP.showPage);
                    PF.visible(SP.MAINPAGE_DIV);
                    PF.remove(SP.STARTPAGE_DIV);
                    PF.D(SP.MAINPAGE_DIV);
            },complete:function()
    {
        SP.showPage();
             },showPage:function()
        {
            PF.addScript('humanIdentifier_WW_FINISH','/Pageflakes/human.ashx?action=WW_FINISH');
            $ND(SP.SHOWPAGE_BUTTON);
            $D(SP.PROGRESS);
            SP.getLocation();
            var setupInfo={__Type:'Pageflakes.UserPageSetupInfo, Pageflakes.Objects',Interests:SP.Interests,SpecificInterests:SP.SpecificInterests,Country:SP.Country,
                State:SP.State,City:SP.City,ZipCode:SP.ZipCode,PageTemplate:SP.predefinedTemplate};
                CoreServices.SetupPage(setupInfo,function(result)
                {
                    if (result == null) {
                        SP.logout();
                        alert(Lang.COMMON_ERROR_ALERT);
                        return;
                    }
                    window.startupInfo = result;
                    CURRENT_PAGE_ID = window.startupInfo.CurrentPageID;
                    SP.hide();
                    $scrollTop();
                    $removeClass($('Content'), 'nodisplay');
                    loadFirstPage(function () {
                        SP.dispose();
                    });
                }, function (request, userContext) {
                    alert(Lang.COMMON_ERROR_ALERT);
                    SP.logout();
                });
            }, justLetMeIn: function () {
                SP.Interests = [];
                SP.SpecificInterests = "";
                SP.getLocation();
                $addScript('humanIdentifier_WW_JUST_LET_ME_IN', '/Pageflakes/human.ashx?action=WW_JUST_LET_ME_IN');
                    var setupInfo={__Type:'Pageflakes.UserPageSetupInfo, Pageflakes.Objects',Interests:SP.Interests,SpecificInterests:SP.SpecificInterests,Country:SP.Country,State:SP.State,City:SP.City,ZipCode:SP.ZipCode,PageTemplate:SP.predefinedTemplate};
                    CoreServices.SetupPage(setupInfo,function(result) {
                        if (result == null) {
                            SP.logout();
                            alert(Lang.COMMON_ERROR_ALERT);
                            return;
                        }
                        window.startupInfo = result;
                        CURRENT_PAGE_ID = window.startupInfo.CurrentPageID;
                        SP.hide();
                        $scrollTop();
                        loadFirstPage(function () { SP.dispose(); });
                    }, function (request, userContext) {
                        alert(Lang.COMMON_ERROR_ALERT);
                        SP.logout();
                    });
                        },showPageTop:function() {
                            $track("/event/tour/tryfromtop");
                            SP.justLetMeIn();
                        }, showPageBottom: function () {
                            $track("/event/tour/tryfrombottom");
                            SP.justLetMeIn();
                        }, toggle: function (ob, interest) {
                            if (ob.className == "welcome_back_check") {
                                ob.className = "welcome_back_uncheck";
                                SP.Interests.remove(interest);
                            } else {
                                ob.className = "welcome_back_check";
                                SP.Interests.add(interest);
                            }
                        }, logout: function () {
                            document.location = "logout.aspx";
                        }, showTryBottomOver: function () {
                            PF.$('StartTourTryBottom').className = 'tryLinkOver';
                        }, showTryTopOver: function () {
                            PF.$('StartTourTryTop').className = 'tryLinkOver';
                        }, showTryBottomOut: function () {
                            PF.$('StartTourTryBottom').className = 'tryLink';
                        }, showTryTopOut: function () {
                            PF.$('StartTourTryTop').className = 'tryLink';
                        }, showTour: function () {
                            $ND('startMainPage');
                            $D('startTour');
                            $scrollTop();
                            if (Browser.isIE) {
                                PF.addEvent(PF.$('StartTourTryBottom'), 'mouseover', SP.showTryBottomOver);
                                PF.addEvent(PF.$('StartTourTryTop'), 'mouseover', SP.showTryTopOver);
                                PF.addEvent(PF.$('StartTourTryBottom'), 'mouseout', SP.showTryBottomOut);
                                PF.addEvent(PF.$('StartTourTryTop'), 'mouseout', SP.showTryTopOut);
                            } 
                        } 
                    };
var StartPage=SP;