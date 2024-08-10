var SessionTracker = {
    NOSESSION: 0
    , COOKIE: "s"
    , VALUE_SEPARATOR: "@"
    , IDLE_TIMEOUT: 5 * 60 * 1000
    , IDLE_TIMER: 60 * 1000
    , activeTime: 0
    , inactiveTime: 0
    , human: false
    , lastActivityAt: new Date()
    , idleTimerID: 0
    , identifyingHuman: false
    , humanUrls: new Array("s=1&v=1", "s=2&v=1", "s=0&v=9", "s=3&v=1")
    , SharingFeatureUsed: 0
    , PublishingFeatureUsed: 1
    , JustLetMeIn: 2
    , RssReaderUsed: 3
    , init: function () {
        SessionTracker.activeTime = 0;
        SessionTracker.inactiveTime = 0;
        SessionTracker.identifyingHuman = false;
        var B = "" + $readCookie(SessionTracker.COOKIE);
        if (B.length > 0) {
            var A = B.split("|");
            SessionTracker.activeTime = parseInt(A[0]) || 0;
            SessionTracker.inactiveTime = parseInt(A[1]) || 0;
            if (SessionTracker.activeTime < 2) {
                SessionTracker.human = false
            }
            SessionTracker.start()
        }
        else { }
    }, start: function () {
        SessionTracker.hookEvent("click");
        SessionTracker.hookEvent("mousedown");
        SessionTracker.hookEvent("mouseup");
        SessionTracker.hookEvent("mousemove");
        SessionTracker.hookEvent("keyup");
        SessionTracker.hookEvent("scroll",
        SessionTracker.onActivity, window);
        var A = document.getElementsByTagName("body")[0]; if (A) { SessionTracker.hookEvent("unload", SessionTracker.onUnload, A) } else { window.onunload = SessionTracker.onUnload } SessionTracker.lastActivityAt = new Date(); if (SessionTracker.idleTimerID > 0) {
            window.clearInterval(SessionTracker.idleTimerID)
        }
        SessionTracker.idleTimerID = window.setInterval(SessionTracker.idleTimer, SessionTracker.IDLE_TIMER)
    }, hookEvent: function (A, C, B) {
        if (typeof C == "undefined") {
            C = SessionTracker.onActivity
        }
        if (typeof B == "undefined") {
            B = document
        }
        $addEvent(B, A, C)
    }, identifyHuman: function () {
        if (!SessionTracker.identifyingHuman) {
            $addScript("humanIdentifier", "/human.ashx");
            SessionTracker.identifyingHuman = true;
            SessionTracker.human = true
        }
    }, onUnload: function (A) {
        SessionTracker.updateSession()
    }, onActivity: function (A) {
        if (SessionTracker.activityTimer > 0) {
            return
        }
        else {
            SessionTracker.activityTimer = window.setTimeout(SessionTracker.activityCallback, 1000)
        }
    }, activityCallback: function () {
        SessionTracker.activityTimer = 0;
        SessionTracker.updateSession()
    }, idleTimer: function () {
        var A = new Date();
        diff = A.getTime() - SessionTracker.lastActivityAt.getTime();
        if (diff > SessionTracker.IDLE_TIMER) {
            SessionTracker.inactiveTime += Math.round(SessionTracker.IDLE_TIMER / 1000);
            SessionTracker.save()
        }
    }, updateSession: function () {
        var A = new Date();
        if (A.getSeconds() != SessionTracker.lastActivityAt.getSeconds()) {
            var B = A.getTime() - SessionTracker.lastActivityAt.getTime();
            if (B < SessionTracker.IDLE_TIMEOUT) {
                SessionTracker.activeTime += Math.round(B / 1000)
            }
            else {
                SessionTracker.activeTime += 1
            }
            SessionTracker.save();
            if (SessionTracker.human == false) {
                SessionTracker.identifyHuman()
            } 
        }
        else { }
        SessionTracker.lastActivityAt = A
    }, save: function () {
        var A = SessionTracker.activeTime + "|" + SessionTracker.inactiveTime;
        $createCookie("s", A, 30)
    }, activity: function (B) {
        var A = SessionTracker.humanUrls[B];
        var C = new Date().getTime()
    } 
};
