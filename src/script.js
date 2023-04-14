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

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusValue.classList.remove("active");
    fahrenheitValue.classList.add("active");
    let fahrenheitTemparature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemparature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusValue.classList.add("active");
    fahrenheitValue.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitValue = document.querySelector("#fahrenheit");
fahrenheitValue.addEventListener("click", displayFahrenheitTemperature);

let celsiusValue = document.querySelector("#celsius");
celsiusValue.addEventListener("click", displayCelsiusTemperature);

search("Thessaloniki");









