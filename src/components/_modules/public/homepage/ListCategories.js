import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]); 

  useEffect(() => {
    axios.get('/api/list-categories').then(res => {
      if (res.status === 200){
        setCategorylist(res.data.category);
      } 
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <ul className="p-0 text-capitalize">
      {loading
    ? [...Array(5)].map((_, idx) => (
        <li
          key={idx}
          className="border-bottom border-2 px-4 py-2"
          style={{ listStyle: "none" }}
        >
          <div
            className="rounded"
            style={{ height: "22px", width: "100%", background: "#aaa" }}
          ></div>
        </li>
      ))
      : 
        categorylist.map((item) => (
          <li key={item.id} className="px-4 border-bottom border-2">
            <Link to={`/collections/${item.slug}`}>{item.name}</Link>
          </li>
        ))
      }
    </ul>
  );
};
export default ListCategories;