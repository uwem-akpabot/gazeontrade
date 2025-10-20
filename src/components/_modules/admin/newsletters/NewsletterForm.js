import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import { Link } from "react-router-dom";

const NewsletterForm = (props) => {
  const [subscribers, setSubscribers] = useState([]);
  const [form, setForm] = useState({ subject: "", message: "" });

  useEffect(() => {
    axios.get("/api/newsletter", {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
    }).then(res => {
      if (res.data.status === 200) setSubscribers(res.data.subscribers);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/newsletter/send", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
    }).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setForm({ subject: "", message: "" });
      }
    });
  };

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
                    <Link to="/admin/dashboard" className="btn btn-primary btn-round">{props.btnBack}</Link>
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">   
                  <div className="card-body">

                    <form onSubmit={handleSubmit}>
                    
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Subject <span className="text-danger"><b>*</b></span></label>
                          <input type="text" name="subject" placeholder="Subject" value={form.subject}
                            onChange={handleChange} className="form-control" required />
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Message <span className="text-danger"><b>*</b></span></label>
                          <textarea name="message" placeholder="Message" value={form.message} 
                            onChange={handleChange} className="form-control" required></textarea>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary">Send to Subscribers</button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </form>
                  </div>
                </div>
                    
                <div className="card">   
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="display table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>S/N</th>
                            <td>SUBSCRIBERS</td>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((sub,i) => (
                            <tr><td>{i+1}</td><td key={sub.id}>{sub.email}</td></tr>
                          ))}
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
  );
};
export default NewsletterForm;