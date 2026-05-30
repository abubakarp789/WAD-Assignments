# Product Requirements Document (PRD)
## Project: Rumi House Hub

---

## 1. Product Title & Brand Identity
* **Product Title**: Rumi House Hub
* **Academic Context**: Student societies, internal clubs, and campus events engagement portal.
* **Branding Palette**: Namal-inspired branding (Namal-inspired Academic Green `#006b35` / `#005128` and Gold `#f5c400` / `#d9a900` chosen to visually harmonize with your existing Namal GPA Calculator styling).

---

## 2. Academic Context
* **Course**: Web Application Development (WAD) — CS-370
* **Institution**: Namal University, Mianwali
* **Instructor**: Ammar Ahmad Khan
* **Student Details**: Abu Bakar — NUM-BSCS-2022-41

---

## 3. Problem Statement
Namal University currently hosts multiple active student societies, internal Rumi House clubs, and university-wide events. However, the management of these groups, event schedules, newsletters, RSVP collection, and attendance tracking is scattered across disjointed channels (emails, WhatsApp groups, social media, and paper attendance sheets). 

This decentralized approach results in:
* **Low Engagement**: Students miss event updates and publications because information is scattered.
* **Operational Inefficiency**: Society executives struggle to collect RSVPs, estimate attendance, and manage capacity.
* **Lack of Historical Records**: Event summaries, photos, and official newsletters are rarely archived in a single, accessible platform.
* **Manual Attendance Verification**: Checking students into physical venues is slow, error-prone, and difficult to verify for student-council analytics.

---

## 4. Product Vision
**Rumi House Hub** is designed as a centralized, high-fidelity, and accessible student engagement portal. It serves as a unified digital space where Namal University students can discover and join societies, view upcoming events, submit RSVPs, generate check-in QR codes, track their own attendance, and read Rumi House newsletter archives. 

For society executives and Rumi administrators, the platform simplifies event planning, automates attendance tracking via QR-code verification, provides structural society management, and showcases rich statistics on student participation.

---

## 5. Target Users
1. **Public Visitors**: Prospective students, faculty, or guests who want to view public campus feeds, browse active clubs, and view public schedules.
2. **Namal Students**: Registered users who can join clubs, submit RSVPs to events, generate unique check-in tokens, and view their personalized involvement dashboard.
3. **Society Executives**: Student leaders representing societies who can draft and propose events, view event approval statuses, and track RSVP lists and check-ins.
4. **Rumi House Administrators**: Chief Patron, House Masters, or designated administrators who hold final approval privileges for proposed events, manage society directories, aggregate analytics, and publish official newsletters.

---

## 6. User Roles and Permissions Matrix
The system enforces strict access controls using a secure role-based hierarchy:

| Feature / Action | Public Visitor | Logged Student | Society Executive | Rumi Admin |
| :--- | :---: | :---: | :---: | :---: |
| Browse Spotlight & News Feed | Yes | Yes | Yes | Yes |
| View Active Societies Directory | Yes | Yes | Yes | Yes |
| Read Rumi Newsletter Archive | Yes | Yes | Yes | Yes |
| Register an Account (`@namal.edu.pk`) | Yes | N/A | N/A | N/A |
| Submit Contact Feedback Forms | Yes | Yes | Yes | Yes |
| Request to Join a Society | No | Yes | Yes | Yes |
| RSVP to Approved Events | No | Yes | Yes | Yes |
| Generate Attendance QR Check-in | No | Yes | Yes | Yes |
| Submit Event Proposal for Society | No | No | Yes | Yes |
| Check RSVP & Attendance Rosters | No | No | Yes | Yes |
| Approve / Reject Proposed Events | No | No | No | Yes |
| Create / Modify Society Profiles | No | No | No | Yes |
| Publish Newsletters & Global News | No | No | No | Yes |
| View System-wide Attendance Analytics| No | No | No | Yes |

---

## 7. Core Objectives
* **Centralize Student Operations**: Transition society and event administration from manual spreadsheets to a persistent, digital ecosystem.
* **Maximize Campus Engagement**: Streamline event discovery, leading to higher attendance at co-curricular events.
* **Automate Verification**: Introduce seamless, instantaneous check-ins using dynamically generated QR codes, preventing double entry and reducing venue queue delays.
* **Preserve Academic Identity**: Reflect Namal's distinctive culture by integrating Rumi House branding, official internal clubs, and core societies directly into the user experience.

---

## 8. MVP Scope (Minimum Viable Product)
The initial production release focuses exclusively on high-impact student lifecycle features:
* User registration with strict Namal email domains and role assignment.
* A dynamic Home spotlight feed showing active promotions and Rumi news.
* A read/write directory for 6 major university societies and 5 internal Rumi clubs.
* Event schedule calendar allowing role-based creation (Execs/Admins), approvals (Admins only), and RSVP submissions (Students).
* QR attendance check-in module using the external QR Server API.
* Dynamic newsletter archives and feedback forms.

---

## 9. Out-of-Scope Features
To keep the university WAD course project realistic and prevent unnecessary complexity, the following features are explicitly **out-of-scope** for the semester build:
* *Online Payment Gateways*: Fee collection for sports registrations or ticket purchases.
* *Real-Time Messaging/Chat*: Chatrooms or peer-to-peer messaging within the portal (users can utilize standard emails/external platforms).
* *Mobile App Builds*: Native Android/iOS binaries (the platform will instead focus on fully fluid mobile-responsive web layouts).
* *AI Recommendation Engines*: Algorithmic society matching or automated content suggestions.

---

## 10. Core Features Detailed
1. **Home / Spotlight Feed**: Features a high-fidelity curated hero area showcasing the next major campus event (e.g., *Inter-House Sports Gala*), dynamic quick feeds of recent newsletters, and a Rumi vision module detailing Rumi House’s history and structural team.
2. **Societies Listing & Details**: Displays a responsive card grid categorization of all active clubs (Technical, Cultural, Sports, Social). Clicking a card loads a dedicated detail view showing the Faculty Coordinator, Student Leads, active executive body list, current member count, and a toggle button to "Join Society".
3. **Events Calendar & Details**: A timeline displaying upcoming and past co-curricular activities. Individual detail pages present date, time, venue (e.g. *Main Auditorium*), total capacity constraints, a live registration counter, and an interactive RSVP panel.
4. **RSVP & Verification System**: Authenticated students can toggle RSVP states (`going`, `interested`, `cancelled`). Upon choosing `going`, a secure check-in panel displays, giving the student a unique check-in token and rendering a dynamic verification QR code.
5. **QR Check-in Attendance**: During a physical event, a student displays their device. The scanning system or venue coordinator validates the student's unique QR code, instantly updating the database to record attendance and prevent duplicate check-ins.
6. **Rumi Newsletter Archive**: A dedicated reader section archiving published articles and newsletters documenting student accomplishments and official visits across the academic year.
7. **Role-Based Portals**:
   * *Student Dashboard*: Displays personal credentials, joined clubs, and a timeline of RSVP'd events.
   * *Executive Control Board*: Allows student leaders to draft event proposals, track their proposed event status, and review active registration lists.
   * *Rumi Admin Control Board*: Provides administrative tools to review pending event proposals, approve/reject applications, manage society rosters, and review student feedback forms.

---

## 11. Assignment-Wise Product Evolution
The project progressively builds capability, demonstrating a structured software development lifecycle across the semester:
* **Assignment 1 (Pure HTML5 & CSS3 Prototype)**: Builds the visual backbone. Delivers 6 multi-page layouts using custom CSS grid, flexbox, variables, and responsive breakpoints, featuring official copywriting assets.
* **Assignment 2 (Bootstrap 5 & JavaScript Integration)**: Converts the static pages into a Bootstrap 5 responsive layout. Introduces client-side JavaScript, simulated backend fetching of local JSON directories with active loaders, and renders dynamic attendance QR codes using the external QR Server API.
* **Assignment 3 (React SPA & Node.js Memory Server)**: Deconstructs the client into a React JS Single Page Application (SPA) using React Router. Establishes a backend Node/Express server hosting in-memory arrays to serve structured GET requests, connecting frontend fetch/axios pipelines.
* **Assignment 4 (Persistent MERN Stack)**: Integrates MongoDB Atlas and Mongoose. Replaces memory arrays with persistent document collections, implements secure JWT auth pipelines, validates `@namal.edu.pk` constraints, and processes write actions (submitting feedback, RSVPing, recording attendance).
* **Final Project (Cloud Deployment & Polish)**: Deploys the frontend to Vercel/Netlify, the backend server to Render/Railway, and links to a live Atlas sandbox. Features full dashboard analytics, database indexes, and final responsive UI polish.

---

## 12. User Stories
### As a Public Visitor:
* *US-101*: I want to browse the active societies and upcoming events calendar so that I can see the extracurricular options available at Namal University.
* *US-102*: I want to read the Rumi Newsletter archives to understand life on campus and view major highlights of the academic year.
* *US-103*: I want to register a new account using my student credentials so that I can interact with societies and register for upcoming events.

### As a Registered Namal Student:
* *US-201*: I want to log in securely to my dashboard so that I can view my active memberships and registered events.
* *US-202*: I want to join societies and RSVP to approved events directly through the portal so that my participation is officially recorded.
* *US-203*: I want to view my unique check-in QR code for an event I RSVP'd to, so that I can quickly scan it at the venue door to record my attendance.

### As a Society Executive:
* *US-301*: I want to log in and access my executive dashboard so that I can manage my society’s internal directory and view event rosters.
* *US-302*: I want to submit a formal event proposal, listing title, location, capacity, and timing, so that it can be reviewed and approved by the Rumi House administration.
* *US-303*: I want to view a real-time list of students who have RSVP'd to my society’s events so that I can coordinate logistics and venue preparations.

### As a Rumi House Administrator:
* *US-401*: I want to access the administrative control board so that I can review, approve, or reject pending event proposals submitted by society executives.
* *US-402*: I want to add new society profiles and publish official newsletters to keep the entire university directory current and engaging.
* *US-403*: I want to see aggregate attendance analytics (total RSVPs vs. actual check-ins) across all events so that I can report engagement statistics to the Chief Patron.

---

## 13. Functional Requirements
* **FR-Auth-01**: Registration must reject any email address that does not end in `@namal.edu.pk`.
* **FR-Auth-02**: Passwords must be cryptographically hashed using `bcrypt` before database entry.
* **FR-Soc-01**: Society detail views must display dynamic lists of executive officers and active member headcounts.
* **FR-Evt-01**: Society executives can only create events under their authorized society.
* **FR-Evt-02**: Newly created events must default to `pendingApproval` status and remain hidden from the public calendar until approved by an Admin.
* **FR-Att-01**: The system must reject duplicate check-in requests for the same student at the same event.
* **FR-Att-02**: Check-in QR codes must be dynamically generated by appending the event ID and a secure, unique student token to the QR Server API.
* **FR-Fdb-01**: Visitors can submit inquiries through a feedback form, which must write directly to the persistent database.

---

## 14. Non-Functional Requirements
### Security
* **NFR-Sec-01**: All protected routes (dashboards, admin actions, RSVP toggles) must require JWT validation.
* **NFR-Sec-02**: The server must sanitize all requests to prevent common injection attacks (e.g. MongoDB operator injection).

### Performance
* **NFR-Perf-01**: API responses from the Express server should compile and return in less than 300ms under standard local network conditions.
* **NFR-Perf-02**: Image assets on page loads must be optimized and lazy-loaded to prevent high mobile data consumption.

### Accessibility
* **NFR-Acc-01**: The portal’s visual design must maintain a high contrast ratio (minimum 4.5:1) utilizing Namal Navy on light/slate panels to comply with WCAG 2.1 principles.
* **NFR-Acc-02**: Form controls must contain explicit HTML labels and clear visual outline focus states.

### Responsiveness
* **NFR-Resp-01**: All grid systems and card collections must dynamically adjust from multi-column configurations (desktop) to single-column blocks (mobile) with zero layout overflow.

### Maintainability
* **NFR-Mnt-01**: Clean separation of frontend UI views, backend controllers, database schemas, and custom route middleware.

---

## 15. Success Criteria
* **Grading Target**: 100% compliance with course syllabus milestones across all four Assignments and the Final Project.
* **Functional Correctness**: Zero server crashes during database write operations, with active verification of role authorizations.
* **User Acceptance**: A cohesive, highly visual user interface utilizing consistent brand tokens that looks ready for production Namal University deployment.

---

## 16. Risks and Assumptions
* **Assumption**: It is assumed that students have internet access on campus to load their unique attendance QR codes on their mobile devices during physical venue check-ins.
* **Risk (API Dependency)**: The prototype relies on the external QR Server API for generating attendance barcodes. 
  * *Mitigation*: The app flow includes a fallback text check-in code input box that students can present manually if the QR rendering API becomes temporarily unreachable.
* **Risk (Atlas Latency)**: Deployment on a free shared MongoDB Atlas tier may introduce minor database connection handshakes.
  * *Mitigation*: Implementation of elegant client-side skeleton loaders and button disable-triggers during active API operations.

---

## 17. Final PRD Summary
The **Rumi House Hub** PRD establishes a clear, practical, and university-aligned feature set. By mapping progressive academic milestones to tangible product capabilities, the PRD guarantees a logical transition from a static HTML design to a live, production-grade co-curricular engagement portal that reflects Namal's distinctive culture.
