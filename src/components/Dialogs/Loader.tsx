import React from 'react';
import Spinner from '../../assets/images/spinner.svg';
const Loader: React.FC = () => {
  return (
    <div className='loader-container'>
      <img className='spinner' src={Spinner} alt='' />
    </div>
  );
};

export default Loader;
