getLocation()

function getLocation(){
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch( 
            "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid="+ weather.apiKey
        ).then((response) =>  response.json())
        .then((data) => weather.displayWeather(data));
    

    })
}
    
let weather = {
   "apiKey": "69087aca4a5504e05b12280a1a13a322",


    
   fetchWeather: function (city) {
       
       fetch( 
           "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+ this.apiKey
       ).then((response) =>  response.json())
       .then((data) => this.displayWeather(data));
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
   },




   search: function() {
       this.fetchWeather(document.querySelector(".searchBar").value);
   }

};

document.querySelector(".button").addEventListener("click", function () {
    weather.search();

})

document.querySelector(".button").addEventListener("keyup", function (event) {
    if (event.key == "Enter" || event.keyCode == 13) {
        weather.search();
    }
    
    
})
