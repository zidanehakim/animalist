/* =========================================
   ANIMALIST — SEARCH PAGE SCRIPT
   ========================================= */

const age = confirm("Are you 18 years old or older?");

let end;

// ── Scroll button visibility ──
window.addEventListener("scroll", () => {
  const totop = document.querySelector("#toTop");
  const tobottom = document.querySelector("#toBottom");

  if (window.scrollY > 200) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }

  if (window.scrollY <= end - 1000) {
    tobottom.style.display = "block";
  } else {
    tobottom.style.display = "none";
  }
});

// ── Loading state helpers ──
function showLoading() {
  document.querySelector("#loading").classList.add("active");
  // Reset result sections
  ["sectionAnime", "sectionManga", "sectionChar"].forEach((id) => {
    document.querySelector("#" + id).innerHTML = "";
  });
  ["txtAnime", "txtManga", "txtChar"].forEach((id) => {
    document.querySelector("#" + id).classList.remove("visible");
  });
}

function hideLoading() {
  document.querySelector("#loading").classList.remove("active");
  end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
}

// ── Search trigger ──
async function doSearch() {
  const input = document.querySelector(".search-input");
  let text = input.value.trim();
  if (!text) return;

  showLoading();
  window.scrollTo({ top: 0, behavior: "smooth" });

  text = text.replace(/ /g, "%20");

  await Promise.all([
    fetch("https://api.jikan.moe/v4/anime?q=" + text)
      .then((r) => r.json())
      .then((r) => setAnime(r.data))
      .catch(() => setAnime([])),

    fetch("https://api.jikan.moe/v4/manga?q=" + text)
      .then((r) => r.json())
      .then((r) => setManga(r.data))
      .catch(() => setManga([])),

    fetch("https://api.jikan.moe/v4/characters?q=" + text)
      .then((r) => r.json())
      .then((r) => setChar(r.data))
      .catch(() => setChar([])),
  ]);

  hideLoading();
}

// ── Event listeners ──
document.querySelector("#submitbtn").addEventListener("click", (e) => {
  e.preventDefault();
  doSearch();
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  doSearch();
});

// ── Card builders ──

function buildAnimeCard(anime, index) {
  const imageUrl = age
    ? anime.images.jpg.image_url
    : anime.rating && anime.rating[0] === "R"
    ? "../img/restricted.png"
    : anime.images.jpg.image_url;

  const score = anime.score ? `★ ${anime.score}` : "★ N/A";
  const year = anime.year ?? "Unknown";
  const episodes = anime.episodes ? `${anime.episodes} ep` : "? ep";

  return `
    <div class="search-card" style="animation-delay: ${index * 0.05}s;">
      <div class="card-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center top;">
        <div class="card-image-gradient"></div>
        <div class="card-rating-badge">${score}</div>
      </div>
      <div class="card-body">
        <h2 class="card-title">${anime.title}</h2>
        <div class="card-meta">
          <span>${year}</span>
          <span class="card-meta-dot"></span>
          <span>${episodes}</span>
        </div>
      </div>
    </div>
  `;
}

function buildMangaCard(manga, index) {
  const imageUrl = age
    ? manga.images.jpg.image_url
    : manga.rating && manga.rating[0] === "r"
    ? "../img/restricted.png"
    : manga.images.jpg.image_url;

  const score = manga.score ? `★ ${manga.score}` : "★ N/A";
  const author = manga.authors && manga.authors[0] ? manga.authors[0].name : "Unknown";
  const chapters = manga.chapters ? `${manga.chapters} ch` : "? ch";

  return `
    <div class="search-card" style="animation-delay: ${index * 0.05}s;">
      <div class="card-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center top;">
        <div class="card-image-gradient"></div>
        <div class="card-rating-badge">${score}</div>
      </div>
      <div class="card-body">
        <h2 class="card-title">${manga.title}</h2>
        <div class="card-meta">
          <span>${author}</span>
          <span class="card-meta-dot"></span>
          <span>${chapters}</span>
        </div>
      </div>
    </div>
  `;
}

function buildCharCard(char, index) {
  const name = char.name ?? "Unknown";
  const kanji = char.name_kanji ?? "";
  const nicknames = char.nicknames && char.nicknames.length > 0
    ? char.nicknames.slice(0, 2).join(", ")
    : "";

  return `
    <div class="search-card char-card" style="animation-delay: ${index * 0.05}s;">
      <div class="card-image" style="background-image: url('${char.images.jpg.image_url}'); background-size: cover; background-position: center top;">
        <div class="card-image-gradient"></div>
      </div>
      <div class="card-body">
        <h2 class="card-title">${name}</h2>
        <div class="card-meta" style="flex-direction: column; align-items: flex-start; gap: 0.2rem;">
          ${kanji ? `<span>${kanji}</span>` : ""}
          ${nicknames ? `<span style="color: var(--gold); opacity: 0.7;">${nicknames}</span>` : ""}
        </div>
      </div>
    </div>
  `;
}

// ── Section setters ──

function setAnime(animes) {
  const txt = document.querySelector("#txtAnime");
  const section = document.querySelector("#sectionAnime");

  if (animes && animes.length > 0) {
    txt.classList.add("visible");
    section.innerHTML = animes.map((a, i) => buildAnimeCard(a, i)).join("");
  } else {
    txt.classList.remove("visible");
    section.innerHTML = "";
  }
}

function setManga(mangas) {
  const txt = document.querySelector("#txtManga");
  const section = document.querySelector("#sectionManga");

  if (mangas && mangas.length > 0) {
    txt.classList.add("visible");
    section.innerHTML = mangas.map((m, i) => buildMangaCard(m, i)).join("");
  } else {
    txt.classList.remove("visible");
    section.innerHTML = "";
  }
}

function setChar(chars) {
  const txt = document.querySelector("#txtChar");
  const section = document.querySelector("#sectionChar");

  if (chars && chars.length > 0) {
    txt.classList.add("visible");
    section.innerHTML = chars.map((c, i) => buildCharCard(c, i)).join("");
  } else {
    txt.classList.remove("visible");
    section.innerHTML = "";
  }
}
