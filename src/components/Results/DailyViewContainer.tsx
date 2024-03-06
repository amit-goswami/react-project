import React from "react";
import { Theme } from "../../Utils/Constants";
import DailyViewPerDayBox from "./DailyViewPerDayBox";
import TestResultsParser from "../../Utils/TestResultsParser";
import Pagination from "@mui/material/Pagination";
interface Props {
  results: TestResultsParser;
}

const DailyViewContainer: React.FC<Props> = (props) => {
  const PAGINATION_PER_PAGE_LIMIT = 10;

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  function getSections() {
    const from = page * PAGINATION_PER_PAGE_LIMIT - PAGINATION_PER_PAGE_LIMIT;
    const to = page * PAGINATION_PER_PAGE_LIMIT;
    return props.results.getDailyViewKeys(from, to).map((key) => {
      return (
        <DailyViewPerDayBox
          key={"container" + key}
          data={props.results.getDailyViewDataFor(key)}
        />
      );
    });
  }

  function getStrategyLegs() {
    return props.results.getStrategyLegs().map((leg) => {
      return (
        <th style={styles.headerCell} key={leg.sequence}>
          {leg.optionType} {leg.actionType} SL={leg.slPerct}% TP={leg.tpPerct}%
        </th>
      );
    });
  }

  return (
    <>
      <div style={styles.paginationContainer}>
        <Pagination
          style={styles.pagination}
          count={props.results.getPageCountsToShow(PAGINATION_PER_PAGE_LIMIT)}
          variant="outlined"
          page={page}
          onChange={handleChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
      <table style={styles.tableStyle}>
        <thead>
          <tr key="dailyViewHeaderRow">
            <th style={styles.headerCell} key="date">
              Date
            </th>
            <th style={styles.headerCell} key="day">
              Day
            </th>
            <th style={styles.headerCell} key="dailyProfit">
              Profit
            </th>
            <th style={styles.headerCell} key="expiry">
              Expiry Date
            </th>
            {getStrategyLegs()}
            <th style={styles.headerCell} key="lotSize">
              Lots
            </th>
          </tr>
        </thead>
        <tbody>{getSections()}</tbody>
      </table>
    </>
  );
};

const styles = {
  paginationContainer: {
    width: "100%",
  },
  pagination: {
    display: "inline-block",
    margin: Theme.gapLarge + " 0px",
  },
  tableStyle: {
    borderSpacing: 0,
    width: "100%",
  },
  headerCell: {
    padding: Theme.gapSmall,
    fontWeight: "normal",
    borderBottom: "1px solid " + Theme.colors.whiteGrey70,
    margin: 0,
  },
};

export default DailyViewContainer;
