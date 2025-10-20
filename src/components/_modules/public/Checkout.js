import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Header from '../../_layouts/public/Header';
import Footer from '../../_layouts/public/Footer';

const Checkout = (props) => {
    const navigate = useNavigate();

    if (!localStorage.getItem('auth_token')){
        navigate('/');
        swal('Warning', 'Login first before you can access the Cart', 'error');
    }
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState([]);
    var totalCartPrice = 0;

    const formatNaira = (amount) => {
        return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
    };

    const [checkoutInput, setCheckout] = useState({
        fname: '', 
        sname: '', 
        country: '',
        street: '', 
        city: '', 
        thestate: '', 
        phone: '',
        email: '', 
        other: ''
    });

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted){
                if (res.status === 200){
                    setCart(res.data.cart);
                    setLoading(false);
                } 
                else if (res.status === 401){
                    navigate('/');
                    swal('Warning', res.data.message, 'error');
                }
            }
        });
        return () => {
            isMounted = false;
        }
    }, []);
    
    const handleInput = (e) => {
        e.persist();
        setCheckout({...checkoutInput, [e.target.name]: e.target.value })
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            fname: checkoutInput.fname,
            sname: checkoutInput.sname,
            country: checkoutInput.country,
            street: checkoutInput.street, 
            city: checkoutInput.city, 
            thestate: checkoutInput.thestate, 
            phone: checkoutInput.phone,
            email: checkoutInput.email, 
            other: checkoutInput.other
        }

        axios.post(`/api/place-order`, data).then(res => {
            if (res.data.status === 200){
                swal('Order placed successfully', res.data.message, 'success');
                setError([]);
                navigate('/thank-you');
            } 
            else if (res.data.status === 422){ //input fields error
                swal('Fill the mandatory fields', '', 'error');
                setError(res.data.errors);
            }
        });
    }

  if (loading){
    return <p>Loading ...</p>

  } else {
  }

  return (
    <>
    <Header company={props.company} />

    <section className="checkout spad">
        <div className="container">
            <div className="checkout__form">
                <h4>Billing Details</h4>
                <form action="#">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>First Name <span>*</span></p>
                                        <input type="text" name="fname" onChange={handleInput} value={checkoutInput.fname} />
                                        <span className="text-danger">{error.fname}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Surname <span>*</span></p>
                                        <input type="text" name="sname" onChange={handleInput} value={checkoutInput.sname} />
                                        <span className="text-danger">{error.sname}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Phone <span>*</span></p>
                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} />
                                        <span className="text-danger">{error.phone}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Email <span>*</span></p>
                                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} />
                                        <span className="text-danger">{error.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout__input">
                                <p>Address <span>*</span></p>
                                <input type="text" name="street" onChange={handleInput} value={checkoutInput.street} placeholder="Street Address" />
                                <span className="text-danger">{error.street}</span> 
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>Town/City <span>*</span></p>
                                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} />
                                        <span className="text-danger">{error.city}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="checkout__input">
                                        <p>State <span>*</span></p>
                                        <input type="text" name="thestate" onChange={handleInput} value={checkoutInput.thestate} />
                                        <span className="text-danger">{error.thestate}</span>
                                    </div>
                                </div>
                            </div>                            
                            <div className="checkout__input">
                                <p>Country <span>*</span></p>
                                <input type="text" name="country" onChange={handleInput} value={checkoutInput.country} />
                                <span className="text-danger">{error.country}</span>
                            </div>
                            <div className="checkout__input">
                                <p>Order notes</p>
                                <input type="text" name="other" onChange={handleInput} value={checkoutInput.other}
                                    placeholder="Notes about your order, e.g. special notes for delivery." />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            <div className="checkout__order">

                                <h4>Your Order</h4>
                                <div className="checkout__order__products">Products <span>Total</span></div>
                                    <ul>

                                {cart.map((item, idx) => {
                                    totalCartPrice += item.product.selling_price * item.product_qty;

                                    return (
                                        <li key={idx}>
                                            {item.product.product} ({item.product_qty})
                                            <span>{formatNaira(item.product.selling_price * item.product_qty)}</span>
                                        </li>
                                        )
                                    })
                                }
                                    </ul>


                                {/* <div className="checkout__order__subtotal">Subtotal <span>$750.99</span></div> */}
                                <div className="checkout__order__total">Grand Total <span>{formatNaira(totalCartPrice)}</span></div>
                                
                                <h5>Make Payment To: </h5><br />
                                
                                <p>Account number: <b>6141995554</b><br />
                                Account name: <b>Festrut interior & Furnitures Ltd</b><br /> 
                                Bank: <b>Opay</b></p>
                                
                                <button type="submit" onClick={submitOrder} className="site-btn">PLACE ORDER</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <Footer />      
    </>
  )
}
export default Checkout;