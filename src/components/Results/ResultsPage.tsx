import React from "react";
import TestResultsParser from "../../Utils/TestResultsParser";
import DailyViewContainer from "./DailyViewContainer";
import MonthlyViewContainer from "./MonthlyViewContainer";
import WeekDayViewContainer from "./WeekDayViewContainer";
import ResultsSummaryContainer from "./ResultsSummaryContainer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Theme } from "../../Utils/Constants";

interface IResultsPageProps {
  results: TestResultsParser;
}

const ResultsPage: React.FC<IResultsPageProps> = (props) => {
  const [showROIPerct, setROIPerct] = React.useState<boolean>(false);

  function getDailyResultsContainer() {
    return (
      <div style={{ ...styles.container, ...styles.marginTopper }}>
        <p style={styles.metricsHeader}>Trade Log</p>
        <DailyViewContainer key="DailyViewContainer" results={props.results} />
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
          margins={props.results.getMargins()}
          results={props.results.getMonthlyView()}
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
          margins={props.results.getMargins()}
          results={props.results.getWeekDayView()}
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
          data={props.results.getResultsSummary()}
        />
      </div>
    );
  }

  // function handleOptionTypeChange(checked: boolean): void {
  //   setROIPerct(checked);
  // }

  return (
    <div>
      <p style={styles.headerText}>
        <AssignmentIcon style={styles.buttonIconGrey} />
        Backtest Results
      </p>
      {/* <SwitchInput
        trueLabel="-"
        falseLabel="%"
        checked={showROIPerct}
        onChange={handleOptionTypeChange}
      /> */}
      {getResultsSummaryContainer()}
      {getWeekDayViewContainer()}
      {getMonthlyViewContainer()}
      {getDailyResultsContainer()}
    </div>
  );
};

const styles = {
  marginTopper: {
    marginTop: Theme.gapXXLarge,
  },
  metricsHeader: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
    marginTop: 0,
    marginBottom: 0,
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

export default ResultsPage;
