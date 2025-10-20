import { Link } from 'react-router-dom';
import logo from './../../../assets/img/logo-no-bg.png';

const Sidebar = () => {
  return (
    <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          <div className="logo-header" data-background-color="dark">
            <Link to="/" className="logo">
              <img
                src={logo}
                alt="navbar brand"
                className="navbar-brand"
                height="50"
              />
            </Link>
            <div className="nav-toggle">
              <button className="btn btn-toggle toggle-sidebar">
                <i className="gg-menu-right"></i>
              </button>
              <button className="btn btn-toggle sidenav-toggler">
                <i className="gg-menu-left"></i>
              </button>
            </div>
            <button className="topbar-toggler more">
              <i className="gg-more-vertical-alt"></i>
            </button>
          </div>
        </div>
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li class="nav-item">
                <Link to="/admin/dashboard">
                  <i class="fa fa-home"></i>
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
                <h4 className="text-section">Navigation</h4>
              </li>
                  
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#sidebarCategories">
                  <i className="fas fa-th-list"></i>
                  <p>Categories</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="sidebarCategories">
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/add-category">
                        <span className="sub-item">Add Category</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/category">
                        <span className="sub-item">Category</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#sidebarSubcategories">
                  <i className="far fa-map"></i>
                  <p>Subcategories</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="sidebarSubcategories">
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/add-subcategory">
                        <span className="sub-item">Add Subcategory</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/subcategory">
                        <span className="sub-item">Subcategory</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#sidebarProducts">
                  <i className="far fa-chart-bar"></i>
                  <p>Products</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="sidebarProducts">
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/add-product">
                        <span className="sub-item">Add Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/product">
                        <span className="sub-item">Product</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <Link to="/admin/orders">
                  <i class="fa fa-gift"></i>
                  <p>Orders</p>
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/admin/banner">
                  <i class="fas fa-table"></i>
                  <p>Banner image</p>
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/admin/newsletter">
                  <i class="fas fa-pen-square"></i>
                  <p>Newsletter</p>
                </Link>
              </li>

              {/* <i className="fas fa-layer-group"></i>
              <i className="fas fa-pen-square"></i>              
              <i className="fas fa-table"></i>              
              <i className="fas fa-map-marker-alt"></i>              
              <i className="far fa-chart-bar"></i>
              <i className="fas fa-desktop"></i>
              <i className="fas fa-file"></i> */}
              
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Sidebar
