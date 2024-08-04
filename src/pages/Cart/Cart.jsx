import { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, foodList, totalSum ,url} =
    useContext(StoreContext);
    const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>item</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>Remove</p>
        </div>
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title  cart-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{cartItems[item._id] * item.price}</p>
                  <p className="close" onClick={() => removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr className="cart-hr" />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <div className="cart-totals-item">
            <p>Subtotal</p>
            <p>$ {totalSum()}</p>
          </div>
          <div className="cart-totals-item">
            <p>Delivery</p>
            <p>$ {totalSum()===0?0:2}</p>
          </div>
          <div className="cart-totals-item">
            <b>Total</b>
            <b>$ {totalSum() === 0 ? 0 : totalSum() + 2}</b>
          </div>
          <button onClick={() => navigate('/order')}>Checkout</button>
        </div>

        <div className="cart-promo-code">
          <p>If you have a promo code type it here</p>
          <div className="promo-input">
            <input type="text" name="promo" placeholder="Enter code" />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
