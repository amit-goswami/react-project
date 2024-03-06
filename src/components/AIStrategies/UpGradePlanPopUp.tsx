import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Styles, ThemeTypes } from '../../Utils/Constants';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CloseIcon from '@mui/icons-material/Close';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);
  // const navigate = useNavigate();

  const closePopup = () => {
    setIsVisible(false);
  };

  const navigateToPlans = () => {
    // navigate('/profile/3');
  };

  return (
    <div
      className='flex-center'
      style={{
        display: isVisible ? 'block' : 'none',
        padding: '20px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        zIndex: 999,
        width: '25rem',
        height: '11rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='flex-center flex-col'>
          <span>
            <ReportProblemIcon style={{ fontSize: 40, color: 'red' }} />
          </span>
          <span style={Styles.h3Text}>Alert!</span>
          <div className='flex-center flex-col'>
            <span>Your current plan accommodates only 1 lots</span>
            <span>Upgrade Now to unlock.</span>
            <span
              style={{
                justifyContent: 'space-evenly',
                width: '100%',
              }}
              className='flex-center flex-row'
            >
              <a href='/profile/3'>
                <button
                  // onClick={() => navigate('/profile')}
                  className='flex-center'
                >
                  {/* <Link to='/profile/3'>
                </Link> */}
                  <UpgradeIcon />
                  Upgrade Plan
                </button>
              </a>

              <button
                onClick={closePopup}
                style={{
                  color: '#2747dd',
                  backgroundColor: '#fff',
                  border: 'solid',
                }}
                className='flex-center '
              >
                <CloseIcon />
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const UpGradePlanMessagePopup = () => {
//   // const popupElement = document.createElement('div');
//   // document.body.appendChild(popupElement);

//   // ReactDOM.render(<Popup />, popupElement);
//   return (
//     <div>
//       <Popup />
//     </div>
//   );
// };

export const UpGradePlanMessagePopup = () => {
  const popupElement = document.createElement('div');
  document.body.appendChild(popupElement);
  ReactDOM.render(<Popup />, popupElement);
  return (
    <BrowserRouter>
      <Popup />
    </BrowserRouter>
  );
};
