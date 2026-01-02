function Rater() {
    var B = null;
    var A = false;
    this.unmarkItem = function (D) {
        var C = D.parentNode.getElementsByTagName("LI");
        this.clearStars(C)
    };
    this.clearStars = function (C) {
        for (var D = 0; D < C.length; D++) {
            C[D].className = B[D]
        } 
    };
    this.markItem = function (F) {
        var D = F.parentNode.getElementsByTagName("LI");
        if (!A) {
            this.initStars(D); A = true
        }
        var C = false;
        for (var E = 0; E < D.length; E++) {
            if (C) {
                D[E].className = ""
            }
            else {
                D[E].className = "current-rating"
            }
            if (F.id == D[E].id) {
                C = true
            } 
        } 
    };
    this.initStars = function (C) {
        B = new Array();
        for (var D = 0; D < C.length; D++) {
            B[D] = C[D].className
        } 
    } 
}
var rater = new Rater();