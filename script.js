let end = document.querySelector("#end").getBoundingClientRect().top;

window.addEventListener("scroll", (e) => {
  const tobottom = document.querySelector("#toBottom");

  if (window.scrollY <= end - 1000) {
    tobottom.style.display = "block";
  } else {
    tobottom.style.display = "none";
  }
});

window.addEventListener("scroll", (e) => {
  const rock = document.querySelector(".rock");
  const platform = document.querySelector(".platform");
  const bg = document.querySelector(".bg");
  const text = document.querySelector(".text");

  const height = document.querySelector("header").offsetHeight - 1000;

  if (window.scrollY < height) {
    let value = window.scrollY;
    const offset = 100;

    platform.style.bottom = (value / height) * 1000 + "px";
    rock.style.right = -value * 1.5 + "px";
    rock.style.opacity = 1 - value / height;
    text.style.bottom = value * 0.3 + "px";
  }
});
