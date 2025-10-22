import React from 'react'
import FashionSection from './FashionSection'
import ElectronicsSection from './ElectronicsSection'
import ThriftsSection from './ThriftsSection'
import Hero from './Hero'

const ContentSection = () => {
  return (
    <div className="col-lg-9 order-1 order-lg-2">
        <div className="filter-widget">
            <h4 className="fw-title">Live</h4>
        </div>

        <div className="product-list">
            <div className="row">
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="product-item">
                        <div className="pi-pic">
                            <img src="img/products/product-1.jpg" alt="" />
                            <ul>
                                <li className="quick-view"><a href="#" className="text-white">Join Now</a></li>
                            </ul>
                        </div>
                        <div className="pi-text">
                            <a href="#">
                                <h6><b>Denim Jean</b></h6>
                            </a>
                            <div className="product-price text-danger">
                                $1,100
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <Hero /> */}

        <FashionSection />

        <ElectronicsSection />

        <ThriftsSection />
    </div>
  )
}

export default ContentSection
