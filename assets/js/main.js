/* ============================================================
   FutureMLS Lab — interactions (lightweight, academic)
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav hairline on scroll ---------- */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Language toggle (EN default, choice remembered) ---------- */
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.lang === "zh" ? "en" : "zh";
      document.documentElement.dataset.lang = next;
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
      try {
        localStorage.setItem("lang", next);
      } catch (e) {
        /* storage unavailable — switch still applies for this page */
      }
    });
  }

  /* ---------- Cap homepage news to the latest 5 ---------- */
  const homeNews = document.querySelector("#news .news");
  if (homeNews) {
    const items = homeNews.querySelectorAll(".news__item");
    items.forEach((item, i) => {
      if (i >= 5) item.style.display = "none";
    });
  }

  /* ---------- Gentle reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const siblings = el.parentElement ? el.parentElement.children : [el];
            const delay = (Array.prototype.indexOf.call(siblings, el) % 4) * 60;
            setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }
})();
