import React, { useState, useEffect } from "react";
import getStrategyList from "./AIstrategiesdata";
import useWindowSize from "../Hooks/useWindowSize";
import { set } from "date-fns";
import tradeImg from "../../assets/images/trade.jpg";
import Loader from "../Dialogs/Loader";
interface StrategyCardProps {
  AIStrategiesdata: any;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ AIStrategiesdata }) => {
  const [isLoading, setIsLoading] = useState(true);

  // const [AIStrategiesdata, setAIStrategiesdata] = useState<any>([]);
  const windowSize = useWindowSize();

  // const formatNumber = (amount: string): string => {
  //   const suffixes = ['', 'K', 'M', 'B', 'T'];
  //   const suffixNum = Math.floor(amount.replace(/,/g, "").length / 3);
  //   let shortValue = parseFloat((suffixNum !== 0 ? (parseFloat(amount.replace(/,/g, '')) / Math.pow(1000, suffixNum)) : parseFloat(amount.replace(/,/g, ''))).toPrecision(2));
  //   if (shortValue % 1 !== 0) {
  //       shortValue = parseFloat(shortValue.toFixed(1));
  //   }
  //   return shortValue + suffixes[suffixNum];
  // };
  const formatNumber = (amount: string): string => {
    const numericAmount = parseInt(amount?.replace(/,/g, ""), 10);
    if (numericAmount < 100000) {
      return (numericAmount / 1000).toFixed(0) + "K";
    } else if (numericAmount >= 10000000) {
      return (numericAmount / 10000000).toFixed(1) + "Cr";
    } else {
      return (numericAmount / 100000).toFixed(0) + "L";
    }
  };

  function getStrategyDetails(id: any) {
    window.location.href = `/strategypage/${id}`;
  }

  console.log(AIStrategiesdata);
  if (!AIStrategiesdata) {
    return <Loader />;
  }

  return (
    <div>
      {AIStrategiesdata?.map((data: any) => {
        return data?.isLive ? (
          <div
            className={
              windowSize <= 900
                ? "horizontal-card-responsive"
                : "horizontal-card"
            }
            onClick={() => getStrategyDetails(data.StrategyId)}
            key={data.StrategyId}
          >
            {windowSize <= 500 ? (
              <div className="left-half-resposive">
                <img
                  //  src={data.Image}
                  src={tradeImg}
                  alt="Trade Imagz"
                  className="card-image-responsive"
                />
                <div className="card-info-resposive">
                  <div className="card-title-responsive">
                    <h5 className="card-heading-responsive">
                      {data.StrategyName}
                    </h5>
                    <div className="card-title-inner-responsive">
                      <p className="card-author-responsive">by {data.Author}</p>
                      <div className="badge-container">
                        <div className="badge flex-center new-badge-responsive">
                          {data.StrategyTag}
                        </div>
                        <div className="badge flex-center risk-badge-responsive">
                          <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="11"
                            viewBox="0 0 6 11"
                            fill="none"
                          >
                            <path
                              d="M3.90316 3.33741L3.90316 10.8369H2.57103L2.57103 3.33741H0.572825L3.2371 0.8459L5.90137 3.33741H3.90316Z"
                              fill="#F82929"
                            />
                          </svg>
                          {data.Risk}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="card-desc-responsive">
                    {data.StrategyDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="left-half">
                <img
                  // src={data.Image}
                  src={tradeImg}
                  alt="Trade Imagz"
                  className="card-image"
                />
                <div className="card-info">
                  <div className="card-title">
                    <h5 className="card-heading">{data.StrategyName}</h5>
                    <br />
                    <div className="badge-container">
                      <div className="badge flex-center new-badge">
                        {data.StrategyTag}
                      </div>
                      <div className="badge flex-center risk-badge">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                          fill="none"
                        >
                          <path
                            d="M3.90316 3.33741L3.90316 10.8369H2.57103L2.57103 3.33741H0.572825L3.2371 0.8459L5.90137 3.33741H3.90316Z"
                            fill="#F82929"
                          />
                        </svg>
                        {data.Risk}
                      </div>
                    </div>
                  </div>
                  <p className="card-desc">{data.StrategyDescription}</p>
                  <p className="card-author">by {data.Author}</p>
                </div>
              </div>
            )}

            <div
              className={
                windowSize <= 900 ? "right-half-responsive" : "right-half"
              }
            >
              <div
                className={
                  windowSize <= 900 ? "card-metrics-responsive" : "card-metrics"
                }
              >
                {windowSize <= 500 ? (
                  <>
                    <div>
                      <span className="span-cut">
                        <p className="min-cap-responsive">Min. Capital</p>
                        <p className="value-responsive">
                          ₹ {formatNumber(data.MinimumInvestmentCapital)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cap-deployed-responsive">
                          Capital Deployed
                        </p>
                        <p className="value-responsive">
                          ₹ {formatNumber(data.CapitalDeployed)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cagr-responsive">CAGR</p>
                        <p className="value-responsive cagr-value-responsive">
                          {data.CAGR_PCT}%
                        </p>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="span-cut">
                        <p className="min-cap">Min. Capital</p>
                        <p className="value">
                          ₹ {formatNumber(data.MinimumInvestmentCapital)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cap-deployed">Capital Deployed</p>
                        <p className="value">
                          ₹ {formatNumber(data.CapitalDeployed)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cagr">CAGR</p>
                        <p className="value cagr-value">{data.CAGR_PCT}%</p>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          false
        );
      })}
    </div>
  );
};

export { StrategyCard };
