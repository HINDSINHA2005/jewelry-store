
import HeroSection from "../components/home/HeroSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedProducts from "../components/home/FeatureProducts";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChoose";
import TrendingCarousel from "../components/home/TrendingCarousel";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <Testimonials />
      <WhyChooseUs />
       <Newsletter />
      <TrendingCarousel />
    </div>
  );
};

export default Home;
