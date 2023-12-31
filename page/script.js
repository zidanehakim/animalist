const age = confirm("Are you 18 years old or older?");

let end;

window.addEventListener("scroll", (e) => {
  console.log(end);
  const totop = document.querySelector("#toTop");
  const tobottom = document.querySelector("#toBottom");
  if (window.scrollY > 0) {
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

const submitbtn = document.getElementById("submitbtn");
submitbtn.addEventListener("click", async (e) => {
  end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
  e.preventDefault();
  let text = submitbtn.previousElementSibling.value;
  text = text.replace(" ", "%20");

  await fetch("https://api.jikan.moe/v4/anime?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setAnime(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });

  await fetch("https://api.jikan.moe/v4/manga?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setManga(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });

  await fetch("https://api.jikan.moe/v4/characters?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setChar(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });
});

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
  e.preventDefault();
  let text = submitbtn.previousElementSibling.value;
  text = text.replace(" ", "%20");

  await fetch("https://api.jikan.moe/v4/anime?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setAnime(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });

  await fetch("https://api.jikan.moe/v4/manga?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setManga(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });

  await fetch("https://api.jikan.moe/v4/characters?q=" + text)
    .then((response) => response.json())
    .then((response) => {
      setChar(response.data);
    })
    .catch((e) => {
      console.log(e);
      end = document.querySelector("#end").getBoundingClientRect().top + window.scrollY;
    });
});

function setAnime(animes) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const txt1 = document.querySelector("#txtAnime");
  const section1 = document.querySelector("#sectionAnime");

  if (animes.length != 0) txt1.style.display = "block";
  else txt1.style.display = "none";
  section1.innerHTML = ``;

  for (anime of animes) {
    if (age) {
      section1.innerHTML += `<div class="bg-slate-950 rounded overflow-hidden mt-5 m-auto shadow-xl overflow-y-auto hover:scale-105 transition cursor-pointer obj" style="height:29em;width:16em">
              <div alt="" style="height:22em;width:100%;background-image: url(${anime.images.jpg.image_url});" class="bg-slate-950 bg-no-repeat m-auto bg-contain
               bg-center"></div>
              <div class="m-auto font-sans text-sm text-white">
                <h2 class="mt-2 mx-4 text-md font-semibold">${anime.title}</h2>
                <p class="mt-2 mx-4 inline">${anime.year == null ? "Not Found" : anime.year}</p>
                <p class="mt-2 mx-4 font-semibold">Episodes: <span class="font-normal">${anime.episodes}</span></p>
                <p class="mt-2 mx-4 font-semibold">Rating: <span class="font-normal">${anime.score}/10⭐</span></p>
              </div>
            </div>`;
    } else {
      rating = anime.rating[0];
      section1.innerHTML += `<div class="bg-slate-950 rounded overflow-hidden mt-5 m-auto shadow-xl overflow-y-auto hover:scale-105 transition cursor-pointer obj" style="height:29em;width:16em">
              <div alt="" style="height:22em;width:100%;background-image: url(${rating != "R" ? anime.images.jpg.image_url : "../img/restricted.png"});" class="bg-slate-950 bg-no-repeat m-auto bg-contain
               bg-center"></div>
              <div class="m-auto font-sans text-sm text-white">
                <h2 class="mt-2 mx-4 text-md font-semibold">${anime.title}</h2>
                <p class="mt-2 mx-4 inline">${anime.year == null ? "Not Found" : anime.year}</p>
                <p class="mt-2 mx-4 font-semibold">Episodes: <span class="font-normal">${anime.episodes}</span></p>
                <p class="mt-2 mx-4 font-semibold">Rating: <span class="font-normal">${anime.score}/10⭐</span></p>
              </div>
            </div>`;
    }
  }
}

function setManga(mangas) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const txt2 = document.querySelector("#txtManga");
  const section2 = document.querySelector("#sectionManga");

  if (mangas.length != 0) txt2.style.display = "block";
  else txt2.style.display = "none";
  section2.innerHTML = ``;

  for (manga of mangas) {
    if (age) {
      section2.innerHTML += `<div class="bg-slate-950 rounded overflow-hidden mt-5 m-auto shadow-xl overflow-y-auto hover:scale-105 transition cursor-pointer obj" style="height:29em;width:16em">
            <div alt="" style="height:22em;width:100%;background-image: url(${manga.images.jpg.image_url});" class=" bg-slate-950 bg-no-repeat m-auto bg-contain bg-center"></div>
            <div class="m-auto font-sans text-sm text-white">
              <h2 class="mt-2 mx-4 text-md font-semibold">${manga.title}</h2>
              <p class="mt-2 mx-4 inline">${manga.authors[0].name}</p>
              <p class="mt-2 mx-4 font-semibold">Chapters: <span class="font-normal">${manga.chapters}</span></p>
              <p class="mt-2 mx-4 font-semibold">Rating: <span class="font-normal">${manga.score}/10⭐</span></p>
            </div>
          </div>`;
    } else {
      rating = manga.rating[0];
      section2.innerHTML += `<div class="bg-slate-950 rounded overflow-hidden mt-5 m-auto shadow-xl overflow-y-auto hover:scale-105 transition cursor-pointer obj" style="height:29em;width:16em">
            <div alt="" style="height:22em;width:100%;background-image: url(${rating != "r" ? manga.images.jpg.image_url : "../img/restricted.png"});" class=" bg-slate-950 bg-no-repeat m-auto bg-contain bg-center"></div>
            <div class="m-auto font-sans text-sm text-white">
              <h2 class="mt-2 mx-4 text-md font-semibold">${manga.title}</h2>
              <p class="mt-2 mx-4 inline">${manga.authors[0].name}</p>
              <p class="mt-2 mx-4 font-semibold">Chapters: <span class="font-normal">${manga.chapters}</span></p>
              <p class="mt-2 mx-4 font-semibold">Rating: <span class="font-normal">${manga.score}/10⭐</span></p>
            </div>
          </div>`;
    }
  }
}

function setChar(chars) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const txt3 = document.querySelector("#txtChar");
  const section3 = document.querySelector("#sectionChar");

  if (chars.length != 0) txt3.style.display = "block";
  else txt3.style.display = "none";
  section3.innerHTML = ``;

  for (char of chars) {
    section3.innerHTML += `<div class="bg-slate-950 rounded overflow-hidden mt-5 m-auto shadow-xl overflow-y-auto hover:scale-105 transition cursor-pointer obj" style="height:27em;width:12em">
          <div alt="" style="height:20em;width:100%;background-image: url(${char.images.jpg.image_url});" class=" bg-slate-950 bg-no-repeat m-auto bg-contain bg-center"></div>
          <div class="m-auto font-sans text-sm text-white">
            <h2 class="mt-2 mx-4 text-md font-semibold">${char.name}</h2>
            <p class="mt-2 mx-4 inline">${char.name_kanji == null ? "No Kanji Name" : char.name_kanji}</p>
            <p class="mt-2 mx-4 font-semibold">Nickname: <span class="font-normal">${char.nicknames}</span></p>
          </div>
        </div>`;
  }
}
