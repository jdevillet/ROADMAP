const temperatureInput = document.getElementById("temperatureInput");
const fromUnitSelect = document.getElementById("fromUnitSelect");
const toUnitSelect = document.getElementById("toUnitSelect");
const resultDisplay = document.getElementById("resultDisplay");

const FieldsChecker = () => {
  if (temperatureInput.value && fromUnitSelect.value && toUnitSelect.value) {
    resultDisplay.textContent = "";
    resultDisplay.classList.remove("error", "active");
    console.log("err1");

    tempConverter();
  } else {
    resultDisplay.textContent =
      "Please enter a temperature and select both units to proceed";
    resultDisplay.classList.add("error", "active");
    console.log("err2");
  }
};
//prettier-ignore
const tempConverter = () => {
  const fromValue = fromUnitSelect.value;
  const toValue = toUnitSelect.value;
  const temperature = Number(parseFloat(temperatureInput.value).toFixed(2));

  let convertedTemperature;

  if (fromValue === toValue) {
    resultDisplay.textContent = `${temperature} ${fromValue} = ${temperature} ${fromValue}`
    resultDisplay.classList.add("active")
    console.log("err3");
  } else {
    switch (fromValue) {
      case "celsius":
        if (toValue === "fahrenheit") {
          convertedTemperature = (temperature * 9) / 5 + 32;
        } else if (toValue === "kelvin") {
          convertedTemperature = temperature + 273.15;
        }
        break;

      case "fahrenheit":
        if (toValue === "celsius") {
          convertedTemperature = (temperature - 32) * 5 / 9;
        } else if (toValue === "kelvin") {
          convertedTemperature = (temperature - 32) * 5 / 9 + 273.15;
        }
        break;

      case "kelvin":
        if (toValue === "celsius") {
          convertedTemperature = temperature - 273.15;
        } else if (toValue === "fahrenheit") {
          convertedTemperature = (temperature - 273.15) * 9 / 5  + 32;
        }
        break;

      default:
        resultDisplay.textContent = "Error: Invalid unit selection.";
        resultDisplay.classList.add("error", "active");
            console.log("err4");
        return;
    }
  }

  if(convertedTemperature !== undefined){
    resultDisplay.textContent = `${temperature} ${fromValue} = ${convertedTemperature.toFixed(2)} ${toValue}`
    resultDisplay.classList.add("active")
        console.log("err5");
  }
};
