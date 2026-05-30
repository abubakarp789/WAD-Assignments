# UI/UX Design Brief
## Project: Rumi House Hub

---

## 1. Design Objective
The core objective of **Rumi House Hub** is to deliver a premium, high-fidelity, and modern user interface that commands a strong academic identity. The visual system must feel professional and trustworthy, while remaining highly engaging and accessible to students. It departs from simple layouts by utilizing rich gradients, clean borders, custom typography, subtle micro-animations, and glassmorphic panels.

---

## 2. Visual Identity
The visual interface represents Namal University’s distinctive identity through these key attributes:
* **Academic & Prestigious**: Grounded in deep, rich navy blues that evoke academic trust and structural integrity.
* **Modern & Lively**: High-contrast gold accents represent energy and highlight student initiatives.
* **Clean & Readable**: Balanced layouts utilizing comfortable white space, clear border lines, and highly legible typography.
* **Glassmorphic & Premium**: Translucent overlay panels with fine borders, light background blurs, and subtle drop-shadow depths.

---

## 3. Branding Palette
The design layout is built on a **Namal-inspired academic branding palette**. To maintain academic honesty, these colors are project-level custom choices designed to visually harmonize with your existing Namal GPA Calculator styling and the university's green and gold theme.

```css
:root {
  /* Namal-inspired academic branding colors */
  --namal-green: #006b35;             /* Deep green for headers, nav, primary actions */
  --namal-green-dark: #005128;        /* Forest green for hover states & footers */
  --namal-green-light: #e6f4ec;       /* Soft light green for card fills */

  --namal-gold: #f5c400;              /* Warm gold for highlights, badges, and call-to-actions */
  --namal-gold-dark: #d9a900;         /* Dark gold for active text alerts */
  --namal-gold-light: #fff7cc;        /* Soft gold light background fills */

  /* Layout Backgrounds */
  --bg-main: #f8faf9;                 /* Light-mode canvas background */
  --bg-soft: #eef5f1;                 /* Soft moss light-green background */
  --white: #ffffff;                   /* White background for card bases */

  /* Typographic Contrast */
  --text-main: #101827;               /* Dark Slate primary body text */
  --text-muted: #5f6f67;              /* Forest slate muted body text */

  /* Structural Details */
  --border-soft: #dbe7df;             /* Light green-grey border lines */
  --shadow-soft: 0 12px 30px rgba(0, 80, 40, 0.08); /* moss green shadows */
  
  /* Status Colors */
  --color-success: #006b35;           /* Approved / Checked-in state */
  --color-warning: #f5c400;           /* Pending validation state */
  --color-error: #dc2626;             /* Rejected / Error state */
}
```

---

## 4. Typography Guidance
The platform integrates Google Fonts to establish clear typographic hierarchy:
* **Font Family**:
  * *Headings*: **Outfit** (sans-serif) - clean, structured, and modern.
  * *Body Copy*: **Inter** (sans-serif) - highly legible for reader articles.
* **Typographic Scale**:
  * *Hero Headings*: `2.5rem` (40px) | Bold 700
  * *Section Titles*: `1.75rem` (28px) | Semi-Bold 600
  * *Card Headings*: `1.25rem` (20px) | Medium 500
  * *Standard Body Text*: `1rem` (16px) | Regular 400
  * *Muted Meta Data*: `0.875rem` (14px) | Regular 400
* **Line Heights**: Set to `1.5` for standard text paragraphs, and `1.2` for titles to maximize readability.

---

## 5. Layout System
* **Desktop (1200px+)**: A standard 12-column layout. Max-width set to `1280px` with central positioning and 24px column gaps.
* **Tablet (768px - 1024px)**: An 8-column layout with 16px margins, adapting grids from three columns to two.
* **Mobile (Below 768px)**: A single-column flow with 12px outer spacing and compact typography adjustments.

---

## 6. Component Design Guidance
* **Navbar**: Responsive header using a glassmorphic background (`--glass-bg`). Features a high-contrast Namal crest placeholder, distinct text options with gold highlight active states, and a login action button.
* **Footer**: Structured layout including the Rumi logo, university credits, fast link directory, and an official contact email panel.
* **Hero Spotlight Banner**: Large rounded showcase panel featuring a dark gradient backdrop (`linear-gradient(to right, var(--namal-navy), var(--bg-dark))`), integrated badge metadata labels, action buttons, and a media highlight window.
* **Society & Event Cards**: High-fidelity glassmorphic cards. Includes interactive hover states that scale the card layout slightly (`transform: translateY(-4px)`) and add a subtle gold border highlight.
* **Buttons**:
  * *Primary Actions*: Gold background (`--namal-gold`), white text, and smooth scaling on tap.
  * *Secondary Actions*: Dark transparent backgrounds with custom border outlines.
* **Form Inputs**: Deep space inputs (`--bg-dark`) with light borders. Focused states outline the inputs in solid gold, accompanied by a soft external glow.
* **Attendance QR Card**: A clean check-in container displaying the generated attendance QR barcode, student details, venue location, and the fallback text check-in code.
* **Admin Control Tables**: Structured grids displaying list data with round status badges and compact action buttons.

---

## 7. Page-Specific UI Guidance

### 1. Home Page
* Features the spotlight carousel displaying active upcoming events.
* Includes the *Discover Our Vision* section, which reveals Rumi House’s history and core mission using a smooth height-transition toggle.
* Displays a quick grid showcasing 3 recent news articles.
* Incorporates the **Theme Randomizer Widget**, allowing visitors to cycle through accent colors (Gold, Teal, Emerald) dynamically.

### 2. Societies Page
* Features a prominent category filter header (All, Academic, Sports, Arts, Social).
* Displays a responsive card grid of all 11 active clubs and societies.
* Integrates a client-side search bar with a clear dynamic loading spinner.

### 3. Society Detail View
* Hero banner showcasing the society’s title and logo.
* Layout divided into a 2-column view:
  * *Left Column*: Detailed mission statement and executive officer rosters.
  * *Right Column*: Quick info sidebar displaying the Faculty Patron name, current headcount stats, and the "Join Society" request toggle.

### 4. Events Page
* Calendar layout featuring filters for event states (All, Upcoming, Past).
* Elegant timeline structure grouping events by month.
* Cards highlight locations (e.g. *Main Auditorium*, *Sports Complex*) and available seats.

### 5. Event Detail View
* High-impact layout presenting complete event information.
* Displays a live registration count bar that fills dynamically.
* Features a secured RSVP widget which displays the "View Check-in Code" button once registered.

### 6. News Archive Page
* Magazine-style grid displaying highlight cards.
* Features a read modal overlay allowing users to read articles without navigating away from the page.

### 7. Login / Register Pages
* Clean, centralized layout against a dark background, featuring glassmorphic inputs and validation alerts.

### 8. Student Dashboard
* Displays the student's profile card (including Name, registration number, and department).
* Features two distinct tabs: *My Memberships* and *Registered Events Calendar*.

### 9. Executive Dashboard
* Dashboard layout displaying quick metrics cards (e.g. Total RSVPs, Pending Event Approvals).
* Features a simple event builder modal form.
* Displays attendance scan views for active coordinator checks.

### 10. Admin Dashboard
* Master operations table showing pending events, management directories, newsletter builders, and feedback lists.

---

## 8. Bootstrap 5 Framework Directives (Assignment 2 & 3)
When using Bootstrap 5, override the default styling system to match the brand guide:
* **Branding Overrides**: Override standard theme classes in your custom CSS:
  ```css
  .btn-primary {
    background-color: var(--namal-gold) !important;
    border-color: var(--namal-gold) !important;
    color: var(--bg-dark) !important;
    font-weight: 600;
  }
  .bg-dark {
    background-color: var(--bg-dark) !important;
  }
  ```
* **Grid Layouts**: Use container utility classes (`container`, `row`, `col-12`, `col-md-6`, `col-lg-4`) paired with spacing classes (`g-4`, `py-5`).
* **Forms & Validation**: Use standard input classes (`form-control`, `form-select`) styled with dynamic pseudoclass properties (`:valid`, `:invalid`).

---

## 9. React Component Architecture
For the SPA implementation, structures must be broken down into reusable components:
* `Navbar`: Main navigation header.
* `Footer`: Main information footer.
* `SocietyCard`: Displays society info in a card format with category tags and join buttons.
* `EventCard`: Renders event details, status indicators, and RSVP toggles.
* `NewsCard`: Layout displaying news highlights.
* `ProtectedRoute`: Router utility wrapping secure views to handle role authorization checks.
* `DashboardLayout`: Grid dashboard scaffolding containing side navigation panels.
* `QRCodeBox`: QR container that calls the external API and handles loading states.
* `StatusBadge`: Dynamic element returning color-coded labels (e.g. green for Approved, orange for Pending, red for Rejected).
* `AdminApprovalTable`: Interactive table component used to moderate event proposals.

---

## 10. UX States Guidance
* **Loading**: Renders animated grey loading blocks (skeleton screens) inside cards to provide visual feedback during active API calls.
* **Empty**: Displays simple line illustrations along with friendly feedback (e.g. "You have not RSVP'd to any upcoming events yet. Browse our schedule to get started!").
* **Success**: Displays animated circular checkmark models upon completing positive actions.
* **Error**: Prompts user with subtle red-toned banners accompanied by troubleshooting guides.

---

## 11. Accessibility Rules (WCAG 2.1 Compliance)
* **Visual Contrast**: Dark background layouts must utilize bright text tags (e.g. slate-100 or pure white) to exceed a contrast ratio of `4.5:1` against cards.
* **Form Controls**: Every input element must be paired with a semantic `<label>` or have an explicit `aria-label` attribute.
* **Keyboard Navigation**: Interactive buttons and input items must display a solid gold focus outline (`outline: 2px solid var(--namal-gold)`) when navigated using the tab key.
* **Alt text attributes**: All logo markers and gallery photos must include descriptive alt text properties.

---

## 12. Design Do-Not Rules
* **Do NOT use generic saturated primary colors** (such as bright blue or plain red buttons). Stick to HSL brand values.
* **Do NOT use standard Lorem Ipsum filler copy**. Utilize the official Namal copy assets and project context.
* **Do NOT build generic corporate layouts**. The application must reflect a strong, distinctive academic identity.
* **Do NOT overcrowd interface elements**. Maintain comfortable margins and use spacing variables to support readability.

---

## 13. Final UI/UX Summary
The **Rumi House Hub** UI/UX Design Brief establishes a highly cohesive, accessible, and premium visual system. By combining the official branding tokens with detailed layout guidelines, responsive structures, and design best practices, the brief ensures a polished, student-centered experience.
