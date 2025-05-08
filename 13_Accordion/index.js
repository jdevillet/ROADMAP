document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    // Ignore clicks inside `.accordion-content`
    if (e.target.closest(".accordion-content")) return;

    const isOpen = item.classList.contains("active");

    //Close all opened items
    document.querySelectorAll(".accordion-item").forEach((el) => {
      el.classList.remove("active");
    });
    //Toggle the clicked item
    if (!isOpen) {
      item.classList.add("active");
    }
  });
});
