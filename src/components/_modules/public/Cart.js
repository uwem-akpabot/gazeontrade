import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../_layouts/public/Header';
import Footer from '../../_layouts/public/Footer';
import { API_BASE_URL } from '../../Main';

const Cart = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  const formatNaira = (amount) => {
    return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 0 });
  };

  if (!localStorage.getItem('auth_token')){
    navigate('/');
    swal('Warning', 'Login first before you can access the Cart', 'error');
  }

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

  const handleDecrement = (cart_id) => {
    setCart(cart => 
      cart.map((item) => 
        cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1:0) } : item
      )
    );
    updateCartQuantity(cart_id, 'dec')
  }

  const handleIncrement = (cart_id) => {
    setCart(cart => 
      cart.map((item) => 
        cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1:0) } : item
      )
    );
    updateCartQuantity(cart_id, 'inc')
  }

  function updateCartQuantity(cart_id, scope){
    axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
      if (res.data.status === 200){
        // swal('Success', res.data.message, 'success'); 
      } 
    });
  }

  const deleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Removing';

    axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
      if (res.data.status === 200){
        swal('Success', res.data.message, 'success');
        thisClicked.closest('tr').remove();

      } else if (res.data.status === 404){
        swal('Error', res.data.message, 'error')
        thisClicked.innerText = '<i className="icon_close"></i>';
      }
    });
  }

  if (loading){
    return <p>Loading ...</p>

  } else {
  }

  var cart_HTML = '';
  if (cart.length > 0){
    cart_HTML = (
      <>
      <div className="row">
          <div className="col-lg-12">
              <div className="shoping__cart__table">
                  <table>
                      <thead>
                          <tr>
                              <th className="shoping__product">Products</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>

                        {cart.map((item) => {
                          totalCartPrice += item.product.selling_price * item.product_qty;

                          return (
                          
                          <tr>
                              <td className="shoping__cart__item">
                                  <img src={`${API_BASE_URL}/${item.product.image}`} width="50px" alt={item.product.product} />
                                  <h5>{item.product.product}</h5>
                              </td>
                              <td className="shoping__cart__price">
                                  {formatNaira(item.product.selling_price)}
                              </td>
                              <td className="shoping__cart__quantity">
                                  <div className="quantity">
                                      <div className="pro-qty">
                                        <button onClick={() => handleDecrement(item.id)} className="btn btn-primary"> - </button>
                                          <input type="text" value={item.product_qty} />
                                        <button onClick={() => handleIncrement(item.id)} className="btn btn-primary"> + </button>
                                      </div>
                                  </div>
                              </td>
                              <td className="shoping__cart__total">
                                {formatNaira(item.product.selling_price * item.product_qty)}
                              </td>
                              <td className="shoping__cart__item__close">
                                <button onClick={(e)=> deleteCartItem(e, item.id) } className="btn btn-danger btn-sm py-0 px-1"><i className="icon_close"></i></button>
                              </td>
                          </tr>
                          )
                        })}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-lg-6">
              <div className="shoping__continue">
              </div>
          </div>
          <div className="col-lg-6">
              <div className="shoping__checkout">
                  <h5>Cart Total</h5>
                  <ul>
                      <li>Subtotal <span className="text-dark">{formatNaira(totalCartPrice)}</span></li>
                      <li>Total <span>{formatNaira(totalCartPrice)}</span></li>
                  </ul>
                  <Link to="/checkout" className="primary-btn">PROCEED TO CHECKOUT</Link>
              </div>
          </div>
      </div>
    </>
    )
    
  } else {
    cart_HTML = 
    <div className="row">
      <div className="col-lg-12">
        <div className="shoping__cart__table">
          <h4>Your shopping cart is empty</h4>
        </div>
      </div>
    </div>
  }

  return (
    <> 
    <Header company={props.company} />

    <section className="shoping-cart spad">
        <div className="container">
            
          {cart_HTML}

        </div>
    </section>

    <Footer />
    </>
  )
}
export default Cart;