import React from 'react';

export default function EmptyState({ 
  message = "No results matches your search query.", 
  actionLabel = "Clear Filter", 
  onAction 
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🔍</div>
      <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1.25rem' }}>{message}</p>
      {onAction && (
        <button className="btn btn-primary" onClick={onAction} style={{ fontSize: '0.9rem' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
