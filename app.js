function showTemperature(response) {
  console.log(response.data);
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDay(response.data.dt * 1000);
  let timeElement = document.querySelector(".time");
  timeElement.innerHTML = formatTime();
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°";
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let maxTemperatureElement = document.querySelector(".maxTemperature");
  maxTemperatureElement.innerHTML =
    "H:" + Math.round(response.data.main.temp_max) + "°";
  let minTemperatureElement = document.querySelector(".minTemperature");
  minTemperatureElement.innerHTML =
    "L:" + Math.round(response.data.main.temp_min) + "°";
  let feelElement = document.querySelector(".feelValue");
  feelElement.innerHTML = Math.round(response.data.main.feels_like) + "°";
  let humidityElement = document.querySelector(".humidityValue");
  humidityElement.innerHTML = Math.round(response.data.main.humidity) + "%";
  let windElement = document.querySelector(".windValue");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";

  getForecast(response.data.coord);
}

function formatDay(dateStamp) {
  let date = new Date(dateStamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let today = date.getDate();

  return `${day}, ${month} ${today}`;
}

function formatTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    return `${hour}:0${minutes}`;
  } else {
    return `${hour}:${minutes}`;
  }
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput").value;
  search(cityInput);
}

search("Philadelphia");

let formElement = document.querySelector(".search");
formElement.addEventListener("submit", searchCity);

function search(city) {
  let apiKey = "d1bfa8b608cc07b251c544946b2756ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function formatDate(dayStamp){
let date =  new Date(dayStamp*1000);
let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];

}

function weeklyForecast(response) {
let forecast = response.data.daily;
  let forecastElement = document.querySelector(".dailyTemperatures");
    let forecastHTML = '<div class="row">';
  forecast.forEach(function (forecastDay, index) {
    if(index <5){
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
 <div class="weekDay">${formatDate(forecastDay.dt)}</div>
        <div class="weekTemperature">${Math.round(forecastDay.temp.day)}</div>
        <div class="maxDayTemperature">${Math.round(forecastDay.temp.max)}</div>
                <div class="minDayTemperature">${Math.round(
                  forecastDay.temp.min
                )}</div>
          </div>    
`;
    }
  });
forecastHTML += `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(response) {
  console.log(response);
let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weeklyForecast);
}
