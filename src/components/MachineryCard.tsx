import Button from "./Button";
import { getFullImageUrl } from "../lib/api";

type MachineryCardProps = {
  machinery: any;
  onEnquire: (machinery: any) => void;
};

export default function MachineryCard({
  machinery,
  onEnquire,
}: MachineryCardProps) {
  // Check if machinery has status property and determine availability
  const hasStatus = machinery?.status;
  const isAvailable = hasStatus ? machinery.status === 'ACTIVE' : true;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img
          src={getFullImageUrl(machinery.image_url)}
          alt={machinery.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge - Top Right Corner */}
        {hasStatus && (
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isAvailable ? 'Available' : 'Not Available'}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2">
          {machinery.title}
        </h3>

        {/* Bottom section fully clickable */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={() => onEnquire(machinery)}
            className="w-full"
          >
            Enquiry Now
          </Button>
        </div>
      </div>
    </div>
  );
}
