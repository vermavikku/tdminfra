import { CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';
import type { Machinery } from '../lib/supabase';

type MachineryCardProps = {
  machinery: Machinery;
  onEnquire: (machinery: Machinery) => void;
};

export default function MachineryCard({ machinery, onEnquire }: MachineryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img
          src={machinery.image_url}
          alt={machinery.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          {machinery.is_available ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>Available</span>
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <XCircle className="h-4 w-4" />
              <span>Unavailable</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2">{machinery.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{machinery.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-darkGray mb-2">Key Specs:</h4>
          <ul className="space-y-1">
            {Object.entries(machinery.specs).slice(0, 3).map(([key, value]) => (
              <li key={key} className="text-sm text-gray-600 flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  <span className="font-medium capitalize">{key}:</span> {String(value)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Daily Rate</p>
            <p className="text-2xl font-bold text-primary">
              ${machinery.price_per_day}
              <span className="text-sm text-gray-500 font-normal">/day</span>
            </p>
          </div>
          <Button variant="primary" onClick={() => onEnquire(machinery)}>
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
