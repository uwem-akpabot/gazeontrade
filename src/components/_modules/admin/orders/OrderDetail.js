import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';

const OrderDetail = (props) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Order #${id} - ${props.company}`;
    axios.get(`/api/admin/orders/${id}`).then(res => {
      if (res.status === 200) {
        setOrder(res.data.order);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main-panel">
        <Topbar />

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
              <div>
                <h3 className="fw-bold mb-3">Order Detail</h3>
                <h6 className="op-7 mb-2">{props.company}</h6>
              </div>
              <div className="ms-md-auto py-2 py-md-0">
                <Link to="/admin/orders" className="btn btn-primary btn-round">{props.btnBack}</Link>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    {/* <p><b>Product:</b> {order.orderitems && order.orderitems.length > 0
                      ? order.orderitems.map((p) => p.product.product).join(", ")
                      : "No products"}
                    </p> */}
                    <h4>Product details</h4>

                    {order.orderitems.map((item, index) => (
                      <div key={index}>
                        <p><b>Order Id: </b>{item.order_id}</p>
                        <p><b>Date: </b>{item.created_at}</p>
                        <p><b>Product: </b>{item.product.product}</p>
                        <p><b>Quantity: </b>{item.qty}</p>
                        <p><b>Price per unit: </b>₦{item.price.toLocaleString()}</p>
                        <p><b>Total price: </b>₦{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    ))}

                    <h4>Buyer details</h4>

                    <p><b>Name:</b> {order.fname} {order.sname}</p>
                    <p><b>Phone:</b> {order.phone}</p>
                    <p><b>Email:</b> {order.email}</p>
                    <p><b>Address:</b> {order.street}</p>
                    <p><b>City:</b> {order.city}</p>
                    <p><b>State:</b> {order.thestate}</p>
                    <p><b>Country:</b> {order.country}</p>
                    <p><b>Other info:</b> {order.other}</p>
                    
                  </div>
                </div>
              </div>
            </div>

            <Foot />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;