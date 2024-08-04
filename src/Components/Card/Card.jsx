/* eslint-disable react/prop-types */
import './Card.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const Card = ({ image, name, _id, description, price }) => {
  const id = _id;
  const { cartItems, addToCart, removeFromCart ,url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="overlay">
        <img className="food-image" src={url+"/images/"+image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
            />
            {cartItems[id]}
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-name-item-rating">
          <h3>{name}</h3>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc"> {description} </p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Card;
