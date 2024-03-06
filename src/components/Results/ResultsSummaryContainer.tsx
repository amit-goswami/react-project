import React from "react";
import { IResultsSummary } from "../../API/API.interface";
import { Theme } from "../../Utils/Constants";

interface ResultsSummaryContainerProps {
  data: IResultsSummary;
}

const ResultsSummaryContainer: React.FC<ResultsSummaryContainerProps> = ({
  data,
}) => {
  function getResultsBox(
    title: string,
    value: number,
    valSuffix?: string,
    isYellow?: boolean,
    format?: boolean,
  ) {
    let roundedVal = Math.round(value * 100) / 100;
    return (
      <div style={isYellow ? styles.boxContainerYellow : styles.boxContainer}>
        <p style={styles.boxHeader}>
          {title}
          <span style={styles.boxValue}>
            {format ? formatNumber(roundedVal) : roundedVal} {valSuffix}
          </span>
        </p>
      </div>
    );
  }
  const formatNumber = (amount: number): string => {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(
      amount.toString().replace(/,/g, "").length / 3,
    );
    let shortValue = parseFloat(
      (suffixNum !== 0
        ? parseFloat(amount.toString().replace(/,/g, "")) /
          Math.pow(1000, suffixNum)
        : parseFloat(amount.toString().replace(/,/g, ""))
      ).toPrecision(2),
    );
    if (shortValue % 1 !== 0) {
      shortValue = parseFloat(shortValue.toFixed(1));
    }
    return shortValue + suffixes[suffixNum];
  };

  console.log(typeof data.estimatedMargin);
  return (
    <div style={styles.summaryPage}>
      <div style={{ ...styles.sectionBox, ...styles.borderRight }}>
        <p style={styles.sectionHeader}>Key Metrics</p>
        {getResultsBox(
          "Avg. Capital Deployed",
          data.estimatedMargin,
          "",
          true,
          true,
        )}
        {getResultsBox("Total P/L", data.overallProfit, "", false, true)}
        {getResultsBox("Profit% (Days)", data.winPerctInDays, "%", true)}
        {getResultsBox("Loss% (Days)", data.lossPerctInDays, "%", false)}
        {getResultsBox("Max Profit", data.maxDayProfit, "", true)}
        {getResultsBox("Max Loss", data.maxDayLoss)}
        {getResultsBox("Lot Sizes", data.lotSizes, "", true)}
      </div>
      <div style={{ ...styles.sectionBox, ...styles.borderRight }}>
        <p style={styles.sectionHeader}>Aggregates</p>
        {getResultsBox("Avg Monthly P&L", data.avgMonthlyProfit, "", true)}
        {getResultsBox("Avg Yearly P&L", data.avgYearlyProfit)}
        {getResultsBox("Avg Day P&L", data.avgDayProfit, "", true)}
        {getResultsBox("Avg on Profit Days", data.avgProfitOnWinDays)}
        {getResultsBox("Avg on Loss Days", data.avgLossOnLossDays, "", true)}
        {getResultsBox("Max Profit Streak", data.maxWinningStreak)}
        {getResultsBox("Max Loss Streak", data.maxLosingStreak, "", true)}
      </div>
      <div style={{ ...styles.borderNone, ...styles.sectionBox }}>
        <p style={styles.sectionHeader}>Performance Ratios</p>
        {getResultsBox("Sharpe Ratio", data.sharpeRatio, "", true)}
        {getResultsBox("Max Draw Down", data.maxDrawDown)}
        {getResultsBox("MDD Days", data.maxDrawDownDays, "", true)}
        {getResultsBox("P&L To MDD Ratio", data.returnToMDDRatio)}
        {getResultsBox(
          "Recovery Days",
          data.maxDrawDaysRecoveryPeriod,
          "",
          true,
        )}
        {getResultsBox("Max Peak profit", data.maxPeakProfit)}
        {getResultsBox("Peak Profit / MDD", data.maxProfitByMDD, "", true)}
      </div>
    </div>
  );
};

const styles = {
  borderRight: {
    borderRight: "1px solid " + Theme.colors.whiteGrey70,
    marginRight: Theme.gapSmall,
  },
  borderNone: {
    border: "none",
  },
  summaryPage: {
    display: "flex",
    justifyContent: "spaceAround",
  },
  sectionHeader: {
    padding: 0,
    paddingTop: Theme.gapSmall,
    paddingBottom: Theme.gapSmall,
    fontSize: Theme.fontSizes.h3,
    margin: 0,
    color: Theme.colors.black70,
    fontWeight: Theme.fontWeight.semiBold,
  },
  boxHeader: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "auto",
    fontSize: Theme.fontSizes.h5,
    textAlign: "left" as "left",
  },
  boxValue: {
    padding: 0,
    margin: 0,
    float: "right" as "right",
    fontWeight: Theme.fontWeight.semiBold,
    fontSize: Theme.fontSizes.h4,
  },
  sectionBox: {
    marginTop: Theme.gapSmall,
    marginBottom: Theme.gapSmall,
    width: "100%",
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    minWidth: "256px",
    padding: Theme.gapSmall,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: Theme.gapSmall,
    borderRadius: Theme.borderRadiusLarge,
  },
  boxContainerYellow: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    backgroundColor: Theme.colors.yellow,
    minWidth: "256px",
    padding: Theme.gapSmall,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: Theme.gapSmall,
    borderRadius: Theme.borderRadiusLarge,
  },
};

export default ResultsSummaryContainer;
