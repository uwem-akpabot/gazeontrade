import Header from '../_layouts/public/Header';
import Hero from '../_layouts/public/Hero';
import NewsletterPopup from '../_layouts/public/NewsletterPopup';
import Footer from '../_layouts/public/Footer';
import CategoriesSlider from '../_modules/public/homepage/CategoriesSlider';
import FeaturedProducts from '../_modules/public/homepage/FeaturedProducts';
import PopularProducts from '../_modules/public/homepage/PopularProducts';
import SideSection from '../_layouts/public/SideSection';
import ContentSection from '../_layouts/public/ContentSection';

const Home = (props) => {
  return (
    <>
    <header className="header-section">
        <div className="header-top">
            <div className="container">
                <div className="ht-left">
                    <div className="mail-service">
                        <i className=" fa fa-envelope"></i>
                        hello@gmail.com
                    </div>
                    <div className="phone-service">
                        <i className=" fa fa-phone"></i>
                        +65 11.188.888
                    </div>
                </div>
                <div className="ht-right">
                    <a href="#" className="login-panel"><i className="fa fa-user"></i>Login</a>
                    
                    <div className="top-social">
                        <a href="#"><i className="ti-facebook"></i></a>
                        <a href="#"><i className="ti-twitter-alt"></i></a>
                        <a href="#"><i className="ti-linkedin"></i></a>
                        <a href="#"><i className="ti-pinterest"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="inner-header">
                <div className="row">
                    <div className="col-lg-2 col-md-2">
                        <div className="logo">
                            <a href="">
                                {props.company}
                            </a>
                        </div>
                        <div className="flex">
                            <a href="#" className="btn btn-primary text-white">Fashion</a>
                            <a href="#" className="btn btn-primary text-white">Electronics</a>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right col-md-3">
                        <ul className="nav-right">
                            <li className="heart-icon"><a href="#">
                                    <i className="icon_heart_alt"></i>
                                    <span>1</span>
                                </a>
                            </li>
                            <li className="cart-icon"><a href="#">
                                    <i className="icon_bag_alt"></i>
                                    <span>3</span>
                                </a>
                                <div className="cart-hover">
                                    <div className="select-items">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="si-pic"><img src="img/select-product-1.jpg" alt="" /></td>
                                                    <td className="si-text">
                                                        <div className="product-selected">
                                                            <p>$60.00 x 1</p>
                                                            <h6>Kabino Bedside Table</h6>
                                                        </div>
                                                    </td>
                                                    <td className="si-close">
                                                        <i className="ti-close"></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="si-pic"><img src="img/select-product-2.jpg" alt="" /></td>
                                                    <td className="si-text">
                                                        <div className="product-selected">
                                                            <p>$60.00 x 1</p>
                                                            <h6>Kabino Bedside Table</h6>
                                                        </div>
                                                    </td>
                                                    <td className="si-close">
                                                        <i className="ti-close"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="select-total">
                                        <span>total:</span>
                                        <h5>$120.00</h5>
                                    </div>
                                    <div className="select-button">
                                        <a href="#" className="primary-btn view-card">VIEW CARD</a>
                                        <a href="#" className="primary-btn checkout-btn">CHECK OUT</a>
                                    </div>
                                </div>
                            </li>
                            <li className="cart-price">$150.00</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-item">
            <div className="container">
                <nav className="nav-menu mobile-menu">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Bids</a></li>
                        <li><a href="#">Offers</a>
                            <ul className="dropdown">
                                <li><a href="#">Men's</a></li>
                                <li><a href="#">Women's</a></li>
                                <li><a href="#">Kid's</a></li>
                            </ul>
                        </li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>
    </header>
    
    <section className="product-shop spad">
        <div className="container">
            <div className="row">
                
                <SideSection />
                <ContentSection />

            </div>
        </div>
    </section>

    <Footer />

    
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