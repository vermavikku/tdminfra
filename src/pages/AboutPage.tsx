import { Shield, Clock, Wrench, Award, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-primary">
            Your trusted partner in heavy machinery rentals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2008, HeavyRent has grown from a small local equipment rental
                business to one of the region's most trusted providers of heavy machinery.
                Our journey began with a simple mission: to provide construction companies
                and contractors with reliable, well-maintained equipment and exceptional service.
              </p>
              <p>
                Today, we operate a modern fleet of over 200 machines, serving hundreds of
                projects across the region. Our success is built on the foundation of trust,
                reliability, and a deep understanding of our customers' needs.
              </p>
              <p>
                We continuously invest in the latest equipment technology and maintenance
                practices to ensure that every machine we rent meets the highest standards
                of safety and performance. Our team of experienced professionals is committed
                to supporting your projects from start to finish.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className="h-48 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800')",
              }}
            ></div>
            <div
              className="h-48 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/257763/pexels-photo-257763.jpeg?auto=compress&cs=tinysrgb&w=800')",
              }}
            ></div>
            <div
              className="h-48 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=800')",
              }}
            ></div>
            <div
              className="h-48 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/162539/architecture-building-construction-work-162539.jpeg?auto=compress&cs=tinysrgb&w=800')",
              }}
            ></div>
          </div>
        </div>

        <div className="bg-dark text-white rounded-2xl p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To empower construction projects with reliable heavy machinery, exceptional
                service, and innovative solutions that drive efficiency and success. We strive
                to be the first choice for contractors who demand quality and dependability.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To be the leading heavy machinery rental provider in the region, recognized
                for our commitment to safety, innovation, and customer success. We envision
                a future where every project has access to the best equipment and support.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Shield className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Reliable Machines</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece of equipment undergoes rigorous inspection and maintenance.
                We guarantee operational reliability with regular servicing and certified
                safety standards. Our machines are ready when you need them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Clock className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is available around the clock to assist with
                technical issues, emergency replacements, or any questions. We understand
                that construction doesn't follow a 9-to-5 schedule.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Wrench className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Affordable Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive rates with flexible rental terms to match your project timeline
                and budget. No hidden fees, transparent pricing, and volume discounts for
                long-term rentals. Get the equipment you need without breaking the bank.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Award className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Industry Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                With over 15 years in the industry, our team brings deep knowledge and
                experience to every rental. We understand the unique requirements of
                different projects and provide expert guidance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Users className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Customer First</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our priority. We work closely with each client to understand
                their needs and provide personalized solutions. Our high customer retention
                rate speaks to our commitment to excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <TrendingUp className="h-8 w-8 text-dark" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Modern Fleet</h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously update our fleet with the latest models featuring advanced
                safety features, fuel efficiency, and enhanced productivity. Access to
                cutting-edge equipment gives your projects a competitive advantage.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">
            Ready to Power Your Next Project?
          </h2>
          <p className="text-dark text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied contractors who trust HeavyRent for their
            heavy machinery needs. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="inline-block bg-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-darkGray transition-colors"
            >
              Call Us Now
            </a>
            <a
              href="mailto:info@heavyrent.com"
              className="inline-block bg-white text-dark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
