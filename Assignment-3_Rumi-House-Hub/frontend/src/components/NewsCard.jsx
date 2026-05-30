import React from 'react';

export default function NewsCard({ newsItem, onReadMore }) {
  const { id, title, category, date, author, summary } = newsItem;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="card" id={`news-card-${id}`} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span className="badge badge-literary" style={{ margin: 0, textTransform: 'capitalize' }}>
          📰 {category}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {formattedDate}
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', minHeight: '3rem' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: '1' }}>
        {summary}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-soft)', paddingTop: '0.75rem', marginTop: 'auto' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-muted)' }}>
          ✍️ By {author}
        </span>
        <button 
          className="btn btn-outline" 
          onClick={onReadMore}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 'bold' }}
        >
          Read Article
        </button>
      </div>
    </article>
  );
}
