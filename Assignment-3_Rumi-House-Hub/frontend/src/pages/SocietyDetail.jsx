import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSocietyById, joinSociety } from '../api/api';

export default function SocietyDetail() {
  const { id } = useParams();
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Registration Form State
  const [formData, setFormData] = useState({ name: '', email: '', regNumber: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch society by ID from backend API
  useEffect(() => {
    async function loadSociety() {
      try {
        setLoading(true);
        setError('');
        const data = await getSocietyById(id);
        setSociety(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Society not found.');
      } finally {
        setLoading(false);
      }
    }
    loadSociety();
  }, [id]);

  // Client-Side Input Validations
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!formData.email.toLowerCase().endsWith('@namal.edu.pk')) {
      errors.email = 'Email must be a valid student address ending with @namal.edu.pk.';
    }

    if (!formData.regNumber.trim()) {
      errors.regNumber = 'Registration Number is required.';
    } else {
      const regRegex = /^NUM-[A-Z]{3,4}-\d{4}-\d{1,3}$/i;
      if (!regRegex.test(formData.regNumber)) {
        errors.regNumber = 'Registration format must follow: NUM-DEPT-YYYY-ID (e.g. NUM-BSCS-2022-41).';
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const response = await joinSociety(id, formData);
      setSubmitSuccess(response.message || 'Successfully applied to join!');
      // Reset registration form inputs
      setFormData({ name: '', email: '', regNumber: '' });
      // Update local member count state to represent success immediately
      setSociety(prev => ({ ...prev, memberCount: prev.memberCount + 1 }));
    } catch (err) {
      console.error(err);
      setFormErrors({ submitError: err.message || 'An error occurred during submission.' });
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

  if (error || !society) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div className="alert alert-danger" role="alert" style={{ display: 'inline-block', maxWidth: '600px' }}>
          ⚠️ {error || 'Society details not found.'}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/societies" className="btn btn-primary">
            Back to Societies Directory
          </Link>
        </div>
      </div>
    );
  }

  // Generate some realistic co-curricular activity bullets based on categories
  const getCategoryActivities = (category) => {
    switch(category.toLowerCase()) {
      case 'literary':
        return [
          'Weekly structured debating circles and parliamentary simulations.',
          'Creative essay-writing contests and poetry recitation reviews.',
          'External declamation contest training and book review sessions.'
        ];
      case 'arts':
        return [
          'Classical visual calligraphic design workshops and canvas challenges.',
          'Stage layout enlivens and décor support layouts for student gala events.',
          'Exhibitions of seasonal art paintings and peer-critique boards.'
        ];
      case 'sports':
        return [
          'Intra-house cricket, football, basketball leagues and tournaments.',
          'Weekly tactical athletic practice drills and fitness challenges.',
          'Regional adventure hikes, wilderness trekking, and outward bounds.'
        ];
      case 'social':
        return [
          'Blood donation campaigns and primary neighborhood cleaning actions.',
          'Local primary school restoration volunteering and donation drives.',
          'Welfare outreach drives targeting underserved communities around Mianwali.'
        ];
      case 'technical':
      default:
        return [
          'Design thinking sprints and technological prototype builders.',
          'Weekly programming bootcamps and algorithmic solution reviews.',
          'Mentorship panels with university alumni and technology entrepreneurs.'
        ];
    }
  };

  return (
    <article>
      <Link to="/societies" style={{ display: 'inline-block', marginBottom: '1.5rem', fontWeight: '600' }}>
        ← Back to Directory
      </Link>

      {/* Society Details Header */}
      <header style={{ marginBottom: '2rem' }}>
        <span className={`badge badge-${society.category.toLowerCase()}`} style={{ fontSize: '0.85rem' }}>
          {society.type}
        </span>
        <h1 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{society.name}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Category: <strong style={{ textTransform: 'capitalize' }}>{society.category}</strong>
        </p>
      </header>

      {/* Two Column Layout details grid */}
      <div className="detail-layout">
        {/* Left Column: Core Descriptions and Activities */}
        <section className="detail-main">
          <h2>About Our Society</h2>
          <p style={{ fontSize: '1.05rem', marginBottom: '2rem' }}>
            {society.description}
          </p>
          
          <h2>Standard Core Activities</h2>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {getCategoryActivities(society.category).map((act, i) => (
              <li key={i} style={{ color: 'var(--text-muted)' }}>
                {act}
              </li>
            ))}
          </ul>

          <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '1.5rem' }}>
            <h2>Faculty and Executive Structure</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-normal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Patron In-Charge</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--namal-green)' }}>{society.patron}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-normal)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Society Coordinator</span>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--namal-green)' }}>{society.coordinator}</p>
              </div>
              {society.leads.map((lead, index) => (
                <div key={index} style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-normal)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Executive Lead</span>
                  <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--namal-green)' }}>{lead}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Sidebar info and mock join form */}
        <aside className="detail-sidebar">
          {/* Members count indicator */}
          <div className="sidebar-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>👥</span>
            <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0 0.25rem 0' }}>Current Member Headcount</h3>
            <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--namal-green)', margin: 0 }}>
              {society.memberCount}
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Students</span>
          </div>

          {/* Join Society mock validation form card */}
          <section className="sidebar-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-soft)', paddingBottom: '0.5rem' }}>
              Join This Society
            </h3>
            
            {submitSuccess && (
              <div className="alert alert-success" role="alert">
                ✅ {submitSuccess}
              </div>
            )}

            {formErrors.submitError && (
              <div className="alert alert-danger" role="alert">
                ⚠️ {formErrors.submitError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} aria-label="Join Society Form">
              <div className="form-group">
                <label htmlFor="student-name">Full Name</label>
                <input 
                  type="text" 
                  id="student-name"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Abu Bakar"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {formErrors.name && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="student-email">Namal Student Email</label>
                <input 
                  type="email" 
                  id="student-email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. username@namal.edu.pk"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {formErrors.email && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="student-reg">Registration Number</label>
                <input 
                  type="text" 
                  id="student-reg"
                  name="regNumber"
                  className="form-control"
                  placeholder="e.g. NUM-BSCS-2022-41"
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {formErrors.regNumber && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{formErrors.regNumber}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={submitting}
                style={{ marginTop: '0.5rem' }}
              >
                {submitting ? 'Submitting request...' : 'Submit Join Request'}
              </button>
            </form>
          </section>
        </aside>
      </div>
    </article>
  );
}
