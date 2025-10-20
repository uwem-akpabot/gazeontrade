import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditCategory = (props) => {
  const { id } = useParams(); 

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const category_id = id;

    axios.get(`/api/edit-category/${category_id}`).then(res => {
      if (res.data.status === 200){
        setCategory(res.data.category);
        setLoading(false);

      } else if (res.data.status === 404){
        swal('Error', res.data.message, 'error');
        navigate('/admin/category');
      }
    });
  }, [id, navigate]);

  const handleInput = (e) => {
    e.persist();
    setCategory({...categoryInput, [e.target.name]: e.target.value })
  }

  const updateCategory = (e) => {
    e.preventDefault();
    const category_id = id;
    const data = categoryInput;

    axios.put(`/api/update-category/${category_id}`, data).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');
        setError([]);
        // setCategory(res.data.category);

      } else if (res.data.status === 422){
        swal('All fields are mandatory', '', 'error');
        setError(res.data.errors);

      } else if (res.data.status === 404){ //id not found
        swal('Error', res.data.message, 'error');
        navigate('/admin/category');
      }
    });
  }

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
                    <Link to="/admin/category" className="btn btn-label-info btn-round me-2">{props.btnBack}</Link>
                    {/* <a href="#" className="btn btn-label-info btn-round">{props.btnAdd}</a> */}
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <form onSubmit={updateCategory}>
                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Name <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" placeholder="Enter category name" />
                            <span className="text-danger">{error.name}</span>
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
export default EditCategory;