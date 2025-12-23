import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Truck } from 'lucide-react';
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

export default function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default fallback values
  const defaultPhones = ['+1 (555) 123-4567', '+1 (555) 987-6543'];
  const defaultEmails = ['info@heavyrent.com'];
  const defaultAddress = '1234 Industrial Blvd, Suite 100\nConstruction City, CC 12345';
  const defaultBusinessHours = {
    type: '24/7'
  };

  // Use profile data if available, otherwise use defaults
  const phones = profile?.phones || defaultPhones;
  const emails = profile?.emails || defaultEmails;
  const address = profile?.address || defaultAddress;
  const businessHours = profile?.business_hours || defaultBusinessHours;
  
  // Parse business_hours JSON string if needed
  let businessHoursType = defaultBusinessHours.type;
  if (typeof businessHours === 'string') {
    try {
      const parsed = JSON.parse(businessHours);
      businessHoursType = parsed.type || defaultBusinessHours.type;
    } catch (e) {
      businessHoursType = defaultBusinessHours.type;
    }
  } else if (businessHours && typeof businessHours === 'object') {
    businessHoursType = businessHours.type || defaultBusinessHours.type;
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/vehicles', label: 'Our Machineries' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {profile?.logo_url ? (
                // ✅ ONLY LOGO
                  <img
                    src={getFullImageUrl(profile.logo_url)}
                    alt="Company Logo"
                    className="object-contain"
                    style={{height:"75px",width:"100px"}}
                  />
              ) : (
                // ✅ FULL FALLBACK (ALL)
                <>
                  <div className="bg-primary p-2 rounded-lg">
                    <Truck className="h-6 w-6 text-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">HeavyRent</h3>
                    <p className="text-xs text-primary">Machinery Rentals</p>
                  </div>
                </>
              )}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for heavy machinery rentals. We provide
              reliable, well-maintained equipment with professional support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-primary transition-colors capitalize"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  {loading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-600 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                    </div>
                  ) : (
                    phones.map((phone, index) => (
                      <p key={index} className="text-gray-400 text-sm">
                        {phone}
                      </p>
                    ))
                  )}
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  {loading ? (
                    <div className="h-4 bg-gray-600 rounded w-24 animate-pulse"></div>
                  ) : (
                    emails.map((email, index) => (
                      <p key={index} className="text-gray-400 text-sm">
                        {email}
                      </p>
                    ))
                  )}
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  {loading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-600 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-28 animate-pulse"></div>
                    </div>
                  ) : (
                    address.split("\n").map((line, index) => (
                      <p key={index} className="text-gray-400 text-sm">
                        {line}
                      </p>
                    ))
                  )}
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  {loading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-600 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-24 animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-400 text-sm">
                        Business Hours: {businessHoursType}
                      </p>
                      <p className="text-primary text-sm font-semibold">
                        24/7 Emergency Support
                      </p>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} tdminfra Machinery Rentals. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
