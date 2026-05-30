import React from 'react';

export default function LoadingState({ count = 3 }) {
  // Generates dummy array for skeleton cards
  const loaders = Array.from({ length: count }, (_, idx) => idx);

  return (
    <div className="grid-3" aria-live="polite" aria-busy="true">
      {loaders.map((item) => (
        <div key={item} className="card" style={{ pointerEvents: 'none', minHeight: '260px' }}>
          <div className="skeleton-box" style={{ height: '24px', width: '30%', marginBottom: '1rem' }}></div>
          <div className="skeleton-box" style={{ height: '32px', width: '80%', marginBottom: '1rem' }}></div>
          <div className="skeleton-box" style={{ height: '60px', width: '100%', marginBottom: '1.5rem' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-soft)', paddingTop: '0.75rem', marginTop: 'auto' }}>
            <div className="skeleton-box" style={{ height: '18px', width: '40%' }}></div>
            <div className="skeleton-box" style={{ height: '28px', width: '30%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
