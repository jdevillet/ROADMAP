const cookies = document.querySelector(".cookie-container");
const acceptBtn = document.querySelector(".cookie-accept");
const closeBtn = document.querySelector(".cookie-close");

window.addEventListener("load", () => {
  if (localStorage.getItem("cookieAccepted") === "true") {
    cookies.style.opacity = "0";
    cookies.style.visibility = "hidden";
  } else {
    setTimeout(() => {
      cookies.style.transform = "translateX(0px)";
      cookies.style.opacity = "1";
      cookies.style.visibility = "visible";
    }, 1500);
  }
});

function hidePopup() {
  cookies.style.transform = "translateX(400px)";
  cookies.style.opacity = "0";
  setTimeout(() => {
    cookies.style.visibility = "hidden";
  }, 500);
}

closeBtn.addEventListener("click", hidePopup);

acceptBtn.addEventListener("click", () => {
  hidePopup();
  localStorage.setItem("cookieAccepted", "true");
});
