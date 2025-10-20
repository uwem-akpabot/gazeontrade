import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Foot from '../../../_layouts/admin/Foot';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../Main';
import TableComponent from '../../../../components/_generics/TableComponent';
import { handleDelete } from '../../../../utils/handleDelete';

const Sample = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [samplelist, setSamplelist] = useState([]);   // always array
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Fetch paginated data
  const fetchSamples = (pageNum = 1) => {
    setLoading(true);
    axios.get(`/api/sample?page=${pageNum}`).then(res => {
      if (res.status === 200) {
        const paginated = res.data.sample;   // unwrap sample
        setSamplelist(paginated.data || []); // array of records
        setLastPage(paginated.last_page || 1);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    document.title = `Sample - ${props.company}`;
    fetchSamples(page);
  }, [page]);

  const deleteSample = (slug) => {
    handleDelete(`/api/delete-sample/${slug}`, () => {
      // remove from state after success
      setSamplelist((prev) => prev.filter((item) => item.slug !== slug));
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
                  <h6 className="op-7 mb-2">{props.company}</h6>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                  <Link to="/admin/add-sample" className="btn btn-primary btn-round">
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
                        columns={["S/N", "Image", "Product", "Price (Naira)", "Category", "Action"]}
                        data={samplelist || []}  // always safe
                        renderRow={(item, i) => (
                          <tr key={i}>
                            <td>{(page - 1) * 10 + (i + 1)}</td>
                            <td>
                              <img src={`${API_BASE_URL}/${item.image}`} width="40px" height="30px" alt={item.name} />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.category?.name || "-"}</td>
                            <td>
                              <Link to={`/admin/edit-sample/${item.slug}`} className="btn btn-success btn-sm" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link> &nbsp;
                              <button 
                                type="button" 
                                onClick={() => deleteSample(item.slug)} 
                                className="btn btn-danger btn-sm" title="Delete"
                              >
                                <i className="fa fa-trash"></i>
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
export default Sample;