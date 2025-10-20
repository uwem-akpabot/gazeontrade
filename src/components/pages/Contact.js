import React from 'react'
import Header from '../_layouts/public/Header'
import Footer from '../_layouts/public/Footer'
import Breadcrumb from '../_layouts/public/Breadcrumb'

const Contact = () => {
  return (
    <>
    <Header />
    <Breadcrumb pg='Contact' />
    
      <section className="contact spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <div className="contact__widget">
                        <span className="icon_phone"></span>
                        <h4>Phone</h4>
                        <p>+234 809 176 9651, <br />+234 707 954 3570</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <div className="contact__widget">
                        <span className="icon_pin_alt"></span>
                        <h4>Address</h4>
                        <p>Plot 2311 Festrut Estate, Katampe, Abuja, Nigeria.</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <div className="contact__widget">
                        <span className="icon_clock_alt"></span>
                        <h4>Open time</h4>
                        <p>9:00 am to 5:00 pm, <br />
                        Monday to Friday</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <div className="contact__widget">
                        <span className="icon_mail_alt"></span>
                        <h4>Email</h4>
                        <p>info@festrutif.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div className="map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49116.39176087041!2d-86.41867791216099!3d39.69977417971648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886ca48c841038a1%3A0x70cfba96bf847f0!2sPlainfield%2C%20IN%2C%20USA!5e0!3m2!1sen!2sbd!4v1586106673811!5m2!1sen!2sbd"
            height="500" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        <div className="map-inside">
            <i className="icon_pin"></i>
            <div className="inside-widget">
                <h4>Nigeria</h4>
                <ul>
                    <li>Phone: +234 809 176 9651</li>
                    <li>Plot 2311 Festrut Est, Katampe, Abuja</li>
                </ul>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Contact
