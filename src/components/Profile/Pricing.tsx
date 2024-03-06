// component when user is authenticated to show the subscribed plans

import React, { useState, useEffect } from "react";
import { Styles, Theme } from "../../Utils/Constants";
import { Switch } from "@mui/joy";
import { CheckCircle } from "@mui/icons-material";
import "./PlansAndPricing.css";
import PurchaseDialog from "../Dialogs/PurchaseDialog";
import {
  PlanData,
  UpgradePlan,
  fetchUserPlanPricing,
} from "../../API/ProfileAPI";

export function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
export function addDaysToDate(daysToAdd: any) {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const Pricing: React.FC = () => {
  const [isBacktest, setIsBacktest] = useState(true);
  const [isMonthly, setIsMonthly] = useState(false);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);
  // const [planData, setplanData] = useState(null);
  const [planData, setPlanData] = useState<PlanData | null>(null);

  const [currentPlan, setcurrentPlan] = useState("free plan");
  console.log(isMonthly);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserPlanPricing();
        if (userData.user_plan_details.plan_name === "Free") {
          setIsBuyNowClicked(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

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
          checked={!isMonthly}
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
    return advantages.map((freemium: { advantage: any; text: string }) => {
      return (
        <div style={styles.advatages}>
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
    });
  };

  const handleClose = () => {
    setOpenPurchaseDialog(false);
  };

  async function handleClick() {
    setOpenPurchaseDialog(true);
    setIsBuyNowClicked(true);
    try {
      const upgradePlanData = await UpgradePlan(true);
      setPlanData(upgradePlanData);
      console.log(planData);
    } catch (error) {
      console.error("Error occured in plan api");
    }
  }

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
        <button style={styles.yellowButton} onClick={handleClick}>
          Buy Now!
        </button>
      </>
    );
  };

  const getActualPlans = () => {
    return (
      <div style={styles.expandingContainer}>
        <div
          style={{
            ...styles.freePlanBox,
            border: isBuyNowClicked ? "" : "4px solid rgba(39, 71, 221, 1)",
          }}
        >
          {!isBuyNowClicked && (
            <div style={{ ...styles.currentPlan, position: "relative" }}>
              Current Plan
            </div>
          )}
          <div>{getFreeBox()}</div>
        </div>
        <div
          style={{
            ...styles.eachPlanBox,
            backgroundColor: Theme.colors.blueTainted15,
            border: isBuyNowClicked ? "4px solid rgba(39, 71, 221, 1)" : "",
          }}
        >
          {isBuyNowClicked && (
            <div style={{ ...styles.currentPlanPremium, position: "relative" }}>
              Current Plan
            </div>
          )}
          {getPremiumBox()}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 style={Styles.h1Text}>Upgrade Your Account</h3>
      <h5 style={styles.descText} className="textSecondary">
        (Please select an Upgrade Option.)
      </h5>
      {getPricingPlansSwitcher()}
      {getPayFrequencySwitcher()}
      {getActualPlans()}
      <PurchaseDialog
        open={openPurchaseDialog}
        handleClose={handleClose}
        planData={planData}
      />
    </div>
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
    "&:hover": {
      backgroundColor: "rgb(206 186 115)",
    },
  },
  eachPlanBox: {
    borderRadius: Theme.borderRadius,
    backgroundColor: Theme.colors.white,
    width: 320,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    padding: "20px 14px",
    textAlign: "center" as const,
    margin: 10,
  },
  freePlanBox: {
    borderRadius: Theme.borderRadius,
    backgroundColor: Theme.colors.white,
    width: 320,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    padding: "6px 10px",
    textAlign: "center" as const,
    margin: 10,
    height: "fit-content",
  },
  currentPlanPremium: {
    color: "white",
    backgroundColor: "rgba(39, 71, 221, 1)",
    borderRadius: "22px",
    width: "fit-content",
    padding: "4px",
    top: "-34px",
    left: "101px",
  },
  currentPlan: {
    color: "white",
    backgroundColor: "rgba(39, 71, 221, 1)",
    borderRadius: "22px",
    width: "fit-content",
    padding: "4px",
    top: "-22px",
    left: "101px",
  },
  expandingContainer: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
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

export default Pricing;
