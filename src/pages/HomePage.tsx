import { useEffect, useState } from 'react';
import { Shield, Clock, Wrench, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import MachineryCard from '../components/MachineryCard';
import { supabase, type Machinery } from '../lib/supabase';

type HomePageProps = {
  onNavigate: (page: string) => void;
  onEnquire: (machinery: Machinery) => void;
};

export default function HomePage({ onNavigate, onEnquire }: HomePageProps) {
  const [featuredMachines, setFeaturedMachines] = useState<Machinery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMachines();
  }, []);

  const fetchFeaturedMachines = async () => {
    try {
      const { data, error } = await supabase
        .from('machinery')
        .select('*')
        .eq('featured', true)
        .limit(3);

      if (error) throw error;
      setFeaturedMachines(data || []);
    } catch (error) {
      console.error('Error fetching featured machines:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Reliable Heavy Machinery Rentals
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-primary font-semibold">
            Powerful Machines. Trusted Service.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('vehicles')}
            className="group"
          >
            Browse Machines
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">About Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With over 15 years of experience, we provide top-quality heavy machinery rentals
              to construction companies, contractors, and infrastructure projects. Our fleet is
              maintained to the highest standards, ensuring reliability and safety on every job site.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">
              We deliver excellence in every aspect of our service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Shield className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Reliable Machines</h3>
              <p className="text-gray-600">
                All equipment is regularly inspected, maintained, and certified for safe operation.
                We guarantee operational reliability.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Clock className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock technical support and emergency assistance. We're always here
                when you need us most.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Wrench className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Affordable Pricing</h3>
              <p className="text-gray-600">
                Competitive rates with flexible rental terms. No hidden fees, transparent pricing
                for all our equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4">Featured Machines</h2>
            <p className="text-lg text-gray-600">
              Explore our most popular heavy machinery rentals
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : featuredMachines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMachines.map((machine) => (
                <MachineryCard
                  key={machine.id}
                  machinery={machine}
                  onEnquire={onEnquire}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-600 mb-4">No featured machines available at the moment.</p>
              <Button onClick={() => onNavigate('vehicles')}>View All Machines</Button>
            </div>
          )}

          {featuredMachines.length > 0 && (
            <div className="text-center mt-12">
              <Button onClick={() => onNavigate('vehicles')} variant="outline" size="lg">
                View All Machines
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
