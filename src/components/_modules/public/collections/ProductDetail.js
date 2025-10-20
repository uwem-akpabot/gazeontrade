import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../../_layouts/public/Header';
import Footer from '../../../_layouts/public/Footer';
import { API_BASE_URL } from '../../../Main';

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const { slug_categ, slug_prod } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  const handleDecrement = () => {
    if (qty > 1){
      setQty(prevCount => prevCount - 1);
    }
  }
  const handleIncrement = () => {
    if (qty < 10){
      setQty(prevCount => prevCount + 1);
    }
  }
  
  useEffect(() => {
    let isMounted = true;

    const category_slug = slug_categ;
    const product_slug = slug_prod;

    axios.get(`/api/productdetail/${category_slug}/${product_slug}`).then(res => {
      if (isMounted){
        if (res.status === 200){
          setProduct(res.data.product);
          setLoading(false);
        } 
        else if (res.status === 404){
          navigate('/collections');
          swal('Warning', res.data.message, 'error');
        }
      }

    });
    return () => {
      isMounted = false;
    }
  }, [slug_categ, slug_prod]);

  const submitAddtocart = (e) => {
    e.preventDefault();

    const data = {
      product_id: product.id, 
      product_qty: qty
    }

    axios.post(`/api/add-to-cart`, data).then(res => {
      // if (isMounted){
        if (res.data.status === 201){
          swal('Success', res.data.message, 'success');
        } 
        else if (res.data.status === 409){
          swal('Warning', res.data.message, 'warning');
        }
        else if (res.data.status === 401){ //unauthorized
          swal('Error', res.data.message, 'error');
        }
        else if (res.data.status === 404){
          swal('Warning', res.data.message, 'warning');
        }
      // }
    });
  }

  if (loading){
    return <p>Loading ...</p>

  } else {
    var avail_stock = '';
    if (product.quantity > 0){
      avail_stock = <span>{product.quantity} left in stock</span>
    }
    else {
      avail_stock = <span className="text-danger">Out of stock</span>
    }
  }

  return (
    <> 
    <Header company={props.company} />

    <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>{product.product}</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="product-details spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="product__details__pic">
                        <div className="product__details__pic__item">
                            <img className="product__details__pic__item--large"
                                src={`${API_BASE_URL}/${product.image}`} alt={product.product} />
                        </div>
                        {/* <div className="product__details__pic__slider owl-carousel">
                            <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                src="img/product/details/thumb-1.jpg" alt="" />
                            <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                src="img/product/details/thumb-2.jpg" alt="" />
                            <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                src="img/product/details/thumb-3.jpg" alt="" />
                            <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                src="img/product/details/thumb-4.jpg" alt="" />
                        </div> */}
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="product__details__text">
                        <h3>{product.product}</h3>
                        <div className="product__details__price">                          
                          <span>
                            {formatNaira(product.selling_price)}
                          </span>

                          <div className="product__details__rating">
                            <span style={{ textDecoration: 'line-through'}}>({formatNaira(product.original_price)})</span>
                          </div>
                        </div>
                        {/* Shd be product summary. Create new field */}
                        <p>{product.description}</p>

                        <div className="product__details__quantity">
                            <div className="quantity">
                                <div className="pro-qty">
                                  <button type="button" onClick={handleDecrement} className="btn btn-primary"> - </button>
                                  <input type="text" value={qty} />
                                  <button type="button" onClick={handleIncrement} className="btn btn-primary"> + </button>
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={submitAddtocart} className="primary-btn">ADD TO CART</button>
                        {/* <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a> */}
                        <ul>
                            <li><b>Category</b> <span>{product.category.name}</span></li>
                            <li><b>Availability</b> {avail_stock}</li>
                            <li><b>Brand</b> <span>{product.brand}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="product__details__tab">
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Product Infomation</h6>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
    </>
  )
}
export default ProductDetail;