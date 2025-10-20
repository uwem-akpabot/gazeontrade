import Sidebar from '../../layouts/Sidebar';
import Topbar from '../../layouts/Topbar';
import Foot from '../../layouts/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './../../../Main';

const EditProduct = (props) => {
  const { id } = useParams(); 

  const navigate = useNavigate();
  // populate category dropdown list
  const [categorylist, setCategorylist] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productInput, setProduct] = useState([]);
  const [error, setError] = useState([]);
  const [picture, setPicture] = useState({});
  const [allcheckbox, setCheckboxes] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProduct({...productInput, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] })
  }

  const handleCheckbox = (e) => {
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    document.title = `Edit Product - ${props.company}`;
    const product_id = id;

    axios.get(`/api/edit-product/${product_id}`).then(res => {
      if (res.data.status === 200){
        setProduct(res.data.product);
        setCheckboxes(res.data.product);
        setLoading(false);

      } else if (res.data.status === 404){
        swal('Error', res.data.message, 'error');
        navigate('/admin/product');
      }
    });
  }, [id, navigate]);

  const updateProduct = (e) => {
    e.preventDefault();

    const product_id = id;
    
    // we have to use FormData and formData.append() so that 
    // we can insert the IMAGE TOGETHER WITH THE DATA
    // rather than passing data directly as we do generally
    const formData = new FormData();
    
    formData.append('image', picture.image);
    formData.append('category_id', productInput.category_id);
    formData.append('product', productInput.product);  
    formData.append('description', productInput.description);  
    formData.append('selling_price', productInput.selling_price);  
    formData.append('original_price', productInput.original_price);  
    formData.append('quantity', productInput.quantity); 
    formData.append('brand', productInput.brand);  
    formData.append('featured_product', allcheckbox.featured_product ? '1':'0'); 
    formData.append('popular_product', allcheckbox.popular_product ? '1':'0');

    // axios.put(`/api/update-product/${product_id}`, data).then(res => {
    axios.post(`/api/update-product/${product_id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');       
        setError([]);

      } else if (res.data.status === 422){
        swal('Required fields are empty', '', '');
        setError(res.data.errors);

      } else if (res.data.status === 404){
        swal('Error', res.data.message, 'error');
        navigate('/admin/product');
      }
    });
  }

  // populate category dropdown list
  useEffect(() => {
    axios.get('/api/populate-categories').then(res => {
      if (res.data.status === 200){
        setCategorylist(res.data.category);
      }
    });
  }, []);

  if (loading){
    return <p>Loading ...</p>
  }

  return (
    <>
    <div className="wrapper">
      <Sidebar />

      <div className="main-panel">

        <Topbar />

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">{props.page}</h3>
                    <h6 className="op-7 mb-2">{props.company}</h6>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                    <Link to="/admin/product" className="btn btn-label-info btn-round me-2">{props.btnBack}</Link>
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <form onSubmit={updateProduct}>
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Select Category <span className="text-danger"><b>*</b></span></label>
                            <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                              {
                                categorylist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                  )
                                })
                              }                              
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Product <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="product" onChange={handleInput} value={productInput.product} className="form-control" placeholder="Enter product name" />
                          </div>
                        </div>
                        
                        <div className="col-md-6 col-lg-4">                          
                          <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control" placeholder="Description" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Selling price <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Original price </label>
                            <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Quantity </label>
                            <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Brand </label>
                            <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Image <span className="text-danger"><b>*</b></span></label>
                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                              <img src={`${API_BASE_URL}/${productInput.image}`} width="50px" alt={productInput.product} />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Featured product? </label> &nbsp; 
                            <input type="checkbox" name="featured_product" onChange={handleCheckbox} 
                              defaultChecked={allcheckbox.featured_product === 1 ? true:false} />
                          </div>
                        
                          <div className="form-group"> 
                            <label>Popular product? </label> &nbsp; 
                            <input type="checkbox" name="popular_product" onChange={handleCheckbox} 
                              defaultChecked={allcheckbox.popular_product === 1 ? true:false} />
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary">Update</button>
                          </div>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Foot />
    </div>
  </div>
  </>
  )
}
export default EditProduct;