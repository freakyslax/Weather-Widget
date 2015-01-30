var footersizechg = function(){
    $el = $("#footerspaceholder");
    $("footer").css("width", ($("body").width() - parseInt($("footer").css("padding-left")) - parseInt($("footer").css("padding-right")))+"px");
    $el.css("height", $("footer").height());
    $el.css("width", $("footer").width());
};


$(document).ready(function(){
    $("footer").css("position", "fixed");
    $("footer").css("bottom", $("footer").css("padding-bottom"));
    document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    var el = document.getElementsByTagName("body")[0].lastElementChild;
    el.setAttribute("id", "footerspaceholder");
    el.setAttribute("class", "footer");
    $(el).css("visibility", "hidden");
    $(window).on("resize", footersizechg);
    footersizechg();
    
});

function jqueryshow(e){
    $(e).fadeIn();
}
function jqueryhide(e){
    $(e).fadeOut();
}
