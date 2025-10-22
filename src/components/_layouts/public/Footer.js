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
    
    <footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="footer-left">
                        <div className="footer-logo">
                            <a href="#">{props.company}</a>
                        </div>
                        <ul>
                            <li>Address: 60-49 Road 11378 New York</li>
                            <li>Phone: +65 11.188.888</li>
                            <li>Email: hello@gmail.com</li>
                        </ul>
                        <div className="footer-social">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 offset-lg-1">
                    <div className="footer-widget">
                        <h5>Information</h5>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Checkout</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Serivius</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="footer-widget">
                        <h5>My Account</h5>
                        <ul>
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Shopping Cart</a></li>
                            <li><a href="#">Shop</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="newslatter-item">
                        <h5>Join Our Newsletter Now</h5>
                        <p>Get E-mail updates about our latest shop and special offers.</p>
                        <form action="#" className="subscribe-form">
                            <input type="text" placeholder="Enter Your Mail" />
                            <button type="button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-reserved">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright-text">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
export default Footer;