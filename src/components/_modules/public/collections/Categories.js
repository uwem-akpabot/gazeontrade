import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../_layouts/public/Breadcrumb';
import Header from '../../../_layouts/public/Header';
import Footer from '../../../_layouts/public/Footer';
import { API_BASE_URL } from './../../../Main';

const Categories = (props) => {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]); 

  useEffect(() => {
    axios.get('/api/categories').then(res => {
      if (res.status === 200){
        setCategorylist(res.data.category);
      } 
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
    <Header company={props.company} />
    <Breadcrumb pg='Collections' />

    <section className="categories featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                  <h2>Categories List</h2>
              </div>
            </div>
          </div>
          <div className="row gx-3">
            {loading
              ? [...Array(8)].map((_, idx) => (
                <div key={idx} className="col-lg-3 mb-5">
                  <div
                    className="categories__item set-bg"
                    style={{ height: "265px", background: "#ccc" }}
                  ></div>
                </div>
              ))
            : categorylist.map((item) => (
              <div key={item.id} className="col-lg-3 mb-5">
                <div className="categories__item set-bg"
                  style={{ backgroundImage: `url(${API_BASE_URL}/${item.image})`,
                  }}>
                  <h5><Link to={`/collections/${item.slug}`}>{item.name}</Link></h5>
                </div>
              </div>
            ))}
          </div>

        </div>
    </section>
    <Footer />
    </>
  );
};
export default Categories;