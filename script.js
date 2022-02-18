var id = "";

let weather = {
    "apiKey": "69087aca4a5504e05b12280a1a13a322",

    // Function to get location if "use my location" button is clicked
    getLocation: function () {
        navigator.geolocation.getCurrentPosition((success) => {
            document.getElementById("box2").style.visibility = "hidden";
            

            let { latitude, longitude } = success.coords;

            fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + weather.apiKey
            ).then((response) => response.json())
                .then((data) => weather.displayWeather(data));
        })
    },

    // Function to get weather information from api
    fetchWeather: function (city) {

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
        ).then((response) => response.json())
            .then((data) =>
                this.displayWeather(data));

    },


    // Function to display weather information
    displayWeather: function (data) {
        id = data.id;

        document.querySelector(".city").innerText = "Weather in " + data.name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        document.querySelector(".description").innerText = data.weather[0].description;
        document.querySelector(".temperature").innerText = Number(data.main.temp).toFixed(1) + " \u2109";
        document.querySelector(".humidity").innerText = "Humididy: " + data.main.humidity + "%";
        document.querySelector(".speed").innerText = "Wind: " + data.wind.speed + " MPH";

        document.getElementById("forecast").style.visibility = "visible";


    },


    // Function to get the forecast from the api.
    fetchForcast: function (id) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&appid=" + this.apiKey
        ).then((response2) => response2.json())
            .then((data2) =>
                weather.displayForcast(data2));

    },

    // Function to display the forecast
    displayForcast: function (data2) {

        //temperatures
        document.querySelector(".temperature1").innerText = Number(data2.list[0].main.temp).toFixed(1) + " \u2109";
        document.querySelector(".temperature2").innerText = Number(data2.list[1].main.temp).toFixed(1) + " \u2109";
        document.querySelector(".temperature3").innerText = Number(data2.list[2].main.temp).toFixed(1) + " \u2109";

        //icons
        document.querySelector(".icon1").src = "https://openweathermap.org/img/wn/" + data2.list[0].weather[0].icon + "@2x.png";
        document.querySelector(".icon2").src = "https://openweathermap.org/img/wn/" + data2.list[1].weather[0].icon + "@2x.png";
        document.querySelector(".icon3").src = "https://openweathermap.org/img/wn/" + data2.list[2].weather[0].icon + "@2x.png";

        //descriptions
        document.querySelector(".description1").innerText = data2.list[0].weather[0].description;
        document.querySelector(".description2").innerText = data2.list[1].weather[0].description;
        document.querySelector(".description3").innerText = data2.list[2].weather[0].description;

        //humidity
        document.querySelector(".humidity1").innerText = "Humidity: " + data2.list[0].main.humidity + " %";
        document.querySelector(".humidity2").innerText = "Humidity: " + data2.list[1].main.humidity + " %";
        document.querySelector(".humidity3").innerText = "Humidity: " + data2.list[2].main.humidity + " %";

        //wind speed
        document.querySelector(".speed1").innerText = "Wind: " + Number(data2.list[0].wind.speed).toFixed(1) + " MPH";
        document.querySelector(".speed2").innerText = "Wind: " + Number(data2.list[1].wind.speed).toFixed(1) + " MPH";
        document.querySelector(".speed3").innerText = "Wind: " + Number(data2.list[2].wind.speed).toFixed(1) + " MPH";



    },




    // Function to search for weather with search bar input
    search: function () {
        document.getElementById("box2").style.visibility = "hidden";
        this.fetchWeather(document.querySelector(".searchBar").value);
    },

    // Function to get weather by geolocation
    search2: function () {
        document.getElementById("box2").style.visibility = "hidden";
        this.getLocation();
    },


    //Function that alters the visibility of the forecast box
    showForcast: function () {
        document.getElementById("box2").style.visibility = "visible";

    }



};

// Searches for weather when search button is clicked
document.querySelector(".button").addEventListener("click", function () {
    weather.search();

})

// Gets the users geolocation when button is clicked
document.querySelector(".location").addEventListener("click", function () {
    weather.getLocation();

})

//Shows weather forecast when button is clicked
document.querySelector("#forecast").addEventListener("click", function () {
    weather.showForcast();
    weather.fetchForcast(id);


})