import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';

const Orders = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = `Orders - ${props.company}`;

    axios.get('/api/admin/orders').then(res => {
      if (res.status === 200){
        setOrders(res.data.orders)
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
  }, [loading, orders]);

  var vieworders_HTMLTABLE = '';

  if (loading){
    return <p>Loading ...</p>

  } else {
    vieworders_HTMLTABLE = 
      orders.map((item, i) => {
        return (
          <tr key={i}>
            <td>{i+1}</td>
            {/* <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td> */}
            <td>
              {item.orderitems && item.orderitems.length > 0
              ? item.orderitems.map((p) => p.product.product).join(", ")
              : "No products"}
            </td>
            <td>{item.fname} {item.sname}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>
              <Link to={`/admin/orderdetail/${item.id}`} className="btn btn-info btn-sm">View</Link> &nbsp; 
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
                    <Link to="/admin/dashboard" className="btn btn-primary btn-round">{props.btnBack}</Link>
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
                            <th>S/N</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {vieworders_HTMLTABLE}

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
export default Orders;