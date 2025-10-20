import React from 'react'
import ElectronicsSection from './ElectronicsSection'
import ThriftsSection from './FashionSection'
import FashionSection from './FashionSection'

const LiveSection = () => {
  return (
    <div id="livesection">
      <div className="left-menu">
        <h3>Categories</h3>
        <ul>
            <li><a href="">All Categories</a></li>
            <li><a href="">Fashion</a></li>
            <li><a href="">Electronics</a></li>
            <li><a href="">Vehicles</a></li>
            <li><a href="">Furniture</a></li>
            <li><a href="">Health and beauty</a></li>
            <li><a href="">Thrifts</a></li>
        </ul>

        <h3>Upcoming Deals</h3>
        <p>810</p>

        <h3>Dates</h3>
        <ul>
            <li><a href="">All Dates</a></li>
            <li><a href="">Next 7 Days</a></li>
        </ul>

        <h3>Deal Type</h3>
        <ul>
            <li><a href="">Live Deals</a></li>
            <li><a href="">Timed Deals</a></li>
        </ul>
      </div>

      <div className="content">
        <div>
            <h2>Live</h2>
        </div>

        <div>
            <h2>Paid</h2>
        </div>

        <div>
            <FashionSection />
        </div>

        <div>
            <ElectronicsSection />
        </div>

        <div>
            <ThriftsSection />
        </div>

      </div>
    </div>
  )
}

export default LiveSection
