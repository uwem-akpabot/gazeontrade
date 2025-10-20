import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../_generics/FormComponent';
import { handleUpdate } from '../../../../utils/handleUpdate';
import { API_BASE_URL } from '../../../Main';

const EditSample = (props) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categorylist, setCategorylist] = useState([]);
  const [sampleInput, setSample] = useState({
    category_id: '', 
    name: '', 
    description: ''
  });
  const [picture, setPicture] = useState({});
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setSample({
      ...sampleInput,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const submitSample = (e) => {
    handleUpdate(
      e,
      `/api/update-sample/${slug}`, // endpoint for update
      sampleInput,
      setSample,
      picture,
      setError
    );
  };

  useEffect(() => {
    document.title = `Edit Sample - ${props.company}`;

    // Fetch existing sample
    axios.get(`/api/edit-sample/${slug}`).then(res => {
      if (res.data.status === 200) {
        setSample(res.data.sample);
      } else {
        swal("Error", res.data.message, "error");
        navigate("/admin/sample");
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
      <div className="main-panel">
        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">{props.page}</h3>
                    <h6 className="op-7 mb-2">{props.company}</h6>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                    <Link to="/admin/sample" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <FormComponent
                      fields={[
                        { name: "category_id", label: "Select Category", type: "select", required: true, options: categorylist.map(c => ({ value: c.id, label: c.name })) },
                        { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter name" },
                        { name: "description", label: "Description", type: "text" },
                        { name: "image", label: "Image", type: "file" },
                      ]}
                      values={sampleInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitSample}
                      submitLabel="Update"
                    />
                    <img src={`${API_BASE_URL}/${sampleInput.image}`} width="50px" alt={sampleInput.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditSample;