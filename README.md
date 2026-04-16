# Animalist

A dark, cinematic anime search web app powered by the [Jikan API](https://jikan.moe/). Search for anime, manga, and characters — complete with age-aware content filtering and a visually immersive interface.

---

## Preview

| Landing Page | Search Results |
|---|---|
| Parallax hero with animated title | Glassmorphism cards with staggered reveals |

---

## Features

- **Anime search** — title, year, episode count, and star rating
- **Manga search** — title, author, chapter count, and rating
- **Character search** — name, kanji, and nicknames
- **Age gate** — R-rated content is hidden for users under 18 (browser confirm prompt)
- **Parallax hero** — layered background, rock, and platform scroll animation
- **Scroll reveal** — sections fade in as you scroll using `IntersectionObserver`
- **Loading state** — spinner while API requests are in flight

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + [Tailwind CSS](https://tailwindcss.com/) (CDN) |
| Scripting | Vanilla JavaScript (ES2020+) |
| Data | [Jikan REST API v4](https://docs.api.jikan.moe/) |
| Fonts | Freckle Face, Josefin Sans ExtraLight, Mirza (self-hosted `.woff2`) |

No build step, no bundler, no dependencies to install.

---

## Project Structure

```
animalist/
├── index.html          # Landing page
├── style.css           # Landing page styles
├── script.js           # Landing page JS (parallax + scroll reveals)
├── tailwind.config.js
│
├── page/
│   ├── page.html       # Search page
│   ├── style.css       # Search page styles
│   └── script.js       # Search logic + card rendering
│
├── img/                # Background, character, and decorative images
│   ├── bg.png
│   ├── rock.png
│   ├── platform.png
│   ├── leftrock.png
│   ├── char1.png
│   ├── waifu1-5.png
│   ├── story1-2.png
│   ├── aot.jpg / bnha.jpg / kny.jpg
│   ├── orna1-5.png
│   ├── restricted.png
│   ├── scrolldown.png
│   └── pulldown.png
│
└── font/
    ├── FreckleFace-Regular.woff2
    ├── JosefinSans-ExtraLight.woff2
    └── Mirza-Regular.woff2
```

---

## Running Locally

No installation required. Just open the files in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (avoids any CORS quirks)
npx serve .
# or
python -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## How It Works

### Landing Page (`index.html`)

The landing page introduces the app through five sections:

1. **Hero** — parallax layers driven by `scroll` event listeners; the rock, platform, and background image move at different speeds creating depth.
2. **About** — brief description + feature list in a glassmorphism card.
3. **Featured** — rotated anime card previews demonstrating the visual style.
4. **Waifu** — character archetype cards (Kuudere, Tsundere, Dandere, Yandere) + definition.
5. **Stories** — CTA to the search page.

All sections animate in via `IntersectionObserver` with staggered delays.

### Search Page (`page/page.html`)

1. User enters a query and submits (button click or Enter key).
2. Three parallel `fetch` calls hit the Jikan API:
   - `GET /v4/anime?q={query}`
   - `GET /v4/manga?q={query}`
   - `GET /v4/characters?q={query}`
3. Results render as cards with a staggered CSS entrance animation.
4. If the user is under 18 (answered "No" to the confirm dialog), R-rated content shows a restricted placeholder image instead of the actual cover.

---

## API Reference

All data comes from **Jikan API v4** — an unofficial MyAnimeList REST API.

| Endpoint | Used for |
|---|---|
| `GET /v4/anime?q=` | Anime search results |
| `GET /v4/manga?q=` | Manga search results |
| `GET /v4/characters?q=` | Character search results |

No API key required. Rate limit: ~3 requests/second.
Docs: [docs.api.jikan.moe](https://docs.api.jikan.moe/)

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#f7c948` | Primary accent, titles, badges |
| `--crimson` | `#e63080` | Secondary accent, hover states |
| `--bg` | `#04030e` | Page background |
| `--surface` | `rgba(255,255,255,0.04)` | Glass cards |
| `--border` | `rgba(255,255,255,0.08)` | Card borders |
| `--text` | `#ede9f8` | Body text |
| `--text-muted` | `#6b6b8a` | Secondary text, labels |

**Fonts:**
- `Freckle Face` — display titles (logo, section headers)
- `Josefin Sans ExtraLight` — UI labels, buttons, metadata
- `Mirza` — body copy, story text

---

## License

MIT — free to use and modify.
