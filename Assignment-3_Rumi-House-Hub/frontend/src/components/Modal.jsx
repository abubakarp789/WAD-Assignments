import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {title && <h3 style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>{title}</h3>}
        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
