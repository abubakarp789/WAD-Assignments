# Abu Bakar — Personal Portfolio Website
### Web Application Development (WAD) — Assignment 3

A premium, modern, and fully responsive static personal portfolio website designed for **Abu Bakar**, a Computer Science undergraduate and AI/ML enthusiast at Namal University. Built with **Bootstrap 5.3.3**, **Bootstrap Icons**, custom **Google Fonts (Outfit)**, and extensive **custom CSS style overrides** to deliver a premium user interface.

---

## 🎓 Academic & Portfolio Details

| Field | Detail |
|---|---|
| **Course** | Web Application Development (WAD) |
| **Department** | Department of Computer Science |
| **Institution** | Namal University, Mianwali |
| **Instructor** | Ammar Ahmad Khan |
| **Theme Chosen** | Personal Portfolio Website |
| **Student Name** | Abu Bakar |
| **Roll Number** | NUM-BSCS-2022-41 |
| **Due Date** | 14-June-2026 |

---

## 📸 Website Screenshots

### 1. Desktop Hero Section (Outfit Font, Custom UI Mockup, & Button Styles)
![Desktop Hero Section](screenshots/01_desktop_hero.png)

### 2. About Me Section & Sidebar Profile Layout
![About Me & Sidebar](screenshots/02_about_sidebar.png)

### 3. Technical Competencies Grouped Card Layout
![Technical Skills](screenshots/03_technical_skills.png)

### 4. Academic & Practical Projects Section (6 Custom Responsive Cards)
![Projects Showcase](screenshots/04_project_cards.png)

### 5. Professional Services Section (Grid of 6 Cards)
![Services Cards](screenshots/05_services_cards.png)

### 6. Dedicated Bootstrap Utilities Showcase Segment
![Utilities Showcase](screenshots/06_utilities_showcase.png)

### 7. Access & Registration Form with Active Validation Feedback
![Contact Validation Feedback](screenshots/07_contact_validation.png)

### 8. Footnotes, Contact Details, & Copyright Footer
![Footer Section](screenshots/08_footer_details.png)

---

## 🚀 Key Implemented Features

### 📐 Task 1: Bootstrap Setup & Responsive Grid Layout
- **CDN Integration**: Successfully loaded standard Bootstrap 5.3.3 stylesheet in `<head>` and the corresponding responsive JavaScript Bundle right before the closing `</body>` tag.
- **Structural Integrity**: The DOM layout incorporates semantic structures (`<nav>`, `<header>`, `<main>`, `<aside>`, `<footer>`) to outline separate functional panels.
- **Responsive Adaptations**: The webpage is built on top of the Bootstrap Grid system, ensuring completely responsive adaptations on Mobile devices, Tablets, and Desktop screens.

### 🧭 Task 2: Navigation & User Interface Components
- **Navbar Layout**: Created a `.navbar-expand-lg` sticky navigation bar featuring custom branding, desktop alignments, dropdown resources (pointing to GitHub, LinkedIn, and Resume), and a mobile toggler.
- **Dismissible Alert**: Structured a custom `.alert-info` banner displaying active freelance collaboration details with an easy dismiss close button.
- **Buttons & Badges**: Implemented **4 distinct button styles** (`.btn-primary`, `.btn-outline-primary`, `.btn-success`, `.btn-info`) and styled badges showcasing core software stacks.

### 📝 Task 3: Access & Registration Form Controls
- **Floating Labels**: Form fields under `#accessForm` utilize modern floating label designs (`.form-floating`) for an elegant input interface.
- **All Required Inputs**: Contains input blocks for Full Name (`text`), Email Address (`email`), Demo Access Code (`password`), Country Selection (`select`), Gender Selection (`radio` buttons group), and Terms Consent (`checkbox`).
- **Active Validation Feedback**: Integrated standard Bootstrap form validity validation feedback scripts (`.needs-validation` hook). It intercepts form submissions, highlights missing selections in real-time, and opens a success alert upon successful entry.

### 🛠️ Task 4: Bootstrap Utilities Showcase Section
Created a dedicated segment to demonstrate core Bootstrap utility classes requested by the rubric:
- **Margins & Paddings**: Used spacing utility classes (`p-4`, `my-3`, `p-2`, `mb-2`) for responsive layouts.
- **Text Alignment**: Aligned typography blocks responsively (`text-center`, `text-start`, `text-md-end`).
- **Colors**: Applied theme foreground and background classes (`bg-primary`, `bg-dark`, `text-white`, `text-muted`).
- **Borders & Shadows**: Edged blocks beautifully (`border`, `border-primary`, `rounded-3`, `rounded-circle`, `shadow-sm`, `shadow-lg`).
- **Display Utilities**: Controlled visibility using display handlers (`d-flex`, `d-block`, `d-none`).

### 📦 Task 5: Responsive Projects & Services Sections
- **Projects Grid**: Showcases 6 cards detailing verified projects: **SudhaarAI (FYP)**, **Cotton Seed Classifier**, **BarberAI**, **Ustad**, **MyNamalGPA**, and **QR Credentials Website**. Each card contains custom illustration borders, project labels, descriptions, and direct repository links.
- **Services Grid**: Displays 6 responsive cards describing professional developer services (Web Design, AI/ML Prototyping, Full-Stack, Resume Portfolios, Python Automation, UI/UX Improvements).

### 🎨 Task 6: Bootstrap Customization (Overriding CSS)
Constructed `style.css` to override standard Bootstrap colors and deliver a unique, premium design:
- **Custom Color Palette**: Declared deep indigo (`#4F46E5` / `#312E81`) and emerald teal accents.
- **Card Hover Effects**: Configured shadow transformations and scale zoom effects (`transform: translateY(-5px)`) upon hover.
- **Custom Typography**: Paired Google Fonts **Outfit** for all headings and paragraph nodes.

---

## 📁 File Structure

```text
Bootstrap-Portfolio-Assignment/
├── index.html                                        # Main HTML page structure
├── style.css                                         # Overriding custom CSS styles
├── README.md                                         # This documentation file
├── Assignment 3.docx                                 # Original assignment sheet
├── Abu_Bakar_Assignment_3_Portfolio_Report.docx      # Submitted Word report
├── images/
│   └── profile.png                                   # Profile portrait asset
└── screenshots/
    ├── 01_desktop_hero.png                           # Hero and styled code mockup
    ├── 02_about_sidebar.png                          # About details and sidebar
    ├── 03_technical_skills.png                       # Toolkit categories
    ├── 04_project_cards.png                          # Grid of 6 academic projects
    ├── 05_services_cards.png                         # Service card list
    ├── 06_utilities_showcase.png                     # Utility layout blocks
    ├── 07_contact_validation.png                     # Access form validation states
    └── 08_footer_details.png                         # Footer and details segment
```

---

## 🛠️ How to Run Locally

1. Open the project folder in your local filesystem.
2. Double-click the `index.html` file to launch the static page directly in any web browser.
3. No local servers or installations are required!
