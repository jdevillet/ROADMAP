import { DateTime } from "./node_modules/luxon/build/es6/luxon.js";

const locationForm = document.getElementById("locationForm");
const locationInput = document.getElementById("locationInput");
// Main card const
const mainCard = document.getElementById("mainCard");
const mainCity = document.getElementById("city");
const mainDate = document.getElementById("date");
const mainTemp = document.getElementById("main-temp");
const mainWeather = document.getElementById("main-weather-condition");
const mainWind = document.getElementById("main-wind-speed");
const mainRain = document.getElementById("main-rain-probability");
// 24h outlook const
const hourlyCardsContainer = document.getElementById("hourlyCardsContainer");

const refreshBtn = document.getElementById("refresh-btn");
let locationValue;
let weatherDataGlobal = null;

async function loadWeatherData(location) {
  try {
    const todayLuxon = DateTime.local();
    const formattedYesterday = todayLuxon
      .minus({ days: 1 })
      .toFormat("yyyy-MM-dd");
    const formattedTomorrow = todayLuxon
      .plus({ days: 1 })
      .toFormat("yyyy-MM-dd");

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedYesterday}/${formattedTomorrow}?key=MQG42R4F2MZUF5YF5HEG9T55H&unitGroup=metric&include=days,hours,current`;

    console.log(url);

    const res = await fetch(url);

    if (!res.ok) {
      console.log("Error js:25");

      throw new Error("Api request failed");
    }

    const data = await res.json();
    console.log(data);
    weatherDataGlobal = data;
  } catch (error) {
    console.error("Error while loading weather data", error);
    weatherDataGlobal = null;
  }
}

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  locationValue = locationInput.value;

  const newLocation = locationInput.value.trim();
  locationInput.value = "";

  if (newLocation !== "") {
    await loadWeatherData(newLocation);
    if (weatherDataGlobal) {
      updateUiWithWeatherData(weatherDataGlobal);
    } else {
      console.log("No data loaded or error");
    }

    locationInput.value = "";
  } else {
    console.warn("Please enter a location.");
  }
});

function updateUiWithWeatherData(data) {
  mainCity.textContent = `${data.resolvedAddress}`;
  mainDate.textContent = `${data.days[1].datetime}`;
  mainTemp.textContent = `${data.currentConditions.temp}°C`;
  mainWeather.textContent = `${data.currentConditions.conditions}`;
  mainWind.textContent = `${data.currentConditions.windspeed}km/h`;
  mainRain.textContent = `${data.currentConditions.precipprob}%`;
}

class HourlyCard {
  constructor(hourlyData) {
    this.data = hourlyData;
    this.element = this.createDomElement();
  }

  createDomElement() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("hourly-card");

    // Heure
    const hourlyTime = document.createElement("span");
    hourlyTime.classList.add("hourly-time");
    hourlyTime.textContent = this.data.time;
    cardDiv.appendChild(hourlyTime);

    const hourlyTemp = document.createElement("span");
    hourlyTemp.classList.add("hourly-temp");
    hourlyTemp.classList.add("temperature");
    hourlyTemp.textContent = `${this.data.temperature}°C`;
    cardDiv.appendChild(hourlyTemp);

    const weatherConditionText = document.createElement("span");
    weatherConditionText.classList.add("weather-condition");
    weatherConditionText.classList.add("small");
    weatherConditionText.textContent = this.data.condition;
    cardDiv.appendChild(weatherConditionText);

    return cardDiv;
  }

  getElement() {
    return this.element;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Check if Luxon is available
  if (typeof DateTime === "undefined") {
    console.error(
      "Luxon DateTime is not defined. Please ensure Luxon is loaded correctly."
    );
    if (mainCard) {
      mainCard.innerHTML =
        "<p>Application Error: Date/Time library not loaded.</p>";
    }
    return;
  }

  await loadWeatherData("Paris, France");

  if (weatherDataGlobal) {
    console.log("Initial weather data loaded successfully.");
    updateUiWithWeatherData(weatherDataGlobal);
  } else {
    console.warn(
      "Failed to load initial weather data. Displaying default error messages."
    );
  }
});
