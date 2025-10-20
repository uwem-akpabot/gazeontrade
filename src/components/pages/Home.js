import Header from '../_layouts/public/Header';
import Hero from '../_layouts/public/Hero';
import NewsletterPopup from '../_layouts/public/NewsletterPopup';
import Footer from '../_layouts/public/Footer';
import CategoriesSlider from '../_modules/public/homepage/CategoriesSlider';
import FeaturedProducts from '../_modules/public/homepage/FeaturedProducts';
import PopularProducts from '../_modules/public/homepage/PopularProducts';
import LiveSection from '../_layouts/public/LiveSection';

const Home = (props) => {
  return (
    <>

    <LiveSection />

    
      {/* <Header company={props.company} />
      <Hero />

      <CategoriesSlider />
  
      <FeaturedProducts />
      <PopularProducts />

      <NewsletterPopup />
      <Footer company={props.company} /> */}
    </>
  );
};
export default Home;