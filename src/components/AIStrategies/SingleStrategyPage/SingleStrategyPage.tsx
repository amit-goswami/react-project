import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./strategypage.css";
import tradeImg from "../../../assets/images/trade.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ExtensionIcon from "@mui/icons-material/Extension";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../Footer";
import Header, { CurrentPage } from "../../Header/Header";
import useWindowSize from "../../Hooks/useWindowSize";
import { getStrategyDetails } from "../AIstrategiesdata";
import { useParams } from "react-router-dom";
import DailyViewContainer from "../../Results/DailyViewContainer";
import MonthlyViewContainer from "../../Results/MonthlyViewContainer";
import WeekDayViewContainer from "../../Results/WeekDayViewContainer";
import ResultsSummaryContainer from "../../Results/ResultsSummaryContainer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Theme } from "../../../Utils/Constants";
import { ResultsAPIModule } from "../../../API/ResultsAPI";
import TestResultsParser from "../../../Utils/TestResultsParser";
import { BackTestAPIResponse } from "../../../API/API.interface";
import { AuthModule } from "../../../API/Auth";
import { SubscribeToStrategyAPI } from "../../../API/StrategiesAPIS";
import PLLineGraph from "../../PLLineGraph/PLLineGraph";
import {
  UserLiveTradeAPI,
  getSubscriptionDetails,
} from "../../../API/LiveTodayAPI";
import { decodeJwtToken } from "../../../API/DecodeJWTFunction";
import { congratsMessagePopup } from "../CongratsMessagePopUp";
import { UpGradePlanMessagePopup } from "../UpGradePlanPopUp";
import Loader from "../../Dialogs/Loader";
import { MockRunTestsAPI } from "../../../API/StrategiesAPIS";

const SingleStrategyPage: React.FC = () => {
  const [strategyDetails, setStrategyDetails] = useState<any>(null);
  const [showROIPerct, setROIPerct] = React.useState<boolean>(false);
  const windowSize = useWindowSize();
  const { id } = useParams<{ id: any }>();
  const [showPopup, setShowPopup] = useState(false);
  const [results, setResults] = useState<TestResultsParser>(null as any);
  const [lots, setLots] = useState<number>(0);
  const [termsConditionAccepted, setTermsConditionAccepted] =
    useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const decodedToken = decodeJwtToken();
  const userId = String(decodedToken?.user_id) || "";
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (path: string, options?: { state?: any }) => {
    navigate(path, options);
  };

  const handleRadioClick = () => {
    setTermsConditionAccepted((prevCondition) => !prevCondition);
  };

  // const formatNumber = (amount: string): string => {
  //   const suffixes = ['', 'K', 'L', 'B', 'T'];
  //   const suffixNum = Math.floor(amount?.replace(/,/g, '')?.length / 3);
  //   let shortValue = parseFloat(
  //     (suffixNum !== 0
  //       ? parseFloat(amount?.replace(/,/g, '')) / Math.pow(1000, suffixNum)
  //       : parseFloat(amount?.replace(/,/g, ''))
  //     ).toPrecision(2)
  //   );
  //   if (shortValue % 1 !== 0) {
  //     shortValue = parseFloat(shortValue.toFixed(1));
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

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await MockRunTestsAPI({
          fromDate: "2018-01-01",
          toDate: "2023-05-30",
          entryTime: "09:16",
          exitTime: "15:05",
          strategies: [
            {
              sequence: 1,
              slPerct: 5,
              tpPerct: 5,
              instrumentName: "NIFTYBANK",
              optionType: "CE",
              actionType: "Buy",
              lots: 1,
              atmDiff: 0,
            },
          ],
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          showResults(jsonResponse as BackTestAPIResponse);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, []);

  function showResults(results: BackTestAPIResponse) {
    const optionsParse = new TestResultsParser(results);
    setResults(optionsParse);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStrategyDetails(id);
        setStrategyDetails(data.response_data);
      } catch (error) {
        console.error("Error fetching strategy details:", error);
      }
    };

    fetchData();
  }, [id, userId]);

  const requestData = {
    strategy_id: `${strategyDetails?.StrategyId}`,
    lots: lots || 0,
    is_active: true,
    strategy_name: `${strategyDetails?.StrategyName}`,
  };

  const handleSubscribe = async () => {
    if (termsConditionAccepted) {
      if (lots > 1) {
        // UpGradePlanMessagePopup();
        UpGradePlanMessagePopup();
      } else {
        try {
          const apiResponse = await SubscribeToStrategyAPI(requestData);
          setMessage(apiResponse.message);
          congratsMessagePopup(requestData.strategy_name);
        } catch (error: any) {
          setMessage(error.message);
          alert(error.message);
        }
      }

      setShowPopup(false);
      setTermsConditionAccepted(false);
      setLots(0);
    } else {
      setMessage("Accept the terms and condition");
      // alert('Accept the terms and condition');
    }
  };

  const handleSubscribePopUp = () => {
    setShowPopup(true);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
    setTermsConditionAccepted(false);
    setLots(0);
  };

  function getDailyResultsContainer() {
    return (
      <div style={{ ...styles.container, ...styles.marginTopper }}>
        <p style={styles.metricsHeader}>Trade Log</p>
        <DailyViewContainer key="DailyViewContainer" results={results} />
      </div>
    );
  }

  function getMonthlyViewContainer() {
    return (
      <div style={{ ...styles.container, ...styles.marginTopper }}>
        <p style={styles.metricsHeader}>Month Wise Breakup</p>
        <MonthlyViewContainer
          key="monthlyViewContainer"
          showPerct={showROIPerct}
          margins={results?.getMargins()}
          results={results?.getMonthlyView()}
        />
      </div>
    );
  }

  function getWeekDayViewContainer() {
    return (
      <div style={{ ...styles.container, ...styles.marginTopper }}>
        <p style={styles.metricsHeader}>Day Wise Breakup</p>
        <WeekDayViewContainer
          key="weeklyDayView"
          showPerct={showROIPerct}
          margins={results?.getMargins()}
          results={results?.getWeekDayView()}
        />
      </div>
    );
  }

  function getResultsSummaryContainer() {
    return (
      <div style={styles.container}>
        <p style={styles.metricsHeader}>Key Parameters</p>
        <ResultsSummaryContainer
          key="resultsSummaryContainer"
          data={results?.getResultsSummary()}
        />
      </div>
    );
  }

  useEffect(() => {
    const fetchSubsriptionDetailsData = async () => {
      try {
        const details = await getSubscriptionDetails();

        const responseDataArray = details.Response_data || [];

        responseDataArray.forEach((data) => {
          if (id === data.strategy_id) {
            setIsSubscribed(true);
          }
        });
      } catch (error: any) {}
    };
    fetchSubsriptionDetailsData();
    // if (message != '') {
    //   showPopUpMessage(message);
    // }
  }, [message]);

  useEffect(() => {
    AuthModule.getInstance()
      .isAuthenticated()
      .then((isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          navigate("/home");
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header currentPage={CurrentPage.AI_Strategies} />
      <div
        className={
          windowSize > 900
            ? "aistrategy-page-container"
            : "aistrategy-page-container-responsive"
        }
      >
        <div className="card-container">
          <div
            className={
              windowSize <= 900
                ? "aistrategy-page-horizontal-card-responsive"
                : "aistrategy-page-horizontal-card"
            }
          >
            {windowSize <= 500 ? (
              <div className="left-half-resposive">
                <img
                  // src={strategyDetails?.StrategyImage}
                  src={tradeImg}
                  alt="Trade Imagz"
                  className="card-image-responsive"
                />
                <div className="card-info-resposive">
                  <div className="card-title-responsive">
                    <h5 className="card-heading-responsive">
                      {strategyDetails?.StrategyName}
                    </h5>
                    <div className="card-title-inner-responsive">
                      <p className="card-author-responsive">
                        by {strategyDetails?.Author}
                      </p>
                      <div className="badge-container">
                        <div className="badge new-badge-responsive">
                          {strategyDetails?.StrategyTag}
                        </div>
                        <div className="badge risk-badge-responsive">
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
                          Low Risk
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="card-desc-responsive">
                    {strategyDetails?.StrategyDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="left-half">
                <img
                  // src={strategyDetails?.StrategyImage}
                  src={tradeImg}
                  alt="Trade Imagz"
                  className="card-image"
                />
                <div className="card-info">
                  <div className="card-title">
                    <article className="card-heading">
                      {strategyDetails?.StrategyName}
                    </article>
                    &nbsp; &nbsp;
                    <div className="badge-container">
                      <div className="badge new-badge">
                        {strategyDetails?.StrategyTag}
                      </div>
                      <div className="badge risk-badge">
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
                        Low Risk
                      </div>
                    </div>
                  </div>
                  <p className="card-desc">
                    &nbsp;
                    <p className="card-author">by {strategyDetails?.Author}</p>
                    {strategyDetails?.StrategyDescription}
                  </p>
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
                  windowSize <= 900
                    ? "card-metrics-responsive-span-cut"
                    : "card-metrics"
                }
              >
                {windowSize <= 500 ? (
                  <>
                    <div>
                      <span className="span-cut">
                        <p className="min-cap-responsive">Min. Capital</p>
                        <p className="value-responsive">
                          ₹{" "}
                          {formatNumber(
                            strategyDetails?.MinimumInvestmentCapital
                          )}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cap-deployed-responsive">
                          Capital Deployed
                        </p>
                        <p className="value-responsive">
                          ₹ {formatNumber(strategyDetails?.CapitalDeployed)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cagr-responsive">CAGR</p>
                        <p className="value-responsive cagr-value-responsive">
                          {strategyDetails?.CAGR_PCT}
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
                          ₹{" "}
                          {formatNumber(
                            strategyDetails?.MinimumInvestmentCapital
                          )}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cap-deployed">Capital Deployed</p>
                        <p className="value">
                          ₹ {formatNumber(strategyDetails?.CapitalDeployed)}
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="span-cut">
                        <p className="cagr">CAGR</p>
                        <p className="value cagr-value">
                          {strategyDetails?.CAGR_PCT}%
                        </p>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div
          className={
            windowSize <= 900
              ? "aistrategy-page-middle-section-responsive"
              : "aistrategy-page-middle-section"
          }
        >
          <div className="trending-box">
            <div className="trending-box-title">
              <div className="svg-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M18 8L19.25 5.25L22 4L19.25 2.75L18 0L16.75 2.75L14 4L16.75 5.25L18 8ZM10.5 8.5L8 3L5.5 8.5L0 11L5.5 13.5L8 19L10.5 13.5L16 11L10.5 8.5ZM18 14L16.75 16.75L14 18L16.75 19.25L18 22L19.25 19.25L22 18L19.25 16.75L18 14Z"
                    fill="#E7AF1D"
                  />
                </svg>
              </div>
              &nbsp;
              <span>Trending</span>
            </div>
            <p>{strategyDetails?.Trending}</p>
          </div>
        </div>
        {/*  */}
        <br />
        <div className="page-content-body">
          <div
            className={
              windowSize <= 900
                ? "heading-section-responsive"
                : "heading-section"
            }
          >
            <div className="overview-heading">Overview</div>
            <div className="overview-heading-underline"></div>
          </div>

          <div
            className={
              windowSize <= 900
                ? "content-section-responsive"
                : "content-section"
            }
          >
            <div
              className={
                windowSize <= 900 ? "first-half-responsive" : "first-half"
              }
            >
              <div
                className={
                  windowSize <= 900
                    ? "overview-body-responsive"
                    : "overview-body"
                }
              >
                <div className="overview-content">
                  <div className="overview-content-heading">
                    <article>About the Moneyy.ai</article>
                  </div>
                  <p className="overview-info">{strategyDetails?.Overview}</p>

                  {/* <div className='overview-dropdown-para'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                    do eiusmod <KeyboardArrowDownIcon />{' '}
                  </div>
                  <div className='overview-dropdown-para'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                    do eiusmod <KeyboardArrowDownIcon />{' '}
                  </div>
                  <div className='overview-dropdown-para'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                    do eiusmod <KeyboardArrowDownIcon />{' '}
                  </div>
                  <div className='overview-dropdown-para'>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                    do eiusmod <KeyboardArrowDownIcon />{' '}
                  </div> */}
                </div>
              </div>
            </div>

            <div
              className={
                windowSize <= 900 ? "second-half-responsive" : "second-half"
              }
            >
              {windowSize <= 900 && (
                <div
                  className={
                    windowSize <= 900 ? "info-card-responsive" : "info-card"
                  }
                >
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <BookmarkAddIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Blog Post</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <ExtensionIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Methodology</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <FileCopyIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Factsheet</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/*  */}
              {/* pop up window */}
              {showPopup && (
                <div className="subscribe-popup-card">
                  <div className="popup-card-header">
                    <article>Choose the Lots Multiplier</article>
                    <br />

                    <div className="popup-card-row">
                      <article>Total Lots</article>
                      {/* <input type='text' placeholder='Enter Lots' /> */}
                      <input
                        type="number"
                        id="lots"
                        name="lots"
                        value={lots}
                        placeholder="Enter Lots"
                        onChange={(e) => setLots(parseInt(e.target.value, 10))}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "14.5px",
                        color: "#000000B2",
                        fontWeight: "400",
                      }}
                    >
                      ( 1 Lot is the minimum capital required = ₹ 8,000 )
                    </p>

                    <div className="popup-card-terms-conditions flex-center">
                      <input
                        style={{ border: "solid", marginTop: "-7px" }}
                        type="radio"
                        id="radioButton"
                        name="radioGroup"
                        value="option1"
                        checked={termsConditionAccepted}
                        onClick={handleRadioClick}
                      />

                      <span>
                        By Clicking on Subscribe button, you agree to our
                        <a href="/terms-and-conditions">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        and <a href="/privacy-policies"> Privacy Statement</a>.
                      </span>
                    </div>

                    <br />

                    <div className="popup-card-button-row">
                      <button
                        className="popup-subscribe-btn"
                        onClick={handleSubscribe}
                      >
                        {" "}
                        <DoneIcon
                          style={{ width: "16px", height: "36px" }}
                        />{" "}
                        Subscribe
                      </button>
                      <button
                        className="popup-close-btn"
                        onClick={handleCancelClick}
                      >
                        <CloseIcon style={{ width: "16px", height: "36px" }} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="strategy-subscribe-card">
                <div className="strategy-subscribe-card-heading">
                  Minimum Investment Capital
                </div>
                <div className="strategy-subscribe-card-amount">
                  {strategyDetails?.MinimumInvestmentCapital}
                </div>
                <div className="strategy-subscribe-card-plans">
                  Explore strategy Pricing plans &nbsp;
                  <ArrowForwardIcon className="arrow-icon" />
                </div>
                {isSubscribed ? (
                  <button className="subscribe-now-btn" disabled>
                    Subscribed
                  </button>
                ) : (
                  <button
                    className="subscribe-now-btn"
                    onClick={handleSubscribePopUp}
                  >
                    Subscribe Now
                  </button>
                )}

                <div className="subscribe-social-share-section">
                  <article style={{ fontSize: "13px" }}>Share on</article>
                  <div className="strategy-subscribe-card-social-icons">
                    <XIcon className="strategy-subscribe-card-social-icon" />

                    <InstagramIcon className="strategy-subscribe-card-social-icon" />

                    <FacebookIcon className="strategy-subscribe-card-social-icon" />

                    <LinkedInIcon className="strategy-subscribe-card-social-icon" />

                    <YouTubeIcon className="strategy-subscribe-card-social-icon" />
                  </div>
                </div>
              </div>

              {/* Blog Card */}
              {windowSize > 900 && (
                <div className="info-card">
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <BookmarkAddIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Blog Post</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <ExtensionIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Methodology</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="info-card-section">
                    <div className="info-card-icon">
                      <FileCopyIcon />
                    </div>
                    <div className="info-card-content">
                      <div className="info-card-heading">Factsheet</div>
                      <div className="info-card-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {results != null && (
        <div className="strategyMetrics">
          <div
            className={
              windowSize <= 900
                ? "heading-section-responsive"
                : "heading-section"
            }
          >
            <div className="overview-heading">Strategy Performance</div>
            <div className="overview-heading-underline"></div>
          </div>
          <div className="graphContainer">{getResultsSummaryContainer()}</div>
          <div className="graphContainer">{getWeekDayViewContainer()}</div>
          <div className="graphContainer estr">{getMonthlyViewContainer()}</div>
          <div className="graphContainer">{getDailyResultsContainer()}</div>
          <div className="graphContainer">
            <PLLineGraph data={results.rawResults.monthBackTestResults} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

const styles = {
  marginTopper: {
    marginTop: "4px",
  },
  metricsHeader: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
    marginTop: 0,
    marginBottom: 1,
    paddingBottom: Theme.gapSmall,
    width: "fit-content",
    fontWeight: Theme.fontWeight.semiBold,
    overflow: "hidden",
    borderBottom: "2px solid " + Theme.colors.whiteGrey70,
  },
  headerText: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
    marginTop: Theme.gapLarge,
  },
  buttonIconGrey: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
    marginRight: Theme.gapTiny,
    margin: "auto",
    verticalAlign: "middle",
  },
  container: {
    // backgroundColor: Theme.colors.backgroundF3,
    padding: Theme.gapSmall,
    borderRadius: Theme.borderRadiusLarge,
  },
};

export default SingleStrategyPage;
