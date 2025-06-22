// Références aux éléments HTML
const temperatureInput = document.getElementById("temperatureInput");
const convertButton = document.getElementById("convertButton");
const resultDisplay = document.getElementById("resultDisplay");

// Références pour le dropdown "From Unit"
const fromUnitButton = document.getElementById("fromUnitButton");
const fromUnitMenu = document.getElementById("fromUnitMenu");
const fromUnitOptions = fromUnitMenu.querySelectorAll(".option");

// Références pour le dropdown "To Unit"
const toUnitButton = document.getElementById("toUnitButton");
const toUnitMenu = document.getElementById("toUnitMenu");
const toUnitOptions = toUnitMenu.querySelectorAll(".option");

// Références pour le conteneur principal et toutes les options
const container = document.querySelector(".container");
const allOptions = document.querySelectorAll(".option");

let selectedFromUnit = null;
let selectedToUnit = null;
let activeDropdownMenu = null;

const closeDropdown = () => {
  if (activeDropdownMenu) {
    activeDropdownMenu.classList.remove("active");
    const associatedButton = activeDropdownMenu.previousElementSibling;
    if (
      associatedButton &&
      associatedButton.classList.contains("dropdown__button")
    ) {
      associatedButton.classList.remove("active");
    }
    activeDropdownMenu = null;
  }
};

document.addEventListener("click", (e) => {
  const isButtonClick = e.target.closest(".dropdown__button");
  const isMenuClick = e.target.closest(".dropdown__menu");

  if (!isButtonClick && !isMenuClick) {
    closeDropdown();
  }
});

function toggleDropdown(buttonElement, menuElement) {
  if (activeDropdownMenu && activeDropdownMenu !== menuElement) {
    activeDropdownMenu.previousElementSibling.classList.remove("active");
    activeDropdownMenu.classList.remove("active");
    activeDropdownMenu = null;
  }
  buttonElement.classList.toggle("active");
  menuElement.classList.toggle("active");
  if (!menuElement.classList.contains("active")) {
    activeDropdownMenu = null;
  } else {
    activeDropdownMenu = menuElement;
  }
}

fromUnitButton.addEventListener("click", () => {
  toggleDropdown(fromUnitButton, fromUnitMenu);
});

toUnitButton.addEventListener("click", () => {
  toggleDropdown(toUnitButton, toUnitMenu);
});

allOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const parentMenu = option.closest(".dropdown__menu");
    if (parentMenu === fromUnitMenu) {
      fromUnitButton.textContent = option.textContent;
      selectedFromUnit = option.dataset.unit;

      fromUnitOptions.forEach((opt) => {
        opt.classList.remove("selected");
      });

      option.classList.add("selected");
    } else {
      toUnitButton.textContent = option.textContent;
      selectedToUnit = option.dataset.unit;
      toUnitOptions.forEach((opt) => {
        opt.classList.remove("selected");
      });

      option.classList.add("selected");
    }
    closeDropdown();
  });
});
// prettier-ignore
function tempConverter() {
  const inputValue = temperatureInput.value.trim();
  const temperature = parseFloat(inputValue);

  if (inputValue === "" || isNaN(temperature)) {
    resultDisplay.textContent = "Please, insert a valid number";
    resultDisplay.classList.add("active", "error");
    return;
  }
  if (!selectedFromUnit || !selectedToUnit) {
    resultDisplay.textContent = "Please, select both units for conversion";
    resultDisplay.classList.add("active", "error");
    return;
  }
    resultDisplay.textContent = "";
    resultDisplay.classList.remove("active", "error");

  let convertedTemperature;

  if (selectedFromUnit === selectedToUnit) {
    convertedTemperature = temperature;
  } else {
    switch (selectedFromUnit) {

      case "celsius":
        if (selectedToUnit === "fahrenheit") {
          convertedTemperature = (temperature * 9 / 5) + 32;
        } else if (selectedToUnit === "kelvin") {
          convertedTemperature = temperature + 273.15;
        }
        break; 

      case "fahrenheit":
        if (selectedToUnit === "celsius") {
          convertedTemperature = (temperature - 32) * 5 / 9;
        } else if (selectedToUnit === "kelvin") {
          convertedTemperature = (temperature - 32) * 5 / 9 + 273.15;
        }
        break;

      case "kelvin":
        if (selectedToUnit === "celsius") {
          convertedTemperature = temperature - 273.15;
        } else if (selectedToUnit === "fahrenheit") {
          convertedTemperature = (temperature - 273.15) * 9 / 5  + 32;
        }
        break; 

        default: console.error("Unité de départ non reconnue:", selectedFromUnit);
                resultDisplay.textContent = "Erreur: unité de départ non reconnue.";
                resultDisplay.classList.add("active");
                resultDisplay.classList.add("error");
                break;
      }
    }

      if (convertedTemperature !== undefined) {
        resultDisplay.textContent = `${temperature.toFixed(2)} ${selectedFromUnit.toUpperCase()} = ${convertedTemperature.toFixed(2)} ${selectedToUnit.toUpperCase()}`;
        resultDisplay.classList.add("active");
    } else {
        resultDisplay.textContent = "Erreur de conversion. Combinaison d'unités non gérée.";
        resultDisplay.classList.add("active");
        resultDisplay.classList.add("error");
    }
  }

convertButton.addEventListener("click", tempConverter);
