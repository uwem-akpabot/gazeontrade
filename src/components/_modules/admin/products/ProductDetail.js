import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { API_BASE_URL } from '../../../Main';
import Sidebar from "../../../_layouts/admin/Sidebar";
import Topbar from "../../../_layouts/admin/Topbar";
import Foot from "../../../_layouts/admin/Foot";

const ProductDetail = (props) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  useEffect(() => {
    setLoading(true);
    // fetch product detail
    axios.get(`/api/product-detail/${slug}`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
      } else {
        swal("Error", res.data.message, "error");
      }
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Topbar />

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
              <div>
                <h3 className="fw-bold mb-3"><u>Product Detail</u>: {product ? product.product : ""}</h3>
              </div>
              <div className="ms-md-auto py-2 py-md-0">
                  <Link to="/admin/product" className="btn btn-primary btn-round me-2">{props.btnBack}</Link>
              </div>
            </div>
            
            {loading ? (
              // skeleton loader here
              <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      {["Product", "Category", "Subcategory", "Selling Price", "Original Price", "Quantity Left"].map((label, idx) => (
                        <div className="col-md-6 col-lg-6" key={idx}>
                          <div className="form-group">
                            <label>{label}</label>
                            <div
                              className="bg-dark bg-opacity-25 rounded mb-2"
                              style={{ height: "20px", width: "70%" }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                {/* <div className="row"> */}
                  <div
                    className="bg-dark bg-opacity-25 rounded"
                    style={{ width: "95%", height: "150px" }}
                  ></div>
                {/* </div> */}
              </div>
            </div>
            ) : !product ? (
              <h3>No product found</h3>
            ) : (
              
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">

                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Product Name</label>
                          <h6><b>{product.product}</b></h6>
                        </div>
                      </div>  
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Category</label>
                          <h6><b>{product.category.name}</b></h6>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Subcategory</label>
                          <h6><b>{product.subcategory.name}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Selling Price</label>
                          <h6><b>{formatNaira(product.selling_price)}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Original Price</label>
                          <h6><b>{formatNaira(product.original_price)}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Quantity Left</label>
                          <h6><b>{product.quantity}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Brand</label>
                          <h6><b>{product.brand}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Delivery Time</label>
                          <h6><b>{product.delivery_time}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Featured?</label>
                          <h6><b>{product.featured_product ? "Yes" : "No"}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Popular?</label>
                          <h6><b>{product.popular_product ? "Yes" : "No"}</b></h6>
                        </div>
                      </div> 
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Description</label>
                          <h6><b>{product.description}</b></h6>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="row">
                <img
                  src={`${API_BASE_URL}/${product.image}`}
                  alt={product.product}
                  width="100%" height="200px"
                  className="mb-3"
                />
              </div> 

              <div className="row">
                <h5>Image thumbnails</h5>

                {[product.image2, product.image3, product.image4, product.image5, product.image6, product.image7, product.image8]
                  .filter(Boolean)
                  .map((img, i) => (
                    <div className="col-4 mb-3">
                      <img key={i} src={`${API_BASE_URL}/${img}`} alt={`Gallery ${i}`} 
                        className="thumbnail" style={{ height: '86px', width: '100%' }} />
                    </div>
                ))} 
                </div>  
                                             
            </div> 
           </div>

           )}
          </div>
        </div>
      </div>

    <Foot />
    </div>
  );
};
export default ProductDetail;