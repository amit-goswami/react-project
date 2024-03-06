import React from "react";
import { Styles, Theme } from "../../Utils/Constants";

interface Benefit {
  id: number;
  text: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    text: "Lorem ipsim No credit card required No credit card required No credit card required No credit card required",
  },
  {
    id: 2,
    text: "Lorem ipsim No credit card required No credit card required No credit card required No credit card required",
  },
  {
    id: 3,
    text: "Cancel anytime Lorem ipsim No credit card required No credit card required No credit card required No credit card required",
  },
];

const FreeTrialSection: React.FC = () => {
  return (
    <div style={styles.mainBox}>
      <div style={styles.flexBox}>
        <img
          src="/images/landing-banner.png"
          alt="Free Trial"
          style={styles.image}
        />
      </div>
      <div style={styles.flexBox}>
        <p style={styles.title}>7 Days Free Trial</p>
        <p style={styles.desc}>Sign up now and enjoy the following benefits:</p>
        <div style={styles.divider}></div>
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit.id} style={styles.benefitTxt}>
              {benefit.text}
            </li>
          ))}
        </ul>
        <button style={styles.buttonYellow}>Claim Now</button>
      </div>
    </div>
  );
};

const styles = {
  buttonYellow: {
    backgroundColor: Theme.colors.yellow,
    color: Theme.colors.black,
  },
  benefitTxt: {
    fontSize: Theme.fontSizes.h6,
    margin: 0,
  },
  divider: {
    ...Styles.bottomBorderLine,
    backgroundColor: Theme.colors.yellow,
    left: 0,
  },
  desc: {
    fontSize: Theme.fontSizes.h4,
    margin: 0,
  },
  title: {
    fontSize: Theme.fontSizes.h1,
    fontWeight: Theme.fontWeight.semiBold,
  },
  image: {
    width: 256,
    height: "auto",
  },
  mainBox: {
    color: Theme.colors.white,
    display: "flex",
    padding: 32,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundImage: Theme.colors.blueWhiteGradient,
  },
  flexBox: {
    flex: 1,
  },
};

export default FreeTrialSection;
