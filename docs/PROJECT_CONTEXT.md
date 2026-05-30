# Project Context: Rumi House Hub
## Fast AI-Memory and Reference File

---

## 1. Project Name
**Rumi House Hub**

---

## 2. One-Paragraph Summary
**Rumi House Hub** is a dynamic full-stack student engagement portal designed specifically for Namal University, Mianwali. It serves as a unified digital platform where students can browse and join active university societies and internal Rumi House clubs, RSVP to scheduled co-curricular events, generate unique check-in QR codes, and track their participation. For student leaders and administrators, the portal automates attendance tracking through QR-code scanning, simplifies event planning approvals, and provides rich coordination statistics.

---

## 3. Course & Academic Context
* **Course**: Web Application Development (WAD) — CS-370
* **Institution**: Namal University, Mianwali
* **Instructor**: Ammar Ahmad Khan
* **Student Details**: Abu Bakar — NUM-BSCS-2022-41

---

## 4. Target User Roles
1. **Public Visitor**: Anonymous viewer who can browse public events, newsletters, and active societies.
2. **Logged Student**: Registered student who can join societies, RSVP to approved events, and generate check-in QR codes.
3. **Society Executive**: Student coordinator who can manage their society profile, propose events, and view event RSVP rosters.
4. **Rumi Admin**: Designated system authority with full permissions to approve events, add new societies, publish newsletters, and access system-wide analytics.

---

## 5. Technology Stack
* **Frontend**: React.js SPA (via Vite), React Router DOM, Tailwind CSS / Bootstrap 5, Axios.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas (sandbox M0 cluster), Mongoose ODM.
* **Authentication**: JWT (JSON Web Tokens) with header-based Bearer strategy, passwords hashed using `bcryptjs`.
* **External APIs**: QR Server API for generating check-in QR barcodes.
* **Hosting**: Frontend deployed on Vercel/Netlify, backend on Render/Railway.

---

## 6. Primary Frontend Routes (React Router)
* `/` — Home Page & Spotlight Calendar Carousel
* `/societies` — Directory Grid of Clubs
* `/societies/:slug` — Individual Society Profiles
* `/events` — Timeline Schedule Feed
* `/events/:id` — Event Specifications & RSVP Panels
* `/news` — Rumi Newsletter Archives Grid
* `/login` — Account Access Form
* `/register` — Registration Form
* `/dashboard` — Protected Student Dashboard Layout
* `/executive` — Protected Executive Management Control Board
* `/admin` — Protected Rumi Administrative Moderate Screen

---

## 7. Mongoose Database Models
1. **User**: Name, email (`@namal.edu.pk`), registrationNumber (`NUM-[A-Z]{4}-\d{4}-\d{2,3}`), role (`student`, `executive`, `admin`), department, batch, and passwordHash.
2. **Society**: Name, slug, description, patronName, facultyCoordinator, category, executiveBody array, and memberCount.
3. **Membership**: userId reference, societyId reference, status (`pending`, `approved`, `rejected`), and joinedAt date. *Unique compound index: `userId` + `societyId`*.
4. **Event**: societyId reference, title, description, type, location, startDateTime, endDateTime, capacity, status (`draft`, `pendingApproval`, `approved`, `rejected`), qrCodeToken, and createdBy.
5. **RSVP**: eventId reference, userId reference, and status (`going`, `interested`, `cancelled`). *Unique compound index: `eventId` + `userId`*.
6. **Attendance**: eventId reference, userId reference, checkInTime, and checkInMethod. *Unique compound index: `eventId` + `userId`*.
7. **News**: Title, slug, summary, content, category, publishedBy, status, and publishedAt.

---

## 8. API Endpoint Summary
* `POST /api/auth/register` — Create a new student (validate @namal.edu.pk, hash password).
* `POST /api/auth/login` — Verify credentials, return signed JWT token.
* `GET /api/auth/me` — Fetch current user details based on JWT.
* `GET /api/societies` — Retrieve list of societies (supports filters).
* `POST /api/societies` — Create new society (Admin Only).
* `POST /api/societies/:id/join` — Apply to join a society (Student Only).
* `GET /api/events` — Fetch approved events.
* `POST /api/events` — Propose a new event (Society Exec Only).
* `PATCH /api/events/:id/status` — Approve or reject an event (Admin Only).
* `POST /api/events/:id/rsvp` — RSVP to an event (Student Only).
* `POST /api/events/:id/checkin` — Record attendance using check-in token (Student Only).
* `GET /api/news` — Fetch newsletters and articles.

---

## 9. Visual Design Tokens & Accent Palette
To maintain the required premium and brand-aligned design system, use these exact tokens:

```css
:root {
  --namal-green: #006b35;             /* Deep green for headers, nav, primary actions */
  --namal-green-dark: #005128;        /* Forest green for hover states & footers */
  --namal-green-light: #e6f4ec;       /* Soft light green for card fills */
  --namal-gold: #f5c400;              /* Warm gold for highlights and badges */
  --namal-gold-dark: #d9a900;         /* Dark gold for active text alerts */
  --bg-main: #f8faf9;                 /* Light-mode canvas background */
  --white: #ffffff;
}
```

* **Typography**: Outfits font family for Headings, Inter for readable Body Copy.
* **UX States**: Provide elegant skeleton screens for loading, clear illustrations for empty search results, and green/orange/red badges for approved/pending/rejected states.

---

## 10. Implementation Phases Overview
* **Assignment 1**: Pure HTML5/CSS3 prototype (6 pages, variables, custom grid/flex layouts).
* **Assignment 2**: Responsive templates using Bootstrap 5 utility classes, vanilla JS DOM manipulations, simulated directory loading with dynamic spinners, and QR API integration.
* **Assignment 3**: Deconstructed React SPA using Vite, React Router DOM, and Express backend memory APIs.
* **Assignment 4**: Full persistent MERN integration. Connects to MongoDB Atlas sandbox, defines mongoose models with indexes, registers users with `@namal.edu.pk` domain checks, hashes passwords with bcrypt, and secures routes with role-based JWT middleware.
* **Final Project**: Cloud deployment (Vercel + Render + Atlas), dashboard metrics integration, production environment setups, and final styling polish.

---

## 11. Strict Rules for AI Coding Agents
Future AI coding agents working on this project must adhere to the following rules:

* **Always follow `/docs` documents**: They serve as the single source of truth for features, schemas, and flow configurations.
* **Do NOT invent unrelated features**: Focus on the academic roadmap, avoiding payment APIs, AI recommendations, or native mobile builds.
* **Do NOT use Lorem Ipsum**: Use the official Namal copywriting assets, internal clubs, and core societies.
* **Follow the Assignment progression**: Ensure each milestone's codebase aligns with the targeted lecture concepts and technology configurations.
* **Keep code student-friendly**: Code structures must remain clean, well-commented, and easily readable for a university grader.
* **Do NOT hardcode secrets**: Store Atlas URLs, JWT tokens, and API addresses securely inside environment variables (`.env`).
* **After each task**: Provide a concise summary of the files modified and verification steps performed.
