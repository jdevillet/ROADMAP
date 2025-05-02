// Retrieve and apply the saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const sunIcon = document.getElementById("sun_icon");
  const moonIcon = document.getElementById("moon_icon");

  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
    // Set the correct icon based on the saved theme
    if (savedTheme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  } else {
    // Default theme and icon
    localStorage.setItem("theme", "dark");
    document.body.setAttribute("data-theme", "dark");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
});

// Toggle theme function (unchanged)
function toggleTheme() {
  const sunIcon = document.getElementById("sun_icon");
  const moonIcon = document.getElementById("moon_icon");
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}
