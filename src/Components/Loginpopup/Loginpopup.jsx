import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setData((data) => ({ ...data, [name]: val }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-form" onSubmit={onLogin}>
        <div className="title">
          <h1>{currentState}</h1>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className="log-inputs">
          {currentState === 'Login' ? (
            <></>
          ) : (
            <div className="input-field">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your username"
                required
                value={data.name}
                onChange={onChangeHandler}
              />
            </div>
          )}
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              value={data.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={onChangeHandler}
            />
          </div>

          <button type="submit">
            {currentState === 'Login' ? 'Login' : 'Register'}
          </button>

          <div className="input-condition">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              required
            />
            <label htmlFor="remember-me"></label>
            <p>
              By continuing, you agree to the Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>

        {currentState === 'Login' ? (
          <div className="state">
            <p>Create a new account</p>
            <button onClick={() => setCurrentState('Sign up')} type="submit">
              Click Her
            </button>
          </div>
        ) : (
          <div className="state">
            <p>Already have an account</p>
            <button onClick={() => setCurrentState('Login')} type="submit">
              Login Here
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
