import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section style={{ textAlign: 'center', padding: '5rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>🕌</span>
      <h1 style={{ fontSize: '3rem', color: 'var(--namal-green)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        The page you are looking for does not exist, has been removed, or is part of a protected 
        dashboard reserved for Assignment 4 (persistent authentication).
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
        Return to Home Page
      </Link>
    </section>
  );
}
