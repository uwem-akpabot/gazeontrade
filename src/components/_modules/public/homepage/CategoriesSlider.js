import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { API_BASE_URL } from '../../../Main';

const CategoriesSlider = (props) => {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]); 
  const slideCateg = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, 
        settings: { 
          slidesToShow: 3, 
          slidesToScroll: 1, 
        } 
      },
      { breakpoint: 768, 
        settings: { 
          slidesToShow: 2, 
          slidesToScroll: 1,
        } 
      },
      { breakpoint: 480, 
        settings: { 
          slidesToScroll: 1,
          slidesToShow: 1.5, 
        }
      },
    ],
  };

  // var slideCateg = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   autoplaySpeed: 5000,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   pauseOnHover: false,
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     },
  //   ]
  // };

  useEffect(() => {
    axios.get('/api/categories').then(res => {
      if (res.status === 200){
        setCategorylist(res.data.category);
      } 
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
    <Slider {...slideCateg}>
  {loading
    ? [...Array(8)].map((_, idx) => (
        <div key={idx} className="p-2">
          <div
            className="categories__item set-bg"
            style={{ height: "265px", background: "#ccc" }}
          ></div>
        </div>
      ))
    : categorylist.map((item) => (
        <div key={item.id} className="p-2">
          <div
            className="categories__item set-bg"
            style={{
              backgroundImage: `url(${API_BASE_URL}/${item.image})`,
            }}
          >
            <h5>
              <Link to={`/collections/${item.slug}`}>{item.name}</Link>
            </h5>
          </div>
        </div>
      ))}
    </Slider>
    </>
  );
};
export default CategoriesSlider;