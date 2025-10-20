import Sidebar from '../../../admin/layouts/Sidebar';
import Topbar from '../../../admin/layouts/Topbar';
import Foot from '../../../admin/layouts/Foot';
import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';

const AddCategory = (props) => {
  const navigate = useNavigate();

  const [categoryInput, setCategory] = useState({
    name: '', 
    description: '', 
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setCategory({...categoryInput, [e.target.name]: e.target.value })
  }

  const submitCategory = (e) => {
    e.preventDefault();

    const data = {
      name: categoryInput.name, 
      description: categoryInput.description
    }

    axios.post('/api/add-category', data).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');
        document.getElementById('CATEGORY_FORM').reset();

      } else if (res.data.status === 400){
        setCategory({ ...categoryInput, error_list: res.data.validation_errors })
      }
    });
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
                    <Link to="/admin/category" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
                    {/* <a href="#" className="btn btn-label-info btn-round">{props.btnAdd}</a> */}
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Name <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" placeholder="Enter category name" />
                            <span className="text-danger">{categoryInput.error_list.name}</span>
                          </div>
                        </div>
                        
                        <div className="col-md-6 col-lg-4">                          
                          <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" placeholder="Description" />
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

                      {/* <div className="form-group">
                          <label>Gender</label><br />
                          <div className="d-flex">
                          <div className="form-check">
                              <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              />
                              <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                              >
                              Male
                              </label>
                          </div>
                          <div className="form-check">
                              <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked
                              />
                              <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                              >
                              Female
                              </label>
                          </div>
                          </div>
                      </div> */}
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
export default AddCategory;