// Rumi House Hub API Client (Assignment 3)
// Facilitates all communication between the React frontend SPA and Node/Express backend.
// Designed with native browser Fetch API to maintain student-friendly, readable syntax.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper handler to process fetch responses and format errors cleanly
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = 'An error occurred during the request.';
    try {
      const data = await response.json();
      errorMessage = data.message || data.error || errorMessage;
    } catch (e) {
      // Handles cases where server returns a non-JSON payload or empty error
    }
    throw new Error(errorMessage);
  }
  return await response.json();
}

/**
 * Societies API Calls
 */
export async function getSocieties(category = '') {
  const url = category 
    ? `${API_BASE_URL}/societies?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/societies`;
  const response = await fetch(url);
  return handleResponse(response);
}

export async function getSocietyById(id) {
  const response = await fetch(`${API_BASE_URL}/societies/${id}`);
  return handleResponse(response);
}

export async function joinSociety(id, payload) {
  const response = await fetch(`${API_BASE_URL}/societies/${id}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

/**
 * Events API Calls
 */
export async function getEvents(status = '') {
  const url = status
    ? `${API_BASE_URL}/events?status=${encodeURIComponent(status)}`
    : `${API_BASE_URL}/events`;
  const response = await fetch(url);
  return handleResponse(response);
}

export async function getEventById(id) {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  return handleResponse(response);
}

export async function submitRsvp(id, payload) {
  const response = await fetch(`${API_BASE_URL}/events/${id}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function getEventQr(id) {
  const response = await fetch(`${API_BASE_URL}/events/${id}/qr`);
  return handleResponse(response);
}

/**
 * News API Calls
 */
export async function getNews() {
  const response = await fetch(`${API_BASE_URL}/news`);
  return handleResponse(response);
}

export async function getNewsById(id) {
  const response = await fetch(`${API_BASE_URL}/news/${id}`);
  return handleResponse(response);
}
