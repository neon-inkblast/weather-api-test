// Global variables
var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

// DOM element references
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var searchText = document.querySelector("#search-text");
var responseHolder = document.querySelector("#response-holder");

function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      responseHolder.textContent = "";
      var responseText = document.createElement("p");
      responseText.textContent = JSON.stringify(data);
      responseHolder.appendChild(responseText);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        console.log("Location not found");
      } else {
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  if (!searchInput.value) {
    return;
  }

  var search = searchInput.value.trim();
  searchText.textContent = search;
  responseHolder.textContent = "Loading...";
  fetchCoords(search);
  searchInput.value = "";
}

searchForm.addEventListener("submit", handleSearchFormSubmit);
