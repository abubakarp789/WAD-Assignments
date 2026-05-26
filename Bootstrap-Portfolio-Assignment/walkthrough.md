# Walkthrough - Namal University Assignment 3 Bootstrap Portfolio

This walkthrough documents the successful construction of the static, responsive Personal Portfolio website for **Abu Bakar** to satisfy **Assignment 3 (WAD course)**. 

---

## 🛠️ Summary of Accomplishments

All 15 key assignment criteria have been fully met using only the designated static files (`index.html`, `style.css`, `README.md`) inside the local workspace folder.

### 📁 Files Developed
1. **[index.html](file:///c:/Users/abuba/OneDrive/Desktop/Semester%208/WAD/WAD%20Project/Bootstrap-Portfolio-Assignment/index.html)**: Containing the semantic page layout, the CDNs, 10 fully realized custom modules, and the validation script block.
2. **[style.css](file:///c:/Users/abuba/OneDrive/Desktop/Semester%208/WAD/WAD%20Project/Bootstrap-Portfolio-Assignment/style.css)**: Our custom light stylesheet defining variables, Outfit typography overrides, linear gradients, card scaling transforms, and input validation focus colors.
3. **[README.md](file:///c:/Users/abuba/OneDrive/Desktop/Semester%208/WAD/WAD%20Project/Bootstrap-Portfolio-Assignment/README.md)**: Standard university documentation indexing tasks, grading rubrics, structure, and startup instructions.

---

## 🔍 Code Walkthrough & Features

### 1. Modern Sticky Navigation Header
The navigation uses a premium blur backdrop filter (`backdrop-filter`) to support a sleek light look as the user scrolls. It houses:
- The custom brand logo `<a href="#home">` with active hover color.
- Collapsible responsive options which fold into a native vertical drawer on screens under `992px`.
- A fully active dropdown menu under the **"More"** button containing your socials (GitHub, LinkedIn) and resume anchors.

### 2. Gradient Hero Section
The landing section uses custom css gradients transitioning from ice-blue to soft teal. It contains:
- Your professional biography highlighting full-stack engineering and RAG/LLM development.
- Four distinct button styles satisfying the task:
  - `btn-primary` (Projects)
  - `btn-outline-primary` (Contact Me)
  - `btn-success` (Download CV)
  - `btn-info` (View Skills)
- A highly polished custom Vector SVG representing neural graphs and terminal code, styled natively without heavy image payloads.

### 3. Grid-Based Main & Sidebar Layout
Using Bootstrap's 12-column grid system, the About layout splits into two main modules at `<992px` width:
- **Left Column (`col-lg-8`)**: Detailed "About Me" covering your undergraduate track at Namal University Mianwali.
- **Right Column (`col-lg-4`)**: The Sidebar featuring your quick info card, AB letter avatar, geographical context, and core technology badges (`Python`, `Flask`, `Bootstrap`, `JS`, `Next.js`).

### 4. Educational Utilities Showcase
To demonstrate complete mastery of task criteria, we built a dedicated playground containing 6 cards mapping out:
- **Margin & Padding**: Showing `p-4`, `my-3`, etc.
- **Text Alignment**: Demonstrating text alignment at various viewports.
- **Theme Colors**: Revealing primary, dark, and light styles.
- **Borders & Shadows**: Rendering `.shadow-sm` and custom borders.
- **Display Utilities**: Showing columns hidden selectively on mobile (`d-none d-md-block`) and vice-versa.

### 5. Contact Form Validation Logic
The contact portal contains name, email, password access, gender, country selection, and terms checkbox.
- Form class: `.needs-validation`.
- Inputs have `.valid-feedback` and `.invalid-feedback`.
- JavaScript monitors form submissions, checks standard constraints, manages specific radio checks, and appends the Bootstrap `.was-validated` class to activate native green/red indicator triggers.

---

## 🧪 Verification & Results

### 1. Form Validation Verification
* **Test**: Clicking "Submit" with incomplete fields.
* **Result**: Browser blocks standard page reload. Red border styling applies to empty inputs and checkbox, and their specific custom `.invalid-feedback` text prompts show up clearly.
* **Test**: Filling out all fields properly.
* **Result**: Input boxes highlight in green, a success confirmation banner fades in, and validation is logged to the console.

### 2. Viewport Responsiveness Verification
- **Mobile (`<576px`)**: The main layout, projects grid (6 cards), and service cards collapse into perfect single-column stack lines. The navigation collapses into a beautiful burger trigger menu.
- **Tablet (`<992px`)**: The projects and services adjust cleanly into double-column configurations (`col-md-6`), preserving alignment.
- **Desktop (`>=992px`)**: Standard three-column projects layout (`col-lg-4`) and sidebar side-by-side structure.
