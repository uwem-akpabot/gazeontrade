import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../_generics/FormComponent';
import { handleUpdate } from '../../../../utils/handleUpdate';
import { API_BASE_URL } from '../../../Main';
import Topbar from '../../../_layouts/admin/Topbar';
import Sidebar from '../../../_layouts/admin/Sidebar';
import Foot from '../../../_layouts/admin/Foot';

const EditCategory = (props) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categoryInput, setCategory] = useState({
    name: '', 
    description: ''
  });
  const [picture, setPicture] = useState({});
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setCategory({
      ...categoryInput,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const submitCategory = (e) => {
    handleUpdate(
      e,
      `/api/update-category/${slug}`, // endpoint for update
      categoryInput,
      setCategory,
      picture,
      setError
    );
  };

  useEffect(() => {
    document.title = `Edit Category - ${props.company}`;

    // Fetch existing category
    axios.get(`/api/edit-category/${slug}`).then(res => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else {
        swal("Error", res.data.message, "error");
        navigate("/admin/category");
      }
    });
  }, [slug, navigate, props.company]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Topbar />

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">{props.page}</h3>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                    <Link to="/admin/category" className="btn btn-primary btn-round me-2">{props.btnBack}</Link>
                </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <FormComponent
                      fields={[
                        { name: "name", label: "Category Name", type: "text", required: true },
                        { name: "description", label: "Description", type: "text" }, 
                        { name: "image", label: "Image", type: "file", required: true }
                      ]}
                      values={categoryInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitCategory}
                      submitLabel="Update"
                    />
                    <img src={`${API_BASE_URL}/${categoryInput.image}`} width="50px" alt={categoryInput.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Foot />
      </div>
    </div>
  );
};
export default EditCategory;