import Footer from "../../_layouts/public/Footer";
import Header from "../../_layouts/public/Header";

const Thankyou = (props) => {
  var thankyou_msg = '';
  
  thankyou_msg = 
    <div className="row">
      <div className="col-lg-12">
        <div className="shoping__cart__table">
          <h4>Thank you for your purchase!</h4>
        </div>
      </div>
    </div>

  return (
    <> 
    <Header company={props.company} />
    <section className="shoping-cart spad">
        <div className="container">
            
          {thankyou_msg}

        </div>
    </section>
    <Footer />
    </>
  )
}
export default Thankyou;