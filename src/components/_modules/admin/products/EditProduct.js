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

const EditProduct = (props) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categorylist, setCategorylist] = useState([]);
  const [subcategorylist, setSubcategorylist] = useState([]); // populate subcategory

  const [productInput, setProduct] = useState({
    category_id: '', 
    subcategory_id: '', 
    product: '', 
    description: '', 
    selling_price: '', 
    original_price: '', 
    quantity: '', 
    brand: '', 
    delivery_time: '',
    featured_product: '', 
    popular_product: ''
  });
  const [picture, setPicture] = useState({});
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setProduct({
      ...productInput,
      [name]: type === "checkbox" ? checked : value
    });

    if (name === "category_id") {
      axios.get(`/api/subcategories/${value}`).then(res => {
        if (res.data.status === 200) {
          setSubcategorylist(res.data.subcategory);
        } else {
          setSubcategorylist([]);
        }
      });
    }
  };

  // const handleImage = (e) => {
  //   setPicture({ image: e.target.files[0] });
  // };

  const handleImage = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.files[0] });
  };

  const submitProduct = (e) => {
    handleUpdate(
      e,
      `/api/update-product/${slug}`, // endpoint for update
      productInput,
      setProduct,
      picture,
      setError
    );
  };

  useEffect(() => {
    document.title = `Edit Product - ${props.company}`;

    // Fetch existing product
    axios.get(`/api/edit-product/${slug}`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
      } else {
        swal("Error", res.data.message, "error");
        navigate("/admin/product");
      }
    });

    // Fetch categories
    axios.get('/api/populate-categories').then(res => {
      if (res.data.status === 200){
        setCategorylist(res.data.category);
      }
    });
  }, [slug, navigate, props.company]);

  useEffect(() => {
  if (productInput.category_id) {
    axios.get(`/api/subcategories/${productInput.category_id}`).then(res => {
      if (res.data.status === 200) {
        setSubcategorylist(res.data.subcategory);
      } else {
        setSubcategorylist([]);
      }
    });
  }
}, [productInput.category_id]);


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
                    <Link to="/admin/product" className="btn btn-primary btn-round me-2">{props.btnBack}</Link>
                </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">

                    <FormComponent
                      fields={[
                        { name: "category_id", label: "Select Category", type: "select", required: true, options: categorylist.map(c => ({ value: c.id, label: c.name })) },
                        { name: "subcategory_id", label: "Select Subcategory", type: "select", required: true, options: subcategorylist.map(sc => ({ value: sc.id, label: sc.name })) },
                        { name: "product", label: "Product", type: "text", required: true },
                        { name: "description", label: "Description", type: "text", required: true },
                        { name: "selling_price", label: "Selling Price", type: "text" }, 
                        { name: "original_price", label: "Original Price", type: "text" }, 
                        { name: "quantity", label: "Quantity", type: "text" }, 
                        { name: "brand", label: "Brand", type: "text" }, 
                        { name: "delivery_time", label: "Delivery Time", type: "text" },

                        { name: "image", label: "Image", type: "file", required: true },
                        { name: "image2", label: "Image 2", type: "file" },
                        { name: "image3", label: "Image 3", type: "file" },
                        { name: "image4", label: "Image 4", type: "file" },
                        { name: "image5", label: "Image 5", type: "file" },
                        { name: "image6", label: "Image 6", type: "file" },
                        { name: "image7", label: "Image 7", type: "file" },
                        { name: "image8", label: "Image 8", type: "file" },

                        { name: "featured_product", label: "Featured Product?", type: "checkbox" },
                        { name: "popular_product", label: "Popular Product?", type: "checkbox" },
                      ]}
                      values={productInput}
                      errors={errorlist}
                      onChange={handleInput}
                      onFileChange={handleImage}
                      onSubmit={submitProduct}
                      submitLabel="Update"
                    />
                    <img src={`${API_BASE_URL}/${productInput.image}`} width="50px" alt={productInput.name} />
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
export default EditProduct;