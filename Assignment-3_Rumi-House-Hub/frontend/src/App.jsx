import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Societies from './pages/Societies';
import SocietyDetail from './pages/SocietyDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import News from './pages/News';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/societies/:id" element={<SocietyDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
