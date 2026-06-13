# FutureMLS Lab — Website

A clean, academic single-page website for the **Future Machine Learning & Systems (FutureMLS) Lab**,
founded by **Zhongzhu Zhou**. Pure HTML / CSS / vanilla JS — no build step, no dependencies.
Editorial, scholarly style (serif headings, restrained navy palette). Designed to be hosted for
free on GitHub Pages.

## Structure

```
code/
├── index.html              # Main page (hero, about, founder, research, news, team, projects, contact)
├── README.md
├── projects/               # Per-project preview pages
│   ├── oscar.html
│   └── care.html
└── assets/
    ├── css/style.css       # Styles (academic: serif display + navy palette)
    ├── js/main.js          # Nav, mobile menu, gentle scroll reveals
    └── img/
        ├── logo.png        # Lab logo (GitHub org avatar)
        ├── people/         # Member photos (e.g. zhongzhu-zhou.jpg)
        └── projects/       # Project preview images (oscar, care)
```

## Preview locally

No tooling required — just open `index.html` in a browser, or serve it:

```bash
# from inside this folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

You have two common options.

### Option A — Lab "root" site at `https://futuremls-lab.github.io/`

1. Create a repo named **`FutureMLS-Lab.github.io`** in the org.
2. Put the **contents of this `code/` folder at the repo root** (so `index.html` is at the top level).
3. Push to the `main` branch.
4. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)`.
5. The site goes live at **https://futuremls-lab.github.io/**

### Option B — Project site at `https://futuremls-lab.github.io/<repo>/`

1. Create any repo, e.g. **`website`**, and push these files to it.
2. Settings → Pages → Branch: `main` / `(root)`.
3. Live at **https://futuremls-lab.github.io/website/**

### Custom domain (optional)

In **Settings → Pages → Custom domain**, add e.g. `futuremls.org`, then create a `CNAME`
record at your DNS provider pointing to `futuremls-lab.github.io`.

## Editing content

Everything is plain HTML in `index.html` — no framework knowledge needed.

- **Lab name / hero** — the full lab name is the page's main `<h1>` at the top of the `#home` hero.
- **About Zhongzhu Zhou (founder)** — edit the `#founder` section. Replace the placeholder bio
  text, and the `href="#"` links (Homepage / Google Scholar / GitHub / Email).
  - To use a real photo instead of the `ZZ` monogram, replace
    `<div class="founder__avatar" data-mono="ZZ" ...></div>` with
    `<img class="founder__photo" src="assets/img/zhongzhu-zhou.jpg" alt="Zhongzhu Zhou" />`.
- **Team** — edit the `#team` section. Each person is an `<article class="person">`. To use a real
  photo instead of the initials, replace `<div class="person__avatar" data-mono="ZC" ...></div>`
  with `<img class="person__photo" src="assets/img/people/your-photo.jpg" alt="Name" />`.
  Each member also has a one-line bio and research-area tags (`<ul class="person__tags">`).
- **Research areas** — edit the items in the `#research` section.
- **Projects** — each card in `#projects` links to a preview page in `projects/`. To add a project:
  duplicate `projects/care.html`, update its title / preview image / abstract / authors / links,
  drop a preview image in `assets/img/projects/`, then add a matching `<a class="project">` card
  on `index.html`. Bold the lab members in the author list with `<strong>…</strong>`.
- **News** — add `<li class="news__item reveal">` entries in `#news`.
- **Contact email** — search for `contact@futuremls.org` and replace with the real address.
- **Colors / fonts** — tweak the CSS variables at the top of `assets/css/style.css` (`:root`).

## Notes

- Academic, content-first design: serif display headings (Source Serif 4) with a clean sans body
  (Inter), a restrained navy palette, and generous whitespace — no animated/“tech” effects.
- Fully responsive (desktop / tablet / mobile) with an accessible mobile menu, and it respects
  the user's reduced-motion setting.
