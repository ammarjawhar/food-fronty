import { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';

import axios from 'axios';
import './PlaceOrder.css';
const PlaceOrder = () => {
  const { totalSum, token, url, cartItems, foodList } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    street: '',
    country: '',
    zip: '',
    phone: '',
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setData((data) => ({ ...data, [name]: val }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalSum() + 2,
    };

    let response = await axios.post(url + '/api/order/place', orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('ERROR');
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="left">
        <p className="title"> Delivery Information</p>
        <div className="inp-field">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={onChangeHandler}
          value={data.city}
          required
        />
        <div className="inp-field">
          <input
            type="text"
            name="state"
            placeholder="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="street"
            onChange={onChangeHandler}
            value={data.street}
            required
          />
        </div>
        <div className="inp-field">
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip code"
            onChange={onChangeHandler}
            value={data.zip}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          id="Phone"
          placeholder="Phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="right">
        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <div className="cart-totals-item">
            <p>Subtotal</p>
            <p>$ {totalSum()}</p>
          </div>
          <div className="cart-totals-item">
            <p>Delivery</p>
            <p>$ {totalSum() === 0 ? 0 : 2}</p>
          </div>
          <div className="cart-totals-item">
            <b>Total</b>
            <b>$ {totalSum() === 0 ? 0 : totalSum() + 2}</b>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
