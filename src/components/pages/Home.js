import Header from '../_layouts/public/Header';
import Hero from '../_layouts/public/Hero';
import NewsletterPopup from '../_layouts/public/NewsletterPopup';
import Footer from '../_layouts/public/Footer';
import CategoriesSlider from '../_modules/public/homepage/CategoriesSlider';
import FeaturedProducts from '../_modules/public/homepage/FeaturedProducts';
import PopularProducts from '../_modules/public/homepage/PopularProducts';

const Home = (props) => {
  return (
    <>
      <Header company={props.company} />
      <Hero />

      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Categories</h2>
              </div>
            </div>
          </div>          
            <CategoriesSlider />
        </div>
      </section>

      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Products</h2>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            <FeaturedProducts />
          </div>
        </div>
      </section>

      <div class="banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="banner__pic">
                        <img src="img/banner/banner-1.jpg" alt="" />
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="banner__pic">
                        <img src="img/banner/banner-2.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Popular Products</h2>
              </div>
            </div>
          </div>          
            <PopularProducts />
        </div>
      </section>

      <NewsletterPopup />

      <br />
      <Footer company={props.company} />
    </>
  );
};
export default Home;