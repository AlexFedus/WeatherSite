let weather = {
   "apiKey": "69087aca4a5504e05b12280a1a13a322",
   fetchWeather: function () {
       fetch( 
           "https://api.openweathermap.org/data/2.5/weather?q={Denver}&appid={69087aca4a5504e05b12280a1a13a322}"
       ).then((response) =>  response.json())
       .then((data) => console.log(data));
   },
};
