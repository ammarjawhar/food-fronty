/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Navbar.css';
import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { cartItems, food_list, totalSum, token, setToken } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const onLogout = () => {
    setToken('');
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="nav-menu">
        <Link
          to={'/'}
          className={menu === 'home' ? 'active' : ''}
          onClick={() => setMenu('home')}
        >
          Home
        </Link>
        <a
          href="#menu"
          className={menu === 'menu' ? 'active' : ''}
          onClick={() => setMenu('menu')}
        >
          Menu
        </a>
        <a
          href="#download"
          className={menu === 'mobile-app' ? 'active' : ''}
          onClick={() => setMenu('mobile-app')}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          className={menu === 'contact-us' ? 'active' : ''}
          onClick={() => setMenu('contact-us')}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="profile" className="search-icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="profile" />

            <div className={totalSum() ? 'dot' : ''}></div>
          </Link>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>LogIn</button>
        ) : (
          <div className="profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="profile-dropdown">
              <li>
                <img src={assets.bag_icon} />
                <p>Orders</p>
              </li>
              <li onClick={onLogout}>
                <img src={assets.logout_icon} alt="logout" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
