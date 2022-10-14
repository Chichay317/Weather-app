let apiKey = "e4a66098597897c288a0a1260d73a719";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;

const search = function (city) {
  let apiKey = "e4a66098597897c288a0a1260d73a719";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
};

const displayTemperature = function (response) {
  // console.log(response.data);
  let temperatureEl = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#speed");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  const now = new Date();
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  const locale = navigator.language;

  temperatureEl.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  speed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  date.innerHTML = new Intl.DateTimeFormat(locale, options).format(now);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
};

axios.get(apiUrl).then(displayTemperature);

const handleSubmit = function (e) {
  e.preventDefault();
  let cityInput = document.querySelector("#text-input");
  search(cityInput.value);
};

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// GEOLOCATION
const showPosition = (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e4a66098597897c288a0a1260d73a719";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
};

navigator.geolocation.getCurrentPosition(showPosition);

// CONVERSION TO FAHRENHEIT
const displayFahrenheitTemperature = function (e) {
  e.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
};

const displayCelsiusTemperature = function (e) {
  e.preventDefault();
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
};

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
