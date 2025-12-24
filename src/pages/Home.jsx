

import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedProducts from "../components/home/FeatureProducts";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChoose";
import TrendingCarousel from "../components/home/TrendingCarousel";

import Hero from '../components/home/hero.jsx'


const Home = () => {
  return (
    <div>
      
      <Hero/>
      <CategoryShowcase />
      
      <FeaturedProducts />
      <Testimonials />
      
      <WhyChooseUs />
       {/* <Newsletter /> */}
      <TrendingCarousel />
    </div>
  );
};

export default Home;
