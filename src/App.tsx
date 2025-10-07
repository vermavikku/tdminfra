import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import type { Machinery } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machinery | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquire = (machinery: Machinery) => {
    setSelectedMachine(machinery);
    setIsEnquiryModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onEnquire={handleEnquire} />;
      case 'vehicles':
        return <VehiclesPage onEnquire={handleEnquire} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onEnquire={handleEnquire} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          setSelectedMachine(null);
        }}
        selectedMachine={selectedMachine}
      />
    </div>
  );
}

export default App;
