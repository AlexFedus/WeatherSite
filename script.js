
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
       
       this.displayWeather(data));
       
   },

   displayWeather: function(data) {
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

   fetchForcast: function (city){
        fetch( 
            "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid="+ this.apiKey
        ).then((response2) =>  response2.json())
        .then((data2) => 
        //console.log(data2)
        this.displayForcast(data2));
        
   },

   displayForcast: function(data2) {
        

        //for(i=0;i<3;i++){

            const { name2 } = data2.city.name;
            //const { icon2} = data2.list[i].weather[0].icon;
            //const { description2} = data.list.weather;
            var { temp2 } = data2.list[0].main.temp;
            //var { speed2 } = data.wind;

            //console.log(temp2);
        
        
            //temp2 = temp2.toFixed(1);

            document.querySelector(".city1").innerText = "Weather in " + name2;
            //document.querySelector(".icon1").src = "https://openweathermap.org/img/wn/"+ icon2 + "@2x.png";
            //document.querySelector(".description").innerText = description2;
            document.querySelector(".temperature1").innerText = temp2 + " \u2109";
            //document.querySelector(".humidity").innerText = "Humididy: " + humidity2 + "%";
            //document.querySelector(".speed").innerText = "Wind: " + speed2 + " MPH";
        
            //console.log(name2);
        //}
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
    weather.fetchForcast(document.querySelector(".searchBar").value);
    

})

document.querySelector(".button").addEventListener("keyup", function (event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        weather.search();
    }
    
    
})
