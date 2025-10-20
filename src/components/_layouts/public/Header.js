import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import logo from './../../../assets/img/logo.png';

const Header = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ use state to track auth instead of checking localStorage directly
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('auth_token')
  );

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal('Success', res.data.message, 'success');

        // setIsAuthenticated(false); // trigger re-render
        window.location.reload(); 
        navigate('/');
      }
    });
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('auth_token'));
  }, []);

  return (
    <>
      <div className="humberger__menu__overlay"></div>
      <div className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
          <Link to="/"><img src={logo} alt={props.company} style={{width: '70%'}} /></Link>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
            <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
          </ul>
          <div className="header__cart__price">item: <span>$150.00</span></div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__auth">
            {!isAuthenticated ? (
              <>
                <Link to="/login"><i className="fa fa-user"></i> Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <button onClick={logoutSubmit} className="btn btn-danger btn-sm">Logout</button>
            )}
          </div>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/collections">All Collections</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
          <a href="https://web.facebook.com/profile.php?id=61579964605855"><i className="fa fa-facebook"></i></a>
          <a href="https://x.com/@FestrutIF"><i className="fa fa-twitter"></i></a>
          <a href="https://instragram.com/festrutif"><i className="fa fa-instagram"></i></a>
          <a href="https://wa.me/+2347079543570"><i className="fa fa-whatsapp"></i></a>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li><i className="fa fa-envelope"></i> info@festrutif.com</li>
          </ul>
        </div>
      </div>
      
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>RC: 8767034</li>
                    <li>+234 809 176 9651</li>
                    <li><i className="fa fa-envelope"></i> info@festrutif.com</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="https://web.facebook.com/profile.php?id=61579964605855"><i className="fa fa-facebook"></i></a>
                    <a href="https://x.com/@FestrutIF"><i className="fa fa-twitter"></i></a>
                    <a href="https://instragram.com/festrutif"><i className="fa fa-instagram"></i></a>
                    <a href="https://wa.me/+2347079543570"><i className="fa fa-whatsapp"></i></a>

                    | &nbsp; &nbsp; 
                    {!isAuthenticated ? (
                      <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                      </>
                    ) : (
                      <button onClick={logoutSubmit} className="btn btn-danger btn-sm">Logout</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to="/"><img src={logo} alt={props.company} style={{width: '70%'}} /></Link>
              </div>
            </div>
            <div className="col-lg-6">

              {/* Mobile Menu */}
              <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

                <Link to="/"><img src={logo} alt={props.company} style={{width: '70%'}} /></Link>
                <p>RC: 8767034</p>
                <ul>
                  <li><Link to="/" onClick={() => setMenuOpen(false)} className="text-primary">Home</Link></li>
                  <li><Link to="/about" onClick={() => setMenuOpen(false)} className="text-primary">About</Link></li>
                  <li><Link to="/collections" onClick={() => setMenuOpen(false)} className="text-primary">Collections</Link></li>
                  <li><Link to="/" onClick={() => setMenuOpen(false)} className="text-primary">Blog</Link></li>
                  <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="text-primary">Contact</Link></li>                    
                  <li><Link to="/cart" onClick={() => setMenuOpen(false)} className="text-primary">Shopping Cart</Link></li>
                  <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
                  <li><Link to="/register"><i className="fa fa-user"></i> Register</Link></li>
                </ul>
                <hr />

                <ul>
                  <li><i className="fa fa-phone"></i> <a href="tel:+2347079543570">+234 707 954 3570</a>, <br />
                    <a href="tel:+2348091769651">+234 809 176 9651</a></li>
                  <li><i className="fa fa-envelope"></i> info@festrutif.com</li>
                </ul>
              </div>

              {/* Overlay */}
              {menuOpen && (
                <div
                  className="mobile-menu-overlay"
                  onClick={() => setMenuOpen(false)}
                ></div>
              )}

              {/* CSS */}
              <style>{`
                .mobile-menu {
                  position: fixed;
                  top: 0;
                  left: -250px;
                  width: 250px;
                  height: 100%;
                  background: #fff;
                  box-shadow: 2px 0 5px rgba(0,0,0,0.3);
                  z-index: 1000;
                  transition: left 0.3s ease;
                  padding: 20px;
                }
                .mobile-menu.open {
                  left: 0;
                }
                .mobile-menu ul {
                  list-style: none;
                  padding: 0;
                }
                .mobile-menu ul li {
                  margin-bottom: 20px;
                }
                .mobile-menu ul li a {
                  text-decoration: none;
                  color: #000;
                  font-weight: 500;
                }
                .mobile-menu-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0,0,0,0.5);
                  z-index: 900;
                }
              `}</style>

              {/* Desktop menu */}
              <nav className="header__menu">
                <ul>
                  <li className="active"><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/collections">Collections</Link></li>
                  <li><Link to="/">Blog</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart header__menu">
                <ul>
                  <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> SHOPPING CART</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="humberger__open" onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "pointer" }}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;