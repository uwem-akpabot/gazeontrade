import Sidebar from '../../../admin/layouts/Sidebar';
import Topbar from '../../../admin/layouts/Topbar';
import Foot from '../../../admin/layouts/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Category = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    axios.get('/api/category').then(res => {
      if (res.status === 200){
        setCategorylist(res.data.category)

      } 
      setLoading(false);
    });
  }, []);

  // Initialize DataTable after data loads
  useEffect(() => {
    if (!loading) {
      // Wait a tick to ensure table is rendered
      setTimeout(() => {
        if (window.$ && !window.$.fn.DataTable.isDataTable('#basic-datatables')) {
          window.$('#basic-datatables').DataTable();
        }
      }, 100);
    }
  }, [loading, categorylist]);

  // DELETE
  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting..';

    axios.delete(`/api/delete-category/${id}`).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');
        thisClicked.closest('tr').remove();

      } else if (res.data.status === 404){
        swal('Success', res.data.message, 'success');
        thisClicked.innerText = 'Delete';
      }
    });

  }

  var viewcategory_HTMLTABLE = '';

  if (loading){
    return <p>Loading ...</p>

  } else {
    viewcategory_HTMLTABLE = 
      categorylist.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <Link to={`/admin/edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link> &nbsp; 
              <button type="button" onClick={(e) => deleteCategory(e, item.id)} 
                className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        )
      });
  }

  return (
    <>
    <link
      rel="stylesheet"
      href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css"
    />
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    
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
                    <Link to="/admin/add-category" className="btn btn-primary btn-round">{props.btnAdd}</Link>
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">   
                  <div className="card-body">
                    <div className="table-responsive">
                      <table id="basic-datatables" className="display table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {viewcategory_HTMLTABLE}

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
export default Category;