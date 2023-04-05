let currentDate = new Date();

let day = currentDate.getDay();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let hour = currentDate.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}

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

let currentDateFull = `${days[day]} / ${date}.${months[month]} ${hour}:${minute}`;

function formatDate(newDate) {
    return currentDateFull;
}

let finalTime = document.querySelector("#current-date");
finalTime.innerHTML = currentDateFull;

function displayWeatherCondition(response) {
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)} °C`;
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-enter").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#submit-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

