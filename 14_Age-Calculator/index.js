import { DateTime } from "./node_modules/luxon/build/es6/luxon.js";

document.addEventListener("DOMContentLoaded", () => {
  let datepickerElement = document.querySelector("#datepicker");

  if (datepickerElement) {
    const picker = datepicker(datepickerElement, {
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString();
        input.value = value;
      },
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
    });
  } else {
    console.error("Datepicker element not found!");
  }
});

function ageCalculator() {
  const todayDate = DateTime.now();
  let userInput = document.getElementById("datepicker").value;
  let birthDate = DateTime.fromFormat(userInput, "dd/MM/yyyy");
  let age = todayDate.diff(birthDate, ["years"]);

  if (!userInput) {
    alert("Please pick your birthdate");
    return;
  }
  if (!birthDate.isValid) {
    alert("Format de date invalide ! Utilisez 'JJ/MM/AAAA'.");
    return;
  }

  if (result.classList.contains("hidden")) {
    result.classList.remove("hidden");
  }
  result.textContent = `Your age : ${Math.floor(age.years)} years`;
}

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();

  ageCalculator();
});
