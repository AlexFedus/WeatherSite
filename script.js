let weather = {
   "apiKey": "69087aca4a5504e05b12280a1a13a322",
   fetchWeather: function (city) {
       fetch( 
           "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ this.apiKey
       ).then((response) =>  response.json())
       .then((data) => this.displayWeather(data));
   },

   displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        console.log(name, icon, description, temp, humidity, speed); 
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp;
        document.querySelector(".humidity").innerText = humidity;
        document.querySelector(".speed").innerText = speed;
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
