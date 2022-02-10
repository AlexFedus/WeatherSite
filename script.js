var id = "";

let weather = {
   "apiKey": "69087aca4a5504e05b12280a1a13a322",


   getLocation: function(){
        navigator.geolocation.getCurrentPosition((success) => {
        document.getElementById("box2").style.visibility = "hidden";
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch( 
            "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid="+ weather.apiKey
        ).then((response) =>  response.json())
        .then((data) => weather.displayWeather(data));
    })
   },
    
   fetchWeather: function (city) {
       
       fetch( 
           "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+ this.apiKey
       ).then((response) =>  response.json())
       .then((data) => 
       //this.getID(data),
       this.displayWeather(data));
       
   },

  

   displayWeather: function(data) {
    

        id = data.id;
        console.log(id);
        const { name } = data;
        const { icon, description } = data.weather[0];
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        
        
        temp = temp.toFixed(1);

      
       

        
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + " \u2109";
        document.querySelector(".humidity").innerText = "Humididy: " + humidity + "%";
        document.querySelector(".speed").innerText = "Wind: " + speed + " MPH";

        document.getElementById("forecast").style.visibility = "visible"; 

        
   },

   fetchForcast: function (id){
        fetch( 
            "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&appid="+ this.apiKey
        ).then((response2) =>  response2.json())
        .then((data2) => 
        weather.displayForcast(data2));
        
   },

   displayForcast: function(data2) {
        
        //temperatures
        document.querySelector(".city1").innerText = Number(data2.list[0].main.temp).toFixed(1);
        document.querySelector(".city2").innerText = Number(data2.list[1].main.temp).toFixed(1);
        document.querySelector(".city3").innerText = Number(data2.list[2].main.temp).toFixed(1);

        //icons
        document.querySelector(".icon1").src = "https://openweathermap.org/img/wn/" + data2.list[0].weather[0].icon + "@2x.png";
        document.querySelector(".icon2").src = "https://openweathermap.org/img/wn/" + data2.list[1].weather[0].icon + "@2x.png";
        document.querySelector(".icon3").src = "https://openweathermap.org/img/wn/" + data2.list[2].weather[0].icon + "@2x.png";

        //descriptions
        document.querySelector(".description1").innerText = data2.list[0].weather[0].description;
        document.querySelector(".description2").innerText = data2.list[1].weather[0].description;
        document.querySelector(".description3").innerText = data2.list[2].weather[0].description;

        //humidity
        document.querySelector(".humidity1").innerText = data2.list[0].main.humidity + "%";
        document.querySelector(".humidity2").innerText = data2.list[1].main.humidity + "%";
        document.querySelector(".humidity3").innerText = data2.list[2].main.humidity + "%";

        document.querySelector(".speed1").innerText = Number(data2.list[0].wind.speed).toFixed(1) + "MPH";
        document.querySelector(".speed2").innerText = Number(data2.list[1].wind.speed).toFixed(1) + "MPH";
        document.querySelector(".speed3").innerText = Number(data2.list[2].wind.speed).toFixed(1) + "MPH";

       
        
   },




   search: function() {
       document.getElementById("box2").style.visibility = "hidden";
       this.fetchWeather(document.querySelector(".searchBar").value);
   },

   search2: function() {
        document.getElementById("box2").style.visibility = "hidden";
        this.getLocation();
   },


   showForcast: function(){
        document.getElementById("box2").style.visibility = "visible";

   }



};

document.querySelector(".button").addEventListener("click", function () {
    weather.search();

})

document.querySelector(".location").addEventListener("click", function () {
    weather.getLocation();

})

document.querySelector("#forecast").addEventListener("click", function () {
    weather.showForcast();
    weather.fetchForcast(id);
    

})

document.querySelector(".button").addEventListener("keyup", function (event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        weather.search();
    }
    
    
})
