var weatherData;
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
    
    drawGraph(initcanvas(document.getElementById("content")));
    
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
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "currentTemp");
        c.lastElementChild.innerHTML = weatherData.list[0].temp.day + "&deg; F";
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "conditions");
        c.lastElementChild.appendChild(document.createTextNode(weatherData.list[0].weather[0].main));
        
        c.appendChild(document.createElement("div"));
        c.lastElementChild.setAttribute("class", "conditionsDesc");
        c.lastElementChild.appendChild(document.createTextNode(weatherData.list[0].weather[0].description));
    }
    
}

function initcanvas(go){
    go.innerHTML = "";
    go.appendChild(document.createElement("canvas"));
    var g = go.lastElementChild;
    g.setAttribute("class", "weathercanvas");
    return g;
}
function drawGraph(g){
    //TODO: draw the graph
    
}
