import { useState, useEffect } from 'react';
import {Navigate } from 'react-router-dom';
import Master from './../components/_layouts/admin/Master';
import axios from 'axios';

function AdminPrivateRoute() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios.get('/api/checkingAuthenticated')
      .then(res => setAuthenticated(res.status === 200))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  return authenticated ? <Master /> : <Navigate to="/login" />;
}
export default AdminPrivateRoute;