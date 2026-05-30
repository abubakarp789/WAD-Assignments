import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Main Navigation">
        <div className="nav-logo">
          🕌 Rumi House <span>Hub</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/societies" className={({ isActive }) => isActive ? 'active' : ''}>
              Societies
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>
              News
            </NavLink>
          </li>
          <li>
            <button 
              className="nav-login-btn"
              onClick={() => alert('Authentication and protected dashboards belong to Assignment 4 (MongoDB + JWT) and are not implemented in Assignment 3.')}
            >
              Sign In
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
