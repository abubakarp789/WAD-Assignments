import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById, submitRsvp, getEventQr } from '../api/api';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // RSVP Form States
  const [formData, setFormData] = useState({ name: '', email: '', regNumber: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);

  // Fetch event by ID from backend
  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        setError('');
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Event details not found.');
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  // Client-Side RSVP Form validations
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!formData.email.toLowerCase().endsWith('@namal.edu.pk')) {
      errors.email = 'Email must end with @namal.edu.pk.';
    }

    if (!formData.regNumber.trim()) {
      errors.regNumber = 'Registration Number is required.';
    } else {
      const regRegex = /^NUM-[A-Z]{3,4}-\d{4}-\d{1,3}$/i;
      if (!regRegex.test(formData.regNumber)) {
        errors.regNumber = 'Format must match: NUM-DEPT-YYYY-ID (e.g. NUM-BSCS-2022-41).';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      
      // 1. Submit Mock RSVP request
      const rsvpResponse = await submitRsvp(id, formData);
      setSubmitSuccess(rsvpResponse.message || 'RSVP recorded successfully!');
      setIsRegistered(true);
      
      // 2. Increment local registered counter state
      setEvent(prev => ({ ...prev, registered: prev.registered + 1 }));

      // 3. Retrieve dynamic QR code endpoint details
      const qrResponse = await getEventQr(id);
      setQrCodeData(qrResponse);
      
      // Clear registration form inputs
      setFormData({ name: '', email: '', regNumber: '' });
    } catch (err) {
      console.error(err);
      setFormErrors({ submitError: err.message || 'Failed to submit RSVP request.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="skeleton-box" style={{ height: '40px', width: '60%', margin: '0 auto 1.5rem auto' }}></div>
        <div className="skeleton-box" style={{ height: '300px', width: '100%', marginBottom: '1.5rem' }}></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div className="alert alert-danger" role="alert" style={{ display: 'inline-block', maxWidth: '600px' }}>
          ⚠️ {error || 'Event details not found.'}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/events" className="btn btn-primary">
            Back to Event Calendar
          </Link>
        </div>
      </div>
    );
  }

  // Calculate dynamic capacity percentage
  const fillPercentage = Math.min(100, Math.round((event.registered / event.capacity) * 100));
  const isSoldOut = event.registered >= event.capacity;
  const isPast = event.status.toLowerCase() === 'past';

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article>
      <Link to="/events" style={{ display: 'inline-block', marginBottom: '1.5rem', fontWeight: '600' }}>
        ← Back to Calendar
      </Link>

      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className={`badge badge-${event.status.toLowerCase()}`}>
            {event.status}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {event.type}
          </span>
        </div>
        <h1 style={{ margin: '0.25rem 0 0.5rem 0' }}>{event.title}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--namal-green)', fontWeight: '600', margin: 0 }}>
          Organized By: {event.society}
        </p>
      </header>

      {/* Two Column Layout details grid */}
      <div className="detail-layout">
        {/* Left Column: Description details */}
        <section className="detail-main">
          <h2>Event Specifications</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            {event.description}
          </p>

          <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Venue & Scheduling</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-normal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 Campus Venue</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  {event.location}
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-normal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📅 Calendar Schedule</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                  {formattedDate}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Time: {event.time}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Seating capacity, RSVPs and check-in QR barcodes */}
        <aside className="detail-sidebar">
          {/* Seating capacities count widget */}
          <div className="sidebar-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Seat Availability</h3>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${fillPercentage}%`, backgroundColor: isSoldOut ? 'var(--color-error)' : 'var(--namal-green)' }}
              ></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              <span>👥 {event.registered} Reserved</span>
              <span>🚪 {event.capacity} Max Seats</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              {isSoldOut ? '⚠️ Maximum capacity reached. RSVPs are closed.' : `${event.capacity - event.registered} seats are currently available.`}
            </p>
          </div>

          {/* RSVP and Attendance check-in demo cards */}
          <section className="sidebar-card">
            {isPast ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <span style={{ fontSize: '2rem' }}>⌛</span>
                <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Event has concluded</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  This past event was successfully recorded. RSVPs are locked.
                </p>
              </div>
            ) : isRegistered && qrCodeData ? (
              /* Success registered state: renders check-in QR demo code returned from backend endpoint */
              <div className="qr-container" aria-live="polite">
                <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎟️</span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--namal-green-dark)', margin: '0 0 0.5rem 0' }}>RSVP Confirmed!</h3>
                
                <div className="qr-image">
                  <img 
                    src={qrCodeData.qrUrl} 
                    alt={`Attendance check-in QR code for event ${id}`}
                    width="150"
                    height="150"
                    style={{ display: 'block' }}
                  />
                </div>
                
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Your Check-in Pass
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                  {qrCodeData.message}
                </p>
              </div>
            ) : (
              /* Form State: submit RSVP requests */
              <>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-soft)', paddingBottom: '0.5rem' }}>
                  Reserve Your Seat
                </h3>

                {formErrors.submitError && (
                  <div className="alert alert-danger" role="alert">
                    ⚠️ {formErrors.submitError}
                  </div>
                )}

                <form onSubmit={handleRsvpSubmit} aria-label="RSVP Registration Form">
                  <div className="form-group">
                    <label htmlFor="rsvp-name">Full Name</label>
                    <input 
                      type="text" 
                      id="rsvp-name"
                      name="name"
                      className="form-control"
                      placeholder="e.g. Abu Bakar"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={submitting || isSoldOut}
                    />
                    {formErrors.name && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-email">Student Email (@namal.edu.pk)</label>
                    <input 
                      type="email" 
                      id="rsvp-email"
                      name="email"
                      className="form-control"
                      placeholder="e.g. username@namal.edu.pk"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={submitting || isSoldOut}
                    />
                    {formErrors.email && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-reg">Registration Number</label>
                    <input 
                      type="text" 
                      id="rsvp-reg"
                      name="regNumber"
                      className="form-control"
                      placeholder="e.g. NUM-BSCS-2022-41"
                      value={formData.regNumber}
                      onChange={handleInputChange}
                      disabled={submitting || isSoldOut}
                    />
                    {formErrors.regNumber && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.regNumber}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={submitting || isSoldOut}
                    style={{ marginTop: '0.5rem' }}
                  >
                    {isSoldOut ? 'Sold Out' : submitting ? 'Processing RSVP...' : 'Submit RSVP'}
                  </button>
                </form>
              </>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
