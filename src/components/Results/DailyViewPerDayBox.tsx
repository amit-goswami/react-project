import { DailyBackTestResult } from "../../API/API.interface";
import { Theme } from "../../Utils/Constants";

interface IExpiryDateSections {
  data: DailyBackTestResult;
}

const DailyViewPerDayBox: React.FC<IExpiryDateSections> = (props) => {
  const dayStrs = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const { data } = props;

  function getStrategyLegs() {
    const legs = data.strategyLegs.sort((a, b) => a.sequence - b.sequence);
    return legs.map((leg) => {
      return (
        <td style={styles.cellStyle} key={leg.sequence}>
          {leg?.legPnL?.toFixed(2)}
          {/* <p style={styles.cellStringText}>{getSubStringForCell(leg)}</p> */}
        </td>
      );
    });
  }

  function getDateStr(dateStr: string) {
    const date = new Date(dateStr);
    const day = dayStrs[date.getDay()];
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}, ${day}`;
  }

  function getExpiryDate(tableName: string) {
    const last7Chars = tableName.slice(-7);
    const date = new Date(last7Chars);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  }

  // function getSubStringForCell(leg: DailyLegResult) {
  //   const startPrice = leg?.startValue?.toFixed(2);
  //   const endPrice = leg?.endValue?.toFixed(2);
  //   const diff = (leg?.startValue - leg?.endValue).toFixed(2);
  //   const CEPE = leg?.isCE ? "CE" : "PE";
  //   const endTime = new Date(leg?.endTime);
  //   const endTimeStr = `${endTime.getUTCHours()}:${endTime.getUTCMinutes()}`;
  //   return `( ${startPrice}-${endPrice}=${diff}) ${data.strikePrice}${CEPE} ${endTimeStr}`;
  // }

  return (
    <tr key={"row--" + data.dateStr}>
      <td style={styles.cellStyle} key="date">
        {getDateStr(data.dateStr).split(",")[0]}
      </td>
      <td style={styles.cellStyle} key="day">
        {getDateStr(data.dateStr).split(",")[1]}
      </td>
      <td style={styles.cellStyle} key="dailyProfit">
        {data.pnL.toFixed(2)}
      </td>
      <td style={styles.cellStyle} key="expiry">
        {getExpiryDate(data.tableName)}
      </td>
      {getStrategyLegs()}
      <td style={styles.cellStyle} key="lotSize">
        25
      </td>
    </tr>
  );
};

const styles = {
  cellStyle: {
    padding: Theme.gapTiny,
    borderBottom: "1px solid " + Theme.colors.whiteGrey70,
    textAlign: "center" as const,
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h5,
  },
  cellStringText: {
    color: Theme.colors.black70,
  },
};

export default DailyViewPerDayBox;
