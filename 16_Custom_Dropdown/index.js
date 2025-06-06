const dropdownBtn = document.querySelector(".dropdown__button");
const dropdownMenu = document.querySelector(".dropdown__menu");
const container = document.querySelector(".container");
const options = document.querySelectorAll(".option");

let selectedOption = null;

const closeDropdown = () => {
  dropdownBtn.classList.remove("active");
  dropdownMenu.classList.remove("active");
};

dropdownBtn.addEventListener("click", () => {
  dropdownBtn.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    !container.contains(e.target) &&
    dropdownMenu.classList.contains("active")
  ) {
    closeDropdown();
  }
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    if (option === selectedOption) {
      option.classList.remove("selected");
      dropdownBtn.textContent = "Pick an option";
      selectedOption = null;
    } else {
      if (selectedOption) {
        selectedOption.classList.remove("selected");
      }
      option.classList.add("selected");
      selectedOption = option;
      dropdownBtn.textContent = option.textContent;
    }
    closeDropdown();
  });
});
