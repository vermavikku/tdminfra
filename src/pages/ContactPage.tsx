import { useState, useEffect, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '../components/Button';
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

interface Machinery {
  id: number;
  title: string;
  status: string;
}

export default function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [machineries, setMachineries] = useState<Machinery[]>([]);
  const [machineriesLoading, setMachineriesLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    machinery_id: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchMachineries();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchMachineries = async () => {
    try {
      const API_BASE = import.meta.env.VITE_TDMINFRA_BACKEND_URL ?? 'http://localhost:3000';
      const response = await fetch(`${API_BASE}/machineries?limit=100&status=active`);
      const data = await response.json();
      
      // Filter active machineries only
      const activeMachineries = data.data.filter((m: Machinery) => m.status === 'ACTIVE');
      setMachineries(activeMachineries);
    } catch (error) {
      console.error('Error fetching machineries:', error);
    } finally {
      setMachineriesLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (digitsOnly.length <= 10) {
      setFormData({ ...formData, phone: digitsOnly });
      setPhoneError('');
    } else {
      setPhoneError('Phone number must be exactly 10 digits');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (formData.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const API_BASE = import.meta.env.VITE_TDMINFRA_BACKEND_URL ?? 'http://localhost:3000';
      
      // Submit to backend API
      const response = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          machinery_id: formData.machinery_id ? parseInt(formData.machinery_id) : null,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        machinery_id: '',
        message: '',
      });
      setPhoneError('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-72 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center space-x-4">
            {/* {profile?.logo_url && (
              <img
                src={getFullImageUrl(profile.logo_url)}
                alt="Company Logo"
                className="h-12 w-12 object-contain rounded-lg bg-white p-1"
              />
            )} */}
            <div>
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-primary">Get in touch with our team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
              For urgent inquiries, please call our 24/7 support line.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      phoneError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234567890"
                    maxLength={10}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-dark mb-2">
                  Machine Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.machinery_id}
                  onChange={(e) => setFormData({ ...formData, machinery_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select a machine type</option>
                  {machineriesLoading ? (
                    <option value="" disabled>Loading machineries...</option>
                  ) : (
                    machineries.map((machinery) => (
                      <option key={machinery.id} value={machinery.id}>
                        {machinery.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Tell us about your project requirements, timeline, and any specific questions..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for contacting us! We'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  Sorry, there was an error submitting your message. Please try again or call us directly.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={undefined}
                disabled={isSubmitting || machineriesLoading}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Contact Information</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-dark mb-2">Phone</h3>
                  {profileLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      {phones.map((phone, index) => (
                        <p key={index} className="text-gray-600">{phone}</p>
                      ))}
                      <p className="text-primary font-semibold mt-1">24/7 Emergency Line</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-dark mb-2">Email</h3>
                  {profileLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      {emails.map((email, index) => (
                        <p key={index} className="text-gray-600">{email}</p>
                      ))}
                      <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-dark mb-2">Address</h3>
                  {profileLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
                    </div>
                  ) : (
                    address.split('\n').map((line, index) => (
                      <p key={index} className="text-gray-600">{line}</p>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-dark mb-2">Business Hours</h3>
                  {profileLoading ? (
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600">Business Hours: {businessHoursType}</p>
                      <p className="text-primary font-semibold mt-2">Emergency Support: 24/7</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
