import React, { useEffect, useState, useMemo } from "react";
import "./livetoday.css";
import EditIcon from "@mui/icons-material/Edit";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import {
  LiveTodayKillAPI,
  ApiResponse,
  subscriptionPauseResumeAPI,
  UserLiveTradeAPI,
  UserLiveTradeAPIInterface,
  getSubscriptionDetails,
  SubscriptionDetailInterface,
  OrderDetails,
  SubscriptionDetailResponseData,
} from "../../API/LiveTodayAPI";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Styles } from "../../Utils/Constants";
import { decodeJwtToken } from "../../API/DecodeJWTFunction";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { showPopUpMessage } from "../PopUp";
import webSocketService from "../../API/LiveTodayAPI";
interface PositionDetails {
  PositionID: string;
  Position: string;
  Quantity: string;
  EntryAveragePrice: string | number;
  Entry: boolean;
  Direction: string;
  ExitAveragePrice: string | null;
  PnL: string | null;
  strategy_id?: string;
}

interface LtpData {
  [position: string]: {
    last_price: number;
  };
}

const LiveTodayPageContent = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<
    SubscriptionDetailResponseData[]
  >([]);
  const [strategyIds, setStrategyIds] = useState<string[]>([]);
  const [ltpsData, setLTPSData] = useState<LtpData>({});
  const [totalPnl, setTotalPnl] = useState<number>(0);

  const [strategyRowData, setStrategyRowData] = useState<PositionDetails[]>([]);
  const decodedToken = decodeJwtToken();
  // const userId = String(decodedToken?.user_id) || '';
  const userId = "73";

  const handlePause = async (strategyId: string) => {
    try {
      const result = await subscriptionPauseResumeAPI(strategyId);
      if (result === "Subscription paused successfully.") {
        showPopUpMessage(result);
        setIsPaused(true);
      } else {
        showPopUpMessage("Subscription Resumed");
        setIsPaused(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleKill = () => {
    setShowPopup(true);
  };

  const handleKillSubmit = async ({ strategyId }: { strategyId: string }) => {
    setShowPopup(false);
    try {
      const apiResponse = await LiveTodayKillAPI(userId, strategyId);
      setResponse(apiResponse);
      alert(apiResponse.message);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const GetLiveTodayRowData = async (userId: string, strategyId: string) => {
    try {
      const apiResponse: UserLiveTradeAPIInterface = await UserLiveTradeAPI(
        userId,
        strategyId,
      );

      const positionDetailsArray: PositionDetails[] = Array.isArray(
        apiResponse.response_data.PositionDetails,
      )
        ? apiResponse.response_data.PositionDetails
        : [];
      const strategyRowDataWithId: PositionDetails[] = positionDetailsArray.map(
        (position) => ({
          ...position,
          strategy_id: strategyId,
        }),
      );

      setStrategyRowData(strategyRowDataWithId);
      // setStrategyRowData([...positionDetailsArray]);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const fetchSubsriptionDetailsData = async () => {
    try {
      const details = await getSubscriptionDetails();
      const responseDataArray = details.Response_data || [];

      setSubscriptionDetails(responseDataArray);
      const fetchedStrategyIds = responseDataArray.map(
        (data) => data.strategy_id,
      );
      setStrategyIds(fetchedStrategyIds);
      // responseDataArray.forEach((data) => {
      //   GetLiveTodayRowData(userId, data.strategy_id);
      // });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // const fetchDataForStrategy = async (strategyId: string, userId: string) => {
  //   try {
  //     await GetLiveTodayRowData(userId, strategyId);
  //   } catch (error) {
  //     console.error(`Error fetching data for strategyId ${strategyId}:`, error);
  //   }
  // };

  // const fetchAllData = async () => {
  //   try {
  //     await Promise.all(
  //       strategyIds.map((strategyId) =>
  //         fetchDataForStrategy(strategyId, userId)
  //       )
  //     );
  //     console.log('All data fetched and stored successfully');
  //   } catch (error) {
  //     console.error('Error fetching and storing data:', error);
  //   }
  // };

  useEffect(() => {
    const onMessageCallback = (newData: any) => {
      if (newData.type === "ltp_data") {
        setLTPSData(newData.data.data);
      }
    };
    webSocketService.connect("strat_0008", onMessageCallback);
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const getLtpForPosition = (positionValue: string): number | undefined => {
    const posValue = `NFO:${positionValue}`;

    if (ltpsData[posValue]) {
      return ltpsData[posValue]?.last_price;
    } else {
      // console.log(`Position ${posValue} not found in the data`);
      return undefined;
    }
  };

  const handlePnlPrice = (
    ltpPrice: number,
    entryPrice: number,
    direction: string,
    quantity: number,
  ) => {
    let res = 0;
    if (direction === "Buy") {
      res = ltpPrice - entryPrice;
    } else if (direction === "Sell") {
      res = entryPrice - ltpPrice;
    }
    return res * quantity;
  };

  useEffect(() => {
    fetchSubsriptionDetailsData();
    GetLiveTodayRowData("73", "strat_0008");
    // console.log(strategyRowData);
  }, [userId]);

  const pnlLivePrices: number[] = [];
  useEffect(() => {
    const totalPnlValue =
      pnlLivePrices.length > 0
        ? pnlLivePrices.reduce((sum, value) => sum + value, 0).toFixed(2)
        : "0.00";
    setTotalPnl(Number(totalPnlValue));
  }, [pnlLivePrices]);

  return (
    <>
      <div className="live-today-page">
        <div className="live-today-heading">
          <span>Live Today</span>
        </div>
        <>
          {subscriptionDetails &&
            subscriptionDetails.map((data, index) => {
              console.log(pnlLivePrices);

              return (
                <span key={index}>
                  <div className="live-today-container">
                    <div className="live-today-container-header">
                      <div className="live-today-container-header-left-half">
                        {/* <span>{data?.strategy_name} </span> by Moneyy.ai */}
                        <span>{data?.strategy_id} </span> by Moneyy.ai
                      </div>
                      <div
                        className="live-today-container-header-right-half"
                        style={{ display: "flex" }}
                      >
                        <span
                          style={{ display: "flex", alignItems: "center" }}
                          className="lots-container"
                        >
                          {data?.lots} Lots
                          <EditIcon style={{ fontSize: "20px" }} />
                        </span>

                        <span
                          onClick={() => handlePause(data?.strategy_id)}
                          className="pause"
                          style={{ width: "23px", height: "23px" }}
                        >
                          {!isPaused ? (
                            <PauseCircleOutlineOutlinedIcon />
                          ) : (
                            <PlayCircleOutlineIcon />
                          )}
                        </span>
                        <div className="cancel" onClick={handleKill}>
                          <CancelIcon style={{ color: "red" }} />
                          Kill
                        </div>
                      </div>
                    </div>
                    <div className="live-today-container-middle">
                      <div className="key-value-pair">
                        <span className="key">Today’s Capital:</span>
                        <span className="value">₹ 1.1L</span>
                      </div>
                      <div className="key-value-pair">
                        <span className="key">Status:</span>
                        {data?.is_active ? (
                          <span
                            className="value"
                            style={{ color: "#2ACD1C", fontWeight: "600" }}
                          >
                            Active{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM5.5 7.5H4.5V4.5H5.5V7.5ZM5.5 3.5H4.5V2.5H5.5V3.5Z"
                                fill="black"
                                fill-opacity="0.4"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span
                            className="value"
                            style={{ color: "#EF3333", fontWeight: "600" }}
                          >
                            InActive{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM5.5 7.5H4.5V4.5H5.5V7.5ZM5.5 3.5H4.5V2.5H5.5V3.5Z"
                                fill="black"
                                fill-opacity="0.4"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="key-value-pair">
                        <span className="key">Broker:</span>
                        <span className="value">TT Trading</span>
                      </div>
                    </div>
                    <>
                      <div className="live-today-table">
                        <table>
                          <thead>
                            <tr>
                              <th style={{ width: "30%" }}>Positions</th>
                              <th style={{ width: "12%" }}>Qty.</th>
                              <th style={{ width: "22%" }}>Entry Price ₹</th>
                              <th style={{ width: "20%" }}>LTP ₹</th>
                              <th style={{ width: "25%" }}>P&L ₹</th>
                            </tr>
                          </thead>
                          <tbody>
                            {strategyRowData
                              .filter(
                                (rowData) =>
                                  rowData.strategy_id === data.strategy_id,
                              )
                              .map((filteredData, index) => {
                                const positionValue = filteredData.Position;
                                const lastPrice =
                                  getLtpForPosition(positionValue);
                                let pnlLivePrice = 0;
                                if (filteredData.Entry) {
                                  pnlLivePrice = handlePnlPrice(
                                    lastPrice || 0,
                                    Number(filteredData.EntryAveragePrice),
                                    filteredData.Direction,
                                    Number(filteredData.Quantity),
                                  );
                                } else {
                                  pnlLivePrice = Number(filteredData.PnL);
                                }

                                pnlLivePrices.push(pnlLivePrice);

                                return (
                                  <tr key={index}>
                                    <td>{filteredData.Position}</td>
                                    <td>{filteredData.Quantity}</td>
                                    <td>{filteredData.EntryAveragePrice}</td>
                                    <td>
                                      {lastPrice !== undefined ? lastPrice : 0}
                                    </td>
                                    <td
                                      style={{
                                        color:
                                          pnlLivePrice && pnlLivePrice > 0
                                            ? "#2ACD1C"
                                            : "#EF3333",
                                      }}
                                    >
                                      {pnlLivePrice.toFixed(2)}{" "}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <div className="live-today-table-total">
                          <span>Total</span>
                          <span style={{ color: "#2ACD1C", marginRight: "4%" }}>
                            {totalPnl} (+0.44%)
                          </span>
                        </div>
                      </div>
                    </>
                  </div>

                  {showPopup && (
                    <>
                      <div className="kill-popup-card flex-center flex-col">
                        <span style={Styles.h3Text}>{data.strategy_name}</span>
                        <p>*Please Confirm to kill {data.strategy_name}*</p>
                        <div className="kill-confirm-btn flex-center">
                          <button
                            className="flex-center"
                            onClick={() =>
                              handleKillSubmit({
                                strategyId: data.strategy_id,
                              })
                            }
                          >
                            <DoneIcon />
                            Confirm
                          </button>
                          <button
                            style={{
                              color: "#2747dd",
                              backgroundColor: "#fff",
                              border: "solid",
                            }}
                            className="flex-center "
                            onClick={() => setShowPopup(false)}
                          >
                            <CloseIcon />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </span>
              );
            })}
        </>
      </div>
    </>
  );
};

export default LiveTodayPageContent;
