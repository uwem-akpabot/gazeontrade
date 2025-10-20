import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import FormComponent from '../../../_generics/FormComponent';
import { handleSubmit } from '../../../../utils/handleSubmit';
import Topbar from '../../../_layouts/admin/Topbar';
import Sidebar from '../../../_layouts/admin/Sidebar';
import Foot from '../../../_layouts/admin/Foot';

const AddCategory = (props) => {
  const navigate = useNavigate();
  
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
    handleSubmit(
      e,
      "/api/add-category",      // endpoint
      categoryInput,            // form state
      setCategory,              // reset function
      picture,                 // files
      setError,                // errors
      {   
        name: '', 
        description: ''
      }
    );
  }

  useEffect(() => {
    document.title = `Add Category - ${props.company}`;
  }, []);

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
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                    <Link to="/admin/category" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
                    {/* <a href="#" className="btn btn-label-info btn-round">{props.btnAdd}</a> */}
                </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    
                    <FormComponent
                      fields={[
                        { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter category name" },
                        { name: "description", label: "Description", type: "text", placeholder: "e.g. Electronics of all kinds ..." },
                        { name: "image", label: "Image", type: "file", required: true }
                      ]}
                      values={categoryInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitCategory}
                      submitLabel="Save"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Foot />
      </div>
    </div>
    </>
  )
}
export default AddCategory;