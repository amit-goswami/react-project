import React, { useEffect, useState } from "react";
import { Theme } from "../../Utils/Constants";
import { getPercentages } from "../../Utils/Converters";

interface Props {
  margins: number;
  showPerct: boolean;
  results: { [key: string]: { [key: string]: number } };
}

const MonthlyViewContainer: React.FC<Props> = (props) => {
  const [isWidthLessThan1350, setIsWidthLessThan1350] =
    useState<boolean>(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  useEffect(() => {
    function handleResize() {
      setIsWidthLessThan1350(window.innerWidth < 1350);
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  function getAllMonths() {
    return months.map((month) => {
      return (
        <th
          key={month}
          style={{
            ...styles.headerCell,
            padding: isWidthLessThan1350 ? "2px" : "6px",
          }}
        >
          {month.substring(0, 3)}
        </th>
      );
    });
  }

  function getPerctAppendStr(value: number) {
    if (!props.showPerct) {
      return "";
    }
    return "(" + getPercentages(value, props.margins) + ")";
  }

  function getAllMonthsValues(year: string) {
    return months.map((month) => {
      const value = props.results[year][month];
      return (
        <td
          style={{
            ...styles.cellStyle,
            padding: isWidthLessThan1350 ? "2px" : "6px",
            ...styles.rowTopBorder,
          }}
          key={month}
        >
          {value && (
            <p style={getClassName(value)}>
              {value ? formatNumber(value.toFixed(2)) : 0}{" "}
              {getPerctAppendStr(value)}
            </p>
          )}
        </td>
      );
    });
  }

  function getAllDaysTotalValue() {
    return months.map((month) => {
      let totalValue = 0;
      for (const year in props.results) {
        const value = props.results[year][month];
        totalValue += value ? value : 0;
      }
      return (
        <td
          key={totalValue}
          style={{
            ...styles.cellStyle,
            padding: isWidthLessThan1350 ? "2px" : "6px",
            ...styles.rowTotalTopBorder,
            ...styles.totalRow,
          }}
        >
          <p style={getClassName(totalValue, true)}>
            {totalValue ? formatNumber(totalValue.toFixed(2)) : 0}
            {getPerctAppendStr(totalValue)}
          </p>
        </td>
      );
    });
  }

  function getTotalRow() {
    return (
      <tr key="monthTotalRow">
        <td
          style={{
            ...styles.headerCell,
            padding: isWidthLessThan1350 ? "2px" : "6px",
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

  function getClassName(digit: number, textOnly?: boolean) {
    let colorCode = Theme.colors.red;
    if (digit >= 0) {
      colorCode = Theme.colors.green;
    }
    if (textOnly) {
      return {
        ...styles.valueBox,
        padding: isWidthLessThan1350 ? "2px" : "6px",
        color: colorCode,
        fontSize: Theme.fontSizes.h4,
        fontWeight: Theme.fontWeight.semiBold,
      };
    }
    return {
      ...styles.valueBox,
      padding: isWidthLessThan1350 ? "2px" : "6px",
      backgroundColor: colorCode + getBackgroundColorTranparency(digit),
      fontSize: Theme.fontSizes.h5,
    };
  }

  function getAllYears() {
    const years = Object.keys(props.results);
    return years.map((year) => {
      return (
        <tr key={year + "monthView"}>
          <td
            style={{
              ...styles.headerCell,
              padding: isWidthLessThan1350 ? "2px" : "6px",
              ...styles.rowTopBorder,
              ...styles.yearColumn,
            }}
          >
            {year}
          </td>
          {getAllMonthsValues(year)}
        </tr>
      );
    });
  }

  return (
    <table style={styles.tableStyle}>
      <thead>
        <tr>
          <th
            style={{
              ...styles.headerCell,
              padding: isWidthLessThan1350 ? "2px" : "6px",
              fontSize: Theme.fontSizes.h3,
            }}
          >
            moneyy.ai
          </th>
          {getAllMonths()}
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
    color: Theme.colors.black70,
    fontWeight: "normal" as "normal",
    fontSize: Theme.fontSizes.h5,
    margin: 0,
    textAlign: "center" as const,
  },
  cellStyle: {
    textAlign: "center" as const,
    width: "8.333%",
  },
  valueBox: {
    textAlign: "center" as const,
    fontSize: Theme.fontSizes.h5,
    width: "fit-content",
    margin: "auto",
    borderRadius: Theme.borderRadius,
  },
};

export default MonthlyViewContainer;
