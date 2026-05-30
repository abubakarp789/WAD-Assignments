# Rumi House Hub — WAD Assignment 2

An interactive student engagement portal for **Rumi House** at Namal University, Mianwali.  
Upgraded from a static HTML/CSS prototype to a fully interactive and responsive web application leveraging **Bootstrap 5.3.3**, **Vanilla JavaScript (ES6+)**, and **Asynchronous API data fetching** with local fallbacks.

---

## 🎓 Academic Details

| Field | Detail |
|---|---|
| **Course** | Web Application Development (WAD) — CS-370 |
| **Department** | Department of Computer Science |
| **Institution** | Namal University, Mianwali |
| **Instructor** | Ammar Ahmad Khan |
| **Student Name** | Abu Bakar |
| **Roll Number** | NUM-BSCS-2022-41 |

---

## 🚀 Key Implemented Features

### 🎨 1. Bootstrap 5.3.3 Layout Upgrade & Overrides
- **Grid Layout**: Designed with responsive grid classes (`.col-12`, `.col-md-6`, `.col-lg-4`, `.g-4`) ensuring beautiful layout adjustments on mobile, tablet, and desktop viewports with zero horizontal scrolling.
- **Responsive Navigation**: Collapsible brand-aligned navbar (`.navbar-expand-lg`) featuring dropdown links, navigation selectors, and a custom gold active-state line-border indicator.
- **Namal-Inspired Academic Branding Overrides**: 
  - Forest Green (`#006b35` / `#005128` / `#e6f4ec`) is applied to headers, navbars, cards, and primary actions.
  - Warm Gold (`#f5c400` / `#d9a900` / `#fff7cc`) is applied as outlines, active tags, and highlight buttons.
  - Custom overrides ensure standard Bootstrap classes like `.btn-primary` and input focus rings fit Namal's distinctive identity instead of generic layouts.
- **Glassmorphic Cards**: Implemented high-fidelity `.custom-card` components with drop-shadows and CSS hover transitions that lift the element (`transform: translateY(-6px)`) and apply a golden border glow.

### 🌐 2. Local JSON Data Loading & CORS Fallback
- **Asynchronous Loading**: Client-side JavaScript dynamically fetches the `data.json` database on page load using the Fetch API and `async/await` syntax.
- **CORS `file:///` Protocol Fallback**: 
  - Direct browser opening via double-clicking `index.html` blocks `fetch()` due to security policies.
  - `script.js` intercepts this condition using `window.location.protocol === 'file:'` and seamlessly falls back to a high-fidelity local JS object array representing the same database content.
  - This ensures **100% functionality** when grading offline by simply double-clicking the file!
- **State Handling**: Animated loading spinners (`.spinner-border`) show during fetching, and safe try-catch blocks display clear `.alert-danger` banners if files fail to load.

### 🔍 3. Interactive Search & Category Filtering
- **Live Text Search**: Search societies in real-time by entering terms. Filters update the cards on each keystroke (case-insensitive checks matching society names and descriptions).
- **Directory Categories**: Category filter buttons (Literary, Sports, Social, Technical, Arts) dynamically restrict displayed societies.
- **Empty States**: If a search or filter term has no matching societies or events, a custom dashed empty state card displays descriptive feedback ("No Societies Found").
- **Timeline State Filters**: Events can be filtered via toggle buttons into "Upcoming Activities" and "Past Memories".

### 📋 4. Dynamic Bootstrap Modals
- **Society Quick View**: Inject details dynamically into the Society Modal, including description, Faculty Patron, coordinator names, leads, and active member headcount.
- **Membership Request**: The "Send Membership Request" button on the modal disables itself, updates headcounts dynamically, and shows success alerts.
- **News Article Reader**: News summaries on cards open fully inside a dynamic preview reader, converting raw line breaks into readable paragraphs.

### 🛡️ 5. Form Validation
- **Contact Inquiries**: Validates Name (min 3 chars), Namal Student Email (`@namal.edu.pk`), Registration Number (`NUM-BSCS-2022-41`), Subject selection, and Message contents (min 10 chars).
- **RSVP Verification**: Inside the event modal, validates verified student emails and registration IDs before permitting registrations.
- **Dynamic CSS Indicators**: Fields actively validate on keystroke, applying Bootstrap's `.is-valid` and `.is-invalid` borders alongside green checkmarks or red warning texts.
- **Success & Fail Overlays**: Shows clean alerts when submissions succeed, automatically fading out after 4 seconds.

### 📲 6. External QR Server API Integration
- **Registration headcount**: RSVP submissions dynamically increment registration capacities.
- **Attendance Check-in QR**: Generates unique attendance verification barcodes by passing the event ID and a secure, random student token directly to the free QR Server API:
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=eventId=${id}%26token=${token}`
- **Venue instructions**: Fades out form fields, displays a loading spinner while generating the QR image, and presents the scanned attendance instructions at the physical door.

---

## 📁 File Structure

```text
Assignment-2_Rumi-House-Hub/
├── index.html                  # Main application structure with Bootstrap layout and modal shells
├── style.css                   # Custom stylesheets, variables, and Bootstrap UI overrides
├── script.js                   # Interactive client-side logic, validations, and API fetch
├── data.json                   # Local dataset containing societies, upcoming/past events, and news
├── Assignment_2_Report.docx    # Academic document report
└── README.md                   # This documentation file
```

---

## 🛠️ How to Run and Test Locally

1. **Standard Launch (Direct browser double-click)**:
   - Double-click `index.html` to open the portal in any browser.
   - The application detects the `file://` protocol and automatically boots using the fallback local dataset. All searches, modals, forms, and the external QR Generator work seamlessly.
2. **Web Server Launch (Fetch API execution)**:
   - Run the directory using a local development server (e.g. VS Code **Live Server** extension, or `npx serve .`, or `python -m http.server`).
   - The script will execute a standard `fetch('./data.json')` request to load the card grids.
3. **Interactive Validation Tests**:
   - Go to the **Contact** form. Try typing an email without `@namal.edu.pk` or an ID that doesn't fit `NUM-BSCS-2022-41`. Watch the active green/red CSS feedback borders and text triggers.
   - Click "RSVP & Attend" on an upcoming event card. Enter credentials and click "Confirm RSVP". Note the headcount incrementing, the form fading away, and the check-in QR code generating with helper instructions.
