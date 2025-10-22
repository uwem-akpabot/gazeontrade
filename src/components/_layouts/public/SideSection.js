const SideSection = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter" 
        id="sidesection">
        <div className="filter-widget">
            <h4 className="fw-title">Categories</h4>
            <ul className="filter-catagories">
                <li><a href="">All Categories</a></li>
                <li><a href="">Fashion</a></li>
                <li><a href="">Electronics</a></li>
                <li><a href="">Vehicles</a></li>
                <li><a href="">Furniture</a></li>
                <li><a href="">Health and beauty</a></li>
                <li><a href="">Thrifts</a></li>
            </ul>
        </div>

        <div className="filter-widget">
            <h4 className="fw-title">Upcoming Deals</h4>
            810
        </div>

        <div className="filter-widget">
            <h4 className="fw-title">Dates</h4>
            <ul className="filter-catagories">
                <li><a href="">All Dates</a></li>
                <li><a href="">Next 7 Days</a></li>
            </ul>
        </div>

        <div className="filter-widget">
            <h4 className="fw-title">Deal Type</h4>
            <ul className="filter-catagories">
                <li><a href="">Live Deals</a></li>
                <li><a href="">Timed Deals</a></li>
            </ul>
        </div>
        
        {/* <div className="filter-widget">
            <h4 className="fw-title">Tags</h4>
            <div className="fw-tags">
                <a href="#">Towel</a>
                <a href="#">Shoes</a>
                <a href="#">Coat</a>
                <a href="#">Dresses</a>
                <a href="#">Trousers</a>
                <a href="#">Men's hats</a>
                <a href="#">Backpack</a>
            </div>
        </div> */}
    </div>
  )
}
export default SideSection