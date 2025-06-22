const langSelect = document.getElementById("lang-select");
const repoDisplay = document.querySelector(".repo-display");
const refreshBtn = document.getElementById("refresh-btn");

let languages = [];
let isLoading = false;

async function languagesFetch() {
  try {
    const res = await fetch("languages.json");
    const data = await res.json();
    languages = data;
    languages.shift();
    langSelect.innerHTML = "";

    langSelect.innerHTML = '<option value="">Select a language</option>';

    languages.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.value;
      option.textContent = language.title;
      langSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    repoDisplay.classList.add("bg-danger");
  }
}

async function getRandomRepo() {
  isLoading = true;
  repoDisplay.innerHTML = `
  <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
    <span></span>
  </div>
`;
  repoDisplay.classList.remove("bg-primary");
  refreshBtn.disabled = true;

  const url = `https://api.github.com/search/repositories?q=language:${langSelect.value}&sort=stars&order=desc&per_page=100`;
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/vnd.github+json",
      },
    });
    const data = await res.json();
    if (!data.items || data.items.length === 0) {
      repoDisplay.innerHTML = `<p>No repository have been found for ${langSelect.value}</p>`;
      repoDisplay.classList.add("bg-danger");
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.items.length);
    const repo = data.items[randomIndex];

    repoDisplay.innerHTML = `
      <p class="repo-name text-light fw-bold fs-2">${repo.name}</p>
      <p class="about text-light fst-italic fs-4">${repo.description}</p>
      <div class="repo-info">
        <p class="lang text-light"><i class="fa-solid fa-code"></i> ${repo.language}</p>
        <p class="stars text-light"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${repo.stargazers_count}</p>
        <p class="forks text-light"><i class="fa-solid fa-code-fork" style="color: #63E6BE;"></i> ${repo.forks}</p>
        <p class="issues text-light"><i class="fa-solid fa-triangle-exclamation" style="color: #fb0410;"></i> ${repo.open_issues}</p>
      </div>
    `;
    repoDisplay.classList.add("bg-primary");
    repoDisplay.classList.remove("bg-danger");
    refreshBtn.classList.remove("d-none");
  } catch (error) {
    console.log("Error fetching repository", error);
    repoDisplay.innerHTML =
      "<p>An error occured while fetching the repository</p>";
    repoDisplay.classList.add("bg-danger");
  } finally {
    isLoading = false;
    refreshBtn.disabled = false;
  }
}

refreshBtn.addEventListener("click", () => {
  getRandomRepo();
});

languagesFetch();

langSelect.addEventListener("input", () => {
  getRandomRepo();
});
