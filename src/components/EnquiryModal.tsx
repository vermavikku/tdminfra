import { X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Button from './Button';
import { submitEnquiry } from '../lib/api';

type Machinery = {
  id: number;
  title: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
};

type EnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedMachine?: Machinery | null;
};

export default function EnquiryModal({ isOpen, onClose, selectedMachine }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || (selectedMachine ? `Enquiry about ${selectedMachine.title}` : ''),
        machinery_id: selectedMachine?.id,
        machine_type: selectedMachine ? selectedMachine.title : '',
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark text-white p-6 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold">Enquire Now</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

         {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm">
                Thank you! Your enquiry has been submitted successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">
                Sorry, there was an error submitting your enquiry. Please try again.
              </div>
          )}

        <div className="p-6">
          {selectedMachine && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">Enquiring about:</p>
              <p className="font-bold text-dark">{selectedMachine.title}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Message <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Any specific requirements or questions..."
              />
            </div> */}


            <Button
              type="submit"
              variant="primary"
              className="w-full"
              onClick={undefined}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
