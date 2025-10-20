import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../Main';
import TableComponent from '../../../_generics/TableComponent';
import { handleDelete } from '../../../../utils/handleDelete';

const Subcategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [subcategorylist, setSubcategorylist] = useState([]);   // always array
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  // Fetch paginated data
  const fetchSubcategories = (pageNum = 1) => {
    setLoading(true);
    axios.get(`/api/subcategory?page=${pageNum}`).then(res => {
      if (res.status === 200) {
        const paginated = res.data.subcategory;   // unwrap
        setSubcategorylist(paginated.data || []); // array of records
        setLastPage(paginated.last_page || 1);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    document.title = `Subcategories - ${props.company}`;
    fetchSubcategories(page);
  }, [page]);

  const deleteSubcategory = (slug) => {
    handleDelete(`/api/delete-subcategory/${slug}`, () => {
      // remove from state after success
      setSubcategorylist((prev) => prev.filter((item) => item.slug !== slug));
    });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
      <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
      
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
                  <Link to="/admin/add-subcategory" className="btn btn-primary btn-round">
                    {props.btnAdd}
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">   
                    <div className="card-body">
                      <TableComponent
                        loading={loading}
                        columns={["S/N", "Image", "Subcategory", "Category", "Action"]}
                        data={subcategorylist || []}  // always safe
                        renderRow={(item, i) => (
                          <tr key={i}>
                            <td>{(page - 1) * 10 + (i + 1)}</td>
                            <td>
                              <img src={`${API_BASE_URL}/${item.image}`} width="40px" height="30px" alt={item.name} />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category?.name || "-"}</td>
                            <td>
                              <Link to={`/admin/subcategory-detail/${item.slug}`} title="View">
                                <i className="fa fa-microscope text-success"></i>
                              </Link> &nbsp; &nbsp;
                              
                              <Link to={`/admin/edit-subcategory/${item.slug}`} title="Edit">
                                <i className="fa fa-edit text-primary"></i>
                              </Link> &nbsp;

                              <button 
                                type="button" 
                                onClick={() => deleteSubcategory(item.slug)} 
                                  className="border-0 bg-transparent" title="Delete"
                              >
                                <i className="fa fa-trash text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        )}
                      />

                      {/* Pagination Controls */}
                      <div className="mt-3">
                        <button 
                          className="btn btn-secondary btn-sm me-2" 
                          disabled={page <= 1} 
                          onClick={() => setPage(p => p - 1)}
                        >
                          Previous
                        </button>
                        <span> Page {page} of {lastPage} </span>
                        <button 
                          className="btn btn-secondary btn-sm ms-2" 
                          disabled={page >= lastPage} 
                          onClick={() => setPage(p => p + 1)}
                        >
                          Next
                        </button>
                      </div>

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
  );
};
export default Subcategory;