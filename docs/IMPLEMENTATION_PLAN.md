# Implementation Plan
## Project: Rumi House Hub

---

## 1. Implementation Overview
The **Rumi House Hub** implementation plan details a structured, progressive engineering roadmap. The project evolves through four university assignments and a final project, ensuring each phase establishes a solid foundation for the next. This document serves as a developer-ready blueprint, detailing the specific tasks, directory layouts, security constraints, and testing steps required for each phase.

---

## 2. Development Philosophy
* **Progressive Milestones**: Build the visual backbone first (Phase 1), add client-side dynamics (Phase 2), structure as a single-page application (Phase 3), integrate persistent databases and security (Phase 4), and finish with production-grade deployments (Phase 5).
* **Defensive Engineering**: Ensure robust input validation, clear error boundaries, and defensive API route protections at every step.
* **Academic Context**: Maintain strict alignment with the Namal University branding rules, copywriting assets, and core tech stacks.

---

## 3. Detailed Phase-by-Phase Roadmap

### 📂 Phase 1: Assignment 1 — Pure HTML5 & CSS3 Prototype
* **Objective**: Build the initial responsive visual layout using semantic markup and vanilla CSS properties.
* **Folder Layout**:
  ```text
  Assignment-1/
  ├── index.html                   # Spotlight Spotlight & Vision
  ├── societies.html               # Societies grid
  ├── society-detail.html          # Individual profile
  ├── events.html                  # Timeline & filters
  ├── event-detail.html            # Event specifications & RSVP panel
  ├── news.html                    # Newsletter lists
  ├── styles.css                   # Layout properties & variables
  └── media/                       # Image and video assets
  ```
* **Tasks**:
  1. *Global Setup*: Initialize `styles.css` with the Namal-inspired branding colors:
     ```css
     :root {
       --namal-green: #006b35;
       --namal-green-dark: #005128;
       --namal-green-light: #e6f4ec;
       --namal-gold: #f5c400;
       --namal-gold-dark: #d9a900;
       --bg-main: #f8faf9;
       --white: #ffffff;
     }
     ```
  2. *Build Home (index.html)*: Write semantic layout structures (`<header>`, `<nav>`, `<main>`, `<footer>`). Add the Rumi House core vision text and structural details. Implement a responsive hero banner showing the upcoming Spotlight event.
  3. *Build Societies Directory (societies.html)*: Use a CSS Grid layout model (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`) to display the 6 university societies and 5 internal Rumi clubs.
  4. *Build Society Details (society-detail.html)*: Create a 2-column detail layout (coordinators and executive officers on the left, Patron name and membership headcount on the right).
  5. *Build Events Calendar (events.html)*: Design a chronological listing layout using flexbox alignments, including search and category filters.
  6. *Build Event Details (event-detail.html)*: Implement an event specifications view displaying start times, locations, and seat capacities. Include mock RSVP and check-in buttons.
  7. *Build News Archive (news.html)*: Design a structured reader page displaying recent newsletters.
  8. *Responsive Styling*: Add media queries to styles.css targeting standard mobile views (under 768px) and tablet resolutions (768px - 1024px), scaling margins and grids appropriately.

---

### 📂 Phase 2: Assignment 2 — Bootstrap 5 & Vanilla JS API Integration
* **Objective**: Re-engineer the layout using Bootstrap 5, add form validation, and integrate the external QR Server API.
* **Folder Layout**:
  ```text
  Assignment-2/
  ├── index.html                   # Upgraded templates using Bootstrap 5 classes
  ├── style.css                    # Namal palette custom overrides
  ├── script.js                    # DOM events, form validations, API requests
  ├── data.json                    # Local mockup data
  └── media/                       # Visual assets
  ```
* **Tasks**:
  1. *Convert to Bootstrap*: Import Bootstrap 5 via CDN. Replace custom layouts with Bootstrap utility classes (`container`, `row`, `col-12`, `col-lg-4`, `card`, `modal`, `nav`).
  2. *Build style.css overrides*: Ensure the Bootstrap theme colors align with the Namal HSL tokens.
  3. *Create data.json*: Store the official Namal societies and internal clubs directory data.
  4. *Write DOM Fetching logic (script.js)*: Add dynamic fetching to load data from `data.json` on page load. Displays a loading spinner while fetching, and handles errors with a catch block that logs "Unable to load directory" to a visual alert box.
  5. *Integrate QR Code Generation*: Write an event listener on the "View QR Code" button to generate event check-in codes dynamically using the external QR Server API:
     ```javascript
     const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=eventId=${eventId}%26token=${secureToken}`;
     ```
  6. *Implement Client-Side Validations*: Add event validation checks to the registration form:
     * Check if email domain ends in `@namal.edu.pk`.
     * Check if registration number matches `NUM-BSCS-2022-41`.

---

### 📂 Phase 3: Assignment 3 — React SPA & Express Memory Server
* **Objective**: Structure the application as a Single Page Application (SPA) using React, and build an Express mock server utilizing in-memory arrays.
* **Folder Layout**:
  ```text
  Rumi-House-Hub-A3/
  ├── backend/
  │   ├── package.json
  │   └── server.js                # Express config and in-memory arrays
  └── frontend/
      ├── package.json
      ├── index.html
      ├── vite.config.js
      └── src/
          ├── components/          # Reusable Navbar, Footer, Cards
          ├── pages/               # Page layouts
          ├── App.jsx              # React Router routing setup
          └── main.jsx
  ```
* **Tasks**:
  1. *Backend Initialization*: Run `npm init` inside `backend/`. Install dependencies: `npm install express cors`.
  2. *Write Express Server (server.js)*: Create mock in-memory arrays to store datasets:
     ```javascript
     const societies = [
       { id: 1, name: "Namal Environmental Club (NEC)", patronName: "Dr. Sajid", memberCount: 42 },
       { id: 2, name: "Namal Literary & Debating Society (LDS)", patronName: "Prof. Amara", memberCount: 58 }
     ];
     ```
     Create GET routes: `/api/societies`, `/api/events`, and `/api/news`.
  3. *Frontend Initialization*: Setup React using Vite: `npm create vite@latest frontend -- --template react`. Install dependencies: `npm install react-router-dom axios`.
  4. *Establish Router Configuration (App.jsx)*: Import React Router elements to define the frontend route map.
  5. *Build Reusable Components*: Deconstruct layouts into separate components (`Navbar.jsx`, `Footer.jsx`, `SocietyCard.jsx`, `EventCard.jsx`, `NewsCard.jsx`).
  6. *Implement Data Fetching Pipelines*: Connect React pages to the Express memory API endpoints using Axios or Fetch, handling loading states and catch errors.

---

### 📂 Phase 4: Assignment 4 — Full REST API & MongoDB Integration
* **Objective**: Integrate MongoDB Atlas with Mongoose models, and implement secure JWT authentication and role-based access.
* **Tasks**:
  1. *Database Connection (backend/config/db.js)*: Install mongoose: `npm install mongoose dotenv`. Connect the Express application to MongoDB Atlas.
  2. *Define Mongoose Models (backend/models/)*: Create standard mongoose models (User, Society, Membership, Event, RSVP, Attendance, News) with full validations and indexing strategies as specified in the Backend Schema Document.
  3. *Implement Secure Registration*: Write registration handler controllers:
     * Check if email domain ends in `@namal.edu.pk`.
     * Check if registration number matches `NUM-BSCS-2022-41` structure.
     * Cryptographically hash password using `bcryptjs` with a cost factor of 10 rounds.
     * Save the new User document to the database.
  4. *Implement JWT Authentication*: Create login handler controllers. Verify entered credentials. If correct, sign a JWT payload containing user info (`_id`, `email`, `role`) with an expiration of `24h` and return the token to the client.
  5. *Write Route Protections & Role Checkers*: Write middleware:
     * `protect`: Verifies authorization headers and decodes the JWT.
     * `authorizeRoles`: Restricts routes based on user roles (`student`, `executive`, `admin`).
  6. *Build RSVP Transactions*: Write event RSVP controllers:
     * Check event capacity limit. If full, return a `400 Bad Request` block.
     * Create the RSVP record using a unique index check to prevent duplicates.
  7. *Write QR Attendance Check-ins*: Create the Attendance recording controller. Verify the check-in token. Write the check-in record using compound unique index checks to prevent duplicate check-ins.

---

### 📂 Phase 5: Final Project — Production Polish & Cloud Deployment
* **Objective**: Connect all architectural components, secure configurations, and deploy to cloud hosting services.
* **Tasks**:
  1. *Prepare Environment Files*: Secure all parameters (Atlas connection strings, JWT secrets, target API hosts) inside env variables.
  2. *Atlas Firewall Setup*: Set the MongoDB Atlas firewall to allow access from everywhere (`0.0.0.0/0`) during runtime to support dynamic cloud hosting.
  3. *Deploy Backend Server (Render / Railway)*: Deploy the Express codebase repository. Configure environment variables in the host dashboard.
  4. *Deploy Frontend SPA (Vercel / Netlify)*: Deploy the React application codebase. Add a `vercel.json` or `_redirects` routing fallback file:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
  5. *Connect Deployed APIs*: Verify that Vercel targets call the deployed Render APIs instead of `localhost:5000`.
  6. *Implement Admin Analytics*: Build aggregated database pipeline checks on the admin dashboard, displaying total registrations, attendance trends, and pending events.

---

## 4. Testing Plan

### 1. Manual Page Views Verification
* Scale the browser viewport from 375px (mobile) to 1440px (desktop) to ensure zero layout overflows and perfect grid wrap behaviors.
* Verify that visual error banners appear if API fetch pipelines encounter latency issues.

### 2. Express Controller API Testing
* Use Postman collection profiles to test route payloads:
  * Register a user with a non-Namal email domain (e.g. `student@gmail.com`) to confirm that the server returns a `400 Bad Request` block.
  * Send write requests without a JWT header to confirm that the server returns a `411 Unauthorized` response.
  * Send Admin requests with a student JWT token to confirm that the server returns a `403 Forbidden` block.

### 3. Core Transactions Verification
* Register two students for an event with a capacity limit of 2 to confirm subsequent registrations are blocked once full.
* Scan a student check-in QR code twice to confirm the unique compound index blocks the second scan and returns a `499 Duplicate Check-in` error.

---

## 5. Suggested GitHub Branch Strategy
Maintain a clean repository structure using feature branches:
* `main`: Protected production branch. Represents the live deployed application.
* `dev`: Integration branch. Merges code from features and holds release candidates.
* `feature/A1-static-prototype`: Development branch for Phase 1 HTML/CSS tasks.
* `feature/A2-bootstrap-js`: Development branch for Phase 2 Bootstrap and external API integrations.
* `feature/A3-react-express`: Development branch for Phase 3 React SPA and Express memory server.
* `feature/A4-mongodb-auth`: Development branch for Phase 4 MongoDB configurations and JWT auth routes.
* `feature/final-polish-deployment`: Polish work and final environment configurations.

---

## 6. Suggested Commit Strategy
Follow conventional commit styles to ensure a clean commit history:
* `feat(auth)`: Add role authorization middleware.
* `feat(qr)`: Integrate QR Server API generator.
* `fix(validation)`: Restrict student register domains to @namal.edu.pk.
* `docs(readme)`: Update installation instructions.
* `style(home)`: Apply glassmorphism updates to the Hero Spotlight card.

---

## 7. Risks and Mitigations
* **Risk (Database Access Latency)**: Cold starts on Render or network delays on Atlas free tiers.
  * *Mitigation*: Enable interactive skeleton loaders and disable form action triggers during active API handshakes.
* **Risk (External API Dependency)**: The QR Server API becomes unreachable.
  * *Mitigation*: Implement a manual fallback check-in box displaying a clean 8-character verification token.

---

## 8. Final Implementation Summary
The **Rumi House Hub** Implementation Plan provides a progressive roadmap for the project. By breaking down each assignment and the final project into actionable tasks, this plan ensures a structured, high-quality development cycle that aligns with the WAD course requirements.
