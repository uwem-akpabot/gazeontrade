import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Dash = (props) => {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });

  useEffect(() => {
    axios.get("/api/dashboard-stats").then(res => {
      if (res.data.status === 200) {
        setStats(res.data);
      }
    });
  }, []);

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  return (
    <div className="page-inner">
        <div
            className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
        >
            <div>
            <h3 className="fw-bold mb-3">{props.page}</h3>
            </div>
            <div className="ms-md-auto py-2 py-md-0">
            <Link to="/admin/add-category"className="btn btn-label-info btn-round me-2">Add Category</Link>
            <Link to="/admin/add-product" className="btn btn-primary btn-round">Add Product</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
                <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-icon">
                    <div
                        className="icon-big text-center icon-primary bubble-shadow-small"
                    >
                        <i className="fas fa-luggage-cart"></i>
                    </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                        <p className="card-category">Products</p>
                        <h4 className="card-title">{stats.products?.toLocaleString()}</h4>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
                <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-icon">
                    <div
                        className="icon-big text-center icon-info bubble-shadow-small"
                    >
                        <i className="fas fa-user-check"></i>
                    </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                        <p className="card-category">Categories</p>
                        <h4 className="card-title">{stats.categories?.toLocaleString()}</h4>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
                <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-icon">
                    <div
                        className="icon-big text-center icon-success bubble-shadow-small"
                    >
                        <i className="fas fa-check-circle"></i>
                    </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                        <p className="card-category">Total Orders</p>
                        <p className="card-title">{formatNaira(stats.orderitems?.toLocaleString())}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
                <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-icon">
                    <div
                        className="icon-big text-center icon-secondary bubble-shadow-small"
                    >
                        <i className="fas fa-users"></i>
                    </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                        <p className="card-category">Orders</p>
                        <h4 className="card-title">{stats.orders?.toLocaleString()}</h4>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8">
            <div className="card card-round">
                <div className="card-header">
                <div className="card-head-row">
                    <div className="card-title">Statistics</div>
                </div>
                </div>
                <div className="card-body">
                <div className="chart-container" style={{minHeight: '375px'}}>
                    <canvas id="statisticsChart"></canvas>
                </div>
                <div id="myChartLegend"></div>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card card-primary card-round">
                <div className="card-header">
                <div className="card-head-row">
                    <div className="card-title">Information</div>
                    <div className="card-tools">
                    </div>
                </div>
                <div className="card-category">Latest sale</div>
                </div>
                <div className="card-body pb-0">
                <div className="mb-4 mt-2">
                    <h1>N304,578</h1>
                </div>
                <div className="pull-in">
                    <canvas id="dailySalesChart"></canvas>
                </div>
                </div>
            </div>
            <div className="card card-round">
                <div className="card-body pb-0">
                <div className="h1 fw-bold float-end text-primary">+5%</div>
                <h2 className="mb-2">17</h2>
                <p className="text-muted">Users</p>
                <div className="pull-in sparkline-fix">
                    <div id="lineChart"></div>
                </div>
                </div>
            </div>
            </div>
        </div>

        </div>
  )
}
export default Dash;