import React from 'react'
import Header from '../_layouts/public/Header'
import Footer from '../_layouts/public/Footer'
import Breadcrumb from '../_layouts/public/Breadcrumb'

const About = () => {
  return (
    <>
    <Header />
    <Breadcrumb pg='About' />

      <section className="product-details spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                                    aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                                    aria-selected="false">Why Choose Us?</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                                    aria-selected="false">Services</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>1. About Us</h6>
                                    <p>Festrut Interior & Furnitures Ltd – The Brand You Can Trust
                                    At Festrut, we redefine living and working spaces with premium interior solutions and bespoke furniture designs. Our mission is to create stylish, functional, and lasting environments for individuals, businesses, and institutions across Nigeria, Africa, and the diaspora.</p>

                                    <p>We serve high-profile clients, including corporate executives, real estate developers, government agencies, and discerning homeowners who value quality, reliability, and elegance. With a commitment to excellence and trust, we stand as your preferred partner in transforming spaces into statements of style.</p>

                                    <br />
                                    <h6>2. Our Vision</h6>

                                    <p>To elevate interiors with trusted quality, blending innovation with sophistication for a diverse audience from Nigerians and Africans in the diaspora to corporate leaders and government institutions.</p>

                                    <p>We envision a future where every space we touch reflects style, comfort, and distinction, supported by strong partnerships, cutting-edge designs, and unmatched customer service.</p>


                                    <br />
                                    <h6>3. Our Brand Promise</h6>

                                    <p>Reliability. Design Excellence. Value-Driven Partnerships.
                                    We promise to deliver interiors that combine elegance, functionality, and durability, ensuring every project meets the highest standards.</p>


                                    <br />
                                    <h6>4. Who We Serve</h6>

                                    <p>Diaspora Nigerians seeking world-class interior solutions</p>
                                    <p>African political elites and civil servants</p>
                                    <p>CEOs and corporate leadership teams</p>
                                    <p>Real estate developers and property managers</p>
                                    <p>Oil & energy industry professionals</p>
                                    <p>Public sector agencies and government procurement teams</p>
                                    
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Why Choose Festrut Interior & Furnitures?</h6>
                                    
                                    <p><b>1. Bespoke Designs: </b>
                                    Tailored solutions for residential, corporate, and government spaces.</p>

                                    <p><b>2. Unmatched Quality: </b>Sourced from the best manufacturers with strict quality control.</p>

                                    <p><b>3. Strategic Partnerships: </b>Strong collaborations for seamless project delivery.</p>

                                    <p><b>4. Trusted Expertise: </b>A brand built on credibility and professional excellence.</p>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-3" role="tabpanel">
                                <div className="product__details__tab__desc">
                                    <h6>Our Services</h6>
                                    <p><b>Interior Design & Decoration: </b>Stylish concepts that transform your vision into reality.</p>

                                    <p><b>Custom Furniture Solutions: </b>Premium pieces for homes, offices, and luxury spaces.</p>

                                    <p><b>Corporate & Real Estate Projects: </b>Dedicated liaison team for developers and businesses.</p>

                                    <p><b>Government Contracts: </b>Fully compliant with procurement standards for public projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </>
  )
}
export default About;