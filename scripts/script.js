var ICONFORMAT = ".png";
var ICONLOCATION = "images/";
var GRAPHBACKCOLOR = "#ffff00";
var GRAPHLINECOLOR = "#ff0000";

var weatherData;
var weatherGraph = [];
var weatherMax = 0;
var weatherMin = 0;
var request = new XMLHttpRequest();
var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
    t.innerHTML = "";
    t.appendChild(document.createElement("div"));
    var c = t.lastElementChild;
    c.setAttribute("id", "toolall");
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "place");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.city.name));
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "date");
    c.lastElementChild.appendChild(document.createTextNode(date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()));
    
    //loop this
    for(var i=0; i<5; i++){
        t.appendChild(document.createElement("div"));
        c = t.lastElementChild;
        c.setAttribute("class", "toolday");
        c.setAttribute("id", "toolday"+i);
        c.style.backgroundImage = "url(" + ICONLOCATION + weatherData.list[i].weather[0].icon + ICONFORMAT + ")";
        
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
    
    drawGraph(initcanvas(document.getElementById("content")));
}

function initcanvas(go){
    go.innerHTML = "";
    go.appendChild(document.createElement("canvas"));
    var g = go.lastElementChild;
    g.setAttribute("class", "weathercanvas");
    for(var i=0; i<weatherData.list.length; i++){
        weatherGraph[i] = weatherData.list[i].temp.day;
        weatherMax = Math.max(weatherMax, weatherGraph[i]);
        weatherMin = (i==0)?weatherGraph[i] : Math.min(weatherMin, weatherGraph[i]);
    }
    return g;
}
function drawGraph(g){
    var c = g.getContext("2d");
    c.fillStyle = GRAPHBACKCOLOR;
    c.fillRect(0,0, g.width, g.height);
    
    c.strokeStyle = GRAPHLINECOLOR;
    c.moveTo(0, g.height / 2);
    for(var i=0; i<weatherGraph.length; i++){
        var x = g.width/(weatherGraph.length-1) * i;
        var y = (weatherMax-weatherGraph[i]) * (g.height/(weatherMax-weatherMin));
        if(i == 0){
            c.moveTo(x,y);
        }
        else{
            c.lineTo(x, y);
        }
        c.stroke();
    }
}
