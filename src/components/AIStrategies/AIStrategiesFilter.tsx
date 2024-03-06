import React, { useState } from 'react';

interface AIStrategiesFilterProps {
  setAIStrategiesdata: any;
  AIStrategiesdata: any;
}

const AIStrategiesFilter: React.FC<AIStrategiesFilterProps>  = ({setAIStrategiesdata, AIStrategiesdata}) => {
  const [subscriptionType, setSubscriptionType] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [tab, setTab] = useState('All');
  
  const handleSubscriptionTypeChange = (value: string) => {
    setSubscriptionType(value);
  };

  const handleInvestmentAmountChange = (value: string) => {
    setInvestmentAmount(value);
    let filteredData = [];
    switch(value) {
      case 'Any':
        filteredData = AIStrategiesdata;
        break;
      case 'Under 5000':
        filteredData = AIStrategiesdata.filter((strategy: any) => {
          const capital = parseInt(strategy.MinimumInvestmentCapital?.replace(/,/g, ''));
          return capital <= 5000;
        });
        break;
      case 'Under 25000':
        filteredData = AIStrategiesdata.filter((strategy: any) => {
          const capital = parseInt(strategy.MinimumInvestmentCapital?.replace(/,/g, ''));
          return capital <= 25000;
        });
        break;
      case 'Under 50000':
        filteredData = AIStrategiesdata.filter((strategy: any) => {
          const capital = parseInt(strategy.MinimumInvestmentCapital?.replace(/,/g, ''));
          return capital <= 50000;
        });
        break;
      default:
        filteredData = AIStrategiesdata;
        break;
    }
    setAIStrategiesdata(filteredData);
  };
  

  const handleRiskSelection = (value: string) => {
    setSelectedRisk(value);
    const filteredData = AIStrategiesdata.filter((strategy: any) => strategy.Risk === value);
    setAIStrategiesdata(filteredData);
  };

  const handleTabChange = (selectedTab: string) => {
    setTab(selectedTab);
  };

  const ClearAll = () => {
    setSelectedRisk('');
    setInvestmentAmount('');
    setSubscriptionType('');
  };
  return (
    <div className='filters'>
      <div className='filter-title-bar'>
        <h3>
          Filters <span className='filter-count'>0</span>
        </h3>
        <h3 onClick={() => ClearAll()}>Clear All</h3>
      </div>
      <div className='filter-section'>
        <h3>Subscription Type</h3>
        <label>
          <input
            type='radio'
            value='All Types'
            checked={subscriptionType === 'All Types'}
            onChange={() => handleSubscriptionTypeChange('All Types')}
          />
          All Types
        </label>
        <label>
          <input
            type='radio'
            value='Free Access'
            checked={subscriptionType === 'Free Access'}
            onChange={() => handleSubscriptionTypeChange('Free Access')}
          />
          Free Access
        </label>
        <label>
          <input
            type='radio'
            value='Fee Based'
            checked={subscriptionType === 'Fee Based'}
            onChange={() => handleSubscriptionTypeChange('Fee Based')}
          />
          Fee Based
        </label>
      </div>
      <div className='filter-section'>
        <h3>Investment Amount</h3>
        <label>
          <input
            type='radio'
            value='Any'
            checked={investmentAmount === 'Any'}
            onChange={() => handleInvestmentAmountChange('Any')}
          />
          Any
        </label>
        <label>
          <input
            type='radio'
            value='Under 5000'
            checked={investmentAmount === 'Under 5000'}
            onChange={() => handleInvestmentAmountChange('Under 5000')}
          />
          Under 5000
        </label>
        <label>
          <input
            type='radio'
            value='Under 25000'
            checked={investmentAmount === 'Under 25000'}
            onChange={() => handleInvestmentAmountChange('Under 25000')}
          />
          Under 25000
        </label>
        <label>
          <input
            type='radio'
            value='Under 50000'
            checked={investmentAmount === 'Under 50000'}
            onChange={() => handleInvestmentAmountChange('Under 50000')}
          />
          Under 50000
        </label>
      </div>
      <div className='filter-section'>
        <h3>Risk</h3>
        <div className='risk-options'>
          <div
            className={`risk-option flex-center ${
              selectedRisk === 'Low' ? 'selected' : ''
            }`}
            onClick={() => handleRiskSelection('Low Risk')}
          >
            <svg
              className='low'
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='15'
              viewBox='0 0 8 15'
              fill='none'
            >
              <path
                d='M5 11.2825L5 0.610352L3 0.610352L3 11.2825L0 11.2825L4 14.828L8 11.2825H5Z'
                fill='#2ACD1C'
              />
            </svg>
            Low
          </div>
          <div
            className={`risk-option flex-center ${
              selectedRisk === 'Medium' ? 'selected' : ''
            }`}
            onClick={() => handleRiskSelection('Medium Risk')}
          >
            <svg
              className='medium'
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='17'
              viewBox='0 0 14 17'
              fill='none'
            >
              <path
                d='M11 13.171V6.94191H9V13.171H6L10 16.7165L14 13.171H11ZM4 0.72168L0 4.26721H3V10.4963H5V4.26721H8L4 0.72168Z'
                fill='#E7AF1D'
              />
            </svg>
            Medium
          </div>
          <div
            className={`risk-option flex-center ${
              selectedRisk === 'High' ? 'selected' : ''
            }`}
            onClick={() => handleRiskSelection('High Risk')}
          >
            <svg
              className='high'
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='15'
              viewBox='0 0 8 15'
              fill='none'
            >
              <path
                d='M5 4.04467L5 14.7168H3L3 4.04467L0 4.04467L4 0.499138L8 4.04467H5Z'
                fill='#F82929'
              />
            </svg>
            High
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStrategiesFilter;
