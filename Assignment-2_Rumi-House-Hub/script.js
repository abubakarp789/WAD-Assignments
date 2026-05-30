// script.js - Rumi House Hub Dynamic Client Logic (Assignment 2)

document.addEventListener('DOMContentLoaded', () => {
  
  // --- APPLICATION STATE VARIABLES (ES6 const and let) ---
  let appState = {
    societies: [],
    events: [],
    news: [],
    filters: {
      societySearch: '',
      societyCategory: 'all',
      eventState: 'all' // all, upcoming, past
    },
    activeRsvpEventId: null
  };

  // --- HIGH-FIDELITY FALLBACK DATASET (Direct Browser double-click CORS bypass) ---
  const fallbackDatabase = {
    "societies": [
      {
        "id": 1,
        "name": "Rumi Debating Club",
        "type": "Rumi Internal Club",
        "category": "literary",
        "description": "Fosters public speaking, structured argument development, and eloquence among house members through regular internal debates and regional simulations.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 42
      },
      {
        "id": 2,
        "name": "Rumi Art & Calligraphy Club",
        "type": "Rumi Internal Club",
        "category": "arts",
        "description": "Nurtures artistic expression, classical calligraphy skills, and hands-on visual arts projects to beautify the Rumi House lounge and represent the house in design challenges.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead"],
        "memberCount": 31
      },
      {
        "id": 3,
        "name": "Rumi Reading Club",
        "type": "Rumi Internal Club",
        "category": "literary",
        "description": "Creates a community of readers dedicated to deep textual analysis, weekly book reviews, and intellectual group discussions on classic and contemporary literature.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 27
      },
      {
        "id": 4,
        "name": "Rumi Décor Club",
        "type": "Rumi Internal Club",
        "category": "arts",
        "description": "Enlivens the living spaces and community lobbies of Rumi House, executing creative interior designs and setting up layouts for all our house events.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead"],
        "memberCount": 24
      },
      {
        "id": 5,
        "name": "Rumi Writing Club",
        "type": "Rumi Internal Club",
        "category": "literary",
        "description": "Empowers aspiring writers, essayists, and poets within Rumi House, conducting collaborative peer reviews, workshops, and publishing our house newsletter.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 35
      },
      {
        "id": 6,
        "name": "Namal Environmental Club (NEC)",
        "type": "Namal University Society",
        "category": "social",
        "description": "Spearheads environmental awareness campaigns, massive tree plantation drives, recycling initiatives, and cleaning actions supporting a sustainable Green Namal campus.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 85
      },
      {
        "id": 7,
        "name": "Namal Idea Club (NIC)",
        "type": "Namal University Society",
        "category": "technical",
        "description": "Cultivates design thinking, technological entrepreneurship, and inventive problem-solving among students, helping turn ideas into viable tech prototypes.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 73
      },
      {
        "id": 8,
        "name": "Namal Society for Social Impact (NSSI)",
        "type": "Namal University Society",
        "category": "social",
        "description": "Champions community welfare, blood donation camps, local school volunteering, and social development programs targeting the uplift of underprivileged areas around Mianwali.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 94
      },
      {
        "id": 9,
        "name": "Namal Literary & Debating Society (LDS)",
        "type": "Namal University Society",
        "category": "literary",
        "description": "Organizes university-wide parliamentary debating competitions, creative writing contests, poetry recitals, and classical Urdu and English literary workshops.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 110
      },
      {
        "id": 10,
        "name": "Namal Sports & Adventure Club (NSAC)",
        "type": "Namal University Society",
        "category": "sports",
        "description": "Promotes physical well-being, competitive sportsmanship, and outdoor adventure activities, including trekking trips and inter-house leagues.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead", "Associate Lead"],
        "memberCount": 150
      },
      {
        "id": 11,
        "name": "Namal Dramatic Club (NDC)",
        "type": "Namal University Society",
        "category": "arts",
        "description": "Inspires stage acting, theatrical production, playwriting, and cultural performances, organizing annual campus dramas and hosting multi-university theater festivals.",
        "patron": "Faculty Patron",
        "coordinator": "Society Coordinator",
        "leads": ["Executive Lead"],
        "memberCount": 58
      }
    ],
    "events": [
      {
        "id": "E101",
        "title": "Inter-House Sports Gala",
        "type": "sports",
        "status": "upcoming",
        "society": "Namal Sports & Adventure Club (NSAC)",
        "location": "Namal Sports Complex",
        "date": "2026-06-15",
        "time": "09:00 AM",
        "capacity": 100,
        "registered": 76,
        "description": "The ultimate sports competition where all university houses compete in cricket, football, basketball, and track events. Join to represent Rumi House and claim the championship shield!"
      },
      {
        "id": "E102",
        "title": "Rumi Debate Workshop",
        "type": "workshop",
        "status": "upcoming",
        "society": "Rumi Debating Club",
        "location": "Rumi House Study Lounge",
        "date": "2026-06-05",
        "time": "04:30 PM",
        "capacity": 40,
        "registered": 18,
        "description": "An interactive masterclass on debate structures, motion analysis, and arguments building, led by veteran senior speakers. Excellent preparation for upcoming inter-university declamations."
      },
      {
        "id": "E103",
        "title": "Poetry & Literary Night",
        "type": "competition",
        "status": "upcoming",
        "society": "Namal Literary & Debating Society (LDS)",
        "location": "Main Auditorium",
        "date": "2026-06-20",
        "time": "07:00 PM",
        "capacity": 200,
        "registered": 145,
        "description": "An evening of poetry recitations, literary discussions, and musical performances celebrating Eastern and Western classical literature. Special performances by students and guest writers."
      },
      {
        "id": "E104",
        "title": "Green Campus Tree Plantation",
        "type": "social",
        "status": "upcoming",
        "society": "Namal Environmental Club (NEC)",
        "location": "Namal Botanical Garden",
        "date": "2026-06-08",
        "time": "08:00 AM",
        "capacity": 80,
        "registered": 52,
        "description": "A hands-on volunteer action to plant 200 native saplings across campus grounds. Let's act collectively to reduce carbon footprint and build a lush, sustainable environment."
      },
      {
        "id": "E105",
        "title": "Annual Alumni Homecoming Meetup",
        "type": "seminar",
        "status": "past",
        "society": "Namal Idea Club (NIC)",
        "location": "Executive Seminar Room",
        "date": "2026-05-15",
        "time": "02:00 PM",
        "capacity": 120,
        "registered": 120,
        "description": "A prestigious networking and seminar session featuring Namal university alumni sharing industry experiences, startup journeys, and career development roadmaps for current graduates."
      }
    ],
    "news": [
      {
        "id": 1,
        "title": "Rumi House Newsletter: Spring Edition 2026",
        "category": "newsletter",
        "date": "2026-05-20",
        "author": "Editorial Board",
        "summary": "Our comprehensive seasonal publication celebrating Rumi House academic achievements, sports gala triumphs, co-curricular awards, and student-council community services.",
        "content": "We are extremely proud to launch the Spring Edition 2026 of the Rumi House Newsletter. This term has witnessed remarkable milestones for our house members. Our athletic teams performed exceptionally well in the regional sports championships, securing gold medals in cricket and table tennis. On the academic front, over fifteen Rumi members made it to the Dean's Honor List with high CGPAs. Our community action task force completed three volunteer cleaning drives in neighborhood primary schools, reinforcing Namal's vision of social impact and citizenship. Read on for individual spotlight profiles and executive body reports!"
      },
      {
        "id": 2,
        "title": "Sports Gala Special Bulletin",
        "category": "alert",
        "date": "2026-05-28",
        "author": "Sports Coordinator",
        "summary": "Official declaration regarding the schedule of matches, team registrations, house jerseys, and mandatory practice sessions for the upcoming Inter-House Sports Gala.",
        "content": "Attention all Rumi House residents! The team registrations for the upcoming Inter-House Sports Gala (E101) are officially open. All team captains are directed to submit their final player lists to the sports coordinator by June 3rd. House training sessions will commence on the main sports complex daily from 05:00 PM to 07:00 PM. High attendance in practice drills is strongly encouraged to ensure match fitness. Let's bring the championship trophy back to Rumi House!"
      },
      {
        "id": 3,
        "title": "Social Impact Annual Outreach Review",
        "category": "visit",
        "date": "2026-05-10",
        "author": "Executive Lead",
        "summary": "An extensive review of the annual village uplift projects, school restoration efforts, and welfare drives successfully executed by Namalites this year.",
        "content": "Namalites have once again demonstrated their commitment to society. This review captures the outcomes of the annual village outreach initiative. Under this initiative, our student teams visited three neighboring rural schools to establish mini science laboratories and library shelves, donating over 300 books. We also organized free digital literacy bootcamps for local children. The smiling faces of the young kids and the deep gratitude of the school masters serve as a testament to the profound potential of social-impact initiatives."
      }
    ]
  };

  // --- SELECT DOM ELEMENTS ---
  const loaders = {
    societies: document.getElementById('societies-loader'),
    events: document.getElementById('events-loader'),
    news: document.getElementById('news-loader')
  };

  const grids = {
    societies: document.getElementById('societies-grid'),
    events: document.getElementById('events-grid'),
    news: document.getElementById('news-grid')
  };

  // About panel elements
  const toggleBtn = document.getElementById('toggleBtn');
  const infoSection = document.getElementById('infoSection');
  const colorBtn = document.getElementById('colorBtn');

  // Search & Filter elements
  const societySearchInput = document.getElementById('societySearchInput');
  const societyCategoryFilters = document.getElementById('societyCategoryFilters');
  const eventStateFilters = document.getElementById('eventStateFilters');

  // Forms
  const contactForm = document.getElementById('contactForm');
  const rsvpForm = document.getElementById('rsvpForm');

  // --- DYNAMIC DATA LOAD SYSTEM (Async/Await) ---
  const loadApplicationData = async () => {
    // Show spinner animations
    setLoadingState(true);

    try {
      // CORS Policy blocks local fetch requests on file:// protocol. Check and handle:
      if (window.location.protocol === 'file:') {
        console.warn(
          "Browser Security Policy (CORS) blocks local fetch() requests on the file:// protocol.\n" +
          "Falling back to high-fidelity local dataset to preserve functionality."
        );
        // Simulate minor API latency for premium loader rendering
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Deep copy fallback
        appState.societies = JSON.parse(JSON.stringify(fallbackDatabase.societies));
        appState.events = JSON.parse(JSON.stringify(fallbackDatabase.events));
        appState.news = JSON.parse(JSON.stringify(fallbackDatabase.news));
      } else {
        // Standard Server Fetch execution
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error(`HTTP fetch error! status: ${response.status}`);
        }
        const data = await response.json();
        appState.societies = data.societies || [];
        appState.events = data.events || [];
        appState.news = data.news || [];
      }

      setLoadingState(false);
      
      // Perform initial layout renders
      renderSocieties();
      renderEvents();
      renderNews();
      updateHeroSpotlight();
      setupQuickLinks();

    } catch (error) {
      console.error("Database initialization failed:", error);
      setLoadingState(false, error.message);
    }
  };

  // Loading indicator controls
  const setLoadingState = (isLoading, errorMessage = null) => {
    Object.keys(loaders).forEach(key => {
      if (loaders[key]) {
        loaders[key].style.display = isLoading ? 'flex' : 'none';
      }
    });

    if (errorMessage) {
      const errorHTML = `
        <div class="col-12 animate-fade-in">
          <div class="alert alert-custom-danger text-center">
            <i class="bi bi-exclamation-triangle-fill fs-3 d-block mb-2"></i>
            <h5 class="fw-bold">Database Loading Error</h5>
            <p class="small mb-0">Unable to load the Rumi House Hub directory: ${errorMessage}. Please check your environment.</p>
          </div>
        </div>
      `;
      Object.keys(grids).forEach(key => {
        if (grids[key]) {
          grids[key].innerHTML = errorHTML;
        }
      });
    }
  };

  // --- ABOUT SECTION SLIDE TOGGLE & COLOR CHANGE ---
  let isAboutVisible = false;
  toggleBtn.addEventListener('click', () => {
    isAboutVisible = !isAboutVisible;
    if (isAboutVisible) {
      infoSection.style.display = 'block';
      // Trigger browser reflow for transitioning height
      setTimeout(() => infoSection.classList.add('show'), 10);
      toggleBtn.textContent = 'Hide Vision Details';
      toggleBtn.setAttribute('aria-expanded', 'true');
      colorBtn.style.display = 'inline-flex'; // Show theme randomizer
    } else {
      infoSection.classList.remove('show');
      toggleBtn.textContent = 'Discover Our Vision';
      toggleBtn.setAttribute('aria-expanded', 'false');
      // Hide container after transition
      setTimeout(() => {
        if (!isAboutVisible) infoSection.style.display = 'none';
      }, 400);
      colorBtn.style.display = 'none';
    }
  });

  // Dynamic style editor
  colorBtn.addEventListener('click', () => {
    const customAcademicAccents = [
      '#e6f4ec', // Original soft green
      '#fff7cc', // Original soft gold
      '#f0fdf4', // Soft Emerald
      '#fffbeb', // Amber tint
      '#faf5ff', // Purple shade
      '#f0f9ff'  // Soft sky blue
    ];
    const randomIndex = Math.floor(Math.random() * customAcademicAccents.length);
    const selectedColor = customAcademicAccents[randomIndex];
    
    // Apply dynamic HSL/Hex styles to DOM
    infoSection.style.backgroundColor = selectedColor;
    infoSection.style.borderColor = 'var(--namal-gold)';
  });

  // --- RENDER DYNAMIC CARD GRID COMPONENTS ---

  // 1. Render Societies Directory
  const renderSocieties = () => {
    if (!grids.societies) return;
    grids.societies.innerHTML = '';

    // Apply active filter searches (case-insensitive checks)
    const filtered = appState.societies.filter(soc => {
      const matchesSearch = soc.name.toLowerCase().includes(appState.filters.societySearch.toLowerCase()) ||
                            soc.description.toLowerCase().includes(appState.filters.societySearch.toLowerCase());
      
      const matchesCategory = appState.filters.societyCategory === 'all' || 
                              soc.category.toLowerCase() === appState.filters.societyCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });

    // Check empty state
    if (filtered.length === 0) {
      grids.societies.innerHTML = `
        <div class="col-12 animate-fade-in">
          <div class="empty-state-box">
            <i class="bi bi-folder-x fs-1"></i>
            <h4 class="fw-bold text-success">No Societies Found</h4>
            <p class="small mb-0">We couldn't find any society matching "${appState.filters.societySearch}" in the "${appState.filters.societyCategory}" category. Try adjusting your keywords.</p>
          </div>
        </div>
      `;
      return;
    }

    // Dynamic generation loop
    filtered.forEach(soc => {
      const typeBadge = soc.type === "Rumi Internal Club" ? 'card-type-badge' : 'card-category-badge';
      
      const cardHTML = `
        <div class="col-md-6 col-lg-4 animate-fade-in">
          <div class="card h-100 custom-card">
            <div class="custom-card-body">
              <span class="${typeBadge} mb-2">${soc.type}</span>
              <h4 class="fw-bold text-success mb-2">${soc.name}</h4>
              <p class="text-muted small mb-3 text-truncate-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 4.5rem;">
                ${soc.description}
              </p>
              <div class="d-flex align-items-center justify-content-between text-muted small mt-2">
                <span><i class="bi bi-award-fill text-warning me-1"></i>${soc.category.toUpperCase()}</span>
                <span><i class="bi bi-people-fill text-success me-1"></i>${soc.memberCount} Members</span>
              </div>
            </div>
            <div class="custom-card-footer">
              <button class="btn btn-outline-primary btn-sm w-100 fw-bold view-society-detail-btn" data-id="${soc.id}">
                <i class="bi bi-info-circle-fill me-1"></i>Learn More Details
              </button>
            </div>
          </div>
        </div>
      `;
      grids.societies.innerHTML += cardHTML;
    });

    // Bind event listeners to new elements
    document.querySelectorAll('.view-society-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        openSocietyModal(id);
      });
    });
  };

  // 2. Render Events Timeline
  const renderEvents = () => {
    if (!grids.events) return;
    grids.events.innerHTML = '';

    // Apply active status filters
    const filtered = appState.events.filter(evt => {
      if (appState.filters.eventState === 'all') return true;
      return evt.status.toLowerCase() === appState.filters.eventState.toLowerCase();
    });

    // Check empty state
    if (filtered.length === 0) {
      grids.events.innerHTML = `
        <div class="col-12 animate-fade-in">
          <div class="empty-state-box">
            <i class="bi bi-calendar-x fs-1"></i>
            <h4 class="fw-bold text-success">No Scheduled Events</h4>
            <p class="small mb-0">There are currently no events matching the status selection "${appState.filters.eventState}". Check back soon!</p>
          </div>
        </div>
      `;
      return;
    }

    // Format events list grouped by month
    // Sort upcoming events first
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Dynamic rendering loop
    filtered.forEach(evt => {
      const isPast = evt.status.toLowerCase() === 'past';
      const statusBadge = isPast ? 'bg-badge-past' : 'bg-badge-upcoming';
      const dateObject = new Date(evt.date);
      const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      
      const cardHTML = `
        <div class="col-md-6 col-lg-4 animate-fade-in">
          <div class="card h-100 custom-card">
            <div class="custom-card-body">
              <span class="badge ${statusBadge} px-3 py-1 mb-2">${evt.status.toUpperCase()}</span>
              <span class="card-category-badge ms-2 mb-2">${evt.type.toUpperCase()}</span>
              <h4 class="fw-bold text-dark mt-2 mb-1 text-truncate">${evt.title}</h4>
              <p class="small text-success fw-bold mb-3"><i class="bi bi-mortarboard-fill me-1"></i>${evt.society}</p>
              
              <p class="text-muted small mb-3 text-truncate-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 4.5rem;">
                ${evt.description}
              </p>
              
              <div class="d-flex flex-column gap-2 p-2 bg-light rounded-3 border small text-muted mb-2">
                <div><i class="bi bi-calendar-event text-success me-2"></i>${formattedDate} at ${evt.time}</div>
                <div><i class="bi bi-geo-alt-fill text-danger me-2"></i>${evt.location}</div>
                <div><i class="bi bi-people-fill text-primary me-2"></i>Capacity: ${evt.registered} / ${evt.capacity} Students</div>
              </div>
            </div>
            <div class="custom-card-footer bg-transparent border-top-0 pt-0">
              <button class="btn btn-primary w-100 text-dark view-event-detail-btn" data-id="${evt.id}">
                ${isPast ? '<i class="bi bi-journal-album me-1"></i>View Event Specs' : '<i class="bi bi-pencil-square me-1"></i>RSVP & Attend'}
              </button>
            </div>
          </div>
        </div>
      `;
      grids.events.innerHTML += cardHTML;
    });

    // Bind event listeners to new elements
    document.querySelectorAll('.view-event-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openEventModal(id);
      });
    });
  };

  // 3. Render News Archive
  const renderNews = () => {
    if (!grids.news) return;
    grids.news.innerHTML = '';

    if (appState.news.length === 0) {
      grids.news.innerHTML = `<div class="col-12"><p class="text-muted text-center">No newsletters published yet.</p></div>`;
      return;
    }

    appState.news.forEach(item => {
      const dateObject = new Date(item.date);
      const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      
      const cardHTML = `
        <div class="col-md-6 col-lg-4 animate-fade-in">
          <div class="card h-100 custom-card">
            <div class="custom-card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="card-category-badge mb-0">${item.category.toUpperCase()}</span>
                <span class="small text-muted font-monospace">${formattedDate}</span>
              </div>
              <h4 class="fw-bold text-success mb-2 text-truncate-2" style="height: 3rem; overflow: hidden;">${item.title}</h4>
              <p class="text-muted small mb-3 text-truncate-4" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; height: 5.5rem;">
                ${item.summary}
              </p>
              <div class="small text-muted border-top pt-2">
                <i class="bi bi-pencil-fill text-warning me-1"></i>By ${item.author}
              </div>
            </div>
            <div class="custom-card-footer">
              <button class="btn btn-outline-primary btn-sm w-100 fw-bold view-news-detail-btn" data-id="${item.id}">
                <i class="bi bi-book-half me-1"></i>Read Full Article
              </button>
            </div>
          </div>
        </div>
      `;
      grids.news.innerHTML += cardHTML;
    });

    // Bind event listeners to new elements
    document.querySelectorAll('.view-news-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        openNewsModal(id);
      });
    });
  };

  // 4. Update Hero Banner Spotlight Card
  const updateHeroSpotlight = () => {
    // Select flagship sports gala (or first upcoming event)
    const flagship = appState.events.find(e => e.id === "E101") || appState.events.find(e => e.status === "upcoming");
    if (!flagship) return;

    const spotlightTitle = document.getElementById('spotlight-title');
    const spotlightSociety = document.getElementById('spotlight-society');
    const spotlightDesc = document.getElementById('spotlight-desc');
    const spotlightDate = document.getElementById('spotlight-date');
    const spotlightLocation = document.getElementById('spotlight-location');
    const spotlightRegistered = document.getElementById('spotlight-registered');
    const spotlightRsvpBtn = document.getElementById('spotlight-rsvp-btn');

    if (spotlightTitle) spotlightTitle.textContent = flagship.title;
    if (spotlightSociety) spotlightSociety.textContent = flagship.society.toUpperCase();
    if (spotlightDesc) spotlightDesc.textContent = flagship.description;
    if (spotlightDate) {
      const d = new Date(flagship.date);
      spotlightDate.textContent = `${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${flagship.time}`;
    }
    if (spotlightLocation) spotlightLocation.textContent = flagship.location;
    if (spotlightRegistered) spotlightRegistered.textContent = flagship.registered;
    if (spotlightRsvpBtn) {
      spotlightRsvpBtn.setAttribute('data-id', flagship.id);
      spotlightRsvpBtn.addEventListener('click', () => {
        openEventModal(flagship.id);
      });
    }
  };

  // --- FILTER AND SEARCH LOGIC ---

  // Live Society Search
  societySearchInput.addEventListener('input', (e) => {
    appState.filters.societySearch = e.target.value.trim();
    renderSocieties();
  });

  // Society Category Selection
  societyCategoryFilters.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      societyCategoryFilters.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      appState.filters.societyCategory = e.currentTarget.getAttribute('data-filter');
      renderSocieties();
    });
  });

  // Event State Selection Tabs
  eventStateFilters.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      eventStateFilters.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      appState.filters.eventState = e.currentTarget.getAttribute('data-state');
      renderEvents();
    });
  });

  // Quicklinks Hash Routing Navigation Checks
  const setupQuickLinks = () => {
    document.querySelectorAll('.dropdown-item[href^="#societies?filter="]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const rawFilter = e.currentTarget.getAttribute('href').split('filter=')[1];
        const categoryFilter = decodeURIComponent(rawFilter);
        
        // Target filtering state
        const targetBtn = Array.from(societyCategoryFilters.querySelectorAll('.btn-category')).find(b => {
          const filter = b.getAttribute('data-filter');
          if (filter === 'all') return false;
          // Map general categories
          return categoryFilter.toLowerCase().includes(filter.toLowerCase());
        });

        if (targetBtn) {
          targetBtn.click();
        } else {
          // If Rumi Internal or Namal Society, filter using custom checks
          // Reset standard categories, perform dynamic custom filters
          societyCategoryFilters.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
          appState.filters.societyCategory = 'all';
          appState.filters.societySearch = categoryFilter.includes("Internal") ? "Rumi" : "Namal";
          societySearchInput.value = appState.filters.societySearch;
          renderSocieties();
        }

        // Scroll gracefully to societies grid
        document.getElementById('societies').scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  // --- BOOTSTRAP MODALS POPULATION SYSTEM ---

  // 1. Open Society Details Modal
  const openSocietyModal = (id) => {
    const soc = appState.societies.find(s => s.id === id);
    if (!soc) return;

    document.getElementById('societyModalName').textContent = soc.name;
    document.getElementById('societyModalTitle').textContent = soc.name;
    document.getElementById('societyModalType').textContent = soc.type;
    document.getElementById('societyModalDescription').textContent = soc.description;
    document.getElementById('societyModalPatron').textContent = soc.patron;
    document.getElementById('societyModalCoordinator').textContent = soc.coordinator;
    document.getElementById('societyModalLeads').textContent = soc.leads.join(', ');
    document.getElementById('societyModalMembers').textContent = `${soc.memberCount} active members`;

    const joinBtn = document.getElementById('societyModalJoinBtn');
    
    // Reset Join Button visual states
    joinBtn.innerHTML = `<i class="bi bi-plus-circle me-1"></i>Send Membership Request`;
    joinBtn.className = "btn btn-primary text-dark fw-bold";
    joinBtn.disabled = false;

    // Join Button Event Handler
    joinBtn.onclick = () => {
      joinBtn.disabled = true;
      joinBtn.className = "btn btn-success text-white fw-bold";
      joinBtn.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i>Membership Request Sent!`;
      
      // Dynamic headcount update
      soc.memberCount += 1;
      document.getElementById('societyModalMembers').textContent = `${soc.memberCount} active members`;
      renderSocieties(); // re-render grid card values
    };

    // Instantiate and show Bootstrap Modal
    const modalEl = document.getElementById('societyModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
  };

  // 2. Open Event RSVP Modal
  const openEventModal = (id) => {
    const evt = appState.events.find(e => e.id === id);
    if (!evt) return;

    appState.activeRsvpEventId = id;

    document.getElementById('eventModalMainTitle').textContent = evt.title;
    document.getElementById('eventModalType').textContent = evt.type.toUpperCase();
    document.getElementById('eventModalDescription').textContent = evt.description;
    document.getElementById('eventModalLocation').textContent = evt.location;
    
    const d = new Date(evt.date);
    document.getElementById('eventModalDate').textContent = `${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${evt.time}`;
    
    document.getElementById('eventModalRegistered').textContent = evt.registered;
    document.getElementById('eventModalCapacity').textContent = evt.capacity;

    const rsvpFormContainer = document.getElementById('eventRsvpFormContainer');
    const pastAlertContainer = document.getElementById('eventPastAlertContainer');
    const qrContainer = document.getElementById('eventQrContainer');

    // Reset validations and containers
    rsvpForm.reset();
    clearFormFeedback(rsvpForm);
    qrContainer.style.display = 'none';

    if (evt.status.toLowerCase() === 'past') {
      rsvpFormContainer.style.display = 'none';
      pastAlertContainer.style.display = 'block';
    } else {
      rsvpFormContainer.style.display = 'block';
      pastAlertContainer.style.display = 'none';
    }

    // Instantiate and show Bootstrap Modal
    const modalEl = document.getElementById('eventModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
  };

  // 3. Open News Article Reader Modal
  const openNewsModal = (id) => {
    const item = appState.news.find(n => n.id === id);
    if (!item) return;

    document.getElementById('newsModalTitleHeader').textContent = item.category.toUpperCase();
    document.getElementById('newsModalTitle').textContent = item.title;
    document.getElementById('newsModalCategory').textContent = item.category.toUpperCase();
    
    const d = new Date(item.date);
    document.getElementById('newsModalDate').textContent = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    document.getElementById('newsModalAuthor').textContent = item.author;
    document.getElementById('newsModalContent').innerHTML = `<p>${item.content.replace(/\n\n/g, '</p><p>')}</p>`;

    // Instantiate and show Bootstrap Modal
    const modalEl = document.getElementById('newsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
  };

  // --- FORM VALIDATION OPERATIONS ---

  // Helper utility to clear feedbacks
  const clearFormFeedback = (formElement) => {
    formElement.querySelectorAll('.form-control, .form-select').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
    formElement.querySelectorAll('.validation-success-text, .validation-error-text').forEach(el => {
      el.style.display = 'none';
    });
  };

  // Dynamic Focus Indicators Bindings
  const setupDynamicFocusValidators = (inputElement, validatorFn, successId, errorId) => {
    const validate = () => {
      const isValid = validatorFn(inputElement.value);
      const successEl = document.getElementById(successId);
      const errorEl = document.getElementById(errorId);

      if (inputElement.value.trim() === '') {
        inputElement.classList.remove('is-valid', 'is-invalid');
        if (successEl) successEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
        return false;
      }

      if (isValid) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        if (successEl) successEl.style.display = 'block';
        if (errorEl) errorEl.style.display = 'none';
      } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
        if (successEl) successEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'block';
      }
      return isValid;
    };

    inputElement.addEventListener('keyup', validate);
    inputElement.addEventListener('blur', validate);
    inputElement.addEventListener('change', validate);
  };

  // Dynamic Email and RegNo Validation Rules
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.toLowerCase().endsWith('@namal.edu.pk');
  };

  const isValidRegNo = (regNo) => {
    const regNoRegex = /^NUM-[A-Za-z]{4}-\d{4}-\d{2,4}$/i;
    return regNoRegex.test(regNo);
  };

  // Bind Contact form fields dynamic inputs
  const contactFields = {
    name: document.getElementById('contactName'),
    email: document.getElementById('contactEmail'),
    regNo: document.getElementById('contactRegNo'),
    subject: document.getElementById('contactSubject'),
    message: document.getElementById('contactMessage')
  };

  if (contactFields.name) {
    setupDynamicFocusValidators(contactFields.name, (val) => val.trim().length >= 3, 'contactNameSuccess', 'contactNameError');
    setupDynamicFocusValidators(contactFields.email, isValidEmail, 'contactEmailSuccess', 'contactEmailError');
    setupDynamicFocusValidators(contactFields.regNo, isValidRegNo, 'contactRegNoSuccess', 'contactRegNoError');
    setupDynamicFocusValidators(contactFields.subject, (val) => val !== '', 'contactSubjectSuccess', 'contactSubjectError');
    setupDynamicFocusValidators(contactFields.message, (val) => val.trim().length >= 10, 'contactMessageSuccess', 'contactMessageError');
  }

  // Bind RSVP Modal form fields
  const rsvpFields = {
    email: document.getElementById('rsvpEmail'),
    regNo: document.getElementById('rsvpRegNo')
  };

  if (rsvpFields.email) {
    setupDynamicFocusValidators(rsvpFields.email, isValidEmail, 'rsvpEmailSuccess', 'rsvpEmailError');
    setupDynamicFocusValidators(rsvpFields.regNo, isValidRegNo, 'rsvpRegNoSuccess', 'rsvpRegNoError');
  }

  // 1. Submit Handling for Contact Form
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameOk = contactFields.name.value.trim().length >= 3;
    const isEmailOk = isValidEmail(contactFields.email.value);
    const isRegOk = isValidRegNo(contactFields.regNo.value);
    const isSubOk = contactFields.subject.value !== '';
    const isMsgOk = contactFields.message.value.trim().length >= 10;

    // Trigger visual highlights
    contactFields.name.dispatchEvent(new Event('blur'));
    contactFields.email.dispatchEvent(new Event('blur'));
    contactFields.regNo.dispatchEvent(new Event('blur'));
    contactFields.subject.dispatchEvent(new Event('blur'));
    contactFields.message.dispatchEvent(new Event('blur'));

    const successAlert = document.getElementById('contactSuccessAlert');
    const errorAlert = document.getElementById('contactErrorAlert');

    if (isNameOk && isEmailOk && isRegOk && isSubOk && isMsgOk) {
      // Hide errors
      errorAlert.style.setProperty('display', 'none', 'important');
      
      // Show success alert overlay
      successAlert.style.setProperty('display', 'flex', 'important');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form variables
      contactForm.reset();
      clearFormFeedback(contactForm);

      // Auto fade overlay alert after 4 seconds
      setTimeout(() => {
        successAlert.style.setProperty('display', 'none', 'important');
      }, 4000);

    } else {
      successAlert.style.setProperty('display', 'none', 'important');
      errorAlert.style.setProperty('display', 'flex', 'important');
      errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 2. Submit Handling for Event RSVP Form (QR Code API Call)
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isEmailOk = isValidEmail(rsvpFields.email.value);
    const isRegOk = isValidRegNo(rsvpFields.regNo.value);

    // Trigger visual highlights
    rsvpFields.email.dispatchEvent(new Event('blur'));
    rsvpFields.regNo.dispatchEvent(new Event('blur'));

    if (isEmailOk && isRegOk) {
      const eventId = appState.activeRsvpEventId;
      const targetEvent = appState.events.find(evt => evt.id === eventId);
      if (!targetEvent) return;

      const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');
      const rsvpFormContainer = document.getElementById('eventRsvpFormContainer');
      const qrContainer = document.getElementById('eventQrContainer');
      const qrImage = document.getElementById('eventQrImage');
      const qrSpinner = document.getElementById('qr-loading-spinner');
      const qrTokenText = document.getElementById('eventQrToken');

      // 1. Disable submit trigger to prevent duplicate entry
      rsvpSubmitBtn.disabled = true;

      // 2. Increment active student registration headcount dynamically
      targetEvent.registered = Math.min(targetEvent.registered + 1, targetEvent.capacity);
      
      // Update details in modal fields and outer sections
      document.getElementById('eventModalRegistered').textContent = targetEvent.registered;
      renderEvents();
      updateHeroSpotlight();

      // 3. Generate Secure Attendance Check-in Token
      const cleanReg = rsvpFields.regNo.value.replace(/-/g, '_').toLowerCase();
      const secureToken = `rumi_secure_${eventId.toLowerCase()}_${cleanReg}_${Math.floor(1000 + Math.random() * 9000)}`;
      qrTokenText.textContent = secureToken;

      // 4. Request External QR Server API Generator
      const encodedData = encodeURIComponent(`eventId=${eventId}&token=${secureToken}`);
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;

      // Show spinner during loading image
      qrSpinner.style.display = 'block';
      qrImage.src = qrApiUrl;

      // When QR finishes fetching, toggle states
      qrImage.onload = () => {
        qrSpinner.style.display = 'none';
      };

      qrImage.onerror = () => {
        qrSpinner.style.display = 'none';
        console.error("QR Code Server API unreachable. Check connections.");
      };

      // 5. Dynamic Transitions: Fade forms and display QR cards
      rsvpFormContainer.style.display = 'none';
      qrContainer.style.display = 'block';

    } else {
      console.warn("RSVP fields failed email or registration validation criteria.");
    }
  });

  // Initialize Web App
  loadApplicationData();

});
