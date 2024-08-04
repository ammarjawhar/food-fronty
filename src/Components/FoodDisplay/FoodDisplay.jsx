/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './FoodDisplay.css';
import Card from '../Card/Card';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          if(category==="All" || item.category === category) {

            return <Card key={item._id} { ...item } />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
