import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import { API_BASE_URL } from './../../Main';
import ListCategories from '../../_modules/public/homepage/ListCategories';

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };
  
  useEffect(() => {
    let isMounted = true;

    axios.get('/api/banner')
      .then(res => {
        if (isMounted && res.status === 200) {
          setBanner(res.data.banner);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    axios.get('/api/list-categories').then(res => {
      if (isMounted){
        if (res.status === 200){
          setCategory(res.data.category);
          setLoading(false);
        } 
      }

    });
    return () => {
      isMounted = false;
    }

  }, []);

  // const showBannerList = banner.map((item, idx) => (
  //   <div key={idx} className="hero__item set-bg" 
  //     style={{ backgroundImage: `url(${API_BASE_URL}/${item?.image ?? ""})` }}>
  //     <div className="hero__text">
  //       <span className="primary-color">Quality Leather</span>
  //       <h2>{item?.caption ?? "No name"} <br />100% Quality</h2>
  //       <p>For Homes and Offices</p>
  //       <Link to="/collections" className="primary-btn primary-bg">SHOP NOW</Link>
  //     </div>
  //   </div>
  // ));

  return (
    <>
    <section className="hero">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="hero__categories">
                        <div className="hero__categories__all primary-bg">
                            <i className="fa fa-bars"></i>
                            <span>All categories</span>
                        </div>                        
                        <ListCategories />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="hero__search">
                        <div className="hero__search__form">
                            <form action="#">
                                {/* <div className="hero__search__categories">
                                    All Categories
                                    <span className="arrow_carrot-down"></span>
                                </div> */}
                                <input type="text" placeholder="I am shopping for ..." />
                                <button type="submit" className="site-btn primary-bg">SEARCH</button>
                            </form>
                        </div>
                        <div className="hero__search__phone">
                            <div className="hero__search__phone__icon">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="hero__search__phone__text">
                                <h5>0707-954-3570</h5>
                                <span>24/7 support</span>
                            </div>
                        </div>
                    </div>
                    
                    <Slider {...settings}>
                      {banner.map((item, idx) => {
                        const imageUrl = `${API_BASE_URL}/${item?.image ?? ""}`;
                        return (
                          <div key={idx}>
                            <div
                              className="hero__item set-bg"
                              style={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100px !important",
                                height: "431px",
                              }}
                            >
                              <div className="hero__text">
                                <span className="primary-color">Quality Leather</span>
                                <h2>{item?.caption ?? "No name"} <br />100% Quality</h2>
                                <p>For Homes and Offices</p>
                                <Link to="/collections" className="primary-btn primary-bg">
                                  SHOP NOW
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
export default Hero;