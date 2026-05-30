import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  const { id, title, date, time, location, status, type, society } = event;

  // Format date nicely for rendering
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="card" id={`event-card-${id}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span className={`badge badge-${status.toLowerCase()}`}>
          {status}
        </span>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          🏷️ {type}
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', minHeight: '3rem' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--namal-green)', fontWeight: '600', marginBottom: '0.75rem' }}>
        📢 {society}
      </p>
      
      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div>📅 <strong>Date:</strong> {formattedDate} at {time}</div>
        <div>📍 <strong>Venue:</strong> {location}</div>
      </div>
      
      <Link to={`/events/${id}`} className="btn btn-outline btn-block" style={{ marginTop: 'auto', padding: '0.5rem' }}>
        View Details & RSVP
      </Link>
    </article>
  );
}
