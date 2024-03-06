import React from "react";
import AuthSetupPage from "./AuthSetupPage";
import { Styles, Theme, ThemeTypes } from "../../Utils/Constants";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TimelineIcon from "@mui/icons-material/Timeline";
import UpdateIcon from "@mui/icons-material/Update";
import { PlayCircleOutline } from "@mui/icons-material";

interface IntroAndAuthSectionProps {
  // Define the props for your component here
}

const IntroAndAuthSection: React.FC<IntroAndAuthSectionProps> = (props) => {
  function getLandingPageDescription() {
    const descriptionlist = [
      {
        text: "Backtest Your Trading Ideas.",
        icon: <LightbulbIcon style={styles.icons} />,
      },
      {
        text: "Trade AI-Powered Algo Strategies.",
        icon: <TimelineIcon style={styles.icons} />,
      },
      {
        text: "Stay Informed with Real-Time Market Updates.",
        icon: <UpdateIcon style={styles.icons} />,
      },
    ];
    return descriptionlist.map((item, index) => {
      return (
        <div key={index}>
          <p style={styles.pText}>
            {item.icon} <span style={styles.descriptionText}>{item.text}</span>
          </p>
        </div>
      );
    });
  }

  const getLandingPageTitle = () => {
    return (
      <p style={{ ...Styles.h1Text, textTransform: "none" as const }}>
        Trade <span style={styles.titleColorText}>Smarter</span> with{" "}
        <span style={styles.titleColorText}>Moneyy.ai</span>
      </p>
    );
  };

  return (
    <>
      <div style={styles.flexContainer}>
        <div style={styles.leftContainer}>
          {getLandingPageTitle()}
          {getLandingPageDescription()}
          <div style={styles.startNow}>
            <button style={ThemeTypes.yellowButton}>
              Start Free Trial
              <PlayCircleOutline style={{ marginLeft: "0.5rem" }} />
            </button>
          </div>
        </div>
        <div style={styles.rightContainer}>
          <div style={styles.loginBox}>
            <AuthSetupPage />
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  startNow: {
    padding: "0 0 0 4rem",
  },
  icons: {
    color: Theme.colors.black70,
    height: 24,
  },
  titleColorText: {
    color: Theme.colors.blueSolid,
  },
  pText: {
    backgroundColor: Theme.colors.blueTainted15,
    borderTopRightRadius: Theme.borderRadius,
    borderBottomRightRadius: Theme.borderRadius,
    display: "inline-flex",
    padding: "1rem 2rem 1rem " + Theme.gapXXLarge,
    margin: "1rem 0 0 0",
  },
  leftContainer: {
    flex: "2",
    display: "flex",
    flexDirection: "column" as const,
    paddingTop: Theme.gapLarge,
  },
  descriptionText: {
    paddingLeft: Theme.gapSmall,
    fontSize: Theme.fontSizes.h4,
    color: Theme.colors.black70,
  },
  landingText: {
    color: Theme.colors.white,
    fontWeight: "bold",
  },
  flexContainer: {
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
    margin: "32px 0 48px 0",
  },
  rightContainer: {
    flex: "1",
    display: "flex",
  },
  loginBox: {
    backgroundImage: Theme.colors.blueWhiteGradient,
    borderRadius: Theme.borderRadiusLarge,
    padding: Theme.gapLarge,
    margin: Theme.gapLarge,
    boxShadow: "0 0 16px 0 " + Theme.colors.yellow,
    flex: "1",
    justifyContent: "center",
  },
};

export default IntroAndAuthSection;
