import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './pages/Homepage/Homepage';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './Components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import LoginPopup from './Components/Loginpopup/Loginpopup';
import { StoreContext } from './Context/StoreContext';

const App = () => {
   const {token} = useContext(StoreContext) 
  const [showLogin, setShowLogin] = useState(false);
  const getUserData = async() => {
      const res = await axios.get(Apis.userData.url , {headers: {token}})
      console.log(res.data)
  }
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
