const express = require('express');
const cors = require('cors');
const {
  societies,
  events,
  news,
  memberships,
  rsvps
} = require('./data/seedData');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend API requests
app.use(cors());

// Enable JSON request body parsing
app.use(express.json());

// Helper function to validate email domain
const isValidNamalEmail = (email) => {
  if (!email) return false;
  return email.toLowerCase().endsWith('@namal.edu.pk');
};

// Helper function to validate student registration number format (e.g. NUM-BSCS-2022-41)
const isValidRegNumber = (regNum) => {
  if (!regNum) return false;
  // Match format: NUM-[DEPT]-[YEAR]-[ID] where DEPT is 3-4 letters, YEAR is 4 digits, ID is 1-3 digits
  const regRegex = /^NUM-[A-Z]{3,4}-\d{4}-\d{1,3}$/i;
  return regRegex.test(regNum);
};

// ----------------------------------------------------
// Health Check Endpoint
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    message: 'Rumi House Hub Express memory API is running successfully.',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Societies Endpoints
// ----------------------------------------------------

// GET /api/societies - Retrieve all societies (supports category filter)
app.get('/api/societies', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = societies.filter(
      s => s.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(societies);
});

// GET /api/societies/:id - Retrieve one society by ID
app.get('/api/societies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const society = societies.find(s => s.id === id);
  if (!society) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Society with ID ${req.params.id} does not exist.`
    });
  }
  res.json(society);
});

// POST /api/societies/:id/join - Mock membership registration
app.post('/api/societies/:id/join', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const society = societies.find(s => s.id === id);
  if (!society) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Society with ID ${req.params.id} does not exist.`
    });
  }

  const { name, email, regNumber } = req.body;

  // Validation checks
  if (!name || !name.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Full Name is required.'
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email address is required.'
    });
  }

  if (!isValidNamalEmail(email)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email must be a valid student address ending with @namal.edu.pk.'
    });
  }

  if (!regNumber || !regNumber.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Registration Number is required.'
    });
  }

  if (!isValidRegNumber(regNumber)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Registration number must match format like NUM-BSCS-2022-41.'
    });
  }

  // Prevent duplicate membership registrations in the in-memory array
  const alreadyExists = memberships.some(
    m => m.societyId === id && m.email.toLowerCase() === email.toLowerCase()
  );
  if (alreadyExists) {
    return res.status(400).json({
      error: 'Duplicate Error',
      message: 'You have already submitted a join request for this society.'
    });
  }

  // Create membership request record
  const newMembership = {
    id: memberships.length + 1,
    societyId: id,
    societyName: society.name,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    regNumber: regNumber.trim().toUpperCase(),
    joinedAt: new Date().toISOString()
  };

  memberships.push(newMembership);

  // Increment internal counter in memory
  society.memberCount += 1;

  res.status(201).json({
    success: true,
    message: 'Membership request submitted successfully!',
    membership: newMembership
  });
});

// ----------------------------------------------------
// Events Endpoints
// ----------------------------------------------------

// GET /api/events - Retrieve all events (supports status filter)
app.get('/api/events', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = events.filter(
      e => e.status.toLowerCase() === status.toLowerCase()
    );
    return res.json(filtered);
  }
  res.json(events);
});

// GET /api/events/:id - Retrieve one event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Event with ID ${req.params.id} does not exist.`
    });
  }
  res.json(event);
});

// POST /api/events/:id/rsvp - Mock Event RSVP submission
app.post('/api/events/:id/rsvp', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Event with ID ${req.params.id} does not exist.`
    });
  }

  const { name, email, regNumber } = req.body;

  // Validation checks
  if (!name || !name.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Full Name is required.'
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email address is required.'
    });
  }

  if (!isValidNamalEmail(email)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email must be a valid student address ending with @namal.edu.pk.'
    });
  }

  if (!regNumber || !regNumber.trim()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Registration Number is required.'
    });
  }

  if (!isValidRegNumber(regNumber)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Registration number must match format like NUM-BSCS-2022-41.'
    });
  }

  // Check event capacity limits in-memory
  if (event.registered >= event.capacity) {
    return res.status(400).json({
      error: 'Capacity Error',
      message: 'RSVPs are closed. This event has reached its maximum seating capacity.'
    });
  }

  // Prevent duplicate RSVPs in-memory
  const alreadyExists = rsvps.some(
    r => r.eventId === req.params.id && r.email.toLowerCase() === email.toLowerCase()
  );
  if (alreadyExists) {
    return res.status(400).json({
      error: 'Duplicate Error',
      message: 'You have already submitted an RSVP for this event.'
    });
  }

  // Create RSVP record
  const newRsvp = {
    id: rsvps.length + 1,
    eventId: req.params.id,
    eventTitle: event.title,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    regNumber: regNumber.trim().toUpperCase(),
    registeredAt: new Date().toISOString()
  };

  rsvps.push(newRsvp);

  // Increment registered counter in-memory
  event.registered += 1;

  res.status(201).json({
    success: true,
    message: 'RSVP submitted successfully!',
    rsvp: newRsvp
  });
});

// GET /api/events/:id/qr - QR URL generation endpoint
app.get('/api/events/:id/qr', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Event with ID ${req.params.id} does not exist.`
    });
  }

  // Generate QR Server API call matching schema definitions
  const secureToken = `rumi_secure_session_token_${event.id}_${Math.random().toString(36).substring(2, 7)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=eventId=${event.id}%26token=${secureToken}`;

  res.json({
    eventId: event.id,
    qrUrl: qrUrl,
    message: 'Scan at the venue to record attendance.'
  });
});

// ----------------------------------------------------
// News Endpoints
// ----------------------------------------------------

// GET /api/news - Retrieve all news items
app.get('/api/news', (req, res) => {
  res.json(news);
});

// GET /api/news/:id - Retrieve one news item by ID
app.get('/api/news/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newsItem = news.find(n => n.id === id);
  if (!newsItem) {
    return res.status(404).json({
      error: 'Not Found',
      message: `News article with ID ${req.params.id} does not exist.`
    });
  }
  res.json(newsItem);
});

// Start Express API server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Rumi House Hub Backend is active on port ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
