import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { useState } from 'react';
import type { Machinery } from './lib/api';

function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machinery | null>(null);

  const handleEnquire = (machinery: Machinery) => {
    setSelectedMachine(machinery);
    setIsEnquiryModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onEnquire={handleEnquire} />} />
            <Route path="/vehicles" element={<VehiclesPage onEnquire={handleEnquire} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage onEnquire={handleEnquire} />} />
          </Routes>
        </main>
        <Footer />
        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={() => {
            setIsEnquiryModalOpen(false);
            setSelectedMachine(null);
          }}
          selectedMachine={selectedMachine}
        />
      </div>
    </Router>
  );
}

export default App;
