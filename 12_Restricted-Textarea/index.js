const textaWrapper = document.querySelector(".textarea-wrapper");
const texta = document.getElementById("textarea");
const charCounter = document.querySelector(".char-counter");

texta.addEventListener("input", (e) => {
  let count = e.target.value.length;

  // Update the counter display
  charCounter.textContent = `${count} / 250`;

  // Change styles when limit is reached
  if (count >= 250) {
    texta.value = texta.value.substring(0, 250); // Prevent extra input
    textaWrapper.classList.add("full-character");
    charCounter.style.color = "hsl(0, 100%, 36.30%)";
  } else {
    textaWrapper.classList.remove("full-character");
    charCounter.style.color = "hsl(0, 0%, 100%)";
  }
});
