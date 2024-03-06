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

const IsLoginSection: React.FC<IntroAndAuthSectionProps> = (props) => {
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
        <div style={styles.centeredContainer}>
          {getLandingPageTitle()}
          <div style={styles.loginBox}>
            <AuthSetupPage />
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  centeredContainer: {
    display: "flex",
    flexDirection: "column" as "column", // Explicitly specify the type
    alignItems: "center",
    justifyContent: "center",
  },
  titleColorText: {
    color: Theme.colors.blueSolid,
  },
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "32px 0 48px 0",
  },
  loginBox: {
    backgroundImage: Theme.colors.blueWhiteGradient,
    borderRadius: Theme.borderRadiusLarge,
    padding: Theme.gapLarge,
    margin: Theme.gapLarge,
    boxShadow: "0 0 16px 0 " + Theme.colors.yellow,
    justifyContent: "center",
    width: "80%", // Adjust the width as needed
    maxWidth: "600px", // Adjust the max width as needed
  },
};

export default IsLoginSection;
