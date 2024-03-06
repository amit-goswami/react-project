import React from "react";
import { Theme } from "../../Utils/Constants";
import { getPercentages } from "../../Utils/Converters";

interface Props {
  showPerct: boolean;
  margins: number;
  results: { [key: string]: { [key: string]: number } };
}

const WeekDayViewContainer: React.FC<Props> = (props) => {
  const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let minValue = 0;
  let maxValue = 0;
  for (const year in props.results) {
    for (const weekDay in props.results[year]) {
      const incoming = props.results[year][weekDay];
      if (incoming < minValue) {
        minValue = incoming;
      }
      if (incoming > maxValue) {
        maxValue = incoming;
      }
    }
  }

  const formatNumber = (amount: string): string => {
    const suffixes = ["", "K", "M", "B", "T"];
    const numberAmount = parseFloat(amount.replace(/,/g, ""));
    const isNegative = numberAmount < 0;
    const absoluteAmount = Math.abs(numberAmount);
    if (absoluteAmount >= 1000) {
      const suffixIndex = Math.floor(Math.log10(absoluteAmount) / 3);
      const shortValue = (absoluteAmount / Math.pow(1000, suffixIndex)).toFixed(
        1,
      );
      return (isNegative ? "-" : "") + shortValue + suffixes[suffixIndex];
    } else {
      return amount;
    }
  };

  function getAllWeekDays() {
    return WeekDays.map((weekDay) => {
      return (
        <th style={styles.headerCell} key={weekDay}>
          {weekDay}
        </th>
      );
    });
  }

  function getBackgroundColorTranparency(value: number) {
    let perct = 0;
    if (value < 0) {
      perct = (value / minValue) * 100;
    } else {
      perct = (value / maxValue) * 100;
    }
    if (perct > 66) {
      return "CC";
    } else if (perct > 33) {
      return "99";
    } else {
      return "66";
    }
  }

  function getPerctAppendStr(value: number) {
    if (!props.showPerct) {
      return "";
    }
    return "(" + getPercentages(value, props.margins) + ")";
  }

  function getAllDaysValues(year: string) {
    return WeekDays.map((weekDay) => {
      const value = props.results[year][weekDay];
      return (
        <td key={value} style={{ ...styles.cellStyle, ...styles.rowTopBorder }}>
          <p style={getClassName(value)}>
            {value ? formatNumber(value.toFixed(2)) : 0}{" "}
            {getPerctAppendStr(value)}
          </p>
        </td>
      );
    });
  }

  function getAllDaysTotalValue() {
    return WeekDays.map((weekDay) => {
      let totalValue = 0;
      for (const year in props.results) {
        totalValue += props.results[year][weekDay];
      }
      return (
        <td
          key={totalValue}
          style={{
            ...styles.cellStyle,
            ...styles.rowTotalTopBorder,
            ...styles.totalRow,
          }}
        >
          <p style={getClassName(totalValue, true)}>
            {totalValue ? formatNumber(totalValue.toFixed(2)) : 0}{" "}
            {getPerctAppendStr(totalValue)}
          </p>
        </td>
      );
    });
  }

  function getClassName(digit: number, textOnly?: boolean) {
    let colorCode = Theme.colors.red;
    if (digit >= 0) {
      colorCode = Theme.colors.green;
    }
    if (textOnly) {
      return {
        ...styles.valueBox,
        color: colorCode,
        fontSize: Theme.fontSizes.h4,
        fontWeight: Theme.fontWeight.semiBold,
      };
    }
    return {
      ...styles.valueBox,
      backgroundColor: colorCode + getBackgroundColorTranparency(digit),
      fontSize: Theme.fontSizes.h5,
    };
  }

  function getAllYears() {
    const years = Object.keys(props.results);
    return years.map((year) => {
      return (
        <tr key={"weekDay" + year}>
          <td
            style={{
              ...styles.headerCell,
              ...styles.rowTopBorder,
              ...styles.yearColumn,
            }}
          >
            {year}
          </td>
          {getAllDaysValues(year)}
        </tr>
      );
    });
  }

  function getTotalRow() {
    return (
      <tr key="weekDayTotalRow">
        <td
          style={{
            ...styles.headerCell,
            ...styles.rowTotalTopBorder,
            ...styles.totalColumn,
          }}
        >
          Total
        </td>
        {getAllDaysTotalValue()}
      </tr>
    );
  }

  return (
    <table style={styles.tableStyle}>
      <thead>
        <tr key="weekDayHeaderRows">
          <th style={{ ...styles.headerCell, fontSize: Theme.fontSizes.h3 }}>
            moneyy.ai
          </th>
          {getAllWeekDays()}
        </tr>
      </thead>
      <tbody>
        {getAllYears()}
        {getTotalRow()}
      </tbody>
    </table>
  );
};

const styles = {
  totalRow: {
    fontWeight: Theme.fontWeight.semiBold,
    fontSize: Theme.fontSizes.h1,
  },
  totalColumn: {
    fontSize: Theme.fontSizes.h3,
    fontWeight: Theme.fontWeight.semiBold,
  },
  yearColumn: {
    fontWeight: Theme.fontWeight.semiBold,
    fontSize: Theme.fontSizes.h4,
  },
  rowTotalTopBorder: {
    borderTop: "1px solid " + Theme.colors.whiteGrey70,
  },
  rowTopBorder: {
    borderTop: "1px solid " + Theme.colors.whiteGrey70,
  },
  tableStyle: {
    borderSpacing: 0,
    display: "inline-block",
    width: "100%",
  },
  headerCell: {
    padding: Theme.gapSmall,
    color: Theme.colors.black70,
    fontWeight: "normal" as "normal",
    fontSize: Theme.fontSizes.h5,
    margin: 0,
    textAlign: "center" as const,
  },
  cellStyle: {
    padding: Theme.gapTiny,
    textAlign: "center" as const,
    width: "20%",
  },
  valueBox: {
    padding: Theme.gapTiny,
    textAlign: "center" as const,
    fontSize: Theme.fontSizes.h5,
    width: "fit-content",
    margin: "auto",
    borderRadius: Theme.borderRadius,
  },
};

export default WeekDayViewContainer;
