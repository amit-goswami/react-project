import React, { useState, useEffect } from "react";
import DailyViewContainer from "../Results/DailyViewContainer";
import MonthlyViewContainer from "../Results/MonthlyViewContainer";
import WeekDayViewContainer from "../Results/WeekDayViewContainer";
import ResultsSummaryContainer from "../Results/ResultsSummaryContainer";
import TestResultsParser from "../../Utils/TestResultsParser";
import { BackTestAPIResponse } from "../../API/API.interface";
import { AuthModule } from "../../API/Auth";
import { Theme } from "../../Utils/Constants";
import PLLineGraph from "../PLLineGraph/PLLineGraph";
import Loader from "../Dialogs/Loader";

const StrategyPL: React.FC = () => {
  const [results, setResults] = useState<TestResultsParser>(null as any);
  const [showROIPerct, setROIPerct] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getResults = async () => {
      const accessToken = AuthModule.getInstance().getAccessToken();
      try {
        const response = await fetch(
          "https://api.moneyy.ai/api/mock/runtests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
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
            }),
          }
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          showResults(jsonResponse as BackTestAPIResponse);
        } else {
          throw new Error("Network response was not ok.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getResults();
  }, []);

  function showResults(results: BackTestAPIResponse) {
    const optionsParse = new TestResultsParser(results);
    setResults(optionsParse);
  }

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
  return (
    <div style={styles.graphsContainer}>
      {isLoading && <Loader />}
      {results != null && (
        <>
          {getResultsSummaryContainer()}
          {getWeekDayViewContainer()}
          {getMonthlyViewContainer()}
          {getDailyResultsContainer()}
          <PLLineGraph data={results.rawResults.monthBackTestResults} />
        </>
      )}
    </div>
  );
};

const styles = {
  graphsContainer: {
    width: "80%",
  },
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
    backgroundColor: Theme.colors.backgroundF3,
    padding: Theme.gapSmall,
    borderRadius: Theme.borderRadiusLarge,
  },
};

export default StrategyPL;
