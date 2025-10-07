import { Phone, Mail, MapPin, Clock, Truck } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Truck className="h-6 w-6 text-dark" />
              </div>
              <div>
                <h3 className="text-lg font-bold">HeavyRent</h3>
                <p className="text-xs text-primary">Machinery Rentals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for heavy machinery rentals. We provide reliable,
              well-maintained equipment with professional support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'vehicles', 'about', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-gray-400 hover:text-primary transition-colors capitalize"
                  >
                    {page === 'vehicles' ? 'Our Vehicles' : page === 'about' ? 'About Us' : page === 'contact' ? 'Contact Us' : 'Home'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">+1 (555) 987-6543</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">info@heavyrent.com</p>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  1234 Industrial Blvd, Suite 100<br />
                  Construction City, CC 12345
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Mon-Fri: 7:00 AM - 6:00 PM</p>
                  <p className="text-gray-400 text-sm">Sat: 8:00 AM - 4:00 PM</p>
                  <p className="text-primary text-sm font-semibold">24/7 Emergency Support</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} HeavyRent Machinery Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
