import { Link } from "react-router-dom";
import logo2 from './../../../assets/img/logo-no-bg.png';
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Footer = (props) => {
      const [email, setEmail] = useState("");
    
      const handleSubscribe = (e) => {
        e.preventDefault();
    
        // Send email to backend
        axios.post("/api/newsletter-subscribe", { email })
          .then(res => {
            if (res.data.status === 200) {
              swal("Success", res.data.message, "success");
              setEmail("");
            } else {
              swal("Error", res.data.message, "error");
            }
          })
          .catch(err => {
            swal("Error", "Something went wrong.", "error");
          });
      };

  return (
    <footer className="footer spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="footer__about">
                        <div className="footer__about__logo">
                            <Link to="/"><img src={logo2} alt={props.company} style={{width: '70%'}} /></Link>
                        </div>
                        <ul>
                            <li><b>Address: </b>
                            Plot 2311 Festrut Estate, <br />
                            Katampe, Abuja, Nigeria.</li>
                            <li><b>Phone: </b>+234 707 954 3570, <br />
                                +234 809 176 9651</li>
                            <li><b>Email: </b>info@festrutif.com</li>
                            <li><b>Group website: </b><a href="https://festrutgroup.com" target="_blank">festrutgroup.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                    <div className="footer__widget">
                        <h6>Quick Links</h6>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/collections">All Collections</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/about">Who We Are</Link></li>
                            <li><Link to="/about">Our Services</Link></li>
                            <li><Link to="/about">Projects</Link></li>
                            <li><Link to="/about">Innovation</Link></li>
                            <li><Link to="/about">Testimonials</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="footer__widget">
                        <h6>Festrutif &mdash; The Brand You Can Trust</h6>
                        <p>At Festrut Interior & Furnitures, we redefine living and working spaces with premium interior solutions and bespoke furniture designs. Our mission is to create stylish, functional, and lasting environments for individuals, 
                            businesses, and institutions across Nigeria, Africa, and the diaspora.</p>
                        {/* <form action="#">
                            <input type="text" placeholder="Enter your mail" />
                            <button type="submit" className="site-btn">Subscribe</button>
                        </form> */}

                        <h6>Join Our Newsletter Now</h6>
                        {/* <p>Get E-mail updates about our latest shop and special offers.</p> */}
                        <form onSubmit={handleSubscribe}>
                            <input type="email" value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required placeholder="Enter your mail" />

                            <button type="submit" className="site-btn">Subscribe</button>
                        </form>

                        <div className="footer__widget__social">
                            <a href="https://web.facebook.com/profile.php?id=61579964605855"><i className="fa fa-facebook"></i></a>
                            <a href="https://x.com/@FestrutIF"><i className="fa fa-twitter"></i></a>
                            <a href="https://instragram.com/festrutif"><i className="fa fa-instagram"></i></a>
                            <a href="https://wa.me/+2347079543570"><i className="fa fa-whatsapp"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer__copyright">
                        <div className="footer__copyright__text"><p>
                            &copy; Festrut 2025. <a href="https://colorlib.com" target="_blank">Colorlib</a> link.&nbsp;
                            <a href="https://thesoftwarehorizon.com.ng" target="_blank">Web Engineer</a> 
                            </p></div>
                        {/* <div className="footer__copyright__payment"><img src="img/payment-item.png" alt="" /></div> */}
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
export default Footer;