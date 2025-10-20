import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { API_BASE_URL } from '../../../Main';
import Sidebar from "../../../_layouts/admin/Sidebar";
import Topbar from "../../../_layouts/admin/Topbar";
import Foot from "../../../_layouts/admin/Foot";

const CategoryDetail = (props) => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  useEffect(() => {
    setLoading(true);
    // fetch category detail
    axios.get(`/api/category-detail/${slug}`).then(res => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else {
        swal("Error", res.data.message, "error");
      }
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Topbar />

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
              <div>
                <h3 className="fw-bold mb-3"><u>Category Detail</u>: {category ? category.name : ""}</h3>
              </div>
              <div className="ms-md-auto py-2 py-md-0">
                  <Link to="/admin/category" className="btn btn-primary btn-round me-2">{props.btnBack}</Link>
              </div>
            </div>
            
            {loading ? (
              // skeleton loader here
              <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      {["Category Name", "Description"].map((label, idx) => (
                        <div className="col-md-6 col-lg-6" key={idx}>
                          <div className="form-group">
                            <label>{label}</label>
                            <div
                              className="bg-dark bg-opacity-25 rounded mb-2"
                              style={{ height: "20px", width: "70%" }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="bg-dark bg-opacity-25 rounded"
                  style={{ width: "95%", height: "150px" }}>
                </div>
              </div>
            </div>
            ) : !category ? (
              <h3>No category found</h3>
            ) : (
              
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">

                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Category Name</label>
                          <h6><b>{category.name}</b></h6>
                        </div>
                      </div>  
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Description</label>
                          <h6><b>{category.description}</b></h6>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="row">
                <img
                  src={`${API_BASE_URL}/${category.image}`}
                  alt={category.name}
                  width="100" height="150"
                  className="mb-3"
                />
              </div>                     
            </div>
           </div>

           )}
          </div>
        </div>
      </div>

    <Foot />
    </div>
  );
};
export default CategoryDetail;