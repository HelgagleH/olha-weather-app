function formatDate(timestamp) {
    let currentDate = new Date(timestamp);
    let date = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return currentDate = `${day} ${date}.${month} / ${hours}:${minutes}`;
}


function formatDay(timestamp) {
    let nextDate = new Date(timestamp * 1000);

    let date = nextDate.getDate();
    let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];

    let day = days[nextDate.getDay()];
    let month = months[nextDate.getMonth()];

    return nextDate = `${day} / ${date}.${month}`;
}


function displayForecast(response) {

    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {

            forecastHTML =
                forecastHTML +
                `
                <div class="col-2 text-center">
                
            <div class="other-days" >${formatDay(forecastDay.dt)}</div>
            <img 
            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="Weather img" 
            width = "42";
            />
           
            <div class="weather-forecast-temperatures">
                <span 
                class="weather-forecast-temperatures-max">
                ${Math.round(forecastDay.temp.max)} °C</span> /
                <span 
                class="weather-forecast-temperatures-min">
                ${Math.round(forecastDay.temp.min)} °C
                </span>
            </div>
            
        </div>
`;
        }

    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#current-date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) === response.data.weather[0].icon;
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);

}

function search(city) {
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-enter");
    search(cityInputElement.value);
}


let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

search("Thessaloniki");









