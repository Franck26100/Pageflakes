var PUBLIC_PAGE_HEADER_OWNER="PUBLIC_PAGE_HEADER_OWNER";
var PUBLIC_PAGE_HEADER_COPY="PUBLIC_PAGE_HEADER_COPY";
var PUBLIC_PAGE_HEADER_RANDOM="PUBLIC_PAGE_HEADER_RANDOM";
var PUBLIC_PAGE_HEADER_LOGIN_LINK="PUBLIC_PAGE_HEADER_LOGIN_LINK";
var PUBLIC_PAGE_HEADER_SEND="PUBLIC_PAGE_HEADER_SEND";
var PUBLIC_PAGE_HEADER_BOOKMARK="PUBLIC_PAGE_HEADER_BOOKMARK";
var PUBLIC_HEADER_IMG_HOME="PUBLIC_HEADER_IMG_HOME";
var PUBLIC_HEADER_CONTAINTER="publicPageHeaderContainer";
var PublicPageHeaderClass = {
    copyButton: null, 
    randomButton: null,
    profileId: 0,
    init: function() {
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
            PublicPageHeaderClass.copyButton.onclick = function(A) {
                PublicPageHeaderClass.getACopy()
            };
            PublicPageHeaderClass.sendButton.onclick = function(A) {
                SendPageToFriend.show()
            };
            PublicPageHeaderClass.randomButton.onclick = function(A) {
                PublicPageHeaderClass.getRandomPublicPage()
            };
            PublicPageHeaderClass.bookmarkButton.onclick = function(A) {
                PublicPageHeaderClass.boomarkPage()
            };
            if ($(PUBLIC_PAGE_HEADER_LOGIN_LINK) != null) {
                $(PUBLIC_PAGE_HEADER_LOGIN_LINK).href = SITE_PREFIX + "login.aspx?ReturnUrl=" + document.location.href
            }
            PublicPageHeaderClass.initializeProfile()
        } 
    }
    , showHeader: function(A) {
        if ($(PUBLIC_HEADER_CONTAINTER) != null) {
            if (!A) {
                $("header").style.marginTop = "0px"; $(PUBLIC_HEADER_CONTAINTER).style.display = "none" 
            }
            else {
                $("header").style.marginTop = "20px"; $(PUBLIC_HEADER_CONTAINTER).style.display = "block"
            } 
        } 
    }
    , setText: function() {
        $(PUBLIC_PAGE_HEADER_OWNER).innerHTML = App.ViewingPageOf + "'s Pagecast"
    }
    , getACopy: function() {
        PU.blockUI("Copying Pagecast...");
        App.Server.CreateCopyOfPage(App.currentPage.id, App.ViewingPageOf, function(A) {
            if (A) {
                document.location.href = SITE_PREFIX
            } PU.unblockUI()
        },
        function(A) {
            PageflakesUtility.dumpException(A); PU.unblockUI()
        })
    },
    getRandomPublicPage: function() {
        App.Server.GetRandomPageUrlFromRepository(function(A) {
            document.location.href = A
        }, function(A) {
            PageflakesUtility.dumpException(A)
        })
    }, boomarkPage: function() {
        PublicPageHeaderClass.performBookmark()
    }, performBookmark: function() {
        PU.blockUI("Please wait...");
        App.Server.BookmarkPageForUser(App.currentPage.id, App.ViewingPageOf, function(A) {
            document.location.href = SITE_PREFIX; PU.unblockUI()
        }, function(A) {
            PageflakesUtility.dumpException(A);
            PU.unblockUI()
        })
    }, initializeProfile: function() {
        App.Server.GetUserProfileId(App.currentPage.id, function(A) {
            if (A > 0) {
                $(PUBLIC_PAGE_HEADER_OWNER).innerHTML = '<a href="' + SITE_PREFIX + "Community/Profile.aspx?profileID=" + A + '">' + App.ViewingPageOf + "</a>'s Pagecast"
            } 
        }, function(A) {
            PageflakesUtility.dumpException(A)
        })
    } 
};