import { useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    machine_type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Machine Type: ${formData.machine_type}\n\n${formData.message}`,
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        machine_type: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary">Get in touch with our team</p>
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Machine Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.machine_type}
                  onChange={(e) => setFormData({ ...formData, machine_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a machine type</option>
                  <option value="excavator">Excavator</option>
                  <option value="crane">Crane</option>
                  <option value="loader">Loader</option>
                  <option value="dump_truck">Dump Truck</option>
                  <option value="bulldozer">Bulldozer</option>
                  <option value="other">Other / General Inquiry</option>
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
                <div>
                  <h3 className="font-bold text-dark mb-2">Phone</h3>
                  <p className="text-gray-600">Main: +1 (555) 123-4567</p>
                  <p className="text-gray-600">Support: +1 (555) 987-6543</p>
                  <p className="text-primary font-semibold mt-1">24/7 Emergency Line</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-2">Email</h3>
                  <p className="text-gray-600">info@heavyrent.com</p>
                  <p className="text-gray-600">support@heavyrent.com</p>
                  <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-2">Address</h3>
                  <p className="text-gray-600">1234 Industrial Blvd, Suite 100</p>
                  <p className="text-gray-600">Construction City, CC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 8:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                  <p className="text-primary font-semibold mt-2">Emergency Support: 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959872000!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="HeavyRent Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
