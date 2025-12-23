import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import MachineryCard from '../components/MachineryCard';
import { getAllMachineries } from '../lib/api';

type VehiclesPageProps = {
  onEnquire: (machinery: any) => void;
};

interface Machinery {
  id: number;
  title: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

interface ApiResponse {
  data: Machinery[];
  total: number;
  page: number;
  limit: number;
}

export default function VehiclesPage({ onEnquire }: VehiclesPageProps) {
  const [machinery, setMachinery] = useState<Machinery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchMachinery();
  }, [currentPage, searchTerm, selectedStatus]);

  const fetchMachinery = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await getAllMachineries({
        page: currentPage,
        limit: itemsPerPage,
        title: searchTerm,
        status: selectedStatus
      });
      
      setMachinery(response.data);
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching machinery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when changing pages
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">Our Fleet</h1>
          <p className="text-lg text-gray-600">Browse our complete range of heavy machinery</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Search Machinery
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by title..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

          {/* </div> */}

          {/* Results Summary and Reset */}
          <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-dark">{machinery.length}</span> of{' '}
              <span className="font-semibold text-dark">{totalItems}</span> machines
              {currentPage > 1 && (
                <span className="ml-2 text-gray-500">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
            <button
              onClick={resetFilters}
              className="text-primary hover:text-yellow-600 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading machinery...</p>
          </div>
        ) : machinery.length > 0 ? (
          <>
            {/* Machinery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {machinery.map((machine) => (
                <MachineryCard
                  key={machine.id}
                  machinery={machine}
                  onEnquire={onEnquire}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-xl text-gray-600 mb-2">No machines found</p>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
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
