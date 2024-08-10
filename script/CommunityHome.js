function hoverAddFlake(C, D, B) {
    var A = "class";
    if (Sys.Browser.agent == Sys.Browser.InternetExplorer) {
        A = "className"
    }
    if (C.getAttribute(A) != B) {
        C.setAttribute(A, D)
    } 
}
function unhoverAddFlake(C, B) {
    var A = "class";
    if (Sys.Browser.agent == Sys.Browser.InternetExplorer) {
        A = "className"
    }
    if (C.getAttribute(A) != B) {
        C.setAttribute(A, "")
    } 
}
function ignoreEnterFlake(B) {
    B = $fix(B);
    var A = $("FlakeSearchText");
    if (typeof A != "undefined") {
        return ignoreEnter(A, B)
    } 
}
function ignoreEnterPagecast(B) {
    B = $fix(B);
    var A = $("PagecastSearchText");
    return ignoreEnter(A, B)
}
function ignorePeople(B) {
    B = $fix(B);
    var A = $("PeopleSearchText");
    return ignoreEnter(A, B)
}
function ignoreEnter(A, B) {
    if (typeof B == "undefined") {
        return true
    }
    if (B.keyCode == 13) {
        if (B.target == A) {
            return false
        } 
    }
    return true
}
function searchFlakesEnter(B) { if (!B) { B = window.event } if (B.which || B.keyCode) { if ((B.which == 13) || (B.keyCode == 13)) { var A = $("FlakeSearchBtn"); if (A != null) { searchFlakes(); return false } } } }
function searchPeopleEnter(B) { if (!B) { B = window.event } if (B.which || B.keyCode) { if ((B.which == 13) || (B.keyCode == 13)) { var A = $("PeopleSearchBtn"); if (A != null) { searchPeople(); return false } } } }
function searchPagecastsEnter(B) { if (!B) { B = window.event } if (B.which || B.keyCode) { if ((B.which == 13) || (B.keyCode == 13)) { var A = $("PagecastSearchBtn"); if (A != null) { searchPagecasts(); return false } } } }
function searchFlakes() { var A = $trim($("FlakeSearchText").value); if (A.length > 0) { window.location.href = "/Community/Content/Flakes.aspx?Search=" + escape(A) + "&filter=01234" } }
function searchPagecasts() { var A = $trim($("PagecastSearchText").value); if (A.length > 0) { window.location.href = "/Community/Pages/Page.aspx?Search=" + escape(A) } }
function searchPeople() { var A = $trim($("PeopleSearchText").value); if (A.length > 0) { window.location.href = "/Community/ProfileDirectory.aspx?search=" + escape(A) } }
function addFlakeContent(B, D, A) {
    var C = new Sys.Net.WebRequest();
    C.set_url(B);
    C.set_httpVerb("GET");
    C.invoke();
    if (Sys.Browser.agent == Sys.Browser.InternetExplorer) {
        D.setAttribute("className", A)
    }
    else {
        D.setAttribute("class", A)
    } 
};
