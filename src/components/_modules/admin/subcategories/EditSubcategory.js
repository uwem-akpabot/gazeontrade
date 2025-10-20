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

const EditSubcategory = (props) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categorylist, setCategorylist] = useState([]);
  const [subcategoryInput, setSubcategory] = useState({
    category_id: '', 
    name: '', 
    description: '', 
    popular_style: ''
  });
  const [picture, setPicture] = useState({});
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setSubcategory({
      ...subcategoryInput,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const submitSubcategory = (e) => {
    handleUpdate(
      e,
      `/api/update-subcategory/${slug}`, // endpoint for update
      subcategoryInput,
      setSubcategory,
      picture,
      setError
    );
  };

  useEffect(() => {
    document.title = `Edit Subcategory - ${props.company}`;

    // Fetch existing subcategory
    axios.get(`/api/edit-subcategory/${slug}`).then(res => {
      if (res.data.status === 200) {
        setSubcategory(res.data.subcategory);
      } else {
        swal("Error", res.data.message, "error");
        navigate("/admin/subcategory");
      }
    });

    // Fetch categories
    axios.get('/api/populate-categories').then(res => {
      if (res.data.status === 200){
        setCategorylist(res.data.category);
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
                    <Link to="/admin/subcategory" className="btn btn-primary btn-round me-2">{props.btnBack}</Link>
                </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <FormComponent
                      fields={[
                        { name: "category_id", label: "Select Category", type: "select", required: true, options: categorylist.map(c => ({ value: c.id, label: c.name })) },
                        { name: "name", label: "Subcategory", type: "text", required: true },
                        { name: "description", label: "Description", type: "text", required: true },
                        { name: "image", label: "Image", type: "file", required: true },
                        { name: "popular_style", label: "Popular Style?", type: "checkbox" },
                      ]}
                      values={subcategoryInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitSubcategory}
                      submitLabel="Update"
                    />
                    <img src={`${API_BASE_URL}/${subcategoryInput.image}`} width="50px" alt={subcategoryInput.name} />
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
export default EditSubcategory;