import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { API_BASE_URL } from '../../../Main';

const PopularProducts = () => {
  const [loading, setLoading] = useState(true);
  const [productlist, setProductlist] = useState([]); 

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  const slidePopular = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, 
        settings: { 
          slidesToShow: 4, 
          slidesToScroll: 1, 
        } 
      },
      { breakpoint: 768, 
        settings: { 
          slidesToShow: 3, 
          slidesToScroll: 1,
        } 
      },
      { breakpoint: 480, 
        settings: { 
          slidesToScroll: 1,
          slidesToShow: 2, 
        }
      },
    ],
  };

  useEffect(() => {
    axios.get('/api/popular-products').then(res => {
      if (res.status === 200){
        setProductlist(res.data.product);
      } 
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
    <Slider {...slidePopular}>
  {loading
    ? [...Array(8)].map((_, idx) => (
        <div key={idx} className="p-2">
          <div
            className="categories__item set-bg"
            style={{ height: "165px", background: "#ccc" }}
          ></div>
        </div>
      ))
    : productlist.map((item) => (
        <div key={item.id} className="p-2">
          <div
            className="categories__item set-bg"
            style={{ height: "165px",
              backgroundImage: `url(${API_BASE_URL}/${item.image})`,
            }}
          >
          </div>
          <div className="featured__item__text text-capitalize">
            <h6><small>{item?.product ?? "No name"}</small></h6>
            <h5><small><b>{item?.selling_price ? formatNaira(item.selling_price) : ""}</b></small></h5>
          </div>
        </div>
      ))}
    </Slider>
    </>
  );
};
export default PopularProducts;