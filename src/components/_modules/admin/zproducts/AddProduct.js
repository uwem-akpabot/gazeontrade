import Sidebar from '../../layouts/Sidebar';
import Topbar from '../../layouts/Topbar';
import Foot from '../../layouts/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = (props) => {
  const navigate = useNavigate();

  // populate category dropdown list
  const [categorylist, setCategorylist] = useState([]);

  const [productInput, setProduct] = useState({
    category_id: '', 
    product: '', 
    description: '', 
    selling_price: '', 
    original_price: '', 
    quantity: '', 
    brand: '', 
    featured_product: '', 
    popular_product: ''
  }); 
  const [picture, setPicture] = useState({});
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setProduct({...productInput, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] })
  }

  const submitProduct = (e) => {
    e.preventDefault();

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
    formData.append('featured_product', productInput.featured_product); 
    formData.append('popular_product', productInput.popular_product);
  
    axios.post('/api/add-product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');

        // clear the input fields after successful submission
        setProduct({...productInput, 
          category_id: '', 
          product: '', 
          description: '', 
          selling_price: '', 
          original_price: '', 
          quantity: '', 
          brand: '', 
          featured_product: '', 
          popular_product: ''
        });         
        setError([]);

      } else if (res.data.status === 422){
        swal('Required fields are empty', '', '');
        setError(res.data.errors);
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
                    <Link to="/admin/product" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
                    {/* <a href="#" className="btn btn-label-info btn-round">{props.btnAdd}</a> */}
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <form onSubmit={submitProduct} encType="multipart/form-data">
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Select Category <span className="text-danger"><b>*</b></span></label>
                            <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                              <option value="">- Select -</option>
                              {
                                categorylist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                  )
                                })
                              }                              
                            </select>
                            <span className="text-danger">{errorlist.category_id}</span>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Product <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="product" onChange={handleInput} value={productInput.product} className="form-control" placeholder="Enter product name" />
                            <span className="text-danger">{errorlist.product}</span>
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
                            <span className="text-danger">{errorlist.selling_price}</span>
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
                            <span className="text-danger">{errorlist.image}</span>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Featured product? </label>
                            <input type="checkbox" name="featured_product" onChange={handleInput} value={productInput.featured_product} className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Popular product? </label>
                            <input type="checkbox" name="popular_product" onChange={handleInput} value={productInput.popular_product} className="form-control" />
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary">Save</button>
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
export default AddProduct;