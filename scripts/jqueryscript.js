$(document).ready(function(){
    $("footer").css("position", "absolute");
    $("footer").css("bottom", "0px");
    document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    var el = document.getElementsByTagName("body")[0].lastElementChild;
    el.setAttribute("class", "footer");
    $("footer").css("width", ($("body").width() - parseInt($("footer").css("padding")))+"px");
    $(el).css("height", $("footer").height());
    $(el).css("width", $("footer").width());
    $(el).css("visibility", "hidden");
    
});

function jqueryshow(e){
    $(e).fadeIn();
}
function jqueryhide(e){
    $(e).fadeOut();
}
