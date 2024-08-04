/* eslint-disable react/prop-types */
import axios from 'axios';
import { food_list } from '../assets/assets.js';
import { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [foodList, setFoodList] = useState([]);
  const url = 'https://food-del-paz9.vercel.app';

  const addToCart = async (id) => {
    if (!cartItems[id]) {
      setCartItems((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
    if (token) {
      await axios.post(url + '/api/cart/add', { id }, { headers: { token } });
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { id },
        { headers: { token } }
      );
    }
  };
  const loadCartData = async (token) => {
    const res = await axios.get(url + '/api/cart/get', { headers: { token } });
    setCartItems(res.data.data);
  };
  const totalSum = () => {
    let sum = 0;
    for (const i in cartItems) {
      if (cartItems[i] > 0) {
        let itemInfo = foodList.find((item) => item._id === i);
        sum += itemInfo.price * cartItems[i];
      }
    }
    return sum;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(url+'/api/food/list');
    setFoodList(res.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    totalSum,
    url,
    token,
    setToken,
    foodList,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
