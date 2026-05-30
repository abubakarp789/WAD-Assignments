import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSocieties, getEvents } from '../api/api';
import SocietyCard from '../components/SocietyCard';
import EventCard from '../components/EventCard';
import LoadingState from '../components/LoadingState';

export default function Home() {
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [societies, setSocieties] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch all societies and events concurrently
        const [societiesData, eventsData] = await Promise.all([
          getSocieties(),
          getEvents('upcoming')
        ]);
        
        // Take the first 3 societies and first 2 upcoming events as highlights
        setSocieties(societiesData.slice(0, 3));
        setEvents(eventsData.slice(0, 2));
        setError('');
      } catch (err) {
        console.error(err);
        setError('Unable to load home data from backend. Please verify your Node/Express server is active on port 5000.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section>
      {/* Hero Spotlight Section */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge badge-sports" style={{ backgroundColor: 'var(--namal-gold)', color: 'var(--text-main)', fontWeight: 'bold' }}>
            🏆 SPOTLIGHT CALENDAR
          </span>
          <h1 className="hero-title">
            Discover and Engage in <span>Rumi House</span> Co-curriculars
          </h1>
          <p className="hero-subtitle">
            Welcome to your unified portal for student clubs, societies, and activities 
            at Namal University, Mianwali. Engage, lead, and grow!
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/societies" className="btn btn-secondary">
              Browse Societies
            </Link>
            <Link to="/events" className="btn btn-outline" style={{ borderColor: 'var(--namal-gold)', color: 'var(--white)' }}>
              View Schedule
            </Link>
          </div>
        </div>
      </header>

      {/* Expandable Discover Our Vision Section */}
      <article className="vision-card">
        <header 
          className="vision-header" 
          onClick={() => setIsVisionOpen(!isVisionOpen)}
          aria-expanded={isVisionOpen}
        >
          <h2 style={{ border: 'none', margin: 0, padding: 0, fontSize: '1.4rem' }}>
            🕌 Discover Our Vision & Values
          </h2>
          <button className="vision-toggle-btn">
            {isVisionOpen ? '▲ Hide Details' : '▼ Expand details'}
          </button>
        </header>
        
        {isVisionOpen && (
          <div className="vision-body">
            <p>
              Rumi House Hub is committed to creating a vibrant community where academic excellence 
              blends with active leadership. We aim to foster structured debates, creative art campaigns, 
              community volunteering, and environmental conservation initiatives across the Namal University campus.
            </p>
            <p style={{ margin: 0 }}>
              Through this portal, student leaders and house coordinators have a unified platform 
              to coordinate activities, register members, and document participation using QR-driven check-in automation.
            </p>
          </div>
        )}
      </article>

      {/* Backend Latency Error Alerts */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Featured Societies Directory Showcase */}
      <section style={{ marginBottom: '3rem' }}>
        <header className="section-header">
          <h2>👥 Featured Clubs & Societies</h2>
          <Link to="/societies" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            See All Directory →
          </Link>
        </header>
        {loading ? (
          <LoadingState count={3} />
        ) : (
          <div className="grid-3">
            {societies.map((soc) => (
              <SocietyCard key={soc.id} society={soc} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Spotlight Events Calendar Showcase */}
      <section style={{ marginBottom: '3rem' }}>
        <header className="section-header">
          <h2>📅 Featured Upcoming Events</h2>
          <Link to="/events" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            Full Event Calendar →
          </Link>
        </header>
        {loading ? (
          <LoadingState count={2} />
        ) : events.length === 0 ? (
          <div className="empty-state">
            <p>No upcoming events scheduled currently. Check back later!</p>
          </div>
        ) : (
          <div className="grid-2">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Preview Grid CTA */}
      <section style={{ backgroundColor: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-large)', border: '1px solid var(--border-soft)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
        <span className="badge badge-literary">Newsletter Archives</span>
        <h2 style={{ border: 'none', padding: 0, margin: '0.5rem 0 1rem 0' }}>Stay Connected with Rumi House Writing Club</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Our seasonal Rumi House publications celebrate academic triumphs, community volunteer spotlights, and athletic gala results. Browse past digital reviews.
        </p>
        <Link to="/news" className="btn btn-primary">
          Explore Newsletters & Alerts
        </Link>
      </section>
    </section>
  );
}
