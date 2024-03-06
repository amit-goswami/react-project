import { Article, Assignment, AutoGraph } from "@mui/icons-material";
import React from "react";
import { Styles, Theme } from "../../Utils/Constants";

const WebsiteOptions: React.FC = () => {
  const options = [
    {
      title: "Backtesting",
      description:
        "Backtest your trading ideas with our powerful backtesting engine. Get detailed reports and statistics.",
      image: <Assignment style={styles.icons} />,
    },
    {
      title: "Export Strategies",
      description:
        "Export your strategies to your favorite broker with a single click. No coding required and no additional software needed.",
      image: <AutoGraph style={styles.icons} />,
    },
    {
      title: "Market Updates",
      description: "Stay informed with real-time market updates.",
      image: <Article style={styles.icons} />,
    },
  ];

  const pageMetrics = [
    {
      title: "1 Cr.+",
      description: "Money Managed",
    },
    {
      title: "100K+",
      description: "Live Trades Taken",
    },
    {
      title: "5",
      description: "Strategies",
    },
    {
      title: "1000+",
      description: "Moneyy.AI Users",
    },
    {
      title: "10+",
      description: "Brokers",
    },
    {
      title: "+16.78%",
      description: "AI Strategies CAGR",
    },
  ];

  const getPageOptions = () => {
    return options.map((option) => {
      return (
        <div style={styles.optionBox}>
          <div>{option.image}</div>
          <div>
            <p style={styles.optionTitle}>{option.title}</p>
            <p style={styles.optionText}>{option.description}</p>
          </div>
        </div>
      );
    });
  };

  const getPageMetrics = () => {
    return pageMetrics.map((metric) => {
      return (
        <div style={styles.metricsContainer}>
          <div style={styles.metricsInner}>
            <p style={styles.metricTitle}>{metric.title}</p>
            <p>{metric.description}</p>
          </div>
        </div>
      );
    });
  };

  const getLandingPageTitle = () => {
    return (
      <>
        <p style={styles.h1Text}>Unlock the potential of Moneyy.ai for...</p>
        <p style={styles.descText}>Smart Trading Starts with Moneyy.ai</p>
      </>
    );
  };

  return (
    <>
      <div>{getLandingPageTitle()}</div>
      <div style={styles.dividerLine}></div>
      <div style={styles.flexContainer}>
        <div style={styles.boxesContainer}>{getPageOptions()}</div>
        <div style={styles.boxesContainer}>
          <div style={styles.columnFlex}>{getPageMetrics()}</div>
        </div>
      </div>
    </>
  );
};

const styles = {
  icons: {
    color: Theme.colors.blueSolid,
    marginRight: "32px",
    fontSize: "32px",
  },
  metricsInner: {
    textAlign: "center" as const,
    margin: "24px 0px",
  },
  metricTitle: {
    color: Theme.colors.blueSolid,
    fontSize: "40px",
    padding: "0px",
    fontWeight: Theme.fontWeight.semiBold,
    margin: "0px",
  },
  h1Text: {
    ...Styles.h1Text,
  },
  columnFlex: {
    display: "flex" as const,
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
  },
  metricsContainer: {
    display: "flex" as const,
    flexDirection: "row" as const,
    minWidth: "40%",
    justifyContent: "center" as const,
  },
  optionTitle: {
    padding: "0px",
    margin: "0px",
    fontSize: Theme.fontSizes.h2,
    fontWeight: Theme.fontWeight.semiBold,
  },
  optionText: {
    padding: "0px",
    margin: "0px",
    fontSize: Theme.fontSizes.h5,
  },
  descText: {
    ...Styles.h4Text,
    textAlign: "center" as const,
  },
  flexContainer: {
    display: "flex" as const,
  },
  dividerLine: {
    ...Styles.bottomBorderLine,
  },
  boxesContainer: {
    padding: "20px",
    flex: 1,
    margin: "auto",
  },
  optionBox: {
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "top" as const,
    padding: "32px",
    border: "4px solid " + Theme.colors.blueSolid10,
    borderRadius: "10px",
    margin: "32px 24px",
  },
  container: {},
};

export default WebsiteOptions;
