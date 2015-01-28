var weatherData;
var request = new XMLHttpRequest();
var date = new Date();

loadData();

function loadData() {
    
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Salt+Lake+City&units=imperial');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "place");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.city.name));
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "date");
    c.lastElementChild.appendChild(document.createTextNode(date.getMonth() + " " + date.getDate()));
    
    //loop this
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "currentTemp");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.list[0].temp.day));
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "conditions");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.list[0].weather[0].main));
    
    c.appendChild(document.createElement("div"));
    c.lastElementChild.setAttribute("class", "conditionsDesc");
    c.lastElementChild.appendChild(document.createTextNode(weatherData.list[0].weather[0].description));
    
    
/*    
    document.getElementById("place").innerHTML = weatherData.city.name;
    document.getElementById("day").innerHTML = (date.getMonth()+1) + "/" + date.getDate();
    document.getElementById("currentTemp").innerHTML = weatherData.list[0].temp.day;
    document.getElementById("conditions").innerHTML = weatherData.list[0].weather[0].main;
    document.getElementById("conditionsDesc").innerHTML = weatherData.list[0].weather[0].description;  
*/
}

