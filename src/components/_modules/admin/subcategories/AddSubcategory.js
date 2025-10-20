import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import FormComponent from '../../../_generics/FormComponent';
import { handleSubmit } from '../../../../utils/handleSubmit';
import Topbar from '../../../_layouts/admin/Topbar';
import Sidebar from '../../../_layouts/admin/Sidebar';
import Foot from '../../../_layouts/admin/Foot';

const AddSubcategory = (props) => {
  const navigate = useNavigate();
  const [categorylist, setCategorylist] = useState([]); // populate category dropdown list
  
  const [subcategoryInput, setSubcategory] = useState({
    category_id: '', 
    subcategory_id: '', 
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
    handleSubmit(
      e,
      "/api/add-subcategory",      // endpoint
      subcategoryInput,            // form state
      setSubcategory,              // reset function
      picture,                 // files
      setError,                // errors
      {                        // initial state (to reset form after success)
        category_id: '',  
        name: '', 
        description: '',  
        popular_style: false
      }
    );
  }

  useEffect(() => {
    document.title = `Add Styles - ${props.company}`;
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
                    <Link to="/admin/subcategory" className="btn btn-primary btn-round me-2">{props.btnManage}</Link>
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
                        { name: "name", label: "Style", type: "text", required: true, placeholder: "Enter style name" },
                        { name: "description", label: "Description", type: "text", required: true },
                        { name: "image", label: "Image", type: "file", required: true },
                        { name: "popular_style", label: "Popular Style?", type: "checkbox" },
                      ]}
                      values={subcategoryInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitSubcategory}
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
export default AddSubcategory;