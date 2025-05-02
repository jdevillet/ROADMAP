const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    if (!tab.classList.contains("active")) {
      document.querySelector(".tab.active")?.classList.remove("active");
      document
        .querySelector(".tab-panel.active-panel")
        ?.classList.remove("active-panel");
      tab.classList.add("active");
      panels[index].classList.add("active-panel");
    }
  });
});
