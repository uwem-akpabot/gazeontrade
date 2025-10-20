// import Sidebar from '../../layouts/Sidebar';
// import Topbar from '../../layouts/Topbar';
// import Foot from '../../layouts/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import FormComponent from '../../../_generics/FormComponent';
import { handleSubmit } from '../../../../utils/handleSubmit';

const AddSample = (props) => {
  const navigate = useNavigate();

  // populate category dropdown list
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
    handleSubmit(
      e,
      "/api/add-sample",        // endpoint
      sampleInput,            // form state
      setSample,              // reset function
      picture,                 // files
      setError,                // errors
      {                        // initial state (to reset form after success)
        category_id: '',  name: '',  description: '',
        // featured_product: false
      }
    );
  }

  useEffect(() => {
    document.title = `Add Sample - ${props.company}`;
  }, []);

  // populate category dropdown list
  useEffect(() => {
    axios.get('/api/populate-categories').then(res => {
      if (res.data.status === 200){
        setCategorylist(res.data.category);
      }
    });
  }, []);

  return (
    <>
    <div className="wrapper">
      {/* <Sidebar /> */}

      <div className="main-panel">

        {/* <Topbar /> */}

        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">{props.page}</h3>
                    <h6 className="op-7 mb-2">{props.company}</h6>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                    <Link to="/admin/sample" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
                    {/* <a href="#" className="btn btn-label-info btn-round">{props.btnAdd}</a> */}
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
                        { name: "image", label: "Image", type: "file", required: true },
                        // { name: "featured_product", label: "Featured Product?", type: "checkbox" },
                      ]}
                      values={sampleInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitSample}
                      submitLabel="Save"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Foot /> */}
      </div>
    </div>
    </>
  )
}
export default AddSample;