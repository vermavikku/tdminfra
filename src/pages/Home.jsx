import Hero from '../components/sections/Hero/Hero'
import About from '../components/sections/About/About'
import WhyRM from '../components/sections/WhyRM/WhyRM'
import Features from '../components/sections/Features'
import EquipmentGrid from '../components/sections/EquipmentGrid'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials/Testimonials'
import CTA from '../components/sections/CTA'
import FAQs from '../components/sections/FAQs'

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <WhyRM />
      <Features />
      <EquipmentGrid compact />
      <Gallery />
      <Testimonials />
      <CTA />
      <FAQs />
    </>
  )
}

export default Home
