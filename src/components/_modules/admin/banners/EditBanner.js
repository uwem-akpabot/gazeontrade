import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../Main';

const EditBanner = (props) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bannerInput, setBanner] = useState([]);
  const [error, setError] = useState([]);
  const [picture, setPicture] = useState({});

  const handleInput = (e) => {
    e.persist();
    setBanner({...bannerInput, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] })
  }

  useEffect(() => {
    document.title = `Edit Banner - ${props.company}`;
    const banner_id = id;

    axios.get(`/api/edit-banner/${banner_id}`).then(res => {
      if (res.data.status === 200){
        setBanner(res.data.banner);
        setLoading(false);

      } else if (res.data.status === 404){
        swal('Error', res.data.message, 'error');
        navigate('/admin/banner');
      }
    });
  }, [id, navigate]);

  const updateBanner = (e) => {
    e.preventDefault();

    const banner_id = id;
    
    // we have to use FormData and formData.append() so that 
    // we can insert the IMAGE TOGETHER WITH THE DATA
    // rather than passing data directly as we do generally
    const formData = new FormData();    
    formData.append('image', picture.image);
    formData.append('caption', bannerInput.caption);

    // axios.put(`/api/update-product/${product_id}`, data).then(res => {
    axios.post(`/api/update-banner/${banner_id}`, formData, {
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
        navigate('/admin/banner');
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
                    <Link to="/admin/banner" className="btn btn-label-info btn-round me-2">{props.btnBack}</Link>
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <form onSubmit={updateBanner}> 
                      <div className="row"> 
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Image <span className="text-danger"><b>*</b></span></label>
                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                              <img src={`${API_BASE_URL}/${bannerInput.image}`} width="50px" alt={bannerInput.product} />
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <label>Caption <span className="text-danger"><b>*</b></span></label>
                            <input type="text" name="caption" onChange={handleInput} value={bannerInput.caption} 
                              className="form-control" placeholder="Enter caption or title" />
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
export default EditBanner;