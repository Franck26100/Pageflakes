(function () {
    window.WW = {
        CONTAINER: "ww-container"
        , CATEGORIES: "ww-categories"
        , GEOLOCATION_PROGRESS: "WW_GeolocationIndicator"
        , GEOLOCATION_TEXTBOX: "WW_Location"
        , init: function () {
            PU.blockUI();
            PF.D(WW.CONTAINER);
            var A = WW._getInputs();
            for (var B = 0; B < A.length; B++) {
                A[B].checked = false
            }
            WW.GeoLocation = new GeoLocation($(WW.GEOLOCATION_TEXTBOX), true, RenderMode.DIV, WW.finish);
            App.hideAllControls()
        }, finish: function () {
            PF.ND(WW.GEOLOCATION_PROGRESS)
        }, hide: function () {
            PF.ND(WW.CONTAINER);
            PU.unblockUI();
            App.showAllControls()
        }, _getLocation: function () {
            var A = WW.GeoLocation.parseLocation();
            if (A) {
                WW.City = WW.GeoLocation.City;
                WW.State = WW.GeoLocation.State;
                WW.ZipCode = WW.GeoLocation.ZipCode;
                WW.Country = WW.GeoLocation.Country
            }
            return A
        }, _getInputs: function () {
            var A = PF.$(WW.CATEGORIES);
            var B = A.getElementsByTagName("input");
            return B
        }, rebuild: function () {
            var A = WW._getInterests();
            WW.hide();
            PU.blockUI("Rebuilding page...");
            App.currentPage.removeAllFlakes(true);
            WW._getLocation();
            $DC(function () {
                App.Server.RebuildPage(App.currentPage.id, A, { country: WW.Country, state: WW.State, city: WW.City, zip: WW.ZipCode }, function (B) {
                    if (B) {
                        if (document.location.href.indexOf("?personalize") > 0) {
                            document.location.href = "/"
                        }
                        else {
                            document.location.reload()
                        } 
                    }
                    else {
                        alert("Failed to rebuild your page. Please try again")
                    }
                }, function () {
                    alert("Failed to rebuild your page. Please try again")
                })
            }, 2000)
        }, _getInterests: function () {
            var C = [];
            var A = WW._getInputs();
            for (var B = 0; B < A.length; B++) {
                if (A[B].checked) {
                    C.push(A[B].value)
                } 
            }
            return C
        } 
    };
    window.WW.init()
})();
