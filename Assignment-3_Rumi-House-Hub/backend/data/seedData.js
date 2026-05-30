// Seed Data & In-Memory Store for Rumi House Hub
// Reflects academic contexts and neutral placeholders as per project instructions

const societies = [
  {
    id: 1,
    name: "Rumi Debating Club",
    type: "Rumi Internal Club",
    category: "literary",
    description: "Fosters public speaking, structured argument development, and eloquence among house members through regular internal debates and regional simulations.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 42
  },
  {
    id: 2,
    name: "Rumi Art & Calligraphy Club",
    type: "Rumi Internal Club",
    category: "arts",
    description: "Nurtures artistic expression, classical calligraphy skills, and hands-on visual arts projects to beautify the Rumi House lounge and represent the house in design challenges.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead"],
    memberCount: 31
  },
  {
    id: 3,
    name: "Rumi Reading Club",
    type: "Rumi Internal Club",
    category: "literary",
    description: "Creates a community of readers dedicated to deep textual analysis, weekly book reviews, and intellectual group discussions on classic and contemporary literature.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 27
  },
  {
    id: 4,
    name: "Rumi Décor Club",
    type: "Rumi Internal Club",
    category: "arts",
    description: "Enlivens the living spaces and community lobbies of Rumi House, executing creative interior designs and setting up layouts for all our house events.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead"],
    memberCount: 24
  },
  {
    id: 5,
    name: "Rumi Writing Club",
    type: "Rumi Internal Club",
    category: "literary",
    description: "Empowers aspiring writers, essayists, and poets within Rumi House, conducting collaborative peer reviews, workshops, and publishing our house newsletter.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 35
  },
  {
    id: 6,
    name: "Namal Environmental Club (NEC)",
    type: "Namal University Society",
    category: "social",
    description: "Spearheads environmental awareness campaigns, massive tree plantation drives, recycling initiatives, and cleaning actions supporting a sustainable Green Namal campus.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 85
  },
  {
    id: 7,
    name: "Namal Idea Club (NIC)",
    type: "Namal University Society",
    category: "technical",
    description: "Cultivates design thinking, technological entrepreneurship, and inventive problem-solving among students, helping turn ideas into viable tech prototypes.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 73
  },
  {
    id: 8,
    name: "Namal Society for Social Impact (NSSI)",
    type: "Namal University Society",
    category: "social",
    description: "Champions community welfare, blood donation camps, local school volunteering, and social development programs targeting the uplift of underprivileged areas around Mianwali.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 94
  },
  {
    id: 9,
    name: "Namal Literary & Debating Society (LDS)",
    type: "Namal University Society",
    category: "literary",
    description: "Organizes university-wide parliamentary debating competitions, creative writing contests, poetry recitals, and classical Urdu and English literary workshops.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 110
  },
  {
    id: 10,
    name: "Namal Sports & Adventure Club (NSAC)",
    type: "Namal University Society",
    category: "sports",
    description: "Promotes physical well-being, competitive sportsmanship, and outdoor adventure activities, including trekking trips and inter-house leagues.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead", "Associate Lead"],
    memberCount: 150
  },
  {
    id: 11,
    name: "Namal Dramatic Club (NDC)",
    type: "Namal University Society",
    category: "arts",
    description: "Inspires stage acting, theatrical production, playwriting, and cultural performances, organizing annual campus dramas and hosting multi-university theater festivals.",
    patron: "Faculty Patron",
    coordinator: "Society Coordinator",
    leads: ["Executive Lead"],
    memberCount: 58
  }
];

const events = [
  {
    id: "E101",
    title: "Inter-House Sports Gala",
    type: "sports",
    status: "upcoming",
    society: "Namal Sports & Adventure Club (NSAC)",
    location: "Namal Sports Complex",
    date: "2026-06-15",
    time: "09:00 AM",
    capacity: 100,
    registered: 76,
    description: "The ultimate sports competition where all university houses compete in cricket, football, basketball, and track events. Join to represent Rumi House and claim the championship shield!"
  },
  {
    id: "E102",
    title: "Rumi Debate Workshop",
    type: "workshop",
    status: "upcoming",
    society: "Rumi Debating Club",
    location: "Rumi House Study Lounge",
    date: "2026-06-05",
    time: "04:30 PM",
    capacity: 40,
    registered: 18,
    description: "An interactive masterclass on debate structures, motion analysis, and arguments building, led by veteran senior speakers. Excellent preparation for upcoming inter-university declamations."
  },
  {
    id: "E103",
    title: "Poetry & Literary Night",
    type: "competition",
    status: "upcoming",
    society: "Namal Literary & Debating Society (LDS)",
    location: "Main Auditorium",
    date: "2026-06-20",
    time: "07:00 PM",
    capacity: 200,
    registered: 145,
    description: "An evening of poetry recitations, literary discussions, and musical performances celebrating Eastern and Western classical literature. Special performances by students and guest writers."
  },
  {
    id: "E104",
    title: "Green Campus Tree Plantation",
    type: "social",
    status: "upcoming",
    society: "Namal Environmental Club (NEC)",
    location: "Namal Botanical Garden",
    date: "2026-06-08",
    time: "08:00 AM",
    capacity: 80,
    registered: 52,
    description: "A hands-on volunteer action to plant 200 native saplings across campus grounds. Let's act collectively to reduce carbon footprint and build a lush, sustainable environment."
  },
  {
    id: "E105",
    title: "Annual Alumni Homecoming Meetup",
    type: "seminar",
    status: "past",
    society: "Namal Idea Club (NIC)",
    location: "Executive Seminar Room",
    date: "2026-05-15",
    time: "02:00 PM",
    capacity: 120,
    registered: 120,
    description: "A prestigious networking and seminar session featuring Namal university alumni sharing industry experiences, startup journeys, and career development roadmaps for current graduates."
  }
];

const news = [
  {
    id: 1,
    title: "Rumi House Newsletter: Spring Edition 2026",
    category: "newsletter",
    date: "2026-05-20",
    author: "Editorial Board",
    summary: "Our comprehensive seasonal publication celebrating Rumi House academic achievements, sports gala triumphs, co-curricular awards, and student-council community services.",
    content: "We are extremely proud to launch the Spring Edition 2026 of the Rumi House Newsletter. This term has witnessed remarkable milestones for our house members. Our athletic teams performed exceptionally well in the regional sports championships, securing gold medals in cricket and table tennis. On the academic front, over fifteen Rumi members made it to the Dean's Honor List with high CGPAs. Our community action task force completed three volunteer cleaning drives in neighborhood primary schools, reinforcing Namal's vision of social impact and citizenship. Read on for individual spotlight profiles and executive body reports!"
  },
  {
    id: 2,
    title: "Sports Gala Special Bulletin",
    category: "alert",
    date: "2026-05-28",
    author: "Sports Coordinator",
    summary: "Official declaration regarding the schedule of matches, team registrations, house jerseys, and mandatory practice sessions for the upcoming Inter-House Sports Gala.",
    content: "Attention all Rumi House residents! The team registrations for the upcoming Inter-House Sports Gala (E101) are officially open. All team captains are directed to submit their final player lists to the sports coordinator by June 3rd. House training sessions will commence on the main sports complex daily from 05:00 PM to 07:00 PM. High attendance in practice drills is strongly encouraged to ensure match fitness. Let's bring the championship trophy back to Rumi House!"
  },
  {
    id: 3,
    title: "Social Impact Annual Outreach Review",
    category: "visit",
    date: "2026-05-10",
    author: "Executive Lead",
    summary: "An extensive review of the annual village uplift projects, school restoration efforts, and welfare drives successfully executed by Namalites this year.",
    content: "Namalites have once again demonstrated their commitment to society. This review captures the outcomes of the annual village outreach initiative. Under this initiative, our student teams visited three neighboring rural schools to establish mini science laboratories and library shelves, donating over 300 books. We also organized free digital literacy bootcamps for local children. The smiling faces of the young kids and the deep gratitude of the school masters serve as a testament to the profound potential of social-impact initiatives."
  }
];

// Empty in-memory storage for transaction records
const memberships = [];
const rsvps = [];

module.exports = {
  societies,
  events,
  news,
  memberships,
  rsvps
};
