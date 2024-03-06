import React, { useEffect, useState } from 'react';
import './broker.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KiteImg from '../../../assets/images/kite.png';
import { decodeJwtToken } from '../../../API/DecodeJWTFunction';
import { showPopUpMessage } from '../../PopUp';
import Loader from '../../Dialogs/Loader';
import {
  FetchBrokerDetailsAPI,
  handleBrokerFormSubmit,
} from '../../../API/ProfileAPI';

interface FormData {
  customerId: string;
  broker: string;
  loginId: string;
  password: string;
  cdslPin: string;
  totpKey: string;
  apiKey: string;
  apiSecret: string;
}

export const BrokerSettings: React.FC = () => {
  const decodedToken = decodeJwtToken();
  const userId = String(decodedToken?.user_id) || '';
  const [isConnected, SetIsConnected] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    customerId: String(userId),
    broker: 'ZERODHA',
    loginId: '',
    password: '',
    cdslPin: '',
    totpKey: '',
    apiKey: '',
    apiSecret: '',
  });

  const [formErrors, setFormErrors] = useState<Record<keyof FormData, string>>({
    customerId: '',
    broker: '',
    loginId: '',
    password: '',
    cdslPin: '',
    totpKey: '',
    apiKey: '',
    apiSecret: '',
  });
  useEffect(() => {
    fetchBrokerDetails(formData.customerId);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const fetchBrokerDetails = async (customerId: string) => {
    try {
      const result = await FetchBrokerDetailsAPI(customerId);
      console.log(result);
      setIsLoading(false);

      if (result.response_code === 200 && result.response_data.length > 0) {
        setFormData(result.response_data[0]);
        SetIsConnected(true);
      } else {
        console.log('Failed to fetch broker details.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ''
    );
    if (hasEmptyField) {
      setFormErrors({
        customerId: '',
        broker: '',
        loginId: formData.loginId.trim() ? '' : 'Login ID is required.',
        password: formData.password.trim() ? '' : 'Password is required.',
        cdslPin: formData.cdslPin.trim() ? '' : 'CDSL Pin is required.',
        totpKey: formData.totpKey.trim() ? '' : 'TOTP Key is required.',
        apiKey: formData.apiKey.trim() ? '' : 'API Key is required.',
        apiSecret: formData.apiSecret.trim() ? '' : 'API Secret is required.',
      });
      return;
    }
    try {
      const result = await handleBrokerFormSubmit(formData);
      console.log(result);

      alert(result.response_message);
      // showPopUpMessage(result.response_message);

      // console.log(result.response_message);
      SetIsConnected(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='broker-page-details'>
      <div className='broker-profile-body'>
        <div className='broker-profile-card'>
          <div className='broker-partner-section'>
            <img className='broker-logo' alt='Img' src={KiteImg} />
            <div className='broker-profile-title'>Kite</div>
          </div>

          <div className='' onClick={() => setShowForm(!showForm)}>
            <div>
              {isConnected ? (
                <div className='connect-btn-body'>
                  <div className='check-icon'>
                    <CheckCircleIcon />
                  </div>
                  <div className='btn-text'>Connected</div>
                  {showForm ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
              ) : (
                <div className='connect-btn-body'>
                  {/* <CheckCircleIcon /> &nbsp; */}
                  <div className='btn-text'>Connect</div>
                  {showForm ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <hr className='horizontal-line' />

            <div className='form-row'>
              <label>
                LogIn <br />
                <input
                  type='text'
                  name='loginId'
                  value={formData.loginId}
                  onChange={handleInputChange}
                />
                {formErrors.loginId && (
                  <span className='form-input-error-message'>
                    *{formErrors.loginId}
                  </span>
                )}
              </label>
              <br />
              <label>
                Password
                <br />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && (
                  <span className='form-input-error-message'>
                    *{formErrors.password}
                  </span>
                )}
              </label>
            </div>
            <div className='form-row'>
              <label>
                CDSL Pin
                <br />
                <input
                  type='text'
                  name='cdslPin'
                  value={formData.cdslPin}
                  onChange={handleInputChange}
                />
                {formErrors.cdslPin && (
                  <span className='form-input-error-message'>
                    *{formErrors.cdslPin}
                  </span>
                )}
              </label>
              <br />
              <label>
                TOTP Key
                <br />
                <input
                  type='text'
                  name='totpKey'
                  value={formData.totpKey}
                  onChange={handleInputChange}
                />
                {formErrors.totpKey && (
                  <span className='form-input-error-message'>
                    *{formErrors.totpKey}
                  </span>
                )}
              </label>
            </div>
            <div className='form-row'>
              <label>
                API Key &nbsp;
                <br />
                <input
                  type='text'
                  name='apiKey'
                  value={formData.apiKey}
                  onChange={handleInputChange}
                />
                {formErrors.apiKey && (
                  <span className='form-input-error-message'>
                    *{formErrors.apiKey}
                  </span>
                )}
              </label>
              <br />
              <label>
                API Secret
                <br />
                <input
                  type='text'
                  name='apiSecret'
                  value={formData.apiSecret}
                  onChange={handleInputChange}
                />
                {formErrors.apiSecret && (
                  <span className='form-input-error-message'>
                    *{formErrors.apiSecret}
                  </span>
                )}
              </label>
            </div>

            <br />
            <button type='submit' className='broker-save-btn'>
              Save
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default BrokerSettings;
