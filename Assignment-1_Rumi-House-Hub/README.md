# Rumi House Hub — WAD Assignment 1

A student engagement portal for **Rumi House** at Namal University, Mianwali.  
Built with **pure HTML5** and an **external CSS** file — no frameworks or JavaScript.

---

## 📸 Preview

| Header & Hero | Societies Grid | Events & Form |
|---|---|---|
| ![Hero](screenshots/01_header_hero.png) | ![Grid](screenshots/02_about_societies.png) | ![Events](screenshots/03_events_table.png) |

---

## 🚀 Features

### Task 1 — HTML Structure
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<address>`
- Proper `<head>` with title, charset, viewport, description, and keywords meta tags
- Heading hierarchy (`h1`–`h4`), paragraphs, links, and images with alt text

### Task 2 — Content Elements
- **Form** with all 8 input types: text, email, password, checkbox, radio, date, file, submit
- **Table** — 4 columns × 4 rows with `<thead>`, `scope="col"`, and `<time>` elements
- **Ordered list** — 6 items (registration steps)
- **Unordered list** — 6 items (benefits of joining)
- **Audio** — `<audio controls>` with WAV source
- **Video** — `<video controls>` with MP4 source
- **Accessibility** — alt text, labels, skip link, ARIA attributes

### Task 3 — CSS Styling & Box Model
- **External stylesheet** (`styles.css`) — no inline or embedded styles
- **Selector types**: element, class, ID, grouping, pseudo-class (`:hover`, `:focus-visible`, `:nth-child`), pseudo-element (`::before`, `::first-line`)
- **Box Model**: `margin`, `padding`, `border`, `width`, `height`, `box-sizing: border-box`
- CSS custom properties, smooth transitions, gradient backgrounds

### Task 4 — Layout & Responsiveness
- **Flexbox**: navigation bar, header, two-column panels, footer, button rows
- **CSS Grid**: 3×3 society cards, hero two-column layout, form label+input rows
- **Media Queries**: mobile (≤600px), tablet (601–991px), desktop (≥992px)

---

## 📁 File Structure

```
Assignment-1_Rumi-House-Hub/
├── index.html                 # Main HTML page
├── styles.css                 # External CSS stylesheet
├── Assignment1_Report.html    # Submission report (open in Word)
├── README.md                  # This file
├── media/
│   ├── logo.svg               # Brand logo
│   ├── hero.svg               # Hero illustration
│   ├── rumi-intro.wav         # Audio sample (5 seconds)
│   └── rumi-tour.mp4          # Video sample (5 seconds)
└── screenshots/
    ├── 01_header_hero.png
    ├── 02_about_societies.png
    ├── 03_events_table.png
    ├── 04_registration_form.png
    └── 05_multimedia_footer.png
```

---

## 🛠️ How to View

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge)
2. No server or build step required — it's pure HTML + CSS

---

## 📝 Assignment Info

| | |
|---|---|
| **Course** | Web Application Development (WAD) |
| **Instructor** | Ammar Ahmad Khan |
| **University** | Namal University, Mianwali |
| **Due Date** | 20-March-2026 |

---

> This project serves as the foundation for a complete web application to be developed throughout the semester.
