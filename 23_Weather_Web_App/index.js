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

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Api request failed");
    }

    const data = await res.json();
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
    }
    locationInput.value = "";
  } else {
    console.warn("Please enter a location.");
  }
});

function updateUiWithWeatherData(data) {
  console.log("refreshed from shit");
  const allHours = [];
  // Main card
  mainCity.textContent = `${data.resolvedAddress}`;
  mainDate.textContent = `${DateTime.now().toFormat("dd-MM-yyyy")}`;
  mainTemp.textContent = `${data.currentConditions.temp}°C`;
  mainWeather.textContent = `${data.currentConditions.conditions}`;
  mainWind.textContent = `${data.currentConditions.windspeed}km/h`;
  mainRain.textContent = `${data.currentConditions.precipprob}%`;

  // data for hourlyCards
  for (let i = 0; i < data.days.length; i++) {
    for (let j = 0; j < data.days[i].hours.length; j++) {
      allHours.push(data.days[i].hours[j]);
    }
  }

  const nowSecondsEpoch = DateTime.now().toUnixInteger();
  let closestHourIndex = 0;
  let smallestDifference = Infinity;

  for (let i = 0; i < allHours.length; i++) {
    const difference = Math.abs(nowSecondsEpoch - allHours[i].datetimeEpoch);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestHourIndex = i;
    }
  }

  const startIndex = Math.max(0, closestHourIndex - 24);
  const endIndex = Math.min(allHours.length - 1, closestHourIndex + 24);
  const selectedHours = allHours.slice(startIndex, endIndex + 1);

  hourlyCardsContainer.innerHTML = "";
  let currentHourCardElement = null;

  selectedHours.forEach((hour) => {
    const isCurrent =
      hour.datetimeEpoch === allHours[closestHourIndex].datetimeEpoch;
    const card = new HourlyCard(hour, isCurrent);

    if (isCurrent) {
      card.getElement().classList.add("current-hour");
      currentHourCardElement = card.getElement();
    }

    hourlyCardsContainer.appendChild(card.getElement());
  });

  // Scroll automatique pour centrer la carte de l'heure actuelle
  if (currentHourCardElement) {
    const containerWidth = hourlyCardsContainer.offsetWidth;
    const cardLeft = currentHourCardElement.offsetLeft;
    const cardWidth = currentHourCardElement.offsetWidth;

    const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

    hourlyCardsContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
}

class HourlyCard {
  constructor(hourlyData, isCurrent = false) {
    this.data = hourlyData;
    this.isCurrent = isCurrent;
    this.element = this.createDomElement();
  }

  createDomElement() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("hourly-card");

    // Heure
    const hourlyTime = document.createElement("span");
    hourlyTime.classList.add("hourly-time");
    if (this.isCurrent) {
      hourlyTime.textContent = "Now";
    } else {
      hourlyTime.textContent = DateTime.fromISO(this.data.datetime).toFormat(
        "HH:mm"
      );
    }
    cardDiv.appendChild(hourlyTime);

    const hourlyTemp = document.createElement("span");
    hourlyTemp.classList.add("hourly-temp");
    hourlyTemp.classList.add("temperature");
    hourlyTemp.textContent = `${this.data.temp}°C`;
    cardDiv.appendChild(hourlyTemp);

    const weatherConditionText = document.createElement("span");
    weatherConditionText.classList.add("weather-condition");
    weatherConditionText.classList.add("small");
    weatherConditionText.textContent = this.data.conditions;
    cardDiv.appendChild(weatherConditionText);

    return cardDiv;
  }

  getElement() {
    return this.element;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
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
    updateUiWithWeatherData(weatherDataGlobal);
  }
});

refreshBtn.addEventListener("click", async () => {
  const refreshLocation = locationValue || "Paris, France";
  await loadWeatherData(refreshLocation);
  if (weatherDataGlobal) {
    updateUiWithWeatherData(weatherDataGlobal);
  }
});
