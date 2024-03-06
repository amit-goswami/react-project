import React from "react";
import { Styles, Theme } from "../../Utils/Constants";
import { Switch } from "@mui/joy";
import { CheckCircle } from "@mui/icons-material";

const PricingPlans: React.FC = () => {
  const [isBacktest, setIsBacktest] = React.useState(true);
  const [isMonthly, setIsMonthly] = React.useState(true);

  const strings = {
    backtestDesc: "Backtest your strategies with historical data",
    strategyDesc: "Choose and deploy your strategies to the market",
  };
  const freemiums = [
    {
      advantage: true,
      text: "Free Advantage 1",
    },
    {
      advantage: true,
      text: "Free Advantage 1",
    },
    {
      advantage: true,
      text: "Free Advantage 1",
    },
    {
      advantage: true,
      text: "Free Advantage 1",
    },
    {
      advantage: true,
      text: "Free Advantage 1",
    },
    {
      advantage: false,
      text: "Disdvantage 1",
    },
    {
      advantage: false,
      text: "Disdvantage 1",
    },
  ];

  const getPricingPlansSwitcher = () => {
    return (
      <div style={styles.buttonSwitcher}>
        <p style={styles.hintText}>{strings.backtestDesc}</p>
        <div style={styles.buttonBox}>
          <button
            style={
              isBacktest
                ? styles.selectedButton
                : {
                    margin: 0,
                  }
            }
            onClick={() => setIsBacktest(true)}
          >
            BackTest Plans
          </button>
          <button
            style={!isBacktest ? styles.selectedButton : { margin: 0 }}
            onClick={() => setIsBacktest(false)}
          >
            Strategy Plans
          </button>
        </div>
        <p style={styles.hintText}>{strings.strategyDesc}</p>
      </div>
    );
  };

  const getPayFrequencySwitcher = () => {
    return (
      <div style={styles.frequencyBox}>
        <p style={styles.freqText}>Bill Monthly</p>
        <Switch
          size="lg"
          onChange={() => setIsMonthly(!isMonthly)}
          checked={isMonthly}
          slotProps={{
            track: {
              sx: {
                justifyContent: "space-around",
                backgroundColor: Theme.colors.blueSolid,
                color: Theme.colors.yellow,
              },
            },
          }}
          sx={{
            "--Switch-thumbSize": "24px",
            "--Switch-trackWidth": "64px",
            "--Switch-trackHeight": "32px",
          }}
        />
        <p style={styles.freqText}>
          Bill Annually{" "}
          <span style={{ color: Theme.colors.blueSolid }}>( Save 40% )</span>
        </p>
      </div>
    );
  };

  const getAdvantagesList = (advantages: any) => {
    return advantages.map(
      (freemium: { advantage: any; text: string }, index: number) => {
        return (
          <div key={index} style={styles.advatages}>
            <CheckCircle
              style={{
                color: freemium.advantage
                  ? Theme.colors.blueSolid
                  : Theme.colors.red,
                marginRight: 10,
                marginLeft: 12,
              }}
            />
            <p style={{ margin: 5 }}>{freemium.text}</p>
          </div>
        );
      },
    );
  };

  const getFreeBox = () => {
    return (
      <>
        <p style={Styles.h1Text}>Free</p>
        <p>No Fees, Just Benefits</p>
        <p style={Styles.h1Text}>₹0/Month</p>
        <button style={styles.yellowButton}>Claim Now!</button>
        <div style={{ ...Styles.bottomBorderLine, ...styles.divider }}></div>
        <div style={{ textAlign: "start", padding: "0 24px" }}>
          {getAdvantagesList(freemiums)}
        </div>
        <div style={styles.claimBox}>
          <p style={{ padding: 0, textAlign: "center" }}>
            Claim Your Free Trial Today.
          </p>
          <button style={{ ...styles.yellowButton, padding: 0 }}>
            Claim Now!
          </button>
        </div>
      </>
    );
  };

  const getPremiumBox = () => {
    return (
      <>
        <p style={Styles.h1Text}>Premium</p>
        <p>Your Ideal Plan</p>
        <p style={Styles.h1Text}>₹999/Month</p>
        <p>(excl. 18% GST)</p>
        <div style={{ ...Styles.bottomBorderLine, ...styles.divider }}></div>
        <div style={{ textAlign: "start", padding: "0 24px" }}>
          {getAdvantagesList(freemiums)}
        </div>
        <button style={styles.yellowButton}>Buy Now!</button>
      </>
    );
  };

  const getActualPlans = () => {
    return (
      <div style={styles.expandingContainer}>
        <div style={styles.eachPlanBox}>{getFreeBox()}</div>
        <div
          style={{
            ...styles.eachPlanBox,
            backgroundColor: Theme.colors.blueTainted15,
          }}
        >
          {getPremiumBox()}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <p style={Styles.h1Text}>Choose your pricing plans</p>
        <p style={styles.descText}>Affordable plans, Incredible Gains</p>
        <div style={Styles.bottomBorderLine}></div>
      </div>
      {getPricingPlansSwitcher()}
      {getPayFrequencySwitcher()}
      {getActualPlans()}
    </>
  );
};

const styles = {
  claimBox: {
    display: "flex",
    flexDirection: "row" as const,
    backgroundColor: Theme.colors.blueTainted,
    color: Theme.colors.white,
    borderRadius: Theme.borderRadius,
  },
  advatages: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    margin: "10px 0",
  },
  divider: {
    width: "80%",
    backgroundColor: Theme.colors.grey70,
    left: "10%",
    height: 2,
  },
  yellowButton: {
    backgroundColor: Theme.colors.yellow,
    borderRadius: Theme.borderRadius,
    color: Theme.colors.black,
    padding: "10px 24px",
    margin: 10,
  },
  eachPlanBox: {
    borderRadius: Theme.borderRadius,
    backgroundColor: Theme.colors.white,
    width: 320,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    padding: 10,
    textAlign: "center" as const,
    margin: 10,
  },
  expandingContainer: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "top" as const,
  },
  freqText: {
    margin: 24,
    fontSize: Theme.fontSizes.h3,
  },
  frequencyBox: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    margin: "auto 24px 0 24px",
  },
  descText: {
    textAlign: "center" as const,
  },
  selectedButton: {
    backgroundColor: Theme.colors.white,
    color: Theme.colors.blueSolid,
    margin: 0,
  },
  buttonBox: {
    margin: "auto 24px 0 24px",
    backgroundColor: Theme.colors.blueSolid,
    borderRadius: Theme.borderRadius,
    padding: 0,
  },
  hintText: {
    textAlign: "center" as const,
    backgroundColor: Theme.colors.white,
    padding: 10,
    borderRadius: 10,
    border: "1px dashed " + Theme.colors.black70,
    fontSize: Theme.fontSizes.h6,
    maxWidth: 126,
  },
  buttonSwitcher: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center" as const,
  },
};

export default PricingPlans;
