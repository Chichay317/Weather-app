let apiKey = "3da039b417fa6e099b7ac6t564e75o47";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key=${apiKey}&units=metric`;

const formatDay = function (timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
};

const displayForecast = function (response) {
  let dayForecast = response.data.daily;
  // console.log(dayForecast);
  const forecastEl = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  dayForecast.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
     <div class="weather-date">${formatDay(forecastDay.time)}</div> 
     <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
      alt="Thursday Forecast"
      width="42"
     />
     <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
     </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
};

const search = function (city) {
  let apiKey = "3da039b417fa6e099b7ac6t564e75o47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
};

const getForecast = function (coord) {
  let apiKey = "3da039b417fa6e099b7ac6t564e75o47";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coord.longitude}&lat=${coord.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  celsiusTemperature = response.data.temperature.current;

  const now = new Date();
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  const locale = navigator.language;

  temperatureEl.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  speed.innerHTML = `${Math.round(response.data.wind.speed)}m/h`;
  date.innerHTML = new Intl.DateTimeFormat(locale, options).format(now);
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
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
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "3da039b417fa6e099b7ac6t564e75o47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

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
