import React from 'react';
import { Link } from 'react-router-dom';

export default function SocietyCard({ society }) {
  const { id, name, category, description, memberCount } = society;

  return (
    <article className="card" id={`society-card-${id}`}>
      <span className={`badge badge-${category.toLowerCase()}`}>
        {category}
      </span>
      <h3 style={{ fontSize: '1.25rem', minHeight: '3rem' }}>{name}</h3>
      <p style={{ flex: '1', fontSize: '0.9rem', marginBottom: '1rem' }}>
        {description.length > 120 ? `${description.slice(0, 120)}...` : description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-soft)', paddingTop: '0.75rem', marginTop: 'auto' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
          👥 {memberCount} Members
        </span>
        <Link to={`/societies/${id}`} className="btn btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
          View Details
        </Link>
      </div>
    </article>
  );
}
