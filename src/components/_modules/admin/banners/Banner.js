import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { API_BASE_URL } from './../../../Main';

const Banner = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bannerlist, setBannerlist] = useState([]);

  useEffect(() => {
    document.title = `Banner - ${props.company}`;

    axios.get('/api/banner').then(res => {
      if (res.status === 200){
        setBannerlist(res.data.banner)
      } 
      setLoading(false);
    });
  }, []);

  // DELETE
  const deleteBanner = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting..';

    axios.delete(`/api/delete-banner/${id}`).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');
        thisClicked.closest('tr').remove();

      } else if (res.data.status === 404){
        swal('Success', res.data.message, 'success');
        thisClicked.innerText = 'Delete';
      }
    });

  }

  var viewproduct_HTMLTABLE = '';

  if (loading){
    return <p>Loading ...</p>

  } else {
    viewproduct_HTMLTABLE = 
      bannerlist.map((item, i) => {
        return (
          <tr key={i}>
            <td>{i+1}</td>
            <td><img src={`${API_BASE_URL}/${item.image}`} width="50px" alt={item.caption} /></td>
            <td>{item.caption}</td>
            <td>
              <Link to={`/admin/edit-banner/${item.id}`} className="btn btn-success btn-sm">Edit</Link> &nbsp; 
            </td>
          </tr>
        )
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
                    {/* <a href="#" className="btn btn-label-info btn-round me-2">{props.btnManage}</a> */}
                    {/* <Link to="/admin/add-product" className="btn btn-primary btn-round">{props.btnAdd}</Link> */}
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">   
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="display table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>S/N</th>
                            <th>Image</th>
                            <th>Caption</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {viewproduct_HTMLTABLE}

                        </tbody>
                      </table>                    
                  </div>
              </div>
            </div>
          </div>
        </div>

        <Foot />
      </div>
    </div>
    </div>
    </div>
    </>
  )
}
export default Banner;