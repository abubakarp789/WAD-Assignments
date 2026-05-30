import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>🕌 Rumi House Hub</h3>
            <p>
              A unified digital engagement portal for student societies and house activities, 
              fostering leadership, co-curricular collaboration, and active citizenship.
            </p>
          </div>
          
          <div className="footer-context">
            <h4>Academic Context</h4>
            <p><strong>Course:</strong> Web Application Development (CS-370)</p>
            <p><strong>Student:</strong> Abu Bakar (NUM-BSCS-2022-41)</p>
            <p><strong>Institution:</strong> Namal University, Mianwali</p>
          </div>
          
          <div className="footer-context">
            <h4>Academic Honesty</h4>
            <p style={{ fontStyle: 'italic', fontSize: '0.85rem', lineHeight: '1.4', maxWidth: '350px' }}>
              "The green and gold visual elements are custom choices designed to build a 
              Namal-inspired academic branding palette that reflects the university's 
              co-curricular and environmental spirit."
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Rumi House Hub. Prepared for Web Application Development evaluation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
