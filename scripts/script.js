var ICONFORMAT = ".png";
var ICONLOCATION = "http://openweathermap.org/img/w/";
var GRAPHBACKCOLOR = "#ffff00";
var GRAPHLINECOLOR = "#ff0000";

var weatherData;
var weatherGraph = [];
var graphPoints = [];
var weatherMax = 0;
var weatherMin = 0;
var request = new XMLHttpRequest();
var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var graphCanvas;
loadData();

function loadData() {
    
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City&units=imperial');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    
    var t = document.getElementById("tooltip");
    t.style.display = "none";
    t.style.position = "absolute";
    t.innerHTML = "";
    t.appendChild(document.createElement("div"));
    var c = t.lastElementChild;
    c.setAttribute("id", "toolall");
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "place");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.city.name));
    
    var tmpdate = new Date(date);
    for(var i=0; i<weatherData.list.length; i++){
        t.appendChild(document.createElement("div"));
        c = t.lastElementChild;
        c.setAttribute("class", "toolday");
        c.setAttribute("id", "toolday"+i);
        c.style.backgroundImage = "url(" + ICONLOCATION + weatherData.list[i].weather[0].icon + ICONFORMAT + ")";
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "date");
        c.lastElementChild.appendChild(document.createTextNode(tmpdate.getDate() + " " + months[tmpdate.getMonth()] + " " + tmpdate.getFullYear()));
        tmpdate.setDate(tmpdate.getDate() + 1);
    
        for(var k in weatherData.list[i].temp){
            c.appendChild(document.createElement("div"));
            c.lastElementChild.setAttribute("class", "currentTemp");
            c.lastElementChild.setAttribute("id", "toolday"+i+"temp"+k);
            c.lastElementChild.innerHTML = k + ": " + weatherData.list[i].temp[k] + "&deg; F";
        }
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "conditions");
        c.lastElementChild.appendChild(document.createTextNode(weatherData.list[i].weather[0].main));
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "conditionsDesc");
        c.lastElementChild.appendChild(document.createTextNode(weatherData.list[i].weather[0].description));
    }
    initcanvas(document.getElementById("content"));
    drawGraph();
}

function initcanvas(go){
    go.innerHTML = "";
    go.appendChild(document.createElement("canvas"));
    graphCanvas = go.lastElementChild;
    graphCanvas.setAttribute("class", "weathercanvas");
    graphCanvas.onmousemove = mouseovergraph;
    for(var i=0; i<weatherData.list.length; i++){
        weatherGraph[i] = weatherData.list[i].temp.day;
        weatherMax = Math.max(weatherMax, weatherGraph[i]);
        weatherMin = (i==0)?weatherGraph[i] : Math.min(weatherMin, weatherGraph[i]);
    }
    initgraphpoints();
}
function initgraphpoints(){
    graphPoints = [];
    for(var i=0; i<weatherGraph.length; i++){
        graphPoints[i] = {x:graphCanvas.width/(weatherGraph.length-1)*i, y:(weatherMax-weatherGraph[i])*(graphCanvas.height/(weatherMax-weatherMin))};
    }
}
function drawGraph(){
    var c = graphCanvas.getContext("2d");
    var GRAPHBACKIMAGE = new Image();
    GRAPHBACKIMAGE.src = "canvasbackground.jpg";
    
    GRAPHBACKIMAGE.onload = function() {
        c.drawImage(GRAPHBACKIMAGE,0,0);
    }
    c.fillStyle = GRAPHBACKCOLOR;
    c.fillRect(0,0, graphCanvas.width, graphCanvas.height);
    
    c.strokeStyle = GRAPHLINECOLOR;
    for(var i=0; i<weatherGraph.length; i++){
        if(i == 0){
            c.moveTo(graphPoints[i].x, graphPoints[i].y);
        }
        else{
            c.lineTo(graphPoints[i].x, graphPoints[i].y);
        }
        c.stroke();
    }
}
function mouseovergraph(e){
    var x = e.clientX - graphCanvas.getBoundingClientRect().left;
    var y = e.clientY - graphCanvas.getBoundingClientRect().top;
    var r = 10;
    var drawr = r/2;
    var shown = false;
    
    for(var i=0; i<graphPoints.length; i++){
        if(Math.abs(x-graphPoints[i].x) < r && Math.abs(y-graphPoints[i].y) < r){
            var c = graphCanvas.getContext("2d");
            c.beginPath();
            c.arc(x, y, drawr, 0, 2*Math.PI);
            c.fillStyle = GRAPHLINECOLOR;
            c.fill();
            showtooltip(i, x+"px", y+"px");
            shown = true;
        }
    }
    if(!shown){
        hidetooltip();
    }
}

function showtooltip(i, x, y){
    var t = document.getElementById("tooltip");
    t.style.left = x;
    t.style.top = y;
    if(typeof(i) != "number"){
        jqueryshow(t);
//        t.style.display = "block";
    }
    else{
        var d = t.getElementsByClassName("toolday");
        for(var j=0; j<d.length; j++){
            if(d[j].getAttribute("id") == "toolday"+i){
//                d[j].style.display = "block";
//                t.style.display = "block";
                jqueryshow(t);
            }
            else{
                d[j].style.display = "none";
            }
        }
    }
}
function hidetooltip(){
    var t = document.getElementById("tooltip");
    t.style.display = "none";
    jqueryhide(t);
}

