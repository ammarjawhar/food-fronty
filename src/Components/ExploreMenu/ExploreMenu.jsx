import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from the best of our menu and enjoy your meal with us
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="explore-menu-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt=""
                className={category === item.menu_name ? 'active' : ''}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
