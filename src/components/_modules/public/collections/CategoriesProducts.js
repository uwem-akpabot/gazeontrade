import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../../_layouts/public/Header';
import Footer from '../../../_layouts/public/Footer';
import Breadcrumb from '../../../_layouts/public/Breadcrumb';
import { API_BASE_URL } from './../../../Main';

const CategoriesProducts = (props) => {
  const navigate = useNavigate();
  const { slug } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  useEffect(() => {
    let isMounted = true;

    const product_slug = slug;
    axios.get(`/api/categories-products/${product_slug}`).then(res => {
      if (isMounted){
        if (res.status === 200){
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        } 
        else if (res.status === 400){
          swal('Warning', res.data.message, '');
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

  }, [slug]);

  if (loading){
    return <p>Loading ...</p>
  } else {
    var showProductList = '';
    showProductList = product.map((item, idx) => {
      return (
        <div key={idx} className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
            <div className="featured__item">
                <img src={`${API_BASE_URL}/${item.image}`} style={{ width:'100%', height:'270px'}} alt={item.product} />
                {/* <ul className="featured__item__pic__hover">
                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                </ul> */}
                <div className="featured__item__text">
                    <h6>{item.product}</h6>
                    <h5>{formatNaira(item.selling_price)}</h5>
                </div>
            </div>
            </Link>
        </div>
      )
    });
  }

  return (
    <>
    <Header company={props.company} />
    <Breadcrumb b4='Collections' b4_link='/collections' pg='Categories Product' />

    <section className="featured spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>{category.name}</h2>
                    </div>
                </div>
            </div>
            <div className="row featured__filter">

                {showProductList}

            </div>
        </div>
    </section>
    
    <Footer />
    </>
  )
}
export default CategoriesProducts;