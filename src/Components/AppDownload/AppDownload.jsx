import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className="app-download" id='download'>
      <p>
        Download our app and get 10% discount on your first order 
        <strong> Tomato App</strong>
      </p>
      <div className="platforms">
        <img src={assets.play_store} alt="play store" />
        <img src={assets.app_store} alt="app store " />
      </div>
    </div>
  );
};

export default AppDownload;
