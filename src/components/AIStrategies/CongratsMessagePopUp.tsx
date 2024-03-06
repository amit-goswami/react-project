import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Styles, ThemeTypes } from '../../Utils/Constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
interface PopupProps {
  strategyName: string;
}

const Popup: React.FC<PopupProps> = ({ strategyName }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className='flex-center'
      style={{
        display: isVisible ? 'block' : 'none',
        padding: '10px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckCircleIcon
          style={{ fontSize: 60 }}
          className='check-circle-icon'
        />
        <span style={Styles.h3Text}>
          Congratulations for subscribing to "{strategyName}".
        </span>
        <p>Now you can manage your Portfolio here</p>

        <button style={ThemeTypes.yellowButton}>Manage Portfolio</button>
      </div>
    </div>
  );
};

export const congratsMessagePopup = (strategyName: string) => {
  const popupElement = document.createElement('div');
  document.body.appendChild(popupElement);

  const closePopup = () => {
    ReactDOM.unmountComponentAtNode(popupElement);
    popupElement.remove();
  };

  ReactDOM.render(<Popup strategyName={strategyName} />, popupElement);

  setTimeout(() => {
    closePopup();
  }, 5000);
};
