import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../Main';

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };
  
  useEffect(() => {
    let isMounted = true;

    axios.get('/api/featured-products')
      .then(res => {
        if (isMounted && res.status === 200) {
          setProduct(res.data.product);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
    <div className="row col-12 gx-3">
        {loading
          ? [...Array(8)].map((_, idx) => (
          <div key={idx} className="col-lg-3 mb-5">
            <div className="categories__item set-bg" 
              style={{ height: "265px", background: "#ccc" }}>
            </div>
          </div>
          ))
        : product.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-4 col-6">
              <Link to={`/collections/${item?.category?.slug ?? ""}/${item?.slug ?? ""}`}>
                <div className="featured__item">
                  <img src={`${API_BASE_URL}/${item?.image ?? ""}`}
                    alt={item?.product ?? "Product"}
                  />
                  <div className="featured__item__text text-capitalize">
                    <h6>{item?.product ?? "No name"}</h6>
                    <h5>{item?.selling_price ? formatNaira(item.selling_price) : ""}</h5>
                  </div>
                </div>
              </Link>
            </div>            
        ))}
    </div>
    </>
  );
};
export default FeaturedProducts;