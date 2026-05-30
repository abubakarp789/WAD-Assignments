import React, { useState, useEffect } from 'react';
import { getSocieties } from '../api/api';
import SocietyCard from '../components/SocietyCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const CATEGORIES = ['All', 'Literary', 'Arts', 'Social', 'Technical', 'Sports'];

export default function Societies() {
  const [societies, setSocieties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch societies from backend whenever the selected category changes
  useEffect(() => {
    async function loadSocieties() {
      try {
        setLoading(true);
        setError('');
        const categoryFilter = selectedCategory === 'All' ? '' : selectedCategory.toLowerCase();
        const data = await getSocieties(categoryFilter);
        setSocieties(data);
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve societies directory from backend. Please verify your Express server is running.');
      } finally {
        setLoading(false);
      }
    }
    loadSocieties();
  }, [selectedCategory]);

  // Client-side filtering for search query input
  const filteredSocieties = societies.filter(soc => 
    soc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    soc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <section>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>👥 Rumi House & Namal Societies</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Explore our diverse catalog of active university societies and internal Rumi House clubs. 
          Find your passion, collaborate with peers, and make an impact.
        </p>
      </header>

      {/* Interactive Search and Filter Container */}
      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Search clubs and societies by name or keyword..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Societies"
          />
        </div>
        
        <div className="filter-capsules" aria-label="Filter by Category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-capsule ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Backend error handling display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Main societies grid loading display */}
      {loading ? (
        <LoadingState count={6} />
      ) : filteredSocieties.length === 0 ? (
        <EmptyState 
          message="No active clubs or societies match your current search or category selections."
          onAction={handleClearFilters}
        />
      ) : (
        <div className="grid-3">
          {filteredSocieties.map((soc) => (
            <SocietyCard key={soc.id} society={soc} />
          ))}
        </div>
      )}
    </section>
  );
}
