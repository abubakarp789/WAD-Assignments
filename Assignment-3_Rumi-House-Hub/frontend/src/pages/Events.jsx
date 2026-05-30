import React, { useState, useEffect } from 'react';
import { getEvents } from '../api/api';
import EventCard from '../components/EventCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const TABS = ['All', 'Upcoming', 'Past'];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events based on status tab selection
  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError('');
        
        // Pass relevant status filter to Express backend endpoint
        const statusFilter = activeTab === 'All' ? '' : activeTab.toLowerCase();
        const data = await getEvents(statusFilter);
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch the events list from Express memory APIs. Please verify your server status.');
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [activeTab]);

  return (
    <section>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>📅 Campus Events & Activity Calendar</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse our schedule of co-curricular workshops, sports gala matches, poetry nights, 
          and social initiatives. Secure your seats by submitting an RSVP request.
        </p>
      </header>

      {/* Interactive Tabs for Event States */}
      <div className="tabs-container" aria-label="Event State Navigation">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Events
          </button>
        ))}
      </div>

      {/* Backend API latency errors */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Events timeline grids */}
      {loading ? (
        <LoadingState count={4} />
      ) : events.length === 0 ? (
        <EmptyState 
          message={`No ${activeTab.toLowerCase()} events scheduled at this moment.`}
          actionLabel="View All Events"
          onAction={() => setActiveTab('All')}
        />
      ) : (
        <div className="grid-2">
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </section>
  );
}
