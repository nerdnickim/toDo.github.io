const weatherWrapper = document.querySelector(".weather__wrapper"),
    weatherTemp = weatherWrapper.querySelector(".weather__temp"),
    weatherName = weatherWrapper.querySelector(".weather__name"),
    weatherPlace = weatherWrapper.querySelector(".weather__place"),
    weatherIcon = weatherWrapper.querySelector(".weather__ico"),
    Icon = weatherIcon.querySelector("i");


function getWeather(lat ,lon){
    const KEY = "ee3090214708ba2f031e6ae17cafe4c4";
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;

    fetch(weatherApi)
    .then(function(res){
        return res.json();
    })
    .then(function(fuckingWeather){

        weatherOpations = {
            Clouds: {
                title : "Clouds",
                titleClass : "fas fa-cloud"
            },
            Thunderstorm: {
                title : "weather-lightning",
                titleClass : "fas fa-foo-storm"
            },
            Drizzle: {
                title : "weather-hail",
                titleClass: "fas fa-cloud-showers-heavy"
            },
            Snow: {
                title : "weather-snowy",
                titleClass : "far fa-snowflake"
            },
            Atmosphere: {
                title : "weather-partlycloudy",
                titleClass : "fas fa-sun"
            },
            Clear: {
                title : "weather-sunny",
                titleClass : "fas fa-sun"
            }
        }

        const temp = fuckingWeather.main.temp;
        const weaName = fuckingWeather.weather[0].main;
        const place = fuckingWeather.name;
        
        weatherPlace.innerHTML = place;
        weatherTemp.innerHTML = temp;
        weatherName.innerHTML = weatherOpations[weaName].title;
        Icon.className = weatherOpations[weaName].titleClass;
    })
}

getLocation = async() => {
    await navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getWeather(lat, lon);
        }
    );
}

getLocation();