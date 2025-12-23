import { useState, useEffect } from 'react';
import { Menu, X, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getProfile, getFullImageUrl } from '../lib/api';

interface Profile {
  id: number;
  phones: string[];
  emails: string[];
  address?: string;
  business_hours?: any;
  logo_url?: string;
  created_at: string;
  updated_at?: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'vehicles', label: 'Machineries', path: '/vehicles' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/vehicles') return 'vehicles';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const currentPage = getCurrentPage();

  return (
    <header className="sticky top-0 z-50 bg-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            {profile?.logo_url ? (
              // ✅ ONLY LOGO
              <img
                src={getFullImageUrl(profile.logo_url)}
                alt="Company Logo"
                className="object-contain"
                style={{height:"50px",width:"75px"}}
              />
            ) : (
              // ✅ FULL FALLBACK (ALL)
              <>
                <div className="bg-primary p-2 rounded-lg">
                  <Truck className="h-8 w-8 text-dark" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">HeavyRent</h1>
                  <p className="text-xs text-primary">Machinery Rentals</p>
                </div>
              </>
            )}
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-6 py-2 rounded transition-all duration-300 font-semibold ${
                  currentPage === item.id
                    ? 'bg-primary text-dark'
                    : 'text-white hover:bg-darkGray hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-darkGray border-t border-gray-700">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-dark'
                    : 'text-white hover:bg-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
