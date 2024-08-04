import AppDownload from '../../Components/AppDownload/AppDownload';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import Header from '../../Components/Header/Header';
import './Homepage.css';
import { useState } from 'react';
const Homepage = () => {
  const [category, setCategory] = useState('All');
  return (
    <div className="homepage">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};
export default Homepage;
