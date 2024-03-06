import React from "react";
import { Styles, Theme } from "../Utils/Constants";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import youtube  from   '../assets/images/youtube.png';
import xsocial  from   '../assets/images/x.png';
import linkedin  from   '../assets/images/linkedin.png';
import instagram  from   '../assets/images/instagram.png';
import facebook  from   '../assets/images/facebook.svg';

import useWindowSize from "./Hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const websiteDescription = (
    <div style={{ ...styles.column, ...styles.descriptionText }}>
      <img
        src="./images/logo.svg"
        alt="logo"
        style={windowSize <= 540 ? styles.profileImageStyleResponsive : styles.profileImageStyle}
      />
      <p style={windowSize <= 540 ? styles.webpageDescResponsive : styles.webpageDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        aliquam molestias nam neque obcaecati vero maxime odit adipisci
        praesentium fugit alias deserunt animi molestiae aut commodi dicta
        dolore esse amet.
      </p>
    </div>
  );

  const ExploreSection = (
    <div style={styles.column}>
      <p style={windowSize <= 540? Styles.h3TextResponsive : Styles.h3Text}>Explore</p>

      <p onClick={()=> {
        navigate("/backtesting");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>Backtesting</p>
      <p onClick={()=> {
        navigate("/strategy");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>AI Strategies</p>
      <p onClick={()=> {
        navigate("/market-news");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>Market news</p>
      <p onClick={()=> {
        navigate("/learn");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>Learn</p>
      <p onClick={()=> {
        navigate("/pricing");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>Pricing</p>
      <p onClick={()=> {
        navigate("/leaderboard");
      }} style={windowSize <= 540? { fontSize: Theme.fontSizes.h5, cursor: "pointer" } : { fontSize: Theme.fontSizes.h4, cursor: "pointer" }}>Leaderboard</p>
    </div>
  );

  const CompanySection = (
    <div style={styles.column}>
      <p style={windowSize <= 540? Styles.h3TextResponsive : Styles.h3Text}>Company</p>
      <p style={windowSize <= 540? { fontSize: Theme.fontSizes.h5 } : { fontSize: Theme.fontSizes.h4 }}>Terms of Use</p>
      <p style={windowSize <= 540? { fontSize: Theme.fontSizes.h5 } : { fontSize: Theme.fontSizes.h4 }}>Privacy Policy</p>
      <p style={windowSize <= 540? { fontSize: Theme.fontSizes.h5 } : { fontSize: Theme.fontSizes.h4 }}>Risk Disclosure</p>
    </div>
  );

  const ContactUsSection = (
    <div style={windowSize <= 540? { ...styles.column, ...{fontSize: Theme.fontSizes.h5} } : { ...styles.column }}>
      <p style={windowSize <= 540? Styles.h3TextResponsive : Styles.h3Text}>Contact Us</p>
      <p style={styles.boxIcon}>
        <PhoneIcon style={windowSize <= 540? {...styles.icon, ...{fontSize: "14px", marginRight: "4px"}} : styles.icon} />
        +91-1234567890
      </p>
      <p style={styles.boxIcon}>
        <EmailIcon style={windowSize <= 540? {...styles.icon, ...{fontSize: "14px", marginRight: "4px"}} : styles.icon} /> contact@moneyy.ai
      </p>
      <p style={styles.boxIcon}>
        <LocationOnIcon style={windowSize <= 540? {...styles.icon, ...{fontSize: "14px", marginRight: "4px"}} : styles.icon} /> India
      </p>
    </div>
  );

  const socialListing = (
    <div style={{ ...styles.column }}>
      <p style={windowSize <= 540? Styles.h3TextResponsive : Styles.h3Text}>Social</p>
      <p style={styles.boxIcon}>
        <img src={xsocial} style={styles.social} alt="x"/>
      </p>
      <p style={styles.boxIcon}>
        <img src={instagram} style={styles.social} alt="instagram"/>
      </p>
      <p style={styles.boxIcon}>
        <img src={facebook} style={styles.social} alt="facebook"/>
      </p>
      <p style={styles.boxIcon}>
        <img src={linkedin} style={styles.social} alt="linkedin"/>
      </p>
      <p style={styles.boxIcon}>
        <img src={youtube} style={styles.social} alt="youtube"/>
      </p>
    </div>
  );

  return (
    <footer
      style={windowSize <= 540 ? styles.containerResponsive : styles.container}
    >
      <div style={styles.footerHeader}>
        <p
          style={
            windowSize <= 540 ? styles.pageTitleResponsive : styles.pageTitle
          }
        >
          Unanswered Queries?
        </p>
        <p
          style={
            windowSize <= 540
              ? styles.contactMailResponsive
              : styles.contactMail
          }
        >
          Reach us out at support@moneyy.ai
        </p>
      </div>
      <div
        style={
          windowSize <= 1400 && windowSize > 800
            ? styles.footerColumnsMid
            : windowSize <= 800 && windowSize > 540
              ? styles.footerColumnsSma
              : windowSize <= 540
                ? styles.footerColumnsResponsive
                : styles.footerColumns
        }
      >
        {windowSize > 540
          ? <>
            {websiteDescription}
            {ExploreSection}
            {CompanySection}
            {ContactUsSection}
            {socialListing}
          </>
          :
          <>
            {websiteDescription}
            <div style={styles.footerTwoCol}>
              {ExploreSection}
              {CompanySection}
            </div>
            <div style={styles.footerTwoCol}>
              {socialListing}
              {ContactUsSection}
            </div>
          </>
        }
      </div>
      <div style={windowSize <= 540 ? styles.footerCopyrightResponsive : styles.footerCopyright}>
        <p>&copy; 2023 Moneyy.ai Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  pageTitle: {
    fontSize: Theme.fontSizes.h1,
    margin: 0,
  },
  pageTitleResponsive: {
    color: Theme.colors.grey100,
    fontWeight: Theme.fontWeight.semiBold,
    lineHeight: "normal",
    letterSpacing: "1.08px",
    fontSize: Theme.fontSizes.p18,
    margin: 0,
  },
  container: {
    paddingLeft: Theme.gapXXLarge,
    paddingRight: Theme.gapXXLarge,
    marginTop: Theme.gapLarge,
  },
  containerResponsive: {
    marginTop: Theme.gapLarge,
  },
  webpageDesc: {
    fontSize: Theme.fontSizes.h6,
  },
  webpageDescResponsive: {
    fontSize: Theme.fontSizes.h5,
  },
  boxIcon: {
    display: "flex" as const,
    alignItems: "center" as const,
  },
  icon: {
    color: Theme.colors.blueSolid,
  },
  descriptionText: {
    paddingRight: Theme.gapSmall,
  },
  profileImageStyle: {
    width: Theme.iconWidth,
  },
  profileImageStyleResponsive: {
    height: Theme.footerIconHeight,
  },
  footerHeader: {
    paddingBottom: Theme.gapSmall,
    textAlign: "left" as const,
    borderBottom: `1px solid ${Theme.colors.whiteGrey70}`,
  },
  footerColumns: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    columnGap: "100px",
    rowGap: "30px",
    justifyContent: "space-around",
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
  },
  footerColumnsMid: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "80px",
    rowGap: "30px",
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
  },
  footerColumnsSma: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr",
    columnGap: "80px",
    rowGap: "30px",
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
  },
  footerColumnsResponsive: {
    display: "grid" as const,
    gridTemplateColumns: "1fr",
    columnGap: "0px",
    rowGap: "30px",
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
  },
  footerTwoCol: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr",
    columnGap: "0px",
    rowGap: "30px",
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
  },
  column: {
    width: "auto",
    minWidth: 150,
  },
  footerCopyright: {
    padding: Theme.gapSmall,
    textAlign: "left" as const,
    fontSize: Theme.fontSizes.h6,
    borderTop: `1px solid ${Theme.colors.whiteGrey70}`,
  },
  footerCopyrightResponsive: {
    padding: Theme.gapSmall,
    textAlign: "left" as const,
    fontSize: Theme.fontSizes.p11,
    borderTop: `1px solid ${Theme.colors.whiteGrey70}`,
  },
  contactMailResponsive: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h5,
    fontWeight: Theme.fontWeight.regular,
    marginTop: Theme.gap5,
  },
  contactMail: {
    fontSize: Theme.fontSizes.h4,
    fontWeight: Theme.fontWeight.light,
    margin: 0,
  },
  social: {
    width: 20
  }
};

export default Footer;
