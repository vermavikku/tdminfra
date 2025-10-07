import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import MachineryCard from '../components/MachineryCard';
import { supabase, type Machinery } from '../lib/supabase';

type VehiclesPageProps = {
  onEnquire: (machinery: Machinery) => void;
};

export default function VehiclesPage({ onEnquire }: VehiclesPageProps) {
  const [machinery, setMachinery] = useState<Machinery[]>([]);
  const [filteredMachinery, setFilteredMachinery] = useState<Machinery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    fetchMachinery();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [machinery, searchTerm, selectedType, selectedAvailability, priceRange]);

  const fetchMachinery = async () => {
    try {
      const { data, error } = await supabase
        .from('machinery')
        .select('*')
        .order('name');

      if (error) throw error;
      setMachinery(data || []);
    } catch (error) {
      console.error('Error fetching machinery:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...machinery];

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((m) => m.type === selectedType);
    }

    if (selectedAvailability === 'available') {
      filtered = filtered.filter((m) => m.is_available);
    } else if (selectedAvailability === 'unavailable') {
      filtered = filtered.filter((m) => !m.is_available);
    }

    if (priceRange !== 'all') {
      filtered = filtered.filter((m) => {
        const price = m.price_per_day;
        switch (priceRange) {
          case 'low':
            return price < 500;
          case 'medium':
            return price >= 500 && price <= 1000;
          case 'high':
            return price > 1000;
          default:
            return true;
        }
      });
    }

    setFilteredMachinery(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedAvailability('all');
    setPriceRange('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-72 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Our Fleet</h1>
          <p className="text-xl text-primary">Browse our complete range of heavy machinery</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-bold text-dark">Filter & Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or keyword..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Machine Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="excavator">Excavator</option>
                <option value="crane">Crane</option>
                <option value="loader">Loader</option>
                <option value="dump_truck">Dump Truck</option>
                <option value="bulldozer">Bulldozer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $500/day</option>
                <option value="medium">$500 - $1000/day</option>
                <option value="high">Over $1000/day</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-dark">{filteredMachinery.length}</span> of{' '}
              <span className="font-semibold text-dark">{machinery.length}</span> machines
            </p>
            <button
              onClick={resetFilters}
              className="text-primary hover:text-yellow-600 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading machinery...</p>
          </div>
        ) : filteredMachinery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMachinery.map((machine) => (
              <MachineryCard
                key={machine.id}
                machinery={machine}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-xl text-gray-600 mb-2">No machines found</p>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={resetFilters}
              className="text-primary hover:text-yellow-600 font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
