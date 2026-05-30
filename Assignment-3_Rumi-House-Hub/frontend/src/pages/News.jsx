import React, { useState, useEffect } from 'react';
import { getNews } from '../api/api';
import NewsCard from '../components/NewsCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal Overlay States
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch news articles from Express backend on mount
  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError('');
        const data = await getNews();
        setNews(data);
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve news bulletins from the memory server. Please verify your connection status.');
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Keep article in state during exit transition
  };

  return (
    <section>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>📰 Rumi House Bulletins & Newsletters</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Keep up with recent house announcements, sports bulletins, and social impact outreach reviews 
          compiled by the Rumi Writing Club editorial board.
        </p>
      </header>

      {/* Backend API latency errors */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Main articles grid */}
      {loading ? (
        <LoadingState count={3} />
      ) : news.length === 0 ? (
        <EmptyState 
          message="No seasonal news bulletins or publications are currently archived."
          actionLabel="Refresh News"
          onAction={() => window.location.reload()}
        />
      ) : (
        <div className="grid-3">
          {news.map((item) => (
            <NewsCard 
              key={item.id} 
              newsItem={item} 
              onReadMore={() => handleOpenArticle(item)}
            />
          ))}
        </div>
      )}

      {/* Overlay reader modal popup for article details */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedArticle ? selectedArticle.title : ''}
      >
        {selectedArticle && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-soft)', paddingBottom: '0.5rem' }}>
              <span>✍️ Written By: <strong>{selectedArticle.author}</strong></span>
              <span>📅 Published: <strong>{new Date(selectedArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
            </div>
            
            <p style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--namal-green-dark)', lineHeight: '1.5', marginBottom: '1.25rem', padding: '0.75rem 1rem', backgroundColor: 'var(--namal-green-light)', borderRadius: 'var(--radius-normal)' }}>
              {selectedArticle.summary}
            </p>
            
            <div style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
              {selectedArticle.content}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
